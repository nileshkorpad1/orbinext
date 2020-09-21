import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HomeNavbar from '../../components/Navbars/HomeNavbar';
// import { ReactComponent as DottedGrid } from 'assets/images/hero-dotted-grid.svg';
// import { ReactComponent as AbstractShape } from 'assets/images/hero-abstract-shape.svg';

let productName = 'people';
class HeroSectionDeskeraPricing extends React.Component {
	constructor(props) {
		super(props);
		this.state = { index: 100 };
		if (props.product) {
			productName = props.product;
		}
	}

	render() {
		productName = productName.toLowerCase();
		let planDescription;
		let currentPlanName;
		switch (productName) {
			case 'books':
				planDescription = (
					<React.Fragment>
						<h3 className="section-byline line-1 mt-5 text-left text-md-center">
							Looking for an exclusive Accounting/ERP Software to Run your business?
						</h3>
					</React.Fragment>
				);
				currentPlanName = 'Books';
				break;
			case 'sales':
				planDescription = (
					<React.Fragment>
						<h3 className="section-byline line-1 mt-5 text-left text-md-center">
							Looking for an exclusive Sales/CRM Software to run your business?
						</h3>
					</React.Fragment>
				);
				currentPlanName = 'CRM';
				break;
			case 'people':
				planDescription = (
					<React.Fragment>
						<h3 className="section-byline line-1 mt-5 text-left text-md-center">
							Looking for an exclusive HRMS/People Management Software to run your business?
						</h3>
					</React.Fragment>
				);
				currentPlanName = 'People';
				break;
			default:
				planDescription = (
					<React.Fragment>
						<h3 className="section-byline line-1 mt-5 text-left text-md-center">Get the power, control, and customization you</h3>
						<h3 className="section-byline line-1 mb-0 text-left text-md-center">
							need to manage your team’s and organization’s projects.
						</h3>
					</React.Fragment>
				);
				currentPlanName = '';
				break;
		}
		return (
			<section className={`section hero-section backdrop-light has-layer-none has-logo-dark`} id="hero">
				<HomeNavbar {...this.props} />
				<div className="divider"></div>
				<Container className="section-inner-wrapper is-single-column">
					<Row className="justify-content-between">
						<Col xs={12} md={12} className="primary-panel text-left text-md-center">
							<h1 className="section-heading text-left text-md-center">Deskera {currentPlanName} Pricing</h1>
							{planDescription}
						</Col>
					</Row>
					{/* Start Hero Background Decorator Section */}
					<div className="background-decorator top-right">
						<img src="/static/images/hero-dotted-grid.svg" alt="" className={`default img-responsive top-right one`} />
					</div>
					<div className="background-decorator left-center">
						<img src="/static/images/hero-abstract-shape.svg" alt="" className={`default img-responsive left-center two`} />
					</div>
					<div className="background-decorator right-center">
						<img src="/static/images/hero-abstract-shape.svg" alt="" className={`default img-responsive right-center three`} />
					</div>
					<div className="background-decorator bottom-right">
						<img src="/static/images/hero-abstract-shape.svg" alt="" className={`default img-responsive bottom-right four`} />
					</div>
					{/* Start Hero Background Decorator Section */}
				</Container>
				<div className="divider"></div>
			</section>
		);
	}
}

export default HeroSectionDeskeraPricing;
