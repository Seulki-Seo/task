<script>
import StreamAPI from "@/api/StreamAPI";

export default {
  name: "App",
  data() {
    return {
      modelInfo: {
        prediction: "",
        bbox: {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        },
        date: "",
        time: "",
        model: "",
        line_num: "",
        image_path: "",
      },
      modelPic: {
        image_path: "",
      },
    };
  },
  computed: {
    cutImgUrl() {
      //이미지 주소 가지고 오기
      if (typeof this.modelPic === "string") {
        const modelPicArray = this.modelPic.split("/");
        console.log(modelPicArray);
        return modelPicArray[4];
      }
      return "";
    },
  },
  components: {},
  methods: {
    refreshAll() {
      this.$router.go(0);
    },
    async getModelData() {
      /**
       * 검사 모드
       */
      try {
        const { data } = await StreamAPI.v1.getModelData({
          ...this.modelInfo,
        });
        if (data) {
          console.log("이벤트 성공", data);
          this.modelInfo = data;
          this.modelPic = data.image_path;
        } else {
          //
          console.log(data);
        }
      } catch (error) {
        console.error("이벤트 실패", error);
      }
    },
  },
  created() {
    this.getModelData();
  },
};
</script>

<template>
  <header>
    <h1 class="logo">🤖 i-Platform</h1>
    <h2 class="title">실시간 품질 검사 –</h2>
    <nav>
      <ul>
        <li>❕&nbsp;문의하기</li>
        <li>❔&nbsp;도움말</li>
      </ul>
    </nav>
  </header>
  <section>
    <div class="view_model">
      <div class="top">
        <div class="model_info">
          <ul>
            <li>
              <span class="info_title"> 모델 정보 </span>
              <span class="info_desc">
                {{ modelInfo.model }}
              </span>
            </li>
            <li>
              <span class="info_title"> 호기 </span>
              <span class="info_desc">
                {{ modelInfo.line_num }}
              </span>
            </li>
            <li>
              <span class="info_title"> 검사 일시 </span>
              <span class="info_desc">
                {{ modelInfo.date }}
              </span>
            </li>
            <li>
              <span class="info_title"> 검사 시간 </span>
              <span class="info_desc">
                {{ modelInfo.time }}
              </span>
            </li>
            <li>
              <span class="info_title"> 검출 객체 수 </span>
              <span class="info_desc">
                {{ modelInfo.prediction }}
              </span>
            </li>
          </ul>
        </div>
        <div class="model_set">
          <ul>
            <li>
              <span class="set_title"> 검사 구역 설정(ROI) </span>
              <span class="set_desc">
                검사 구역을 설정하려면<br />
                이곳을 클릭하세요.
              </span>
            </li>
            <li>
              <span class="set_title"> Setting </span>
              <span class="set_desc">
                검사 조건을 설정하려면<br />
                이곳을 클릭하세요.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="bot">
        <h3>Monitoring</h3>
        <div class="model_img">
          <div class="img_box" v-if="cutImgUrl !== ''">
            <img :src="'/assets/' + cutImgUrl" alt="" />
            <div class="img_title">
              {{ cutImgUrl }}
            </div>
          </div>
          <div class="set_box">
            <ul class="set_list">
              <li>
                <button @click="refreshAll">🔃&nbsp;새로고침</button>
              </li>
              <li>
                <button @click="getModelData">⏩&nbsp;검사 모드</button>
              </li>
              <li>
                <button>⏹️&nbsp;검사 중지</button>
              </li>
            </ul>
            <div class="btn_view">☑️&nbsp;ROI View</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
