import { userConstants } from "@Definitions/ActionConsts";

export function Registration(state = {}, action: any) {
    switch (action.type) {
        case userConstants.REGISTER_USER_DETAILS:
            return { PreSignUpUser: action.preUserDetails };
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return { registered: true, emailVerified: false };
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state;
    }
}
