import { Cookies } from '@Helpers';
import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import { CountryDetection } from 'src/routes/CountryDetection';

import { StoreState } from '@store/types';

const CountryDetectModal = (props) => {
	const router = useRouter();
	const [CountryISOLower, setCountryISOLower] = React.useState('');
	const [RouterCountry, setRouterCountry] = React.useState('');
	const [showCountryModal, setShowCountryModal] = React.useState(false);
	const [SessionCountry, setSessionCountry] = React.useState('United States');
	const CountryRedirectShow = useSelector((state: StoreState) => state.CountryDialogReducer.Show);

	React.useEffect(() => {
		let countryRoute = '';
		const countries = ['sg', 'my', 'in', 'id'];
		countryRoute = CountryDetection.myCountry(props);

		const DefaultCountry = Cookies.get('_default-country') ? JSON.parse(Cookies.get('_default-country')) : '';
		const CountryPopCookie = Cookies.get('_country-pop');
		let CountryRouteArray = countryRoute ? countryRoute.split('/') : ['us'];
		CountryRouteArray = CountryRouteArray.filter((v) => v !== '');
		const CountryISOLowerD = DefaultCountry ? DefaultCountry['country']['iso_code'].toLowerCase() : '';
		setCountryISOLower(CountryISOLowerD);
		const SessionCountryName = DefaultCountry ? DefaultCountry['country']['names']['en'] : 'United States';
		setSessionCountry(SessionCountryName);
		setRouterCountry(CountryRouteArray[0]);

		if (CountryRouteArray[0] !== CountryISOLowerD && countries.includes(CountryISOLowerD) && !CountryRedirectShow) {
			if (CountryRouteArray[0] !== CountryPopCookie) {
				setShowCountryModal(true);
			}
		}
		if (CountryRedirectShow) {
			setShowCountryModal(true);
		}
	}, [CountryRedirectShow, props]);
	let countryName = CountryDetection.getCountryName() || 'US';
	const handleClose = (CountryRouteD, visit) => {
		Cookies.set('_country-pop', CountryRouteD, 1);
		if (visit) {
			let pathName = props.location.pathname;
			let search = props.location.search;
			CountryRouteD = CountryRouteD !== 'us' ? CountryRouteD : '';
			if (pathName.startsWith(`/${RouterCountry}`)) {
				console.log(RouterCountry);
				pathName = pathName.replace(RouterCountry, CountryRouteD);
			} else {
				search = search ? search : '';
				pathName = '/' + CountryRouteD + pathName + search;
			}
			router.push(pathName);
		}
		setShowCountryModal(false);
	};

	return (
		<Modal show={showCountryModal} size="lg" centered id="country-modal" dialogClassName="modal-90w" onHide={() => setShowCountryModal(false)}>
			<Modal.Body className="p-0 backdrop-primary">
				<div className="main p-0">
					<Container className="section-inner-wrapper">
						<Row className="row align-items-center justify-content-center p-0">
							<Col sm={12} lg={8} className="primary-panel py-5 pl-5 pr-0">
								<Row>
									<Col sm={12}>
										<h3 className="section-heading font-weight-bold">Welcome to Deskera</h3>
										<p className="section-description my-4">
											Are you visiting{' '}
											<strong>https://www.deskera.com{`${RouterCountry !== 'us' ? '/' + RouterCountry : ''}`}</strong> from{' '}
											<strong>{SessionCountry}</strong>? <br />
											Visit your home site for more relevant pricing, promotions and events.
										</p>
										<div className="py-4">
											<Button
												className="btn btn-dark text-white font-weight-bold my-1 mr-4"
												onClick={() => handleClose(CountryISOLower, true)}
											>
												Visit {SessionCountry} site
											</Button>

											<Button className="btn btn-light font-weight-bold my-1" onClick={() => handleClose(RouterCountry, false)}>
												Continue to {`${countryName.replace('-', '')}`} site
											</Button>
										</div>
									</Col>
								</Row>
							</Col>
							<Col lg={4} className="secondary-panel align-self-end d-none d-lg-block p-0">
								<img alt="" src={`/static/images/country-redirections-illustrator@2x.png`} className="img img-fluid" />
							</Col>
						</Row>
					</Container>
				</div>
			</Modal.Body>
		</Modal>
	);
};
export default CountryDetectModal;
