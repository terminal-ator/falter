export interface ICustomer{
    id: number;
    name: string;
}

export type IProduct = typeof Products[0];
export type ISku = typeof Products[0]['skus'][0];

export const Customers = [
    {
        id: 1,
        name: "Jai Bhawani Kirana Store"
    },
    {
        id: 2,
        name: "Sanket Super Market"
    }
]

export const Categories = ["Chocolate", "Beverages", "Snacks", "Dairy"]
export const SubCategories = [ "Dark Chocolate", "Milk Chocolate", "Soda", "Juice", "Chips", "Cookies", "Cheese", "Yogurt" ]

export const Products = [
    {
        id: 1,
        name: "Dairy Milk Chocolate",
        category: "Chocolate",
        subCategory: "Milk Chocolate",
        erpID: "DM1234",
        image: "https://example.com/dairymilk.jpg",
        description: "Cadbury Dairy Milk is a milk chocolate bar made by Cadbury. It was introduced in 1905 and is now manufactured by Mondelez International.",
        skus : [
            {
                skuID: "DM10",
                name: "Dairy Milk Rs.10 56pcs",
                price: 509.09,
                mrp: 560,
                unit: "56pcs"
            },
            {
                skuID: "DM20",
                name: "Dairy Milk Rs.20 40pcs",
                price: 714.09,
                mrp: 800,
                unit: "40pcs"
            },
            {
                skuID: "DM50",
                name: "Dairy Milk Rs.50 24pcs",
                price: 1136.36,
                mrp: 1280,
                unit: "24pcs"
            },
            {
                skuID: "DM100",
                name: "Dairy Milk Rs.100 12pcs",
                price: 1363.64,
                mrp: 1540,
                unit: "12pcs"
            }
        ]
    },
    {
        id: 2,
        name: "Coca Cola",
        category: "Beverages",
        subCategory: "Soda",
        erpID: "CC5678",
        image: "https://example.com/cocacola.jpg",
        description: "Coca-Cola, or Coke, is a carbonated soft drink manufactured by The Coca-Cola Company. Originally marketed as a temperance drink and intended as a patent medicine, it was invented in the late 19th century by John Stith Pemberton.",
        skus : [
            {
                skuID: "CC300",
                name: "Coca Cola 300ml",
                price: 30,
                mrp: 35,
                unit: "300ml"
            },
            {
                skuID: "CC500",
                name: "Coca Cola 500ml",
                price: 45,
                mrp: 50,
                unit: "500ml"
            },
        ]
    }
]
    