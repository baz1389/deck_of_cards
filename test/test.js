var findBestPokerHand = require('../app.js');
var chai = require('chai');
var assert = chai.assert;

describe('Poker Hand Validation', function() {
    var validFiveCardHand = ["As", "Ac", "Ad", "5d", "5s"];
    var invalidCardHand= ["As", "Ac"];
    describe('Types of Hand', function() {
        it('Valid Best Hand', function() {
            assert.equal(findBestPokerHand(validFiveCardHand)['handName'], 'full house');
        });

        it('Invalid Best Hand', function() {
            assert.notEqual(findBestPokerHand(validFiveCardHand)['handName'], 'three of a kind');
        });

    });
    describe('Hand Length', function() {
        it('Valid Hand Length', function() {
            assert.include([3,5,7], validFiveCardHand.length, 'Card Hand is not a valid length');
        });

        it('Invalid Hand Length', function() {
            assert.throws(() => findBestPokerHand(invalidCardHand), Error, 'Hand must be 3, 5, or 7 cards');
        });


    });
});