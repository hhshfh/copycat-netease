<template>
  <div id="comment"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="hot">精彩评论</div>
    <div v-for="(i,index) in hotComments" class="main">
      <div class="top" style="font-size: 12px">
        <img v-lazy="i.user.avatarUrl" alt="">
        <div class="topR">
          <div class="left">
            <p>{{i.user.nickname}}</p>
            <p style="color: grey;">{{getLocalTime(i.time)}}</p>
          </div>
          <div class="right">
            <van-icon name="like-o" v-bind:class="{'liked':i.liked}" v-on:click="like(i.commentId, index, 'ishot')"/>
            <span>
              {{i.likedCount}}
            </span>

          </div>
        </div>
      </div>
      <div class="bottom">
        <div style="margin: 0" v-html="i.content.replace(/\n/g, '</br>')"></div>
      </div>
    </div>
    <div class="hot">全部评论({{total}})</div>
    <div v-for="(i,index) in comments" class="main">
      <div class="top" style="font-size: 12px">
        <img v-lazy="i.user.avatarUrl" alt="">
        <div class="topR">
          <div class="left">
            <p>{{i.user.nickname}}</p>
            <p style="color: grey;">{{getLocalTime(i.time)}}</p>
          </div>
          <div class="right">
            <van-icon name="like-o" v-bind:class="{'liked':i.liked}" v-on:click="like(i.commentId, index, 'nohot')"/>
            <span>
              {{i.likedCount}}
            </span>

          </div>
        </div>
      </div>
      <div class="bottom">
        <div style="margin: 0" v-html="i.content.replace(/\n/g, '</br>')"></div>
      </div>
    </div>
    <!--<infinite-loading @infinite="infiniteHandler"></infinite-loading>-->
  </div>
</template>
<script>
//  import InfiniteLoading from 'vue-infinite-loading';
import $ from 'jquery'
  export default {
    name: 'comment',
    data: () => ({
      hotComments: [],
      comments: [],
      busy: false,
      page: 0,
      total:0,//总评论数
    }),
    components: {
//      InfiniteLoading
    },
    mounted() {
      let _this = this;
      this.axios.all([
        this.axios.get('/api' + `/comment/music/?id=${this.$route.query.id}&offset=0`)
      ]).then(this.axios.spread((commentData) => {
        _this.hotComments = commentData.data.hotComments;//热评
        _this.comments = commentData.data.comments;//普通评论
        _this.total = commentData.data.total;//总数量
      }))
      console.log('jq!!',$('.right'))
    },
    methods: {
      getLocalTime(nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      loadMore() {
        let _this = this;
        _this.page+=20;
//        setTimeout(() => {
          _this.axios.all([
            _this.axios.get(this.HOST + `/comment/music/?id=${this.$route.query.id}&offset=${_this.page}`)
          ]).then(_this.axios.spread((commentData) => {
            console.log(commentData.data);
            _this.comments=_this.comments.concat(commentData.data.comments);
          }))
//        },1000);
      },
      like(cid, index, isnohot){//给歌曲评论点赞,cid:评论id；index:点赞的评论索引；isnohot:点赞目标是否是热评
        if (isnohot=='ishot') {
          if(this.hotComments[index].liked==true) {
            this.$toast('已经点过赞啦');
            return;
          }
          this.hotComments[index].liked=true;
          this.hotComments[index].likedCount+=1;
        } else if (isnohot=='nohot') {
          if(this.comments[index].liked==true) {
            this.$toast('已经点过赞啦');
            return;
          }
          this.comments[index].liked=true;
          this.comments[index].likedCount+=1;
        }
        let _this = this;
        this.axios.all([
          this.axios.get(this.HOST + `/comment/like?id=${this.$route.query.id}&cid=${cid}&t=1&type=0`)
        ]).then(this.axios.spread((commentData) => {
          if(commentData.data.code===200){
            this.$toast('点赞成功！');
          } else {
            this.$toast('评论不存在的');
          }
          console.log(commentData.data);
        }))
      }
    }
  }
</script>
<style scpoed>
  #comment {
    padding: 10px;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: ghostwhite;
    margin: 15px 0;
    padding: 10px;
    border-radius: 5px;
  }

  .top {
    display: flex;
    justify-content: flex-start;
  }

  .top > img {
    width: 12%;
    height: 12%;
    border-radius: 50px;
    margin-right: 4%;
  }

  .topR {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .topR > div > p {
    margin: 0;
  }

  .bottom {
    margin: 5px 0;
    font-size: 14px;
  }

  .right {
    color: grey;
  }

  .hot {
    margin-top: 45px;
    margin-bottom: -15px;
    font-size: 14px;
    border-radius: 5px;
    background: ghostwhite;
    padding: 5px;
    text-align: center;
  }

  .liked {/*点赞过的样式*/
    color: red;
  }
</style>
