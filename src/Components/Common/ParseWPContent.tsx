import CTAForm from '@components/CTAForm';
import parse, { DomElement, domToReact } from 'html-react-parser';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Mailto from 'react-protected-mailto';
import HomeNavbar from '@components/Navbars/HomeNavbar';
import { CountryDetection } from 'src/routes/CountryDetection';
import BlogPreview from '@views/partials/BlogPreview';
import IndustriesPreview from '@views/partials/IndustriesPreview';
import { ReusableSections } from './ReusableSections';

const ParseWPContent = (content, props?: any) => {
	let countryRoute = CountryDetection.myCountry(props);
	//let newSrc = 'https://www.deskera.com/wp-content';
	let newSrc = 'http://site.deskera.com/wp-content';
	// eslint-disable-next-line
	var data = content.replace(/src=['"](?:[^"'\/]*\/)(wp-content\/)([^'"]+)['"]/g, 'src="' + newSrc + '/$2"');
	data = data.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '');
	//Replace GCMS images path by deksera.com
	let imagePath = `${process.env.REACT_APP_WEB_URL}/content/images/`;
	data = data.replace(/(.*)(https:\/\/gcms.deskera.com\/content\/images\/)/g, '$1' + imagePath);
	data = data.replace(/(.*)(https:\/\/gcms-staging.deskera.xyz\/content\/images\/)/g, '$1' + imagePath);
	const options = {
		replace: ({ attribs, children = [], type, name }: DomElement) => {
			if (!attribs) {
				return;
			}
			if (name === 'main') {
				return <div className="main-content">{domToReact(children, options)}</div>;
			}
			if (name === 'p' && children.length <= 0) {
				return <></>;
			}
			// check section ID
			let sectionId;
			if (attribs.id) {
				sectionId = attribs.id;
			}
			if (name === 'section' && (attribs.class.indexOf('erp-content') !== -1 || attribs.class.indexOf('gcms-content') !== -1)) {
				let sectionClasses = 'section ';
				if (attribs.class && (attribs.class.indexOf('has-layer-') !== -1 || attribs.class.indexOf('backdrop-') !== -1)) {
					sectionClasses = sectionClasses + attribs.class;
				} else {
					sectionClasses = sectionClasses + attribs.class + ' wp-features';
				}
				if (attribs.class.indexOf('has-logo') === -1) {
					sectionClasses = sectionClasses + ' has-logo-dark';
				}
				if (attribs.class.indexOf('section-cta-type-three') === -1 || attribs.class.indexOf('section-cta-type-one-webtolead') === -1) {
					sectionClasses = sectionClasses + ' viewport-size';
				}
				return (
					<section className={sectionClasses} id={sectionId}>
						<HomeNavbar {...props} />
						{domToReact(children, options)}
					</section>
				);
			}
			if (name === 'section' && attribs.class.indexOf('content-section') !== -1) {
				let contentClasses = attribs.class + 'section wp-pages content-section viewport-size';
				if (attribs.class.indexOf('has-logo') === -1) {
					contentClasses = contentClasses + ' has-logo-dark';
				}
				return (
					<section className={contentClasses} id={sectionId}>
						<HomeNavbar {...props} />
						{domToReact(children, options)}
					</section>
				);
			}
			if (name === 'section' && attribs.class.indexOf('without-viewport-section') !== -1) {
				let defaultClasses = attribs.class;
				return (
					<section className={defaultClasses} id={sectionId}>
						<HomeNavbar {...props} />
						{domToReact(children, options)}
					</section>
				);
			}
			if (name === 'header' && children.length >= 0) {
				let heroClasses = 'section hero-section viewport-size backdrop-white has-layer-none has-logo-red';
				if (attribs.class && (attribs.class.indexOf('has-layer-') !== -1 || attribs.class.indexOf('backdrop-') !== -1)) {
					heroClasses = attribs.class;
				}
				if (heroClasses && heroClasses.indexOf('has-logo') === -1) {
					heroClasses = heroClasses + ' has-logo-red';
				}
				if (typeof children[1].attribs !== 'undefined' && children[1].attribs.class.indexOf('container') !== -1) {
					return (
						<section className={heroClasses} id="hero">
							<HomeNavbar {...props} />
							<Container className="section-inner-wrapper">{domToReact(children[1].children, options)}</Container>
						</section>
					);
				} else {
					return (
						<section className={heroClasses} id="hero">
							<HomeNavbar {...props} />
							{domToReact(children, options)}
						</section>
					);
				}
			}
			if (name === 'h1' && attribs.class && attribs.class.indexOf('Bold') !== -1) {
				return <h1 className="section-heading">{domToReact(children, options)}</h1>;
			}
			if (name === 'div' && attribs.class && attribs.class.indexOf('feature-r') !== -1) {
				let rowClasses = attribs.class + ' feature-row';
				return <Row className={rowClasses}>{domToReact(children, options)}</Row>;
			}
			if (
				name === 'a' &&
				attribs.href &&
				attribs.class &&
				attribs.class.indexOf('skip-href') === -1 &&
				(attribs.href.indexOf('https://www.deskera.in') !== -1 ||
					attribs.href.indexOf('https://www.deskera.com') !== -1 ||
					attribs.href.indexOf('http://site.deskera.com') !== -1 ||
					attribs.href.indexOf('//site.deskera.com') !== -1 ||
					attribs.href.indexOf('http://gcms.deskera.com') !== -1 ||
					attribs.href.indexOf('//gcms.deskera.com') !== -1 ||
					attribs.href.indexOf('//gcms-staging.deskera.xyz') !== -1)
			) {
				let href = attribs.href.replace(/^https?:\/\/www.deskera.in/g, '');
				href = href.replace(/^https?:\/\/www.deskera.com/g, '');
				href = href.replace(/^http?:\/\/site.deskera.com/g, '');
				href = href.replace(/\/\/site.deskera.com/g, '');
				href = href.replace(/^https?:\/\/gcms.deskera.com/g, '');
				href = href.replace(/^http?:\/\/gcms.deskera.com/g, '');
				href = href.replace(/\/\/gcms.deskera.com/g, '');
				href = href.replace(/^https?:\/\/gcms-staging.deskera.xyz/g, '');
				href = href.replace(/^http?:\/\/gcms-staging.deskera.xyz/g, '');
				let className = 'link';
				if (attribs.class) {
					className = className + ' ' + attribs.class;
				}
				return (
					<a className={className} href={`${countryRoute}${href}`}>
						{domToReact(children, options)}
					</a>
				);
			}
			if (attribs.class && attribs.class.indexOf('btn-learn-more') !== -1) {
				let learnMore = attribs.href.replace(/^https?:\/\/gcms.deskera.com/g, '');
				learnMore = attribs.href.replace(/^https?:\/\/gcms-staging.deskera.xyz/g, '');
				return (
					<a href={`${countryRoute}${learnMore}`} className={attribs.class}>
						{' '}
						{domToReact(children, options)}
					</a>
				);
			}
			if (name === 'a' && attribs.href === 'mailto') {
				return <Mailto email={domToReact(children, options)}></Mailto>;
			}
			if (name === 'br' && children.length <= 0) {
				return React.createElement(React.Fragment);
			}
			// if (name === 'p' && children.length <= 0) {
			// 	return React.createElement(React.Fragment);
			// }
			if (name === 'div' && attribs.class === 'cta-form') {
				return (
					<div className="section-cta col-12 col-md-10 p-0">
						<CTAForm />
					</div>
				);
			}
			// If blog preview section in GCMS page
			if (name === 'span' && attribs.id && (attribs.id === 'blog-preview' || attribs.id === 'industries-preview')) {
				let title,
					subTitle,
					sectionClass,
					filter = '',
					align,
					cols;
				if (attribs.title) {
					title = attribs.title;
				}
				if (attribs.subtitle) {
					subTitle = attribs.subtitle;
				}
				if (attribs.class) {
					sectionClass = attribs.class;
				}
				if (attribs.tags) {
					let multiTags;
					multiTags = attribs.tags.split(',');
					if (multiTags.length > 1) {
						multiTags = multiTags.filter((item) => item);
						multiTags.forEach((tag, i) => {
							filter = filter + '&filter=tag:' + tag;
						});
					} else {
						filter = '&filter=tag:' + multiTags;
					}
				}
				if (attribs.featured) {
					filter = filter + '&filter=featured:' + attribs.featured;
				}
				if (attribs.count) {
					filter = filter + '&limit=' + attribs.count;
				}
				if (attribs.order) {
					filter = filter + '&order=published_at ' + attribs.order;
				}
				if (attribs.author && attribs.author.toLowerCase() === 'y') {
					filter = filter + '&include=authors';
				}
				if (attribs.align) {
					align = attribs.align;
				}
				if (attribs.cols) {
					cols = attribs.cols;
				}
				let blogData = {
					title: title,
					subTitle: subTitle,
					sectionClass: sectionClass,
					filter: filter,
					align: align,
					cols: cols,
				};
				if (attribs.id === 'blog-preview') {
					return <BlogPreview {...props} {...blogData} />;
				} else {
					return <IndustriesPreview {...props} {...blogData} />;
				}
			}
			//Landing Page Section
			if (name === 'span' && attribs.class && attribs.class === 'resuable-section' && attribs.id) {
				return <React.Fragment>{ReusableSections.getReusableSection({ ...props }, attribs.id)};</React.Fragment>;
			}
		},
	};
	content = parse(data, options);
	return content;
};
export default ParseWPContent;
