import React from 'react'
import type { AppState } from '../lib/storage'

export default function History({state}:{state:AppState}){
  const totalWorkoutDays = state.history.filter(h => h.attended).length
  const splitCounts = state.history.reduce<Record<string, number>>((acc, h) => {
    const key = h.label || 'Unknown'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
  const splitStats = Object.entries(splitCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-3 mb-3">
      <section className="bg-white dark:bg-black p-3 rounded-lg border border-black/15 dark:border-white/20">
        <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">Stats</div>
        <div className="mt-2 rounded-md border border-black/10 dark:border-white/15 p-3 bg-black/[0.02] dark:bg-white/[0.03]">
          <div className="text-[11px] uppercase tracking-wide text-black/55 dark:text-white/55">Workout Days</div>
          <div className="text-2xl font-semibold text-black dark:text-white mt-0.5">{totalWorkoutDays}</div>
        </div>
        {splitStats.length > 0 ? (
          <div className="mt-2 space-y-1.5">
            {splitStats.map(([label, count]) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-black/10 dark:border-white/15 px-3 py-2">
                <span className="text-sm text-black/85 dark:text-white/85 truncate pr-2">{label}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black">{count}x</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-black/60 dark:text-white/60 mt-2">No split stats yet.</div>
        )}
      </section>

      <section className="bg-white dark:bg-black p-3 rounded-lg border border-black/15 dark:border-white/20">
        <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">History</div>
        {state.history.length===0 && <div className="text-black/60 dark:text-white/60 text-xs mt-2">No entries yet.</div>}
        <ul className="mt-2 divide-y divide-black/10 dark:divide-white/10 text-sm">
          {state.history.map((h, i)=> (
            <li key={i} className="py-2.5">
              <div className="font-medium text-black dark:text-white">{h.label}</div>
              {h.description && <div className="text-black/60 dark:text-white/60 text-xs mt-1">{h.description}</div>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
