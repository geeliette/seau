import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { styles } from '../../styles/bucketDetail.styles';
import { BucketItem, Category } from '../../types/index';


export default function BucketItemDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<BucketItem | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  useFocusEffect(
    useCallback(() => {
      supabase
        .from('bucket_items')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            setItem(data);
            supabase
              .from('categories')
              .select('*')
              .eq('id', data.category_id)
              .single()
              .then(({ data: catData }) => setCategory(catData));
          }
        });
    }, [id])
  );

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Bucket</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/bucket/edit?id=${item.id}` as any)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Category pill */}
      {category && (
        <View style={[styles.categoryPill, { backgroundColor: category.color }]}>
          <Text style={[styles.categoryText, { color: category.text_color }]}>
            {category.name}
          </Text>
        </View>
      )}

      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Description */}
      <Text style={[styles.description, !item.description && styles.descriptionEmpty]}>
        {item.description ?? 'Add description'}
      </Text>

      <View style={styles.divider} />

      {/* Metadata rows */}
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Location</Text>
        <Text style={[styles.metaValue, !item.location && styles.metaEmpty]}>
          {item.location ?? 'Add location'}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Duration</Text>
        <Text style={[styles.metaValue, !item.duration && styles.metaEmpty]}>
          {item.duration ?? 'Add duration'}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Link</Text>
        <Text style={[styles.metaValue, !item.link && styles.metaEmpty, item.link ? styles.link : null]}>
          {item.link ?? 'Add link'}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Notes</Text>
        <Text style={[styles.metaValue, !item.notes && styles.notesEmpty]}>
          {item.notes ?? 'Add notes'}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Add to Plan button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add to Plan</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}