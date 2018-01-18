import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Game.scss'

function WinMessage(props) {
  if (!props.winningConditions) { return null }

  return (
    <div className={styles.winningMessage}>
      <h1>You Won!</h1>
      <h3>Score: {props.score}</h3>
    </div>
  )
}

export default WinMessage
