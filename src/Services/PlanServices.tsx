import planDataJson from '@components/data/plans.json';

export const planService = {
	productPlansDetails,
	userPlanStatus,
	getCampaignPlan,
};
// const productsPlansURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/anonymous/subengine/plans?Version=v2&Product=`;
const userPlanStatusURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/subengine/subscription?Version=v2`;
const campaignPlanURL = `${process.env.REACT_APP_API_ENDPOINT}/v1/anonymous/subengine/plan?pid=`;

function productPlansDetails() {
	/*const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};
	let AIO = fetch(productsPlansURL + 'AIO', requestOptions)
		.then(handleResponse)
		.then((allPlans) => {
			return allPlans;
		});
	let CRM = fetch(productsPlansURL + 'CRM', requestOptions)
		.then(handleResponse)
		.then((allPlans) => {
			return allPlans;
		});
	let ERP = fetch(productsPlansURL + 'ERP', requestOptions)
		.then(handleResponse)
		.then((allPlans) => {
			return allPlans;
		});
	let PEOPLE = fetch(productsPlansURL + 'PEOPLE', requestOptions)
		.then(handleResponse)
		.then((allPlans) => {
			return allPlans;
		});*/
	let AIO = planDataJson['all'];
	let ERP = planDataJson['erp'];
	let CRM = planDataJson['crm'];
	let PEOPLE = planDataJson['people'];
	return [AIO, CRM, ERP, PEOPLE];
}

function userPlanStatus() {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};

	return fetch(userPlanStatusURL, requestOptions)
		.then(handleResponse)
		.then((userPlanStatusData) => {
			return userPlanStatusData;
		});
}

function getCampaignPlan(pid) {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};

	return fetch(campaignPlanURL + pid, requestOptions)
		.then(handleResponse)
		.then((campaignPlanData) => {
			return campaignPlanData;
		});
}

function handleResponse(response) {
	return response.text().then((text) => {
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
