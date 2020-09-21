import { userConstants } from "@Definitions/ActionConsts";

let user;
if (process.browser) {
    user = JSON.parse(localStorage.getItem("user") || "{}");
}

const initialState = user
    ? { authenticated: false, loading: false, user }
    : { authenticated: false, loading: false, user: {} };
export interface AuthenticationState {
    loading: boolean;
    authenticated: boolean;
    confirmPasswordSuccess: boolean;

    resetCodeSent: boolean;
    loggingIn: boolean;
    emailVerifying: boolean;
    emailVerified: boolean;
    user: {};
}
export function Authentication(state = initialState, action: any) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loading: true,
                authenticated: false,

                loggingIn: true,
                user: action.user,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                authenticated: true,
                emailVerified: true,
                loading: false,
                ShowLoginDialog: false,
                user: action.user,
            };
        case userConstants.LOGIN_STATUS_SUCCESS:
            return {
                authenticated: true,
                emailVerified: action.user.emailVerified,
                loading: false,
                ShowLoginDialog: false,
                user: action.user,
            };
        case userConstants.GET_LOGIN_STATUS:
            return { authenticated: false, loading: true, user: {} };

        case userConstants.LOGIN_STATUS_USER_NOT_VERIFIED:
            return {
                authenticated: true,
                emailVerified: false,
                loading: false,
                ShowLoginDialog: false,
                user: action.user,
            };
        case userConstants.RESET_PASSWORD_REQUEST:
            return {
                loading: true,
                resetting: true,
            };
        case userConstants.RESET_PASSWORD_SUCCESS:
            return { resetCodeSent: true, user: action.user };

        case userConstants.RESET_PASSWORD_FAILURE:
            return initialState;

        case userConstants.RESET_PASSWORD_CONFIRM_REQUEST:
            return {
                loading: true,
                updatingPassword: true,
                resetCodeSent: true,
            };
        case userConstants.RESET_PASSWORD_CONFIRM_SUCCESS:
            return { confirmPasswordSuccess: true, resetCodeSent: true };

        case userConstants.RESET_PASSWORD_CONFIRM_FAILURE:
            return {
                resetCodeSent: true,
            };

        case userConstants.LOGIN_FAILURE:
            return initialState;
        case userConstants.LOGIN_STATUS_FAILURE:
            return initialState;
        case userConstants.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

// export interface ResendVerificationState {

// }
export interface ResendVerificationState {
    emailVerifying: boolean;
    emailVerified: boolean;
    authenticated: boolean;
}
export function ResendVerification(
    state = { emailVerifying: false },
    action: any
) {
    switch (action.type) {
        case userConstants.RESEND_VERIFICATION_EMAIL_REQUEST:
            return {
                emailVerifying: true,
                emailVerified: false,
                authenticated: true,
            };
        case userConstants.RESEND_VERIFICATION_EMAIL_SUCCESS:
            return {
                emailVerifying: false,
                authenticated: true,
                emailVerified: false,
            };
        case userConstants.RESEND_VERIFICATION_EMAIL_FAILURE:
            return {
                emailVerifying: false,
                authenticated: true,
                emailVerified: false,
            };
        default:
            return state;
    }
}
