// import SigninModal from '@components/SignInModal';
import { userActions, billingActions } from 'src/actions';
// import jwt from 'jwt-decode';
import HeaderLoginCTA from '@components/HeaderLoginCTA';
import React from 'react';
// bootstrap components
import { Col, Container, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Link from 'next/link';

// import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
// import { ReactComponent as DeskeraLogo } from 'assets/images/deskera-logo.svg';

// import { ScrollScene } from 'scrollscene';

// import { ReactComponent as IndividualIcon } from '../../assets/images/individual-dark.svg';
// import { ReactComponent as EssentialIcon } from '../../assets/images/essential-dark.svg';
// import { ReactComponent as ProfessionalIcon } from '../../assets/images/professional-dark.svg';
// import { ReactComponent as StartupIcon } from '../../assets/images/startup-dark.svg';
// import * as data from '../data/pricing.json';
// import * as plandata from '../data/plans.json';
import { PlanPricing } from '../interface/PricingInterFace';
import { CountryDetection } from 'src/routes/CountryDetection';
import styled from 'styled-components';
import { isEmpty } from '@Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userService } from 'src/services';
// import { useRouter } from 'next/router';

const StatusBarIcon = styled.span`
	color: #ffc64a;
`;
interface PricingState {
	modalShow: boolean;
	navClasses: string;
	emailSent: boolean;
}
class HomeThreeNavbar extends React.Component<PlanPricing, PricingState> {
	navigation: any;
	defaultNav: any;
	userName = '';
	_banner_wrapper: any;

	state = {
		modalShow: false,
		navClasses: 'position-absolute nav-section-wrapper nav-clip',
		emailSent: false,
	};
	constructor(props:  PlanPricing) {
		super(props);

		this.navigation = React.createRef();
		this.defaultNav = React.createRef();
		this._banner_wrapper = React.createRef();
		this._handleWindowResize = this._handleWindowResize.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this._handleWindowResize);
		this._handleWindowResize();
	}
	_handleWindowResize() {
		if (this.defaultNav.current !== null && this._banner_wrapper.current !== null) {
			// return;
			const bannerRect = this._banner_wrapper.current.getBoundingClientRect();
			// const defaultRect = this.defaultNav.current.getBoundingClientRect();
			this.defaultNav.current.style.top = `${bannerRect.height}px`;
		} else {
			this.defaultNav.current.style.top = `0px`;
		}
	}
	componentWillUnmount() {
		this._handleWindowResize();
		window.removeEventListener('resize', this._handleWindowResize);
	}

	setModalShow = (value) => {
		if (value) {
			this.props.ShowLogin();
		} else {
			this.props.HideLogin();
		}
	};

	verifyEmailSend(event) {
		event.preventDefault();
		const user = userService.getUser();
		const { isAuthenticated } = this.props;
		if (!isEmpty(user) && isAuthenticated) {
			this.props.resendVerificationEmail(user);
		}
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		this._handleWindowResize();
	}
	upgradeProduct(event, PlanData) {
		event.preventDefault();
		const countryRoute = CountryDetection.myCountry(this.props);
		const redirectURL = `${countryRoute}/purchase-plan/?product=${PlanData.product}&planID=${PlanData.PlanID}`;
		// this.props.history.push(redirectURL);
	}
	render() {
		let userInTrial,
			emailNotVerified,
			TrialOver,
			showBanner = false;
		let message = '';
		let productName = 'All-in-One';
		let planID = 'plan_GxJ1qUJ7';
		// const { Users, subscription } = this.props;
		const { Users, subscription, emailVerified, isAuthenticated, payment_method } = this.props;

		if (!isEmpty(subscription) && !isEmpty(Users) && emailVerified && isAuthenticated) {
			userInTrial = subscription.currentActivePlan.InTrial;
			const { user } = Users;
			TrialOver = subscription.currentActivePlan.TrialOver;
			const TrialDays = subscription.currentActivePlan.TrialDays;
			const UpdatedDate = moment(subscription.currentActivePlan.UpdatedOn);
			const ExpiryDate = moment(UpdatedDate).add(TrialDays, 'd');
			const DaysRemaining = ExpiryDate.format('ll');
			productName = `${subscription.currentActivePlan.productName ? subscription.currentActivePlan.productName : 'All-in-One'}`;
			const productFullName = `${subscription.currentActivePlan.productName} ${subscription.currentActivePlan.Name}`;
			planID = `${subscription.currentActivePlan.PlanID}`;
			if (typeof payment_method.Cards !== 'undefined') {
				if (userInTrial && !TrialOver) {
					showBanner = true;
					message = `Hey ${user['name']}, Your trial for ${productFullName} will end on ${DaysRemaining}. Please enter your payment details for uninterrupted access`;
				} else if (TrialOver && payment_method.Cards === null && !userInTrial) {
					showBanner = true;
					message = `Hey ${user['name']}, Your Free Trial for Deskera ${productFullName} Plan is now over`;
				}
			}
		}
		if (!emailVerified) {
			const user = userService.getUser();
			if (!isEmpty(user)) {
				showBanner = true;
				emailNotVerified = true;
				message = `Hey ${user['name']}, Please verify your email address or`;
			}
		}

		// const BannerWrapper = document.querySelector('#banner-wrapper');
		let countryRoute = CountryDetection.myCountry(this.props);
		return (
			<React.Fragment>
				<div className={`${this.state.navClasses}${showBanner ? ' is-banner' : ''}`} ref={this.navigation}>
					<nav className={`nav d-flex align-items-center ${showBanner ? 'is-banner' : ''}`} id="default-nav" ref={this.defaultNav}>
						{showBanner && (
							<div className="status-banner-wrapper d-flex" ref={this._banner_wrapper} id="banner-wrapper">
								<Container fluid={true}>
									<Row className="justify-content-between align-items-center align-items-md-start">
										<Col sm={12} md={12} className="py-0">
											<div className="status-banner">
												<StatusBarIcon className="banner-icon-wrapper">
													<FontAwesomeIcon icon="hourglass-half" />
												</StatusBarIcon>
												<span className="banner-text text-left px-3">{message}</span>
												{!emailNotVerified && (
													<Button
														variant={'outline-primary'}
														size="sm"
														onClick={event =>
															this.upgradeProduct(event, {
																product: productName,
																PlanID: planID,
															})
														}
													>
														{`${!userInTrial && TrialOver ? 'Buy Now' : 'Add Now'}`}
													</Button>
												)}

												{emailNotVerified && (
													<Button
														variant={'outline-primary'}
														size="sm"
														onClick={event => this.verifyEmailSend(event)}
														disabled={this.props.emailVerifying}
													>
														{this.props.emailVerifying ? (
															<React.Fragment>
																<FontAwesomeIcon icon="spinner" spin size="xs" /> Sending email
															</React.Fragment>
														) : (
															'Resend email'
														)}
													</Button>
												)}
											</div>
										</Col>
									</Row>
								</Container>
							</div>
						)}
						<Container>
							<Row className="default-nav-wrapper justify-content-between align-items-center align-items-md-start">
								<Col xs={6} md={4} className="py-0">
									<Link href={`${countryRoute}/`}>
										<a className="logo-link nav-logo-link">
											<img src="/assets/images/deskera-logo.svg" className="logo logo-sticky" />
										</a>
									</Link>
								</Col>
								<Col xs={6} md={8} lg={6} className="py-0 d-flex d-md-flex justify-content-end align-items-top">
									<HeaderLoginCTA />
								</Col>
							</Row>
						</Container>
					</nav>

					{/* <nav className="nav" id="pricing-nav">
						<Container>
							<Row className="justify-content-between align-items-center">
								<Col xs={3} className="pr-0 py-0">
									<Link href={`${countryRoute}/`} className="logo-link pricing-nav-link">
										<img
											alt="Deskera"
											src='static/images/deskera-logo-blue@2x.png'
											className="logo logo-sticky logo-blue"
										/>
										<img
											alt="Deskera"
											src='static/images/deskera-logo-dark@2x.png'
											className="logo logo-sticky logo-dark"
										/>
										<img
											alt="Deskera"
											src='static/images/deskera-logo-gray@2x.png'
											className="logo logo-sticky logo-gray"
										/>
										<img
											alt="Deskera"
											src='static/images/deskera-logo-light@2x.png'
											className="logo logo-sticky logo-light"
										/>
										<img
											alt="Deskera"
											src='static/images/deskera-logo-orange@2x.png'
											className="logo logo-sticky logo-orange"
										/>
										<img
											alt="Deskera"
											src='static/images/deskera-logo-red@2x.png'
											className="logo logo-sticky logo-red"
										/>
										<img
											alt="Deskera"
											src='static/images/deskera-logo-yellow@2x.png'
											className="logo logo-sticky logo-yellow"
										/>
									</Link>
								</Col>
								<Col xs={9} className="p-0 d-flex justify-content-end align-items-top plan-container-sticky">
									<Col xs={4} className="pr-0 py-0 d-none d-md-block">
										<div className="plan-details startup">
											<div className="d-flex justify-content-center align-items-top plan-card">
												<h5 className="plan-name py-1">
													<StartupIcon className="plan-icon py-1" />
													<span>Startup</span>
												</h5>
												<p className="pricing-text">
													Small organisations setting up their business and want to track and manage finances
												</p>
												<p className="plan-price">
													<span className="plan-unit">
														<sup>{startup && (startup.Currency === 'usd' ? '$' : startup.Currency)}</sup>
													</span>
													<span className="plan-price-value">
														<strong>
															{startup &&
																(startup.Interval.toLowerCase() === 'yearly' ? startup.Amount / 12 : startup.Amount)}
														</strong>
													</span>
													<span className="plan-duration">/mo</span>
												</p>
												<p className="plan-user">
													for{' '}
													<span className="font-weight-bold">
														{startup && (startup.Users ? startup.Users + 'Users' : 'User/Month')}
													</span>
												</p>
												<div className="action-container">
													<Button
														className="btn btn-buy"
														onClick={(event) =>
															this.purchasePlanID(event, {
																product: SelectedProduct,
																duration: durationName,
																...startup,
															})
														}
													>
														{!isAuthenticated ? 'Try it first' : 'Buy Now'}
													</Button>
												</div>
											</div>
										</div>
									</Col>
									<Col xs={9} md={4} className="pr-0 py-0">
										<div className="plan-details essential shadow-sm">
											<div className="d-flex justify-content-center align-items-top plan-card">
												<h5 className="plan-name py-1">
													<EssentialIcon className="plan-icon py-1" />
													<span>Essential</span>
												</h5>
												<p className="pricing-text">
													For growing companies and SMBs that want a robust out of the box solution.
												</p>
												<div className="card-label">
													<p className="label-text backdrop-red">Most Popular</p>
												</div>
												<p className="plan-price">
													<span className="plan-unit">
														<sup>{essential && (essential.Currency === 'usd' ? '$' : essential.Currency)}</sup>
													</span>
													<span className="plan-price-value">
														<strong>
															{essential &&
																(essential.Interval.toLowerCase() === 'yearly'
																	? essential.Amount / 12
																	: essential.Amount)}
														</strong>
													</span>
													<span className="plan-duration">/mo</span>
												</p>
												<p className="plan-user">
													{essential && (essential.Users ? essential.Users + 'Users' : 'User/Month')}
												</p>
												<div className="action-container">
													<Button
														className="btn btn-buy"
														onClick={(event) =>
															this.purchasePlanID(event, {
																product: SelectedProduct,
																duration: durationName,
																...essential,
															})
														}
													>
														{!isAuthenticated ? 'Try it first' : 'Buy Now'}
													</Button>
												</div>
											</div>
										</div>
									</Col>
									<Col xs={4} className="pr-0 py-0 d-none d-md-block">
										<div className="plan-details professional">
											<div className="d-flex justify-content-center align-items-top plan-card">
												<h5 className="plan-name py-1">
													<ProfessionalIcon className="plan-icon py-1" />
													<span>Professional</span>
												</h5>
												<p className="pricing-text">
													Ideal for organisations that are looking for a robust solution with advanced features to meet
													their business needs.
												</p>
												<p className="plan-price">
													<span className="plan-unit">
														<sup> {professional && (professional.Currency === 'usd' ? '$' : professional.Currency)}</sup>
													</span>
													<span className="plan-price-value">
														<strong>
															{professional &&
																(professional.Interval.toLowerCase() === 'yearly'
																	? professional.Amount / 12
																	: professional.Amount)}
														</strong>
													</span>
													<span className="plan-duration">/mo</span>
												</p>
												<p className="plan-user">
													for{' '}
													<span className="font-weight-bold">
														{professional && (professional.Users ? professional.Users + 'Users' : 'User/Month')}
													</span>
												</p>
												<div className="action-container">
													<Button
														className="btn btn-buy"
														onClick={(event) =>
															this.purchasePlanID(event, {
																product: SelectedProduct,
																duration: durationName,
																...professional,
															})
														}
													>
														{!isAuthenticated ? 'Try it first' : 'Buy Now'}
													</Button>
												</div>
											</div>
										</div>
									</Col>
								</Col>
							</Row>
						</Container>
					</nav> */}
				</div>
			</React.Fragment>
		);
	}
}
function mapState(state) {
	return {
		Pricing: state.Pricing,
		Duration: state.Duration,
		Users: state.Users,
		isAuthenticated: state.authentication.authenticated,
		emailVerified: state.authentication.emailVerified,
		emailVerifying: state.resendVerification.emailVerifying,
		product: state.Product,
		subscription: state.billing.user_subscription,
		payment_method: state.billing.payment_method,
	};
}

const actionCreators = {
	ShowLogin: userActions.ShowLogin,
	HideLogin: userActions.HideLogin,
	getUserSubscription: userActions.getUserSubscription,
	resendVerificationEmail: userActions.resendVerificationEmail,
	billing: billingActions.getPaymentMethod(),
};

export default connect(mapState, actionCreators)(HomeThreeNavbar);
