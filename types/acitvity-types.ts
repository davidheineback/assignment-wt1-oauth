export interface Activity {
  action_name: string
  created_at: string
  target_title: string
  target_type: string
}

export type ActivityContainer = Array<Activity>