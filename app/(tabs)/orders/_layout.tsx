import { Stack } from "expo-router";

export default function OrdersLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerTitle: 'Orders'}} />
            <Stack.Screen name="order/[id]" options={{headerTitle: 'Order Details'}} />
        </Stack>
    )
}