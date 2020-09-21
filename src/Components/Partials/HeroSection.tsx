import { gsap, TimelineMax, TweenMax } from 'gsap';
import React, { useState } from 'react';
// react-bootstrap components
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import Reveal from 'react-reveal';
import { Parallax } from 'react-scroll-parallax';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import { ScrollMagic, ScrollScene } from 'scrollscene';

import HomeNavbar from '@components/Navbars/HomeNavbar';

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

const HeroSection = (props) => {
	// init ref
	const sectionHeroRef = React.useRef(null);
	const businessRef = React.useRef(null);
	const bankRef = React.useRef(null);
	const complianceRef = React.useRef(null);
	// eslint-disable-next-line
	const [scrollMagic, setScrollMagic] = useState({
		controller: new ScrollMagic.Controller({
			globalSceneOptions: {
				addIndicators: true,
			},
		}),
		timelineOne: gsap.timeline({ paused: true }),
		timelineTwo: gsap.timeline({ paused: true }),
		// timelineThree: gsap.timeline(),
	});
	const { timelineOne, timelineTwo } = scrollMagic;

	React.useEffect(() => {
		const { current: sectionHeroElement } = sectionHeroRef;
		const { current: businessElement } = businessRef;
		const { current: bankRefElement } = bankRef;
		const { current: complianceElement } = complianceRef;

		let Heronode = document.querySelector('hero');
		const scrollScene = new ScrollScene({
			triggerElement: sectionHeroElement,
			offset: 0,
			triggerHook: 'onLeave',
			duration: '100%',
		});
		scrollScene.Scene.setPin(sectionHeroElement);

		const scrollSceneFirst = new ScrollScene({
			triggerElement: Heronode,
			offset: 10,
			triggerHook: 'onLeave',
			// duration: '50%',
			gsap: {
				timeline: timelineOne,
			},
		});

		const scrollSceneSecond = new ScrollScene({
			triggerElement: Heronode,
			offset: 300,
			triggerHook: 'onLeave',
			// duration: '50%',
			gsap: {
				timeline: timelineOne,
			},
		});
		const scrollSceneThird = new ScrollScene({
			triggerElement: Heronode,
			offset: 600,
			triggerHook: 'onLeave',
			// duration: '100%',
			gsap: {
				timeline: timelineTwo,
			},
		});

		// scrollSceneFirst.Scene.addIndicators({ name: 'pin scene 1', colorEnd: '#000000' });
		// scrollSceneSecond.Scene.addIndicators({ name: 'pin scene 2', colorEnd: '#000000' });
		// scrollSceneThird.Scene.addIndicators({ name: 'pin scene 3', colorEnd: '#000000' });

		if (!businessElement && !bankRefElement && !complianceElement) {
			return undefined;
		}

		scrollSceneFirst.Scene.on('enter', function (event) {
			businessElement.classList.add('active');
			bankRefElement.classList.remove('active');
			complianceElement.classList.remove('active');
		});
		scrollSceneFirst.Scene.on('leave', function (event) {
			businessElement.classList.add('active');
			bankRefElement.classList.remove('active');
			complianceElement.classList.remove('active');
		});

		scrollSceneSecond.Scene.on('enter', function (event) {
			businessElement.classList.remove('active');
			bankRefElement.classList.add('active');
			complianceElement.classList.remove('active');
		});
		scrollSceneSecond.Scene.on('leave', function (event) {
			businessElement.classList.remove('active');
			bankRefElement.classList.add('active');
			complianceElement.classList.remove('active');
		});
		scrollSceneThird.Scene.on('enter', function (event) {
			complianceElement.classList.add('active');
			bankRefElement.classList.remove('active');
		});

		// destroy on unmount
		return () => {
			scrollScene.destroy();
			scrollSceneSecond.destroy();
			scrollSceneThird.destroy();
		};
	}, [timelineOne, timelineTwo]);

	const handleClick = (element) => {
		businessRef.current.classList.remove('active');
		bankRef.current.classList.remove('active');
		complianceRef.current.classList.remove('active');
		element.current.classList.add('active');
	};

	return (
		<>
			<div className="section" id="hero">
				<section className="section hero-section backdrop-primary has-layer-secondary viewport-size" ref={sectionHeroRef}>
					<HomeNavbar {...props} />
					<div className="divider"></div>
					<Container className="section-inner-wrapper">
						<Row>
							<Col xs={12} md={6} className="primary-panel">
								<h1 className="section-heading">Small Business Platform</h1>

								<div className="hero-features active" ref={businessRef} onClick={() => handleClick(businessRef)}>
									<h3 className="section-byline hero-subheading">One Solution for your Business.</h3>
									<p className="section-description mt-2">
										Your all-in-one solution for invoicing and accounting. Get valuable insights on your customers. Identify
										critical trends quickly and take action on your sales.
									</p>
								</div>
								<div className="hero-features" ref={bankRef} onClick={() => handleClick(bankRef)}>
									<h3 className="section-byline hero-subheading">Complete Bank Integration.</h3>
									<p className="section-description mt-2">
										Your all-in-one solution for invoicing and accounting. Get valuable insights on your customers. Identify
										critical trends quickly and take action on your sales.
									</p>
								</div>
								<div className="hero-features" ref={complianceRef} onClick={() => handleClick(complianceRef)}>
									<h3 className="section-byline hero-subheading">Built-in Compliance.</h3>
									<p className="section-description mt-2">
										Your all-in-one solution for invoicing and accounting. Get valuable insights on your customers. Identify
										critical trends quickly and take action on your sales.
									</p>
								</div>
								<div className="cta-form d-none">
									<InputGroup className="col-md-8 my-3 p-0">
										<FormControl
											placeholder="Enter email for free trial"
											aria-label="Enter email for free trial"
											aria-describedby="cta-form"
										/>
										<InputGroup.Append>
											<Button variant="dark" className="btn-block">
												Try it first!
											</Button>
										</InputGroup.Append>
									</InputGroup>
								</div>
							</Col>
							<Col xs={12} md={6} className="px-0 secondary-panel">
								<Reveal effect="animation--fadeInUp">
									<Parallax className="parallax-banner" y={[-1, 1]} tagOuter="div">
										<img
											src={`/static/images/hero-section-books-screenshot@2x.png`}
											alt=""
											className="img-responsive main-screenshot shadow-lg"
										/>
										<Parallax className="parallax-annotation" y={['-30px', '60px']} tagOuter="div">
											<img
												alt="Books Annotation"
												src={`/static/images/annotation-sample-one-line-dark@2x.png`}
												className="annotation img-annotation shadow-lg"
											/>
										</Parallax>
										<Parallax className="parallax-takeout" y={['-30px', '60px']} x={[0, 0]} tagOuter="div">
											<img
												alt="Books Takeout"
												src={`/static/images/hero-section-books-takeout@2x.png`}
												className="takeout takeout-one shadow-sm"
											/>
										</Parallax>
									</Parallax>
								</Reveal>
							</Col>
						</Row>
					</Container>
					<Container className="post-section">
						<Row>
							<Col>
								<div className="down-button my-5">
									<a href="#pricing" className="go-down">
										<img src={`/static/images/down-arrrow.svg`} alt="" />
									</a>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</div>
		</>
	);
};

export default HeroSection;
