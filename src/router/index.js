import loadable from '@loadable/component'
import App from '../components/App.jsx';
import Loading from '../components/Loading.jsx';

import {getMapList} from '../store/mapList/actions.js'

const	Map = loadable(
	() => import('../pages/Map.jsx'),
	{ fallback: Loading }
);

export default [{
	path: '/',
	component: App,
	routes: [{
		path: '/',
    component: Map,
    loadData: store => store.dispatch(getMapList()),
    exact: true,
    key: 'index'
	}]
}]