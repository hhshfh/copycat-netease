<template>
  <div id="art">
    <div class="artBar" v-bind:class="{'op2':isA,'op1':isB}">
      <van-icon name="arrow-left" style="margin-left: 15px;" v-on:click="_backTo()"/>
      <div style="margin-left: 15px;">{{artist.name}}</div>
    </div>
    <div class="artPageBg">
      <img :src="artist.picUrl" alt="">
    </div>
    <div class="tab">
      <router-link tag="div" :to="{path:'song'}" active-class="active">单曲</router-link>
      <router-link tag="div" :to="{path:'alum',query:{artId:artist.id}}" active-class="active">专辑</router-link>
      <router-link tag="div" :to="{path:'mv',query:{artId:artist.id}}" active-class="active">MV</router-link>
      <router-link tag="div" :to="{path:'info',query:{artId:artist.id}}" active-class="active">歌手详情</router-link>
    </div>
    <div v-show="tab2" class="tab1">
      <router-link tag="span" :to="{path:'song'}" active-class="active">单曲</router-link>
      <router-link tag="span" :to="{path:'alum',query:{artId:artist.id}}" active-class="active">专辑</router-link>
      <router-link tag="span" :to="{path:'mv',query:{artId:artist.id}}" active-class="active">MV</router-link>
      <router-link tag="span" :to="{path:'info',query:{artId:artist.id}}" active-class="active">歌手详情</router-link>
    </div>
    <transition :name="animateName">
      <router-view class="" style="" ></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name:'art',
    data: () => ({
      animateName: 'right',
      isA: true,
      isB: false,
      artist:{},
      step:1,
      tab2:false
    }),
    mounted(){
      let id = this.$route.params.id;//取到url中的参数id
      this.axios.get(this.HOST+`/artists?id=${id}`).then((artList)=>{
        console.log(artList.data)
        this.artist=artList.data.artist;
        this.$store.state.art.hotSongs=artList.data.hotSongs;//挂在vuex
      })
      window.addEventListener('scroll', this.handleScroll);//滚动
    },
    methods:{
      handleScroll() {
        let top = window.pageYOffset;
        if(top>=156){
          this.tab2=true
        } else if (top<156){
          this.tab2=false
        }
        if (top > 110) {
          this.isB = true;
          this.isA = false;
        } else if (top < 35) {
          this.isB = false;
          this.isA = true;
        }
      },
      _backTo(){
        let backStep = this.$store.state.backStep;//应该后退的步数
        console.log(backStep)
        this.$store.state.backStep=1;
        window.history.go(-backStep)

      }
    },
    watch: {
      $route(to, from) {
        this.animateName = to.meta.index > from.meta.index ? 'right' : 'left';
//        if(to.meta.index==7.1){
//          return;
//        }
        this.$store.state.backStep++;
        console.log('记录',this.step)
      }
    }
  }
</script>
<style scpoed>
  .left-enter {
    transform: translateX(-100%);
    position: absolute;
    left: 0;
    top: 241px;
  }

  .left-enter-active {
    transition: .2s all ease;
    position: absolute;
    left: 0;
    top: 241px;
  }

  .left-leave-active {
    transition: .2s all ease;
    position: absolute;
    left: 0;
    top: 241px;
  }

  .left-leave-to {
    transform: translateX(100%);
    position: absolute;
    left: 0;
    top: 241px;
  }

  .right-enter {
    transform: translateX(100%);
    position: absolute;
    left: 0;
    top: 241px;
  }

  .right-enter-active {
    transition: .2s all ease;
    position: absolute;
    left: 0;
    top: 241px;
  }

  .right-leave-active {
    transition: .2s all ease;
    position: absolute;
    left: 0;
    top: 241px;
  }

  .right-leave-to {
    transform: translateX(-100%);
    position: absolute;
    left: 0;
    top: 241px;
  }
  .artPageBg>img {
    width:100vw;
    transition: .2s all ease;
    position: fixed;
    top: -8vh;
    left: 0;
    z-index: -1;
  }
  .artBar {
    position: fixed;
    top: 0;
    color: white;
    width: 100vw;
    height: 20px;
    padding: 14px 0;
    transition: .3s all ease;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index:3;
  }
  .op2 {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .op1 {
    background-color: rgba(234, 6, 6, 1);
  }
  .fixed {
    position: fixed;
    top:115px;
  }
  .tab {
    margin-top: 204px;
    display: flex;
    /*justify-content: space-around;*/
    /*padding: 0 10px;*/
    background: ghostwhite;
  }
  .tab>div {
    width:25%;
    text-align: center;
    font-size: 14px;
    padding: 8px 0;
  }
  .active {
    border-bottom: 2px solid rgba(234, 6, 6, 1);;
  }
  .tab1 {
    position: fixed;
    top: 48px;
    overflow: hidden;
    /*padding: 0 10px;*/
    background: ghostwhite;
    width:100vw;
    z-index: 2;
    box-shadow: 0px 5px 10px #ccc;
  }
  .tab1>span {
    display: inline-block;
    width:24%;
    text-align: center;
    font-size: 14px;
    padding: 8px 0;
  }
</style>
