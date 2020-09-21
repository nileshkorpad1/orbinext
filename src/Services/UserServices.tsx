import jwt from 'jwt-decode';
import fetch from 'isomorphic-unfetch'

import { authHeader, Cookies } from '../helpers';

export const userService = {
	preRegisterUserDetails,
	login,
	logout,
	register,
	resendVerificationEmail,
	resetPassword,
	confirmPasswordReset,
	getUser,
	AuthenticatedStatus,
	getUserSubscription,
	update,
	getCurrentLocation,
};
const SignInURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/iam/auth/sign-in/web/sign-in`;
const StatusURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/iam/auth/sign-in/login/status`;
const ResendEmail = `${process.env.REACT_APP_API_ENDPOINT}/v1/iam/auth/email/regenerate`;
const ResetPasswordURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/iam/auth/password/forgot`;
const ConfirmPasswordURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/iam/auth/password/confirm`;
const SignupURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/iam/auth/sign-up/web`;
//const SignupAnonymousURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/anonymous/auth/register`;
const LogoutURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/iam/auth/logout`;
const subscriptionURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/subengine/subscription?Version=v2`;
const LocationURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/ws/shop/location`;
function login(username, password) {
	return fetch(SignInURL, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userName: username, password: password }),
	})
		.then(handleResponse)
		.then((user) => {
			Cookies.set('emailNotVerified', '', 1);
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('user', JSON.stringify(user));

			return user;
		});
}

function logout() {
	return fetch(LogoutURL, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
		.then(handleResponse)
		.then((user) => {
			return user;
		});
}

function getUser(user?) {
	if (typeof user == 'undefined' && process.browser) {
		user = JSON.parse(localStorage.getItem('user'));
	}
	if (user && user.idToken !== '' && user.idToken) {
		return jwt(user.idToken);
	} else {
		return;
	}
}

function AuthenticatedStatus() {
	return fetch(StatusURL, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
		.then(handleResponse)
		.then((user) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('user', JSON.stringify(user));

			return user;
		});
}

function resetPassword(username) {
	return fetch(ResetPasswordURL, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({ userName: username }),
	})
		.then(handleResponse)
		.then((user) => {
			return { userName: username };
		});
}

function confirmPasswordReset(username, confirmCode, newPassword) {
	return fetch(ConfirmPasswordURL, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({ userName: username, confirmationCode: confirmCode, password: newPassword }),
	})
		.then(handleResponse)
		.then((user) => {
			return user;
		});
}

function register(user) {
	return fetch(SignupURL, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	})
		.then(handleResponse)
		.then((user) => {
			Cookies.set('emailNotVerified', true, 1);
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('user_signup_details', JSON.stringify(user));

			return user;
		});
}

function preRegisterUserDetails() {
	if (process.browser) {
	const userSignupDetails = JSON.parse(localStorage.getItem('user_signup_details'));
	return userSignupDetails;
	}
	else{
		return ;
	}
}

function getUserSubscription() {
	// let UserPaymentMethod= billingServices;
	let UserSubscription = fetch(subscriptionURL, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(handleResponse)
		.then((user_subscription) => {
			const current_plan = getCurrentPlanName(user_subscription);
			user_subscription = { ...user_subscription, ...{ currentActivePlan: current_plan } };
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('user_subscription', JSON.stringify(user_subscription));
			return user_subscription;
		});
	return UserSubscription;
	function getCurrentPlanName(userSubscription) {
		const allPlan = userSubscription && userSubscription.AIOPlan;
		const crmPlan = userSubscription && userSubscription.CRMPlan;
		const erpPlan = userSubscription && userSubscription.ERPPlan;
		const peoplePlan = userSubscription && userSubscription.PeoplePlan;
		let currentPlan = [];
		if (allPlan && allPlan.Name) {
			currentPlan = allPlan;
			currentPlan['productName'] = 'All-in-One';
			currentPlan['productURL'] = `${process.env.REACT_APP_PRODUCT_GO}`;
			currentPlan['productDestination'] = 'Dashboard';
		}
		if (crmPlan && crmPlan.Name) {
			currentPlan = crmPlan;
			currentPlan['productName'] = 'Sales';
			currentPlan['productURL'] = `${process.env.REACT_APP_PRODUCT_SALES}`;
			currentPlan['productDestination'] = 'Sales';
		}
		if (erpPlan && erpPlan.Name) {
			currentPlan = erpPlan;
			currentPlan['productName'] = 'Books';
			currentPlan['productURL'] = `${process.env.REACT_APP_PRODUCT_BOOKS}`;
			currentPlan['productDestination'] = 'Books';
		}
		if (peoplePlan && peoplePlan.Name) {
			currentPlan = peoplePlan;
			currentPlan['productName'] = 'People';
			currentPlan['productURL'] = `${process.env.REACT_APP_PRODUCT_PEOPLE}`;
			currentPlan['productDestination'] = 'People';
		}
		return currentPlan;
	}
}

function update(user) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};

	return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

function resendVerificationEmail(user) {
	let email = '';
	if (user) {
		email = encodeURIComponent(user.email);
	}
	return fetch(`${ResendEmail}?email=${email}`, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
		.then(handleResponse)
		.then((sendEmail) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes

			return sendEmail;
		});
}

function getCurrentLocation() {
	return fetch(LocationURL)
    .then(handleResponse)
    .then((location) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return location
    })
    .catch(function (error) {
      console.log(error)
    });
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				// location.reload(true);
			}

			const error = (data && data.errorMessage) || response.statusText;

			return Promise.reject(error);
		}

		return data;
	});
}
