import React, { Component } from "react";
import Chessboard from "chessboardjsx";

class ChessGame extends Component {
  state = {
    fen: "start",
    whitePlayer: "",
    blackPlayer: "",
    whiteClock: "00:00:00",
    blackClock: "00:00:00"
  };

  componentDidMount() {
    setInterval(() => {
      fetch(
        "https://direkte.vg.no/feed-module/5be6cb1d5152f76377a7e363/chess-diagram?studio=sjakk-vm-2018-dag-2"
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          const game = json[0];
          const fen = game.fenDiagrams[game.fenDiagrams.length - 1];
          const { whitePlayer, blackPlayer, whiteClock, blackClock } = game;
          this.setState({
            fen,
            whitePlayer,
            blackPlayer,
            whiteClock,
            blackClock
          });
        });
    }, 1000);
  }

  render() {
    const {
      fen,
      whitePlayer,
      blackPlayer,
      whiteClock,
      blackClock
    } = this.state;
    return this.props.children({
      position: fen,
      whitePlayer,
      blackPlayer,
      whiteClock,
      blackClock
    });
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <ChessGame>
          {({ position, whitePlayer, blackPlayer, whiteClock, blackClock }) => (
            <>
              <Chessboard
                width={640}
                id="random"
                position={position}
                transitionDuration={300}
                boardStyle={{
                  borderRadius: "5px",
                  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                }}
              />
              <h2>
                White: {whitePlayer} {whiteClock}
              </h2>
              <h2>
                Black: {blackPlayer} {blackClock}
              </h2>
            </>
          )}
        </ChessGame>
      </div>
    );
  }
}

export default App;
