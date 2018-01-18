import React from 'react'
import PropTypes from 'prop-types'
import Utilities from './Utilities'

import styles from './Game.scss'

import Card from './Card/Card'
import GameOptions from './GameOptions/GameOptions'
import WinMessage from './WinMessage/WinMessage'
import Moves from './Moves/Moves'
import Timer from './Timer/Timer'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      optionsChosen: false,
      gameHasStarted: false,
      deck: [],
      cardsOutOfTheGame: [],
      currentFlippedCards: [],
      foundMatches: [],
      moves: 0,
      cardsPerMove: 0,
      totalGameTimeInSeconds: 0,
      winningConditionsMet: false,
    }

    this.setDifficulty = this.setDifficulty.bind(this)
    this.recordCardFlip = this.recordCardFlip.bind(this)
    this.scoreGame = this.scoreGame.bind(this)
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

  recordCardFlip(card) {
    let cardIsAlreadyFlipped = this.state.currentFlippedCards.indexOf(card) > -1
    if (cardIsAlreadyFlipped) {
      this.setState({ currentFlippedCards: [] })
      return card.setState({ flipped: false })
    }

    if (this.state.moves == 0) { // first move
      this.setState({ gameHasStarted: true })
    }

    if (this.state.cardsOutOfTheGame.indexOf(card) == -1) {
      let newcardsOutOfTheGame = this.state.cardsOutOfTheGame
      newcardsOutOfTheGame.push(card)
      this.setState({ cardsOutOfTheGame: newcardsOutOfTheGame })
    }

    let newFlippedCards = this.state.currentFlippedCards
    newFlippedCards.push(card)
    this.setState({ currentFlippedCards: newFlippedCards })
    this.manageReviewingForMatches()
  }

  manageReviewingForMatches() {
    let that = this
    let tooManyFlipped = this.state.currentFlippedCards.length > this.state.cardsPerMove,
        tooFewFlipped = this.state.currentFlippedCards.length !== this.state.cardsPerMove

    if (tooManyFlipped || tooFewFlipped) {
      let extraCards = this.state.currentFlippedCards.slice(this.state.cardsPerMove - 1, this.state.currentFlippedCards.length)
      return
    }

    let cardsMatch = Utilities.checkForSameCardValues(this.state.currentFlippedCards),
        game = this

    let newMoves = this.state.moves + 1
    this.setState({ moves: newMoves })

    if (cardsMatch) {
      this.state.foundMatches.push(this.state.currentFlippedCards)
    }

    setTimeout(() => {
      let matchingCards = game.state.currentFlippedCards.slice(0, game.state.cardsPerMove),
          additionalFlippedCards = game.state.currentFlippedCards.slice(game.state.cardsPerMove, game.state.currentFlippedCards.length)

      if (cardsMatch) {
        matchingCards.forEach(card => card.setState({ removed: true }))
      } else {
        matchingCards.forEach(card => card.setState({ flipped: false }))
      }

      game.setState({ currentFlippedCards: additionalFlippedCards })
      game.checkWinningConditions()
    }, 600)
  }

  checkWinningConditions() {
    if (this.state.deck.length != this.state.cardsOutOfTheGame.length) { return false }
    if (Utilities.allMatchesFound(this.state.cardsOutOfTheGame)) {
      this.setState({ winningConditionsMet: true, })
    }
    return this.state.winningConditionsMet
  }

  scoreGame(timerState){
    this.setState({
      score: Utilities.calculateScore({
        moves: this.state.moves,
        seconds: timerState.secondsElapsed,
        cardsPerMove: this.state.cardsPerMove,
        cardsInDeck: this.state.deck.length,
      }),
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Memory</h1>

          <div className={styles.rightSide}>
            <Timer shouldStart={this.state.gameHasStarted}
                   shouldStop={this.state.winningConditionsMet}
                   emitTotalTime={this.scoreGame} />

            <Moves moves={this.state.moves} />
          </div>
        </div>

        <GameOptions setOptions={this.setDifficulty} />

        <div className={styles.board}>
          {this.state.deck.map((card, i) => <Card {...card} key={i} recordCardFlip={this.recordCardFlip} />)}
        </div>

        <WinMessage winningConditions={this.state.winningConditionsMet}
                    score={this.state.score} />

        <footer className={styles.footer}>
          Card image is from <a href="https://www.artofplay.com/products/peak-playing-cards%20" target="_blank">Art of Play</a>
        </footer>
      </div>
    )
  }
}

export default Game
