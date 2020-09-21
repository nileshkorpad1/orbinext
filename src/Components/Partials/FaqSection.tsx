import GenericAccrodion from '@components/GenericAccrodion';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import HomeNavbar from '@components/Navbars/HomeNavbar';

class FaqSection extends React.Component {
	render() {
		return (
			<section className="section faq-section viewport-size backdrop-white has-layer-white has-logo-dark" id="faq">
				<HomeNavbar {...this.props} />
				<div className="divider"></div>
				<Container className="section-inner-wrapper">
					<Col xs={12} md={12} className="primary-panel">
						<h2 className="section-heading my-5">Frequently Asked Question</h2>
						<div className="section-secondary-text my-5">
							<GenericAccrodion />
						</div>
					</Col>
				</Container>
				<Container className="post-section">
					<Row>
						<Col>
							<div className="down-button my-5">
								<a href="#customers" className="go-down">
									<img src={`/static/images/down-arrrow.svg`} alt="" />
								</a>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}

export default FaqSection;
