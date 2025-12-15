import { Stack } from "expo-router";

export default function CustomerFlowLayout() {
    return <Stack >
        <Stack.Screen name="index" options={{ title: 'Customers' }} />
        <Stack.Screen name="[customer]" options={{ title: 'Customer Details' }} />
        <Stack.Screen name="products" options={{ title: 'Choose Products' }} />
        <Stack.Screen name="product/[product]" options={{ title: 'Take Order', presentation: "modal" }} />
        <Stack.Screen name="summary" options={{ title: 'Order Summary' }} />
    </Stack>
}
