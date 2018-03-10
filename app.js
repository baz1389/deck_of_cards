'use strict';

const baseURL = 'https://deckofcardsapi.com/api/deck/'
const chalk = require('chalk');
const log = console.log;

var request = require('request');
var pokerEvaluator = require('poker-evaluator');

function findBestHand(cardHand) {
    return pokerEvaluator.evalHand(cardHand);
}

function drawCards() {
    var numberOfCards = process.argv[2];
    var deck_id = (process.argv[3] === undefined ? 'new' : process.argv[3]);
    var url = baseURL + deck_id + '/draw/?count=' + numberOfCards.toString();
    log(chalk.yellow('You chose a ' + numberOfCards + ' card hand.'));

    parseRequest(url);
}

//TODO name this function better
function parseRequest(url) {
    request(url, function (error, response, body) {
        var parsedBody;
        var handofCards = [];

        if (!error && response.statusCode === 200) {

            parsedBody = JSON.parse(body);
            log(chalk.green('===== YOUR POKER HAND ====='));

            parsedBody['cards'].forEach(function(card) {
                if(card['value'] === '10') {
                    //Fixes API and poker-eval incompatability
                    card['code'] = card['code'].replace(0, 'T')
                }
                handofCards.push(card['code']);
                log(card['value'] + ' of ' + card['suit']);

            });
            log('Your best hand is: ' + chalk.red(findBestHand(handofCards)['handName'].toUpperCase()));
            log(chalk.blue('There are ' + parsedBody['remaining']
                + ' cards remaining in deck ' + parsedBody['deck_id']));

        } else {
            log(chalk.red('Error:') +response.statusCode);
        }
    });
}

drawCards();