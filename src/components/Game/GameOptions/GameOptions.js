import React from 'react'
import PropTypes from 'prop-types'

import styles from './GameOptions.scss'

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
    // manually toggle e.target.value
    e.target.value = (e.target.value == "on" ? "off" : "on")

    let newState = {},
        value = e.target.value

    if (e.target.name == "cardsPerMove") {
      value = (value == "on" ? 2 : 3)
    }

    if (e.target.name == "difficulty") {
      value = (value == "on" ? "normal" : "easy")
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
     <div className={styles.optionsScreen}>
       <h2 className={styles.topperTitle}>There is so much we have forgotten.</h2>
       <h1 className={styles.title}>Memory</h1>

       <form className={styles.optionsForm}>
         <div className={styles.choices}>

           <div className={styles.choiceSection}>
             <div className={styles.leftChoice}>normal</div>

             <label className={styles.switch}>
               <input type="checkbox" onChange={this.handleInputChange} name="difficulty" />
               <span className={styles.slider}></span>
             </label>

             <div className={styles.rightChoice}>easy</div>
           </div>

           <div className={styles.choiceSection}>
             <div className={styles.leftChoice}>2 cards</div>

             <label className={styles.switch}>
               <input type="checkbox" onChange={this.handleInputChange} name="cardsPerMove" />
               <span className={styles.slider}></span>
             </label>

             <div className={styles.rightChoice}>3 cards</div>
           </div>

         </div>

         <button onClick={this.handleFormSubmit}>Play</button>
       </form>
     </div>
    )
  }
}

export default GameOptions
