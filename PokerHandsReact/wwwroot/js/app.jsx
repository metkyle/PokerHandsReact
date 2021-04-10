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
            "Ace"
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
                return { player: this.state.player1Name, value: cardFaces[max1 - 2].concat(' ', 'High')/*max1.toString()*/ }
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
            <h3>{p1}'s Hand - <CardImage cardName={handCards[0].name} />  <CardImage cardName={handCards[1].name} />  <CardImage cardName={handCards[2].name} />  <CardImage cardName={handCards[3].name} />  <CardImage cardName={handCards[4].name} /></h3>
            <h3>{p2}'s Hand -  <CardImage cardName={handCards2[0].name} /> <CardImage cardName={handCards2[1].name} /> <CardImage cardName={handCards2[2].name} /> <CardImage cardName={handCards2[3].name} /> <CardImage cardName={handCards2[4].name} /></h3>
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

const CardImage = ({ cardName }) => {
    let card;
    switch (cardName) {
        case "2 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/2S.png" />;
            break;
        case "3 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/3S.png" />;
            break;
        case "4 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/4S.png" />;
            break;
        case "5 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/5S.png" />;
            break;
        case "6 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/6S.png" />;
            break;
        case "7 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/7S.png" />;
            break;
        case "8 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/8S.png" />;
            break;
        case "9 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/9S.png" />;
            break;
        case "10 of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/10S.png" />;
            break;
        case "Jack of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/JS.png" />;
            break;
        case "Queen of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/QS.png" />;
            break;
        case "King of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/KS.png" />;
            break;
        case "Ace of Spades":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/AS.png" />;
            break;
        case "2 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/2C.png" />;
            break;
        case "3 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/3C.png" />;
            break;
        case "4 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/4C.png" />;
            break;
        case "5 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/5C.png" />;
            break;
        case "6 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/6C.png" />;
            break;
        case "7 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/7C.png" />;
            break;
        case "8 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/8C.png" />;
            break;
        case "9 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/9C.png" />;
            break;
        case "10 of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/10C.png" />;
            break;
        case "Jack of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/JC.png" />;
            break;
        case "Queen of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/QC.png" />;
            break;
        case "King of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/KC.png" />;
            break;
        case "Ace of Clubs":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/AC.png" />;
            break;
        case "2 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/2H.png" />;
            break;
        case "3 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/3H.png" />;
            break;
        case "4 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/4H.png" />;
            break;
        case "5 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/5H.png" />;
            break;
        case "6 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/6H.png" />;
            break;
        case "7 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/7H.png" />;
            break;
        case "8 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/8H.png" />;
            break;
        case "9 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/9H.png" />;
            break;
        case "10 of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/10H.png" />;
            break;
        case "Jack of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/JH.png" />;
            break;
        case "Queen of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/QH.png" />;
            break;
        case "King of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/KH.png" />;
            break;
        case "Ace of Hearts":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/AH.png" />;
            break;
        case "2 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/2D.png" />;
            break;
        case "3 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/3D.png" />;
            break;
        case "4 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/4D.png" />;
            break;
        case "5 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/5D.png" />;
            break;
        case "6 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/6D.png" />;
            break;
        case "7 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/7D.png" />;
            break;
        case "8 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/8D.png" />;
            break;
        case "9 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/9D.png" />;
            break;
        case "10 of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/10D.png" />;
            break;
        case "Jack of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/JD.png" />;
            break;
        case "Queen of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/QD.png" />;
            break;
        case "King of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/KD.png" />;
            break;
        case "Ace of Diamonds":
            card = <img style={{ width: "150px", height: "200px" }} src="../images/AD.png" />;
            break;
    }
    return (<span>{card}</span>);
}

ReactDOM.render(<PokerHand />, document.getElementById('content'));