import axios from 'axios';
import HomeNavbar from '@components/Navbars/HomeNavbar';
import parse from 'html-react-parser';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let title, subTitle, sectionClass, filter, align, cols;
class BlogPreview extends React.Component {
	state = {
		posts: [],
		baseUrl: 'https://www.deskera.com/blog/ghost/api/v3/content/posts/?key=158bb5b329db27cdea27491355',
		errors: null,
		isLoading: true,
		placeholder: 'https://place-hold.it/300',
		title: 'From our blog',
		subTitle: 'Further Reading',
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
		await axios
			// This is where the data is hosted
			.get(this.state.baseUrl + filter)
			// Once we get a response and store data, let's change the loading state
			.then((response) => {
				this.setState({
					posts: response.data['posts'],
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
		const { isLoading, posts } = this.state;
		let lgCols = Math.ceil(12 / cols);
		let imgCols = 5;
		let contentCols = 7;
		if (align === 'v') {
			imgCols = 12;
			contentCols = 12;
		}
		return (
			<>
				{posts.length > 0 ? (
					<section className={`section blog-preview-section ${sectionClass}`} id="blog-preview">
						<HomeNavbar {...this.props} />
						<div className="divider"></div>
						<Container className="section-inner-wrapper">
							<Row>
								<Col xs={12} className="text-center text-lg-left">
									<h3 className="section-leader">{subTitle}</h3>
									<h2 className="section-heading">{title}</h2>
									{/* <div className="section-secondary-text my-4">
									Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod <br /> tempor invidunt ut labore
									et dolore magna aliquyam erat, <br /> sed diam voluptua. At
								</div> */}
								</Col>
							</Row>
							<React.Fragment>
								<Row className="d-flex justify-content-center">
									{!isLoading ? (
										posts.map((post, i) => {
											const { id, title, excerpt, feature_image, url } = post;
											return (
												<Col
													key={id}
													xs={12}
													md={9}
													lg={lgCols}
													className={`${imgCols !== 12 ? 'align-horizontal' : 'align-vertical'} my-4`}
												>
													<div className="post-content card border-0 shadow-lg h-100">
														<Row className="align-items-stretch h-100 px-0 mx-0">
															<Col
																xs={12}
																md={12}
																lg={imgCols}
																className={`align-self-stretch ${
																	imgCols !== 12 ? 'pr-lg-0' : 'img-container'
																} px-0 mx-0`}
															>
																<a href={url} className="blog-link">
																	<img src={feature_image} alt="" className="img-responsive featured-image" />
																</a>
															</Col>

															<Col
																xs={12}
																md={12}
																lg={contentCols}
																className={`align-self-center ${contentCols !== 12 ? 'py-4 px-4' : 'p-5'}`}
															>
																<div className="read-time my-2">4 min read</div>
																<h3 className="blog-post-title mt-2 mb-0">
																	<a href={url} className="blog-link">
																		{this.parseData(title, 50)}
																	</a>
																</h3>
																<div className="blog-excerpt text-dark mt-0 mb-2">{this.parseData(excerpt, 160)}</div>
																<div className="blog-url my-2">
																	<a href={url} className="blog-link">
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
					<></>
				)}
			</>
		);
	}
}

export default BlogPreview;
