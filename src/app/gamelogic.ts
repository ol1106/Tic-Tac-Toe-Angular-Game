import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Status } from './game-status';

export class Gamelogic {
    gameField: Array<number> = [];

    currentTurn:number;
    
    gameStatus: Status;

    winSituationsOne: Array<Array<number>> = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 1, 1, 1],
    ];

    winSituationsTwo: Array<Array<number>> = [
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 2, 0, 0],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],
        [0, 0, 0, 0, 2, 0, 2, 2, 2],
    ];


    public constructor(){
        this.gameStatus = Status.STOP;
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    gameStart():void{
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentTurn= this.randomPlayerSart();
        // console.log(this.currentTurn);
        this.gameStatus = Status.START;
    }

    randomPlayerSart():number{
            const startPlayer = Math.floor(Math.random()*2)+1;
            return startPlayer;
    }

    setField(position: number, value: number): void{
        this.gameField[position] = value;
        // console.log(this.gameField); 
    }

    getPlayerColorClass(): string{
         const colorClass= (this.currentTurn === 2) ? 'player-two' : 'player-one';
            return colorClass;
    }

    changePlayer():void{
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;    
    }


arrayEquals(a: Array<any>, b: Array<any>): boolean{
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) =>
        value === b[index]);
}

async checkGameAndWinner(): Promise<boolean>{
    let isWinner = false;

    const chckArray = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;
    const currentArray = [];


    this.gameField.forEach((subfield, index) => {

     if(subfield !== this.currentTurn){
currentArray[index] = 0; }
else{
currentArray[index] = subfield;    
}
    });

    chckArray.forEach((checkfield, checkindex)=> {
        if(this.arrayEquals(checkfield, currentArray)){
            isWinner =true;
        }
    }); 

    console.log(currentArray);


    if(isWinner){
       this.gameEnd();
       return true;
    }else{
        return false;
    }

}



    async checkGameAndFull(): Promise<boolean>{
            let isFull = true;

            if(this.gameField.includes(0)){
               isFull = false;
            }

            if(isFull){
                console.log("field is full");
                this.gameEnd()
                return true;
            }else{
                return false;
            }
    }



    gameEnd(): void{
        this.gameStatus = Status.STOP;
    }


 

    
}

