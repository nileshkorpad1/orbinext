// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
import { alert } from "./AlertReducer";
import ApplicationReducer from "./AppReducer";
import { Authentication, ResendVerification } from "./AuthenticationReducer";
import { DurationReducer, planReducer } from "./PlanReducer";
import ProductReducer from "./ProductReducer";
import { Registration } from "./RegistrationReducer";
import {
    UserReducer,
    PasswordResetDialogReducer,
    CountryDialogReducer,
} from "./UserReducer";
import { BillingReducer, PaymentMethodReducer } from "./BillingReducer";
// #endregion Local Imports

const BillingReducers = combineReducers({
    user_subscription: BillingReducer,
    payment_method: PaymentMethodReducer,
});

const rootReducer = combineReducers({
    App: ApplicationReducer,
    Pricing: planReducer,
    Duration: DurationReducer,
    Product: ProductReducer,
    Users: UserReducer,
    ResetPasswordDialog: PasswordResetDialogReducer,
    CountryDialogReducer,
    alert,
    authentication: Authentication,
    resendVerification: ResendVerification,
    billing: BillingReducers,
    registration: Registration,
});

export default rootReducer;
