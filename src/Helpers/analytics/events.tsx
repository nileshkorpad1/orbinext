import { Cookies, isEmpty } from '@Helpers';
import MatomoTracker from 'matomo-tracker';
import TagManager from 'react-gtm-module';

export const Analytics = {
	initMatomo,
	initGoogleGTM,
	PushMatomoDataLayer,

	PushGoogleGTMDataLayer,
};
function PushMatomoDataLayer(args) {
	if (!isEmpty(args.currentActivePlan)) {
		const { productName, Name } = args.currentActivePlan;
		const { email, tenantId, pathname, search } = args;
		const DefaultCountry = Cookies.get('_default-country') ? JSON.parse(Cookies.get('_default-country')) : null;
		let CountryISOLowerD = '';
		let CountryName = '';
		if (!isEmpty(DefaultCountry)) {
			CountryISOLowerD = !isEmpty(DefaultCountry['country']['iso_code']) ? DefaultCountry['country']['iso_code'].toLowerCase() : '';
			CountryName = !isEmpty(DefaultCountry['country']['names']) ? DefaultCountry['country']['names']['en'] : '';
		}
		const matomo = new MatomoTracker(process.env.REACT_APP_MATOMO_SITE_ID, process.env.REACT_APP_MATOMO_URL);
		const PlanName = `${productName} ${Name} Plan`;
		const webURL = process.env.REACT_APP_WEB_URL + pathname + search;
		// console.log(userId)
		matomo.track({
			url: webURL,
			action_name: 'User Signed In',
			// email: email,
			uid: email,
			dimension1: PlanName,
			dimension2: tenantId,
			dimension3: webURL,
			dimension4: CountryName,
			cvar: JSON.stringify({
				'1': ['PlanName', PlanName],
				'2': ['tenantId', tenantId],
				'3': ['canonical', webURL],
				'4': ['location', CountryName],
				'5': ['location_iso', CountryISOLowerD],
			}),
		});
	}
}
function PushGoogleGTMDataLayer(args) {
	const { userId, tenantId, pathname, search } = args;
	const webURL = process.env.REACT_APP_WEB_URL + pathname + search;
	const tagManagerArgs = {
		gtmId: `${process.env.REACT_APP_GTM_TRACKING_ID}`,
		dataLayer: {
			userId: userId ? userId : '',
			tenantId: tenantId ? tenantId : '',
			pagePath: webURL,
		},
	};
	TagManager.initialize(tagManagerArgs);
}
function initMatomo() {
	const matomo = new MatomoTracker(process.env.REACT_APP_MATOMO_SITE_ID, process.env.REACT_APP_MATOMO_URL);
	const pathname = window.location.pathname;
	const search = window.location.search;
	const webURL = process.env.REACT_APP_WEB_URL + pathname + search;
	matomo.track({
		url: webURL,
		action_name: 'Page Visited',
		cvar: JSON.stringify({
			'1': ['canonical', webURL],
		}),
	});
}

function initGoogleGTM() {
	const pathname = window.location.pathname;
	const search = window.location.search;
	const webURL = process.env.REACT_APP_WEB_URL + pathname + search;
	const tagManagerArgs = {
		gtmId: `${process.env.REACT_APP_GTM_TRACKING_ID}`,
		dataLayer: {
			pagePath: webURL,
		},
	};
	TagManager.initialize(tagManagerArgs);
}
