import React from 'react'
import PropTypes from 'prop-types'

import styles from './WinMessage.scss'
import gameStyles from '../Game.scss'

function WinMessage(props) {
  if (!props.winningConditions) { return null }

  return (
    <div className={styles.winningMessage}>
      <h1>"Time moves in one direction,<br/>memory in another."</h1>
      <h2>William Gibson</h2>
      <h3>Your score: {props.score}</h3>

      <button onClick={() => window.location.reload() }>Play Again</button>
    </div>
  )
}

export default WinMessage
