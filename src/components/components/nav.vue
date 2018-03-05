<template>
  <div id="mynav">
    <nav class="nav" v-bind:class="{'op2':isA,'op1':isB}">
      <van-icon :name="wap" style="margin-left:15px" v-on:click="_back()"/>
      <div class="nav-center">
        <van-icon name="like-o" v-on:click="toHome()"/>
        <van-icon name="wap-home" v-on:click="toCenter()"/>
        <van-icon name="contact" v-on:click="toMine()"/>
      </div>
      <van-icon name="search" style="margin-right:15px" v-on:click="_tosearch()"/>
    </nav>
    <mt-popup v-model="popupVisible" position="left"><!--弹出层-->
      <div style="width: 50vw;height: 100vh">
        <mt-button style="width: 100%" type="danger" size="small">退出登录</mt-button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    name: 'mynav',
    data: () => ({
      isA: true,
      isB: false,
      wap: 'wap-nav',
      centerShow: true,//控制中间三个图标的显示与隐藏
      popupVisible: false
    }),
    methods: {
      handleScroll() {
        let top = window.pageYOffset;
        if (top > 150) {
          this.isB = true;
          this.isA = false;
        } else if (top < 35) {
          this.isB = false;
          this.isA = true;
        }
      },
      _back() {
        if (this.wap == 'arrow-left') {
          return window.history.back();
        } else if (this.wap == 'wap-nav') {
          this.popupVisible=this.popupVisible?false:true;
        }
      },
      _tosearch() {
        this.$router.push({path:'/search'})
      },
      toHome(){
        this.$router.push({path:'/home'})
      },
      toCenter(){
        this.$router.push({path:'/center'})
      },
      toMine(){
        this.$router.push({path:'/mine'})
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    watch: {
      $route() {
        this.wap = this.$store.state.goBack
      }
    }
  }
</script>
<style scpoed>
  .nav {
    position: fixed;
    top: 0;
    color: white;
    display: block;
    /*width: 100%;*/
    width: 100vw;
    height: 20px;
    padding: 14px 0;
    display: flex;
    justify-content: space-between;
    transition: .3s all ease;
    z-index: 2;
  }

  .op2 {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .op1 {
    background-color: rgba(234, 6, 6, 1);
  }

  .nav-center {
    width: 45%;
    display: flex;
    justify-content: space-around;

  }
</style>
