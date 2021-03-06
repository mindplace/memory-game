const Utilities = {
  makeCard: ({ number: number, suit: suit }) => {
    let faceCards = {
      1: 'ace',
      11: 'jack',
      12: 'queen',
      13: 'king',
    }

    return {
      suit: suit,
      number: number,
      face: faceCards[number] || null,
    }
  },

  // Fisher-Yates shuffle :)
  // https://estherleytush.com/2017/02/16/implementing-fisher-yates-shuffle.html
  shuffle: (array) => {
    let counter = array.length - 1

    while (counter > 0) {
      let i = Math.floor(Math.random() * (counter + 1))

      let chosenItem = array[counter]
      array[counter] = array[i]
      array[i] = chosenItem

      counter -= 1
    }

    return array
  },

  initializeDeck: ({ difficulty: difficulty, cardsPerMove: cardsPerMove }) => {
    let cardValuesArray, suitsArray

    if (difficulty == "easy") {
      cardValuesArray = [ 10, 11, 12, 13 ]
    } else if (difficulty == "normal") {
      cardValuesArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
    }

    if (cardsPerMove == 3) {
      suitsArray = ['hearts', 'diamonds', 'spades']
    } else if (cardsPerMove == 2) {
      suitsArray = ['hearts', 'diamonds', 'spades', 'clubs']
    }

    let generatedDeck = [].concat.apply([], suitsArray.map(suit => {
      return cardValuesArray.map(number => {
        return Utilities.makeCard({ number: number, suit: suit })
      })
    }))

    return Utilities.shuffle(generatedDeck)
  },

  checkForSameCardValues: (array) => {
    let cardValue = array[0].state.number,
        allIdentical = true

    array.forEach(item => {
      if (item.state.number != cardValue) {
        allIdentical = false
      }
    })

    return allIdentical
  },

  allMatchesFound: (array) => {
    return array.every(card => card.state.removed || card.state.flipped)
  },

  calculateScore: ({ moves: moves, seconds: seconds, cardsPerMove: cardsPerMove, cardsInDeck: cardsInDeck }) => {
    // an augmented version of y = 1 / x
    let baseScore = ((1000000 * cardsInDeck) / seconds) / moves,
        totalScore = baseScore * cardsPerMove

    return Math.ceil(totalScore)
  },
}

export default Utilities
