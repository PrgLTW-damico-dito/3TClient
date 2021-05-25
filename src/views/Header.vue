<template>
<div>
<b-navbar toggleable="lg" type="light" variant="light" fixed="top">
    <b-navbar-brand style="font-family: arial;
    color: #bc252a;
    font-size: 24px;
    line-height: 55px;
    float: left;
    padding: 0px 0px 0px 25px;" ><img style="margin-right: 10px" src="~@/assets/icon.svg"/>TicTacToe-Arena</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    
   
    <template v-if="logged && in_partita">
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
                <b-nav-item><router-link to="/listaGiocatori">Giocatori</router-link></b-nav-item>
                <b-nav-item><router-link to="/arena">Arena</router-link></b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                    <b-dropdown text="Outline Danger" variant="outline-danger" class="m-2" right>
                        <template #button-content>
                            <b-icon icon="person-fill"></b-icon> 
                            <em>{{user}}</em>
                        </template>
                        <b-dropdown-item><router-link to="/profilo">Profilo</router-link></b-dropdown-item>
                        <b-dropdown-item><router-link to ="/"><logout></logout></router-link></b-dropdown-item>
                    </b-dropdown>     
            </b-navbar-nav>
        </b-collapse>
    </template>

    
    <template v-else-if="logged && !in_partita">
        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/listaGiocatori">Giocatori</router-link></b-nav-item>
            <b-nav-item><router-link to="/">Arena</router-link></b-nav-item>
        </b-navbar-nav>

        
        <b-navbar-nav class="ml-auto">
             <b-dropdown text="Outline Danger" variant="outline-danger" class="m-2" right>
                 
                <template #button-content>
                    <b-icon icon="person-fill"></b-icon> 
                    <em>{{user}}</em>
                </template>
                <b-dropdown-item><router-link to="/profilo">Profilo</router-link></b-dropdown-item>
                <b-dropdown-item><router-link to ="/"><logout></logout></router-link></b-dropdown-item>
            </b-dropdown>
        </b-navbar-nav>
    </b-collapse>
    </template>


   
    <template v-else>
    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item><router-link to="/"><a>Home</a></router-link></b-nav-item>
            </b-navbar-nav>

            
            <b-navbar-nav class="ml-auto">
            <router-link to="/login">
                        <b-button variant="outline-danger">Login</b-button>
            </router-link>
        </b-navbar-nav>
    </b-collapse>

    </template>

    
  </b-navbar> 
  <keep-alive>
            <router-view/>
    </keep-alive>
</div>


</template>

<script>
import Logout from '../components/Logout.vue';
import EventBus from '../event-bus';

export default {
  components: { Logout },
    name: 'Header',
    data(){
        //console.log(sessionStorage.getItem('user'));
        return {
            logged: JSON.parse(sessionStorage.getItem('user')) ? true : false,
            in_partita: false,
            user: JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).username : undefined,
        }
    },
    mounted: function(){
        EventBus.$on('newPartita', () => {
            this.in_partita = true;

        })

        EventBus.$on('partitaFinita', () => {
            this.in_partita = false;
        })

        EventBus.$on('logged', () => {
            this.user = JSON.parse(sessionStorage.getItem('user')).username;
            this.logged = true;
            
        })
        EventBus.$on('unlogged', () => {
            this.logged = false;
         
        })
    }
}
</script>

<style lang="scss" scoped>
a{
    color:black;
}


</style>