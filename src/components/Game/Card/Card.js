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

  return baseName + "_of_" + card.suit
}

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suit: props.suit,
      number: props.number,
      face: props.face,
      cardName: setFrontCardName(props),
      flipped: false, // starts on back of card
      clicked: false,
      removed: false,
    }

    this.flip = this.flip.bind(this)
  }

  flip(e) {
    this.setState({ flipped: !this.state.flipped, clicked: !this.state.clicked })
    this.props.recordCardFlip(this)
  }

  determineImageSRC() {
    if (this.state.flipped) {
      return "card-fronts/" + this.state.cardName + ".png"
    } else {
      return "card-back.png"
    }
  }

  render() {
    if (this.state.removed) {
      return (
        <div className={styles.card}>
          <div className={styles.removed}></div>
        </div>
      )
    }

    return (
      <div className={styles.card} flipped={this.state.flipped.toString()} onClick={this.flip}>
        <img src={require("./images/" + this.determineImageSRC())} />
      </div>
    )
  }
}

Card.propTypes = {
  suit:     PropTypes.string,
  number:   PropTypes.number,
  face:     PropTypes.string,
  cardName: PropTypes.func,
  flipped:  PropTypes.bool,
  clicked:  PropTypes.bool,
  removed:  PropTypes.bool,
}

export default Card
