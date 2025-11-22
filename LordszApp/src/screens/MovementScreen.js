import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function MovementScreen() {
  const [vehicleId, setVehicleId] = useState('');
  const [position, setPosition] = useState('');
  const [movementType, setMovementType] = useState('rodizio');

  const handleSubmit = () => {
    console.log({ vehicleId, position, movementType });
    alert('Movimentação registrada com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Movimentação</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Identificação do Veículo</Text>
        <TextInput
          style={styles.input}
          placeholder="Placa ou Frota"
          value={vehicleId}
          onChangeText={setVehicleId}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Posição do Pneu</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Dianteiro Esquerdo"
          value={position}
          onChangeText={setPosition}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de Movimentação</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={movementType}
            onValueChange={(itemValue) => setMovementType(itemValue)}
          >
            <Picker.Item label="Rodízio" value="rodizio" />
            <Picker.Item label="Conserto" value="conserto" />
            <Picker.Item label="Recapagem" value="recapagem" />
            <Picker.Item label="Estoque" value="estoque" />
            <Picker.Item label="Venda" value="venda" />
            <Picker.Item label="Sucateamento" value="sucateamento" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Movimentação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EBF2',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EBF2',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#1173D4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
