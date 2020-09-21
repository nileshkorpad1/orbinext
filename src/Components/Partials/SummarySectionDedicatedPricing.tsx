import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import HomeNavbar from '@components/Navbars/HomeNavbar';

class FeatureSectionDedicatedPrice extends React.Component {
	constructor(props) {
		super(props);
		this.state = { index: 100 };
	}
	render() {
		return (
			<section className="section has-logo-dark summary-section" id="summary">
				<HomeNavbar {...this.props} />
				<Container className="section-inner-wrapper">
					<Row>
						<Col xs={12} md={12} className="primary-panel text-center my-5">
							<h2 className="section-heading my-4">All Plans Include</h2>
							<img src={`/static/images/user-profile-image.png`} alt="All plans" className="img-fluid" />
							<h3 className="section-byline my-4">1 User Free for Life.</h3>
							<div className="section-description my-4">
								One free Sales user for life! Each additional user will be charged at $10 per month.
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}
export default FeatureSectionDedicatedPrice;
