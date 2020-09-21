import React from 'react';
import HomeNavbar from '@components/Navbars/HomeNavbar';
import Hero from '@views/landingPages/landing-page-1/Hero';
import WhatIsDeskera from '@views/landingPages/landing-page-1/WhatIsDeskera';
import Testimonials from '@views/landingPages/landing-page-1/Testimonials';
import SalesInfo from '@views/landingPages/landing-page-1/SalesInfo';
import AIOFeatures from '@views/landingPages/landing-page-1/AIOFeatures';
import CompareWithOthers from '@views/landingPages/landing-page-1/CompareWithOthers';
import MediaInterviews from '@views/landingPages/landing-page-1/MediaInterviews';
import DoWithDeskera from '@views/landingPages/landing-page-1/DoWithDeskera';
import AIODashboard from '@views/landingPages/landing-page-1/AIODashboard';
import Benefits from '@views/landingPages/landing-page-1/Benefits';
import BooksInfo from '@views/landingPages/landing-page-1/BooksInfo';
import PeopleInfo from '@views/landingPages/landing-page-1/PeopleInfo';
import Ratings from '@views/landingPages/landing-page-1/Ratings';
import AIOBusinessSoftware from '@views/landingPages/landing-page-1/AIOBusinessSoftware';
import ProductPipeline from '@views/landingPages/landing-page-1/ProductPipeline';
import MobileApps from '@views/landingPages/landing-page-1/MobileApps';
import MovetoCloud from '@views/landingPages/landing-page-1/MovetoCloud';
import SaveMoney from '@views/landingPages/landing-page-1/SaveMoney';
import ChangeBusiness from '@views/landingPages/landing-page-1/ChangeBusiness';
import Faq from '@views/landingPages/landing-page-1/Faq';
import TinyFooter from '@components/Footers/TinyFooter';
import '@styles/core/pages/lp-page-01.scss';

export const ReusableSections = {
	getReusableSection,
	skipNavBar,
};
function getReusableSection(props: any, id: any) {
	switch (id) {
		case 'lp-hero':
			return <Hero {...props} />;
		case 'lp-what-is-deskera':
			return <WhatIsDeskera {...props} />;
		case 'lp-testimonial':
			return <Testimonials {...props} />;
		case 'lp-change-business':
			return <ChangeBusiness {...props} />;
		case 'lp-do-with-deskera':
			return <DoWithDeskera {...props} />;
		case 'lp-aio-dashboard':
			return <AIODashboard {...props} />;
		case 'lp-benefits':
			return <Benefits {...props} />;
		case 'lp-books-info':
			return <BooksInfo {...props} />;
		case 'lp-sales-info':
			return <SalesInfo {...props} />;
		case 'lp-people-info':
			return <PeopleInfo {...props} />;
		case 'lp-aio-features':
			return <AIOFeatures {...props} />;
		case 'lp-ratings':
			return <Ratings {...props} />;
		case 'lp-aio-business-software':
			return <AIOBusinessSoftware {...props} />;
		case 'lp-compare-with-others':
			return <CompareWithOthers {...props} />;
		case 'lp-media-interviews':
			return <MediaInterviews {...props} />;
		case 'lp-save-money':
			return <SaveMoney {...props} />;
		case 'lp-product-pipeline':
			return <ProductPipeline {...props} />;
		case 'lp-mobile-apps':
			return <MobileApps {...props} />;
		case 'lp-moveto-cloud':
			return <MovetoCloud {...props} />;
		case 'lp-faq':
			return <Faq {...props} />;
		case 'lp-tiny-footer':
			return <TinyFooter {...props} />;
	}
}

function skipNavBar(props: any) {
	let skipPages = ['lp'];

	let slug = '';
	if (typeof window !== 'undefined') {
		slug = window.location.pathname;
	}
	let splitPath = slug.split('/');
	splitPath = splitPath.filter((item) => item);
	let finalSlugPosition = splitPath.length - 1;
	let finalSlug = splitPath[finalSlugPosition];
	if (!skipPages.includes(finalSlug)) {
		return <HomeNavbar {...props} />;
	}
}
