import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useVehicles } from '../context/VehicleContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InputWithLabel, InputSelect, SelectionModal, Header } from '../components';

export default function AddTireScreen({ route, navigation }) {
  const { vehicle, tire: existingTire } = route.params || {};
  const { addTire, updateTire } = useVehicles();

  const [name, setName] = useState(existingTire?.name || '');
  const [fireNumber, setFireNumber] = useState(existingTire?.fireNumber || '');
  const [pressure, setPressure] = useState(existingTire?.pressure?.replace(' PSI', '') || '');
  const [depth, setDepth] = useState(existingTire?.depth?.replace(' mm', '') || '');
  const [position, setPosition] = useState(existingTire?.position || '');
  const [modalVisible, setModalVisible] = useState(false);
  
  const [flags, setFlags] = useState(existingTire?.flags || {
    rotation: false,
    repair: false,
    stock: false,
    scrapped: false,
    retread: false,
    sold: false,
  });

  const POSITIONS = [
    'Dianteiro direito',
    'Dianteiro esquerdo',
    'Traseiro direito',
    'Traseiro esquerdo',
    'Centro direito',
    'Centro esquerdo',
    'Traseiro 2 direito',
    'Traseiro 2 esquerdo',
    'Estepe'
  ];

  const toggleFlag = (key) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    if (!name || !position) {
      Alert.alert('Preencha os campos', 'Nome e posição são obrigatórios');
      return;
    }

    const newHistory = [];
    const date = new Date().toLocaleString('pt-BR');

    if (flags.rotation && (!existingTire || !existingTire.flags?.rotation)) newHistory.push({ id: Date.now() + 1, title: `${name} - Rodizio`, date, type: 'rotation' });
    if (flags.repair && (!existingTire || !existingTire.flags?.repair)) newHistory.push({ id: Date.now() + 2, title: `${name} - Conserto`, date, type: 'repair' });
    if (flags.stock && (!existingTire || !existingTire.flags?.stock)) newHistory.push({ id: Date.now() + 3, title: `${name} - Movido p/estoque`, date, type: 'stock' });
    if (flags.scrapped && (!existingTire || !existingTire.flags?.scrapped)) newHistory.push({ id: Date.now() + 4, title: `${name} - Sucateado`, date, type: 'scrapped' });
    if (flags.retread && (!existingTire || !existingTire.flags?.retread)) newHistory.push({ id: Date.now() + 5, title: `${name} - Recapagem`, date, type: 'retread' });
    if (flags.sold && (!existingTire || !existingTire.flags?.sold)) newHistory.push({ id: Date.now() + 6, title: `${name} - Vendido`, date, type: 'sold' });

    const tireData = { 
      name, 
      fireNumber,
      position, 
      pressure: pressure ? `${pressure} PSI` : '---', 
      depth: depth ? `${depth} mm` : '---',
      status: 'OK', 
      history: existingTire ? [...(existingTire.history || []), ...newHistory] : newHistory,
      flags 
    };

    if (existingTire) {
      updateTire(vehicle.id, existingTire.id, tireData);
    } else {
      addTire(vehicle.id, tireData);
    }
    navigation.goBack();
  };

  const FlagItem = ({ label, value, onToggle }) => (
    <TouchableOpacity style={styles.flagItem} onPress={onToggle}>
      <MaterialCommunityIcons 
        name={value ? "toggle-switch" : "toggle-switch-off-outline"} 
        size={36} 
        color={value ? "#1173D4" : "#AFB4BF"} 
      />
      <Text style={styles.flagLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={existingTire ? 'Editar pneu' : 'Adicionar pneu'} 
        onBack={() => navigation.goBack()} 
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subHeader}>
          <Text style={styles.tireTitle}>{name || 'Novo Pneu'}</Text>
          <Text style={styles.vehicleSubtitle}>Veículo {vehicle?.plate}</Text>
        </View>

        <InputWithLabel 
          label="Nome do Pneu" 
          placeholder="Ex: Pneu 1" 
          value={name} 
          onChangeText={setName} 
        />

        <InputWithLabel 
          label="Número de fogo" 
          placeholder="123456" 
          value={fireNumber} 
          onChangeText={setFireNumber} 
          keyboardType="numeric"
        />

        <InputWithLabel 
          label="Pressão" 
          placeholder="32" 
          value={pressure} 
          onChangeText={setPressure} 
          keyboardType="numeric"
        />

        <InputWithLabel 
          label="Profundidade do sulco" 
          placeholder="9" 
          value={depth} 
          onChangeText={setDepth} 
          keyboardType="numeric"
        />

        <InputSelect 
          label="Posição do pneu" 
          placeholder="Selecione a posição" 
          value={position} 
          onPress={() => setModalVisible(true)} 
        />

        <View style={styles.flagsContainer}>
          <View style={styles.flagRow}>
            <FlagItem label="Rodizio" value={flags.rotation} onToggle={() => toggleFlag('rotation')} />
            <FlagItem label="Conserto" value={flags.repair} onToggle={() => toggleFlag('repair')} />
          </View>
          <View style={styles.flagRow}>
            <FlagItem label="Recapagem" value={flags.retread} onToggle={() => toggleFlag('retread')} />
            <FlagItem label="Movido p/estoque" value={flags.stock} onToggle={() => toggleFlag('stock')} />
          </View>
          <View style={styles.flagRow}>
            <FlagItem label="Vendido" value={flags.sold} onToggle={() => toggleFlag('sold')} />
            <FlagItem label="Sucateado" value={flags.scrapped} onToggle={() => toggleFlag('scrapped')} />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <SelectionModal
        visible={modalVisible}
        title="Selecione a posição"
        options={POSITIONS}
        onClose={() => setModalVisible(false)}
        onSelect={(item) => {
          setPosition(item);
          setModalVisible(false);
        }}
      />
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
  subHeader: { marginBottom: 20 },
  tireTitle: { fontSize: 24, fontWeight: '600', color: 'black' },
  vehicleSubtitle: { fontSize: 16, color: '#595959', marginTop: 4 },
  
  flagsContainer: { marginTop: 10, marginBottom: 20 },
  flagRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  flagItem: { flexDirection: 'row', alignItems: 'center', width: '48%' },
  flagLabel: { marginLeft: 8, fontSize: 15, color: 'black' },

  saveButton: { backgroundColor: '#1173D4', padding: 14, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: 'white', fontWeight: '700', fontSize: 16 },
});
