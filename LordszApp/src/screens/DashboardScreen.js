import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { 
  Header, 
  Footer, 
  InputWithIcon, 
  TruckStatusCard, 
  ActionAddButton 
} from '../components';
import { COLORS } from '../constants/colors';
import { useVehicles } from '../context/VehicleContext';

export default function DashboardScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Viagens');
  const { vehicles } = useVehicles() || {};

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'Escanear') {
      navigation.navigate('Scan');
    }
  };

  const filteredVehicles = (vehicles || []).filter(vehicle => 
    vehicle && vehicle.plate && vehicle.plate.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Selecione o veículo" />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <InputWithIcon 
            placeholder="Buscar por veículo" 
            iconName="magnify" 
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <Text style={styles.sectionTitle}>Veículos</Text>

        <ScrollView 
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredVehicles.map((vehicle) => (
            <TruckStatusCard 
              key={vehicle.id}
              plate={vehicle.plate}
              model={vehicle.model}
              status={vehicle.status}
              onPress={() => navigation.navigate('TireControl', { vehicle })}
            />
          ))}
          <View style={{ height: 80 }} />
        </ScrollView>

        <ActionAddButton 
          style={styles.fab} 
          onPress={() => navigation.navigate('AddVehicle')} 
        />
      </View>

      <Footer activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    position: 'relative',
  },
  searchContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
