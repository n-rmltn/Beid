export enum TransactionType {
  QR_PAYMENT = "QR_PAYMENT",
  CARD_PAYMENT = "CARD_PAYMENT",
  CASHBACK = "CASHBACK",
  RECEIVE_FUND = "RECEIVE_FUND",
}

export enum CardType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export enum TransactionDirection {
  INCOMING = "INCOMING",
  OUTGOING = "OUTGOING",
}

export interface Transaction {
  id: number;
  title: string;
  amount: string;
  date: string;
  recipientReference?: string;
  transactionType: TransactionType;
  cardType?: CardType;
  direction: TransactionDirection;
  from?: string;
  to?: string;
}
