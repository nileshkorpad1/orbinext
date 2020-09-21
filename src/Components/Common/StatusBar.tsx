import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
const StatusBarStyle = styled.div`
	background-color: #000;
	color: #fff;
	padding: 0.8rem;
	width: 100%;
	text-align: center;
`;
const StatusBarText = styled.span`
	color: #fff;
	padding: 0 0.8rem;
`;
const StatusBar = () => {
	return (
		<React.Fragment>
			<StatusBarStyle>
				<StatusBarText>
					<span className="px-2">
						<Image src={`/static/images/expire-icon.svg`} />
					</span>
					Hey Danial, You've X days remaining in your trial.
				</StatusBarText>
				<Button variant={'outline-primary'} size="sm">
					Upgrade Now
				</Button>
			</StatusBarStyle>
		</React.Fragment>
	);
};
export default StatusBar;
