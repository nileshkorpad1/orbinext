import TranslateText from '@Helpers/TranslateText';
import React from 'react';
import { Accordion, Button, Card, Col, Container, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent';
import ContentLoader from 'react-content-loader';
import { useDispatch, useSelector } from 'react-redux';
// import { userouter } from 'react-router-dom';
import { useRouter } from 'next/router';

import Link from 'next/link'

import HomeNavbar from '../../components/Navbars/HomeNavbar';
import { CountryDetection } from 'src/routes/CountryDetection';
import PlanFeaturesJson from '../../components/data/planFeatures.json';
import { isEmpty } from '@Helpers';
import { StoreState } from '@store/types';


// import planDataJson from '../../components/data/plans.json';

const PricingCompact = (props) => {
	let countryRoute = CountryDetection.myCountry(props);
	const isAuthenticated = useSelector((state: StoreState) => state.authentication.authenticated);
	const [key, setKey] = React.useState('all-plans');
	let userSubscription = useSelector((state: StoreState) => state.billing.user_subscription);
	let [currentProduct, setCurrentProduct] = React.useState(null);
	const pricingData = useSelector((state: StoreState) => state.Pricing);
	const duration = useSelector((state: StoreState) => state.Duration);
	const [activeProductName, setActiveProductName] = React.useState('all');

	let router = useRouter();
	// const rangeInitialValues = {
	// 	range: 0,
	// 	contacts: 1000,
	// 	emails: 10000,
	// 	amount: 0,
	// };
	// const [RangeStartup, setRangeStartup] = React.useState(rangeInitialValues);
	// const [RangeEssential, setRangeEssential] = React.useState(rangeInitialValues);
	// const [RangeProfessional, setRangeProfessional] = React.useState(rangeInitialValues);
	let value = {};
	if (pricingData.getPlans) {
		value = pricingData.plans;
	}
	const dispatch = useDispatch();
	React.useEffect(() => {
		let productName = 'all-in-one';
		if (router.pathname !== null) {
			productName = router.pathname
				.split(':')[0]
				.replace(/\/sg\//g, '')
				.replace(/\/in\//g, '')
				.replace(/\/id\//g, '')
				.replace(/\/my\//g, '')
				.replace(/[^a-z0-9-]/g, '');
		}
		switch (productName) {
			case 'crm':
				setKey('sales');
				setActiveProductName('crm');
				break;
			case 'sales':
				setKey('sales');
				setActiveProductName('crm');
				break;
			case 'books':
				setKey('books');
				setActiveProductName('erp');
				break;
			case 'people':
				setKey('people');
				setActiveProductName('people');
				break;
			default:
				setKey('all-plans');
				setActiveProductName('all');
		}
	}, [router.pathname]);

	React.useEffect(() => {
		for (var key in userSubscription) {
			if (userSubscription[key]['Name'] !== '') {
				setCurrentProduct(userSubscription[key]);
			}
		}
	}, [userSubscription, currentProduct]);

	const handleChange = (val) => {
		if (val === 'monthly') {
			dispatch({ type: 'Duration', Duration: 'MONTHLY' });
		}
		if (val === 'yearly') {
			dispatch({ type: 'Duration', Duration: 'YEARLY' });
		}
	};
	const SetTabValues = (key) => {
		dispatch({ type: 'Product', Product: key });
		setKey(key);
		// setRangeStartup(rangeInitialValues);
		// setRangeEssential(rangeInitialValues);
		// setRangeProfessional(rangeInitialValues);
	};

	function MainFeatureList(feature) {
		let featureMainList = [];
		feature.mainList.forEach((displayFeature, i) => {
			if (i < 3) {
				featureMainList.push(
					<Card className="plan-feature" key={i}>
						<Card.Header className="feature-list-item">{displayFeature.Name}</Card.Header>
					</Card>,
				);
			} else {
			}
		});
		return <>{featureMainList}</>;
	}
	function PlanFeatures(PlanDetails) {
		let planProductName;
		let featureDetails = [];

		planProductName = PlanDetails.product;
		if (planProductName && planProductName !== 'undefined') {
			planProductName = planProductName.toLowerCase();
			let currentPlanName = PlanDetails.plan.PlanName;
			let currentPlanData = PlanFeaturesJson['features'][planProductName][currentPlanName];
			currentPlanData.forEach((feature, i) => {
				featureDetails.push(
					<Card className="plan-feature" key={i}>
						<Card.Header className="feature-list-item">
							{feature}{' '}
							{i === 0 ? (
								<React.Fragment>
									<div className="feature-tooltip d-none">
										<span className="tooltip-symbol">?</span>
										<span className="tooltip-master">
											<div className="tooltip-text">
												Power Users are Admins, Those Who Need to Approve Things Or Manage Other Users. All Other Roles Are
												FREE
											</div>
										</span>
									</div>
								</React.Fragment>
							) : (
								''
							)}
						</Card.Header>
					</Card>,
				);
			});
		} else {
			let planFeaturesData = PlanDetails.plan.Features;
			planFeaturesData.forEach((feature, i) => {
				if (planFeaturesData.length > 1) {
					if (feature.Product === 'ERP') {
						featureDetails[0] = (
							<React.Fragment key={i}>
								<MainFeatureList mainList={feature.DisplayFeatures} />
							</React.Fragment>
						);
					}
				} else {
					if (feature.Product === 'CRM') {
						featureDetails[0] = (
							<React.Fragment key={i}>
								<MainFeatureList mainList={feature.DisplayFeatures} />
							</React.Fragment>
						);
					} else if (feature.Product === 'ERP') {
						featureDetails[1] = (
							<React.Fragment key={i}>
								<MainFeatureList mainList={feature.DisplayFeatures} />
							</React.Fragment>
						);
					} else if (feature.Product === 'PEOPLE') {
						featureDetails[2] = (
							<React.Fragment key={i}>
								<MainFeatureList mainList={feature.DisplayFeatures} />
							</React.Fragment>
						);
					} else {
						featureDetails[3] = (
							<React.Fragment key={i}>
								<MainFeatureList mainList={feature.DisplayFeatures} />
							</React.Fragment>
						);
					}
				}
			});
		}
		return (
			<React.Fragment>
				<div className="plan-features-wrapper">
					<Accordion>{featureDetails}</Accordion>
				</div>
			</React.Fragment>
		);
	}

	function purchasePlanID(event, planData) {
		event.preventDefault();
		localStorage.removeItem('planData');
		localStorage.removeItem('new-register');
		localStorage.setItem('planData', JSON.stringify(planData));
		const redirectURL = !isAuthenticated
			? `${countryRoute}/sign-up/?product=${planData.product}&planID=${planData.PlanID}`
			: `${countryRoute}/purchase-plan/?product=${planData.product}&planID=${planData.PlanID}`;
		router.push(redirectURL);
	}
	function AllPlanDetails() {
		if (value) {
			var result = Object.keys(value).map(function (key, index) {
				if (activeProductName === key && !isEmpty(value[key])) {
					// let key = keyData.plan;
					// let index = keyData.index;

					const MonthlyPlan = value[key]['MonthlyPlans'];
					const YearlyPlans = value[key]['YearlyPlans'];
					let PlanData = MonthlyPlan;
					if (duration.yearly) {
						PlanData = YearlyPlans;
					}
					let pricingPlanData = [];
					let eventKey = key;
					if (key === 'erp') {
						eventKey = 'books';
					}
					if (key === 'crm') {
						eventKey = 'sales';
					}
					if (key === 'all') {
						eventKey = 'all-plans';
					}
					let SortedPlan = [];
					PlanData.forEach((data, i) => {
						if (data.PlanName === 'Startup') {
							SortedPlan[0] = data;
						} else if (data.PlanName === 'Essential') {
							SortedPlan[1] = data;
						} else if (data.PlanName === 'Professional') {
							SortedPlan[2] = data;
						}
					});
					let product = 'All-in-One';
					switch (key) {
						case 'erp':
							product = 'Books';
							break;
						case 'crm':
							product = 'Sales';
							break;
						case 'people':
							product = 'People';
							break;
					}
					return (
						<Tab.Pane eventKey={eventKey} key={index} className={product.toLowerCase()}>
							<TabContent>
								<Container className="px-0 mx-auto mb-4">
									<Row className="d-flex mx-0 px-0">
										{SortedPlan.forEach((data, i) => {
											let planTitle = data.PlanName;
											let env = process.env.REACT_APP_ENV;
											let planID = data.PlanID[env];
											let activePlan = false;
											// let trialExpire = false;
											let activeProduct = '';
											if (isAuthenticated && currentProduct) {
												if (currentProduct.PlanID === planID) {
													activePlan = true;
												}
												if (currentProduct.productName) {
													activeProduct = currentProduct.productName;
												}
											}
											let planTitleInLower = planTitle.toLowerCase();
											let productInLower = product.toLowerCase();
											let unit = data.Currency === 'usd' ? '$' : data.Currency;
											let price = data.Amount ? data.Amount : 0;
											if (price !== 0 && data.Interval.toLowerCase() === 'yearly') {
												price = price / 12;
											}
											let duration = data.Duration ? data.Duration : '';
											// let userCount = data.Users ? data.Users + 'Users' : 'User/Month';
											let textReverse = '';

											if (key !== 'all') {
												textReverse = planTitleInLower === 'essential' ? '' : '';
											}
											let currentActivePlan = activePlan ? (
												<div className="card-label plan-active-label">
													{' '}
													<p className="label-text ">Active Plan</p>{' '}
												</div>
											) : (
												''
											);
											let mostPopular =
												planTitleInLower === 'essential' && !currentActivePlan ? (
													<div className="card-label plan-popular-label">
														{' '}
														<p className="label-text">Most Popular</p>{' '}
													</div>
												) : (
													''
												);

											pricingPlanData.push(
												<Col xs={12} md={4} className="d-flex px-md-0 pt-0 pb-2" key={i}>
													<div
														className={`plan-details ${planTitle.toLowerCase()} ${textReverse}${
															activePlan ? ' active-subscribed-plan' : ''
														}`}
													>
														<div className="plan-card text-center">
															<h2 className="product-name">
																{/* <PlanIcon icon={planTitle} key={`icon-${i}`} /> */}
																<span className="pl-0">{product === 'Sales' ? 'CRM' : product}</span>
															</h2>
															<h3 className="plan-name pb-1">
																{/* <PlanIcon icon={planTitle} key={`icon-${i}`} /> */}
																<span className="pl-0">{planTitle}</span>
															</h3>
															<p className="pricing-text">
																{PlanFeaturesJson['description'][productInLower][planTitle]}
															</p>
															{currentActivePlan}
															{mostPopular}
															<div className="d-flex px-0 py-2 justify-content-center align-items-center">
																<p className="plan-price mr-3">
																	<span className="plan-unit">
																		<sup>{unit}</sup>
																	</span>
																	<span className="plan-price-value">{price}</span>
																	<span className="plan-duration">{duration}</span>
																</p>
																<p className="plan-user mb-0">
																	per <span className="plan-user-unit unit-users">User</span> <br />
																	per <span className="plan-user-unit unit-duration">Month</span>
																</p>
															</div>
															<div className="action-container">
																{activePlan ? (
																	<React.Fragment>
																		<Button
																			className="btn btn-block btn-dark btn-buy"
																			variant="dark"
																			onClick={(event) =>
																				purchasePlanID(event, {
																					PlanID: planID,
																					product: product,
																					Amount: data.Amount,
																					planTitle: planTitle,
																					unit: unit,
																					duration: data.Interval,
																					type: 'buy-now',
																				})
																			}
																		>
																			Change plan
																		</Button>
																	</React.Fragment>
																) : (
																	<React.Fragment>
																		<Button
																			className="btn btn-block btn-dark btn-buy"
																			variant="dark"
																			onClick={(event) =>
																				purchasePlanID(event, {
																					PlanID: planID,
																					product: product,
																					Amount: data.Amount,
																					planTitle: planTitle,
																					unit: unit,
																					duration: data.Interval,
																					type: 'buy-now',
																				})
																			}
																		>
																			{activeProduct === product ? 'Change plan' : 'Buy now'}
																		</Button>
																	</React.Fragment>
																)}
																{!isAuthenticated ? (
																	<React.Fragment>
																		<Button
																			className="btn btn-block btn-outline-dark btn-free"
																			variant="outline-dark"
																			onClick={(event) =>
																				purchasePlanID(event, {
																					PlanID: planID,
																					product: product,
																					Amount: data.Amount,
																					planTitle: planTitle,
																					unit: unit,
																					duration: data.Interval,
																				})
																			}
																		>
																			Try it first
																		</Button>
																	</React.Fragment>
																) : (
																	<React.Fragment></React.Fragment>
																)}
															</div>
															<PlanFeatures plan={data} product={product} />
															<div className="summary-container">
																<div className="pt-3">
																	Includes <span className="font-weight-normal">{planTitle}</span> features for{' '}
																	{product.toLowerCase() === 'all-in-one' ? (
																		'Books, CRM and People'
																	) : (
																		<React.Fragment>
																			<span className="text-capitalize">
																				{product === 'Sales' ? 'CRM' : product}
																			</span>
																		</React.Fragment>
																	)}
																</div>
															</div>
														</div>
													</div>
												</Col>,
											);
										})}
										{pricingPlanData}
									</Row>
								</Container>
							</TabContent>
						</Tab.Pane>
					);
				} else {
					return <React.Fragment key={index}></React.Fragment>;
				}
			});
			return <React.Fragment>{result}</React.Fragment>;
		} else {
			return <React.Fragment></React.Fragment>;
		}
	}

	return (
		<React.Fragment>
			<section
				className={`section pricing-section ${
					isAuthenticated ? 'is-authenticated' : 'is-visitor'
				} home-pricing-section backdrop-white has-layer-white has-logo-red viewport-size`}
				id="pricing"
			>
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container fluid={true} className="section-inner-wrapper">
					<Row>
						<Col xs={12} className="px-0">
							<Container>
								<Row>
									<Col xs={12} className="text-center pricing-text">
										<h2 className="section-heading pr-0 mt-4">{TranslateText('home.pricingSection.heading')}</h2>
										<h3 className="section-byline mb-4">{TranslateText('home.pricingSection.byline')}</h3>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
					<Row>
						<Col xs={12} lg={10} xl={9} className="mx-auto px-0 pt-4">
							<Container fluid={true} className="pricing-container-wrapper p-0 m-0">
								<Tab.Container id="pricing" activeKey={key} onSelect={(key) => SetTabValues(key)}>
									<Tab.Content className="container-fluid px-0" id="plan-tab-container">
										{pricingData.getPlans ? (
											<React.Fragment>
												<AllPlanDetails />
											</React.Fragment>
										) : (
											<>
												<Col>
													<ContentLoader
														className="text-center"
														speed={2}
														width="100%"
														height="auto"
														viewBox="0 0 600 160"
														backgroundColor="#fbf7ee"
														foregroundColor="#fff0d1"
													>
														<rect x="15" y="15" rx="2" ry="2" width="180" height="127" />
														<rect x="210" y="15" rx="2" ry="2" width="180" height="127" />
														<rect x="405" y="15" rx="2" ry="2" width="180" height="127" />
													</ContentLoader>
												</Col>
											</>
										)}
									</Tab.Content>
								</Tab.Container>
							</Container>
						</Col>
					</Row>
					<Row>
						<Col xs={12} lg={10} xl={9} className="mx-auto px-0">
							<Container className="pt-0 pb-5 px-md-0">
								<Row className="d-flex align-items-center justify-content-between mx-0 px-0 pt-4">
									<div className="plan-duration-toggle text-center mb-3">
										<ToggleButtonGroup
											type="radio"
											name="options"
											defaultValue={`${duration.monthly ? 'monthly' : 'yearly'}`}
											onChange={handleChange}
										>
											<ToggleButton value={'monthly'}>Monthly</ToggleButton>
											<ToggleButton value={'yearly'}>Yearly</ToggleButton>
										</ToggleButtonGroup>
										<p className="d-inline-block pl-3 text-muted">
											<small>{TranslateText('home.pricingSection.text_save_more')} </small>
										</p>
									</div>
									<div className="text-center pr-2">
										<span>30 days Free Trial, No Credit Card Required.</span>
									</div>
								</Row>
								<Row className="d-flex align-items-center justify-content-between mx-0 px-0 pt-1">
									<h5 className="font-weight-normal">
										<Link href={`${countryRoute}/deskera-mobile/`}>Or, download our mobile app for free!</Link>
									</h5>

									<h5 className="font-weight-normal">
										<Link href={`${countryRoute}/deskera${key !== 'all-plans' && key !== 'all-in-one' ? '-' + key : ''}-pricing/`}>
											See full feature comparison →
										</Link>
									</h5>
								</Row>
							</Container>
						</Col>
					</Row>
				</Container>
				<div className="divider"></div>
			</section>
		</React.Fragment>
	);
};
export default PricingCompact;
