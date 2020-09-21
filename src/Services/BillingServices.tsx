import { authHeader } from '../helpers';

export const billingServices = {
	initSubscription,
	getSubscription,
	putSubscription,
	setupIntent,
	createPaymentMethod,
	getPaymentMethod,
	deletePaymentMethod,
	CouponCheck,
	CouponRedeem,
	getBillingAddress,
	createBillingAddress,
};
const Subscription = `${process.env.REACT_APP_API_ENDPOINT}/v1/subengine/subscription`; // POST, GET, PUT
const SetupIntent = `${process.env.REACT_APP_API_ENDPOINT}/v1/subengine/billing/setupintent`; // POST
const PaymentMethod = `${process.env.REACT_APP_API_ENDPOINT}/v1/subengine/billing/paymentmethod`; // POST , GET , DELETE
const CheckCoupon = `${process.env.REACT_APP_API_ENDPOINT}/v1/anonymous/subengine/coupon/checkext`; // POST
const RedeemCoupon = `${process.env.REACT_APP_API_ENDPOINT}/v1/subengine/coupon/redeem`; // POST
const BillingAddress = `${process.env.REACT_APP_API_ENDPOINT}/v1/subengine/billing/address`; // GET, POST

// Call this function to validate user token without body before PUT the subscription details
function initSubscription() {
	return fetch(Subscription, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(handleResponse)
		.then((defaultSubscriptionObj) => {
			return defaultSubscriptionObj;
		});
}
function getSubscription() {
	return fetch(Subscription, {
		credentials: 'include',
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	})
		.then(handleResponse)
		.then((existingSubscription) => {
			return existingSubscription;
		});
}

function putSubscription(subscriptionDetails: any) {
	return fetch(Subscription, {
		credentials: 'include',
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(subscriptionDetails),
	})
		.then(handleResponse)
		.then((createSubscription) => {
			return createSubscription;
		});
}

// Create Payment Setup Intent in Stripe without body
function setupIntent() {
	return fetch(SetupIntent, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	})
		.then(handleResponse)
		.then((getSetupIntentDetails) => {
			return getSetupIntentDetails;
		});
}

// Get a paymentMethodID from PostSetupIntent response
function createPaymentMethod(paymentMethodID: string) {
	return fetch(PaymentMethod, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ PaymentMethodID: paymentMethodID }),
	})
		.then(handleResponse)
		.then((createPaymentMethod) => {
			return createPaymentMethod;
		});
}

function getPaymentMethod() {
	return fetch(PaymentMethod, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	})
		.then(handleResponse)
		.then((getPaymentMethodDetails) => {
			return getPaymentMethodDetails;
		});
}

function deletePaymentMethod(paymentMethodID: string) {
	return fetch(PaymentMethod, {
		credentials: 'include',
		method: 'DELETE',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ PaymentMethodID: paymentMethodID }),
	})
		.then(handleResponse)
		.then((deletePaymentMethod) => {
			return deletePaymentMethod;
		});
}

function CouponCheck(couponCode: any) {
	return fetch(CheckCoupon, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ Code: couponCode }),
	})
		.then(handleResponse)
		.then((checkCouponDetails) => {
			return checkCouponDetails;
		});
}

function CouponRedeem(couponCode: any) {
	return fetch(RedeemCoupon, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ Code: couponCode }),
	})
		.then(handleResponse)
		.then((redeemCoupon) => {
			return redeemCoupon;
		});
}
function getBillingAddress() {
	return fetch(BillingAddress, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	})
		.then(handleResponse)
		.then((getBillingAddressDetails) => {
			return getBillingAddressDetails;
		});
}

function createBillingAddress(billingAddress: any) {
	return fetch(BillingAddress, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ billingAddress }),
	})
		.then(handleResponse)
		.then((addBillingAddress) => {
			return addBillingAddress;
		});
}
function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				//logout();
				// location.reload(true);
			}
			const error = (data && data.errorMessage) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
