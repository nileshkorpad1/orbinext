// import { useRouter } from "next/router";
// const router = useRouter();
export const CountryDetection = {
	myCountry,
	getCountryName,
};
function myCountry(props?: any) {
	let countryRoute = '';
	let splitPath = [];
	let finalPath = '';
	if (typeof window !== 'undefined') {
		splitPath = window.location.pathname.split('/');
		finalPath = splitPath[1];
	}
	switch (finalPath) {
		case 'sg':
			countryRoute = '/sg';
			break;
		case 'in':
			countryRoute = '/in';
			break;
		case 'id':
			countryRoute = '/id';
			break;
		case 'my':
			countryRoute = '/my';
			break;
	}
	return countryRoute;
}

function getCountryName() {
	let slug = '';
	if (typeof window !== 'undefined') {
		slug = window.location.pathname;
	}
	let splitPath = slug.split('/');
	let finalSlug = splitPath[1];
	let countryName = '';
	switch (finalSlug) {
		case 'sg':
			countryName = ' - Singapore';
			break;
		case 'in':
			countryName = ' - India';
			break;
		case 'id':
			countryName = ' - Indonesia';
			break;
		case 'my':
			countryName = ' - Malaysia';
			break;
	}
	return countryName;
}
