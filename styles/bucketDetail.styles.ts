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
    detailHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    editText: {
      fontSize: 13,
      color: '#5F5E5A',
    },
    backButton: {
      marginBottom: 20,
    },
    backText: {
      fontSize: 13,
      color: '#5F5E5A',
    },
    categoryPill: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
      marginBottom: 10,
    },
    categoryText: {
      fontSize: 11,
    },
    title: {
      fontSize: 28,
      color: '#2C2C2A',
      marginBottom: 8,
    },
    description: {
      fontSize: 13,
      color: '#888780',
      lineHeight: 20,
      marginBottom: 16,
    },
    descriptionEmpty: {
      color: '#C8C5BC',
    },
    divider: {
      height: 0.5,
      backgroundColor: '#D8D5CC',
      marginVertical: 20,
    },
    metaRow: {
      marginBottom: 16,
    },
    metaLabel: {
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: '#A8A59D',
      marginBottom: 2,
    },
    metaValue: {
      fontSize: 13,
      color: '#2C2C2A',
    },
    metaEmpty: {
      color: '#C8C5BC',
    },
    notesEmpty: {
      color: '#C8C5BC',
    },
    link: {
      color: '#3C3489',
      textDecorationLine: 'underline',
    },
    notesLabel: {
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: '#A8A59D',
      marginBottom: 8,
    },
    notes: {
      fontSize: 13,
      color: '#5F5E5A',
      lineHeight: 20,
      backgroundColor: '#EAE8E1',
      padding: 14,
      borderRadius: 12,
    },
    addButton: {
      backgroundColor: '#2C2C2A',
      borderRadius: 12,
      padding: 14,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#F5F3EE',
      fontSize: 13,
      fontWeight: '500',
    },
  });