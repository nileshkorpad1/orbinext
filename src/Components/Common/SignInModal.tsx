import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { userActions } from '../actions';
import { userService } from '../services';
import { StoreState } from '@store/types';

export const LoginElement = () => {
	const [validated, setValidated] = useState(false);
	const [invalidInput, setInvalidInput] = useState(false);
	const emailVerified = useSelector((state: StoreState) => state.authentication.emailVerified);
	const authenticated = useSelector((state: StoreState) => state.authentication.authenticated);
	let user;
	if (authenticated && !emailVerified) {
		user = userService.getUser();
	}
	const [inputs, setInputs] = useState({
		username: user ? user.email : '',
		password: '',
	});
	const { username, password } = inputs;
	const loading = useSelector((state: StoreState) => state.authentication.loading);

	const alert = useSelector((state: StoreState) => state.alert);
	const dispatch = useDispatch();

	const inputRef = useRef(null);

	const [type, setType] = useState('password');
	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			if (username && password) {
				dispatch(userActions.login(username, password));
			}
		}
		setValidated(true);
	};
	function handleChange(e) {
		const { name, value } = e.target;
		setInvalidInput(false);
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	}
	const showHide = useCallback(() => {
		setType((current) => (current === 'text' ? 'password' : 'text'));
		// Setting focus here
		inputRef.current.focus();
	}, []);
	useEffect(() => {
		if (inputRef.current != null) {
			inputRef.current.selectionStart = inputRef.current.value.length;
			inputRef.current.selectionEnd = inputRef.current.value.length;
		}
	}, [type]);
	React.useEffect(() => {
		if (username.length && password.length && alert.type === 'danger' && validated) {
			setInvalidInput(true);
			setValidated(false);
		}
	}, [alert, username, password, validated, dispatch]);

	return (
		<React.Fragment>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate validated={validated} onSubmit={handleSubmit} className="deskera-form p-3">
					<Form.Row className="my-3">
						<Form.Group as={Col} xs={12} controlId="validationCustom01" className="floating-label">
							<Form.Control
								required
								type="email"
								name="username"
								size="lg"
								placeholder="Username"
								value={username}
								onChange={handleChange}
								isInvalid={username.length && invalidInput}
								isValid={username.length > 0}
							/>
							<Form.Label className="label label-lg">Email</Form.Label>
							<Form.Control.Feedback type="invalid">{invalidInput ? '' : 'Please correct your email address!'}</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row className="my-3">
						<Form.Group as={Col} xs={12} controlId="validationCustom02">
							<InputGroup className="floating-label">
								<Form.Control
									required
									type={type}
									size="lg"
									placeholder="Password"
									value={password}
									onChange={handleChange}
									name="password"
									ref={inputRef}
									isInvalid={password.length && invalidInput}
									isValid={password.length > 0}
								/>
								<Form.Label className="label label-lg">Password</Form.Label>
								<InputGroup.Append>
									<InputGroup.Text onClick={showHide}>
										{type === 'password' ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
									</InputGroup.Text>
								</InputGroup.Append>
								<Form.Control.Feedback type="invalid">{invalidInput ? '' : 'Please enter valid password!'}</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Form.Row>
					<Form.Group controlId="formBasicCheckbox" className="d-none">
						<Form.Check inline type="checkbox" label="Remember me" />
					</Form.Group>

					<Row className="mb-4">
						<Col md="12">
							{alert.message && invalidInput && <div className={`server-response text-${alert.type}`}>{alert.message}</div>}
						</Col>
					</Row>
					<Row className="my-3 justify-content-center">
						<Col md="12">
							<Button className="btn btn-block py-3" size="lg" type="submit" variant="secondary">
								{loading ? (
									<React.Fragment>
										Loading <FontAwesomeIcon icon={faSpinner} spin size="xs" />
									</React.Fragment>
								) : (
									'Sign in'
								)}
							</Button>
						</Col>
					</Row>
					<Row>
						<Col md="12">
							<Button className="text-dark p-0 m-0" variant="link" size="sm" onClick={() => dispatch(userActions.ShowForgotPassword())}>
								<small className="font-weight-light">Forgot Password?</small>
							</Button>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</React.Fragment>
	);
};

const ConfirmPassword = (props) => {
	const [validated, setValidated] = useState(false);
	const [invalidInput, setInvalidInput] = useState(false);
	const [inputs, setInputs] = useState({
		username: props.email ? props.email : '',
		confirmationCode: '',
		newPassword: '',
	});
	const { username, newPassword, confirmationCode } = inputs;
	const loading = useSelector((state: StoreState) => state.authentication.loading);
	const confirmPasswordSuccess = useSelector((state: StoreState) => state.authentication.confirmPasswordSuccess);
	const user = useSelector((state: StoreState) => state.authentication.user);
	const alert = useSelector((state: StoreState) => state.alert);
	const dispatch = useDispatch();

	const inputRef = useRef(null);

	const [type, setType] = useState('password');
	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			user && setInputs((inputs) => ({ ...inputs, username: user['userName'] }));
			let UserName = username ? username : user['userName'];
			if (UserName && newPassword && confirmationCode) {
				dispatch(userActions.confirmPasswordReset(UserName, confirmationCode, newPassword));
			}
		}
		setValidated(true);
	};
	function handleChange(e) {
		const { name, value } = e.target;
		setInvalidInput(false);
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	}
	const showHide = useCallback(() => {
		setType((current) => (current === 'text' ? 'password' : 'text'));
		// Setting focus here
		inputRef.current.focus();
	}, []);
	useEffect(() => {
		if (inputRef.current != null) {
			inputRef.current.selectionStart = inputRef.current.value.length;
			inputRef.current.selectionEnd = inputRef.current.value.length;
		}
	}, [type]);
	React.useEffect(() => {
		if (username.length && newPassword.length && alert.type === 'danger' && validated) {
			setInvalidInput(true);
			setValidated(false);
		}
	}, [alert, username, newPassword, validated]);
	return (
		<React.Fragment>
			{confirmPasswordSuccess ? (
				<React.Fragment>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Reset Password</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row className="justify-content-center my-3">
							<Col md="12" className="text-center">
								<h3 className="text-success mb-3">Congratulations!</h3>
								<p>Your password has been reset successfully.</p>
								<p>Click on login button below to login with new password</p>
							</Col>
						</Row>
						<Row className="justify-content-center my-3">
							<Col md="4" sm="12" className="text-center">
								<Button
									className="btn-block py-3"
									variant="primary"
									size="lg"
									onClick={() => dispatch(userActions.HideForgotPassword())}
								>
									Login
								</Button>
							</Col>
						</Row>
					</Modal.Body>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Reset Password</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form noValidate validated={validated} onSubmit={handleSubmit} className="deskera-form p-3">
							<Form.Row className="my-3">
								<Form.Group as={Col} xs={12} controlId="confirmationCode" className="floating-label">
									<Form.Control
										required
										type="text"
										name="confirmationCode"
										size="lg"
										placeholder="Verification Code"
										value={confirmationCode}
										onChange={handleChange}
										isInvalid={confirmationCode.length && invalidInput}
										isValid={confirmationCode.length > 0}
									/>
									<Form.Label className="label label-lg">Verification Code</Form.Label>
									<Form.Control.Feedback type="invalid">
										{invalidInput ? '' : 'Please enter valid Verification Code!'}
									</Form.Control.Feedback>
								</Form.Group>
							</Form.Row>
							<Form.Row className="my-3">
								<Form.Group as={Col} xs={12} controlId="newPassword">
									<InputGroup className="floating-label">
										<Form.Control
											required
											type={type}
											size="lg"
											placeholder="New Password"
											value={newPassword}
											onChange={handleChange}
											name="newPassword"
											ref={inputRef}
											isInvalid={newPassword.length && invalidInput}
											isValid={newPassword.length > 0}
										/>
										<Form.Label className="label label-lg">Password</Form.Label>
										<InputGroup.Append>
											<InputGroup.Text onClick={showHide}>
												{type === 'password' ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
											</InputGroup.Text>
										</InputGroup.Append>
										<Form.Control.Feedback type="invalid">
											{invalidInput ? '' : 'Please enter valid password!'}
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Form.Row>
							<Row className="mb-4">
								<Col md="12">
									{alert.message && invalidInput && <div className={`server-response text-${alert.type}`}>{alert.message}</div>}
								</Col>
							</Row>
							<Row className="my-3 justify-content-center">
								<Col md="7">
									<Button className="btn btn-block py-3" size="lg" type="submit" variant="secondary">
										{loading ? (
											<React.Fragment>
												Confirming <FontAwesomeIcon icon={faSpinner} spin size="xs" />
											</React.Fragment>
										) : (
											'Confirm'
										)}
									</Button>
								</Col>
								<Col md="5">
									<Button
										className="text-dark btn-block py-3"
										variant="link"
										size="sm"
										onClick={() => dispatch(userActions.HideForgotPassword())}
									>
										Cancel
									</Button>
								</Col>
							</Row>
						</Form>
					</Modal.Body>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
const ForgotPasswordElement = () => {
	const [validated, setValidated] = useState(false);
	const [invalidInput, setInvalidInput] = useState(false);
	const alert = useSelector((state: StoreState) => state.alert);
	const loading = useSelector((state: StoreState) => state.authentication.loading);
	let resetCodeSent = useSelector((state: StoreState) => state.authentication.resetCodeSent);
	const dispatch = useDispatch();
	let ResetInvalidMessage = 'Please correct your email address!';
	const [email, setEmail] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			if (email) {
				dispatch(userActions.resetPassword(email));
			}
		}
		setValidated(true);
	};
	React.useEffect(() => {
		if (email.length && alert.type === 'danger' && validated) {
			setInvalidInput(true);
			setValidated(false);
		}
	}, [alert, email, validated]);
	return (
		<React.Fragment>
			{resetCodeSent ? (
				<ConfirmPassword {...{ email: email }} />
			) : (
				<React.Fragment>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Forgot Password</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Please enter your registered email address below and we will send you verification code to reset your password.</p>
						<Form noValidate validated={validated} onSubmit={handleSubmit} className="deskera-form p-3">
							<Form.Row className="my-3">
								<Form.Group as={Col} xs={12} controlId="validationCustom01" className="floating-label">
									<Form.Control
										required
										type="email"
										name="email"
										size="lg"
										placeholder="Enter your email"
										value={email}
										isInvalid={email.length && invalidInput}
										isValid={email.length > 0}
										onChange={(e) => {
											setInvalidInput(false);
											setEmail(e.target.value);
										}}
									/>
									<Form.Label className="label label-lg">Email</Form.Label>
									<Form.Control.Feedback type="invalid">{invalidInput ? alert.message : ResetInvalidMessage}</Form.Control.Feedback>
								</Form.Group>
							</Form.Row>
							<Row className="my-3 justify-content-center">
								<Col md="7">
									<Button className="btn btn-block py-3" size="lg" type="submit" variant="dark">
										{loading ? (
											<React.Fragment>
												Reset Password
												<FontAwesomeIcon icon={faSpinner} spin size="xs" />
											</React.Fragment>
										) : (
											'Reset Password'
										)}
									</Button>
								</Col>
								<Col md="5">
									<Button
										className="text-dark btn-block py-3"
										variant="link"
										size="sm"
										onClick={() => dispatch(userActions.HideForgotPassword())}
									>
										Cancel
									</Button>
								</Col>
							</Row>
						</Form>
					</Modal.Body>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
const SigninModal = (props) => {
	const dispatch = useDispatch();
	const forgotPassword = useSelector((state: StoreState) => state.ResetPasswordDialog.Show);

	const HideDialogs = () => {
		if (forgotPassword) {
			dispatch(userActions.HideForgotPassword());
		} else {
			dispatch(userActions.HideLogin(false));
		}
	};

	return (
		<Modal
			{...props}
			aria-labelledby="contained-modal-title-vcenter"
			onHide={() => HideDialogs()}
			centered
			id="signInModal"
			dialogClassName="sign-in-modal"
		>
			{forgotPassword ? <ForgotPasswordElement /> : <LoginElement />}
		</Modal>
	);
};
export default SigninModal;
