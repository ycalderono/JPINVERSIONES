export interface Transaction {
    id: number;
    raffleType: string;
    paymentMethod: string;
    totalAmount: number;
    paymentStatus: string;
    createdAt: string;
    selectedNumbers: { number: string }[];
    isPromotion: boolean;
  }