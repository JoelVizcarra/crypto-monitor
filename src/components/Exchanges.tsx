import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { ExchangeType, useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
	const { data, error, isLoading } = useGetExchangesQuery({});
	const exchangesList = data?.data?.exchanges;
	if (isLoading) return <Loader />;
	if (error) return <p>Error</p>;

	return (
		<>
			<Row>
				<Col span={6}>Exchanges</Col>
				<Col span={6}>24h Trade Volume</Col>
				<Col span={6}>Markets</Col>
				<Col span={6}>Change</Col>
			</Row>
			<Row>
				{exchangesList.map((exchange: ExchangeType) => (
					<Col span={24}>
						<Collapse>
							<Panel
								key={exchange.uuid}
								showArrow={false}
								header={
									<Row key={exchange.uuid}>
										<Col span={6}>
											<Text>
												<strong>{exchange.rank}.</strong>
											</Text>
											<Avatar
												className="exchange-image"
												src={exchange.iconUrl}
											/>
											<Text>
												<strong>{exchange.name}</strong>
											</Text>
										</Col>
										<Col span={6}>${millify(exchange.volume)}</Col>
										<Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
										<Col span={6}>{millify(exchange.marketShare)}%</Col>
									</Row>
								}
							>
								{HTMLReactParser(exchange.description || '')}
							</Panel>
						</Collapse>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Exchanges;
