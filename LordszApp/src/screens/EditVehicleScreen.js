import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { 
  Header, 
  Footer, 
  InputSelect, 
  InputWithLabel, 
  Button,
  SelectionModal
} from '../components';
import { COLORS } from '../constants/colors';
import { useVehicles } from '../context/VehicleContext';

const TRUCK_DATA = {
  'Volvo': ['FH', 'FM', 'FMX', 'VM'],
  'Mercedes-Benz': ['Actros', 'Arocs', 'Axor', 'Atego', 'Accelo'],
  'Scania': ['R-Series', 'S-Series', 'P-Series', 'G-Series'],
  'DAF': ['XF', 'CF', 'LF'],
  'Volkswagen': ['Constellation', 'Delivery', 'Meteor'],
  'Iveco': ['S-Way', 'Tector', 'Daily', 'Stralis']
};

export default function EditVehicleScreen({ navigation, route }) {
  const { vehicle } = route.params;
  const { updateVehicle } = useVehicles();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [tireCount, setTireCount] = useState('');
  const [activeTab, setActiveTab] = useState('Viagens');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalOptions, setModalOptions] = useState([]);
  const [selectionType, setSelectionType] = useState('');

  useEffect(() => {
    if (vehicle) {
      const parts = vehicle.model.split(' - ');
      if (parts.length === 2) {
        setModel(parts[0]);
        setBrand(parts[1]);
      } else {
        setModel(vehicle.model);
      }
      setTireCount(String(vehicle.tireCount));
    }
  }, [vehicle]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const openBrandSelection = () => {
    setModalTitle('Selecione a marca');
    setModalOptions(Object.keys(TRUCK_DATA));
    setSelectionType('brand');
    setModalVisible(true);
  };

  const openModelSelection = () => {
    if (!brand) {
      alert('Por favor, selecione a marca primeiro.');
      return;
    }
    setModalTitle('Selecione o modelo');
    setModalOptions(TRUCK_DATA[brand]);
    setSelectionType('model');
    setModalVisible(true);
  };

  const handleSelection = (item) => {
    if (selectionType === 'brand') {
      setBrand(item);
      setModel('');
    } else {
      setModel(item);
    }
  };

  const handleSave = () => {
    if (!brand || !model || !tireCount) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    updateVehicle(vehicle.id, {
      model: `${model} - ${brand}`,
      tireCount: parseInt(tireCount),
    });
    
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Editar veículo" 
        onBack={() => navigation.goBack()} 
      />
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>Veículo {vehicle.plate}</Text>

        <InputSelect 
          label="Marca" 
          value={brand} 
          onPress={openBrandSelection} 
        />

        <InputSelect 
          label="Modelo" 
          value={model} 
          onPress={openModelSelection} 
        />

        <InputWithLabel 
          label="Quantidade de pneus" 
          placeholder="0" 
          value={tireCount}
          onChangeText={setTireCount}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <Button title="Salvar" onPress={handleSave} />
        </View>
      </View>

      <Footer activeTab={activeTab} onTabPress={handleTabPress} />

      <SelectionModal
        visible={modalVisible}
        title={modalTitle}
        options={modalOptions}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelection}
      />
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
    padding: 20,
  },
  subtitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 20,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
