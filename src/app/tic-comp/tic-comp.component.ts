import { Gamelogic } from './../gamelogic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-comp',
  templateUrl: './tic-comp.component.html',
  styleUrls: ['./tic-comp.component.scss'],
  providers:[Gamelogic]
})
export class TicCompComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame():void{
    this.game.gameStart();
    const currentPlayer = 'Current Turn: Player: ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    information.innerHTML = currentPlayer;
  }

  async clickSubfield(subfield: any): Promise<void>{
      if(this.game.gameStatus ===1 ){
        
        const position = subfield.currentTarget.getAttribute('position');
        const information = document.querySelector('.current-status');
        // console.log(position);

        this.game.setField(position, this.game.currentTurn);
        const color = this.game.getPlayerColorClass();
        subfield.currentTarget.classList.add(color);
     

        
     await this.game.checkGameAndWinner().then( (end:boolean) => {
      if(this.game.gameStatus === 0 &&  end){
        information.innerHTML = 'The winner is player nr. ' + this.game.currentTurn;
      }
  }); 

  await this.game.checkGameAndFull().then( (end:boolean) => {
    if(this.game.gameStatus === 0 &&  end){
      information.innerHTML = 'No Winner, draw';
    }
});
  
        this.game.changePlayer();

      
        if(this.game.gameStatus === 1){
          const currentPlayer = 'Current Turn: Player: ' + this.game.currentTurn;
          information.innerHTML = currentPlayer;
        }
      
      }
  }


}
