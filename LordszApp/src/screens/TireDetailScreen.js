import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Footer, Header } from '../components';

export default function TireDetailScreen({ route, navigation }) {
  const { vehicle, tire } = route.params || {};

  const history = (tire && tire.history) || [];
  const flags = tire?.flags || {
    rotation: false,
    repair: false,
    retread: false,
    stock: false,
    scrapped: false,
    sold: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Detalhes do pneu" 
        onBack={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('TireActions', { vehicle, tire })}
          >
            <MaterialCommunityIcons name="gesture-tap" size={24} color="#1173D4" />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nome</Text>
            <Text style={styles.infoValue}>{tire?.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Posição</Text>
            <Text style={styles.infoValue}>{tire?.position}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Pressão</Text>
            <Text style={styles.infoValue}>{tire?.pressure}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Profundidade</Text>
            <Text style={styles.infoValue}>{tire?.depth}</Text>
          </View>
        </View>

        <View style={styles.flagsContainer}>
          <View style={styles.flagColumn}>
            <View style={styles.flagItem}>
              <MaterialCommunityIcons name={flags.rotation ? 'check-circle' : 'check-circle-outline'} size={22} color={flags.rotation ? '#1173D4' : '#D9D9D9'} />
              <Text style={styles.flagLabel}>Rodizio</Text>
            </View>

            <View style={styles.flagItem}>
              <MaterialCommunityIcons name={flags.retread ? 'check-circle' : 'check-circle-outline'} size={22} color={flags.retread ? '#1173D4' : '#D9D9D9'} />
              <Text style={styles.flagLabel}>Recapagem</Text>
            </View>

            <View style={styles.flagItem}>
              <MaterialCommunityIcons name={flags.sold ? 'check-circle' : 'check-circle-outline'} size={22} color={flags.sold ? '#1173D4' : '#D9D9D9'} />
              <Text style={styles.flagLabel}>Vendido</Text>
            </View>
          </View>

          <View style={styles.flagColumn}>
            <View style={styles.flagItem}>
              <MaterialCommunityIcons name={flags.repair ? 'check-circle' : 'check-circle-outline'} size={22} color={flags.repair ? '#1173D4' : '#D9D9D9'} />
              <Text style={styles.flagLabel}>Conserto</Text>
            </View>

            <View style={styles.flagItem}>
              <MaterialCommunityIcons name={flags.stock ? 'check-circle' : 'check-circle-outline'} size={22} color={flags.stock ? '#1173D4' : '#D9D9D9'} />
              <Text style={styles.flagLabel}>Movido p/estoque</Text>
            </View>

            <View style={styles.flagItem}>
              <MaterialCommunityIcons name={flags.scrapped ? 'check-circle' : 'check-circle-outline'} size={22} color={flags.scrapped ? '#1173D4' : '#D9D9D9'} />
              <Text style={styles.flagLabel}>Sucateado</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Histórico</Text>

        {history.length === 0 && (
          <View style={styles.emptyHistory}>
            <Text style={styles.emptyText}>Nenhum histórico registrado para este pneu.</Text>
          </View>
        )}

        {history.map((h) => (
          <View key={h.id} style={styles.historyCard}>
            <View style={styles.historyIconContainer}>
              <MaterialCommunityIcons name="file-document-outline" size={22} color="#1173D4" />
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>{h.title}</Text>
              <Text style={styles.historyDate}>{h.date}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fabEdit}
        onPress={() => navigation.navigate('AddTire', { vehicle, tire })}
      >
        <MaterialCommunityIcons name="pencil-outline" size={24} color="white" />
      </TouchableOpacity>

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
  headerRightContainer: { position: 'absolute', right: 12, top: 12, flexDirection: 'row', alignItems: 'center' },
  headerIconButton: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginLeft: 8, elevation: 2 },
  content: { padding: 25 },
  infoCard: { backgroundColor: 'white', borderRadius: 10, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: '#E6EBF2' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  infoLabel: { color: '#AFB4BF', fontSize: 14 },
  infoValue: { color: 'black', fontWeight: '600' },
  flagsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  flagColumn: { width: '48%' },
  flagItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  flagLabel: { marginLeft: 10, fontSize: 15, color: 'black' },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: 'black', marginBottom: 12 },
  emptyHistory: { padding: 12, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#E6EBF2' },
  emptyText: { color: '#AFB4BF' },
  historyCard: { backgroundColor: 'white', borderRadius: 10, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#AFB4BF' },
  historyIconContainer: { marginRight: 12 },
  historyContent: { flex: 1 },
  historyTitle: { fontSize: 16, fontWeight: '600', color: 'black' },
  historyDate: { fontSize: 12, color: '#AFB4BF', marginTop: 4 },
  fabEdit: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 52,
    height: 52,
    backgroundColor: '#1173D4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
});
