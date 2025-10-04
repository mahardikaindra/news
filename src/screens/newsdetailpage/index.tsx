import React from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import styles from './styles';

type RootStackParamList = {
  NewsDetail: {
    title: string;
    description: string | null;
    urlToImage: string | null;
    url: string;
    sourceName: string;
    author: string | null;
    publishedAt: string;
    content: string | null;
  };
};

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

const NewsDetailPage = () => {
  const route = useRoute<NewsDetailRouteProp>();
  const {
    title,
    description,
    urlToImage,
    url,
    sourceName,
    author,
    publishedAt,
    content,
  } = route.params;

  const handlePressLink = () => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      {urlToImage && (
        <Image source={{ uri: urlToImage }} style={styles.articleImage} />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.articleTitle}>{title}</Text>
        {author && <Text style={styles.articleAuthor}>By {author}</Text>}
        <Text style={styles.articleSource}>{sourceName}</Text>
        <Text style={styles.articlePublishedAt}>
          {new Date(publishedAt).toLocaleString()}
        </Text>
        {description && (
          <Text style={styles.articleDescription}>{description}</Text>
        )}
        {content && <Text style={styles.articleContent}>{content}</Text>}
        <TouchableOpacity onPress={handlePressLink}>
          <Text style={styles.fullArticleButtonText}>Read Full Article</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewsDetailPage;
