import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { CountryDetection } from 'src/routes/CountryDetection';
import Link from 'next/link';
import { useRouter } from 'next/router';


const TinyFooter = (props) => {
	let countryRoute = CountryDetection.myCountry(props);
	  const router = useRouter();

	let pathName = router.pathname;
	let classes = pathName.split('/');
	classes = classes.filter((v) => v !== '');
	return (
		<React.Fragment>
			<Container className="tiny-footer">
				{!classes.includes('lp') ? (
					<React.Fragment>
						<Row className="text-left justify-content-start">
							<Col xs={12}>
								<hr className="divider bottom-separator" />
							</Col>
						</Row>
					</React.Fragment>
				) : (
					<React.Fragment></React.Fragment>
				)}
				<Row className="text-left">
					<Col xs={12} md={12} className="footer-links">
						<div className="d-md-flex text-center justify-content-center my-3 flex-md-wrap">
							<span className="footer-links-item">
								<Link href={`${countryRoute}/terms-of-service/`}>
									<a>Terms of Service</a>
								</Link>
							</span>
							<span className="footer-links-item">
								<Link href={`${countryRoute}/privacy-policy/`}>
									<a>Privacy Policy</a>
								</Link>
							</span>
							<span className="footer-links-item">ISO 9001</span>
							<span className="w-100 d-block d-lg-none"></span>
							<span className="footer-links-item">© deskera.com</span>
							<span className="footer-links-item">All rights reserved.</span>
						</div>
						{/* <div className="d-md-flex text-center text-md-right justify-content-center justify-content-md-end pt-3 pt-md-0">
							<a href="https://www.facebook.com/deskera" target="_blank" rel="noopener noreferrer" className="px-0 social-icon-link">
								<FontAwesomeIcon icon={['fab', 'facebook-square']} />
							</a>
							<a href="https://www.twitter.com/deskera" target="_blank" rel="noopener noreferrer" className="px-0 social-icon-link">
								<FontAwesomeIcon icon={['fab', 'twitter']} />
							</a>
							<a href="https://www.linkedin.com/company/deskera" target="_blank" rel="noopener noreferrer" className="px-0 social-icon-link">
								<FontAwesomeIcon icon={['fab', 'linkedin']} />
							</a>
							<a href="https://www.youtube.com/channel/UC8hh5AS992B6k0_d7hWa1ig" target="_blank" rel="noopener noreferrer" className="px-0 social-icon-link">
								<FontAwesomeIcon icon={['fab', 'youtube']} />
							</a>
						</div> */}
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};
export default TinyFooter;
