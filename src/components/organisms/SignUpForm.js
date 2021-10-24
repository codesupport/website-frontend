import React, { Component } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../atoms/Button";
import FormLabel from "../molecules/FormLabel";
import TextInput from "../atoms/TextInput";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import { analytics } from "../../services/FirebaseService";
import Alert from "../atoms/Alert";

const Form = styled("form")`
	max-width: 600px;
	padding: var(--gridGap);
	background-color: var(--foreground);

	ul { margin: 0; }

	button[type=submit] {
		margin-top: 10px;
	}
`;

const Inputs = styled("div")`
	${({ $loading }) => $loading && "opacity: 50%;"}
`;

const SESSION_STORAGE_KEY = "user_data";

class SignUpForm extends Component {
	auth = new AuthService();
	user = new UserService();
	state = {
		error: false,
		loading: false,
		inputs: {
			alias: "",
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
			const { alias, email, password } = this.state.inputs;

			if ([alias, email, password].includes("")) {
				this.setState({
					error: "You must supply both an email and password.",
					loading: false
				});
			}

			const user = await this.user.createUser(alias, email, password);

			analytics.setUserId(user.id);
			sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));

			alert(JSON.stringify(user));
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
					Sign Up
				</h1>
				{error && (
					<Alert
						type="danger"
						title="There was a problem creating your account:"
					>
						<ul>
							{error.split(",").map((e, i) => <li key={i}>{e}</li>)}
						</ul>
					</Alert>
				)}
				<Inputs $loading={loading}>
					<FormLabel>
						Username
						<TextInput
							disabled={loading}
							name="alias"
							onChange={this.handleInputChange}
							placeholder="richardhendricks"
							required
							type="text"
						/>
					</FormLabel>
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
						Create Account
					</Button>
				</Inputs>
			</Form>
		);
	}
}

export default props => {
	const router = useRouter();

	return <SignUpForm {...props} router={router} />;
};
