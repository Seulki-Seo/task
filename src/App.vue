<template>
  <header>
    <h1 class="logo">
      🤖 i-Platform
    </h1>
    <h2 class="title">
      실시간 품질 검사 –
    </h2>
    <nav>
      <ul>
        <li>
          ❕&nbsp;문의하기
        </li>
        <li>
          ❔&nbsp;도움말
        </li>
      </ul>
    </nav>
  </header>
  <section>
    <div class="view_model">
      <div class="top">
        <div class="model_info">
          <ul>
            <li>
              <span class="info_title">
                모델 정보
              </span>
              <span class="info_desc">
                {{ modelInfo.model }}
              </span>
            </li>
            <li>
              <span class="info_title">
                호기
              </span>
              <span class="info_desc">
                {{ modelInfo.line_num }}
              </span>
            </li>
            <li>
              <span class="info_title">
                검사 일시
              </span>
              <span class="info_desc">
                {{ modelInfo.date }}
              </span>
            </li>
            <li>
              <span class="info_title">
                검사 시간
              </span>
              <span class="info_desc">
                {{ modelInfo.time }}
              </span>
            </li>
            <li>
              <span class="info_title">
                검출 객체 수
              </span>
              <span class="info_desc">
                {{ modelInfo.prediction }}
              </span>
            </li>
          </ul>
        </div>
        <div class="model_set">
          <ul>
            <li>
              <span class="set_title">
                검사 구역 설정(ROI)
              </span>
              <span class="set_desc">
                검사 구역을 설정하려면<br>
                이곳을 클릭하세요.
              </span>
            </li>
            <li>
              <span class="set_title">
                Setting
              </span>
              <span class="set_desc">
                검사 조건을 설정하려면<br>
                이곳을 클릭하세요.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="bot">
        <h3>Monitoring</h3>
        <div class="model_img">
          <div class="img_box">
            <img :src="require('./assets/' + cutImgUrl)" alt="">
            <div class="img_title">
              {{ cutImgUrl }}
            </div>
          </div>
          <div class="set_box">
            <ul class="set_list">
              <li>
                <button v-on:click="refreshAll">
                  🔃&nbsp;새로고침
                </button>
              </li>
              <li>
                <button v-on:click="modelData">
                  ⏩&nbsp;검사 모드
                </button>
              </li>
              <li>
                <button>
                  ⏹️&nbsp;검사 중지
                </button>
              </li>
            </ul>
            <div class="btn_view">
              ☑️&nbsp;ROI View
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      modelInfo: {
          "prediction": "",
          "bbox": {
            "left": 0,
            "top": 0,
            "width": 0,
            "height": 0
          },
          "date": "",
          "time": "",
          "model": "",
          "line_num": "",
          "image_path": ""
      },
      modelPic: {
        "image_path": "",
      },
    }
  },
  computed: {
    cutImgUrl() {
      //이미지 주소 가지고 오기
      const modelPicArray = this.modelPic.split('/');
      console.log(modelPicArray);
      return modelPicArray[4];
    },
  },
  components: {

  },
  methods: {
    refreshAll() {
      this.$router.go(0);
    },
    modelData(){
      /**
       * 검사 모드
       */
      axios.get('http://183.105.120.175:30060/stream/infer', {
        "prediction": "",
        "bbox": {
          "left": 0,
          "top": 0,
          "width": 0,
          "height": 0
        },
        "date": "",
        "time": "",
        "model": "",
        "line_num": "",
      })
      .then(res => {
        console.log("이벤트 성공", res);
        this.modelInfo = res.data;
        this.modelPic = res.data.image_path;
      })
      .catch(err => {
        console.log("이벤트 실패", err);
      });
    },
  },
  created() {
    axios.get('http://183.105.120.175:30060/stream/infer')
    /**
     * API 호출
     */
      .then(res => {
        console.log("get 성공", res);
      })
      .catch(err => {
        console.log("get 실패", err);
      });
  },
}
</script>

<style>
#app {
  font-family: 'Pretendard';
  color: #333;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #ebebeb;
}

/* 왼편 메뉴 / 헤더 */
#app header {
  min-width: 230px;
  background: #2f397c;
  padding: 50px 0 0 20px;
  color: #fff;
}
#app header .logo {
  font-size: 2.5rem;
  padding-bottom: 20px;
}
#app header .title {
  font-weight: 400;
  padding-bottom: 50px;
}
#app header nav ul li + li {
  padding-top: 15px;
}

/* 오른편 컨텐츠 / 섹션 */
#app section {
  width: calc(100% - 230px);
  margin: 40px;
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.05);
}
#app section .view_model .top {
  display: flex;
  align-items: center;
}

/* 모델 정보 */
#app section .view_model .top .model_info {
  width: 50%;
  height: 65px;
  padding: 10px;
  background: #f7f7f7;
}
#app section .view_model .top .model_info ul {
  display: flex;
  align-items: center;
}
#app section .view_model .top .model_info ul li {
  position: relative;
  text-align: center;
  width: 20%;
}
#app section .view_model .top .model_info ul li + li:before {
  content: "";
  display: block;
  width: 1px;
  height: 25px;
  background: #e1e1e1;
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  left: 0;
}
#app section .view_model .top .model_info ul li .info_title {
  font-size: 1.2rem;
  color: #999;
  padding-bottom: 10px;
}
#app section .view_model .top .model_info ul li .info_desc {
  font-size: 1.7rem;
}

/* 검사 구역 설정, 세팅 */
#app section .view_model .top .model_set {
  width: 50%;
}
#app section .view_model .top .model_set ul {
  display: flex;
  justify-content: flex-end;
  font-size: 1.4rem;
  text-align: center;
}
#app section .view_model .top .model_set ul li + li {
  margin-left: 15px;
}
#app section .view_model .top .model_set ul li .set_title {
  background: #2f397c;
  color: #fff;
  height: 30px;
  line-height: 30px;
  border-radius: 5px 5px 0 0;
}
#app section .view_model .top .model_set ul li .set_desc {
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 0 0 10px 10px;
  font-size: 1.3rem;
  color: #999;
  line-height: 1.5;
}

#app section .view_model .bot {
  margin-top: 20px;
}
#app section .view_model .bot h3 {
  font-size: 2.8rem;
  margin-bottom: 15px;
}

/* 모델 이미지 */
#app section .view_model .bot .model_img {
  display: flex;
}
#app section .view_model .bot .model_img .img_box {
  width: 80%;
  position: relative;
}
#app section .view_model .bot .model_img .img_box:before {
  content: "";
  display: block;
  border: 2px solid #ff0000;
  position: absolute;
  left: 1144;
  top: 195;
  width: 71px;
  height: 109px;
}
#app section .view_model .bot .model_img .img_box .img_title {
  text-align: center;
  padding-top: 10px;
}
#app section .view_model .bot .model_img .set_box {
  width: 20%;
  padding-left: 25px;
  display: flex;
  flex-direction: column;
}
#app section .view_model .bot .model_img .set_box .set_list {
  padding-top: 15px;
}
#app section .view_model .bot .model_img .set_box .set_list li + li {
  margin-top: 12px;
}
#app section .view_model .bot .model_img .set_box .btn_view {
  margin-top: 100px;
}

/* 초기화 */
html {
  font-size: 62.5%;
}
body {
  font-size: 1.5rem;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
a {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}
img {
  max-width: 100%;
}
span {
  display: block;
}
</style>
