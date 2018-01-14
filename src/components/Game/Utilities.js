module.exports = {
  makeCard: (number, suit) => {
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

  initializeDeck: () => {
    let suitsArray = ['hearts', 'diamonds', 'spades', 'clubs'],
        cardValuesArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]

    let generatedDeck = [].concat.apply([], suitsArray.map(suit => {
      return cardValuesArray.map(number => {
        let additionalProps = {flipped: false, clicked: false, removed: false},
            builtCard = module.exports.makeCard(number, suit)
        return Object.assign(additionalProps, builtCard)
      })
    }))

    return module.exports.shuffle(generatedDeck)
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
}
