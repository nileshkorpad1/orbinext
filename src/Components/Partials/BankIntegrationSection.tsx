import React from 'react';
// react-bootstrap components
import { Col, Container, Row } from 'react-bootstrap';
import { Timeline, Tween } from 'react-gsap';
import { Parallax } from 'react-scroll-parallax';
import { Controller, Scene } from 'react-scrollmagic';

import HomeNavbar from '@components/Navbars/HomeNavbar';

const BankIntegrationSection = (props) => {
	return (
		<>
			<section className="section bank-integration-section viewport-size" id="bank">
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container className="section-inner-wrapper">
					<Controller>
						<Scene indicators={false} duration="100%" triggerHook="onEnter">
							<Timeline>
								<Tween
									position="0"
									from={{
										yPercent: 70,
										alpha: 0.9,
									}}
									to={{
										yPercent: 0,
										alpha: 1,
									}}
									// autoAlpha={true}
									// ease="Strong.easeOut"
									ease="Linear.easeNone"
									// paused
								>
									<div className="row justify-content-between align-content-center">
										<Col xs={12} md={5} className="pr-0 primary-panel">
											<h3 className="section-leader">Bank Integration</h3>
											<h1 className="section-heading">Complete Bank Integration</h1>
											<p className="section-description my-4">
												We let you connect with the bank you prefer the most across the globe. That’s over 500 banks you can
												add in just three steps. <br />
												Easy banking starts today. Deskera’s bank connect system now empowers businesses to connect their
												preferred banks across the globe. That’s over 500 banks you can add to your Deskera account in just
												three steps !
											</p>
											<p className="section-trailer my-4">
												<a href="#readmore" className="btn btn-readmore">
													Learn more →
												</a>
											</p>
										</Col>
										<Col xs={12} md={6} className="pr-0 secondary-panel">
											<Parallax className="parallax-bank" y={[-1, 1]} tagOuter="div">
												<img
													src={`/static/images/people-section-screenshot@2x.png`}
													alt=""
													className="img-responsive main-screenshot shadow"
												/>
												<Parallax className="parallax-annotation" y={[-30, 30]} tagOuter="div">
													<img
														alt="Bank Annotation"
														src={`/static/images/annotation-sample-two-line@2x.png`}
														className="annotation img-annotation"
													/>
												</Parallax>
												<Parallax className="parallax-takeout" y={[-30, 60]} tagOuter="div">
													<img
														alt="Bank Takeout"
														src={`/static/images/people-section-takeout@2x.png`}
														className="takeout takeout-one shadow"
													/>
												</Parallax>
											</Parallax>
										</Col>
									</div>
								</Tween>
							</Timeline>
						</Scene>
					</Controller>
				</Container>
				<Container className="post-section">
					<Row>
						<Col>
							<div className="down-button my-5">
								<a href="#testimonial" className="go-down">
									<img src={`/static/images/down-arrrow.svg`} alt="See Next" className="" />
								</a>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<div className="divider"></div>
		</>
	);
};

export default BankIntegrationSection;
