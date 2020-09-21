/* eslint-disable no-use-before-define */
import { pricingConstants } from "@Definitions/ActionConsts";
import { planService } from "@Services";

// function productPlansDetails(productName) {
// 	let productPlansData = planService.productPlansDetails();
// 	return productPlansData;
// }

function userPlanStatus() {
    const userPlansStatus = planService.userPlanStatus();
    return { type: "USER_PLAN_STATUS_DETAILS", userPlansStatus };
}
function getProductPlans() {
    return (dispatch: any) => {
        dispatch(request());
        Promise.all(planService.productPlansDetails()).then(
            plans => {
                dispatch(success(plans));
            },
            error => dispatch(failure(error))
        );
    };

    function request() {
        return { type: pricingConstants.GET_PRICING_DETAILS };
    }
    function success(plans: any) {
        const Allplans = {
            all: plans[0],
            crm: plans[1],
            erp: plans[2],
            people: plans[3],
        };

        return { type: pricingConstants.PRICING_DETAILS_SUCCESS, Allplans };
    }
    function failure(error: any) {
        return { type: pricingConstants.PRICING_DETAILS_FAILURE, error };
    }
}

function getCampaignPlan(pid: any) {
    return (dispatch: any) => {
        dispatch(request());
        planService.getCampaignPlan(pid).then(
            campaignPlan => {
                dispatch(success(campaignPlan));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function request() {
        return { type: pricingConstants.GET_CAMPAIGN_PRICING_REQUEST };
    }
    function success(campaignPlan: any) {
        return {
            type: pricingConstants.GET_CAMPAIGN_PRICING_SUCCESS,
            campaignPlan,
        };
    }
    function failure(error: any) {
        return { type: pricingConstants.GET_CAMPAIGN_PRICING_FAILURE, error };
    }
}
export const planActions = {
    // productPlansDetails,
    userPlanStatus,
    getProductPlans,
    getCampaignPlan,
};
