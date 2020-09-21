import React from 'react';
import { Helmet } from 'react-helmet';
import { CountryDetection } from 'src/routes/CountryDetection';

const DeskeraPricingSeo = (product: any) => {
	let countryRoute = CountryDetection.getCountryName();
	let productName;
	if (product) {
		productName = product.productName;
	}
	return (
		<Helmet>
			<title>{`Deskera ${productName} Pricing and Subscription Plans overview ${countryRoute}`}</title>
			<meta name="title" content={`Deskera ${productName} Pricing and Subscription Plans overview ${countryRoute}`} />
			<meta
				name="description"
				content={`The Deskera ${productName} suite comes with a 30 day free trial and affordable plans for every stage of business you are in ${countryRoute}`}
			/>
			<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
			<meta property="og:site_name" content="Deskera"></meta>
			<meta property="og:title" content={`Deskera ${productName} Pricing and Subscription Plans overview ${countryRoute}`} />
			<meta
				property="og:description"
				content={`The Deskera ${productName} suite comes with a 30 day free trial and affordable plans for every stage of business you are in ${countryRoute}`}
			/>
			<meta name="twitter:card" content="summary"></meta>
			<meta name="twitter:title" content={`Deskera ${productName} Pricing and Subscription Plans overview ${countryRoute}`}></meta>
			<meta
				name="twitter:description"
				content={`The Deskera ${productName} suite comes with a 30 day free trial and affordable plans for every stage of business you are in ${countryRoute}`}
			></meta>
		</Helmet>
	);
};

export default DeskeraPricingSeo;
