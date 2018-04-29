import React from 'react'
import PropTypes from 'prop-types'

import Timer from '../Timer/Timer'
import styles from './Game.scss'

export const makeCard = (number: number, suit: suit) => {
  let faceCards = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K',
  }

  return {
    suit: suit,
    number: number,
    face: faceCards[number] || null,
  }
}

// Fisher-Yates shuffle :)
// https://estherleytush.com/2017/02/16/implementing-fisher-yates-shuffle.html
export const shuffleDeck = (deck) => {
  let counter = deck.length - 1

  while (counter > 0) {
    let i = Math.floor(Math.random() * (counter + 1))

    let chosenItem = deck[counter]
    deck[counter] = deck[i]
    deck[i] = chosenItem

    counter -= 1
  }

  return deck
}

export const initializeDeck = () => {
  let suitsArray = ['heart', 'diamond', 'spade', 'club']
  let cardValuesArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]

  let generatedDeck = [].concat.apply([], suitsArray.map(suit => {
    return cardValuesArray.map(number => makeCard(number, suit))
  }))

  return shuffleDeck(generatedDeck)
}

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      deck: initializeDeck(),
    }
  }

  render() {
    const deck = this.state.deck

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>NYT Games Code Test: Memory</h1>
          <Timer />
        </div>

        <div className={styles.board}>Built {deck.length} cards</div>
      </div>
    )
  }
}

export default Game
