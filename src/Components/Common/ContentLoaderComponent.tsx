import React from 'react';
import ContentLoader from 'react-content-loader';

class ContentLoaderComponent extends React.Component {
	render() {
		return (
			<ContentLoader
				className="text-center"
				speed={2}
				width="100%"
				height="auto"
				viewBox="0 0 500 250"
				backgroundColor="#fbf7ee"
				foregroundColor="#fff0d1"
			>
				<rect x="20" y="10" rx="0" ry="0" width="250" height="155" />
				<rect x="280" y="10" rx="0" ry="0" width="170" height="80" />
				<rect x="280" y="95" rx="0" ry="0" width="170" height="30" />
				<rect x="280" y="130" rx="0" ry="0" width="80" height="5" />
				<rect x="370" y="130" rx="0" ry="0" width="80" height="5" />
				<rect x="280" y="140" rx="0" ry="0" width="170" height="5" />
				<rect x="280" y="150" rx="0" ry="0" width="80" height="5" />
				<rect x="370" y="150" rx="0" ry="0" width="80" height="5" />
				<rect x="280" y="160" rx="0" ry="0" width="170" height="5" />
				<rect x="20" y="175" rx="0" ry="0" width="430" height="70" />
			</ContentLoader>
		);
	}
}

export default ContentLoaderComponent;
