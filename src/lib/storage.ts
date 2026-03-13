export type DayEntry = {
  date: string // ISO date
  splitIndex: number
  label: string
  description?: string
  attended: boolean
}

export type SplitItem = {
  name: string
  description?: string
}

export type AppState = {
  split: SplitItem[]
  nextIndex: number
  history: DayEntry[]
}

const KEY = 'wdiit.state.v1'

export const defaultState = (): AppState => ({
  split: [
    {name: 'Push'},
    {name: 'Pull'},
    {name: 'Legs'}
  ],
  nextIndex: 0,
  history: []
})

export function loadState(): AppState {
  try{
    const raw = localStorage.getItem(KEY)
    if(!raw) return defaultState()
    const parsed = JSON.parse(raw)
    // migrate old format where split was string[]
    if(parsed && Array.isArray(parsed.split) && parsed.split.length && typeof parsed.split[0] === 'string'){
      parsed.split = parsed.split.map((s:string)=>({name:s}))
    }
    return parsed as AppState
  }catch(e){
    console.error('loadState',e)
    return defaultState()
  }
}

export function saveState(s: AppState){
  localStorage.setItem(KEY, JSON.stringify(s))
}

export function exportJSON(s: AppState){
  return JSON.stringify(s, null, 2)
}

export function importJSON(json: string): AppState | null{
  try{
    const parsed = JSON.parse(json)
    if(!parsed) return null
    // accept both string[] and object[] for split
    if(!Array.isArray(parsed.split)) return null
    if(parsed.split.length && typeof parsed.split[0] === 'string'){
      parsed.split = parsed.split.map((s:string)=>({name:s}))
    }
    if(typeof parsed.nextIndex !== 'number') parsed.nextIndex = 0
    if(!Array.isArray(parsed.history)) parsed.history = []
    return parsed as AppState
  }catch(e){
    return null
  }
}
