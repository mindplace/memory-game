import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Game.scss'

class GameOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      difficulty: "normal",
      cardsPerMove: 2,
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    let value = e.target.value,
        newState = {}
    if (e.target.name == "cardsPerMove") {
      value = parseInt(value)
    }
    newState[e.target.name] = value

    this.setState(newState)
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.props.setOptions(this.state)
    this.setState({ shouldHide: true })
  }

  render() {
    if (this.state.shouldHide) { return null }

    return (
     <div className={styles.optionsFormModal}>
       <h1>Hello!</h1>

       <div>
         <h3>Choose your difficulty:</h3>

         <form className={styles.optionsForm}>
           <div className={styles.choices}>
             <label>
               <input type="radio" name="difficulty" value="normal" checked={this.state.difficulty == "normal"} onChange={this.handleInputChange} />
               Normal Game
             </label>

             <label>
               <input type="radio" name="difficulty" value="easy" onChange={this.handleInputChange} />
               Easy Game
             </label>

             <label>
               <input type="radio" name="cardsPerMove" value="2" checked={this.state.cardsPerMove == 2} onChange={this.handleInputChange} />
               Match 2 Cards Per Move
             </label>

             <label>
               <input type="radio" name="cardsPerMove" value="3" onChange={this.handleInputChange} />
               Match 3 Cards Per Move
             </label>
           </div>

           <button onClick={this.handleFormSubmit}>Play</button>
         </form>
       </div>
     </div>
    )
  }
}

export default GameOptions
