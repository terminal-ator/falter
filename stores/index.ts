import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Beats, Customers, normalizeArray } from './data';

interface CartItem {
    skuID: string;
    sku: SKU;
    quantity: number;
}

interface SKU{
    skuID: string;
    name: string;
    price: number;
    mrp: number;
    unit: string;
}

interface Customer{
    id: number;
    name: string;
    beat: string;
}

interface OrderItem{
    skuID: string;
    sku: SKU;
    quantity: number;
}

interface Order{
    orderID: string;
    customerID: number;
    customer: Customer;
    items: OrderItem[];
    totalAmount: number;
}

interface StoreState{
    skus: Record<string, SKU>;
    customers: Record<number, Customer>;
    beats: string[];
    cart: Record<string, CartItem>;
    selectedCustomerID?: number;
    orders: Record<string, Order>;
    editOrderID: string;
    syncCustomers: ()=> Promise<void>;
    addToCart: (sku: SKU, quantity: number) => void;
    removeFromCart: (skuID: string) => void;
    updateQuantity: (skuID: string, quantity: number) => void;
    clearCart: () => void;
    selectCustomer: (customerID: number) => void;
    clearCustomer: () => void;
    getCartStatus: (skuID: string) => number | undefined;
    saveOrder: ()=>void
}

export const useStore = create<StoreState>()(
    persist(
    (set) => ({
    editOrderID: '',
    orders:{},
    beats: Beats,
    skus: {
        "DM10": { skuID: "DM10", name: "Dairy Milk Rs.10 56pcs", price: 509.09, mrp: 560, unit: "56pcs" },
        "DM20": { skuID: "DM20", name: "Dairy Milk Rs.20 40pcs", price: 714.09, mrp: 800, unit: "40pcs" },
        "DM50": { skuID: "DM50", name: "Dairy Milk Rs.50 24pcs", price: 1136.36, mrp: 1280, unit: "24pcs" },
        "DM100": { skuID: "DM100", name: "Dairy Milk Rs.100 12pcs", price: 1363.64, mrp: 1540, unit: "12pcs" },
        "CC300": {
                skuID: "CC300",
                name: "Coca Cola 300ml",
                price: 30,
                mrp: 35,
                unit: "300ml"
            },
        "CC500": {
                skuID: "CC500",
                name: "Coca Cola 500ml",
                price: 45,
                mrp: 50,
                unit: "500ml"
            }
    },
    customers: normalizeArray(Customers),
    syncCustomers: async ()=> {
        // In real scenario, fetch from server
        const fetchedCustomers = Customers;
        set({ customers: normalizeArray(fetchedCustomers) });
    },
    cart: {},
    selectedCustomerID: undefined,
    addToCart: (sku, quantity) => set((state) => {
        
        const newQuantity =  quantity;
        return {
            cart: {
                ...state.cart,
                [sku.skuID]: { sku , quantity: newQuantity,skuID: sku.skuID},
            },
        };
    }),
    removeFromCart: (skuID) => set((state) => {
        const newCart = { ...state.cart };
        delete newCart[skuID];
        return { cart: newCart };
    }),
    updateQuantity: (skuID, quantity) => set((state) => {
        if (!state.cart[skuID]) return {}; // Item not in cart
        return {
            cart: {
                ...state.cart,
                [skuID]: { ...state.cart[skuID], quantity },
            },
        };
    }),
    clearCart: () => set({ cart: {} }),
    selectCustomer: (customerID) => set({ selectedCustomerID: customerID }),
    clearCustomer: () => set({ selectedCustomerID: undefined }),
    getCartStatus: (skuID): number | undefined=> {
        return useStore.getState().cart[skuID]?.quantity as number || undefined;
    },
    saveOrder: ()=> set((state) => {
        if(!state.selectedCustomerID){
            return {};
        }
        let orderID = Crypto.randomUUID();
        if(state.editOrderID!==''){
            orderID = state.editOrderID;
        }
        const order: Order = {
            orderID,
            customerID: state.selectedCustomerID,
            customer: state.customers[state.selectedCustomerID],
            items: Object.values(state.cart).map(cartItem=>({
                skuID: cartItem.sku.skuID,
                sku: cartItem.sku,
                quantity: cartItem.quantity
            })),
            totalAmount: Object.values(state.cart).reduce((total, item) => total + (item.sku.price * item.quantity), 0)
        }
        return {
            orders: {
                ...state.orders,
                [orderID]: order
            },
            cart: {},
            selectedCustomerID: undefined,
            editOrderID: ''
        }
    }),

}),{
    name: 'store-storage',
    storage: createJSONStorage(() => AsyncStorage),
}));