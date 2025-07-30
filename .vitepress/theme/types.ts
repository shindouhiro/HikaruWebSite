export interface RunningRecord {
  completed: boolean;
  date: string;
  distance: string;
  pace: string;
  duration?: string;
  image: string;
  note?: string;
  day?: number;
}

export interface RunningData {
  [key: number]: RunningRecord;
} 
