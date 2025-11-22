import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components';
import { useVehicles } from '../context/VehicleContext';

export default function TireActionsScreen({ route, navigation }) {
  const { vehicle, tire } = route.params || {};
  const { updateTire } = useVehicles();

  const handleAction = (actionType, label) => {
    Alert.alert(
      'Confirmar Ação',
      `Deseja marcar este pneu como "${label}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            const date = new Date().toLocaleString('pt-BR');
            const newHistoryItem = { 
              id: Date.now(), 
              title: `${tire.name} - ${label}`, 
              date, 
              type: actionType 
            };
            
            const updatedFlags = { ...tire.flags, [actionType]: true };
            
            const updatedTire = {
              ...tire,
              flags: updatedFlags,
              history: [newHistoryItem, ...(tire.history || [])]
            };

            updateTire(vehicle.id, tire.id, updatedTire);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const ActionButton = ({ icon, label, color = 'black', onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={32} color={color} />
      </View>
      <Text style={[styles.actionLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Ações do pneu" 
        onBack={() => navigation.goBack()} 
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.tireName}>{tire?.name}</Text>
        <Text style={styles.vehicleName}>Veículo {vehicle?.plate}</Text>

        <View style={styles.grid}>
          <ActionButton 
            icon="backup-restore" 
            label="Rotacionar" 
            onPress={() => handleAction('rotation', 'Rotacionado')} 
          />
          <ActionButton 
            icon="wrench-outline" 
            label="Reparar" 
            onPress={() => handleAction('repair', 'Em reparo')} 
          />
          <ActionButton 
            icon="package-variant-closed" 
            label="Mandar p/estoque" 
            onPress={() => handleAction('stock', 'Movido p/estoque')} 
          />
          <ActionButton 
            icon="refresh" 
            label="Recapagem" 
            onPress={() => handleAction('retread', 'Em recapagem')} 
          />
          <ActionButton 
            icon="tag-outline" 
            label="Vender" 
            onPress={() => handleAction('sold', 'Vendido')} 
          />
          <ActionButton 
            icon="trash-can-outline" 
            label="Excluir" 
            color="#D32F2F"
            onPress={() => {
                Alert.alert('Excluir', 'Funcionalidade de excluir ainda não implementada.');
            }} 
          />
        </View>
      </ScrollView>

      <Footer activeTab="Pneus" onTabPress={(tab) => { if (tab === 'Viagens') navigation.navigate('Dashboard'); }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7F8' },
  header: {
    paddingVertical: 18,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  backButton: { position: 'absolute', left: 16, top: 18 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  content: { padding: 25 },
  tireName: { fontSize: 24, fontWeight: '600', color: 'black', marginBottom: 4 },
  vehicleName: { fontSize: 16, color: '#595959', marginBottom: 24 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F6F7F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
