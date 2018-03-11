#!/usr/bin/env node
'use strict';

const baseURL = 'https://deckofcardsapi.com/api/deck/'
const chalk = require('chalk');
const request = require('request');
const program = require('commander');
const pokerEvaluator = require('poker-evaluator');
const log = console.log;

let findBestPokerHand = function(cardHand) {
    return pokerEvaluator.evalHand(cardHand);
}

let drawCards= function(numberOfCards, deck_id) {
    let deck = deck_id === undefined ? 'new' : deck_id;
    let url = baseURL + deck + '/draw/?count=' + numberOfCards;
    log(chalk.yellow('You chose a ' + numberOfCards + ' card hand.'));

    parseRequest(url);
}

let parseRequest = function(url) {
    request(url, function (error, response, body) {
        let parsedBody;
        let handofCards = [];

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
            log('Your best hand is: ' + chalk.red(findBestPokerHand(handofCards)['handName'].toUpperCase()));
            log(chalk.blue('There are ' + parsedBody['remaining']
                + ' cards remaining in deck ' + parsedBody['deck_id']));

        } else {
            log(chalk.red('Error:') +response.statusCode);
        }
    });
}

program
    .version('0.1.0')
    .description('Deck of Cards App')
    .option('-c, --cards [value]', 'Specify the number of cards to be drawn', drawCards)
    .parse(process.argv);

module.exports = findBestPokerHand;
