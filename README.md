# deck_of_cards

## Requirements
* Using the deck of cards API (https://deckofcardsapi.com/), implement a node.js app that does the following:
    * Creates and shuffles a deck of cards
    * Draws 5 cards from the hand and prints their numbers and suits to the console
    * Identifies the top scoring poker hand (https://en.wikipedia.org/wiki/List_of_poker_hands) that the cards fulfill and prints it to the console

## Setup
1. Clone this repository to the location of your choice
2. Install Node
    * homebrew or https://nodejs.org/en/
3. Install application dependancies with `npm install`

## Using the Application
* `node poker.js -h`: provides user with application usage and examples
   
    ```  
    Usage: poker [options] <numberOfCards> [deck_id]

      Deck of Cards App

      Options:

        -V, --version  output the version number
        -h, --help     output usage information

      Examples:

        $ node poker.js 5
        $ node poker.js 5 a1b2c3
    ```
* `$ node poker.js 5`: Creates, shuffles, and deals 5 cards from a deck
    * Application allows hands of 3, 5, or 7 cards
    ```
    You were dealt a 5 card hand.
    ===== YOUR POKER HAND =====
    10 of HEARTS
    4 of DIAMONDS
    5 of SPADES
    KING of SPADES
    ACE of DIAMONDS
    Your best hand is: HIGH CARD
    There are 47 cards remaining in deck rhxnpwupqyje
    ```
* `$ node poker.js 5 rhxnpwupqyje`: Deals 5 cards from deck rhxnpwupqyje
    * Note, deck_id is an optional argument. If you do not specify a deck_id, a new deck will be created
        * Previously created decks can always be reused so long as there are cards left in the deck
        
* `npm test`: Runs unit tests
     
## Assumptions
 * Once a deck has been created it is considered shuffled
    * 'Draw a Card' API call: replace <<deck_id>> with 'new' to create a shuffled deck and draw cards from that deck in the same request
        * Cards will not be put back into the deck once they have been played
    * 'Reshuffle a Deck' API call: brings the card count of a deck back to 52 so was not implemented
