import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import Api from '../../utils/Api';


interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const HomePage = () => {
  const navigation = useNavigation<any>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await Api.get(
        `/top-headlines?country=us&apiKey=${API_KEY}`,
      );
      setArticles(response.data.articles);
    } catch (err) {
      setError('Failed to fetch news articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => {
        navigation.navigate('NewsDetail', {
          title: item.title,
          description: item.description,
          urlToImage: item.urlToImage,
          url: item.url,
          sourceName: item.source.name,
          author: item.author,
          publishedAt: item.publishedAt,
          content: item.content,
        });
      }}
    >
      <>
        {item.urlToImage && (
          <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
        )}
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleSource}>{item.source.name}</Text>
        <Text style={styles.articleAuthor}>Author : {item.author}</Text>
        <Text style={styles.articleDescription}>{item.description}</Text>
      </>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomePage;
