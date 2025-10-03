import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  articleImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  articleAuthor: {
    fontSize: 16,
    color: '#888888',
    fontWeight: '700',
    marginBottom: 8,
  },
  articleSource: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 8,
  },
  articleContent: {
    fontSize: 18,
    color: '#555555',
    lineHeight: 24,
  },
  articlePublishedAt: {
    fontSize: 14,
    color: '#999999',
    marginTop: 12,
    marginBottom: 20,
  },
  articleDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  readMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  fullArticleButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default styles;