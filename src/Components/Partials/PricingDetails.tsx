import React from 'react';
import { Col, Container, Row, ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent';

// import * as EssentialIcon  from '/static/images/essential-dark.svg';
// import * as IndividualIcon  from '/static/images/individual-dark.svg';
// import * as ProfessionalIcon  from '/static/images/professional-dark.svg';
// import * as StartupIcon  from '/static/images/startup-dark.svg';
import HomeNavbar from '../../components/Navbars/HomeNavbar';

import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { useHistory } from 'react-router-dom';
// import ReactSlider from 'react-slider';
import TranslateText from '@Helpers/TranslateText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CountryDetection } from 'src/routes/CountryDetection';
import { StoreState } from '@store/types';

const PricingDetails = (props) => {
	let countryRoute = CountryDetection.myCountry(props);
	const isAuthenticated = useSelector((state: StoreState) => state.authentication.authenticated);
	const [key, setKey] = React.useState('all-plans');
	const pricingData = useSelector((state: StoreState) => state.Pricing);
	const duration = useSelector((state: StoreState) => state.Duration);
	let history = useHistory();
	const rangeInitialValues = {
		range: 0,
		contacts: 1000,
		emails: 10000,
		amount: 0,
	};
	const [RangeStartup, setRangeStartup] = React.useState(rangeInitialValues);
	const [RangeEssential, setRangeEssential] = React.useState(rangeInitialValues);
	const [RangeProfessional, setRangeProfessional] = React.useState(rangeInitialValues);

	let value = {};
	if (pricingData.getPlans) {
		value = pricingData.plans;
	}
	const dispatch = useDispatch();
	React.useEffect(() => {
		let productName = 'product';
		if (props.match.path !== null) {
			productName = props.match.path.split(':')[0].replace(/[^a-z0-9-]/g, '');
		}
		switch (productName) {
			case 'sales':
				setKey('sales');
				break;
			case 'books':
				setKey('books');
				break;
			case 'people':
				setKey('people');
				break;
			default:
				setKey('all-plans');
		}
	}, [props.match.path]);

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
		setRangeStartup(rangeInitialValues);
		setRangeEssential(rangeInitialValues);
		setRangeProfessional(rangeInitialValues);
	};

	function PlanIcon(icon) {
		switch (icon.icon) {
			case 'Startup':
				return <img src="/static/images/startup-dark.svg" alt="startup" className="plan-icon" />;
			case 'Essential':
				return <img src="/static/images/essential-dark.svg" alt="essential" className="plan-icon" />;
			case 'Professional':
				return <img src="/static/images/professional-dark.svg" alt="professional" className="plan-icon" />;
			default:
				return <img src="/static/images/individual-dark.svg" alt="individual" className="plan-icon" />;

			// case 'Startup':
			// 	return <StartupIcon className="plan-icon" />;
			// case 'Essential':
			// 	return <EssentialIcon className="plan-icon" />;
			// case 'Professional':
			// 	return <ProfessionalIcon className="plan-icon" />;
			// default:
			// 	return <IndividualIcon className="plan-icon" />;
		}
	}

	function MainFeatureList(feature) {
		let featureMainList = [];
		let planName = feature.planName;
		feature.mainList.forEach((displayFeature, i) => {
			let escapeStartup = displayFeature.Name.includes('Startup');
			let escapeEssential = displayFeature.Name.includes('Essential');
			if (!escapeStartup && !escapeEssential) {
				if (displayFeature.IsGroup) {
					featureMainList.push(
						<React.Fragment>
							<tr className="plan-feature-list font-weight-bold" key={i}>
								<td className="align-middle">
									<div className="h5">
										<span className="pr-2">
											<FontAwesomeIcon icon={faCheckCircle} color="black" className="h5-responsive" />
										</span>
										{displayFeature.Name}
									</div>
								</td>
								<EnabledFeatures featureEnable={planName} />
							</tr>
							<SubFeatureList subList={displayFeature.Items} planName={planName} />
						</React.Fragment>,
					);
				} else {
					featureMainList.push(
						<tr className="plan-feature-list font-weight-bold" key={i}>
							<td className="align-middle">
								<div className="h5">
									<span className="pr-2">
										<FontAwesomeIcon icon={faCheckCircle} color="black" className="h5-responsive" />
									</span>
									{displayFeature.Name} ho ha
								</div>
							</td>
							<EnabledFeatures featureEnable={planName} />
						</tr>,
					);
				}
			}
		});

		return <React.Fragment key={planName}>{featureMainList}</React.Fragment>;
	}

	function SubFeatureList(subFeature) {
		let subFeaturesList = [];
		let planName = subFeature.planName;
		subFeature.subList.forEach((subListValue, i) => {
			subFeaturesList.push(
				<tr className="feature-list-item pl-5" key={i}>
					<td className="align-middle pl-5">
						<div className="h5 font-weight-normal">
							<span className="pr-2">
								<FontAwesomeIcon icon={faCheck} color="black" className="h5-responsive" />
							</span>
							{subListValue}
						</div>
					</td>
					<EnabledFeatures featureEnable={planName} />
				</tr>,
			);
		});
		return <React.Fragment key={planName}>{subFeaturesList}</React.Fragment>;
	}

	function EnabledFeatures(checkFeature) {
		let planName = checkFeature.featureEnable;
		return (
			<React.Fragment key={planName}>
				<td className="text-center align-middle section-description">
					{planName === 'startup' ? <FontAwesomeIcon icon={faCheckCircle} color="green" className="h5-responsive" /> : ' - '}
				</td>
				<td className="text-center align-middle section-description">
					{planName === 'startup' || planName === 'essential' ? (
						<FontAwesomeIcon icon={faCheckCircle} color="green" className="h5-responsive" />
					) : (
						' - '
					)}
				</td>
				<td className="text-center align-middle section-description">
					{planName === 'startup' || planName === 'essential' || planName === 'professional' ? (
						<FontAwesomeIcon icon={faCheckCircle} color="green" className="h5-responsive" />
					) : (
						' - '
					)}
				</td>
			</React.Fragment>
		);
	}
	function PlanFeatures(PlanDetails) {
		let featureDetails = [];
		let featureBooks = [];
		let featureSales = [];
		let featurePeople = [];
		PlanDetails.plan.forEach((featureList, i) => {
			let PlansDetails = featureList.Features;
			let planName = featureList.PlanName.toLowerCase();
			PlansDetails.forEach((feature, i) => {
				let featureTitle = feature.DisplayFeatures;
				switch (feature.Product) {
					case 'CRM':
						featureSales.push(
							<React.Fragment key={i}>
								<MainFeatureList mainList={featureTitle} planName={planName} />
							</React.Fragment>,
						);
						break;
					case 'ERP':
						featureBooks.push(
							<React.Fragment key={i}>
								<MainFeatureList mainList={featureTitle} planName={planName} />
							</React.Fragment>,
						);
						break;
					case 'PEOPLE':
						featurePeople.push(
							<React.Fragment key={i}>
								<MainFeatureList mainList={featureTitle} planName={planName} />
							</React.Fragment>,
						);
						break;
				}
			});
		});
		if (featureBooks.length > 0) {
			featureDetails.push(
				<React.Fragment>
					<tr>
						<td className="align-middle">
							<h3 className="section-byline font-weight-bold icon-books text-books h-50">
								<img
									src={`/static/images/icon-product-books-default@2x.png`}
									alt="Deskera Books"
									className="img-fluid product-icon h-50 pr-3"
								/>
								<span>Books</span>
							</h3>
						</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					{featureBooks}
				</React.Fragment>,
			);
		}
		if (featureSales.length > 0) {
			featureDetails.push(
				<React.Fragment>
					<tr>
						<td className="align-middle">
							<h3 className="section-byline font-weight-bold icon-sales text-sales h-50">
								<img
									src={`/static/images/icon-product-sales-default@2x.png`}
									alt="Deskera CRM"
									className="img-fluid product-icon h-50 pr-3"
								/>
								Sales
							</h3>
						</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					{featureSales}
				</React.Fragment>,
			);
		}
		if (featurePeople.length > 0) {
			featureDetails.push(
				<React.Fragment>
					<tr>
						<td className="align-middle">
							<h3 className="section-byline font-weight-bold icon-people text-people h-50">
								<img
									src={`/static/images/icon-product-people-default@2x.png`}
									alt="Deskera People"
									className="img-fluid h-50 pr-3"
								/>
								People
							</h3>
						</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					{featurePeople}
				</React.Fragment>,
			);
		}
		// featureDetails.push(featureSales, featureBooks, featurePeople);
		return <React.Fragment key={PlanDetails.PlanID}>{featureDetails}</React.Fragment>;
	}

	function BilledPricing(billingDetails) {
		let planIntervalBilling = [];
		billingDetails.plan.forEach((intervalDetails, j) => {
			let planBilling = [];
			intervalDetails.forEach((data, i) => {
				let unit = data.Currency === 'usd' ? '$' : data.Currency;
				let price = data.Amount ? data.Amount : 0;
				if (price !== 0 && data.Interval.toLowerCase() === 'yearly') {
					price = price / 12;
				}
				let userCount = data.Users ? data.Users + 'Users' : 'User/Month';
				planBilling.push(
					<React.Fragment key={i}>
						<td>
							<div className="text-center my-4">
								<div className="plan-price section-heading mr-3">
									<span className="plan-unit">
										<sup>
											<small>{unit}</small>
										</sup>
									</span>
									<span className="plan-price-value">
										<strong>{price}</strong>
									</span>
								</div>
								<p className="plan-user">
									per <span className="font-weight-bold">{userCount} </span>
								</p>
							</div>
						</td>
					</React.Fragment>,
				);
			});
			planIntervalBilling.push(
				<tr key={j}>
					<td className="font-weight-bold h5 pt-5">
						<p>Billed {j === 0 ? ' Monthly' : ' Yearly'}</p>
					</td>
					{planBilling}
				</tr>,
			);
		});
		return (
			<React.Fragment>
				<tr className="font-weight-bold">
					<td colSpan={4} className="section-description h3">
						Pricing
					</td>
				</tr>
				{planIntervalBilling}
			</React.Fragment>
		);
	}
	function purchasePlanID(event, planData) {
		event.preventDefault();
		localStorage.removeItem('planData');
		let AddonData = RangeProfessional;
		if (planData.product === 'Sales' || planData.product.toLowerCase() === 'All-in-One') {
			if (planData.planName === 'Startup') {
				AddonData = RangeStartup;
			}
			if (planData.planName === 'Essential') {
				AddonData = RangeEssential;
			}
			if (planData.planName === 'Professional') {
				AddonData = RangeProfessional;
			}
			planData['Addons'] = [
				{
					Code: 'CONTACT_EMAIL_COUNT',
					Description: 'Contact & email size',
					Amount: AddonData.amount,
					Items: [
						{
							Code: 'CONTACT_COUNT',
							Value: AddonData.contacts,
						},
						{
							Code: 'EMAIL_SEND_COUNT',
							Value: AddonData.emails,
						},
					],
				},
			];
		}
		localStorage.setItem('planData', JSON.stringify(planData));
		const redirectURL = !isAuthenticated
			? `${countryRoute}/sign-up/?product=${planData.product}&planID=${planData.PlanID}`
			: `${countryRoute}/purchase-plan/?product=${planData.product}&planID=${planData.PlanID}`;
		history.push(redirectURL);
	}
	function AllPlanDetails() {
		if (value) {
			var result = Object.keys(value).map(function (key, index) {
				const MonthlyPlan = value[key]['MonthlyPlans'];
				const YearlyPlans = value[key]['YearlyPlans'];
				let PlanData = MonthlyPlan;
				if (duration.yearly) {
					PlanData = YearlyPlans;
				}
				let billedPricing = [];
				billedPricing.push(MonthlyPlan, YearlyPlans);
				let headingData = [];
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
				return (
					<Tab.Pane eventKey={eventKey} key={index}>
						<TabContent>
							<Container className="px-0 mx-auto mb-4">
								<HomeNavbar className="inside-tab" {...props} />
								<Row className="d-flex table-responsive" key={`${key}-${index}-${eventKey}`}>
									<table className="table table-striped table-bordered m-2">
										<thead>
											<tr>
												<th scope="col">
													<Row>
														<Col>
															<h2 className="section-heading">Pick a Plan</h2>
															<div className="section-description">We have the best plans for you</div>
														</Col>
													</Row>
													<Row>
														<Col>
															<div className="plan-duration-toggle my-4">
																<ToggleButtonGroup
																	type="radio"
																	name="options"
																	defaultValue={`${duration.monthly ? 'monthly' : 'yearly'}`}
																	onChange={handleChange}
																>
																	<ToggleButton value={'monthly'}>Monthly</ToggleButton>
																	<ToggleButton value={'yearly'}>Yearly</ToggleButton>
																</ToggleButtonGroup>
																<p className="text-muted">
																	<small>{TranslateText('home.pricingSection.text_save_more')} </small>
																</p>
															</div>
														</Col>
													</Row>
												</th>
												{SortedPlan.forEach((data, i) => {
													let unit = data.Currency === 'usd' ? '$' : data.Currency;
													let price = data.Amount ? data.Amount : 0;
													if (price !== 0 && data.Interval.toLowerCase() === 'yearly') {
														price = price / 12;
													}
													let userCount = data.Users ? data.Users + 'Users' : 'User/Month';
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
													let env = process.env.REACT_APP_ENV;
													let planID = data.PlanID[env];
													let essentialClass = data.PlanName === 'Essential' ? 'essential' : '';
													if (essentialClass) {
														if (product === 'All-in-One') {
															essentialClass = 'backdrop-primary';
														} else {
															essentialClass = 'text-white annotation-' + product.toLowerCase();
														}
													}
													headingData.push(
														<React.Fragment key={`${key}-${index}-${planID}`}>
															<th scope="col" className={`text-center ${essentialClass}`}>
																<Row>
																	<Col>
																		<PlanIcon icon={data.PlanName} key={`icon-0`} />
																		<div className="plan-name section-leader py-1 mt-3">
																			<strong className="ascent-base">{data.PlanName}</strong>
																		</div>

																		<Button
																			className="btn btn-block btn-buy btn-dark my-4"
																			onClick={(event) =>
																				purchasePlanID(event, {
																					PlanID: planID,
																					product: product,
																					Amount: data.Amount,
																					planTitle: data.planTitle,
																					unit: data.unit,
																					duration: data.Interval,
																				})
																			}
																		>
																			{!isAuthenticated ? 'Try it first' : 'Buy Now'}
																		</Button>
																	</Col>
																</Row>
																<Row>
																	<Col className="plan-card">
																		<div className="text-center align-middle my-4">
																			<div className="plan-price section-heading mr-3">
																				<span className="plan-unit">
																					<sup>
																						<small>{unit}</small>
																					</sup>
																				</span>
																				<span className="plan-price-value">
																					<strong>{price}</strong>
																				</span>
																			</div>
																			<p className="plan-user align-middle">
																				<small>per </small>
																				<strong>{userCount} </strong>
																			</p>
																		</div>
																	</Col>
																</Row>
															</th>
														</React.Fragment>,
													);
												})}
												{headingData}
											</tr>
										</thead>
										<tbody>
											<PlanFeatures plan={SortedPlan} />
											<BilledPricing plan={billedPricing} />
										</tbody>
									</table>
								</Row>
							</Container>
						</TabContent>
					</Tab.Pane>
				);
			});
			return <React.Fragment>{result}</React.Fragment>;
		} else {
			return <></>;
		}
	}

	return (
		<>
			<section className="section new-pricing-section home-pricing-section pricing-demo-three" id="pricing">
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container fluid={true} className="section-inner-wrapper">
					<Row>
						<Col xs={12}>
							<Container fluid={true} className="pricing-container-wrapper p-0 m-0">
								<Tab.Container id="pricing" activeKey={key} onSelect={(key) => SetTabValues(key)}>
									<Nav variant="tabs" className="plan-tab-navstrip">
										<Container>
											<Row className="justify-content-center">
												<Col sm={11} className="tabs-on-top d-flex align-items-stretch">
													<Nav.Item className="plan-nav plans-all col-3 px-0">
														<Nav.Link eventKey="all-plans">All-in-One</Nav.Link>
													</Nav.Item>
													<Nav.Item className="plan-nav plans-books col-3 px-0">
														<Nav.Link eventKey="books">Books</Nav.Link>
													</Nav.Item>
													<Nav.Item className="plan-nav plans-sales col-3 px-0">
														<Nav.Link eventKey="sales">Sales</Nav.Link>
													</Nav.Item>
													<Nav.Item className="plan-nav plans-people col-3 px-0">
														<Nav.Link eventKey="people">People</Nav.Link>
													</Nav.Item>
												</Col>
											</Row>
										</Container>
									</Nav>
									<Row>
										<Col xs={12} className="my-5">
											<Container>
												<Row>
													<Col xs={12} className="text-center pricing-text">
														<h2 className="text-secondary">
															<small>Buy now and get </small> 50% off for 3 months
														</h2>
													</Col>
												</Row>
											</Container>
										</Col>
									</Row>
									<Tab.Content className="container my-5" id="plan-tab-container">
										{pricingData.getPlans ? (
											<AllPlanDetails key={key} />
										) : (
											<>
												<Col className="">
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
				</Container>
			</section>
		</>
	);
};
export default PricingDetails;
