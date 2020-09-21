// import { userActions } from 'actions';
import React from 'react';
// react-bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
// import { Parallax } from 'react-scroll-parallax';
import { useHistory } from 'react-router-dom';
import HomeNavbar from '../../components/Navbars/HomeNavbar';
import TranslateText from '@Helpers/TranslateText';
import { isEmpty } from '@Helpers/Helpers';
import { StoreState } from '@store/types';

// import planData from '../../components/data/plans.json';

const CTATypeOne = (props) => {
	const isAuthenticated = useSelector((state: StoreState) => state.authentication.authenticated);
	const pricing = useSelector((state: StoreState) => state.Pricing.plans);
	let allPricing;
	const history = useHistory();
	// // const dispatch = useDispatch();
	// const setModalShow = (value) => {
	// 	if (value) {
	// dispatch(userActions.ShowLogin(value));
	// 	} else {
	// dispatch(userActions.HideLogin(value));
	// 	}
	// };
	let env = process.env.REACT_APP_ENV;
	const purchasePlanID = (event, planData) => {
		event.preventDefault();
		localStorage.removeItem('planData');
		localStorage.setItem('planData', JSON.stringify(planData));
		const redirectURL = `/sign-up/?product=${planData.product}&planID=${planData.PlanID}`;
		history.push(redirectURL);
	};
	if (pricing && !isEmpty(pricing['all'])) {
		const AIOYearlyPricing = {
			PlanID: pricing['all']['YearlyPlans'][2]['PlanID'][env],
			product: 'All-in-One',
			Amount: pricing['all']['YearlyPlans'][2]['Amount'],
			PlanName: pricing['all']['YearlyPlans'][2]['PlanName'],
			Currency: pricing['all']['YearlyPlans'][2]['Currency'],
			Interval: pricing['all']['YearlyPlans'][2]['Interval'],
		};

		allPricing = AIOYearlyPricing;
	}
	let webtoLeadTitle = TranslateText('common.webtoLead.title');
	let webtoLeadDescription = TranslateText('common.webtoLead.description');
	let getStartedNow = TranslateText('common.get_stated_now');
	//let signInNow = TranslateText('common.sign_in_now');
	let currentUrl;
	if (props.match && props.match.path !== null) {
		currentUrl = props.match.path
			.split(':')[0]
			.replace(/\/sg\//g, '')
			.replace(/\/in\//g, '')
			.replace(/\/id\//g, '')
			.replace(/\/my\//g, '')
			.replace(/[^a-z0-9-]/g, '');
		if (currentUrl === 'books') {
			webtoLeadTitle = TranslateText('common.webtoLead.title-books');
			webtoLeadDescription = TranslateText('common.webtoLead.description-books');
		}
	}
	return (
		<section className="section section-cta-type-one-webtolead backdrop-primary has-layer-primary has-logo-dark" id="webtolead">
			<HomeNavbar {...props} />
			<Container className="section-inner-wrapper pb-5" id="cta-type-one-webtolead">
				<Row className="text-center text-md-left justify-content-between">
					<Col md={7} className="primary-panel">
						<h2 className="section-heading pr-0">{webtoLeadTitle}</h2>
						<div className="section-description line-1 pt-2">{webtoLeadDescription}</div>
						<div className="d-flex pt-5 justify-content-center justify-content-md-start cta-type-one-webtolead-button">
							{isAuthenticated ? (
								<React.Fragment>
									<span className="text-greetings"></span>
									<a
										href={`${process.env.REACT_APP_PRODUCT_GO}`}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-primary font-weight-bold btn-sign-in"
									>
										Go to Dashboard
									</a>
								</React.Fragment>
							) : (
								<React.Fragment>
									<Button
										variant="primary"
										onClick={(event) =>
											purchasePlanID(event, {
												product: 'All-in-One',
												duration: 'yearly',
												...allPricing,
											})
										}
										className="btn-free-trial"
									>
										{getStartedNow}
									</Button>
									{/* <Button onClick={() => setModalShow(true)} className="btn-sign-in">
										{signInNow}
									</Button> */}
								</React.Fragment>
							)}
						</div>
					</Col>
					<Col md={5} className="secondary-panel d-md-block d-none">
						<Fade right>
							<div className="parallax-rocket">
								<img
									src={`/static/images/cta-run-your-business-02@2x.png`}
									alt="Run your Business with Deskera"
									className="img-responsive cta-img-full shadow-none"
								/>
							</div>
						</Fade>
					</Col>
				</Row>
				{/* begin decorator elements outside row/col */}
				<div className="background-decorator top-left">
					<img
						src={`/static/images/call-to-action-symbol@2x.png`}
						alt=""
						className="img-responsive background-decorator top-left one"
					/>
				</div>
				<div className="background-decorator bottom-center">
					<img
						src={`/static/images/grid-background.svg`}
						alt=""
						className="img-responsive background-decorator bottom-center two"
					/>
				</div>
				{/* begin decorator elements outside row/col */}
			</Container>
		</section>
	);
};

export default CTATypeOne;
