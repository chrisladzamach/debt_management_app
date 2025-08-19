import { DebtCard } from "../debtCard/DebdtCard"
// import { useState } from "react"
import { Activity, Menu, X, Shield, Database, Plus } from 'lucide-react'
// import type { Debt } from "../../types/types"

export const Header = ({ currentTime, formatCurrency, debts, setShowMobileMenu, setShowAddDebtModal, setSelectedDebt }) => {

  return (
    <div className="relative z-10 container mx-auto px-4 py-4 md:py-8">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center relative">
              <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white rounded-sm" />
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DEBT MANAGER
              </h1>
              <p className="text-cyan-300/70 text-xs md:text-sm font-mono">SISTEMA DE GESTIÓN FINANCIERA</p>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              // variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 p-2 size-sm"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" /> }
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono text-green-400">ONLINE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400">SECURE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono text-blue-400">REGISTROS</span>
            </div>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => setShowAddDebtModal(true)}
              className="bg-gradient-to-r cursor-pointer from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105"
            >
              <Plus className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              <span className="hidden lg:inline">NUEVA DEUDA</span>
              <span className="lg:hidden">NUEVA</span>
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden bg-gradient-to-r from-gray-900/95 to-black/95 border border-cyan-500/50 rounded-lg p-4 mb-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-xs font-mono text-green-400">ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400">SECURE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono text-blue-400">{debts.length} REGISTROS</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-cyan-400">HORA:</span>
                <span className="text-xs font-mono text-cyan-300">
                  {currentTime.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setShowAddDebtModal(true)
                setShowMobileMenu(false)
              }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-semibold py-3 rounded-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              NUEVA DEUDA
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-lg p-3 md:p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-cyan-500/10 rounded-full -mr-6 md:-mr-8 -mt-6 md:-mt-8" />
            <div className="relative">
              <div className="text-xs text-cyan-400 font-mono mb-1">DEUDAS</div>
              <div className="text-xl md:text-2xl font-bold text-white font-mono">{debts.length}</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-lg p-3 md:p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-blue-500/10 rounded-full -mr-6 md:-mr-8 -mt-6 md:-mt-8" />
            <div className="relative">
              <div className="text-xs text-cyan-400 font-mono mb-1">INICIAL</div>
              <div className="text-sm md:text-lg font-bold text-white font-mono truncate">
                {/* {formatCurrency(totalDebt)} */}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-lg p-3 md:p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-green-500/10 rounded-full -mr-6 md:-mr-8 -mt-6 md:-mt-8" />
            <div className="relative">
              <div className="text-xs text-cyan-400 font-mono mb-1">PAGADO</div>
              <div className="text-sm md:text-lg font-bold text-green-400 font-mono truncate">
                {/* {formatCurrency(totalPaid)} */}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-lg p-3 md:p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-red-500/10 rounded-full -mr-6 md:-mr-8 -mt-6 md:-mt-8" />
            <div className="relative">
              <div className="text-xs text-cyan-400 font-mono mb-1">PENDIENTE</div>
              <div className="text-sm md:text-lg font-bold text-red-400 font-mono truncate">
                {/* {formatCurrency(totalRemaining)} */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-cyan-400/70 border-t border-cyan-500/20 pt-3 md:pt-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="hidden sm:inline">SISTEMA ACTIVO</span>
            <span className="sm:hidden">ACTIVO</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="hidden sm:inline">CONEXIÓN ESTABLE</span>
              <span className="sm:hidden">ESTABLE</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline">HORA DEL SISTEMA:</span>
            <span className="sm:hidden">HORA:</span>
            <span className="text-cyan-300">
              {currentTime.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 pb-20 md:pb-8">
        {debts.map((debt, index) => (
          <div key={debt.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <DebtCard
              debt={debt}
              onClick={(debt) => {
                setSelectedDebt(debt)
                setShowPaymentModal(true)
              }}
              onHistoryClick={(debt) => {
                setSelectedDebt(debt)
                setShowHistoryModal(true)
              }}
              formatCurrency={formatCurrency}
            />
          </div>
        ))}
      </div>

      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500/30 rounded-full animate-ping" />
          <button
            // onClick={() => setShowAddDebtModal(true)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/50 transition-all duration-300 active:scale-95 touch-manipulation"
          >
            <Plus className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  )
}
