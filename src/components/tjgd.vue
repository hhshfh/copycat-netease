<template>
  <div id="tjgd">
    <div style="height: 50px"></div>
    <div class="lists">
      <div v-for="(i, index) in aldata" class="list_item" v-on:click="_toAlbum(i.id)">
        <div class="list_a">
          <img v-lazy="i.picUrl" alt="">
        </div>
        <div class="list_name">{{i.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'tjgd',
    data: () => ({
      aldata:[],

    }),
    mounted(){
      this.axios.get(this.HOST+`/personalized`).then((res)=>{
        this.aldata=res.data.result;
        console.log(res.data)
      })
    },
    methods:{
      _toAlbum(id){
        this.$router.push({path:'/album',query:{alId:id}})
      }
    }
  }
</script>
<style scpoed>
  .list_item {
    margin-bottom:5px;
  }
  .list_a>img {
    width: 98%;
  }
  .lists {
    display: flex;
    flex-wrap: wrap;
  }
  .lists>div {
    width:33.33%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    word-break:break-all;
    font-size: 12px;
    text-align: center;
  }
  .list_name {
    width:90%;
  }
</style>
