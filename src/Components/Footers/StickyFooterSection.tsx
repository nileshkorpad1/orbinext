import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { CountryDetection } from 'src/routes/CountryDetection';
import { useSelector } from 'react-redux';
import { ScrollScene } from 'scrollscene';
// import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';
import { StoreState } from '@store/types';

import TranslateText from '@Helpers/TranslateText';
const StickyFooter = (props) => {
	const isAuthenticated = useSelector((state: StoreState) => state.authentication.authenticated);
	const pricing = useSelector((state: StoreState) => state.Pricing.plans);
	const [allPricing, setAllPricing] = React.useState(null);
	let countryRoute = '';
	countryRoute = CountryDetection.myCountry(props);
	const router = useRouter();
	// init ref
	const containerRef = React.useRef(null);
	React.useEffect(() => {
		const { current: containerElement } = containerRef;
		const triggerElement = document.querySelector('#hero');
		if (containerElement !== null && triggerElement !== null) {
			const scrollScene = new ScrollScene({
				triggerElement: triggerElement,
				offset: triggerElement.clientHeight,
				toggle: {
					element: containerElement,
					className: 'sticky',
					reverse: true,
				},
				triggerHook: 'onLeave',
			});

			// destroy on unmount
			return () => {
				scrollScene.destroy();
			};
		}
	}, []);

	const purchasePlanID = (event, planData) => {
		event.preventDefault();
		localStorage.removeItem('planData');
		localStorage.setItem('planData', JSON.stringify(planData));
		const redirectURL = `${countryRoute}/sign-up/?product=${planData.product}&planID=${planData.PlanID}`;
		router.push(redirectURL);
	};

	React.useEffect(() => {
		if (pricing) {
			const AIOYearlyPricing = pricing['all']['YearlyPlans'];

			setAllPricing(AIOYearlyPricing);
		}
		// setAllPricing()
	}, [allPricing, pricing]);

	let startTrial = TranslateText('common.start_trial_30_days');
	let tryItFirst = TranslateText('common.try_it_first');
	return (
		<React.Fragment>
			<section className="secondary-footer backdrop-dark" ref={containerRef}>
				<Container>
					<Row>
						<Col className="d-flex p-0 justify-content-start justify-content-xs-left justify-content-sm-center align-items-center">
							{isAuthenticated ? (
								<div className="block-greetings align-items-center text-left text-md-right signed-in">
									<span className="text-greetings"></span>
									<a
										href={`${process.env.REACT_APP_PRODUCT_GO}`}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-sm ml-4 btn-primary font-weight-bold text-sign-in"
									>
										Go to Dashboard
									</a>
								</div>
							) : (
								<div className="text-reverse d-flex pt-0 align-items-center sticky-footer-button">
									<h4 className="start-free-text d-none d-md-inline-block m-0">{startTrial}</h4>
									<Button
										variant="outline-primary"
										onClick={(event) =>
											purchasePlanID(event, {
												product: 'All-in-One',
												duration: 'yearly',
												...allPricing['2'],
											})
										}
										className="btn-sm ml-4 font-weight-bold d-inline-block d-md-none"
									>
										{startTrial}
									</Button>
									<Button
										variant="outline-primary"
										onClick={(event) =>
											purchasePlanID(event, {
												product: 'All-in-One',
												duration: 'yearly',
												...allPricing['2'],
											})
										}
										className="btn-sm ml-4 font-weight-bold d-none d-md-inline-block"
									>
										{tryItFirst}
									</Button>
								</div>
							)}
						</Col>
					</Row>
				</Container>
			</section>
		</React.Fragment>
	);
};
export default StickyFooter;
