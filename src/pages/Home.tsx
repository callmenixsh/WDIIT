import React from 'react'
import TodayCard from '../components/TodayCard'
import { AppState } from '../lib/storage'

type HomeProps = {
  state: AppState
  onStartWorkout: () => void
  onDoTomorrow: () => void
  onSwitchToNextDay: () => void
  actionState: 'idle' | 'in-progress' | 'ready-next-day'
  actionLabel: string
  lastWorkoutDate: string
}

export default function Home({
  state,
  onStartWorkout,
  onDoTomorrow,
  onSwitchToNextDay,
  actionState,
  actionLabel,
  lastWorkoutDate,
}: HomeProps) {
  return (
    <TodayCard
      state={state}
      onMark={onStartWorkout}
      onDoTomorrow={onDoTomorrow}
      onSwitchToNextDay={onSwitchToNextDay}
      actionState={actionState}
      actionLabel={actionLabel}
      lastWorkoutDate={lastWorkoutDate}
    />
  )
}
