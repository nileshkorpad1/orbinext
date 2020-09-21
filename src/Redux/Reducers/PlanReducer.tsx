import { pricingConstants } from "@Definitions/ActionConsts";

export interface DurationState {
    monthly: boolean;
    yearly: boolean;
}
export const DurationReducer = (
    state = { monthly: false, yearly: true },
    action: any
) => {
    const newState = { ...state };
    if (action.type === "Duration") {
        // eslint-disable-next-line default-case
        switch (action.Duration) {
            case "MONTHLY":
                return { monthly: true, yearly: false };
            case "YEARLY":
                return { monthly: false, yearly: true };
        }
    }
    return newState;
};
export function planReducer(state = {}, action: any) {
    switch (action.type) {
        case pricingConstants.GET_PRICING_DETAILS:
            return { loading: true, getPlans: false };
        case pricingConstants.PRICING_DETAILS_SUCCESS:
            return { getPlans: true, plans: action.Allplans };
        case pricingConstants.PRICING_DETAILS_FAILURE:
            return {};
        case pricingConstants.GET_CAMPAIGN_PRICING_REQUEST:
            return { getCampaignPlan: "" };
        case pricingConstants.GET_CAMPAIGN_PRICING_SUCCESS:
            return { getCampaignPlan: action.campaignPlan };
        case pricingConstants.GET_CAMPAIGN_PRICING_FAILURE:
            return {};
        default:
            return state;
    }
}
