import React from 'react';
import Board from './Board';

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export default class Game extends React.Component {
    constructor(props){
      super(props);
        this.state = {
          history: [{
              squares: Array(9).fill(null),
          }],
          sort: true,
          stepNumber: 0,
          xIsNext: true,
        };
        this.getLocation = this.getLocation.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    getLocation(move) {
      const locationMap = {
        0: 'row: 1, col: 1',
        1: 'row: 1, col: 2',
        2: 'row: 1, col: 3',
        3: 'row: 2, col: 1',
        4: 'row: 2, col: 2',
        5: 'row: 2, col: 3',
        6: 'row: 3, col: 1',
        7: 'row: 3, col: 2',
        8: 'row: 3, col: 3',
      } 

      return locationMap[move];
    }

    handleSort() {
        this.setState({
          history: this.state.history.reverse(),
        })
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'; 
      this.setState({
        history: history.concat([{
          squares: squares,
          currentLocation: this.getLocation(i),
          step: this.state.history.length,
        }]),
        stepNumber: this.state.history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      console.log(this.state.history);

      const moves = history.map((step,move) => {
        const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
        const desc = !step.step ? 'Start the game' : 'Move #'+step.step;
        const classButton = move === this.state.stepNumber ? 'button__bold' : '';

        return (
          <li key={ move }>
            <button className={ classButton } onClick={() => this.jumpTo(move)}>{` ${desc} ${currentLocation}`}</button>
          </li>
        )
      });

      let status;
      if(winner){
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={ i => this.handleClick(i) }
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={this.handleSort}>Sort</button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

 