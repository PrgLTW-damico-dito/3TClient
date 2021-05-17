<template>
    <nav>
        <p>TicTacToe-Arena</p>

        <ul>
            <template v-if="logged && in_partita">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/listaGiocatori">Giocatori</router-link></li>
                <li><router-link to="/arena">Arena</router-link></li>
                <!-- <li id = "logout"><router-link to ="/"><logout></logout></router-link></li>
 -->
                <li>
                    <b-dropdown variant="outline-danger" class="dropdown">
                        <template #button-content>
                            <b-icon icon="person-fill"></b-icon>  {{user}}
                        </template>
                        <b-dropdown-item-button><router-link to="/profilo">Profilo</router-link></b-dropdown-item-button>
                        <b-dropdown-item-button><router-link to ="/"><logout></logout></router-link></b-dropdown-item-button>
                    </b-dropdown>
                </li>
            </template>

            <template v-else-if="logged && !in_partita">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/listaGiocatori">Giocatori</router-link></li>
                <li><router-link to="/">Arena</router-link></li>
                <!-- <li id = "logout"><router-link to ="/"><logout></logout></router-link></li> -->
                
                <!-- <li class="user">
                    <router-link to="/profilo">
                    <b-icon icon="person-fill"></b-icon> 
                        {{user}}
                    </router-link>
                </li> -->
                <li>
                    <b-dropdown variant="outline-danger" class="dropdown">
                        <template #button-content>
                            <b-icon icon="person-fill"></b-icon>  {{user}}
                        </template>
                        <b-dropdown-item-button><router-link to="/profilo">Profilo</router-link></b-dropdown-item-button>
                        <b-dropdown-item-button><router-link to ="/"><logout></logout></router-link></b-dropdown-item-button>
                    </b-dropdown>
                </li> 
            </template>

            <template v-else>
                <li><router-link to="/">Home</router-link></li>
                <li id="login">
                    <router-link to="/login">
                        <button type="button" class="btn btn-outline-danger">Login</button>
                    </router-link>
                </li> 
            </template>
        </ul>

        <keep-alive>
            <router-view/>
        </keep-alive>  
   </nav>

</template>

<script>
import Logout from '../components/Logout.vue';
import EventBus from '../event-bus';

export default {
  components: { Logout },
    name: 'Header',
    data(){
        return {
            logged: false,
            in_partita: false,
            user: undefined,
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

<style scoped>
* {
    margin: 0;
    padding: 0;
    
}

/* body{
    background: url(mybg2.jpg)no-repeat center;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    justify-content: center;
} */
.dropdown{
    margin-left: 1200px;
}
nav{
    width: 100%;
    height: 70px;
    background-color: #fff;
    top: 0;
    position: fixed;
     /* border-bottom: 1px solid red; */
    background-color: rgb(255, 250, 250);
    
}

nav p{
    font-family: arial;
    color: #bc252a;
    font-size: 34px;
    line-height: 55px;
    float: left;
    padding: 1px 40px 0px 25px;

}

nav ul{
    float:left;
}

nav ul li{
    float: left;
    list-style: none;
    position: relative;
}

nav ul li a{
    display: block;
    font-family: arial;
    color: #222;
    font-size: 18px;
    padding: 20px 14px;
    text-decoration: none;
}

#login {
    display: block;
    font-family: arial;
    color: #222;
    font-size: 18px;
    position: absolute;
    left: 1600px;
    text-decoration: none;
    
}

#logout {
    display: block;
    font-family: arial;
    color: #222;
    font-size: 18px;
    position: absolute;
    left: 1600px;
    text-decoration: none;
}

.dropdown{
    display: block;
    font-family: arial;
    color: #222;
    position: absolute;
    left: 1100px;
    text-decoration: none;
    margin: 15px;
} 


</style>