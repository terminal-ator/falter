import { Customers, ICustomer } from '@/data/fakedata';
import { useStore } from '@/stores';
import { useRouter } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function CustomerFlowIndex() {
    const router = useRouter();
    const { selectCustomer, selectedCustomerID, customers, clearCart } = useStore();



    const renderCustomer = ({ item }: { item: ICustomer }) => {
        return (
            <View style={styles.productCard}>
                <TouchableOpacity onPress={() => {
                    if (selectedCustomerID && selectedCustomerID !== item.id) {
                        Alert.alert(
                            "Customer Selection",
                            `${customers[selectedCustomerID]?.name} is already selected. Do you want delete the current selection and choose a new customer?`,
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Change Customer", onPress: () => {
                                        selectCustomer(item.id);
                                        clearCart();
                                        router.push(`./${item.id}`);
                                    }
                                }
                            ]
                        );
                    } else {
                        selectCustomer(item.id);
                        router.push(`./${item.id}`)
                    }
                }}>
                    <Text style={styles.productName}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList data={Customers}
                renderItem={renderCustomer}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    productCard: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: '#666',
    },
});
