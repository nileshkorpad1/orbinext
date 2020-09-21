import React from 'react';
// import { Parallax } from 'react-scroll-parallax';

const AnnotationText = (props) => {
	return (
		<div className="parallax-annotation">
			<p className="annotation annotation-primary corner-bl shadow">{props.children}</p>
		</div>
	);
};

const ParallaxBanner = (props) => {
	const annotationImg = () => {
		if (props.annotationImg !== undefined) {
			return (
				<div className="parallax-annotation">
					<img
						alt="Feature Annotation"
						src={`/static/images/${props.annotationImg}`}
						className="annotation img-annotation shadow-lg"
					/>
				</div>
			);
		} else {
			return <React.Fragment></React.Fragment>;
		}
	};
	const TakeoutTwoImage = () => {
		if (props.takeoutTwoImg !== undefined) {
			return (
				<div className="parallax-outer parallax-takeout takeout-two">
					<img alt="Feature Annotation" src={`/static/images/${props.takeoutTwoImg}`} className="takeout takeout-two shadow-lg" />
				</div>
			);
		} else {
			return <React.Fragment></React.Fragment>;
		}
	};

	const takeoutImg = () => {
		if (props.takeoutImg !== null) {
			return (
				<div className="parallax-outer parallax-takeout takeout-one">
					<img alt="Detailed Takeout" src={`/static/images/${props.takeoutImg}`} className="takeout takeout-one shadow-lg" />
				</div>
			);
		} else {
			return <React.Fragment></React.Fragment>;
		}
	};
	return (
		<React.Fragment>
			<div className="parallax-outer parallax-banner d-none d-md-block">
				<div className="parallax-inner">
					<img src={`/static/images/${props.mainImg}`} alt="" className="img-responsive main-screenshot shadow-lg" />
					{takeoutImg()}
					{TakeoutTwoImage()}
					{annotationImg()}
					{props.children}
				</div>
			</div>
			<div className="parallax-banner-mobile d-block d-md-none">
				<img src={`/static/images/${props.mainImg}`} alt="" className="img-responsive main-screenshot shadow-lg" />
			</div>
		</React.Fragment>
	);
};
export { ParallaxBanner, AnnotationText };
