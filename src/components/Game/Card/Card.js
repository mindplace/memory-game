import React from 'react'
import PropTypes from 'prop-types'

import styles from './Card.scss'

class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      suit: props.suit,
      number: props.number,
      face: props.face,
    }
  }

  render() {
    return (
      <div className={styles.card}>
      </div>
    )
  }

}

export default Card
