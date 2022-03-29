import React from "react"
import styles from "../styles/Home.module.css"
import { Spinner } from "react-bootstrap"

/**
 * JSX component representing a Loader component.
 * Spinner to be shown as pre-loader on pages.
 *
 */
function Loader() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    </main>
  )
}

export default Loader
