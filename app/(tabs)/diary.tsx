import { StyleSheet, Text, View } from 'react-native';

export default function DiaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Diary</Text>
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
    fontSize: 24,
    color: '#2C2C2A',
  },
});