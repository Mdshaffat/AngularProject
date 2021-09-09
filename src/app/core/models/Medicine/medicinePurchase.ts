export interface IMedicinePurchase {
    patientId: number;
    medicineListWithQuantity: Medicine[];
}
export interface Medicine {
    id: number;
    brandName: string;
    genericName: string;
    quantity: number;
}
