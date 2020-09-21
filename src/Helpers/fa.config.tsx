/*!
 * Title:   Font awesome Libraries
 * Main Javascript file
 * Author:  Nilesh Korpad
 * Copyright © 2020 Deskera
 * https://www.deskera.com
 */

// FontAwesome used icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faLightbulb, faMoneyBillAlt as farMoneyBillAlt } from '@fortawesome/free-regular-svg-icons';
import {
	faCashRegister,
	faChevronCircleDown,
	faChevronDown,
	faComments,
	faCopyright,
	faDesktop,
	faDollarSign,
	faEnvelope,
	faExclamationCircle,
	faHandshake,
	faHeadphones,
	faHeart,
	faLanguage,
	faLongArrowAltRight,
	faMoneyBillAlt as fasMoneyBillAlt,
	faPlug,
	faQuestion,
	faTag,
	faTools,
	faTrophy,
} from '@fortawesome/free-solid-svg-icons';

// Configure here the font-awesome icons you'll be using across the website
library.add(
	faLongArrowAltRight,
	faDesktop,
	faDollarSign,
	faCashRegister,
	faExclamationCircle,
	farMoneyBillAlt,
	faPlug,
	faTag,
	faHeart,
	faHeadphones,
	faHandshake,
	faQuestion,
	faTrophy,
	faEnvelope,
	faComments,
	faTools,
	faLanguage,
	faCopyright,

	faCreditCard,
	faLightbulb,
	fasMoneyBillAlt,
	faChevronCircleDown,
	faChevronDown,

	fab,
);
