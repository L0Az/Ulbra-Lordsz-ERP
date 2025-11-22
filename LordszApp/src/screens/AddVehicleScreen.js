import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
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

export default function AddVehicleScreen({ navigation }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [tireCount, setTireCount] = useState('1');
  const [activeTab, setActiveTab] = useState('Viagens');
  const { addVehicle } = useVehicles();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalOptions, setModalOptions] = useState([]);
  const [selectionType, setSelectionType] = useState('');

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
    if (!brand || !model || !plate) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    addVehicle({
      plate: plate.toUpperCase(),
      model: `${model} - ${brand}`,
      tireCount: parseInt(tireCount),
    });
    
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Adicionar veículo" 
        onBack={() => navigation.goBack()} 
      />
      
      <View style={styles.content}>
        <InputWithLabel 
          label="Placa" 
          placeholder="ABC-1234" 
          value={plate}
          onChangeText={setPlate}
          autoCapitalize="characters"
        />

        <InputSelect 
          label="Marca" 
          placeholder="Selecione a marca" 
          value={brand}
          onPress={openBrandSelection}
        />

        <InputSelect 
          label="Modelo" 
          placeholder="Selecione o modelo" 
          value={model}
          onPress={openModelSelection}
        />

        <InputWithLabel 
          label="Quantidade de pneus" 
          placeholder="1" 
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
    paddingHorizontal: 25,
    paddingTop: 29,
  },
  buttonContainer: {
    marginTop: 29,
  },
});
