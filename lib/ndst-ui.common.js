/******/ (function() { // webpackBootstrap
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

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/button/index.vue?vue&type=template&id=667575f6&scoped=true&
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
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-32.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-32.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-32.use[2]!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-32.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/button/index.vue?vue&type=style&index=0&id=667575f6&prod&lang=less&scoped=true&
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
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/Jessibuca/index.vue?vue&type=template&id=f475ec14&scoped=true&
var Jessibucavue_type_template_id_f475ec14_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "video"
  }, [_vm.hasTitle ? _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _c('div', {
    ref: "container"
  })]);
};

var Jessibucavue_type_template_id_f475ec14_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/Jessibuca/index.vue?vue&type=script&lang=js&
/* harmony default export */ var Jessibucavue_type_script_lang_js_ = ({
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
      loaded: false,
      // mute
      showOperateBtns: true,
      showBandwidth: true,
      // 显示网速
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
      scale: 0
    };
  },

  destroyed() {
    this.destroy();
  },

  methods: {
    create(options) {
      options = options || {};
      this.jessibuca = new window.Jessibuca(Object.assign({
        container: this.$refs.container,
        videoBuffer: 0.2,
        // 缓存时长
        isResize: false,
        useWCS: this.useWCS,
        useMSE: this.useMSE,
        text: "",
        loadingText: "疯狂加载中...",
        debug: true,
        supportDblclickFullscreen: true,
        showBandwidth: this.showBandwidth,
        // 显示网速
        operateBtns: {
          fullscreen: true,
          screenshot: this.showOperateBtns,
          play: this.showOperateBtns,
          audio: this.showOperateBtns
        },
        forceNoOffscreen: !this.useOffscreen,
        isNotMute: true,
        timeout: 10
      }, options));
      this.jessibuca.play(this.url + '.flv');

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
    }

  },
  computed: {
    deviceChannel() {
      let deviceChannel = '';

      if (this.deviceCode && this.channelCode) {
        deviceChannel = this.deviceCode + '_' + this.channelCode;
      } else {
        deviceChannel = '';
      }

      return deviceChannel;
    }

  },
  watch: {
    url: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.create();
          });
        }
      },

      deep: true,
      immediate: true
    }
  }
});
;// CONCATENATED MODULE: ./src/package/Jessibuca/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var package_Jessibucavue_type_script_lang_js_ = (Jessibucavue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-32.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-32.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-32.use[2]!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-32.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/Jessibuca/index.vue?vue&type=style&index=0&id=f475ec14&prod&lang=less&scoped=true&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/package/Jessibuca/index.vue?vue&type=style&index=0&id=f475ec14&prod&lang=less&scoped=true&

;// CONCATENATED MODULE: ./src/package/Jessibuca/index.vue



;


/* normalize component */

var Jessibuca_component = normalizeComponent(
  package_Jessibucavue_type_script_lang_js_,
  Jessibucavue_type_template_id_f475ec14_scoped_true_render,
  Jessibucavue_type_template_id_f475ec14_scoped_true_staticRenderFns,
  false,
  null,
  "f475ec14",
  null
  
)

/* harmony default export */ var Jessibuca = (Jessibuca_component.exports);
;// CONCATENATED MODULE: ./src/package/index.js
// 引用组件

 //组件都写在这个数组中方便管理

const componentList = [package_button, Jessibuca]; // 批量注册

const install = Vue => {
  componentList.forEach(com => {
    Vue.component(com.name, com);
  });
}; // 暴露出去


/* harmony default export */ var src_package = (install);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_package);


module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=ndst-ui.common.js.map