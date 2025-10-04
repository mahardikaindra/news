import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../utils/Api';
import { API_KEY } from '@env';
import styles from './styles';

type RootStackParamList = {
  CategoryNews: { category: string };
};

type CategoryNewsRouteProp = RouteProp<RootStackParamList, 'CategoryNews'>;

interface Article {
  title: string;
  source: {
    name: string;
  };
  description: string | null;
  urlToImage: string | null;
  url: string;
  author: string | null;
  publishedAt: string;
  content: string | null;
}

const CategoryNewsPage = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<CategoryNewsRouteProp>();
  const { category } = route.params;

  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await Api.get(
          `/top-headlines?category=${category}&language=en&apiKey=${API_KEY}`,
        );
        if (response.data.status === 'ok') {
          setNews(response.data.articles);
        } else {
          setError(response.data.message || 'Failed to fetch news');
        }
      } catch (err) {
        setError('An error occurred while fetching news.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderNewsItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NewsDetail', {
          title: item.title,
          description: item.description,
          urlToImage: item.urlToImage,
          url: item.url,
          sourceName: item.source.name,
          author: item.author,
          publishedAt: item.publishedAt,
          content: item.content,
        })
      }
    >
      <View style={styles.newsItem}>
        {item.urlToImage && (
          <Image
            source={{ uri: item.urlToImage }}
            style={styles.articleImage}
          />
        )}
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsSource}>Source: {item.source.name}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryNewsPage;
