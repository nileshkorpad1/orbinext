import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// react-bootstrap components
import Carousel from 'react-bootstrap/Carousel';

import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft, faAngleRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HomeNavbar from '@components/Navbars/HomeNavbar';
import TranslateText from '@Helpers/TranslateText';

const TestimonialData = [
	{
		description:
			'This application is very nice and easy to navigate. I hope they add a feature where you can customize the currency for each invoice and another feature where you can calculate the discount after taxes are added and not just before. Regardless, this app is as great as it is now so thank you.',
		ClientName: 'Milton Mcneil',
		rating: '5',
	},
	{
		description:
			'An amazing business tool. Once you learn it’s functions you can’t do without it. Available 24/7 for all your financial accounting needs! Highly recommend this app.',
		ClientName: 'Molly Rojas',
		rating: '5',
	},
	{
		description:
			'My business has been excellent since I started using this application online. This application is very user-friendly, I can do everything on my phone. I can send professional estimates on the spot, receive payments from almost any source, send receipts, ... everything',
		ClientName: 'Clyde Thorpe',
		rating: '5',
	},
	{
		description:
			'This app has made accounting really easy. The app has a user friendly UI. It has all the operations which are required for normal accounting. This app is a real life saver.',
		ClientName: 'Joshua Abbot',
		rating: '5',
	},
	{
		description:
			'Great  experience..quite handy and makes whole accounting for my family business easy and smooth ..Also piece of cake when it’s a TAX time sorting everything out for me.',
		ClientName: 'Lucas Rocha',
		rating: '5',
	},
	{
		description: 'Love this app,keeps track of all my expenses and payments from clients.Easiest way to do estimates and invoices as well.',
		ClientName: 'Preston Wynn',
		rating: '5',
	},
	{
		description: 'Super-rich with features, easy to use and has everything that you need  for your business.',
		ClientName: 'Ryder Vasquez',
		rating: '5',
	},
	{
		description: 'There is no chance of any error in my financial reports now.Thank you so much for an awesome app.',
		ClientName: 'Addison Beck',
		rating: '5',
	},
	{
		description: 'This app has a nice organized style that lets me run my complete accounting business practice.',
		ClientName: 'Diana Hayden',
		rating: '5',
	},
	{
		description:
			'Anyone who has a small to medium sized business would do well to use this app.No more saving receipts.It stores it all for you and invoices are simple and also shareable.',
		ClientName: 'Cassidy Hensley',
		rating: '5',
	},
	{
		description: 'I’m able to keep a pulse on my business as well as get information on cash expenses before I forget about them.',
		ClientName: 'Benjamin Roy',
		rating: '5',
	},
	{
		description: 'I’m a freelancer and it’s a perfect app for maintaining my accounting expense.',
		ClientName: 'Kayden Moss',
		rating: '5',
	},
	{
		description: 'Very easy to use even without professional accounting background. Love it !',
		ClientName: 'Ian Davidson',
		rating: '5',
	},
	{
		description:
			'This app helps me do the crucial tasks of invoices,expensesetc.At the same time it give me a clear view of my business’ financial health',
		ClientName: 'Camden Harvey',
		rating: '5',
	},
	{
		description: 'Beautiful interface very easy to use. They thought of everything while designing the app',
		ClientName: 'Aaliyah Tran',
		rating: '5',
	},
	{
		description: 'Beautiful interface very easy to use. They thought of everything while designing the app',
		ClientName: 'Elizabeth Warner',
		rating: '5',
	},

	{
		description:
			'This app has made accounting really easy. The app has a user friendly UI. It has all the operations which are required for normal accounting. This app is a real life saver.',
		clientName: 'Cecile Padberg',
		designation: 'CEO',
		company: 'Celario',
		rating: '5',
		featured: true,
		image: 'testimonials-avatar@2x.png',
	},
];
/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size) {
	var index = 0;
	var tempArray = [];

	for (index = 0; index < 4; index += chunk_size) {
		const arrayChunk = myArray.slice(index, index + chunk_size);
		// Do something if you want with the group
		tempArray.push(arrayChunk);
	}

	return tempArray;
}
const Testimonial = () => {
	// const [] = useState(0);
	const getRatings = (rating) => {
		let content = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				content.push(<FontAwesomeIcon icon={faStar} key={i} />);
			} else {
				content.push(<FontAwesomeIcon icon={faStarOutline} className="empty-star" key={i} />);
			}
		}
		return <span className="stars d-block d-md-inline">{content}</span>;
	};

	function TestimonialDataItem() {
		let content = [];
		let featuredItem = [];

		TestimonialData.forEach((testimonial, i) => {
			let featured = testimonial.hasOwnProperty('featured') ? testimonial.featured : false;
			if (featured) {
				featuredItem.push(
					<Card key={i} className="d-flex flex-column justify-content-center shadow-sm testimonial-card">
						<p className="text-center section-description testimonial-text">
							{testimonial.hasOwnProperty('description') ? testimonial.description : ''}
						</p>
						<div className="mt-5 pt-4 user-profile text-center">
							<h5 className="mt-4 user-name">{testimonial.hasOwnProperty('clientName') ? testimonial.clientName : ''}</h5>
							<div className="mt-2 company">
								{testimonial.hasOwnProperty('designation') ? testimonial.designation : ''},
								{testimonial.hasOwnProperty('company') ? testimonial.company : ''}
							</div>
							{getRatings(testimonial.hasOwnProperty('rating') ? testimonial.rating : 0)}
						</div>
					</Card>,
				);
			} else {
				content.push(
					<Card key={i} className="shadow-sm d-flex justify-content-center testimonial-card">
						<p className="section-description testimonial-text">
							{testimonial.hasOwnProperty('description') ? testimonial.description : ''}
						</p>
						<h5 className="mr-4 mt-4 user-name">
							<span className="mr-4">{testimonial.hasOwnProperty('ClientName') ? testimonial.ClientName : ''}</span>
							{getRatings(testimonial.hasOwnProperty('rating') ? testimonial.rating : 0)}
						</h5>
					</Card>,
				);
			}
		});
		const chunkedContent = chunkArray(content, 4);

		const Iconprev = <FontAwesomeIcon icon={faAngleLeft} />;
		const Iconnext = <FontAwesomeIcon icon={faAngleRight} />;
		return (
			<>
				<Carousel
					prevIcon={Iconprev}
					nextIcon={Iconnext}
					indicators={false}
					fade={false}
					wrap={false}
					interval={6000}
					className="d-none d-md-block"
				>
					{chunkedContent.map((element, index) => (
						<Carousel.Item key={index}>
							<Row className="d-flex justify-content-between">
								<Col xs={12} md={8} className="testimonial-list align-self-stretch">
									<div className="card-columns">{element}</div>
								</Col>
								<Col xs={12} md={4} className="testimonial-feature align-self-stretch">
									<div className="card-columns">{featuredItem}</div>
								</Col>
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
				<Carousel fade={false} wrap={false} indicators={false} className="d-md-none d-lg-none d-sm-block">
					<Carousel.Item>
						<Row className="d-flex justify-content-between">
							<Col xs={12} md={12} className="testimonial-feature align-self-stretch">
								<div className="card-columns">{featuredItem}</div>
							</Col>
						</Row>
					</Carousel.Item>
				</Carousel>
			</>
		);
	}
	return (
		<>
			<TestimonialDataItem />
		</>
	);
};

const TestimonialSection = (props) => {
	return (
		<>
			<section className="section testimonial-section viewport-size backdrop-light has-layer-light has-logo-dark" id="testimonial">
				<HomeNavbar {...props} />
				<div className="divider"></div>
				<Container className="section-inner-wrapper position-relative">
					<Row className="justify-content-start">
						<Col xs={12}>
							<h3 className="section-leader">
								<span>{TranslateText('common.testimonial.section-leader')}</span>
							</h3>
							<h2 className="section-heading">{TranslateText('common.testimonial.section-heading')}</h2>
						</Col>
					</Row>
					<Row className="align-items-stretch">
						<Col xs={12} className="mx-auto my-5">
							<Testimonial />
						</Col>
					</Row>
					{/* begin decorator elements outside row/col */}
					<div className="background-decorator top-left">
						<img src={`/static/images/quote-start@2x.png`} alt="" className="img-responsive background-decorator top-left one" />
					</div>
					<div className="background-decorator bottom-right">
						<img
							src={`/static/images/quote-end@2x.png`}
							alt=""
							className="img-responsive background-decorator bottom-right two"
						/>
					</div>
					{/* begin decorator elements outside row/col */}
				</Container>
			</section>
		</>
	);
};

export default TestimonialSection;
