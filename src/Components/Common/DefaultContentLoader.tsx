import dynamic from 'next/dynamic';
const DefaultContentLoader = dynamic(() => import('./ContentLoaderComponent'), { ssr: false });
export default DefaultContentLoader;
