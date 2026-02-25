import { Products } from '@/data/fakedata';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductsScreen() {
    const router = useRouter();

    const renderProduct = ({ item }: { item: typeof Products[0] }) => (
        <View style={styles.productCard}>
            <TouchableOpacity onPress={()=>{
                router.push(`./product/${item.id}`)
            }}>
            <Text style={styles.productName}>{item.name}</Text>
            
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button title='Save Order' onPress={()=>{
                router.push('./summary');
            }} />
        </View>
    );
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
