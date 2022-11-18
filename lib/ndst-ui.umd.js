(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ndst-ui"] = factory();
	else
		root["ndst-ui"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/button/index.vue?vue&type=template&id=667575f6&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('button', {
    staticClass: "myBtn"
  }, [_vm._v("1232")]);
};

var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/button/index.vue?vue&type=script&lang=ts&

/* harmony default export */ var buttonvue_type_script_lang_ts_ = ({ name: "ndButton" });

;// CONCATENATED MODULE: ./src/package/button/index.vue?vue&type=script&lang=ts&
 /* harmony default export */ var package_buttonvue_type_script_lang_ts_ = (buttonvue_type_script_lang_ts_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-74.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-74.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-74.use[2]!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-74.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/button/index.vue?vue&type=style&index=0&id=667575f6&prod&lang=less&scoped=true&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/package/button/index.vue?vue&type=style&index=0&id=667575f6&prod&lang=less&scoped=true&

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/package/button/index.vue



;


/* normalize component */

var component = normalizeComponent(
  package_buttonvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  "667575f6",
  null
  
)

/* harmony default export */ var package_button = (component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/verificationCode/index.vue?vue&type=template&id=bfa3fd38&scoped=true&
var verificationCodevue_type_template_id_bfa3fd38_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "verify-container",
    style: {
      width: `${_vm.width}px`
    }
  }, [_c('div', {
    staticClass: "refresh",
    on: {
      "click": _vm.reset
    }
  }, [_c('svg', {
    staticClass: "icon",
    attrs: {
      "t": "1637315258145",
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "p-id": "2420",
      "width": "20",
      "height": "20"
    }
  }, [_c('path', {
    attrs: {
      "d": "M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z",
      "p-id": "2421",
      "fill": "#8a8a8a"
    }
  })])]), _c('div', {
    staticClass: "pic"
  }, [_c('canvas', {
    ref: "canvas_img",
    staticClass: "canvas_img",
    attrs: {
      "width": _vm.width,
      "height": _vm.height
    }
  }), _c('canvas', {
    ref: "canvas_block",
    staticClass: "canvas_block",
    style: {
      left: _vm.blockLeft + 'px'
    },
    attrs: {
      "width": _vm.width,
      "height": _vm.height
    }
  })]), _c('div', {
    staticClass: "slider",
    style: {
      height: _vm.blockW + 'px'
    }
  }, [_vm.showText ? _c('div', {
    staticClass: "tip"
  }, [_vm._v("向右滑动完成验证")]) : _vm._e(), _c('div', {
    class: ['bar', _vm.slideState],
    style: {
      width: _vm.sliderLeft + 'px'
    }
  }), _c('div', {
    class: ['slider-icon', _vm.slideState],
    style: {
      left: _vm.sliderLeft + 'px'
    },
    on: {
      "touchstart": _vm.touchStart,
      "touchmove": _vm.touchMove,
      "touchend": _vm.touchEnd
    }
  }, [_vm._v(" " + _vm._s({
    active: '>',
    fail: 'x',
    success: '√'
  }[_vm.slideState] || '>') + " ")])])]);
};

var verificationCodevue_type_template_id_bfa3fd38_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/verificationCode/index.vue?vue&type=script&lang=js&
/* harmony default export */ var verificationCodevue_type_script_lang_js_ = ({
  name: 'ndVerifycode',
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
      default: () => ['./verifyImg1.png', './verifyImg2.png', './verifyImg3.png']
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
      slideState: '',
      // success fail active
      timeIns: null,
      showText: true,
      // 是否显示滑动提示
      isMouseDown: false
    };
  },

  mounted() {
    this.init(); // 如果是pc端则用mouse事件
    // this.mouseEvent()
  },

  beforeDestroy() {
    clearTimeout(this.timeIns);
  },

  methods: {
    init() {
      this.ctxImg = this.$refs['canvas_img'].getContext('2d');
      this.ctxBlock = this.$refs['canvas_block'].getContext('2d');
      this.getImg();
    },

    getImg() {
      const img = document.createElement('img');
      const imagesLen = this.images.length;
      const randomIndex = Math.floor(Math.random() * imagesLen);
      img.crossOrigin = "Anonymous";
      img.src = this.images[randomIndex];
      this.bgImg = img;

      img.onload = () => {
        this.ctxImg.drawImage(this.bgImg, 0, 0, this.width, this.height);
        this.getBlockPostion();
        this.ctxBlock.drawImage(this.bgImg, 0, 0, this.width, this.height);

        const _yPos = this.blockRect.y - 2 * this.blockRect.r;

        const imageData = this.ctxBlock.getImageData(this.blockRect.x, _yPos, this.blockRect.w, this.blockRect.w + 1);
        this.$refs['canvas_block'].width = this.blockRect.w;
        this.ctxBlock.putImageData(imageData, 0, _yPos);
      };
    },

    getBlockPostion() {
      const xPos = Math.floor(this.width / 2 + Math.random() * (this.width / 2 - this.blockRect.w));
      const yPos = Math.floor(30 + Math.random() * (this.height - this.blockRect.w - 30));
      this.blockRect.x = xPos;
      this.blockRect.y = yPos;
      this.draw(this.ctxImg, 'fill');
      this.draw(this.ctxBlock, 'clip');
    },

    draw(ctx, operation) {
      const {
        r,
        x,
        y
      } = this.blockRect;
      const _w = this.blockW;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x + _w / 2, y - r + 2, r, 0.72 * Math.PI, 2.26 * Math.PI);
      ctx.lineTo(x + _w, y);
      ctx.arc(x + _w + r - 2, y + _w / 2, r, 1.21 * Math.PI, 2.78 * Math.PI);
      ctx.lineTo(x + _w, y + _w);
      ctx.lineTo(x, y + _w);
      ctx.arc(x + r - 2, y + _w / 2, r + 0.4, 2.76 * Math.PI, 1.24 * Math.PI, true);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(225, 225, 225, 0.8)';
      ctx.strokeStyle = 'rgba(225, 225, 225, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx[operation]();
    },

    // mobile
    touchStart(e) {
      this.startX = e.changedTouches[0].pageX;
      this.showText = false;
    },

    touchMove(e) {
      this.endX = e.changedTouches[0].pageX - this.startX; // 禁止超出边界

      if (this.endX < 0 || this.endX > this.width - this.blockW) {
        return;
      } // 拖动的距离


      this.sliderLeft = this.endX;
      this.blockLeft = this.sliderLeft / (this.width - this.blockW) * (this.width - this.blockRect.w);
      this.slideState = 'active';
    },

    touchEnd() {
      const isPass = this.verify();

      if (isPass) {
        this.slideState = 'success';
        this.$emit('verifySuccess');
      } else {
        this.slideState = 'fail'; // 如果失败则1000毫秒后重置

        this.timeIns = setTimeout(() => {
          this.reset();
        }, 1000);
      }
    },

    // 判断精度
    verify() {
      return Math.abs(this.blockLeft - this.blockRect.x) <= this.accuracy;
    },

    // 重置
    reset() {
      this.showText = true;
      this.slideState = '';
      this.sliderLeft = 0;
      this.blockLeft = 0;
      this.$refs['canvas_block'].width = this.width;
      this.ctxImg.clearRect(0, 0, this.width, this.height);
      this.ctxBlock.clearRect(0, 0, this.width, this.height);
      this.getImg();
    }

  }
});
;// CONCATENATED MODULE: ./src/package/verificationCode/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var package_verificationCodevue_type_script_lang_js_ = (verificationCodevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-74.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-74.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-74.use[2]!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-74.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/verificationCode/index.vue?vue&type=style&index=0&id=bfa3fd38&prod&lang=less&scoped=true&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/package/verificationCode/index.vue?vue&type=style&index=0&id=bfa3fd38&prod&lang=less&scoped=true&

;// CONCATENATED MODULE: ./src/package/verificationCode/index.vue



;


/* normalize component */

var verificationCode_component = normalizeComponent(
  package_verificationCodevue_type_script_lang_js_,
  verificationCodevue_type_template_id_bfa3fd38_scoped_true_render,
  verificationCodevue_type_template_id_bfa3fd38_scoped_true_staticRenderFns,
  false,
  null,
  "bfa3fd38",
  null
  
)

/* harmony default export */ var verificationCode = (verificationCode_component.exports);
;// CONCATENATED MODULE: ./src/package/index.js
// 引用组件

 //组件都写在这个数组中方便管理

const componentList = [package_button, verificationCode]; // 批量注册

const install = Vue => {
  componentList.forEach(com => {
    Vue.component(com.name, com);
  });
}; // 暴露出去


/* harmony default export */ var src_package = (install);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_package);


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=ndst-ui.umd.js.map