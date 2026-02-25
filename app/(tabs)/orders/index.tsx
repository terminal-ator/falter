import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { useStore } from '@/stores';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const { cart, orders } = useStore();

  if(Object.keys(orders).length === 0){
    return (
      <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        
        <Text>No Orders taken</Text>
        
      </ThemedView>
      <StatusBar style="auto" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
    <ThemedView style={styles.container}>
      
        <FlatList data={Object.keys(orders)} keyExtractor={(item)=>orders[item].orderID} renderItem={({item})=>{
          const order = orders[item];
          if(!order) return null;
          return(
            <View>
              <Link href={`/orders/order/${order.orderID}`}>
                <Text>{order.customer.name} Rs:{order.totalAmount}</Text>
              </Link>
            </View>
          )
        }} />
      
      </ThemedView>
      <StatusBar style="auto" />
      </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#000",
    padding: 16,
  }
});
