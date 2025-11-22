import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useVehicles } from '../context/VehicleContext';
import { COLORS } from '../constants/colors';
import { Header } from '../components';

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { vehicles, addTire } = useVehicles();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>Precisamos da sua permissão para usar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const tireData = JSON.parse(data);
      
      let foundTire = null;
      let foundVehicle = null;

      for (const v of vehicles) {
        const t = (v.tires || []).find(t => t.id === tireData.id || t.id === String(tireData.id));
        if (t) {
          foundTire = t;
          foundVehicle = v;
          break;
        }
      }

      if (foundTire && foundVehicle) {
        Alert.alert('Pneu Encontrado', `Abrindo detalhes do ${foundTire.name}`, [
          { text: 'OK', onPress: () => navigation.replace('TireDetail', { vehicle: foundVehicle, tire: foundTire }) }
        ]);
      } else {
        const targetVehicleId = tireData.vehicleId || (vehicles.length > 0 ? vehicles[0].id : null);

        if (targetVehicleId) {
          const targetVehicle = vehicles.find(v => v.id === targetVehicleId);
          if (targetVehicle) {
            const newTire = {
              id: tireData.id || Date.now().toString(),
              name: tireData.name || 'Novo Pneu',
              position: tireData.position || 'Estoque',
              pressure: tireData.pressure || '32 PSI',
              status: tireData.status || 'OK',
              tread: tireData.tread || 'Nova',
              history: [],
              ...tireData
            };
            
            addTire(targetVehicleId, newTire);
            
            Alert.alert('Novo Pneu', 'Pneu adicionado com sucesso!', [
              { text: 'OK', onPress: () => navigation.replace('TireDetail', { vehicle: targetVehicle, tire: newTire }) }
            ]);
          } else {
            Alert.alert('Erro', 'Veículo de destino não encontrado.');
            setScanned(false);
          }
        } else {
          Alert.alert('Erro', 'Dados do pneu inválidos ou sem veículo associado.');
          setScanned(false);
        }
      }

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível ler o QR Code. Certifique-se que é um código válido do sistema.');
      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Escanear Pneu" onBack={() => navigation.goBack()} />
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.instructionText}>Aponte a câmera para o QR Code do pneu</Text>
          </View>
        </CameraView>
      </View>
      {scanned && (
        <Button title={'Escanear Novamente'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  instructionText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  }
});
