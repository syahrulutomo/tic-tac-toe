import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
    renderSquare(i) {
      return <Square 
                value = {this.props.squares[i]}
                onClick = { () => this.props.onClick(i) }
              />;
    }

    createBoard(rows, cols){
      const board = [];
      let counter = 0;
      for(let x = 1; x <= 3; x++){
        const children = [];  
        for(let j = 1; j <= 3; j++){
          children.push(this.renderSquare(counter));
          counter++;
        }
        board.push(<div className="board-row"></div>);
        board.push(children);
        
      }
      return board;
    }

    render() {
       return (
         <div>
           {this.createBoard(3,3)}
         </div>
        
      );
    }
  }