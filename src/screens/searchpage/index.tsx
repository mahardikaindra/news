import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from '@env';
import Api from '../../utils/Api';
import styles from './styles';

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

const SearchPage = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { label: 'Business', value: 'business' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'General', value: 'general' },
    { label: 'Health', value: 'health' },
    { label: 'Science', value: 'science' },
    { label: 'Sports', value: 'sports' },
    { label: 'Technology', value: 'technology' },
  ];

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await Api.get(
        `/top-headlines?q=${searchQuery}&category=${selectedCategory}&apiKey=${API_KEY}`,
      );
      console.log(response.data.articles);
      setArticles(response.data.articles);
    } catch (err) {
      setError('Failed to fetch news articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (searchQuery.length > 2 && selectedCategory) {
      handleSearch();
    } else if (searchQuery.length === 0 && articles.length > 0) {
      setArticles([]);
    }
  }, [articles.length, handleSearch, searchQuery, selectedCategory]);

  const renderArticleItem = ({ item }: { item: Article }) => (
    <TouchableOpacity style={styles.articleCard} onPress={() => navigation.navigate('NewsDetail', {
      title: item.title,
      description: item.description,
      urlToImage: item.urlToImage,
      url: item.url,
      sourceName: item.source.name,
      author: item.author,
      publishedAt: item.publishedAt,
      content: item.content,
    }
    )}>
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
      ) : null}
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleSource}>Source: {item.source.name}</Text>
      {item.description ? (
        <Text style={styles.articleDescription}>{item.description}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for news..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={itemValue => setSelectedCategory(itemValue)}
        >
          {categories.map(category => (
            <Picker.Item
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Picker>
      </View>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={50} color="red" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          renderItem={renderArticleItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Ionicons name="search-circle-outline" size={100} color="#333" />
              <Text style={styles.articleDescription}>No articles found. Try a different search.</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default SearchPage;
