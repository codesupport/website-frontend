import React, { Component } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../atoms/Button";
import FormLabel from "../molecules/FormLabel";
import TextInput from "../atoms/TextInput";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import { analytics } from "../../services/FirebaseService";

const Form = styled("form")`
	max-width: 600px;
	padding: var(--gridGap);
	background-color: var(--foreground);
	
	.uk-alert-danger {
		padding: 5px;
	}
	
	ul { margin: 0; }
	
	button[type=submit] {
		margin-top: 10px;
	}
`;

const Inputs = styled("div")`
	${({ $loading }) => $loading && "opacity: 50%;"}
`;

const SESSION_STORAGE_KEY = "user_data";

class LoginForm extends Component {
	auth = new AuthService();
	user = new UserService();
	state = {
		error: false,
		loading: false,
		inputs: {
			email: "",
			password: ""
		}
	};

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({
			loading: true
		});

		try {
			const { email, password } = this.state.inputs;

			if ([email, password].includes("")) {
				this.setState({
					error: "You must supply both an email and password.",
					loading: false
				});
			}

			await this.auth.login(email, password);

			const user = await this.user.getCurrentUser();

			analytics.setUserId(user.id);
			sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));

			this.props.router.push("/cms");
		} catch ({ message }) {
			this.setState({
				error: message,
				loading: false
			});
		}
	}

	handleInputChange = ({ target }) => {
		this.setState(prev => ({
			inputs: {
				...prev.inputs,
				[target.name]: target.value
			}
		}));
	}

	render() {
		const { error, loading } = this.state;

		return (
			<Form className="uk-form-stacked" onSubmit={this.handleSubmit}>
				<h1>
					Login to CodeSupport
				</h1>
				<p>
					When you login with your CodeSupport account you are able to do stuff.
				</p>
				{error && (
					<section className="uk-alert-danger">
						<strong>There was a problem logging you in:</strong>
						<ul>
							{error.split(",").map((e, i) => <li key={i}>{e}</li>)}
						</ul>
					</section>
				)}
				<Inputs $loading={loading}>
					<FormLabel>
						Email
						<TextInput
							disabled={loading}
							name="email"
							onChange={this.handleInputChange}
							placeholder="richard.hendricks@piedpiper.com"
							required
							type="text"
						/>
					</FormLabel>
					<FormLabel>
						Password
						<TextInput
							disabled={loading}
							name="password"
							onChange={this.handleInputChange}
							placeholder="••••••••"
							required
							type="password"
						/>
					</FormLabel>
					<Button type="submit">
						Login
					</Button>
				</Inputs>
			</Form>
		);
	}
}

export default props => {
	const router = useRouter();

	return <LoginForm {...props} router={router} />;
};