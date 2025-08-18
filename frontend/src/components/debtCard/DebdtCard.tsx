import { History } from "lucide-react"
import type { Debt } from "../../types/types"

interface DebtCardProps {
  debt: Debt
  onClick: (debt: Debt) => void
  onHistoryClick?: (debt: Debt) => void
  formatCurrency: (amount: number) => string
}

export const DebtCard = ({ debt, onClick, onHistoryClick, formatCurrency }: DebtCardProps) => {
  const progressPercentage = ((debt.initialAmount - debt.remainingAmount) / debt.initialAmount) * 100

  const handleHistoryClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onHistoryClick?.(debt)
  }

  return (
    <div
      className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-cyan-500/30 hover:border-cyan-400/60 active:border-cyan-300/80 transition-all duration-300 cursor-pointer group relative overflow-hidden hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
      onClick={() => onClick(debt)}
    >
      {/* Holographic scanning effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Top scanning line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        {/* Side scanning lines */}
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-pulse delay-150" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-pulse delay-300" />
        {/* Corner indicators */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400 animate-pulse delay-75" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400 animate-pulse delay-150" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400 animate-pulse delay-225" />
      </div>

      {/* Hexagonal pattern overlay */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300ffff' fillOpacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="p-4 md:p-6 relative z-10">
        {/* Header with status indicator - mobile optimized */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors font-mono tracking-wide truncate">
              {debt.name.toUpperCase()}
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs text-cyan-400/70 font-mono">ACTIVO</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
            {debt.payments.length > 0 && onHistoryClick && (
              <button
                onClick={handleHistoryClick}
                className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center hover:bg-cyan-500/30 hover:border-cyan-400/70 transition-all duration-200 touch-manipulation"
                title="Ver historial de pagos"
              >
                <History className="w-3 h-3 text-cyan-300" />
              </button>
            )}
            <div className="bg-cyan-500/20 border border-cyan-500/50 rounded px-2 py-1">
              <span className="text-xs font-mono text-cyan-300">
                {debt.remainingAmount === 0 ? "PAGADO" : "PENDIENTE"}
              </span>
            </div>
          </div>
        </div>

        {/* Financial data display - mobile optimized */}
        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-cyan-500/20">
            <span className="text-gray-400 text-xs md:text-sm font-mono">INICIAL:</span>
            <span className="text-white font-semibold font-mono text-sm md:text-base truncate ml-2">
              {formatCurrency(debt.initialAmount)}
            </span>
          </div>

          <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-cyan-500/20">
            <span className="text-gray-400 text-xs md:text-sm font-mono">RESTANTE:</span>
            <span className="text-cyan-300 font-bold text-base md:text-lg font-mono truncate ml-2">
              {formatCurrency(debt.remainingAmount)}
            </span>
          </div>

          {/* Enhanced progress bar with mobile optimization */}
          <div className="mt-3 md:mt-4">
            <div className="flex justify-between text-xs text-gray-400 font-mono mb-2">
              <span>PROGRESO</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 md:h-3 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 h-2 md:h-3 rounded-full transition-all duration-700 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
              {/* Grid overlay on progress bar */}
              <div className="absolute inset-0 opacity-30">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,255,255,0.2) 4px, rgba(0,255,255,0.2) 5px)`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-cyan-500/20">
            <div className="text-xs text-gray-500 font-mono">
              {debt.payments.length} PAGOS
              {debt.payments.length > 0 && (
                <span className="text-cyan-400 ml-1">
                  • ÚLTIMO:{" "}
                  {debt.payments[debt.payments.length - 1]?.date.toLocaleDateString("es-CO", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              )}
            </div>
            <div className="text-xs text-cyan-400 font-mono">ID: {debt.id.padStart(4, "0")}</div>
          </div>
        </div>

        {/* Mobile-optimized hover instruction */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-xs text-cyan-400/70 font-mono bg-black/50 px-2 py-1 rounded border border-cyan-500/30">
            <span className="hidden sm:inline">CLICK PARA GESTIONAR</span>
            <span className="sm:hidden">GESTIONAR</span>
          </div>
        </div>
      </div>

      {/* Animated border glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 blur-sm animate-pulse" />
      </div>
    </div>
  )
}
