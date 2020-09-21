/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-unresolved
import planDataJson from "@Definitions/data/plans.json";

export const planService = {
    // eslint-disable-next-line prettier/prettier
    productPlansDetails,
    userPlanStatus,
    getCampaignPlan,
};
// const productsPlansURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/anonymous/subengine/plans?Version=v2&Product=`;
const userPlanStatusURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/subengine/subscription?Version=v2`;
const campaignPlanURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/anonymous/subengine/plan?pid=`;

function productPlansDetails() {
    const AIO = planDataJson.all;
    const ERP = planDataJson.erp;
    const CRM = planDataJson.crm;
    const PEOPLE = planDataJson.people;
    return [AIO, CRM, ERP, PEOPLE];
}

function userPlanStatus() {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    return fetch(userPlanStatusURL, requestOptions)
        .then(handleResponse)
        .then(userPlanStatusData => {
            return userPlanStatusData;
        });
}

function getCampaignPlan(pid: string) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    return fetch(campaignPlanURL + pid, requestOptions)
        .then(handleResponse)
        .then(campaignPlanData => {
            return campaignPlanData;
        });
}

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // location.reload(true);
            }
            const error = (data && data.errorMessage) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
