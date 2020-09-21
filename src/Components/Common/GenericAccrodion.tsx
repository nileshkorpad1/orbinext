import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@styles/core/pages/partials/_cardsgenericlayout.scss';
import parse from 'html-react-parser';

const CardData = [
	{
		heading: 'How Does 30 Day Trial Work?',
		description:
			'You have full access to the selected product and plan features during the 30 days. You can invite your team-mates and other users to be a part of the trial w/o restrictions',
	},
	{
		heading: 'What will happen to my account once the trial is over?',
		description:
			"Don't worry, we will remind you when the trial is about to get over. You can choose to subscribe to any available plan and enter payment details for the account to remain active. In case you choose not to subscribe within the trial period, the individual products will be inaccessible. You will still be able to go the Admin section and can choose to subscribe for any available plan and it will give you the appropriate access.",
	},
	{
		heading: 'How often will I have to pay for renewal/subscription?',
		description:
			'The payment frequency will depend on the subscription contract you choose. We have two options, Annual and Monthly. If you go for an annual subscription, you will get an immediate 20% off and will have to renew only after the annual subscription period is over. If you go for a monthly subscription, the payment will be charged each month.',
	},
	{
		heading: 'Can I upgrade/change the plan any time?',
		description:
			'You can upgrade/change any time and we will adjust the difference. Please note that if you are moving to a lower plan, you may end up losing access to some of your data/features that may be available only in the higher plans.',
	},
	{
		heading: 'What are Users? What Are Power users? What are Free users?',
		description:
			'A User is anyone who can access the system. A user can be a power user or a free user. Power Users are users with advanced access rights in the system. e.g. access to add/edit/delete other users, approving leaves, approving expenses, accessing financial reports. Free users are users with controlled access rights e.g. They can create and send invoices, they can manage deals, contacts, and can apply for leaves, expense reimbursements, and view their paystubs/payslips.',
	},
	{
		heading: 'What is the limit on no. of Free users?',
		description:
			'There is no limit, yes, no limit on adding free users to Deskera Books and Deskera CRM. The number of free users/employees that can be added to Deskera HRIS are 15 for the Startup plan, 30 for Essentials Plan and 100 for Pro plans. If you need to add more than 100 employees for payroll, please <a href ="https://www.deskera.com/deskera-contact/">contact us</a>.',
	},
	{
		heading: 'When will you start billing me?',

		description: 'Your billing will start as soon as you enter your payment details in the system.',
	},
	{
		heading: 'Can I cancel my subscription?',
		description:
			'You can cancel a monthly subscription any time. The account will become inactive at the end of the billing cycle, so you have sufficient time to transfer or download any data. You can cancel an annual subscription in the first 30 days for a full refund.',
	},
	{
		heading: 'How safe is my data?',
		description: 'We use TSL security encryption which is the industry standard for transmitting data safely over the Internet.',
	},
	{
		heading: 'How can I get support?',
		description:
			'We have email and chat support available for you. You can either send an email to our helpdesk <a href="mailto:care@deskera.com" target="_blank">care@deskera.com</a> or chat live with us from within the system or from our website by using the chat icon in the bottom right corner.',
	},
	{
		heading: 'How can I get a Demo?',
		description:
			'We run daily webinars on running your business with Deskera. We show the system and its features in these interactive sessions that last for around 1 hr. <a href="https://calendly.com/deskera-events" target="_blank">Book one today</a> to see how we can help you.',
	},
];

const GenericAccrodion = (newData) => {
	let AccrodionDetails = CardData;

	if (newData.CreateAccrodion) {
		AccrodionDetails = newData.CreateAccrodion;
	}

	let content = [];
	AccrodionDetails.forEach((data, i) => {
		content.push(
			<React.Fragment key={i}>
				<Accordion.Toggle as={Card.Header} className="heading" eventKey={i.toString()}>
					{data.heading}
					<div className="toggle-element">{<FontAwesomeIcon icon={faPlus} className="fa-w-10" />}</div>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={i.toString()}>
					<Card.Body className="description">{parse(data.description)}</Card.Body>
				</Accordion.Collapse>
			</React.Fragment>,
		);
	});

	return (
		<Accordion className="generic-accordion">
			<Card>{content}</Card>
		</Accordion>
	);
};

export default GenericAccrodion;
