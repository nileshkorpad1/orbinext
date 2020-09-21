import { CONSTANT } from "@Definitions/ActionConsts";
import { combineReducers } from "redux";

export interface AppReducerState {
    appReducer: {
        isConnected: boolean;
        isFirstVisit: boolean;
    };
    AppActions: {
        showMenuDropdown: boolean;
        showPricingDropdown: boolean;
        showUserDetailsDropdown: boolean;
        ExpandMainMenu: boolean;
    };
}
const initialState = {
    isConnected: true,
    isFirstVisit: true,
};

function appReducer(state = initialState, action: any) {
    switch (action.type) {
        case CONSTANT.UPDATE_CONNECTIVITY:
            return {
                ...state,
                action,
            };
        case CONSTANT.FINISH_FIRST_VISIT:
            return {
                ...state,
                isFirstVisit: false,
            };
        default:
            return state;
    }
}
function showMenuDropdown(state = false, action: any) {
    switch (action.type) {
        case CONSTANT.SHOW_MENU_DROPDOWN:
            return true;
        case CONSTANT.HIDE_MENU_DROPDOWN:
            return false;
        default:
            return state;
    }
}
function showPricingDropdown(state = false, action: any) {
    switch (action.type) {
        case CONSTANT.SHOW_PRICING_DROPDOWN:
            return true;
        case CONSTANT.HIDE_PRICING_DROPDOWN:
            return false;
        default:
            return state;
    }
}
function showUserDetailsDropdown(state = false, action: any) {
    switch (action.type) {
        case CONSTANT.SHOW_USER_DETAILS_DROPDOWN:
            return true;
        case CONSTANT.HIDE_USER_DETAILS_DROPDOWN:
            return false;
        default:
            return state;
    }
}
function ExpandMainMenu(state = false, action: any) {
    switch (action.type) {
        case CONSTANT.EXPAND_MAIN_MENU:
            return true;
        case CONSTANT.COLLAPSE_MAIN_MENU:
            return false;
        default:
            return state;
    }
}
const AppActions = combineReducers({
    showMenuDropdown,
    showPricingDropdown,
    showUserDetailsDropdown,
    ExpandMainMenu,
});
const ApplicationReducer = combineReducers({
    appReducer,
    AppActions,
});

export default ApplicationReducer;
