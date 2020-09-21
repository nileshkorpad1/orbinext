import React from 'react';
import { Accordion, Card, Col, Container, Row, ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent';

// import { ReactComponent as EssentialIcon } from '../../assets/images/essential-dark.svg';
// import { ReactComponent as IndividualIcon } from '../../assets/images/individual-dark.svg';
// import { ReactComponent as ProfessionalIcon } from '../../assets/images/professional-dark.svg';
// import { ReactComponent as StartupIcon } from '../../assets/images/startup-dark.svg';
import data from '../../components/data/pricing.json';
import HomeNavbar from '@components/Navbars/HomeNavbar';

const planPriceMonthly = data.all.planPriceMonthly;
const planPriceYearly = data.all.planPriceYearly;
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
const PricingOptionTwo = (props) => {
	// let eventKey: any;

	const [value, pricingplan] = React.useState(planPriceMonthly);
	let duration = '/mo';
	const handleChange = (val) => {
		if (val === 'monthly') {
			duration = '/mo';
			pricingplan(planPriceMonthly);
		}
		if (val === 'yearly') {
			duration = '/yr';
			pricingplan(planPriceYearly);
		}
	};

	return (
		<>
			<section className="section pricing-section pricing-demo-two" id="pricing">
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container fluid={true} className="section-inner-wrapper">
					<Row>
						<Col xs={12} className="px-0">
							<Container>
								<Row>
									<Col xs={12} className="text-center pricing-text">
										<h3 className="section-leader">Flexible to your organizations' needs.</h3>
										<h1 className="section-heading pr-0">The perfect plan at the perfect price.</h1>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="px-0">
							<Container fluid={true} className="pricing-container-wrapper p-0 m-0">
								<Tab.Container id="pricing" defaultActiveKey="all-plans">
									<Nav variant="tabs" className="pricing-tab">
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
										<Tab.Pane eventKey="all-plans">
											<TabContent>
												<Container className="px-0 mx-auto mb-4">
													<HomeNavbar className="inside-tab home-page-three-tab" {...props} />
													<Row className="d-flex">
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details individual">
																<div className="plan-card">
																	{/* <IndividualIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Individual</span>
																	</h5>
																	<p className="pricing-text">
																		This plan is ideal for business with small investments like salons and
																		florists.
																	</p>
																	<p className="plan-price">
																		<span className="plan-price-value">
																			<strong>Free</strong>
																		</span>
																		<span className="plan-duration">/lifetime</span>
																	</p>
																	<p className="plan-user">for Individual user</p>
																	<div className="action-container">
																		<Button className="btn btn-block btn-buy">Start Now</Button>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Mobile App</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Accounting
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Products</li>
																							<li className="feature-list-item">
																								Invoices<span>up to 10/month</span>
																							</li>
																							<li className="feature-list-item">
																								Bills and Expenses<span>up to 10/month</span>
																							</li>
																							<li className="feature-list-item">Quotes</li>
																							<li className="feature-list-item">POs</li>
																							<li className="feature-list-item">
																								Online Collections &Payments
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Contacts</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Reports
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Sales Tax Report</li>
																							<li className="feature-list-item">Financial Reports</li>
																							<li className="feature-list-item">Business Reports</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details startup">
																<div className="plan-card">
																	{/* <StartupIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Startup</span>
																	</h5>
																	<p className="pricing-text">
																		Small organisations setting up their business and want to track and manage
																		finances
																	</p>
																	<p className="plan-price">
																		<span className="plan-unit">
																			<sup>{value.startup.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.startup.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for{' '}
																		<span className="font-weight-bold">{value.startup.usernumbers} Users </span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Start Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Mobile App</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Accounting
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Products</li>
																							<li className="feature-list-item">Invoices</li>
																							<li className="feature-list-item">Bills and Expenses</li>
																							<li className="feature-list-item">Quotes</li>
																							<li className="feature-list-item">POs</li>
																							<li className="feature-list-item">
																								Online Collections &Payments
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Contacts</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Reports
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Sales Tax Report</li>
																							<li className="feature-list-item">Financial Reports</li>
																							<li className="feature-list-item">Business Reports</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details essential">
																<div className="plan-card">
																	{/* <EssentialIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
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
																			<sup>{value.essential.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.essential.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for{' '}
																		<span className="font-weight-bold">{value.essential.usernumbers} Users </span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Buy Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Everything in Startup
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Bank
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Bank Connect and Bank Reconciliation
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="2"
																					onClick={(e) => toggleArrow(e, 2)}
																					className="plan-feature-list"
																				>
																					Product
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="2">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Shop</li>
																							<li className="feature-list-item">
																								Inventory Management
																							</li>
																							<li className="feature-list-item">Dropships</li>
																							<li className="feature-list-item">Back Orders</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Multi+
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Multi-Company</li>
																							<li className="feature-list-item">
																								FMultiple Warehouses
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Fixed Assets</Card.Header>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Document Designer
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details professional">
																<div className="plan-card reverse-block-yellow">
																	{/* <ProfessionalIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Professional</span>
																	</h5>
																	<p className="pricing-text">
																		Ideal for organisations that are looking for a robust solution with advanced
																		features to meet their business needs.
																	</p>
																	<p className="plan-price">
																		<span className="plan-unit">
																			<sup>{value.professional.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.professional.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for{' '}
																		<span className="font-weight-bold">
																			{value.professional.usernumbers} Users
																		</span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-buy">
																			Buy Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start for free
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Everything in Essential
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Custom
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Custom Fields & Dimensions
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="2"
																					onClick={(e) => toggleArrow(e, 2)}
																					className="plan-feature-list"
																				>
																					Product
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="2">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Pick/Pack/Ship</li>
																							<li className="feature-list-item">
																								Batch & Serial Numbers
																							</li>
																							<li className="feature-list-item">Bill of Materials</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Multi+
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Multi-Company Additional
																							</li>
																							<li className="feature-list-item">
																								Multiple Warehouses Plus
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Phone Support 8×5</li>
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
													</Row>
												</Container>
											</TabContent>
										</Tab.Pane>
										<Tab.Pane eventKey="books">
											<TabContent>
												<Container className="px-0 mx-auto mb-4">
													<Row className="d-flex">
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details individual">
																<div className="plan-card">
																	{/* <IndividualIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Individual</span>
																	</h5>
																	<p className="pricing-text">
																		This plan is ideal for business with small investments like salons and
																		florists.
																	</p>
																	<p className="plan-price">
																		<span className="plan-price-value">
																			<strong>Free</strong>
																		</span>
																		<span className="plan-duration">/lifetime</span>
																	</p>
																	<p className="plan-user">for Individual user</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Mobile App</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Accounting
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Products</li>
																							<li className="feature-list-item">
																								Invoices<span>up to 10/month</span>
																							</li>
																							<li className="feature-list-item">
																								Bills and Expenses<span>up to 10/month</span>
																							</li>
																							<li className="feature-list-item">Quotes</li>
																							<li className="feature-list-item">POs</li>
																							<li className="feature-list-item">
																								Online Collections &Payments
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Contacts</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Reports
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Sales Tax Report</li>
																							<li className="feature-list-item">Financial Reports</li>
																							<li className="feature-list-item">Business Reports</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details startup">
																<div className="plan-card">
																	{/* <StartupIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Startup</span>
																	</h5>
																	<p className="pricing-text">
																		Small organisations setting up their business and want to track and manage
																		finances
																	</p>
																	<p className="plan-price">
																		<span className="plan-unit">
																			<sup>{value.startup.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.startup.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for
																		<span className="font-weight-bold">{value.startup.usernumbers} Users </span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Start Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Mobile App</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Accounting
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Products</li>
																							<li className="feature-list-item">Invoices</li>
																							<li className="feature-list-item">Bills and Expenses</li>
																							<li className="feature-list-item">Quotes</li>
																							<li className="feature-list-item">POs</li>
																							<li className="feature-list-item">
																								Online Collections &Payments
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Contacts</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Reports
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Sales Tax Report</li>
																							<li className="feature-list-item">Financial Reports</li>
																							<li className="feature-list-item">Business Reports</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details essential">
																<div className="plan-card">
																	{/* <EssentialIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
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
																			<sup>{value.essential.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.essential.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for{' '}
																		<span className="font-weight-bold">{value.essential.usernumbers} Users </span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Buy Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Everything in Startup
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Bank
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Bank Connect and Bank Reconciliation
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="2"
																					onClick={(e) => toggleArrow(e, 2)}
																					className="plan-feature-list"
																				>
																					Product
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="2">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Shop</li>
																							<li className="feature-list-item">
																								Inventory Management
																							</li>
																							<li className="feature-list-item">Dropships</li>
																							<li className="feature-list-item">Back Orders</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Multi+
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Multi-Company</li>
																							<li className="feature-list-item">
																								FMultiple Warehouses
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Fixed Assets</Card.Header>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Document Designer
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details professional">
																<div className="plan-card reverse-block-yellow">
																	{/* <ProfessionalIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Professional</span>
																	</h5>
																	<p className="pricing-text">
																		Ideal for organisations that are looking for a robust solution with advanced
																		features to meet their business needs.
																	</p>
																	<p className="plan-price">
																		<span className="plan-unit">
																			<sup>{value.professional.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.professional.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for
																		<span className="font-weight-bold">
																			{value.professional.usernumbers} Users
																		</span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-buy">
																			Buy Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start for free
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Everything in Essential
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Custom
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Custom Fields & Dimensions
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="2"
																					onClick={(e) => toggleArrow(e, 2)}
																					className="plan-feature-list"
																				>
																					Product
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="2">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Pick/Pack/Ship</li>
																							<li className="feature-list-item">
																								Batch & Serial Numbers
																							</li>
																							<li className="feature-list-item">Bill of Materials</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Multi+
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Multi-Company Additional
																							</li>
																							<li className="feature-list-item">
																								Multiple Warehouses Plus
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Phone Support 8×5</li>
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
													</Row>
												</Container>
											</TabContent>
										</Tab.Pane>
										<Tab.Pane eventKey="sales">
											<TabContent>
												<Container className="px-0 mx-auto mb-4">
													<Row className="d-flex">
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details individual">
																<div className="plan-card">
																	{/* <IndividualIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Individual</span>
																	</h5>
																	<p className="pricing-text">
																		This plan is ideal for business with small investments like salons and
																		florists.
																	</p>
																	<p className="plan-price">
																		<span className="plan-price-value">
																			<strong>Free</strong>
																		</span>
																		<span className="plan-duration">/lifetime</span>
																	</p>
																	<p className="plan-user">for Individual user</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Mobile App</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Accounting
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Products</li>
																							<li className="feature-list-item">
																								Invoices<span>up to 10/month</span>
																							</li>
																							<li className="feature-list-item">
																								Bills and Expenses<span>up to 10/month</span>
																							</li>
																							<li className="feature-list-item">Quotes</li>
																							<li className="feature-list-item">POs</li>
																							<li className="feature-list-item">
																								Online Collections &Payments
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Contacts</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Reports
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Sales Tax Report</li>
																							<li className="feature-list-item">Financial Reports</li>
																							<li className="feature-list-item">Business Reports</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details startup">
																<div className="plan-card">
																	{/* <StartupIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Startup</span>
																	</h5>
																	<p className="pricing-text">
																		Small organisations setting up their business and want to track and manage
																		finances
																	</p>
																	<p className="plan-price">
																		<span className="plan-unit">
																			<sup>{value.startup.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.startup.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for
																		<span className="font-weight-bold">{value.startup.usernumbers} Users </span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Start Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Mobile App</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Accounting
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Products</li>
																							<li className="feature-list-item">Invoices</li>
																							<li className="feature-list-item">Bills and Expenses</li>
																							<li className="feature-list-item">Quotes</li>
																							<li className="feature-list-item">POs</li>
																							<li className="feature-list-item">
																								Online Collections &Payments
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Contacts</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Reports
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Sales Tax Report</li>
																							<li className="feature-list-item">Financial Reports</li>
																							<li className="feature-list-item">Business Reports</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details essential">
																<div className="plan-card">
																	{/* <EssentialIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
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
																			<sup>{value.essential.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.essential.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for{' '}
																		<span className="font-weight-bold">{value.essential.usernumbers} Users </span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Buy Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Everything in Startup
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Bank
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Bank Connect and Bank Reconciliation
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="2"
																					onClick={(e) => toggleArrow(e, 2)}
																					className="plan-feature-list"
																				>
																					Product
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="2">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Shop</li>
																							<li className="feature-list-item">
																								Inventory Management
																							</li>
																							<li className="feature-list-item">Dropships</li>
																							<li className="feature-list-item">Back Orders</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Multi+
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Multi-Company</li>
																							<li className="feature-list-item">
																								FMultiple Warehouses
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Fixed Assets</Card.Header>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Document Designer
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details professional">
																<div className="plan-card reverse-block-yellow">
																	{/* <ProfessionalIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Professional</span>
																	</h5>
																	<p className="pricing-text">
																		Ideal for organisations that are looking for a robust solution with advanced
																		features to meet their business needs.
																	</p>
																	<p className="plan-price">
																		<span className="plan-unit">
																			<sup>{value.professional.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.professional.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for
																		<span className="font-weight-bold">
																			{value.professional.usernumbers} Users
																		</span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-buy">
																			Buy Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start for free
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Everything in Essential
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Custom
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Custom Fields & Dimensions
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="2"
																					onClick={(e) => toggleArrow(e, 2)}
																					className="plan-feature-list"
																				>
																					Product
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="2">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Pick/Pack/Ship</li>
																							<li className="feature-list-item">
																								Batch & Serial Numbers
																							</li>
																							<li className="feature-list-item">Bill of Materials</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Multi+
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Multi-Company Additional
																							</li>
																							<li className="feature-list-item">
																								Multiple Warehouses Plus
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Phone Support 8×5</li>
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
													</Row>
												</Container>
											</TabContent>
										</Tab.Pane>
										<Tab.Pane eventKey="people">
											<TabContent>
												<Container className="px-0 mx-auto mb-4">
													<Row className="d-flex">
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details individual">
																<div className="plan-card">
																	{/* <IndividualIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Individual</span>
																	</h5>
																	<p className="pricing-text">
																		This plan is ideal for business with small investments like salons and
																		florists.
																	</p>
																	<p className="plan-price">
																		<span className="plan-price-value">
																			<strong>Free</strong>
																		</span>
																		<span className="plan-duration">/lifetime</span>
																	</p>
																	<p className="plan-user">for Individual user</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Mobile App</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Accounting
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Products</li>
																							<li className="feature-list-item">
																								Invoices<span>up to 10/month</span>
																							</li>
																							<li className="feature-list-item">
																								Bills and Expenses<span>up to 10/month</span>
																							</li>
																							<li className="feature-list-item">Quotes</li>
																							<li className="feature-list-item">POs</li>
																							<li className="feature-list-item">
																								Online Collections &Payments
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Contacts</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Reports
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Sales Tax Report</li>
																							<li className="feature-list-item">Financial Reports</li>
																							<li className="feature-list-item">Business Reports</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details startup">
																<div className="plan-card">
																	{/* <StartupIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Startup</span>
																	</h5>
																	<p className="pricing-text">
																		Small organisations setting up their business and want to track and manage
																		finances
																	</p>
																	<p className="plan-price">
																		<span className="plan-unit">
																			<sup>{value.startup.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.startup.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for
																		<span className="font-weight-bold">{value.startup.usernumbers} Users </span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Start Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Mobile App</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Accounting
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Products</li>
																							<li className="feature-list-item">Invoices</li>
																							<li className="feature-list-item">Bills and Expenses</li>
																							<li className="feature-list-item">Quotes</li>
																							<li className="feature-list-item">POs</li>
																							<li className="feature-list-item">
																								Online Collections &Payments
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Contacts</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Reports
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Sales Tax Report</li>
																							<li className="feature-list-item">Financial Reports</li>
																							<li className="feature-list-item">Business Reports</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details essential">
																<div className="plan-card">
																	{/* <EssentialIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
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
																			<sup>{value.essential.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.essential.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for{' '}
																		<span className="font-weight-bold">{value.essential.usernumbers} Users </span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-block btn-buy">
																			Buy Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start Now
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Everything in Startup
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Bank
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Bank Connect and Bank Reconciliation
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="2"
																					onClick={(e) => toggleArrow(e, 2)}
																					className="plan-feature-list"
																				>
																					Product
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="2">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Shop</li>
																							<li className="feature-list-item">
																								Inventory Management
																							</li>
																							<li className="feature-list-item">Dropships</li>
																							<li className="feature-list-item">Back Orders</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Multi+
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Multi-Company</li>
																							<li className="feature-list-item">
																								FMultiple Warehouses
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">Fixed Assets</Card.Header>
																			</Card>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Document Designer
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
														<Col xs={12} md={3} className="pr-md-0 pt-1 pb-2">
															<div className="plan-details professional">
																<div className="plan-card reverse-block-yellow">
																	{/* <ProfessionalIcon className="plan-icon" /> */}
																	<h5 className="plan-name py-1">
																		<span>Professional</span>
																	</h5>
																	<p className="pricing-text">
																		Ideal for organisations that are looking for a robust solution with advanced
																		features to meet their business needs.
																	</p>
																	<p className="plan-price">
																		<span className="plan-unit">
																			<sup>{value.professional.unit}</sup>
																		</span>
																		<span className="plan-price-value">
																			<strong>{value.professional.price}</strong>
																		</span>
																		<span className="plan-duration">{duration}</span>
																	</p>
																	<p className="plan-user">
																		for
																		<span className="font-weight-bold">
																			{value.professional.usernumbers} Users
																		</span>
																	</p>
																	<div className="action-container">
																		<a href="#!" className="btn btn-buy">
																			Buy Now
																		</a>
																		<a href="#!" className="btn btn-block btn-free">
																			Start for free
																		</a>
																	</div>
																	<div className="plan-features-wrapper">
																		<Accordion>
																			<Card className="plan-feature">
																				<Card.Header className="feature-list-item">
																					Everything in Essential
																				</Card.Header>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="1"
																					onClick={(e) => toggleArrow(e, 1)}
																					className="plan-feature-list"
																				>
																					Custom
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="1">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Custom Fields & Dimensions
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="2"
																					onClick={(e) => toggleArrow(e, 2)}
																					className="plan-feature-list"
																				>
																					Product
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="2">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Pick/Pack/Ship</li>
																							<li className="feature-list-item">
																								Batch & Serial Numbers
																							</li>
																							<li className="feature-list-item">Bill of Materials</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="3"
																					onClick={(e) => toggleArrow(e, 3)}
																					className="plan-feature-list"
																				>
																					Multi+
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="3">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">
																								Multi-Company Additional
																							</li>
																							<li className="feature-list-item">
																								Multiple Warehouses Plus
																							</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																			<Card>
																				<Accordion.Toggle
																					as={Card.Header}
																					eventKey="4"
																					onClick={(e) => toggleArrow(e, 4)}
																					className="plan-feature-list"
																				>
																					Support
																				</Accordion.Toggle>
																				<Accordion.Collapse eventKey="4">
																					<Card.Body>
																						<ul className="features-list">
																							<li className="feature-list-item">Phone Support 8×5</li>
																							<li className="feature-list-item">Email</li>
																						</ul>
																					</Card.Body>
																				</Accordion.Collapse>
																			</Card>
																		</Accordion>
																	</div>
																</div>
															</div>
														</Col>
													</Row>
												</Container>
											</TabContent>
										</Tab.Pane>
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
									<div className="down-button">
										<a href="#feature" className="go-down">
											<img src={`/static/images/down-arrrow.svg`} alt="" className="" />
										</a>
									</div>

									<div className="plan-duration-toggle">
										<ToggleButtonGroup type="radio" name="options" defaultValue={'monthly'} onChange={handleChange}>
											<ToggleButton value={'monthly'}>Monthly</ToggleButton>
											<ToggleButton value={'yearly'}>Yearly</ToggleButton>
										</ToggleButtonGroup>
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

export default PricingOptionTwo;
