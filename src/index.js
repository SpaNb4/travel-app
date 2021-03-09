import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import './i18n';
import store from './store/store';
import './index.scss';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ScrollToTop />
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
