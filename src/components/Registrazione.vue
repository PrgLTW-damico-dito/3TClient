<template>
<b-container class="d-md-flex justify-content-center ">
  

  <b-form class="login-form animate__animated animate__fadeInUp" id="myform" >
      <h1>Registrazione</h1>
        
        <div class ="textb">
            <input type="text" id = "username" v-model="username" required>
            <div class="placeholder" >Username</div>
        </div>

        <div v-if="pswVisible" class ="textb">
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
        <!-- <div class="checkbox">
            <input type="checkbox">
            <div class="fas fa-check"></div>
            Remember me
        </div>  -->

         <div v-if="spinner" >
            <div class="spinner-border" role="status"></div>
            
        </div>
        <div v-else>
          <!-- <button @click = "handleX" class="btnx fas fa-times"></button> -->
          <button :disabled="btnDisabled"   @click = "handleSignin" type = "submit" form = "myform" class="btn">
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
          
            
        </div>
        <h4 style="color:red; font-family: 'Ubuntu' sans-serif;"> {{message}} </h4>
        
    </b-form> 
   

</b-container>
  
</template>
<script>
import axios from 'axios';
import router from '../router'

export default({
    data(){
      return {
        username: undefined,
        password: undefined,
        pswVisible: true,
        message: '',
        spinner: false,
        btnDisabled: true,
        
      }
    },
    mounted(){
      this.$watch(() =>{
        if (this.username && this.password) 
          this.btnDisabled = false;
        else
          this.btnDisabled = true;
      })
    },
    methods:{
     
      handleSignin(){
        this.spinner = true;
        
        axios({
          method: 'post',
          url: '/utenti',
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(response => {
          console.log(response.data);
          let user = response.data;
          this.message = 'registrazione andata a buon fine. Benvenut* ' + user.username;
          this.spinner = false;
          router.push('Login');
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
          this.spinner = false;
        })
      },
      handleX(){

        router.push('Home', () => {console.log("ciao")});
      }
    }
})
</script>


<style scoped>
/*  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Ubuntu" sans-serif; 
  
} */
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}

/* body{
  background: url("~@/assets/mybg2.jpg")no-repeat center; 
  background-size: cover; 
  min-height: 100vh; 
  display: flex; 
  align-items: center;
  justify-content: center; 
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
}   */

.login-form{
  margin-top: 170px;
  width: calc(100% - 20px);
  max-width: 500px;
  background-color:rgba(255, 254, 254, 0.911);
  padding: 50px 40px;
}

.login-form h1{
  text-align: center;
  margin: 48px 0;
  font-size: 36px;
  color: #111;
  font-size: 36px;
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

.placeholder{
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  position: absolute;
  line-height: 70px; 
  top: 0;
  left: 20px;
  color: #9d9d9d;
  user-select: none;
  pointer-events: none;
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

.textb input:focus ~ .placeholder,
.textb input:valid ~ .placeholder{
  left: 10px;
  top: -16px;
}

.checkbox{
  display: flex;
  align-items: center;
  position: relative;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 20px 0;
}

.checkbox input{
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
  background-color: #ededed;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
}

.checkbox .fa-check{
  position: absolute;
  color: #fff;
  font-size: 14px;
  width: 24px;
  text-align: center;
  user-select: none;
  pointer-events: none;
  opacity: 0;
}

.checkbox input:checked{
  background-color: #bc252a;
}

.checkbox input:checked + .fa-check{
  opacity: 1;
}
.btnx{
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 60px;
  background-color: #bc252a;
  color: #fff;
  font-size: 45px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: .3s linear;
}

.btnx:hover{
  opacity: .85;
}
.btn{
  display: block;
  width: 100px;
  height: 100px;
  margin: 30px auto;
  background-color: #bc252a;
  color: #fff;
  font-size: 40px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: .3s linear;
}
.spinner-border{
  width: 50px;
  height: 50px;
  margin: 100px auto;
  color: black;
  text-align: center;
}

.btn:hover{
  opacity: .85;
}

.login-form a{
  display: block;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  color: #555;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 8px;
  transition: .2s linear;
}


.login-form a:hover{  
  color: #111;
}

.btn:disabled{
  background-color: transparent;
  color: rgb(176, 180, 176);
  border: 2px solid;

}
</style>