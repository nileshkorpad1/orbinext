import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Timeline, Tween } from 'react-gsap';
import { Parallax } from 'react-scroll-parallax';
import { Controller, Scene } from 'react-scrollmagic';

import HomeNavbar from '@components/Navbars/HomeNavbar';

const ComplianceSection = (props) => {
	return (
		<>
			<section className="section compliance-section viewport-size" id="compliance">
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container className="section-inner-wrapper">
					<Controller>
						<Scene indicators={false} duration="100%" triggerHook="onEnter">
							<Timeline>
								<Tween
									position="0"
									from={{
										yPercent: -30,
									}}
									to={{
										yPercent: 0,
									}}
									// autoAlpha={true}
									// ease="Strong.easeOut"
									ease="Linear.easeNone"
									// paused
								>
									<div className="row justify-content-between align-items-center">
										<Col xs={12} md={5} className="pr-0 primary-panel">
											<h3 className="section-leader">Bank Integration</h3>
											<h1 className="section-heading mb-4">Built-in Compliance.</h1>
											<p className="section-description my-4">
												Reap the benefits of our built-in statutory compliance feature for more accurate and timely
												tax-filing. We make compliance our priority so you never have to worry about it. <br />
												Deskera helps businesses to meet their tax obligations with their regional regulatory bodies. The
												easy-to-use accounting software helps companies in hassle-free and accurate tax filing. Deskera
												enables users to check, edit and select the applicable tax type for every purchase and sales
												transactions. By using Deskera Software, companies can easily manage their periodic audit processes
												and prepare all accounting records in accordance with mandatory financial reporting standards. Deskera
												statutory compliance feature helps customers make their tax submissions accurate and easier for
												governments in Singapore, Malaysia and India by adhering to applicable accounting standards.
											</p>
											<p className="section-trailer my-4">
												<a href="#readmore" className="btn btn-readmore">
													Learn more →
												</a>
											</p>
										</Col>
										<Col xs={12} md={6} className="pr-0 secondary-panel">
											<Parallax className="parallax" y={[-1, 1]} tagOuter="div">
												<img
													src={`/static/images/sales-section-screenshot@2x.png`}
													alt=""
													className="img-responsive main-screenshot shadow"
												/>
												<Parallax className="parallax-annotation" y={[-15, 30]} x={[0, 0]} tagOuter="div">
													<img
														alt="Compliance Annotation"
														src={`/static/images/annotation-sample-two-line@2x.png`}
														className="annotation img-annotation shadow"
													/>
												</Parallax>
												<Parallax className="parallax-takeout" y={[-10, 30]} x={[0, 0]} tagOuter="div">
													<img
														alt="Compliance Takeout"
														src={`/static/images/section2-takeout@2x.png`}
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
								<a href="#bank" className="go-down">
									<img src={`/static/images/down-arrrow.svg`} alt="See Next" className="" />
								</a>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default ComplianceSection;
