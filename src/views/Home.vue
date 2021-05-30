<template>

  <div class="container">
    <br>
    <div id="info" class="text-center">
      <h1>This application has been created to allow everyone to play their TicTacToe games with friends.
        <br>What could be better than Arena? <br>Have fun, have TicTacToe!</h1>
    </div>

    <hr>

    <div id="developer" class="row">
        
        <div class="col-md-6">
          <img src="~@/assets/woman.svg"/>
          <h2>Martina D'Amico</h2>
          <h5>damico.1791820@studenti.uniroma1.it</h5>
          
        </div>
        

        <div class=" col-md-6">
          <img src="~@/assets/man.svg"/>
          <h2>Andrea Dito</h2>
          <h5>dito.1844760@studenti.uniroma1.it</h5>
        </div>
        
    </div>

  </div>
</template>

<script>


export default {
  name: 'Home',
}

</script>
    
<style scoped>
#info{
    margin-top: 80px;
    margin-bottom: 70px;
}

#developer{
    margin-top: 70px;
    text-align: center;
} 

h2{
  font-weight: bold;
}

</style>