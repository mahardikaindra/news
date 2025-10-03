import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  notificationItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  notificationBody: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 8,
  },
  notificationDate: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'right',
  },
  clearButton: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 20,
    fontSize: 16,
  },
});

interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
}

const NOTIFICATIONS_KEY = '@notifications';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadNotifications();
    // In a real app, you would set up a listener for new push notifications here
    // For demonstration, let's simulate receiving a notification
    const simulateNotification = setTimeout(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'Breaking News!',
        body: 'New article published about AI advancements.',
        date: new Date().toLocaleString(),
      };
      saveNotification(newNotification);
    }, 5000); // Simulate after 5 seconds

    return () => clearTimeout(simulateNotification);
  }, []);

  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error('Failed to load notifications', error);
      Alert.alert('Error', 'Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const saveNotification = async (newNotification: Notification) => {
    try {
      setNotifications(prevNotifications => {
        const updatedNotifications = [newNotification, ...prevNotifications];
        AsyncStorage.setItem(
          NOTIFICATIONS_KEY,
          JSON.stringify(updatedNotifications),
        );
        return updatedNotifications;
      });
    } catch (error) {
      console.error('Failed to save notification', error);
      Alert.alert('Error', 'Failed to save new notification.');
    }
  };

  const clearNotifications = async () => {
    try {
      await AsyncStorage.removeItem(NOTIFICATIONS_KEY);
      setNotifications([]);
    } catch (error) {
      console.error('Failed to clear notifications', error);
      Alert.alert('Error', 'Failed to clear notifications.');
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationBody}>{item.body}</Text>
      <Text style={styles.notificationDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications available.</Text>
      ) : (
        <>
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearNotifications}
          >
            <Text style={styles.clearButtonText}>Clear All Notifications</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default NotificationPage;
