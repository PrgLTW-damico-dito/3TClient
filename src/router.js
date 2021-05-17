import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Registrazione from './components/Registrazione.vue';
import Login from './components/Login.vue';
import ListaGiocatori from './components/ListaGiocatori.vue';
import Logout from './components/Logout.vue';
import Board from './components/Board.vue';
import Profilo from './components/Profilo.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/registrazione',
    name: 'Registrazione',
    component: Registrazione
  },
  {
    path:'/listaGiocatori',
    name:'ListaGiocatori',
    component: ListaGiocatori
  },
  {
    path:'/arena',
    name:'Arena',
    component: Board
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/profilo',
    name: 'Profilo',
    component: Profilo
  }
]

const router = new VueRouter({
/*   mode: 'history',
 */  routes
});

router.beforeEach((to, from, next) => {
  /* console.log("beforeEach", to.fullPath);
   if(to.fullPath.startsWith("/Scherm")){
    console.log("schemata di gioco");
    next();
} */
if(to.name!='Home' && to.name != 'Login' && to.name != 'Registrazione' && !auth()  ){
  console.log(to.name);  
  next({name : 'Login'});
}
  else
    next();
});


function auth() {
  return sessionStorage.getItem("user") != null;
} 

export default router;
