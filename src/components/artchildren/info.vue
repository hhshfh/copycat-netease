<template>
  <div id="info">
    <div class="infoMain">
      <div class="i_item">
        <mt-badge size="small" type="error">简介</mt-badge>
        <div v-html="data.briefDesc?data.briefDesc.replace(/\n/g, '</br>'):'暂无内容'">{{data.briefDesc}}</div>
      </div>
      <div v-for="(i, index) in data.introduction" class="i_item">
        <mt-badge size="small" type="error">{{i.ti}}</mt-badge>
        <div v-html="i.txt?i.txt.replace(/\n/g, '</br>'):'暂无内容'"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'info',
    data: () => ({
      data:{}
    }),
    mounted(){
      let id=this.$route.query.artId;
      this.axios.get(this.HOST+`/artist/desc?id=${id}`).then((res)=>{
        console.log(res.data)
        if(res.data.code===200){
          this.data=res.data
        }
      })
    }
  }
</script>
<style scpoed>
.i_item {
  background: white;
  padding: 15px ;
  font-size: 14px;
}
</style>
