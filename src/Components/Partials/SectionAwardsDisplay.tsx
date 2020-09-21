import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HomeNavbar from '@components/Navbars/HomeNavbar';

const AwardsData = [
	{
		title: 'Top 10 ERP Solution Providers',
		image: '2017-apac-cio@2x.png',
	},
	{
		title: '20 Most Promising CRM Solution Providers',
		image: '2016-cio-advisor@2x.png',
	},
	{
		title: 'Top 100 Asia Winner',
		image: '2016-red-herring@2x.png',
	},
	{
		title: '20 Most Finance  Technology Solution Providers',
		image: '2015-cio@2x.png',
	},
];

const RecognitionData = [
	{
		title: 'App Store',
		image: 'logo-app-store@2x.png',
		rating: 4.5,
	},
	{
		title: 'Get App',
		image: 'logo-get-app@2x.png',
		rating: 4.5,
	},
	{
		title: 'Google Pay',
		image: 'logo-google-play@2x.png',
		rating: 4.2,
	},
	// {
	// 	title: 'Trust Radius',
	// 	image: 'logo-trust-radius@2x.png',
	// 	rating: 4.5,
	// },
	{
		title: 'Capterra',
		image: 'logo-capterra-inc@2x.png',
		rating: 4.2,
	},
];
const AwardsRecognitionsData = () => {
	const getRatings = (rating) => {
		let content = [];
		for (let i = 1; i <= 5; i++) {
			if (i < rating) {
				content.push(<FontAwesomeIcon icon={faStar} key={i} />);
			} else {
				content.push(<FontAwesomeIcon icon={faStarOutline} className="empty-star" key={i} />);
			}
		}
		return (
			<>
				<div className="col-md-6 col-sm-12 stars-rating text-center">
					<span className="stars">{content}</span>
					<p className="ml-4 rating">
						<span className="count"> {rating}</span>
						<span className="total">/5</span>
					</p>
				</div>
			</>
		);
	};

	let awardsItem = [];

	AwardsData.forEach((awards, i) => {
		let awardsImg = awards.hasOwnProperty('image') ? awards.image : '';
		awardsItem.push(
			<Card key={i} className="section-card">
				<div className="p-5 profile-img">
					<img src={`/static/images/${awardsImg}`} className="photo-one" alt="" />
				</div>
			</Card>,
		);
	});

	let recognitionItem = [];
	RecognitionData.forEach((recognition, i) => {
		let recognitionImg = recognition.hasOwnProperty('image') ? recognition.image : '';
		recognitionItem.push(
			<Card key={i} className="shadow-sm section-card">
				<div className="col-md-6 col-sm-12 profile-img text-center">
					<img src={`/static/images/${recognitionImg}`} className="photo-one" alt="" />
				</div>
				{getRatings(recognition.hasOwnProperty('rating') ? recognition.rating : 0)}
			</Card>,
		);
	});

	return (
		<>
			<Row className="d-flex justify-content-between">
				<Col xs={12} md={12} lg={6} className="awards-list">
					<div className="card-columns">{awardsItem}</div>
				</Col>
				<Col xs={12} md={12} lg={6} className="recognition-list">
					<div className="card-columns">{recognitionItem}</div>
				</Col>
			</Row>
		</>
	);
};

const SectionAwardsDisplay = (props) => {
	return (
		<>
			<section
				className="section section-awards-recognition viewport-size backdrop-primary has-layer-primary has-logo-dark"
				id="awards-recognition"
			>
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container className="section-inner-wrapper position-relative">
					<Row className="justify-content-start">
						<Col md={12}>
							<h3 className="section-leader">
								<span>Awards and Recognition</span>
							</h3>
							<h2 className="section-heading">
								Highly Rated <br />
								By Both Critics and Users
							</h2>
						</Col>
					</Row>
					<Row className="align-items-stretch">
						<Col xs={12} className="my-5">
							<AwardsRecognitionsData />
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default SectionAwardsDisplay;
