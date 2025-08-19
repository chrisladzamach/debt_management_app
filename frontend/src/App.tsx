import { useState, useEffect } from 'react'

import { LoadingSystemView } from './views/LoadingSystemView'
import { Header } from './components/Header/Header'
import { PaymentModal } from './components/PaymentModal'
import { PaymentHistoryModal } from './components/PaymentHistoryModal'

export const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showAddDebtModal, setShowAddDebtModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [showHistoryModal, setShowHistoryModal] = useState(false)

  const [debts, setDebts] = useState<Debt[]>([
    // Sample data for development
    {
      id: "1",
      name: "Préstamo Personal",
      initialAmount: 50000,
      remainingAmount: 35000,
      payments: [
        {
          id: "1",
          amount: 15000,
          date: new Date("2024-01-15"),
          description: "Pago inicial",
        },
      ],
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      name: "Tarjeta de Crédito",
      initialAmount: 25000,
      remainingAmount: 18500,
      payments: [
        {
          id: "2",
          amount: 6500,
          date: new Date("2024-02-01"),
          description: "Pago mensual",
        },
      ],
      createdAt: new Date("2024-01-10"),
    },
  ])

  const addDebt = (name: string, amount: number) => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name,
      initialAmount: amount,
      remainingAmount: amount,
      payments: [],
      createdAt: new Date(),
    }
    setDebts((prev) => [...prev, newDebt])
    setShowAddDebtModal(false)
  }

  const makePayment = (debtId: string, amount: number) => {
    setDebts((prev) =>
      prev.map((debt) => {
        if (debt.id === debtId) {
          const newPayment: Payment = {
            id: Date.now().toString(),
            amount,
            date: new Date(),
            description: `Abono de $${amount.toLocaleString()}`,
          }
          return {
            ...debt,
            remainingAmount: Math.max(0, debt.remainingAmount - amount),
            payments: [...debt.payments, newPayment],
          }
        }
        return debt
      }),
    )
    setShowPaymentModal(false)
    setSelectedDebt(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalDebt = debts.reduce((sum, debt) => sum + debt.initialAmount, 0)
  const totalRemaining = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0)
  const totalPaid = totalDebt - totalRemaining

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(timeInterval)
    }
  }, [])

  if (isLoading) {
    return (
      <LoadingSystemView />
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20" />
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <Header currentTime={currentTime} totalPaid={totalPaid}  formatCurrency={formatCurrency} debts={debts} />
      <PaymentModal
        debt={selectedDebt!}
        isOpen={showPaymentModal && selectedDebt !== null}
        onClose={() => {
          setShowPaymentModal(false)
          setSelectedDebt(null)
        }}
        onPayment={makePayment}
        formatCurrency={formatCurrency}
      />

      <PaymentHistoryModal
        debt={selectedDebt!}
        isOpen={showHistoryModal && selectedDebt !== null}
        onClose={() => {
          setShowHistoryModal(false)
          setSelectedDebt(null)
        }}
        formatCurrency={formatCurrency}
      />
    </div>
  )
}
