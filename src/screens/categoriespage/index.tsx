import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  CategoryNews: { category: string };
};

type CategoriesPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategoryNews'
>;

const categories = [
  { id: '1', name: 'Business', category: 'business' },
  { id: '2', name: 'Entertainment', category: 'entertainment' },
  { id: '3', name: 'General', category: 'general' },
  { id: '4', name: 'Health', category: 'health' },
  { id: '5', name: 'Science', category: 'science' },
  { id: '6', name: 'Sports', category: 'sports' },
  { id: '7', name: 'Technology', category: 'technology' },
];

const CategoriesPage = () => {
  const navigation = useNavigation<CategoriesPageNavigationProp>();

  const handleCategoryPress = (category: string) => {
    navigation.navigate('CategoryNews', { category });
  };

  const renderCategoryItem = ({
    item,
  }: {
    item: { id: string; name: string; category: string };
  }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.category)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  categoryItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    fontSize: 18,
    color: '#333333',
  },
});

export default CategoriesPage;
