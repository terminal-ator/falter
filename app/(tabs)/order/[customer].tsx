
import { ICustomer } from '@/data/fakedata';
import { useStore } from '@/stores';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomerDetail() {
    const route = useRoute();
    const router = useRouter();
    const { customer } = route.params || {};

    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);
    const { customers  }  = useStore()


    const handleStartOrder = () => {
    
        // Navigate to order taking screen
        // navigation.navigate('TakeOrder', { customerId: customer.id });
        console.log('Starting order for customer:', customer);
        router.push('./products');
    };

    console.log('Customer Detail Route Params:', route.params);

    if (!customer) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Customer not found</Text>
            </View>
        );
    }

    useFocusEffect(
        useCallback(()=>{
        if(customer){
            const extractCustomer = customers[customer as number];
            console.log('Extracted Customer:', extractCustomer);
            if(extractCustomer){
                setSelectedCustomer(extractCustomer);
            }
        }
    }, [customer]))

    if(!selectedCustomer){
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Loading Customer...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.detailsCard}>
                <Text style={styles.name}>{selectedCustomer.name}</Text>
                
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleStartOrder}
               
            >
                <Text style={styles.buttonText}>Start Taking Order</Text>
            </TouchableOpacity>
            <Text>Customer Detail Screen for {customer} (Implementation Pending)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    detailsCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginTop: 4,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});