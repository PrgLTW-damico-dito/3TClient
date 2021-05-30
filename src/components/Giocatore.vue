<template>

    <tr class="giocatore">
        <th scope="row" v-if="player.stato == 1">
            <svg height="20" width="20">
                <circle cx="10" cy="10" r="10" stroke-width="3" fill="green" />
            </svg> 
        </th>
        <th scope="row" v-else-if="player.stato == 0">
            <svg height="20" width="20">
                <circle cx="10" cy="10" r="10" stroke-width="3" fill="red" />
            </svg> 
        </th>
        <th scope="row" v-else-if="player.stato == 2">
            <svg height="20" width="20">
                <circle cx="10" cy="10" r="10" stroke-width="3" fill="yellow" />
            </svg> 
        </th> 
            <td>{{player.username}}</td>
            <td>{{player.vinte}}</td>
            <td>{{player.perse}}</td>
            <td>{{player.patte}}</td>
            <td v-if="player.stato==1 && checkPlayer()">
                <div v-if="spinner">
                    <div class="spinner-border  text-primary text-align-center" role="status"></div>
                </div>
                <div v-else-if="in_partita">
                    <button :disabled="true" class="btn btn-primary">Sfida!</button>
                </div>
                <div v-else>
                    <button @click = "creaPartita" class="btn btn-primary" type="submit">Sfida!</button>
                </div>
            </td>
            <td v-else></td>
    </tr>

   

</template>

<script>
import axios from 'axios';
import EventBus from '../event-bus'
export default({
    name : 'giocatore',
   
    props:{
        player: Object,
    },
    data(){
        return{
            spinner: false,
            in_partita: false,
        }
    },
    mounted: function() {
        EventBus.$on('newPartita', () => {
            this.in_partita = true;

        })
        EventBus.$on('partitaFinita', () => {
            this.in_partita = false;
            this.spinner = false;
        })
    },
    methods:{
     checkPlayer(){
         if(this.player.username != JSON.parse(sessionStorage.getItem('user')).username){
            //console.log(JSON.parse(sessionStorage.getItem('user')));
            return true;
         }
        return false
     },
     creaPartita(){
         console.log('creaPartita');
         this.spinner = true;
         axios({
            method: 'post',
            url: '/partite',
            data:{
                id1: JSON.parse(sessionStorage.getItem('user')).id,
                id2: this.player.id,
            }
         })
         .then(response => {
            console.log("id1: ", response.data.idx);
            console.log("id2: ", response.data.ido);
            // this.spinner = false;
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
            this.spinner = false;
        })
     },
      
   }

})

</script>

<style>

</style> 