import React from 'react';
import { Accordion, Card, Col, Container, Row, ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent';

// import { ReactComponent as EssentialIcon } from '../../assets/images/essential-dark.svg';
// import { ReactComponent as IndividualIcon } from '../../assets/images/individual-dark.svg';
// import { ReactComponent as ProfessionalIcon } from '../../assets/images/professional-dark.svg';
// import { ReactComponent as StartupIcon } from '../../assets/images/startup-dark.svg';

import HomeNavbar from '@components/Navbars/HomeNavbar';

import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { useHistory } from 'react-router-dom';
import ReactSlider from 'react-slider';
import TranslateText from '@Helpers/TranslateText';
import { CountryDetection } from 'src/routes/CountryDetection';
import { StoreState } from '@store/types';

function toggleArrow(event, eventKey) {
	//do with event
	let CardHeader = document.querySelectorAll('.accordion .card-header');
	for (let i = 0; i <= CardHeader.length; i++) {
		if (typeof CardHeader[i] !== 'undefined') {
			CardHeader[i].classList.remove('active');
		}
	}

	event.currentTarget.classList.toggle('active');
}

const HomePricingSection = (props) => {
	let countryRoute = CountryDetection.myCountry(props);
	const isAuthenticated = useSelector((state: StoreState) => state.authentication.authenticated);
	const [key, setKey] = React.useState('all-plans');
	const [subscription] = React.useState(JSON.parse(localStorage.getItem('user_subscription')));
	const [currentProduct, setCurrentProduct] = React.useState(null);
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

	React.useEffect(() => {
		for (var key in subscription) {
			if (subscription[key]['Name'] !== '') {
				setCurrentProduct(subscription[key]);
			}
		}
	}, [subscription, currentProduct]);

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
		}
	}

	function MainFeatureList(feature) {
		let featureMainList = [];
		let eventkey = 0;
		feature.mainList.forEach((displayFeature, i) => {
			if (displayFeature.IsGroup) {
				featureMainList.push(
					<Card key={i}>
						<Accordion.Toggle
							as={Card.Header}
							eventKey={`${eventkey}`}
							onClick={(e) => toggleArrow(e, { eventkey })}
							className="plan-feature-list"
						>
							{displayFeature.Name}
						</Accordion.Toggle>
						<Accordion.Collapse eventKey={`${eventkey}`}>
							<Card.Body>
								<ul className="features-list">
									<SubFeatureList subList={displayFeature.Items} />
								</ul>
							</Card.Body>
						</Accordion.Collapse>
					</Card>,
				);
			} else {
				featureMainList.push(
					<Card className="plan-feature" key={i}>
						<Card.Header className="feature-list-item">{displayFeature.Name}</Card.Header>
					</Card>,
				);
			}
			eventkey++;
		});
		return <>{featureMainList}</>;
	}

	function SubFeatureList(subFeature) {
		let subFeaturesList = [];
		subFeature.subList.forEach((subListValue, i) => {
			subFeaturesList.push(
				<React.Fragment key={i}>
					<li className="feature-list-item">{subListValue}</li>
				</React.Fragment>,
			);
		});
		return <>{subFeaturesList}</>;
	}
	function PlanFeatures(PlanDetails) {
		let planFeatures = PlanDetails.plan.Features;
		let featureDetails = [];
		planFeatures.forEach((feature, i) => {
			if (feature.Product === 'CRM') {
				featureDetails[0] = (
					<React.Fragment key={i}>
						<div className="product-heading my-3" key={i}>
							<span className="sub-heading">{`${feature.DisplayHeader} `}</span>
							<span className="h5">Deskera CRM</span>
						</div>
						<UserCountSlider plan={PlanDetails.plan} />
						<MainFeatureList mainList={feature.DisplayFeatures} />
					</React.Fragment>
				);
			} else if (feature.Product === 'ERP') {
				featureDetails[1] = (
					<React.Fragment key={i}>
						<div className="product-heading my-3" key={i}>
							<span className="sub-heading">{`${feature.DisplayHeader} `}</span>
							<span className="h5">Deskera Books</span>
						</div>
						<MainFeatureList mainList={feature.DisplayFeatures} />
					</React.Fragment>
				);
			} else if (feature.Product === 'PEOPLE') {
				featureDetails[2] = (
					<React.Fragment key={i}>
						<div className="product-heading my-3" key={i}>
							<span className="sub-heading">{`${feature.DisplayHeader} `}</span>
							<span className="h5">Deskera People</span>
						</div>
						<MainFeatureList mainList={feature.DisplayFeatures} />
					</React.Fragment>
				);
			} else {
				featureDetails[3] = (
					<React.Fragment key={i}>
						<div className="product-heading my-3" key={i}>
							<span className="sub-heading">{`${feature.DisplayHeader} `}</span>
							<span className="h5">Deskera CRM</span>
						</div>
						<MainFeatureList mainList={feature.DisplayFeatures} />
					</React.Fragment>
				);
			}
		});
		return (
			<React.Fragment>
				<div className="plan-features-wrapper">
					<Accordion>{featureDetails}</Accordion>
				</div>
			</React.Fragment>
		);
	}

	function UserCountSlider(PlanDetails) {
		const addOns = PlanDetails.plan.Addons;
		let planTitle = PlanDetails.plan.PlanName;
		switch (planTitle.toLowerCase()) {
			case 'startup':
				const AddonStartupItem = addOns['0']['Items'];
				const AddonStepStartupLength = AddonStartupItem['0']['Values'].length - 1;
				return (
					<div className="sales-range-slider startup">
						<p className="addon-price mr-3">
							<small>
								<span className="plan-unit">$</span>{' '}
								<span className="addon-price-value">
									<strong>{numberWithCommas(RangeStartup.amount)}</strong>{' '}
									<span className="plan-duration">per Month for selected addons</span>
								</span>
							</small>
						</p>
						<p className="contacts-count text-center">
							<small>{numberWithCommas(RangeStartup.contacts)} Contacts</small>
						</p>

						<ReactSlider
							value={RangeStartup.range}
							className="horizontal-slider"
							thumbClassName="range-slider-thumb"
							min={0}
							step={1}
							max={AddonStepStartupLength}
							trackClassName="range-slider-track"
							renderThumb={(props, state) => (
								<React.Fragment key={AddonStepStartupLength - 1}>
									<div {...props}></div>
								</React.Fragment>
							)}
							onAfterChange={(value) => startupHandle(value, AddonStartupItem)}
						/>

						<p className="emails-count text-center">
							<small>{numberWithCommas(RangeStartup.emails)} Emails</small>
						</p>
					</div>
				);
			case 'essential':
				const AddonEssentialItem = addOns['0']['Items'];
				const AddonEssentialStepLength = AddonEssentialItem['0']['Values'].length - 1;
				return (
					<div className="sales-range-slider essential">
						<p className="addon-price mr-3">
							<small>
								<span className="plan-unit">$</span>{' '}
								<span className="addon-price-value">
									<strong>{numberWithCommas(RangeEssential.amount)}</strong>{' '}
									<span className="plan-duration">per Month for selected addons</span>
								</span>
							</small>
						</p>
						<p className="contacts-count text-center">
							<small>{numberWithCommas(RangeEssential.contacts)} Contacts</small>
						</p>
						<ReactSlider
							value={RangeEssential.range}
							className="horizontal-slider"
							thumbClassName="range-slider-thumb"
							min={0}
							step={1}
							max={AddonEssentialStepLength}
							trackClassName="range-slider-track"
							renderThumb={(props, state) => (
								<React.Fragment key={AddonEssentialStepLength - 1}>
									<div {...props}></div>
								</React.Fragment>
							)}
							onAfterChange={(value) => essentialHandle(value, AddonEssentialItem)}
						/>
						<p className="emails-count text-center">
							<small>{numberWithCommas(RangeEssential.emails)} Emails</small>
						</p>
					</div>
				);

			case 'professional':
				const AddonProfesionalItem = addOns['0']['Items'];
				const AddonProfessionalStepLength = AddonProfesionalItem['0']['Values'].length - 1;
				return (
					<div className="sales-range-slider professional">
						<p className="addon-price mr-3">
							<small>
								<span className="plan-unit">$</span>{' '}
								<span className="addon-price-value">
									<strong>{numberWithCommas(RangeProfessional.amount)}</strong>{' '}
									<span className="plan-duration">per Month for selected addons</span>
								</span>
							</small>
						</p>
						<p className="contacts-count text-center">
							<small>{numberWithCommas(RangeProfessional.contacts)} Contacts</small>
						</p>
						<ReactSlider
							value={RangeProfessional.range}
							className="horizontal-slider"
							thumbClassName="range-slider-thumb"
							min={0}
							step={1}
							max={AddonProfessionalStepLength}
							trackClassName="range-slider-track"
							renderThumb={(props, state) => (
								<React.Fragment key={AddonProfesionalItem - 1}>
									<div {...props}></div>
								</React.Fragment>
							)}
							onAfterChange={(value) => professionalHandle(value, AddonProfesionalItem)}
						/>
						<p className="emails-count text-center">
							<small>{numberWithCommas(RangeProfessional.emails)} Emails</small>
						</p>
					</div>
				);
		}

		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
		function startupHandle(index, AddonItem) {
			setRangeStartup((RangeStartup) => ({
				...RangeStartup,
				range: Number(index),
				contacts: Number(AddonItem['0']['Values'][index]),
				emails: Number(AddonItem['1']['Values'][index]),
				amount: Number(AddonItem['2']['Values'][index]),
			}));
		}
		function essentialHandle(index, AddonItem) {
			setRangeEssential((RangeEssential) => ({
				...RangeEssential,
				range: Number(index),
				contacts: Number(AddonItem['0']['Values'][index]),
				emails: Number(AddonItem['1']['Values'][index]),
				amount: Number(AddonItem['2']['Values'][index]),
			}));
		}
		function professionalHandle(index, AddonItem) {
			setRangeProfessional((RangeProfessional) => ({
				...RangeProfessional,
				range: Number(index),
				contacts: Number(AddonItem['0']['Values'][index]),
				emails: Number(AddonItem['1']['Values'][index]),
				amount: Number(AddonItem['2']['Values'][index]),
			}));
		}
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

				return (
					<Tab.Pane eventKey={eventKey} key={index}>
						<TabContent>
							<Container className="px-0 mx-auto mb-4">
								<HomeNavbar className="inside-tab" {...props} />
								<Row className="d-flex">
									{SortedPlan.forEach((data, i) => {
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
										let planTitle = data.PlanName;
										let env = process.env.REACT_APP_ENV;
										let planID = data.PlanID[env];
										let activePlan = false;
										if (currentProduct && currentProduct['PlanID'] === planID) {
											activePlan = true;
										}
										let planTitleInLower = planTitle.toLowerCase();
										let planDescription = data.desciption ? '<p className="pricing-text">' + data.desciption + '</p>' : '';
										let unit = data.Currency === 'usd' ? '$' : data.Currency;
										let price = data.Amount ? data.Amount : 0;
										if (price !== 0 && data.Interval.toLowerCase() === 'yearly') {
											price = price / 12;
										}
										let duration = data.Duration ? data.Duration : '';
										let userCount = data.Users ? data.Users + 'Users' : 'User/Month';
										let textReverse = '';

										if (key !== 'all') {
											textReverse = planTitleInLower === 'essential' ? 'text-reverse' : '';
										}
										let mostPopular =
											planTitleInLower === 'essential' ? (
												<div className="card-label">
													{' '}
													<p className="label-text">Most Popular</p>{' '}
												</div>
											) : (
												''
											);

										pricingPlanData.push(
											<Col xs={12} md={6} lg={4} className="pr-md-0 pt-1 pb-2" key={i}>
												<div
													className={`plan-details ${planTitle.toLowerCase()} ${textReverse}${
														activePlan ? ' active-subscribed-plan' : ''
													}`}
												>
													<div className="plan-card">
														<PlanIcon icon={planTitle} key={`icon-${i}`} />
														<h4 className="plan-name py-1">
															<span className="ascent-base">{planTitle}</span>
														</h4>
														{planDescription}
														{mostPopular}
														<div className="d-flex px-1 align-items-baseline">
															<p className="plan-price mr-3">
																<span className="plan-unit">
																	<sup>{unit}</sup>
																</span>
																<span className="plan-price-value">
																	<strong>{price}</strong>
																</span>
																<span className="plan-duration">{duration}</span>
															</p>
															<p className="plan-user">
																per <span className="font-weight-bold">{userCount} </span>
															</p>
														</div>
														<div className="action-container">
															{!activePlan ? (
																<React.Fragment>
																	<Button
																		className="btn btn-block btn-buy "
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
																		{!isAuthenticated ? 'Try it first' : 'Buy Now'}
																	</Button>
																</React.Fragment>
															) : (
																<React.Fragment>
																	<a href={`${process.env.REACT_APP_PRODUCT_GO}`} className="btn btn-block btn-buy">
																		Upgrade Now
																	</a>
																</React.Fragment>
															)}
															<p>
																<small>
																	{!isAuthenticated
																		? '30 days Free Trial, No Credit Card Required.'
																		: 'Check out all the plans'}
																</small>
															</p>
															{/* <a href="/sign-up/" className="btn btn-block btn-free">
																Start Now
															</a> */}
														</div>
														<PlanFeatures plan={data} />
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
			});
			return <React.Fragment>{result}</React.Fragment>;
		} else {
			return <></>;
		}
	}

	return (
		<>
			<section className="section pricing-section home-pricing-section pricing-demo-three" id="pricing">
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container fluid={true} className="section-inner-wrapper">
					<Row>
						<Col xs={12} className="px-0">
							<Container>
								<Row>
									<Col xs={12} className="text-center pricing-text">
										<h3 className="section-leader">{TranslateText('home.pricingSection.leader')}</h3>
										<h2 className="section-heading pr-0 mb-5">{TranslateText('home.pricingSection.heading')}</h2>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="px-0">
							<Container fluid={true} className="pricing-container-wrapper p-0 m-0">
								<Tab.Container id="pricing" activeKey={key} onSelect={(key) => SetTabValues(key)}>
									<Nav variant="tabs" className="plan-tab-navstrip">
										<Container>
											<Row className="justify-content-center">
												<Col sm={11} className="d-flex align-items-stretch mt-2">
													<Nav.Item className="plan-nav plans-all col-3 px-1">
														<Nav.Link eventKey="all-plans">All-in-One</Nav.Link>
													</Nav.Item>
													<Nav.Item className="plan-nav plans-books col-3 px-1">
														<Nav.Link eventKey="books">Books</Nav.Link>
													</Nav.Item>
													<Nav.Item className="plan-nav plans-sales col-3 px-1">
														<Nav.Link eventKey="sales">Sales</Nav.Link>
													</Nav.Item>
													<Nav.Item className="plan-nav plans-people col-3 px-1">
														<Nav.Link eventKey="people">People</Nav.Link>
													</Nav.Item>
												</Col>
											</Row>
										</Container>
									</Nav>
									<Tab.Content className="container" id="plan-tab-container">
										{pricingData.getPlans ? (
											<AllPlanDetails />
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
				<Container className="post-section">
					<Row>
						<Col xs={12}>
							<Container className="py-5">
								<Row className="d-flex align-items-center">
									<div className="down-button d-none">
										<a href="#feature" className="go-down">
											<img src={`/static/images/down-arrrow.svg`} alt="" className="" />
										</a>
									</div>
									<div className="plan-duration-toggle text-center">
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
								</Row>
							</Container>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};
export default HomePricingSection;
