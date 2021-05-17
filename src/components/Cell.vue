<template>
    <div id = "game-view-square" @click = "$emit(`cell-clicked`, cell)">{{ cell.symbol }}</div>
        
</template>

<script>
export default {
    name: 'cell',
    props:{
        cell: Object,
       
    
    }
}
</script>

<style scoped>
#game-view-square{
    
    width: 33.33%;
    height: 33.33%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    font-family: 'Permanent Marker', cursive;
    font-size: 75px;
    text-transform: uppercase;

    border-radius: 15px;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
}


#game-view-square.highlighted {color: green}    

#game-view-square:hover {background-color: #eee}

#game-view-square:nth-child(-n+6) {border-bottom: 15px solid brown}     /*Il bordo inferiore di ogni Square, di colore marrone*/

#game-view-square:nth-child(3n+1),
#game-view-square:nth-child(3n+2) {border-right: 15px solid brown}      /*Il bordo laterale di ogni Square, anch'esso di colore marrone*/

</style>