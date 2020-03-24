import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import App from './App';
import './index.scss';
function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.style}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
    value={this.props.squares[i]}
    onClick={() => this.props.onClick(i)}
    style={this.props.win.indexOf(i)!==-1?{'color':'red'}:{}}
  />
  }

  render() {
    let arr = Array(this.props.rows).fill(null)
    console.log(this.props)
    return (
      <div>
        {arr.map((item, index) => {
          return <div className="board-row" key={index+index}>
            {this.renderSquare(index*3)}
            {this.renderSquare(1+index*3)}
            {this.renderSquare(2+index*3)}
          </div>
        })}
        {/* <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    // this.jumpTo = this.jumpTo.bind(this)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lineR: ['无','无'],
        choose: true
      }],
      xIsNext: true,
      stepNumber: 0,
      rowNum: 3,
      isUpper: true
    };
  }
  handleClick(i) {
    console.log(i)
    var history = this.state.history.slice(0, this.state.history.length);
    const current = this.state.isUpper?history[history.length - 1]:history[0];
    const squares = current.squares.slice();
    console.log(squares)
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    history.forEach(item => {
      item.choose = false
    })
    console.log(squares)
    this.setState({
      history: this.state.isUpper?history.concat([{
        squares: squares,
        lineR: [Math.floor((i+1)/3)+1, (i)%3 +1],
        choose: true
      }]) :[{
        squares: squares,
        lineR: [Math.floor((i+1)/3)+1, (i)%3 +1],
        choose: true
      }].concat(history) ,
      stepNumber: this.state.isUpper?history.length:0,
      xIsNext: !this.state.xIsNext,
    });
    console.log(history)
  }
  jumpTo(step) {
    console.log(step,this.state.isUpper)
    let history = this.state.history.slice()
    history.forEach(item => {
      item.choose = false
    })
    history[step].choose = true
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      history: history
    });
    /* if(this.state.isUpper) {
    history[step].choose = true
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      history: history
    });
    } else {
      history[this.state.history.length - step].choose = true
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      history: history
    });
    } */
  }
  changeSort(){
    if (this.state.history.length>1){
      let arr = this.state.history.slice()
    arr.reverse()
    this.setState({
      isUpper: !this.state.isUpper,
      history: arr,
      stepNumber: arr.length - this.state.stepNumber - 1
    })
    }
  }
  render() {
     const history = this.state.history;
     console.log(this.state.stepNumber,this.state.isUpper)
     const current = history[this.state.stepNumber]//this.state.isUpper?history[this.state.stepNumber]:history[history.length-this.state.stepNumber -1];
     console.log(current)
    const winner = calculateWinner(current.squares);
    console.log(winner)
    let over = this.state.history.length === this.state.rowNum *this.state.rowNum +1?true:false
    const moves = history.map((step, move) => {
      let desc = move ?
        'Go to move #' + move :
        'Go to game start'
      desc = desc + '（' + step.lineR[0] + ',' + step.lineR[1] + ')'
      return (
        <li key={move}>
          <button style={step.choose?{'fontWeight': 'bold','color': 'rgb(97, 218, 251)'}:{}} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
    } else if(over && this.state.stepNumber === 9){
      status = 'nobody win';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
        <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)
            }
            rows={this.state.rowNum}
            win={winner?winner[1]:[]}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
        <button className="btn" onClick={() => this.changeSort()}>{this.state.isUpper?'sort down':'sort up'}</button>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <TransitionGroup>
    <CSSTransition
      appear={true}
      classNames="appAppear"
      timeout={500}
    >
      <App/>
    </CSSTransition>
  </TransitionGroup>,
  document.getElementById('root')
);

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
      return [squares[a],lines[i]];
    }
  }
  return null;
}