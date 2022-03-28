import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import {
	Navbar,
	Homepage,
	Exchanges,
	CryptoDetails,
	Cryptocurrencies,
	News /* Layout, Footer */,
} from './components';

import './App.css';

function App() {
	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<Layout>
					<div className="routes">
						<Switch>
							<Route path="/" exact>
								<Homepage />
							</Route>
							<Route path="/exchanges" exact>
								<Exchanges />
							</Route>
							<Route path="/cryptocurrencies" exact>
								<Cryptocurrencies />
							</Route>
							<Route path="/crypto/:coinUuid" exact>
								<CryptoDetails />
							</Route>
							<Route path="/news" exact>
								<News />
							</Route>
						</Switch>
					</div>
				</Layout>
				<div className="footer">
					<Typography.Title
						level={5}
						style={{ color: 'white', textAlign: 'center' }}
					>
						Crytoverse <br /> all rights reserved
					</Typography.Title>
					<Space>
						<Link to="/">Home</Link>
						<Link to="/news">News</Link>
						<Link to="/exchanges">Exchanges</Link>
					</Space>
				</div>
			</div>
		</div>
	);
}

export default App;
