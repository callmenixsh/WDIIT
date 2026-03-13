import React from 'react'
import TodayCard from '../components/TodayCard'
import { AppState } from '../lib/storage'

type HomeProps = {
  state: AppState
  onStartWorkout: (desc?: string) => void
  onDoTomorrow: () => void
  actionState: 'idle' | 'in-progress' | 'completed'
  actionLabel: string
}

export default function Home({
  state,
  onStartWorkout,
  onDoTomorrow,
  actionState,
  actionLabel,
}: HomeProps) {
  return (
    <TodayCard
      state={state}
      onMark={onStartWorkout}
      onDoTomorrow={onDoTomorrow}
      actionState={actionState}
      actionLabel={actionLabel}
    />
  )
}
