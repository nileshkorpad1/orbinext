import { gsap } from 'gsap';
import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Element, Events, scroller } from 'react-scroll';
import { ScrollScene } from 'scrollscene';
import { WithTranslation, withTranslation } from 'react-i18next';
import HomeNavbar from '../../components/Navbars/HomeNavbar';
import { ParallaxBanner } from '../../components/ParallaxBanner';
import { RouteComponentProps } from 'react-router-dom';
import { CountryDetection } from 'src/routes/CountryDetection';

// import { ReactComponent as ProductIconBooks } from '../../assets/images/icon-product-books-mono-fill.svg';
// import { ReactComponent as ProductIconPeople src="/assets/images/icon-product-people-mono-fill.svg" alt="people" } from '../../assets/images/icon-product-people-mono-fill.svg';
// import { ReactComponent as ProductIconSales } from '../../assets/images/icon-product-sales-mono-fill.svg';
interface KeyFeatureProps extends RouteComponentProps , WithTranslation {
	t: any;
}
class HomeKeyFeaturesSection extends React.Component<KeyFeatureProps> {
	featureRef: any;
	detailedRef: any;
	flexibleRef: any;
	integratedRef: any;
	detailedTextRef: any;
	flexibleTextRef: any;
	integratedTextRef: any;
	innerComponentThirdRef: any;
	verticalCarouselRef: any;
	stickyRef: any;
	featureHeading: any;
	state = {
		stickyHeight: null,
		positionTop: null,
		show: false,
		isTabletOrMobileDevice: false,
	};
	constructor(props) {
		super(props);
		this.featureRef = React.createRef();
		this.detailedRef = React.createRef();
		this.flexibleRef = React.createRef();
		this.integratedRef = React.createRef();
		this.detailedTextRef = React.createRef();
		this.flexibleTextRef = React.createRef();
		this.integratedTextRef = React.createRef();
		this.verticalCarouselRef = React.createRef();
		this.stickyRef = React.createRef();
		this.featureHeading = React.createRef();
		this.handleResize = this.handleResize.bind(this);
	}
	// init ref

	componentDidMount() {
		this.handleResize();
		const { current: detailedElement } = this.detailedRef;
		const { current: flexibleElement } = this.flexibleRef;
		const { current: integratedElement } = this.integratedRef;
		const { current: detailedTextElement } = this.detailedTextRef;
		const { current: flexibleTextElement } = this.flexibleTextRef;
		const { current: integratedTextElement } = this.integratedTextRef;
		window.addEventListener('resize', this.handleResize);
		Events.scrollEvent.register('begin', function () {
			// console.log('begin', arguments);
		});

		Events.scrollEvent.register('end', function () {
			// console.log('end', arguments);
		});

		if (!detailedElement) {
			return undefined;
		}
		const t1 = gsap.timeline({ paused: true });

		const parallaxChild = document.querySelectorAll('.parallax-child');

		Array.prototype.forEach.call(parallaxChild, function (el, i) {
			t1.to(parallaxChild, {
				y: -40,
				duration: 1,
				ease: 'Linear.easeNone',
			});
		});

		const stepNode = document.querySelectorAll('.step');

		Array.prototype.forEach.call(stepNode, function (el, i) {
			// eslint-disable-next-line
			const scrollSceneStep = new ScrollScene({
				triggerElement: stepNode,
				offset: 1,
				gsap: {
					timeline: t1,
				},
				duration: '100%',

				triggerHook: 1,
				breakpoints: { 0: false, 768: true },
			});
		});
		// eslint-disable-next-line
		const scrollScene = new ScrollScene({
			triggerElement: detailedElement,
			offset: 1,
			duration: this.stickyRef.current.offsetHeight,
			toggle: {
				element: detailedTextElement,
				className: 'active',
				reverse: true,
			},

			triggerHook: '0.5',
			breakpoints: { 0: false, 768: true },
		});

		// scrollScene.Scene.addIndicators({ name: 'pin scene 1', colorEnd: 'red' });
		// eslint-disable-next-line
		const scrollSceneflexible = new ScrollScene({
			triggerElement: flexibleElement,

			offset: 1,
			toggle: {
				element: flexibleTextElement,
				className: 'active',
				reverse: true,
			},
			duration: this.stickyRef.current.offsetHeight,
			triggerHook: '0.5',
			breakpoints: { 0: false, 768: true },
		});
		// scrollSceneflexible.Scene.addIndicators({ name: 'pin scene 2', colorEnd: 'orange' });
		// eslint-disable-next-line
		const scrollSceneIntegrated = new ScrollScene({
			triggerElement: integratedElement,

			offset: 1,
			duration: this.stickyRef.current.offsetHeight,
			toggle: {
				element: integratedTextElement,
				className: 'active',
				reverse: true,
			},
			triggerHook: '0.5',
			breakpoints: { 0: false, 768: true },
		});

		// scrollSceneIntegrated.Scene.addIndicators({ name: 'pin scene 2', colorEnd: 'red' });
	}
	// scrollToTop() {
	// 	// scroll.scrollToTop();
	// }
	componentWillUnmount() {
		Events.scrollEvent.remove('begin');
		Events.scrollEvent.remove('end');
	}

	handleClick = (element, reference) => {
		var navigation = document.querySelector('.navbar');
		// console.log(this.stickyRef.current.offsetTop);
		scroller.scrollTo(reference, {
			duration: 500,
			delay: 0,
			smooth: true,
			offset: -(navigation.clientHeight * 2.5),
			// contai	nerId: 'scroll-container', // Scrolls to element + 50 pixels down the page
		});
	};

	handleResize = () => {
		var navigation = document.querySelector('.navbar');
		// const h = document.documentElement.clientHeight;
		// var vpHeight = document.documentElement.clientHeight;
		if (this.stickyRef.current != null && navigation !== null) {
			this.setState({
				stickyHeight: this.stickyRef.current.offsetHeight / 2 + navigation.clientHeight / 2,
			});
		}

		if (typeof window !== 'undefined' && navigation && this.stickyRef.current != null) {
			// const stickyPosition = this.stickyRef.current.clientHeight;
			const position = (navigation.clientHeight * 3) / 2 + 'px';
			if (window.innerWidth < 769) {
				this.setState({
					isTabletOrMobileDevice: true,
				});
			}
			this.setState({
				positionTop: position,
			});
		}
	};

	render() {
		const styles = {
			height: this.state.stickyHeight + 'px',
			marginTop: this.state.stickyHeight / 2 + 'px',
			marginBottom: this.state.stickyHeight / 2 + 'px',
		};
		const stylesPeople = {
			height: this.state.stickyHeight + 'px',
			marginTop: this.state.stickyHeight / 2 + 'px',
			marginBottom: this.state.stickyHeight + 'px',
		};
		const Postionstyles = {
			top: this.state.positionTop,
		};

		const isTabletOrMobileDevice = this.state.isTabletOrMobileDevice;
		const detailedParallax = (
			<ParallaxBanner
				mainImg="trinity-section-books-screenshot@2x.png"
				takeoutImg="trinity-section-books-takeout-01@2x.png"
				takeoutTwoImg="trinity-section-books-takeout-02@2x.png"
			></ParallaxBanner>
		);
		const flexibleParallax = (
			<ParallaxBanner
				mainImg="trinity-section-sales-screenshot@2x.png"
				takeoutImg="trinity-section-sales-takeout-01@2x.png"
				takeoutTwoImg="trinity-section-sales-takeout-02@2x.png"
			></ParallaxBanner>
		);
		const integratedParallax = (
			<ParallaxBanner
				mainImg="trinity-section-people-screenshot@2x.png"
				takeoutImg="trinity-section-people-takeout-01@2x.png"
				takeoutTwoImg="trinity-section-people-takeout-02@2x.png"
			></ParallaxBanner>
		);
		//
		const { t } = this.props;
		let countryRoute = CountryDetection.myCountry(this.props);
		return (
			<>
				<section className="section key-features-section backdrop-light has-layer-none has-logo-dark" id="feature" ref={this.featureRef}>
					<HomeNavbar {...this.props} />
					<div className="divider"></div>
					<Container className="section-inner-wrapper pb-5">
						<Row className="scrolly align-items-start justify-content-between">
							<Col xs={12} md={5} className="sticky primary=panel section-description" ref={this.stickyRef} style={Postionstyles}>
								<div className="bar-outer">
									<div className="bar-inner">
										<h2 className="section-heading mb-2">Deskera All-in-One</h2>
										<div className="vertical-carousel" ref={this.verticalCarouselRef}>
											{/* <div className="carousel-nav-wrapper d-none"> */}
											{/* <ul className="vertical-indicators"> */}
											{/* <li onClick={this.handleClick} className="active" ref={this.detailIndicatorRef}></li>
													<li onClick={this.handleClick} ref={this.flexibleIndicatorRef}></li>
													<li onClick={this.handleClick} ref={this.integratedIndicatorRef}></li> */}
											{/* </ul> */}
											{/* </div> */}

											<div className="carousel-content section-description">
												<ListGroup className="feature-list">
													<ListGroup.Item
														className={`my-2 pl-0 pr-0 pr-md-4 pt-3 feature-list-item detailed active`}
														ref={this.detailedTextRef}
														onClick={() => this.handleClick(this.detailedTextRef, 'booksElement')}
													>
														<h4 className="section-leader has-product-icon icon-books">
															<span className="ascent-base">
																<img
																	src="/assets/images/icon-product-books-mono-fill.svg"
																	alt="books"
																	className="product-icon"
																/>
																Books
															</span>
														</h4>
														<p className="list-group-item-text section-description">
															{t('home.keyFeaturesSection.books.description')}
														</p>
														<div className="section-trailer my-1">
															<a href={`${countryRoute}/books/`} className="btn btn-readmore btn-small btn-link">
																{t('home.keyFeaturesSection.books.linkText')} →
															</a>
														</div>
														<div className="d-block d-md-none text-center mx-auto">{detailedParallax}</div>
													</ListGroup.Item>
													<ListGroup.Item
														className={`my-2 pl-0 pr-0 pr-md-4 pt-3 feature-list-item flexible ${
															isTabletOrMobileDevice ? 'active' : ''
														}`}
														ref={this.flexibleTextRef}
														onClick={() => this.handleClick(this.flexibleTextRef, 'salesElement')}
													>
														<h4 className="section-leader has-product-icon icon-sales">
															<span className="ascent-base">
																<img src="/assets/images/icon-product-sales-mono-fill.svg" alt="sales" className="product-icon" />
																CRM
															</span>
														</h4>
														<p className="list-group-item-text section-description">
															{t('home.keyFeaturesSection.sales.description')}
														</p>
														<div className="section-trailer my-1">
															<a href={`${countryRoute}/crm/`} className="btn btn-readmore btn-small btn-link">
																{t('home.keyFeaturesSection.sales.linkText')} →
															</a>
														</div>
														<div className="d-block d-md-none text-center mx-auto">{flexibleParallax}</div>
													</ListGroup.Item>
													<ListGroup.Item
														className={`my-2 pl-0 pr-0 pr-md-4 pt-3 feature-list-item integrated ${
															isTabletOrMobileDevice ? 'active' : ''
														}`}
														ref={this.integratedTextRef}
														onClick={() => this.handleClick(this.integratedTextRef, 'peopleElement')}
													>
														<h4 className="section-leader has-product-icon icon-people">
															<span className="ascent-base">
																<img
																	src="/assets/images/icon-product-people-mono-fill.svg"
																	alt="people"
																	className="product-icon"
																/>
																People
															</span>
														</h4>
														<p className="list-group-item-text section-description">
															{t('home.keyFeaturesSection.people.description')}
														</p>
														<div className="section-trailer my-1">
															<a href={`${countryRoute}/people/`} className="btn btn-readmore btn-small btn-link">
																{t('home.keyFeaturesSection.people.linkText')} →
															</a>
														</div>
														<div className="d-block d-md-none text-center mx-auto">{integratedParallax}</div>
													</ListGroup.Item>
												</ListGroup>
											</div>
										</div>
									</div>
								</div>
							</Col>
							<Col xs={12} md={6} className="px-0 mx-0 d-none d-md-block secondary-panel">
								<div className="step-wrapper d-flex justify-content-start align-items-start" id="scroll-container">
									<Element name="booksElement" style={styles}>
										<div className="step books" data-index="0" ref={this.detailedRef}>
											{detailedParallax}
										</div>
									</Element>
									<Element name="salesElement" style={styles}>
										<div className="step sales" data-index="1" ref={this.flexibleRef}>
											{flexibleParallax}
										</div>
									</Element>
									<Element name="peopleElement" style={stylesPeople}>
										<div className="step people" data-index="2" ref={this.integratedRef}>
											{integratedParallax}
										</div>
									</Element>
								</div>
							</Col>
						</Row>
					</Container>
					<Container className="post-section d-none">
						<Row>
							<Col>
								<div className="down-button my-5 pt-5 pl-0">
									<a href="#HomeBooks" className="go-down">
										<img src={`/static/images/down-arrrow.svg`} alt="See Next" className="" />
									</a>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</>
		);
	}
}

export default withTranslation()(HomeKeyFeaturesSection);
