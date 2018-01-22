import Utilities from './Utilities'

describe('makeCard', () => {
  let makeCard = Utilities.makeCard

  it('should return a card object based on given values', () => {
    let expectedCard = {
      suit: 'hearts',
      face: 'king',
      number: 13,
    }

    expect(makeCard({ suit: expectedCard.suit, number: expectedCard.number })).toMatchObject(expectedCard);
  })
})

describe('shuffle', () => {
  let shuffle = Utilities.shuffle

  it('should return an array of items in a different order than given', () => {
    let initialArray = [1, 2, 3, 4, 5],
        arrayCollection = []

    let counter = 0
    while (counter < 5) {
      // The shuffle is in-place, so have to make array copies to compare different shuffle outputs
      arrayCollection.push(shuffle(initialArray.slice(0)))
      counter ++
    }

    for(var i=1; i < arrayCollection.length; i++) {
      let previousArray = arrayCollection[i - 1],
          currentArray = arrayCollection[i]

      expect(previousArray).not.toEqual(currentArray)
      expect(previousArray.length).toEqual(currentArray.length)
      expect(previousArray).toContainEqual(currentArray[0])
    }
  })
})

describe('initializeDeck', () => {
  let initializeDeck = Utilities.initializeDeck,
      returnedDeck

  it('should return a deck of card objects that will be card props', () => {
    returnedDeck = initializeDeck({ difficulty: "easy", cardsPerMove: 2 })
    let firstCard = returnedDeck[0]

    expect(firstCard.suit).toEqual(expect.stringMatching(/(hearts|diamonds|spades|clubs)/))
  })

  it('should return a deck of 16 cards when difficulty == "easy" and cardsPerMove == 2', () => {
    returnedDeck = initializeDeck({ difficulty: "easy", cardsPerMove: 2 })
    expect(returnedDeck.length).toBe(16)
  })

  it('should return a deck of 12 cards when difficulty == "easy" and cardsPerMove == 3', () => {
    returnedDeck = initializeDeck({ difficulty: "easy", cardsPerMove: 3 })
    expect(returnedDeck.length).toBe(12)
  })

  it('should return a deck of 52 cards when difficulty == "normal" and cardsPerMove == 2', () => {
    returnedDeck = initializeDeck({ difficulty: "normal", cardsPerMove: 2 })
    expect(returnedDeck.length).toBe(52)
  })

  it('should return a deck of 39 cards when difficulty == "normal" and cardsPerMove == 3', () => {
    returnedDeck = initializeDeck({ difficulty: "normal", cardsPerMove: 3 })
    expect(returnedDeck.length).toBe(39)
  })
})

describe('checkForSameCardValues', () => {
  let checkForSameCardValues = Utilities.checkForSameCardValues,
      deckOfMatchingCards = [
        { state: { number: 2 } },
        { state: { number: 2 } },
      ],
      deckOfUnmatchingCards = [
        { state: { number: 3 } },
        { state: { number: 4 } },
      ]

  it('returns false if all cards do not match', () => {
    expect(checkForSameCardValues(deckOfUnmatchingCards)).toEqual(false)
  })

  it('returns true if all cards match', () => {
    expect(checkForSameCardValues(deckOfMatchingCards)).toEqual(true)
  })

  it('does not mutate the deck', () => {
    let originalDeck = deckOfMatchingCards.slice(0)
    checkForSameCardValues(deckOfMatchingCards)
    expect(deckOfMatchingCards).toEqual(originalDeck)
  })
})

describe('allMatchesFound', () => {
  let allMatchesFound = Utilities.allMatchesFound,
      deckOfFlippedOrRemovedCards = [
        { state: { removed: false, flipped: true } },
        { state: { removed: true, flipped: false } },
      ],
      deckOfVariatingCards = [
        { state: { removed: true, flipped: true } },
        { state: { removed: false, flipped: false } },
      ]

  it('returns true if all cards are either flipped or removed', () => {
    expect(allMatchesFound(deckOfFlippedOrRemovedCards)).toEqual(true)
  })

  it('returns false if not every card is either flipped or removed', () => {
    expect(allMatchesFound(deckOfVariatingCards)).toEqual(false)
  })

  it('does not mutate the deck', () => {
    let originalDeck = deckOfVariatingCards.slice(0)
    allMatchesFound(deckOfVariatingCards)
    expect(deckOfVariatingCards).toEqual(originalDeck)
  })
})

describe('calculateScore', () => {
  let calculateScore = Utilities.calculateScore,
      scoreValues = { moves: 50, seconds: 600, cardsPerMove: 2, cardsInDeck: 52 },
      originalScore = calculateScore(scoreValues)

  it('returns a score that is affected by number of moves', () => {
    let betterMovesScoreValues = Object.assign({}, scoreValues)
    betterMovesScoreValues.moves = 30
    expect(originalScore).toBeLessThan(calculateScore(betterMovesScoreValues))
  })

  it('returns a score that is affected by length of gameplay time', () => {
    let betterTimeScoreValues = Object.assign({}, scoreValues)
    betterTimeScoreValues.seconds = 100
    expect(originalScore).toBeLessThan(calculateScore(betterTimeScoreValues))
  })

  it('returns a score that is affected by number of cards in the deck', () => {
    let worseDeckValues = Object.assign({}, scoreValues)
    worseDeckValues.cardsInDeck = 16
    expect(originalScore).toBeGreaterThan(calculateScore(worseDeckValues))
  })

  it('returns a score that is affected by number of cards matched per turn', () => {
    let betterCardsPerTurnValues = Object.assign({}, scoreValues)
    betterCardsPerTurnValues.cardsPerMove = 3
    expect(originalScore).toBeLessThan(calculateScore(betterCardsPerTurnValues))
  })
})
