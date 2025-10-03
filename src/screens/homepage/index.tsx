import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { API_KEY } from '@env';
import Api from '../../utils/Api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
  articleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  articleSource: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 16,
    color: '#555555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

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
    <TouchableOpacity style={styles.articleCard}>
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
      )}
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleSource}>{item.source.name}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
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
      <Text style={styles.header}>Top Headlines</Text>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default HomePage;
