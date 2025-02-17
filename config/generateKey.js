export function generateKey() {
  var __webpack_modules__ = {
      466: function (e, t, n) {
        var i;
        !(function (r) {
          "use strict";

          function o(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
          }

          function s(e, t, n, i, r, s) {
            return o(
              ((a = o(o(t, e), o(i, s))) << (l = r)) | (a >>> (32 - l)),
              n
            );
            var a, l;
          }

          function a(e, t, n, i, r, o, a) {
            return s((t & n) | (~t & i), e, t, r, o, a);
          }

          function l(e, t, n, i, r, o, a) {
            return s((t & i) | (n & ~i), e, t, r, o, a);
          }

          function c(e, t, n, i, r, o, a) {
            return s(t ^ n ^ i, e, t, r, o, a);
          }

          function u(e, t, n, i, r, o, a) {
            return s(n ^ (t | ~i), e, t, r, o, a);
          }

          function d(e, t) {
            var n, i, r, s, d;
            (e[t >> 5] |= 128 << t % 32), (e[14 + (((t + 64) >>> 9) << 4)] = t);
            var h = 1732584193,
              p = -271733879,
              f = -1732584194,
              m = 271733878;
            for (n = 0; n < e.length; n += 16)
              (i = h),
                (r = p),
                (s = f),
                (d = m),
                (h = a(h, p, f, m, e[n], 7, -680876936)),
                (m = a(m, h, p, f, e[n + 1], 12, -389564586)),
                (f = a(f, m, h, p, e[n + 2], 17, 606105819)),
                (p = a(p, f, m, h, e[n + 3], 22, -1044525330)),
                (h = a(h, p, f, m, e[n + 4], 7, -176418897)),
                (m = a(m, h, p, f, e[n + 5], 12, 1200080426)),
                (f = a(f, m, h, p, e[n + 6], 17, -1473231341)),
                (p = a(p, f, m, h, e[n + 7], 22, -45705983)),
                (h = a(h, p, f, m, e[n + 8], 7, 1770035416)),
                (m = a(m, h, p, f, e[n + 9], 12, -1958414417)),
                (f = a(f, m, h, p, e[n + 10], 17, -42063)),
                (p = a(p, f, m, h, e[n + 11], 22, -1990404162)),
                (h = a(h, p, f, m, e[n + 12], 7, 1804603682)),
                (m = a(m, h, p, f, e[n + 13], 12, -40341101)),
                (f = a(f, m, h, p, e[n + 14], 17, -1502002290)),
                (h = l(
                  h,
                  (p = a(p, f, m, h, e[n + 15], 22, 1236535329)),
                  f,
                  m,
                  e[n + 1],
                  5,
                  -165796510
                )),
                (m = l(m, h, p, f, e[n + 6], 9, -1069501632)),
                (f = l(f, m, h, p, e[n + 11], 14, 643717713)),
                (p = l(p, f, m, h, e[n], 20, -373897302)),
                (h = l(h, p, f, m, e[n + 5], 5, -701558691)),
                (m = l(m, h, p, f, e[n + 10], 9, 38016083)),
                (f = l(f, m, h, p, e[n + 15], 14, -660478335)),
                (p = l(p, f, m, h, e[n + 4], 20, -405537848)),
                (h = l(h, p, f, m, e[n + 9], 5, 568446438)),
                (m = l(m, h, p, f, e[n + 14], 9, -1019803690)),
                (f = l(f, m, h, p, e[n + 3], 14, -187363961)),
                (p = l(p, f, m, h, e[n + 8], 20, 1163531501)),
                (h = l(h, p, f, m, e[n + 13], 5, -1444681467)),
                (m = l(m, h, p, f, e[n + 2], 9, -51403784)),
                (f = l(f, m, h, p, e[n + 7], 14, 1735328473)),
                (h = c(
                  h,
                  (p = l(p, f, m, h, e[n + 12], 20, -1926607734)),
                  f,
                  m,
                  e[n + 5],
                  4,
                  -378558
                )),
                (m = c(m, h, p, f, e[n + 8], 11, -2022574463)),
                (f = c(f, m, h, p, e[n + 11], 16, 1839030562)),
                (p = c(p, f, m, h, e[n + 14], 23, -35309556)),
                (h = c(h, p, f, m, e[n + 1], 4, -1530992060)),
                (m = c(m, h, p, f, e[n + 4], 11, 1272893353)),
                (f = c(f, m, h, p, e[n + 7], 16, -155497632)),
                (p = c(p, f, m, h, e[n + 10], 23, -1094730640)),
                (h = c(h, p, f, m, e[n + 13], 4, 681279174)),
                (m = c(m, h, p, f, e[n], 11, -358537222)),
                (f = c(f, m, h, p, e[n + 3], 16, -722521979)),
                (p = c(p, f, m, h, e[n + 6], 23, 76029189)),
                (h = c(h, p, f, m, e[n + 9], 4, -640364487)),
                (m = c(m, h, p, f, e[n + 12], 11, -421815835)),
                (f = c(f, m, h, p, e[n + 15], 16, 530742520)),
                (h = u(
                  h,
                  (p = c(p, f, m, h, e[n + 2], 23, -995338651)),
                  f,
                  m,
                  e[n],
                  6,
                  -198630844
                )),
                (m = u(m, h, p, f, e[n + 7], 10, 1126891415)),
                (f = u(f, m, h, p, e[n + 14], 15, -1416354905)),
                (p = u(p, f, m, h, e[n + 5], 21, -57434055)),
                (h = u(h, p, f, m, e[n + 12], 6, 1700485571)),
                (m = u(m, h, p, f, e[n + 3], 10, -1894986606)),
                (f = u(f, m, h, p, e[n + 10], 15, -1051523)),
                (p = u(p, f, m, h, e[n + 1], 21, -2054922799)),
                (h = u(h, p, f, m, e[n + 8], 6, 1873313359)),
                (m = u(m, h, p, f, e[n + 15], 10, -30611744)),
                (f = u(f, m, h, p, e[n + 6], 15, -1560198380)),
                (p = u(p, f, m, h, e[n + 13], 21, 1309151649)),
                (h = u(h, p, f, m, e[n + 4], 6, -145523070)),
                (m = u(m, h, p, f, e[n + 11], 10, -1120210379)),
                (f = u(f, m, h, p, e[n + 2], 15, 718787259)),
                (p = u(p, f, m, h, e[n + 9], 21, -343485551)),
                (h = o(h, i)),
                (p = o(p, r)),
                (f = o(f, s)),
                (m = o(m, d));
            return [h, p, f, m];
          }

          function h(e) {
            var t,
              n = "",
              i = 32 * e.length;
            for (t = 0; t < i; t += 8)
              n += String.fromCharCode((e[t >> 5] >>> t % 32) & 255);
            return n;
          }

          function p(e) {
            var t,
              n = [];
            for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1)
              n[t] = 0;
            var i = 8 * e.length;
            for (t = 0; t < i; t += 8)
              n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n;
          }

          function f(e) {
            var t,
              n,
              i = "0123456789abcdef",
              r = "";
            for (n = 0; n < e.length; n += 1)
              (t = e.charCodeAt(n)),
                (r += i.charAt((t >>> 4) & 15) + i.charAt(15 & t));
            return r;
          }

          function m(e) {
            return unescape(encodeURIComponent(e));
          }

          function g(e) {
            return (function (e) {
              return h(d(p(e), 8 * e.length));
            })(m(e));
          }

          function y(e, t) {
            return (function (e, t) {
              var n,
                i,
                r = p(e),
                o = [],
                s = [];
              for (
                o[15] = s[15] = void 0,
                  r.length > 16 && (r = d(r, 8 * e.length)),
                  n = 0;
                n < 16;
                n += 1
              )
                (o[n] = 909522486 ^ r[n]), (s[n] = 1549556828 ^ r[n]);
              return (
                (i = d(o.concat(p(t)), 512 + 8 * t.length)),
                h(d(s.concat(i), 640))
              );
            })(m(e), m(t));
          }

          function v(e, t, n) {
            return t ? (n ? y(t, e) : f(y(t, e))) : n ? g(e) : f(g(e));
          }
          void 0 ===
            (i = function () {
              return v;
            }.call(t, n, t, e)) || (e.exports = i);
        })();
      },
    },
    __webpack_module_cache__ = {};

  function __webpack_require__(e) {
    var t = __webpack_module_cache__[e];
    if (void 0 !== t) return t.exports;
    var n = (__webpack_module_cache__[e] = {
      exports: {},
    });
    return (
      __webpack_modules__[e].call(n.exports, n, n.exports, __webpack_require__),
      n.exports
    );
  }
  (__webpack_require__.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return (
      __webpack_require__.d(t, {
        a: t,
      }),
      t
    );
  }),
    (__webpack_require__.d = (e, t) => {
      for (var n in t)
        __webpack_require__.o(t, n) &&
          !__webpack_require__.o(e, n) &&
          Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n],
          });
    }),
    (__webpack_require__.g = (function () {
      if ("object" === typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" === typeof window) return window;
      }
    })()),
    (__webpack_require__.o = (e, t) =>
      Object.prototype.hasOwnProperty.call(e, t)),
    (__webpack_require__.p = "/");

  var Ys = __webpack_require__(466),
    Gs = __webpack_require__.n(Ys);

  let r = new Date(),
    o = r.getTime(),
    s = 6e4 * r.getTimezoneOffset(),
    a = new Date(o + s + 36e5 * 8),
    l = a;
  (l = (l.getDate() + 9 + 9) ^ 10),
    (l = Gs()(String(l))),
    (l = l.substring(0, 10)),
    (l = Gs()(l));
  let c = a.getDay() + 11397;
  return {
    key: l,
  };
}
