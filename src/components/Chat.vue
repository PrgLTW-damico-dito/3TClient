<template>

    <div class="container">
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                
                <div class="card">
                    <div class="card-header">
                        
                        <div class="row">
                            <div class="col-10">
                                Chat
                            </div>

                            <div class="col-2">
                                <button 
                                    class="btn btn-primary" 
                                    type="button">
                                    <b-icon icon="chevron-bar-down" ></b-icon>
                                    
                                </button>
                            </div>
                        </div>

                    </div>

                        
                    <div class="card-body height3">
                        <!-- <div class="card-footer"> -->
                            <div class="row">
                                <div class="col-10">
                                    <input v-model="msg" type="text" class="form-control" id="message" placeholder="Messaggio"/>
                                </div>

                                <div class="col-2">
                                    <button @click="handleClick" :disabled="btnDisabled" type="submit" class="btn btn-primary">
                                        <b-icon icon="chevron-double-right"></b-icon>
                                    </button>
                                </div>
                            <!-- </div> -->
                        </div>
                        <ul class="chat-list">

                            <chat-msg 
                                v-for="i in chat" :key="i.index" :msg="i" 
                                :username="parseUsername(i)" :pos="parsePos(i)">
                            </chat-msg>
                        </ul>

                    </div>

                    
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import ChatMsg from './ChatMsg.vue'
import axios from 'axios';

export default {
    data(){
        return{
            user: JSON.parse(sessionStorage.getItem('user')),
        
            msgArr: undefined,
            msg: undefined,
            btnDisabled: true

        }
    },
    props:{
        chat: undefined,
        partita: undefined
        
    },
    components: { ChatMsg },
    mounted(){
        this.$watch(() =>{
        if (this.msg) 
            this.btnDisabled = false;
        else
            this.btnDisabled = true;
        })
    },
    methods:{
        handleClick(){
            console.log("PARTITA: ",this.partita)
            axios({
                method: 'put',
                url: '/partite/chat',
                data: {
                    id: this.partita.id,
                    id_player: this.user.id,
                    msg: this.msg 
                }
            })
            .then(response => {
                this.msg = undefined,
                this.msgArr = response.data.reverse();
                console.log(this.msgArr);
            })
            .catch(error => {
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                   
                }
                else if (error.request) {
                    console.log(error.request);
                    
                } else {
                    console.log('Error', error.message);
                    
                }
            })
        },
        parsePos(msg){
            if(msg.id_player == this.user.id)
                return "out";
            return "in";
        },
        parseUsername(i){
            if(i.id_player == this.partita.idx)
                return this.partita.userx;
            return this.partita.usero;

        }
    }
}
</script>

<style>
/* body{
    background:#eee;    
} */
.chat-list {
    padding: 0;
    font-size: .8rem;
    margin-top: 20px;
}

.chat-list li {
    margin-bottom: 10px;
    overflow: auto;
    color: #ffffff;
}

/* .chat-list .chat-img {
    float: left;
    width: 48px;
} */

/* .chat-list .chat-img img {
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
    width: 100%;
} */

.chat-list .chat-message {
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
    background: #5a99ee;
    display: inline-block;
    padding: 10px 20px;
    position: relative;
}

.chat-list .chat-message:before {
    content: "";
    position: absolute;
    top: 15px;
    width: 0;
    height: 0;
}

.chat-list .chat-message h5 {
    margin: 0 0 5px 0;
    font-weight: 600;
    line-height: 100%;
    font-size: .9rem;
}

.chat-list .chat-message p {
    line-height: 18px;
    margin: 0;
    padding: 0;
}

.chat-list .chat-body {
    margin-left: 20px;
    float: left;
    width: 70%;
}

.chat-list .in .chat-message:before {
    left: -12px;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #5a99ee;
}

.chat-list .out .chat-img {
    float: right;
}

.chat-list .out .chat-body {
    float: right;
    margin-right: 20px;
    text-align: right;
}

.chat-list .out .chat-message {
    background: #fc6d4c;
}

.chat-list .out .chat-message:before {
    right: -12px;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #fc6d4c;
}

.card .card-header:first-child {
    -webkit-border-radius: 0.3rem 0.3rem 0 0;
    -moz-border-radius: 0.3rem 0.3rem 0 0;
    border-radius: 0.3rem 0.3rem 0 0;
}

.card .card-header {
    background: #f0f2f5;
    border: 0;
    font-size: 1.5rem;
    padding: .65rem 2rem;
    position: relative;
    font-weight: 600;
    color: #0e0c0c;
}

.card .card-footer {
    background: #5a99ee;
    border: 0;
    font-size: 1.5rem;
    padding: .65rem 2rem;
    position: relative;
    font-weight: 600;
    color: #ffffff;
}


/* .content{
    margin-top:40px;    
} */
</style>