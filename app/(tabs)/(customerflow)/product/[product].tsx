import { IProduct, ISku, Products } from "@/data/fakedata";
import { useStore } from "@/stores";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareFlatList as FlatList } from 'react-native-keyboard-aware-scroll-view';
export default function SkuSelectionScreen() {
    const route = useRoute();
    const { product } = route.params || {};
    const [selectedProduct, setSelectedProduct] = useState< IProduct | null>(null);
    const { getCartStatus, addToCart } = useStore();

    if(!product){
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Product not found</Text>
            </View>
        )
    }

    useFocusEffect(
        useCallback(()=>{
        if(product){
            // Extract product details based on the product ID from route params   
            const extractProduct = Products.find(p=>p.id === Number(product));
            console.log('Extracted Product:', extractProduct);
            if(extractProduct){
                setSelectedProduct(extractProduct);
            }
        }
    }, [product]))

    if(!selectedProduct){
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Loading Product...</Text>
            </View>
        )
    }

    function renderSku({item}: { item: ISku }){
        const cartStatus = getCartStatus(item.skuID);
        return(
        <View style={{...styles.detailsCard, padding: 8, marginBottom: 6}}>
        
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                    <Text style={{fontSize: 13, color: '#333', fontWeight: "bold"}} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 6}}>
                    <Text style={{fontSize: 12, color: '#666', width: 36}}>MRP:</Text>
                    <Text style={{fontSize: 13, color: '#333', fontWeight:"600", marginRight: 10}}>Rs. {item.mrp.toFixed(2)}</Text>
                    <Text style={{fontSize: 12, color: '#666', width: 36}}>Price:</Text>
                    <Text style={{fontSize: 13, color: '#333', fontWeight:"600"}}>Rs. {item.price.toFixed(2)}</Text>
                </View>
            </View>

            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                    height: 36,
                    fontSize: 13,
                    minWidth: 60
                }}
                placeholder="Qty"
                keyboardType="numeric"
                value={cartStatus ? cartStatus.toString() : ''}
                onChangeText={(text) => {
                    const quantity = parseInt(text) || 0;
                    addToCart(item, quantity);    
                    }
                }
            />
        </View>)
    }

    return(
        <View style={styles.container}>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={120}>
                <FlatList data={selectedProduct.skus}
                    keyExtractor={(item) => item.skuID.toString()}
                    renderItem={renderSku}
                />
                </KeyboardAvoidingView>
            
        </View>
    )

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: 600,
        margin:2
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