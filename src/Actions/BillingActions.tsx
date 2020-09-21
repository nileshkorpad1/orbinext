/* eslint-disable no-use-before-define */
import { billingConstants } from "@Definitions/ActionConsts";
import { billingServices } from "@Services";
import { alertActions } from ".";

// import { history } from '../helpers';

function initSubscription() {
    return (dispatch: any) => {
        billingServices.initSubscription().then(
            () => {
                billingServices.initSubscription().then(
                    createSubscription => {
                        dispatch(success(createSubscription));
                        dispatch(
                            alertActions.success(
                                "Subscription initialized successfully"
                            )
                        );
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                );
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function success(defaultSubscriptionObj: any) {
        return {
            type: billingConstants.SUBSCRIPTION_PURCHASE_SUCCESS,
            defaultSubscriptionObj,
        };
    }
    function failure(error: any) {
        return { type: billingConstants.SUBSCRIPTION_PURCHASE_FAILURE, error };
    }
}

function putSubscription(subscriptionDetails: any) {
    return (dispatch: any) => {
        billingServices.putSubscription(subscriptionDetails).then(
            createSubscription => {
                dispatch(success(createSubscription));
                dispatch(alertActions.success("Plan upgraded successfully"));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function success(successSubscription: any) {
        return {
            type: billingConstants.SUBSCRIPTION_PURCHASE_SUCCESS,
            successSubscription,
        };
    }
    function failure(error: any) {
        return { type: billingConstants.SUBSCRIPTION_PURCHASE_FAILURE, error };
    }
}
function setupIntent() {
    return (dispatch: any) => {
        dispatch(request());
        billingServices.setupIntent().then(
            getSetupIntent => {
                dispatch(success(getSetupIntent));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return { type: billingConstants.SUBSCRIPTION_PURCHASE_REQUEST };
    }
    function success(billingSetupIntent: any) {
        return {
            type: billingConstants.BILLING_INTENT_SUCCESS,
            billingSetupIntent,
        };
    }
    function failure(error: any) {
        return { type: billingConstants.BILLING_INTENT_FAILURE, error };
    }
}

function createPaymentMethod(cardDetails: string) {
    return dispatch => {
        billingServices.createPaymentMethod(cardDetails).then(
            createPaymentMethod => {
                dispatch(success(createPaymentMethod));
                return createPaymentMethod;
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function success(createPaymentMethod) {
        return {
            type: billingConstants.CREATE_PAYMENT_METHOD_SUCCESS,
            createPaymentMethod,
        };
    }
    function failure(error) {
        return { type: billingConstants.SUBSCRIPTION_PURCHASE_FAILURE, error };
    }
}

function getPaymentMethod() {
    return dispatch => {
        billingServices.getPaymentMethod().then(
            existingPaymentMethod => {
                dispatch(success(existingPaymentMethod));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    // function request() {
    // 	return { type: billingConstants.PAYMENT_METHOD_REQUEST };
    // }
    function success(PaymentMethod) {
        return { type: billingConstants.PAYMENT_METHOD_SUCCESS, PaymentMethod };
    }

    function failure(error) {
        return { type: billingConstants.PAYMENT_METHOD_FAILURE, error };
    }
}

function CouponCheck(couponCode: any) {
    return dispatch => {
        dispatch(request(couponCode));
        billingServices.CouponCheck(couponCode).then(
            checkCouponCode => {
                dispatch(success(checkCouponCode));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request(couponCode) {
        return { type: billingConstants.VALID_COUPON_REQUEST, couponCode };
    }
    function success(checkCouponCode) {
        return { type: billingConstants.VALID_COUPON_SUCCESS, checkCouponCode };
    }
    function failure(error) {
        return { type: billingConstants.SUBSCRIPTION_PURCHASE_FAILURE, error };
    }
}

function CouponRedeem(couponCode) {
    return dispatch => {
        billingServices.CouponRedeem(couponCode).then(
            appliedCouponCode => {
                dispatch(success(appliedCouponCode));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function success(appliedCouponCode) {
        return { type: billingConstants.APPLIED_COUPON, appliedCouponCode };
    }
    function failure(error) {
        return { type: billingConstants.SUBSCRIPTION_PURCHASE_FAILURE, error };
    }
}
function RemoveCoupon() {
    return { type: billingConstants.REMOVE_COUPON };
}
function createBillingAddress(BillingAddress: any) {
    return dispatch => {
        billingServices.createBillingAddress(BillingAddress).then(
            billingSuccess => {
                dispatch(success(billingSuccess));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function success(billingSuccess) {
        return { type: billingConstants.BILLING_ADDRESS_SUCCESS };
    }
    function failure(error: string) {
        return { type: billingConstants.BILLING_ADDRESS_FAILURE, error };
    }
}

export const billingActions = {
    initSubscription, // Calls only once during tenant creation
    putSubscription, // Put Subscription
    setupIntent,
    createPaymentMethod,
    getPaymentMethod,
    // deletePaymentMethod,
    CouponCheck,
    CouponRedeem,
    RemoveCoupon,
    // getBillingAddress,
    createBillingAddress,
};
