import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function BucketScreen() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setCategories(data ?? []);
      });
  }, []);

  return (
    <View style={styles.container}>
      {categories.map(cat => (
        <Text key={cat.id} style={styles.text}>{cat.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2C2C2A',
    marginBottom: 8,
  },
});