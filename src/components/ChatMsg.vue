<template>
<div>
    <li :class="pos">
        <div class="chat-img">
            <img src="@/assets/user.png" />
        </div>
        <div class="chat-body">
            <div class="chat-message">
                <h5>{{username}}</h5>
                <p>{{msg.msg}}</p>
            </div>
        </div>
    </li>

<!--     <li class="out">
        <div class="chat-body">
            <div class="chat-message">
                <h5>Serena</h5>
                <p>Next level veard</p>
            </div>
        </div>
    </li> -->
</div>
</template>

<script>
export default {
    props:{
        msg: Object,
        pos: String,
        username: String
    }

}
</script>

<style>
.chat-list .chat-img {
    float: left;
    width: 45px;
}

.chat-list .chat-img img {
    /* -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px; */
    width: 100%;
} 
</style>