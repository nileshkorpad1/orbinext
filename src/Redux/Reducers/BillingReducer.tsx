import { billingConstants, userConstants } from "@Definitions/ActionConsts";

export interface ProductLimits {
    Code: string;
    FreeUserCount: number;
    AddonCharge: number;
}

export interface Addons {
    Description: string;
    Code: string;
    Items: {
        Name: string;
        Values: any;
        Code: string;
    };
}
export interface Plan {
    Name: string;
    PlanID: string;
    PrevPlanID: string;
    Interval: string;
    Amount: number;
    TrialDays: number;
    Currency: string;
    InTrial: boolean;
    TrialOver: boolean;
    UpdatedOn: string;
    Addons: Addons;
    productName: string;
}

export interface BillingState {
    Status: string;
    ProductLimits: ProductLimits;
    BKUserID: string;
    IsBookkeeper: boolean;
    BKTenantID: string;
    CardAvailable: boolean;
    DiscountCoupons: any;
    AIOPlan: Plan;
    CRMPlan: Plan;
    ERPPlan: Plan;
    PeoplePlan: Plan;
    PrepaidCoupons: any;
    CustomPlan: Plan;
    NextChargeDate: string;
    couponValidating: boolean;
    validateCouponCode: any;
    paymentMethodSuccess: boolean;
    subscribing: boolean;
    couponLoading: boolean;
    successSubscription: any;
    billingSetupIntent: any;
    currentActivePlan: Plan;
}
export const BillingReducer = (state = "", action: any) => {
    const newState = state;
    // eslint-disable-next-line default-case
    switch (action.type) {
        case billingConstants.SUBSCRIPTION_PURCHASE_REQUEST:
            return { subscribing: true };
        case billingConstants.BILLING_INTENT_SUCCESS:
            return {
                subscribing: true,
                billingSetupIntent: action.billingSetupIntent,
            };
        case billingConstants.BILLING_INTENT_FAILURE:
            return {};
        case billingConstants.VALID_COUPON_REQUEST:
            return { couponLoading: true };
        case billingConstants.VALID_COUPON_SUCCESS:
            return {
                couponValidating: true,
                validateCouponCode: action.checkCouponCode,
            };
        case billingConstants.REMOVE_COUPON:
            return { couponValidating: false, validateCouponCode: "" };

        case billingConstants.CREATE_PAYMENT_METHOD_SUCCESS:
            return { subscribing: true, paymentMethodSuccess: true };
        case billingConstants.SUBSCRIPTION_PURCHASE_SUCCESS:
            return { successSubscription: action.successSubscription };
        case billingConstants.SUBSCRIPTION_PURCHASE_FAILURE:
            return {};
        case userConstants.GET_USER_SUBSCRIPTION_REQUEST:
            return {};
        case userConstants.GET_USER_SUBSCRIPTION_SUCCESS:
            return action.user_subscription;
        case userConstants.GET_USER_SUBSCRIPTION_FAILURE:
            return {};
    }
    return newState;
};

export interface PaymentMethodState {
    loadingPayment: boolean;
    createPaymentMethod: any;
}
export const PaymentMethodReducer = (state = {}, action: any) => {
    switch (action.type) {
        case billingConstants.PAYMENT_METHOD_REQUEST:
            return {
                loadingPayment: true,
            };
        case billingConstants.PAYMENT_METHOD_SUCCESS:
            // add 'deleting:true' property to user being deleted
            return action.PaymentMethod;

        case billingConstants.PAYMENT_METHOD_FAILURE:
            // add 'deleting:true' property to user being deleted
            return {};
        default:
            return state;
    }
};
