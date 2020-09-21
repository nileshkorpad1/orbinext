import React from 'react';
import Zendesk from 'react-zendesk';

const ZendeskChat = (props) => {
	const ZENDESK_KEY = '29775f1d-65c7-4557-8a56-e368f4c09559';
	const setting = {
		color: {
			theme: '#181715',
			launcher: '#181715', // This will also update the badge
			launcherText: '#FFFFFF',
			button: '#181715',
			resultLists: '#000000',
			header: '#181715',
			headerText: '#FFFFFF',
			articleLinks: '#FF4500',
		},
		launcher: {
			chatLabel: {
				'*': 'Chat Now',
			},
			label: {
				'*': 'Contact Us',
			},
		},
		contactForm: {
			fields: [{ id: 'description', prefill: { '*': 'My pre-filled description' } }],
		},
	};

	return <Zendesk zendeskKey={ZENDESK_KEY} {...setting} onLoaded={() => console.log('is loaded')} />;
};
export default ZendeskChat;
