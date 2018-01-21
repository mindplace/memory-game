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
      cardsFlippedTime: 600,
      deck: [],
      cardsOutOfTheGame: [],
      currentFlippedCards: [],
      foundMatches: [],
      moves: 0,
      cardsPerMove: 0,
      moveInProgress: false,
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
    if (cardIsAlreadyFlipped || this.state.moveInProgress) {
      let currentFlippedCards = this.state.currentFlippedCards,
          cardIndex = currentFlippedCards.indexOf(card)
      this.setState({ currentFlippedCards: currentFlippedCards.splice(cardIndex, 1) })
      return card.setState({ flipped: false })
    }

    if (this.state.moves == 0) { // first move
      this.setState({ gameHasStarted: true })
    }

    let newFlippedCards = this.state.currentFlippedCards
    newFlippedCards.push(card)
    this.setState({ currentFlippedCards: newFlippedCards }, this.manageReviewingForMatches)
  }

  manageReviewingForMatches() {
    let tooFewFlipped = this.state.currentFlippedCards.length < this.state.cardsPerMove,
        tooManyFlipped = this.state.currentFlippedCards.length > this.state.cardsPerMove,
        correctNumFlipped = this.state.currentFlippedCards.length === this.state.cardsPerMove

    if (tooFewFlipped || this.state.moveInProgress) { return }
    if (correctNumFlipped) {
      let newMoves = this.state.moves + 1
      this.setState({ moves: newMoves, moveInProgress: true })
    }

    let currentFlippedCards = this.state.currentFlippedCards.slice(0, this.state.cardsPerMove),
        cardsMatch = Utilities.checkForSameCardValues(currentFlippedCards)

    let game = this
    setTimeout(() => {
      let additionalFlippedCards = game.state.currentFlippedCards.slice(game.state.cardsPerMove, game.state.currentFlippedCards.length)

      if (cardsMatch) {
        currentFlippedCards.forEach(card => card.setState({ removed: true }))
        let totalFoundMatches = currentFlippedCards.concat(game.state.foundMatches)
        game.setState({ foundMatches: totalFoundMatches })
      } else {
        currentFlippedCards.forEach(card => card.setState({ flipped: false }))
      }

      game.setState({ currentFlippedCards: additionalFlippedCards, moveInProgress: false })
      game.checkWinningConditions()
    }, game.state.cardsFlippedTime)
  }

  checkWinningConditions() {
    if (this.state.deck.length != this.state.cardsOutOfTheGame.length) { return false }
    if (Utilities.allMatchesFound(this.state.cardsOutOfTheGame)) {
      this.setState({ winningConditionsMet: true })
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
        <div className={this.state.optionsChosen ? styles.header : styles.hidden}>
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

        <footer className={this.state.optionsChosen ? styles.footer : styles.hidden}>
          Card image is from <a href="https://www.artofplay.com/products/peak-playing-cards%20" target="_blank">Art of Play</a>
        </footer>
      </div>
    )
  }
}

Game.propTypes = {
  optionsChosen:          PropTypes.bool,
  gameHasStarted:         PropTypes.bool,
  cardsFlippedTime:       PropTypes.number,
  deck:                   PropTypes.array,
  cardsOutOfTheGame:      PropTypes.array,
  currentFlippedCards:    PropTypes.array,
  foundMatches:           PropTypes.array,
  moves:                  PropTypes.number,
  cardsPerMove:           PropTypes.number,
  moveInProgress:         PropTypes.bool,
  totalGameTimeInSeconds: PropTypes.number,
  winningConditionsMet:   PropTypes.bool,
}

export default Game
