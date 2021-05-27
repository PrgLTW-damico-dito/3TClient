<template>
<div id ="board" class="container" >

    <div class="row ">
       <div id="game-view" class="col-sm-6">
            <div id="game-view-info" >   
                    mossa a {{next}}!
            </div>
            <div class = "game-view-squares">
                <cell
                    v-for="i in cells" :key="i.index" 
                    :cell = "i" :spinner="false" @cell-clicked = "handleClick($event)"></cell>
            </div>   
        </div>

        <div id="playerX" class = "col-md-3 order-first animate__animated animate__fadeInLeft"  >
            <img id="playerPic" src="@/assets/user.png"/>
            <p id="namePlayer">{{partita.userx}} X </p>
        </div>
        
        <div id="playerO" class = "col-md-3 order-last animate__animated animate__fadeInRight " style="left:80px" >
            <img id="playerPic" src="@/assets/user.png"/>
            <p id="namePlayer">{{partita.usero}} O</p>
        </div>
        
    </div>
    <div class = "row">
        <div id="chat-msg" class ="col" style="left:280px; margin-top:20px">
            <chat 
                :chat="chat" :partita="partita">
            </chat>
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
/*  .grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}  */
/* #board{
    
margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
} */
#game-view{
    /* Questo e' il "quadrato" in cui e' contenuto l'intero gioco*/
    width: 400px;
    margin-top: 200px;
    /* margin-left: 200px;
    margin-right: 100px;  */
    border: 1px solid #000;
    /* margin-left: 650px; */
}

#game-view-info{
    /*Questa e' la striscia superiore in cui viene descritto lo status del gioco (tocca a X, tocca a O, ha vinto X, etc)*/
    padding: 15px;
    font-family: 'Permanent Marker', cursive;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    background-color: #eee;
    
    
}

.game-view-squares{
    /*Il contenitore dei vari Squares*/
    height: 480px;
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
    box-sizing: border-box;

}


#playerPic{
    
    width: 100px;
}
#playerX, #playerO{
    
    margin-top: 200px;
    
}

#namePlayer{
    width: 100px;
    font-family: 'Permanent Marker', cursive;
    font-size: 50px;
    font-weight: bold;
}

@media only screen and (max-width: 768px){
#playerPic{
    width: 50px;
}
#namePlayer{
    width: 100px;
    font-size: 30px;
}

#game-view{
    height: 600px;
    
    margin-top: 100px; 

}

#player{
    
    top: 200px;
    
}
/*
#game-view-info{
    padding: 15px;
    margin-left: 50px;
    font-size: 25x;    
}

.game-view-squares{
   height: 480px;
    width: 400px;
    padding: 25px;

}*/
} 

@media only screen and (max-width: 600px) {
#playerPic{
    width: 50px;
}
#namePlayer{
    width: 100px;
    font-size: 30px;
}

#game-view{
    height: 500px;
    bottom: 250px;
    margin-top: 0px; 
    margin-left: 40px;

}
.game-view-squares{
   height: 400px;
    width: 350px;
    
    padding: 20px;

}

#playerX{
    
    top: 450px;
    margin-left: 30px;
    
}
#playerO{
    
    bottom: 410px;
    margin-left: 230px;
    
}
#chat-msg{
    bottom: 400px;
    
}
}
</style>