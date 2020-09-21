import 'styles/core/pages/partials/_wppage-shortcodes-transposive.scss';

import CTAForm from '@components/CTAForm';
import parse, { DomElement, domToReact } from 'html-react-parser';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Mailto from 'react-protected-mailto';
import { Link } from 'react-scroll';
import CardsGenericLayout from '@views/partials/CardsGenericLayout';
import HomeNavbar from '@components/Navbars/HomeNavbar';
import { CountryDetection } from 'src/routes/CountryDetection';
import BlogPreview from '@views/partials/BlogPreview';
import GstPagesPreview from '@views/partials/GstPagesPreview';
import { ReusableSections } from './ReusableSections';

const ReplaceWPShortcodes = (stringToSearch) => {
	let data = stringToSearch.replace(/\[\/?et_pb_sidebar.*?\]/g, '');
	data = data.replace(/\[\/?et_pb_divider.*?\]/g, '');
	data = data.replace(/\[et_pb_section/g, '<div class="et_pb_section"');
	data = data.replace(/\[et_pb_fullwidth_header/g, '<div class="et_pb_fullwidth_header"');
	data = data.replace(/\[et_pb_row/g, '<div class="et_pb_row"');
	data = data.replace(/\[et_pb_column/g, '<div class="et_pb_column"');
	data = data.replace(/\[one_half/g, '<div class="one_half"');
	data = data.replace(/\[one_half_last/g, '<div class="one_half_last"');
	data = data.replace(/\[three_fourth_last/g, '<div class="three_fourth_last"');
	data = data.replace(/\[box/g, '<div class="box"');
	data = data.replace(/\[et_pb_row_inner/g, '<div class="et_pb_row_inner"');
	data = data.replace(/\[et_pb_column_inner/g, '<div class="et_pb_column_inner"');
	data = data.replace(/\[et_pb_slider/g, '<div class="et_pb_slider"');
	data = data.replace(/\[et_pb_slide/g, '<div class="et_pb_slide"');
	data = data.replace(/\[et_pb_blurb/g, '<div class="et_pb_blurb"');
	data = data.replace(/\[et_pb_image/g, '<img class="et_pb_image"');
	data = data.replace(/\[et_pb_text/g, '<div class="et_pb_text"');
	data = data.replace(/\[et_pb_fullwidth_slider/g, '<div class="et_pb_fullwidth_slider"');

	data = data.replace(/\[\/et_pb_fullwidth_slider]/g, '</div>');
	data = data.replace(/\[\/et_pb_sidebar]/g, '</div>');
	data = data.replace(/\[\/et_pb_text]/g, '</div>');
	data = data.replace(/\[\/et_pb_image]/g, '');
	data = data.replace(/\[\/et_pb_blurb]/g, '</div>');
	data = data.replace(/\[\/et_pb_slide]/g, '</div>');
	data = data.replace(/\[\/et_pb_slider]/g, '</div>');
	data = data.replace(/\[\/et_pb_column_inner]/g, '</div>');
	data = data.replace(/\[\/et_pb_row_inner]/g, '</div>');
	data = data.replace(/\[\/box]/g, '</div>');
	data = data.replace(/\[\/one_half]/g, '</div>');
	data = data.replace(/\[\/one_half_last]/g, '</div>');
	data = data.replace(/\[\/three_fourth_last]/g, '</div>');
	data = data.replace(/\[\/et_pb_column]/g, '</div>');
	data = data.replace(/\[\/et_pb_row]/g, '</div>');
	data = data.replace(/\[\/et_pb_fullwidth_header]/g, '</div>');
	data = data.replace(/\[\/et_pb_section]/g, '</div>');

	data = data.replace(/[\]]/g, '>');
	data = data.replace(/&#8221;/g, '"');
	data = data.replace(/&#8243;/g, '"');
	data = data.replace(/&nbsp;/g, '');
	// data = data.replace(/\s\s+/g, ' ');
	// data = data.replace(/(<p[^>]+?>|<p>|<\/p>)/img, '');
	// data = data.replace(/(<br[^>]+?>|<br>|<br \/>)/g, "");

	return data;
};

const ParseWPShortcodes = (content, mainModule, props?: any) => {
	let countryRoute = CountryDetection.myCountry(props);
	const handleSetActive = (to) => {
		//console.log(to);
	};
	let genericCard = [];
	let data = ReplaceWPShortcodes(content);
	// let newSrc = 'https://www.deskera.com/wp-content';
	// data = data.replace(/src=['"](?:[^"'\/]*\/)(wp-content\/)([^'"]+)['"]/g, 'src="' + newSrc + '/$2"');
	let newSrc = `${process.env.REACT_APP_GCMS_BASE_URL}/content/images`;

	// eslint-disable-next-line
	data = data.replace(/image=['"](?:[^"'\/]*\/)(content\/images\/wordpress\/)([^'"]+)['"]/g, 'image="' + newSrc + '/$2"');
	// eslint-disable-next-line
	data = data.replace(/src=['"](?:[^"'\/]*\/)(content\/images\/wordpress\/)([^'"]+)['"]/g, 'src="' + newSrc + '/$2"');
	//Replace GCMS images path by deksera.com
	let imagePath = `${process.env.REACT_APP_WEB_URL}/content/images/`;
	data = data.replace(/(.*)(https:\/\/gcms.deskera.com\/content\/images\/)/g, '$1' + imagePath);
	data = data.replace(/(.*)(https:\/\/gcms-staging.deskera.xyz\/content\/images\/)/g, '$1' + imagePath);

	let secondaryNav = [];
	let featuresSection = [];
	let count = 0;
	const options = {
		replace: ({ attribs, children = [], type, name }: DomElement) => {
			if (!attribs) {
				return;
			}
			if (name === 'main') {
				return <div className="main-content">{domToReact(children, options)}</div>;
			}
			let preDefineClass = 'my-4';
			if (attribs.class) {
				preDefineClass = attribs.class;
			}
			if (
				(name === 'div' && attribs.module_id === 'call-to-action-block') ||
				attribs.module_id === 'clients-listing-block' ||
				attribs.class === 'et_pb_widget_area' ||
				(name === 'div' && attribs.class === 'col-lg-5 animated') ||
				// || (name === 'div' && attribs.class.indexOf('et_pb_column') && attribs.type.indexOf('1_3') && attribs.type !== '1')
				(name === 'img' && attribs.src.indexOf('logo.svg') !== -1) ||
				attribs.class === 'review-section' ||
				// || (attribs.class === 'last-content')
				attribs.class === 'col-md-6 only-mobile' ||
				// || (attribs.class === ' section')
				attribs.class === 'newsletter-inner section-inner' ||
				(name === 'ol' && attribs.class === 'breadcrumb') ||
				(name === 'p' && children.length <= 0)
			) {
				return <></>;
			}

			if (name === 'div' && attribs.module_id === 'sidebar-box') {
				let className = attribs.module_id;
				if (attribs.class) {
					className = attribs.class + ' ' + attribs.module_id;
				}
				return (
					<div className={className} id={attribs.id}>
						{domToReact(children, options)}
					</div>
				);
			}
			if (name === 'div' && attribs.class === 'col-lg-7 animated') {
				return <div className="text-left">{domToReact(children, options)}</div>;
			}
			if (attribs.class === 'subhead') {
				return <h3 className="section-leader my-4">{domToReact(children, options)}</h3>;
			}
			if (name === 'h2' && attribs.class === 'text-white') {
				let preHeading = 'section-heading text-white';
				if (preDefineClass) {
					preHeading = preDefineClass;
				}
				return <h1 className={`${preHeading}`}>{domToReact(children, options)}</h1>;
			}
			if (name === 'div' && attribs.class === 'et_pb_fullwidth_header') {
				return (
					<>
						<h3 className="my-4 text-white section-leader">
							{attribs.title}
							<span className="badge badge-legacy">Legacy</span>{' '}
						</h3>
						<h2 className="mt-5 mb-3 text-white">
							{attribs.subhead}
							<span className="badge badge-legacy">Legacy</span>
						</h2>
					</>
				);
			}
			if (
				name === 'div' &&
				attribs.class === 'tandc'
				// || (name === 'div' && attribs.class.indexOf('et_pb_column') && attribs.type.indexOf('2_3'))
			) {
				return (
					<>
						<Col md={9} sm={12} className="primary-panel pre-secondary-nav">
							{domToReact(children, options)}
						</Col>
						<Col md={3} sm={12} className="secondary-panel secondary-nav sticky-top d-none d-md-block">
							<nav className="pl-2 border-left">
								<ul className="nav nav-pills flex-column">{secondaryNav}</ul>
							</nav>
						</Col>
					</>
				);
			}
			if (name === 'img' && attribs.class !== 'd-none') {
				let imgClass = 'img-fluid';
				if (attribs.class) {
					imgClass = 'img-fluid ' + attribs.class;
				}
				return <img src={attribs.src} alt={attribs.alt} className={imgClass} />;
			}
			if (name === 'h2' || name === 'h4') {
				let textHeadingSlug = domToReact(children, options)
					.toString()
					.toLowerCase()
					.replace(/ /g, '-')
					.replace(/[^\w-]+/g, '');
				if (textHeadingSlug.indexOf('-object-') !== -1) {
					textHeadingSlug = '';
				}
				// let hrefNav = props.location.pathname + '#' + textHeadingSlug;
				secondaryNav.push(
					<li className="nav-item" key={count}>
						<Link activeClass="active" to={`${textHeadingSlug}`} spy={true} smooth={true} offset={-90} onSetActive={handleSetActive}>
							{domToReact(children, options)}
						</Link>
					</li>,
				);
				count = count + 1;
				if (name === 'h2') {
					return (
						<h2 className={`${preDefineClass}`} id={textHeadingSlug}>
							{domToReact(children, options)}
							<span className="badge badge-legacy">Legacy</span>
						</h2>
					);
				} else {
					return (
						<h4 className={`${preDefineClass}`} id={textHeadingSlug}>
							{domToReact(children, options)}
						</h4>
					);
				}
			}
			if (attribs.module_id === 'buy-now') {
				return <div className="buy-now backdrop-alternate shadow-lg rounded mb-0 px-5 pt-1 pb-5">{domToReact(children, options)}</div>;
			}
			if (attribs.class === 'et_pb_button') {
				return <CTAForm />;
			}
			if (attribs.class === 'et_pb_section' || name === 'section' || name === 'header') {
				let heroClasses = 'section hero-section viewport-size backdrop-white has-layer-none';
				if (attribs.class && (attribs.class.indexOf('has-layer-') !== -1 || attribs.class.indexOf('backdrop-') !== -1)) {
					heroClasses = attribs.class;
				}
				if (attribs.class && attribs.class.indexOf('has-logo') === -1) {
					heroClasses = heroClasses + ' has-logo-dark';
				}
				if (attribs.module_class === 'pagehead-block' || (name === 'header' && children.length >= 0)) {
					heroClasses = 'pagehead-block ' + heroClasses;
					return (
						<section className={heroClasses} id="hero">
							<HomeNavbar {...props} />
							<Container className="section-inner-wrapper">{domToReact(children, options)}</Container>
						</section>
					);
				} else if (attribs.module_class === 'extended-width-section') {
					return (
						<section className={heroClasses} id="hero">
							<HomeNavbar {...props} />
							<Container className="section-inner-wrapper">{domToReact(children, options)}</Container>
						</section>
					);
				} else {
					if (name === 'section') {
						featuresSection = [];
						featuresSection.push(domToReact(children, options));
					} else {
						++count;
						featuresSection.push(
							<Container className="section-inner-wrapper" key={count}>
								{domToReact(children, options)}
							</Container>,
						);
					}
					let sectionClasses = 'section ';
					if (attribs.class && (attribs.class.indexOf('has-layer-') !== -1 || attribs.class.indexOf('backdrop-') !== -1)) {
						sectionClasses = sectionClasses + attribs.class + ' viewport-size';
					} else {
						sectionClasses = sectionClasses + attribs.class + ' wp-features viewport-size';
					}
					if (attribs.class && attribs.class.indexOf('has-logo') === -1) {
						sectionClasses = sectionClasses + ' has-logo-dark';
					}
					let id = '';
					if (attribs.id) {
						id = attribs.id;
					}
					return (
						<section className={sectionClasses} id={id}>
							<HomeNavbar {...props} />
							{featuresSection}
						</section>
					);
				}
			}
			if (name === 'section' && attribs.class.indexOf('without-viewport-section') !== -1) {
				let defaultClasses = attribs.class;
				return (
					<section className={defaultClasses}>
						<HomeNavbar {...props} />
						{domToReact(children, options)}
					</section>
				);
			}
			if (name === 'h1') {
				let preHeading = 'section-heading';
				if (preDefineClass) {
					preHeading = preDefineClass;
				}
				return (
					<h1 className={`${preHeading}`}>
						{domToReact(children, options)}
						<sup className="badge badge-dark badge-legacy mt-2">Legacy</sup>
					</h1>
				);
			}
			if (name === 'h2') {
				return <h2 className={`${preDefineClass}`}>{domToReact(children, options)}</h2>;
			}
			if (name === 'h3') {
				return <h3 className={`${preDefineClass}`}>{domToReact(children, options)}</h3>;
			}
			if (name === 'div' && (attribs.class === 'et_pb_row' || attribs.class === 'row' || attribs.class === 'feature-r')) {
				return <Row className="feature-row">{domToReact(children, options)}</Row>;
			}
			if (name === 'div' && attribs.class === 'et_pb_column') {
				return <Col className="feature-column">{domToReact(children, options)}</Col>;
			}
			if (name === 'div' && attribs.class === 'et_pb_row_inner') {
				return <Row className="feature-row_inner">{domToReact(children, options)}</Row>;
			}
			if (name === 'div' && attribs.class === 'et_pb_column_inner') {
				return <Col className="feature-column_inner">{domToReact(children, options)}</Col>;
			}
			if (name === 'div' && attribs.class === 'et_pb_slide') {
				let heading = attribs.heading ? attribs.heading : '';
				return (
					<div className="et_pb_slide">
						<h2>{heading}</h2>
						{domToReact(children, options)}
					</div>
				);
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
				return (
					<a className="link" href={`${countryRoute}${href}`}>
						{domToReact(children, options)}
					</a>
				);
			}
			if (name === 'a' && attribs.href === 'mailto') {
				return <Mailto email={domToReact(children, options)}></Mailto>;
			}

			if (attribs.class === 'small-button et_pb_promo_button' && attribs.href.indexOf('//www') === -1) {
				// let learnMore = "/" + mainModule + "/" + attribs.href;
				let learnMore = attribs.href.replace(/^https?:\/\/gcms.deskera.com/g, '');
				learnMore = attribs.href.replace(/^https?:\/\/gcms-staging.deskera.xyz/g, '');
				return (
					<a href={`${countryRoute}${learnMore}`} className={attribs.class}>
						{' '}
						{domToReact(children, options)}
					</a>
				);
			}
			if (name === 'div' && attribs.class === 'et_pb_blurb' && children.length > 0) {
				let blurbLabel = attribs.admin_label ? attribs.admin_label : '';
				let blurbImg = attribs.image ? attribs.image : '';
				// let blurbAlt = attribs.alt ? attribs.alt : '';
				genericCard = [];
				genericCard.push({
					image: blurbImg,
					heading: blurbLabel,
					description: domToReact(children, options),
				});

				return (
					<React.Fragment>
						<CardsGenericLayout CreateCards={genericCard} />
					</React.Fragment>
				);
			}

			if (name === 'div' && attribs.class === 'cta-form') {
				return (
					<div className="section-cta col-12 col-md-10 p-0">
						<CTAForm />
					</div>
				);
			}
			// If blog preview section in GCMS page
			if (name === 'span' && attribs.id && (attribs.id === 'blog-preview' || attribs.id === 'gstin-preview')) {
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
				if (attribs.id === 'gstin-preview') {
					return <GstPagesPreview {...props} {...blogData} />;
				} else {
					return <BlogPreview {...props} {...blogData} />;
				}
			}
			//Landing Page Section
			if (name === 'span' && attribs.class && attribs.class === 'resuable-section' && attribs.id) {
				return <React.Fragment>{ReusableSections.getReusableSection({ ...props }, attribs.id)}</React.Fragment>;
			}
		},
	};
	content = parse(data, options);

	return <React.Fragment>{content}</React.Fragment>;
};

export default ParseWPShortcodes;
