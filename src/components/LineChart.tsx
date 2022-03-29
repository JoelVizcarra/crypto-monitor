import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
	},
};

type HistoryType = {
	price: string;
	timestamp: number;
};

type CoinHistoryType = {
	change: string;
	history: Array<HistoryType>;
};

interface LineChartProps {
	coinHistory: CoinHistoryType;
	currentPrice: string;
	coinName: string;
}

const LineChart = ({ coinHistory, currentPrice, coinName }: LineChartProps) => {
	const [coinPrice, setCoinPrice] = useState<any>([]);
	const [coinTimestamp, setCoinTimestamp] = useState<any>(['']);

	useEffect(() => {
		const newCoinPrice = [];
		const newCoinTimestamp = [];
		for (let i = 0; i < coinHistory.history.length; i += 1) {
			newCoinPrice.push(coinHistory.history[i].price);
			newCoinTimestamp.push(
				new Date(coinHistory.history[i].timestamp * 1000).toLocaleDateString()
			);
		}
		setCoinPrice(newCoinPrice);
		setCoinTimestamp(newCoinTimestamp);
	}, [coinHistory.history]);

	const data = useMemo(
		() => ({
			labels: coinTimestamp,
			datasets: [
				{
					label: 'Price In USD',
					data: coinPrice,
					fill: false,
					backgroundColor: '#0071bd',
					borderColor: '#0071bd',
				},
			],
		}),
		[coinTimestamp, coinPrice]
	);

	return (
		<>
			<Row className="chart-header">
				<Title level={2} className="chart-title">
					{coinName} Price Chart
				</Title>
				<Col className="price-container">
					<Title level={5} className="price-change">
						{coinHistory.change}%
					</Title>
					<Title level={5} className="current-price">
						Current{coinName} Price: $ {currentPrice}%
					</Title>
				</Col>
			</Row>
			<Line data={data} options={options}></Line>
		</>
	);
};

export default LineChart;
