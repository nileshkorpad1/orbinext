import loadable from '@loadable/component';
import React, { ReactElement } from 'react';
import { PrerenderedComponent } from 'react-prerendered-component';

export const prerenderedLoadable = (dynamicImport: any) => {
	const LoadableComponent = loadable(dynamicImport);
	return React.memo((props) => (
		// you can use the `.preload()` method from react-loadable or react-imported-component`
		<PrerenderedComponent live={LoadableComponent.load()}>
			<LoadableComponent {...props} />
		</PrerenderedComponent>
	));
};

const prefetchMap = new WeakMap();
const prefetchLazy = (LazyComponent: any) => {
	if (!prefetchMap.has(LazyComponent)) {
		prefetchMap.set(LazyComponent, LazyComponent._ctor());
	}
	return prefetchMap.get(LazyComponent);
};

export const prerenderedLazy = (dynamicImport: any) => {
	const LazyComponent = React.lazy(dynamicImport);
	return React.memo((props) => (
		<PrerenderedComponent live={prefetchLazy(LazyComponent)}>
			<LazyComponent {...props} />
		</PrerenderedComponent>
	));
};
