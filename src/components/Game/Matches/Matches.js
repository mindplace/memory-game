import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Game.scss'

const Matches = (props) => (
  <div className={styles.matches}>
    <span className={styles.foundMatches}>Matches:</span>
    <span className={styles.matchesCounter}>{props.matches}</span>
  </div>
)

export default Matches
