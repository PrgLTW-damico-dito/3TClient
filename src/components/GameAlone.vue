<template>
  <div id="game-view">   <!-- Questo div indica l'intero "quadrato" del gioco-->
            <div id="game-view-info">   <!-- Questo e' il div della striscia superiore, dove verra' scritto di chi e' il turno o chi ha vinto-->
                {{ infoMessage }}
            </div>
            <div id="game-view-squares">    <!-- Questo e' invece il contenitore dei vari Square-->
                <div 
                    v-for="(square, i) in squares" 
                    :key="i.index" 
                    v-on:click="activeGame.makeMove(i)"
                    v-bind:class="{highlighted: square.isHighlited}"
                    class = "game-view-square">   
                    {{ square.value }}  <!-- Questo mostra per ogni singolo Square il suo value-->
                </div>
            </div>
        </div>
        
</template>

<script>
import Game from "../Schermata di Gioco/js/Game.js"
import Square from "../Schermata di Gioco/js/Square.js"
export default {
    data(){
        let activeGame = new Game();
        let square = new Square();
        return{
            square,
            activeGame,
            infoMessage: undefined
        } 
    },
    computed()  {
            if (this.inProgress){
                this.infoMessage =  'It is '+ this.currentTurn + '\'s turn!';
            }

            if (this.winner){
                this.infoMessage =  this.winner+' wins!';
            }

            if (!this.winner && !this.inProgress){
                this.infoMessage =  'It was a draw!';
            }
        
    }

}
</script>

<style>
#game-view{
    /* Questo e' il "quadrato" in cui e' contenuto l'intero gioco*/
    width: 500px;
    margin: 0 auto;
    border: 1px solid #000;
}

#game-view-info{
    /*Questa e' la striscia superiore in cui viene descritto lo status del gioco (tocca a X, tocca a O, ha vinto X, etc)*/
    padding: 15px;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    background-color: #eee;
}

#game-view-squares{
    /*Il contenitore dei vari Squares*/
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
    box-sizing: border-box;

}

#game-view-square{
    /*Cio' che si trova all'interno di ogni singolo Square*/
    width: 33.33%;
    height: 33.33%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    font-family: cursive;
    font-size: 75px;
    text-transform: uppercase;

    border-radius: 15px;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
}

#game-view-square.highlighted {color: green}    

#game-view-square:hover {background-color: #eee}

#game-view-square:nth-child(-n+6) {border-bottom: 15px solid brown}     /*Il bordo inferiore di ogni Square, di colore marrone*/

#game-view-square:nth-child(3n+1),
#game-view-square:nth-child(3n+2) {border-right: 15px solid brown}      /*Il bordo laterale di ogni Square, anch'esso di colore marrone*/
</style>