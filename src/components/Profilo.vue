<template>
<div class="profile container">
        <h1>Profilo</h1>
        <div class ="Us-Pw">
            <h2>{{username}}</h2>
            <div class="grid-container">
                <div class="grid-item">Vinte</div>
                <div class="grid-item">Perse</div>
                <div class="grid-item">Patte</div>  
                <div class="grid-item">{{vinte}}</div>
                <div class="grid-item">{{perse}}</div>
                <div class="grid-item">{{patte}}</div>  
              </div>
        </div>
         <h4>Vuoi cambiare la tua password?</h4>

        <div v-if="pswVisible" class ="textb" >
            <input type="password" v-model="password"  id = "password" required>
            <div class="placeholder">Password</div>
            <div @click = "pswVisible = false">
              <font-awesome-icon :icon="['fas', 'eye-slash']" class="show-password"/>  
            </div>      
        </div>
        

        <div v-else class ="textb">
            <input type="text" v-model="password"  id = "password" required>
            <div class="placeholder">Password</div>
            <div @click = "pswVisible = true" >
              <font-awesome-icon :icon="['fas', 'eye']" class="show-password "/>    
            </div>      
        </div>
        <button v-b-modal.modal-1 class="btn" :disabled="btnDisabled" @click="handlePswChange">Cambia</button>
        <b-modal id="modal-1" ok-only @ok="handleOk">
          <p class="my-4">{{message}}</p>
        </b-modal>
        
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Profilo',
    data(){
      return{
        pswVisible:true,
        password: undefined,
        btnDisabled: true,
        username: JSON.parse(sessionStorage.getItem('user')).username,
        vinte: JSON.parse(sessionStorage.getItem('user')).vinte,
        perse: JSON.parse(sessionStorage.getItem('user')).perse,
        patte: JSON.parse(sessionStorage.getItem('user')).patte,
        message: undefined,
      }
    },
    mounted(){
      this.$watch(()=>{
        if(this.password)
          this.btnDisabled = false
        else
          this.btnDisabled = true
      })
      
    },
    methods:{
      handlePswChange(){
        axios({
        method: 'put',
        url: '/utenti',
        data: {
          username: this.username,
          password: this.password
        },
        })
        .then(response => {
          let user = response.data;
          this.message = response.data.message;
          console.log("password cambiata", user);
          
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
              this.message = error.message;
          }
          
        });
      },
      handleOk(){
        this.password=undefined
      }

    }
}
</script>

<style scoped>

.profile{
  position: relative;
  top: 100px;
  align-items: center;
  width: calc(100% - 20px);
  max-width: 500px;
  height: 600px;
  background-color: #fff;
  padding: 50px 40px;
}

.profile h1{
  text-align: center;
  margin: 40px 0;
  font-size: 36px;
  color: #111;
  font-size: 36px;
}

.profile h2{
  text-align: center;
  margin: 40px 0;
  font-size: 36px;
  color: #111;
  font-size: 36px;
}

.Us-Pw{
  margin-bottom: 12px;
  position: relative;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #8f2a2d;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}



.placeholder{
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  position: absolute;
  line-height: 52px; 
  top: 0px;
  left: 20px;
  color: #908c8c;
  user-select: none;
  pointer-events: none;
}



.btn{
    width: 100px;
    height: 50px;
    margin: 10px auto;
    margin-left:315px;
    background-color: #8f2a2d;
    color: #fff;
    font-size: 17px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s linear;
  }
  
  .btn:hover{
    opacity: .85;
  }

.textb input:focus ~ .placeholder,
.textb input:valid ~ .placeholder{
  left: 10px;
  top: -16px;
}
.textb{
  margin-bottom: 12px;
  position: relative;
}

.textb input{
  width: 100%;
  height: 70px;
  border: none;
  background-color: #ededed;
  border-radius: 4px;
  color: #333;
  font-size: 18px;
  font-weight: 700;
  padding: 14px 60px 0 10px;
}
.show-password{
  position: absolute;
  right: 20px;
  top: 20px;
  line-height: 70px;
  color: #9d9d9d;
  font-size: 22px;
  cursor: pointer;
}

@media only screen and (max-width: 500px){
  .profile{
      position: relative;
      top: 80px;
      height: 550px;
      background-color: #fff;
      padding: 50px 40px;
    }

  .grid-item {
    padding: 7px;
    font-size: 20px;
  }


  .btn{
    height: 45px;
    margin-left:200px;
    
  }
}



</style>