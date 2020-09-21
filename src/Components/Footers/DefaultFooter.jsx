import React, { useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Button, Overlay, Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { ReactComponent as DeskeraLogo } from 'assets/images/deskera-logo.svg';
import { isAndroid, isIOS, isMobile } from 'react-device-detect';
import { CountryDetection } from 'src/routes/CountryDetection';
import HomeNavbar from '@components/Navbars/HomeNavbar';
import TinyFooter from './TinyFooter';
import { useRouter } from 'next/router';

const DefaultFooter = React.forwardRef(function DefaultFooterFunction(props, ref) {
	const router = useRouter();
	let countryRoute = '';
	const [showCountrydrop, setShowCountrydrop] = React.useState(false);
	let pathName = router.pathname;
	let MypathName,
		SGpathName,
		InpathName,
		IdPathName,
		UsPathName = router.pathname;
	const [target, setTarget] = React.useState(null);
	const refDrop = React.useRef(null);

	countryRoute = CountryDetection.myCountry(props);
	if (countryRoute !== '') {
		MypathName = pathName.replace(countryRoute, '/my');
		SGpathName = pathName.replace(countryRoute, '/sg');
		InpathName = pathName.replace(countryRoute, '/in');
		IdPathName = pathName.replace(countryRoute, '/id');
		UsPathName = pathName.replace(countryRoute, ' ');
	} else {
		MypathName = '/my' + pathName;
		SGpathName = '/sg' + pathName;
		InpathName = '/in' + pathName;
		IdPathName = '/id' + pathName;
		UsPathName = pathName;
	}

	useEffect(() => {
		onWindowChange();
		window.addEventListener('scroll', onWindowChange);
		window.addEventListener('resize', onWindowChange);
	});
	const onWindowChange = () => {
		const FooterElement = document.querySelector('#footer');
		if (!FooterElement || typeof window == 'undefined') {
			return undefined;
		}
		if (window.scrollY >= FooterElement.offsetTop / 2 && window.innerHeight > FooterElement.clientHeight) {
			FooterElement.classList.add('sticky');
			FooterElement.parentElement.style.paddingBottom = FooterElement.clientHeight + 'px';
		} else {
			FooterElement.classList.remove('sticky');
			FooterElement.parentElement.style.paddingBottom = '0px';
		}
	};

	const OnCountryPop = (event) => {
		setShowCountrydrop(!showCountrydrop);
		setTarget(event.target);
	};

	const AppDownloadButton = () => {
		if (isMobile) {
			if (isAndroid) {
				return (
					<React.Fragment>
						<h3 className="mt-4">
							<span className="ascent-base">Deskera Mobile</span>
						</h3>
						<p>Carry your Business wherever you go with our integrated mobile application.</p>
						<h5 className="mt-4">Download Deskera for Android</h5>
						<Container fluid={true} className="section-inner-wrapper">
							<Row className="d-flex flex-row justify-content-start">
								<a
									href="https://play.google.com/store/apps/details?id=com.deskera.desk&fbclid=IwAR1hNV5PKV63CTk5lj7cvT00rXapZSI6FOqfCwqLZFtaPDPZIzbgaugv--Y"
									target="_blank"
									rel="noopener noreferrer"
									className="my-2 p-0"
								>
									<img
										alt="Deskera Mobile - Google Playstore"
										src='/static/images/badge-google-play.svg'
										className="image-badge badge-google mw-75"
									/>
								</a>
							</Row>
						</Container>
					</React.Fragment>
				);
			}
			if (isIOS) {
				return (
					<React.Fragment>
						<h3 className="mt-4">
							<span className="ascent-base">Deskera Mobile</span>
						</h3>
						<p>Carry your Business wherever you go with our integrated mobile application.</p>
						<h5 className="mt-4">Download Deskera for iPhone</h5>
						<Container fluid={true} className="section-inner-wrapper">
							<Row className="d-flex flex-row justify-content-start">
								<a
									href="https://apps.apple.com/us/app/desk-business-and-accounting/id1463523833?ls=1"
									target="_blank"
									rel="noopener noreferrer"
									className="my-2 mr-2 p-0"
								>
									<img
										alt="Deskera Mobile - Apple Store"
										src='/static/images/badge-app-store.svg'
										className="image-badge badge-apple mw-75"
									/>
								</a>
							</Row>
						</Container>
					</React.Fragment>
				);
			}
		} else {
			return (
				<React.Fragment>
					<h3 className="mt-4">
						<span className="ascent-base">Deskera Mobile</span>
					</h3>
					<p>Carry your Business wherever you go with our integrated mobile application.</p>
					<h5 className="mt-4">Download Deskera for mobile</h5>
					<Container fluid={true} className="section-inner-wrapper">
						<Row className="d-flex flex-row justify-content-start">
							<a
								href="https://apps.apple.com/us/app/desk-business-and-accounting/id1463523833?ls=1"
								target="_blank"
								rel="noopener noreferrer"
								className="my-2 mr-2 p-0"
							>
								<img
									alt="Deskera Mobile - Apple Store"
									src='/static/images/badge-app-store.svg'
									className="image-badge badge-apple mw-75"
								/>
							</a>
							<a
								href="https://play.google.com/store/apps/details?id=com.deskera.desk&fbclid=IwAR1hNV5PKV63CTk5lj7cvT00rXapZSI6FOqfCwqLZFtaPDPZIzbgaugv--Y"
								target="_blank"
								rel="noopener noreferrer"
								className="my-2 p-0"
							>
								<img
									alt="Deskera Mobile - Google Playstore"
									src={'/static/images/badge-google-play.svg'}
									className="image-badge badge-google mw-75"
								/>
							</a>
						</Row>
					</Container>
				</React.Fragment>
			);
		}
	};

	return (
		<React.Fragment>
			<footer className="section home-footer-section backdrop-light has-layer-none has-logo-dark" id="footer" ref={ref}>
				<section>
					<HomeNavbar {...props} />
					<div className="divider" />
					<Container>
						<Row className="row mt-5 text-left justify-content-start">
							<Col xs={12}>
								<Link href={`${countryRoute}/`}>
									<a className="logo-link footer-logo-link">
										<img src={`/static/images/deskera-logo.svg`} alt="deskera" className="logo logo-footer" />
									</a>
								</Link>
								<OverlayTrigger overlay={<Tooltip id={`tooltip-bottom`}>Click here to change region</Tooltip>}>
									<Button variant="link" className="py-0 mt-2" onClick={OnCountryPop}>
										<img
											alt="Deskera"
											src={`/static/images/flag-${countryRoute ? countryRoute.replace(/\//g, '') : 'usa'}@2x.png`}
											style={{ width: '30px' }}
											className="logo logo-footer"
										/>
									</Button>
								</OverlayTrigger>
								<div ref={refDrop}>
									<Overlay show={showCountrydrop} target={target} placement="bottom" container={refDrop.current} containerPadding={20}>
										<Popover id="popover-contained" style={{ minWidth: '300px' }}>
											<Popover.Title as="h3" className="p-2 border-0">
												Choose your country
										</Popover.Title>
											<Popover.Content>
												<Row className="justify-content-center">
													<Col className="text-center">
														<a href={UsPathName}>
															<img
																alt="Deskera"
																src={`/static/images/flag-usa@2x.png`}
																style={{ width: '30px' }}
																className="logo logo-footer"
															/>
														</a>
														<p>USA</p>
													</Col>
													<Col className="text-center">
														<a href={SGpathName}>
															<img
																alt="Deskera"
																src={`/static/images/flag-sg@2x.png`}
																style={{ width: '30px' }}
																className="logo logo-footer"
															/>
														</a>
														<p>Singapore</p>
													</Col>
													<Col className="text-center">
														<a href={MypathName}>
															<img
																alt="Deskera"
																src={`/static/images/flag-my@2x.png`}
																style={{ width: '30px' }}
																className="logo logo-footer"
															/>
														</a>

														<p>Malaysia</p>
													</Col>
												</Row>
												<Row>
													<Col className="text-center">
														<a href={IdPathName}>
															<img
																alt="Deskera"
																src={`/static/images/flag-id@2x.png`}
																style={{ width: '30px' }}
																className="logo logo-footer"
															/>
														</a>

														<p>Indonesia</p>
													</Col>
													<Col className="text-center">
														<a href={UsPathName}>
															<img
																alt="Deskera"
																src={`/static/images/flag-ph@2x.png`}
																style={{ width: '30px' }}
																className="logo logo-footer"
															/>
														</a>

														<p>Philippines</p>
													</Col>
													<Col className="text-center">
														<a href={InpathName}>
															<img
																alt="Deskera"
																src={`/static/images/flag-in@2x.png`}
																style={{ width: '30px' }}
																className="logo logo-footer"
															/>
														</a>

														<p>India</p>
													</Col>
												</Row>
											</Popover.Content>
										</Popover>
									</Overlay>
								</div>
							</Col>
						</Row>
						<Row className="row text-left justify-content-start mt-4">
							<Col xs={12} sm={12} lg={3} className="pr-lg-5">
								<Container fluid={true} className="pr-lg-0">
									<Row className="row text-left justify-content-start">
										<Col sm={12} className="p-0 pr-lg-2">
											<h3>
												<span className="ascent-base">Deskera Products</span>
											</h3>
										</Col>
									</Row>
									<Row className="row text-left justify-content-start mt-2">
										<Col sm={6} md={12} className="p-0 pr-sm-4 pr-lg-4">
											<h4 className="">
												<Link href={`${countryRoute}/books/`}><a>Books</a></Link>
											</h4>
											<p>
												<Link href={`${countryRoute}/books/`}><a>Books</a></Link> Offers{' '}
												<Link href={`${countryRoute}/books/create-invoices-with-deskera-books/`}><a>Invoices</a></Link>,{' '}
												<Link href={`${countryRoute}/books/creating-quotes/`}><a>Quotes</a></Link>,{' '}
												<Link href={`${countryRoute}/books/buying-and-purchase-orders/`}><a>Purchase Orders</a></Link>,{' '}
												<Link href={`${countryRoute}/books/paying-bills-with-deskera/`}><a>Bills</a></Link>,{' '}
												<Link href={`${countryRoute}/books/products-and-inventory/`}><a>Product and Inventory Management</a></Link>,{' '}
												<Link href={`${countryRoute}/books/chart-of-accounts-with-deskera-books/`}><a>Chart of Accounts</a></Link>,{' '}
												<Link href={`${countryRoute}/books/creating-credit-notes-in-deskera/`}><a>Credit</a></Link> and{' '}
												<Link href={`${countryRoute}/books/debit-notes-with-deskera/`}><a>Debit Notes</a></Link>,{' '}
												<Link href={`${countryRoute}/books/custom-fields-in-deskera/`}><a>Custom Fields</a></Link>,{' '}
												<Link href={`${countryRoute}/books/bank-integration/`}><a>Bank Integration</a></Link> and{' '}
												<Link href={`${countryRoute}/books/bank-integration/`}><a>Online Collection</a></Link>.
										</p>
											<h4 className="mt-4">
												<Link href={`${countryRoute}/sales/`}><a>Sales</a></Link>
											</h4>
											<p>
												<Link href={`${countryRoute}/sales/`}><a>Sales</a></Link> Offers{' '}
												<Link href={`${countryRoute}/sales/customer-relationship-management-contacts/`}><a>Contacts</a></Link>,{' '}
												<Link href={`${countryRoute}/sales/more-about-crm/`}><a>Cards and Activities</a></Link>,{' '}
												<Link href={`${countryRoute}/sales/deals-with-deskera-sales/`}><a>Deal Stages</a></Link>,{' '}
												<Link href={`${countryRoute}/sales/more-about-crm/`}><a>Dashboard and Pipelines</a></Link>,{' '}
												<Link href={`${countryRoute}/sales/user-role-management-with-deskera/`}><a>Roles and a Contact Master</a></Link>.
										</p>
											<h4 className="mt-4">
												<Link href={`${countryRoute}/people/`}><a>People</a></Link>
											</h4>
											<p>
												Run <Link href={`${countryRoute}/people/manage-payroll/`}><a>Payroll Submit</a></Link>{' '}
												<Link href={`${countryRoute}/people/expenses-and-claims/`}><a>Claims and Expenses</a></Link>{' '}
												<Link href={`${countryRoute}/people/attendance-and-leave/`}><a>Manage Leaves and Time-offs</a></Link>.
										</p>
										</Col>
										{/* <Col sm={12} md={12} className="px-0 pr-lg-4">
									<h3 className="mt-4"><span className="ascent-base">Industries</span></h3>
									<p>Deskera is uniquely suited to work for businesses in multiple industries. See which ones we offer.</p>
								</Col> */}
									</Row>
								</Container>
							</Col>
							<Col xs={12} sm={12} lg={6} className="pr-lg-4">
								<Container fluid={true} className="">
									<Row className="row text-left justify-content-start">
										<Col sm={12} className="p-0">
											<h3 className="mt-4 mt-lg-0">
												<span className="ascent-base">Features</span>
											</h3>
										</Col>
									</Row>
									<Row className="row text-left justify-content-start align-items-start">
										<Col sm={12} md={6} className="p-0 pr-lg-4">
											<p>
												<Link href={`${countryRoute}/books/accounting/`}><a>Better Accounting for Business</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/back-orders-with-deskera-books/`}><a>Back Orders with Deskera Books</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/bank-integration/`}><a>Banking with Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/buying-and-purchase-orders/`}><a>Making Purchases with Ease</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/contacts/`}><a>Building Contacts and Relationships</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/creating-quotes/`}><a>Creating Quotes with Deskera Books</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/creating-credit-notes-in-deskera/`}>
													<a>
														Credit Notes with Deskera Books
											</a>
												</Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/custom-fields-in-deskera/`}><a>Custom Fields in Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/debit-notes-with-deskera/`}><a>Debit Notes with Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/deposits-with-deskera/`}><a>Deposits with Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/chart-of-accounts-with-deskera-books/`}><a>
													Deskera’s Chart of Accounts
											</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/dropship-with-deskera-books/`}><a>Dropship with Deskera Books</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/create-invoices-with-deskera-books/`}><a>Invoicing with Deskera Books</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/journal-entries-with-deskera/`}><a>Journal Entries with Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/deskera-ledger-report-opening-balances/`}><a>
													Opening Balances Deskera Ledger
											</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/opening-balances-with-deskera/`}><a>Opening Balances with Deskera</a></Link>
											</p>
										</Col>
										<Col sm={12} md={6} className="p-0 pl-lg-4">
											<p>
												<Link href={`${countryRoute}/books/pick-pack-ship/`}><a>Pick Pack Ship with Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/products-and-inventory/`}><a>Inventory with Deskera Books</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/quickbooks-alternative/`}><a>Moving on from Quickbooks</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/reports/`}><a>Customized Reports and More</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/paying-bills-with-deskera/`}><a>Stay on Top of Your Billing</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/taxes-gst-and-more/`}><a>Easy Tax Filing with Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/books/warehouse-management/`}><a>Warehouse Management with Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/sales/more-about-crm/`}><a>Discover Customer Relations</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/sales/customer-relationship-management-contacts/`}><a>
													Know and Work with Your Contacts
											</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/sales/deals-with-deskera-sales/`}><a>Easy Deals with Deskera Sales</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/sales/user-role-management-with-deskera/`}><a>
													User Role Management with Deskera
											</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/people/manage-payroll/`}><a>Manage Payroll with Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/people/attendance-and-leave/`}><a>Attendance and Leave</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/people/expenses-and-claims/`}><a>Expenses and Claims</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/deskera-bookkeeper/`}><a>Bookkeeper and Accountants</a></Link>
											</p>
										</Col>
									</Row>
								</Container>
							</Col>
							<Col xs={12} sm={12} lg={3} className="pl-lg-4 pr-lg-0">
								<Container fluid={true} className="">
									<Row className="row text-left justify-content-start">
										<Col xs={6} lg={12} className="pl-0">
											<h3 className="mt-4 mt-lg-0">
												<span className="ascent-base">Company</span>
											</h3>
											<p>
												<Link href={`${countryRoute}/about-us/`}><a>About Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/why-deskera`}><a>Why Deskera</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/careers/`}><a>Careers</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/deskera-contact/`}><a>Contact Us</a></Link>
											</p>
										</Col>
										<Col xs={6} lg={12} className="pl-0">
											<h3 className="mt-4">
												<span className="ascent-base">Resources</span>
											</h3>
											<p>
												<Link href={`${countryRoute}/deskera-pricing/`}><a>Deskera Pricing</a></Link>
											</p>
											<p>
												<a href="https://www.deskera.com/blog/">Deskera Blog</a>
											</p>
											<p>
												<a href="https://medium.com/deskera-engineering">Deskera Engineering</a>
											</p>
											<p>
												<a href="https://care.deskera.com/">Customer Care</a>
											</p>
										</Col>
										<Col xs={12} lg={12} className="pl-0">
											<AppDownloadButton />
										</Col>
									</Row>
								</Container>
							</Col>
						</Row>
						<Row className="row text-left justify-content-start mt-4">
							<Col xs={12} sm={12} lg={12}>
								<Container fluid={true} className="">
									<Row className="row text-left justify-content-start">
										<Col sm={12} className="p-0">
											<h3 className="mt-4 mt-lg-0">
												<span className="ascent-base">
													<Link href={`${countryRoute}/industries/`}><a>Industries we serve</a></Link>
												</span>
											</h3>
										</Col>
									</Row>
									<Row className="row text-left justify-content-start align-items-start">
										<Col xs={6} md={3} className="p-0 pl-sm-0 pl-md-0 pl-lg-0 order-last order-md-first">
											<p>
												<Link href={`${countryRoute}/industries/cafes/`}><a>Cafes</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/shopify-sellers/`}><a>Shopify Seller</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/franchises/`}><a>Franchises</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/ecommerce/`}><a>eCommerce</a></Link>
											</p>
										</Col>
										<Col xs={6} md={3} className="p-0 pl-sm-0 pl-md-2 pl-lg-2">
											<p>
												<Link href={`${countryRoute}/industries/creative-agencies/`}><a>Creative Agencies</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/manufacturing-businesses/`}><a>Manufacturing</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/tourism-businesses/`}><a>Tourism</a></Link>
											</p>
										</Col>
										<Col xs={6} md={3} className="p-0 pl-sm-0 pl-md-4 pl-lg-4">
											<p>
												<Link href={`${countryRoute}/industries/retail-businesses/`}><a>Retail</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/regional-businesses/`}><a>Regional businesses</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/startups/`}><a>Startups</a></Link>
											</p>
										</Col>
										<Col xs={6} md={2} className="p-0 pl-sm-0 pl-md-4 pl-lg-4 ml-lg-2 ml-md-2">
											<p>
												<Link href={`${countryRoute}/industries/wholesale-trading/`}><a>Wholesale Trading</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/information-technology-businesses/`}><a>Information Technology</a></Link>
											</p>
											<p>
												<Link href={`${countryRoute}/industries/healthcare-industry/`}><a>Healthcare</a></Link>
											</p>
										</Col>
									</Row>
								</Container>
							</Col>
						</Row>
					</Container>
				</section>
				<TinyFooter {...props} />
			</footer>
		</React.Fragment>
	);
});

export default DefaultFooter;
