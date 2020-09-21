import React from 'react';
import Intercom from 'react-intercom';
import { useSelector } from 'react-redux';
import { isEmpty } from '@Helpers';
import { StoreState } from '@store/types';

const IntercomChat = props => {
	const isAuthenticated = useSelector((state:StoreState) => state.authentication.authenticated);
	const userSubscription = useSelector((state:StoreState) => state.billing.user_subscription);
	const payment_method = useSelector((state:StoreState) => state.billing.payment_method);
	const UserDetails = useSelector((state:StoreState) => state.Users.user);
	let user = {};
	let payment_available = false;
	if (typeof payment_method.Cards !== 'undefined') {
		if (payment_method.Cards !== null) {
			payment_available = true;
		}
	}
	if (isAuthenticated && !isEmpty(UserDetails)) {
		user = {
			user_id: UserDetails.userId,
			email: UserDetails.email,
			name: UserDetails.name,
		};
	}

	if (
		isAuthenticated &&
		!isEmpty(UserDetails) &&
		!isEmpty(userSubscription.ERPPlan) &&
		!isEmpty(userSubscription.AIOPlan) &&
		!isEmpty(userSubscription.PeoplePlan) &&
		!isEmpty(userSubscription.CRMPlan) &&
		userSubscription
	) {
		user = {
			user_id: UserDetails.userId,
			email: UserDetails.email,

			phone: UserDetails.phone_number ? UserDetails.phone_number : '',
			name: UserDetails.name,
			company: {
				company_id: UserDetails.tenantId ? UserDetails.tenantId : '',
				name: UserDetails.website ? UserDetails.website : '',
				'Books Plan': userSubscription.ERPPlan ? userSubscription.ERPPlan.Name : '',
				'People Plan': userSubscription.PeoplePlan ? userSubscription.PeoplePlan.Name : '',
				'Sales Plan': userSubscription.CRMPlan ? userSubscription.CRMPlan.Name : '',
				'AIO Plan': userSubscription.AIOPlan ? userSubscription.AIOPlan.Name : '',
				'CustomPlan Plan': userSubscription.AIOPlan ? userSubscription.AIOPlan.Name : '',
				'Mobile Only Plan': '', //TODO once available update
				'Trial Completed':
					userSubscription.ERPPlan.TrialOver === true ||
					userSubscription.PeoplePlan.TrialOver === true ||
					userSubscription.CRMPlan.TrialOver === true ||
					userSubscription.AIOPlan.TrialOver === true
						? 'true'
						: 'false',
				'Books Plan Type':
					userSubscription.PrepaidCoupons.length > 0 &&
					userSubscription.PrepaidCoupons[0].Type &&
					userSubscription.PrepaidCoupons[0].Type === 'prepaid' &&
					userSubscription.PrepaidCoupons[0].Products.some(el => el.Name === 'ERP')
						? 'Prepaid'
						: userSubscription.ERPPlan.Name && payment_available
						? 'Paid'
						: userSubscription.ERPPlan.InTrial === true
						? 'Trial'
						: '',
				'People Plan Type':
					userSubscription.PrepaidCoupons.length > 0 &&
					userSubscription.PrepaidCoupons[0].Type &&
					userSubscription.PrepaidCoupons[0].Type === 'prepaid' &&
					userSubscription.PrepaidCoupons[0].Products.some(el => el.Name === 'PEOPLE')
						? 'Prepaid'
						: userSubscription.PeoplePlan.Name && payment_available
						? 'Paid'
						: userSubscription.PeoplePlan.InTrial === true
						? 'Trial'
						: '',
				'Sales Plan Type':
					userSubscription.PrepaidCoupons.length > 0 &&
					userSubscription.PrepaidCoupons[0].Type &&
					userSubscription.PrepaidCoupons[0].Type === 'prepaid' &&
					userSubscription.PrepaidCoupons[0].Products.some(el => el.Name === 'CRM')
						? 'Prepaid'
						: userSubscription.CRMPlan.Name && payment_available
						? 'Paid'
						: userSubscription.CRMPlan.InTrial === true
						? 'Trial'
						: '',
				'AIO Plan Type':
					userSubscription.PrepaidCoupons.length > 0 &&
					userSubscription.PrepaidCoupons[0].Type &&
					userSubscription.PrepaidCoupons[0].Type === 'prepaid' &&
					userSubscription.PrepaidCoupons[0].Products.some(el => el.Name === 'AIO')
						? 'Prepaid'
						: userSubscription.AIOPlan.Name && payment_available
						? 'Paid'
						: userSubscription.AIOPlan.InTrial === true
						? 'Trial'
						: '',
				'CustomPlan Plan Type': '',
				'AIO Interval': userSubscription.AIOPlan.Interval ? userSubscription.AIOPlan.Interval : '',
			},
		};
	}
	return (
		<div className="app">
			<Intercom appID={process.env.REACT_APP_INTERCOM_KEY} {...user} />
		</div>
	);
};
export default IntercomChat;
