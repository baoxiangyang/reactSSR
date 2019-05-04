import loadable from '@loadable/component'
import App from '../components/App.jsx';
import Loading from '../components/Loading.jsx';

import {getMapList} from '../store/mapList/actions.js'

const Index = loadable(
	() => import('../pages/Index.jsx'),
	{ fallback: Loading }
);
const	Map = loadable(
	() => import('../pages/Map.jsx'),
	{ fallback: Loading }
);

export default [{
	path: '/',
	component: App,
	routes: [{
		path: '/',
    component: Index,
    exact: true,
    key: 'index'
	},{
		path: '/map',
    component: Map,
    loadData: store => store.dispatch(getMapList()),
    exact: true,
    key: 'map'
	}]
}]