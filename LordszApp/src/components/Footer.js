import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function Footer({ activeTab, onTabPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => onTabPress && onTabPress('Viagens')}
      >
        <MaterialCommunityIcons 
          name="truck-outline" 
          size={24} 
          color={activeTab === 'Viagens' ? COLORS.primary : COLORS.textSecondary} 
        />
        <Text style={[
          styles.label, 
          { color: activeTab === 'Viagens' ? COLORS.primary : COLORS.textSecondary }
        ]}>
          Viagens
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        activeOpacity={1}
      >
        <MaterialCommunityIcons 
          name="tire" 
          size={24} 
          color={activeTab === 'Pneus' ? COLORS.primary : COLORS.textSecondary} 
        />
        <Text style={[
          styles.label, 
          { color: activeTab === 'Pneus' ? COLORS.primary : COLORS.textSecondary }
        ]}>
          Pneus
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => onTabPress && onTabPress('Escanear')}
      >
        <MaterialCommunityIcons 
          name="barcode-scan" 
          size={24} 
          color={activeTab === 'Escanear' ? COLORS.primary : COLORS.textSecondary} 
        />
        <Text style={[
          styles.label, 
          { color: activeTab === 'Escanear' ? COLORS.primary : COLORS.textSecondary }
        ]}>
          Escanear
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 83,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    marginTop: 4,
  },
});
