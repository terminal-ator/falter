import { useStore } from "@/stores";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Button, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersLayout() {
    
    const { id } = useLocalSearchParams();

    const { orders, selectedCustomerID, selectCustomer, customers } = useStore();
    const router = useRouter()
    const order = orders[id as string];

    if(!order){
        return (
            <SafeAreaView style={{flex: 1 , backgroundColor:"white"}}>
            <View style={{flex: 1, backgroundColor:"white", padding: 16}}>
                <Text>Order not found</Text>
            </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{flex: 1 , backgroundColor:"white"}}>
        <View style={{flex: 1, backgroundColor:"white", padding: 16}}>
            <Text>Order details to follow</Text>
            <Button title="Edit" onPress={()=>{
                 if (selectedCustomerID) {
                        Alert.alert(
                            "Customer Selection",
                            `${customers[selectedCustomerID]?.name} is already selected. Do you want delete the current selection and choose a new customer?`,
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Change Customer", onPress: () => {
                                        selectCustomer(order.customerID);
                                        // clearCart();
                                        const cart = order.items.reduce((acc, item)=>{
                                            acc[item.skuID] = {
                                                sku: item.sku,
                                                quantity: item.quantity
                                            };
                                            return acc;
                                        }, {} );
                                        // @ts-ignore
                                        useStore.setState({cart, editOrderID: order.orderID});
                                        router.replace(`/order/${order.customerID}`);
                                    }
                                }
                            ]
                        );
                    } else {
                        selectCustomer(order.customerID);
                        const cart = order.items.reduce((acc, item)=>{
                                            acc[item.skuID] = {
                                                sku: item.sku,
                                                quantity: item.quantity
                                            };
                                            return acc;
                                        }, {} );
                        
                        useStore.setState({cart, editOrderID: order.orderID});
                        router.replace(`/order/${order.customerID}`);
                    }
            }} />
            <FlatList data={order.items} keyExtractor={(item)=>item.skuID} renderItem={({item})=>{
                return (
                    <View style={{marginBottom: 8}}>
                        <Text>{item.sku?.name} - Quantity: {item.quantity} - Price: {item.sku?.price}</Text>
                    </View>
                )
            }} />
        </View>
        </SafeAreaView>
    )
}