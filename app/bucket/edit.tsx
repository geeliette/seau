import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { styles } from '../../styles/bucketEdit.styles';
import { BucketItem, Category } from '../../types/index';

export default function EditBucketItem() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  const [item, setItem] = useState<BucketItem | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (id) {
      Promise.all([
        supabase.from('bucket_items').select('*').eq('id', id).single(),
        supabase.from('categories').select('*'),
      ]).then(([{ data: itemData }, { data: catData }]) => {
        if (itemData) {
          setItem(itemData);
          setTitle(itemData.title ?? '');
          setDescription(itemData.description ?? '');
          setLocation(itemData.location ?? '');
          setDuration(itemData.duration ?? '');
          setLink(itemData.link ?? '');
          setNotes(itemData.notes ?? '');
          setCategoryId(itemData.category_id);
          setPinned(itemData.pinned);
        }
        setCategories(catData ?? []);
        setLoading(false);
      });
    } else {
      supabase.from('categories').select('*').then(({ data }) => {
        setCategories(data ?? []);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() && !categoryId) {
      setValidationError('Please add a title and select a category');
    } else if (!title.trim()) {
      setValidationError('Please add a title');
    } else if (!categoryId) {
      setValidationError('Please select a category');
    } else {
      setValidationError(null);
      setSaving(true);

      const fields = {
        title,
        description: description || null,
        location: location || null,
        duration: duration || null,
        link: link || null,
        notes: notes || null,
        category_id: categoryId,
        pinned,
      };

      if (id) {
        const { error } = await supabase.from('bucket_items').update(fields).eq('id', id);
        if (!error) router.back();
      } else {
        const { data, error } = await supabase.from('bucket_items').insert(fields).select().single();
        if (!error && data) router.replace(`/bucket/${data.id}`);
      }
    
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} disabled={saving}>
          <Text style={styles.save}>{saving ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
      {validationError && <Text style={styles.validationError}>{validationError}</Text>} 

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#C8C5BC"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryRow}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              { backgroundColor: cat.color },
              categoryId === cat.id && styles.categoryChipSelected,
            ]}
            onPress={() => setCategoryId(cat.id)}
          >
            <Text style={[styles.categoryChipText, { color: cat.text_color }]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        placeholder="Add description"
        placeholderTextColor="#C8C5BC"
        multiline
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Add location"
        placeholderTextColor="#C8C5BC"
      />

      <Text style={styles.label}>Duration</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="e.g. 2 hours"
        placeholderTextColor="#C8C5BC"
      />

      <Text style={styles.label}>Link</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Add link"
        placeholderTextColor="#C8C5BC"
        autoCapitalize="none"
        keyboardType="url"
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add notes"
        placeholderTextColor="#C8C5BC"
        multiline
      />

      <TouchableOpacity
        style={[styles.pinRow]}
        onPress={() => setPinned(!pinned)}
      >
        <Text style={styles.pinLabel}>Pinned to top</Text>
        <View style={[styles.toggle, pinned && styles.toggleOn]}>
          <View style={[styles.knob, pinned && styles.knobOn]} />
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}