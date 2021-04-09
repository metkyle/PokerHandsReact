// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

class PokerHand extends React.Component {
    state = {
        deck: [],
        hand1: ["2C", "3D", "2C", "3D", "2D"],
        hand2: ["2C", "3D", "2C", "3D", "2D"],
        player1Name: "Test",
        player2Name: "Test",
        bestHand: {}
    };

    componentDidMount() {
        this.shuffleDeckHandler();
    }

    shuffleDeckHandler = () => {
        function Card(name, value, suit, numValue) {
            this.name = name;
            this.value = value;
            this.suit = suit;
            this.numValue = numValue;
        }
        let deck = [];
        const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
        const values = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King",
            "Aces"
        ];
        const numericalValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
        const playerName = ["Jack", "Cindy", "Phil", "Cassie", "Jennifer", "Jeff"]
        //populate deck
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                const cardName = values[j] + " of " + suits[i];
                const cardInstance = new Card(
                    cardName,
                    values[j],
                    suits[i],
                    numericalValues[j]
                );
                deck.push(cardInstance);
            }
        }
        let p1Index = Math.floor(Math.random() * playerName.length);
        let p1 = playerName[p1Index];
        playerName.splice(p1Index, 1);
        let p2Index = Math.floor(Math.random() * playerName.length);
        let p2 = playerName[p2Index];
        playerName.splice(p2Index, 1);

        this.setState({ hand1: ["Blank", "Blank", "Blank", "Blank", "Blank"], hand2: ["Blank", "Blank", "Blank", "Blank", "Blank"], deck: deck, player1Name: p1, player2Name: p2, bestHand: {} });
    };

    drawHandHandler = () => {
        let deckCopy = Object.assign([], this.state.deck);
        let hand = [];
        let hand2 = [];
        if (deckCopy.length <= 52) {
            const card1Index = Math.floor(Math.random() * deckCopy.length);
            const card1 = deckCopy[card1Index];
            deckCopy.splice(card1Index, 1);
            const card2Index = Math.floor(Math.random() * deckCopy.length);
            const card2 = deckCopy[card2Index];
            deckCopy.splice(card2Index, 1);
            const card3Index = Math.floor(Math.random() * deckCopy.length);
            const card3 = deckCopy[card3Index];
            deckCopy.splice(card3Index, 1);
            const card4Index = Math.floor(Math.random() * deckCopy.length);
            const card4 = deckCopy[card4Index];
            deckCopy.splice(card4Index, 1);
            const card5Index = Math.floor(Math.random() * deckCopy.length);
            const card5 = deckCopy[card5Index];
            deckCopy.splice(card5Index, 1);
            hand = [card1, card2, card3, card4, card5];
            const card6Index = Math.floor(Math.random() * deckCopy.length);
            const card6 = deckCopy[card6Index];
            deckCopy.splice(card6Index, 1);
            const card7Index = Math.floor(Math.random() * deckCopy.length);
            const card7 = deckCopy[card7Index];
            deckCopy.splice(card7Index, 1);
            const card8Index = Math.floor(Math.random() * deckCopy.length);
            const card8 = deckCopy[card8Index];
            deckCopy.splice(card8Index, 1);
            const card9Index = Math.floor(Math.random() * deckCopy.length);
            const card9 = deckCopy[card9Index];
            deckCopy.splice(card9Index, 1);
            const card10Index = Math.floor(Math.random() * deckCopy.length);
            const card10 = deckCopy[card10Index];
            deckCopy.splice(card10Index, 1);
            hand2 = [card6, card7, card8, card9, card10];
        }
        if (deckCopy.length < 2) {
            this.shuffleDeckHandler();
        }
        const winningHand = this.findWinningHand(hand, hand2);

        this.setState({ hand1: hand, hand2: hand2, deck: deckCopy, bestHand: winningHand });
    };

    findWinningHand = (hand1, hand2) => {

        let hand1Rank = this.rankHand(hand1);
        let hand2Rank = this.rankHand(hand2);
        let rankArray = ["N/A", "Royal Flush", "Straight Flush", "Four of a Kind", "Full House", "Flush", "Straight", "Three  of a Kind", "Two Pair", "One Pair", "Play Again"];
        let cardFaces = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King",
            "Aces"
        ];
        if (hand1Rank < hand2Rank) {
            console.log("Player1 Wins");
            return { player: this.state.player1Name, value: rankArray[hand1Rank] }
        }
        else if (hand1Rank > hand2Rank) {
            console.log("Player2 Wins");
            return { player: this.state.player2Name, value: rankArray[hand2Rank] }
        }
        else {
            console.log("Draw");
            let hand1Value = [];
            let hand2Value = [];
            for (let i = 0; i < hand1.length; i++) {
                hand1Value.push(hand1[i].numValue);
                hand2Value.push(hand2[i].numValue);
            }
            let max1 = Math.max(...hand1Value);
            let max2 = Math.max(...hand2Value);
            if (max1 > max2) {
                console.log(cardFaces);
                return {player: this.state.player1Name, value: cardFaces[max1-2].concat(' ', 'High')/*max1.toString()*/}
            }
            if (max1 < max2) {
                console.log(cardFaces);
                return { player: this.state.player2Name, value: cardFaces[max2 - 2].concat(' ', 'High') /*max2.toString()*/ }
            }
            return { player: "Draw", value: rankArray[10] }
        }
    };

    rankHand = (hand) => {
        const numericalValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
        const allSuits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        let faces = [];
        let suits = [];
        for (let i = 0; i < hand.length; i++) {
            faces.push(hand[i].numValue);
            suits.push(hand[i].suit);
        }

        let possibleStraights = [];
        for (let i = 10; i > 1; i--) {
            const straight = [i.toString(), (i + 1).toString(), (i + 2).toString(), (i + 3).toString(), (i + 4).toString()];
            possibleStraights.push(straight);
        }
        possibleStraights.push(["14", "2", "3", "4", "5"]);

        ////check hand for royal flush
        const broadway = ["10", "11", "12", "13", "14"];
        for (let i = 0; i < allSuits.length; i++) {
            const flush = (suits[0] === suits[1] && suits[0] === suits[2] && suits[0] === suits[3] && suits[0] === suits[4]);
            if (flush) {
                const flushCards = faces
                console.log(flushCards)
                let flushValues = faces;

                const straightMade = broadway.every(
                    card => flushValues.indexOf(card) > -1
                );
                if (straightMade === true) {
                    console.log("Royal Flush")
                    return 1;
                }
            }
        }

        //check flush & straight
        const flush = (suits[0] === suits[1] && suits[0] === suits[2] && suits[0] === suits[3] && suits[0] === suits[4]);
        for (let i = 0; i < possibleStraights.length; i++) {
            const straightMade = possibleStraights[i].every(
                card => faces.indexOf(card) > -1
            );
            if (straightMade === true) {
                var straight = true;
            }
        }


        if (flush && straight) {
            console.log("Straight Flush");
            return 2;
        }
        if (flush) {
            console.log("Flush")
            return 5;
        }
        if (straight) {
            console.log("Straight")
            return 6;
        }
        //check full house
        for (let i = 0; i < numericalValues.length; i++) {
            const cardCount = faces.filter(card => card === numericalValues[i]);
            if (cardCount.length === 3) {

                const remainingCards = faces.filter(card => card !== numericalValues[i]);
                console.log(remainingCards)
                for (let j = 0; j < numericalValues.length; j++) {
                    const secondCount = remainingCards.filter(card => card === numericalValues[j])
                    if (secondCount.length === 2) {
                        console.log("Full House");
                        return 4;
                    }
                }
            }
        }
        //check two pair
        for (let i = 0; i < numericalValues.length; i++) {
            const cardCount = faces.filter(card => card === numericalValues[i]);
            if (cardCount.length === 2) {

                const remainingCards = faces.filter(card => card !== numericalValues[i]);
                console.log(remainingCards)
                for (let j = 0; j < numericalValues.length; j++) {
                    const secondCount = remainingCards.filter(card => card === numericalValues[j])
                    if (secondCount.length === 2) {
                        console.log("Two Pair");
                        return 8;
                    }
                }
            }
        }
        //check 4 of a kind
        for (let i = 0; i < numericalValues.length; i++) {
            const cardCount = faces.filter(card => card === numericalValues[i]);
            if (cardCount.length === 4) {
                console.log("Four Kind");
                return 3;
            }
        }
        //check for 3 pai
        for (let i = 0; i < numericalValues.length; i++) {
            const cardCount = faces.filter(card => card === numericalValues[i]);
            if (cardCount.length === 3) {
                console.log("Three");
                return 7;
            }
        }
        //check for pair
        for (let i = 0; i < numericalValues.length; i++) {
            const cardCount = faces.filter(card => card === numericalValues[i]);
            if (cardCount.length === 2) {
                console.log("Pair");
                return 9;
            }
        }
        return 10;

    }
    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Poker Hands</h1>
                    <p>Click "Deal Hand" button to draw and compare two poker hands from a deck</p>
                    <p>Click "Shuffle Deck" to reset the game</p>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <h1> Winner: {this.state.bestHand.player} </h1>
                    </div>
                    <div className="row justify-content-center">
                        <h1>Hand: {this.state.bestHand.value} </h1>
                    </div>
                    <div className="row justify-content-center">
                        <Hand handCards={this.state.hand1} handCards2={this.state.hand2} p1={this.state.player1Name} p2={this.state.player2Name} />
                    </div>

                    <div className="row justify-content-center">
                        <Controller shuffle={this.shuffleDeckHandler} dealHand={this.drawHandHandler} />
                    </div>
                    <div className="row justify-content-center">
                        Cards in Deck - {this.state.deck.length}
                    </div>
                </div>

            </div>
        );
    }
}


const Hand = ({ handCards, handCards2, p1, p2 }) => {
    return (
        <div>
            <h3>{p1}'s Hand - [{handCards[0].name}] [{handCards[1].name}] [{handCards[2].name}] [{handCards[3].name}] [{handCards[4].name}]</h3>
            <h3>{p2}'s Hand - [{handCards2[0].name}] [{handCards2[1].name}] [{handCards2[2].name}] [{handCards2[3].name}] [{handCards2[4].name}]</h3>
        </div>
    );
}

const Controller = ({ shuffle, dealHand }) => {
    return (
        <div>
            <button type="button" className="btn btn-primary ml-1" onClick={shuffle}>Shuffle Deck </button>
            <button className="btn btn-primary ml-1" onClick={dealHand}>Deal Hand </button>
        </div>
    );
}

ReactDOM.render(<PokerHand />, document.getElementById('content'));