/* eslint-disable @typescript-eslint/camelcase */
import { userConstants, CONSTANT } from "@Definitions/ActionConsts";
// import { Cookies } from '../helpers';
import { userService } from "@Services";
import { alertActions } from ".";
import { billingActions } from "./BillingActions";
// import { billingServices } from './BillingServices';

function preRegisterUserDetails() {
    const preUserDetails = userService.preRegisterUserDetails();
    return { type: userConstants.REGISTER_USER_DETAILS, preUserDetails };
}

function login(username: string, password: string) {
    function request(user: any) {
        return { type: userConstants.LOGIN_REQUEST, user };
    }
    function success(user: any) {
        return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function failure(error: any) {
        return { type: userConstants.LOGIN_FAILURE, error };
    }
    function getAuthenticatedUser(userToken: any) {
        const user = userService.getUser(userToken);
        return { type: userConstants.GET_USER, user };
    }

    return (dispatch: any) => {
        dispatch(request({ username }));

        userService.login(username, password).then(
            user => {
                dispatch(success(user));
                dispatch(getAuthenticatedUser(user));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
}

function getUserSubscription() {
    function request() {
        return { type: userConstants.GET_USER_SUBSCRIPTION_REQUEST };
    }
    function success(user_subscription) {
        return {
            type: userConstants.GET_USER_SUBSCRIPTION_SUCCESS,
            user_subscription,
        };
    }
    function failure(error) {
        return { type: userConstants.GET_USER_SUBSCRIPTION_FAILURE, error };
    }

    return (dispatch: any) => {
        dispatch(request());
        userService.getUserSubscription().then(
            user_subscription => {
                dispatch(success(user_subscription));
                dispatch(billingActions.getPaymentMethod());
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
}
function logout() {
    function RemoveStorage() {
        return { type: userConstants.LOGOUT };
    }
    function removeSubscription() {
        return { type: userConstants.GET_USER_SUBSCRIPTION_REQUEST };
    }
    return (dispatch: any) => {
        // remove user from local storage to log user out
        localStorage.removeItem("user");
        localStorage.removeItem("planData");
        localStorage.removeItem("user_subscription");
        userService.logout();

        dispatch(RemoveStorage());
        dispatch(removeSubscription());
    };
}

function register(user) {
    // const history = useHistory();

    function request(user: any) {
        return { type: userConstants.REGISTER_REQUEST, user };
    }
    function success(user: any) {
        return { type: userConstants.REGISTER_SUCCESS, user };
    }
    function failure(error) {
        return { type: userConstants.REGISTER_FAILURE, error };
    }
    return (dispatch: any) => {
        dispatch(request(user));

        userService.register(user).then(
            user => {
                dispatch(success(user));
                dispatch(alertActions.success("Registration successful"));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };
}

function confirmPasswordReset(username, confirmCode, newPassword) {
    function request() {
        return { type: userConstants.RESET_PASSWORD_CONFIRM_REQUEST };
    }
    function success() {
        return { type: userConstants.RESET_PASSWORD_CONFIRM_SUCCESS };
    }
    function failure(error) {
        return { type: userConstants.RESET_PASSWORD_CONFIRM_FAILURE, error };
    }
    return (dispatch: any) => {
        dispatch(request());
        userService
            .confirmPasswordReset(username, confirmCode, newPassword)
            .then(
                user => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function resendVerificationEmail(user) {
    function request() {
        return { type: userConstants.RESEND_VERIFICATION_EMAIL_REQUEST };
    }
    // eslint-disable-next-line no-shadow
    function success(user: any) {
        return { type: userConstants.RESEND_VERIFICATION_EMAIL_SUCCESS, user };
    }
    function failure(error: any) {
        return { type: userConstants.RESEND_VERIFICATION_EMAIL_FAILURE, error };
    }

    return (dispatch: any) => {
        dispatch(request());
        userService.resendVerificationEmail(user).then(
            // eslint-disable-next-line no-shadow
            user => {
                dispatch(success(user));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
}

function resetPassword(user) {
    function request() {
        return { type: userConstants.RESET_PASSWORD_REQUEST };
    }
    // eslint-disable-next-line no-shadow
    function success(user: any) {
        return { type: userConstants.RESET_PASSWORD_SUCCESS, user };
    }
    function failure(error: any) {
        return { type: userConstants.RESET_PASSWORD_FAILURE, error };
    }
    return (dispatch: any) => {
        dispatch(request());
        userService.resetPassword(user).then(
            // eslint-disable-next-line no-shadow
            user => {
                dispatch(success(user));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
}

function getAuthenticatedStatus() {
    // const emailNotVerifiedFlag = Cookies.get('emailNotVerified') ? Cookies.get('emailNotVerified').toLowerCase() : 'false';

    function request() {
        return { type: userConstants.GET_LOGIN_STATUS };
    }
    function success(user: any) {
        return { type: userConstants.LOGIN_STATUS_SUCCESS, user };
    }
    // function emailNotVerified() {
    // 	return { type: userConstants.LOGIN_STATUS_USER_NOT_VERIFIED };
    // }
    function failure(error: any) {
        localStorage.removeItem("user");
        localStorage.removeItem("user_subscription");
        return { type: userConstants.LOGIN_STATUS_FAILURE, error };
    }
    function getAuthenticatedUser(userToken: any) {
        const user = userService.getUser(userToken);
        return { type: userConstants.GET_USER, user };
    }

    return (dispatch: any) => {
        dispatch(request());

        userService.AuthenticatedStatus().then(
            user => {
                dispatch(success(user));
                dispatch(getAuthenticatedUser(user));
                // if (emailNotVerifiedFlag) {
                // 	dispatch(emailNotVerified());
                // }
            },
            error => dispatch(failure(error))
        );
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ShowLogin(value: any) {
    return { type: userConstants.LOGIN_DIALOG_OPEN };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HideLogin(value: any) {
    return { type: userConstants.LOGIN_DIALOG_CLOSE };
}
function ShowForgotPassword() {
    return { type: userConstants.FORGOT_DIALOG_OPEN };
}
function HideForgotPassword() {
    return { type: userConstants.FORGOT_DIALOG_CLOSE };
}

function ShowCountryDialog() {
    return { type: userConstants.DEFAULT_COUNTRY_DIALOG_OPEN };
}
function HideCountryDialog() {
    return { type: userConstants.DEFAULT_COUNTRY_DIALOG_CLOSE };
}
function HideMenuDropDown(Dropdown?: any) {
    if (Dropdown === "pricing") {
        return { type: CONSTANT.HIDE_PRICING_DROPDOWN };
    }
    return { type: CONSTANT.HIDE_MENU_DROPDOWN };
}
function ShowMenuDropDown(Dropdown?: any) {
    if (Dropdown === "pricing") {
        return { type: CONSTANT.SHOW_PRICING_DROPDOWN };
    }
    return { type: CONSTANT.SHOW_MENU_DROPDOWN };
}
function HideUserMenuDropDown() {
    return { type: CONSTANT.HIDE_USER_DETAILS_DROPDOWN };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ShowUserMenuDropDown(value?: any) {
    return { type: CONSTANT.SHOW_USER_DETAILS_DROPDOWN };
}
function ExpandMainMenu() {
    return { type: CONSTANT.EXPAND_MAIN_MENU };
}
function CollapseMainMenu() {
    return { type: CONSTANT.COLLAPSE_MAIN_MENU };
}

export const userActions = {
    preRegisterUserDetails,
    getUserSubscription,
    login,
    logout,
    register,
    resendVerificationEmail,
    resetPassword,
    confirmPasswordReset,
    ShowLogin,
    ShowForgotPassword,
    HideForgotPassword,
    ShowCountryDialog,
    HideCountryDialog,

    getAuthenticatedStatus,

    HideLogin,
    HideMenuDropDown,
    ShowMenuDropDown,
    ShowUserMenuDropDown,
    HideUserMenuDropDown,
    ExpandMainMenu,
    CollapseMainMenu,
};
