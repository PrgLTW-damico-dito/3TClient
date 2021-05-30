<template>
    <!-- <div id = "game-view-square" @click = "$emit(`cell-clicked`, cell)">
        <div v-if="cell.spinner">
            <b-spinner style="margin-bottom:30px" type="grow" label="Spinning"></b-spinner>
        </div>

       {{ cell.symbol }}
    </div> -->
    
    <div class="col-4 cell" @click = "$emit(`cell-clicked`, cell)">
        <div v-if="cell.spinner">
            <b-spinner style="margin-bottom:20px" type="grow" label="Spinning"></b-spinner>
        </div>
       {{ cell.symbol }}
    </div>
</template>

<script>

export default {
    name: 'cell',
    props:{
        cell: Object
    }
}
</script>

<style scoped>
.cell{
    /* border: 5px solid brown; */
    width: 100px;
    height: 100px;
    
    font-size: 60px;
    font-family: 'Permanent Marker', cursive;
    border-radius: 15px;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;   
    text-align: center;

}
.cell.highlighted {color: green}    
.cell:hover {background-color:#eee}

.cell:nth-child(-n+6) {border-bottom: 10px solid brown}    
.cell:nth-child(3n+1),
.cell:nth-child(3n+2) {border-right: 10px solid brown}      

</style>