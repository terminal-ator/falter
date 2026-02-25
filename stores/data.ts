export const Customers = [
    {
        id: 1,
        name: "Jai Bhawani Kirana Store",
        beat: "Tue"
    },
    {
        id: 2,
        name: "Sanket Super Market",
        beat: "DADRI"
    },
    {
        id:3,
        name: "Rahul General Store",
        beat: "Tue"
    }     

]


export const Beats = [
    "Others",
    "DADRI",
    "DELTA",
    "Bhaage hue",
    "Cash Parties",
    "DADRI",
    "DADRI KS",
    "Dadri Latest",
    "DadriMn",
    "DELTA",
    "GAMMA",
    "KASNA",
    "LUKSAR",
    "MON",
    "OTHER",
    "Others",
    "SAT",
    "SS",
    "SUN",
    "SURAJPUR",
    "THU",
    "THU JAI",
    "TILAPATA",
    "Tue"
]

export function normalizeArray<T extends { id: number|string }>(arr: T[]): Record<number|string, T> {
    const normalized: Record<number|string, T> = {};
    arr.forEach(item => {
        normalized[item.id] = item;
    });
    return normalized;
}

export function deNormalizeArray<T>(obj: { [key: number|string]: T }): T[] {
    return Object.values(obj);
}
