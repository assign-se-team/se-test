import { _ as __nuxt_component_0$1 } from './nuxt-link-Duvjf_-f.mjs';
import { h, withDirectives, computed, getCurrentInstance, ref, onBeforeUnmount, Transition, onDeactivated, nextTick, watch, onMounted, defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { c as createComponent, a as createDirective, s as stopAndPrevent, p as prevent, d as stop, l as listenOpts, H as History, n as noop, b as client, h as getEventPath } from './server.mjs';

function shouldIgnoreKey (evt) {
  return evt !== Object(evt)
    || evt.isComposing === true
    || evt.qKeyEvent === true
}

function isKeyCode (evt, keyCodes) {
  return shouldIgnoreKey(evt) === true
    ? false
    : [].concat(keyCodes).includes(evt.keyCode)
}

function hSlot (slot, otherwise) {
  return slot !== void 0
    ? slot() || otherwise
    : otherwise
}

function hUniqueSlot (slot, otherwise) {
  if (slot !== void 0) {
    const vnode = slot();
    if (vnode !== void 0 && vnode !== null) {
      return vnode.slice()
    }
  }

  return otherwise
}

/**
 * Source definitely exists,
 * so it's merged with the possible slot
 */
function hMergeSlot (slot, source) {
  return slot !== void 0
    ? source.concat(slot())
    : source
}

/*
 * (String)  key       - unique vnode key
 * (Boolean) condition - should change ONLY when adding/removing directive
 */
function hDir (
  tag,
  data,
  children,
  key,
  condition,
  getDirsFn
) {
  data.key = key + condition;

  const vnode = h(tag, data, children);

  return condition === true
    ? withDirectives(vnode, getDirsFn())
    : vnode
}

const __nuxt_component_0 = createComponent({
  name: 'QToolbar',

  props: {
    inset: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-toolbar row no-wrap items-center'
      + (props.inset === true ? ' q-toolbar--inset' : '')
    );

    return () => h('div', { class: classes.value, role: 'toolbar' }, hSlot(slots.default))
  }
});

const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};

const useSizeProps = {
  size: String
};

function useSize (props, sizes = useSizeDefaults) {
  // return sizeStyle
  return computed(() => (
    props.size !== void 0
      ? { fontSize: props.size in sizes ? `${ sizes[ props.size ] }px` : props.size }
      : null
  ))
}

const defaultViewBox = '0 0 24 24';

const sameFn = i => i;
const ionFn = i => `ionicons ${ i }`;

const libMap = {
  'mdi-': i => `mdi ${ i }`,
  'icon-': sameFn, // fontawesome equiv
  'bt-': i => `bt ${ i }`,
  'eva-': i => `eva ${ i }`,
  'ion-md': ionFn,
  'ion-ios': ionFn,
  'ion-logo': ionFn,
  'iconfont ': sameFn,
  'ti-': i => `themify-icon ${ i }`,
  'bi-': i => `bootstrap-icons ${ i }`
};

const matMap = {
  o_: '-outlined',
  r_: '-round',
  s_: '-sharp'
};

const symMap = {
  sym_o_: '-outlined',
  sym_r_: '-rounded',
  sym_s_: '-sharp'
};

const libRE = new RegExp('^(' + Object.keys(libMap).join('|') + ')');
const matRE = new RegExp('^(' + Object.keys(matMap).join('|') + ')');
const symRE = new RegExp('^(' + Object.keys(symMap).join('|') + ')');
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;

const QIcon = createComponent({
  name: 'QIcon',

  props: {
    ...useSizeProps,

    tag: {
      type: String,
      default: 'i'
    },

    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },

  setup (props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);

    const classes = computed(() =>
      'q-icon'
      + (props.left === true ? ' on-left' : '') // TODO Qv3: drop this
      + (props.right === true ? ' on-right' : '')
      + (props.color !== void 0 ? ` text-${ props.color }` : '')
    );

    const type = computed(() => {
      let cls;
      let icon = props.name;

      if (icon === 'none' || !icon) {
        return { none: true }
      }

      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === 'none' || !icon) {
              return { none: true }
            }
          }
          else {
            return {
              cls: res.cls,
              content: res.content !== void 0
                ? res.content
                : ' '
            }
          }
        }
      }

      if (mRE.test(icon) === true) {
        const [ def, viewBox = defaultViewBox ] = icon.split('|');

        return {
          svg: true,
          viewBox,
          nodes: def.split('&&').map(path => {
            const [ d, style, transform ] = path.split('@@');
            return h('path', { style, d, transform })
          })
        }
      }

      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        }
      }

      if (svgUseRE.test(icon) === true) {
        const [ def, viewBox = defaultViewBox ] = icon.split('|');

        return {
          svguse: true,
          src: def.substring(7),
          viewBox
        }
      }

      let content = ' ';
      const matches = icon.match(libRE);

      if (matches !== null) {
        cls = libMap[ matches[ 1 ] ](icon);
      }
      else if (faRE.test(icon) === true) {
        cls = icon;
      }
      else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${ $q.platform.is.ios === true ? 'ios' : 'md' }${ icon.substring(3) }`;
      }
      else if (symRE.test(icon) === true) {
        // "notranslate" class is for Google Translate
        // to avoid tampering with Material Symbols ligature font
        //
        // Caution: To be able to add suffix to the class name,
        // keep the 'material-symbols' at the end of the string.
        cls = 'notranslate material-symbols';

        const matches = icon.match(symRE);
        if (matches !== null) {
          icon = icon.substring(6);
          cls += symMap[ matches[ 1 ] ];
        }

        content = icon;
      }
      else {
        // "notranslate" class is for Google Translate
        // to avoid tampering with Material Icons ligature font
        //
        // Caution: To be able to add suffix to the class name,
        // keep the 'material-icons' at the end of the string.
        cls = 'notranslate material-icons';

        const matches = icon.match(matRE);
        if (matches !== null) {
          icon = icon.substring(2);
          cls += matMap[ matches[ 1 ] ];
        }

        content = icon;
      }

      return {
        cls,
        content
      }
    });

    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        'aria-hidden': 'true',
        role: 'presentation'
      };

      if (type.value.none === true) {
        return h(props.tag, data, hSlot(slots.default))
      }

      if (type.value.img === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('img', { src: type.value.src })
        ]))
      }

      if (type.value.svg === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('svg', {
            viewBox: type.value.viewBox || '0 0 24 24'
          }, type.value.nodes)
        ]))
      }

      if (type.value.svguse === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('svg', {
            viewBox: type.value.viewBox
          }, [
            h('use', { 'xlink:href': type.value.src })
          ])
        ]))
      }

      if (type.value.cls !== void 0) {
        data.class += ' ' + type.value.cls;
      }

      return h(props.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]))
    }
  }
});

const useSpinnerProps = {
  size: {
    type: [ String, Number ],
    default: '1em'
  },
  color: String
};

function useSpinner (props) {
  return {
    cSize: computed(() => (
      props.size in useSizeDefaults
        ? `${ useSizeDefaults[ props.size ] }px`
        : props.size
    )),

    classes: computed(() =>
      'q-spinner' + (props.color ? ` text-${ props.color }` : '')
    )
  }
}

const QSpinner = createComponent({
  name: 'QSpinner',

  props: {
    ...useSpinnerProps,

    thickness: {
      type: Number,
      default: 5
    }
  },

  setup (props) {
    const { cSize, classes } = useSpinner(props);

    return () => h('svg', {
      class: classes.value + ' q-spinner-mat',
      width: cSize.value,
      height: cSize.value,
      viewBox: '25 25 50 50'
    }, [
      h('circle', {
        class: 'path',
        cx: '50',
        cy: '50',
        r: '20',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': props.thickness,
        'stroke-miterlimit': '10'
      })
    ])
  }
});

// internal
function childHasFocus (el, focusedEl) {
  if (el === void 0 || el === null || el.contains(focusedEl) === true) {
    return true
  }

  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true
    }
  }

  return false
}

const getSSRProps = () => ({});

const Ripple = createDirective({ name: 'ripple', getSSRProps }
  
);

const alignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
  between: 'between',
  around: 'around',
  evenly: 'evenly',
  stretch: 'stretch'
};

const alignValues = Object.keys(alignMap);

const useAlignProps = {
  align: {
    type: String,
    validator: v => alignValues.includes(v)
  }
};

function useAlign (props) {
  // return alignClass
  return computed(() => {
    const align = props.align === void 0
      ? props.vertical === true ? 'stretch' : 'left'
      : props.align;

    return `${ props.vertical === true ? 'items' : 'justify' }-${ alignMap[ align ] }`
  })
}

// copied to docs too

function fillNormalizedVNodes (children, vnode) {
  if (typeof vnode.type === 'symbol') {
    if (Array.isArray(vnode.children) === true) {
      vnode.children.forEach(child => {
        fillNormalizedVNodes(children, child);
      });
    }
  }
  else {
    children.add(vnode);
  }
}

// vnodes from rendered in advanced slots
function getNormalizedVNodes (vnodes) {
  const children = new Set();

  vnodes.forEach(vnode => {
    fillNormalizedVNodes(children, vnode);
  });

  return Array.from(children)
}

function vmHasRouter (vm) {
  return vm.appContext.config.globalProperties.$router !== void 0
}

function vmIsDestroyed (vm) {
  return vm.isUnmounted === true || vm.isDeactivated === true
}

/*
 * Inspired by RouterLink from Vue Router
 *  --> API should match!
 */


// Get the original path value of a record by following its aliasOf
function getOriginalPath (record) {
  return record
    ? (
        record.aliasOf
          ? record.aliasOf.path
          : record.path
      ) : ''
}

function isSameRouteRecord (a, b) {
  // since the original record has an undefined value for aliasOf
  // but all aliases point to the original record, this will always compare
  // the original record
  return (a.aliasOf || a) === (b.aliasOf || b)
}

function includesParams (outer, inner) {
  for (const key in inner) {
    const
      innerValue = inner[ key ],
      outerValue = outer[ key ];

    if (typeof innerValue === 'string') {
      if (innerValue !== outerValue) {
        return false
      }
    }
    else if (
      Array.isArray(outerValue) === false
      || outerValue.length !== innerValue.length
      || innerValue.some((value, i) => value !== outerValue[ i ])
    ) {
      return false
    }
  }

  return true
}

function isEquivalentArray (a, b) {
  return Array.isArray(b) === true
    ? a.length === b.length && a.every((value, i) => value === b[ i ])
    : a.length === 1 && a[ 0 ] === b
}

function isSameRouteLocationParamsValue (a, b) {
  return Array.isArray(a) === true
    ? isEquivalentArray(a, b)
    : (
        Array.isArray(b) === true
          ? isEquivalentArray(b, a)
          : a === b
      )
}

function isSameRouteLocationParams (a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }

  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[ key ], b[ key ]) === false) {
      return false
    }
  }

  return true
}

const useRouterLinkNonMatchingProps = {
  // router-link
  to: [ String, Object ],
  replace: Boolean,

  // regular <a> link
  href: String,
  target: String,

  // state
  disable: Boolean
};

const useRouterLinkProps = {
  ...useRouterLinkNonMatchingProps,

  // router-link
  exact: Boolean,
  activeClass: {
    type: String,
    default: 'q-router-link--active'
  },
  exactActiveClass: {
    type: String,
    default: 'q-router-link--exact-active'
  }
};

// external props: type, tag

function useRouterLink ({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
  const vm = getCurrentInstance();
  const { props, proxy, emit } = vm;

  const hasRouter = vmHasRouter(vm);
  const hasHrefLink = computed(() => props.disable !== true && props.href !== void 0);

  // for perf reasons, we use minimum amount of runtime work
  const hasRouterLinkProps = useDisableForRouterLinkProps === true
    ? computed(() =>
      hasRouter === true
      && props.disable !== true
      && hasHrefLink.value !== true
      && props.to !== void 0 && props.to !== null && props.to !== ''
    )
    : computed(() =>
      hasRouter === true
      && hasHrefLink.value !== true
      && props.to !== void 0 && props.to !== null && props.to !== ''
    );

  const resolvedLink = computed(() => (
    hasRouterLinkProps.value === true
      ? getLink(props.to)
      : null
  ));

  const hasRouterLink = computed(() => resolvedLink.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);

  const linkTag = computed(() => (
    props.type === 'a' || hasLink.value === true
      ? 'a'
      : (props.tag || fallbackTag || 'div')
  ));

  const linkAttrs = computed(() => (
    hasHrefLink.value === true
      ? {
          href: props.href,
          target: props.target
        }
      : (
          hasRouterLink.value === true
            ? {
                href: resolvedLink.value.href,
                target: props.target
              }
            : {}
        )
  ));

  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return -1
    }

    const
      { matched } = resolvedLink.value,
      { length } = matched,
      routeMatched = matched[ length - 1 ];

    if (routeMatched === void 0) {
      return -1
    }

    const currentMatched = proxy.$route.matched;

    if (currentMatched.length === 0) {
      return -1
    }

    const index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );

    if (index !== -1) {
      return index
    }

    // possible parent record
    const parentRecordPath = getOriginalPath(matched[ length - 2 ]);

    return (
      // we are dealing with nested routes
      length > 1
      // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      && getOriginalPath(routeMatched) === parentRecordPath
      // avoid comparing the child with its parent
      && currentMatched[ currentMatched.length - 1 ].path !== parentRecordPath
        ? currentMatched.findIndex(
          isSameRouteRecord.bind(null, matched[ length - 2 ])
        )
        : index
    )
  });

  const linkIsActive = computed(() =>
    hasRouterLink.value === true
    && linkActiveIndex.value !== -1
    && includesParams(proxy.$route.params, resolvedLink.value.params)
  );

  const linkIsExactActive = computed(() =>
    linkIsActive.value === true
      && linkActiveIndex.value === proxy.$route.matched.length - 1
      && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params)
  );

  const linkClass = computed(() => (
    hasRouterLink.value === true
      ? (
          linkIsExactActive.value === true
            ? ` ${ props.exactActiveClass } ${ props.activeClass }`
            : (
                props.exact === true
                  ? ''
                  : (linkIsActive.value === true ? ` ${ props.activeClass }` : '')
              )
        )
      : ''
  ));

  function getLink (to) {
    try { return proxy.$router.resolve(to) }
    catch (_) {}

    return null
  }

  /**
   * @returns Promise<RouterError | false | undefined>
   */
  function navigateToRouterLink (
    e,
    { returnRouterError, to = props.to, replace = props.replace } = {}
  ) {
    if (props.disable === true) {
      // ensure native navigation is prevented in all cases,
      // like when useDisableForRouterLinkProps === false (QRouteTab)
      e.preventDefault();
      return Promise.resolve(false)
    }

    if (
      // don't redirect with control keys;
      // should match RouterLink from Vue Router
      e.metaKey || e.altKey || e.ctrlKey || e.shiftKey

      // don't redirect on right click
      || (e.button !== void 0 && e.button !== 0)

      // don't redirect if it should open in a new window
      || props.target === '_blank'
    ) {
      return Promise.resolve(false)
    }

    // hinder the native navigation
    e.preventDefault();

    // then() can also return a "soft" router error (Vue Router behavior)
    const promise = proxy.$router[ replace === true ? 'replace' : 'push' ](to);

    return returnRouterError === true
      ? promise
      // else catching hard errors and also "soft" ones - then(err => ...)
      : promise.then(() => {}).catch(() => {})
  }

  // warning! ensure that the component using it has 'click' included in its 'emits' definition prop
  function navigateOnClick (e) {
    if (hasRouterLink.value === true) {
      const go = opts => navigateToRouterLink(e, opts);

      emit('click', e, go);
      e.defaultPrevented !== true && go();
    }
    else {
      emit('click', e);
    }
  }

  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,

    linkTag,
    resolvedLink,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkAttrs,

    getLink,
    navigateToRouterLink,
    navigateOnClick
  }
}

const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};

const formTypes = [ 'button', 'submit', 'reset' ];
const mediaTypeRE = /[^\s]\/[^\s]/;

const btnDesignOptions = [ 'flat', 'outline', 'push', 'unelevated' ];

function getBtnDesign (props, defaultValue) {
  if (props.flat === true) return 'flat'
  if (props.outline === true) return 'outline'
  if (props.push === true) return 'push'
  if (props.unelevated === true) return 'unelevated'
  return defaultValue
}

const nonRoundBtnProps = {
  ...useSizeProps,
  ...useRouterLinkNonMatchingProps,

  type: {
    type: String,
    default: 'button'
  },

  label: [ Number, String ],
  icon: String,
  iconRight: String,

  ...btnDesignOptions.reduce(
    (acc, val) => (acc[ val ] = Boolean) && acc,
    {}
  ),

  square: Boolean,
  rounded: Boolean,
  glossy: Boolean,

  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,

  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,

  tabindex: [ Number, String ],

  ripple: {
    type: [ Boolean, Object ],
    default: true
  },

  align: {
    ...useAlignProps.align,
    default: 'center'
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};

const useBtnProps = {
  ...nonRoundBtnProps,
  round: Boolean
};

function useBtn (props) {
  const sizeStyle = useSize(props, defaultSizes);
  const alignClass = useAlign(props);
  const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({
    fallbackTag: 'button'
  });

  const style = computed(() => {
    const obj = props.fab === false && props.fabMini === false
      ? sizeStyle.value
      : {};

    return props.padding !== void 0
      ? Object.assign({}, obj, {
        padding: props.padding
          .split(/\s+/)
          .map(v => (v in btnPadding ? btnPadding[ v ] + 'px' : v))
          .join(' '),
        minWidth: '0',
        minHeight: '0'
      })
      : obj
  });

  const isRounded = computed(() =>
    props.rounded === true || props.fab === true || props.fabMini === true
  );

  const isActionable = computed(() =>
    props.disable !== true && props.loading !== true
  );

  const tabIndex = computed(() => (
    isActionable.value === true ? props.tabindex || 0 : -1
  ));

  const design = computed(() => getBtnDesign(props, 'standard'));

  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };

    if (hasLink.value === true) {
      Object.assign(acc, linkAttrs.value);
    }
    else if (formTypes.includes(props.type) === true) {
      acc.type = props.type;
    }

    if (linkTag.value === 'a') {
      if (props.disable === true) {
        acc[ 'aria-disabled' ] = 'true';
      }
      else if (acc.href === void 0) {
        acc.role = 'button';
      }

      if (hasRouterLink.value !== true && mediaTypeRE.test(props.type) === true) {
        acc.type = props.type;
      }
    }
    else if (props.disable === true) {
      acc.disabled = '';
      acc[ 'aria-disabled' ] = 'true';
    }

    if (props.loading === true && props.percentage !== void 0) {
      Object.assign(acc, {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': props.percentage
      });
    }

    return acc
  });

  const classes = computed(() => {
    let colors;

    if (props.color !== void 0) {
      if (props.flat === true || props.outline === true) {
        colors = `text-${ props.textColor || props.color }`;
      }
      else {
        colors = `bg-${ props.color } text-${ props.textColor || 'white' }`;
      }
    }
    else if (props.textColor) {
      colors = `text-${ props.textColor }`;
    }

    const shape = props.round === true
      ? 'round'
      : `rectangle${ isRounded.value === true ? ' q-btn--rounded' : (props.square === true ? ' q-btn--square' : '') }`;

    return `q-btn--${ design.value } q-btn--${ shape }`
      + (colors !== void 0 ? ' ' + colors : '')
      + (isActionable.value === true ? ' q-btn--actionable q-focusable q-hoverable' : (props.disable === true ? ' disabled' : ''))
      + (props.fab === true ? ' q-btn--fab' : (props.fabMini === true ? ' q-btn--fab-mini' : ''))
      + (props.noCaps === true ? ' q-btn--no-uppercase' : '')
      + (props.dense === true ? ' q-btn--dense' : '')
      + (props.stretch === true ? ' no-border-radius self-stretch' : '')
      + (props.glossy === true ? ' glossy' : '')
      + (props.square ? ' q-btn--square' : '')
  });

  const innerClasses = computed(() =>
    alignClass.value + (props.stack === true ? ' column' : ' row')
    + (props.noWrap === true ? ' no-wrap text-no-wrap' : '')
    + (props.loading === true ? ' q-btn__content--hidden' : '')
  );

  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasLink,
    linkTag,
    navigateOnClick,
    isActionable
  }
}

const { passiveCapture } = listenOpts;

let
  touchTarget = null,
  keyboardTarget = null,
  mouseTarget = null;

const __nuxt_component_1$1 = createComponent({
  name: 'QBtn',

  props: {
    ...useBtnProps,

    percentage: Number,
    darkPercentage: Boolean,

    onTouchstart: [ Function, Array ]
  },

  emits: [ 'click', 'keydown', 'mousedown', 'keyup' ],

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();

    const {
      classes, style, innerClasses,
      attributes,
      hasLink, linkTag, navigateOnClick,
      isActionable
    } = useBtn(props);

    const rootRef = ref(null);
    const blurTargetRef = ref(null);

    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;

    const hasLabel = computed(() =>
      props.label !== void 0 && props.label !== null && props.label !== ''
    );

    const ripple = computed(() => (
      props.disable === true || props.ripple === false
        ? false
        : {
            keyCodes: hasLink.value === true ? [ 13, 32 ] : [ 13 ],
            ...(props.ripple === true ? {} : props.ripple)
          }
    ));

    const rippleProps = computed(() => ({ center: props.round }));

    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props.percentage));
      return val > 0
        ? { transition: 'transform 0.6s', transform: `translateX(${ val - 100 }%)` }
        : {}
    });

    const onEvents = computed(() => {
      if (props.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstart: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        }
      }

      if (isActionable.value === true) {
        const acc = {
          onClick,
          onKeydown,
          onMousedown
        };

        if (proxy.$q.platform.has.touch === true) {
          const suffix = props.onTouchstart !== void 0
            ? ''
            : 'Passive';

          acc[ `onTouchstart${ suffix }` ] = onTouchstart;
        }

        return acc
      }

      return {
        // needed; especially for disabled <a> tags
        onClick: stopAndPrevent
      }
    });

    const nodeProps = computed(() => ({
      ref: rootRef,
      class: 'q-btn q-btn-item non-selectable no-outline ' + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));

    function onClick (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      if (e !== void 0) {
        if (e.defaultPrevented === true) {
          return
        }

        const el = document.activeElement;
        // focus button if it came from ENTER on form
        // prevent the new submit (already done)
        if (
          props.type === 'submit'
          && el !== document.body
          && rootRef.value.contains(el) === false
          // required for iOS and desktop Safari
          && el.contains(rootRef.value) === false
        ) {
          rootRef.value.focus();

          const onClickCleanup = () => {
            document.removeEventListener('keydown', stopAndPrevent, true);
            document.removeEventListener('keyup', onClickCleanup, passiveCapture);
            rootRef.value !== null && rootRef.value.removeEventListener('blur', onClickCleanup, passiveCapture);
          };

          document.addEventListener('keydown', stopAndPrevent, true);
          document.addEventListener('keyup', onClickCleanup, passiveCapture);
          rootRef.value.addEventListener('blur', onClickCleanup, passiveCapture);
        }
      }

      navigateOnClick(e);
    }

    function onKeydown (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      emit('keydown', e);

      if (isKeyCode(e, [ 13, 32 ]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();

        if (e.defaultPrevented !== true) {
          // focus external button if the focus helper was focused before
          rootRef.value.focus();

          keyboardTarget = rootRef.value;
          rootRef.value.classList.add('q-btn--active');
          document.addEventListener('keyup', onPressEnd, true);
          rootRef.value.addEventListener('blur', onPressEnd, passiveCapture);
        }

        stopAndPrevent(e);
      }
    }

    function onTouchstart (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      emit('touchstart', e);

      if (e.defaultPrevented === true) return

      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;

        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener('touchcancel', onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener('touchend', onPressEnd, passiveCapture);
      }

      // avoid duplicated mousedown event
      // triggering another early ripple
      avoidMouseRipple = true;
      mouseTimer !== null && clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouseTimer = null;
        avoidMouseRipple = false;
      }, 200);
    }

    function onMousedown (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      e.qSkipRipple = avoidMouseRipple === true;
      emit('mousedown', e);

      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add('q-btn--active');
        document.addEventListener('mouseup', onPressEnd, passiveCapture);
      }
    }

    function onPressEnd (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      // needed for IE (because it emits blur when focusing button from focus helper)
      if (e !== void 0 && e.type === 'blur' && document.activeElement === rootRef.value) {
        return
      }

      if (e !== void 0 && e.type === 'keyup') {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [ 13, 32 ]) === true) {
          // for click trigger
          const evt = new MouseEvent('click', e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);

          stopAndPrevent(e);

          // for ripple
          e.qKeyEvent = true;
        }

        emit('keyup', e);
      }

      cleanup();
    }

    function cleanup (destroying) {
      const blurTarget = blurTargetRef.value;

      if (
        destroying !== true
        && (touchTarget === rootRef.value || mouseTarget === rootRef.value)
        && blurTarget !== null
        && blurTarget !== document.activeElement
      ) {
        blurTarget.setAttribute('tabindex', -1);
        blurTarget.focus();
      }

      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener('touchcancel', onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener('touchend', onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }

      if (mouseTarget === rootRef.value) {
        document.removeEventListener('mouseup', onPressEnd, passiveCapture);
        mouseTarget = null;
      }

      if (keyboardTarget === rootRef.value) {
        document.removeEventListener('keyup', onPressEnd, true);
        rootRef.value !== null && rootRef.value.removeEventListener('blur', onPressEnd, passiveCapture);
        keyboardTarget = null;
      }

      rootRef.value !== null && rootRef.value.classList.remove('q-btn--active');
    }

    function onLoadingEvt (evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }

    onBeforeUnmount(() => {
      cleanup(true);
    });

    // expose public methods
    Object.assign(proxy, {
      click: e => {
        if (isActionable.value === true) {
          onClick(e);
        }
      }
    });

    return () => {
      let inner = [];

      props.icon !== void 0 && inner.push(
        h(QIcon, {
          name: props.icon,
          left: props.stack !== true && hasLabel.value === true,
          role: 'img'
        })
      );

      hasLabel.value === true && inner.push(
        h('span', { class: 'block' }, [ props.label ])
      );

      inner = hMergeSlot(slots.default, inner);

      if (props.iconRight !== void 0 && props.round === false) {
        inner.push(
          h(QIcon, {
            name: props.iconRight,
            right: props.stack !== true && hasLabel.value === true,
            role: 'img'
          })
        );
      }

      const child = [
        h('span', {
          class: 'q-focus-helper',
          ref: blurTargetRef
        })
      ];

      if (props.loading === true && props.percentage !== void 0) {
        child.push(
          h('span', {
            class: 'q-btn__progress absolute-full overflow-hidden' + (props.darkPercentage === true ? ' q-btn__progress--dark' : '')
          }, [
            h('span', {
              class: 'q-btn__progress-indicator fit block',
              style: percentageStyle.value
            })
          ])
        );
      }

      child.push(
        h('span', {
          class: 'q-btn__content text-center col items-center q-anchor--skip ' + innerClasses.value
        }, inner)
      );

      props.loading !== null && child.push(
        h(Transition, {
          name: 'q-transition--fade'
        }, () => (
          props.loading === true
            ? [
                h('span', {
                  key: 'loading',
                  class: 'absolute-full flex flex-center'
                }, slots.loading !== void 0 ? slots.loading() : [ h(QSpinner) ])
              ]
            : null
        ))
      );

      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [ [
          Ripple,
          ripple.value,
          void 0,
          rippleProps.value
        ] ]
      )
    }
  }
});

function useHistory (showing, hide, hideOnRouteChange) {
  let historyEntry;

  function removeFromHistory () {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }

  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });

  return {
    removeFromHistory,

    addToHistory () {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };

      History.add(historyEntry);
    }
  }
}

/*
 * Usage:
 *    registerTimeout(fn[, delay])
 *    removeTimeout()
 */

function useTimeout () {
  let timer = null;
  const vm = getCurrentInstance();

  function removeTimeout () {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);

  return {
    removeTimeout,

    registerTimeout (fn, delay) {
      removeTimeout();

      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null;
          fn();
        }, delay);
      }
    }
  }
}

/*
 * Usage:
 *    registerTick(fn)
 *    removeTick()
 */

function useTick () {
  let tickFn;
  const vm = getCurrentInstance();

  function removeTick () {
    tickFn = void 0;
  }

  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);

  return {
    removeTick,

    registerTick (fn) {
      tickFn = fn;

      nextTick(() => {
        if (tickFn === fn) {
          // we also check if VM is destroyed, since if it
          // got to trigger one nextTick() we cannot stop it
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  }
}

const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },

  'onUpdate:modelValue': [ Function, Array ]
};

const useModelToggleEmits = [
  'beforeShow', 'show', 'beforeHide', 'hide'
];

// handleShow/handleHide -> removeTick(), self (& emit show)

function useModelToggle ({
  showing,
  canShow, // optional
  hideOnRouteChange, // optional
  handleShow, // optional
  handleHide, // optional
  processOnMount // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;

  let payload;

  function toggle (evt) {
    if (showing.value === true) ;
    else {
      show(evt);
    }
  }

  function show (evt) {
    if (
      props.disable === true
      || (evt !== void 0 && evt.qAnchorHandled === true)
      || (canShow !== void 0 && canShow(evt) !== true)
    ) {
      return
    }

    const listener = props[ 'onUpdate:modelValue' ] !== void 0;

    if (listener === true && true !== true) {
      emit('update:modelValue', true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }

    if (props.modelValue === null || listener === false || true) {
      processShow(evt);
    }
  }

  function processShow (evt) {
    if (showing.value === true) {
      return
    }

    showing.value = true;

    emit('beforeShow', evt);

    if (handleShow !== void 0) {
      handleShow(evt);
    }
    else {
      emit('show', evt);
    }
  }

  function hide (evt) {
    {
      return
    }
  }

  function processHide (evt) {
    if (showing.value === false) {
      return
    }

    showing.value = false;

    emit('beforeHide', evt);

    if (handleHide !== void 0) {
      handleHide(evt);
    }
    else {
      emit('hide', evt);
    }
  }

  function processModelChange (val) {
    if (props.disable === true && val === true) {
      if (props[ 'onUpdate:modelValue' ] !== void 0) {
        emit('update:modelValue', false);
      }
    }
    else if ((val === true) !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }

  watch(() => props.modelValue, processModelChange);

  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) ;
    });
  }

  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });

  // expose public methods
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);

  return publicMethods
}

const useTransitionProps = {
  transitionShow: {
    type: String,
    default: 'fade'
  },

  transitionHide: {
    type: String,
    default: 'fade'
  },

  transitionDuration: {
    type: [ String, Number ],
    default: 300
  }
};

function useTransition (props, defaultShowFn = () => {}, defaultHideFn = () => {}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${ props.transitionShow || defaultShowFn() }`;
      const hide = `q-transition--${ props.transitionHide || defaultHideFn() }`;

      return {
        appear: true,

        enterFromClass: `${ show }-enter-from`,
        enterActiveClass: `${ show }-enter-active`,
        enterToClass: `${ show }-enter-to`,

        leaveFromClass: `${ hide }-leave-from`,
        leaveActiveClass: `${ hide }-leave-active`,
        leaveToClass: `${ hide }-leave-to`
      }
    }),

    transitionStyle: computed(() => `--q-transition-duration: ${ props.transitionDuration }ms`)
  }
}

let queue = [];
let waitFlags = [];

function addFocusFn (fn) {
  if (waitFlags.length === 0) {
    fn();
  }
  else {
    queue.push(fn);
  }
}

function removeFocusFn (fn) {
  queue = queue.filter(entry => entry !== fn);
}

/**
 * Noop internal component to ease testing
 * of the teleported content.
 *
 * const wrapper = mount(QDialog, { ... })
 * const teleportedWrapper = wrapper.findComponent({ name: 'QPortal' })
 */
createComponent({
  name: 'QPortal',
  setup (_, { slots }) {
    return () => slots.default()
  }
});

// Warning!
// You MUST specify "inheritAttrs: false" in your component

function usePortal (vm, innerRef, renderPortalContent, type) {
  // showing, including while in show/hide transition
  const portalIsActive = ref(false);

  // showing & not in any show/hide transition
  const portalIsAccessible = ref(false);

  {
    return {
      portalIsActive,
      portalIsAccessible,

      showPortal: noop,
      hidePortal: noop,
      renderPortal: noop
    }
  }
}

function getVerticalScrollPosition (scrollTarget) {
  return scrollTarget === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : scrollTarget.scrollTop
}

function getHorizontalScrollPosition (scrollTarget) {
  return scrollTarget === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : scrollTarget.scrollLeft
}

function hasScrollbar (el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false
  }

  return onY
    ? (
        el.scrollHeight > el.clientHeight && (
          el.classList.contains('scroll')
          || el.classList.contains('overflow-auto')
          || [ 'auto', 'scroll' ].includes(window.getComputedStyle(el)[ 'overflow-y' ])
        )
      )
    : (
        el.scrollWidth > el.clientWidth && (
          el.classList.contains('scroll')
          || el.classList.contains('overflow-auto')
          || [ 'auto', 'scroll' ].includes(window.getComputedStyle(el)[ 'overflow-x' ])
        )
      )
}

let
  registered = 0,
  scrollPositionX,
  scrollPositionY,
  maxScrollTop,
  vpPendingUpdate = false,
  bodyLeft,
  bodyTop,
  href,
  closeTimer = null;

function onWheel (e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}

function shouldPreventScroll (e) {
  if (e.target === document.body || e.target.classList.contains('q-layout__backdrop')) {
    return true
  }

  const
    path = getEventPath(e),
    shift = e.shiftKey && !e.deltaX,
    scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    delta = shift || scrollY ? e.deltaY : e.deltaX;

  for (let index = 0; index < path.length; index++) {
    const el = path[ index ];

    if (hasScrollbar(el, scrollY)) {
      return scrollY
        ? (
            delta < 0 && el.scrollTop === 0
              ? true
              : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight
          )
        : (
            delta < 0 && el.scrollLeft === 0
              ? true
              : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth
          )
    }
  }

  return true
}

function onAppleScroll (e) {
  if (e.target === document) {
    // required, otherwise iOS blocks further scrolling
    // until the mobile scrollbar dissappears
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop; // eslint-disable-line
  }
}

function onAppleResize (evt) {
  if (vpPendingUpdate === true) {
    return
  }

  vpPendingUpdate = true;

  requestAnimationFrame(() => {
    vpPendingUpdate = false;

    const
      { height } = evt.target,
      { clientHeight, scrollTop } = document.scrollingElement;

    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }

    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}

function apply (action) {
  const
    body = document.body,
    hasViewport = window.visualViewport !== void 0;

  if (action === 'add') {
    const { overflowY, overflowX } = window.getComputedStyle(body);

    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;

    href = window.location.href;

    body.style.left = `-${ scrollPositionX }px`;
    body.style.top = `-${ scrollPositionY }px`;

    if (overflowX !== 'hidden' && (overflowX === 'scroll' || body.scrollWidth > window.innerWidth)) {
      body.classList.add('q-body--force-scrollbar-x');
    }
    if (overflowY !== 'hidden' && (overflowY === 'scroll' || body.scrollHeight > window.innerHeight)) {
      body.classList.add('q-body--force-scrollbar-y');
    }

    body.classList.add('q-body--prevent-scroll');
    document.qScrollPrevented = true;

    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener('resize', onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener('scroll', onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      }
      else {
        window.addEventListener('scroll', onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }

  if (client.is.desktop === true && client.is.mac === true) {
    // ref. https://developers.google.com/web/updates/2017/01/scrolling-intervention
    window[ `${ action }EventListener` ]('wheel', onWheel, listenOpts.notPassive);
  }

  if (action === 'remove') {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener('resize', onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener('scroll', onAppleResize, listenOpts.passiveCapture);
      }
      else {
        window.removeEventListener('scroll', onAppleScroll, listenOpts.passiveCapture);
      }
    }

    body.classList.remove('q-body--prevent-scroll');
    body.classList.remove('q-body--force-scrollbar-x');
    body.classList.remove('q-body--force-scrollbar-y');

    document.qScrollPrevented = false;

    body.style.left = bodyLeft;
    body.style.top = bodyTop;

    // scroll back only if route has not changed
    if (window.location.href === href) {
      window.scrollTo(scrollPositionX, scrollPositionY);
    }

    maxScrollTop = void 0;
  }
}

function preventScroll (state) {
  let action = 'add';

  if (state === true) {
    registered++;

    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      return
    }

    if (registered > 1) {
      return
    }
  }
  else {
    if (registered === 0) {
      return
    }

    registered--;

    if (registered > 0) {
      return
    }

    action = 'remove';

    if (client.is.ios === true && client.is.nativeMobile === true) {
      closeTimer !== null && clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = null;
      }, 100);
      return
    }
  }

  apply(action);
}

function usePreventScroll () {
  let currentState;

  return {
    preventBodyScroll (state) {
      if (
        state !== currentState
        && (currentState !== void 0 || state === true)
      ) {
        currentState = state;
        preventScroll(state);
      }
    }
  }
}

const handlers$1 = [];
let escDown;

function onKeydown (evt) {
  escDown = evt.keyCode === 27;
}

function onBlur () {
  if (escDown === true) {
    escDown = false;
  }
}

function onKeyup (evt) {
  if (escDown === true) {
    escDown = false;

    if (isKeyCode(evt, 27) === true) {
      handlers$1[ handlers$1.length - 1 ](evt);
    }
  }
}

function update (action) {
  window[ action ]('keydown', onKeydown);
  window[ action ]('blur', onBlur);
  window[ action ]('keyup', onKeyup);
  escDown = false;
}

function addEscapeKey (fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);

    if (handlers$1.length === 1) {
      update('addEventListener');
    }
  }
}

function removeEscapeKey (fn) {
  const index = handlers$1.indexOf(fn);
  if (index !== -1) {
    handlers$1.splice(index, 1);

    if (handlers$1.length === 0) {
      update('removeEventListener');
    }
  }
}

const handlers = [];

function trigger (e) {
  handlers[ handlers.length - 1 ](e);
}

function addFocusout (fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);

    if (handlers.length === 1) {
      document.body.addEventListener('focusin', trigger);
    }
  }
}

function removeFocusout (fn) {
  const index = handlers.indexOf(fn);
  if (index !== -1) {
    handlers.splice(index, 1);

    if (handlers.length === 0) {
      document.body.removeEventListener('focusin', trigger);
    }
  }
}

let maximizedModals = 0;

const positionClass = {
  standard: 'fixed-full flex-center',
  top: 'fixed-top justify-center',
  bottom: 'fixed-bottom justify-center',
  right: 'fixed-right items-center',
  left: 'fixed-left items-center'
};

const defaultTransitions = {
  standard: [ 'scale', 'scale' ],
  top: [ 'slide-down', 'slide-up' ],
  bottom: [ 'slide-up', 'slide-down' ],
  right: [ 'slide-left', 'slide-right' ],
  left: [ 'slide-right', 'slide-left' ]
};

const __nuxt_component_2$1 = createComponent({
  name: 'QDialog',

  inheritAttrs: false,

  props: {
    ...useModelToggleProps,
    ...useTransitionProps,

    transitionShow: String, // override useTransitionProps
    transitionHide: String, // override useTransitionProps

    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,

    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,

    seamless: Boolean,

    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,

    square: Boolean,

    backdropFilter: String,

    position: {
      type: String,
      default: 'standard',
      validator: val => [ 'standard', 'top', 'bottom', 'left', 'right' ].includes(val)
    }
  },

  emits: [
    ...useModelToggleEmits,
    'shake', 'click', 'escapeKey'
  ],

  setup (props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();

    const innerRef = ref(null);
    const showing = ref(false);
    const animating = ref(false);

    let shakeTimeout = null, refocusTarget = null, isMaximized, avoidAutoClose;

    const hideOnRouteChange = computed(() =>
      props.persistent !== true
      && props.noRouteDismiss !== true
      && props.seamless !== true
    );

    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();

    const { transitionProps, transitionStyle } = useTransition(
      props,
      () => defaultTransitions[ props.position ][ 0 ],
      () => defaultTransitions[ props.position ][ 1 ]
    );

    computed(() => (
      transitionStyle.value
      + (
        props.backdropFilter !== void 0
          // Safari requires the -webkit prefix
          ? `;backdrop-filter:${ props.backdropFilter };-webkit-backdrop-filter:${ props.backdropFilter }`
          : ''
      )
    ));

    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal();

    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });

    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);

    computed(() =>
      'q-dialog__inner flex no-pointer-events'
      + ` q-dialog__inner--${ props.maximized === true ? 'maximized' : 'minimized' }`
      + ` q-dialog__inner--${ props.position } ${ positionClass[ props.position ] }`
      + (animating.value === true ? ' q-dialog__inner--animating' : '')
      + (props.fullWidth === true ? ' q-dialog__inner--fullwidth' : '')
      + (props.fullHeight === true ? ' q-dialog__inner--fullheight' : '')
      + (props.square === true ? ' q-dialog__inner--square' : '')
    );

    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);

    computed(() => (
      props.autoClose === true
        ? { onClick: onAutoClose }
        : {}
    ));

    computed(() => [
      'q-dialog fullscreen no-pointer-events '
        + `q-dialog--${ useBackdrop.value === true ? 'modal' : 'seamless' }`,
      attrs.class
    ]);

    watch(() => props.maximized, state => {
      showing.value === true && updateMaximized(state);
    });

    watch(useBackdrop, val => {
      preventBodyScroll(val);

      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      }
      else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });

    function handleShow (evt) {
      addToHistory();

      refocusTarget = props.noRefocus === false && document.activeElement !== null
        ? document.activeElement
        : null;

      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;

      if (props.noFocus !== true) {
        document.activeElement !== null && document.activeElement.blur();
        registerTick(focus);
      }
      else {
        removeTick();
      }

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const
              { top, bottom } = document.activeElement.getBoundingClientRect(),
              { innerHeight } = window,
              height = window.visualViewport !== void 0
                ? window.visualViewport.height
                : innerHeight;

            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height,
                bottom >= innerHeight
                  ? Infinity
                  : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2)
              );
            }

            document.activeElement.scrollIntoView();
          }

          // required in order to avoid the "double-tap needed" issue
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }

        showPortal(true); // done showing portal
        animating.value = false;
        emit('show', evt);
      }, props.transitionDuration);
    }

    function handleHide (evt) {
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();

      if (refocusTarget !== null) {
        ((evt && evt.type.indexOf('key') === 0
          ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])')
          : void 0
        ) || refocusTarget).focus();

        refocusTarget = null;
      }

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        hidePortal(true); // done hiding, now destroy
        animating.value = false;
        emit('hide', evt);
      }, props.transitionDuration);
    }

    function focus (selector) {
      addFocusFn(() => {
        let node = innerRef.value;

        if (node === null) return

        if (selector !== void 0) {
          const target = node.querySelector(selector);
          if (target !== null) {
            target.focus({ preventScroll: true });
            return
          }
        }

        if (node.contains(document.activeElement) !== true) {
          node = (
            node.querySelector('[autofocus][tabindex], [data-autofocus][tabindex]')
            || node.querySelector('[autofocus] [tabindex], [data-autofocus] [tabindex]')
            || node.querySelector('[autofocus], [data-autofocus]')
            || node
          );

          node.focus({ preventScroll: true });
        }
      });
    }

    function shake (focusTarget) {
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus({ preventScroll: true });
      }
      else {
        focus();
      }

      emit('shake');

      const node = innerRef.value;

      if (node !== null) {
        node.classList.remove('q-animate--scale');
        node.classList.add('q-animate--scale');
        shakeTimeout !== null && clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          shakeTimeout = null;
          if (innerRef.value !== null) {
            node.classList.remove('q-animate--scale');
            // some platforms (like desktop Chrome)
            // require calling focus() again
            focus();
          }
        }, 170);
      }
    }

    function onEscapeKey () {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        }
        else {
          emit('escapeKey');
          hide();
        }
      }
    }

    function cleanup (hiding) {
      if (shakeTimeout !== null) {
        clearTimeout(shakeTimeout);
        shakeTimeout = null;
      }

      if (hiding === true || showing.value === true) {
        updateMaximized(false);

        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }

      if (hiding !== true) {
        refocusTarget = null;
      }
    }

    function updateMaximized (active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add('q-body--dialog');
          maximizedModals++;

          isMaximized = true;
        }
      }
      else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove('q-body--dialog');
        }

        maximizedModals--;
        isMaximized = false;
      }
    }

    function onAutoClose (e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit('click', e);
      }
    }

    function onFocusChange (evt) {
      // the focus is not in a vue child component
      if (
        props.allowFocusOutside !== true
        && portalIsAccessible.value === true
        && childHasFocus(innerRef.value, evt.target) !== true
      ) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }

    Object.assign(vm.proxy, {
      // expose public methods
      focus, shake,

      // private but needed by QSelect
      __updateRefocusTarget (target) {
        refocusTarget = target || null;
      }
    });

    onBeforeUnmount(cleanup);

    return renderPortal
  }
});

const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};

function useDark (props, $q) {
  // return isDark
  return computed(() => (
    props.dark === null
      ? $q.dark.isActive
      : props.dark
  ))
}

const __nuxt_component_3 = createComponent({
  name: 'QCard',

  props: {
    ...useDarkProps,

    tag: {
      type: String,
      default: 'div'
    },

    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },

  setup (props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);

    const classes = computed(() =>
      'q-card'
      + (isDark.value === true ? ' q-card--dark q-dark' : '')
      + (props.bordered === true ? ' q-card--bordered' : '')
      + (props.square === true ? ' q-card--square no-border-radius' : '')
      + (props.flat === true ? ' q-card--flat no-shadow' : '')
    );

    return () => h(props.tag, { class: classes.value }, hSlot(slots.default))
  }
});

const __nuxt_component_4 = createComponent({
  name: 'QList',

  props: {
    ...useDarkProps,

    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,

    tag: {
      type: String,
      default: 'div'
    }
  },

  setup (props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    const classes = computed(() =>
      'q-list'
      + (props.bordered === true ? ' q-list--bordered' : '')
      + (props.dense === true ? ' q-list--dense' : '')
      + (props.separator === true ? ' q-list--separator' : '')
      + (isDark.value === true ? ' q-list--dark' : '')
      + (props.padding === true ? ' q-list--padding' : '')
    );

    return () => h(props.tag, { class: classes.value }, hSlot(slots.default))
  }
});

const __nuxt_component_5 = createComponent({
  name: 'QItem',

  props: {
    ...useDarkProps,
    ...useRouterLinkProps,

    tag: {
      type: String,
      default: 'div'
    },

    active: {
      type: Boolean,
      default: null
    },

    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,

    tabindex: [ String, Number ],

    focused: Boolean,
    manualFocus: Boolean
  },

  emits: [ 'click', 'keyup' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const isDark = useDark(props, $q);
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();

    const rootRef = ref(null);
    const blurTargetRef = ref(null);

    const isActionable = computed(() =>
      props.clickable === true
        || hasLink.value === true
        || props.tag === 'label'
    );

    const isClickable = computed(() =>
      props.disable !== true && isActionable.value === true
    );

    const classes = computed(() =>
      'q-item q-item-type row no-wrap'
      + (props.dense === true ? ' q-item--dense' : '')
      + (isDark.value === true ? ' q-item--dark' : '')
      + (
        hasLink.value === true && props.active === null
          ? linkClass.value
          : (
              props.active === true
                ? ` q-item--active${ props.activeClass !== void 0 ? ` ${ props.activeClass }` : '' }`
                : ''
            )
      )
      + (props.disable === true ? ' disabled' : '')
      + (
        isClickable.value === true
          ? ' q-item--clickable q-link cursor-pointer '
            + (props.manualFocus === true ? 'q-manual-focusable' : 'q-focusable q-hoverable')
            + (props.focused === true ? ' q-manual-focusable--focused' : '')
          : ''
      )
    );

    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null
      }

      const dir = $q.lang.rtl === true ? 'Right' : 'Left';
      return {
        [ 'padding' + dir ]: (16 + props.insetLevel * 56) + 'px'
      }
    });

    function onClick (e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          }
          else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }

        navigateOnClick(e);
      }
    }

    function onKeyup (e) {
      if (isClickable.value === true && isKeyCode(e, [ 13, 32 ]) === true) {
        stopAndPrevent(e);

        // for ripple
        e.qKeyEvent = true;

        // for click trigger
        const evt = new MouseEvent('click', e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }

      emit('keyup', e);
    }

    function getContent () {
      const child = hUniqueSlot(slots.default, []);

      isClickable.value === true && child.unshift(
        h('div', { class: 'q-focus-helper', tabindex: -1, ref: blurTargetRef })
      );

      return child
    }

    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: 'listitem',
        onClick,
        onKeyup
      };

      if (isClickable.value === true) {
        data.tabindex = props.tabindex || '0';
        Object.assign(data, linkAttrs.value);
      }
      else if (isActionable.value === true) {
        data[ 'aria-disabled' ] = 'true';
      }

      return h(
        linkTag.value,
        data,
        getContent()
      )
    }
  }
});

const insetMap = {
  true: 'inset',
  item: 'item-inset',
  'item-thumbnail': 'item-thumbnail-inset'
};

const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};

const __nuxt_component_2 = createComponent({
  name: 'QSeparator',

  props: {
    ...useDarkProps,

    spaced: [ Boolean, String ],
    inset: [ Boolean, String ],
    vertical: Boolean,
    color: String,
    size: String
  },

  setup (props) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    const orientation = computed(() => (
      props.vertical === true
        ? 'vertical'
        : 'horizontal'
    ));

    const orientClass = computed(() => ` q-separator--${ orientation.value }`);

    const insetClass = computed(() => (
      props.inset !== false
        ? `${ orientClass.value }-${ insetMap[ props.inset ] }`
        : ''
    ));

    const classes = computed(() =>
      `q-separator${ orientClass.value }${ insetClass.value }`
      + (props.color !== void 0 ? ` bg-${ props.color }` : '')
      + (isDark.value === true ? ' q-separator--dark' : '')
    );

    const style = computed(() => {
      const acc = {};

      if (props.size !== void 0) {
        acc[ props.vertical === true ? 'width' : 'height' ] = props.size;
      }

      if (props.spaced !== false) {
        const size = props.spaced === true
          ? `${ margins.md }px`
          : props.spaced in margins ? `${ margins[ props.spaced ] }px` : props.spaced;

        const dir = props.vertical === true
          ? [ 'Left', 'Right' ]
          : [ 'Top', 'Bottom' ];

        acc[ `margin${ dir[ 0 ] }` ] = acc[ `margin${ dir[ 1 ] }` ] = size;
      }

      return acc
    });

    return () => h('hr', {
      class: classes.value,
      style: style.value,
      'aria-orientation': orientation.value
    })
  }
});

const __nuxt_component_9 = createComponent({
  name: 'QToolbarTitle',

  props: {
    shrink: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-toolbar__title ellipsis'
      + (props.shrink === true ? ' col-shrink' : '')
    );

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

const __q_directive_0 = createDirective({ name: 'close-popup', getSSRProps }
  
);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Menu",
  __ssrInlineRender: true,
  setup(__props) {
    const menuDialog = ref(false);
    const openMenu = () => {
      menuDialog.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_toolbar = __nuxt_component_0;
      const _component_q_btn = __nuxt_component_1$1;
      const _component_q_dialog = __nuxt_component_2$1;
      const _component_q_card = __nuxt_component_3;
      const _component_q_list = __nuxt_component_4;
      const _component_q_item = __nuxt_component_5;
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_q_icon = QIcon;
      const _component_q_separator = __nuxt_component_2;
      const _component_q_toolbar_title = __nuxt_component_9;
      const _directive_close_popup = __q_directive_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "q-pa-sm bg-red-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_q_toolbar, { class: "text-white" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_btn, {
              flat: "",
              round: "",
              dense: "",
              icon: "menu",
              onClick: openMenu
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_dialog, {
              modelValue: menuDialog.value,
              "onUpdate:modelValue": ($event) => menuDialog.value = $event,
              position: "left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card, { style: { "width": "350px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_list, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item, mergeProps({
                                clickable: "",
                                class: "row items-center"
                              }, ssrGetDirectiveProps(_ctx, _directive_close_popup)), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_nuxt_link, { to: "/" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: "home",
                                            size: "20px",
                                            class: "text-red-6 q-pr-sm"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="text-red-6"${_scopeId6}>\u30E1\u30CB\u30E5\u30FC\u306B\u623B\u308B</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "home",
                                              size: "20px",
                                              class: "text-red-6 q-pr-sm"
                                            }),
                                            createVNode("span", { class: "text-red-6" }, "\u30E1\u30CB\u30E5\u30FC\u306B\u623B\u308B")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_nuxt_link, { to: "/" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "home",
                                            size: "20px",
                                            class: "text-red-6 q-pr-sm"
                                          }),
                                          createVNode("span", { class: "text-red-6" }, "\u30E1\u30CB\u30E5\u30FC\u306B\u623B\u308B")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item, mergeProps({
                                clickable: "",
                                class: "row items-center"
                              }, ssrGetDirectiveProps(_ctx, _directive_close_popup)), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_nuxt_link, { to: "/create" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: "add_circle",
                                            size: "20px",
                                            class: "text-red-6 q-pr-sm"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="text-red-6"${_scopeId6}>\u554F\u984C\u3092\u4F5C\u6210\u3059\u308B</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "add_circle",
                                              size: "20px",
                                              class: "text-red-6 q-pr-sm"
                                            }),
                                            createVNode("span", { class: "text-red-6" }, "\u554F\u984C\u3092\u4F5C\u6210\u3059\u308B")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_nuxt_link, { to: "/create" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "add_circle",
                                            size: "20px",
                                            class: "text-red-6 q-pr-sm"
                                          }),
                                          createVNode("span", { class: "text-red-6" }, "\u554F\u984C\u3092\u4F5C\u6210\u3059\u308B")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_separator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_item, mergeProps({
                                clickable: "",
                                class: "row items-center"
                              }, ssrGetDirectiveProps(_ctx, _directive_close_popup)), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_nuxt_link, { to: "/report" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_q_icon, {
                                            name: "flag",
                                            size: "20px",
                                            class: "text-red-6 q-pr-sm"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="text-red-6"${_scopeId6}>\u5831\u544A\u3059\u308B</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_q_icon, {
                                              name: "flag",
                                              size: "20px",
                                              class: "text-red-6 q-pr-sm"
                                            }),
                                            createVNode("span", { class: "text-red-6" }, "\u5831\u544A\u3059\u308B")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_nuxt_link, { to: "/report" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "flag",
                                            size: "20px",
                                            class: "text-red-6 q-pr-sm"
                                          }),
                                          createVNode("span", { class: "text-red-6" }, "\u5831\u544A\u3059\u308B")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                withDirectives((openBlock(), createBlock(_component_q_item, {
                                  clickable: "",
                                  class: "row items-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_nuxt_link, { to: "/" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "home",
                                          size: "20px",
                                          class: "text-red-6 q-pr-sm"
                                        }),
                                        createVNode("span", { class: "text-red-6" }, "\u30E1\u30CB\u30E5\u30FC\u306B\u623B\u308B")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_close_popup]
                                ]),
                                withDirectives((openBlock(), createBlock(_component_q_item, {
                                  clickable: "",
                                  class: "row items-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_nuxt_link, { to: "/create" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "add_circle",
                                          size: "20px",
                                          class: "text-red-6 q-pr-sm"
                                        }),
                                        createVNode("span", { class: "text-red-6" }, "\u554F\u984C\u3092\u4F5C\u6210\u3059\u308B")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_close_popup]
                                ]),
                                createVNode(_component_q_separator),
                                withDirectives((openBlock(), createBlock(_component_q_item, {
                                  clickable: "",
                                  class: "row items-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_nuxt_link, { to: "/report" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "flag",
                                          size: "20px",
                                          class: "text-red-6 q-pr-sm"
                                        }),
                                        createVNode("span", { class: "text-red-6" }, "\u5831\u544A\u3059\u308B")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_close_popup]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_list, null, {
                            default: withCtx(() => [
                              withDirectives((openBlock(), createBlock(_component_q_item, {
                                clickable: "",
                                class: "row items-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_nuxt_link, { to: "/" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "home",
                                        size: "20px",
                                        class: "text-red-6 q-pr-sm"
                                      }),
                                      createVNode("span", { class: "text-red-6" }, "\u30E1\u30CB\u30E5\u30FC\u306B\u623B\u308B")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })), [
                                [_directive_close_popup]
                              ]),
                              withDirectives((openBlock(), createBlock(_component_q_item, {
                                clickable: "",
                                class: "row items-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_nuxt_link, { to: "/create" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "add_circle",
                                        size: "20px",
                                        class: "text-red-6 q-pr-sm"
                                      }),
                                      createVNode("span", { class: "text-red-6" }, "\u554F\u984C\u3092\u4F5C\u6210\u3059\u308B")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })), [
                                [_directive_close_popup]
                              ]),
                              createVNode(_component_q_separator),
                              withDirectives((openBlock(), createBlock(_component_q_item, {
                                clickable: "",
                                class: "row items-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_nuxt_link, { to: "/report" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_icon, {
                                        name: "flag",
                                        size: "20px",
                                        class: "text-red-6 q-pr-sm"
                                      }),
                                      createVNode("span", { class: "text-red-6" }, "\u5831\u544A\u3059\u308B")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })), [
                                [_directive_close_popup]
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card, { style: { "width": "350px" } }, {
                      default: withCtx(() => [
                        createVNode(_component_q_list, null, {
                          default: withCtx(() => [
                            withDirectives((openBlock(), createBlock(_component_q_item, {
                              clickable: "",
                              class: "row items-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_nuxt_link, { to: "/" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: "home",
                                      size: "20px",
                                      class: "text-red-6 q-pr-sm"
                                    }),
                                    createVNode("span", { class: "text-red-6" }, "\u30E1\u30CB\u30E5\u30FC\u306B\u623B\u308B")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })), [
                              [_directive_close_popup]
                            ]),
                            withDirectives((openBlock(), createBlock(_component_q_item, {
                              clickable: "",
                              class: "row items-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_nuxt_link, { to: "/create" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: "add_circle",
                                      size: "20px",
                                      class: "text-red-6 q-pr-sm"
                                    }),
                                    createVNode("span", { class: "text-red-6" }, "\u554F\u984C\u3092\u4F5C\u6210\u3059\u308B")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })), [
                              [_directive_close_popup]
                            ]),
                            createVNode(_component_q_separator),
                            withDirectives((openBlock(), createBlock(_component_q_item, {
                              clickable: "",
                              class: "row items-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_nuxt_link, { to: "/report" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_icon, {
                                      name: "flag",
                                      size: "20px",
                                      class: "text-red-6 q-pr-sm"
                                    }),
                                    createVNode("span", { class: "text-red-6" }, "\u5831\u544A\u3059\u308B")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })), [
                              [_directive_close_popup]
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_toolbar_title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>SE\u77E5\u898B\u5171\u6709\u30C6\u30B9\u30C8</span>`);
                } else {
                  return [
                    createVNode("span", null, "SE\u77E5\u898B\u5171\u6709\u30C6\u30B9\u30C8")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_q_btn, {
                flat: "",
                round: "",
                dense: "",
                icon: "menu",
                onClick: openMenu
              }),
              createVNode(_component_q_dialog, {
                modelValue: menuDialog.value,
                "onUpdate:modelValue": ($event) => menuDialog.value = $event,
                position: "left"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card, { style: { "width": "350px" } }, {
                    default: withCtx(() => [
                      createVNode(_component_q_list, null, {
                        default: withCtx(() => [
                          withDirectives((openBlock(), createBlock(_component_q_item, {
                            clickable: "",
                            class: "row items-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_nuxt_link, { to: "/" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_icon, {
                                    name: "home",
                                    size: "20px",
                                    class: "text-red-6 q-pr-sm"
                                  }),
                                  createVNode("span", { class: "text-red-6" }, "\u30E1\u30CB\u30E5\u30FC\u306B\u623B\u308B")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [_directive_close_popup]
                          ]),
                          withDirectives((openBlock(), createBlock(_component_q_item, {
                            clickable: "",
                            class: "row items-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_nuxt_link, { to: "/create" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_icon, {
                                    name: "add_circle",
                                    size: "20px",
                                    class: "text-red-6 q-pr-sm"
                                  }),
                                  createVNode("span", { class: "text-red-6" }, "\u554F\u984C\u3092\u4F5C\u6210\u3059\u308B")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [_directive_close_popup]
                          ]),
                          createVNode(_component_q_separator),
                          withDirectives((openBlock(), createBlock(_component_q_item, {
                            clickable: "",
                            class: "row items-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_nuxt_link, { to: "/report" }, {
                                default: withCtx(() => [
                                  createVNode(_component_q_icon, {
                                    name: "flag",
                                    size: "20px",
                                    class: "text-red-6 q-pr-sm"
                                  }),
                                  createVNode("span", { class: "text-red-6" }, "\u5831\u544A\u3059\u308B")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [_directive_close_popup]
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_q_toolbar_title, null, {
                default: withCtx(() => [
                  createVNode("span", null, "SE\u77E5\u898B\u5171\u6709\u30C6\u30B9\u30C8")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { QIcon as Q, Ripple as R, _sfc_main as _, __nuxt_component_3 as a, __nuxt_component_2 as b, __nuxt_component_1$1 as c, useTimeout as d, hMergeSlot as e, getNormalizedVNodes as f, getSSRProps as g, hSlot as h, isKeyCode as i, useDarkProps as j, useDark as k, hDir as l, useSizeProps as m, useSize as n, addFocusFn as o, QSpinner as p, btnDesignOptions as q, removeFocusFn as r, shouldIgnoreKey as s, btnPadding as t, useTick as u, getBtnDesign as v };
//# sourceMappingURL=Menu-BdIa0GzH.mjs.map
