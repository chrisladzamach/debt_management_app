export interface Payment {
  id: string
  amount: number
  date: Date
  description?: string
}

export interface Debt {
  id: string
  name: string
  initialAmount: number
  remainingAmount: number
  payments: Payment[]
  createdAt: Date
}