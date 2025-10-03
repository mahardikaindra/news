import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

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
    const simulateNotification = setTimeout(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'Breaking News!',
        body: 'New article published about AI advancements.',
        date: new Date().toLocaleString(),
      };
      saveNotification(newNotification);
    }, 5000);

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
