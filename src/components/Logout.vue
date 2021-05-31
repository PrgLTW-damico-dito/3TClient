<template>
    <div class = "logout">
        <div v-if="spinner" >
            <div  class="spinner-border  text-primary text-align-center" role="status"></div>
        </div>

        <div v-else>
            <div @click = "handleSignout">Logout</div>
        </div>
        
    </div>
</template>


<script>
import EventBus from '../event-bus';
import axios from 'axios';

export default({
    name: 'Logout',
    data(){
      return {
        spinner: false,
        
      }
    },
    methods:{
     
      handleSignout(){
        this.spinner = true;
        
        axios({
          method: 'put',
          url: '/utenti/logout',
          data: {
            username: JSON.parse(sessionStorage.getItem('user')).username,
            password: JSON.parse(sessionStorage.getItem('user')).password
          }
        })
        .then(response => {
          let user = response.data;
          console.log("user logout: ", user);
          this.spinner = false;
          sessionStorage.clear();
          EventBus.$emit('unlogged');
          
        })
        .catch(error => {
          if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            EventBus.$emit('unlogged');
            
          }
          else if (error.request) {
              console.log(error.request);
              this.message = error.request;
              EventBus.$emit('unlogged');
          } else {
              console.log('Error', error.message);
              this.message = error.message;
              EventBus.$emit('unlogged');
          }
          this.spinner = false;
        })
      },
    }
})
</script>


<style >

</style>