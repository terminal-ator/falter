import { ThemedView } from "@/components/themed-view";
import { useStore } from "@/stores";
import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function SummaryScreen() {

    const { skus, customers, cart, selectedCustomerID, saveOrder } = useStore();
    const router = useRouter();
    return (
        <ThemedView style={styles.container}>
            <SafeAreaView>
                <Text style={styles.customerHeading}>{selectedCustomerID ? customers[selectedCustomerID]?.name : "No Customer Selected"}</Text>
                <FlatList
                    data={Object.values(cart)}
                    keyExtractor={(item) => item.skuID}
                    renderItem={({ item }) => {
                        const sku = item.sku;
                        return (
                            <Text>
                                {sku?.name} - Quantity: {item.quantity}
                            </Text>
                        );
                    }}
                />
                <Button title="Save Order" onPress={() => {
                    // Save order logic can be added here
                    saveOrder();
                    router.dismissAll();
                    Toast.show({ type: 'success', text1: 'Order Saved Successfully' });
                }} />
            </SafeAreaView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    customerHeading:{
        fontWeight: 'bold'
    }
});