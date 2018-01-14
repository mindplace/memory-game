import React from 'react'
import PropTypes from 'prop-types'

import styles from './Card.scss'

export const setFrontCardName = (card) => {
  let baseName = ""

  if (card.face !== null) {
    baseName += card.face
  } else {
    baseName += card.number.toString()
  }

  baseName += "_of_"
  baseName += card.suit

  return baseName
}

class Card extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      suit: props.suit,
      number: props.number,
      face: props.face,
      cardName: setFrontCardName(props),
      flipped: props.flipped, // starts on back of card
      clicked: props.clicked,
      removed: props.removed,
    }
  }

  flip(e) {
    this.setState({flipped: !this.state.flipped, clicked: !this.state.clicked})
    this.props.recordCardFlip(this)
  }

  render() {
    if (this.state.removed) {
      return (
        <div className={styles.card}>
          <div className={styles.removed}></div>
        </div>
      )
    }

    let src = ""
    let key = ""

    if (this.state.flipped) {
      src = "card-fronts/" + this.state.cardName + ".png"
    } else {
      src = "card-back.png"
    }

    return (
      <div className={styles.card} flipped={this.state.flipped.toString()} onClick={this.flip.bind(this)}>
        <img src={require("./images/" + src)} />
      </div>
    )
  }
}

export default Card
