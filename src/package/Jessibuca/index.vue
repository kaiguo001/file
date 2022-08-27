<template>
  <div class="video">
      <div class="title" v-if="hasTitle">{{title}}</div>
      <div  ref="container"></div>
  </div>
</template>
<script>
export default {
  name: "jessibucaPlayer",
  props: {
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '通道一',
      required: false
    },
    deviceCode: {
      type: String,
      default: ''
    },
    channelCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      jessibuca: null,
      wasm: false,
      vc: "ff",
      playing: false,
      quieting: true,
      loaded: false, // mute
      showOperateBtns: true,
      showBandwidth: true, // 显示网速
      err: "",
      speed: 0,
      performance: "",
      volume: 1,
      rotate: 0,
      useWCS: true,
      useMSE: true,
      useOffscreen: false,
      recording: false,
      recordType: 'webm',
      scale: 0,

    };
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    create(options) {
      options = options || {};
      this.jessibuca = new window.Jessibuca(
          Object.assign(
              {
                container: this.$refs.container,
                videoBuffer:0.2,  // 缓存时长
                isResize: false,
                useWCS: this.useWCS,
                useMSE: this.useMSE,
                text: "",
                loadingText: "疯狂加载中...",
                debug: true,
                supportDblclickFullscreen: true,
                showBandwidth: this.showBandwidth, // 显示网速
                operateBtns: {
                  fullscreen: true,
                  screenshot: this.showOperateBtns,
                  play: this.showOperateBtns,
                  audio: this.showOperateBtns,
                },
                forceNoOffscreen: !this.useOffscreen,
                isNotMute: true,
                timeout: 10
              },
              options
          )
      );
      this.jessibuca.play(this.url+'.flv')
      const _this = this;
      this.jessibuca.on("pause", function () {
        _this.playing = false;
      });

      this.jessibuca.on("mute", function (msg) {
        _this.quieting = msg;
      });

      this.jessibuca.on("play", () => {
        this.playing = true;
        this.loaded = true;
        this.quieting = this.jessibuca.isMute();
      });
    },
    destroy() {
      if (this.jessibuca) {
        this.jessibuca.destroy();
      }
      this.playing = false;
      this.loaded = false;
    },
  },
  computed: {
    deviceChannel() {
      let deviceChannel = ''
      if (this.deviceCode && this.channelCode) {
        deviceChannel = this.deviceCode + '_' + this.channelCode
      } else {
        deviceChannel = ''
      }
      return deviceChannel
    }
  },
  watch: {
    url: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.create()
          })
        } 
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang='less' scoped>

.video{
  width: 100%;
  height: 100%;
  position: relative;
    #container {
      background: rgba(13, 14, 27, 0.7);
      width: 100%;
      height: 100%;
    }
    .title{
      position: absolute;
      right: 5px;
      top: 5px;
      color: #000;
      background-color: #ffbb1f;
      font-size: 16px;
      padding: 2px 5px;
      border-radius: 5px;
      z-index:50
    }
}
</style>
