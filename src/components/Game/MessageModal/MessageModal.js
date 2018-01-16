import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Game.scss'

const GameOptionsForm = ({ handleChange: handleChange, handleSubmit: handleSubmit }) => {
  return (
    <div className={styles.optionsFormModal}>
      <h1>Hello!</h1>

      <div>
        <h3>Choose your difficulty:</h3>

        <form className={styles.optionsForm}>
          <div className={styles.choices}>
            <label>
              <input type="radio" name="difficulty" value="normal" checked={true} onChange={handleChange} />
              Normal Game
            </label>

            <label>
              <input type="radio" name="difficulty" value="easy" onChange={handleChange} />
              Easy Game
            </label>

            <label>
              <input type="radio" name="cardsPerMove" value="2" checked={true} onChange={handleChange} />
              Match 2 Cards Per Move
            </label>

            <label>
              <input type="radio" name="cardsPerMove" value="3" onChange={handleChange} />
              Match 3 Cards Per Move
            </label>
          </div>

          <button onClick={handleSubmit}>Play</button>
        </form>
      </div>
    </div>
  )
}

class MessageModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // Form modal
      values: props.values,
      setOptions: props.setOptions,
      shouldHide: props.shouldHide,

      // Win modal
      winningConditions: props.winningConditions,
      score: props.score,
    }
  }

  handleInputChange(e) {
    this.state.values[e.target.name] = e.target.value
    if (e.target.name == "cardsPerMove") {
      this.state.values.cardsPerMove = parseInt(this.state.values.cardsPerMove)
    }
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.state.setOptions(this.state.values)
    this.state.shouldHide = true
  }

  render() {
    if (this.state.setOptions && !this.state.shouldHide) {
      return (
        <GameOptionsForm handleChange={this.handleInputChange.bind(this)}
                         handleSubmit={this.handleFormSubmit.bind(this)} />
      )
    }
    let that = this 
    debugger
    if (this.state.winningConditions) {
      return (
        <div className={styles.winningMessage}>
          <h1>You Won!</h1>
          <h3>Score: {this.state.score}</h3>
        </div>
      )
    }

    return null
  }
}

export default MessageModal
