<template>
  <div id="app">
    <mynav v-show="navShow"></mynav>
    <transition :name="animateName">
      <keep-alive include="home,center,mine">
        <router-view></router-view>
      </keep-alive>

    </transition>
    <playbar v-show="playbarShow"></playbar>
  </div>
</template>

<script>
  import mynav from '@/components/components/nav'
  import playbar from '@/components/components/playbar'
  export default {
    name: 'app',
    data: () => ({
      animateName: 'right',
      navShow: false,
//      playbarShow: false
    }),
    components: {
      mynav, playbar
    },
    computed:{
      playbarShow(){
        return this.$store.state.trackIds.length ? true : false
      }
    },
    watch: {
      $route(to, from) {
        console.log('去往indedx:',to.meta.index)
        this.animateName = to.meta.index > from.meta.index ? 'right' : 'left';
        if (to.meta.index == 2 || to.meta.index == 999 || to.meta.index == 1.11 || to.meta.index == 1.12) {
          this.$store.state.goBack = 'arrow-left'
        } else {
          this.$store.state.goBack = 'wap-nav'
        }
        //this.playbarShow = to.meta.index != 0 ? true : false;//控制playbar的显示与隐藏
//        this.navShow = (to.meta.index !=0 && to.meta.index !=4) ? true : false;//控制nav的显示与隐藏
        if (to.meta.index !=0 && to.meta.index !=4){
          if (to.meta.index>=6&&to.meta.index!=999){
            this.navShow = false
          } else {
            this.navShow = true
          }
        } else {
          this.navShow = false
        }
      }
    }
  }
</script>

<style scoped>

  .left-enter {
    transform: translateX(-100%);
    position: absolute;
    left: 0;
    top: 0;
  }

  .left-enter-active {
    transition: .2s all ease;
    position: absolute;
    left: 0;
    top: 0;
  }

  .left-leave-active {
    transition: .2s all ease;
    position: absolute;
    left: 0;
    top: 0;
  }

  .left-leave-to {
    transform: translateX(100%);
    position: absolute;
    left: 0;
    top: 0;
  }

  .right-enter {
    transform: translateX(100%);
    position: absolute;
    left: 0;
    top: 0;
  }

  .right-enter-active {
    transition: .2s all ease;
    position: absolute;
    left: 0;
    top: 0;
  }

  .right-leave-active {
    transition: .2s all ease;
    position: absolute;
    left: 0;
    top: 0;
  }

  .right-leave-to {
    transform: translateX(-100%);
    position: absolute;
    left: 0;
    top: 0;
  }

</style>
