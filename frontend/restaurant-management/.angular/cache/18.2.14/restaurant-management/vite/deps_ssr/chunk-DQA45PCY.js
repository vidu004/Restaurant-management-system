import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  BidiModule,
  Directionality
} from "./chunk-BONQOHRA.js";
import {
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-OIIWII42.js";
import {
  APP_BOOTSTRAP_LISTENER,
  Directive,
  ElementRef,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  PLATFORM_ID,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-2FSAHAZ4.js";
import {
  require_cjs
} from "./chunk-5IW5ZEPE.js";
import {
  require_operators
} from "./chunk-UOPINYA3.js";
import {
  __toESM
} from "./chunk-NQ4HTGF6.js";

// node_modules/@angular/flex-layout/fesm2015/angular-flex-layout-core.mjs
var import_rxjs = __toESM(require_cjs(), 1);

// node_modules/@angular/flex-layout/fesm2015/angular-flex-layout-_private-utils.mjs
function applyCssPrefixes(target) {
  var _a;
  for (let key in target) {
    let value = (_a = target[key]) !== null && _a !== void 0 ? _a : "";
    switch (key) {
      case "display":
        if (value === "flex") {
          target["display"] = ["-webkit-flex", "flex"];
        } else if (value === "inline-flex") {
          target["display"] = ["-webkit-inline-flex", "inline-flex"];
        } else {
          target["display"] = value;
        }
        break;
      case "align-items":
      case "align-self":
      case "align-content":
      case "flex":
      case "flex-basis":
      case "flex-flow":
      case "flex-grow":
      case "flex-shrink":
      case "flex-wrap":
      case "justify-content":
        target["-webkit-" + key] = value;
        break;
      case "flex-direction":
        target["-webkit-flex-direction"] = value;
        target["flex-direction"] = value;
        break;
      case "order":
        target["order"] = target["-webkit-" + key] = isNaN(+value) ? "0" : value;
        break;
    }
  }
  return target;
}
var INLINE = "inline";
var LAYOUT_VALUES = ["row", "column", "row-reverse", "column-reverse"];
function buildLayoutCSS(value) {
  let [direction, wrap, isInline] = validateValue(value);
  return buildCSS(direction, wrap, isInline);
}
function validateValue(value) {
  var _a;
  value = (_a = value === null || value === void 0 ? void 0 : value.toLowerCase()) !== null && _a !== void 0 ? _a : "";
  let [direction, wrap, inline] = value.split(" ");
  if (!LAYOUT_VALUES.find((x) => x === direction)) {
    direction = LAYOUT_VALUES[0];
  }
  if (wrap === INLINE) {
    wrap = inline !== INLINE ? inline : "";
    inline = INLINE;
  }
  return [direction, validateWrapValue(wrap), !!inline];
}
function isFlowHorizontal(value) {
  let [flow] = validateValue(value);
  return flow.indexOf("row") > -1;
}
function validateWrapValue(value) {
  if (!!value) {
    switch (value.toLowerCase()) {
      case "reverse":
      case "wrap-reverse":
      case "reverse-wrap":
        value = "wrap-reverse";
        break;
      case "no":
      case "none":
      case "nowrap":
        value = "nowrap";
        break;
      default:
        value = "wrap";
        break;
    }
  }
  return value;
}
function buildCSS(direction, wrap = null, inline = false) {
  return {
    display: inline ? "inline-flex" : "flex",
    "box-sizing": "border-box",
    "flex-direction": direction,
    "flex-wrap": wrap || null
  };
}
function extendObject(dest, ...sources) {
  if (dest == null) {
    throw TypeError("Cannot convert undefined or null to object");
  }
  for (let source of sources) {
    if (source != null) {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }
  }
  return dest;
}

// node_modules/@angular/flex-layout/fesm2015/angular-flex-layout-core.mjs
var import_operators = __toESM(require_operators(), 1);
function removeStyles(_document, platformId) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      const elements = Array.from(_document.querySelectorAll(`[class*=${CLASS_NAME}]`));
      const classRegex = /\bflex-layout-.+?\b/g;
      elements.forEach((el) => {
        el.classList.contains(`${CLASS_NAME}ssr`) && el.parentNode ? el.parentNode.removeChild(el) : el.className.replace(classRegex, "");
      });
    }
  };
}
var BROWSER_PROVIDER = {
  provide: APP_BOOTSTRAP_LISTENER,
  useFactory: removeStyles,
  deps: [DOCUMENT, PLATFORM_ID],
  multi: true
};
var CLASS_NAME = "flex-layout-";
var CoreModule = class {
};
CoreModule.ɵfac = function CoreModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CoreModule)();
};
CoreModule.ɵmod = ɵɵdefineNgModule({
  type: CoreModule
});
CoreModule.ɵinj = ɵɵdefineInjector({
  providers: [BROWSER_PROVIDER]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoreModule, [{
    type: NgModule,
    args: [{
      providers: [BROWSER_PROVIDER]
    }]
  }], null, null);
})();
var MediaChange = class _MediaChange {
  /**
   * @param matches whether the mediaQuery is currently activated
   * @param mediaQuery e.g. (min-width: 600px) and (max-width: 959px)
   * @param mqAlias e.g. gt-sm, md, gt-lg
   * @param suffix e.g. GtSM, Md, GtLg
   * @param priority the priority of activation for the given breakpoint
   */
  constructor(matches = false, mediaQuery = "all", mqAlias = "", suffix = "", priority = 0) {
    this.matches = matches;
    this.mediaQuery = mediaQuery;
    this.mqAlias = mqAlias;
    this.suffix = suffix;
    this.priority = priority;
    this.property = "";
  }
  /** Create an exact copy of the MediaChange */
  clone() {
    return new _MediaChange(this.matches, this.mediaQuery, this.mqAlias, this.suffix);
  }
};
var StylesheetMap = class {
  constructor() {
    this.stylesheet = /* @__PURE__ */ new Map();
  }
  /**
   * Add an individual style to an HTML element
   */
  addStyleToElement(element, style, value) {
    const stylesheet = this.stylesheet.get(element);
    if (stylesheet) {
      stylesheet.set(style, value);
    } else {
      this.stylesheet.set(element, /* @__PURE__ */ new Map([[style, value]]));
    }
  }
  /**
   * Clear the virtual stylesheet
   */
  clearStyles() {
    this.stylesheet.clear();
  }
  /**
   * Retrieve a given style for an HTML element
   */
  getStyleForElement(el, styleName) {
    const styles = this.stylesheet.get(el);
    let value = "";
    if (styles) {
      const style = styles.get(styleName);
      if (typeof style === "number" || typeof style === "string") {
        value = style + "";
      }
    }
    return value;
  }
};
StylesheetMap.ɵfac = function StylesheetMap_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || StylesheetMap)();
};
StylesheetMap.ɵprov = ɵɵdefineInjectable({
  token: StylesheetMap,
  factory: StylesheetMap.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StylesheetMap, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DEFAULT_CONFIG = {
  addFlexToParent: true,
  addOrientationBps: false,
  disableDefaultBps: false,
  disableVendorPrefixes: false,
  serverLoaded: false,
  useColumnBasisZero: true,
  printWithBreakpoints: [],
  mediaTriggerAutoRestore: true,
  ssrObserveBreakpoints: [],
  // This is disabled by default because otherwise the multiplier would
  // run for all users, regardless of whether they're using this feature.
  // Instead, we disable it by default, which requires this ugly cast.
  multiplier: void 0,
  defaultUnit: "px",
  detectLayoutDisplay: false
};
var LAYOUT_CONFIG = new InjectionToken("Flex Layout token, config options for the library", {
  providedIn: "root",
  factory: () => DEFAULT_CONFIG
});
var SERVER_TOKEN = new InjectionToken("FlexLayoutServerLoaded", {
  providedIn: "root",
  factory: () => false
});
var BREAKPOINT = new InjectionToken("Flex Layout token, collect all breakpoints into one provider", {
  providedIn: "root",
  factory: () => null
});
function mergeAlias(dest, source) {
  var _a;
  dest = (_a = dest === null || dest === void 0 ? void 0 : dest.clone()) !== null && _a !== void 0 ? _a : new MediaChange();
  if (source) {
    dest.mqAlias = source.alias;
    dest.mediaQuery = source.mediaQuery;
    dest.suffix = source.suffix;
    dest.priority = source.priority;
  }
  return dest;
}
var StyleBuilder = class {
  constructor() {
    this.shouldCache = true;
  }
  /**
   * Run a side effect computation given the input string and the computed styles
   * from the build task and the host configuration object
   * NOTE: This should be a no-op unless an algorithm is provided in a subclass
   */
  sideEffect(_input, _styles, _parent) {
  }
};
var StyleUtils = class {
  constructor(_serverStylesheet, _serverModuleLoaded, _platformId, layoutConfig) {
    this._serverStylesheet = _serverStylesheet;
    this._serverModuleLoaded = _serverModuleLoaded;
    this._platformId = _platformId;
    this.layoutConfig = layoutConfig;
  }
  /**
   * Applies styles given via string pair or object map to the directive element
   */
  applyStyleToElement(element, style, value = null) {
    let styles = {};
    if (typeof style === "string") {
      styles[style] = value;
      style = styles;
    }
    styles = this.layoutConfig.disableVendorPrefixes ? style : applyCssPrefixes(style);
    this._applyMultiValueStyleToElement(styles, element);
  }
  /**
   * Applies styles given via string pair or object map to the directive's element
   */
  applyStyleToElements(style, elements = []) {
    const styles = this.layoutConfig.disableVendorPrefixes ? style : applyCssPrefixes(style);
    elements.forEach((el) => {
      this._applyMultiValueStyleToElement(styles, el);
    });
  }
  /**
   * Determine the DOM element's Flexbox flow (flex-direction)
   *
   * Check inline style first then check computed (stylesheet) style
   */
  getFlowDirection(target) {
    const query = "flex-direction";
    let value = this.lookupStyle(target, query);
    const hasInlineValue = this.lookupInlineStyle(target, query) || isPlatformServer(this._platformId) && this._serverModuleLoaded ? value : "";
    return [value || "row", hasInlineValue];
  }
  hasWrap(target) {
    const query = "flex-wrap";
    return this.lookupStyle(target, query) === "wrap";
  }
  /**
   * Find the DOM element's raw attribute value (if any)
   */
  lookupAttributeValue(element, attribute) {
    var _a;
    return (_a = element.getAttribute(attribute)) !== null && _a !== void 0 ? _a : "";
  }
  /**
   * Find the DOM element's inline style value (if any)
   */
  lookupInlineStyle(element, styleName) {
    return isPlatformBrowser(this._platformId) ? element.style.getPropertyValue(styleName) : getServerStyle(element, styleName);
  }
  /**
   * Determine the inline or inherited CSS style
   * NOTE: platform-server has no implementation for getComputedStyle
   */
  lookupStyle(element, styleName, inlineOnly = false) {
    let value = "";
    if (element) {
      let immediateValue = value = this.lookupInlineStyle(element, styleName);
      if (!immediateValue) {
        if (isPlatformBrowser(this._platformId)) {
          if (!inlineOnly) {
            value = getComputedStyle(element).getPropertyValue(styleName);
          }
        } else {
          if (this._serverModuleLoaded) {
            value = this._serverStylesheet.getStyleForElement(element, styleName);
          }
        }
      }
    }
    return value ? value.trim() : "";
  }
  /**
   * Applies the styles to the element. The styles object map may contain an array of values
   * Each value will be added as element style
   * Keys are sorted to add prefixed styles (like -webkit-x) first, before the standard ones
   */
  _applyMultiValueStyleToElement(styles, element) {
    Object.keys(styles).sort().forEach((key) => {
      const el = styles[key];
      const values = Array.isArray(el) ? el : [el];
      values.sort();
      for (let value of values) {
        value = value ? value + "" : "";
        if (isPlatformBrowser(this._platformId) || !this._serverModuleLoaded) {
          isPlatformBrowser(this._platformId) ? element.style.setProperty(key, value) : setServerStyle(element, key, value);
        } else {
          this._serverStylesheet.addStyleToElement(element, key, value);
        }
      }
    });
  }
};
StyleUtils.ɵfac = function StyleUtils_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || StyleUtils)(ɵɵinject(StylesheetMap), ɵɵinject(SERVER_TOKEN), ɵɵinject(PLATFORM_ID), ɵɵinject(LAYOUT_CONFIG));
};
StyleUtils.ɵprov = ɵɵdefineInjectable({
  token: StyleUtils,
  factory: StyleUtils.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleUtils, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: StylesheetMap
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [SERVER_TOKEN]
      }]
    }, {
      type: Object,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LAYOUT_CONFIG]
      }]
    }];
  }, null);
})();
function getServerStyle(element, styleName) {
  var _a;
  const styleMap = readStyleAttribute(element);
  return (_a = styleMap[styleName]) !== null && _a !== void 0 ? _a : "";
}
function setServerStyle(element, styleName, styleValue) {
  styleName = styleName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  const styleMap = readStyleAttribute(element);
  styleMap[styleName] = styleValue !== null && styleValue !== void 0 ? styleValue : "";
  writeStyleAttribute(element, styleMap);
}
function writeStyleAttribute(element, styleMap) {
  let styleAttrValue = "";
  for (const key in styleMap) {
    const newValue = styleMap[key];
    if (newValue) {
      styleAttrValue += `${key}:${styleMap[key]};`;
    }
  }
  element.setAttribute("style", styleAttrValue);
}
function readStyleAttribute(element) {
  const styleMap = {};
  const styleAttribute = element.getAttribute("style");
  if (styleAttribute) {
    const styleList = styleAttribute.split(/;+/g);
    for (let i = 0; i < styleList.length; i++) {
      const style = styleList[i].trim();
      if (style.length > 0) {
        const colonIndex = style.indexOf(":");
        if (colonIndex === -1) {
          throw new Error(`Invalid CSS style: ${style}`);
        }
        const name = style.substr(0, colonIndex).trim();
        styleMap[name] = style.substr(colonIndex + 1).trim();
      }
    }
  }
  return styleMap;
}
function sortDescendingPriority(a, b) {
  const priorityA = a ? a.priority || 0 : 0;
  const priorityB = b ? b.priority || 0 : 0;
  return priorityB - priorityA;
}
function sortAscendingPriority(a, b) {
  const pA = a.priority || 0;
  const pB = b.priority || 0;
  return pA - pB;
}
var MatchMedia = class {
  constructor(_zone, _platformId, _document) {
    this._zone = _zone;
    this._platformId = _platformId;
    this._document = _document;
    this.source = new import_rxjs.BehaviorSubject(new MediaChange(true));
    this.registry = /* @__PURE__ */ new Map();
    this.pendingRemoveListenerFns = [];
    this._observable$ = this.source.asObservable();
  }
  /**
   * Publish list of all current activations
   */
  get activations() {
    const results = [];
    this.registry.forEach((mql, key) => {
      if (mql.matches) {
        results.push(key);
      }
    });
    return results;
  }
  /**
   * For the specified mediaQuery?
   */
  isActive(mediaQuery) {
    var _a;
    const mql = this.registry.get(mediaQuery);
    return (_a = mql === null || mql === void 0 ? void 0 : mql.matches) !== null && _a !== void 0 ? _a : this.registerQuery(mediaQuery).some((m) => m.matches);
  }
  /**
   * External observers can watch for all (or a specific) mql changes.
   * Typically used by the MediaQueryAdaptor; optionally available to components
   * who wish to use the MediaMonitor as mediaMonitor$ observable service.
   *
   * Use deferred registration process to register breakpoints only on subscription
   * This logic also enforces logic to register all mediaQueries BEFORE notify
   * subscribers of notifications.
   */
  observe(mqList, filterOthers = false) {
    if (mqList && mqList.length) {
      const matchMedia$ = this._observable$.pipe((0, import_operators.filter)((change) => !filterOthers ? true : mqList.indexOf(change.mediaQuery) > -1));
      const registration$ = new import_rxjs.Observable((observer) => {
        const matches = this.registerQuery(mqList);
        if (matches.length) {
          const lastChange = matches.pop();
          matches.forEach((e) => {
            observer.next(e);
          });
          this.source.next(lastChange);
        }
        observer.complete();
      });
      return (0, import_rxjs.merge)(registration$, matchMedia$);
    }
    return this._observable$;
  }
  /**
   * Based on the BreakPointRegistry provider, register internal listeners for each unique
   * mediaQuery. Each listener emits specific MediaChange data to observers
   */
  registerQuery(mediaQuery) {
    const list = Array.isArray(mediaQuery) ? mediaQuery : [mediaQuery];
    const matches = [];
    buildQueryCss(list, this._document);
    list.forEach((query) => {
      const onMQLEvent = (e) => {
        this._zone.run(() => this.source.next(new MediaChange(e.matches, query)));
      };
      let mql = this.registry.get(query);
      if (!mql) {
        mql = this.buildMQL(query);
        mql.addListener(onMQLEvent);
        this.pendingRemoveListenerFns.push(() => mql.removeListener(onMQLEvent));
        this.registry.set(query, mql);
      }
      if (mql.matches) {
        matches.push(new MediaChange(true, query));
      }
    });
    return matches;
  }
  ngOnDestroy() {
    let fn;
    while (fn = this.pendingRemoveListenerFns.pop()) {
      fn();
    }
  }
  /**
   * Call window.matchMedia() to build a MediaQueryList; which
   * supports 0..n listeners for activation/deactivation
   */
  buildMQL(query) {
    return constructMql(query, isPlatformBrowser(this._platformId));
  }
};
MatchMedia.ɵfac = function MatchMedia_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MatchMedia)(ɵɵinject(NgZone), ɵɵinject(PLATFORM_ID), ɵɵinject(DOCUMENT));
};
MatchMedia.ɵprov = ɵɵdefineInjectable({
  token: MatchMedia,
  factory: MatchMedia.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatchMedia, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: NgZone
    }, {
      type: Object,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var ALL_STYLES = {};
function buildQueryCss(mediaQueries, _document) {
  const list = mediaQueries.filter((it) => !ALL_STYLES[it]);
  if (list.length > 0) {
    const query = list.join(", ");
    try {
      const styleEl = _document.createElement("style");
      styleEl.setAttribute("type", "text/css");
      if (!styleEl.styleSheet) {
        const cssText = `
/*
  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners
  see http://bit.ly/2sd4HMP
*/
@media ${query} {.fx-query-test{ }}
`;
        styleEl.appendChild(_document.createTextNode(cssText));
      }
      _document.head.appendChild(styleEl);
      list.forEach((mq) => ALL_STYLES[mq] = styleEl);
    } catch (e) {
      console.error(e);
    }
  }
}
function buildMockMql(query) {
  const et = new EventTarget();
  et.matches = query === "all" || query === "";
  et.media = query;
  et.addListener = () => {
  };
  et.removeListener = () => {
  };
  et.addEventListener = () => {
  };
  et.dispatchEvent = () => false;
  et.onchange = null;
  return et;
}
function constructMql(query, isBrowser) {
  const canListen = isBrowser && !!window.matchMedia("all").addListener;
  return canListen ? window.matchMedia(query) : buildMockMql(query);
}
var DEFAULT_BREAKPOINTS = [{
  alias: "xs",
  mediaQuery: "screen and (min-width: 0px) and (max-width: 599.98px)",
  priority: 1e3
}, {
  alias: "sm",
  mediaQuery: "screen and (min-width: 600px) and (max-width: 959.98px)",
  priority: 900
}, {
  alias: "md",
  mediaQuery: "screen and (min-width: 960px) and (max-width: 1279.98px)",
  priority: 800
}, {
  alias: "lg",
  mediaQuery: "screen and (min-width: 1280px) and (max-width: 1919.98px)",
  priority: 700
}, {
  alias: "xl",
  mediaQuery: "screen and (min-width: 1920px) and (max-width: 4999.98px)",
  priority: 600
}, {
  alias: "lt-sm",
  overlapping: true,
  mediaQuery: "screen and (max-width: 599.98px)",
  priority: 950
}, {
  alias: "lt-md",
  overlapping: true,
  mediaQuery: "screen and (max-width: 959.98px)",
  priority: 850
}, {
  alias: "lt-lg",
  overlapping: true,
  mediaQuery: "screen and (max-width: 1279.98px)",
  priority: 750
}, {
  alias: "lt-xl",
  overlapping: true,
  priority: 650,
  mediaQuery: "screen and (max-width: 1919.98px)"
}, {
  alias: "gt-xs",
  overlapping: true,
  mediaQuery: "screen and (min-width: 600px)",
  priority: -950
}, {
  alias: "gt-sm",
  overlapping: true,
  mediaQuery: "screen and (min-width: 960px)",
  priority: -850
}, {
  alias: "gt-md",
  overlapping: true,
  mediaQuery: "screen and (min-width: 1280px)",
  priority: -750
}, {
  alias: "gt-lg",
  overlapping: true,
  mediaQuery: "screen and (min-width: 1920px)",
  priority: -650
}];
var HANDSET_PORTRAIT = "(orientation: portrait) and (max-width: 599.98px)";
var HANDSET_LANDSCAPE = "(orientation: landscape) and (max-width: 959.98px)";
var TABLET_PORTRAIT = "(orientation: portrait) and (min-width: 600px) and (max-width: 839.98px)";
var TABLET_LANDSCAPE = "(orientation: landscape) and (min-width: 960px) and (max-width: 1279.98px)";
var WEB_PORTRAIT = "(orientation: portrait) and (min-width: 840px)";
var WEB_LANDSCAPE = "(orientation: landscape) and (min-width: 1280px)";
var ScreenTypes = {
  "HANDSET": `${HANDSET_PORTRAIT}, ${HANDSET_LANDSCAPE}`,
  "TABLET": `${TABLET_PORTRAIT} , ${TABLET_LANDSCAPE}`,
  "WEB": `${WEB_PORTRAIT}, ${WEB_LANDSCAPE} `,
  "HANDSET_PORTRAIT": `${HANDSET_PORTRAIT}`,
  "TABLET_PORTRAIT": `${TABLET_PORTRAIT} `,
  "WEB_PORTRAIT": `${WEB_PORTRAIT}`,
  "HANDSET_LANDSCAPE": `${HANDSET_LANDSCAPE}`,
  "TABLET_LANDSCAPE": `${TABLET_LANDSCAPE}`,
  "WEB_LANDSCAPE": `${WEB_LANDSCAPE}`
};
var ORIENTATION_BREAKPOINTS = [{
  "alias": "handset",
  priority: 2e3,
  "mediaQuery": ScreenTypes.HANDSET
}, {
  "alias": "handset.landscape",
  priority: 2e3,
  "mediaQuery": ScreenTypes.HANDSET_LANDSCAPE
}, {
  "alias": "handset.portrait",
  priority: 2e3,
  "mediaQuery": ScreenTypes.HANDSET_PORTRAIT
}, {
  "alias": "tablet",
  priority: 2100,
  "mediaQuery": ScreenTypes.TABLET
}, {
  "alias": "tablet.landscape",
  priority: 2100,
  "mediaQuery": ScreenTypes.TABLET_LANDSCAPE
}, {
  "alias": "tablet.portrait",
  priority: 2100,
  "mediaQuery": ScreenTypes.TABLET_PORTRAIT
}, {
  "alias": "web",
  priority: 2200,
  "mediaQuery": ScreenTypes.WEB,
  overlapping: true
}, {
  "alias": "web.landscape",
  priority: 2200,
  "mediaQuery": ScreenTypes.WEB_LANDSCAPE,
  overlapping: true
}, {
  "alias": "web.portrait",
  priority: 2200,
  "mediaQuery": ScreenTypes.WEB_PORTRAIT,
  overlapping: true
}];
var ALIAS_DELIMITERS = /(\.|-|_)/g;
function firstUpperCase(part) {
  let first = part.length > 0 ? part.charAt(0) : "";
  let remainder = part.length > 1 ? part.slice(1) : "";
  return first.toUpperCase() + remainder;
}
function camelCase(name) {
  return name.replace(ALIAS_DELIMITERS, "|").split("|").map(firstUpperCase).join("");
}
function validateSuffixes(list) {
  list.forEach((bp) => {
    if (!bp.suffix) {
      bp.suffix = camelCase(bp.alias);
      bp.overlapping = !!bp.overlapping;
    }
  });
  return list;
}
function mergeByAlias(defaults, custom = []) {
  const dict = {};
  defaults.forEach((bp) => {
    dict[bp.alias] = bp;
  });
  custom.forEach((bp) => {
    if (dict[bp.alias]) {
      extendObject(dict[bp.alias], bp);
    } else {
      dict[bp.alias] = bp;
    }
  });
  return validateSuffixes(Object.keys(dict).map((k) => dict[k]));
}
var BREAKPOINTS = new InjectionToken("Token (@angular/flex-layout) Breakpoints", {
  providedIn: "root",
  factory: () => {
    const breakpoints = inject(BREAKPOINT);
    const layoutConfig = inject(LAYOUT_CONFIG);
    const bpFlattenArray = [].concat.apply([], (breakpoints || []).map((v) => Array.isArray(v) ? v : [v]));
    const builtIns = (layoutConfig.disableDefaultBps ? [] : DEFAULT_BREAKPOINTS).concat(layoutConfig.addOrientationBps ? ORIENTATION_BREAKPOINTS : []);
    return mergeByAlias(builtIns, bpFlattenArray);
  }
});
var BreakPointRegistry = class {
  constructor(list) {
    this.findByMap = /* @__PURE__ */ new Map();
    this.items = [...list].sort(sortAscendingPriority);
  }
  /**
   * Search breakpoints by alias (e.g. gt-xs)
   */
  findByAlias(alias) {
    return !alias ? null : this.findWithPredicate(alias, (bp) => bp.alias === alias);
  }
  findByQuery(query) {
    return this.findWithPredicate(query, (bp) => bp.mediaQuery === query);
  }
  /**
   * Get all the breakpoints whose ranges could overlapping `normal` ranges;
   * e.g. gt-sm overlaps md, lg, and xl
   */
  get overlappings() {
    return this.items.filter((it) => it.overlapping);
  }
  /**
   * Get list of all registered (non-empty) breakpoint aliases
   */
  get aliases() {
    return this.items.map((it) => it.alias);
  }
  /**
   * Aliases are mapped to properties using suffixes
   * e.g.  'gt-sm' for property 'layout'  uses suffix 'GtSm'
   * for property layoutGtSM.
   */
  get suffixes() {
    return this.items.map((it) => {
      var _a;
      return (_a = it === null || it === void 0 ? void 0 : it.suffix) !== null && _a !== void 0 ? _a : "";
    });
  }
  /**
   * Memoized lookup using custom predicate function
   */
  findWithPredicate(key, searchFn) {
    var _a;
    let response = this.findByMap.get(key);
    if (!response) {
      response = (_a = this.items.find(searchFn)) !== null && _a !== void 0 ? _a : null;
      this.findByMap.set(key, response);
    }
    return response !== null && response !== void 0 ? response : null;
  }
};
BreakPointRegistry.ɵfac = function BreakPointRegistry_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || BreakPointRegistry)(ɵɵinject(BREAKPOINTS));
};
BreakPointRegistry.ɵprov = ɵɵdefineInjectable({
  token: BreakPointRegistry,
  factory: BreakPointRegistry.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreakPointRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [BREAKPOINTS]
      }]
    }];
  }, null);
})();
var PRINT = "print";
var BREAKPOINT_PRINT = {
  alias: PRINT,
  mediaQuery: PRINT,
  priority: 1e3
};
var PrintHook = class {
  constructor(breakpoints, layoutConfig, _document) {
    this.breakpoints = breakpoints;
    this.layoutConfig = layoutConfig;
    this._document = _document;
    this.registeredBeforeAfterPrintHooks = false;
    this.isPrintingBeforeAfterEvent = false;
    this.beforePrintEventListeners = [];
    this.afterPrintEventListeners = [];
    this.formerActivations = null;
    this.isPrinting = false;
    this.queue = new PrintQueue();
    this.deactivations = [];
  }
  /** Add 'print' mediaQuery: to listen for matchMedia activations */
  withPrintQuery(queries) {
    return [...queries, PRINT];
  }
  /** Is the MediaChange event for any 'print' @media */
  isPrintEvent(e) {
    return e.mediaQuery.startsWith(PRINT);
  }
  /** What is the desired mqAlias to use while printing? */
  get printAlias() {
    var _a;
    return [...(_a = this.layoutConfig.printWithBreakpoints) !== null && _a !== void 0 ? _a : []];
  }
  /** Lookup breakpoints associated with print aliases. */
  get printBreakPoints() {
    return this.printAlias.map((alias) => this.breakpoints.findByAlias(alias)).filter((bp) => bp !== null);
  }
  /** Lookup breakpoint associated with mediaQuery */
  getEventBreakpoints({
    mediaQuery
  }) {
    const bp = this.breakpoints.findByQuery(mediaQuery);
    const list = bp ? [...this.printBreakPoints, bp] : this.printBreakPoints;
    return list.sort(sortDescendingPriority);
  }
  /** Update event with printAlias mediaQuery information */
  updateEvent(event) {
    var _a;
    let bp = this.breakpoints.findByQuery(event.mediaQuery);
    if (this.isPrintEvent(event)) {
      bp = this.getEventBreakpoints(event)[0];
      event.mediaQuery = (_a = bp === null || bp === void 0 ? void 0 : bp.mediaQuery) !== null && _a !== void 0 ? _a : "";
    }
    return mergeAlias(event, bp);
  }
  // registerBeforeAfterPrintHooks registers a `beforeprint` event hook so we can
  // trigger print styles synchronously and apply proper layout styles.
  // It is a noop if the hooks have already been registered or if the document's
  // `defaultView` is not available.
  registerBeforeAfterPrintHooks(target) {
    if (!this._document.defaultView || this.registeredBeforeAfterPrintHooks) {
      return;
    }
    this.registeredBeforeAfterPrintHooks = true;
    const beforePrintListener = () => {
      if (!this.isPrinting) {
        this.isPrintingBeforeAfterEvent = true;
        this.startPrinting(target, this.getEventBreakpoints(new MediaChange(true, PRINT)));
        target.updateStyles();
      }
    };
    const afterPrintListener = () => {
      this.isPrintingBeforeAfterEvent = false;
      if (this.isPrinting) {
        this.stopPrinting(target);
        target.updateStyles();
      }
    };
    this._document.defaultView.addEventListener("beforeprint", beforePrintListener);
    this._document.defaultView.addEventListener("afterprint", afterPrintListener);
    this.beforePrintEventListeners.push(beforePrintListener);
    this.afterPrintEventListeners.push(afterPrintListener);
  }
  /**
   * Prepare RxJS tap operator with partial application
   * @return pipeable tap predicate
   */
  interceptEvents(target) {
    return (event) => {
      if (this.isPrintEvent(event)) {
        if (event.matches && !this.isPrinting) {
          this.startPrinting(target, this.getEventBreakpoints(event));
          target.updateStyles();
        } else if (!event.matches && this.isPrinting && !this.isPrintingBeforeAfterEvent) {
          this.stopPrinting(target);
          target.updateStyles();
        }
        return;
      }
      this.collectActivations(target, event);
    };
  }
  /** Stop mediaChange event propagation in event streams */
  blockPropagation() {
    return (event) => {
      return !(this.isPrinting || this.isPrintEvent(event));
    };
  }
  /**
   * Save current activateBreakpoints (for later restore)
   * and substitute only the printAlias breakpoint
   */
  startPrinting(target, bpList) {
    this.isPrinting = true;
    this.formerActivations = target.activatedBreakpoints;
    target.activatedBreakpoints = this.queue.addPrintBreakpoints(bpList);
  }
  /** For any print de-activations, reset the entire print queue */
  stopPrinting(target) {
    target.activatedBreakpoints = this.deactivations;
    this.deactivations = [];
    this.formerActivations = null;
    this.queue.clear();
    this.isPrinting = false;
  }
  /**
   * To restore pre-Print Activations, we must capture the proper
   * list of breakpoint activations BEFORE print starts. OnBeforePrint()
   * is supported; so 'print' mediaQuery activations are used as a fallback
   * in browsers without `beforeprint` support.
   *
   * >  But activated breakpoints are deactivated BEFORE 'print' activation.
   *
   * Let's capture all de-activations using the following logic:
   *
   *  When not printing:
   *    - clear cache when activating non-print breakpoint
   *    - update cache (and sort) when deactivating
   *
   *  When printing:
   *    - sort and save when starting print
   *    - restore as activatedTargets and clear when stop printing
   */
  collectActivations(target, event) {
    if (!this.isPrinting || this.isPrintingBeforeAfterEvent) {
      if (!this.isPrintingBeforeAfterEvent) {
        this.deactivations = [];
        return;
      }
      if (!event.matches) {
        const bp = this.breakpoints.findByQuery(event.mediaQuery);
        if (bp) {
          const hasFormerBp = this.formerActivations && this.formerActivations.includes(bp);
          const wasActivated = !this.formerActivations && target.activatedBreakpoints.includes(bp);
          const shouldDeactivate = hasFormerBp || wasActivated;
          if (shouldDeactivate) {
            this.deactivations.push(bp);
            this.deactivations.sort(sortDescendingPriority);
          }
        }
      }
    }
  }
  /** Teardown logic for the service. */
  ngOnDestroy() {
    if (this._document.defaultView) {
      this.beforePrintEventListeners.forEach((l) => this._document.defaultView.removeEventListener("beforeprint", l));
      this.afterPrintEventListeners.forEach((l) => this._document.defaultView.removeEventListener("afterprint", l));
    }
  }
};
PrintHook.ɵfac = function PrintHook_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PrintHook)(ɵɵinject(BreakPointRegistry), ɵɵinject(LAYOUT_CONFIG), ɵɵinject(DOCUMENT));
};
PrintHook.ɵprov = ɵɵdefineInjectable({
  token: PrintHook,
  factory: PrintHook.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrintHook, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: BreakPointRegistry
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LAYOUT_CONFIG]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var PrintQueue = class {
  constructor() {
    this.printBreakpoints = [];
  }
  addPrintBreakpoints(bpList) {
    bpList.push(BREAKPOINT_PRINT);
    bpList.sort(sortDescendingPriority);
    bpList.forEach((bp) => this.addBreakpoint(bp));
    return this.printBreakpoints;
  }
  /** Add Print breakpoint to queue */
  addBreakpoint(bp) {
    if (!!bp) {
      const bpInList = this.printBreakpoints.find((it) => it.mediaQuery === bp.mediaQuery);
      if (bpInList === void 0) {
        this.printBreakpoints = isPrintBreakPoint(bp) ? [bp, ...this.printBreakpoints] : [...this.printBreakpoints, bp];
      }
    }
  }
  /** Restore original activated breakpoints and clear internal caches */
  clear() {
    this.printBreakpoints = [];
  }
};
function isPrintBreakPoint(bp) {
  var _a;
  return (_a = bp === null || bp === void 0 ? void 0 : bp.mediaQuery.startsWith(PRINT)) !== null && _a !== void 0 ? _a : false;
}
var MediaMarshaller = class {
  constructor(matchMedia, breakpoints, hook) {
    this.matchMedia = matchMedia;
    this.breakpoints = breakpoints;
    this.hook = hook;
    this._useFallbacks = true;
    this._activatedBreakpoints = [];
    this.elementMap = /* @__PURE__ */ new Map();
    this.elementKeyMap = /* @__PURE__ */ new WeakMap();
    this.watcherMap = /* @__PURE__ */ new WeakMap();
    this.updateMap = /* @__PURE__ */ new WeakMap();
    this.clearMap = /* @__PURE__ */ new WeakMap();
    this.subject = new import_rxjs.Subject();
    this.observeActivations();
  }
  get activatedAlias() {
    var _a, _b;
    return (_b = (_a = this.activatedBreakpoints[0]) === null || _a === void 0 ? void 0 : _a.alias) !== null && _b !== void 0 ? _b : "";
  }
  set activatedBreakpoints(bps) {
    this._activatedBreakpoints = [...bps];
  }
  get activatedBreakpoints() {
    return [...this._activatedBreakpoints];
  }
  set useFallbacks(value) {
    this._useFallbacks = value;
  }
  /**
   * Update styles on breakpoint activates or deactivates
   * @param mc
   */
  onMediaChange(mc) {
    const bp = this.findByQuery(mc.mediaQuery);
    if (bp) {
      mc = mergeAlias(mc, bp);
      const bpIndex = this.activatedBreakpoints.indexOf(bp);
      if (mc.matches && bpIndex === -1) {
        this._activatedBreakpoints.push(bp);
        this._activatedBreakpoints.sort(sortDescendingPriority);
        this.updateStyles();
      } else if (!mc.matches && bpIndex !== -1) {
        this._activatedBreakpoints.splice(bpIndex, 1);
        this._activatedBreakpoints.sort(sortDescendingPriority);
        this.updateStyles();
      }
    }
  }
  /**
   * initialize the marshaller with necessary elements for delegation on an element
   * @param element
   * @param key
   * @param updateFn optional callback so that custom bp directives don't have to re-provide this
   * @param clearFn optional callback so that custom bp directives don't have to re-provide this
   * @param extraTriggers other triggers to force style updates (e.g. layout, directionality, etc)
   */
  init(element, key, updateFn, clearFn, extraTriggers = []) {
    initBuilderMap(this.updateMap, element, key, updateFn);
    initBuilderMap(this.clearMap, element, key, clearFn);
    this.buildElementKeyMap(element, key);
    this.watchExtraTriggers(element, key, extraTriggers);
  }
  /**
   * get the value for an element and key and optionally a given breakpoint
   * @param element
   * @param key
   * @param bp
   */
  getValue(element, key, bp) {
    const bpMap = this.elementMap.get(element);
    if (bpMap) {
      const values = bp !== void 0 ? bpMap.get(bp) : this.getActivatedValues(bpMap, key);
      if (values) {
        return values.get(key);
      }
    }
    return void 0;
  }
  /**
   * whether the element has values for a given key
   * @param element
   * @param key
   */
  hasValue(element, key) {
    const bpMap = this.elementMap.get(element);
    if (bpMap) {
      const values = this.getActivatedValues(bpMap, key);
      if (values) {
        return values.get(key) !== void 0 || false;
      }
    }
    return false;
  }
  /**
   * Set the value for an input on a directive
   * @param element the element in question
   * @param key the type of the directive (e.g. flex, layout-gap, etc)
   * @param bp the breakpoint suffix (empty string = default)
   * @param val the value for the breakpoint
   */
  setValue(element, key, val, bp) {
    var _a;
    let bpMap = this.elementMap.get(element);
    if (!bpMap) {
      bpMap = (/* @__PURE__ */ new Map()).set(bp, (/* @__PURE__ */ new Map()).set(key, val));
      this.elementMap.set(element, bpMap);
    } else {
      const values = ((_a = bpMap.get(bp)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Map()).set(key, val);
      bpMap.set(bp, values);
      this.elementMap.set(element, bpMap);
    }
    const value = this.getValue(element, key);
    if (value !== void 0) {
      this.updateElement(element, key, value);
    }
  }
  /** Track element value changes for a specific key */
  trackValue(element, key) {
    return this.subject.asObservable().pipe((0, import_operators.filter)((v) => v.element === element && v.key === key));
  }
  /** update all styles for all elements on the current breakpoint */
  updateStyles() {
    this.elementMap.forEach((bpMap, el) => {
      const keyMap = new Set(this.elementKeyMap.get(el));
      let valueMap = this.getActivatedValues(bpMap);
      if (valueMap) {
        valueMap.forEach((v, k) => {
          this.updateElement(el, k, v);
          keyMap.delete(k);
        });
      }
      keyMap.forEach((k) => {
        valueMap = this.getActivatedValues(bpMap, k);
        if (valueMap) {
          const value = valueMap.get(k);
          this.updateElement(el, k, value);
        } else {
          this.clearElement(el, k);
        }
      });
    });
  }
  /**
   * clear the styles for a given element
   * @param element
   * @param key
   */
  clearElement(element, key) {
    const builders = this.clearMap.get(element);
    if (builders) {
      const clearFn = builders.get(key);
      if (!!clearFn) {
        clearFn();
        this.subject.next({
          element,
          key,
          value: ""
        });
      }
    }
  }
  /**
   * update a given element with the activated values for a given key
   * @param element
   * @param key
   * @param value
   */
  updateElement(element, key, value) {
    const builders = this.updateMap.get(element);
    if (builders) {
      const updateFn = builders.get(key);
      if (!!updateFn) {
        updateFn(value);
        this.subject.next({
          element,
          key,
          value
        });
      }
    }
  }
  /**
   * release all references to a given element
   * @param element
   */
  releaseElement(element) {
    const watcherMap = this.watcherMap.get(element);
    if (watcherMap) {
      watcherMap.forEach((s) => s.unsubscribe());
      this.watcherMap.delete(element);
    }
    const elementMap = this.elementMap.get(element);
    if (elementMap) {
      elementMap.forEach((_, s) => elementMap.delete(s));
      this.elementMap.delete(element);
    }
  }
  /**
   * trigger an update for a given element and key (e.g. layout)
   * @param element
   * @param key
   */
  triggerUpdate(element, key) {
    const bpMap = this.elementMap.get(element);
    if (bpMap) {
      const valueMap = this.getActivatedValues(bpMap, key);
      if (valueMap) {
        if (key) {
          this.updateElement(element, key, valueMap.get(key));
        } else {
          valueMap.forEach((v, k) => this.updateElement(element, k, v));
        }
      }
    }
  }
  /** Cross-reference for HTMLElement with directive key */
  buildElementKeyMap(element, key) {
    let keyMap = this.elementKeyMap.get(element);
    if (!keyMap) {
      keyMap = /* @__PURE__ */ new Set();
      this.elementKeyMap.set(element, keyMap);
    }
    keyMap.add(key);
  }
  /**
   * Other triggers that should force style updates:
   * - directionality
   * - layout changes
   * - mutationobserver updates
   */
  watchExtraTriggers(element, key, triggers) {
    if (triggers && triggers.length) {
      let watchers = this.watcherMap.get(element);
      if (!watchers) {
        watchers = /* @__PURE__ */ new Map();
        this.watcherMap.set(element, watchers);
      }
      const subscription = watchers.get(key);
      if (!subscription) {
        const newSubscription = (0, import_rxjs.merge)(...triggers).subscribe(() => {
          const currentValue = this.getValue(element, key);
          this.updateElement(element, key, currentValue);
        });
        watchers.set(key, newSubscription);
      }
    }
  }
  /** Breakpoint locator by mediaQuery */
  findByQuery(query) {
    return this.breakpoints.findByQuery(query);
  }
  /**
   * get the fallback breakpoint for a given element, starting with the current breakpoint
   * @param bpMap
   * @param key
   */
  getActivatedValues(bpMap, key) {
    for (let i = 0; i < this.activatedBreakpoints.length; i++) {
      const activatedBp = this.activatedBreakpoints[i];
      const valueMap = bpMap.get(activatedBp.alias);
      if (valueMap) {
        if (key === void 0 || valueMap.has(key) && valueMap.get(key) != null) {
          return valueMap;
        }
      }
    }
    if (!this._useFallbacks) {
      return void 0;
    }
    const lastHope = bpMap.get("");
    return key === void 0 || lastHope && lastHope.has(key) ? lastHope : void 0;
  }
  /**
   * Watch for mediaQuery breakpoint activations
   */
  observeActivations() {
    const queries = this.breakpoints.items.map((bp) => bp.mediaQuery);
    this.hook.registerBeforeAfterPrintHooks(this);
    this.matchMedia.observe(this.hook.withPrintQuery(queries)).pipe((0, import_operators.tap)(this.hook.interceptEvents(this)), (0, import_operators.filter)(this.hook.blockPropagation())).subscribe(this.onMediaChange.bind(this));
  }
};
MediaMarshaller.ɵfac = function MediaMarshaller_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MediaMarshaller)(ɵɵinject(MatchMedia), ɵɵinject(BreakPointRegistry), ɵɵinject(PrintHook));
};
MediaMarshaller.ɵprov = ɵɵdefineInjectable({
  token: MediaMarshaller,
  factory: MediaMarshaller.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MediaMarshaller, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: MatchMedia
    }, {
      type: BreakPointRegistry
    }, {
      type: PrintHook
    }];
  }, null);
})();
function initBuilderMap(map2, element, key, input) {
  var _a;
  if (input !== void 0) {
    const oldMap = (_a = map2.get(element)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Map();
    oldMap.set(key, input);
    map2.set(element, oldMap);
  }
}
var BaseDirective2 = class {
  constructor(elementRef, styleBuilder, styler, marshal) {
    this.elementRef = elementRef;
    this.styleBuilder = styleBuilder;
    this.styler = styler;
    this.marshal = marshal;
    this.DIRECTIVE_KEY = "";
    this.inputs = [];
    this.mru = {};
    this.destroySubject = new import_rxjs.Subject();
    this.styleCache = /* @__PURE__ */ new Map();
  }
  /** Access to host element's parent DOM node */
  get parentElement() {
    return this.elementRef.nativeElement.parentElement;
  }
  /** Access to the HTMLElement for the directive */
  get nativeElement() {
    return this.elementRef.nativeElement;
  }
  /** Access to the activated value for the directive */
  get activatedValue() {
    return this.marshal.getValue(this.nativeElement, this.DIRECTIVE_KEY);
  }
  set activatedValue(value) {
    this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, value, this.marshal.activatedAlias);
  }
  /** For @Input changes */
  ngOnChanges(changes) {
    Object.keys(changes).forEach((key) => {
      if (this.inputs.indexOf(key) !== -1) {
        const bp = key.split(".").slice(1).join(".");
        const val = changes[key].currentValue;
        this.setValue(val, bp);
      }
    });
  }
  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
    this.marshal.releaseElement(this.nativeElement);
  }
  /** Register with central marshaller service */
  init(extraTriggers = []) {
    this.marshal.init(this.elementRef.nativeElement, this.DIRECTIVE_KEY, this.updateWithValue.bind(this), this.clearStyles.bind(this), extraTriggers);
  }
  /** Add styles to the element using predefined style builder */
  addStyles(input, parent) {
    const builder = this.styleBuilder;
    const useCache = builder.shouldCache;
    let genStyles = this.styleCache.get(input);
    if (!genStyles || !useCache) {
      genStyles = builder.buildStyles(input, parent);
      if (useCache) {
        this.styleCache.set(input, genStyles);
      }
    }
    this.mru = Object.assign({}, genStyles);
    this.applyStyleToElement(genStyles);
    builder.sideEffect(input, genStyles, parent);
  }
  /** Remove generated styles from an element using predefined style builder */
  clearStyles() {
    Object.keys(this.mru).forEach((k) => {
      this.mru[k] = "";
    });
    this.applyStyleToElement(this.mru);
    this.mru = {};
    this.currentValue = void 0;
  }
  /** Force trigger style updates on DOM element */
  triggerUpdate() {
    this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY);
  }
  /**
   * Determine the DOM element's Flexbox flow (flex-direction).
   *
   * Check inline style first then check computed (stylesheet) style.
   * And optionally add the flow value to element's inline style.
   */
  getFlexFlowDirection(target, addIfMissing = false) {
    if (target) {
      const [value, hasInlineValue] = this.styler.getFlowDirection(target);
      if (!hasInlineValue && addIfMissing) {
        const style = buildLayoutCSS(value);
        const elements = [target];
        this.styler.applyStyleToElements(style, elements);
      }
      return value.trim();
    }
    return "row";
  }
  hasWrap(target) {
    return this.styler.hasWrap(target);
  }
  /** Applies styles given via string pair or object map to the directive element */
  applyStyleToElement(style, value, element = this.nativeElement) {
    this.styler.applyStyleToElement(element, style, value);
  }
  setValue(val, bp) {
    this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, val, bp);
  }
  updateWithValue(input) {
    if (this.currentValue !== input) {
      this.addStyles(input);
      this.currentValue = input;
    }
  }
};
BaseDirective2.ɵfac = function BaseDirective2_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || BaseDirective2)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
};
BaseDirective2.ɵdir = ɵɵdefineDirective({
  type: BaseDirective2,
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseDirective2, [{
    type: Directive
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: StyleBuilder
    }, {
      type: StyleUtils
    }, {
      type: MediaMarshaller
    }];
  }, null);
})();
var MockMatchMedia = class extends MatchMedia {
  constructor(_zone, _platformId, _document, _breakpoints) {
    super(_zone, _platformId, _document);
    this._breakpoints = _breakpoints;
    this.autoRegisterQueries = true;
    this.useOverlaps = false;
  }
  /** Easy method to clear all listeners for all mediaQueries */
  clearAll() {
    this.registry.forEach((mql) => {
      mql.destroy();
    });
    this.registry.clear();
    this.useOverlaps = false;
  }
  /** Feature to support manual, simulated activation of a mediaQuery. */
  activate(mediaQuery, useOverlaps = this.useOverlaps) {
    mediaQuery = this._validateQuery(mediaQuery);
    if (useOverlaps || !this.isActive(mediaQuery)) {
      this._deactivateAll();
      this._registerMediaQuery(mediaQuery);
      this._activateWithOverlaps(mediaQuery, useOverlaps);
    }
    return this.hasActivated;
  }
  /** Converts an optional mediaQuery alias to a specific, valid mediaQuery */
  _validateQuery(queryOrAlias) {
    var _a;
    const bp = this._breakpoints.findByAlias(queryOrAlias);
    return (_a = bp === null || bp === void 0 ? void 0 : bp.mediaQuery) !== null && _a !== void 0 ? _a : queryOrAlias;
  }
  /**
   * Manually onMediaChange any overlapping mediaQueries to simulate
   * similar functionality in the window.matchMedia()
   */
  _activateWithOverlaps(mediaQuery, useOverlaps) {
    var _a;
    if (useOverlaps) {
      const bp = this._breakpoints.findByQuery(mediaQuery);
      const alias = (_a = bp === null || bp === void 0 ? void 0 : bp.alias) !== null && _a !== void 0 ? _a : "unknown";
      switch (alias) {
        case "lg":
          this._activateByAlias(["lt-xl"]);
          break;
        case "md":
          this._activateByAlias(["lt-xl", "lt-lg"]);
          break;
        case "sm":
          this._activateByAlias(["lt-xl", "lt-lg", "lt-md"]);
          break;
        case "xs":
          this._activateByAlias(["lt-xl", "lt-lg", "lt-md", "lt-sm"]);
          break;
      }
      switch (alias) {
        case "xl":
          this._activateByAlias(["gt-lg", "gt-md", "gt-sm", "gt-xs"]);
          break;
        case "lg":
          this._activateByAlias(["gt-md", "gt-sm", "gt-xs"]);
          break;
        case "md":
          this._activateByAlias(["gt-sm", "gt-xs"]);
          break;
        case "sm":
          this._activateByAlias(["gt-xs"]);
          break;
      }
    }
    return this._activateByQuery(mediaQuery);
  }
  /**
   *
   */
  _activateByAlias(aliases) {
    const activate = (alias) => {
      var _a;
      const bp = this._breakpoints.findByAlias(alias);
      this._activateByQuery((_a = bp === null || bp === void 0 ? void 0 : bp.mediaQuery) !== null && _a !== void 0 ? _a : alias);
    };
    aliases.forEach(activate);
  }
  /**
   *
   */
  _activateByQuery(mediaQuery) {
    if (!this.registry.has(mediaQuery) && this.autoRegisterQueries) {
      this._registerMediaQuery(mediaQuery);
    }
    const mql = this.registry.get(mediaQuery);
    if (mql && !this.isActive(mediaQuery)) {
      this.registry.set(mediaQuery, mql.activate());
    }
    return this.hasActivated;
  }
  /** Deactivate all current MQLs and reset the buffer */
  _deactivateAll() {
    this.registry.forEach((it) => {
      it.deactivate();
    });
    return this;
  }
  /** Insure the mediaQuery is registered with MatchMedia */
  _registerMediaQuery(mediaQuery) {
    if (!this.registry.has(mediaQuery) && this.autoRegisterQueries) {
      this.registerQuery(mediaQuery);
    }
  }
  /**
   * Call window.matchMedia() to build a MediaQueryList; which
   * supports 0..n listeners for activation/deactivation
   */
  buildMQL(query) {
    return new MockMediaQueryList(query);
  }
  get hasActivated() {
    return this.activations.length > 0;
  }
};
MockMatchMedia.ɵfac = function MockMatchMedia_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MockMatchMedia)(ɵɵinject(NgZone), ɵɵinject(PLATFORM_ID), ɵɵinject(DOCUMENT), ɵɵinject(BreakPointRegistry));
};
MockMatchMedia.ɵprov = ɵɵdefineInjectable({
  token: MockMatchMedia,
  factory: MockMatchMedia.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MockMatchMedia, [{
    type: Injectable
  }], function() {
    return [{
      type: NgZone
    }, {
      type: Object,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: BreakPointRegistry
    }];
  }, null);
})();
var MockMediaQueryList = class extends EventTarget {
  constructor(_mediaQuery) {
    super();
    this._mediaQuery = _mediaQuery;
    this._isActive = false;
    this._listeners = [];
    this.onchange = null;
  }
  get matches() {
    return this._isActive;
  }
  get media() {
    return this._mediaQuery;
  }
  /**
   * Destroy the current list by deactivating the
   * listeners and clearing the internal list
   */
  destroy() {
    this.deactivate();
    this._listeners = [];
  }
  /** Notify all listeners that 'matches === TRUE' */
  activate() {
    if (!this._isActive) {
      this._isActive = true;
      this._listeners.forEach((callback) => {
        const cb = callback;
        cb.call(this, {
          matches: this.matches,
          media: this.media
        });
      });
    }
    return this;
  }
  /** Notify all listeners that 'matches === false' */
  deactivate() {
    if (this._isActive) {
      this._isActive = false;
      this._listeners.forEach((callback) => {
        const cb = callback;
        cb.call(this, {
          matches: this.matches,
          media: this.media
        });
      });
    }
    return this;
  }
  /** Add a listener to our internal list to activate later */
  addListener(listener) {
    if (this._listeners.indexOf(listener) === -1) {
      this._listeners.push(listener);
    }
    if (this._isActive) {
      const cb = listener;
      cb.call(this, {
        matches: this.matches,
        media: this.media
      });
    }
  }
  /** Don't need to remove listeners in the testing environment */
  removeListener(_) {
  }
  dispatchEvent(_) {
    return false;
  }
};
var MockMatchMediaProvider = {
  provide: MatchMedia,
  useClass: MockMatchMedia
};
function coerceArray(value) {
  return Array.isArray(value) ? value : [value];
}
var MediaObserver = class {
  constructor(breakpoints, matchMedia, hook) {
    this.breakpoints = breakpoints;
    this.matchMedia = matchMedia;
    this.hook = hook;
    this.filterOverlaps = false;
    this.destroyed$ = new import_rxjs.Subject();
    this._media$ = this.watchActivations();
  }
  /**
   * Completes the active subject, signalling to all complete for all
   * MediaObserver subscribers
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  // ************************************************
  // Public Methods
  // ************************************************
  /**
   * Observe changes to current activation 'list'
   */
  asObservable() {
    return this._media$;
  }
  /**
   * Allow programmatic query to determine if one or more media query/alias match
   * the current viewport size.
   * @param value One or more media queries (or aliases) to check.
   * @returns Whether any of the media queries match.
   */
  isActive(value) {
    const aliases = splitQueries(coerceArray(value));
    return aliases.some((alias) => {
      const query = toMediaQuery(alias, this.breakpoints);
      return query !== null && this.matchMedia.isActive(query);
    });
  }
  // ************************************************
  // Internal Methods
  // ************************************************
  /**
   * Register all the mediaQueries registered in the BreakPointRegistry
   * This is needed so subscribers can be auto-notified of all standard, registered
   * mediaQuery activations
   */
  watchActivations() {
    const queries = this.breakpoints.items.map((bp) => bp.mediaQuery);
    return this.buildObservable(queries);
  }
  /**
   * Only pass/announce activations (not de-activations)
   *
   * Since multiple-mediaQueries can be activation in a cycle,
   * gather all current activations into a single list of changes to observers
   *
   * Inject associated (if any) alias information into the MediaChange event
   * - Exclude mediaQuery activations for overlapping mQs. List bounded mQ ranges only
   * - Exclude print activations that do not have an associated mediaQuery
   *
   * NOTE: the raw MediaChange events [from MatchMedia] do not
   *       contain important alias information; as such this info
   *       must be injected into the MediaChange
   */
  buildObservable(mqList) {
    const hasChanges = (changes) => {
      const isValidQuery = (change) => change.mediaQuery.length > 0;
      return changes.filter(isValidQuery).length > 0;
    };
    const excludeOverlaps = (changes) => {
      return !this.filterOverlaps ? changes : changes.filter((change) => {
        var _a;
        const bp = this.breakpoints.findByQuery(change.mediaQuery);
        return (_a = bp === null || bp === void 0 ? void 0 : bp.overlapping) !== null && _a !== void 0 ? _a : true;
      });
    };
    const ignoreDuplicates = (previous, current) => {
      if (previous.length !== current.length) {
        return false;
      }
      const previousMqs = previous.map((mc) => mc.mediaQuery);
      const currentMqs = new Set(current.map((mc) => mc.mediaQuery));
      const difference = new Set(previousMqs.filter((mq) => !currentMqs.has(mq)));
      return difference.size === 0;
    };
    return this.matchMedia.observe(this.hook.withPrintQuery(mqList)).pipe((0, import_operators.filter)((change) => change.matches), (0, import_operators.debounceTime)(0, import_rxjs.asapScheduler), (0, import_operators.switchMap)((_) => (0, import_rxjs.of)(this.findAllActivations())), (0, import_operators.map)(excludeOverlaps), (0, import_operators.filter)(hasChanges), (0, import_operators.distinctUntilChanged)(ignoreDuplicates), (0, import_operators.takeUntil)(this.destroyed$));
  }
  /**
   * Find all current activations and prepare single list of activations
   * sorted by descending priority.
   */
  findAllActivations() {
    const mergeMQAlias = (change) => {
      const bp = this.breakpoints.findByQuery(change.mediaQuery);
      return mergeAlias(change, bp);
    };
    const replaceWithPrintAlias = (change) => this.hook.isPrintEvent(change) ? this.hook.updateEvent(change) : change;
    return this.matchMedia.activations.map((query) => new MediaChange(true, query)).map(replaceWithPrintAlias).map(mergeMQAlias).sort(sortDescendingPriority);
  }
};
MediaObserver.ɵfac = function MediaObserver_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MediaObserver)(ɵɵinject(BreakPointRegistry), ɵɵinject(MatchMedia), ɵɵinject(PrintHook));
};
MediaObserver.ɵprov = ɵɵdefineInjectable({
  token: MediaObserver,
  factory: MediaObserver.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MediaObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: BreakPointRegistry
    }, {
      type: MatchMedia
    }, {
      type: PrintHook
    }];
  }, null);
})();
function toMediaQuery(query, locator) {
  var _a, _b;
  const bp = (_a = locator.findByAlias(query)) !== null && _a !== void 0 ? _a : locator.findByQuery(query);
  return (_b = bp === null || bp === void 0 ? void 0 : bp.mediaQuery) !== null && _b !== void 0 ? _b : null;
}
function splitQueries(queries) {
  return queries.flatMap((query) => query.split(",")).map((query) => query.trim());
}
var MediaTrigger = class {
  constructor(breakpoints, matchMedia, layoutConfig, _platformId, _document) {
    this.breakpoints = breakpoints;
    this.matchMedia = matchMedia;
    this.layoutConfig = layoutConfig;
    this._platformId = _platformId;
    this._document = _document;
    this.hasCachedRegistryMatches = false;
    this.originalActivations = [];
    this.originalRegistry = /* @__PURE__ */ new Map();
  }
  /**
   * Manually activate range of breakpoints
   * @param list array of mediaQuery or alias strings
   */
  activate(list) {
    list = list.map((it) => it.trim());
    this.saveActivations();
    this.deactivateAll();
    this.setActivations(list);
    this.prepareAutoRestore();
  }
  /**
   * Restore original, 'real' breakpoints and emit events
   * to trigger stream notification
   */
  restore() {
    if (this.hasCachedRegistryMatches) {
      const extractQuery = (change) => change.mediaQuery;
      const list = this.originalActivations.map(extractQuery);
      try {
        this.deactivateAll();
        this.restoreRegistryMatches();
        this.setActivations(list);
      } finally {
        this.originalActivations = [];
        if (this.resizeSubscription) {
          this.resizeSubscription.unsubscribe();
        }
      }
    }
  }
  // ************************************************
  // Internal Methods
  // ************************************************
  /**
   * Whenever window resizes, immediately auto-restore original
   * activations (if we are simulating activations)
   */
  prepareAutoRestore() {
    const isBrowser = isPlatformBrowser(this._platformId) && this._document;
    const enableAutoRestore = isBrowser && this.layoutConfig.mediaTriggerAutoRestore;
    if (enableAutoRestore) {
      const resize$ = (0, import_rxjs.fromEvent)(window, "resize").pipe((0, import_operators.take)(1));
      this.resizeSubscription = resize$.subscribe(this.restore.bind(this));
    }
  }
  /**
   * Notify all matchMedia subscribers of de-activations
   *
   * Note: we must force 'matches' updates for
   *       future matchMedia::activation lookups
   */
  deactivateAll() {
    const list = this.currentActivations;
    this.forceRegistryMatches(list, false);
    this.simulateMediaChanges(list, false);
  }
  /**
   * Cache current activations as sorted, prioritized list of MediaChanges
   */
  saveActivations() {
    if (!this.hasCachedRegistryMatches) {
      const toMediaChange = (query) => new MediaChange(true, query);
      const mergeMQAlias = (change) => {
        const bp = this.breakpoints.findByQuery(change.mediaQuery);
        return mergeAlias(change, bp);
      };
      this.originalActivations = this.currentActivations.map(toMediaChange).map(mergeMQAlias).sort(sortDescendingPriority);
      this.cacheRegistryMatches();
    }
  }
  /**
   * Force set manual activations for specified mediaQuery list
   */
  setActivations(list) {
    if (!!this.originalRegistry) {
      this.forceRegistryMatches(list, true);
    }
    this.simulateMediaChanges(list);
  }
  /**
   * For specified mediaQuery list manually simulate activations or deactivations
   */
  simulateMediaChanges(queries, matches = true) {
    const toMediaQuery2 = (query) => {
      const locator = this.breakpoints;
      const bp = locator.findByAlias(query) || locator.findByQuery(query);
      return bp ? bp.mediaQuery : query;
    };
    const emitChangeEvent = (query) => this.emitChangeEvent(matches, query);
    queries.map(toMediaQuery2).forEach(emitChangeEvent);
  }
  /**
   * Replace current registry with simulated registry...
   * Note: this is required since MediaQueryList::matches is 'readOnly'
   */
  forceRegistryMatches(queries, matches) {
    const registry = /* @__PURE__ */ new Map();
    queries.forEach((query) => {
      registry.set(query, {
        matches
      });
    });
    this.matchMedia.registry = registry;
  }
  /**
   * Save current MatchMedia::registry items.
   */
  cacheRegistryMatches() {
    const target = this.originalRegistry;
    target.clear();
    this.matchMedia.registry.forEach((value, key) => {
      target.set(key, value);
    });
    this.hasCachedRegistryMatches = true;
  }
  /**
   * Restore original, 'true' registry
   */
  restoreRegistryMatches() {
    const target = this.matchMedia.registry;
    target.clear();
    this.originalRegistry.forEach((value, key) => {
      target.set(key, value);
    });
    this.originalRegistry.clear();
    this.hasCachedRegistryMatches = false;
  }
  /**
   * Manually emit a MediaChange event via the MatchMedia to MediaMarshaller and MediaObserver
   */
  emitChangeEvent(matches, query) {
    this.matchMedia.source.next(new MediaChange(matches, query));
  }
  get currentActivations() {
    return this.matchMedia.activations;
  }
};
MediaTrigger.ɵfac = function MediaTrigger_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MediaTrigger)(ɵɵinject(BreakPointRegistry), ɵɵinject(MatchMedia), ɵɵinject(LAYOUT_CONFIG), ɵɵinject(PLATFORM_ID), ɵɵinject(DOCUMENT));
};
MediaTrigger.ɵprov = ɵɵdefineInjectable({
  token: MediaTrigger,
  factory: MediaTrigger.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MediaTrigger, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: BreakPointRegistry
    }, {
      type: MatchMedia
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LAYOUT_CONFIG]
      }]
    }, {
      type: Object,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
function validateBasis(basis, grow = "1", shrink = "1") {
  let parts = [grow, shrink, basis];
  let j = basis.indexOf("calc");
  if (j > 0) {
    parts[2] = _validateCalcValue(basis.substring(j).trim());
    let matches = basis.substr(0, j).trim().split(" ");
    if (matches.length == 2) {
      parts[0] = matches[0];
      parts[1] = matches[1];
    }
  } else if (j == 0) {
    parts[2] = _validateCalcValue(basis.trim());
  } else {
    let matches = basis.split(" ");
    parts = matches.length === 3 ? matches : [grow, shrink, basis];
  }
  return parts;
}
function _validateCalcValue(calc) {
  return calc.replace(/[\s]/g, "").replace(/[\/\*\+\-]/g, " $& ");
}
var MULTIPLIER_SUFFIX = "x";
function multiply(value, multiplier) {
  if (multiplier === void 0) {
    return value;
  }
  const transformValue = (possibleValue) => {
    const numberValue = +possibleValue.slice(0, -MULTIPLIER_SUFFIX.length);
    if (value.endsWith(MULTIPLIER_SUFFIX) && !isNaN(numberValue)) {
      return `${numberValue * multiplier.value}${multiplier.unit}`;
    }
    return value;
  };
  return value.includes(" ") ? value.split(" ").map(transformValue).join(" ") : transformValue(value);
}

// node_modules/@angular/flex-layout/fesm2015/angular-flex-layout-flex.mjs
var import_rxjs2 = __toESM(require_cjs(), 1);
var import_operators2 = __toESM(require_operators(), 1);
var LayoutStyleBuilder = class extends StyleBuilder {
  buildStyles(input, {
    display
  }) {
    const css = buildLayoutCSS(input);
    return Object.assign(Object.assign({}, css), {
      display: display === "none" ? display : css.display
    });
  }
};
LayoutStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵLayoutStyleBuilder_BaseFactory;
  return function LayoutStyleBuilder_Factory(__ngFactoryType__) {
    return (ɵLayoutStyleBuilder_BaseFactory || (ɵLayoutStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(LayoutStyleBuilder)))(__ngFactoryType__ || LayoutStyleBuilder);
  };
})();
LayoutStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: LayoutStyleBuilder,
  factory: LayoutStyleBuilder.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$6 = ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"];
var selector$6 = `
  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],
  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],
  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],
  [fxLayout.gt-md], [fxLayout.gt-lg]
`;
var LayoutDirective = class extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal, _config) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this._config = _config;
    this.DIRECTIVE_KEY = "layout";
    this.init();
  }
  updateWithValue(input) {
    var _a;
    const detectLayoutDisplay = this._config.detectLayoutDisplay;
    const display = detectLayoutDisplay ? this.styler.lookupStyle(this.nativeElement, "display") : "";
    this.styleCache = (_a = cacheMap.get(display)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Map();
    cacheMap.set(display, this.styleCache);
    if (this.currentValue !== input) {
      this.addStyles(input, {
        display
      });
      this.currentValue = input;
    }
  }
};
LayoutDirective.ɵfac = function LayoutDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LayoutDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutStyleBuilder), ɵɵdirectiveInject(MediaMarshaller), ɵɵdirectiveInject(LAYOUT_CONFIG));
};
LayoutDirective.ɵdir = ɵɵdefineDirective({
  type: LayoutDirective,
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutDirective, [{
    type: Directive
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: StyleUtils
    }, {
      type: LayoutStyleBuilder
    }, {
      type: MediaMarshaller
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LAYOUT_CONFIG]
      }]
    }];
  }, null);
})();
var DefaultLayoutDirective = class extends LayoutDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$6;
  }
};
DefaultLayoutDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultLayoutDirective_BaseFactory;
  return function DefaultLayoutDirective_Factory(__ngFactoryType__) {
    return (ɵDefaultLayoutDirective_BaseFactory || (ɵDefaultLayoutDirective_BaseFactory = ɵɵgetInheritedFactory(DefaultLayoutDirective)))(__ngFactoryType__ || DefaultLayoutDirective);
  };
})();
DefaultLayoutDirective.ɵdir = ɵɵdefineDirective({
  type: DefaultLayoutDirective,
  selectors: [["", "fxLayout", ""], ["", "fxLayout.xs", ""], ["", "fxLayout.sm", ""], ["", "fxLayout.md", ""], ["", "fxLayout.lg", ""], ["", "fxLayout.xl", ""], ["", "fxLayout.lt-sm", ""], ["", "fxLayout.lt-md", ""], ["", "fxLayout.lt-lg", ""], ["", "fxLayout.lt-xl", ""], ["", "fxLayout.gt-xs", ""], ["", "fxLayout.gt-sm", ""], ["", "fxLayout.gt-md", ""], ["", "fxLayout.gt-lg", ""]],
  inputs: {
    fxLayout: "fxLayout",
    "fxLayout.xs": "fxLayout.xs",
    "fxLayout.sm": "fxLayout.sm",
    "fxLayout.md": "fxLayout.md",
    "fxLayout.lg": "fxLayout.lg",
    "fxLayout.xl": "fxLayout.xl",
    "fxLayout.lt-sm": "fxLayout.lt-sm",
    "fxLayout.lt-md": "fxLayout.lt-md",
    "fxLayout.lt-lg": "fxLayout.lt-lg",
    "fxLayout.lt-xl": "fxLayout.lt-xl",
    "fxLayout.gt-xs": "fxLayout.gt-xs",
    "fxLayout.gt-sm": "fxLayout.gt-sm",
    "fxLayout.gt-md": "fxLayout.gt-md",
    "fxLayout.gt-lg": "fxLayout.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutDirective, [{
    type: Directive,
    args: [{
      selector: selector$6,
      inputs: inputs$6
    }]
  }], null, null);
})();
var cacheMap = /* @__PURE__ */ new Map();
var CLEAR_MARGIN_CSS = {
  "margin-left": null,
  "margin-right": null,
  "margin-top": null,
  "margin-bottom": null
};
var LayoutGapStyleBuilder = class extends StyleBuilder {
  constructor(_styler, _config) {
    super();
    this._styler = _styler;
    this._config = _config;
  }
  buildStyles(gapValue, parent) {
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
      gapValue = multiply(gapValue, this._config.multiplier);
      return buildGridMargin(gapValue, parent.directionality);
    } else {
      return {};
    }
  }
  sideEffect(gapValue, _styles, parent) {
    const items = parent.items;
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
      gapValue = multiply(gapValue, this._config.multiplier);
      const paddingStyles = buildGridPadding(gapValue, parent.directionality);
      this._styler.applyStyleToElements(paddingStyles, parent.items);
    } else {
      gapValue = multiply(gapValue, this._config.multiplier);
      gapValue = this.addFallbackUnit(gapValue);
      const lastItem = items.pop();
      const gapCss = buildGapCSS(gapValue, parent);
      this._styler.applyStyleToElements(gapCss, items);
      this._styler.applyStyleToElements(CLEAR_MARGIN_CSS, [lastItem]);
    }
  }
  addFallbackUnit(value) {
    return !isNaN(+value) ? `${value}${this._config.defaultUnit}` : value;
  }
};
LayoutGapStyleBuilder.ɵfac = function LayoutGapStyleBuilder_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LayoutGapStyleBuilder)(ɵɵinject(StyleUtils), ɵɵinject(LAYOUT_CONFIG));
};
LayoutGapStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: LayoutGapStyleBuilder,
  factory: LayoutGapStyleBuilder.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutGapStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: StyleUtils
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LAYOUT_CONFIG]
      }]
    }];
  }, null);
})();
var inputs$5 = ["fxLayoutGap", "fxLayoutGap.xs", "fxLayoutGap.sm", "fxLayoutGap.md", "fxLayoutGap.lg", "fxLayoutGap.xl", "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg"];
var selector$5 = `
  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],
  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],
  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],
  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]
`;
var LayoutGapDirective = class extends BaseDirective2 {
  constructor(elRef, zone, directionality, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.zone = zone;
    this.directionality = directionality;
    this.styleUtils = styleUtils;
    this.layout = "row";
    this.DIRECTIVE_KEY = "layout-gap";
    this.observerSubject = new import_rxjs2.Subject();
    const extraTriggers = [this.directionality.change, this.observerSubject.asObservable()];
    this.init(extraTriggers);
    this.marshal.trackValue(this.nativeElement, "layout").pipe((0, import_operators2.takeUntil)(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
  }
  /** Special accessor to query for all child 'element' nodes regardless of type, class, etc */
  get childrenNodes() {
    const obj = this.nativeElement.children;
    const buffer = [];
    for (let i = obj.length; i--; ) {
      buffer[i] = obj[i];
    }
    return buffer;
  }
  // *********************************************
  // Lifecycle Methods
  // *********************************************
  ngAfterContentInit() {
    this.buildChildObservable();
    this.triggerUpdate();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   * Cache the parent container 'flex-direction' and update the 'margin' styles
   */
  onLayoutChange(matcher) {
    const layout = matcher.value;
    const direction = layout.split(" ");
    this.layout = direction[0];
    if (!LAYOUT_VALUES.find((x) => x === this.layout)) {
      this.layout = "row";
    }
    this.triggerUpdate();
  }
  /**
   *
   */
  updateWithValue(value) {
    const items = this.childrenNodes.filter((el) => el.nodeType === 1 && this.willDisplay(el)).sort((a, b) => {
      const orderA = +this.styler.lookupStyle(a, "order");
      const orderB = +this.styler.lookupStyle(b, "order");
      if (isNaN(orderA) || isNaN(orderB) || orderA === orderB) {
        return 0;
      } else {
        return orderA > orderB ? 1 : -1;
      }
    });
    if (items.length > 0) {
      const directionality = this.directionality.value;
      const layout = this.layout;
      if (layout === "row" && directionality === "rtl") {
        this.styleCache = layoutGapCacheRowRtl;
      } else if (layout === "row" && directionality !== "rtl") {
        this.styleCache = layoutGapCacheRowLtr;
      } else if (layout === "column" && directionality === "rtl") {
        this.styleCache = layoutGapCacheColumnRtl;
      } else if (layout === "column" && directionality !== "rtl") {
        this.styleCache = layoutGapCacheColumnLtr;
      }
      this.addStyles(value, {
        directionality,
        items,
        layout
      });
    }
  }
  /** We need to override clearStyles because in most cases mru isn't populated */
  clearStyles() {
    const gridMode = Object.keys(this.mru).length > 0;
    const childrenStyle = gridMode ? "padding" : getMarginType(this.directionality.value, this.layout);
    if (gridMode) {
      super.clearStyles();
    }
    this.styleUtils.applyStyleToElements({
      [childrenStyle]: ""
    }, this.childrenNodes);
  }
  /** Determine if an element will show or hide based on current activation */
  willDisplay(source) {
    const value = this.marshal.getValue(source, "show-hide");
    return value === true || value === void 0 && this.styleUtils.lookupStyle(source, "display") !== "none";
  }
  buildChildObservable() {
    this.zone.runOutsideAngular(() => {
      if (typeof MutationObserver !== "undefined") {
        this.observer = new MutationObserver((mutations) => {
          const validatedChanges = (it) => {
            return it.addedNodes && it.addedNodes.length > 0 || it.removedNodes && it.removedNodes.length > 0;
          };
          if (mutations.some(validatedChanges)) {
            this.observerSubject.next();
          }
        });
        this.observer.observe(this.nativeElement, {
          childList: true
        });
      }
    });
  }
};
LayoutGapDirective.ɵfac = function LayoutGapDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LayoutGapDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Directionality), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutGapStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
LayoutGapDirective.ɵdir = ɵɵdefineDirective({
  type: LayoutGapDirective,
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutGapDirective, [{
    type: Directive
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: Directionality
    }, {
      type: StyleUtils
    }, {
      type: LayoutGapStyleBuilder
    }, {
      type: MediaMarshaller
    }];
  }, null);
})();
var DefaultLayoutGapDirective = class extends LayoutGapDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$5;
  }
};
DefaultLayoutGapDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultLayoutGapDirective_BaseFactory;
  return function DefaultLayoutGapDirective_Factory(__ngFactoryType__) {
    return (ɵDefaultLayoutGapDirective_BaseFactory || (ɵDefaultLayoutGapDirective_BaseFactory = ɵɵgetInheritedFactory(DefaultLayoutGapDirective)))(__ngFactoryType__ || DefaultLayoutGapDirective);
  };
})();
DefaultLayoutGapDirective.ɵdir = ɵɵdefineDirective({
  type: DefaultLayoutGapDirective,
  selectors: [["", "fxLayoutGap", ""], ["", "fxLayoutGap.xs", ""], ["", "fxLayoutGap.sm", ""], ["", "fxLayoutGap.md", ""], ["", "fxLayoutGap.lg", ""], ["", "fxLayoutGap.xl", ""], ["", "fxLayoutGap.lt-sm", ""], ["", "fxLayoutGap.lt-md", ""], ["", "fxLayoutGap.lt-lg", ""], ["", "fxLayoutGap.lt-xl", ""], ["", "fxLayoutGap.gt-xs", ""], ["", "fxLayoutGap.gt-sm", ""], ["", "fxLayoutGap.gt-md", ""], ["", "fxLayoutGap.gt-lg", ""]],
  inputs: {
    fxLayoutGap: "fxLayoutGap",
    "fxLayoutGap.xs": "fxLayoutGap.xs",
    "fxLayoutGap.sm": "fxLayoutGap.sm",
    "fxLayoutGap.md": "fxLayoutGap.md",
    "fxLayoutGap.lg": "fxLayoutGap.lg",
    "fxLayoutGap.xl": "fxLayoutGap.xl",
    "fxLayoutGap.lt-sm": "fxLayoutGap.lt-sm",
    "fxLayoutGap.lt-md": "fxLayoutGap.lt-md",
    "fxLayoutGap.lt-lg": "fxLayoutGap.lt-lg",
    "fxLayoutGap.lt-xl": "fxLayoutGap.lt-xl",
    "fxLayoutGap.gt-xs": "fxLayoutGap.gt-xs",
    "fxLayoutGap.gt-sm": "fxLayoutGap.gt-sm",
    "fxLayoutGap.gt-md": "fxLayoutGap.gt-md",
    "fxLayoutGap.gt-lg": "fxLayoutGap.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutGapDirective, [{
    type: Directive,
    args: [{
      selector: selector$5,
      inputs: inputs$5
    }]
  }], null, null);
})();
var layoutGapCacheRowRtl = /* @__PURE__ */ new Map();
var layoutGapCacheColumnRtl = /* @__PURE__ */ new Map();
var layoutGapCacheRowLtr = /* @__PURE__ */ new Map();
var layoutGapCacheColumnLtr = /* @__PURE__ */ new Map();
var GRID_SPECIFIER = " grid";
function buildGridPadding(value, directionality) {
  const [between, below] = value.split(" ");
  const bottom = below !== null && below !== void 0 ? below : between;
  let paddingRight = "0px", paddingBottom = bottom, paddingLeft = "0px";
  if (directionality === "rtl") {
    paddingLeft = between;
  } else {
    paddingRight = between;
  }
  return {
    "padding": `0px ${paddingRight} ${paddingBottom} ${paddingLeft}`
  };
}
function buildGridMargin(value, directionality) {
  const [between, below] = value.split(" ");
  const bottom = below !== null && below !== void 0 ? below : between;
  const minus = (str) => `-${str}`;
  let marginRight = "0px", marginBottom = minus(bottom), marginLeft = "0px";
  if (directionality === "rtl") {
    marginLeft = minus(between);
  } else {
    marginRight = minus(between);
  }
  return {
    "margin": `0px ${marginRight} ${marginBottom} ${marginLeft}`
  };
}
function getMarginType(directionality, layout) {
  switch (layout) {
    case "column":
      return "margin-bottom";
    case "column-reverse":
      return "margin-top";
    case "row":
      return directionality === "rtl" ? "margin-left" : "margin-right";
    case "row-reverse":
      return directionality === "rtl" ? "margin-right" : "margin-left";
    default:
      return directionality === "rtl" ? "margin-left" : "margin-right";
  }
}
function buildGapCSS(gapValue, parent) {
  const key = getMarginType(parent.directionality, parent.layout);
  const margins = Object.assign({}, CLEAR_MARGIN_CSS);
  margins[key] = gapValue;
  return margins;
}
var FlexStyleBuilder = class extends StyleBuilder {
  constructor(layoutConfig) {
    super();
    this.layoutConfig = layoutConfig;
  }
  buildStyles(input, parent) {
    let [grow, shrink, ...basisParts] = input.split(" ");
    let basis = basisParts.join(" ");
    const direction = parent.direction.indexOf("column") > -1 ? "column" : "row";
    const max = isFlowHorizontal(direction) ? "max-width" : "max-height";
    const min = isFlowHorizontal(direction) ? "min-width" : "min-height";
    const hasCalc = String(basis).indexOf("calc") > -1;
    const usingCalc = hasCalc || basis === "auto";
    const isPercent = String(basis).indexOf("%") > -1 && !hasCalc;
    const hasUnits = String(basis).indexOf("px") > -1 || String(basis).indexOf("rem") > -1 || String(basis).indexOf("em") > -1 || String(basis).indexOf("vw") > -1 || String(basis).indexOf("vh") > -1;
    let isValue = hasCalc || hasUnits;
    grow = grow == "0" ? 0 : grow;
    shrink = shrink == "0" ? 0 : shrink;
    const isFixed = !grow && !shrink;
    let css = {};
    const clearStyles = {
      "max-width": null,
      "max-height": null,
      "min-width": null,
      "min-height": null
    };
    switch (basis || "") {
      case "":
        const useColumnBasisZero = this.layoutConfig.useColumnBasisZero !== false;
        basis = direction === "row" ? "0%" : useColumnBasisZero ? "0.000000001px" : "auto";
        break;
      case "initial":
      case "nogrow":
        grow = 0;
        basis = "auto";
        break;
      case "grow":
        basis = "100%";
        break;
      case "noshrink":
        shrink = 0;
        basis = "auto";
        break;
      case "auto":
        break;
      case "none":
        grow = 0;
        shrink = 0;
        basis = "auto";
        break;
      default:
        if (!isValue && !isPercent && !isNaN(basis)) {
          basis = basis + "%";
        }
        if (basis === "0%") {
          isValue = true;
        }
        if (basis === "0px") {
          basis = "0%";
        }
        if (hasCalc) {
          css = extendObject(clearStyles, {
            "flex-grow": grow,
            "flex-shrink": shrink,
            "flex-basis": isValue ? basis : "100%"
          });
        } else {
          css = extendObject(clearStyles, {
            "flex": `${grow} ${shrink} ${isValue ? basis : "100%"}`
          });
        }
        break;
    }
    if (!(css["flex"] || css["flex-grow"])) {
      if (hasCalc) {
        css = extendObject(clearStyles, {
          "flex-grow": grow,
          "flex-shrink": shrink,
          "flex-basis": basis
        });
      } else {
        css = extendObject(clearStyles, {
          "flex": `${grow} ${shrink} ${basis}`
        });
      }
    }
    if (basis !== "0%" && basis !== "0px" && basis !== "0.000000001px" && basis !== "auto") {
      css[min] = isFixed || isValue && grow ? basis : null;
      css[max] = isFixed || !usingCalc && shrink ? basis : null;
    }
    if (!css[min] && !css[max]) {
      if (hasCalc) {
        css = extendObject(clearStyles, {
          "flex-grow": grow,
          "flex-shrink": shrink,
          "flex-basis": basis
        });
      } else {
        css = extendObject(clearStyles, {
          "flex": `${grow} ${shrink} ${basis}`
        });
      }
    } else {
      if (parent.hasWrap) {
        css[hasCalc ? "flex-basis" : "flex"] = css[max] ? hasCalc ? css[max] : `${grow} ${shrink} ${css[max]}` : hasCalc ? css[min] : `${grow} ${shrink} ${css[min]}`;
      }
    }
    return extendObject(css, {
      "box-sizing": "border-box"
    });
  }
};
FlexStyleBuilder.ɵfac = function FlexStyleBuilder_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlexStyleBuilder)(ɵɵinject(LAYOUT_CONFIG));
};
FlexStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: FlexStyleBuilder,
  factory: FlexStyleBuilder.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LAYOUT_CONFIG]
      }]
    }];
  }, null);
})();
var inputs$4 = ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"];
var selector$4 = `
  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],
  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],
  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],
  [fxFlex.gt-md], [fxFlex.gt-lg]
`;
var FlexDirective = class extends BaseDirective2 {
  constructor(elRef, styleUtils, layoutConfig, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.layoutConfig = layoutConfig;
    this.marshal = marshal;
    this.DIRECTIVE_KEY = "flex";
    this.direction = void 0;
    this.wrap = void 0;
    this.flexGrow = "1";
    this.flexShrink = "1";
    this.init();
  }
  get shrink() {
    return this.flexShrink;
  }
  set shrink(value) {
    this.flexShrink = value || "1";
    this.triggerReflow();
  }
  get grow() {
    return this.flexGrow;
  }
  set grow(value) {
    this.flexGrow = value || "1";
    this.triggerReflow();
  }
  ngOnInit() {
    if (this.parentElement) {
      this.marshal.trackValue(this.parentElement, "layout").pipe((0, import_operators2.takeUntil)(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
      this.marshal.trackValue(this.nativeElement, "layout-align").pipe((0, import_operators2.takeUntil)(this.destroySubject)).subscribe(this.triggerReflow.bind(this));
    }
  }
  /**
   * Caches the parent container's 'flex-direction' and updates the element's style.
   * Used as a handler for layout change events from the parent flex container.
   */
  onLayoutChange(matcher) {
    const layout = matcher.value;
    const layoutParts = layout.split(" ");
    this.direction = layoutParts[0];
    this.wrap = layoutParts[1] !== void 0 && layoutParts[1] === "wrap";
    this.triggerUpdate();
  }
  /** Input to this is exclusively the basis input value */
  updateWithValue(value) {
    const addFlexToParent = this.layoutConfig.addFlexToParent !== false;
    if (this.direction === void 0) {
      this.direction = this.getFlexFlowDirection(this.parentElement, addFlexToParent);
    }
    if (this.wrap === void 0) {
      this.wrap = this.hasWrap(this.parentElement);
    }
    const direction = this.direction;
    const isHorizontal = direction.startsWith("row");
    const hasWrap = this.wrap;
    if (isHorizontal && hasWrap) {
      this.styleCache = flexRowWrapCache;
    } else if (isHorizontal && !hasWrap) {
      this.styleCache = flexRowCache;
    } else if (!isHorizontal && hasWrap) {
      this.styleCache = flexColumnWrapCache;
    } else if (!isHorizontal && !hasWrap) {
      this.styleCache = flexColumnCache;
    }
    const basis = String(value).replace(";", "");
    const parts = validateBasis(basis, this.flexGrow, this.flexShrink);
    this.addStyles(parts.join(" "), {
      direction,
      hasWrap
    });
  }
  /** Trigger a style reflow, usually based on a shrink/grow input event */
  triggerReflow() {
    const activatedValue = this.activatedValue;
    if (activatedValue !== void 0) {
      const parts = validateBasis(activatedValue + "", this.flexGrow, this.flexShrink);
      this.marshal.updateElement(this.nativeElement, this.DIRECTIVE_KEY, parts.join(" "));
    }
  }
};
FlexDirective.ɵfac = function FlexDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlexDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LAYOUT_CONFIG), ɵɵdirectiveInject(FlexStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
FlexDirective.ɵdir = ɵɵdefineDirective({
  type: FlexDirective,
  inputs: {
    shrink: [0, "fxShrink", "shrink"],
    grow: [0, "fxGrow", "grow"]
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexDirective, [{
    type: Directive
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: StyleUtils
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LAYOUT_CONFIG]
      }]
    }, {
      type: FlexStyleBuilder
    }, {
      type: MediaMarshaller
    }];
  }, {
    shrink: [{
      type: Input,
      args: ["fxShrink"]
    }],
    grow: [{
      type: Input,
      args: ["fxGrow"]
    }]
  });
})();
var DefaultFlexDirective = class extends FlexDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$4;
  }
};
DefaultFlexDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultFlexDirective_BaseFactory;
  return function DefaultFlexDirective_Factory(__ngFactoryType__) {
    return (ɵDefaultFlexDirective_BaseFactory || (ɵDefaultFlexDirective_BaseFactory = ɵɵgetInheritedFactory(DefaultFlexDirective)))(__ngFactoryType__ || DefaultFlexDirective);
  };
})();
DefaultFlexDirective.ɵdir = ɵɵdefineDirective({
  type: DefaultFlexDirective,
  selectors: [["", "fxFlex", ""], ["", "fxFlex.xs", ""], ["", "fxFlex.sm", ""], ["", "fxFlex.md", ""], ["", "fxFlex.lg", ""], ["", "fxFlex.xl", ""], ["", "fxFlex.lt-sm", ""], ["", "fxFlex.lt-md", ""], ["", "fxFlex.lt-lg", ""], ["", "fxFlex.lt-xl", ""], ["", "fxFlex.gt-xs", ""], ["", "fxFlex.gt-sm", ""], ["", "fxFlex.gt-md", ""], ["", "fxFlex.gt-lg", ""]],
  inputs: {
    fxFlex: "fxFlex",
    "fxFlex.xs": "fxFlex.xs",
    "fxFlex.sm": "fxFlex.sm",
    "fxFlex.md": "fxFlex.md",
    "fxFlex.lg": "fxFlex.lg",
    "fxFlex.xl": "fxFlex.xl",
    "fxFlex.lt-sm": "fxFlex.lt-sm",
    "fxFlex.lt-md": "fxFlex.lt-md",
    "fxFlex.lt-lg": "fxFlex.lt-lg",
    "fxFlex.lt-xl": "fxFlex.lt-xl",
    "fxFlex.gt-xs": "fxFlex.gt-xs",
    "fxFlex.gt-sm": "fxFlex.gt-sm",
    "fxFlex.gt-md": "fxFlex.gt-md",
    "fxFlex.gt-lg": "fxFlex.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexDirective, [{
    type: Directive,
    args: [{
      inputs: inputs$4,
      selector: selector$4
    }]
  }], null, null);
})();
var flexRowCache = /* @__PURE__ */ new Map();
var flexColumnCache = /* @__PURE__ */ new Map();
var flexRowWrapCache = /* @__PURE__ */ new Map();
var flexColumnWrapCache = /* @__PURE__ */ new Map();
var FlexOrderStyleBuilder = class extends StyleBuilder {
  buildStyles(value) {
    return {
      order: value && parseInt(value, 10) || ""
    };
  }
};
FlexOrderStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵFlexOrderStyleBuilder_BaseFactory;
  return function FlexOrderStyleBuilder_Factory(__ngFactoryType__) {
    return (ɵFlexOrderStyleBuilder_BaseFactory || (ɵFlexOrderStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(FlexOrderStyleBuilder)))(__ngFactoryType__ || FlexOrderStyleBuilder);
  };
})();
FlexOrderStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: FlexOrderStyleBuilder,
  factory: FlexOrderStyleBuilder.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOrderStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$3 = ["fxFlexOrder", "fxFlexOrder.xs", "fxFlexOrder.sm", "fxFlexOrder.md", "fxFlexOrder.lg", "fxFlexOrder.xl", "fxFlexOrder.lt-sm", "fxFlexOrder.lt-md", "fxFlexOrder.lt-lg", "fxFlexOrder.lt-xl", "fxFlexOrder.gt-xs", "fxFlexOrder.gt-sm", "fxFlexOrder.gt-md", "fxFlexOrder.gt-lg"];
var selector$3 = `
  [fxFlexOrder], [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md],
  [fxFlexOrder.lg], [fxFlexOrder.xl], [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md],
  [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl], [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm],
  [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]
`;
var FlexOrderDirective = class extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.DIRECTIVE_KEY = "flex-order";
    this.styleCache = flexOrderCache;
    this.init();
  }
};
FlexOrderDirective.ɵfac = function FlexOrderDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlexOrderDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexOrderStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
FlexOrderDirective.ɵdir = ɵɵdefineDirective({
  type: FlexOrderDirective,
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOrderDirective, [{
    type: Directive
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: StyleUtils
    }, {
      type: FlexOrderStyleBuilder
    }, {
      type: MediaMarshaller
    }];
  }, null);
})();
var flexOrderCache = /* @__PURE__ */ new Map();
var DefaultFlexOrderDirective = class extends FlexOrderDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$3;
  }
};
DefaultFlexOrderDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultFlexOrderDirective_BaseFactory;
  return function DefaultFlexOrderDirective_Factory(__ngFactoryType__) {
    return (ɵDefaultFlexOrderDirective_BaseFactory || (ɵDefaultFlexOrderDirective_BaseFactory = ɵɵgetInheritedFactory(DefaultFlexOrderDirective)))(__ngFactoryType__ || DefaultFlexOrderDirective);
  };
})();
DefaultFlexOrderDirective.ɵdir = ɵɵdefineDirective({
  type: DefaultFlexOrderDirective,
  selectors: [["", "fxFlexOrder", ""], ["", "fxFlexOrder.xs", ""], ["", "fxFlexOrder.sm", ""], ["", "fxFlexOrder.md", ""], ["", "fxFlexOrder.lg", ""], ["", "fxFlexOrder.xl", ""], ["", "fxFlexOrder.lt-sm", ""], ["", "fxFlexOrder.lt-md", ""], ["", "fxFlexOrder.lt-lg", ""], ["", "fxFlexOrder.lt-xl", ""], ["", "fxFlexOrder.gt-xs", ""], ["", "fxFlexOrder.gt-sm", ""], ["", "fxFlexOrder.gt-md", ""], ["", "fxFlexOrder.gt-lg", ""]],
  inputs: {
    fxFlexOrder: "fxFlexOrder",
    "fxFlexOrder.xs": "fxFlexOrder.xs",
    "fxFlexOrder.sm": "fxFlexOrder.sm",
    "fxFlexOrder.md": "fxFlexOrder.md",
    "fxFlexOrder.lg": "fxFlexOrder.lg",
    "fxFlexOrder.xl": "fxFlexOrder.xl",
    "fxFlexOrder.lt-sm": "fxFlexOrder.lt-sm",
    "fxFlexOrder.lt-md": "fxFlexOrder.lt-md",
    "fxFlexOrder.lt-lg": "fxFlexOrder.lt-lg",
    "fxFlexOrder.lt-xl": "fxFlexOrder.lt-xl",
    "fxFlexOrder.gt-xs": "fxFlexOrder.gt-xs",
    "fxFlexOrder.gt-sm": "fxFlexOrder.gt-sm",
    "fxFlexOrder.gt-md": "fxFlexOrder.gt-md",
    "fxFlexOrder.gt-lg": "fxFlexOrder.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexOrderDirective, [{
    type: Directive,
    args: [{
      selector: selector$3,
      inputs: inputs$3
    }]
  }], null, null);
})();
var FlexOffsetStyleBuilder = class extends StyleBuilder {
  constructor(_config) {
    super();
    this._config = _config;
  }
  buildStyles(offset, parent) {
    offset || (offset = "0");
    offset = multiply(offset, this._config.multiplier);
    const isPercent = String(offset).indexOf("%") > -1;
    const isPx = String(offset).indexOf("px") > -1;
    if (!isPx && !isPercent && !isNaN(+offset)) {
      offset = `${offset}%`;
    }
    const horizontalLayoutKey = parent.isRtl ? "margin-right" : "margin-left";
    const styles = isFlowHorizontal(parent.layout) ? {
      [horizontalLayoutKey]: offset
    } : {
      "margin-top": offset
    };
    return styles;
  }
};
FlexOffsetStyleBuilder.ɵfac = function FlexOffsetStyleBuilder_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlexOffsetStyleBuilder)(ɵɵinject(LAYOUT_CONFIG));
};
FlexOffsetStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: FlexOffsetStyleBuilder,
  factory: FlexOffsetStyleBuilder.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOffsetStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LAYOUT_CONFIG]
      }]
    }];
  }, null);
})();
var inputs$2 = ["fxFlexOffset", "fxFlexOffset.xs", "fxFlexOffset.sm", "fxFlexOffset.md", "fxFlexOffset.lg", "fxFlexOffset.xl", "fxFlexOffset.lt-sm", "fxFlexOffset.lt-md", "fxFlexOffset.lt-lg", "fxFlexOffset.lt-xl", "fxFlexOffset.gt-xs", "fxFlexOffset.gt-sm", "fxFlexOffset.gt-md", "fxFlexOffset.gt-lg"];
var selector$2 = `
  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],
  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],
  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],
  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]
`;
var FlexOffsetDirective = class extends BaseDirective2 {
  constructor(elRef, directionality, styleBuilder, marshal, styler) {
    super(elRef, styleBuilder, styler, marshal);
    this.directionality = directionality;
    this.DIRECTIVE_KEY = "flex-offset";
    this.init([this.directionality.change]);
    if (this.parentElement) {
      this.marshal.trackValue(this.parentElement, "layout-gap").pipe((0, import_operators2.takeUntil)(this.destroySubject)).subscribe(this.triggerUpdate.bind(this));
    }
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   * Using the current fxFlexOffset value, update the inline CSS
   * NOTE: this will assign `margin-left` if the parent flex-direction == 'row',
   *       otherwise `margin-top` is used for the offset.
   */
  updateWithValue(value = "") {
    const layout = this.getFlexFlowDirection(this.parentElement, true);
    const isRtl = this.directionality.value === "rtl";
    if (layout === "row" && isRtl) {
      this.styleCache = flexOffsetCacheRowRtl;
    } else if (layout === "row" && !isRtl) {
      this.styleCache = flexOffsetCacheRowLtr;
    } else if (layout === "column" && isRtl) {
      this.styleCache = flexOffsetCacheColumnRtl;
    } else if (layout === "column" && !isRtl) {
      this.styleCache = flexOffsetCacheColumnLtr;
    }
    this.addStyles(value + "", {
      layout,
      isRtl
    });
  }
};
FlexOffsetDirective.ɵfac = function FlexOffsetDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlexOffsetDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Directionality), ɵɵdirectiveInject(FlexOffsetStyleBuilder), ɵɵdirectiveInject(MediaMarshaller), ɵɵdirectiveInject(StyleUtils));
};
FlexOffsetDirective.ɵdir = ɵɵdefineDirective({
  type: FlexOffsetDirective,
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOffsetDirective, [{
    type: Directive
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Directionality
    }, {
      type: FlexOffsetStyleBuilder
    }, {
      type: MediaMarshaller
    }, {
      type: StyleUtils
    }];
  }, null);
})();
var DefaultFlexOffsetDirective = class extends FlexOffsetDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$2;
  }
};
DefaultFlexOffsetDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultFlexOffsetDirective_BaseFactory;
  return function DefaultFlexOffsetDirective_Factory(__ngFactoryType__) {
    return (ɵDefaultFlexOffsetDirective_BaseFactory || (ɵDefaultFlexOffsetDirective_BaseFactory = ɵɵgetInheritedFactory(DefaultFlexOffsetDirective)))(__ngFactoryType__ || DefaultFlexOffsetDirective);
  };
})();
DefaultFlexOffsetDirective.ɵdir = ɵɵdefineDirective({
  type: DefaultFlexOffsetDirective,
  selectors: [["", "fxFlexOffset", ""], ["", "fxFlexOffset.xs", ""], ["", "fxFlexOffset.sm", ""], ["", "fxFlexOffset.md", ""], ["", "fxFlexOffset.lg", ""], ["", "fxFlexOffset.xl", ""], ["", "fxFlexOffset.lt-sm", ""], ["", "fxFlexOffset.lt-md", ""], ["", "fxFlexOffset.lt-lg", ""], ["", "fxFlexOffset.lt-xl", ""], ["", "fxFlexOffset.gt-xs", ""], ["", "fxFlexOffset.gt-sm", ""], ["", "fxFlexOffset.gt-md", ""], ["", "fxFlexOffset.gt-lg", ""]],
  inputs: {
    fxFlexOffset: "fxFlexOffset",
    "fxFlexOffset.xs": "fxFlexOffset.xs",
    "fxFlexOffset.sm": "fxFlexOffset.sm",
    "fxFlexOffset.md": "fxFlexOffset.md",
    "fxFlexOffset.lg": "fxFlexOffset.lg",
    "fxFlexOffset.xl": "fxFlexOffset.xl",
    "fxFlexOffset.lt-sm": "fxFlexOffset.lt-sm",
    "fxFlexOffset.lt-md": "fxFlexOffset.lt-md",
    "fxFlexOffset.lt-lg": "fxFlexOffset.lt-lg",
    "fxFlexOffset.lt-xl": "fxFlexOffset.lt-xl",
    "fxFlexOffset.gt-xs": "fxFlexOffset.gt-xs",
    "fxFlexOffset.gt-sm": "fxFlexOffset.gt-sm",
    "fxFlexOffset.gt-md": "fxFlexOffset.gt-md",
    "fxFlexOffset.gt-lg": "fxFlexOffset.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexOffsetDirective, [{
    type: Directive,
    args: [{
      selector: selector$2,
      inputs: inputs$2
    }]
  }], null, null);
})();
var flexOffsetCacheRowRtl = /* @__PURE__ */ new Map();
var flexOffsetCacheColumnRtl = /* @__PURE__ */ new Map();
var flexOffsetCacheRowLtr = /* @__PURE__ */ new Map();
var flexOffsetCacheColumnLtr = /* @__PURE__ */ new Map();
var FlexAlignStyleBuilder = class extends StyleBuilder {
  buildStyles(input) {
    input = input || "stretch";
    const styles = {};
    switch (input) {
      case "start":
        styles["align-self"] = "flex-start";
        break;
      case "end":
        styles["align-self"] = "flex-end";
        break;
      default:
        styles["align-self"] = input;
        break;
    }
    return styles;
  }
};
FlexAlignStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵFlexAlignStyleBuilder_BaseFactory;
  return function FlexAlignStyleBuilder_Factory(__ngFactoryType__) {
    return (ɵFlexAlignStyleBuilder_BaseFactory || (ɵFlexAlignStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(FlexAlignStyleBuilder)))(__ngFactoryType__ || FlexAlignStyleBuilder);
  };
})();
FlexAlignStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: FlexAlignStyleBuilder,
  factory: FlexAlignStyleBuilder.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexAlignStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$1 = ["fxFlexAlign", "fxFlexAlign.xs", "fxFlexAlign.sm", "fxFlexAlign.md", "fxFlexAlign.lg", "fxFlexAlign.xl", "fxFlexAlign.lt-sm", "fxFlexAlign.lt-md", "fxFlexAlign.lt-lg", "fxFlexAlign.lt-xl", "fxFlexAlign.gt-xs", "fxFlexAlign.gt-sm", "fxFlexAlign.gt-md", "fxFlexAlign.gt-lg"];
var selector$1 = `
  [fxFlexAlign], [fxFlexAlign.xs], [fxFlexAlign.sm], [fxFlexAlign.md],
  [fxFlexAlign.lg], [fxFlexAlign.xl], [fxFlexAlign.lt-sm], [fxFlexAlign.lt-md],
  [fxFlexAlign.lt-lg], [fxFlexAlign.lt-xl], [fxFlexAlign.gt-xs], [fxFlexAlign.gt-sm],
  [fxFlexAlign.gt-md], [fxFlexAlign.gt-lg]
`;
var FlexAlignDirective = class extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.DIRECTIVE_KEY = "flex-align";
    this.styleCache = flexAlignCache;
    this.init();
  }
};
FlexAlignDirective.ɵfac = function FlexAlignDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlexAlignDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexAlignStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
FlexAlignDirective.ɵdir = ɵɵdefineDirective({
  type: FlexAlignDirective,
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexAlignDirective, [{
    type: Directive
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: StyleUtils
    }, {
      type: FlexAlignStyleBuilder
    }, {
      type: MediaMarshaller
    }];
  }, null);
})();
var flexAlignCache = /* @__PURE__ */ new Map();
var DefaultFlexAlignDirective = class extends FlexAlignDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$1;
  }
};
DefaultFlexAlignDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultFlexAlignDirective_BaseFactory;
  return function DefaultFlexAlignDirective_Factory(__ngFactoryType__) {
    return (ɵDefaultFlexAlignDirective_BaseFactory || (ɵDefaultFlexAlignDirective_BaseFactory = ɵɵgetInheritedFactory(DefaultFlexAlignDirective)))(__ngFactoryType__ || DefaultFlexAlignDirective);
  };
})();
DefaultFlexAlignDirective.ɵdir = ɵɵdefineDirective({
  type: DefaultFlexAlignDirective,
  selectors: [["", "fxFlexAlign", ""], ["", "fxFlexAlign.xs", ""], ["", "fxFlexAlign.sm", ""], ["", "fxFlexAlign.md", ""], ["", "fxFlexAlign.lg", ""], ["", "fxFlexAlign.xl", ""], ["", "fxFlexAlign.lt-sm", ""], ["", "fxFlexAlign.lt-md", ""], ["", "fxFlexAlign.lt-lg", ""], ["", "fxFlexAlign.lt-xl", ""], ["", "fxFlexAlign.gt-xs", ""], ["", "fxFlexAlign.gt-sm", ""], ["", "fxFlexAlign.gt-md", ""], ["", "fxFlexAlign.gt-lg", ""]],
  inputs: {
    fxFlexAlign: "fxFlexAlign",
    "fxFlexAlign.xs": "fxFlexAlign.xs",
    "fxFlexAlign.sm": "fxFlexAlign.sm",
    "fxFlexAlign.md": "fxFlexAlign.md",
    "fxFlexAlign.lg": "fxFlexAlign.lg",
    "fxFlexAlign.xl": "fxFlexAlign.xl",
    "fxFlexAlign.lt-sm": "fxFlexAlign.lt-sm",
    "fxFlexAlign.lt-md": "fxFlexAlign.lt-md",
    "fxFlexAlign.lt-lg": "fxFlexAlign.lt-lg",
    "fxFlexAlign.lt-xl": "fxFlexAlign.lt-xl",
    "fxFlexAlign.gt-xs": "fxFlexAlign.gt-xs",
    "fxFlexAlign.gt-sm": "fxFlexAlign.gt-sm",
    "fxFlexAlign.gt-md": "fxFlexAlign.gt-md",
    "fxFlexAlign.gt-lg": "fxFlexAlign.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexAlignDirective, [{
    type: Directive,
    args: [{
      selector: selector$1,
      inputs: inputs$1
    }]
  }], null, null);
})();
var FLEX_FILL_CSS = {
  "margin": 0,
  "width": "100%",
  "height": "100%",
  "min-width": "100%",
  "min-height": "100%"
};
var FlexFillStyleBuilder = class extends StyleBuilder {
  buildStyles(_input) {
    return FLEX_FILL_CSS;
  }
};
FlexFillStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵFlexFillStyleBuilder_BaseFactory;
  return function FlexFillStyleBuilder_Factory(__ngFactoryType__) {
    return (ɵFlexFillStyleBuilder_BaseFactory || (ɵFlexFillStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(FlexFillStyleBuilder)))(__ngFactoryType__ || FlexFillStyleBuilder);
  };
})();
FlexFillStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: FlexFillStyleBuilder,
  factory: FlexFillStyleBuilder.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexFillStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var FlexFillDirective = class extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.styleCache = flexFillCache;
    this.addStyles("");
  }
};
FlexFillDirective.ɵfac = function FlexFillDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlexFillDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexFillStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
FlexFillDirective.ɵdir = ɵɵdefineDirective({
  type: FlexFillDirective,
  selectors: [["", "fxFill", ""], ["", "fxFlexFill", ""]],
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexFillDirective, [{
    type: Directive,
    args: [{
      selector: `[fxFill], [fxFlexFill]`
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: StyleUtils
    }, {
      type: FlexFillStyleBuilder
    }, {
      type: MediaMarshaller
    }];
  }, null);
})();
var flexFillCache = /* @__PURE__ */ new Map();
var LayoutAlignStyleBuilder = class extends StyleBuilder {
  buildStyles(align, parent) {
    const css = {}, [mainAxis, crossAxis] = align.split(" ");
    switch (mainAxis) {
      case "center":
        css["justify-content"] = "center";
        break;
      case "space-around":
        css["justify-content"] = "space-around";
        break;
      case "space-between":
        css["justify-content"] = "space-between";
        break;
      case "space-evenly":
        css["justify-content"] = "space-evenly";
        break;
      case "end":
      case "flex-end":
        css["justify-content"] = "flex-end";
        break;
      case "start":
      case "flex-start":
      default:
        css["justify-content"] = "flex-start";
        break;
    }
    switch (crossAxis) {
      case "start":
      case "flex-start":
        css["align-items"] = css["align-content"] = "flex-start";
        break;
      case "center":
        css["align-items"] = css["align-content"] = "center";
        break;
      case "end":
      case "flex-end":
        css["align-items"] = css["align-content"] = "flex-end";
        break;
      case "space-between":
        css["align-content"] = "space-between";
        css["align-items"] = "stretch";
        break;
      case "space-around":
        css["align-content"] = "space-around";
        css["align-items"] = "stretch";
        break;
      case "baseline":
        css["align-content"] = "stretch";
        css["align-items"] = "baseline";
        break;
      case "stretch":
      default:
        css["align-items"] = css["align-content"] = "stretch";
        break;
    }
    return extendObject(css, {
      "display": parent.inline ? "inline-flex" : "flex",
      "flex-direction": parent.layout,
      "box-sizing": "border-box",
      "max-width": crossAxis === "stretch" ? !isFlowHorizontal(parent.layout) ? "100%" : null : null,
      "max-height": crossAxis === "stretch" ? isFlowHorizontal(parent.layout) ? "100%" : null : null
    });
  }
};
LayoutAlignStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵLayoutAlignStyleBuilder_BaseFactory;
  return function LayoutAlignStyleBuilder_Factory(__ngFactoryType__) {
    return (ɵLayoutAlignStyleBuilder_BaseFactory || (ɵLayoutAlignStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(LayoutAlignStyleBuilder)))(__ngFactoryType__ || LayoutAlignStyleBuilder);
  };
})();
LayoutAlignStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: LayoutAlignStyleBuilder,
  factory: LayoutAlignStyleBuilder.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutAlignStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs = ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"];
var selector = `
  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],
  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],
  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],
  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]
`;
var LayoutAlignDirective = class extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.DIRECTIVE_KEY = "layout-align";
    this.layout = "row";
    this.inline = false;
    this.init();
    this.marshal.trackValue(this.nativeElement, "layout").pipe((0, import_operators2.takeUntil)(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   *
   */
  updateWithValue(value) {
    const layout = this.layout || "row";
    const inline = this.inline;
    if (layout === "row" && inline) {
      this.styleCache = layoutAlignHorizontalInlineCache;
    } else if (layout === "row" && !inline) {
      this.styleCache = layoutAlignHorizontalCache;
    } else if (layout === "row-reverse" && inline) {
      this.styleCache = layoutAlignHorizontalRevInlineCache;
    } else if (layout === "row-reverse" && !inline) {
      this.styleCache = layoutAlignHorizontalRevCache;
    } else if (layout === "column" && inline) {
      this.styleCache = layoutAlignVerticalInlineCache;
    } else if (layout === "column" && !inline) {
      this.styleCache = layoutAlignVerticalCache;
    } else if (layout === "column-reverse" && inline) {
      this.styleCache = layoutAlignVerticalRevInlineCache;
    } else if (layout === "column-reverse" && !inline) {
      this.styleCache = layoutAlignVerticalRevCache;
    }
    this.addStyles(value, {
      layout,
      inline
    });
  }
  /**
   * Cache the parent container 'flex-direction' and update the 'flex' styles
   */
  onLayoutChange(matcher) {
    const layoutKeys = matcher.value.split(" ");
    this.layout = layoutKeys[0];
    this.inline = matcher.value.includes("inline");
    if (!LAYOUT_VALUES.find((x) => x === this.layout)) {
      this.layout = "row";
    }
    this.triggerUpdate();
  }
};
LayoutAlignDirective.ɵfac = function LayoutAlignDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LayoutAlignDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutAlignStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
LayoutAlignDirective.ɵdir = ɵɵdefineDirective({
  type: LayoutAlignDirective,
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutAlignDirective, [{
    type: Directive
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: StyleUtils
    }, {
      type: LayoutAlignStyleBuilder
    }, {
      type: MediaMarshaller
    }];
  }, null);
})();
var DefaultLayoutAlignDirective = class extends LayoutAlignDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs;
  }
};
DefaultLayoutAlignDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultLayoutAlignDirective_BaseFactory;
  return function DefaultLayoutAlignDirective_Factory(__ngFactoryType__) {
    return (ɵDefaultLayoutAlignDirective_BaseFactory || (ɵDefaultLayoutAlignDirective_BaseFactory = ɵɵgetInheritedFactory(DefaultLayoutAlignDirective)))(__ngFactoryType__ || DefaultLayoutAlignDirective);
  };
})();
DefaultLayoutAlignDirective.ɵdir = ɵɵdefineDirective({
  type: DefaultLayoutAlignDirective,
  selectors: [["", "fxLayoutAlign", ""], ["", "fxLayoutAlign.xs", ""], ["", "fxLayoutAlign.sm", ""], ["", "fxLayoutAlign.md", ""], ["", "fxLayoutAlign.lg", ""], ["", "fxLayoutAlign.xl", ""], ["", "fxLayoutAlign.lt-sm", ""], ["", "fxLayoutAlign.lt-md", ""], ["", "fxLayoutAlign.lt-lg", ""], ["", "fxLayoutAlign.lt-xl", ""], ["", "fxLayoutAlign.gt-xs", ""], ["", "fxLayoutAlign.gt-sm", ""], ["", "fxLayoutAlign.gt-md", ""], ["", "fxLayoutAlign.gt-lg", ""]],
  inputs: {
    fxLayoutAlign: "fxLayoutAlign",
    "fxLayoutAlign.xs": "fxLayoutAlign.xs",
    "fxLayoutAlign.sm": "fxLayoutAlign.sm",
    "fxLayoutAlign.md": "fxLayoutAlign.md",
    "fxLayoutAlign.lg": "fxLayoutAlign.lg",
    "fxLayoutAlign.xl": "fxLayoutAlign.xl",
    "fxLayoutAlign.lt-sm": "fxLayoutAlign.lt-sm",
    "fxLayoutAlign.lt-md": "fxLayoutAlign.lt-md",
    "fxLayoutAlign.lt-lg": "fxLayoutAlign.lt-lg",
    "fxLayoutAlign.lt-xl": "fxLayoutAlign.lt-xl",
    "fxLayoutAlign.gt-xs": "fxLayoutAlign.gt-xs",
    "fxLayoutAlign.gt-sm": "fxLayoutAlign.gt-sm",
    "fxLayoutAlign.gt-md": "fxLayoutAlign.gt-md",
    "fxLayoutAlign.gt-lg": "fxLayoutAlign.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutAlignDirective, [{
    type: Directive,
    args: [{
      selector,
      inputs
    }]
  }], null, null);
})();
var layoutAlignHorizontalCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalRevCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalRevCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalInlineCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalInlineCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalRevInlineCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalRevInlineCache = /* @__PURE__ */ new Map();
var ALL_DIRECTIVES = [DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective];
var FlexModule = class {
};
FlexModule.ɵfac = function FlexModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlexModule)();
};
FlexModule.ɵmod = ɵɵdefineNgModule({
  type: FlexModule,
  declarations: [DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective],
  imports: [CoreModule, BidiModule],
  exports: [DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective]
});
FlexModule.ɵinj = ɵɵdefineInjector({
  imports: [CoreModule, BidiModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexModule, [{
    type: NgModule,
    args: [{
      imports: [CoreModule, BidiModule],
      declarations: [...ALL_DIRECTIVES],
      exports: [...ALL_DIRECTIVES]
    }]
  }], null, null);
})();

export {
  removeStyles,
  BROWSER_PROVIDER,
  CLASS_NAME,
  CoreModule,
  MediaChange,
  StylesheetMap,
  DEFAULT_CONFIG,
  LAYOUT_CONFIG,
  SERVER_TOKEN,
  BREAKPOINT,
  mergeAlias,
  StyleBuilder,
  StyleUtils,
  sortDescendingPriority,
  sortAscendingPriority,
  MatchMedia,
  DEFAULT_BREAKPOINTS,
  ScreenTypes,
  ORIENTATION_BREAKPOINTS,
  BREAKPOINTS,
  BreakPointRegistry,
  BREAKPOINT_PRINT,
  PrintHook,
  MediaMarshaller,
  BaseDirective2,
  MockMatchMedia,
  MockMatchMediaProvider,
  coerceArray,
  MediaObserver,
  MediaTrigger,
  validateBasis,
  multiply,
  LayoutStyleBuilder,
  LayoutDirective,
  DefaultLayoutDirective,
  LayoutGapStyleBuilder,
  LayoutGapDirective,
  DefaultLayoutGapDirective,
  FlexStyleBuilder,
  FlexDirective,
  DefaultFlexDirective,
  FlexOrderStyleBuilder,
  FlexOrderDirective,
  DefaultFlexOrderDirective,
  FlexOffsetStyleBuilder,
  FlexOffsetDirective,
  DefaultFlexOffsetDirective,
  FlexAlignStyleBuilder,
  FlexAlignDirective,
  DefaultFlexAlignDirective,
  FlexFillStyleBuilder,
  FlexFillDirective,
  LayoutAlignStyleBuilder,
  LayoutAlignDirective,
  DefaultLayoutAlignDirective,
  FlexModule
};
/*! Bundled license information:

@angular/flex-layout/fesm2015/angular-flex-layout-_private-utils.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)

@angular/flex-layout/fesm2015/angular-flex-layout-core.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)

@angular/flex-layout/fesm2015/angular-flex-layout-flex.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
*/
//# sourceMappingURL=chunk-DQA45PCY.js.map
