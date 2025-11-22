import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Footer, Header } from '../components';
import { COLORS } from '../constants/colors';
import { useVehicles } from '../context/VehicleContext';

export default function TireControlScreen({ route, navigation }) {
  const { vehicle: vehicleParam } = route.params || {};
  const { vehicles } = useVehicles();
  const vehicle =
    vehicles.find((v) => v.id === (vehicleParam && vehicleParam.id)) || vehicleParam || vehicles[0];

  const history = (vehicle.tires || [])
    .flatMap((t) => t.history || [])
    .sort((a, b) => b.id - a.id);

  const handleTabPress = (tab) => {
    if (tab === 'Viagens') {
      navigation.navigate('Dashboard');
    } else if (tab === 'Escanear') {
      navigation.navigate('Scan');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={`Veículo: ${vehicle.plate}`} 
        onBack={() => navigation.goBack()} 
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Pneus</Text>
        
        {(vehicle.tires || []).map((tire) => {
          let cardStyle = styles.tireCardOk;
          let statusColor = '#43B46D';
          
          if (tire.status === 'Atenção') {
            cardStyle = styles.tireCardWarning;
            statusColor = '#FEC006';
          } else if (tire.status === 'Sério') {
            cardStyle = styles.tireCardSerious;
            statusColor = '#F76804';
          } else if (tire.status === 'Crítico') {
            cardStyle = styles.tireCardCritical;
            statusColor = '#DB3444';
          }

          return (
          <TouchableOpacity 
            key={tire.id} 
            style={[
              styles.tireCard, 
              cardStyle
            ]}
            onPress={() => navigation.navigate('TireDetail', { vehicle, tire })}
          >
            <View style={styles.tireCardHeader}>
              <Text style={styles.tireName}>{tire.name}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#AFB4BF" />
            </View>
            
            <Text style={styles.tirePosition}>{tire.position}</Text>
            
            <View style={styles.tireDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pressão</Text>
                <Text style={[
                  styles.detailValue, 
                  { color: statusColor !== '#43B46D' ? statusColor : 'black' }
                ]}>
                  {tire.pressure}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{tire.tread}</Text>
                <Text style={[
                  styles.detailValue, 
                  { color: statusColor }
                ]}>
                  {tire.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )})}

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Histórico</Text>
        
        {history.map((item) => (
           <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyIconContainer}>
                <MaterialCommunityIcons name="file-document-outline" size={24} color="#1173D4" />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <MaterialCommunityIcons name="refresh" size={24} color="#AFB4BF" />
           </View>
        ))}
        
        <View style={{ height: 100 }} /> 
      </ScrollView>

      {/* Floating Buttons */}
      <TouchableOpacity style={styles.fabEdit} onPress={() => navigation.navigate('EditVehicle', { vehicle })}>
        <MaterialCommunityIcons name="pencil-outline" size={24} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.fabAdd} onPress={() => navigation.navigate('AddTire', { vehicle })}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Footer activeTab="Pneus" onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
    marginTop: 30,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  content: {
    flex: 1,
    padding: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginBottom: 15,
  },
  tireCard: {
    backgroundColor: '#F6F7F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  tireCardOk: {
    borderColor: '#43B46D',
  },
  tireCardWarning: {
    borderColor: '#FEC006',
  },
  tireCardSerious: {
    borderColor: '#F76804',
  },
  tireCardCritical: {
    borderColor: '#DB3444',
  },
  tireCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tireName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  tirePosition: {
    fontSize: 10,
    color: '#AFB4BF',
    marginBottom: 10,
  },
  tireDetails: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#AFB4BF',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AFB4BF',
  },
  historyIconContainer: {
    marginRight: 15,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  historyDate: {
    fontSize: 12,
    color: '#AFB4BF',
    marginTop: 2,
  },
  fabEdit: {
    position: 'absolute',
    top: 110,
    right: 25,
    width: 50,
    height: 47,
    backgroundColor: '#1173D4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  fabAdd: {
    position: 'absolute',
    bottom: 120,
    right: 25,
    width: 50,
    height: 47,
    backgroundColor: '#1173D4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  }
});
