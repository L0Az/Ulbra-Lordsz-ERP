import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function InputWithLabel({ label, placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
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
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
    height: '100%',
  },
});
