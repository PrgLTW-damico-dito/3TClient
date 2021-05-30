<template>
    <div class="row" style="margin-top:80px">
        <div id="playerX" class = "col-6 animate__animated animate__backInDown"  >
            <img id="playerPic" src="@/assets/user.png"/>
            <p id="namePlayer">X </p>
            </div>
        <div id="playerO" class = "col-6 animate__animated animate__backInDown ">
            <img id="playerPic" src="@/assets/user.png"/>
            <p id="namePlayer">O</p>
        </div>
    </div>
   

</template>

<script>
export default {

}
</script>

<style scoped>



/* #playerX, #playerO{
   margin-top: 200px;
    
} */
#playerPic{
    width: 60px;
}
#namePlayer{
    width: 100px;
    font-family: 'Permanent Marker', cursive;
    font-size: 40px;
    font-weight: bold;
}
</style>