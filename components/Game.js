const React = require('react');
const Board = require('./Board');
const Status = require('./Status');
const solutions = require('./solutions');

const initial = {
  board: [null, null, null, null, null, null, null, null, null],
  turn: 'X'
}

class Game extends React.Component {


  constructor (props) {


    super(props);
    this.state = initial

    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleReset (ev) {
    ev.preventDefault();
    this.setState(initial)
  }

  handleClick (i, ev) {
    ev.preventDefault();
    const board = this.state.board.slice();
    board.splice(i, 1, this.state.turn);
    const turn = this.state.turn === 'X' ? 'O' : 'X';
    this.setState({board, turn});
  }


  getWinner () {
   const results = solutions.map(
     (solution) => solution.map((i) => this.state.board[i]).join('')
   );
   const row = results.find(
     (result) => result === 'XXX' || result === 'OOO'
   );
   return row && row[0];
  }

  // getWinner () {
  //   const bo = this.state.board
  //   solutions.map( (solution) =>
  //     if (bo[solution[0]] === bo[solution[1]] && bo[solution[1]] === bo[solution[2]]) {
  //       result = bo[solution[0]];
  //     }
  //   )
  //   if (result) {
  //     return result
  //   }
  // }

  isComplete () {
    return !this.state.board.includes(null)
  }

  render () {
    return (
      <div className="game">
        <Board board={this.state.board} onClick={this.handleClick} />
        { this.isComplete() ? <Status winner={this.getWinner()} /> : null }
        <button className="game__reset" onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

module.exports = Game;
