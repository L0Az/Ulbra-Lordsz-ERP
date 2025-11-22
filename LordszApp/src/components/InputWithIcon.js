import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function InputWithIcon({ placeholder, iconName, value, onChangeText, secureTextEntry }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={iconName || "account-outline"} size={24} color={COLORS.textSecondary} />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 47,
    flexDirection: 'row',
    backgroundColor: COLORS.inputBackground,
    borderColor: COLORS.border,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
  },
});
