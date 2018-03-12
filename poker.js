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

let drawCards = function(numberOfCards, deck_id) {
    let deck = deck_id === undefined ? 'new' : deck_id;
    let url = baseURL + deck + '/draw/?count=' + numberOfCards;
    log(chalk.yellow('You were dealt a ' + numberOfCards + ' card hand.'));

    parseRequest(url);
}

let parseRequest = function(url) {
    request(url, function(error, response, body) {
        let parsedBody;
        let pokerHand = [];

        if (!error && response.statusCode === 200) {
            parsedBody = JSON.parse(body);

                log(chalk.green('===== YOUR POKER HAND ====='));

                parsedBody['cards'].forEach(function(card) {
                    if (card['value'] === '10') {
                        //Fixes API and poker-eval incompatability
                        card['code'] = card['code'].replace(0, 'T')
                    }
                    pokerHand.push(card['code']);
                    log(card['value'] + ' of ' + card['suit']);

                });

                log('Your best hand is: ' + chalk.red(findBestPokerHand(pokerHand)['handName'].toUpperCase()));
                log(chalk.blue('There are ' + parsedBody['remaining'] +
                    ' cards remaining in deck ' + parsedBody['deck_id']));

        } else {
            log(chalk.red('Error: ') + response.statusCode);
        }
    });
}

//Commander CLI logic

program
    .version('0.1.0')
    .description('Deck of Cards App')
    .arguments('<numberOfCards> [deck_id]')
    .action(function (numberOfCards, deck_id) {
        drawCards(numberOfCards, deck_id);
    });

program.on('--help', function(){
    log('');
    log('  Examples:');
    log('');
    log('    $ node app.js 5');
    log('    $ node app.js 5 a1b2c3');
    log('');
});

program.parse(process.argv);

module.exports = findBestPokerHand;