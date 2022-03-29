import React from "react"
import { ActivityContainer, Activity } from "../types/acitvity-types"

/**
 * JSX component representing TableContent component.
 * Responsible for creating the content of a table
 *
 */
function TableContent({ activities }: { activities: ActivityContainer }) {
  return (
    <>
      <thead>
        <tr>
          <th scope='col'>Index</th>
          <th scope='col'>Action</th>
          <th scope='col'>Created at</th>
          <th scope='col'>Target title</th>
          <th scope='col'>Target type</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity: Activity, index: number) => {
          return (
            <tr key={index}>
              <td scope='row'>{index + 1}</td>
              <td>{activity.action_name}</td>
              <td>{activity.created_at}</td>
              <td>{activity.target_title}</td>
              <td>{activity.target_type}</td>
            </tr>
          )
        })}
      </tbody>
    </>
  )
}

export default TableContent
