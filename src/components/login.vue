<template>
  <div class="hello">
    <h2>网易云音乐</h2>
    <van-cell-group>
  <van-field
    v-model="username"
    label="用户名"
    icon="clear"
    placeholder="请输入用户名"
    required
    @click-icon="username = ''"
    class="top"
  />
  <van-field
    v-model="password"
    type="password"
    label="密码"
    placeholder="请输入密码"
    required
  />
</van-cell-group>
<van-button type="danger" block v-on:click="login()" class="btn">登录</van-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username:'',
      password:'',
    }
  },
  methods: {
    login() {
      let user = this.username;
      let pass = this.password;
      this.axios({
              url:this.HOST+`/login/cellphone?phone=${user}&password=${pass}`,
              method:'get',
          }).then((res)=>{
              console.log(res.data);
              this.$store.state.userId=res.data.profile.userId;
              let data = res.data;
              if(data.code===200){
                localStorage.setItem('params' , JSON.stringify(data));
                this.$store.state.params = data;
                this.$router.push({path:'/home'});
              }
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  margin-top: 35%;
}
.btn {
  margin-top: 10%;
}
</style>
