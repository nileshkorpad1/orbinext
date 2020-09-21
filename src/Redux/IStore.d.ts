import Plan from "@Interfaces";
import { AppReducerState } from "./Reducers/AppReducer";
import {
    CountryDialogState,
    PasswordResetDialogState,
    UserState,
} from "./Reducers/UserReducer";
import { BillingState } from "./Reducers/BillingReducer";
import { DurationState } from "./Reducers/PlanReducer";
import {
    AuthenticationState,
    ResendVerificationState,
} from "./Reducers/AuthenticationReducer";
import { AlertState } from "./Reducers/AlertReducer";

export interface StoreState {
    App: AppReducerState;
    CountryDialogReducer: CountryDialogState;
    ResetPasswordDialog: PasswordResetDialogState;
    Users: UserState;
    Pricing: {
        getPlans: boolean;
        getCampaignPlan: any;
        plans: {
            all: Plan;
            erp: Plan;
            crm: Plan;
            people: Plan;
        };
    };
    billing: {
        user_subscription: BillingState;
        payment_method: any;
    };

    Product: string;

    Duration: DurationState;
    authentication: AuthenticationState;

    alert: AlertState;

    registration: any;

    resendVerification: ResendVerificationState;
}
