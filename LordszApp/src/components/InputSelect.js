import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function InputSelect({ label, value, placeholder, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={onPress}>
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <AntDesign name="right" size={16} color={COLORS.text} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  inputContainer: {
    height: 47,
    backgroundColor: COLORS.inputBackground,
    borderColor: COLORS.border,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
  },
  placeholder: {
    color: COLORS.textSecondary,
  },
  icon: {
    transform: [{ rotate: '90deg' }],
  },
});
