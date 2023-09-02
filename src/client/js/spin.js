!(function (t, i) {
  "object" == typeof exports
    ? (module.exports = i())
    : "function" == typeof define && define.amd
    ? define(i)
    : (t.Spinner = i());
})(this, function () {
  "use strict";
  function t(t, i) {
    var e,
      o = document.createElement(t || "div");
    for (e in i) o[e] = i[e];
    return o;
  }
  function i(t) {
    for (var i = 1, e = arguments.length; i < e; i++)
      t.appendChild(arguments[i]);
    return t;
  }
  function e(t, i, e, o) {
    var n = ["opacity", i, ~~(100 * t), e, o].join("-"),
      r = 0.01 + (e / o) * 100,
      s = Math.max(1 - ((1 - t) / i) * (100 - r), t),
      a = l.substring(0, l.indexOf("Animation")).toLowerCase(),
      c = (a && "-" + a + "-") || "";
    return (
      d[n] ||
        (p.insertRule(
          "@" +
            c +
            "keyframes " +
            n +
            "{0%{opacity:" +
            s +
            "}" +
            r +
            "%{opacity:" +
            t +
            "}" +
            (r + 0.01) +
            "%{opacity:1}" +
            ((r + i) % 100) +
            "%{opacity:" +
            t +
            "}100%{opacity:" +
            s +
            "}}",
          p.cssRules.length
        ),
        (d[n] = 1)),
      n
    );
  }
  function o(t, i) {
    var e,
      o,
      n = t.style;
    for (i = i.charAt(0).toUpperCase() + i.slice(1), o = 0; o < c.length; o++)
      if (((e = c[o] + i), void 0 !== n[e])) return e;
    if (void 0 !== n[i]) return i;
  }
  function n(t, i) {
    for (var e in i) t.style[o(t, e) || e] = i[e];
    return t;
  }
  function r(t) {
    for (var i = 1; i < arguments.length; i++) {
      var e = arguments[i];
      for (var o in e) void 0 === t[o] && (t[o] = e[o]);
    }
    return t;
  }
  function s(t, i) {
    return "string" == typeof t ? t : t[i % t.length];
  }
  function a(t) {
    this.opts = r(t || {}, a.defaults, u);
  }
  var l,
    c = ["webkit", "Moz", "ms", "O"],
    d = {},
    p = (function () {
      var e = t("style", { type: "text/css" });
      return (
        i(document.getElementsByTagName("head")[0], e), e.sheet || e.styleSheet
      );
    })(),
    u = {
      lines: 12,
      length: 7,
      width: 5,
      radius: 10,
      rotate: 0,
      corners: 1,
      color: "#000",
      direction: 1,
      speed: 1,
      trail: 100,
      opacity: 0.25,
      fps: 20,
      zIndex: 2e9,
      className: "spinner",
      top: "50%",
      left: "50%",
      position: "absolute"
    };
  (a.defaults = {}),
    r(a.prototype, {
      spin: function (i) {
        this.stop();
        var e = this,
          o = e.opts,
          r = (e.el = n(t(0, { className: o.className }), {
            position: o.position,
            width: 0,
            zIndex: o.zIndex
          }));
        o.radius, o.length, o.width;
        if (
          (n(r, { left: o.left, top: o.top }),
          i && i.insertBefore(r, i.firstChild || null),
          r.setAttribute("role", "progressbar"),
          e.lines(r, e.opts),
          !l)
        ) {
          var s,
            a = 0,
            c = ((o.lines - 1) * (1 - o.direction)) / 2,
            d = o.fps,
            p = d / o.speed,
            u = (1 - o.opacity) / ((p * o.trail) / 100),
            f = p / o.lines;
          !(function t() {
            a++;
            for (var i = 0; i < o.lines; i++)
              (s = Math.max(1 - ((a + (o.lines - i) * f) % p) * u, o.opacity)),
                e.opacity(r, i * o.direction + c, s, o);
            e.timeout = e.el && setTimeout(t, ~~(1e3 / d));
          })();
        }
        return e;
      },
      stop: function () {
        var t = this.el;
        return (
          t &&
            (clearTimeout(this.timeout),
            t.parentNode && t.parentNode.removeChild(t),
            (this.el = void 0)),
          this
        );
      },
      lines: function (o, r) {
        function a(i, e) {
          return n(t(), {
            position: "absolute",
            width: r.length + r.width + "px",
            height: r.width + "px",
            background: i,
            boxShadow: e,
            transformOrigin: "left",
            transform:
              "rotate(" +
              ~~((360 / r.lines) * d + r.rotate) +
              "deg) translate(" +
              r.radius +
              "px,0)",
            borderRadius: ((r.corners * r.width) >> 1) + "px"
          });
        }
        for (
          var c, d = 0, p = ((r.lines - 1) * (1 - r.direction)) / 2;
          d < r.lines;
          d++
        )
          (c = n(t(), {
            position: "absolute",
            top: 1 + ~(r.width / 2) + "px",
            transform: r.hwaccel ? "translate3d(0,0,0)" : "",
            opacity: r.opacity,
            animation:
              l &&
              e(r.opacity, r.trail, p + d * r.direction, r.lines) +
                " " +
                1 / r.speed +
                "s linear infinite"
          })),
            r.shadow && i(c, n(a("#000", "0 0 4px #000"), { top: "2px" })),
            i(o, i(c, a(s(r.color, d), "0 0 1px rgba(0,0,0,.1)")));
        return o;
      },
      opacity: function (t, i, e) {
        i < t.childNodes.length && (t.childNodes[i].style.opacity = e);
      }
    });
  var f = n(t("group"), { behavior: "url(#default#VML)" });
  return (
    !o(f, "transform") && f.adj
      ? (function () {
          function e(i, e) {
            return t(
              "<" +
                i +
                ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',
              e
            );
          }
          p.addRule(".spin-vml", "behavior:url(#default#VML)"),
            (a.prototype.lines = function (t, o) {
              function r() {
                return n(
                  e("group", {
                    coordsize: d + " " + d,
                    coordorigin: -c + " " + -c
                  }),
                  { width: d, height: d }
                );
              }
              function a(t, a, l) {
                i(
                  u,
                  i(
                    n(r(), {
                      rotation: (360 / o.lines) * t + "deg",
                      left: ~~a
                    }),
                    i(
                      n(e("roundrect", { arcsize: o.corners }), {
                        width: c,
                        height: o.width,
                        left: o.radius,
                        top: -o.width >> 1,
                        filter: l
                      }),
                      e("fill", { color: s(o.color, t), opacity: o.opacity }),
                      e("stroke", { opacity: 0 })
                    )
                  )
                );
              }
              var l,
                c = o.length + o.width,
                d = 2 * c,
                p = 2 * -(o.width + o.length) + "px",
                u = n(r(), { position: "absolute", top: p, left: p });
              if (o.shadow)
                for (l = 1; l <= o.lines; l++)
                  a(
                    l,
                    -2,
                    "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)"
                  );
              for (l = 1; l <= o.lines; l++) a(l);
              return i(t, u);
            }),
            (a.prototype.opacity = function (t, i, e, o) {
              var n = t.firstChild;
              (o = (o.shadow && o.lines) || 0),
                n &&
                  i + o < n.childNodes.length &&
                  (n =
                    (n = (n = n.childNodes[i + o]) && n.firstChild) &&
                    n.firstChild) &&
                  (n.opacity = e);
            });
        })()
      : (l = o(f, "animation")),
    a
  );
});
