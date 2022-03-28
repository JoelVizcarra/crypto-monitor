import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
	const [coinPrice, setCoinPrice] = useState([]);
	const [coinTimestamp, setCoinTimestamp] = useState([]);

	useEffect(() => {
		const newCoinPrice = [];
		const newCoinTimestamp = [];
		for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
			newCoinPrice.push(coinHistory?.data?.history[i].price);
			newCoinTimestamp.push(
				new Date(
					coinHistory?.data?.history[i].timestamp * 1000
				).toLocaleDateString()
			);
		}
		setCoinPrice(newCoinPrice);
		setCoinTimestamp(newCoinTimestamp);
	}, [coinHistory?.data?.history]);

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

	console.log(coinTimestamp);

	return (
		<>
			<Row className="chart-header">
				<Title lecel={2} className="chart-title">
					{coinName} Price Chart
				</Title>
				<Col className="price-container">
					<Title level={5} className="price-change">
						{coinHistory?.data?.change}%
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
