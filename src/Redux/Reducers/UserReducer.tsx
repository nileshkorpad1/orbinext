import { userConstants } from "@Definitions/ActionConsts";

export interface UserState {
    ShowLoginDialog: boolean;
    user: any;
}
export function UserReducer(state = {}, action: any) {
    switch (action.type) {
        case userConstants.GET_USER:
            return {
                ShowLoginDialog: false,
                user: action.user,
            };
        case userConstants.LOGIN_DIALOG_OPEN:
            // add 'deleting:true' property to user being deleted
            return {
                ShowLoginDialog: true,
            };
        case userConstants.LOGIN_DIALOG_CLOSE:
            // add 'deleting:true' property to user being deleted
            return {
                ShowLoginDialog: false,
            };
        default:
            return state;
    }
}
export interface PasswordResetDialogState {
    Show: boolean;
}
export function PasswordResetDialogReducer(state = {}, action: any) {
    switch (action.type) {
        case userConstants.FORGOT_DIALOG_OPEN:
            return {
                Show: true,
            };
        case userConstants.FORGOT_DIALOG_CLOSE:
            return {
                Show: false,
            };
        default:
            return state;
    }
}

export interface CountryDialogState {
    Show: boolean;
}
export function CountryDialogReducer(state = {}, action: any) {
    switch (action.type) {
        case userConstants.DEFAULT_COUNTRY_DIALOG_OPEN:
            return {
                Show: true,
            };
        case userConstants.DEFAULT_COUNTRY_DIALOG_CLOSE:
            return {
                Show: false,
            };
        default:
            return state;
    }
}
