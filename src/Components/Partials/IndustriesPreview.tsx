import axios from 'axios';
import HomeNavbar from '@components/Navbars/HomeNavbar';
import parse from 'html-react-parser';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ESTALE } from 'constants';

let title, subTitle, sectionClass, filter, align, cols;
class IndustriesPreview extends React.Component {
	state = {
		pages: [],
		ghostKey: `${process.env.REACT_APP_GCMS_API_KEY}`,
		baseUrl: `${process.env.REACT_APP_GCMS_BASE_URL}/ghost/api/v3/`,
		errors: null,
		isLoading: true,
		placeholder: 'https://place-hold.it/300',
		title: 'Deskera Industries',
		subTitle: '',
		sectionClass: 'backdrop-white has-layer-none has-logo-dark',
		filter: '&limit=2',
		align: 'h',
		cols: '2',
	};

	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(props: any) {
		super(props);
		title = this.state.title;
		subTitle = this.state.subTitle;
		sectionClass = this.state.sectionClass;
		filter = this.state.filter;
		align = this.state.align;
		cols = this.state.cols;
		if (props.title) {
			title = props.title;
		}
		if (props.subTitle) {
			subTitle = props.subTitle;
		}
		if (props.sectionClass) {
			sectionClass = props.sectionClass;
		}
		if (props.filter) {
			filter = props.filter;
		}
		if (props.align) {
			align = props.align;
		}
		if (props.cols) {
			cols = props.cols;
		}
	}
	// Now we're going to make a request for data using axios
	async getPosts() {
		// console.log(this.state.baseUrl + filter);
		let url = this.state.baseUrl + 'content/pages/?key=' + this.state.ghostKey + filter;
		await axios
			// This is where the data is hosted
			.get(url)
			// Once we get a response and store data, let's change the loading state
			.then((response) => {
				this.setState({
					pages: response.data['pages'],
					isLoading: false,
				});
			})
			// If we catch any errors connecting, let's update accordingly
			.catch((error) => this.setState({ error, isLoading: false }));
	}

	// Let's our app know we're ready to render the data
	componentDidMount() {
		this.getPosts();
	}
	parseData(content, length) {
		var ellipses = '';
		if (content.length > length) {
			ellipses = '...';
		}
		var data = content
			.replace(/<a\b[^>]*>(.*?)<\/a>/i, '')
			.replace(/<p\b[^>]*>/i, '')
			.replace(/<\/p>/i, '')
			.replace(/\[(.*?)\]/i, '')
			.slice(0, length);

		return parse(data + ellipses);
	}

	render() {
		const { isLoading, pages } = this.state;
		let lgCols = Math.ceil(12 / cols);
		let imgCols = 5;
		let contentCols = 7;
		if (align === 'v') {
			imgCols = 12;
			contentCols = 12;
		}
		return (
			<>
				{pages.length > 0 ? (
					<section className={`section industries-preview-section ${sectionClass}`} id="industries-preview">
						<HomeNavbar {...this.props} />
						<div className="divider"></div>
						<Container className="section-inner-wrapper">
							<div className="divider"></div>
							<Row>
								<Col xs={12} className="text-center text-lg-left">
									<h3 className="section-leader">{subTitle}</h3>
									<h2 className="section-heading">{title}</h2>
								</Col>
							</Row>
							<React.Fragment>
								<Row className="justify-content-center align-items-center">
									{!isLoading ? (
										pages.map((page, i) => {
											const { id, title, excerpt, feature_image, url } = page;
											let finalUrl = url
												.replace(/(.*)(https:\/\/gcms.deskera.com\/)/g, `$1/industries/`)
												.replace(/(.*)(https:\/\/gcms-staging.deskera.xyz\/)/g, `$1/industries/`);
											let featureImage = '';
											if (feature_image) {
												featureImage = feature_image
													.replace(/(.*)(https:\/\/gcms.deskera.com\/)/g, `$1${process.env.REACT_APP_WEB_URL}/`)
													.replace(/(.*)(https:\/\/gcms-staging.deskera.xyz\/)/g, `$1${process.env.REACT_APP_WEB_URL}/`);
											}
											let description = excerpt.split('\n').slice(2, -1);
											if (description) {
												description = description.toString();
											} else {
												description = excerpt;
											}
											return (
												<Col
													key={id}
													xs={12}
													md={9}
													lg={lgCols}
													className={`card-group d-block d-lg-flex ${
														imgCols !== 12 ? 'align-horizontal' : 'align-vertical'
													} my-4`}
												>
													<div className="page-content card border-0 shadow-lg h-100">
														<Row className="align-items-stretch card-body d-flex flex-column h-100 py-0">
															<Col
																xs={12}
																md={12}
																lg={imgCols}
																className={`align-self-stretch ${
																	imgCols !== 12 ? 'pr-lg-0' : 'img-container'
																} p-0 my-0`}
															>
																<a href={finalUrl} className="link">
																	<img
																		src={featureImage}
																		alt=""
																		className="img-responsive featured-image card-img"
																	/>
																</a>
															</Col>
															<Col
																xs={12}
																md={12}
																lg={contentCols}
																className={`align-self-center ${
																	contentCols !== 12 ? 'py-4 px-5 px-lg-4' : 'px-5 py-4'
																}`}
															>
																<h3 className="page-title card-title my-2">
																	<a href={finalUrl} className="link">
																		{this.parseData(title, 50)}
																	</a>
																</h3>
																<div className="page-excerpt card-text text-dark mt-0 mb-2 pr-5">
																	{this.parseData(description, 160)}
																</div>
																<div className="page-url mt-2">
																	<a href={url} className="link">
																		Read More <FontAwesomeIcon icon={faArrowRight} />
																	</a>
																</div>
															</Col>
														</Row>
													</div>
												</Col>
											);
										})
									) : (
										<>
											<Col xs={12} md={6} className="p-0">
												<div className="page-content">
													<ContentLoader
														speed={2}
														width={500}
														height={300}
														viewBox="0 0 500 300"
														backgroundColor="#f3f3f3"
														foregroundColor="#ecebeb"
													>
														<rect x="20" y="8" rx="0" ry="0" width="200" height="300" />
														<rect x="240" y="8" rx="0" ry="0" width="260" height="30" />
														<rect x="240" y="50" rx="0" ry="0" width="260" height="45" />
														<rect x="240" y="100" rx="0" ry="0" width="260" height="140" />
														<rect x="240" y="280" rx="0" ry="0" width="180" height="15" />
													</ContentLoader>
												</div>
											</Col>
											<Col xs={12} md={6} className="p-0">
												<div className="post-content">
													<ContentLoader
														speed={2}
														width={500}
														height={300}
														viewBox="0 0 500 300"
														backgroundColor="#f3f3f3"
														foregroundColor="#ecebeb"
													>
														<rect x="20" y="8" rx="0" ry="0" width="200" height="300" />
														<rect x="240" y="8" rx="0" ry="0" width="260" height="30" />
														<rect x="240" y="50" rx="0" ry="0" width="260" height="45" />
														<rect x="240" y="100" rx="0" ry="0" width="260" height="140" />
														<rect x="240" y="280" rx="0" ry="0" width="180" height="15" />
													</ContentLoader>
												</div>
											</Col>
										</>
									)}
								</Row>
							</React.Fragment>
						</Container>
						<div className="divider"></div>
					</section>
				) : (
					<></>
				)}
			</>
		);
	}
}

export default IndustriesPreview;
