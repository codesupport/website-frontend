---
title: How To Kill The Firestore Emulator
author: LamboCreeper
date: '2021-04-15'
description: A common problem which I face when using the Firebase Emulator with the Node.js debugger is that my debugger stops running when I am done, but the Firestore Emulator does not stop running.
---

A common problem which I face when using the Firebase Emulator with the Node.js debugger is that my debugger stops running when I am done, but the Firestore Emulator does not stop running. In this article I will explain how you can get around this issue.

Originally, to get around this I would go into my `firebase.json` configuration file like it suggests and would temporarily change the port. However, this method is not very efficient as you could run into the same issue over and over again. Luckily, there is an easy fix to this problem.

Using the `lsof` command you can list all open files and processes on a Unix-based system. Upon running this command you will find that you are presented with a long list, thankfully we can filter this down by just listing open files and processes on a specific port. In our case, the Firestore Emulators run on port `2255`, so we can run `lsof -i :2255` which should return a similar response to this:

```
COMMAND PID USER 
java 7254 my.user 
```

This shows us that `java` is running for `my.user` on process ID `7254` (your `PID` and `USER` values will be different). We can then take this information and run kill `7254` (replacing `7254` with your process ID) to kill the Firestore Emulators. This means that you will then be able to start the Firestore Emulators on the same port as before.

## TLDR
1. Run `lsof -i :2255`
2. Find the `PID` of java
3. Run `kill <the PID of java>`

I hope you find this trick useful, I know that it's certainly helped me out multiple times!
