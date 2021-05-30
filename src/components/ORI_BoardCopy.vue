<template>
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-sm-8">
            
            <div id="game-view-info" >   
                mossa a {{next}}!
            </div>
        
        
            <!-- <div class = "grid-container">
                <cell
                    v-for="i in cells" :key="i.index" 
                    :cell = "i" :spinner="false" @cell-clicked = "handleClick($event)"></cell>
            </div>    -->
        

            <div class = "grid-container">
                <cell
                    v-for="i in cells" :key="i.index" 
                    :cell = "i" :spinner="false" @cell-clicked = "handleClick($event)"></cell>
            </div>   



        </div>

        <div class="col-12  col-md-5 col-sm-4 chat-panel">
            <chat 
                :chat="chat" :partita="partita">
            </chat>
        </div>
    </div>
<!-- <div class="row">
    <div class="col-md-1"></div>
    <div class="col-12 col-md-5 col-sm-8">
        <div class="container-fluid" id="game-view" style="border-color:black; ">
            <div class="container-fluid" id="game-view-squares">
               
                    <div id="game-view" >
                            <div id="game-view-info" >   
                                    mossa a {{next}}!
                            </div>
                            <div class = "game-view-squares">
                                <cell
                                    v-for="i in cells" :key="i.index" 
                                    :cell = "i" :spinner="false" @cell-clicked = "handleClick($event)"></cell>
                            </div>   
                    </div>
           
            </div>
        </div>
    </div>
    <div class="col-12  col-md-5 col-sm-4 chat-panel">
        <chat 
            :chat="chat" :partita="partita">
        </chat>
    </div>
</div> -->

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
import Chat from '../components/Chat'

export default {
    name: 'board',
    components:{
        Cell, Chat
    }, 
    data() {
        let array_cells = new Array();
        
        for(let i=0; i<9; i++){
                array_cells.push({ numCell: i, symbol:undefined, spinner: false});
        }
        return{
            cells: array_cells,
            partita: JSON.parse(sessionStorage.getItem('partita')),
            user: JSON.parse(sessionStorage.getItem('user')),
            titleModal: String,
            bodyModal: String,
            intervalId: undefined,
            arrMossa: undefined,
            next:undefined,
            chat: undefined,
            
         
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
                let game = response.data.partita;
                
                this.chat = response.data.chat.reverse();
                console.log("CHAT:", this.chat);
                console.log("GAME: ", game);
                
                this.arrMossa = game.mossa.split('').map(x => parseInt(x));
                // console.log("arrMossa: ", this.arrMossa);
                //modifico stringa next che da l'informazione su quale gicatore deve fare la prossima mossa 
                
                let max = Math.max(...this.arrMossa);
                
                if(max%2 == 0) this.next = this.partita.userx;
                else this.next = this.partita.usero;

                this.arrMossa.forEach((element,index) => {
                    if(this.arrMossa[index]!= 0 && element%2 == 0 ){
                        this.cells[index].symbol = "O";
                    }
                    else if(this.arrMossa[index] != 0 && element%2 != 0  ){
                        this.cells[index].symbol = "X";
                    }
                    this.cells[index].spinner = false;
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
        }, 2000);
        

    },
    deactivated(){
        clearInterval(this.intervalId);
    },
    methods:{
        handleClick(cella){
            console.log('cell clicked');
           
            if (!this.checkTurn()) return; 
            cella.spinner = true;

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
            else{
                return true;
            }
            
            
        }, 
        

    }
}
</script>

<style scoped>
.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  text-align: center;
  padding: 60px;

  justify-content: space-evenly;
    /* align-content: center; */
}
.game-view{
    /* Questo e' il "quadrato" in cui e' contenuto l'intero gioco*/
    /* width: 400px;
    margin-left: 200px;
    margin-right: 100px; 
    border: 1px solid #000;
    margin-left: 0px; */
    /* width: 1000px; */
   
    padding: 20px;
    border: 1px solid #000;
}

#game-view-info{
    /*Questa e' la striscia superiore in cui viene descritto lo status del gioco (tocca a X, tocca a O, ha vinto X, etc)*/
    padding: 10px;
    font-family: 'Permanent Marker', cursive;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    
    background-color: #eee;
    
    
}

.game-view-squares{
    /*Il contenitore dei vari Squares*/
    /* height: 480px; */
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
    box-sizing: border-box;

}

#game-view-square{
    
    /* width: 33.33%;
    height: 33.33%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    font-family: 'Permanent Marker', cursive;
    font-size: 75px;
    text-transform: uppercase;

    border-radius: 15px;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none; */

    padding-bottom: 23%;
    
    font-family: 'Permanent Marker', cursive;
    text-transform: uppercase;
    font-size: 75px;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    
    border-radius: 15px;
    display: flex;
    
    box-sizing: border-box;
}


#game-view-square.highlighted {color: green}    

#game-view-square:hover {background-color: #eee}

#game-view-square:nth-child(-n+6) {border-bottom: 10px solid brown}    

#game-view-square:nth-child(3n+1),
#game-view-square:nth-child(3n+2) {border-right: 10px solid brown}      


</style>