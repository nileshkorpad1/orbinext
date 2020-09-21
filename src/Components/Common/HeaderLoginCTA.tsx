import React from 'react';
import { userActions } from 'src/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button } from 'react-bootstrap';
import { isEmpty } from '@Helpers';
import { StoreState } from '@store/types';

const UserAuthenticated = () => {
	const user = useSelector((state: StoreState) => state.Users.user);
	const userSubscription = useSelector((state: StoreState) => state.billing.user_subscription);
	const AppActions = useSelector((state: StoreState) => state.App.AppActions);
	const [currentProduct, setCurrentProduct] = React.useState('AIOPlan');
	const dispatch = useDispatch();
	let userName = null;
	if (user) {
		userName = user.name ? user.name : '';
	}
	React.useEffect(() => {
		if (!isEmpty(userSubscription)) {
			const { currentActivePlan } = userSubscription;
			setCurrentProduct(currentActivePlan['productName']);
		}
	}, [userSubscription]);
	const logout = (event) => {
		event.preventDefault();
		dispatch(userActions.logout());
	};
	function dropdownToggle(value) {
		console.log(value);
		if (value) {
			dispatch(userActions.ShowUserMenuDropDown());
		} else {
			dispatch(userActions.HideUserMenuDropDown());
		}
	}
	return (
		<div className="block-greetings d-flex text-left text-md-right signed-in p-0 pl-md-2">
			<Dropdown onToggle={(val) => dropdownToggle(val)} show={AppActions ? AppActions['showUserDetailsDropdown'] : false}>
				<Dropdown.Toggle variant="dark" id="dropdown-basic">
					<span className="text-dropdown-button">Hi, {userName ? userName : 'Guest'}</span>
				</Dropdown.Toggle>
				<Dropdown.Menu className="backdrop-dark">
					{(currentProduct === 'AIOPlan' || currentProduct === 'All-in-One') && (
						<React.Fragment>
							<Dropdown.Item href={`${process.env.REACT_APP_PRODUCT_BOOKS}`} target="_blank" className="py-3">
								Books
							</Dropdown.Item>
							<Dropdown.Item href={`${process.env.REACT_APP_PRODUCT_SALES}`} target="_blank" className="py-3">
								CRM
							</Dropdown.Item>
							<Dropdown.Item href={`${process.env.REACT_APP_PRODUCT_PEOPLE}`} target="_blank" className="py-3">
								People
							</Dropdown.Item>
						</React.Fragment>
					)}
					{(currentProduct === 'ERPPlan' || currentProduct === 'Books') && (
						<React.Fragment>
							<Dropdown.Item href={`${process.env.REACT_APP_PRODUCT_BOOKS}`} target="_blank" className="py-3">
								Go To Books
							</Dropdown.Item>
						</React.Fragment>
					)}
					{(currentProduct === 'CRMPlan' || currentProduct === 'Sales' || currentProduct === 'CRM') && (
						<React.Fragment>
							<Dropdown.Item href={`${process.env.REACT_APP_PRODUCT_SALES}`} target="_blank" className="py-3">
								CRM
							</Dropdown.Item>
						</React.Fragment>
					)}
					{(currentProduct === 'PeoplePlan' || currentProduct === 'People') && (
						<React.Fragment>
							<Dropdown.Item href={`${process.env.REACT_APP_PRODUCT_PEOPLE}`} target="_blank" className="py-3">
								People
							</Dropdown.Item>
						</React.Fragment>
					)}
					<Dropdown.Item href={`${process.env.REACT_APP_PRODUCT_GO}`} target="_blank" className="py-3">
						Go to Dashboard
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={(e) => logout(e)} className="py-3">
						Sign Out
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};
const UserNotAuthenticated = () => {
	const dispatch = useDispatch();
	const setModalShow = (event, value) => {
		event.preventDefault();
		if (value) {
			dispatch(userActions.ShowLogin(value));
		} else {
			dispatch(userActions.HideLogin(value));
		}
	};
	return (
		<p className="block-greetings text-left text-md-right signed-out p-0 pl-md-2">
			<span className="text-greetings d-none">Already have a Deskera account?</span>
			<Button
				variant="outline-light"
				className="font-weight-bold text-sign-in btn btn-outline-white mt-3 mt-md-0"
				onClick={(e) => setModalShow(e, true)}
			>
				Sign in now
			</Button>
		</p>
	);
};

const HeaderLoginCTA = (props) => {
	const isAuthenticated = useSelector((state: StoreState) => state.authentication.authenticated);
	const Authenticating = useSelector((state: StoreState) => state.authentication.loading);
	if (!Authenticating && isAuthenticated && navigator.userAgent !== 'ReactSnap') {
		return <UserAuthenticated />;
	} else if (!Authenticating && !isAuthenticated) {
		return <UserNotAuthenticated />;
	} else {
		return <React.Fragment></React.Fragment>;
	}
	// else if (!Authenticating && isAuthenticated && !isEmailVerified) {
	// 	return <UserNotAuthenticated />;
	// } else {
	// 	return <React.Fragment></React.Fragment>;
	// }
};
export default HeaderLoginCTA;
