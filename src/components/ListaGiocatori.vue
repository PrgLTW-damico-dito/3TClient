<template>
<div id = "listaGiocatori" class="container-flow">
   <table class="table ">
    <thead>
        <tr>
            <th scope="col" >
                <button type="button" 
                        class="btn btn-light" 
                        @click =  "sorted('stato')" >
                    Stato
                </button>
            </th>
            <th scope="col">
                <button type="button" 
                        class="btn btn-light" 
                        @click =  "sorted('giocatore')">
                    Giocatore
                </button>
            </th>
            <th scope="col">
                <button type="button" 
                        class="btn btn-light"  
                        @click =  "sorted('vinte')">
                    Vinte
                </button>
                </th>
            <th scope="col">
                <button type="button" 
                        class="btn btn-light" 
                        @click =  "sorted('perse')" >
                    Perse
                </button>
            </th>
            <th scope="col">
                <button type="button" 
                        class="btn btn-light" 
                        @click =  "sorted('patte')" >
                    Patte
                </button>
            </th>
            <th scope="col"></th>
        </tr>
        </thead>
    
        <tbody v-if="orderBy">
          <giocatore v-for="i in allPlayer" :key="i.id" :player="i">
          </giocatore>
        </tbody>
        
        <tbody v-else>
          <giocatore v-for="i in allPlayer" :key="i.id" :player="i">
          </giocatore>
        </tbody>
    </table>

    <b-modal @ok="handleOk" ref="my-modal" id="modal-center" title="Sfida Avviata" centered ok-only>
        <p class="my-4">{{titleModal}}  <br>  {{bodyModal}} </p>
    </b-modal>

</div>
</template>

<script>

import axios from 'axios';
//import Board from './Board.vue';
import router from '../router';
import eventBus from '../event-bus';
import Giocatore from "./Giocatore.vue";

export default({
    name : 'ListaGiocatori',
    components:{
        Giocatore,
       
    },
    data(){
        return{
            message: '',
            allPlayer: undefined,
            orderBy:'',
            partita: undefined,
            bodyModal: undefined,
            titleModal:undefined,
            intervalId: undefined,
         }
    
    },
    activated(){
        console.log("activated");
        this.handleGiocatore();
        this.intervalId = setInterval(this.handleGiocatore, 5000);
        
    },
    deactivated(){
        console.log("deactivated");
        clearInterval(this.intervalId);
    },
    methods:{
        handleGiocatore(){
            console.log("handleGiocatori");
            console.log(sessionStorage.getItem('user'))
            if(!(sessionStorage.getItem('user')))
                return;
           
            axios({
                method: 'get',
                url: '/utenti',
                data:{
                    id: JSON.parse(sessionStorage.getItem('user')).id
                },
                params:{
                    id: JSON.parse(sessionStorage.getItem('user')).id
                },
                
            })
            .then(response =>{
                console.log(response.data);
                this.allPlayer = response.data.utenti;
                this.sorted(this.orderBy);
                this.partita = response.data.partita;

                if (this.partita){

                    sessionStorage.setItem('partita', JSON.stringify(this.partita));
                    eventBus.$emit('newPartita');
                    console.log(JSON.parse(sessionStorage.getItem('user')).id);
                    if(this.partita.ido == JSON.parse(sessionStorage.getItem('user')).id){
                        this.titleModal = 'Complimenti sei stato sfidato da ' + this.partita.userx;
                        this.bodyModal = 'Clicca sul bottone per giocare';
                        this.showModal();
                        
                    }
                    else if(this.partita.idx == JSON.parse(sessionStorage.getItem('user')).id ){
                        this.titleModal = 'Sfida avviata contro ' + this.partita.usero;
                        this.bodyModal = 'Clicca sul bottone per inizare! Buon diverimento :)'
                        this.showModal();
                    }
                }
            })
            .catch(error => {
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    this.message = error.response.data.message;
                }
                else if (error.request) {
                    console.log(error.request);
                    this.message = error.request;
                } else {
                    console.log('Error', error.message);
                    console.log(error.status);
                    this.message = error.message;
                }
            });
        },
        sorted(a){
            switch(a){
                case 'stato':
                    this.orderBy=a;
                    this.allPlayer.sort((a,b) => {return a.stato-b.stato});
                    break;
                case 'giocatore':
                    this.orderBy=a;
                    this.allPlayer.sort(function(a,b) {
                        var nameA = a.username.toUpperCase(); 
                        var nameB = b.username.toUpperCase(); 
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                    });
                    break;
                case 'vinte':
                    this.orderBy=a;
                    this.allPlayer.sort((a,b) => {return b.vinte-a.vinte});
                    break;
                case 'perse':
                    this.orderBy=a;
                    this.allPlayer.sort((a,b) => {return b.perse-a.perse});
                    break;
                case 'patte':
                    this.orderBy=a;
                    this.allPlayer.sort((a,b) => {return b.patte-a.patte});
                    break;
                

            }
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        handleOk(){
            router.push('Arena');
            
            
        }
      
    } 

})

</script>