import { AppState, DayEntry } from './storage'

export function addHistoryForCurrentDay(state: AppState, description?: string){
  const len = Math.max(1, state.split.length)
  const idx = state.nextIndex % len
  const splitItem = state.split[idx]
  const today = new Date().toISOString().slice(0, 10)
  const normalizedLabel = splitItem?.name ?? `Workout ${idx+1}`

  // Idempotency guard: avoid duplicate entry writes for the same completed split.
  const latest = state.history[0]
  if (
    latest &&
    latest.date === today &&
    (latest.label || '') === normalizedLabel
  ) {
    return state
  }

  const entry: DayEntry = {
    date: today,
    label: normalizedLabel
  }
  state.history.unshift(entry)
  return state
}

export function advanceToNextDay(state: AppState){
  const len = Math.max(1, state.split.length)
  const idx = state.nextIndex % len
  state.nextIndex = (idx + 1) % len
  return state
}

export function markToday(state: AppState, description?: string){
  addHistoryForCurrentDay(state, description)
  advanceToNextDay(state)
  return state
}

export function setSplit(state: AppState, newSplit: {name:string,description?:string}[]){
  state.split = newSplit.length ? newSplit : [{name:'Workout 1'}]
  state.nextIndex = 0
  return state
}
