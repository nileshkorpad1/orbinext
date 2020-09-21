import { alertConstants } from "@Definitions/ActionConsts";

export interface AlertState {
    type: string;
    message: string;
}
export function alert(state = {}, action: { type: any; message: any }) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: "success",
                message: action.message,
            };
        case alertConstants.ERROR:
            return {
                type: "danger",
                message: action.message,
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}
