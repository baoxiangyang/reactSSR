import loadable from '@loadable/component'
import App from '../components/App.jsx';
import Loading from '../components/Loading.jsx';

const Index = loadable(
	() => import('../pages/index.jsx'),
	{ fallback: Loading }
);

export default [{
	path: '/',
	component: App,
	routes: [{
		path: '/',
    component: Index,
    exact: true,
    key: 'Index'
	}]
}]