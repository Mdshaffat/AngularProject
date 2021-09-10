export interface IMedicinePurchase {
    patientId: number;
    medicineListWithQuantity: Medicine[];
}
export interface Medicine {
    medicineId: number;
    medicineName: string;
    unitPrice: string;
    quantity: number;
    itemTotal: number;
}
