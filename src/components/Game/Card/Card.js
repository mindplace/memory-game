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
    }
  }

  flipCard() {
    console.log("flipped")
  }

  render() {
    return (
      <div className={styles.card}>
        <img className={styles.back}
             onClick={this.flipCard}
             src={require("./images/card-back.png")} />

        <img className={styles.front}
             onClick={this.flipCard}
             src={require("./images/card-fronts/" + this.state.cardName + ".png")} />
      </div>
    )
  }
}

export default Card
