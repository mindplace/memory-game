import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Game.scss'

const Moves = (props) => (
  <div className={styles.moves}>
    <span className={styles.movesMessage}>Moves:</span>
    <span className={styles.movesCounter}>{props.moves}</span>
  </div>
)

export default Moves
