import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function TruckStatusCard({ plate, status, model, onPress }) {
  
  let borderColor = 'transparent';
  let borderWidth = 0;
  let iconBgColor = COLORS.okIconBackground;
  let iconColor = COLORS.text; 
  let statusTextColor = COLORS.textTertiary;
  let statusText = model || 'Modelo - Marca';
  let RightIcon = <AntDesign name="right" size={16} color={COLORS.text} />;

  if (status === 'problem' || status === 'critical') {
    borderColor = COLORS.errorBorder;
    borderWidth = 2;
    iconBgColor = COLORS.errorBackground;
    iconColor = COLORS.error;
    statusTextColor = COLORS.errorText;
    statusText = 'Não dirigível';
    RightIcon = <MaterialIcons name="error-outline" size={24} color={COLORS.error} />;
  } else if (status === 'serious') {
    borderColor = COLORS.seriousBorder;
    borderWidth = 2;
    iconBgColor = COLORS.seriousBackground;
    iconColor = COLORS.serious;
    statusTextColor = COLORS.serious;
    statusText = 'Sério';
    RightIcon = <MaterialIcons name="warning" size={24} color={COLORS.serious} />;
  } else if (status === 'warning') {
    borderColor = COLORS.warningBorder;
    borderWidth = 2;
    iconBgColor = COLORS.warningBackground;
    iconColor = COLORS.warning;
    statusTextColor = COLORS.warning;
    statusText = 'Aviso';
    RightIcon = <MaterialIcons name="warning-amber" size={24} color={COLORS.warning} />;
  }

  return (
    <TouchableOpacity 
      style={[styles.container, { borderColor, borderWidth }]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <MaterialCommunityIcons name="truck-outline" size={24} color={iconColor} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.plate}>Placa: {plate}</Text>
        <Text style={[styles.status, { color: statusTextColor }]}>{statusText}</Text>
      </View>
      <View style={styles.rightIconContainer}>
        {RightIcon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7F8',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: '100%',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  plate: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 2,
  },
  status: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
