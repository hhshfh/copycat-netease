<template>
  <div id="musiclist">
    <div class="bg">
      <van-row>
        <div class="m_list" v-for="(i,index) in listitem">
          <router-link tag="div" :to="{path:'/songlist',query:{id:i.id}}">
            <van-col span="4">
              <div class="listavatar">
                <img v-lazy="i.imgUrl" alt="" class="">
              </div>
            </van-col>
            <van-col span="16">
              <div class="name_count">
                <div>{{i.name}}</div>
                <div>{{i.count}}</div>
              </div>
            </van-col>
            <van-col span="4">
              <van-icon name="more"/>
            </van-col>
          </router-link>
        </div>
      </van-row>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'musiclist',
    data: () => ({}),
    props: {
      listitem: {type: Array, default: [{}]}
    },
    methods:{
      getBase(){
        alert(1)
      }
    }
  }
</script>
<style scpoed>
  .m_list {
    width: 92%;
    height: 55px;
    margin-bottom: 10px;
    padding: 5px 4%;
    border-bottom: 2px solid #ff462c;
    /*background: white;*/
    /*background: -moz-linear-gradient(left, #ea2000 0%, #ff462c 100%); !* FF3.6-15 *!*/
    /*background: -webkit-linear-gradient(left, #ea2000 0%,#ff462c 100%); !* Chrome10-25,Safari5.1-6 *!*/
    /*background: linear-gradient(to right, #ea2000 0%,#ff462c 100%); !* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ *!*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*align-items: center;*/
  }

  .listavatar > img {
    width: 55px;
    border-radius: 60px;
  }

  .bg {
    background: #2b2b2b;
    padding: 8px 0;
    color: white;
    /*display: flex;*/
    /*justify-content: center;*/
  }

  .name_count {
    margin-left: 15px;

  }
  .rw {
    width: 100vw;
    outline:1px solid grey;
    height:100vh;
  }
</style>
