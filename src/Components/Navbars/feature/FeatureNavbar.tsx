import HeaderLoginCTA from '@components/HeaderLoginCTA';
import React from 'react';
// react-bootstrap components
import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import { CountryDetection } from 'src/routes/CountryDetection';

class FeatureNavbar extends React.Component {
	navigation: any;
	defaultNav: any;
	constructor(props) {
		super(props);

		this.navigation = React.createRef();
		this.defaultNav = React.createRef();
	}
	componentDidMount() {}

	componentWillUnmount() {}
	render() {
		let countryRoute = CountryDetection.myCountry(this.props);
		return (
			<>
				<div className="position-absolute nav-section-wrapper nav-clip" ref={this.navigation}>
					<nav className="nav" id="default-nav" ref={this.defaultNav}>
						<Container>
							<Row className="default-nav-wrapper justify-content-between align-items-center align-items-md-start row">
								<Col xs={12} md={5} className="py-0">
									<Link href={`${countryRoute}/`}>
										<a className="logo-link nav-logo-link">
											<img
												alt="Deskera"
												src={`/static/images/deskera-logo-dark@2x.png`}
												className="logo logo-sticky logo-dark"
											/>
											<img alt="Deskera" src={`/static/images/deskera-logo-red@2x.png`} className="logo logo-sticky logo-red" />
											<img
												alt="Deskera"
												src={`/static/images/deskera-logo-light@2x.png`}
												className="logo logo-sticky logo-light"
											/>
										</a>
									</Link>
								</Col>
								<Col xs={12} md={8} lg={6} className="py-0 d-none d-md-flex justify-content-end align-items-top">
									<HeaderLoginCTA />
								</Col>
							</Row>
						</Container>
					</nav>
				</div>
			</>
		);
	}
}

export default FeatureNavbar;
