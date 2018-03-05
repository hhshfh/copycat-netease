<template>
  <div id="jingxuan">
    <div style="margin-top: 50px;"></div>
    <div v-for="(i, index) in listData" class="jx_i" v-on:click="toSonglist(i.id)">
      <div class="jx_avatar">
        <img v-lazy="i.coverImgUrl" alt="">
      </div>
      <div style="margin-left: 15px;">
        <p style="font-size: 14px">{{i.name}}</p>
        <div style="font-size: 12px;color: grey;">
          <span v-for="x in i.tags" style="margin-right: 3px;">{{x}}</span>
        </div>
        <p style="font-size: 12px;color: grey;">{{getLocalTime(i.createTime)}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'jingxuan',
    data: () => ({
      listData:[]
    }),
    mounted(){
      this.axios.get(this.HOST+`/top/playlist?limit=20&order=hot`).then((res)=>{
        console.log(res.data)
        this.listData=res.data.playlists;
      })
    },
    methods:{
      getLocalTime(nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      toSonglist(id){
        this.$router.push({path:'/songlist',query:{id:id}})
      }
    }
  }
</script>
<style scpoed>
  .jx_i {
    display: flex;
    justify-content: flex-start;
    padding: 5px;
    background: ghostwhite;
  }
  .jx_avatar {
    /*width: 100px;*/
    /*height: 100px;*/
    /*overflow: hidden;*/
  }
  .jx_avatar>img {
    width:100px;
  }
  .jx_i p {
    margin: 3px 0;
  }
</style>
