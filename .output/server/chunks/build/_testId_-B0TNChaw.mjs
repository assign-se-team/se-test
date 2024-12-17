import { c as createComponent, n as noop, t as tabsKey, e as emptyRenderFn, s as stopAndPrevent, a as createDirective, i as isRuntimeSsrPreHydration, f as formKey, p as prevent, b as client, d as stop, g as useRoute, u as useHead } from './server.mjs';
import { getCurrentInstance, ref, computed, watch, provide, onBeforeUnmount, onDeactivated, onActivated, h, inject, onMounted, withDirectives, nextTick, Transition, KeepAlive, toRaw, onBeforeUpdate, defineComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { u as useTick, d as useTimeout, h as hSlot, Q as QIcon, R as Ripple, i as isKeyCode, s as shouldIgnoreKey, e as hMergeSlot, g as getSSRProps, f as getNormalizedVNodes, j as useDarkProps, k as useDark, l as hDir, m as useSizeProps, n as useSize, o as addFocusFn, r as removeFocusFn, p as QSpinner, q as btnDesignOptions, t as btnPadding, v as getBtnDesign, c as __nuxt_component_1$1, _ as _sfc_main$1, b as __nuxt_component_2 } from './Menu-BdIa0GzH.mjs';
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
import './nuxt-link-Duvjf_-f.mjs';

function injectProp (target, propName, get, set) {
  Object.defineProperty(target, propName, {
    get,
    set,
    enumerable: true
  });
  return target
}

function debounce (fn, wait = 250, immediate) {
  let timer = null;

  function debounced (/* ...args */) {
    const args = arguments;

    const later = () => {
      timer = null;
      {
        fn.apply(this, args);
      }
    };

    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(later, wait);
  }

  debounced.cancel = () => {
    timer !== null && clearTimeout(timer);
  };

  return debounced
}

const QResizeObserver = createComponent({
  name: 'QResizeObserver',

  props: {
    debounce: {
      type: [ String, Number ],
      default: 100
    }
  },

  emits: [ 'resize' ],

  setup (props, { emit }) {
    { return noop }
  }
});

function getIndicatorClass (color, top, vertical) {
  const pos = vertical === true
    ? [ 'left', 'right' ]
    : [ 'top', 'bottom' ];

  return `absolute-${ top === true ? pos[ 0 ] : pos[ 1 ] }${ color ? ` text-${ color }` : '' }`
}

const alignValues = [ 'left', 'center', 'right', 'justify' ];

const __nuxt_component_0 = createComponent({
  name: 'QTabs',

  props: {
    modelValue: [ Number, String ],

    align: {
      type: String,
      default: 'center',
      validator: v => alignValues.includes(v)
    },
    breakpoint: {
      type: [ String, Number ],
      default: 600
    },

    vertical: Boolean,
    shrink: Boolean,
    stretch: Boolean,

    activeClass: String,
    activeColor: String,
    activeBgColor: String,
    indicatorColor: String,
    leftIcon: String,
    rightIcon: String,

    outsideArrows: Boolean,
    mobileArrows: Boolean,

    switchIndicator: Boolean,

    narrowIndicator: Boolean,
    inlineLabel: Boolean,
    noCaps: Boolean,

    dense: Boolean,

    contentClass: String,

    'onUpdate:modelValue': [ Function, Array ]
  },

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const { registerTick: registerScrollTick } = useTick();
    const { registerTick: registerUpdateArrowsTick } = useTick();
    const { registerTick: registerAnimateTick } = useTick();

    const { registerTimeout: registerFocusTimeout, removeTimeout: removeFocusTimeout } = useTimeout();
    const { registerTimeout: registerScrollToTabTimeout, removeTimeout: removeScrollToTabTimeout } = useTimeout();

    const rootRef = ref(null);
    const contentRef = ref(null);

    const currentModel = ref(props.modelValue);
    const scrollable = ref(false);
    const leftArrow = ref(true);
    const rightArrow = ref(false);
    const justify = ref(false);

    const tabDataList = [];
    const tabDataListLen = ref(0);
    const hasFocus = ref(false);

    let animateTimer = null, scrollTimer = null, unwatchRoute;

    const tabProps = computed(() => ({
      activeClass: props.activeClass,
      activeColor: props.activeColor,
      activeBgColor: props.activeBgColor,
      indicatorClass: getIndicatorClass(
        props.indicatorColor,
        props.switchIndicator,
        props.vertical
      ),
      narrowIndicator: props.narrowIndicator,
      inlineLabel: props.inlineLabel,
      noCaps: props.noCaps
    }));

    const hasActiveTab = computed(() => {
      const len = tabDataListLen.value;
      const val = currentModel.value;

      for (let i = 0; i < len; i++) {
        if (tabDataList[ i ].name.value === val) {
          return true
        }
      }

      return false
    });

    const alignClass = computed(() => {
      const align = scrollable.value === true
        ? 'left'
        : (justify.value === true ? 'justify' : props.align);

      return `q-tabs__content--align-${ align }`
    });

    const classes = computed(() =>
      'q-tabs row no-wrap items-center'
      + ` q-tabs--${ scrollable.value === true ? '' : 'not-' }scrollable`
      + ` q-tabs--${ props.vertical === true ? 'vertical' : 'horizontal' }`
      + ` q-tabs__arrows--${ props.outsideArrows === true ? 'outside' : 'inside' }`
      + ` q-tabs--mobile-with${ props.mobileArrows === true ? '' : 'out' }-arrows`
      + (props.dense === true ? ' q-tabs--dense' : '')
      + (props.shrink === true ? ' col-shrink' : '')
      + (props.stretch === true ? ' self-stretch' : '')
    );

    const innerClass = computed(() =>
      'q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position '
      + alignClass.value
      + (props.contentClass !== void 0 ? ` ${ props.contentClass }` : '')
    );

    const domProps = computed(() => (
      props.vertical === true
        ? { container: 'height', content: 'offsetHeight', scroll: 'scrollHeight' }
        : { container: 'width', content: 'offsetWidth', scroll: 'scrollWidth' }
    ));

    const isRTL = computed(() => props.vertical !== true && $q.lang.rtl === true);
    const rtlPosCorrection = computed(() => isRTL.value === true);

    watch(isRTL, updateArrows);

    watch(() => props.modelValue, name => {
      updateModel({ name, setCurrent: true, skipEmit: true });
    });

    watch(() => props.outsideArrows, recalculateScroll);

    function updateModel ({ name, setCurrent, skipEmit }) {
      if (currentModel.value !== name) {
        if (skipEmit !== true && props[ 'onUpdate:modelValue' ] !== void 0) {
          emit('update:modelValue', name);
        }

        if (
          setCurrent === true
          || props[ 'onUpdate:modelValue' ] === void 0
        ) {
          animate(currentModel.value, name);
          currentModel.value = name;
        }
      }
    }

    function recalculateScroll () {
      registerScrollTick(() => {
        updateContainer({
          width: rootRef.value.offsetWidth,
          height: rootRef.value.offsetHeight
        });
      });
    }

    function updateContainer (domSize) {
      // it can be called faster than component being initialized
      // so we need to protect against that case
      // (one example of such case is the docs release notes page)
      if (domProps.value === void 0 || contentRef.value === null) return

      const
        size = domSize[ domProps.value.container ],
        scrollSize = Math.min(
          contentRef.value[ domProps.value.scroll ],
          Array.prototype.reduce.call(
            contentRef.value.children,
            (acc, el) => acc + (el[ domProps.value.content ] || 0),
            0
          )
        ),
        scroll = size > 0 && scrollSize > size; // when there is no tab, in Chrome, size === 0 and scrollSize === 1

      scrollable.value = scroll;

      // Arrows need to be updated even if the scroll status was already true
      scroll === true && registerUpdateArrowsTick(updateArrows);

      justify.value = size < parseInt(props.breakpoint, 10);
    }

    function animate (oldName, newName) {
      const
        oldTab = oldName !== void 0 && oldName !== null && oldName !== ''
          ? tabDataList.find(tab => tab.name.value === oldName)
          : null,
        newTab = newName !== void 0 && newName !== null && newName !== ''
          ? tabDataList.find(tab => tab.name.value === newName)
          : null;

      if (oldTab && newTab) {
        const
          oldEl = oldTab.tabIndicatorRef.value,
          newEl = newTab.tabIndicatorRef.value;

        if (animateTimer !== null) {
          clearTimeout(animateTimer);
          animateTimer = null;
        }

        oldEl.style.transition = 'none';
        oldEl.style.transform = 'none';
        newEl.style.transition = 'none';
        newEl.style.transform = 'none';

        const
          oldPos = oldEl.getBoundingClientRect(),
          newPos = newEl.getBoundingClientRect();

        newEl.style.transform = props.vertical === true
          ? `translate3d(0,${ oldPos.top - newPos.top }px,0) scale3d(1,${ newPos.height ? oldPos.height / newPos.height : 1 },1)`
          : `translate3d(${ oldPos.left - newPos.left }px,0,0) scale3d(${ newPos.width ? oldPos.width / newPos.width : 1 },1,1)`;

        // allow scope updates to kick in (QRouteTab needs more time)
        registerAnimateTick(() => {
          animateTimer = setTimeout(() => {
            animateTimer = null;
            newEl.style.transition = 'transform .25s cubic-bezier(.4, 0, .2, 1)';
            newEl.style.transform = 'none';
          }, 70);
        });
      }

      if (newTab && scrollable.value === true) {
        scrollToTabEl(newTab.rootRef.value);
      }
    }

    function scrollToTabEl (el) {
      const
        { left, width, top, height } = contentRef.value.getBoundingClientRect(),
        newPos = el.getBoundingClientRect();

      let offset = props.vertical === true ? newPos.top - top : newPos.left - left;

      if (offset < 0) {
        contentRef.value[ props.vertical === true ? 'scrollTop' : 'scrollLeft' ] += Math.floor(offset);
        updateArrows();
        return
      }

      offset += props.vertical === true ? newPos.height - height : newPos.width - width;
      if (offset > 0) {
        contentRef.value[ props.vertical === true ? 'scrollTop' : 'scrollLeft' ] += Math.ceil(offset);
        updateArrows();
      }
    }

    function updateArrows () {
      const content = contentRef.value;
      if (content === null) return

      const
        rect = content.getBoundingClientRect(),
        pos = props.vertical === true ? content.scrollTop : Math.abs(content.scrollLeft);

      if (isRTL.value === true) {
        leftArrow.value = Math.ceil(pos + rect.width) < content.scrollWidth - 1;
        rightArrow.value = pos > 0;
      }
      else {
        leftArrow.value = pos > 0;
        rightArrow.value = props.vertical === true
          ? Math.ceil(pos + rect.height) < content.scrollHeight
          : Math.ceil(pos + rect.width) < content.scrollWidth;
      }
    }

    function animScrollTo (value) {
      scrollTimer !== null && clearInterval(scrollTimer);
      scrollTimer = setInterval(() => {
        if (scrollTowards(value) === true) {
          stopAnimScroll();
        }
      }, 5);
    }

    function scrollToStart () {
      animScrollTo(rtlPosCorrection.value === true ? Number.MAX_SAFE_INTEGER : 0);
    }

    function scrollToEnd () {
      animScrollTo(rtlPosCorrection.value === true ? 0 : Number.MAX_SAFE_INTEGER);
    }

    function stopAnimScroll () {
      if (scrollTimer !== null) {
        clearInterval(scrollTimer);
        scrollTimer = null;
      }
    }

    function onKbdNavigate (keyCode, fromEl) {
      const tabs = Array.prototype.filter.call(
        contentRef.value.children,
        el => el === fromEl || (el.matches && el.matches('.q-tab.q-focusable') === true)
      );

      const len = tabs.length;
      if (len === 0) return

      if (keyCode === 36) { // Home
        scrollToTabEl(tabs[ 0 ]);
        tabs[ 0 ].focus();
        return true
      }
      if (keyCode === 35) { // End
        scrollToTabEl(tabs[ len - 1 ]);
        tabs[ len - 1 ].focus();
        return true
      }

      const dirPrev = keyCode === (props.vertical === true ? 38 /* ArrowUp */ : 37 /* ArrowLeft */);
      const dirNext = keyCode === (props.vertical === true ? 40 /* ArrowDown */ : 39 /* ArrowRight */);

      const dir = dirPrev === true ? -1 : (dirNext === true ? 1 : void 0);

      if (dir !== void 0) {
        const rtlDir = isRTL.value === true ? -1 : 1;
        const index = tabs.indexOf(fromEl) + dir * rtlDir;

        if (index >= 0 && index < len) {
          scrollToTabEl(tabs[ index ]);
          tabs[ index ].focus({ preventScroll: true });
        }

        return true
      }
    }

    // let's speed up execution of time-sensitive scrollTowards()
    // with a computed variable by directly applying the minimal
    // number of instructions on get/set functions
    const posFn = computed(() => (
      rtlPosCorrection.value === true
        ? { get: content => Math.abs(content.scrollLeft), set: (content, pos) => { content.scrollLeft = -pos; } }
        : (
            props.vertical === true
              ? { get: content => content.scrollTop, set: (content, pos) => { content.scrollTop = pos; } }
              : { get: content => content.scrollLeft, set: (content, pos) => { content.scrollLeft = pos; } }
          )
    ));

    function scrollTowards (value) {
      const
        content = contentRef.value,
        { get, set } = posFn.value;

      let
        done = false,
        pos = get(content);

      const direction = value < pos ? -1 : 1;

      pos += direction * 5;

      if (pos < 0) {
        done = true;
        pos = 0;
      }
      else if (
        (direction === -1 && pos <= value)
        || (direction === 1 && pos >= value)
      ) {
        done = true;
        pos = value;
      }

      set(content, pos);
      updateArrows();

      return done
    }

    function hasQueryIncluded (targetQuery, matchingQuery) {
      for (const key in targetQuery) {
        if (targetQuery[ key ] !== matchingQuery[ key ]) {
          return false
        }
      }

      return true
    }

    // do not use directly; use verifyRouteModel() instead
    function updateActiveRoute () {
      let name = null, bestScore = { matchedLen: 0, queryDiff: 9999, hrefLen: 0 };

      const list = tabDataList.filter(tab => tab.routeData !== void 0 && tab.routeData.hasRouterLink.value === true);
      const { hash: currentHash, query: currentQuery } = proxy.$route;
      const currentQueryLen = Object.keys(currentQuery).length;

      // Vue Router does not keep account of hash & query when matching
      // so we're doing this as well

      for (const tab of list) {
        const exact = tab.routeData.exact.value === true;

        if (tab.routeData[ exact === true ? 'linkIsExactActive' : 'linkIsActive' ].value !== true) {
          // it cannot match anything as it's not active nor exact-active
          continue
        }

        const { hash, query, matched, href } = tab.routeData.resolvedLink.value;
        const queryLen = Object.keys(query).length;

        if (exact === true) {
          if (hash !== currentHash) {
            // it's set to exact but it doesn't matches the hash
            continue
          }

          if (
            queryLen !== currentQueryLen
            || hasQueryIncluded(currentQuery, query) === false
          ) {
            // it's set to exact but it doesn't matches the query
            continue
          }

          // yey, we found the perfect match (route + hash + query)
          name = tab.name.value;
          break
        }

        if (hash !== '' && hash !== currentHash) {
          // it has hash and it doesn't matches
          continue
        }

        if (
          queryLen !== 0
          && hasQueryIncluded(query, currentQuery) === false
        ) {
          // it has query and it doesn't includes the current one
          continue
        }

        const newScore = {
          matchedLen: matched.length,
          queryDiff: currentQueryLen - queryLen,
          hrefLen: href.length - hash.length
        };

        if (newScore.matchedLen > bestScore.matchedLen) {
          // it matches more routes so it's more specific so we set it as current champion
          name = tab.name.value;
          bestScore = newScore;
          continue
        }
        else if (newScore.matchedLen !== bestScore.matchedLen) {
          // it matches less routes than the current champion so we discard it
          continue
        }

        if (newScore.queryDiff < bestScore.queryDiff) {
          // query is closer to the current one so we set it as current champion
          name = tab.name.value;
          bestScore = newScore;
        }
        else if (newScore.queryDiff !== bestScore.queryDiff) {
          // it matches less routes than the current champion so we discard it
          continue
        }

        if (newScore.hrefLen > bestScore.hrefLen) {
          // href is lengthier so it's more specific so we set it as current champion
          name = tab.name.value;
          bestScore = newScore;
        }
      }

      if (
        name === null
        && tabDataList.some(tab => tab.routeData === void 0 && tab.name.value === currentModel.value) === true
      ) {
        // we shouldn't interfere if non-route tab is active
        return
      }

      updateModel({ name, setCurrent: true });
    }

    function onFocusin (e) {
      removeFocusTimeout();

      if (
        hasFocus.value !== true
        && rootRef.value !== null
        && e.target
        && typeof e.target.closest === 'function'
      ) {
        const tab = e.target.closest('.q-tab');

        // if the target is contained by a QTab/QRouteTab
        // (it might be other elements focused, like additional QBtn)
        if (tab && rootRef.value.contains(tab) === true) {
          hasFocus.value = true;
          scrollable.value === true && scrollToTabEl(tab);
        }
      }
    }

    function onFocusout () {
      registerFocusTimeout(() => { hasFocus.value = false; }, 30);
    }

    function verifyRouteModel () {
      if ($tabs.avoidRouteWatcher === false) {
        registerScrollToTabTimeout(updateActiveRoute);
      }
      else {
        removeScrollToTabTimeout();
      }
    }

    function watchRoute () {
      if (unwatchRoute === void 0) {
        const unwatch = watch(() => proxy.$route.fullPath, verifyRouteModel);
        unwatchRoute = () => {
          unwatch();
          unwatchRoute = void 0;
        };
      }
    }

    function registerTab (tabData) {
      tabDataList.push(tabData);
      tabDataListLen.value++;

      recalculateScroll();

      // if it's a QTab or we don't have Vue Router
      if (tabData.routeData === void 0 || proxy.$route === void 0) {
        // we should position to the currently active tab (if any)
        registerScrollToTabTimeout(() => {
          if (scrollable.value === true) {
            const value = currentModel.value;
            const newTab = value !== void 0 && value !== null && value !== ''
              ? tabDataList.find(tab => tab.name.value === value)
              : null;

            newTab && scrollToTabEl(newTab.rootRef.value);
          }
        });
      }
      // else if it's a QRouteTab with a valid link
      else {
        // start watching route
        watchRoute();

        if (tabData.routeData.hasRouterLink.value === true) {
          verifyRouteModel();
        }
      }
    }

    function unregisterTab (tabData) {
      tabDataList.splice(tabDataList.indexOf(tabData), 1);
      tabDataListLen.value--;

      recalculateScroll();

      if (unwatchRoute !== void 0 && tabData.routeData !== void 0) {
        // unwatch route if we don't have any QRouteTabs left
        if (tabDataList.every(tab => tab.routeData === void 0) === true) {
          unwatchRoute();
        }

        // then update model
        verifyRouteModel();
      }
    }

    const $tabs = {
      currentModel,
      tabProps,
      hasFocus,
      hasActiveTab,

      registerTab,
      unregisterTab,

      verifyRouteModel,
      updateModel,
      onKbdNavigate,

      avoidRouteWatcher: false // false | string (uid)
    };

    provide(tabsKey, $tabs);

    function cleanup () {
      animateTimer !== null && clearTimeout(animateTimer);
      stopAnimScroll();
      unwatchRoute !== void 0 && unwatchRoute();
    }

    let hadRouteWatcher;

    onBeforeUnmount(cleanup);

    onDeactivated(() => {
      hadRouteWatcher = unwatchRoute !== void 0;
      cleanup();
    });

    onActivated(() => {
      hadRouteWatcher === true && watchRoute();
      recalculateScroll();
    });

    return () => {
      return h('div', {
        ref: rootRef,
        class: classes.value,
        role: 'tablist',
        onFocusin,
        onFocusout
      }, [
        h(QResizeObserver, { onResize: updateContainer }),

        h('div', {
          ref: contentRef,
          class: innerClass.value,
          onScroll: updateArrows
        }, hSlot(slots.default)),

        h(QIcon, {
          class: 'q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon'
            + (leftArrow.value === true ? '' : ' q-tabs__arrow--faded'),
          name: props.leftIcon || $q.iconSet.tabs[ props.vertical === true ? 'up' : 'left' ],
          onMousedownPassive: scrollToStart,
          onTouchstartPassive: scrollToStart,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        }),

        h(QIcon, {
          class: 'q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon'
            + (rightArrow.value === true ? '' : ' q-tabs__arrow--faded'),
          name: props.rightIcon || $q.iconSet.tabs[ props.vertical === true ? 'down' : 'right' ],
          onMousedownPassive: scrollToEnd,
          onTouchstartPassive: scrollToEnd,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        })
      ])
    }
  }
});

/**
 * Based on the work of https://github.com/jchook/uuid-random
 */

let
  buf,
  bufIdx = 0;
const hexBytes = new Array(256);

// Pre-calculate toString(16) for speed
for (let i = 0; i < 256; i++) {
  hexBytes[ i ] = (i + 0x100).toString(16).substring(1);
}

// Use best available PRNG
const randomBytes = (() => {
  // Node & Browser support
  const lib = typeof crypto !== 'undefined'
    ? crypto
    : (
        void 0
      );

  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes
    }
    if (lib.getRandomValues !== void 0) {
      return n => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes
      }
    }
  }

  return n => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r
  }
})();

// Buffer random numbers for speed
// Reduce memory usage by decreasing this number (min 16)
// or improve speed by increasing this number (try 16384)
const BUFFER_SIZE = 4096;

function uid () {
  // Buffer some random bytes for speed
  if (buf === void 0 || (bufIdx + 16 > BUFFER_SIZE)) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }

  const b = Array.prototype.slice.call(buf, bufIdx, (bufIdx += 16));
  b[ 6 ] = (b[ 6 ] & 0x0f) | 0x40;
  b[ 8 ] = (b[ 8 ] & 0x3f) | 0x80;

  return hexBytes[ b[ 0 ] ] + hexBytes[ b[ 1 ] ]
    + hexBytes[ b[ 2 ] ] + hexBytes[ b[ 3 ] ] + '-'
    + hexBytes[ b[ 4 ] ] + hexBytes[ b[ 5 ] ] + '-'
    + hexBytes[ b[ 6 ] ] + hexBytes[ b[ 7 ] ] + '-'
    + hexBytes[ b[ 8 ] ] + hexBytes[ b[ 9 ] ] + '-'
    + hexBytes[ b[ 10 ] ] + hexBytes[ b[ 11 ] ]
    + hexBytes[ b[ 12 ] ] + hexBytes[ b[ 13 ] ]
    + hexBytes[ b[ 14 ] ] + hexBytes[ b[ 15 ] ]
}

let id = 0;

const useTabEmits = [ 'click', 'keydown' ];

const useTabProps = {
  icon: String,
  label: [ Number, String ],

  alert: [ Boolean, String ],
  alertIcon: String,

  name: {
    type: [ Number, String ],
    default: () => `t_${ id++ }`
  },

  noCaps: Boolean,

  tabindex: [ String, Number ],
  disable: Boolean,

  contentClass: String,

  ripple: {
    type: [ Boolean, Object ],
    default: true
  }
};

function useTab (props, slots, emit, routeData) {
  const $tabs = inject(tabsKey, emptyRenderFn);
  if ($tabs === emptyRenderFn) {
    console.error('QTab/QRouteTab component needs to be child of QTabs');
    return emptyRenderFn
  }

  const { proxy } = getCurrentInstance();

  const blurTargetRef = ref(null);
  const rootRef = ref(null);
  const tabIndicatorRef = ref(null);

  const ripple = computed(() => (
    props.disable === true || props.ripple === false
      ? false
      : Object.assign(
        { keyCodes: [ 13, 32 ], early: true },
        props.ripple === true ? {} : props.ripple
      )
  ));

  const isActive = computed(() => $tabs.currentModel.value === props.name);

  const classes = computed(() =>
    'q-tab relative-position self-stretch flex flex-center text-center'
    + (
      isActive.value === true
        ? (
            ' q-tab--active'
            + ($tabs.tabProps.value.activeClass ? ' ' + $tabs.tabProps.value.activeClass : '')
            + ($tabs.tabProps.value.activeColor ? ` text-${ $tabs.tabProps.value.activeColor }` : '')
            + ($tabs.tabProps.value.activeBgColor ? ` bg-${ $tabs.tabProps.value.activeBgColor }` : '')
          )
        : ' q-tab--inactive'
    )
    + (props.icon && props.label && $tabs.tabProps.value.inlineLabel === false ? ' q-tab--full' : '')
    + (props.noCaps === true || $tabs.tabProps.value.noCaps === true ? ' q-tab--no-caps' : '')
    + (props.disable === true ? ' disabled' : ' q-focusable q-hoverable cursor-pointer')
    + ('')
  );

  const innerClass = computed(() =>
    'q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable '
    + ($tabs.tabProps.value.inlineLabel === true ? 'row no-wrap q-tab__content--inline' : 'column')
    + (props.contentClass !== void 0 ? ` ${ props.contentClass }` : '')
  );

  const tabIndex = computed(() => (
    (
      props.disable === true
      || $tabs.hasFocus.value === true
      || (isActive.value === false && $tabs.hasActiveTab.value === true)
    )
      ? -1
      : props.tabindex || 0
  ));

  function onClick (e, keyboard) {
    if (keyboard !== true && blurTargetRef.value !== null) {
      blurTargetRef.value.focus();
    }

    if (props.disable === true) {
      return
    }

    // do we have a QTab?
    {
      $tabs.updateModel({ name: props.name });
      emit('click', e);
      return
    }
  }

  function onKeydown (e) {
    if (isKeyCode(e, [ 13, 32 ])) {
      onClick(e, true);
    }
    else if (
      shouldIgnoreKey(e) !== true
      && e.keyCode >= 35
      && e.keyCode <= 40
      && e.altKey !== true
      && e.metaKey !== true
    ) {
      $tabs.onKbdNavigate(e.keyCode, proxy.$el) === true && stopAndPrevent(e);
    }

    emit('keydown', e);
  }

  function getContent () {
    const
      narrow = $tabs.tabProps.value.narrowIndicator,
      content = [],
      indicator = h('div', {
        ref: tabIndicatorRef,
        class: [
          'q-tab__indicator',
          $tabs.tabProps.value.indicatorClass
        ]
      });

    props.icon !== void 0 && content.push(
      h(QIcon, {
        class: 'q-tab__icon',
        name: props.icon
      })
    );

    props.label !== void 0 && content.push(
      h('div', { class: 'q-tab__label' }, props.label)
    );

    props.alert !== false && content.push(
      props.alertIcon !== void 0
        ? h(QIcon, {
          class: 'q-tab__alert-icon',
          color: props.alert !== true
            ? props.alert
            : void 0,
          name: props.alertIcon
        })
        : h('div', {
          class: 'q-tab__alert'
            + (props.alert !== true ? ` text-${ props.alert }` : '')
        })
    );

    narrow === true && content.push(indicator);

    const node = [
      h('div', { class: 'q-focus-helper', tabindex: -1, ref: blurTargetRef }),
      h('div', { class: innerClass.value }, hMergeSlot(slots.default, content))
    ];

    narrow === false && node.push(indicator);

    return node
  }

  const tabData = {
    name: computed(() => props.name),
    rootRef,
    tabIndicatorRef,
    routeData
  };

  onBeforeUnmount(() => {
    $tabs.unregisterTab(tabData);
  });

  onMounted(() => {
    $tabs.registerTab(tabData);
  });

  function renderTab (tag, customData) {
    const data = {
      ref: rootRef,
      class: classes.value,
      tabindex: tabIndex.value,
      role: 'tab',
      'aria-selected': isActive.value === true ? 'true' : 'false',
      'aria-disabled': props.disable === true ? 'true' : void 0,
      onClick,
      onKeydown,
      ...customData
    };

    return withDirectives(
      h(tag, data, getContent()),
      [ [ Ripple, ripple.value ] ]
    )
  }

  return { renderTab, $tabs }
}

const __nuxt_component_1 = createComponent({
  name: 'QTab',

  props: useTabProps,

  emits: useTabEmits,

  setup (props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab('div')
  }
});

const TouchSwipe = createDirective({ name: 'touch-swipe', getSSRProps }
  
);

function useRenderCache () {
  let cache = Object.create(null);

  return {
    getCache: (_, defaultValue) => (
          typeof defaultValue === 'function'
            ? defaultValue()
            : defaultValue
        )
      ,

    setCache (key, obj) {
      cache[ key ] = obj;
    },

    hasCache (key) {
      return Object.hasOwnProperty.call(cache, key)
    },

    clearCache (key) {
      if (key !== void 0) {
        delete cache[ key ];
      }
      else {
        cache = Object.create(null);
      }
    }
  }
}

const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};

const PanelWrapper = {
  setup (_, { slots }) {
    return () => h('div', {
      class: 'q-panel scroll',
      role: 'tabpanel'
    }, hSlot(slots.default))
  }
};

const usePanelProps = {
  modelValue: {
    required: true
  },

  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,

  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [ String, Number ],
    default: 300
  },

  keepAlive: Boolean,
  keepAliveInclude: [ String, Array, RegExp ],
  keepAliveExclude: [ String, Array, RegExp ],
  keepAliveMax: Number
};

const usePanelEmits = [ 'update:modelValue', 'beforeTransition', 'transition' ];

function usePanel () {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCache } = useRenderCache();

  let panels, forcedPanelTransition;

  const panelIndex = ref(null);
  const panelTransition = ref(null);

  function onSwipe (evt) {
    const dir = props.vertical === true ? 'up' : 'left';
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }

  const panelDirectives = computed(() => {
    // if props.swipeable
    return [ [
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ] ]
  });

  const transitionPrev = computed(() =>
    props.transitionPrev || `slide-${ props.vertical === true ? 'down' : 'right' }`
  );

  const transitionNext = computed(() =>
    props.transitionNext || `slide-${ props.vertical === true ? 'up' : 'left' }`
  );

  const transitionStyle = computed(
    () => `--q-transition-duration: ${ props.transitionDuration }ms`
  );

  const contentKey = computed(() => (
    typeof props.modelValue === 'string' || typeof props.modelValue === 'number'
      ? props.modelValue
      : String(props.modelValue)
  ));

  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));

  const needsUniqueKeepAliveWrapper = computed(() =>
    props.keepAliveInclude !== void 0
    || props.keepAliveExclude !== void 0
  );

  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true
      ? getPanelIndex(newVal)
      : -1;

    if (forcedPanelTransition !== true) {
      updatePanelTransition(
        index === -1 ? 0 : (index < getPanelIndex(oldVal) ? -1 : 1)
      );
    }

    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit('beforeTransition', newVal, oldVal);
      nextTick(() => {
        emit('transition', newVal, oldVal);
      });
    }
  });

  function nextPanel () { goToPanelByOffset(1); }
  function previousPanel () { goToPanelByOffset(-1); }

  function goToPanel (name) {
    emit('update:modelValue', name);
  }

  function isValidPanelName (name) {
    return name !== void 0 && name !== null && name !== ''
  }

  function getPanelIndex (name) {
    return panels.findIndex(panel => {
      return panel.props.name === name
        && panel.props.disable !== ''
        && panel.props.disable !== true
    })
  }

  function getEnabledPanels () {
    return panels.filter(panel => {
      return panel.props.disable !== ''
        && panel.props.disable !== true
    })
  }

  function updatePanelTransition (direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1
      ? 'q-transition--' + (direction === -1 ? transitionPrev.value : transitionNext.value)
      : null;

    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }

  function goToPanelByOffset (direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;

    while (index !== -1 && index < panels.length) {
      const opt = panels[ index ];

      if (
        opt !== void 0
        && opt.props.disable !== ''
        && opt.props.disable !== true
      ) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit('update:modelValue', opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return
      }

      index += direction;
    }

    if (props.infinite === true && panels.length !== 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }

  function updatePanelIndex () {
    const index = getPanelIndex(props.modelValue);

    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }

    return true
  }

  function getPanelContentChild () {
    const panel = isValidPanelName(props.modelValue) === true
      && updatePanelIndex()
      && panels[ panelIndex.value ];

    return props.keepAlive === true
      ? [
          h(KeepAlive, keepAliveProps.value, [
            h(
              needsUniqueKeepAliveWrapper.value === true
                ? getCache(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value }))
                : PanelWrapper,
              { key: contentKey.value, style: transitionStyle.value },
              () => panel
            )
          ])
        ]
      : [
          h('div', {
            class: 'q-panel scroll',
            style: transitionStyle.value,
            key: contentKey.value,
            role: 'tabpanel'
          }, [ panel ])
        ]
  }

  function getPanelContent () {
    if (panels.length === 0) {
      return
    }

    return props.animated === true
      ? [ h(Transition, { name: panelTransition.value }, getPanelContentChild) ]
      : getPanelContentChild()
  }

  function updatePanelsList (slots) {
    panels = getNormalizedVNodes(
      hSlot(slots.default, [])
    ).filter(
      panel => panel.props !== null
        && panel.props.slot === void 0
        && isValidPanelName(panel.props.name) === true
    );

    return panels.length
  }

  function getPanels () {
    return panels
  }

  // expose public methods
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });

  return {
    panelIndex,
    panelDirectives,

    updatePanelsList,
    updatePanelIndex,

    getPanelContent,
    getEnabledPanels,
    getPanels,

    isValidPanelName,

    keepAliveProps,
    needsUniqueKeepAliveWrapper,

    goToPanelByOffset,
    goToPanel,

    nextPanel,
    previousPanel
  }
}

const __nuxt_component_3 = createComponent({
  name: 'QTabPanels',

  props: {
    ...usePanelProps,
    ...useDarkProps
  },

  emits: usePanelEmits,

  setup (props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();

    const classes = computed(() =>
      'q-tab-panels q-panel-parent'
      + (isDark.value === true ? ' q-tab-panels--dark q-dark' : '')
    );

    return () => {
      updatePanelsList(slots);

      return hDir(
        'div',
        { class: classes.value },
        getPanelContent(),
        'pan',
        props.swipeable,
        () => panelDirectives.value
      )
    }
  }
});

const __nuxt_component_4 = createComponent({
  name: 'QTabPanel',

  props: usePanelChildProps,

  setup (_, { slots }) {
    return () => h('div', { class: 'q-tab-panel', role: 'tabpanel' }, hSlot(slots.default))
  }
});

function useRefocusTarget (props, rootRef) {
  const refocusRef = ref(null);

  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null
    }

    return h('span', {
      ref: refocusRef,
      class: 'no-outline',
      tabindex: -1
    })
  });

  function refocusTarget (e) {
    const root = rootRef.value;

    if (e !== void 0 && e.type.indexOf('key') === 0) {
      if (
        root !== null
        && document.activeElement !== root
        && root.contains(document.activeElement) === true
      ) {
        root.focus();
      }
    }
    else if (
      refocusRef.value !== null
      && (e === void 0 || (root !== null && root.contains(e.target) === true))
    ) {
      refocusRef.value.focus();
    }
  }

  return {
    refocusTargetEl,
    refocusTarget
  }
}

const useFormProps = {
  name: String
};

function useFormInject (formAttrs = {}) {
  return (child, action, className) => {
    child[ action ](
      h('input', {
        class: 'hidden' + (className || ''),
        ...formAttrs.value
      })
    );
  }
}

function useFormInputNameAttr (props) {
  return computed(() => props.name || props.for)
}

const optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};

const svg = h('svg', {
  key: 'svg',
  class: 'q-radio__bg absolute non-selectable',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    d: 'M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12'
  }),

  h('path', {
    class: 'q-radio__check',
    d: 'M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6'
  })
]);

const __nuxt_component_5 = createComponent({
  name: 'QRadio',

  props: {
    ...useDarkProps,
    ...useSizeProps,
    ...useFormProps,

    modelValue: { required: true },
    val: { required: true },

    label: String,
    leftLabel: Boolean,

    checkedIcon: String,
    uncheckedIcon: String,

    color: String,
    keepColor: Boolean,
    dense: Boolean,

    disable: Boolean,
    tabindex: [ String, Number ]
  },

  emits: [ 'update:modelValue' ],

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();

    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, optionSizes);

    const rootRef = ref(null);
    const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);

    const isTrue = computed(() => toRaw(props.modelValue) === toRaw(props.val));

    const classes = computed(() =>
      'q-radio cursor-pointer no-outline row inline no-wrap items-center'
      + (props.disable === true ? ' disabled' : '')
      + (isDark.value === true ? ' q-radio--dark' : '')
      + (props.dense === true ? ' q-radio--dense' : '')
      + (props.leftLabel === true ? ' reverse' : '')
    );

    const innerClass = computed(() => {
      const color = props.color !== void 0 && (
        props.keepColor === true
        || isTrue.value === true
      )
        ? ` text-${ props.color }`
        : '';

      return 'q-radio__inner relative-position '
        + `q-radio__inner--${ isTrue.value === true ? 'truthy' : 'falsy' }${ color }`
    });

    const icon = computed(() =>
      (isTrue.value === true
        ? props.checkedIcon
        : props.uncheckedIcon
      ) || null
    );

    const tabindex = computed(() => (
      props.disable === true ? -1 : props.tabindex || 0
    ));

    const formAttrs = computed(() => {
      const prop = { type: 'radio' };

      props.name !== void 0 && Object.assign(prop, {
        // see https://vuejs.org/guide/extras/render-function.html#creating-vnodes (.prop)
        '.checked': isTrue.value === true,
        '^checked': isTrue.value === true ? 'checked' : void 0,
        name: props.name,
        value: props.val
      });

      return prop
    });

    const injectFormInput = useFormInject(formAttrs);

    function onClick (e) {
      if (e !== void 0) {
        stopAndPrevent(e);
        refocusTarget(e);
      }

      if (props.disable !== true && isTrue.value !== true) {
        emit('update:modelValue', props.val, e);
      }
    }

    function onKeydown (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        stopAndPrevent(e);
      }
    }

    function onKeyup (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick(e);
      }
    }

    // expose public methods
    Object.assign(proxy, { set: onClick });

    return () => {
      const content = icon.value !== null
        ? [
            h('div', {
              key: 'icon',
              class: 'q-radio__icon-container absolute-full flex flex-center no-wrap'
            }, [
              h(QIcon, {
                class: 'q-radio__icon',
                name: icon.value
              })
            ])
          ]
        : [ svg ];

      props.disable !== true && injectFormInput(
        content,
        'unshift',
        ' q-radio__native q-ma-none q-pa-none'
      );

      const child = [
        h('div', {
          class: innerClass.value,
          style: sizeStyle.value,
          'aria-hidden': 'true'
        }, content)
      ];

      if (refocusTargetEl.value !== null) {
        child.push(refocusTargetEl.value);
      }

      const label = props.label !== void 0
        ? hMergeSlot(slots.default, [ props.label ])
        : hSlot(slots.default);

      label !== void 0 && child.push(
        h('div', {
          class: 'q-radio__label q-anchor--skip'
        }, label)
      );

      return h('div', {
        ref: rootRef,
        class: classes.value,
        tabindex: tabindex.value,
        role: 'radio',
        'aria-label': props.label,
        'aria-checked': isTrue.value === true ? 'true' : 'false',
        'aria-disabled': props.disable === true ? 'true' : void 0,
        onClick,
        onKeydown,
        onKeyup
      }, child)
    }
  }
});

function parseValue (val) {
  return val === void 0 || val === null
    ? null
    : val
}

function getId (val, required) {
  return val === void 0 || val === null
    ? (required === true ? `f_${ uid() }` : null)
    : val
}

/**
 * Returns an "id" which is a ref() that can be used as
 * a unique identifier to apply to a DOM node attribute.
 *
 * On SSR, it takes care of generating the id on the client side (only) to
 * avoid hydration errors.
 */
function useId ({ getValue, required = true } = {}) {
  if (isRuntimeSsrPreHydration.value === true) {
    const id = getValue !== void 0
      ? ref(parseValue(getValue()))
      : ref(null);

    if (required === true && id.value === null) {
      onMounted(() => {
        id.value = `f_${ uid() }`; // getId(null, true)
      });
    }

    if (getValue !== void 0) {
      watch(getValue, newId => {
        id.value = getId(newId, required);
      });
    }

    return id
  }

  return getValue !== void 0
    ? computed(() => getId(getValue(), required))
    : ref(`f_${ uid() }`) // getId(null, true)
}

const listenerRE = /^on[A-Z]/;

function useSplitAttrs () {
  const { attrs, vnode } = getCurrentInstance();

  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };

  function update () {
    const attributes = {};
    const listeners = {};

    for (const key in attrs) {
      if (key !== 'class' && key !== 'style' && listenerRE.test(key) === false) {
        attributes[ key ] = attrs[ key ];
      }
    }

    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[ key ] = vnode.props[ key ];
      }
    }

    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }

  onBeforeUpdate(update);

  update();

  return acc
}

function useFormChild ({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);

  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();

    // export public method (so it can be used in QForm)
    Object.assign(proxy, { validate, resetValidation });

    watch(() => props.disable, val => {
      if (val === true) {
        typeof resetValidation === 'function' && resetValidation();
        $form.unbindComponent(proxy);
      }
      else {
        $form.bindComponent(proxy);
      }
    });

    onMounted(() => {
      // register to parent QForm
      props.disable !== true && $form.bindComponent(proxy);
    });

    onBeforeUnmount(() => {
      // un-register from parent QForm
      props.disable !== true && $form.unbindComponent(proxy);
    });
  }
  else if (requiresQForm === true) {
    console.error('Parent QForm not found on useFormChild()!');
  }
}

// file referenced from docs

const
  hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;

// Keep in sync with ui/types/api/validation.d.ts
const testPattern = {
  date: v => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),

  // -- RFC 5322 --
  // -- Added in v2.6.6 --
  // This is a basic helper validation.
  // For something more complex (like RFC 822) you should write and use your own rule.
  // We won't be accepting PRs to enhance the one below because of the reason above.
  // eslint-disable-next-line
  email: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),

  hexColor: v => hex.test(v),
  hexaColor: v => hexa.test(v),
  hexOrHexaColor: v => hexOrHexa.test(v),

  rgbColor: v => rgb.test(v),
  rgbaColor: v => rgba.test(v),
  rgbOrRgbaColor: v => rgb.test(v) || rgba.test(v),

  hexOrRgbColor: v => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: v => hexa.test(v) || rgba.test(v),
  anyColor: v => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};

const lazyRulesValues = [ true, false, 'ondemand' ];

const useValidateProps = {
  modelValue: {},

  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,

  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [ Boolean, String ],
    default: false, // statement unneeded but avoids future vue implementation changes
    validator: v => lazyRulesValues.includes(v)
  }
};

function useValidate (focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();

  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);

  useFormChild({ validate, resetValidation });

  let validateIndex = 0, unwatchRules;

  const hasRules = computed(() =>
    props.rules !== void 0
    && props.rules !== null
    && props.rules.length !== 0
  );

  const canDebounceValidate = computed(() => (
    props.disable !== true
    && hasRules.value === true
    // Should not have a validation in progress already;
    // It might mean that focus switched to submit btn and
    // QForm's submit() has been called already (ENTER key)
    && innerLoading.value === false
  ));

  const hasError = computed(() =>
    props.error === true || innerError.value === true
  );

  const errorMessage = computed(() => (
    typeof props.errorMessage === 'string' && props.errorMessage.length !== 0
      ? props.errorMessage
      : innerErrorMessage.value
  ));

  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;

    if (
      canDebounceValidate.value === true
      // trigger validation if not using any kind of lazy-rules
      && props.lazyRules === false
    ) {
      debouncedValidate();
    }
  });

  function onRulesChange () {
    if (
      props.lazyRules !== 'ondemand'
      && canDebounceValidate.value === true
      && isDirtyModel.value === true
    ) {
      debouncedValidate();
    }
  }

  watch(() => props.reactiveRules, val => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    }
    else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });

  watch(() => props.lazyRules, onRulesChange);

  watch(focused, val => {
    if (val === true) {
      isDirtyModel.value = true;
    }
    else if (
      canDebounceValidate.value === true
      && props.lazyRules !== 'ondemand'
    ) {
      debouncedValidate();
    }
  });

  function resetValidation () {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }

  /*
   * Return value
   *   - true (validation succeeded)
   *   - false (validation failed)
   *   - Promise (pending async validation)
   */
  function validate (val = props.modelValue) {
    if (
      props.disable === true
      || hasRules.value === false
    ) {
      return true
    }

    const index = ++validateIndex;

    const setDirty = innerLoading.value !== true
      ? () => { isDirtyModel.value = true; }
      : () => {};

    const update = (err, msg) => {
      err === true && setDirty();

      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };

    const promises = [];

    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[ i ];
      let res;

      if (typeof rule === 'function') {
        res = rule(val, testPattern);
      }
      else if (typeof rule === 'string' && testPattern[ rule ] !== void 0) {
        res = testPattern[ rule ](val);
      }

      if (res === false || typeof res === 'string') {
        update(true, res);
        return false
      }
      else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }

    if (promises.length === 0) {
      update(false);
      return true
    }

    innerLoading.value = true;

    return Promise.all(promises).then(
      res => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true
        }

        const msg = res.find(r => r === false || typeof r === 'string');
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0
      },
      e => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }

        return false
      }
    )
  }

  const debouncedValidate = debounce(validate, 0);

  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });

  // expose public methods & props
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, 'hasError', () => hasError.value);

  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,

    validate,
    resetValidation
  }
}

function fieldValueIsFilled (val) {
  return val !== void 0
    && val !== null
    && ('' + val).length !== 0
}

const useNonInputFieldProps = {
  ...useDarkProps,
  ...useValidateProps,

  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,

  labelColor: String,
  color: String,
  bgColor: String,

  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [ Boolean, String ],

  square: Boolean,

  loading: Boolean,

  labelSlot: Boolean,

  bottomSlots: Boolean,
  hideBottomSpace: Boolean,

  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,

  counter: Boolean,

  clearable: Boolean,
  clearIcon: String,

  disable: Boolean,
  readonly: Boolean,

  autofocus: Boolean,

  for: String
};

const useFieldProps = {
  ...useNonInputFieldProps,
  maxlength: [ Number, String ]
};

const useFieldEmits = [ 'update:modelValue', 'clear', 'focus', 'blur' ];

function useFieldState ({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
  const { props, proxy } = getCurrentInstance();

  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });

  return {
    requiredForAttr,
    changeEvent,
    tag: tagProp === true
      ? computed(() => props.tag)
      : { value: 'label' },

    isDark,

    editable: computed(() =>
      props.disable !== true && props.readonly !== true
    ),

    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,

    splitAttrs: useSplitAttrs(),
    targetUid,

    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)

    /**
     * user supplied additionals:

     * innerValue - computed
     * floatingLabel - computed
     * inputRef - computed

     * fieldClass - computed
     * hasShadow - computed

     * controlEvents - Object with fn(e)

     * getControl - fn
     * getInnerAppend - fn
     * getControlChild - fn
     * getShadowControl - fn
     * showPopup - fn
     */
  }
}

function useField (state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;

  let focusoutTimer = null;

  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }

  if (state.emitValue === void 0) {
    state.emitValue = value => {
      emit('update:modelValue', value);
    };
  }

  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }

  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });

  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === 'string' || typeof props.modelValue === 'number'
          ? ('' + props.modelValue).length
          : (Array.isArray(props.modelValue) === true ? props.modelValue.length : 0);

        const max = props.maxlength !== void 0
          ? props.maxlength
          : props.maxValues;

        return len + (max !== void 0 ? ' / ' + max : '')
      }
    });
  }

  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);

  const floatingLabel = state.floatingLabel !== void 0
    ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true)
    : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);

  const shouldRenderBottom = computed(() =>
    props.bottomSlots === true
    || props.hint !== void 0
    || hasRules.value === true
    || props.counter === true
    || props.error !== null
  );

  const styleType = computed(() => {
    if (props.filled === true) { return 'filled' }
    if (props.outlined === true) { return 'outlined' }
    if (props.borderless === true) { return 'borderless' }
    if (props.standout) { return 'standout' }
    return 'standard'
  });

  const classes = computed(() =>
    `q-field row no-wrap items-start q-field--${ styleType.value }`
    + (state.fieldClass !== void 0 ? ` ${ state.fieldClass.value }` : '')
    + (props.rounded === true ? ' q-field--rounded' : '')
    + (props.square === true ? ' q-field--square' : '')
    + (floatingLabel.value === true ? ' q-field--float' : '')
    + (hasLabel.value === true ? ' q-field--labeled' : '')
    + (props.dense === true ? ' q-field--dense' : '')
    + (props.itemAligned === true ? ' q-field--item-aligned q-item-type' : '')
    + (state.isDark.value === true ? ' q-field--dark' : '')
    + (state.getControl === void 0 ? ' q-field--auto-height' : '')
    + (state.focused.value === true ? ' q-field--focused' : '')
    + (hasError.value === true ? ' q-field--error' : '')
    + (hasError.value === true || state.focused.value === true ? ' q-field--highlighted' : '')
    + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? ' q-field--with-bottom' : '')
    + (props.disable === true ? ' q-field--disabled' : (props.readonly === true ? ' q-field--readonly' : ''))
  );

  const contentClass = computed(() =>
    'q-field__control relative-position row no-wrap'
    + (props.bgColor !== void 0 ? ` bg-${ props.bgColor }` : '')
    + (
      hasError.value === true
        ? ' text-negative'
        : (
            typeof props.standout === 'string' && props.standout.length !== 0 && state.focused.value === true
              ? ` ${ props.standout }`
              : (props.color !== void 0 ? ` text-${ props.color }` : '')
          )
    )
  );

  const hasLabel = computed(() =>
    props.labelSlot === true || props.label !== void 0
  );

  const labelClass = computed(() =>
    'q-field__label no-pointer-events absolute ellipsis'
    + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${ props.labelColor }` : '')
  );

  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));

  const attributes = computed(() => {
    const acc = {};

    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }

    if (props.disable === true) {
      acc[ 'aria-disabled' ] = 'true';
    }

    return acc
  });

  function focusHandler () {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;

    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute('tabindex') === true || (target = target.querySelector('[tabindex]'));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }

  function focus () {
    addFocusFn(focusHandler);
  }

  function blur () {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }

  function onControlFocusin (e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }

    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit('focus', e);
    }
  }

  function onControlFocusout (e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;

      if (
        document.hasFocus() === true && (
          state.hasPopupOpen === true
          || state.controlRef === void 0
          || state.controlRef.value === null
          || state.controlRef.value.contains(document.activeElement) !== false
        )
      ) {
        return
      }

      if (state.focused.value === true) {
        state.focused.value = false;
        emit('blur', e);
      }

      then !== void 0 && then();
    });
  }

  function clearValue (e) {
    // prevent activating the field but keep focus on desktop
    stopAndPrevent(e);

    if ($q.platform.is.mobile !== true) {
      const el = (state.targetRef !== void 0 && state.targetRef.value) || state.rootRef.value;
      el.focus();
    }
    else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }

    if (props.type === 'file') {
      // do not let focus be triggered
      // as it will make the native file dialog
      // appear for another selection
      state.inputRef.value.value = null;
    }

    emit('update:modelValue', null);
    state.changeEvent === true && emit('change', null);
    emit('clear', props.modelValue);

    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }

  function onClearableKeyup (evt) {
    [ 13, 32 ].includes(evt.keyCode) && clearValue(evt);
  }

  function getContent () {
    const node = [];

    slots.prepend !== void 0 && node.push(
      h('div', {
        class: 'q-field__prepend q-field__marginal row no-wrap items-center',
        key: 'prepend',
        onClick: prevent
      }, slots.prepend())
    );

    node.push(
      h('div', {
        class: 'q-field__control-container col relative-position row no-wrap q-anchor--skip'
      }, getControlContainer())
    );

    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode('error', [
        h(QIcon, { name: $q.iconSet.field.error, color: 'negative' })
      ])
    );

    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          'inner-loading-append',
          slots.loading !== void 0
            ? slots.loading()
            : [ h(QSpinner, { color: props.color }) ]
        )
      );
    }
    else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode('inner-clearable-append', [
          h(QIcon, {
            class: 'q-field__focusable-action',
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            role: 'button',
            'aria-hidden': 'false',
            'aria-label': $q.lang.label.clear,
            onKeyup: onClearableKeyup,
            onClick: clearValue
          })
        ])
      );
    }

    slots.append !== void 0 && node.push(
      h('div', {
        class: 'q-field__append q-field__marginal row no-wrap items-center',
        key: 'append',
        onClick: prevent
      }, slots.append())
    );

    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode('inner-append', state.getInnerAppend())
    );

    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );

    return node
  }

  function getControlContainer () {
    const node = [];

    props.prefix !== void 0 && props.prefix !== null && node.push(
      h('div', {
        class: 'q-field__prefix no-pointer-events row items-center'
      }, props.prefix)
    );

    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }

    if (state.getControl !== void 0) {
      node.push(state.getControl());
    }
    // internal usage only:
    else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    }
    else if (slots.control !== void 0) {
      node.push(
        h('div', {
          ref: state.targetRef,
          class: 'q-field__native row',
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          'data-autofocus': props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }

    hasLabel.value === true && node.push(
      h('div', {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );

    props.suffix !== void 0 && props.suffix !== null && node.push(
      h('div', {
        class: 'q-field__suffix no-pointer-events row items-center'
      }, props.suffix)
    );

    return node.concat(hSlot(slots.default))
  }

  function getBottom () {
    let msg, key;

    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [ h('div', { role: 'alert' }, errorMessage.value) ];
        key = `q--slot-error-${ errorMessage.value }`;
      }
      else {
        msg = hSlot(slots.error);
        key = 'q--slot-error';
      }
    }
    else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [ h('div', props.hint) ];
        key = `q--slot-hint-${ props.hint }`;
      }
      else {
        msg = hSlot(slots.hint);
        key = 'q--slot-hint';
      }
    }

    const hasCounter = props.counter === true || slots.counter !== void 0;

    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return
    }

    const main = h('div', {
      key,
      class: 'q-field__messages col'
    }, msg);

    return h('div', {
      class: 'q-field__bottom row items-start q-field__bottom--'
        + (props.hideBottomSpace !== true ? 'animated' : 'stale'),
      onClick: prevent
    }, [
      props.hideBottomSpace === true
        ? main
        : h(Transition, { name: 'q-transition--field-message' }, () => main),

      hasCounter === true
        ? h('div', {
          class: 'q-field__counter'
        }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value)
        : null
    ])
  }

  function getInnerAppendNode (key, content) {
    return content === null
      ? null
      : h('div', {
        key,
        class: 'q-field__append q-field__marginal row no-wrap items-center q-anchor--skip'
      }, content)
  }

  let shouldActivate = false;

  onDeactivated(() => {
    shouldActivate = true;
  });

  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });

  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });

  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });

  // expose public methods
  Object.assign(proxy, { focus, blur });

  return function renderField () {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0
      ? {
          ...state.splitAttrs.attributes.value,
          'data-autofocus': props.autofocus === true || void 0,
          ...attributes.value
        }
      : attributes.value;

    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0
        ? h('div', {
          class: 'q-field__before q-field__marginal row no-wrap items-center',
          onClick: prevent
        }, slots.before())
        : null,

      h('div', {
        class: 'q-field__inner relative-position col self-stretch'
      }, [
        h('div', {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),

        shouldRenderBottom.value === true
          ? getBottom()
          : null
      ]),

      slots.after !== void 0
        ? h('div', {
          class: 'q-field__after q-field__marginal row no-wrap items-center',
          onClick: prevent
        }, slots.after())
        : null
    ])
  }
}

// leave NAMED_MASKS at top of file (code referenced from docs)
const NAMED_MASKS = {
  date: '####/##/##',
  datetime: '####/##/## ##:##',
  time: '##:##',
  fulltime: '##:##:##',
  phone: '(###) ### - ####',
  card: '#### #### #### ####'
};

const TOKENS = {
  '#': { pattern: '[\\d]', negate: '[^\\d]' },

  S: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]' },
  N: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]' },

  A: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]', transform: v => v.toLocaleUpperCase() },
  a: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]', transform: v => v.toLocaleLowerCase() },

  X: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]', transform: v => v.toLocaleUpperCase() },
  x: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]', transform: v => v.toLocaleLowerCase() }
};

const KEYS = Object.keys(TOKENS);
KEYS.forEach(key => {
  TOKENS[ key ].regex = new RegExp(TOKENS[ key ].pattern);
});

const
  tokenRegexMask = new RegExp('\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([' + KEYS.join('') + '])|(.)', 'g'),
  escRegex = /[.*+?^${}()|[\]\\]/g;

const MARKER = String.fromCharCode(1);

const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [ Boolean, String ],
  unmaskedValue: Boolean
};

function useMask (props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;

  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());

  function getIsTypeText () {
    return props.autogrow === true
      || [ 'textarea', 'text', 'search', 'url', 'tel', 'password' ].includes(props.type)
  }

  watch(() => props.type + props.autogrow, updateMaskInternals);

  watch(() => props.mask, v => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    }
    else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit('update:modelValue', val);
    }
  });

  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });

  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });

  function getInitialMaskedValue () {
    updateMaskInternals();

    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));

      return props.fillMask !== false
        ? fillWithMask(masked)
        : masked
    }

    return props.modelValue
  }

  function getPaddedMaskMarked (size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size)
    }

    let pad = '', localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);

    if (padPos !== -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }

      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }

    return localMaskMarked
  }

  function updateMaskInternals () {
    hasMask.value = props.mask !== void 0
      && props.mask.length !== 0
      && getIsTypeText();

    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = '';
      maskReplaced = '';
      return
    }

    const
      localComputedMask = NAMED_MASKS[ props.mask ] === void 0
        ? props.mask
        : NAMED_MASKS[ props.mask ],
      fillChar = typeof props.fillMask === 'string' && props.fillMask.length !== 0
        ? props.fillMask.slice(0, 1)
        : '_',
      fillCharEscaped = fillChar.replace(escRegex, '\\$&'),
      unmask = [],
      extract = [],
      mask = [];

    let
      firstMatch = props.reverseFillMask === true,
      unmaskChar = '',
      negateChar = '';

    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[ token ];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push('(?:' + negateChar + '+)?(' + c.pattern + '+)?(?:' + negateChar + '+)?(' + c.pattern + '+)?');
          firstMatch = false;
        }
        extract.push('(?:' + negateChar + '+)?(' + c.pattern + ')?');
      }
      else if (esc !== void 0) {
        unmaskChar = '\\' + (esc === '\\' ? '' : esc);
        mask.push(esc);
        unmask.push('([^' + unmaskChar + ']+)?' + unmaskChar + '?');
      }
      else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === '\\' ? '\\\\\\\\' : c.replace(escRegex, '\\\\$&');
        mask.push(c);
        unmask.push('([^' + unmaskChar + ']+)?' + unmaskChar + '?');
      }
    });

    const
      unmaskMatcher = new RegExp(
        '^'
        + unmask.join('')
        + '(' + (unmaskChar === '' ? '.' : '[^' + unmaskChar + ']') + '+)?'
        + (unmaskChar === '' ? '' : '[' + unmaskChar + ']*') + '$'
      ),
      extractLast = extract.length - 1,
      extractMatcher = extract.map((re, index) => {
        if (index === 0 && props.reverseFillMask === true) {
          return new RegExp('^' + fillCharEscaped + '*' + re)
        }
        else if (index === extractLast) {
          return new RegExp(
            '^' + re
            + '(' + (negateChar === '' ? '.' : negateChar) + '+)?'
            + (props.reverseFillMask === true ? '$' : fillCharEscaped + '*')
          )
        }

        return new RegExp('^' + re)
      });

    computedMask = mask;
    computedUnmask = val => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join('');
      }

      const
        extractMatch = [],
        extractMatcherLength = extractMatcher.length;

      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[ i ].exec(str);

        if (m === null) {
          break
        }

        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join('')
      }

      return val
    };
    maskMarked = mask.map(v => (typeof v === 'string' ? v : MARKER)).join('');
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }

  function updateMaskValue (rawVal, updateMaskInternalsFlag, inputType) {
    const
      inp = inputRef.value,
      end = inp.selectionEnd,
      endReverse = inp.value.length - end,
      unmasked = unmaskValue(rawVal);

    // Update here so unmask uses the original fillChar
    updateMaskInternalsFlag === true && updateMaskInternals();

    const
      preMasked = maskValue(unmasked),
      masked = props.fillMask !== false
        ? fillWithMask(preMasked)
        : preMasked,
      changed = innerValue.value !== masked;

    // We want to avoid "flickering" so we set value immediately
    inp.value !== masked && (inp.value = masked);

    changed === true && (innerValue.value = masked);

    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, 'forward');

        return
      }

      if (inputType === 'insertFromPaste' && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        // each non-marker char means we move once to right
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[ i ] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);

        return
      }

      if ([ 'deleteContentBackward', 'deleteContentForward' ].indexOf(inputType) !== -1) {
        const cursor = props.reverseFillMask === true
          ? (
              end === 0
                ? (masked.length > preMasked.length ? 1 : 0)
                : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1
            )
          : end;

        inp.setSelectionRange(cursor, cursor, 'forward');
        return
      }

      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));

          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, 'forward');
          }
          else {
            moveCursor.rightReverse(inp, cursor);
          }
        }
        else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, 'backward');
        }
      }
      else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        }
        else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });

    const val = props.unmaskedValue === true
      ? unmaskValue(masked)
      : masked;

    if (
      String(props.modelValue) !== val
      && (props.modelValue !== null || val !== '')
    ) {
      emitValue(val, true);
    }
  }

  function moveCursorForPaste (inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));

    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;

    inp.setSelectionRange(start, end, 'forward');
  }

  const moveCursor = {
    left (inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);

      for (; i >= 0; i--) {
        if (maskMarked[ i ] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break
        }
      }

      if (
        i < 0
        && maskMarked[ cursor ] !== void 0
        && maskMarked[ cursor ] !== MARKER
      ) {
        return moveCursor.right(inp, 0)
      }

      cursor >= 0 && inp.setSelectionRange(cursor, cursor, 'backward');
    },

    right (inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);

      for (; i <= limit; i++) {
        if (maskMarked[ i ] === MARKER) {
          cursor = i;
          break
        }
        else if (maskMarked[ i - 1 ] === MARKER) {
          cursor = i;
        }
      }

      if (
        i > limit
        && maskMarked[ cursor - 1 ] !== void 0
        && maskMarked[ cursor - 1 ] !== MARKER
      ) {
        return moveCursor.left(inp, limit)
      }

      inp.setSelectionRange(cursor, cursor, 'forward');
    },

    leftReverse (inp, cursor) {
      const
        localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);

      for (; i >= 0; i--) {
        if (localMaskMarked[ i - 1 ] === MARKER) {
          cursor = i;
          break
        }
        else if (localMaskMarked[ i ] === MARKER) {
          cursor = i;
          if (i === 0) {
            break
          }
        }
      }

      if (
        i < 0
        && localMaskMarked[ cursor ] !== void 0
        && localMaskMarked[ cursor ] !== MARKER
      ) {
        return moveCursor.rightReverse(inp, 0)
      }

      cursor >= 0 && inp.setSelectionRange(cursor, cursor, 'backward');
    },

    rightReverse (inp, cursor) {
      const
        limit = inp.value.length,
        localMaskMarked = getPaddedMaskMarked(limit),
        noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);

      for (; i <= limit; i++) {
        if (localMaskMarked[ i - 1 ] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break
        }
      }

      if (
        i > limit
        && localMaskMarked[ cursor - 1 ] !== void 0
        && localMaskMarked[ cursor - 1 ] !== MARKER
      ) {
        return moveCursor.leftReverse(inp, limit)
      }

      inp.setSelectionRange(cursor, cursor, 'forward');
    }
  };

  function onMaskedClick (e) {
    emit('click', e);

    selectionAnchor = void 0;
  }

  function onMaskedKeydown (e) {
    emit('keydown', e);

    if (
      shouldIgnoreKey(e) === true
      || e.altKey === true // let browser handle these
    ) {
      return
    }

    const
      inp = inputRef.value,
      start = inp.selectionStart,
      end = inp.selectionEnd;

    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }

    if (e.keyCode === 37 || e.keyCode === 39) { // Left / Right
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === 'forward' ? start : end;
      }

      const fn = moveCursor[ (e.keyCode === 39 ? 'right' : 'left') + (props.reverseFillMask === true ? 'Reverse' : '') ];

      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);

      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), 'forward');
      }
    }
    else if (
      e.keyCode === 8 // Backspace
      && props.reverseFillMask !== true
      && start === end
    ) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, 'backward');
    }
    else if (
      e.keyCode === 46 // Delete
      && props.reverseFillMask === true
      && start === end
    ) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, 'forward');
    }
  }

  function maskValue (val) {
    if (val === void 0 || val === null || val === '') { return '' }

    if (props.reverseFillMask === true) {
      return maskValueReverse(val)
    }

    const mask = computedMask;

    let valIndex = 0, output = '';

    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const
        valChar = val[ valIndex ],
        maskDef = mask[ maskIndex ];

      if (typeof maskDef === 'string') {
        output += maskDef;
        valChar === maskDef && valIndex++;
      }
      else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0
          ? maskDef.transform(valChar)
          : valChar;
        valIndex++;
      }
      else {
        return output
      }
    }

    return output
  }

  function maskValueReverse (val) {
    const
      mask = computedMask,
      firstTokenIndex = maskMarked.indexOf(MARKER);

    let valIndex = val.length - 1, output = '';

    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
      const maskDef = mask[ maskIndex ];

      let valChar = val[ valIndex ];

      if (typeof maskDef === 'string') {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      }
      else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[ valIndex ];
        // eslint-disable-next-line no-unmodified-loop-condition
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar))
      }
      else {
        return output
      }
    }

    return output
  }

  function unmaskValue (val) {
    return typeof val !== 'string' || computedUnmask === void 0
      ? (typeof val === 'number' ? computedUnmask('' + val) : val)
      : computedUnmask(val)
  }

  function fillWithMask (val) {
    if (maskReplaced.length - val.length <= 0) {
      return val
    }

    return props.reverseFillMask === true && val.length !== 0
      ? maskReplaced.slice(0, -val.length) + val
      : val + maskReplaced.slice(val.length)
  }

  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  }
}

function useFileFormDomProps (props, typeGuard) {
  function getFormDomProps () {
    const model = props.modelValue;

    try {
      const dt = 'DataTransfer' in window
        ? new DataTransfer()
        : ('ClipboardEvent' in window
            ? new ClipboardEvent('').clipboardData
            : void 0
          );

      if (Object(model) === model) {
        ('length' in model
          ? Array.from(model)
          : [ model ]
        ).forEach(file => {
          dt.items.add(file);
        });
      }

      return {
        files: dt.files
      }
    }
    catch (e) {
      return {
        files: void 0
      }
    }
  }

  return computed(() => {
      if (props.type !== 'file') {
        return
      }

      return getFormDomProps()
    })
    
}

const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;

function useKeyComposition (onInput) {
  return function onComposition (e) {
    if (e.type === 'compositionend' || e.type === 'change') {
      if (e.target.qComposing !== true) return
      e.target.qComposing = false;
      onInput(e);
    }
    else if (
      e.type === 'compositionupdate'
      && e.target.qComposing !== true
      && typeof e.data === 'string'
    ) {
      const isComposing = client.is.firefox === true
        ? isPlainText.test(e.data) === false
        : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;

      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  }
}

const QInput = createComponent({
  name: 'QInput',

  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,

    // override of useFieldProps > modelValue
    modelValue: {} // SSR does not know about FileList
      ,

    shadowText: String,

    type: {
      type: String,
      default: 'text'
    },

    debounce: [ String, Number ],

    autogrow: Boolean, // makes a textarea

    inputClass: [ Array, String, Object ],
    inputStyle: [ Array, String, Object ]
  },

  emits: [
    ...useFieldEmits,
    'paste', 'change',
    'keydown', 'click', 'animationend'
  ],

  setup (props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;

    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);

    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);

    const formDomProps = useFileFormDomProps(props);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));

    const onComposition = useKeyComposition(onInput);

    const state = useFieldState({ changeEvent: true });

    const isTextarea = computed(() =>
      props.type === 'textarea' || props.autogrow === true
    );

    const isTypeText = computed(() =>
      isTextarea.value === true
      || [ 'text', 'search', 'url', 'tel', 'password' ].includes(props.type)
    );

    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };

      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;

      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        // reset selection anchor on pointer selection
        evt.onClick = onMaskedClick;
      }

      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }

      return evt
    });

    const inputAttrs = computed(() => {
      const attrs = {
        tabindex: 0,
        'data-autofocus': props.autofocus === true || void 0,
        rows: props.type === 'textarea' ? 6 : void 0,
        'aria-label': props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };

      if (isTextarea.value === false) {
        attrs.type = props.type;
      }

      if (props.autogrow === true) {
        attrs.rows = 1;
      }

      return attrs
    });

    // some browsers lose the native input value
    // so we need to reattach it dynamically
    // (like type="password" <-> type="text"; see #12078)
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });

    watch(() => props.modelValue, v => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;

          if (String(v) === emitCachedValue) {
            return
          }
        }

        updateMaskValue(v);
      }
      else if (innerValue.value !== v) {
        innerValue.value = v;

        if (
          props.type === 'number'
          && temp.hasOwnProperty('value') === true
        ) {
          if (typedNumber === true) {
            typedNumber = false;
          }
          else {
            delete temp.value;
          }
        }
      }

      // textarea only
      props.autogrow === true && nextTick(adjustHeight);
    });

    watch(() => props.autogrow, val => {
      // textarea only
      if (val === true) {
        nextTick(adjustHeight);
      }
      // if it has a number of rows set respect it
      else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = 'auto';
      }
    });

    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });

    function focus () {
      addFocusFn(() => {
        const el = document.activeElement;
        if (
          inputRef.value !== null
          && inputRef.value !== el
          && (el === null || el.id !== state.targetUid.value)
        ) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }

    function select () {
      inputRef.value !== null && inputRef.value.select();
    }

    function onPaste (e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }

      emit('paste', e);
    }

    function onInput (e) {
      if (!e || !e.target) {
        return
      }

      if (props.type === 'file') {
        emit('update:modelValue', e.target.files);
        return
      }

      const val = e.target.value;

      if (e.target.qComposing === true) {
        temp.value = val;

        return
      }

      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      }
      else {
        emitValue(val);

        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;

          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }

      // we need to trigger it immediately too,
      // to avoid "flickering"
      props.autogrow === true && adjustHeight();
    }

    function onAnimationend (e) {
      emit('animationend', e);
      adjustHeight();
    }

    function emitValue (val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;

        if (
          props.type !== 'number'
          && temp.hasOwnProperty('value') === true
        ) {
          delete temp.value;
        }

        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;

          stopWatcher === true && (stopValueWatcher = true);
          emit('update:modelValue', val);

          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }

        emitValueFn = void 0;
      };

      if (props.type === 'number') {
        typedNumber = true;
        temp.value = val;
      }

      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      }
      else {
        emitValueFn();
      }
    }

    // textarea only
    function adjustHeight () {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          // chrome does not keep scroll #15498
          const { scrollTop } = inp;
          // chrome calculates a smaller scrollHeight when in a .column container
          const { overflowY, maxHeight } = $q.platform.is.firefox === true
            ? {}
            : window.getComputedStyle(inp);
          // on firefox or if overflowY is specified as scroll #14263, #14344
          // we don't touch overflow
          // firefox is not so bad in the end
          const changeOverflow = overflowY !== void 0 && overflowY !== 'scroll';

          // reset height of textarea to a small size to detect the real height
          // but keep the total control size the same
          changeOverflow === true && (inp.style.overflowY = 'hidden');
          parentStyle.marginBottom = (inp.scrollHeight - 1) + 'px';
          inp.style.height = '1px';

          inp.style.height = inp.scrollHeight + 'px';
          // we should allow scrollbars only
          // if there is maxHeight and content is taller than maxHeight
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? 'auto' : 'hidden');
          parentStyle.marginBottom = '';
          inp.scrollTop = scrollTop;
        }
      });
    }

    function onChange (e) {
      onComposition(e);

      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }

      emitValueFn !== void 0 && emitValueFn();

      emit('change', e.target.value);
    }

    function onFinishEditing (e) {
      e !== void 0 && stop(e);

      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }

      emitValueFn !== void 0 && emitValueFn();

      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;

      // we need to use setTimeout instead of this.$nextTick
      // to avoid a bug where focusout is not emitted for type date/time/week/...
      props.type !== 'file' && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : '';
        }
      });
    }

    function getCurValue () {
      return temp.hasOwnProperty('value') === true
        ? temp.value
        : (innerValue.value !== void 0 ? innerValue.value : '')
    }

    onBeforeUnmount(() => {
      onFinishEditing();
    });

    onMounted(() => {
      // textarea only
      props.autogrow === true && adjustHeight();
    });

    Object.assign(state, {
      innerValue,

      fieldClass: computed(() =>
        `q-${ isTextarea.value === true ? 'textarea' : 'input' }`
        + (props.autogrow === true ? ' q-textarea--autogrow' : '')
      ),

      hasShadow: computed(() =>
        props.type !== 'file'
        && typeof props.shadowText === 'string'
        && props.shadowText.length !== 0
      ),

      inputRef,

      emitValue,

      hasValue,

      floatingLabel: computed(() =>
        (
          hasValue.value === true
          && (props.type !== 'number' || isNaN(innerValue.value) === false)
        )
        || fieldValueIsFilled(props.displayValue)
      ),

      getControl: () => {
        return h(isTextarea.value === true ? 'textarea' : 'input', {
          ref: inputRef,
          class: [
            'q-field__native q-placeholder',
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...(
            props.type !== 'file'
              ? { value: getCurValue() }
              : formDomProps.value
          )
        })
      },

      getShadowControl: () => {
        return h('div', {
          class: 'q-field__native q-field__shadow absolute-bottom no-pointer-events'
            + (isTextarea.value === true ? '' : ' text-no-wrap')
        }, [
          h('span', { class: 'invisible' }, getCurValue()),
          h('span', props.shadowText)
        ])
      }
    });

    const renderFn = useField(state);

    // expose public methods
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value // deprecated
    });

    injectProp(proxy, 'nativeEl', () => inputRef.value);

    return renderFn
  }
});

function between (v, min, max) {
  return max <= min
    ? min
    : Math.min(max, Math.max(min, v))
}

function getBool (val, otherwise) {
  return [ true, false ].includes(val)
    ? val
    : otherwise
}

const __nuxt_component_7 = createComponent({
  name: 'QPagination',

  props: {
    ...useDarkProps,

    modelValue: {
      type: Number,
      required: true
    },
    min: {
      type: [ Number, String ],
      default: 1
    },
    max: {
      type: [ Number, String ],
      required: true
    },
    maxPages: {
      type: [ Number, String ],
      default: 0,
      validator: v => (
        (typeof v === 'string' ? parseInt(v, 10) : v) >= 0
      )
    },

    inputStyle: [ Array, String, Object ],
    inputClass: [ Array, String, Object ],

    size: String,

    disable: Boolean,

    input: Boolean,

    iconPrev: String,
    iconNext: String,
    iconFirst: String,
    iconLast: String,

    toFn: Function,

    boundaryLinks: {
      type: Boolean,
      default: null
    },
    boundaryNumbers: {
      type: Boolean,
      default: null
    },
    directionLinks: {
      type: Boolean,
      default: null
    },
    ellipses: {
      type: Boolean,
      default: null
    },

    ripple: {
      type: [ Boolean, Object ],
      default: null
    },

    round: Boolean,
    rounded: Boolean,

    flat: Boolean,
    outline: Boolean,
    unelevated: Boolean,
    push: Boolean,
    glossy: Boolean,

    color: {
      type: String,
      default: 'primary'
    },
    textColor: String,

    activeDesign: {
      type: String,
      default: '',
      values: v => v === '' || btnDesignOptions.includes(v)
    },
    activeColor: String,
    activeTextColor: String,

    gutter: String,
    padding: {
      type: String,
      default: '3px 2px'
    }
  },

  emits: [ 'update:modelValue' ],

  setup (props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const isDark = useDark(props, $q);

    const minProp = computed(() => parseInt(props.min, 10));
    const maxProp = computed(() => parseInt(props.max, 10));
    const maxPagesProp = computed(() => parseInt(props.maxPages, 10));

    const inputPlaceholder = computed(() => model.value + ' / ' + maxProp.value);
    const boundaryLinksProp = computed(() => getBool(props.boundaryLinks, props.input));
    const boundaryNumbersProp = computed(() => getBool(props.boundaryNumbers, !props.input));
    const directionLinksProp = computed(() => getBool(props.directionLinks, props.input));
    const ellipsesProp = computed(() => getBool(props.ellipses, !props.input));

    const newPage = ref(null);
    const model = computed({
      get: () => props.modelValue,
      set: val => {
        val = parseInt(val, 10);
        if (props.disable || isNaN(val)) {
          return
        }
        const value = between(val, minProp.value, maxProp.value);
        if (props.modelValue !== value) {
          emit('update:modelValue', value);
        }
      }
    });

    watch(() => `${ minProp.value }|${ maxProp.value }`, () => {
      model.value = props.modelValue;
    });

    const classes = computed(() =>
      'q-pagination row no-wrap items-center'
      + (props.disable === true ? ' disabled' : '')
    );

    const gutterProp = computed(() => (
      props.gutter in btnPadding
        ? `${ btnPadding[ props.gutter ] }px`
        : props.gutter || null
    ));
    const gutterStyle = computed(() => (
      gutterProp.value !== null
        ? `--q-pagination-gutter-parent:-${ gutterProp.value };--q-pagination-gutter-child:${ gutterProp.value }`
        : null
    ));

    const icons = computed(() => {
      const ico = [
        props.iconFirst || $q.iconSet.pagination.first,
        props.iconPrev || $q.iconSet.pagination.prev,
        props.iconNext || $q.iconSet.pagination.next,
        props.iconLast || $q.iconSet.pagination.last
      ];
      return $q.lang.rtl === true ? ico.reverse() : ico
    });

    const attrs = computed(() => ({
      'aria-disabled': props.disable === true ? 'true' : 'false',
      role: 'navigation'
    }));

    const btnDesignProp = computed(() => getBtnDesign(props, 'flat'));
    const btnProps = computed(() => ({
      [ btnDesignProp.value ]: true,

      round: props.round,
      rounded: props.rounded,

      padding: props.padding,

      color: props.color,
      textColor: props.textColor,

      size: props.size,
      ripple: props.ripple !== null
        ? props.ripple
        : true
    }));

    const btnActiveDesignProp = computed(() => {
      // we also reset non-active design
      const acc = { [ btnDesignProp.value ]: false };
      if (props.activeDesign !== '') {
        acc[ props.activeDesign ] = true;
      }
      return acc
    });
    const activeBtnProps = computed(() => ({
      ...btnActiveDesignProp.value,
      color: props.activeColor || props.color,
      textColor: props.activeTextColor || props.textColor
    }));

    const btnConfig = computed(() => {
      let maxPages = Math.max(
        maxPagesProp.value,
        1 + (ellipsesProp.value ? 2 : 0) + (boundaryNumbersProp.value ? 2 : 0)
      );

      const acc = {
        pgFrom: minProp.value,
        pgTo: maxProp.value,
        ellipsesStart: false,
        ellipsesEnd: false,
        boundaryStart: false,
        boundaryEnd: false,
        marginalStyle: {
          minWidth: `${ Math.max(2, String(maxProp.value).length) }em`
        }
      };

      if (maxPagesProp.value && maxPages < (maxProp.value - minProp.value + 1)) {
        maxPages = 1 + Math.floor(maxPages / 2) * 2;
        acc.pgFrom = Math.max(minProp.value, Math.min(maxProp.value - maxPages + 1, props.modelValue - Math.floor(maxPages / 2)));
        acc.pgTo = Math.min(maxProp.value, acc.pgFrom + maxPages - 1);

        if (boundaryNumbersProp.value) {
          acc.boundaryStart = true;
          acc.pgFrom++;
        }

        if (ellipsesProp.value && acc.pgFrom > (minProp.value + (boundaryNumbersProp.value ? 1 : 0))) {
          acc.ellipsesStart = true;
          acc.pgFrom++;
        }

        if (boundaryNumbersProp.value) {
          acc.boundaryEnd = true;
          acc.pgTo--;
        }

        if (ellipsesProp.value && acc.pgTo < (maxProp.value - (boundaryNumbersProp.value ? 1 : 0))) {
          acc.ellipsesEnd = true;
          acc.pgTo--;
        }
      }

      return acc
    });

    function set (value) {
      model.value = value;
    }

    function setByOffset (offset) {
      model.value = model.value + offset;
    }

    const inputEvents = computed(() => {
      function updateModel () {
        model.value = newPage.value;
        newPage.value = null;
      }

      return {
        'onUpdate:modelValue': val => { newPage.value = val; },
        onKeyup: e => { isKeyCode(e, 13) === true && updateModel(); },
        onBlur: updateModel
      }
    });

    function getBtn (cfg, page, active) {
      const data = {
        'aria-label': page,
        'aria-current': 'false',
        ...btnProps.value,
        ...cfg
      };

      if (active === true) {
        Object.assign(data, {
          'aria-current': 'true',
          ...activeBtnProps.value
        });
      }

      if (page !== void 0) {
        if (props.toFn !== void 0) {
          data.to = props.toFn(page);
        }
        else {
          data.onClick = () => { set(page); };
        }
      }

      return h(__nuxt_component_1$1, data)
    }

    // expose public methods
    Object.assign(proxy, { set, setByOffset });

    return () => {
      const contentStart = [];
      const contentEnd = [];
      let contentMiddle;

      if (boundaryLinksProp.value === true) {
        contentStart.push(
          getBtn({
            key: 'bls',
            disable: props.disable || props.modelValue <= minProp.value,
            icon: icons.value[ 0 ]
          }, minProp.value)
        );

        contentEnd.unshift(
          getBtn({
            key: 'ble',
            disable: props.disable || props.modelValue >= maxProp.value,
            icon: icons.value[ 3 ]
          }, maxProp.value)
        );
      }

      if (directionLinksProp.value === true) {
        contentStart.push(
          getBtn({
            key: 'bdp',
            disable: props.disable || props.modelValue <= minProp.value,
            icon: icons.value[ 1 ]
          }, props.modelValue - 1)
        );

        contentEnd.unshift(
          getBtn({
            key: 'bdn',
            disable: props.disable || props.modelValue >= maxProp.value,
            icon: icons.value[ 2 ]
          }, props.modelValue + 1)
        );
      }

      if (props.input !== true) { // has buttons instead of inputbox
        contentMiddle = [];
        const { pgFrom, pgTo, marginalStyle: style } = btnConfig.value;

        if (btnConfig.value.boundaryStart === true) {
          const active = minProp.value === props.modelValue;
          contentStart.push(
            getBtn({
              key: 'bns',
              style,
              disable: props.disable,
              label: minProp.value
            }, minProp.value, active)
          );
        }

        if (btnConfig.value.boundaryEnd === true) {
          const active = maxProp.value === props.modelValue;
          contentEnd.unshift(
            getBtn({
              key: 'bne',
              style,
              disable: props.disable,
              label: maxProp.value
            }, maxProp.value, active)
          );
        }

        if (btnConfig.value.ellipsesStart === true) {
          contentStart.push(
            getBtn({
              key: 'bes',
              style,
              disable: props.disable,
              label: '…',
              ripple: false
            }, pgFrom - 1)
          );
        }

        if (btnConfig.value.ellipsesEnd === true) {
          contentEnd.unshift(
            getBtn({
              key: 'bee',
              style,
              disable: props.disable,
              label: '…',
              ripple: false
            }, pgTo + 1)
          );
        }

        for (let i = pgFrom; i <= pgTo; i++) {
          contentMiddle.push(
            getBtn({
              key: `bpg${ i }`,
              style,
              disable: props.disable,
              label: i
            }, i, i === props.modelValue)
          );
        }
      }

      return h('div', {
        class: classes.value,
        ...attrs.value
      }, [
        h('div', {
          class: 'q-pagination__content row no-wrap items-center',
          style: gutterStyle.value
        }, [
          ...contentStart,

          props.input === true
            ? h(QInput, {
              class: 'inline',
              style: { width: `${ inputPlaceholder.value.length / 1.5 }em` },
              type: 'number',
              dense: true,
              value: newPage.value,
              disable: props.disable,
              dark: isDark.value,
              borderless: true,
              inputClass: props.inputClass,
              inputStyle: props.inputStyle,
              placeholder: inputPlaceholder.value,
              min: minProp.value,
              max: maxProp.value,
              ...inputEvents.value
            })
            : h('div', {
              class: 'q-pagination__middle row justify-center'
            }, contentMiddle),

          ...contentEnd
        ])
      ])
    }
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[testId]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const testId = ref(Number(route.params.testId));
    useHead({
      title: "\u554F\u984C\u56DE\u7B54 | SE\u77E5\u898B\u30C6\u30B9\u30C8",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    });
    const quizes = quizJson.main.map((e) => {
      if (e.id === testId.value) {
        return e.quizes;
      }
    }).filter((e) => e)[0];
    const quizTabs = ref(String(quizes[0].id));
    console.log(quizTabs.value);
    const currentPage = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_tabs = __nuxt_component_0;
      const _component_q_tab = __nuxt_component_1;
      const _component_q_separator = __nuxt_component_2;
      const _component_q_tab_panels = __nuxt_component_3;
      const _component_q_tab_panel = __nuxt_component_4;
      const _component_q_radio = __nuxt_component_5;
      const _component_q_btn = __nuxt_component_1$1;
      const _component_q_pagination = __nuxt_component_7;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="row justify-center q-pa-md"><div class="main_menu"><!--[-->`);
      ssrRenderList(unref(quizes), (tab) => {
        _push(ssrRenderComponent(_component_q_tabs, {
          modelValue: quizTabs.value,
          "onUpdate:modelValue": ($event) => quizTabs.value = $event,
          dense: "",
          class: "text-grey",
          "active-color": "primary",
          "indicator-color": "primary",
          align: "justify",
          "narrow-indicator": "",
          style: { "display": "none" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_q_tab, {
                name: tab.id,
                label: tab.id
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_q_tab, {
                  name: tab.id,
                  label: tab.id
                }, null, 8, ["name", "label"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_q_separator, null, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(quizes), (tab) => {
        _push(ssrRenderComponent(_component_q_tab_panels, {
          modelValue: quizTabs.value,
          "onUpdate:modelValue": ($event) => quizTabs.value = $event
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_q_tab_panel, {
                name: tab.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b, _c, _d;
                  if (_push3) {
                    _push3(`<div class="text-h6"${_scopeId2}>Q.${ssrInterpolate(tab.id)}</div><div class="text-h6"${_scopeId2}>${ssrInterpolate(tab.question)}</div><div class="q-pa-lg"${_scopeId2}><div style="${ssrRenderStyle(tab.answer === "1" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;")}" class="row items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_radio, {
                      modelValue: tab.answer,
                      "onUpdate:modelValue": ($event) => tab.answer = $event,
                      "checked-icon": "task_alt",
                      "unchecked-icon": "panorama_fish_eye",
                      val: tab.value1
                    }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}>${(_a = tab.option1) != null ? _a : ""}</div></div><div style="${ssrRenderStyle(tab.answer === "2" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;")}" class="row items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_radio, {
                      modelValue: tab.answer,
                      "onUpdate:modelValue": ($event) => tab.answer = $event,
                      "checked-icon": "task_alt",
                      "unchecked-icon": "panorama_fish_eye",
                      val: tab.value2
                    }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}>${(_b = tab.option2) != null ? _b : ""}</div></div><div style="${ssrRenderStyle(tab.answer === "3" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;")}" class="row items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_radio, {
                      modelValue: tab.answer,
                      "onUpdate:modelValue": ($event) => tab.answer = $event,
                      "checked-icon": "task_alt",
                      "unchecked-icon": "panorama_fish_eye",
                      val: tab.value3
                    }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}>${(_c = tab.option3) != null ? _c : ""}</div></div><div style="${ssrRenderStyle(tab.answer === "4" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;")}" class="row items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_radio, {
                      modelValue: tab.answer,
                      "onUpdate:modelValue": ($event) => tab.answer = $event,
                      "checked-icon": "task_alt",
                      "unchecked-icon": "panorama_fish_eye",
                      val: tab.value4
                    }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}>${(_d = tab.option4) != null ? _d : ""}</div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-h6" }, "Q." + toDisplayString(tab.id), 1),
                      createVNode("div", { class: "text-h6" }, toDisplayString(tab.question), 1),
                      createVNode("div", { class: "q-pa-lg" }, [
                        createVNode("div", {
                          style: tab.answer === "1" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;",
                          class: "row items-center"
                        }, [
                          createVNode(_component_q_radio, {
                            modelValue: tab.answer,
                            "onUpdate:modelValue": ($event) => tab.answer = $event,
                            "checked-icon": "task_alt",
                            "unchecked-icon": "panorama_fish_eye",
                            val: tab.value1
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "val"]),
                          createVNode("div", {
                            innerHTML: tab.option1
                          }, null, 8, ["innerHTML"])
                        ], 4),
                        createVNode("div", {
                          style: tab.answer === "2" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;",
                          class: "row items-center"
                        }, [
                          createVNode(_component_q_radio, {
                            modelValue: tab.answer,
                            "onUpdate:modelValue": ($event) => tab.answer = $event,
                            "checked-icon": "task_alt",
                            "unchecked-icon": "panorama_fish_eye",
                            val: tab.value2
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "val"]),
                          createVNode("div", {
                            innerHTML: tab.option2
                          }, null, 8, ["innerHTML"])
                        ], 4),
                        createVNode("div", {
                          style: tab.answer === "3" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;",
                          class: "row items-center"
                        }, [
                          createVNode(_component_q_radio, {
                            modelValue: tab.answer,
                            "onUpdate:modelValue": ($event) => tab.answer = $event,
                            "checked-icon": "task_alt",
                            "unchecked-icon": "panorama_fish_eye",
                            val: tab.value3
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "val"]),
                          createVNode("div", {
                            innerHTML: tab.option3
                          }, null, 8, ["innerHTML"])
                        ], 4),
                        createVNode("div", {
                          style: tab.answer === "4" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;",
                          class: "row items-center"
                        }, [
                          createVNode(_component_q_radio, {
                            modelValue: tab.answer,
                            "onUpdate:modelValue": ($event) => tab.answer = $event,
                            "checked-icon": "task_alt",
                            "unchecked-icon": "panorama_fish_eye",
                            val: tab.value4
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "val"]),
                          createVNode("div", {
                            innerHTML: tab.option4
                          }, null, 8, ["innerHTML"])
                        ], 4)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_q_tab_panel, {
                  name: tab.id
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-h6" }, "Q." + toDisplayString(tab.id), 1),
                    createVNode("div", { class: "text-h6" }, toDisplayString(tab.question), 1),
                    createVNode("div", { class: "q-pa-lg" }, [
                      createVNode("div", {
                        style: tab.answer === "1" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;",
                        class: "row items-center"
                      }, [
                        createVNode(_component_q_radio, {
                          modelValue: tab.answer,
                          "onUpdate:modelValue": ($event) => tab.answer = $event,
                          "checked-icon": "task_alt",
                          "unchecked-icon": "panorama_fish_eye",
                          val: tab.value1
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "val"]),
                        createVNode("div", {
                          innerHTML: tab.option1
                        }, null, 8, ["innerHTML"])
                      ], 4),
                      createVNode("div", {
                        style: tab.answer === "2" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;",
                        class: "row items-center"
                      }, [
                        createVNode(_component_q_radio, {
                          modelValue: tab.answer,
                          "onUpdate:modelValue": ($event) => tab.answer = $event,
                          "checked-icon": "task_alt",
                          "unchecked-icon": "panorama_fish_eye",
                          val: tab.value2
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "val"]),
                        createVNode("div", {
                          innerHTML: tab.option2
                        }, null, 8, ["innerHTML"])
                      ], 4),
                      createVNode("div", {
                        style: tab.answer === "3" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;",
                        class: "row items-center"
                      }, [
                        createVNode(_component_q_radio, {
                          modelValue: tab.answer,
                          "onUpdate:modelValue": ($event) => tab.answer = $event,
                          "checked-icon": "task_alt",
                          "unchecked-icon": "panorama_fish_eye",
                          val: tab.value3
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "val"]),
                        createVNode("div", {
                          innerHTML: tab.option3
                        }, null, 8, ["innerHTML"])
                      ], 4),
                      createVNode("div", {
                        style: tab.answer === "4" ? "background-color: #CCEBFF; border: 5px solid white;" : "background: rgba(0,0,0,.08); border: 5px solid white;",
                        class: "row items-center"
                      }, [
                        createVNode(_component_q_radio, {
                          modelValue: tab.answer,
                          "onUpdate:modelValue": ($event) => tab.answer = $event,
                          "checked-icon": "task_alt",
                          "unchecked-icon": "panorama_fish_eye",
                          val: tab.value4
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "val"]),
                        createVNode("div", {
                          innerHTML: tab.option4
                        }, null, 8, ["innerHTML"])
                      ], 4)
                    ])
                  ]),
                  _: 2
                }, 1032, ["name"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_q_btn, {
        label: "\u6B21\u3078",
        flat: "",
        class: "bg-red-6 text-white",
        style: { "float": "right" }
      }, null, _parent));
      _push(`</div><div class="q-pa-lg flex flex-center">`);
      _push(ssrRenderComponent(_component_q_pagination, {
        modelValue: currentPage.value,
        "onUpdate:modelValue": ($event) => currentPage.value = $event,
        max: 5,
        input: "",
        color: "red-6",
        "input-class": "text-black text-bold"
      }, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test/[testId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_testId_-B0TNChaw.mjs.map
