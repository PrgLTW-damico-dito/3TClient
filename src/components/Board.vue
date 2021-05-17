<template>
<div id ="board">
    <div id="game-view">
        <div id="game-view-info">   
                {{partita.userx}} VS {{partita.usero}}
            </div>
            
          <div class = "game-view-squares">
             <cell
                v-for="i in cells" :key="i.index" 
                :cell = "i" @cell-clicked = "handleClick($event)"></cell>
        </div>   
    </div>
    
    <b-modal @ok="handleOk" ref="my-modal" id="modal-center" title='Partita finita' centered ok-only>
            <p class="my-4">{{titleModal}} <br> {{bodyModal}} </p>
    </b-modal>
</div>
    
</template>

<script>

import Cell from './Cell.vue';
import axios from 'axios';
import router from '../router';
import eventBus from '../event-bus';

export default {
    name: 'board',
    components:{
        Cell
    }, 
    data() {
        let array_cells = new Array();
        
        for(let i=0; i<9; i++){
                array_cells.push({ numCell: i,  symbol:undefined});
        }
        return{
            cells: array_cells,
            partita: JSON.parse(sessionStorage.getItem('partita')),
            user: JSON.parse(sessionStorage.getItem('user')),
            titleModal: String,
            bodyModal: String,
            intervalId: undefined,
            arrMossa: undefined,
         
        }
    },
    created(){
        eventBus.$on('newPartita', () => {
            console.log("eventBus");
            this.partita = JSON.parse(sessionStorage.getItem('partita'));
            for(let i=0; i<9; i++){
                    this.cells[i].symbol = "";
            }
        })
    },
    activated(){
        if(!(sessionStorage.getItem('partita'))) return;
        this.intervalId = setInterval(() => {
            console.log("partita.id: ", this.partita.id);
            
            axios({
                method: 'get',
                url: '/partite/' + this.partita.id,
                params: {
                    id: JSON.parse(sessionStorage.getItem('user')).id
                }
            })
            .then(response => {
                let game = response.data;
               
                this.arrMossa = game.mossa.split('').map(x => parseInt(x));
                console.log("arrMossa: ", this.arrMossa);
                this.arrMossa.forEach((element,index) => {
                    if(this.arrMossa[index]!= 0 && element%2 == 0 ){
                        this.cells[index].symbol = "O";
                       
                    }
                    else if(this.arrMossa[index] != 0 && element%2 != 0  ){
                        this.cells[index].symbol = "X";
                        
                    }
                    
                });
                if(game.risultato != 0){
                    eventBus.$emit('partitaFinita');
                    switch(game.risultato){
                        case 1:
                            this.titleModal ='Partita Terminata'; 
                            this.bodyModal = 'il vincitore è ' + this.partita.userx;
                            this.showModal();
                            break;
                        case 2:
                            this.titleModal = 'Partita Terminata'; 
                            this.bodyModal = 'il vincitore è ' + this.partita.usero;
                            this.showModal();
                            break;
                        case 3:
                            this.titleModal = 'Partita Terminata';
                            this.bodyModal = 'partita patta';
                            this.showModal();
                            break;
                    }
                    
                }
            })
            .catch(error => {
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                   
                }
                else if (error.request) {
                    console.log(error.request);
                    
                } else {
                    console.log('Error', error.message);
                    
                }
            });
        }, 1000);
        

    },
    deactivated(){
        clearInterval(this.intervalId);
    },
    methods:{
        handleClick(cella){
            
            
            if (!this.checkTurn()) return; 
            axios({
                method: 'put',
                url: '/partite',
                data:{
                    id: this.partita.id,
                    mossa: cella.numCell,
                }
            })
            .then(response => {
                console.log("handleClick: ", response.data);
                

            })
            .catch(error => {
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                   
                }
                else if (error.request) {
                    console.log(error.request);
                    
                } else {
                    console.log('Error', error.message);
                    
                }
            });
            
          
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        handleOk(){
            router.push('ListaGiocatori');
            
        },
        checkTurn(){
            let i=1;
            if (this.partita.ido == this.user.id){
                i = 0;
            }

            console.log("vettore mossa: ", this.arrMossa);
            let lastMove = Math.max(...this.arrMossa);
            
            console.log("lastMove: ", lastMove);
            if( (lastMove+i)%2 == 0 ){
                return false;
            }
            return true;
            
        }
       

    }
}
</script>

<style scoped>
/*  .grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}  */
#board{
    
    margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}
#game-view{
    /* Questo e' il "quadrato" in cui e' contenuto l'intero gioco*/
    width: 500px;
    margin: 180px;
    border: 1px solid #000;
    margin-left: 650px;
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

.game-view-squares{
    /*Il contenitore dei vari Squares*/
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
    box-sizing: border-box;

}
</style>