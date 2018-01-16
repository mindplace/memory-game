import React from 'react'
import PropTypes from 'prop-types'
import Utilities from './Utilities'

import styles from './Game.scss'

import MessageModal from './MessageModal/MessageModal'
import Timer from './Timer/Timer'
import Matches from './Matches/Matches'
import Moves from './Moves/Moves'
import Card from './Card/Card'

const gameOptions = { values: { difficulty: "normal", cardsPerMove: 2 }}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      optionsChosen: false,
      deck: [],
      componentsDeck: [],
      currentFlippedCards: [],
      foundMatches: [],
      moves: 0,
      cardsPerMove: 0,
      totalGameTimeInSeconds: 0,
      winningConditionsMet: false,
    }
  }

  setDifficulty(values) {
    let newDeck = Utilities.initializeDeck({
      difficulty: values.difficulty,
      cardsPerMove: values.cardsPerMove,
    })

    this.setState({
      difficulty: values.difficulty,
      cardsPerMove: values.cardsPerMove,
      optionsChosen: true,
      deck: newDeck,
    })
  }

  checkWinningConditions() {
    if (this.state.deck.length != this.state.componentsDeck.length) { return false }
    if (Utilities.allMatchesFound(this.state.componentsDeck)) {
      this.setState({ winningConditionsMet: true, })
    }
    return this.state.winningConditionsMet
  }

  calculateScore() {
    return Math.ceil(100 / this.state.moves)
  }

  manageReviewingForMatches() {
    let fullMoveCardsFlipped = this.state.currentFlippedCards.length >= this.state.cardsPerMove,
        moreThanFullMoveFlipped = this.state.currentFlippedCards.length > this.state.cardsPerMove,
        cardsMatch = Utilities.checkForSameCardValues(this.state.currentFlippedCards),
        game = this

    if (!fullMoveCardsFlipped) { return }
    if (moreThanFullMoveFlipped) {
      let cardsPerMove = this.state.cardsPerMove
      this.state.currentFlippedCards.forEach((card, i) => {
        if (i < cardsPerMove) { return }
        card.setState({ flipped: false })
      })
    }

    let newMoves = this.state.moves + 1
    this.setState({ moves: newMoves })

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
      game.checkWinningConditions()
    }, 600)
  }

  recordCardFlip(card) {
    let cardIsAlreadyFlipped = this.state.currentFlippedCards.indexOf(card) > -1
    if (cardIsAlreadyFlipped) {
      this.setState({ currentFlippedCards: [] })
      return card.setState({ flipped: false })
    }

    if (this.state.componentsDeck.indexOf(card) == -1) {
      this.state.componentsDeck.push(card)
    }

    this.state.currentFlippedCards.push(card)
    this.manageReviewingForMatches()
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>NYT Games Code Test: Memory</h1>

          <div className={styles.rightSide}>
            <Timer shouldStart={this.state.optionsChosen}
                   shouldStop={this.state.winningConditionsMet} />

            <Matches matches={this.state.foundMatches.length} />

            <Moves moves={this.state.moves} />
          </div>
        </div>

        <div className={styles.board}>
          {this.state.deck.map((card, i) => <Card {...card} key={i} recordCardFlip={this.recordCardFlip.bind(this)} />)}
        </div>

        <footer className={styles.footer}>
          Card image is from <a href="https://www.artofplay.com/products/peak-playing-cards%20" target="_blank">Art of Play</a>
        </footer>

        <MessageModal {...gameOptions} setOptions={this.setDifficulty.bind(this)} />
        <MessageModal winningConditions={this.state.winningConditionsMet} score={this.calculateScore()} />
      </div>
    )
  }
}

export default Game
