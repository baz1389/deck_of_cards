'use strict';

const baseURL = 'https://deckofcardsapi.com/api/deck/'

var request = require('request');
var pokerEvaluator = require('poker-evaluator');

function findBestHand(cardHand) {
    return pokerEvaluator.evalHand(cardHand);
}

//TODO name this function better
function requestAtrribute(url, attr) {
    request(url, function (error, response, body) {
        var parsedBody;
        var handofCards = [];
        if (!error && response.statusCode === 200) {

            parsedBody = JSON.parse(body)[attr];
            if(attr === 'cards') {
                parsedBody.forEach(function(card) {
                    console.log(card['value'] + ' of ' + card['suit']);
                    handofCards.push(card['code']);

                });
                console.log('Your best hand is: ' + findBestHand(handofCards)['handName']);
            } else{
                console.log('deck body: ' + body);
            }
        } else {
            console.log('error:' +response.statusCode);
            console.log(body);
        }
    });
}

//assume user wants only 1 deck for now
function getSingleDeck() {
    var url = baseURL+'new/shuffle/?deck_count=1';
    var attr = 'deck_id'
    requestAtrribute(url, attr);
}

// if deck_id = new: creates a shuffled deck and draws cards from that deck in the same request.
function drawCards(deck_id, numberOfCards) {
    var url = baseURL+ deck_id + '/draw/?count=' + numberOfCards;
    var attr = 'cards';
    requestAtrribute(url, attr);
}

//assume user always draws five cards from a new single deck
drawCards('new', 5);
