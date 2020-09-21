// import { listeners } from 'cluster';
import CTAForm from "@Components/Common/CTAForm";
import React from "react";
// react-bootstrap components
import { Card, Col, Container, Row } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import Link from "next/link";
// import { Parallax } from 'react-scroll-parallax';
import { ScrollScene } from "scrollscene";
import { isAndroid, isIOS, isTablet } from "react-device-detect";
import { faCheck, faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import HomeNavbar from "@Components/Navbars/HomeNavbar";
import TranslateText from "@Helpers/TranslateText";
import { CountryDetection } from "@Components/Common/CountryDetection";
import Lottie from "lottie-react";
import AnimationPrimary from "@Definitions/Data/animation-primary.json";
import AnimationSecondary from "@Definitions/Data/animation-secondary.json";
import { StoreState } from "@Interfaces";
// import { StoreState } from "@store/types";

const IOSRating = () => {
    return (
        <React.Fragment>
            <Card className="shadow-none d-flex justify-content-center testimonial-card text-center text-md-left mr-2">
                <a
                    href="https://apps.apple.com/sg/app/desk-mobile/id1463523833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-leader testimonial-rating"
                >
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </a>
                <p className="section-description testimonial-text">
                    "Perfect for a small business..."
                </p>
                <p className="testimonial-user-name">
                    <span className="mr-4">Noah Millward, 28/02/2020</span>
                </p>
            </Card>
            <Card className="shadow-none d-flex justify-content-center testimonial-card text-center text-md-left mr-2">
                <a
                    href="https://apps.apple.com/sg/app/desk-mobile/id1463523833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-leader testimonial-rating"
                >
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </a>
                <p className="section-description testimonial-text">
                    "Great for invoicing..."
                </p>
                <p className="testimonial-user-name">
                    <span className="mr-4">Blake Nord, 19/02/2020</span>
                </p>
            </Card>
            <Card className="shadow-none d-flex justify-content-center testimonial-card text-center text-md-left mr-2">
                <a
                    href="https://apps.apple.com/sg/app/desk-mobile/id1463523833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-leader testimonial-rating"
                >
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </a>
                <p className="section-description testimonial-text">
                    "Full featured..."
                </p>
                <p className="testimonial-user-name">
                    <span className="mr-4">Leslie Eason, 28/02/2020</span>
                </p>
            </Card>
        </React.Fragment>
    );
};
const AndroidRating = () => {
    return (
        <React.Fragment>
            <Card className="shadow-none d-flex justify-content-center testimonial-card text-center text-md-left mr-2">
                <a
                    href="https://play.google.com/store/apps/details?id=com.deskera.desk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-leader testimonial-rating"
                >
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </a>
                <p className="section-description testimonial-text">
                    "Perfect for a small business..."
                </p>
                <p className="testimonial-user-name">
                    <span className="mr-4">Noah Millward, 28/02/2020</span>
                </p>
            </Card>
            <Card className="shadow-none d-flex justify-content-center testimonial-card text-center text-md-left mr-2">
                <a
                    href="https://play.google.com/store/apps/details?id=com.deskera.desk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-leader testimonial-rating"
                >
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </a>
                <p className="section-description testimonial-text">
                    "Great for invoicing..."
                </p>
                <p className="testimonial-user-name">
                    <span className="mr-4">Blake Nord, 19/02/2020</span>
                </p>
            </Card>
            <Card className="shadow-none d-flex justify-content-center testimonial-card text-center text-md-left mr-2">
                <a
                    href="https://play.google.com/store/apps/details?id=com.deskera.desk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-leader testimonial-rating"
                >
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </a>
                <p className="section-description testimonial-text">
                    "Full featured..."
                </p>
                <p className="testimonial-user-name">
                    <span className="mr-4">Leslie Eason, 28/02/2020</span>
                </p>
            </Card>
        </React.Fragment>
    );
};
const AppRatings = () => {
    if (isTablet) {
        if (isAndroid) {
            return <AndroidRating />;
        }
        if (isIOS) {
            return <IOSRating />;
        }
    } else {
        return <IOSRating />;
    }
};

const HeroSectionItrOne = props => {
    // init ref
    const businessRef = React.useRef(null);
    const bankRef = React.useRef(null);
    const complianceRef = React.useRef(null);

    React.useEffect(() => {
        const { current: businessElement } = businessRef;
        const { current: bankRefElement } = bankRef;
        const { current: complianceElement } = complianceRef;

        if (!businessElement && !bankRefElement && !complianceElement) {
            return undefined;
        }

        const scrollScene = new ScrollScene({
            triggerElement: businessElement,

            offset: 1,
            duration: businessElement.offsetHeight,
            triggerHook: "onCenter",
        });

        const scrollSceneBank = new ScrollScene({
            triggerElement: bankRefElement,

            offset: 1,
            duration: businessElement.offsetHeight,
            triggerHook: "onCenter",
        });
        const scrollSceneCompliance = new ScrollScene({
            triggerElement: complianceElement,

            offset: 1,
            duration: businessElement.offsetHeight,
            triggerHook: "onCenter",
        });

        // destroy on unmount
        return () => {
            scrollScene.destroy();
            scrollSceneBank.destroy();
            scrollSceneCompliance.destroy();
        };
    }, []);

    return (
        <>
            <section
                className="section hero-section viewport-size backdrop-primary has-layer-secondary has-logo-dark"
                id="hero"
            >
                <HomeNavbar {...props} />
                <div className="divider"></div>
                <Container className="section-inner-wrapper">
                    <Row className="justify-content-between">
                        <Col xs={12} md={6} className="primary-panel pt-5">
                            <h1 className="section-heading mt-5">
                                {TranslateText("home.heroSection.title")}
                            </h1>
                            <h3 className="section-byline hero-subheading mt-3">
                                Software that works for you.
                            </h3>
                            <p className="section-description mt-2 pb-2 col-10 mx-0 px-0">
                                Deskera’s integrated suite of products helps you
                                take care of the 3 pillars of your business:
                                Accounting, Customers and Employees.
                            </p>
                            <div className="section-cta col-12 col-md-10 p-0">
                                <CTAForm />
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            md={6}
                            className="px-md-0 secondary-panel d-flex align-items-top"
                        >
                            {/* <Fade up delay={50}>
								<Parallax className="parallax-banner" y={[-1, 1]} tagOuter="div">
									<img
										src={`/static/images/home-hero-books-screenshot@2x.png`}
										alt=""
										className="img-responsive main-screenshot shadow-lg"
									/>
									<Parallax className="parallax-takeout takeout-two" y={['-30px', '60px']} tagOuter="div">
										<img
											alt="Books Takeout"
											src={`/static/images/home-hero-books-takeout-02@2x.png`}
											className="takeout takeout-two shadow-lg"
										/>
									</Parallax>
									<Parallax className="parallax-takeout takeout-one" y={['-30px', '60px']} x={[0, 0]} tagOuter="div">
										<img
											alt="Books Takeout"
											src={`/static/images/home-hero-books-takeout-01@2x.png`}
											className="takeout takeout-one shadow-lg"
										/>
									</Parallax>
								</Parallax>
							</Fade> */}
                        </Col>
                    </Row>
                </Container>
                <Container className="post-section">
                    <Row>
                        <Col>
                            <div className="down-button my-5">
                                <a href="#pricing" className="go-down">
                                    <img
                                        src={`/static/images/down-arrrow.svg`}
                                        alt=""
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};
const HeroSectionItrTwo = props => {
    // init ref
    const businessRef = React.useRef(null);
    const bankRef = React.useRef(null);
    const complianceRef = React.useRef(null);

    React.useEffect(() => {
        const { current: businessElement } = businessRef;
        const { current: bankRefElement } = bankRef;
        const { current: complianceElement } = complianceRef;

        if (!businessElement && !bankRefElement && !complianceElement) {
            return undefined;
        }

        const scrollScene = new ScrollScene({
            triggerElement: businessElement,

            offset: 1,
            duration: businessElement.offsetHeight,
            triggerHook: "onCenter",
        });

        const scrollSceneBank = new ScrollScene({
            triggerElement: bankRefElement,

            offset: 1,
            duration: businessElement.offsetHeight,
            triggerHook: "onCenter",
        });
        const scrollSceneCompliance = new ScrollScene({
            triggerElement: complianceElement,

            offset: 1,
            duration: businessElement.offsetHeight,
            triggerHook: "onCenter",
        });

        // destroy on unmount
        return () => {
            scrollScene.destroy();
            scrollSceneBank.destroy();
            scrollSceneCompliance.destroy();
        };
    }, []);

    return (
        <>
            <section
                className="section hero-section hero-single is-single-column viewport-size backdrop-primary has-layer-none has-logo-dark"
                id="hero"
            >
                <HomeNavbar {...props} />
                <div className="divider"></div>
                <Container className="section-inner-wrapper">
                    <Row className="justify-content-between">
                        <Col xs={12} className="primary-panel p-5 text-center">
                            <h1 className="section-heading mt-5">
                                Trusted by 20,000 Businesses
                            </h1>
                            <h3 className="section-byline hero-subheading mt-3">
                                Software that works for you.
                            </h3>
                            <p className="section-description mt-2 pb-2 col-10 mx-auto px-0 text-center">
                                Deskera’s integrated suite of products helps you
                                take care of the 3 pillars of your business:
                                Accounting, Customers and Employees.
                            </p>
                            <div className="section-cta col-12 col-md-8 align-self-center mx-auto">
                                <CTAForm />
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            className="px-md-0 secondary-panel d-flex align-items-top"
                        >
                            {/* <Fade up delay={50}>
								<Parallax className="parallax-banner" y={[-1, 1]} tagOuter="div">
									<img
										src={`/static/images/home-hero-books-screenshot@2x.png`}
										alt=""
										className="img-responsive main-screenshot shadow-lg"
									/>
									<Parallax className="parallax-takeout takeout-two" y={['-30px', '60px']} tagOuter="div">
										<img
											alt="Books Takeout"
											src={`/static/images/home-hero-books-takeout-02@2x.png`}
											className="takeout takeout-two shadow-lg"
										/>
									</Parallax>
									<Parallax className="parallax-takeout takeout-one" y={['30px', '-60px']} x={[0, 0]} tagOuter="div">
										<img
											alt="Books Takeout"
											src={`/static/images/home-hero-books-takeout-01@2x.png`}
											className="takeout takeout-one shadow-lg"
										/>
									</Parallax>
								</Parallax>
							</Fade> */}
                        </Col>
                    </Row>
                </Container>
                <Container className="post-section">
                    <Row>
                        <Col>
                            <div className="down-button my-5">
                                <a href="#pricing" className="go-down">
                                    <img
                                        src={`/static/images/down-arrrow.svg`}
                                        alt=""
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

const HeroSectionItrThree = props => {
    const isAuthenticated = useSelector(
        (state: StoreState) => state.authentication.authenticated
    );
    let countryRoute = CountryDetection.myCountry(props);
    return (
        <>
            <section
                className="section hero-section hero-section-alternate viewport-size backdrop-primary has-layer-secondary has-logo-dark"
                id="hero"
            >
                <HomeNavbar {...props} />
                <div className="divider"></div>
                <Container className="section-inner-wrapper">
                    <Row className="justify-content-start d-none d-md-flex">
                        <Col xs={12} lg={7} className="pre-section my-5">
                            <div className="card-columns d-flex justify-content-start align-items-start">
                                <AppRatings />
                            </div>
                        </Col>
                    </Row>
                    {navigator.userAgent !== "ReactSnap" ? (
                        <Fade delay={300}>
                            <Row className="justify-content-between align-items-center mt-5 mt-md-1">
                                <Col xs={12} lg={7} className="primary-panel">
                                    <h1 className="section-heading smaller-1x mb-3">
                                        All-in-One Platform <br /> to{" "}
                                        <span className="text-contrast">
                                            {TranslateText(
                                                "home.heroSection.title"
                                            )}
                                        </span>
                                    </h1>
                                    <h2 className="section-byline col-11 px-0">
                                        {TranslateText(
                                            "home.heroSection.byline"
                                        )}{" "}
                                        <a
                                            href="https://www.deskera.com/blog/how-deskera-acquired-300k-users-in-2020/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {TranslateText(
                                                "home.heroSection.bylineLink"
                                            )}
                                        </a>
                                    </h2>
                                    <ul className="section-description list-unstyled mt-5 pl-0 col-12 col-md-11 mb-0">
                                        <li>
                                            <Link
                                                href={`${countryRoute}/books/`}
                                            >
                                                <strong className="mr-2">
                                                    Books
                                                </strong>
                                            </Link>
                                            <ul className="d-inline list-inline list-unstyled">
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/books/create-invoices-with-deskera-books/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Invoicing
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/books/paying-bills-with-deskera/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Billing
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/books/products-and-inventory/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Inventory
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item d-none d-md-inline">
                                                    <Link
                                                        href={`${countryRoute}/books/chart-of-accounts-with-deskera-books/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Taxes
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item d-none d-md-inline">
                                                    <Link
                                                        href={`${countryRoute}/books/chart-of-accounts-with-deskera-books/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Financial Reports
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href={`${countryRoute}/crm/`}>
                                                <strong className="mr-2">
                                                    Sales
                                                </strong>
                                            </Link>
                                            <ul className="d-inline list-inline list-unstyled">
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/crm/more-about-crm/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        CRM
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/crm/customer-relationship-management-contacts/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Leads
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/crm/more-about-crm/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Pipeline
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item d-none d-md-inline">
                                                    <Link
                                                        href={`${countryRoute}/crm/deals-with-deskera-sales/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Campaigns
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link
                                                href={`${countryRoute}/people/`}
                                            >
                                                <strong className="mr-2">
                                                    People
                                                </strong>
                                            </Link>
                                            <ul className="d-inline list-inline list-unstyled">
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/people/manage-payroll/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Payroll
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/people/expenses-and-claims/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Leaves
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link
                                                        href={`${countryRoute}/people/attendance-and-leave/`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                        />{" "}
                                                        Expenses
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>

                                    <div className="section-cta col-12 col-lg-11 mt-5 p-0">
                                        <CTAForm />
                                    </div>
                                    {!isAuthenticated ? (
                                        <div className="section-description col-12 col-lg-11 follow-up mt-0 text-left mx-0 p-0">
                                            <ul className="list-unstyled list-inline">
                                                <li className="list-inline-item">
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                    />{" "}
                                                    30 days Free Trial
                                                </li>
                                                <li className="list-inline-item">
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                    />{" "}
                                                    No Credit Card Required.
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <React.Fragment></React.Fragment>
                                    )}
                                </Col>
                                <Col
                                    xs={12}
                                    lg={5}
                                    className="px-md-0 secondary-panel d-flex align-items-center"
                                >
                                    {/* <Parallax className="parallax-banner" y={[-1, 1]} tagOuter="div">
										<img
											src={`/static/images/home-hero-books-screenshot@2x.png`}
											alt="Deskera Books: Advanced Accounting, Inventory, Financial Reports"
											className="img-responsive main-screenshot shadow-lg"
										/>
										<Parallax className="parallax-annotation annotation-one" y={['30px', '70px']} x={[0, 0]} tagOuter="div">
											<p className="annotation annotation-alternate shadow-lg corner-br">Easy Invoicing</p>
										</Parallax>
										<Parallax className="parallax-takeout takeout-two" y={['-30px', '60px']} tagOuter="div">
											<img
												alt="Deskera CRM: CRM, Leads, Pipeline, Campaigns"
												src={`/static/images/home-hero-sales-screenshot-03@2x.png`}
												className="takeout takeout-two shadow-lg"
											/>
											<Parallax className="parallax-annotation annotation-two" y={['-30px', '60px']} x={[0, 0]} tagOuter="div">
												<p className="annotation annotation-sales shadow-lg corner-bl">Integrated CRM</p>
											</Parallax>
										</Parallax>
										<Parallax className="parallax-takeout takeout-one" y={['-30px', '60px']} x={[0, 0]} tagOuter="div">
											<img
												alt="Deskera People: Payroll, Employee Management, Expenses"
												src={`/static/images/home-hero-people-screenshot-new-payrun@2x.png`}
												className="takeout takeout-one shadow-lg"
											/>
											<Parallax
												className="parallax-annotation annotation-three"
												y={['-30px', '20px']}
												x={[0, 0]}
												tagOuter="div"
											>
												<p className="annotation annotation-contrast shadow-lg corner-tl">Quick Payroll</p>
											</Parallax>
										</Parallax>
									</Parallax> */}
                                </Col>
                            </Row>
                        </Fade>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}
                </Container>
                <Container className="post-section">
                    <Row>
                        <Col>
                            <div className="down-button my-5">
                                <a href="#pricing" className="go-down">
                                    <img
                                        src={`/static/images/down-arrrow.svg`}
                                        alt=""
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

const HeroSectionItrFour = (props: any) => {
    const isAuthenticated = useSelector(
        (state: StoreState) => state.authentication.authenticated
    );
    const countryRoute = CountryDetection.myCountry(props);

    return (
        <>
            <section
                className="section hero-section hero-section-aug backdrop-primary has-layer-none has-logo-dark viewport-size position-relative"
                id="hero"
            >
                <HomeNavbar {...props} />
                <div className="divider" />
                <Container className="section-inner-wrapper is-single-column aanimation---faadeIn">
                    <Row className="justify-content-center d-none d-md-flex">
                        <Col
                            xs={12}
                            md={7}
                            className="pre-section mt-5 pt-5 mx-auto mb-0 pb-0"
                        >
                            <div className="d-flex justify-content-center align-items-center mt-5 mb-2">
                                <Card className="shadow-none d-flex justify-content-center testimonial-card text-center text-md-left mx-0 pr-3">
                                    <p className="section-description testimonial-text align-items-center">
                                        <span className="pr-1">App Store</span>{" "}
                                        <span className="pr-1">4.5</span>
                                        <a
                                            href="https://apps.apple.com/sg/app/desk-mobile/id1463523833"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="testimonial-rating"
                                        >
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                        </a>
                                    </p>
                                </Card>
                                <Card className="shadow-none d-flex justify-content-center testimonial-card text-center text-md-left mx-0 pl-3">
                                    <p className="section-description testimonial-text align-items-center">
                                        <span className="pr-1">Play Store</span>{" "}
                                        <span className="pr-1">4.5</span>
                                        <a
                                            href="https://play.google.com/store/apps/details?id=com.deskera.desk"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="testimonial-rating"
                                        >
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                        </a>
                                    </p>
                                </Card>
                            </div>
                            <Card className="testimonial-summary">
                                <p className="section-description testimonial-card text-center testimonial-text mx-auto">
                                    500,000+ downloads
                                </p>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-between align-items-top mt-0">
                        <Col xs={12} className="primary-panel text-center">
                            <h1 className="section-heading smaller-1x mt-1 mb-3 text-center">
                                All-in-One Platform <br /> to{" "}
                                <span className="text-contrast">
                                    {TranslateText("home.heroSection.title")}
                                </span>
                            </h1>
                            <h2 className="section-byline px-0">
                                {TranslateText("home.heroSection.bylineAug")}
                            </h2>
                            <div className="section-description card-group col-12 col-md-11 col-lg-10 col-xl-8 mt-5 mx-auto mb-0 d-none d-md-flex">
                                <Card>
                                    <div className="card-body text-center">
                                        <p className="card-subtitle section-leader text-uppercase d-none">
                                            Accounting reimagined
                                        </p>
                                        <h5 className="card-heading section-byline">
                                            <Link
                                                href={`${countryRoute}/books/`}
                                            >
                                                Books
                                            </Link>
                                        </h5>
                                        <p className="card-text section-description">
                                            Create invoices, track expenses, get
                                            a real-time view of your inventory
                                            and view financial reports when and
                                            where you need them.
                                        </p>
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link href={`${countryRoute}/books/`}>
                                            <a className="card-link">
                                                Learn More
                                            </a>
                                        </Link>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="card-body text-center">
                                        <p className="card-subtitle section-leader text-uppercase d-none">
                                            Growth reassured
                                        </p>
                                        <h5 className="card-heading section-byline">
                                            <Link href={`${countryRoute}/crm/`}>
                                                CRM
                                            </Link>
                                        </h5>
                                        <p className="card-text section-description">
                                            Ensure customers are not ignored,
                                            prospects are contacted and revenue
                                            generated for your Sales pipeline.
                                        </p>
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link href={`${countryRoute}/crm/`}>
                                            <a className="card-link">
                                                Learn More
                                            </a>
                                        </Link>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="card-body text-center">
                                        <p className="card-subtitle section-leader text-uppercase d-none">
                                            Employees cared for
                                        </p>
                                        <h5 className="card-heading section-byline">
                                            <Link
                                                href={`${countryRoute}/people/`}
                                            >
                                                People
                                            </Link>
                                        </h5>
                                        <p className="card-text section-description">
                                            Generate payroll and payslips, apply
                                            for leaves and file claims and
                                            expenses in a matter of minutes.
                                        </p>
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link href={`${countryRoute}/people/`}>
                                            <a className="card-link">
                                                Learn More
                                            </a>
                                        </Link>
                                    </div>
                                </Card>
                                <div className="d-none d-lg-block animation-section animation-left-side px-0">
                                    <Lottie animationData={AnimationPrimary} />
                                    {/* <Image src={`/static/images/homepage-hero-illustrator-01@2x.png`} alt="" className="img-responsive" /> */}
                                </div>
                                <div className="d-none d-lg-block animation-section animation-right-side px-0">
                                    <Lottie
                                        animationData={AnimationSecondary}
                                    />
                                    {/* <Image src={`/static/images/homepage-hero-illustrator-02@2x.png`} alt="" className="img-responsive" /> */}
                                </div>
                            </div>

                            <div className="section-cta col-12 col-lg-7 mt-5 p-0 mx-auto">
                                <CTAForm />
                            </div>
                            {!isAuthenticated ? (
                                <div className="section-description col-12 col-lg-7 follow-up mt-0 text-center mx-auto p-0">
                                    <ul className="list-unstyled list-inline">
                                        <li className="list-inline-item">
                                            <FontAwesomeIcon icon={faCircle} />{" "}
                                            30 days Free Trial
                                        </li>
                                        <li className="list-inline-item">
                                            <FontAwesomeIcon icon={faCircle} />{" "}
                                            No Credit Card Required.
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <React.Fragment></React.Fragment>
                            )}
                        </Col>
                        <Col
                            xs={12}
                            className="p-md-5 secondary-panel d-flex align-items-center h-75 w-75 mx-auto mt-5"
                        >
                            {/* <Parallax className="parallax-banner" y={[-1, 1]} tagOuter="div"> */}
                            {/* <img
									src={`/static/images/home-hero-aio-screenshot@2x.png`}
									alt="Deskera Books: Advanced Accounting, Inventory, Financial Reports"
									className="img-responsive main-screenshot shadow-lg"
								/> */}
                            {/* <Parallax className="parallax-annotation annotation-one" y={['30px', '70px']} x={[0, 0]} tagOuter="div">
									<p className="annotation annotation-contrast shadow-lg corner-br">Easy Invoicing</p>
								</Parallax>
								<Parallax className="parallax-takeout takeout-two" y={['5px', '-20px']} tagOuter="div">
									<Parallax className="parallax-annotation annotation-two" y={['10px', '-50px']} x={[0, 0]} tagOuter="div">
										<p className="annotation annotation-sales shadow-lg corner-bl">Integrated CRM</p>
									</Parallax>
								</Parallax>
								<Parallax className="parallax-takeout takeout-one" y={['-30px', '60px']} x={[0, 0]} tagOuter="div">
									<Parallax className="parallax-annotation annotation-three" y={['-30px', '20px']} x={[0, 0]} tagOuter="div">
										<p className="annotation annotation-secondary shadow-lg corner-tl">Quick Payroll</p>
									</Parallax>
								</Parallax>
							</Parallax> */}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export {
    HeroSectionItrOne,
    HeroSectionItrTwo,
    HeroSectionItrThree,
    HeroSectionItrFour,
};
