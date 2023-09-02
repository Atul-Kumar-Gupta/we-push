!(function (t, e) {
  "use strict";
  "object" == typeof exports
    ? (module.exports = e(require("spin.js")))
    : "function" == typeof define && define.amd
    ? define(["spin"], e)
    : (t.Ladda = e(t.Spinner));
})(this, function (t) {
  "use strict";
  var e = [];
  function a(a) {
    if (void 0 !== a) {
      if (
        (/ladda-button/i.test(a.className) || (a.className += " ladda-button"),
        a.hasAttribute("data-style") ||
          a.setAttribute("data-style", "expand-right"),
        !a.querySelector(".ladda-label"))
      ) {
        var u = document.createElement("span");
        (u.className = "ladda-label"),
          (n = a),
          (i = u),
          (r = document.createRange()).selectNodeContents(n),
          r.surroundContents(i),
          n.appendChild(i);
      }
      var n,
        i,
        r,
        d,
        o,
        s = a.querySelector(".ladda-spinner");
      s || ((s = document.createElement("span")).className = "ladda-spinner"),
        a.appendChild(s);
      var F = {
        start: function () {
          return (
            d ||
              (d = (function (e) {
                var a,
                  u,
                  n = e.offsetHeight;
                0 === n && (n = parseFloat(window.getComputedStyle(e).height));
                n > 32 && (n *= 0.8);
                e.hasAttribute("data-spinner-size") &&
                  (n = parseInt(e.getAttribute("data-spinner-size"), 10));
                e.hasAttribute("data-spinner-color") &&
                  (a = e.getAttribute("data-spinner-color"));
                e.hasAttribute("data-spinner-lines") &&
                  (u = parseInt(e.getAttribute("data-spinner-lines"), 10));
                var i = 0.2 * n;
                return new t({
                  color: a || "#fff",
                  lines: u || 12,
                  radius: i,
                  length: 0.6 * i,
                  width: i < 7 ? 2 : 3,
                  zIndex: "auto",
                  top: "auto",
                  left: "auto",
                  className: ""
                });
              })(a)),
            (a.disabled = !0),
            a.setAttribute("data-loading", ""),
            clearTimeout(o),
            d.spin(s),
            this.setProgress(0),
            this
          );
        },
        startAfter: function (t) {
          return (
            clearTimeout(o),
            (o = setTimeout(function () {
              F.start();
            }, t)),
            this
          );
        },
        stop: function () {
          return (
            F.isLoading() &&
              ((a.disabled = !1), a.removeAttribute("data-loading")),
            clearTimeout(o),
            d &&
              (o = setTimeout(function () {
                d.stop();
              }, 1e3)),
            this
          );
        },
        toggle: function () {
          return this.isLoading() ? this.stop() : this.start();
        },
        setProgress: function (t) {
          t = Math.max(Math.min(t, 1), 0);
          var e = a.querySelector(".ladda-progress");
          0 === t && e && e.parentNode
            ? e.parentNode.removeChild(e)
            : (e ||
                (((e = document.createElement("div")).className =
                  "ladda-progress"),
                a.appendChild(e)),
              (e.style.width = (t || 0) * a.offsetWidth + "px"));
        },
        enable: function () {
          return this.stop();
        },
        disable: function () {
          return this.stop(), (a.disabled = !0), this;
        },
        isLoading: function () {
          return a.hasAttribute("data-loading");
        },
        remove: function () {
          clearTimeout(o),
            (a.disabled = !1),
            a.removeAttribute("data-loading"),
            d && (d.stop(), (d = null)),
            e.splice(e.indexOf(F), 1);
        }
      };
      return e.push(F), F;
    }
    console.warn("Ladda button target must be defined.");
  }
  function u(t, e) {
    if ("function" == typeof t.addEventListener) {
      var u = a(t),
        n = -1;
      t.addEventListener(
        "click",
        function () {
          var a,
            i,
            r = !0,
            d = (function (t, e) {
              for (; t.parentNode && t.tagName !== e; ) t = t.parentNode;
              return e === t.tagName ? t : void 0;
            })(t, "FORM");
          if (void 0 !== d && !d.hasAttribute("novalidate"))
            if ("function" == typeof d.checkValidity) r = d.checkValidity();
            else
              for (
                var o =
                    ((a = d),
                    (i = []),
                    ["input", "textarea", "select"].forEach(function (t) {
                      for (
                        var e = a.getElementsByTagName(t), u = 0;
                        u < e.length;
                        u++
                      )
                        e[u].hasAttribute("required") && i.push(e[u]);
                    }),
                    i),
                  s = 0;
                s < o.length;
                s++
              ) {
                var F = o[s],
                  l = F.getAttribute("type");
                if (
                  ("" === F.value.replace(/^\s+|\s+$/g, "") && (r = !1),
                  ("checkbox" !== l && "radio" !== l) || F.checked || (r = !1),
                  "email" === l &&
                    (r = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i.test(
                      F.value
                    )),
                  "url" === l &&
                    (r = /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
                      F.value
                    )),
                  !r)
                )
                  break;
              }
          r &&
            (u.startAfter(1),
            "number" == typeof e.timeout &&
              (clearTimeout(n), (n = setTimeout(u.stop, e.timeout))),
            "function" == typeof e.callback && e.callback.apply(null, [u]));
        },
        !1
      );
    }
  }
  return {
    bind: function (t, e) {
      var a;
      if ("string" == typeof t) a = document.querySelectorAll(t);
      else {
        if ("object" != typeof t)
          throw new Error("target must be string or object");
        a = [t];
      }
      e = e || {};
      for (var n = 0; n < a.length; n++) u(a[n], e);
    },
    create: a,
    stopAll: function () {
      for (var t = 0, a = e.length; t < a; t++) e[t].stop();
    }
  };
});
