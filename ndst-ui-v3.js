import { openBlock as C, createElementBlock as R, normalizeStyle as G, createElementVNode as b, createCommentVNode as xt, normalizeClass as Ge, toDisplayString as Xe, pushScopeId as Wt, popScopeId as Bt, Fragment as Oe, renderList as De, warn as xi, inject as zt, ref as Ie, computed as H, unref as Ee, isRef as Xn, getCurrentInstance as qn, provide as Pi, reactive as Ci, defineComponent as Ni, h as et, Transition as Ri, withCtx as Pt, withDirectives as Ct, createVNode as Q, vShow as Ei, createApp as Li, toRefs as Ii, nextTick as Zn, resolveComponent as q, resolveDirective as Jn, createBlock as Qn, createTextVNode as Kn } from "vue";
const Ye = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, Yi = {
  name: "ndVerifycode",
  props: {
    width: {
      type: Number,
      default: 320
    },
    height: {
      type: Number,
      default: 160
    },
    blockW: {
      // 裁剪canvas宽高
      type: Number,
      default: 40
    },
    accuracy: {
      // 精度
      type: Number,
      default: 1
    },
    images: {
      // 背景图
      type: Array,
      default: () => [
        "/verifyImg1.png",
        "/verifyImg2.png",
        "/verifyImg3.png"
      ]
    }
  },
  data() {
    return {
      bgImg: null,
      // 背景图
      ctxImg: null,
      // 背景画笔
      ctxBlock: null,
      // 滑块画笔
      blockRect: {
        // 滑块宽、圆半径、坐标
        w: this.blockW + 2 * this.blockW / 4,
        r: this.blockW / 4,
        x: 0,
        y: 0
      },
      blockLeft: 0,
      // 裁剪后left属性
      startX: 0,
      // 滑动起点
      EndX: 0,
      // 结束位置
      sliderLeft: 0,
      // 拖动滑块的滑动距离
      slideState: "",
      // success fail active
      timeIns: null,
      showText: !0,
      // 是否显示滑动提示
      isMouseDown: !1
    };
  },
  mounted() {
    this.init(), this.isMobile() || this.mouseEvent();
  },
  beforeDestroy() {
    clearTimeout(this.timeIns);
  },
  methods: {
    isMobile() {
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    },
    init() {
      this.ctxImg = this.$refs.canvas_img.getContext("2d"), this.ctxBlock = this.$refs.canvas_block.getContext("2d"), this.getImg();
    },
    getImg() {
      const e = document.createElement("img"), t = this.images.length, s = Math.floor(Math.random() * t);
      e.crossOrigin = "Anonymous", e.src = this.images[s], this.bgImg = e, e.onload = () => {
        this.ctxImg.drawImage(this.bgImg, 0, 0, this.width, this.height), this.getBlockPostion(), this.ctxBlock.drawImage(this.bgImg, 0, 0, this.width, this.height);
        const n = this.blockRect.y - 2 * this.blockRect.r, r = this.ctxBlock.getImageData(this.blockRect.x, n, this.blockRect.w, this.blockRect.w + 1);
        this.$refs.canvas_block.width = this.blockRect.w, this.ctxBlock.putImageData(r, 0, n);
      };
    },
    getBlockPostion() {
      const e = Math.floor(this.width / 2 + Math.random() * (this.width / 2 - this.blockRect.w)), t = Math.floor(30 + Math.random() * (this.height - this.blockRect.w - 30));
      this.blockRect.x = e, this.blockRect.y = t, this.draw(this.ctxImg, "fill"), this.draw(this.ctxBlock, "clip");
    },
    draw(e, t) {
      const { r: s, x: n, y: r } = this.blockRect, i = this.blockW;
      e.beginPath(), e.moveTo(n, r), e.arc(n + i / 2, r - s + 2, s, 0.72 * Math.PI, 2.26 * Math.PI), e.lineTo(n + i, r), e.arc(n + i + s - 2, r + i / 2, s, 1.21 * Math.PI, 2.78 * Math.PI), e.lineTo(n + i, r + i), e.lineTo(n, r + i), e.arc(n + s - 2, r + i / 2, s + 0.4, 2.76 * Math.PI, 1.24 * Math.PI, !0), e.lineTo(n, r), e.closePath(), e.fillStyle = "rgba(225, 225, 225, 0.8)", e.strokeStyle = "rgba(225, 225, 225, 0.8)", e.lineWidth = 2, e.stroke(), e[t]();
    },
    mouseEvent() {
      this.$refs["slider-icon"].addEventListener("mousedown", this.mouseDown), document.addEventListener("mousemove", this.mouseMove), document.addEventListener("mouseup", this.mouseUp);
    },
    mouseDown(e) {
      this.startX = e.pageX, this.showText = !1, this.isMouseDown = !0;
    },
    mouseMove(e) {
      this.isMouseDown && (this.endX = e.pageX - this.startX, !(this.endX < 0 || this.endX > this.width - this.blockW) && (this.sliderLeft = this.endX, this.blockLeft = this.sliderLeft / (this.width - this.blockW) * (this.width - this.blockRect.w), this.slideState = "active"));
    },
    mouseUp(e) {
      if (!this.isMouseDown || this.startX === e.clientX)
        return;
      this.isMouseDown = !1, this.verify() ? this.slideState = "success" : (this.slideState = "fail", this.timeIns = setTimeout(() => {
        this.reset();
      }, 1e3));
    },
    // mobile
    touchStart(e) {
      this.startX = e.changedTouches[0].pageX, this.showText = !1;
    },
    touchMove(e) {
      this.endX = e.changedTouches[0].pageX - this.startX, !(this.endX < 0 || this.endX > this.width - this.blockW) && (this.sliderLeft = this.endX, this.blockLeft = this.sliderLeft / (this.width - this.blockW) * (this.width - this.blockRect.w), this.slideState = "active");
    },
    touchEnd() {
      this.verify() ? (this.slideState = "success", this.$emit("verifySuccess")) : (this.slideState = "fail", this.timeIns = setTimeout(() => {
        this.reset();
      }, 1e3));
    },
    // 判断精度
    verify() {
      return Math.abs(this.blockLeft - this.blockRect.x) <= this.accuracy;
    },
    // 重置
    reset() {
      this.showText = !0, this.slideState = "", this.sliderLeft = 0, this.blockLeft = 0, this.$refs.canvas_block.width = this.width, this.ctxImg.clearRect(0, 0, this.width, this.height), this.ctxBlock.clearRect(0, 0, this.width, this.height), this.getImg();
    }
  }
}, Fi = (e) => (Wt("data-v-22c25631"), e = e(), Bt(), e), Ui = /* @__PURE__ */ Fi(() => /* @__PURE__ */ b("svg", {
  t: "1637315258145",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "2420",
  width: "20",
  height: "20"
}, [
  /* @__PURE__ */ b("path", {
    d: "M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z",
    "p-id": "2421",
    fill: "#8a8a8a"
  })
], -1)), Hi = [
  Ui
], Wi = { class: "pic" }, Bi = ["width", "height"], zi = ["width", "height"], ji = {
  key: 0,
  class: "tip"
};
function Vi(e, t, s, n, r, i) {
  return C(), R("div", {
    class: "verify-container",
    style: G({ width: `${s.width}px` })
  }, [
    b("div", {
      class: "refresh",
      onClick: t[0] || (t[0] = (...a) => i.reset && i.reset(...a))
    }, Hi),
    b("div", Wi, [
      b("canvas", {
        class: "canvas_img",
        ref: "canvas_img",
        width: s.width,
        height: s.height
      }, null, 8, Bi),
      b("canvas", {
        class: "canvas_block",
        ref: "canvas_block",
        width: s.width,
        height: s.height,
        style: G({ left: r.blockLeft + "px" })
      }, null, 12, zi)
    ]),
    b("div", {
      class: "slider",
      style: G({ height: s.blockW + "px" })
    }, [
      r.showText ? (C(), R("div", ji, "向右滑动完成验证")) : xt("", !0),
      b("div", {
        class: Ge(["bar", r.slideState]),
        style: G({ width: r.sliderLeft + "px" })
      }, null, 6),
      b("div", {
        ref: "slider-icon",
        class: Ge(["slider-icon", r.slideState]),
        style: G({ left: r.sliderLeft + "px" }),
        onTouchstart: t[1] || (t[1] = (...a) => i.touchStart && i.touchStart(...a)),
        onTouchmove: t[2] || (t[2] = (...a) => i.touchMove && i.touchMove(...a)),
        onTouchend: t[3] || (t[3] = (...a) => i.touchEnd && i.touchEnd(...a))
      }, Xe({ active: ">", fail: "x", success: "√" }[r.slideState] || ">"), 39)
    ], 4)
  ], 4);
}
const Gi = /* @__PURE__ */ Ye(Yi, [["render", Vi], ["__scopeId", "data-v-22c25631"]]);
const Xi = {
  name: "ndStar",
  props: {
    num: {
      type: Number,
      default: 5,
      required: !1
    },
    score: {
      type: Number,
      default: 4.4,
      required: !1
    },
    width: {
      type: Number,
      default: 32,
      required: !1
    },
    space: {
      type: Number,
      default: 10,
      required: !1
    }
  },
  computed: {
    scoreNum() {
      return Math.floor(this.score) > this.num ? this.num : Math.floor(this.score);
    },
    floatWidth() {
      return (this.score - this.scoreNum) * this.width;
    }
  }
}, qi = { class: "startBg" }, Zi = { class: "startActive" };
function Ji(e, t, s, n, r, i) {
  return C(), R("div", {
    class: "startContainer",
    style: G({ height: s.width + "px" })
  }, [
    b("div", qi, [
      (C(!0), R(Oe, null, De(s.num, (a) => (C(), R("div", {
        class: "start",
        key: a,
        style: G({ width: s.width + "px", height: s.width + "px", "margin-right": s.space + "px" })
      }, null, 4))), 128))
    ]),
    b("div", Zi, [
      (C(!0), R(Oe, null, De(i.scoreNum, (a) => (C(), R("div", {
        class: "start",
        key: a,
        style: G({ width: s.width + "px", height: s.width + "px", "margin-right": s.space + "px" })
      }, null, 4))), 128)),
      i.scoreNum < s.score && i.scoreNum < s.num ? (C(), R("div", {
        key: 0,
        class: "floatStart",
        style: G({ width: i.floatWidth + "px", height: s.width + "px" })
      }, null, 4)) : xt("", !0)
    ])
  ], 4);
}
const Qi = /* @__PURE__ */ Ye(Xi, [["render", Ji]]);
const Ki = {
  name: "jessibucaPlayer",
  data() {
    return {
      player: null,
      url: "",
      containerShow: !0,
      playSignImgShow: !0
    };
  },
  mounted() {
  },
  methods: {
    create() {
      this.containerShow && (this.player = new Jessibuca({
        container: this.$refs.container,
        videoBuffer: 0.2,
        // 缓存时长
        isResize: !1,
        text: "",
        loadingText: "加载中...",
        debug: !1,
        showBandwidth: !0,
        // 显示网速
        operateBtns: {
          fullscreen: !0,
          screenshot: !0,
          play: !0,
          audio: !0,
          record: !0
        },
        forceNoOffscreen: !0,
        isNotMute: !1,
        hasAudio: !1,
        timeout: 30,
        isFlv: !0
      }), this.player.play(this.url), this.player.on("pause", (e) => {
        console.log("pause", e);
      }), this.player.on("error", () => {
        console.log("error");
      }), this.player.on("load", () => {
        this.playSignImgShow = !1;
      }), this.player.on("videoInfo", () => {
      }), this.player.on("play", () => {
        this.playSignImgShow = !0;
      }));
    },
    // 开始播放
    startPlay(e) {
      this.containerShow = !0, this.url = e, this.$nextTick(() => {
        this.create();
      });
    },
    // 销毁
    destroyInstance() {
      this.player && this.player.destroy(), this.containerShow = !1, this.playSignImgShow = !0, this.player = null;
    }
  }
}, $i = { class: "video" }, ea = {
  key: 0,
  class: "playSignImg"
}, ta = {
  key: 1,
  class: "container",
  ref: "container"
};
function sa(e, t, s, n, r, i) {
  return C(), R("div", $i, [
    r.playSignImgShow ? (C(), R("div", ea)) : xt("", !0),
    r.containerShow ? (C(), R("div", ta, null, 512)) : xt("", !0)
  ]);
}
const $n = /* @__PURE__ */ Ye(Ki, [["render", sa], ["__scopeId", "data-v-d8a2a6c1"]]);
const na = {
  props: {
    dateTime: {
      type: Array
    }
  },
  data() {
    return {
      timeList: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", " 23:00", "24:00"],
      timeSlotArrList: [],
      timeInfoXLine: 0,
      timeInfoX: 0,
      timeInfoY: 0,
      timeInfo: "",
      reduceX: 0
    };
  },
  methods: {
    getLeft() {
      let e = this.offsetLeft(this.$refs.lineDom);
      this.reduceX = e;
    },
    offsetLeft(e) {
      let t = e.offsetLeft, s = e.offsetParent;
      for (; s != null; )
        t += s.offsetLeft, s = s.offsetParent;
      return t;
    },
    getMouseXY(e) {
      let t = e.clientX - this.reduceX;
      this.timeInfoX = t - 14 + "px", this.timeInfoXLine = t + 11 + "px";
      const s = this.$refs.lineDom.clientWidth;
      let n = t / s, i = 60 * 60 * 24 * n, a = Math.floor(i / (60 * 60));
      a < 10 && (a = "0" + a);
      let o = i % (60 * 60), c = Math.floor(o / 60);
      c < 10 && (c = "0" + c);
      let p = Math.floor(o % 60);
      p < 10 && (p = "0" + p);
      let u = a + ":" + c + ":" + p;
      this.timeInfo = u;
    },
    // 计算时间
    computeTime(e) {
      let t = 86400, s = (e[0].slice(0, 2) - 0) * 60 * 60 + (e[0].slice(3, 5) - 0) * 60 + (e[0].slice(6, 8) - 0), n = (e[1].slice(0, 2) - 0) * 60 * 60 + (e[1].slice(3, 5) - 0) * 60 + (e[1].slice(6, 8) - 0), r = s / t * 100, a = n / t * 100 - r;
      return [r, a];
    },
    // 播放视频
    videoPlay(e, t) {
      t.begintime = t.begintime.slice(0, 11) + this.timeInfo, this.$emit("videoPlaySTF", t);
    }
  },
  mounted() {
  },
  watch: {
    dateTime() {
      let e = [];
      this.dateTime.forEach((t) => {
        e.push([t.begintime.slice(11, 19), t.endtime.slice(11, 19)]);
      }), this.timeSlotArrList = [], e.forEach((t, s) => {
        let n = this.computeTime(t), r = this.dateTime[s];
        this.timeSlotArrList.push([n, r]);
      });
    }
  }
}, ra = (e) => (Wt("data-v-1d8f3b37"), e = e(), Bt(), e), ia = /* @__PURE__ */ ra(() => /* @__PURE__ */ b("div", { class: "newLine" }, null, -1)), aa = ["onClick"], oa = { class: "time" };
function la(e, t, s, n, r, i) {
  return C(), R("div", {
    class: "timeScale",
    onMousemove: t[1] || (t[1] = (a) => i.getLeft())
  }, [
    b("div", {
      class: "timeInfoLine",
      style: G({ left: r.timeInfoXLine })
    }, null, 4),
    b("div", {
      class: "line",
      onMousemove: t[0] || (t[0] = (a) => i.getMouseXY(a)),
      ref: "lineDom"
    }, [
      ia,
      (C(!0), R(Oe, null, De(r.timeList, (a, o) => (C(), R("div", {
        class: "lineShu",
        key: o + "a",
        style: G({ left: 100 / 24 * o + "%" })
      }, null, 4))), 128)),
      (C(!0), R(Oe, null, De(r.timeSlotArrList, (a, o) => (C(), R("div", {
        key: o + "b",
        class: "box",
        style: G({ left: a[0][0] + "%", width: a[0][1] + "%" }),
        onClick: (c) => i.videoPlay(c, a[1])
      }, null, 12, aa))), 128))
    ], 544),
    b("div", oa, [
      (C(!0), R(Oe, null, De(r.timeList, (a, o) => (C(), R("div", {
        class: "timeShu",
        key: o + "c",
        style: G({ left: 100 / 24 * o + "%" })
      }, Xe(a), 5))), 128))
    ]),
    b("div", {
      class: "timeInfoBox",
      style: G({ left: r.timeInfoX })
    }, Xe(r.timeInfo), 5)
  ], 32);
}
const ua = /* @__PURE__ */ Ye(na, [["render", la], ["__scopeId", "data-v-1d8f3b37"]]);
function er(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: ca } = Object.prototype, { getPrototypeOf: Ls } = Object, jt = ((e) => (t) => {
  const s = ca.call(t);
  return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ue = (e) => (e = e.toLowerCase(), (t) => jt(t) === e), Vt = (e) => (t) => typeof t === e, { isArray: Je } = Array, lt = Vt("undefined");
function da(e) {
  return e !== null && !lt(e) && e.constructor !== null && !lt(e.constructor) && $(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const tr = ue("ArrayBuffer");
function fa(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && tr(e.buffer), t;
}
const ha = Vt("string"), $ = Vt("function"), sr = Vt("number"), Gt = (e) => e !== null && typeof e == "object", ma = (e) => e === !0 || e === !1, St = (e) => {
  if (jt(e) !== "object")
    return !1;
  const t = Ls(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, pa = ue("Date"), ya = ue("File"), ga = ue("Blob"), va = ue("FileList"), wa = (e) => Gt(e) && $(e.pipe), _a = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || $(e.append) && ((t = jt(e)) === "formdata" || // detect form-data instance
  t === "object" && $(e.toString) && e.toString() === "[object FormData]"));
}, ba = ue("URLSearchParams"), Sa = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ht(e, t, { allOwnKeys: s = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, r;
  if (typeof e != "object" && (e = [e]), Je(e))
    for (n = 0, r = e.length; n < r; n++)
      t.call(null, e[n], n, e);
  else {
    const i = s ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let o;
    for (n = 0; n < a; n++)
      o = i[n], t.call(null, e[o], o, e);
  }
}
function nr(e, t) {
  t = t.toLowerCase();
  const s = Object.keys(e);
  let n = s.length, r;
  for (; n-- > 0; )
    if (r = s[n], t === r.toLowerCase())
      return r;
  return null;
}
const rr = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), ir = (e) => !lt(e) && e !== rr;
function _s() {
  const { caseless: e } = ir(this) && this || {}, t = {}, s = (n, r) => {
    const i = e && nr(t, r) || r;
    St(t[i]) && St(n) ? t[i] = _s(t[i], n) : St(n) ? t[i] = _s({}, n) : Je(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, r = arguments.length; n < r; n++)
    arguments[n] && ht(arguments[n], s);
  return t;
}
const Ma = (e, t, s, { allOwnKeys: n } = {}) => (ht(t, (r, i) => {
  s && $(r) ? e[i] = er(r, s) : e[i] = r;
}, { allOwnKeys: n }), e), Aa = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), ka = (e, t, s, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), s && Object.assign(e.prototype, s);
}, Oa = (e, t, s, n) => {
  let r, i, a;
  const o = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (r = Object.getOwnPropertyNames(e), i = r.length; i-- > 0; )
      a = r[i], (!n || n(a, e, t)) && !o[a] && (t[a] = e[a], o[a] = !0);
    e = s !== !1 && Ls(e);
  } while (e && (!s || s(e, t)) && e !== Object.prototype);
  return t;
}, Da = (e, t, s) => {
  e = String(e), (s === void 0 || s > e.length) && (s = e.length), s -= t.length;
  const n = e.indexOf(t, s);
  return n !== -1 && n === s;
}, Ta = (e) => {
  if (!e)
    return null;
  if (Je(e))
    return e;
  let t = e.length;
  if (!sr(t))
    return null;
  const s = new Array(t);
  for (; t-- > 0; )
    s[t] = e[t];
  return s;
}, xa = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ls(Uint8Array)), Pa = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const i = r.value;
    t.call(e, i[0], i[1]);
  }
}, Ca = (e, t) => {
  let s;
  const n = [];
  for (; (s = e.exec(t)) !== null; )
    n.push(s);
  return n;
}, Na = ue("HTMLFormElement"), Ra = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(s, n, r) {
    return n.toUpperCase() + r;
  }
), pn = (({ hasOwnProperty: e }) => (t, s) => e.call(t, s))(Object.prototype), Ea = ue("RegExp"), ar = (e, t) => {
  const s = Object.getOwnPropertyDescriptors(e), n = {};
  ht(s, (r, i) => {
    t(r, i, e) !== !1 && (n[i] = r);
  }), Object.defineProperties(e, n);
}, La = (e) => {
  ar(e, (t, s) => {
    if ($(e) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
      return !1;
    const n = e[s];
    if ($(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + s + "'");
      });
    }
  });
}, Ia = (e, t) => {
  const s = {}, n = (r) => {
    r.forEach((i) => {
      s[i] = !0;
    });
  };
  return Je(e) ? n(e) : n(String(e).split(t)), s;
}, Ya = () => {
}, Fa = (e, t) => (e = +e, Number.isFinite(e) ? e : t), ds = "abcdefghijklmnopqrstuvwxyz", yn = "0123456789", or = {
  DIGIT: yn,
  ALPHA: ds,
  ALPHA_DIGIT: ds + ds.toUpperCase() + yn
}, Ua = (e = 16, t = or.ALPHA_DIGIT) => {
  let s = "";
  const { length: n } = t;
  for (; e--; )
    s += t[Math.random() * n | 0];
  return s;
};
function Ha(e) {
  return !!(e && $(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const Wa = (e) => {
  const t = new Array(10), s = (n, r) => {
    if (Gt(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[r] = n;
        const i = Je(n) ? [] : {};
        return ht(n, (a, o) => {
          const c = s(a, r + 1);
          !lt(c) && (i[o] = c);
        }), t[r] = void 0, i;
      }
    }
    return n;
  };
  return s(e, 0);
}, Ba = ue("AsyncFunction"), za = (e) => e && (Gt(e) || $(e)) && $(e.then) && $(e.catch), d = {
  isArray: Je,
  isArrayBuffer: tr,
  isBuffer: da,
  isFormData: _a,
  isArrayBufferView: fa,
  isString: ha,
  isNumber: sr,
  isBoolean: ma,
  isObject: Gt,
  isPlainObject: St,
  isUndefined: lt,
  isDate: pa,
  isFile: ya,
  isBlob: ga,
  isRegExp: Ea,
  isFunction: $,
  isStream: wa,
  isURLSearchParams: ba,
  isTypedArray: xa,
  isFileList: va,
  forEach: ht,
  merge: _s,
  extend: Ma,
  trim: Sa,
  stripBOM: Aa,
  inherits: ka,
  toFlatObject: Oa,
  kindOf: jt,
  kindOfTest: ue,
  endsWith: Da,
  toArray: Ta,
  forEachEntry: Pa,
  matchAll: Ca,
  isHTMLForm: Na,
  hasOwnProperty: pn,
  hasOwnProp: pn,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ar,
  freezeMethods: La,
  toObjectSet: Ia,
  toCamelCase: Ra,
  noop: Ya,
  toFiniteNumber: Fa,
  findKey: nr,
  global: rr,
  isContextDefined: ir,
  ALPHABET: or,
  generateString: Ua,
  isSpecCompliantForm: Ha,
  toJSONObject: Wa,
  isAsyncFn: Ba,
  isThenable: za
};
function D(e, t, s, n, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), s && (this.config = s), n && (this.request = n), r && (this.response = r);
}
d.inherits(D, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: d.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const lr = D.prototype, ur = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  ur[e] = { value: e };
});
Object.defineProperties(D, ur);
Object.defineProperty(lr, "isAxiosError", { value: !0 });
D.from = (e, t, s, n, r, i) => {
  const a = Object.create(lr);
  return d.toFlatObject(e, a, function(c) {
    return c !== Error.prototype;
  }, (o) => o !== "isAxiosError"), D.call(a, e.message, t, s, n, r), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
const ja = null;
function bs(e) {
  return d.isPlainObject(e) || d.isArray(e);
}
function cr(e) {
  return d.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function gn(e, t, s) {
  return e ? e.concat(t).map(function(r, i) {
    return r = cr(r), !s && i ? "[" + r + "]" : r;
  }).join(s ? "." : "") : t;
}
function Va(e) {
  return d.isArray(e) && !e.some(bs);
}
const Ga = d.toFlatObject(d, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Xt(e, t, s) {
  if (!d.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), s = d.toFlatObject(s, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(m, S) {
    return !d.isUndefined(S[m]);
  });
  const n = s.metaTokens, r = s.visitor || p, i = s.dots, a = s.indexes, c = (s.Blob || typeof Blob < "u" && Blob) && d.isSpecCompliantForm(t);
  if (!d.isFunction(r))
    throw new TypeError("visitor must be a function");
  function l(h) {
    if (h === null)
      return "";
    if (d.isDate(h))
      return h.toISOString();
    if (!c && d.isBlob(h))
      throw new D("Blob is not supported. Use a Buffer instead.");
    return d.isArrayBuffer(h) || d.isTypedArray(h) ? c && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function p(h, m, S) {
    let M = h;
    if (h && !S && typeof h == "object") {
      if (d.endsWith(m, "{}"))
        m = n ? m : m.slice(0, -2), h = JSON.stringify(h);
      else if (d.isArray(h) && Va(h) || (d.isFileList(h) || d.endsWith(m, "[]")) && (M = d.toArray(h)))
        return m = cr(m), M.forEach(function(X, xe) {
          !(d.isUndefined(X) || X === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? gn([m], xe, i) : a === null ? m : m + "[]",
            l(X)
          );
        }), !1;
    }
    return bs(h) ? !0 : (t.append(gn(S, m, i), l(h)), !1);
  }
  const u = [], f = Object.assign(Ga, {
    defaultVisitor: p,
    convertValue: l,
    isVisitable: bs
  });
  function v(h, m) {
    if (!d.isUndefined(h)) {
      if (u.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      u.push(h), d.forEach(h, function(M, P) {
        (!(d.isUndefined(M) || M === null) && r.call(
          t,
          M,
          d.isString(P) ? P.trim() : P,
          m,
          f
        )) === !0 && v(M, m ? m.concat(P) : [P]);
      }), u.pop();
    }
  }
  if (!d.isObject(e))
    throw new TypeError("data must be an object");
  return v(e), t;
}
function vn(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function Is(e, t) {
  this._pairs = [], e && Xt(e, this, t);
}
const dr = Is.prototype;
dr.append = function(t, s) {
  this._pairs.push([t, s]);
};
dr.toString = function(t) {
  const s = t ? function(n) {
    return t.call(this, n, vn);
  } : vn;
  return this._pairs.map(function(r) {
    return s(r[0]) + "=" + s(r[1]);
  }, "").join("&");
};
function Xa(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function fr(e, t, s) {
  if (!t)
    return e;
  const n = s && s.encode || Xa, r = s && s.serialize;
  let i;
  if (r ? i = r(t, s) : i = d.isURLSearchParams(t) ? t.toString() : new Is(t, s).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class qa {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, s, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: s,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    d.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const wn = qa, hr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Za = typeof URLSearchParams < "u" ? URLSearchParams : Is, Ja = typeof FormData < "u" ? FormData : null, Qa = typeof Blob < "u" ? Blob : null, Ka = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), $a = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), oe = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Za,
    FormData: Ja,
    Blob: Qa
  },
  isStandardBrowserEnv: Ka,
  isStandardBrowserWebWorkerEnv: $a,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function eo(e, t) {
  return Xt(e, new oe.classes.URLSearchParams(), Object.assign({
    visitor: function(s, n, r, i) {
      return oe.isNode && d.isBuffer(s) ? (this.append(n, s.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function to(e) {
  return d.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function so(e) {
  const t = {}, s = Object.keys(e);
  let n;
  const r = s.length;
  let i;
  for (n = 0; n < r; n++)
    i = s[n], t[i] = e[i];
  return t;
}
function mr(e) {
  function t(s, n, r, i) {
    let a = s[i++];
    const o = Number.isFinite(+a), c = i >= s.length;
    return a = !a && d.isArray(r) ? r.length : a, c ? (d.hasOwnProp(r, a) ? r[a] = [r[a], n] : r[a] = n, !o) : ((!r[a] || !d.isObject(r[a])) && (r[a] = []), t(s, n, r[a], i) && d.isArray(r[a]) && (r[a] = so(r[a])), !o);
  }
  if (d.isFormData(e) && d.isFunction(e.entries)) {
    const s = {};
    return d.forEachEntry(e, (n, r) => {
      t(to(n), r, s, 0);
    }), s;
  }
  return null;
}
const no = {
  "Content-Type": void 0
};
function ro(e, t, s) {
  if (d.isString(e))
    try {
      return (t || JSON.parse)(e), d.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (s || JSON.stringify)(e);
}
const qt = {
  transitional: hr,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, s) {
    const n = s.getContentType() || "", r = n.indexOf("application/json") > -1, i = d.isObject(t);
    if (i && d.isHTMLForm(t) && (t = new FormData(t)), d.isFormData(t))
      return r && r ? JSON.stringify(mr(t)) : t;
    if (d.isArrayBuffer(t) || d.isBuffer(t) || d.isStream(t) || d.isFile(t) || d.isBlob(t))
      return t;
    if (d.isArrayBufferView(t))
      return t.buffer;
    if (d.isURLSearchParams(t))
      return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let o;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return eo(t, this.formSerializer).toString();
      if ((o = d.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return Xt(
          o ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return i || r ? (s.setContentType("application/json", !1), ro(t)) : t;
  }],
  transformResponse: [function(t) {
    const s = this.transitional || qt.transitional, n = s && s.forcedJSONParsing, r = this.responseType === "json";
    if (t && d.isString(t) && (n && !this.responseType || r)) {
      const a = !(s && s.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (o) {
        if (a)
          throw o.name === "SyntaxError" ? D.from(o, D.ERR_BAD_RESPONSE, this, null, this.response) : o;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: oe.classes.FormData,
    Blob: oe.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
d.forEach(["delete", "get", "head"], function(t) {
  qt.headers[t] = {};
});
d.forEach(["post", "put", "patch"], function(t) {
  qt.headers[t] = d.merge(no);
});
const Ys = qt, io = d.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), ao = (e) => {
  const t = {};
  let s, n, r;
  return e && e.split(`
`).forEach(function(a) {
    r = a.indexOf(":"), s = a.substring(0, r).trim().toLowerCase(), n = a.substring(r + 1).trim(), !(!s || t[s] && io[s]) && (s === "set-cookie" ? t[s] ? t[s].push(n) : t[s] = [n] : t[s] = t[s] ? t[s] + ", " + n : n);
  }), t;
}, _n = Symbol("internals");
function tt(e) {
  return e && String(e).trim().toLowerCase();
}
function Mt(e) {
  return e === !1 || e == null ? e : d.isArray(e) ? e.map(Mt) : String(e);
}
function oo(e) {
  const t = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = s.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const lo = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function fs(e, t, s, n, r) {
  if (d.isFunction(n))
    return n.call(this, t, s);
  if (r && (t = s), !!d.isString(t)) {
    if (d.isString(n))
      return t.indexOf(n) !== -1;
    if (d.isRegExp(n))
      return n.test(t);
  }
}
function uo(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, s, n) => s.toUpperCase() + n);
}
function co(e, t) {
  const s = d.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + s, {
      value: function(r, i, a) {
        return this[n].call(this, t, r, i, a);
      },
      configurable: !0
    });
  });
}
class Zt {
  constructor(t) {
    t && this.set(t);
  }
  set(t, s, n) {
    const r = this;
    function i(o, c, l) {
      const p = tt(c);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const u = d.findKey(r, p);
      (!u || r[u] === void 0 || l === !0 || l === void 0 && r[u] !== !1) && (r[u || c] = Mt(o));
    }
    const a = (o, c) => d.forEach(o, (l, p) => i(l, p, c));
    return d.isPlainObject(t) || t instanceof this.constructor ? a(t, s) : d.isString(t) && (t = t.trim()) && !lo(t) ? a(ao(t), s) : t != null && i(s, t, n), this;
  }
  get(t, s) {
    if (t = tt(t), t) {
      const n = d.findKey(this, t);
      if (n) {
        const r = this[n];
        if (!s)
          return r;
        if (s === !0)
          return oo(r);
        if (d.isFunction(s))
          return s.call(this, r, n);
        if (d.isRegExp(s))
          return s.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, s) {
    if (t = tt(t), t) {
      const n = d.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!s || fs(this, this[n], n, s)));
    }
    return !1;
  }
  delete(t, s) {
    const n = this;
    let r = !1;
    function i(a) {
      if (a = tt(a), a) {
        const o = d.findKey(n, a);
        o && (!s || fs(n, n[o], o, s)) && (delete n[o], r = !0);
      }
    }
    return d.isArray(t) ? t.forEach(i) : i(t), r;
  }
  clear(t) {
    const s = Object.keys(this);
    let n = s.length, r = !1;
    for (; n--; ) {
      const i = s[n];
      (!t || fs(this, this[i], i, t, !0)) && (delete this[i], r = !0);
    }
    return r;
  }
  normalize(t) {
    const s = this, n = {};
    return d.forEach(this, (r, i) => {
      const a = d.findKey(n, i);
      if (a) {
        s[a] = Mt(r), delete s[i];
        return;
      }
      const o = t ? uo(i) : String(i).trim();
      o !== i && delete s[i], s[o] = Mt(r), n[o] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const s = /* @__PURE__ */ Object.create(null);
    return d.forEach(this, (n, r) => {
      n != null && n !== !1 && (s[r] = t && d.isArray(n) ? n.join(", ") : n);
    }), s;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, s]) => t + ": " + s).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...s) {
    const n = new this(t);
    return s.forEach((r) => n.set(r)), n;
  }
  static accessor(t) {
    const n = (this[_n] = this[_n] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function i(a) {
      const o = tt(a);
      n[o] || (co(r, a), n[o] = !0);
    }
    return d.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
Zt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
d.freezeMethods(Zt.prototype);
d.freezeMethods(Zt);
const ye = Zt;
function hs(e, t) {
  const s = this || Ys, n = t || s, r = ye.from(n.headers);
  let i = n.data;
  return d.forEach(e, function(o) {
    i = o.call(s, i, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), i;
}
function pr(e) {
  return !!(e && e.__CANCEL__);
}
function mt(e, t, s) {
  D.call(this, e ?? "canceled", D.ERR_CANCELED, t, s), this.name = "CanceledError";
}
d.inherits(mt, D, {
  __CANCEL__: !0
});
function fo(e, t, s) {
  const n = s.config.validateStatus;
  !s.status || !n || n(s.status) ? e(s) : t(new D(
    "Request failed with status code " + s.status,
    [D.ERR_BAD_REQUEST, D.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
    s.config,
    s.request,
    s
  ));
}
const ho = oe.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(s, n, r, i, a, o) {
        const c = [];
        c.push(s + "=" + encodeURIComponent(n)), d.isNumber(r) && c.push("expires=" + new Date(r).toGMTString()), d.isString(i) && c.push("path=" + i), d.isString(a) && c.push("domain=" + a), o === !0 && c.push("secure"), document.cookie = c.join("; ");
      },
      read: function(s) {
        const n = document.cookie.match(new RegExp("(^|;\\s*)(" + s + ")=([^;]*)"));
        return n ? decodeURIComponent(n[3]) : null;
      },
      remove: function(s) {
        this.write(s, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function mo(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function po(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function yr(e, t) {
  return e && !mo(t) ? po(e, t) : t;
}
const yo = oe.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), s = document.createElement("a");
    let n;
    function r(i) {
      let a = i;
      return t && (s.setAttribute("href", a), a = s.href), s.setAttribute("href", a), {
        href: s.href,
        protocol: s.protocol ? s.protocol.replace(/:$/, "") : "",
        host: s.host,
        search: s.search ? s.search.replace(/^\?/, "") : "",
        hash: s.hash ? s.hash.replace(/^#/, "") : "",
        hostname: s.hostname,
        port: s.port,
        pathname: s.pathname.charAt(0) === "/" ? s.pathname : "/" + s.pathname
      };
    }
    return n = r(window.location.href), function(a) {
      const o = d.isString(a) ? r(a) : a;
      return o.protocol === n.protocol && o.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function go(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function vo(e, t) {
  e = e || 10;
  const s = new Array(e), n = new Array(e);
  let r = 0, i = 0, a;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const l = Date.now(), p = n[i];
    a || (a = l), s[r] = c, n[r] = l;
    let u = i, f = 0;
    for (; u !== r; )
      f += s[u++], u = u % e;
    if (r = (r + 1) % e, r === i && (i = (i + 1) % e), l - a < t)
      return;
    const v = p && l - p;
    return v ? Math.round(f * 1e3 / v) : void 0;
  };
}
function bn(e, t) {
  let s = 0;
  const n = vo(50, 250);
  return (r) => {
    const i = r.loaded, a = r.lengthComputable ? r.total : void 0, o = i - s, c = n(o), l = i <= a;
    s = i;
    const p = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: o,
      rate: c || void 0,
      estimated: c && a && l ? (a - i) / c : void 0,
      event: r
    };
    p[t ? "download" : "upload"] = !0, e(p);
  };
}
const wo = typeof XMLHttpRequest < "u", _o = wo && function(e) {
  return new Promise(function(s, n) {
    let r = e.data;
    const i = ye.from(e.headers).normalize(), a = e.responseType;
    let o;
    function c() {
      e.cancelToken && e.cancelToken.unsubscribe(o), e.signal && e.signal.removeEventListener("abort", o);
    }
    d.isFormData(r) && (oe.isStandardBrowserEnv || oe.isStandardBrowserWebWorkerEnv ? i.setContentType(!1) : i.setContentType("multipart/form-data;", !1));
    let l = new XMLHttpRequest();
    if (e.auth) {
      const v = e.auth.username || "", h = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(v + ":" + h));
    }
    const p = yr(e.baseURL, e.url);
    l.open(e.method.toUpperCase(), fr(p, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;
    function u() {
      if (!l)
        return;
      const v = ye.from(
        "getAllResponseHeaders" in l && l.getAllResponseHeaders()
      ), m = {
        data: !a || a === "text" || a === "json" ? l.responseText : l.response,
        status: l.status,
        statusText: l.statusText,
        headers: v,
        config: e,
        request: l
      };
      fo(function(M) {
        s(M), c();
      }, function(M) {
        n(M), c();
      }, m), l = null;
    }
    if ("onloadend" in l ? l.onloadend = u : l.onreadystatechange = function() {
      !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(u);
    }, l.onabort = function() {
      l && (n(new D("Request aborted", D.ECONNABORTED, e, l)), l = null);
    }, l.onerror = function() {
      n(new D("Network Error", D.ERR_NETWORK, e, l)), l = null;
    }, l.ontimeout = function() {
      let h = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const m = e.transitional || hr;
      e.timeoutErrorMessage && (h = e.timeoutErrorMessage), n(new D(
        h,
        m.clarifyTimeoutError ? D.ETIMEDOUT : D.ECONNABORTED,
        e,
        l
      )), l = null;
    }, oe.isStandardBrowserEnv) {
      const v = (e.withCredentials || yo(p)) && e.xsrfCookieName && ho.read(e.xsrfCookieName);
      v && i.set(e.xsrfHeaderName, v);
    }
    r === void 0 && i.setContentType(null), "setRequestHeader" in l && d.forEach(i.toJSON(), function(h, m) {
      l.setRequestHeader(m, h);
    }), d.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), a && a !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", bn(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", bn(e.onUploadProgress)), (e.cancelToken || e.signal) && (o = (v) => {
      l && (n(!v || v.type ? new mt(null, e, l) : v), l.abort(), l = null);
    }, e.cancelToken && e.cancelToken.subscribe(o), e.signal && (e.signal.aborted ? o() : e.signal.addEventListener("abort", o)));
    const f = go(p);
    if (f && oe.protocols.indexOf(f) === -1) {
      n(new D("Unsupported protocol " + f + ":", D.ERR_BAD_REQUEST, e));
      return;
    }
    l.send(r || null);
  });
}, At = {
  http: ja,
  xhr: _o
};
d.forEach(At, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const bo = {
  getAdapter: (e) => {
    e = d.isArray(e) ? e : [e];
    const { length: t } = e;
    let s, n;
    for (let r = 0; r < t && (s = e[r], !(n = d.isString(s) ? At[s.toLowerCase()] : s)); r++)
      ;
    if (!n)
      throw n === !1 ? new D(
        `Adapter ${s} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        d.hasOwnProp(At, s) ? `Adapter '${s}' is not available in the build` : `Unknown adapter '${s}'`
      );
    if (!d.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: At
};
function ms(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new mt(null, e);
}
function Sn(e) {
  return ms(e), e.headers = ye.from(e.headers), e.data = hs.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), bo.getAdapter(e.adapter || Ys.adapter)(e).then(function(n) {
    return ms(e), n.data = hs.call(
      e,
      e.transformResponse,
      n
    ), n.headers = ye.from(n.headers), n;
  }, function(n) {
    return pr(n) || (ms(e), n && n.response && (n.response.data = hs.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = ye.from(n.response.headers))), Promise.reject(n);
  });
}
const Mn = (e) => e instanceof ye ? e.toJSON() : e;
function qe(e, t) {
  t = t || {};
  const s = {};
  function n(l, p, u) {
    return d.isPlainObject(l) && d.isPlainObject(p) ? d.merge.call({ caseless: u }, l, p) : d.isPlainObject(p) ? d.merge({}, p) : d.isArray(p) ? p.slice() : p;
  }
  function r(l, p, u) {
    if (d.isUndefined(p)) {
      if (!d.isUndefined(l))
        return n(void 0, l, u);
    } else
      return n(l, p, u);
  }
  function i(l, p) {
    if (!d.isUndefined(p))
      return n(void 0, p);
  }
  function a(l, p) {
    if (d.isUndefined(p)) {
      if (!d.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, p);
  }
  function o(l, p, u) {
    if (u in t)
      return n(l, p);
    if (u in e)
      return n(void 0, l);
  }
  const c = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: o,
    headers: (l, p) => r(Mn(l), Mn(p), !0)
  };
  return d.forEach(Object.keys(Object.assign({}, e, t)), function(p) {
    const u = c[p] || r, f = u(e[p], t[p], p);
    d.isUndefined(f) && u !== o || (s[p] = f);
  }), s;
}
const gr = "1.4.0", Fs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Fs[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const An = {};
Fs.transitional = function(t, s, n) {
  function r(i, a) {
    return "[Axios v" + gr + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, o) => {
    if (t === !1)
      throw new D(
        r(a, " has been removed" + (s ? " in " + s : "")),
        D.ERR_DEPRECATED
      );
    return s && !An[a] && (An[a] = !0, console.warn(
      r(
        a,
        " has been deprecated since v" + s + " and will be removed in the near future"
      )
    )), t ? t(i, a, o) : !0;
  };
};
function So(e, t, s) {
  if (typeof e != "object")
    throw new D("options must be an object", D.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let r = n.length;
  for (; r-- > 0; ) {
    const i = n[r], a = t[i];
    if (a) {
      const o = e[i], c = o === void 0 || a(o, i, e);
      if (c !== !0)
        throw new D("option " + i + " must be " + c, D.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0)
      throw new D("Unknown option " + i, D.ERR_BAD_OPTION);
  }
}
const Ss = {
  assertOptions: So,
  validators: Fs
}, Me = Ss.validators;
class Nt {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new wn(),
      response: new wn()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, s) {
    typeof t == "string" ? (s = s || {}, s.url = t) : s = t || {}, s = qe(this.defaults, s);
    const { transitional: n, paramsSerializer: r, headers: i } = s;
    n !== void 0 && Ss.assertOptions(n, {
      silentJSONParsing: Me.transitional(Me.boolean),
      forcedJSONParsing: Me.transitional(Me.boolean),
      clarifyTimeoutError: Me.transitional(Me.boolean)
    }, !1), r != null && (d.isFunction(r) ? s.paramsSerializer = {
      serialize: r
    } : Ss.assertOptions(r, {
      encode: Me.function,
      serialize: Me.function
    }, !0)), s.method = (s.method || this.defaults.method || "get").toLowerCase();
    let a;
    a = i && d.merge(
      i.common,
      i[s.method]
    ), a && d.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete i[h];
      }
    ), s.headers = ye.concat(a, i);
    const o = [];
    let c = !0;
    this.interceptors.request.forEach(function(m) {
      typeof m.runWhen == "function" && m.runWhen(s) === !1 || (c = c && m.synchronous, o.unshift(m.fulfilled, m.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(m) {
      l.push(m.fulfilled, m.rejected);
    });
    let p, u = 0, f;
    if (!c) {
      const h = [Sn.bind(this), void 0];
      for (h.unshift.apply(h, o), h.push.apply(h, l), f = h.length, p = Promise.resolve(s); u < f; )
        p = p.then(h[u++], h[u++]);
      return p;
    }
    f = o.length;
    let v = s;
    for (u = 0; u < f; ) {
      const h = o[u++], m = o[u++];
      try {
        v = h(v);
      } catch (S) {
        m.call(this, S);
        break;
      }
    }
    try {
      p = Sn.call(this, v);
    } catch (h) {
      return Promise.reject(h);
    }
    for (u = 0, f = l.length; u < f; )
      p = p.then(l[u++], l[u++]);
    return p;
  }
  getUri(t) {
    t = qe(this.defaults, t);
    const s = yr(t.baseURL, t.url);
    return fr(s, t.params, t.paramsSerializer);
  }
}
d.forEach(["delete", "get", "head", "options"], function(t) {
  Nt.prototype[t] = function(s, n) {
    return this.request(qe(n || {}, {
      method: t,
      url: s,
      data: (n || {}).data
    }));
  };
});
d.forEach(["post", "put", "patch"], function(t) {
  function s(n) {
    return function(i, a, o) {
      return this.request(qe(o || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: a
      }));
    };
  }
  Nt.prototype[t] = s(), Nt.prototype[t + "Form"] = s(!0);
});
const kt = Nt;
class Us {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let s;
    this.promise = new Promise(function(i) {
      s = i;
    });
    const n = this;
    this.promise.then((r) => {
      if (!n._listeners)
        return;
      let i = n._listeners.length;
      for (; i-- > 0; )
        n._listeners[i](r);
      n._listeners = null;
    }), this.promise.then = (r) => {
      let i;
      const a = new Promise((o) => {
        n.subscribe(o), i = o;
      }).then(r);
      return a.cancel = function() {
        n.unsubscribe(i);
      }, a;
    }, t(function(i, a, o) {
      n.reason || (n.reason = new mt(i, a, o), s(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const s = this._listeners.indexOf(t);
    s !== -1 && this._listeners.splice(s, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Us(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
}
const Mo = Us;
function Ao(e) {
  return function(s) {
    return e.apply(null, s);
  };
}
function ko(e) {
  return d.isObject(e) && e.isAxiosError === !0;
}
const Ms = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Ms).forEach(([e, t]) => {
  Ms[t] = e;
});
const Oo = Ms;
function vr(e) {
  const t = new kt(e), s = er(kt.prototype.request, t);
  return d.extend(s, kt.prototype, t, { allOwnKeys: !0 }), d.extend(s, t, null, { allOwnKeys: !0 }), s.create = function(r) {
    return vr(qe(e, r));
  }, s;
}
const U = vr(Ys);
U.Axios = kt;
U.CanceledError = mt;
U.CancelToken = Mo;
U.isCancel = pr;
U.VERSION = gr;
U.toFormData = Xt;
U.AxiosError = D;
U.Cancel = U.CanceledError;
U.all = function(t) {
  return Promise.all(t);
};
U.spread = Ao;
U.isAxiosError = ko;
U.mergeConfig = qe;
U.AxiosHeaders = ye;
U.formToJSON = (e) => mr(d.isHTMLForm(e) ? new FormData(e) : e);
U.HttpStatusCode = Oo;
U.default = U;
const Do = U;
var kn;
const Hs = typeof window < "u";
Hs && ((kn = window == null ? void 0 : window.navigator) != null && kn.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const To = Object.prototype.hasOwnProperty, On = (e, t) => To.call(e, t), Ws = (e) => typeof e == "string", Jt = (e) => e !== null && typeof e == "object", wr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, xo = /-(\w)/g, Po = wr((e) => e.replace(xo, (t, s) => s ? s.toUpperCase() : "")), Co = /\B([A-Z])/g, No = wr((e) => e.replace(Co, "-$1").toLowerCase());
var Ro = typeof global == "object" && global && global.Object === Object && global;
const Eo = Ro;
var Lo = typeof self == "object" && self && self.Object === Object && self, Io = Eo || Lo || Function("return this")();
const Bs = Io;
var Yo = Bs.Symbol;
const Ze = Yo;
var _r = Object.prototype, Fo = _r.hasOwnProperty, Uo = _r.toString, st = Ze ? Ze.toStringTag : void 0;
function Ho(e) {
  var t = Fo.call(e, st), s = e[st];
  try {
    e[st] = void 0;
    var n = !0;
  } catch {
  }
  var r = Uo.call(e);
  return n && (t ? e[st] = s : delete e[st]), r;
}
var Wo = Object.prototype, Bo = Wo.toString;
function zo(e) {
  return Bo.call(e);
}
var jo = "[object Null]", Vo = "[object Undefined]", Dn = Ze ? Ze.toStringTag : void 0;
function br(e) {
  return e == null ? e === void 0 ? Vo : jo : Dn && Dn in Object(e) ? Ho(e) : zo(e);
}
function Go(e) {
  return e != null && typeof e == "object";
}
var Xo = "[object Symbol]";
function zs(e) {
  return typeof e == "symbol" || Go(e) && br(e) == Xo;
}
function qo(e, t) {
  for (var s = -1, n = e == null ? 0 : e.length, r = Array(n); ++s < n; )
    r[s] = t(e[s], s, e);
  return r;
}
var Zo = Array.isArray;
const js = Zo;
var Jo = 1 / 0, Tn = Ze ? Ze.prototype : void 0, xn = Tn ? Tn.toString : void 0;
function Sr(e) {
  if (typeof e == "string")
    return e;
  if (js(e))
    return qo(e, Sr) + "";
  if (zs(e))
    return xn ? xn.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Jo ? "-0" : t;
}
function Mr(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Qo = "[object AsyncFunction]", Ko = "[object Function]", $o = "[object GeneratorFunction]", el = "[object Proxy]";
function tl(e) {
  if (!Mr(e))
    return !1;
  var t = br(e);
  return t == Ko || t == $o || t == Qo || t == el;
}
var sl = Bs["__core-js_shared__"];
const ps = sl;
var Pn = function() {
  var e = /[^.]+$/.exec(ps && ps.keys && ps.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function nl(e) {
  return !!Pn && Pn in e;
}
var rl = Function.prototype, il = rl.toString;
function al(e) {
  if (e != null) {
    try {
      return il.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var ol = /[\\^$.*+?()[\]{}|]/g, ll = /^\[object .+?Constructor\]$/, ul = Function.prototype, cl = Object.prototype, dl = ul.toString, fl = cl.hasOwnProperty, hl = RegExp(
  "^" + dl.call(fl).replace(ol, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ml(e) {
  if (!Mr(e) || nl(e))
    return !1;
  var t = tl(e) ? hl : ll;
  return t.test(al(e));
}
function pl(e, t) {
  return e == null ? void 0 : e[t];
}
function Ar(e, t) {
  var s = pl(e, t);
  return ml(s) ? s : void 0;
}
function yl(e, t) {
  return e === t || e !== e && t !== t;
}
var gl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, vl = /^\w*$/;
function wl(e, t) {
  if (js(e))
    return !1;
  var s = typeof e;
  return s == "number" || s == "symbol" || s == "boolean" || e == null || zs(e) ? !0 : vl.test(e) || !gl.test(e) || t != null && e in Object(t);
}
var _l = Ar(Object, "create");
const ut = _l;
function bl() {
  this.__data__ = ut ? ut(null) : {}, this.size = 0;
}
function Sl(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Ml = "__lodash_hash_undefined__", Al = Object.prototype, kl = Al.hasOwnProperty;
function Ol(e) {
  var t = this.__data__;
  if (ut) {
    var s = t[e];
    return s === Ml ? void 0 : s;
  }
  return kl.call(t, e) ? t[e] : void 0;
}
var Dl = Object.prototype, Tl = Dl.hasOwnProperty;
function xl(e) {
  var t = this.__data__;
  return ut ? t[e] !== void 0 : Tl.call(t, e);
}
var Pl = "__lodash_hash_undefined__";
function Cl(e, t) {
  var s = this.__data__;
  return this.size += this.has(e) ? 0 : 1, s[e] = ut && t === void 0 ? Pl : t, this;
}
function Le(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Le.prototype.clear = bl;
Le.prototype.delete = Sl;
Le.prototype.get = Ol;
Le.prototype.has = xl;
Le.prototype.set = Cl;
function Nl() {
  this.__data__ = [], this.size = 0;
}
function Qt(e, t) {
  for (var s = e.length; s--; )
    if (yl(e[s][0], t))
      return s;
  return -1;
}
var Rl = Array.prototype, El = Rl.splice;
function Ll(e) {
  var t = this.__data__, s = Qt(t, e);
  if (s < 0)
    return !1;
  var n = t.length - 1;
  return s == n ? t.pop() : El.call(t, s, 1), --this.size, !0;
}
function Il(e) {
  var t = this.__data__, s = Qt(t, e);
  return s < 0 ? void 0 : t[s][1];
}
function Yl(e) {
  return Qt(this.__data__, e) > -1;
}
function Fl(e, t) {
  var s = this.__data__, n = Qt(s, e);
  return n < 0 ? (++this.size, s.push([e, t])) : s[n][1] = t, this;
}
function Qe(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Qe.prototype.clear = Nl;
Qe.prototype.delete = Ll;
Qe.prototype.get = Il;
Qe.prototype.has = Yl;
Qe.prototype.set = Fl;
var Ul = Ar(Bs, "Map");
const Hl = Ul;
function Wl() {
  this.size = 0, this.__data__ = {
    hash: new Le(),
    map: new (Hl || Qe)(),
    string: new Le()
  };
}
function Bl(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Kt(e, t) {
  var s = e.__data__;
  return Bl(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
}
function zl(e) {
  var t = Kt(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function jl(e) {
  return Kt(this, e).get(e);
}
function Vl(e) {
  return Kt(this, e).has(e);
}
function Gl(e, t) {
  var s = Kt(this, e), n = s.size;
  return s.set(e, t), this.size += s.size == n ? 0 : 1, this;
}
function Fe(e) {
  var t = -1, s = e == null ? 0 : e.length;
  for (this.clear(); ++t < s; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Fe.prototype.clear = Wl;
Fe.prototype.delete = zl;
Fe.prototype.get = jl;
Fe.prototype.has = Vl;
Fe.prototype.set = Gl;
var Xl = "Expected a function";
function Vs(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Xl);
  var s = function() {
    var n = arguments, r = t ? t.apply(this, n) : n[0], i = s.cache;
    if (i.has(r))
      return i.get(r);
    var a = e.apply(this, n);
    return s.cache = i.set(r, a) || i, a;
  };
  return s.cache = new (Vs.Cache || Fe)(), s;
}
Vs.Cache = Fe;
var ql = 500;
function Zl(e) {
  var t = Vs(e, function(n) {
    return s.size === ql && s.clear(), n;
  }), s = t.cache;
  return t;
}
var Jl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ql = /\\(\\)?/g, Kl = Zl(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Jl, function(s, n, r, i) {
    t.push(r ? i.replace(Ql, "$1") : n || s);
  }), t;
});
const $l = Kl;
function eu(e) {
  return e == null ? "" : Sr(e);
}
function tu(e, t) {
  return js(e) ? e : wl(e, t) ? [e] : $l(eu(e));
}
var su = 1 / 0;
function nu(e) {
  if (typeof e == "string" || zs(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -su ? "-0" : t;
}
function ru(e, t) {
  t = tu(t, e);
  for (var s = 0, n = t.length; e != null && s < n; )
    e = e[nu(t[s++])];
  return s && s == n ? e : void 0;
}
function iu(e, t, s) {
  var n = e == null ? void 0 : ru(e, t);
  return n === void 0 ? s : n;
}
const au = (e) => typeof e == "number", Cn = (e) => Object.keys(e);
class ou extends Error {
  constructor(t) {
    super(t), this.name = "ElementPlusError";
  }
}
function lu(e, t) {
  if (process.env.NODE_ENV !== "production") {
    const s = Ws(e) ? new ou(`[${e}] ${t}`) : e;
    console.warn(s);
  }
}
const kr = (e = "") => e.split(" ").filter((t) => !!t.trim()), Nn = (e, t) => {
  !e || !t.trim() || e.classList.add(...kr(t));
}, Rt = (e, t) => {
  !e || !t.trim() || e.classList.remove(...kr(t));
}, nt = (e, t) => {
  var s;
  if (!Hs || !e || !t)
    return "";
  let n = Po(t);
  n === "float" && (n = "cssFloat");
  try {
    const r = e.style[n];
    if (r)
      return r;
    const i = (s = document.defaultView) == null ? void 0 : s.getComputedStyle(e, "");
    return i ? i[n] : "";
  } catch {
    return e.style[n];
  }
}, Or = "__epPropKey", uu = (e) => Jt(e) && !!e[Or], cu = (e, t) => {
  if (!Jt(e) || uu(e))
    return e;
  const { values: s, required: n, default: r, type: i, validator: a } = e, c = {
    type: i,
    required: !!n,
    validator: s || a ? (l) => {
      let p = !1, u = [];
      if (s && (u = Array.from(s), On(e, "default") && u.push(r), p || (p = u.includes(l))), a && (p || (p = a(l))), !p && u.length > 0) {
        const f = [...new Set(u)].map((v) => JSON.stringify(v)).join(", ");
        xi(`Invalid prop: validation failed${t ? ` for prop "${t}"` : ""}. Expected one of [${f}], got value ${JSON.stringify(l)}.`);
      }
      return p;
    } : void 0,
    [Or]: !0
  };
  return On(e, "default") && (c.default = r), c;
}, du = ["", "default", "small", "large"];
var fu = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const hu = (e) => (t, s) => mu(t, s, Ee(e)), mu = (e, t, s) => iu(s, e, e).replace(/\{(\w+)\}/g, (n, r) => {
  var i;
  return `${(i = t == null ? void 0 : t[r]) != null ? i : `{${r}}`}`;
}), pu = (e) => {
  const t = H(() => Ee(e).name), s = Xn(e) ? e : Ie(e);
  return {
    lang: t,
    locale: s,
    t: hu(e)
  };
}, Dr = Symbol("localeContextKey"), yu = (e) => {
  const t = e || zt(Dr, Ie());
  return pu(H(() => t.value || fu));
}, As = "el", gu = "is-", Pe = (e, t, s, n, r) => {
  let i = `${e}-${t}`;
  return s && (i += `-${s}`), n && (i += `__${n}`), r && (i += `--${r}`), i;
}, Tr = Symbol("namespaceContextKey"), vu = (e) => {
  const t = e || zt(Tr, Ie(As));
  return H(() => Ee(t) || As);
}, wu = (e, t) => {
  const s = vu(t);
  return {
    namespace: s,
    b: (m = "") => Pe(s.value, e, m, "", ""),
    e: (m) => m ? Pe(s.value, e, "", m, "") : "",
    m: (m) => m ? Pe(s.value, e, "", "", m) : "",
    be: (m, S) => m && S ? Pe(s.value, e, m, S, "") : "",
    em: (m, S) => m && S ? Pe(s.value, e, "", m, S) : "",
    bm: (m, S) => m && S ? Pe(s.value, e, m, "", S) : "",
    bem: (m, S, M) => m && S && M ? Pe(s.value, e, m, S, M) : "",
    is: (m, ...S) => {
      const M = S.length >= 1 ? S[0] : !0;
      return m && M ? `${gu}${m}` : "";
    },
    cssVar: (m) => {
      const S = {};
      for (const M in m)
        m[M] && (S[`--${s.value}-${M}`] = m[M]);
      return S;
    },
    cssVarName: (m) => `--${s.value}-${m}`,
    cssVarBlock: (m) => {
      const S = {};
      for (const M in m)
        m[M] && (S[`--${s.value}-${e}-${M}`] = m[M]);
      return S;
    },
    cssVarBlockName: (m) => `--${s.value}-${e}-${m}`
  };
}, Rn = Ie(0), xr = 2e3, Pr = Symbol("zIndexContextKey"), _u = (e) => {
  const t = e || zt(Pr, void 0), s = H(() => {
    const i = Ee(t);
    return au(i) ? i : xr;
  }), n = H(() => s.value + Rn.value);
  return {
    initialZIndex: s,
    currentZIndex: n,
    nextZIndex: () => (Rn.value++, n.value)
  };
};
cu({
  type: String,
  values: du,
  required: !1
});
const bu = Symbol("size"), Cr = Symbol(), Et = Ie();
function Nr(e, t = void 0) {
  const s = qn() ? zt(Cr, Et) : Et;
  return e ? H(() => {
    var n, r;
    return (r = (n = s.value) == null ? void 0 : n[e]) != null ? r : t;
  }) : s;
}
function Su(e, t) {
  const s = Nr(), n = wu(e, H(() => {
    var o;
    return ((o = s.value) == null ? void 0 : o.namespace) || As;
  })), r = yu(H(() => {
    var o;
    return (o = s.value) == null ? void 0 : o.locale;
  })), i = _u(H(() => {
    var o;
    return ((o = s.value) == null ? void 0 : o.zIndex) || xr;
  })), a = H(() => {
    var o;
    return Ee(t) || ((o = s.value) == null ? void 0 : o.size) || "";
  });
  return Mu(H(() => Ee(s) || {})), {
    ns: n,
    locale: r,
    zIndex: i,
    size: a
  };
}
const Mu = (e, t, s = !1) => {
  var n;
  const r = !!qn(), i = r ? Nr() : void 0, a = (n = t == null ? void 0 : t.provide) != null ? n : r ? Pi : void 0;
  if (!a) {
    lu("provideGlobalConfig", "provideGlobalConfig() can only be used inside setup().");
    return;
  }
  const o = H(() => {
    const c = Ee(e);
    return i != null && i.value ? Au(i.value, c) : c;
  });
  return a(Cr, o), a(Dr, H(() => o.value.locale)), a(Tr, H(() => o.value.namespace)), a(Pr, H(() => o.value.zIndex)), a(bu, {
    size: H(() => o.value.size || "")
  }), (s || !Et.value) && (Et.value = o.value), o;
}, Au = (e, t) => {
  var s;
  const n = [.../* @__PURE__ */ new Set([...Cn(e), ...Cn(t)])], r = {};
  for (const i of n)
    r[i] = (s = t[i]) != null ? s : e[i];
  return r;
};
var ku = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ou(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Du(e) {
  let t;
  const s = Ie(!1), n = Ci({
    ...e,
    originalPosition: "",
    originalOverflow: "",
    visible: !1
  });
  function r(f) {
    n.text = f;
  }
  function i() {
    const f = n.parent, v = u.ns;
    if (!f.vLoadingAddClassList) {
      let h = f.getAttribute("loading-number");
      h = Number.parseInt(h) - 1, h ? f.setAttribute("loading-number", h.toString()) : (Rt(f, v.bm("parent", "relative")), f.removeAttribute("loading-number")), Rt(f, v.bm("parent", "hidden"));
    }
    a(), p.unmount();
  }
  function a() {
    var f, v;
    (v = (f = u.$el) == null ? void 0 : f.parentNode) == null || v.removeChild(u.$el);
  }
  function o() {
    var f;
    e.beforeClose && !e.beforeClose() || (s.value = !0, clearTimeout(t), t = window.setTimeout(c, 400), n.visible = !1, (f = e.closed) == null || f.call(e));
  }
  function c() {
    if (!s.value)
      return;
    const f = n.parent;
    s.value = !1, f.vLoadingAddClassList = void 0, i();
  }
  const l = Ni({
    name: "ElLoading",
    setup(f, { expose: v }) {
      const { ns: h, zIndex: m } = Su("loading");
      return v({
        ns: h,
        zIndex: m
      }), () => {
        const S = n.spinner || n.svg, M = et("svg", {
          class: "circular",
          viewBox: n.svgViewBox ? n.svgViewBox : "0 0 50 50",
          ...S ? { innerHTML: S } : {}
        }, [
          et("circle", {
            class: "path",
            cx: "25",
            cy: "25",
            r: "20",
            fill: "none"
          })
        ]), P = n.text ? et("p", { class: h.b("text") }, [n.text]) : void 0;
        return et(Ri, {
          name: h.b("fade"),
          onAfterLeave: c
        }, {
          default: Pt(() => [
            Ct(Q("div", {
              style: {
                backgroundColor: n.background || ""
              },
              class: [
                h.b("mask"),
                n.customClass,
                n.fullscreen ? "is-fullscreen" : ""
              ]
            }, [
              et("div", {
                class: h.b("spinner")
              }, [M, P])
            ]), [[Ei, n.visible]])
          ])
        });
      };
    }
  }), p = Li(l), u = p.mount(document.createElement("div"));
  return {
    ...Ii(n),
    setText: r,
    removeElLoadingChild: a,
    close: o,
    handleAfterLeave: c,
    vm: u,
    get $el() {
      return u.$el;
    }
  };
}
let wt;
const ks = function(e = {}) {
  if (!Hs)
    return;
  const t = Tu(e);
  if (t.fullscreen && wt)
    return wt;
  const s = Du({
    ...t,
    closed: () => {
      var r;
      (r = t.closed) == null || r.call(t), t.fullscreen && (wt = void 0);
    }
  });
  xu(t, t.parent, s), En(t, t.parent, s), t.parent.vLoadingAddClassList = () => En(t, t.parent, s);
  let n = t.parent.getAttribute("loading-number");
  return n ? n = `${Number.parseInt(n) + 1}` : n = "1", t.parent.setAttribute("loading-number", n), t.parent.appendChild(s.$el), Zn(() => s.visible.value = t.visible), t.fullscreen && (wt = s), s;
}, Tu = (e) => {
  var t, s, n, r;
  let i;
  return Ws(e.target) ? i = (t = document.querySelector(e.target)) != null ? t : document.body : i = e.target || document.body, {
    parent: i === document.body || e.body ? document.body : i,
    background: e.background || "",
    svg: e.svg || "",
    svgViewBox: e.svgViewBox || "",
    spinner: e.spinner || !1,
    text: e.text || "",
    fullscreen: i === document.body && ((s = e.fullscreen) != null ? s : !0),
    lock: (n = e.lock) != null ? n : !1,
    customClass: e.customClass || "",
    visible: (r = e.visible) != null ? r : !0,
    target: i
  };
}, xu = async (e, t, s) => {
  const { nextZIndex: n } = s.vm.zIndex, r = {};
  if (e.fullscreen)
    s.originalPosition.value = nt(document.body, "position"), s.originalOverflow.value = nt(document.body, "overflow"), r.zIndex = n();
  else if (e.parent === document.body) {
    s.originalPosition.value = nt(document.body, "position"), await Zn();
    for (const i of ["top", "left"]) {
      const a = i === "top" ? "scrollTop" : "scrollLeft";
      r[i] = `${e.target.getBoundingClientRect()[i] + document.body[a] + document.documentElement[a] - Number.parseInt(nt(document.body, `margin-${i}`), 10)}px`;
    }
    for (const i of ["height", "width"])
      r[i] = `${e.target.getBoundingClientRect()[i]}px`;
  } else
    s.originalPosition.value = nt(t, "position");
  for (const [i, a] of Object.entries(r))
    s.$el.style[i] = a;
}, En = (e, t, s) => {
  const n = s.vm.ns;
  ["absolute", "fixed", "sticky"].includes(s.originalPosition.value) ? Rt(t, n.bm("parent", "relative")) : Nn(t, n.bm("parent", "relative")), e.fullscreen && e.lock ? Nn(t, n.bm("parent", "hidden")) : Rt(t, n.bm("parent", "hidden"));
}, Os = Symbol("ElLoading"), Ln = (e, t) => {
  var s, n, r, i;
  const a = t.instance, o = (f) => Jt(t.value) ? t.value[f] : void 0, c = (f) => {
    const v = Ws(f) && (a == null ? void 0 : a[f]) || f;
    return v && Ie(v);
  }, l = (f) => c(o(f) || e.getAttribute(`element-loading-${No(f)}`)), p = (s = o("fullscreen")) != null ? s : t.modifiers.fullscreen, u = {
    text: l("text"),
    svg: l("svg"),
    svgViewBox: l("svgViewBox"),
    spinner: l("spinner"),
    background: l("background"),
    customClass: l("customClass"),
    fullscreen: p,
    target: (n = o("target")) != null ? n : p ? void 0 : e,
    body: (r = o("body")) != null ? r : t.modifiers.body,
    lock: (i = o("lock")) != null ? i : t.modifiers.lock
  };
  e[Os] = {
    options: u,
    instance: ks(u)
  };
}, Pu = (e, t) => {
  for (const s of Object.keys(t))
    Xn(t[s]) && (t[s].value = e[s]);
}, In = {
  mounted(e, t) {
    t.value && Ln(e, t);
  },
  updated(e, t) {
    const s = e[Os];
    t.oldValue !== t.value && (t.value && !t.oldValue ? Ln(e, t) : t.value && t.oldValue ? Jt(t.value) && Pu(t.value, s.options) : s == null || s.instance.close());
  },
  unmounted(e) {
    var t;
    (t = e[Os]) == null || t.instance.close();
  }
}, Cu = {
  install(e) {
    e.directive("loading", In), e.config.globalProperties.$loading = ks;
  },
  directive: In,
  service: ks
}, Nu = (e) => {
  let t = "";
  switch (e) {
    case 400:
      t = "请求错误(400)";
      break;
    case 401:
      t = "未授权，请重新登录(401)";
      break;
    case 403:
      t = "拒绝访问(403)";
      break;
    case 404:
      t = "请求出错(404)";
      break;
    case 408:
      t = "请求超时(408)";
      break;
    case 500:
      t = "服务器错误(500)";
      break;
    case 501:
      t = "服务未实现(501)";
      break;
    case 502:
      t = "网络错误(502)";
      break;
    case 503:
      t = "服务不可用(503)";
      break;
    case 504:
      t = "网络超时(504)";
      break;
    case 505:
      t = "HTTP版本不受支持(505)";
      break;
    default:
      t = `连接出错(${e})!`;
  }
  return `${t}，请检查网络或联系管理员！`;
};
let Ds;
function Ru(e) {
  Ds = Cu.service({
    lock: !0,
    text: e,
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.3)"
  });
}
function Yn() {
  setTimeout(Eu, 300);
}
function Eu() {
  Ds && Ds.close();
}
const Gs = Do.create({
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    post: {
      "Content-Type": "application/json;charset=utf-8"
    }
  },
  // 是否跨站点访问控制请求
  withCredentials: !0,
  timeout: 3e4,
  transformRequest: [(e) => (e = JSON.stringify(e), e)],
  validateStatus() {
    return !0;
  },
  transformResponse: [(e) => (typeof e == "string" && e.startsWith("{") && (e = JSON.parse(e)), e)]
});
Gs.interceptors.request.use((e) => (e.loading && Ru(e.loadingText ? e.loadingText : "Loading"), e), (e) => (e.data = {}, e.data.msg = "服务器异常，请联系管理员！", Promise.resolve(e)));
Gs.interceptors.response.use((e) => {
  const t = e.status;
  let s = "";
  return (t < 200 || t >= 300) && (s = Nu(t), typeof e.data == "string" ? e.data = { msg: s } : e.data.msg = s), Yn(), e;
}, (e) => (console.log(e), e.data = {}, e.data.msg = "请求超时或服务器异常，请检查网络或联系管理员！", Yn(), Promise.resolve(e)));
const we = (e) => new Promise((t) => {
  Gs({
    ...e
  }).then((s) => {
    s.status, t(s.data);
  });
}), _e = {
  getChannels: "/getchannelApi/getChannels",
  queryReq: "/video/queryReq",
  replayReq: "/video/replayReq",
  playReq: "/video/playReq",
  playControl: "/video/playControl",
  heart: "/video/heart",
  replayHeart: "/video/replayHeart",
  replayControl: "/video/replayControl",
  getBuses: "/baseinfo/getBuses",
  getHistoryLocations: "/location/getHistoryLocations"
};
function Rr(e, t) {
  return we({
    url: e ? e + "/baseinfo/getChannels" : _e.getChannels,
    method: "post",
    data: t,
    loading: !1
  });
}
function Lu(e, t) {
  return we({
    url: e + _e.queryReq,
    method: "post",
    data: t,
    loading: !1
  });
}
function Iu(e, t) {
  return we({
    url: e + _e.playReq,
    method: "post",
    data: t,
    loading: !1
  });
}
function Yu(e, t) {
  return we({
    url: e + _e.replayReq,
    method: "post",
    data: t,
    loading: !1
  });
}
function Fu(e, t) {
  return we({
    url: e + _e.replayHeart,
    method: "post",
    data: t,
    loading: !1
  });
}
function Uu(e, t) {
  return we({
    url: e + _e.heart,
    method: "post",
    data: t,
    loading: !1
  });
}
function Hu(e, t) {
  return we({
    url: e + _e.replayControl,
    method: "post",
    data: t,
    loading: !1
  });
}
function Wu(e, t) {
  return we({
    url: e + _e.getBuses,
    method: "post",
    data: t,
    loading: !1
  });
}
function Bu(e, t) {
  return we({
    url: e + _e.getHistoryLocations,
    method: "post",
    data: t,
    loading: !1
  });
}
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Er;
function g() {
  return Er.apply(null, arguments);
}
function zu(e) {
  Er = e;
}
function ne(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function Re(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function T(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Xs(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (T(e, t))
      return !1;
  return !0;
}
function V(e) {
  return e === void 0;
}
function ve(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function pt(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Lr(e, t) {
  var s = [], n, r = e.length;
  for (n = 0; n < r; ++n)
    s.push(t(e[n], n));
  return s;
}
function Ae(e, t) {
  for (var s in t)
    T(t, s) && (e[s] = t[s]);
  return T(t, "toString") && (e.toString = t.toString), T(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function ce(e, t, s, n) {
  return ii(e, t, s, n, !0).utc();
}
function ju() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  };
}
function A(e) {
  return e._pf == null && (e._pf = ju()), e._pf;
}
var Ts;
Array.prototype.some ? Ts = Array.prototype.some : Ts = function(e) {
  var t = Object(this), s = t.length >>> 0, n;
  for (n = 0; n < s; n++)
    if (n in t && e.call(this, t[n], n, t))
      return !0;
  return !1;
};
function qs(e) {
  if (e._isValid == null) {
    var t = A(e), s = Ts.call(t.parsedDateParts, function(r) {
      return r != null;
    }), n = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && s);
    if (e._strict && (n = n && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = n;
    else
      return n;
  }
  return e._isValid;
}
function $t(e) {
  var t = ce(NaN);
  return e != null ? Ae(A(t), e) : A(t).userInvalidated = !0, t;
}
var Fn = g.momentProperties = [], ys = !1;
function Zs(e, t) {
  var s, n, r, i = Fn.length;
  if (V(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), V(t._i) || (e._i = t._i), V(t._f) || (e._f = t._f), V(t._l) || (e._l = t._l), V(t._strict) || (e._strict = t._strict), V(t._tzm) || (e._tzm = t._tzm), V(t._isUTC) || (e._isUTC = t._isUTC), V(t._offset) || (e._offset = t._offset), V(t._pf) || (e._pf = A(t)), V(t._locale) || (e._locale = t._locale), i > 0)
    for (s = 0; s < i; s++)
      n = Fn[s], r = t[n], V(r) || (e[n] = r);
  return e;
}
function yt(e) {
  Zs(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), ys === !1 && (ys = !0, g.updateOffset(this), ys = !1);
}
function re(e) {
  return e instanceof yt || e != null && e._isAMomentObject != null;
}
function Ir(e) {
  g.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function ee(e, t) {
  var s = !0;
  return Ae(function() {
    if (g.deprecationHandler != null && g.deprecationHandler(null, e), s) {
      var n = [], r, i, a, o = arguments.length;
      for (i = 0; i < o; i++) {
        if (r = "", typeof arguments[i] == "object") {
          r += `
[` + i + "] ";
          for (a in arguments[0])
            T(arguments[0], a) && (r += a + ": " + arguments[0][a] + ", ");
          r = r.slice(0, -2);
        } else
          r = arguments[i];
        n.push(r);
      }
      Ir(
        e + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), s = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var Un = {};
function Yr(e, t) {
  g.deprecationHandler != null && g.deprecationHandler(e, t), Un[e] || (Ir(t), Un[e] = !0);
}
g.suppressDeprecationWarnings = !1;
g.deprecationHandler = null;
function de(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function Vu(e) {
  var t, s;
  for (s in e)
    T(e, s) && (t = e[s], de(t) ? this[s] = t : this["_" + s] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function xs(e, t) {
  var s = Ae({}, e), n;
  for (n in t)
    T(t, n) && (Re(e[n]) && Re(t[n]) ? (s[n] = {}, Ae(s[n], e[n]), Ae(s[n], t[n])) : t[n] != null ? s[n] = t[n] : delete s[n]);
  for (n in e)
    T(e, n) && !T(t, n) && Re(e[n]) && (s[n] = Ae({}, s[n]));
  return s;
}
function Js(e) {
  e != null && this.set(e);
}
var Ps;
Object.keys ? Ps = Object.keys : Ps = function(e) {
  var t, s = [];
  for (t in e)
    T(e, t) && s.push(t);
  return s;
};
var Gu = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Xu(e, t, s) {
  var n = this._calendar[e] || this._calendar.sameElse;
  return de(n) ? n.call(t, s) : n;
}
function le(e, t, s) {
  var n = "" + Math.abs(e), r = t - n.length, i = e >= 0;
  return (i ? s ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + n;
}
var Qs = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, _t = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, gs = {}, ze = {};
function _(e, t, s, n) {
  var r = n;
  typeof n == "string" && (r = function() {
    return this[n]();
  }), e && (ze[e] = r), t && (ze[t[0]] = function() {
    return le(r.apply(this, arguments), t[1], t[2]);
  }), s && (ze[s] = function() {
    return this.localeData().ordinal(
      r.apply(this, arguments),
      e
    );
  });
}
function qu(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Zu(e) {
  var t = e.match(Qs), s, n;
  for (s = 0, n = t.length; s < n; s++)
    ze[t[s]] ? t[s] = ze[t[s]] : t[s] = qu(t[s]);
  return function(r) {
    var i = "", a;
    for (a = 0; a < n; a++)
      i += de(t[a]) ? t[a].call(r, e) : t[a];
    return i;
  };
}
function Ot(e, t) {
  return e.isValid() ? (t = Fr(t, e.localeData()), gs[t] = gs[t] || Zu(t), gs[t](e)) : e.localeData().invalidDate();
}
function Fr(e, t) {
  var s = 5;
  function n(r) {
    return t.longDateFormat(r) || r;
  }
  for (_t.lastIndex = 0; s >= 0 && _t.test(e); )
    e = e.replace(
      _t,
      n
    ), _t.lastIndex = 0, s -= 1;
  return e;
}
var Ju = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function Qu(e) {
  var t = this._longDateFormat[e], s = this._longDateFormat[e.toUpperCase()];
  return t || !s ? t : (this._longDateFormat[e] = s.match(Qs).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[e]);
}
var Ku = "Invalid date";
function $u() {
  return this._invalidDate;
}
var ec = "%d", tc = /\d{1,2}/;
function sc(e) {
  return this._ordinal.replace("%d", e);
}
var nc = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function rc(e, t, s, n) {
  var r = this._relativeTime[s];
  return de(r) ? r(e, t, s, n) : r.replace(/%d/i, e);
}
function ic(e, t) {
  var s = this._relativeTime[e > 0 ? "future" : "past"];
  return de(s) ? s(t) : s.replace(/%s/i, t);
}
var at = {};
function B(e, t) {
  var s = e.toLowerCase();
  at[s] = at[s + "s"] = at[t] = e;
}
function te(e) {
  return typeof e == "string" ? at[e] || at[e.toLowerCase()] : void 0;
}
function Ks(e) {
  var t = {}, s, n;
  for (n in e)
    T(e, n) && (s = te(n), s && (t[s] = e[n]));
  return t;
}
var Ur = {};
function z(e, t) {
  Ur[e] = t;
}
function ac(e) {
  var t = [], s;
  for (s in e)
    T(e, s) && t.push({ unit: s, priority: Ur[s] });
  return t.sort(function(n, r) {
    return n.priority - r.priority;
  }), t;
}
function es(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function K(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function k(e) {
  var t = +e, s = 0;
  return t !== 0 && isFinite(t) && (s = K(t)), s;
}
function Ke(e, t) {
  return function(s) {
    return s != null ? (Hr(this, e, s), g.updateOffset(this, t), this) : Lt(this, e);
  };
}
function Lt(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Hr(e, t, s) {
  e.isValid() && !isNaN(s) && (t === "FullYear" && es(e.year()) && e.month() === 1 && e.date() === 29 ? (s = k(s), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    s,
    e.month(),
    as(s, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](s));
}
function oc(e) {
  return e = te(e), de(this[e]) ? this[e]() : this;
}
function lc(e, t) {
  if (typeof e == "object") {
    e = Ks(e);
    var s = ac(e), n, r = s.length;
    for (n = 0; n < r; n++)
      this[s[n].unit](e[s[n].unit]);
  } else if (e = te(e), de(this[e]))
    return this[e](t);
  return this;
}
var Wr = /\d/, J = /\d\d/, Br = /\d{3}/, $s = /\d{4}/, ts = /[+-]?\d{6}/, L = /\d\d?/, zr = /\d\d\d\d?/, jr = /\d\d\d\d\d\d?/, ss = /\d{1,3}/, en = /\d{1,4}/, ns = /[+-]?\d{1,6}/, $e = /\d+/, rs = /[+-]?\d+/, uc = /Z|[+-]\d\d:?\d\d/gi, is = /Z|[+-]\d\d(?::?\d\d)?/gi, cc = /[+-]?\d+(\.\d{1,3})?/, gt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, It;
It = {};
function w(e, t, s) {
  It[e] = de(t) ? t : function(n, r) {
    return n && s ? s : t;
  };
}
function dc(e, t) {
  return T(It, e) ? It[e](t._strict, t._locale) : new RegExp(fc(e));
}
function fc(e) {
  return Z(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, s, n, r, i) {
        return s || n || r || i;
      }
    )
  );
}
function Z(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Cs = {};
function N(e, t) {
  var s, n = t, r;
  for (typeof e == "string" && (e = [e]), ve(t) && (n = function(i, a) {
    a[t] = k(i);
  }), r = e.length, s = 0; s < r; s++)
    Cs[e[s]] = n;
}
function vt(e, t) {
  N(e, function(s, n, r, i) {
    r._w = r._w || {}, t(s, r._w, r, i);
  });
}
function hc(e, t, s) {
  t != null && T(Cs, e) && Cs[e](t, s._a, s, e);
}
var W = 0, me = 1, ae = 2, F = 3, se = 4, pe = 5, Ne = 6, mc = 7, pc = 8;
function yc(e, t) {
  return (e % t + t) % t;
}
var Y;
Array.prototype.indexOf ? Y = Array.prototype.indexOf : Y = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function as(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var s = yc(t, 12);
  return e += (t - s) / 12, s === 1 ? es(e) ? 29 : 28 : 31 - s % 7 % 2;
}
_("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
_("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
_("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
B("month", "M");
z("month", 8);
w("M", L);
w("MM", L, J);
w("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
w("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
N(["M", "MM"], function(e, t) {
  t[me] = k(e) - 1;
});
N(["MMM", "MMMM"], function(e, t, s, n) {
  var r = s._locale.monthsParse(e, n, s._strict);
  r != null ? t[me] = r : A(s).invalidMonth = e;
});
var gc = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Vr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Gr = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, vc = gt, wc = gt;
function _c(e, t) {
  return e ? ne(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Gr).test(t) ? "format" : "standalone"][e.month()] : ne(this._months) ? this._months : this._months.standalone;
}
function bc(e, t) {
  return e ? ne(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Gr.test(t) ? "format" : "standalone"][e.month()] : ne(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function Sc(e, t, s) {
  var n, r, i, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      i = ce([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        i,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
  return s ? t === "MMM" ? (r = Y.call(this._shortMonthsParse, a), r !== -1 ? r : null) : (r = Y.call(this._longMonthsParse, a), r !== -1 ? r : null) : t === "MMM" ? (r = Y.call(this._shortMonthsParse, a), r !== -1 ? r : (r = Y.call(this._longMonthsParse, a), r !== -1 ? r : null)) : (r = Y.call(this._longMonthsParse, a), r !== -1 ? r : (r = Y.call(this._shortMonthsParse, a), r !== -1 ? r : null));
}
function Mc(e, t, s) {
  var n, r, i;
  if (this._monthsParseExact)
    return Sc.call(this, e, t, s);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
    if (r = ce([2e3, n]), s && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp(
      "^" + this.months(r, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[n] = new RegExp(
      "^" + this.monthsShort(r, "").replace(".", "") + "$",
      "i"
    )), !s && !this._monthsParse[n] && (i = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[n] = new RegExp(i.replace(".", ""), "i")), s && t === "MMMM" && this._longMonthsParse[n].test(e))
      return n;
    if (s && t === "MMM" && this._shortMonthsParse[n].test(e))
      return n;
    if (!s && this._monthsParse[n].test(e))
      return n;
  }
}
function Xr(e, t) {
  var s;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = k(t);
    else if (t = e.localeData().monthsParse(t), !ve(t))
      return e;
  }
  return s = Math.min(e.date(), as(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, s), e;
}
function qr(e) {
  return e != null ? (Xr(this, e), g.updateOffset(this, !0), this) : Lt(this, "Month");
}
function Ac() {
  return as(this.year(), this.month());
}
function kc(e) {
  return this._monthsParseExact ? (T(this, "_monthsRegex") || Zr.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (T(this, "_monthsShortRegex") || (this._monthsShortRegex = vc), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function Oc(e) {
  return this._monthsParseExact ? (T(this, "_monthsRegex") || Zr.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (T(this, "_monthsRegex") || (this._monthsRegex = wc), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function Zr() {
  function e(a, o) {
    return o.length - a.length;
  }
  var t = [], s = [], n = [], r, i;
  for (r = 0; r < 12; r++)
    i = ce([2e3, r]), t.push(this.monthsShort(i, "")), s.push(this.months(i, "")), n.push(this.months(i, "")), n.push(this.monthsShort(i, ""));
  for (t.sort(e), s.sort(e), n.sort(e), r = 0; r < 12; r++)
    t[r] = Z(t[r]), s[r] = Z(s[r]);
  for (r = 0; r < 24; r++)
    n[r] = Z(n[r]);
  this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
_("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? le(e, 4) : "+" + e;
});
_(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
_(0, ["YYYY", 4], 0, "year");
_(0, ["YYYYY", 5], 0, "year");
_(0, ["YYYYYY", 6, !0], 0, "year");
B("year", "y");
z("year", 1);
w("Y", rs);
w("YY", L, J);
w("YYYY", en, $s);
w("YYYYY", ns, ts);
w("YYYYYY", ns, ts);
N(["YYYYY", "YYYYYY"], W);
N("YYYY", function(e, t) {
  t[W] = e.length === 2 ? g.parseTwoDigitYear(e) : k(e);
});
N("YY", function(e, t) {
  t[W] = g.parseTwoDigitYear(e);
});
N("Y", function(e, t) {
  t[W] = parseInt(e, 10);
});
function ot(e) {
  return es(e) ? 366 : 365;
}
g.parseTwoDigitYear = function(e) {
  return k(e) + (k(e) > 68 ? 1900 : 2e3);
};
var Jr = Ke("FullYear", !0);
function Dc() {
  return es(this.year());
}
function Tc(e, t, s, n, r, i, a) {
  var o;
  return e < 100 && e >= 0 ? (o = new Date(e + 400, t, s, n, r, i, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, s, n, r, i, a), o;
}
function ct(e) {
  var t, s;
  return e < 100 && e >= 0 ? (s = Array.prototype.slice.call(arguments), s[0] = e + 400, t = new Date(Date.UTC.apply(null, s)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function Yt(e, t, s) {
  var n = 7 + t - s, r = (7 + ct(e, 0, n).getUTCDay() - t) % 7;
  return -r + n - 1;
}
function Qr(e, t, s, n, r) {
  var i = (7 + s - n) % 7, a = Yt(e, n, r), o = 1 + 7 * (t - 1) + i + a, c, l;
  return o <= 0 ? (c = e - 1, l = ot(c) + o) : o > ot(e) ? (c = e + 1, l = o - ot(e)) : (c = e, l = o), {
    year: c,
    dayOfYear: l
  };
}
function dt(e, t, s) {
  var n = Yt(e.year(), t, s), r = Math.floor((e.dayOfYear() - n - 1) / 7) + 1, i, a;
  return r < 1 ? (a = e.year() - 1, i = r + ge(a, t, s)) : r > ge(e.year(), t, s) ? (i = r - ge(e.year(), t, s), a = e.year() + 1) : (a = e.year(), i = r), {
    week: i,
    year: a
  };
}
function ge(e, t, s) {
  var n = Yt(e, t, s), r = Yt(e + 1, t, s);
  return (ot(e) - n + r) / 7;
}
_("w", ["ww", 2], "wo", "week");
_("W", ["WW", 2], "Wo", "isoWeek");
B("week", "w");
B("isoWeek", "W");
z("week", 5);
z("isoWeek", 5);
w("w", L);
w("ww", L, J);
w("W", L);
w("WW", L, J);
vt(
  ["w", "ww", "W", "WW"],
  function(e, t, s, n) {
    t[n.substr(0, 1)] = k(e);
  }
);
function xc(e) {
  return dt(e, this._week.dow, this._week.doy).week;
}
var Pc = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function Cc() {
  return this._week.dow;
}
function Nc() {
  return this._week.doy;
}
function Rc(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function Ec(e) {
  var t = dt(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
_("d", 0, "do", "day");
_("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
_("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
_("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
_("e", 0, 0, "weekday");
_("E", 0, 0, "isoWeekday");
B("day", "d");
B("weekday", "e");
B("isoWeekday", "E");
z("day", 11);
z("weekday", 11);
z("isoWeekday", 11);
w("d", L);
w("e", L);
w("E", L);
w("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
w("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
w("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
vt(["dd", "ddd", "dddd"], function(e, t, s, n) {
  var r = s._locale.weekdaysParse(e, n, s._strict);
  r != null ? t.d = r : A(s).invalidWeekday = e;
});
vt(["d", "e", "E"], function(e, t, s, n) {
  t[n] = k(e);
});
function Lc(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function Ic(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function tn(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var Yc = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Kr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Fc = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Uc = gt, Hc = gt, Wc = gt;
function Bc(e, t) {
  var s = ne(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? tn(s, this._week.dow) : e ? s[e.day()] : s;
}
function zc(e) {
  return e === !0 ? tn(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function jc(e) {
  return e === !0 ? tn(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function Vc(e, t, s) {
  var n, r, i, a = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
      i = ce([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(
        i,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(
        i,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(i, "").toLocaleLowerCase();
  return s ? t === "dddd" ? (r = Y.call(this._weekdaysParse, a), r !== -1 ? r : null) : t === "ddd" ? (r = Y.call(this._shortWeekdaysParse, a), r !== -1 ? r : null) : (r = Y.call(this._minWeekdaysParse, a), r !== -1 ? r : null) : t === "dddd" ? (r = Y.call(this._weekdaysParse, a), r !== -1 || (r = Y.call(this._shortWeekdaysParse, a), r !== -1) ? r : (r = Y.call(this._minWeekdaysParse, a), r !== -1 ? r : null)) : t === "ddd" ? (r = Y.call(this._shortWeekdaysParse, a), r !== -1 || (r = Y.call(this._weekdaysParse, a), r !== -1) ? r : (r = Y.call(this._minWeekdaysParse, a), r !== -1 ? r : null)) : (r = Y.call(this._minWeekdaysParse, a), r !== -1 || (r = Y.call(this._weekdaysParse, a), r !== -1) ? r : (r = Y.call(this._shortWeekdaysParse, a), r !== -1 ? r : null));
}
function Gc(e, t, s) {
  var n, r, i;
  if (this._weekdaysParseExact)
    return Vc.call(this, e, t, s);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
    if (r = ce([2e3, 1]).day(n), s && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp(
      "^" + this.weekdays(r, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[n] = new RegExp(
      "^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[n] = new RegExp(
      "^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[n] || (i = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[n] = new RegExp(i.replace(".", ""), "i")), s && t === "dddd" && this._fullWeekdaysParse[n].test(e))
      return n;
    if (s && t === "ddd" && this._shortWeekdaysParse[n].test(e))
      return n;
    if (s && t === "dd" && this._minWeekdaysParse[n].test(e))
      return n;
    if (!s && this._weekdaysParse[n].test(e))
      return n;
  }
}
function Xc(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = Lc(e, this.localeData()), this.add(e - t, "d")) : t;
}
function qc(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function Zc(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = Ic(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function Jc(e) {
  return this._weekdaysParseExact ? (T(this, "_weekdaysRegex") || sn.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (T(this, "_weekdaysRegex") || (this._weekdaysRegex = Uc), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Qc(e) {
  return this._weekdaysParseExact ? (T(this, "_weekdaysRegex") || sn.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (T(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Hc), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function Kc(e) {
  return this._weekdaysParseExact ? (T(this, "_weekdaysRegex") || sn.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (T(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Wc), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function sn() {
  function e(p, u) {
    return u.length - p.length;
  }
  var t = [], s = [], n = [], r = [], i, a, o, c, l;
  for (i = 0; i < 7; i++)
    a = ce([2e3, 1]).day(i), o = Z(this.weekdaysMin(a, "")), c = Z(this.weekdaysShort(a, "")), l = Z(this.weekdays(a, "")), t.push(o), s.push(c), n.push(l), r.push(o), r.push(c), r.push(l);
  t.sort(e), s.sort(e), n.sort(e), r.sort(e), this._weekdaysRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function nn() {
  return this.hours() % 12 || 12;
}
function $c() {
  return this.hours() || 24;
}
_("H", ["HH", 2], 0, "hour");
_("h", ["hh", 2], 0, nn);
_("k", ["kk", 2], 0, $c);
_("hmm", 0, 0, function() {
  return "" + nn.apply(this) + le(this.minutes(), 2);
});
_("hmmss", 0, 0, function() {
  return "" + nn.apply(this) + le(this.minutes(), 2) + le(this.seconds(), 2);
});
_("Hmm", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2);
});
_("Hmmss", 0, 0, function() {
  return "" + this.hours() + le(this.minutes(), 2) + le(this.seconds(), 2);
});
function $r(e, t) {
  _(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
$r("a", !0);
$r("A", !1);
B("hour", "h");
z("hour", 13);
function ei(e, t) {
  return t._meridiemParse;
}
w("a", ei);
w("A", ei);
w("H", L);
w("h", L);
w("k", L);
w("HH", L, J);
w("hh", L, J);
w("kk", L, J);
w("hmm", zr);
w("hmmss", jr);
w("Hmm", zr);
w("Hmmss", jr);
N(["H", "HH"], F);
N(["k", "kk"], function(e, t, s) {
  var n = k(e);
  t[F] = n === 24 ? 0 : n;
});
N(["a", "A"], function(e, t, s) {
  s._isPm = s._locale.isPM(e), s._meridiem = e;
});
N(["h", "hh"], function(e, t, s) {
  t[F] = k(e), A(s).bigHour = !0;
});
N("hmm", function(e, t, s) {
  var n = e.length - 2;
  t[F] = k(e.substr(0, n)), t[se] = k(e.substr(n)), A(s).bigHour = !0;
});
N("hmmss", function(e, t, s) {
  var n = e.length - 4, r = e.length - 2;
  t[F] = k(e.substr(0, n)), t[se] = k(e.substr(n, 2)), t[pe] = k(e.substr(r)), A(s).bigHour = !0;
});
N("Hmm", function(e, t, s) {
  var n = e.length - 2;
  t[F] = k(e.substr(0, n)), t[se] = k(e.substr(n));
});
N("Hmmss", function(e, t, s) {
  var n = e.length - 4, r = e.length - 2;
  t[F] = k(e.substr(0, n)), t[se] = k(e.substr(n, 2)), t[pe] = k(e.substr(r));
});
function ed(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var td = /[ap]\.?m?\.?/i, sd = Ke("Hours", !0);
function nd(e, t, s) {
  return e > 11 ? s ? "pm" : "PM" : s ? "am" : "AM";
}
var ti = {
  calendar: Gu,
  longDateFormat: Ju,
  invalidDate: Ku,
  ordinal: ec,
  dayOfMonthOrdinalParse: tc,
  relativeTime: nc,
  months: gc,
  monthsShort: Vr,
  week: Pc,
  weekdays: Yc,
  weekdaysMin: Fc,
  weekdaysShort: Kr,
  meridiemParse: td
}, I = {}, rt = {}, ft;
function rd(e, t) {
  var s, n = Math.min(e.length, t.length);
  for (s = 0; s < n; s += 1)
    if (e[s] !== t[s])
      return s;
  return n;
}
function Hn(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function id(e) {
  for (var t = 0, s, n, r, i; t < e.length; ) {
    for (i = Hn(e[t]).split("-"), s = i.length, n = Hn(e[t + 1]), n = n ? n.split("-") : null; s > 0; ) {
      if (r = os(i.slice(0, s).join("-")), r)
        return r;
      if (n && n.length >= s && rd(i, n) >= s - 1)
        break;
      s--;
    }
    t++;
  }
  return ft;
}
function ad(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function os(e) {
  var t = null, s;
  if (I[e] === void 0 && typeof module < "u" && module && module.exports && ad(e))
    try {
      t = ft._abbr, s = require, s("./locale/" + e), Te(t);
    } catch {
      I[e] = null;
    }
  return I[e];
}
function Te(e, t) {
  var s;
  return e && (V(t) ? s = be(e) : s = rn(e, t), s ? ft = s : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), ft._abbr;
}
function rn(e, t) {
  if (t !== null) {
    var s, n = ti;
    if (t.abbr = e, I[e] != null)
      Yr(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = I[e]._config;
    else if (t.parentLocale != null)
      if (I[t.parentLocale] != null)
        n = I[t.parentLocale]._config;
      else if (s = os(t.parentLocale), s != null)
        n = s._config;
      else
        return rt[t.parentLocale] || (rt[t.parentLocale] = []), rt[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return I[e] = new Js(xs(n, t)), rt[e] && rt[e].forEach(function(r) {
      rn(r.name, r.config);
    }), Te(e), I[e];
  } else
    return delete I[e], null;
}
function od(e, t) {
  if (t != null) {
    var s, n, r = ti;
    I[e] != null && I[e].parentLocale != null ? I[e].set(xs(I[e]._config, t)) : (n = os(e), n != null && (r = n._config), t = xs(r, t), n == null && (t.abbr = e), s = new Js(t), s.parentLocale = I[e], I[e] = s), Te(e);
  } else
    I[e] != null && (I[e].parentLocale != null ? (I[e] = I[e].parentLocale, e === Te() && Te(e)) : I[e] != null && delete I[e]);
  return I[e];
}
function be(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return ft;
  if (!ne(e)) {
    if (t = os(e), t)
      return t;
    e = [e];
  }
  return id(e);
}
function ld() {
  return Ps(I);
}
function an(e) {
  var t, s = e._a;
  return s && A(e).overflow === -2 && (t = s[me] < 0 || s[me] > 11 ? me : s[ae] < 1 || s[ae] > as(s[W], s[me]) ? ae : s[F] < 0 || s[F] > 24 || s[F] === 24 && (s[se] !== 0 || s[pe] !== 0 || s[Ne] !== 0) ? F : s[se] < 0 || s[se] > 59 ? se : s[pe] < 0 || s[pe] > 59 ? pe : s[Ne] < 0 || s[Ne] > 999 ? Ne : -1, A(e)._overflowDayOfYear && (t < W || t > ae) && (t = ae), A(e)._overflowWeeks && t === -1 && (t = mc), A(e)._overflowWeekday && t === -1 && (t = pc), A(e).overflow = t), e;
}
var ud = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, cd = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, dd = /Z|[+-]\d\d(?::?\d\d)?/, bt = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, !1],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, !1],
  ["YYYY", /\d{4}/, !1]
], vs = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], fd = /^\/?Date\((-?\d+)/i, hd = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, md = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function si(e) {
  var t, s, n = e._i, r = ud.exec(n) || cd.exec(n), i, a, o, c, l = bt.length, p = vs.length;
  if (r) {
    for (A(e).iso = !0, t = 0, s = l; t < s; t++)
      if (bt[t][1].exec(r[1])) {
        a = bt[t][0], i = bt[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (r[3]) {
      for (t = 0, s = p; t < s; t++)
        if (vs[t][1].exec(r[3])) {
          o = (r[2] || " ") + vs[t][0];
          break;
        }
      if (o == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!i && o != null) {
      e._isValid = !1;
      return;
    }
    if (r[4])
      if (dd.exec(r[4]))
        c = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (o || "") + (c || ""), ln(e);
  } else
    e._isValid = !1;
}
function pd(e, t, s, n, r, i) {
  var a = [
    yd(e),
    Vr.indexOf(t),
    parseInt(s, 10),
    parseInt(n, 10),
    parseInt(r, 10)
  ];
  return i && a.push(parseInt(i, 10)), a;
}
function yd(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function gd(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function vd(e, t, s) {
  if (e) {
    var n = Kr.indexOf(e), r = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (n !== r)
      return A(s).weekdayMismatch = !0, s._isValid = !1, !1;
  }
  return !0;
}
function wd(e, t, s) {
  if (e)
    return md[e];
  if (t)
    return 0;
  var n = parseInt(s, 10), r = n % 100, i = (n - r) / 100;
  return i * 60 + r;
}
function ni(e) {
  var t = hd.exec(gd(e._i)), s;
  if (t) {
    if (s = pd(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !vd(t[1], s, e))
      return;
    e._a = s, e._tzm = wd(t[8], t[9], t[10]), e._d = ct.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), A(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function _d(e) {
  var t = fd.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (si(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (ni(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : g.createFromInputFallback(e);
}
g.createFromInputFallback = ee(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function We(e, t, s) {
  return e ?? t ?? s;
}
function bd(e) {
  var t = new Date(g.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function on(e) {
  var t, s, n = [], r, i, a;
  if (!e._d) {
    for (r = bd(e), e._w && e._a[ae] == null && e._a[me] == null && Sd(e), e._dayOfYear != null && (a = We(e._a[W], r[W]), (e._dayOfYear > ot(a) || e._dayOfYear === 0) && (A(e)._overflowDayOfYear = !0), s = ct(a, 0, e._dayOfYear), e._a[me] = s.getUTCMonth(), e._a[ae] = s.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = n[t] = r[t];
    for (; t < 7; t++)
      e._a[t] = n[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[F] === 24 && e._a[se] === 0 && e._a[pe] === 0 && e._a[Ne] === 0 && (e._nextDay = !0, e._a[F] = 0), e._d = (e._useUTC ? ct : Tc).apply(
      null,
      n
    ), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[F] = 24), e._w && typeof e._w.d < "u" && e._w.d !== i && (A(e).weekdayMismatch = !0);
  }
}
function Sd(e) {
  var t, s, n, r, i, a, o, c, l;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (i = 1, a = 4, s = We(
    t.GG,
    e._a[W],
    dt(E(), 1, 4).year
  ), n = We(t.W, 1), r = We(t.E, 1), (r < 1 || r > 7) && (c = !0)) : (i = e._locale._week.dow, a = e._locale._week.doy, l = dt(E(), i, a), s = We(t.gg, e._a[W], l.year), n = We(t.w, l.week), t.d != null ? (r = t.d, (r < 0 || r > 6) && (c = !0)) : t.e != null ? (r = t.e + i, (t.e < 0 || t.e > 6) && (c = !0)) : r = i), n < 1 || n > ge(s, i, a) ? A(e)._overflowWeeks = !0 : c != null ? A(e)._overflowWeekday = !0 : (o = Qr(s, n, r, i, a), e._a[W] = o.year, e._dayOfYear = o.dayOfYear);
}
g.ISO_8601 = function() {
};
g.RFC_2822 = function() {
};
function ln(e) {
  if (e._f === g.ISO_8601) {
    si(e);
    return;
  }
  if (e._f === g.RFC_2822) {
    ni(e);
    return;
  }
  e._a = [], A(e).empty = !0;
  var t = "" + e._i, s, n, r, i, a, o = t.length, c = 0, l, p;
  for (r = Fr(e._f, e._locale).match(Qs) || [], p = r.length, s = 0; s < p; s++)
    i = r[s], n = (t.match(dc(i, e)) || [])[0], n && (a = t.substr(0, t.indexOf(n)), a.length > 0 && A(e).unusedInput.push(a), t = t.slice(
      t.indexOf(n) + n.length
    ), c += n.length), ze[i] ? (n ? A(e).empty = !1 : A(e).unusedTokens.push(i), hc(i, n, e)) : e._strict && !n && A(e).unusedTokens.push(i);
  A(e).charsLeftOver = o - c, t.length > 0 && A(e).unusedInput.push(t), e._a[F] <= 12 && A(e).bigHour === !0 && e._a[F] > 0 && (A(e).bigHour = void 0), A(e).parsedDateParts = e._a.slice(0), A(e).meridiem = e._meridiem, e._a[F] = Md(
    e._locale,
    e._a[F],
    e._meridiem
  ), l = A(e).era, l !== null && (e._a[W] = e._locale.erasConvertYear(l, e._a[W])), on(e), an(e);
}
function Md(e, t, s) {
  var n;
  return s == null ? t : e.meridiemHour != null ? e.meridiemHour(t, s) : (e.isPM != null && (n = e.isPM(s), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
}
function Ad(e) {
  var t, s, n, r, i, a, o = !1, c = e._f.length;
  if (c === 0) {
    A(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (r = 0; r < c; r++)
    i = 0, a = !1, t = Zs({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[r], ln(t), qs(t) && (a = !0), i += A(t).charsLeftOver, i += A(t).unusedTokens.length * 10, A(t).score = i, o ? i < n && (n = i, s = t) : (n == null || i < n || a) && (n = i, s = t, a && (o = !0));
  Ae(e, s || t);
}
function kd(e) {
  if (!e._d) {
    var t = Ks(e._i), s = t.day === void 0 ? t.date : t.day;
    e._a = Lr(
      [t.year, t.month, s, t.hour, t.minute, t.second, t.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), on(e);
  }
}
function Od(e) {
  var t = new yt(an(ri(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function ri(e) {
  var t = e._i, s = e._f;
  return e._locale = e._locale || be(e._l), t === null || s === void 0 && t === "" ? $t({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), re(t) ? new yt(an(t)) : (pt(t) ? e._d = t : ne(s) ? Ad(e) : s ? ln(e) : Dd(e), qs(e) || (e._d = null), e));
}
function Dd(e) {
  var t = e._i;
  V(t) ? e._d = new Date(g.now()) : pt(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? _d(e) : ne(t) ? (e._a = Lr(t.slice(0), function(s) {
    return parseInt(s, 10);
  }), on(e)) : Re(t) ? kd(e) : ve(t) ? e._d = new Date(t) : g.createFromInputFallback(e);
}
function ii(e, t, s, n, r) {
  var i = {};
  return (t === !0 || t === !1) && (n = t, t = void 0), (s === !0 || s === !1) && (n = s, s = void 0), (Re(e) && Xs(e) || ne(e) && e.length === 0) && (e = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = r, i._l = s, i._i = e, i._f = t, i._strict = n, Od(i);
}
function E(e, t, s, n) {
  return ii(e, t, s, n, !1);
}
var Td = ee(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = E.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : $t();
  }
), xd = ee(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = E.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : $t();
  }
);
function ai(e, t) {
  var s, n;
  if (t.length === 1 && ne(t[0]) && (t = t[0]), !t.length)
    return E();
  for (s = t[0], n = 1; n < t.length; ++n)
    (!t[n].isValid() || t[n][e](s)) && (s = t[n]);
  return s;
}
function Pd() {
  var e = [].slice.call(arguments, 0);
  return ai("isBefore", e);
}
function Cd() {
  var e = [].slice.call(arguments, 0);
  return ai("isAfter", e);
}
var Nd = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, it = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function Rd(e) {
  var t, s = !1, n, r = it.length;
  for (t in e)
    if (T(e, t) && !(Y.call(it, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (n = 0; n < r; ++n)
    if (e[it[n]]) {
      if (s)
        return !1;
      parseFloat(e[it[n]]) !== k(e[it[n]]) && (s = !0);
    }
  return !0;
}
function Ed() {
  return this._isValid;
}
function Ld() {
  return ie(NaN);
}
function ls(e) {
  var t = Ks(e), s = t.year || 0, n = t.quarter || 0, r = t.month || 0, i = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, c = t.minute || 0, l = t.second || 0, p = t.millisecond || 0;
  this._isValid = Rd(t), this._milliseconds = +p + l * 1e3 + // 1000
  c * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + i * 7, this._months = +r + n * 3 + s * 12, this._data = {}, this._locale = be(), this._bubble();
}
function Dt(e) {
  return e instanceof ls;
}
function Ns(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function Id(e, t, s) {
  var n = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), i = 0, a;
  for (a = 0; a < n; a++)
    (s && e[a] !== t[a] || !s && k(e[a]) !== k(t[a])) && i++;
  return i + r;
}
function oi(e, t) {
  _(e, 0, 0, function() {
    var s = this.utcOffset(), n = "+";
    return s < 0 && (s = -s, n = "-"), n + le(~~(s / 60), 2) + t + le(~~s % 60, 2);
  });
}
oi("Z", ":");
oi("ZZ", "");
w("Z", is);
w("ZZ", is);
N(["Z", "ZZ"], function(e, t, s) {
  s._useUTC = !0, s._tzm = un(is, e);
});
var Yd = /([\+\-]|\d\d)/gi;
function un(e, t) {
  var s = (t || "").match(e), n, r, i;
  return s === null ? null : (n = s[s.length - 1] || [], r = (n + "").match(Yd) || ["-", 0, 0], i = +(r[1] * 60) + k(r[2]), i === 0 ? 0 : r[0] === "+" ? i : -i);
}
function cn(e, t) {
  var s, n;
  return t._isUTC ? (s = t.clone(), n = (re(e) || pt(e) ? e.valueOf() : E(e).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + n), g.updateOffset(s, !1), s) : E(e).local();
}
function Rs(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
g.updateOffset = function() {
};
function Fd(e, t, s) {
  var n = this._offset || 0, r;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = un(is, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !s && (e = e * 60);
    return !this._isUTC && t && (r = Rs(this)), this._offset = e, this._isUTC = !0, r != null && this.add(r, "m"), n !== e && (!t || this._changeInProgress ? ci(
      this,
      ie(e - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, g.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : Rs(this);
}
function Ud(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function Hd(e) {
  return this.utcOffset(0, e);
}
function Wd(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Rs(this), "m")), this;
}
function Bd() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = un(uc, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function zd(e) {
  return this.isValid() ? (e = e ? E(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function jd() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Vd() {
  if (!V(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return Zs(e, this), e = ri(e), e._a ? (t = e._isUTC ? ce(e._a) : E(e._a), this._isDSTShifted = this.isValid() && Id(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function Gd() {
  return this.isValid() ? !this._isUTC : !1;
}
function Xd() {
  return this.isValid() ? this._isUTC : !1;
}
function li() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var qd = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Zd = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function ie(e, t) {
  var s = e, n = null, r, i, a;
  return Dt(e) ? s = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : ve(e) || !isNaN(+e) ? (s = {}, t ? s[t] = +e : s.milliseconds = +e) : (n = qd.exec(e)) ? (r = n[1] === "-" ? -1 : 1, s = {
    y: 0,
    d: k(n[ae]) * r,
    h: k(n[F]) * r,
    m: k(n[se]) * r,
    s: k(n[pe]) * r,
    ms: k(Ns(n[Ne] * 1e3)) * r
    // the millisecond decimal point is included in the match
  }) : (n = Zd.exec(e)) ? (r = n[1] === "-" ? -1 : 1, s = {
    y: Ce(n[2], r),
    M: Ce(n[3], r),
    w: Ce(n[4], r),
    d: Ce(n[5], r),
    h: Ce(n[6], r),
    m: Ce(n[7], r),
    s: Ce(n[8], r)
  }) : s == null ? s = {} : typeof s == "object" && ("from" in s || "to" in s) && (a = Jd(
    E(s.from),
    E(s.to)
  ), s = {}, s.ms = a.milliseconds, s.M = a.months), i = new ls(s), Dt(e) && T(e, "_locale") && (i._locale = e._locale), Dt(e) && T(e, "_isValid") && (i._isValid = e._isValid), i;
}
ie.fn = ls.prototype;
ie.invalid = Ld;
function Ce(e, t) {
  var s = e && parseFloat(e.replace(",", "."));
  return (isNaN(s) ? 0 : s) * t;
}
function Wn(e, t) {
  var s = {};
  return s.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(s.months, "M").isAfter(t) && --s.months, s.milliseconds = +t - +e.clone().add(s.months, "M"), s;
}
function Jd(e, t) {
  var s;
  return e.isValid() && t.isValid() ? (t = cn(t, e), e.isBefore(t) ? s = Wn(e, t) : (s = Wn(t, e), s.milliseconds = -s.milliseconds, s.months = -s.months), s) : { milliseconds: 0, months: 0 };
}
function ui(e, t) {
  return function(s, n) {
    var r, i;
    return n !== null && !isNaN(+n) && (Yr(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), i = s, s = n, n = i), r = ie(s, n), ci(this, r, e), this;
  };
}
function ci(e, t, s, n) {
  var r = t._milliseconds, i = Ns(t._days), a = Ns(t._months);
  e.isValid() && (n = n ?? !0, a && Xr(e, Lt(e, "Month") + a * s), i && Hr(e, "Date", Lt(e, "Date") + i * s), r && e._d.setTime(e._d.valueOf() + r * s), n && g.updateOffset(e, i || a));
}
var Qd = ui(1, "add"), Kd = ui(-1, "subtract");
function di(e) {
  return typeof e == "string" || e instanceof String;
}
function $d(e) {
  return re(e) || pt(e) || di(e) || ve(e) || tf(e) || ef(e) || e === null || e === void 0;
}
function ef(e) {
  var t = Re(e) && !Xs(e), s = !1, n = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], r, i, a = n.length;
  for (r = 0; r < a; r += 1)
    i = n[r], s = s || T(e, i);
  return t && s;
}
function tf(e) {
  var t = ne(e), s = !1;
  return t && (s = e.filter(function(n) {
    return !ve(n) && di(e);
  }).length === 0), t && s;
}
function sf(e) {
  var t = Re(e) && !Xs(e), s = !1, n = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], r, i;
  for (r = 0; r < n.length; r += 1)
    i = n[r], s = s || T(e, i);
  return t && s;
}
function nf(e, t) {
  var s = e.diff(t, "days", !0);
  return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
}
function rf(e, t) {
  arguments.length === 1 && (arguments[0] ? $d(arguments[0]) ? (e = arguments[0], t = void 0) : sf(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var s = e || E(), n = cn(s, this).startOf("day"), r = g.calendarFormat(this, n) || "sameElse", i = t && (de(t[r]) ? t[r].call(this, s) : t[r]);
  return this.format(
    i || this.localeData().calendar(r, this, E(s))
  );
}
function af() {
  return new yt(this);
}
function of(e, t) {
  var s = re(e) ? e : E(e);
  return this.isValid() && s.isValid() ? (t = te(t) || "millisecond", t === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function lf(e, t) {
  var s = re(e) ? e : E(e);
  return this.isValid() && s.isValid() ? (t = te(t) || "millisecond", t === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(t).valueOf() < s.valueOf()) : !1;
}
function uf(e, t, s, n) {
  var r = re(e) ? e : E(e), i = re(t) ? t : E(t);
  return this.isValid() && r.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(r, s) : !this.isBefore(r, s)) && (n[1] === ")" ? this.isBefore(i, s) : !this.isAfter(i, s))) : !1;
}
function cf(e, t) {
  var s = re(e) ? e : E(e), n;
  return this.isValid() && s.isValid() ? (t = te(t) || "millisecond", t === "millisecond" ? this.valueOf() === s.valueOf() : (n = s.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
}
function df(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function ff(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function hf(e, t, s) {
  var n, r, i;
  if (!this.isValid())
    return NaN;
  if (n = cn(e, this), !n.isValid())
    return NaN;
  switch (r = (n.utcOffset() - this.utcOffset()) * 6e4, t = te(t), t) {
    case "year":
      i = Tt(this, n) / 12;
      break;
    case "month":
      i = Tt(this, n);
      break;
    case "quarter":
      i = Tt(this, n) / 3;
      break;
    case "second":
      i = (this - n) / 1e3;
      break;
    case "minute":
      i = (this - n) / 6e4;
      break;
    case "hour":
      i = (this - n) / 36e5;
      break;
    case "day":
      i = (this - n - r) / 864e5;
      break;
    case "week":
      i = (this - n - r) / 6048e5;
      break;
    default:
      i = this - n;
  }
  return s ? i : K(i);
}
function Tt(e, t) {
  if (e.date() < t.date())
    return -Tt(t, e);
  var s = (t.year() - e.year()) * 12 + (t.month() - e.month()), n = e.clone().add(s, "months"), r, i;
  return t - n < 0 ? (r = e.clone().add(s - 1, "months"), i = (t - n) / (n - r)) : (r = e.clone().add(s + 1, "months"), i = (t - n) / (r - n)), -(s + i) || 0;
}
g.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
g.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function mf() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function pf(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, s = t ? this.clone().utc() : this;
  return s.year() < 0 || s.year() > 9999 ? Ot(
    s,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : de(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Ot(s, "Z")) : Ot(
    s,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function yf() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", s, n, r, i;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), s = "[" + e + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", r = "-MM-DD[T]HH:mm:ss.SSS", i = t + '[")]', this.format(s + n + r + i);
}
function gf(e) {
  e || (e = this.isUtc() ? g.defaultFormatUtc : g.defaultFormat);
  var t = Ot(this, e);
  return this.localeData().postformat(t);
}
function vf(e, t) {
  return this.isValid() && (re(e) && e.isValid() || E(e).isValid()) ? ie({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function wf(e) {
  return this.from(E(), e);
}
function _f(e, t) {
  return this.isValid() && (re(e) && e.isValid() || E(e).isValid()) ? ie({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function bf(e) {
  return this.to(E(), e);
}
function fi(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = be(e), t != null && (this._locale = t), this);
}
var hi = ee(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function mi() {
  return this._locale;
}
var Ft = 1e3, je = 60 * Ft, Ut = 60 * je, pi = (365 * 400 + 97) * 24 * Ut;
function Ve(e, t) {
  return (e % t + t) % t;
}
function yi(e, t, s) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, s) - pi : new Date(e, t, s).valueOf();
}
function gi(e, t, s) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, s) - pi : Date.UTC(e, t, s);
}
function Sf(e) {
  var t, s;
  if (e = te(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? gi : yi, e) {
    case "year":
      t = s(this.year(), 0, 1);
      break;
    case "quarter":
      t = s(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      t = s(this.year(), this.month(), 1);
      break;
    case "week":
      t = s(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      t = s(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      t = s(this.year(), this.month(), this.date());
      break;
    case "hour":
      t = this._d.valueOf(), t -= Ve(
        t + (this._isUTC ? 0 : this.utcOffset() * je),
        Ut
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= Ve(t, je);
      break;
    case "second":
      t = this._d.valueOf(), t -= Ve(t, Ft);
      break;
  }
  return this._d.setTime(t), g.updateOffset(this, !0), this;
}
function Mf(e) {
  var t, s;
  if (e = te(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? gi : yi, e) {
    case "year":
      t = s(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = s(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      t = s(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = s(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      t = s(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      t = s(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      t = this._d.valueOf(), t += Ut - Ve(
        t + (this._isUTC ? 0 : this.utcOffset() * je),
        Ut
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += je - Ve(t, je) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += Ft - Ve(t, Ft) - 1;
      break;
  }
  return this._d.setTime(t), g.updateOffset(this, !0), this;
}
function Af() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function kf() {
  return Math.floor(this.valueOf() / 1e3);
}
function Of() {
  return new Date(this.valueOf());
}
function Df() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond()
  ];
}
function Tf() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds()
  };
}
function xf() {
  return this.isValid() ? this.toISOString() : null;
}
function Pf() {
  return qs(this);
}
function Cf() {
  return Ae({}, A(this));
}
function Nf() {
  return A(this).overflow;
}
function Rf() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
_("N", 0, 0, "eraAbbr");
_("NN", 0, 0, "eraAbbr");
_("NNN", 0, 0, "eraAbbr");
_("NNNN", 0, 0, "eraName");
_("NNNNN", 0, 0, "eraNarrow");
_("y", ["y", 1], "yo", "eraYear");
_("y", ["yy", 2], 0, "eraYear");
_("y", ["yyy", 3], 0, "eraYear");
_("y", ["yyyy", 4], 0, "eraYear");
w("N", dn);
w("NN", dn);
w("NNN", dn);
w("NNNN", jf);
w("NNNNN", Vf);
N(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, s, n) {
    var r = s._locale.erasParse(e, n, s._strict);
    r ? A(s).era = r : A(s).invalidEra = e;
  }
);
w("y", $e);
w("yy", $e);
w("yyy", $e);
w("yyyy", $e);
w("yo", Gf);
N(["y", "yy", "yyy", "yyyy"], W);
N(["yo"], function(e, t, s, n) {
  var r;
  s._locale._eraYearOrdinalRegex && (r = e.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? t[W] = s._locale.eraYearOrdinalParse(e, r) : t[W] = parseInt(e, 10);
});
function Ef(e, t) {
  var s, n, r, i = this._eras || be("en")._eras;
  for (s = 0, n = i.length; s < n; ++s) {
    switch (typeof i[s].since) {
      case "string":
        r = g(i[s].since).startOf("day"), i[s].since = r.valueOf();
        break;
    }
    switch (typeof i[s].until) {
      case "undefined":
        i[s].until = 1 / 0;
        break;
      case "string":
        r = g(i[s].until).startOf("day").valueOf(), i[s].until = r.valueOf();
        break;
    }
  }
  return i;
}
function Lf(e, t, s) {
  var n, r, i = this.eras(), a, o, c;
  for (e = e.toUpperCase(), n = 0, r = i.length; n < r; ++n)
    if (a = i[n].name.toUpperCase(), o = i[n].abbr.toUpperCase(), c = i[n].narrow.toUpperCase(), s)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (o === e)
            return i[n];
          break;
        case "NNNN":
          if (a === e)
            return i[n];
          break;
        case "NNNNN":
          if (c === e)
            return i[n];
          break;
      }
    else if ([a, o, c].indexOf(e) >= 0)
      return i[n];
}
function If(e, t) {
  var s = e.since <= e.until ? 1 : -1;
  return t === void 0 ? g(e.since).year() : g(e.since).year() + (t - e.offset) * s;
}
function Yf() {
  var e, t, s, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), n[e].since <= s && s <= n[e].until || n[e].until <= s && s <= n[e].since)
      return n[e].name;
  return "";
}
function Ff() {
  var e, t, s, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), n[e].since <= s && s <= n[e].until || n[e].until <= s && s <= n[e].since)
      return n[e].narrow;
  return "";
}
function Uf() {
  var e, t, s, n = this.localeData().eras();
  for (e = 0, t = n.length; e < t; ++e)
    if (s = this.clone().startOf("day").valueOf(), n[e].since <= s && s <= n[e].until || n[e].until <= s && s <= n[e].since)
      return n[e].abbr;
  return "";
}
function Hf() {
  var e, t, s, n, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (s = r[e].since <= r[e].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), r[e].since <= n && n <= r[e].until || r[e].until <= n && n <= r[e].since)
      return (this.year() - g(r[e].since).year()) * s + r[e].offset;
  return this.year();
}
function Wf(e) {
  return T(this, "_erasNameRegex") || fn.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function Bf(e) {
  return T(this, "_erasAbbrRegex") || fn.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function zf(e) {
  return T(this, "_erasNarrowRegex") || fn.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function dn(e, t) {
  return t.erasAbbrRegex(e);
}
function jf(e, t) {
  return t.erasNameRegex(e);
}
function Vf(e, t) {
  return t.erasNarrowRegex(e);
}
function Gf(e, t) {
  return t._eraYearOrdinalRegex || $e;
}
function fn() {
  var e = [], t = [], s = [], n = [], r, i, a = this.eras();
  for (r = 0, i = a.length; r < i; ++r)
    t.push(Z(a[r].name)), e.push(Z(a[r].abbr)), s.push(Z(a[r].narrow)), n.push(Z(a[r].name)), n.push(Z(a[r].abbr)), n.push(Z(a[r].narrow));
  this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  );
}
_(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
_(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function us(e, t) {
  _(0, [e, e.length], 0, t);
}
us("gggg", "weekYear");
us("ggggg", "weekYear");
us("GGGG", "isoWeekYear");
us("GGGGG", "isoWeekYear");
B("weekYear", "gg");
B("isoWeekYear", "GG");
z("weekYear", 1);
z("isoWeekYear", 1);
w("G", rs);
w("g", rs);
w("GG", L, J);
w("gg", L, J);
w("GGGG", en, $s);
w("gggg", en, $s);
w("GGGGG", ns, ts);
w("ggggg", ns, ts);
vt(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, s, n) {
    t[n.substr(0, 2)] = k(e);
  }
);
vt(["gg", "GG"], function(e, t, s, n) {
  t[n] = g.parseTwoDigitYear(e);
});
function Xf(e) {
  return vi.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function qf(e) {
  return vi.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Zf() {
  return ge(this.year(), 1, 4);
}
function Jf() {
  return ge(this.isoWeekYear(), 1, 4);
}
function Qf() {
  var e = this.localeData()._week;
  return ge(this.year(), e.dow, e.doy);
}
function Kf() {
  var e = this.localeData()._week;
  return ge(this.weekYear(), e.dow, e.doy);
}
function vi(e, t, s, n, r) {
  var i;
  return e == null ? dt(this, n, r).year : (i = ge(e, n, r), t > i && (t = i), $f.call(this, e, t, s, n, r));
}
function $f(e, t, s, n, r) {
  var i = Qr(e, t, s, n, r), a = ct(i.year, 0, i.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
_("Q", 0, "Qo", "quarter");
B("quarter", "Q");
z("quarter", 7);
w("Q", Wr);
N("Q", function(e, t) {
  t[me] = (k(e) - 1) * 3;
});
function eh(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
_("D", ["DD", 2], "Do", "date");
B("date", "D");
z("date", 9);
w("D", L);
w("DD", L, J);
w("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
N(["D", "DD"], ae);
N("Do", function(e, t) {
  t[ae] = k(e.match(L)[0]);
});
var wi = Ke("Date", !0);
_("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
B("dayOfYear", "DDD");
z("dayOfYear", 4);
w("DDD", ss);
w("DDDD", Br);
N(["DDD", "DDDD"], function(e, t, s) {
  s._dayOfYear = k(e);
});
function th(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
_("m", ["mm", 2], 0, "minute");
B("minute", "m");
z("minute", 14);
w("m", L);
w("mm", L, J);
N(["m", "mm"], se);
var sh = Ke("Minutes", !1);
_("s", ["ss", 2], 0, "second");
B("second", "s");
z("second", 15);
w("s", L);
w("ss", L, J);
N(["s", "ss"], pe);
var nh = Ke("Seconds", !1);
_("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
_(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
_(0, ["SSS", 3], 0, "millisecond");
_(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
_(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
_(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
_(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
_(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
_(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
B("millisecond", "ms");
z("millisecond", 16);
w("S", ss, Wr);
w("SS", ss, J);
w("SSS", ss, Br);
var ke, _i;
for (ke = "SSSS"; ke.length <= 9; ke += "S")
  w(ke, $e);
function rh(e, t) {
  t[Ne] = k(("0." + e) * 1e3);
}
for (ke = "S"; ke.length <= 9; ke += "S")
  N(ke, rh);
_i = Ke("Milliseconds", !1);
_("z", 0, 0, "zoneAbbr");
_("zz", 0, 0, "zoneName");
function ih() {
  return this._isUTC ? "UTC" : "";
}
function ah() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var y = yt.prototype;
y.add = Qd;
y.calendar = rf;
y.clone = af;
y.diff = hf;
y.endOf = Mf;
y.format = gf;
y.from = vf;
y.fromNow = wf;
y.to = _f;
y.toNow = bf;
y.get = oc;
y.invalidAt = Nf;
y.isAfter = of;
y.isBefore = lf;
y.isBetween = uf;
y.isSame = cf;
y.isSameOrAfter = df;
y.isSameOrBefore = ff;
y.isValid = Pf;
y.lang = hi;
y.locale = fi;
y.localeData = mi;
y.max = xd;
y.min = Td;
y.parsingFlags = Cf;
y.set = lc;
y.startOf = Sf;
y.subtract = Kd;
y.toArray = Df;
y.toObject = Tf;
y.toDate = Of;
y.toISOString = pf;
y.inspect = yf;
typeof Symbol < "u" && Symbol.for != null && (y[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
y.toJSON = xf;
y.toString = mf;
y.unix = kf;
y.valueOf = Af;
y.creationData = Rf;
y.eraName = Yf;
y.eraNarrow = Ff;
y.eraAbbr = Uf;
y.eraYear = Hf;
y.year = Jr;
y.isLeapYear = Dc;
y.weekYear = Xf;
y.isoWeekYear = qf;
y.quarter = y.quarters = eh;
y.month = qr;
y.daysInMonth = Ac;
y.week = y.weeks = Rc;
y.isoWeek = y.isoWeeks = Ec;
y.weeksInYear = Qf;
y.weeksInWeekYear = Kf;
y.isoWeeksInYear = Zf;
y.isoWeeksInISOWeekYear = Jf;
y.date = wi;
y.day = y.days = Xc;
y.weekday = qc;
y.isoWeekday = Zc;
y.dayOfYear = th;
y.hour = y.hours = sd;
y.minute = y.minutes = sh;
y.second = y.seconds = nh;
y.millisecond = y.milliseconds = _i;
y.utcOffset = Fd;
y.utc = Hd;
y.local = Wd;
y.parseZone = Bd;
y.hasAlignedHourOffset = zd;
y.isDST = jd;
y.isLocal = Gd;
y.isUtcOffset = Xd;
y.isUtc = li;
y.isUTC = li;
y.zoneAbbr = ih;
y.zoneName = ah;
y.dates = ee(
  "dates accessor is deprecated. Use date instead.",
  wi
);
y.months = ee(
  "months accessor is deprecated. Use month instead",
  qr
);
y.years = ee(
  "years accessor is deprecated. Use year instead",
  Jr
);
y.zone = ee(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  Ud
);
y.isDSTShifted = ee(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  Vd
);
function oh(e) {
  return E(e * 1e3);
}
function lh() {
  return E.apply(null, arguments).parseZone();
}
function bi(e) {
  return e;
}
var x = Js.prototype;
x.calendar = Xu;
x.longDateFormat = Qu;
x.invalidDate = $u;
x.ordinal = sc;
x.preparse = bi;
x.postformat = bi;
x.relativeTime = rc;
x.pastFuture = ic;
x.set = Vu;
x.eras = Ef;
x.erasParse = Lf;
x.erasConvertYear = If;
x.erasAbbrRegex = Bf;
x.erasNameRegex = Wf;
x.erasNarrowRegex = zf;
x.months = _c;
x.monthsShort = bc;
x.monthsParse = Mc;
x.monthsRegex = Oc;
x.monthsShortRegex = kc;
x.week = xc;
x.firstDayOfYear = Nc;
x.firstDayOfWeek = Cc;
x.weekdays = Bc;
x.weekdaysMin = jc;
x.weekdaysShort = zc;
x.weekdaysParse = Gc;
x.weekdaysRegex = Jc;
x.weekdaysShortRegex = Qc;
x.weekdaysMinRegex = Kc;
x.isPM = ed;
x.meridiem = nd;
function Ht(e, t, s, n) {
  var r = be(), i = ce().set(n, t);
  return r[s](i, e);
}
function Si(e, t, s) {
  if (ve(e) && (t = e, e = void 0), e = e || "", t != null)
    return Ht(e, t, s, "month");
  var n, r = [];
  for (n = 0; n < 12; n++)
    r[n] = Ht(e, n, s, "month");
  return r;
}
function hn(e, t, s, n) {
  typeof e == "boolean" ? (ve(t) && (s = t, t = void 0), t = t || "") : (t = e, s = t, e = !1, ve(t) && (s = t, t = void 0), t = t || "");
  var r = be(), i = e ? r._week.dow : 0, a, o = [];
  if (s != null)
    return Ht(t, (s + i) % 7, n, "day");
  for (a = 0; a < 7; a++)
    o[a] = Ht(t, (a + i) % 7, n, "day");
  return o;
}
function uh(e, t) {
  return Si(e, t, "months");
}
function ch(e, t) {
  return Si(e, t, "monthsShort");
}
function dh(e, t, s) {
  return hn(e, t, s, "weekdays");
}
function fh(e, t, s) {
  return hn(e, t, s, "weekdaysShort");
}
function hh(e, t, s) {
  return hn(e, t, s, "weekdaysMin");
}
Te("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(e) {
    var t = e % 10, s = k(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + s;
  }
});
g.lang = ee(
  "moment.lang is deprecated. Use moment.locale instead.",
  Te
);
g.langData = ee(
  "moment.langData is deprecated. Use moment.localeData instead.",
  be
);
var fe = Math.abs;
function mh() {
  var e = this._data;
  return this._milliseconds = fe(this._milliseconds), this._days = fe(this._days), this._months = fe(this._months), e.milliseconds = fe(e.milliseconds), e.seconds = fe(e.seconds), e.minutes = fe(e.minutes), e.hours = fe(e.hours), e.months = fe(e.months), e.years = fe(e.years), this;
}
function Mi(e, t, s, n) {
  var r = ie(t, s);
  return e._milliseconds += n * r._milliseconds, e._days += n * r._days, e._months += n * r._months, e._bubble();
}
function ph(e, t) {
  return Mi(this, e, t, 1);
}
function yh(e, t) {
  return Mi(this, e, t, -1);
}
function Bn(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function gh() {
  var e = this._milliseconds, t = this._days, s = this._months, n = this._data, r, i, a, o, c;
  return e >= 0 && t >= 0 && s >= 0 || e <= 0 && t <= 0 && s <= 0 || (e += Bn(Es(s) + t) * 864e5, t = 0, s = 0), n.milliseconds = e % 1e3, r = K(e / 1e3), n.seconds = r % 60, i = K(r / 60), n.minutes = i % 60, a = K(i / 60), n.hours = a % 24, t += K(a / 24), c = K(Ai(t)), s += c, t -= Bn(Es(c)), o = K(s / 12), s %= 12, n.days = t, n.months = s, n.years = o, this;
}
function Ai(e) {
  return e * 4800 / 146097;
}
function Es(e) {
  return e * 146097 / 4800;
}
function vh(e) {
  if (!this.isValid())
    return NaN;
  var t, s, n = this._milliseconds;
  if (e = te(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + n / 864e5, s = this._months + Ai(t), e) {
      case "month":
        return s;
      case "quarter":
        return s / 3;
      case "year":
        return s / 12;
    }
  else
    switch (t = this._days + Math.round(Es(this._months)), e) {
      case "week":
        return t / 7 + n / 6048e5;
      case "day":
        return t + n / 864e5;
      case "hour":
        return t * 24 + n / 36e5;
      case "minute":
        return t * 1440 + n / 6e4;
      case "second":
        return t * 86400 + n / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + n;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function wh() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + k(this._months / 12) * 31536e6 : NaN;
}
function Se(e) {
  return function() {
    return this.as(e);
  };
}
var _h = Se("ms"), bh = Se("s"), Sh = Se("m"), Mh = Se("h"), Ah = Se("d"), kh = Se("w"), Oh = Se("M"), Dh = Se("Q"), Th = Se("y");
function xh() {
  return ie(this);
}
function Ph(e) {
  return e = te(e), this.isValid() ? this[e + "s"]() : NaN;
}
function Ue(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var Ch = Ue("milliseconds"), Nh = Ue("seconds"), Rh = Ue("minutes"), Eh = Ue("hours"), Lh = Ue("days"), Ih = Ue("months"), Yh = Ue("years");
function Fh() {
  return K(this.days() / 7);
}
var he = Math.round, Be = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function Uh(e, t, s, n, r) {
  return r.relativeTime(t || 1, !!s, e, n);
}
function Hh(e, t, s, n) {
  var r = ie(e).abs(), i = he(r.as("s")), a = he(r.as("m")), o = he(r.as("h")), c = he(r.as("d")), l = he(r.as("M")), p = he(r.as("w")), u = he(r.as("y")), f = i <= s.ss && ["s", i] || i < s.s && ["ss", i] || a <= 1 && ["m"] || a < s.m && ["mm", a] || o <= 1 && ["h"] || o < s.h && ["hh", o] || c <= 1 && ["d"] || c < s.d && ["dd", c];
  return s.w != null && (f = f || p <= 1 && ["w"] || p < s.w && ["ww", p]), f = f || l <= 1 && ["M"] || l < s.M && ["MM", l] || u <= 1 && ["y"] || ["yy", u], f[2] = t, f[3] = +e > 0, f[4] = n, Uh.apply(null, f);
}
function Wh(e) {
  return e === void 0 ? he : typeof e == "function" ? (he = e, !0) : !1;
}
function Bh(e, t) {
  return Be[e] === void 0 ? !1 : t === void 0 ? Be[e] : (Be[e] = t, e === "s" && (Be.ss = t - 1), !0);
}
function zh(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var s = !1, n = Be, r, i;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (s = e), typeof t == "object" && (n = Object.assign({}, Be, t), t.s != null && t.ss == null && (n.ss = t.s - 1)), r = this.localeData(), i = Hh(this, !s, n, r), s && (i = r.pastFuture(+this, i)), r.postformat(i);
}
var ws = Math.abs;
function He(e) {
  return (e > 0) - (e < 0) || +e;
}
function cs() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = ws(this._milliseconds) / 1e3, t = ws(this._days), s = ws(this._months), n, r, i, a, o = this.asSeconds(), c, l, p, u;
  return o ? (n = K(e / 60), r = K(n / 60), e %= 60, n %= 60, i = K(s / 12), s %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", c = o < 0 ? "-" : "", l = He(this._months) !== He(o) ? "-" : "", p = He(this._days) !== He(o) ? "-" : "", u = He(this._milliseconds) !== He(o) ? "-" : "", c + "P" + (i ? l + i + "Y" : "") + (s ? l + s + "M" : "") + (t ? p + t + "D" : "") + (r || n || e ? "T" : "") + (r ? u + r + "H" : "") + (n ? u + n + "M" : "") + (e ? u + a + "S" : "")) : "P0D";
}
var O = ls.prototype;
O.isValid = Ed;
O.abs = mh;
O.add = ph;
O.subtract = yh;
O.as = vh;
O.asMilliseconds = _h;
O.asSeconds = bh;
O.asMinutes = Sh;
O.asHours = Mh;
O.asDays = Ah;
O.asWeeks = kh;
O.asMonths = Oh;
O.asQuarters = Dh;
O.asYears = Th;
O.valueOf = wh;
O._bubble = gh;
O.clone = xh;
O.get = Ph;
O.milliseconds = Ch;
O.seconds = Nh;
O.minutes = Rh;
O.hours = Eh;
O.days = Lh;
O.weeks = Fh;
O.months = Ih;
O.years = Yh;
O.humanize = zh;
O.toISOString = cs;
O.toString = cs;
O.toJSON = cs;
O.locale = fi;
O.localeData = mi;
O.toIsoString = ee(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  cs
);
O.lang = hi;
_("X", 0, 0, "unix");
_("x", 0, 0, "valueOf");
w("x", rs);
w("X", cc);
N("X", function(e, t, s) {
  s._d = new Date(parseFloat(e) * 1e3);
});
N("x", function(e, t, s) {
  s._d = new Date(k(e));
});
//! moment.js
g.version = "2.29.4";
zu(E);
g.fn = y;
g.min = Pd;
g.max = Cd;
g.now = Nd;
g.utc = ce;
g.unix = oh;
g.months = uh;
g.isDate = pt;
g.locale = Te;
g.invalid = $t;
g.duration = ie;
g.isMoment = re;
g.weekdays = dh;
g.parseZone = lh;
g.localeData = be;
g.isDuration = Dt;
g.monthsShort = ch;
g.weekdaysMin = hh;
g.defineLocale = rn;
g.updateLocale = od;
g.locales = ld;
g.weekdaysShort = fh;
g.normalizeUnits = te;
g.relativeTimeRounding = Wh;
g.relativeTimeThreshold = Bh;
g.calendarFormat = nf;
g.prototype = y;
g.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
const jh = {
  name: "ndVideoplayback",
  props: {
    busCode: {
      type: String,
      default: "",
      required: !1
    },
    host: {
      type: String,
      default: "",
      required: !1
    },
    videoHost: {
      type: String,
      default: "",
      required: !1
    }
  },
  data() {
    return {
      getbusinessType: "",
      CNTTimeInfo: "暂无",
      // 视频组件的数据
      jessibucaData: {},
      // 通道号
      CNTnumInfo: "暂无",
      // 搜索，树，数据
      options: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 搜索数据
      filterText: [],
      // 时间选择器设置
      pickerOptions: {
        disabledDate(e) {
          return e.getTime() > Date.now();
        }
      },
      // 某天默认
      dayValue: g().format("YYYY-MM-DD"),
      // 几点到几点默认
      hourValue: [(/* @__PURE__ */ new Date()).setHours(0, 0, 0), (/* @__PURE__ */ new Date()).setHours(23, 59, 59)],
      // 是否播放
      playShow: !1,
      // 是否加载完毕load
      dataLoad: !0,
      // 是否要高亮
      highlight: !1,
      // 选中的通道信息
      selectNode: "",
      // 显示时间刻度
      timeScaleLoading: !1,
      // 传输时间数据
      timeScaleFTSDate: [],
      deviceChannel: "",
      thisUrl: "",
      timer: "",
      timerArr: [],
      passagewayOption: [],
      passagewayValue: ""
    };
  },
  components: { timeScale: ua, jessbuca: $n },
  methods: {
    // 搜索所有车辆的通道
    async getChannelsFun() {
      let e = {
        compcode: "-1",
        apikey: "174f9540-0d1e-4509-a96b-e692c64dae8d"
      };
      const t = await Rr(this.host, e);
      let s = [];
      t.data.forEach((n) => {
        n.busCode === this.busCode && s.push({
          label: "通道" + n.channelCode,
          value: n.busCode + "_" + n.channelCode,
          channelCode: n.channelCode
        });
      }), this.passagewayOption = s, s.forEach((n) => {
        n.channelCode === "1" && (this.passagewayValue = n.value);
      }), this.selectNode = this.passagewayValue, this.searchGetTime();
    },
    //切换频道
    changeChanel() {
      this.selectNode = this.passagewayValue;
    },
    // 保持心跳
    async keepHeart(e) {
      const t = {
        deviceChannel: e
      };
      await Fu(this.videoHost, t);
    },
    // search按钮
    async searchGetTime() {
      if (this.DestroyF(), !this.dayValue)
        this.$message({
          showClose: !0,
          message: "请选择日期"
        });
      else if (!this.selectNode)
        this.$message({
          showClose: !0,
          message: "请选择通道"
        });
      else if (!this.hourValue)
        this.$message({
          showClose: !0,
          message: "请选择时间段"
        });
      else {
        let e = [this.dayValue + " " + g(this.hourValue[0]).format("HH:mm:ss"), this.dayValue + " " + g(this.hourValue[1]).format("HH:mm:ss")], t = {
          alertFlag: 0,
          deviceChannel: this.selectNode,
          beginTime: e[0],
          endTime: e[1],
          streamType: 0,
          token: "string"
        };
        this.timeScaleLoading = !0;
        let s = await Lu(this.videoHost, t);
        s.data.length === 0 ? this.noneCode() : (this.timeScaleFTSDate = s.data, this.CNTnumInfo = this.selectNode);
      }
    },
    // 释放资源
    DestroyF() {
      this.deviceChannel && this.getCloseVideo(), this.$refs.jessibucaPlayerRef.destroyInstance(), this.timer && (clearInterval(this.timer), this.timer = null);
    },
    getCloseVideo() {
      const e = {
        deviceChannel: this.deviceChannel,
        controlType: 2,
        replayTimes: 0
      };
      Hu(this.videoHost, e), this.deviceChannel = "";
    },
    // 拿到时间数据
    async videoPlaySTFInfo(e) {
      this.DestroyF(), this.CNTTimeInfo = e.begintime + " 到 " + e.endtime;
      let t = {
        beginTime: e.begintime,
        dataType: 0,
        deviceChannel: e.deviceChannel,
        endTime: e.endtime,
        fileName: e.fileName,
        storageType: 0,
        streamType: 0
      };
      this.deviceChannel = e.deviceChannel;
      let s = await Yu(this.videoHost, t);
      !s.data[0] || !s.data[0].url ? this.signalInterruption() : (this.$refs.jessibucaPlayerRef.startPlay(s.data[0].url), this.timer = setInterval(() => {
        this.keepHeart(this.deviceChannel);
      }, 3e3));
    },
    noneCode() {
      this.timeScaleLoading = !1, this.$message({
        showClose: !0,
        message: "该设备无数据",
        type: "warning"
      });
    },
    signalInterruption() {
      this.$message({
        showClose: !0,
        message: "信号中断，请重新请求",
        type: "warning"
      });
    }
  },
  mounted() {
    console.log(this.dayValue), this.getChannelsFun();
  },
  unmounted() {
    this.timer && (clearInterval(this.timer), this.timer = null);
  },
  watch: {
    filterText(e) {
      this.$refs.tree.filter(e[e.length - 1]);
    },
    timeScaleFTSDate() {
      this.timeScaleFTSDate != [] && (this.timeScaleLoading = !1);
    }
  }
}, mn = (e) => (Wt("data-v-4b2bc476"), e = e(), Bt(), e), Vh = { class: "VideoPlayback" }, Gh = { class: "selectDate" }, Xh = { class: "timePicker" }, qh = { class: "vedioWrap" }, Zh = { class: "vedio" }, Jh = { class: "channelNumber" }, Qh = { class: "CNtop" }, Kh = { class: "controlWrap" }, $h = { class: "timeWrap" }, em = /* @__PURE__ */ mn(() => /* @__PURE__ */ b("div", { class: "CNTTimeText" }, "视频播放时间:", -1)), tm = { class: "CNTTime" }, sm = { class: "nameWrap" }, nm = /* @__PURE__ */ mn(() => /* @__PURE__ */ b("div", { class: "CNTname" }, "通道号:", -1)), rm = { class: "CNTnum" }, im = { class: "CNbottom" }, am = /* @__PURE__ */ mn(() => /* @__PURE__ */ b("div", { class: "progressBar" }, null, -1));
function om(e, t, s, n, r, i) {
  const a = q("el-date-picker"), o = q("el-time-picker"), c = q("el-option"), l = q("el-select"), p = q("el-button"), u = q("jessbuca"), f = q("timeScale"), v = Jn("loading");
  return C(), R("div", Vh, [
    b("div", Gh, [
      Q(a, {
        modelValue: r.dayValue,
        "onUpdate:modelValue": t[0] || (t[0] = (h) => r.dayValue = h),
        type: "date",
        placeholder: "选择日期",
        "picker-options": r.pickerOptions,
        "value-format": "YYYY-MM-DD"
      }, null, 8, ["modelValue", "picker-options"]),
      b("div", Xh, [
        Q(o, {
          "is-range": "",
          modelValue: r.hourValue,
          "onUpdate:modelValue": t[1] || (t[1] = (h) => r.hourValue = h),
          "range-separator": "至",
          "start-placeholder": "开始时间",
          "end-placeholder": "结束时间",
          placeholder: "选择时间范围",
          format: "HH:mm:ss"
        }, null, 8, ["modelValue"])
      ]),
      Q(l, {
        modelValue: r.passagewayValue,
        "onUpdate:modelValue": t[2] || (t[2] = (h) => r.passagewayValue = h),
        clearable: "",
        placeholder: "请选择通道",
        onChange: i.changeChanel
      }, {
        default: Pt(() => [
          (C(!0), R(Oe, null, De(r.passagewayOption, (h) => (C(), Qn(c, {
            key: h.value,
            label: h.label,
            value: h.value
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "onChange"]),
      Q(p, {
        type: "default",
        class: "btn",
        onClick: i.searchGetTime
      }, {
        default: Pt(() => [
          Kn("查询")
        ]),
        _: 1
      }, 8, ["onClick"])
    ]),
    b("div", qh, [
      b("div", Zh, [
        Q(u, { ref: "jessibucaPlayerRef" }, null, 512)
      ]),
      b("div", Jh, [
        b("div", Qh, [
          b("div", Kh, [
            b("div", {
              class: "destroyBtn",
              onClick: t[3] || (t[3] = (...h) => i.DestroyF && i.DestroyF(...h))
            })
          ]),
          b("div", $h, [
            b("div", {
              class: Ge(r.CNTTimeInfo === "暂无" ? "CNTTimePic" : "CNTTimePic CNTTimePicH")
            }, null, 2),
            em,
            b("div", tm, Xe(r.CNTTimeInfo), 1)
          ]),
          b("div", sm, [
            b("div", {
              class: Ge(r.CNTnumInfo === "暂无" ? "CNTnamePic" : "CNTnamePic CNTnamePicH")
            }, null, 2),
            nm,
            b("div", rm, Xe(r.CNTnumInfo), 1)
          ])
        ]),
        b("div", im, [
          Ct(Q(f, {
            onVideoPlaySTF: i.videoPlaySTFInfo,
            dateTime: r.timeScaleFTSDate
          }, null, 8, ["onVideoPlaySTF", "dateTime"]), [
            [v, r.timeScaleLoading]
          ])
        ]),
        am
      ])
    ])
  ]);
}
const lm = /* @__PURE__ */ Ye(jh, [["render", om], ["__scopeId", "data-v-4b2bc476"]]);
var ki = { exports: {} };
(function(e, t) {
  (function(s, n) {
    e.exports = n();
  })(ku, function() {
    function s(u) {
      var f = [];
      return u.AMapUI && f.push(n(u.AMapUI)), u.Loca && f.push(r(u.Loca)), Promise.all(f);
    }
    function n(u) {
      return new Promise(function(f, v) {
        var h = [];
        if (u.plugins)
          for (var m = 0; m < u.plugins.length; m += 1)
            a.AMapUI.plugins.indexOf(u.plugins[m]) == -1 && h.push(u.plugins[m]);
        if (o.AMapUI === i.failed)
          v("前次请求 AMapUI 失败");
        else if (o.AMapUI === i.notload) {
          o.AMapUI = i.loading, a.AMapUI.version = u.version || a.AMapUI.version, m = a.AMapUI.version;
          var S = document.body || document.head, M = document.createElement("script");
          M.type = "text/javascript", M.src = "https://webapi.amap.com/ui/" + m + "/main.js", M.onerror = function(P) {
            o.AMapUI = i.failed, v("请求 AMapUI 失败");
          }, M.onload = function() {
            if (o.AMapUI = i.loaded, h.length)
              window.AMapUI.loadUI(h, function() {
                for (var P = 0, X = h.length; P < X; P++) {
                  var xe = h[P].split("/").slice(-1)[0];
                  window.AMapUI[xe] = arguments[P];
                }
                for (f(); c.AMapUI.length; )
                  c.AMapUI.splice(0, 1)[0]();
              });
            else
              for (f(); c.AMapUI.length; )
                c.AMapUI.splice(0, 1)[0]();
          }, S.appendChild(M);
        } else
          o.AMapUI === i.loaded ? u.version && u.version !== a.AMapUI.version ? v("不允许多个版本 AMapUI 混用") : h.length ? window.AMapUI.loadUI(h, function() {
            for (var P = 0, X = h.length; P < X; P++) {
              var xe = h[P].split("/").slice(-1)[0];
              window.AMapUI[xe] = arguments[P];
            }
            f();
          }) : f() : u.version && u.version !== a.AMapUI.version ? v("不允许多个版本 AMapUI 混用") : c.AMapUI.push(function(P) {
            P ? v(P) : h.length ? window.AMapUI.loadUI(h, function() {
              for (var X = 0, xe = h.length; X < xe; X++) {
                var Ti = h[X].split("/").slice(-1)[0];
                window.AMapUI[Ti] = arguments[X];
              }
              f();
            }) : f();
          });
      });
    }
    function r(u) {
      return new Promise(function(f, v) {
        if (o.Loca === i.failed)
          v("前次请求 Loca 失败");
        else if (o.Loca === i.notload) {
          o.Loca = i.loading, a.Loca.version = u.version || a.Loca.version;
          var h = a.Loca.version, m = a.AMap.version.startsWith("2"), S = h.startsWith("2");
          if (m && !S || !m && S)
            v("JSAPI 与 Loca 版本不对应！！");
          else {
            m = a.key, S = document.body || document.head;
            var M = document.createElement("script");
            M.type = "text/javascript", M.src = "https://webapi.amap.com/loca?v=" + h + "&key=" + m, M.onerror = function(P) {
              o.Loca = i.failed, v("请求 AMapUI 失败");
            }, M.onload = function() {
              for (o.Loca = i.loaded, f(); c.Loca.length; )
                c.Loca.splice(0, 1)[0]();
            }, S.appendChild(M);
          }
        } else
          o.Loca === i.loaded ? u.version && u.version !== a.Loca.version ? v("不允许多个版本 Loca 混用") : f() : u.version && u.version !== a.Loca.version ? v("不允许多个版本 Loca 混用") : c.Loca.push(function(P) {
            P ? v(P) : v();
          });
      });
    }
    if (!window)
      throw Error("AMap JSAPI can only be used in Browser.");
    var i;
    (function(u) {
      u.notload = "notload", u.loading = "loading", u.loaded = "loaded", u.failed = "failed";
    })(i || (i = {}));
    var a = { key: "", AMap: { version: "1.4.15", plugins: [] }, AMapUI: { version: "1.1", plugins: [] }, Loca: { version: "1.3.2" } }, o = { AMap: i.notload, AMapUI: i.notload, Loca: i.notload }, c = { AMap: [], AMapUI: [], Loca: [] }, l = [], p = function(u) {
      typeof u == "function" && (o.AMap === i.loaded ? u(window.AMap) : l.push(u));
    };
    return { load: function(u) {
      return new Promise(function(f, v) {
        if (o.AMap == i.failed)
          v("");
        else if (o.AMap == i.notload) {
          var h = u.key, m = u.version, S = u.plugins;
          h ? (window.AMap && location.host !== "lbs.amap.com" && v("禁止多种API加载方式混用"), a.key = h, a.AMap.version = m || a.AMap.version, a.AMap.plugins = S || a.AMap.plugins, o.AMap = i.loading, m = document.body || document.head, window.___onAPILoaded = function(P) {
            if (delete window.___onAPILoaded, P)
              o.AMap = i.failed, v(P);
            else
              for (o.AMap = i.loaded, s(u).then(function() {
                f(window.AMap);
              }).catch(v); l.length; )
                l.splice(0, 1)[0]();
          }, S = document.createElement("script"), S.type = "text/javascript", S.src = "https://webapi.amap.com/maps?callback=___onAPILoaded&v=" + a.AMap.version + "&key=" + h + "&plugin=" + a.AMap.plugins.join(","), S.onerror = function(P) {
            o.AMap = i.failed, v(P);
          }, m.appendChild(S)) : v("请填写key");
        } else if (o.AMap == i.loaded)
          if (u.key && u.key !== a.key)
            v("多个不一致的 key");
          else if (u.version && u.version !== a.AMap.version)
            v("不允许多个版本 JSAPI 混用");
          else {
            if (h = [], u.plugins)
              for (m = 0; m < u.plugins.length; m += 1)
                a.AMap.plugins.indexOf(u.plugins[m]) == -1 && h.push(u.plugins[m]);
            h.length ? window.AMap.plugin(h, function() {
              s(u).then(function() {
                f(window.AMap);
              }).catch(v);
            }) : s(u).then(function() {
              f(window.AMap);
            }).catch(v);
          }
        else if (u.key && u.key !== a.key)
          v("多个不一致的 key");
        else if (u.version && u.version !== a.AMap.version)
          v("不允许多个版本 JSAPI 混用");
        else {
          var M = [];
          if (u.plugins)
            for (m = 0; m < u.plugins.length; m += 1)
              a.AMap.plugins.indexOf(u.plugins[m]) == -1 && M.push(u.plugins[m]);
          p(function() {
            M.length ? window.AMap.plugin(M, function() {
              s(u).then(function() {
                f(window.AMap);
              }).catch(v);
            }) : s(u).then(function() {
              f(window.AMap);
            }).catch(v);
          });
        }
      });
    }, reset: function() {
      delete window.AMap, delete window.AMapUI, delete window.Loca, a = { key: "", AMap: { version: "1.4.15", plugins: [] }, AMapUI: { version: "1.1", plugins: [] }, Loca: { version: "1.3.2" } }, o = {
        AMap: i.notload,
        AMapUI: i.notload,
        Loca: i.notload
      }, c = { AMap: [], AMapUI: [], Loca: [] };
    } };
  });
})(ki);
var um = ki.exports;
const zn = /* @__PURE__ */ Ou(um), j = Math.PI, jn = 6378245, Vn = 0.006693421622965943;
function Gn(e, t) {
  if (fm(e, t))
    return [e, t];
  {
    let s = cm(e - 105, t - 35), n = dm(e - 105, t - 35);
    const r = t / 180 * j;
    let i = Math.sin(r);
    i = 1 - Vn * i * i;
    const a = Math.sqrt(i);
    s = s * 180 / (jn * (1 - Vn) / (i * a) * j), n = n * 180 / (jn / a * Math.cos(r) * j);
    const o = t + s;
    return [e + n, o];
  }
}
function cm(e, t) {
  let s = -100 + 2 * e + 3 * t + 0.2 * t * t + 0.1 * e * t + 0.2 * Math.sqrt(Math.abs(e));
  return s += (20 * Math.sin(6 * e * j) + 20 * Math.sin(2 * e * j)) * 2 / 3, s += (20 * Math.sin(t * j) + 40 * Math.sin(t / 3 * j)) * 2 / 3, s += (160 * Math.sin(t / 12 * j) + 320 * Math.sin(t * j / 30)) * 2 / 3, s;
}
function dm(e, t) {
  let s = 300 + e + 2 * t + 0.1 * e * e + 0.1 * e * t + 0.1 * Math.sqrt(Math.abs(e));
  return s += (20 * Math.sin(6 * e * j) + 20 * Math.sin(2 * e * j)) * 2 / 3, s += (20 * Math.sin(e * j) + 40 * Math.sin(e / 3 * j)) * 2 / 3, s += (150 * Math.sin(e / 12 * j) + 300 * Math.sin(e / 30 * j)) * 2 / 3, s;
}
function fm(e, t) {
  return e < 72.004 || e > 137.8347 || t < 0.8293 || t > 55.8271 || !1;
}
const hm = "data:image/png;base64,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";
const mm = {
  name: "nd-trackplayback",
  props: {
    busBrandNo: {
      type: String,
      default: "",
      required: !1
    },
    mapKey: {
      type: String,
      default: "50c448163721f3b94063f6ef9c7cfe8d",
      required: !1
    },
    mapCenter: {
      type: Array,
      default: () => [120.6292977875177, 30.666684352586508],
      required: !1
    },
    baseHost: {
      type: String,
      default: "",
      required: !1
    },
    locationHost: {
      type: String,
      default: "",
      required: !1
    }
  },
  data() {
    return {
      // 组件声明
      map: null,
      AMap: null,
      marker: null,
      polyline: null,
      passedPolyline: null,
      // 日期选择器
      datePickerValue: "",
      // 车辆选择器
      selectValue: "",
      // 过滤速度0开关
      filterSpeedChecked: !0,
      // 数据车辆选择器
      selectOptions: [],
      // 现在的时间
      today: "",
      // 一个小时之前
      subtractToday: "",
      // 轨迹回放路线
      lineArr: [],
      percentageNum: 0,
      speedText: "1X",
      speedIndex: 0,
      speedTextArr: ["1X", "2X", "4X", "8X", "16X", "32X", "64X"],
      speedArr: [200, 100, 50, 25, 12, 6, 3],
      speed: 200,
      // 拖动过来的路线
      dragRoute: [],
      // 加载中
      mapLoading: !1
    };
  },
  mounted() {
    this.getTodayTime(), this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    // 整个地图，以及其中的各种功能
    async initMap() {
      zn.reset(), this.AMap = await zn.load({
        key: this.mapKey,
        // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",
        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.MoveAnimation"]
        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }), this.map = await new this.AMap.Map("container", {
        //设置地图容器id
        viewMode: "2D",
        //是否为3D地图模式
        zoom: 10,
        //初始化地图级别
        center: this.mapCenter,
        //初始化地图中心点位置
        mapStyle: "amap://styles/darkblue",
        resizeEnable: !0
      }), this.getBus();
    },
    // 拿到今天的时间
    getTodayTime() {
      this.today = g().format("YYYY-MM-DD HH:mm:ss"), this.subtractToday = g().subtract(1, "hours").format("YYYY-MM-DD HH:mm:ss"), this.datePickerValue = [this.subtractToday, this.today];
    },
    // 城市轨迹接口
    async getHistoryLocationsFn(e) {
      let t = {
        compcode: -1,
        buscode: e.buscode,
        starttime: this.datePickerValue[0],
        endtime: this.datePickerValue[1],
        apikey: "174f9540-0d1e-4509-a96b-e692c64dae8d"
      };
      const s = await Bu(this.locationHost, t);
      this.processingData(s);
    },
    // 非空判断，0速过滤，纠偏
    processingData(e) {
      if (e.data.length !== 0) {
        this.clearFun(), this.lineArr = [], this.mapLoading = !1, this.percentageNum = 0, this.dragRoute = [];
        let t = [];
        this.filterSpeedChecked ? (e.data.forEach((s) => {
          s.speed !== 0 && t.push(s);
        }), t.forEach((s) => {
          this.lineArr.push(Gn(s.lng, s.lat));
        }), this.trackPlayback()) : (t = e.data, t.forEach((s) => {
          this.lineArr.push(Gn(s.lng, s.lat));
        }), this.trackPlayback());
      } else
        this.noData();
    },
    // 轨迹回放
    trackPlayback() {
      const e = new this.AMap.Icon({
        size: [24, 48],
        imageSize: [24, 48],
        image: hm,
        imageOffset: [0, 0]
      });
      this.marker = new this.AMap.Marker({
        map: this.map,
        position: this.lineArr[0],
        icon: e,
        offset: new this.AMap.Pixel(-12, -24)
      }), this.map.setCenter(this.lineArr[0]), this.polyline = new this.AMap.Polyline({
        map: this.map,
        path: this.lineArr,
        showDir: !0,
        strokeColor: "#28F",
        //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6
        //线宽
        // strokeStyle: "solid"  //线样式
      }), this.passedPolyline = new this.AMap.Polyline({
        map: this.map,
        strokeColor: "#AF5",
        //线颜色
        strokeWeight: 6
        //线宽
      }), this.map.setFitView(), this.marker.on("moving", (t) => {
        this.passedPolyline.setPath(this.dragRoute.concat(t.passedPath));
        let s = [t.target.getPosition().KL, t.target.getPosition().kT] + "", n = 0;
        this.lineArr.forEach((r, i) => {
          r + "" === s && (n = i);
        }), n !== 0 && (this.percentageNum = Math.round(n / this.lineArr.length * 100));
      }), this.startAnimation(this.lineArr, this.speed), this.marker.pauseMove(), setTimeout(() => {
        this.resumeAnimation();
      }, 1e3);
    },
    // 拿到所有的数据，并处理
    async getBus() {
      let e = {
        compcode: "-1",
        apikey: "174f9540-0d1e-4509-a96b-e692c64dae8d"
      }, t = await Wu(this.baseHost, e);
      t = t.data;
      let s = [];
      t.forEach((n) => {
        s.push({
          comptype: "城市",
          buscode: n.busCode,
          busBrandNo: n.busBrandNo
        });
      }), this.selectOptions = s, this.getDefaultCar();
    },
    // 轨迹从头开始
    startAnimation(e, t) {
      this.marker.moveAlong(e, {
        // 每一段的时长
        duration: t,
        //可根据实际采集时间间隔设置
        // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
        autoRotation: !0
      });
    },
    // 重新开始,继续
    resumeAnimation() {
      this.marker && this.marker.resumeMove();
    },
    // 暂停
    pauseAnimation() {
      this.marker && this.marker.pauseMove();
    },
    // 查询
    searchFun() {
      this.mapLoading = !0, this.selectValue === "" ? this.selectCar() : this.selectValue.comptype === "城市" && this.getHistoryLocationsFn(this.selectValue);
    },
    // 重置
    resetFun() {
      this.percentageNum = 0, this.dragRoute = [], this.clearFun(), this.trackPlayback();
    },
    // 清空
    clearFun() {
      this.marker && this.map && (this.marker.stopMove(), this.marker.clearEvents(), this.map.clearMap());
    },
    // 减速
    reduceSpeedFun() {
      if (this.speedIndex > 0) {
        this.speedIndex--, this.speedText = this.speedTextArr[this.speedIndex];
        let e = Math.round((this.lineArr.length - 1) * (this.percentageNum / 100)), t = [];
        this.dragRoute = [], this.lineArr.forEach((s, n) => {
          n >= e ? t.push(s) : this.dragRoute.push(s);
        }), this.speed = this.speedArr[this.speedIndex], this.startAnimation(t, this.speed);
      }
    },
    // 加速
    plusSpeedFun() {
      if (this.speedIndex < 6) {
        this.speedIndex++, this.speedText = this.speedTextArr[this.speedIndex];
        let e = Math.round((this.lineArr.length - 1) * (this.percentageNum / 100)), t = [];
        this.dragRoute = [], this.lineArr.forEach((s, n) => {
          n >= e ? t.push(s) : this.dragRoute.push(s);
        }), this.speed = this.speedArr[this.speedIndex], this.startAnimation(t, this.speed);
      }
    },
    // 拖动进度条
    percentageNumFun(e) {
      let t = Math.round((this.lineArr.length - 1) * (e / 100)), s = [];
      this.dragRoute = [], this.lineArr.forEach((n, r) => {
        r >= t ? s.push(n) : this.dragRoute.push(n);
      }), this.startAnimation(s, this.speed);
    },
    formatTooltip(e) {
      return e + "%";
    },
    noData() {
      this.$message({
        showClose: !0,
        message: this.selectValue.busBrandNo + "在该时间段没有数据",
        type: "warning",
        center: !0
      }), this.mapLoading = !1;
    },
    selectCar() {
      this.$message({
        showClose: !0,
        message: "请选择车辆",
        type: "warning",
        center: !0
      }), this.mapLoading = !1;
    },
    getDefaultCar() {
      this.selectOptions.forEach((e) => {
        e.busBrandNo === this.busBrandNo && (this.selectValue = e, this.searchFun());
      });
    }
  }
}, Oi = (e) => (Wt("data-v-194fceed"), e = e(), Bt(), e), pm = { class: "home" }, ym = { class: "title" }, gm = { class: "timeBox" }, vm = /* @__PURE__ */ Oi(() => /* @__PURE__ */ b("div", { class: "carText" }, "车辆：", -1)), wm = { class: "carInput" }, _m = /* @__PURE__ */ Oi(() => /* @__PURE__ */ b("div", { class: "filterSpeedText" }, "过滤速度0：", -1)), bm = { class: "filterSpeedBtn" }, Sm = { class: "btnBox" }, Mm = { class: "map" }, Am = { id: "container" }, km = { class: "inputCard" }, Om = { class: "btnTop" }, Dm = { class: "btnBottom" };
function Tm(e, t, s, n, r, i) {
  const a = q("el-date-picker"), o = q("el-option"), c = q("el-select"), l = q("el-checkbox"), p = q("el-slider"), u = Jn("loading");
  return C(), R("div", pm, [
    b("div", ym, [
      Q(a, {
        modelValue: r.datePickerValue,
        "onUpdate:modelValue": t[0] || (t[0] = (f) => r.datePickerValue = f),
        type: "datetimerange",
        "range-separator": "至",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        editable: "",
        "value-format": "YYYY-MM-DD HH:mm:ss"
      }, null, 8, ["modelValue"]),
      b("div", gm, [
        vm,
        b("div", wm, [
          Q(c, {
            modelValue: r.selectValue,
            "onUpdate:modelValue": t[1] || (t[1] = (f) => r.selectValue = f),
            filterable: "",
            placeholder: "请选择车辆",
            "value-key": "busBrandNo"
          }, {
            default: Pt(() => [
              (C(!0), R(Oe, null, De(r.selectOptions, (f, v) => (C(), Qn(o, {
                key: v,
                label: f.busBrandNo,
                value: f
              }, null, 8, ["label", "value"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _m,
        b("div", bm, [
          Q(l, {
            modelValue: r.filterSpeedChecked,
            "onUpdate:modelValue": t[2] || (t[2] = (f) => r.filterSpeedChecked = f)
          }, null, 8, ["modelValue"])
        ])
      ]),
      b("div", Sm, [
        Ct((C(), R("div", {
          class: "searchBtn",
          onClick: t[3] || (t[3] = (...f) => i.searchFun && i.searchFun(...f))
        }, [
          Kn("查询")
        ])), [
          [u, r.mapLoading]
        ]),
        b("div", {
          class: "resetBtn",
          onClick: t[4] || (t[4] = (...f) => i.resetFun && i.resetFun(...f))
        }, "重置")
      ])
    ]),
    b("div", Mm, [
      Ct(b("div", Am, null, 512), [
        [u, r.mapLoading]
      ]),
      b("div", km, [
        b("div", Om, [
          b("div", null, Xe(r.speedText), 1),
          b("div", {
            onClick: t[5] || (t[5] = (...f) => i.reduceSpeedFun && i.reduceSpeedFun(...f))
          }),
          b("div", {
            onClick: t[6] || (t[6] = (...f) => i.plusSpeedFun && i.plusSpeedFun(...f))
          }),
          b("div", {
            onClick: t[7] || (t[7] = (...f) => i.resumeAnimation && i.resumeAnimation(...f))
          }),
          b("div", {
            onClick: t[8] || (t[8] = (...f) => i.pauseAnimation && i.pauseAnimation(...f))
          })
        ]),
        b("div", Dm, [
          Q(p, {
            modelValue: r.percentageNum,
            "onUpdate:modelValue": t[9] || (t[9] = (f) => r.percentageNum = f),
            "format-tooltip": i.formatTooltip,
            onChange: i.percentageNumFun
          }, null, 8, ["modelValue", "format-tooltip", "onChange"])
        ])
      ])
    ])
  ]);
}
const xm = /* @__PURE__ */ Ye(mm, [["render", Tm], ["__scopeId", "data-v-194fceed"]]);
const Pm = {
  name: "ndVideoplay",
  components: { jessibucaPlayer: $n },
  props: {
    busCode: {
      type: String,
      default: "",
      required: !1
    },
    host: {
      type: String,
      default: "",
      required: !1
    },
    videHost: {
      type: String,
      default: "",
      required: !1
    }
  },
  data() {
    return {
      // 视频
      videoArr: [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
        { num: 10 },
        { num: 11 },
        { num: 12 },
        { num: 13 },
        { num: 14 },
        { num: 15 },
        { num: 16 }
      ],
      videoBoxClass: "four",
      videoBoxClassArr: ["one", "four", "six", "nine", "twelve"],
      // 屏幕数量的index
      changeNumIndex: 1,
      // 心跳计时器的数组
      heartTimerArr: [],
      // 正在操作的屏幕的index
      videoIndex: 0,
      // 目前屏幕的数量
      videoNumber: 9,
      deviceChannel: "",
      videoWrapIsAuto: !1
    };
  },
  mounted() {
    this.getChannelsFun();
  },
  methods: {
    async getChannelsFun() {
      let e = {
        compcode: "-1",
        apikey: "174f9540-0d1e-4509-a96b-e692c64dae8d"
      };
      const t = await Rr(this.host, e);
      let s = [];
      t.data.forEach((r) => {
        r.busCode === this.busCode && s.push(r.busCode + "_" + r.channelCode);
      }), this.ChannelSettingsScreen(s.length);
      let n = s.join(",");
      this.deviceChannel = n, this.getUrl(this.videoIndex), this.getHeart();
    },
    // 根据通道数量设置屏幕数量
    ChannelSettingsScreen(e) {
      let t = 0;
      e === 0 ? (this.errorInfo("该车辆没有通道"), this.videoWrapIsAuto = !1) : e === 1 ? (t = 0, this.videoWrapIsAuto = !1) : e > 1 && e <= 4 ? (t = 1, this.videoWrapIsAuto = !1) : e > 4 && e <= 6 ? (t = 2, this.videoWrapIsAuto = !1) : e > 6 && e <= 9 ? (t = 3, this.videoWrapIsAuto = !1) : e > 9 && e <= 12 ? (t = 4, this.videoWrapIsAuto = !1) : e > 12 && e <= 16 && (t = 4, this.videoWrapIsAuto = !0), this.videoBoxClass = this.videoBoxClassArr[t];
    },
    // 请求url，开始播放
    async getUrl() {
      let e = {
        deviceChannel: this.deviceChannel,
        dateType: 0,
        streamType: 0
      };
      const t = await Iu(this.videHost, e);
      t.data.forEach((s, n) => {
        t.data[n].state === 0 ? (console.log("state === 0,可以播放"), this.videoIndex === this.videoNumber && (this.videoIndex = 0), this.$refs[`jessibucaPlayerRef${this.videoIndex}`][0].startPlay(s.url), this.videoIndex++) : console.log("state === 1,不可以播放");
      });
    },
    // 请求心跳
    getHeart() {
      this.deviceChannel.split(",").forEach((e) => {
        let t = {
          deviceChannel: e,
          token: ""
        };
        this.heartTimerArr.push(setInterval(() => {
          Uu(this.videHost, t);
        }, 5e3));
      });
    },
    errorInfo(e) {
      this.$message.error(e);
    }
  },
  unmounted() {
    this.heartTimerArr && this.heartTimerArr.length > 0 && (this.heartTimerArr.forEach((e) => {
      clearInterval(e);
    }), this.heartTimerArr = []);
  }
}, Cm = { class: "videoHome" };
function Nm(e, t, s, n, r, i) {
  const a = q("jessibucaPlayer");
  return C(), R("div", Cm, [
    b("div", {
      class: Ge(["videoWrap", r.videoWrapIsAuto ? "videoWrapAuto" : ""])
    }, [
      (C(!0), R(Oe, null, De(r.videoArr, (o, c) => (C(), R("div", {
        class: Ge(["videoBox", r.videoBoxClass]),
        key: c
      }, [
        Q(a, {
          ref_for: !0,
          ref: `jessibucaPlayerRef${c}`
        }, null, 512)
      ], 2))), 128))
    ], 2)
  ]);
}
const Rm = /* @__PURE__ */ Ye(Pm, [["render", Nm], ["__scopeId", "data-v-a240bbfa"]]), Di = [Gi, Qi, lm, xm, Rm], Em = (e) => {
  Di.forEach((t) => {
    e.component(t.name, t);
  });
}, Im = {
  install: Em,
  ...Di
};
export {
  Im as default
};
