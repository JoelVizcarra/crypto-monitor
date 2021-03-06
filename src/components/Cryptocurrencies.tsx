import { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { CurrencyType, useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

interface CryptocurrenciesProps {
	simplified?: boolean;
}

const Cryptocurrencies = ({ simplified = false }: CryptocurrenciesProps) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const filteresData = cryptosList?.data?.coins.filter(
			(coin: { name: string }) => coin.name.toLowerCase().includes(searchTerm)
		);
		setCryptos(filteresData);
	}, [cryptosList, searchTerm]);

	if (isFetching) return <Loader />;

	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}
			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((currency: CurrencyType) => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className="crypto-card"
						key={currency.uuid}
					>
						<Link to={`/crypto/${currency.uuid}`}>
							<Card
								title={`${currency.rank}.${currency.name}`}
								extra={
									<img
										className="crypto-image"
										src={currency.iconUrl}
										alt="Crypto"
									/>
								}
								hoverable
							>
								<p>Price: {millify(currency.price)}</p>
								<p>Market Cap: {millify(currency.marketCap)}</p>
								<p>Daily Change: {millify(currency.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
