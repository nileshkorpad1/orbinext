import React from 'react';
import { Card } from 'react-bootstrap';

import '@styles/core/pages/partials/_cardsgenericlayout.scss';

const CardsData = [
	{
		image: 'contact-icon.svg',
		heading: 'Contacts',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus purus enim. In a dui ultricies tortor luctus mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		image: 'campaign-icon.svg',
		heading: 'Campaign',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus purus enim. In a dui ultricies tortor luctus mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		image: 'sales-deals-icon.svg',
		heading: 'Sales Deals',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus purus enim. In a dui ultricies tortor luctus mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		image: 'lead-management-icon.svg',
		heading: 'Lead Management',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus purus enim. In a dui ultricies tortor luctus mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
];

const CardsGenericLayout = (newCards) => {
	let CardsDetails = CardsData;

	if (newCards.CreateCards) {
		CardsDetails = newCards.CreateCards;
	}

	let content = [];
	CardsDetails.forEach((cardData, i) => {
		let headingImage = '';
		if (cardData.hasOwnProperty('image') && cardData.image) {
			if (cardData.image.includes('https://') || cardData.image.includes('http://')) {
				headingImage = cardData.image;
			} else {
				headingImage = require('src/assets/images/' + cardData.image);
			}
		}
		content.push(
			<Card key={i} className="card-details">
				<div className="heading-group">
					<img src={headingImage} className="image" alt={cardData.hasOwnProperty('title') ? cardData.heading : ''} />
					<div className="section-byline heading">{cardData.hasOwnProperty('heading') ? cardData.heading : ''}</div>
				</div>
				<div className="section-description mt-3">{cardData.hasOwnProperty('description') ? cardData.description : ''}</div>
			</Card>,
		);
	});
	return (
		<>
			<div className="card-generic-layout col-12 p-0">{content}</div>
		</>
	);
};

export default CardsGenericLayout;
