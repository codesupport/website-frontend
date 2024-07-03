---
title: Some Useful C++ Tricks
author: Kayomn
date: '2021-03-05'
description: While there's a lot of hidden gotchas in C++, there's also many useful features that have evolved from all sorts of poorly defined behaviour that have become useful tools in my box with doing day-to-day work.
---
While there are lot of hidden gotchas in C++, there are also many useful features that have evolved from all sorts of poorly defined behavior and hacked-on additions that have become useful tools in my box with doing day-to-day work.

This post aims to explore a few of the ones I could remember off of the top of my head from looking at my game engine project, [Ona](https://github.com/Kayomn/Ona), and explore how and why they can be helpful in reducing code duplication, avoiding slowdowns, and producing code that needs to do less at run-time.

## Beyond Pimpl

In my experience, I have never found the very rigid examples of the "pimpl" design pattern useful. My issues with pimpl sit with how it adds a lot of unnecessary run-time overhead to excuse poor support for hiding implementation details. That withstanding, it is possible to get a lot more mileage out of this design pattern by ignoring the most common examples of its application.

```cpp
class External {
	class Internal;

	Internal * internal;

	public:
	External();

	~External();
};
```

The most common application of Pimp is to wrap a dynamic allocation - which itself may sometimes be wrapped in either a `std::unique_ptr` or `std::shared_ptr` rather than a regular C pointer. Evidently, this disregards the hard run-time needs of the application for the sake of hiding some data.

Usage of a Pimpl-like pattern became very necessary for a recent project I was working on, which was implementing a document object model-like structure for browsing configuration data.

```cpp
class ConfigEnvironment final : public Object {
	struct Value;

	HashTable<String, Value> globals;

	public:
	// ...
};
```

`Value` contains a lot of data and a lot of member functions. Were these exposed in the header, it would not just make it harder for readers to parse, but also the compiler itself.

However, by happenstance, I discovered that my implementation of `HashMap` does not need to care about the size or layout of `Value` at this stage of compilation, so it is perfectly happy to accept an incomplete type as one of its type arguments.

```cpp
struct ConfigEnvironment::Value {
	enum class Type {
		Object,
		Boolean,
		Integer,
		Floating,
		String,
		Vector2,
		Vector3,
		Vector4,
		Array,
	};

	enum { UserdataSize = (64 - sizeof(Type)), };

	Type type;

	uint8_t userdata[UserdataSize];
};
```

Within the implementation file, the actual layout of the struct is defined for the compiler to see when compiling this file but never anywhere else.

No performance is lost here by using Pimpl over defining `Value` in the header, and a lot of implementation details have been hidden from public view, saving potential time in the future when parsing the header.

The example of this version of Pimpl in action can be found [here](https://github.com/Kayomn/Ona/blob/2c6e39326a1f38b1472476b8dc1bc6a351fb1311/engine.hpp#L174) and [here](https://github.com/Kayomn/Ona/blob/2c6e39326a1f38b1472476b8dc1bc6a351fb1311/engine/script.cpp#L4).

## Stateful Lambdas

Lambdas are a very useful feature that was introduced in the C++11 standard revision. While the most popular use of lambdas is as arguments to other functions, they also have a lot of use as local functions.

```cpp
void doThing() {
	char const * message = "Hello, world\n";

	auto doThingALot = [message](int iterations) {
		for (uint64_t j = 0; j < iterations; i += 1) {
			printf("%s", message);
		}
	};

	for (uint64_t i = 0; i < 100; i += i) {
		doThingALot(i);
	}
}
```

Similar to [C# local functions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/local-functions), these functors are able to capture the local scope and perform repetitive tasks, reducing repeated code while still retaining all the compiler optimizations of regular C++ functions.

In fact, a lot of useful techniques can arise from lambdas that capture the local scope, with one of which being *stateful lambdas*. Stateful lambdas are a practice I employed recently in the development of a lexer I wrote.

```cpp
auto eatToken = [&, i = (size_t)0]() mutable -> Token {
	// ...
}
```

The declaration of `i = (size_t)0` is creating a scoped variable of type `size_t` within the `eatToken` functor. By default, `i` is not mutable, erasing any potential use for this feature beyond some extra automatic scoping. Luckily, C++ is a language that allows any data to have its `const`-ness broken at any time with the use of `mutable`.

```cpp
auto eatToken = [&, i = (size_t)0]() mutable -> Token {
	i += 1;

	// ...

	return Token{/** ... */}
}
```

Now, the `eatToken` functor is free to change the value of `i` as much as it likes whenever it is called. Each new invocation will retain the state of `i` from the last, without needing to rely on hacky solutions like global data.

In the lexer, this was leveraged to create an `eatToken` function that would lazily tokenize a string of data and spit out each new token that was found as a `Token` type. Once the end of the string was reached, only end-of-file tokens were produced to mark the terminating state for the parser loop.

For readers that are not familiar with the problems surrounding lexing text, this meant that it was no longer necessary to keep a full in-memory representation of all lexed tokens.

```csharp
Token EatToken(string text)
{
	var i = 0;

	// ...

	while (i < text.Length)
	{
		i += 1;

		yield return new Token(/** ... */);
	}
}
```

> *Example of `eatToken` in C#*

```js
function* eatToken(text) {
	let i = 0;

	// ...

	while (i < text.length) {
		i += 1;

		yield {
			tokenType: TokenType.eof,
			tokenText: "",
		};
	}
}
```

> *Example of `eatToken` in ECMAScript*

```py
def eat_token(text: str) -> Generator[dict, None, None]:
	i = 0

	# ...

	while (i < len(text)):
		i += 1

		yield {
			"token_type": TokenType.EOF,
			"token_text": "",
		}
```

> *Example of `eatToken` in Python*

Languages like C#, ECMAScript, and Python feature very similar concepts with nicer-looking APIs, but falter in implementation as they all rely on dynamic allocations to work, while mutable functors do not have this problem.

The implementation of `eatToken`, as well as the full lexer and parser source code, can be found [here](https://github.com/Kayomn/Ona/blob/2c6e39326a1f38b1472476b8dc1bc6a351fb1311/engine/script.cpp#L157).

## Small Buffer Optimization

New C++ users who are familiar with programming may be inclined to always reach for `new` whenever they need a buffer of memory that cannot be reasoned about at compile time. While C++ may resemble more managed languages like C# and Java, its dynamic memory model does anything but - because there is not one.

C++ is more than happy to grab memory from the operating system directly by the page and then split it into smaller chunks as needed, albeit at a relatively high cost. Languages like C#, Go, and Java all use managed pools of commonly used memory chunks pre-allocated by the run-time to speed up their allocation abilities.

Short of implementing a custom memory pool and allocation library, there is not an easy way of creating relatively cheap dynamic memory allocations right now. Despite that, C++ can do something that many managed languages cannot: allocate on the stack.

```cpp
struct String {
	private:
	enum { StaticBufferSize = 24, };

	uint32_t size;

	uint32_t length;

	union {
		uint8_t * dynamic;

		uint8_t static_[StaticBufferSize];
	} buffer;

	public:
	// ...
};
```

Many examples of C++ software that I have written in the past feature standard library-adjacent code that exists with the sole purpose of facilitating optimizations for small amounts of data. These small buffers are used up until the limits are exceeded by the spatial needs of the data itself.

```cpp
template<typename Type, size_t InlineMax> class InlineArray final : public Object, public Array<Type> {
	size_t length;

	union {
		Type * dynamic;

		Type static_[InlineMax];
	} buffer;

	public:
	// ...
}
```

Further control over what these "limits" are can be given to the user of the library directly via template parameters, which accept a value specifying the maximum size for the small buffer.

The implementation of the above small-buffer optimized `String` struct can be found [here](https://github.com/Kayomn/Ona/blob/2c6e39326a1f38b1472476b8dc1bc6a351fb1311/common.hpp#L219).

## Fixed Array Arguments

Sometimes you just want to be able to accept an array as an argument. I had this crop up when implementing a static array wrapper called `FixedArray`.

A hypothetical C++ programmer's first thought my be to reach for `std::initializer_list` or use a templated function, but if the maximum size of the array is known, it turns out doing it is fairly trivial and can be template-free.

```cpp
template<typename Type, size_t Len> class FixedArray final : public Object, public Array<Type> {
	Type buffer[Len];

	public:
	// ...

	FixedArray(Type (&values)[Len]) {
		for (size_t i = 0; i < Len; i += 1) {
			this->buffer[i] = values[i];
		}
	}

	FixedArray(Type (&&values)[Len]) {
		for (size_t i = 0; i < Len; i += 1) {
			this->buffer[i] = std::move(values[i]);
		}
	}
}
```

In the above example, two overloads of the constructor are defined, with one being optimized for perfect forwarding and the other being designed for indirect bit copying.

```cpp
static FixedArray<Vector4, 6> const quadVertices = {{
	Vector4{1.f, 1.f, 1.f, 1.f},
	Vector4{1.f, 0.f, 1.f, 0.f},
	Vector4{0.f, 1.f, 0.f, 1.f},
	Vector4{1.f, 0.f, 1.f, 0.f},
	Vector4{0.f, 0.f, 0.f, 0.f},
	Vector4{0.f, 1.f, 0.f, 1.f}
}};
```

This allows code that wants to act like a regular array, act like an array with minimal to no run-time overhead associated.

The implementation and usage of `FixedArray` can be found [here](https://github.com/Kayomn/Ona/blob/2c6e39326a1f38b1472476b8dc1bc6a351fb1311/common.hpp#L771) and [here](https://github.com/Kayomn/Ona/blob/2c6e39326a1f38b1472476b8dc1bc6a351fb1311/engine/opengl.cpp#L9) respectively.

## Conclusion
There is a lot that can be done with C++. Some it is good, some of it is terrible, some of it is even worse than terrible. Despite this, I still find it to be the most versatile tool that exists for systems-level programming, and a lot of these features go a long way to demonstrate why that is.
