<template>
  <div id="mv">
    <div class="mvMain">
      <div v-for="(i, index) in mvs" class="mv_list">
        <div class="mv_l">
          <img v-lazy="i.imgurl" alt="">
          <div class="plcount">
            <van-icon name="play" style="margin-right: 5px"/>
            {{i.playCount}}
          </div>
        </div>
        <div class="mv_r">
          <div style="font-size: 14px; word-break:break-all;">
            {{i.name}}&nbsp;
            <mt-badge size="small" type="error">MV</mt-badge>
          </div>
          <div style="font-size: 12px;color: grey">
            {{duration(i.duration)}}
          </div>
          <div style="font-size: 12px;color: grey">
            {{i.publishTime}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mv',
    data: () => ({
      mvs: []
    }),
    mounted() {
      let id = this.$route.query.artId;
      this.axios.get(this.HOST + `/artist/mv?id=${id}`).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.mvs = res.data.mvs;
        }

      })
    },
    methods: {
      duration(t) {
        let m = Math.floor((t / 1000) / 60);
        let s = (t / 1000) % 60 < 10 ? '0' + (t / 1000) % 60 : (t / 1000) % 60;
        return m + ':' + s;
      }
    }
  }
</script>
<style scpoed>
  .mvMain {
    background: white;
  }

  .mvMain > div {
    /*padding: 0 10px;*/
    display: flex;
    justify-content: flex-start;
  }

  .mv_l > img {
    width: 100px;
  }

  .mv_list {
    background: ghostwhite;
    padding: 5px 10px;
    margin-bottom: 6px;
  }

  .mv_r {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .mv_l {
    position: relative;
  }

  .plcount {
    font-size: 12px;
    color: white;
    position: absolute;
    right: 5px;
    top: 5px;
    display: flex;
    align-items: center;
  }
</style>
