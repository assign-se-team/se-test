import { _ as __nuxt_component_0 } from './nuxt-link-Duvjf_-f.mjs';
import { c as createComponent, u as useHead } from './server.mjs';
import { computed, h, defineComponent, ref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { h as hSlot, _ as _sfc_main$1, a as __nuxt_component_3, b as __nuxt_component_2, c as __nuxt_component_1$1 } from './Menu-BdIa0GzH.mjs';
import { q as quizJson } from './quiz-rxg6V3jx.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const __nuxt_component_1 = createComponent({
  name: 'QCardSection',

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    horizontal: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-card__section'
      + ` q-card__section--${ props.horizontal === true ? 'horiz row no-wrap' : 'vert' }`
    );

    return () => h(props.tag, { class: classes.value }, hSlot(slots.default))
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u30E1\u30CB\u30E5\u30FC | SE\u77E5\u898B\u30C6\u30B9\u30C8",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    });
    const quizesArray = ref(quizJson.main.map((e) => {
      return {
        id: e.id,
        name: e.name,
        description: e.description,
        date: e.date,
        creator: e.creator,
        totalQuestions: e.quizes.length
      };
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_card = __nuxt_component_3;
      const _component_q_card_section = __nuxt_component_1;
      const _component_q_separator = __nuxt_component_2;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_q_btn = __nuxt_component_1$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="row justify-center q-pa-md main_page"><!--[-->`);
      ssrRenderList(quizesArray.value, (quiz, index) => {
        _push(`<div class="menu_card">`);
        _push(ssrRenderComponent(_component_q_card, {
          flat: "",
          bordered: "",
          class: "my-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="row q-pa-md items-center"${_scopeId}><div class="text-h6 col-9"${_scopeId}>${ssrInterpolate(quiz.name)}</div><div class="text-grey-7 col-3"${_scopeId}>\u66F4\u65B0\u65E5\uFF1A${ssrInterpolate(quiz.date)}</div></div>`);
              _push2(ssrRenderComponent(_component_q_card_section, { class: "q-pt-none" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(quiz.description)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(quiz.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_q_separator, { inset: "" }, null, _parent2, _scopeId));
              _push2(`<div class="row items-center q-pt-sm q-pl-md q-pr-md q-pb-sm"${_scopeId}><div class="col-2 text-grey-7"${_scopeId}>\u4F5C\u6210\u8005\uFF1A${ssrInterpolate(quiz.creator)}</div><div class="col-2 text-grey-7"${_scopeId}>\u554F\u984C\u6570\uFF1A${ssrInterpolate(quiz.totalQuestions)}</div><div class="col-6"${_scopeId}></div><div class="col-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: "./test/" + quiz.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_btn, {
                      flat: "",
                      class: "bg-red-5 text-white",
                      style: { "width": "100%" },
                      label: "\u56DE\u7B54\u3059\u308B"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_btn, {
                        flat: "",
                        class: "bg-red-5 text-white",
                        style: { "width": "100%" },
                        label: "\u56DE\u7B54\u3059\u308B"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "row q-pa-md items-center" }, [
                  createVNode("div", { class: "text-h6 col-9" }, toDisplayString(quiz.name), 1),
                  createVNode("div", { class: "text-grey-7 col-3" }, "\u66F4\u65B0\u65E5\uFF1A" + toDisplayString(quiz.date), 1)
                ]),
                createVNode(_component_q_card_section, { class: "q-pt-none" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(quiz.description), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_q_separator, { inset: "" }),
                createVNode("div", { class: "row items-center q-pt-sm q-pl-md q-pr-md q-pb-sm" }, [
                  createVNode("div", { class: "col-2 text-grey-7" }, "\u4F5C\u6210\u8005\uFF1A" + toDisplayString(quiz.creator), 1),
                  createVNode("div", { class: "col-2 text-grey-7" }, "\u554F\u984C\u6570\uFF1A" + toDisplayString(quiz.totalQuestions), 1),
                  createVNode("div", { class: "col-6" }),
                  createVNode("div", { class: "col-2" }, [
                    createVNode(_component_nuxt_link, {
                      to: "./test/" + quiz.id
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_btn, {
                          flat: "",
                          class: "bg-red-5 text-white",
                          style: { "width": "100%" },
                          label: "\u56DE\u7B54\u3059\u308B"
                        })
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CGgdH8MB.mjs.map
