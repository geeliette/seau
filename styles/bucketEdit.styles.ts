import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F3EE',
    },
    content: {
      padding: 20,
      paddingTop: 60,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    validationError: {
      fontSize: 13,
      color: '#B3543E',
      marginTop: -20,
      marginBottom: 20,
    },
    cancel: {
      fontSize: 15,
      color: '#888780',
    },
    save: {
      fontSize: 15,
      color: '#2C2C2A',
      fontWeight: '500',
    },
    label: {
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: '#A8A59D',
      marginBottom: 6,
      marginTop: 16,
    },
    input: {
      backgroundColor: '#EAE8E1',
      borderRadius: 10,
      padding: 12,
      fontSize: 14,
      color: '#2C2C2A',
    },
    multiline: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    categoryRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    categoryChipSelected: {
      borderWidth: 1,
      borderColor: '#A8A59D',
    },
    categoryChipText: {
      fontSize: 12,
    },
    pinRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 24,
      paddingVertical: 4,
    },
    pinLabel: {
      fontSize: 14,
      color: '#2C2C2A',
    },
    toggle: {
      width: 40,
      height: 22,
      borderRadius: 11,
      backgroundColor: '#D8D5CC',
      justifyContent: 'center',
      padding: 2,
    },
    toggleOn: {
      backgroundColor: '#2C2C2A',
    },
    knob: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: '#F5F3EE',
    },
    knobOn: {
      alignSelf: 'flex-end',
    },
  });