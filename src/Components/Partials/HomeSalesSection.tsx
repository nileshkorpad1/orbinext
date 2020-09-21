import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Timeline, Tween } from 'react-gsap';
import { Parallax } from 'react-scroll-parallax';
import { Controller, Scene } from 'react-scrollmagic';

import HomeNavbar from '../../components/Navbars/HomeNavbar';
import TranslateText from '@Helpers/TranslateText';
import { CountryDetection } from 'src/routes/CountryDetection';
// import { ReactComponent as ProductIconSales } from '../../assets/images/icon-product-sales-mono-fill.svg';

const HomeSalesSection = (props) => {
	let countryRoute = CountryDetection.myCountry(props);
	return (
		<>
			<section className="section sales-section viewport-size backdrop-light has-layer-none has-logo-product-sales" id="HomeSales">
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
											<h3 className="section-leader has-product-icon icon-sales">
												<span className="ascent-base">
													<img src="/static/images/icon-product-sales-mono-fill.svg" className="product-icon" />
													Sales
												</span>
											</h3>
											<h2 className="section-heading mb-4">{TranslateText('home.salesSection.heading')}</h2>
											<p className="section-description my-4">{TranslateText('home.salesSection.byline')}</p>
											<p className="section-trailer my-4">
												<a href={`${countryRoute}/crm/`} className="btn btn-readmore btn-link">
													{TranslateText('home.salesSection.linkText')} →
												</a>
											</p>
										</Col>
										<Col xs={12} md={6} className="pr-md-0 secondary-panel">
											<Parallax className="parallax" y={[-1, 1]} tagOuter="div">
												<img
													src={`/static/images/home-sales-section-screenshot@2x.png`}
													alt=""
													className="img-responsive main-screenshot shadow-lg"
												/>
												<Parallax className="parallax-takeout takeout-two" y={[-10, 30]} x={[0, 0]} tagOuter="div">
													<img
														alt="takeout"
														src={`/static/images/home-sales-section-takeout-02@2x.png`}
														className="takeout takeout-two shadow-lg"
													/>
												</Parallax>
												<Parallax className="parallax-takeout takeout-one" y={[-10, 30]} x={[0, 0]} tagOuter="div">
													<img
														alt="takeout"
														src={`/static/images/home-sales-section-takeout-01@2x.png`}
														className="takeout takeout-one shadow-lg"
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
						<Col className="text-left">
							<div className="down-button my-5">
								<a href="#HomePeople" className="go-down">
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

export default HomeSalesSection;
