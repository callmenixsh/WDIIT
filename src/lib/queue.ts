import { AppState, DayEntry } from './storage'

export function addHistoryForCurrentDay(state: AppState, description?: string){
  const len = Math.max(1, state.split.length)
  const idx = state.nextIndex % len
  const splitItem = state.split[idx]
  const entry: DayEntry = {
    date: '',
    splitIndex: idx,
    label: splitItem?.name ?? `Day ${idx+1}`,
    description: description?.trim() || undefined,
    attended: true
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
  state.split = newSplit.length ? newSplit : [{name:'Day 1'}]
  state.nextIndex = 0
  return state
}

export function totalAttended(state: AppState){
  return state.history.filter(h => h.attended).length
}
