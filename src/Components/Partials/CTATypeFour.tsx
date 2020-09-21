import HomeNavbar from '@components/Navbars/HomeNavbar';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import "styles/core/pages/partials/_ctatypefour.scss";

const CTATypeFour = (props) => {
	return (
		<>
			<section className="section section-cta-type-four backdrop-white has-layer-white has-logo-dark" id="cta-type-one">
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container className="section-inner-wrapper">
					<Row className="align-items-center justify-content-center border-bottom">
						<Col md={6} className="primary-panel">
							<h3 className="section-leader">
								<span>What are you waiting for!</span>
							</h3>
							<h2 className="section-heading">Try for Free</h2>
						</Col>
						<Col md={6} className="text-right">
							<a href="/sign-up/" className="btn btn-primary btn-contact">
								Sign Up <FontAwesomeIcon icon={faArrowRight} />
							</a>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<div className="section-secondary-text my-4">
								We help you track customer engagement right from the start to a successful order placed for your business. <br />
								Manage Deals, Contacts, and Activities with ease on an intuitive interface.
							</div>
						</Col>
					</Row>
				</Container>
				<div className="divider"></div>
			</section>
		</>
	);
};

export default CTATypeFour;
