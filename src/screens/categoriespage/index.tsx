import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type RootStackParamList = {
  CategoryNews: { category: string };
};

type CategoriesPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategoryNews'
>;

const categories: {
  id: string;
  name: string;
  category: string;
  icons:
    | 'football-outline'
    | 'laptop-outline'
    | 'heart-outline'
    | 'school-outline'
    | 'film-outline'
    | 'briefcase-outline'
    | 'newspaper-outline';
}[] = [
  {
    id: '1',
    name: 'Business',
    category: 'business',
    icons: 'briefcase-outline',
  },
  {
    id: '2',
    name: 'Entertainment',
    category: 'entertainment',
    icons: 'film-outline',
  },
  { id: '3', name: 'General', category: 'general', icons: 'newspaper-outline' },
  { id: '4', name: 'Health', category: 'health', icons: 'heart-outline' },
  { id: '5', name: 'Science', category: 'science', icons: 'school-outline' },
  { id: '6', name: 'Sports', category: 'sports', icons: 'football-outline' },
  {
    id: '7',
    name: 'Technology',
    category: 'technology',
    icons: 'laptop-outline',
  },
];

const CategoriesPage = () => {
  const navigation = useNavigation<CategoriesPageNavigationProp>();

  const handleCategoryPress = (category: string) => {
    navigation.navigate('CategoryNews', { category });
  };

  const renderCategoryItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      category: string;
      icons:
        | 'football-outline'
        | 'laptop-outline'
        | 'heart-outline'
        | 'school-outline'
        | 'film-outline'
        | 'briefcase-outline'
        | 'newspaper-outline';
    };
  }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.category)}
    >
      <Ionicons name={item.icons} size={30} color="#007bff" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesPage;
