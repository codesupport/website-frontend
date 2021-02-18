import React, { Component, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../atoms/Button";
import FormLabel from "../molecules/FormLabel";
import TextInput from "../atoms/TextInput";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import { analytics } from "../../services/FirebaseService";
import { AuthContext } from "../../context/AuthContext";

const Form = styled("form")`
	max-width: 600px;
	padding: var(--gridGap);
	background-color: var(--foreground);
	
	h1 {
		font-size: 2rem;
		font-weight: 700;
		font-family: "Raleway", sans-serif;
	}
`;

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

			this.props.authContext.updateUser(user);

			analytics.setUserId(user.id);

			// this.props.router.push(`/profile/${user.alias}`);
		} catch ({ message }) {
			this.setState({
				error: message
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
		const { error, loading, success, inputs } = this.state;

		return (
			<Form onSubmit={this.handleSubmit}>
				{error}
				{loading}
				{JSON.stringify(inputs)}
				<h1>
					Login to CodeSupport
				</h1>
				<p>
					When you login with your CodeSupport account you are able to do stuff.
				</p>
				<FormLabel>
					Email
					<TextInput
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
			</Form>
		);
	}
}

export default props => {
	const router = useRouter();
	const authContext = useContext(AuthContext);

	return <LoginForm
		{...props}
		router={router}
		authContext={authContext}
	/>;
};