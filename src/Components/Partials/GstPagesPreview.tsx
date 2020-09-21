import axios from 'axios';
import HomeNavbar from '@components/Navbars/HomeNavbar';
import parse from 'html-react-parser';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let title, subTitle, sectionClass, filter, cols;
class GstPagesPreview extends React.Component {
	state = {
		pages: [],
		ghostKey: `${process.env.REACT_APP_GCMS_API_KEY}`,
		baseUrl: `${process.env.REACT_APP_GCMS_BASE_URL}/ghost/api/v3/content/pages/`,
		errors: null,
		isLoading: true,
		placeholder: 'https://place-hold.it/300',
		title: 'See related articles about India GST',
		subTitle: '',
		sectionClass: 'backdrop-white has-layer-none has-logo-dark',
		filter: '&limit=9',
		cols: '2',
	};

	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(props: any) {
		super(props);
		title = this.state.title;
		subTitle = this.state.subTitle;
		sectionClass = this.state.sectionClass;
		filter = this.state.filter;
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
		if (props.cols) {
			cols = props.cols;
		}
	}
	// Now we're going to make a request for data using axios
	async getPages() {
		await axios
			// This is where the data is hosted
			.get(this.state.baseUrl + '?key=' + this.state.ghostKey + '&filter=tags:gst' + filter)
			// Once we get a response and store data, let's change the loading state
			.then((response) => {
				console.log(response);
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
		this.getPages();
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
			.replace(/GST LLP -/i, '')
			.replace(/Legacy/i, '')
			.replace(/\[(.*?)\]/i, '')
			.slice(0, length);

		return parse(data + ellipses);
	}

	render() {
		const { isLoading, pages } = this.state;
		let lgCols = Math.ceil(12 / cols);

		return (
			<React.Fragment>
				{pages.length > 0 ? (
					<section className={`section gstin-preview-section ${sectionClass}`} id="gstin-preview">
						<HomeNavbar {...this.props} />
						<div className="divider"></div>
						<Container className="section-inner-wrapper">
							<Row>
								<Col xs={12} className="text-center text-lg-left">
									<h3 className="section-leader">{subTitle}</h3>
									<h2 className="section-heading">{title}</h2>
								</Col>
							</Row>
							<React.Fragment>
								<Row className="d-flex justify-content-center">
									{!isLoading ? (
										pages.map((page, i) => {
											let { id, title, excerpt, url } = page;
											title = title.replace(/GST LLP -/i, '');
											let description = excerpt.split(title);
											if (description.length > 1) {
												description = description[1].toString();
											} else {
												description = excerpt;
											}
											return (
												<Col key={id} xs={12} md={9} lg={lgCols} className="align-horizontal my-4">
													<div className="page-content card border-1 shadow h-100">
														<Row className="align-items-stretch px-0 mx-0">
															<Col xs={12} md={12} lg={12} className="card-body align-self-center p-4">
																<h3 className="card-title page-title mb-auto">
																	<a href={url} className="page-url text-dark">
																		{this.parseData(title, 50)}
																	</a>
																</h3>
																<div className="card-text page-excerpt text-dark mb-auto py-4">
																	{this.parseData(description, 160)}
																</div>
																<div className="page-url mt-3">
																	<a href={url} className="page-url">
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
					<React.Fragment></React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

export default GstPagesPreview;
