import { userService } from "@Services";
// import { CountryDetection } from 'src/routes/CountryDetection';
// import { userService } from 'src/services';
import { Cookies } from "./Helpers";
// export const DefaultCountryRedirect = () => {
// 	const history = useHistory();
// 	const match = useRouteMatch();
// 	const location = useLocation();
// 	let pathName = location.pathname;
// 	if (navigator.userAgent !== 'ReactSnap') {
// 		let countryRoute = CountryDetection.myCountry({ ...{ match: match, location: location } });
// 		const DefaultCountry = Cookies.get('_default-country') ? JSON.parse(Cookies.get('_default-country')) : null;
// 		let CountryISOLowerD = DefaultCountry !== null ? DefaultCountry['country']['iso_code'].toLowerCase() : '';
// 		const countries = ['sg', 'my', 'in', 'id'];
// 		const CountryPopCookie = Cookies.get('_country-pop') || null;
// 		const isNotGlobal = countries.includes(CountryISOLowerD) || false;
// 		if (isNotGlobal) {
// 			pathName = pathName.replace(countryRoute, `/${CountryISOLowerD}`);
// 		} else {
// 			pathName = pathName.replace(countryRoute, '');
// 		}
// 		if (!CountryPopCookie) {
// 			if (isNotGlobal) {
// 				Cookies.set('_country-pop', CountryISOLowerD, 1);
// 			} else {
// 				Cookies.set('_country-pop', 'us', 1);
// 			}
// 			history.push(pathName);
// 		}
// 	}
// };
const locationCheck = {
    async getCurrentLocation() {
        await userService.getCurrentLocation().then(
            location => {
                if (location) {
                    const locationDetails = {
                        city: {
                            geoname_id: location.city.geoname_id,
                            names: { en: location.city.names.en },
                        },
                        country: {
                            geoname_id: location.country.geoname_id,
                            iso_code: location.country.iso_code,
                            names: { en: location.country.names.en },
                        },
                    };
                    const locationJSON = JSON.stringify(locationDetails);
                    Cookies.set("_default-country", locationJSON, 0.1);
                }
            },
            error => {
                console.log(error);
            }
        );
    },
};
export default locationCheck;
