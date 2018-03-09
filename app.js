'use strict';

// const express = require('express')
// const app = express()
const baseURL = 'https://deckofcardsapi.com/api/deck/'

var request = require('request');


//Shuffle Cards
//https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

//Draw a card - if <<deck_id>> = new: shuffle cards will be called as well
//https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

//Reshuffle Deck
//https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/

function findBestHand() {

}

//TODO name this function better
function requestAtrribute(url, attr) {
    request(url, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var parsedBody = JSON.parse(body)[attr];
            if(attr === 'cards') {
                parsedBody.forEach(function(card) {
                    console.log(card["value"] + ' of ' + card["suit"]);
                });
                //best hand logic here
            } else{
                console.log('deck body: ' + body);
            }
        } else {
            console.log('error:' +response.statusCode);
            console.log(body);
        }
    });
}

//assume user wants only 1 only for now
function getSingleDeck() {
    var url = baseURL+'new/shuffle/?deck_count=1';
    var attr = 'deck_id'
    requestAtrribute(url, attr);
}

//assume user always draws five cards from a new single deck
function drawFiveCards() {
    var url = baseURL+'new/draw/?count=5';
    var attr = 'cards';
    requestAtrribute(url, attr);
}

drawFiveCards();
//getSingleDeck();


// app.listen(3000, () => {
//     console.log('**** Server started on Port 3000 ****')
// });
