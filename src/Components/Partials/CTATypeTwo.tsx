import CTAForm from '@components/CTAForm';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import HomeNavbar from '@components/Navbars/HomeNavbar';
import TranslateText from '@Helpers/TranslateText';

const CTATypeTwo = (props) => {
	return (
		<section className="section section-cta-type-two backdrop-ardent-red has-layer-ardent-red has-logo-light" id="trial">
			<HomeNavbar {...props} />
			<div className="divider"></div>
			<Container className="section-inner-wrapper">
				<Row className="align-items-top justify-content-between">
					<Col xs={12} md={5} lg={8} className="pt-4 primary-panel">
						<h6 className="mt-0 mb-4 pb-3 mr-5 section-leader">{TranslateText('common.start_trial')}</h6>
						<h2 className="section-heading">
							{TranslateText('common.cta.section-heading')}
							<br />
							<span className="heading-contrast">{TranslateText('common.cta.heading-contrast')}</span>
						</h2>
					</Col>
					<Col xs={12} md={7} lg={4} className="mx-0 px-0 secondary-panel">
						<Card className="pt-4 px-5 pb-5 backdrop-alternate section-card">
							<h6 className="mt-0 mb-4 pb-3 mr-5 section-leader">Get Started</h6>
							<h3 className="card-heading">{TranslateText('common.cta.heading')}</h3>
							{/* <div className="section-secondary-text card-description">{TranslateText('common.cta.description')}</div> */}
							<div className="section-cta cta-type-two">
								<CTAForm />
								<div className="card-note">*{TranslateText('common.cta.no_credit_card_required')}</div>
							</div>
						</Card>
					</Col>
				</Row>
			</Container>
			<div className="divider"></div>
		</section>
	);
};

export default CTATypeTwo;
