/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-underscore-dangle */
import React from "react";
// import { userActions } from 'actions';
// import jwt from 'jwt-decode';
import HeaderLoginCTA from "@Components/Common/HeaderLoginCTA";
// bootstrap components
import { Col, Container, Row, Button, Nav, Navbar } from "react-bootstrap";
import moment from "moment";
import DeskeraLogo from "@Static/images/deskera-logo.svg";
import RevampLogo from "@Static/images/logo-add-on-revamped.svg";

import { CountryDetection } from "@Components/Common/CountryDetection";
import styled from "styled-components";
// import { isEmpty } from 'helpers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { userService } from 'services';

import { useSelector, useDispatch } from "react-redux";

// import { useHistory } from 'react-router-dom';
// import { userService } from 'services';

import { StoreState } from "@Interfaces";
import { isEmpty } from "@Helpers/Helpers";
import { userActions } from "@Actions";

const StatusBarIcon = styled.span`
    color: #ffc64a;
`;
let instancesCount = 0;

const HomeNavbar = (props: any) => {
    const navigation = React.useRef(null);
    const defaultNav = React.useRef(null);
    const dispatch = useDispatch();
    // const history = useHistory();
    const _banner_wrapper = React.useRef(null);
    const isAuthenticated = useSelector(
        (state: StoreState) => state.authentication.authenticated
    );
    const Users = useSelector((state: StoreState) => state.Users);
    const payment_method = useSelector(
        (state: StoreState) => state.billing.payment_method
    );
    const emailVerified = useSelector(
        (state: StoreState) => state.authentication.emailVerified
    );
    const emailVerifying = useSelector(
        (state: StoreState) => state.resendVerification.emailVerifying
    );
    const subscription = useSelector(
        (state: StoreState) => state.billing.user_subscription
    );
    const AppActions = useSelector((state: StoreState) => state.App.AppActions);
    const ExpandMainMenu = useSelector(
        (state: StoreState) => state.App.AppActions.ExpandMainMenu
    );
    let userInTrial;
    // emailNotVerified,
    let TrialOver;
    let showBanner = false;
    let message = "";
    let productName = "All-in-One";
    let planID = "plan_GxJ1qUJ7";

    React.useEffect(() => {
        window.addEventListener("resize", _handleWindowResize);
        return () => window.removeEventListener("resize", _handleWindowResize);
    });

    if (
        !isEmpty(subscription) &&
        !isEmpty(Users) &&
        emailVerified &&
        isAuthenticated
    ) {
        userInTrial = subscription.currentActivePlan.InTrial;
        const { user } = Users;
        // eslint-disable-next-line prefer-destructuring
        TrialOver = subscription.currentActivePlan.TrialOver;
        const { TrialDays } = subscription.currentActivePlan;
        const UpdatedDate = moment(subscription.currentActivePlan.UpdatedOn);
        const ExpiryDate = moment(UpdatedDate).add(TrialDays, "d");
        const DaysRemaining = ExpiryDate.format("ll");
        productName = `${
            subscription.currentActivePlan.productName
                ? subscription.currentActivePlan.productName
                : "All-in-One"
        }`;
        const productFullName = `${subscription.currentActivePlan.productName} ${subscription.currentActivePlan.Name}`;
        planID = `${subscription.currentActivePlan.PlanID}`;
        if (typeof payment_method.Cards !== "undefined") {
            if (userInTrial && !TrialOver && payment_method.Cards === null) {
                showBanner = true;
                message = `Hey ${user.name}, Your trial for ${productFullName} will end on ${DaysRemaining}. Please enter your payment details for uninterrupted access`;
            } else if (
                TrialOver &&
                payment_method.Cards === null &&
                !userInTrial
            ) {
                showBanner = true;
                message = `Hey ${user.name}, Your Free Trial for Deskera ${productFullName} Plan is now over`;
            }
        }
    }

    if (!emailVerified && isAuthenticated) {
        const { user } = Users;
        if (!isEmpty(user)) {
            showBanner = true;
            // emailNotVerified = true;
            message = `Hey ${user.name}, Please verify your email address or`;
        }
    }

    function _handleWindowResize() {
        if (defaultNav.current !== null && _banner_wrapper.current !== null) {
            const bannerRect = _banner_wrapper.current.getBoundingClientRect();
            defaultNav.current.style.top = `${bannerRect.height}px`;
        } else if (defaultNav.current !== null) {
            defaultNav.current.style.top = `0px`;
        }
        if (instancesCount >= 7 || showBanner) {
            dispatch(userActions.CollapseMainMenu());
        }
    }

    function verifyEmailSend(event) {
        event.preventDefault();
        const user = userService.getUser();
        if (!isEmpty(user) && isAuthenticated) {
            dispatch(userActions.resendVerificationEmail(user));
        }
    }
    function NavBarToggle(value) {
        if (value) {
            dispatch(userActions.ExpandMainMenu());
        } else {
            dispatch(userActions.CollapseMainMenu());
        }
    }

    function upgradeProduct(event, PlanData) {
        event.preventDefault();
        const countryRoute = CountryDetection.myCountry(props);
        const redirectURL = `${countryRoute}/purchase-plan/?product=${PlanData.product}&planID=${PlanData.PlanID}`;
        history.push(redirectURL);
    }

    function _handleWindowScroll() {
        if (typeof window !== "undefined") {
            const isTop = window.scrollY > 100;
            if (isTop) {
                defaultNav.current.classList.add("scrolled");
            } else {
                defaultNav.current.classList.remove("scrolled");
            }
        }
    }
    let countryRoute = CountryDetection.myCountry(props);

    React.useEffect(() => {
        _handleWindowResize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showBanner]);

    React.useEffect(() => {
        window.addEventListener("scroll", _handleWindowScroll);
        return () => window.removeEventListener("scroll", _handleWindowScroll);
    });

    React.useEffect(() => {
        instancesCount += 1;
        return () => {
            instancesCount -= 1;
        };
    }, []);

    return (
        <React.Fragment>
            <div
                className={`position-absolute nav-section-wrapper nav-clip ${
                    showBanner ? " is-banner" : ""
                }`}
                ref={navigation}
            >
                <div
                    className={`${showBanner ? "is-banner" : ""}`}
                    id="default-nav"
                >
                    {showBanner && (
                        <div
                            className="status-banner-wrapper d-flex"
                            ref={_banner_wrapper}
                            id="banner-wrapper"
                        >
                            <Container fluid={true}>
                                <Row className="justify-content-between align-items-center align-items-md-start">
                                    <Col sm={12} md={12} className="py-0">
                                        <div className="status-banner">
                                            <StatusBarIcon className="banner-icon-wrapper">
                                                <FontAwesomeIcon icon="hourglass-half" />
                                            </StatusBarIcon>
                                            <span className="banner-text text-left px-3">
                                                {message}
                                            </span>
                                            {emailVerified && (
                                                <Button
                                                    variant={"outline-primary"}
                                                    size="sm"
                                                    onClick={event =>
                                                        upgradeProduct(event, {
                                                            product: productName,
                                                            PlanID: planID,
                                                        })
                                                    }
                                                >
                                                    {`${
                                                        !userInTrial &&
                                                        TrialOver
                                                            ? "Buy Now"
                                                            : "Add Now"
                                                    }`}
                                                </Button>
                                            )}

                                            {!emailVerified && (
                                                <Button
                                                    variant={"outline-primary"}
                                                    size="sm"
                                                    onClick={event =>
                                                        verifyEmailSend(event)
                                                    }
                                                    disabled={emailVerifying}
                                                >
                                                    {emailVerifying ? (
                                                        <React.Fragment>
                                                            <FontAwesomeIcon
                                                                icon="spinner"
                                                                spin
                                                                size="xs"
                                                            />{" "}
                                                            Sending email
                                                        </React.Fragment>
                                                    ) : (
                                                        "Resend email"
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    )}
                    <Navbar
                        collapseOnSelect
                        expand="lg"
                        expanded={ExpandMainMenu}
                        onToggle={val => NavBarToggle(val)}
                        className={`${
                            ExpandMainMenu ? "expanded" : "collapsed"
                        } py-4`}
                        ref={defaultNav}
                        fixed="top"
                    >
                        <Container className="pr-0">
                            <Navbar.Brand href={`${countryRoute}/`}>
                                <DeskeraLogo className="logo logo-sticky" />
                                <RevampLogo className="logo logo-addon" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ml-auto pr-1">
                                    <Nav.Link
                                        href={`${countryRoute}/all-in-one/`}
                                    >
                                        All-in-One
                                    </Nav.Link>
                                    <Nav.Link href={`${countryRoute}/books/`}>
                                        Books
                                    </Nav.Link>
                                    <Nav.Link href={`${countryRoute}/crm/`}>
                                        CRM
                                    </Nav.Link>
                                    <Nav.Link href={`${countryRoute}/people/`}>
                                        People
                                    </Nav.Link>
                                    <Nav.Link
                                        href={`${countryRoute}/deskera-pricing/`}
                                    >
                                        Pricing
                                    </Nav.Link>
                                    <Nav.Link
                                        href="https://www.deskera.com/care"
                                        target="_blank"
                                        className=""
                                    >
                                        Support
                                    </Nav.Link>
                                </Nav>
                                <Nav>
                                    <HeaderLoginCTA />
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </React.Fragment>
    );
};
export default HomeNavbar;
