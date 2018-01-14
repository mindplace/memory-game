import React from 'react'
import PropTypes from 'prop-types'
import Utilities from './Utilities'

import styles from './Game.scss'

import Timer from '../Timer/Timer'
import Matches from '../Matches/Matches'
import Card from './Card/Card'

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      deck: Utilities.initializeDeck(),
      currentFlippedCards: [],
      foundMatches: [],
    }
  }

  manageReviewingForMatches() {
    let twoCardsFlipped = this.state.currentFlippedCards.length >= 2,
        moreThanTwoFlipped = this.state.currentFlippedCards.length > 2,
        cardsMatch = Utilities.checkForSameCardValues(this.state.currentFlippedCards),
        game = this

    if (!twoCardsFlipped) { return }
    if (moreThanTwoFlipped) {
      this.state.currentFlippedCards.forEach((card, i) => {
        if (i < 2) { return }
        card.setState({ flipped: false })
      })
    }

    if (cardsMatch) {
      this.state.foundMatches.push(this.state.currentFlippedCards)
    }

    setTimeout(() => {
      if (cardsMatch) {
        game.state.currentFlippedCards.forEach(card => card.setState({ removed: true }))
      } else {
        game.state.currentFlippedCards.forEach(card => card.setState({ flipped: false }))
      }

      game.setState({ currentFlippedCards: [] })
    }, 600)
  }

  recordCardFlip(card) {
    let cardIsAlreadyFlipped = this.state.currentFlippedCards.indexOf(card) > -1
    if (cardIsAlreadyFlipped) {
      this.setState({ currentFlippedCards: [] })
      return card.setState({ flipped: false })
    }

    this.state.currentFlippedCards.push(card)
    this.manageReviewingForMatches()
  }

  recordFoundMatches() {
    return this.state.matches.length
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>NYT Games Code Test: Memory</h1>

          <div className={styles.rightSide}>
            <Timer />
            <Matches matches={this.state.foundMatches.length}/>
          </div>
        </div>

        <div className={styles.board}>
          {this.state.deck.map((card, i) => <Card {...card} key={i} recordCardFlip={this.recordCardFlip.bind(this)}/>)}
        </div>

        <footer className={styles.footer}>Card backs image is a photo by <a href="https://unsplash.com/@yogidan2012" target="_blank">Daniele Levis Pelusi</a> on <a href="https://unsplash.com" target="_blank">Unsplash</a>.
        </footer>
      </div>
    )
  }
}

export default Game
