<template>
  <div id="paihang">
    <div style="margin-top: 50px;"></div>
    <div v-for="(i, index) in avatars" v-on:click="tobangdan(index)" class="bdi">
      <div>
        <img v-lazy="i.img" alt="">
      </div>
      <div style="margin-left: 10px;font-size: 14px;position: absolute;bottom: 24px;left: 70px">
        {{i.name}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'paihang',
    data: () => ({
      avatars: [
        {img:'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',name:'云音乐新歌榜'},
        {img:'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',name:'云音乐热歌榜'},
        {img:'http://p1.music.126.net/ps6WTvt1FnbOoYvUPDdzOA==/3394192433248383.jpg',name:'网易原创歌曲榜'},
        {img:'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',name:'云音乐飙升榜'},
        {img:'http://p1.music.126.net/itKGQZjyXuRCTynXQohBIA==/1382086120458223.jpg',name:'云音乐电音榜'},
        {img:'http://p1.music.126.net/mJLDxxdw0tUH5GcvqkBgKw==/1330409069652865.jpg',name:'UK排行榜周榜'},
        {img:'http://p1.music.126.net/BmeUMF4Cr0f343lCwj1_7Q==/2105564767199852.jpg',name:'美国Billboard周榜'},
        {img:'http://p1.music.126.net/UN8g4epoFk-I4DV_C8w32A==/2922501907760617.jpg',name:'KTV嗨榜'},
        {img:'http://p1.music.126.net/2mNuQJ8P3OG3pPQH1MDrpQ==/1996713116054059.jpg',name:'iTunes榜,'},
        {img:'http://p1.music.126.net/ZRvvfxWy6l12Kzth56Jzaw==/2034096511385987.jpg',name:'Hit FM Top榜'},
        {img:'http://p1.music.126.net/Fy6BPbDk08FT-PeAsRehfQ==/2096768674178104.jpg',name:'日本Oricon周榜'},
        {img:'http://p1.music.126.net/kSDPQ1aRPPf1GXHwICGLvg==/1367792472071827.jpg',name:'韩国Melon排行榜周榜'},
        {img:'http://p1.music.126.net/jvKjUrD2inwNsjW5trHwqQ==/2075877953250337.jpg',name:'韩国Mnet排行榜周榜'},
        {img:'http://p1.music.126.net/kSDPQ1aRPPf1GXHwICGLvg==/1367792472071827.jpg',name:'韩国Melon原声周榜'},
        {img:'http://p1.music.126.net/d8faOLHxwWPta02fskrdDQ==/2057186255569164.jpg',name:'中国TOP排行榜(港台榜)'},
        {img:'http://p1.music.126.net/d8faOLHxwWPta02fskrdDQ==/2057186255569164.jpg',name:'中国TOP排行榜(内地榜)'},
        {img:'http://p1.music.126.net/2sEDxeLAtypdLG8M_1hxVA==/5932964743618704.jpg',name:'香港电台中文歌曲龙虎榜'},
        {img:'http://p1.music.126.net/N2whh2Prf0l8QHmCpShrcQ==/19140298416347251.jpg',name:'华语金曲榜'},
        {img:'http://p1.music.126.net/tgLdvFIFcKAx24QCrYdYPw==/19071029184053433.jpg',name:'中国嘻哈榜'},
        {img:'http://p1.music.126.net/i4fckV2iFS1lYkmbqnnuNQ==/109951163096934554.jpg',name:'法国NRJEuroHot 30周榜'},
        {img:'http://p1.music.126.net/j2-VFcgGXRvSzDfHuvwJOw==/2095669162549019.jpg',name:'台湾Hito排行榜'},
        {img:'http://p1.music.126.net/seSiaALVBi8876N-pge1Bg==/3125911557823806.jpg',name:'Beatport全球电子舞曲榜'},
        {img:'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',name:'云音乐ACG音乐榜'},
        {img:'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',name:'云音乐嘻哈榜'}
      ]
    }),
    methods:{
      tobangdan(ids){
        console.log(ids)
        this.$router.push({path:'/bangdan',query:{type:ids}})
      }
    }
  }
</script>
<style scpoed>
  img {
    width:60px;
  }
  .bdi {
    display: flex;
    padding-left:5px;
    background: ghostwhite;
    margin-bottom:5px;
    box-shadow: 0 3px 5px #e0e0e0;
    position: relative;
  }
</style>
