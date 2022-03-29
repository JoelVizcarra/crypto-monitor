import { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { NewsType, useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
	'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

interface NewsProps {
	simplified?: boolean;
}

const News = ({ simplified = false }: NewsProps) => {
	const [category, setCategory] = useState('Crytocurrency');
	const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
		category,
		count: simplified ? 6 : 12,
	});
	const { data } = useGetCryptosQuery(100);

	if (isFetching) return <Loader />;

	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select a Crypto"
						optionFilterProp="children"
						onChange={(value) => setCategory(value)}
						filterOption={(input: string, option: any) =>
							!option?.children
								?.toLowerCase()
								?.indexOf(input.toLocaleLowerCase())
						}
					>
						<Option value="Cryptocurrency">Cryptocurrency</Option>
						{data?.data?.coins.map((coin: { name: string }) => (
							<Option value={coin.name}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			)}
			{cryptoNews?.value.map((news: NewsType, i: number) => (
				<Col xs={24} sm={12} lg={8} key={i}>
					<Card className="news-card" hoverable>
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<Title className="news-title" level={4}>
									{news.name}
								</Title>
								<img
									className="img"
									src={news?.image?.thumbnail?.contentUrl || demoImage}
									alt="news"
								/>
							</div>
							<p>
								{news.description.length > 100
									? `${news.description.substring(0, 100)}`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail?.contentUrl ||
											demoImage
										}
										alt="news"
									/>
									<Text className="provider-name">
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>{moment(news.datePublished).startOf('s').fromNow()}</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
