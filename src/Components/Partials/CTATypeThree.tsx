import React from 'react';
// react-bootstrap components
import { Col, Container, Row } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Parallax } from 'react-scroll-parallax';

import HomeNavbar from '@components/Navbars/HomeNavbar';

const CTATypeThree = (props) => {
	return (
		<section className="section section-cta-type-three pb-5" id="cta-type-three">
			<HomeNavbar {...props} />
			<Container className="section-inner-wrapper" id="cta-type-one-webtolead">
				<Row className="text-center text-md-left justify-content-between">
					<Col md={7} className="primary-panel">
						<h2 className="section-heading pr-0">Buying Tip from Deskera</h2>
						<div className="section-description line-1 pt-2">You will be able to see the outstanding amount of any Bill.</div>
						<div className="section-description line-2 pt-2">Indicate the Currency, Amount to be paid, and the Account used to</div>
						<div className="section-description line-2 pt-3">
							deduct the Payment – Cash or Bank, or other Bank accounts created previously.
						</div>
					</Col>
					<Col md={5} className="secondary-panel">
						<Fade right>
							<Parallax className="parallax-bulb" y={[-1, 1]} tagOuter="div">
								<img src={`/static/images/notification-icon@2x.png`} alt="" className="img-responsive img-bulb shadow-none" />
							</Parallax>
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

export default CTATypeThree;
