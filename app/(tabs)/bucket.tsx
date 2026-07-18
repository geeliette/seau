import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { styles } from '../../styles/bucket.styles';
import { BucketItem, Category } from '../../types/index';

export default function BucketScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<BucketItem[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      supabase.from('categories').select('*').then(({ data }) => {
        setCategories(data ?? []);
      });
      supabase.from('bucket_items').select('*').then(({ data }) => {
        setItems(data ?? []);
      });
    }, [])
  );

  const pinnedItems = items.filter(item => item.pinned);
  const itemsByCategory = (categoryId: string) =>
    items.filter(item => item.category_id === categoryId && !item.pinned);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>bucket.</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>⊞</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/bucket/edit')}>
            <Text style={styles.iconText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pinned */}
      {pinnedItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Pinned</Text>
          <View style={styles.bubbleRow}>
            {pinnedItems.map(item => {
              const category = categories.find(c => c.id === item.category_id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.bubble, { backgroundColor: category?.color ?? '#EAE8E1' }]}
                  onPress={() => router.push(`/bucket/${item.id}`)}
                >
                  <Text style={[styles.bubbleText, { color: category?.text_color ?? '#5F5E5A' }]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Categories */}
      {categories.map(category => {
        const categoryItems = itemsByCategory(category.id);
        if (categoryItems.length === 0) return null;
        return (
          <View key={category.id} style={styles.section}>
            <Text style={styles.sectionLabel}>{category.name}</Text>
            <View style={styles.bubbleRow}>
              {categoryItems.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.bubble, { backgroundColor: category.color }]}
                  onPress={() => router.push(`/bucket/${item.id}`)}
                >
                  <Text style={[styles.bubbleText, { color: category.text_color }]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}

    </ScrollView>
  );
}