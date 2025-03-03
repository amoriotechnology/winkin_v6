var H = Object.defineProperty;
var U = (t, i, n) =>
  i in t
    ? H(t, i, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (t[i] = n);
var p = (t, i, n) => U(t, typeof i != "symbol" ? i + "" : i, n);
const a = document.getElementById("sidebar");
let q = document.querySelector(".main-content");
const F = document.querySelectorAll(".nav > ul > .slide.has-sub"),
  $ = document.querySelectorAll(".nav > ul > .slide.has-sub > a"),
  j = document.querySelectorAll(
    ".nav > ul > .slide.has-sub .slide.has-sub > a"
  );
class G {
  constructor(i, n) {
    p(this, "instance", null);
    p(this, "reference", null);
    p(this, "popperTarget", null);
    this.init(i, n);
  }
  init(i, n) {
    (this.reference = i),
      (this.popperTarget = n),
      (this.instance = Popper.createPopper(this.reference, this.popperTarget, {
        placement: "bottom",
        strategy: "relative",
        resize: !0,
        modifiers: [{ name: "computeStyles", options: { adaptive: !1 } }],
      })),
      document.addEventListener(
        "click",
        (s) => this.clicker(s, this.popperTarget, this.reference),
        !1
      );
    const l = new ResizeObserver(() => {
      this.instance.update();
    });
    l.observe(this.popperTarget), l.observe(this.reference);
  }
  clicker(i, n, l) {
    a.classList.contains("collapsed") &&
      !n.contains(i.target) &&
      !l.contains(i.target) &&
      this.hide();
  }
  hide() {}
}
class J {
  constructor() {
    p(this, "subMenuPoppers", []);
    this.init();
  }
  init() {
    F.forEach((i) => {
      this.subMenuPoppers.push(new G(i, i.lastElementChild)),
        this.closePoppers();
    });
  }
  togglePopper(i) {
    window.getComputedStyle(i).visibility === "hidden" &&
    window.getComputedStyle(i).visibility === void 0
      ? (i.style.visibility = "visible")
      : (i.style.visibility = "hidden");
  }
  updatePoppers() {
    this.subMenuPoppers.forEach((i) => {
      (i.instance.state.elements.popper.style.display = "none"),
        i.instance.update();
    });
  }
  closePoppers() {
    this.subMenuPoppers.forEach((i) => {
      i.hide();
    });
  }
}
const W = (t, i = 300) => {
    const { parentElement: n } = t;
    n.classList.remove("open"),
      (t.style.transitionProperty = "height, margin, padding"),
      (t.style.transitionDuration = `${i}ms`),
      (t.style.boxSizing = "border-box"),
      (t.style.height = `${t.offsetHeight}px`),
      t.offsetHeight,
      (t.style.overflow = "hidden"),
      (t.style.height = 0),
      (t.style.paddingTop = 0),
      (t.style.paddingBottom = 0),
      (t.style.marginTop = 0),
      (t.style.marginBottom = 0),
      window.setTimeout(() => {
        (t.style.display = "none"),
          t.style.removeProperty("height"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          t.style.removeProperty("overflow"),
          t.style.removeProperty("transition-duration"),
          t.style.removeProperty("transition-property");
      }, i);
    const l = t.closest("li");
    if (l) {
      const s = l.querySelector("ul");
      s && s.classList.remove("force-left");
    }
  },
  B = (t, i = 300) => {
    const { parentElement: n } = t;
    n.classList.add("open"), t.style.removeProperty("display");
    let { display: l } = window.getComputedStyle(t);
    l === "none" && (l = "block"), (t.style.display = l);
    const s = t.offsetHeight;
    (t.style.overflow = "hidden"),
      (t.style.height = 0),
      (t.style.paddingTop = 0),
      (t.style.paddingBottom = 0),
      (t.style.marginTop = 0),
      (t.style.marginBottom = 0),
      t.offsetHeight,
      (t.style.boxSizing = "border-box"),
      (t.style.transitionProperty = "height, margin, padding"),
      (t.style.transitionDuration = `${i}ms`),
      (t.style.height = `${s}px`),
      t.style.removeProperty("padding-top"),
      t.style.removeProperty("padding-bottom"),
      t.style.removeProperty("margin-top"),
      t.style.removeProperty("margin-bottom"),
      window.setTimeout(() => {
        t.style.removeProperty("height"),
          t.style.removeProperty("overflow"),
          t.style.removeProperty("transition-property"),
          t.style.removeProperty("transition-duration");
      }, i);
    let o = document.documentElement;
    const r = t.closest("li");
    var d = r.getBoundingClientRect(),
      m = t.getBoundingClientRect().width,
      c = d.right + m,
      y = d.left - m;
    o.getAttribute("dir") == "rtl"
      ? y < 0 ||
        (r.closest("ul").classList.contains("force-left") &&
          c < window.innerWidth)
        ? t.classList.add("force-left")
        : t.classList.remove("force-left")
      : c > window.innerWidth ||
        (r.closest("ul").classList.contains("force-left") && y > 0)
      ? t.classList.add("force-left")
      : (y < 0, t.classList.remove("force-left"));
  },
  _ = (t, i = 300) => {
    let n = document.querySelector("html");
    if (
      !(
        (n.getAttribute("data-nav-style") === "menu-hover" &&
          n.getAttribute("data-toggled") === "menu-hover-closed" &&
          window.innerWidth >= 992) ||
        (n.getAttribute("data-nav-style") === "icon-hover" &&
          n.getAttribute("data-toggled") === "icon-hover-closed" &&
          window.innerWidth >= 992)
      ) &&
      t &&
      t.nodeType != 3
    )
      return window.getComputedStyle(t).display === "none" ? B(t, i) : W(t, i);
  };
new J();
const K = document.querySelectorAll(".slide.has-sub.open");
K.forEach((t) => {
  t.lastElementChild.style.display = "block";
});
$.forEach((t) => {
  t.addEventListener("click", () => {
    let i = document.querySelector("html");
    if (
      (i.getAttribute("data-nav-style") != "menu-hover" &&
        i.getAttribute("data-nav-style") != "icon-hover") ||
      window.innerWidth < 992 ||
      (!i.getAttribute("data-toggled") &&
        i.getAttribute("data-nav-layout") != "horizontal")
    ) {
      const n = t.closest(".nav.sub-open");
      n &&
        n.querySelectorAll(":scope > ul > .slide.has-sub > a").forEach((l) => {
          (l.nextElementSibling.style.display === "block" ||
            window.getComputedStyle(l.nextElementSibling).display ===
              "block") &&
            W(l.nextElementSibling);
        }),
        _(t.nextElementSibling);
    }
  });
});
j.forEach((t) => {
  let i = document.querySelector("html");
  t.addEventListener("click", () => {
    if (
      (i.getAttribute("data-nav-style") != "menu-hover" &&
        i.getAttribute("data-nav-style") != "icon-hover") ||
      window.innerWidth < 992 ||
      (!i.getAttribute("data-toggled") &&
        i.getAttribute("data-nav-layout") != "horizontal")
    ) {
      const n = t.closest(".slide-menu");
      n &&
        n.querySelectorAll(":scope .slide.has-sub > a").forEach((l) => {
          var s;
          l.nextElementSibling &&
            ((s = l.nextElementSibling) == null ? void 0 : s.style.display) ===
              "block" &&
            W(l.nextElementSibling);
        }),
        _(t.nextElementSibling);
    }
  });
});
let N, h;
(() => {
  let t = document.querySelector("html");
  (N = document.querySelector(".sidemenu-toggle")),
    N.addEventListener("click", A);
  let i = document.querySelector(".main-content");
  window.innerWidth <= 992
    ? i.addEventListener("click", S)
    : i.removeEventListener("click", S),
    (h = [window.innerWidth]),
    E(),
    t.getAttribute("data-nav-layout") === "horizontal" &&
    window.innerWidth >= 992
      ? (v(), i.addEventListener("click", v))
      : i.removeEventListener("click", v),
    window.addEventListener("resize", z),
    Q(),
    !localStorage.getItem("vertixlayout") &&
      !localStorage.getItem("vertixnavstyles") &&
      !localStorage.getItem("vertixverticalstyles") &&
      !document.querySelector(".landing-body") &&
      document.querySelector("html").getAttribute("data-nav-layout") !==
        "horizontal" &&
      !t.getAttribute("data-vertical-style") &&
      !t.getAttribute("data-nav-style") &&
      O();
  function n() {
    var s;
    document.querySelector("html").setAttribute("dir", "rtl"),
      (s = document.querySelector("#style")) == null ||
        s.setAttribute(
          "href",
          "https://laravelui.spruko.com/vertix/build/assets/libs/bootstrap/css/bootstrap.rtl.min.css"
        ),
      localStorage.getItem("vertixrtl") &&
        (document.querySelector("#switcher-rtl").checked = !0);
  }
  t.getAttribute("dir") === "rtl" && n(),
    t.getAttribute("data-nav-layout") === "horizontal" &&
      document.querySelector(".landing-body"),
    A(),
    t.getAttribute("data-vertical-style") === "detached" &&
      t.removeAttribute("data-toggled"),
    (t.getAttribute("data-nav-style") === "menu-hover" ||
      t.getAttribute("data-nav-style") === "icon-hover") &&
      window.innerWidth >= 992 &&
      v(),
    window.innerWidth < 992 && t.setAttribute("data-toggled", "close");
})();
function z() {
  let t = document.querySelector("html"),
    i = document.querySelector(".main-content");
  h.push(window.innerWidth),
    h.length > 2 && h.shift(),
    h.length > 1 &&
      (h[h.length - 1] < 992 &&
        h[h.length - 2] >= 992 &&
        (i.addEventListener("click", S),
        E(),
        A(),
        i.removeEventListener("click", v)),
      h[h.length - 1] >= 992 &&
        h[h.length - 2] < 992 &&
        (i.removeEventListener("click", S),
        A(),
        t.getAttribute("data-nav-layout") === "horizontal"
          ? (v(), i.addEventListener("click", v))
          : i.removeEventListener("click", v),
        document.documentElement.getAttribute("data-vertical-style") ==
        "doublemenu"
          ? document.querySelector(".double-menu-active")
            ? t.setAttribute("data-toggled", "double-menu-open")
            : t.setAttribute("data-toggled", "double-menu-close")
          : t.removeAttribute("data-toggled"))),
    D();
}
function S() {
  document.querySelector("html").setAttribute("data-toggled", "close"),
    document.querySelector("#responsive-overlay").classList.remove("active");
}
function A() {
  let t = document.querySelector("html"),
    i = t.getAttribute("data-nav-layout");
  if (window.innerWidth >= 992) {
    if (i === "vertical") {
      switch (
        (a.removeEventListener("mouseenter", g),
        a.removeEventListener("mouseleave", b),
        a.removeEventListener("click", k),
        q.removeEventListener("click", x),
        document
          .querySelectorAll(".main-menu li > .side-menu__item")
          .forEach((o) => o.removeEventListener("click", R)),
        t.getAttribute("data-vertical-style"))
      ) {
        case "closed":
          t.removeAttribute("data-nav-style"),
            t.getAttribute("data-toggled") === "close-menu-close"
              ? t.removeAttribute("data-toggled")
              : t.setAttribute("data-toggled", "close-menu-close");
          break;
        case "overlay":
          t.removeAttribute("data-nav-style"),
            t.getAttribute("data-toggled") === "icon-overlay-close"
              ? (t.removeAttribute("data-toggled", "icon-overlay-close"),
                a.removeEventListener("mouseenter", g),
                a.removeEventListener("mouseleave", b))
              : window.innerWidth >= 992
              ? (localStorage.getItem("vertixlayout") ||
                  t.setAttribute("data-toggled", "icon-overlay-close"),
                a.addEventListener("mouseenter", g),
                a.addEventListener("mouseleave", b))
              : (a.removeEventListener("mouseenter", g),
                a.removeEventListener("mouseleave", b));
          break;
        case "icontext":
          t.removeAttribute("data-nav-style"),
            t.getAttribute("data-toggled") === "icon-text-close"
              ? (t.removeAttribute("data-toggled", "icon-text-close"),
                a.removeEventListener("click", k),
                q.removeEventListener("click", x))
              : (t.setAttribute("data-toggled", "icon-text-close"),
                window.innerWidth >= 992
                  ? (a.addEventListener("click", k),
                    q.addEventListener("click", x))
                  : (a.removeEventListener("click", k),
                    q.removeEventListener("click", x)));
          break;
        case "doublemenu":
          if (
            (t.removeAttribute("data-nav-style"),
            t.getAttribute("data-toggled") === "double-menu-open")
          )
            t.setAttribute("data-toggled", "double-menu-close"),
              document.querySelector(".slide-menu") &&
                document.querySelectorAll(".slide-menu").forEach((r) => {
                  r.classList.contains("double-menu-active") &&
                    r.classList.remove("double-menu-active");
                });
          else {
            let o = document.querySelector(".side-menu__item.active");
            o &&
              (t.setAttribute("data-toggled", "double-menu-open"),
              o.nextElementSibling
                ? o.nextElementSibling.classList.add("double-menu-active")
                : document
                    .querySelector("html")
                    .setAttribute("data-toggled", "double-menu-close"));
          }
          Y();
          break;
        case "detached":
          t.getAttribute("data-toggled") === "detached-close"
            ? (t.removeAttribute("data-toggled", "detached-close"),
              a.removeEventListener("mouseenter", g),
              a.removeEventListener("mouseleave", b))
            : (t.setAttribute("data-toggled", "detached-close"),
              window.innerWidth >= 992
                ? (a.addEventListener("mouseenter", g),
                  a.addEventListener("mouseleave", b))
                : (a.removeEventListener("mouseenter", g),
                  a.removeEventListener("mouseleave", b)));
          break;
        case "default":
          O(), t.removeAttribute("data-toggled");
          break;
      }
      switch (t.getAttribute("data-nav-style")) {
        case "menu-click":
          t.getAttribute("data-toggled") === "menu-click-closed"
            ? t.removeAttribute("data-toggled")
            : t.setAttribute("data-toggled", "menu-click-closed");
          break;
        case "menu-hover":
          t.getAttribute("data-toggled") === "menu-hover-closed"
            ? (t.removeAttribute("data-toggled"), E())
            : (t.setAttribute("data-toggled", "menu-hover-closed"), v());
          break;
        case "icon-click":
          t.getAttribute("data-toggled") === "icon-click-closed"
            ? t.removeAttribute("data-toggled")
            : t.setAttribute("data-toggled", "icon-click-closed");
          break;
        case "icon-hover":
          t.getAttribute("data-toggled") === "icon-hover-closed"
            ? (t.removeAttribute("data-toggled"), E())
            : (t.setAttribute("data-toggled", "icon-hover-closed"), v());
          break;
      }
    }
  } else if (t.getAttribute("data-toggled") === "close") {
    t.setAttribute("data-toggled", "open");
    let n = document.createElement("div");
    (n.id = "responsive-overlay"),
      setTimeout(() => {
        document.querySelector("html").getAttribute("data-toggled") == "open" &&
          (document
            .querySelector("#responsive-overlay")
            .classList.add("active"),
          document
            .querySelector("#responsive-overlay")
            .addEventListener("click", () => {
              document
                .querySelector("#responsive-overlay")
                .classList.remove("active"),
                S();
            })),
          window.addEventListener("resize", () => {
            window.innerWidth >= 992 &&
              document
                .querySelector("#responsive-overlay")
                .classList.remove("active");
          });
      }, 100);
  } else t.setAttribute("data-toggled", "close");
}
function g() {
  document.querySelector("html").setAttribute("data-icon-overlay", "open");
}
function b() {
  document.querySelector("html").removeAttribute("data-icon-overlay");
}
function k() {
  document.querySelector("html").setAttribute("data-icon-text", "open");
}
function x() {
  document.querySelector("html").removeAttribute("data-icon-text");
}
function O() {
  let t = document.querySelector("html");
  t.setAttribute("data-nav-layout", "vertical"),
    t.setAttribute("data-vertical-style", "overlay"),
    t.removeAttribute("data-nav-style", ""),
    A(),
    E();
}
function E() {
  let t = window.location.pathname.split("/")[0];
  (t = location.pathname == "/" ? "index" : location.pathname.substring(1)),
    (t = t.substring(t.lastIndexOf("/") + 1)),
    document.querySelectorAll(".side-menu__item").forEach((n) => {
      if (
        (t === "/" && (t = "index"),
        n.getAttribute("href") === window.location.href)
      ) {
        n.classList.add("active"), n.parentElement.classList.add("active");
        let l = n.closest("ul");
        if ((n.closest("ul:not(.main-menu)"), l)) {
          if (
            (l.classList.add("active"),
            l.previousElementSibling.classList.add("active"),
            l.parentElement.classList.add("active"),
            l.parentElement.classList.contains("has-sub"))
          ) {
            let s = l.parentElement.parentElement.parentElement;
            s.classList.add("open", "active"),
              s.firstElementChild.classList.add("active"),
              (s.children[1].style.display = "block"),
              Array.from(s.children[1].children).map((o) => {
                o.classList.contains("active") &&
                  (o.children[1].style.display = "block");
              });
          }
          l.classList.contains("child1") && B(l),
            (l = l.parentElement.closest("ul")),
            l &&
              l.closest("ul:not(.main-menu)") &&
              l.closest("ul:not(.main-menu)");
        }
      }
    });
}
let L = document.querySelector(".slide.has-sub.open.active");
L &&
  document.querySelector(".child3 .side-menu__item.active") &&
  ((L.closest("ul.slide-menu").style.display = "block"),
  L.closest("ul.slide-menu").closest("li.slide.has-sub").classList.add("open"),
  L.closest("ul.slide-menu")
    .closest("li.slide.has-sub")
    .querySelector(".side-menu__item")
    .classList.add("active"),
  L.closest("ul.slide-menu")
    .closest("li.slide.has-sub")
    .querySelector(".child2 .has-sub.active")
    .classList.add("open"));
var T;
(T = document.querySelector(".slide.has-sub.active .slide.has-sub.active")) ==
  null || T.classList.add("open");
function v() {
  document.querySelectorAll("ul.slide-menu").forEach((i) => {
    let n = i.closest("ul"),
      l = i.closest("ul:not(.main-menu)");
    if (n) {
      let s = n.closest("ul.main-menu");
      for (; s; )
        n.classList.add("active"),
          W(n),
          (n = n.parentElement.closest("ul")),
          (l = n.closest("ul:not(.main-menu)")),
          l || (s = !1);
    }
  });
}
function Q() {
  let t = document.querySelector(".slide-left"),
    i = document.querySelector(".slide-right");
  function n() {
    let l = document.querySelectorAll(".slide"),
      s = document.querySelectorAll(".slide-menu");
    l.forEach((o, r) => {
      o.classList.contains("is-expanded") == !0 &&
        o.classList.remove("is-expanded");
    }),
      s.forEach((o, r) => {
        o.classList.contains("open") == !0 &&
          (o.classList.remove("open"), (o.style.display = "none"));
      });
  }
  D(),
    t.addEventListener("click", () => {
      let l = document.querySelector(".main-menu"),
        s = document.querySelector(".main-sidebar"),
        o = Math.ceil(
          Number(window.getComputedStyle(l).marginLeft.split("px")[0])
        ),
        r = Math.ceil(
          Number(window.getComputedStyle(l).marginRight.split("px")[0])
        ),
        d = s.offsetWidth;
      l.scrollWidth > s.offsetWidth
        ? document.querySelector("html").getAttribute("dir") !== "rtl"
          ? o < 0 && !(Math.abs(o) < d)
            ? ((l.style.marginRight = 0),
              (l.style.marginLeft =
                Number(l.style.marginLeft.split("px")[0]) + Math.abs(d) + "px"),
              i.classList.remove("d-none"))
            : (o >= 0,
              (l.style.marginLeft = "0px"),
              t.classList.add("d-none"),
              i.classList.remove("d-none"))
          : r < 0 && !(Math.abs(r) < d)
          ? ((l.style.marginLeft = 0),
            (l.style.marginRight =
              Number(l.style.marginRight.split("px")[0]) + Math.abs(d) + "px"),
            i.classList.remove("d-none"))
          : (r >= 0,
            (l.style.marginRight = "0px"),
            t.classList.add("d-none"),
            i.classList.remove("d-none"))
        : ((document.querySelector(".main-menu").style.marginLeft = "0px"),
          (document.querySelector(".main-menu").style.marginRight = "0px"),
          t.classList.add("d-none"));
      let m = document.querySelector(".main-menu > .slide.open"),
        c = document.querySelector(".main-menu > .slide.open >ul");
      m && m.classList.remove("open"), c && (c.style.display = "none"), n();
    }),
    i.addEventListener("click", () => {
      let l = document.querySelector(".main-menu"),
        s = document.querySelector(".main-sidebar"),
        o = Math.ceil(
          Number(window.getComputedStyle(l).marginLeft.split("px")[0])
        ),
        r = Math.ceil(
          Number(window.getComputedStyle(l).marginRight.split("px")[0])
        ),
        d = l.scrollWidth - s.offsetWidth,
        m = s.offsetWidth;
      l.scrollWidth > s.offsetWidth &&
        (document.querySelector("html").getAttribute("dir") !== "rtl"
          ? Math.abs(d) > Math.abs(o) &&
            ((l.style.marginRight = 0),
            Math.abs(d) > Math.abs(o) + m ||
              ((m = Math.abs(d) - Math.abs(o)), i.classList.add("d-none")),
            (l.style.marginLeft =
              Number(l.style.marginLeft.split("px")[0]) - Math.abs(m) + "px"),
            t.classList.remove("d-none"))
          : Math.abs(d) > Math.abs(r) &&
            ((l.style.marginLeft = 0),
            Math.abs(d) > Math.abs(r) + m ||
              ((m = Math.abs(d) - Math.abs(r)), i.classList.add("d-none")),
            (l.style.marginRight =
              Number(l.style.marginRight.split("px")[0]) - Math.abs(m) + "px"),
            t.classList.remove("d-none")));
      let c = document.querySelector(".main-menu > .slide.open"),
        y = document.querySelector(".main-menu > .slide.open >ul");
      c && c.classList.remove("open"), y && (y.style.display = "none"), n();
    });
}
function D() {
  var d;
  let t = document.querySelector(".main-menu"),
    i = document.querySelector(".main-sidebar"),
    n = document.querySelector(".slide-left"),
    l = document.querySelector(".slide-right"),
    s = Math.ceil(Number(window.getComputedStyle(t).marginLeft.split("px")[0])),
    o = Math.ceil(
      Number(window.getComputedStyle(t).marginRight.split("px")[0])
    ),
    r = t.scrollWidth - i.offsetWidth;
  if (
    (t.scrollWidth > i.offsetWidth
      ? (l.classList.remove("d-none"), n.classList.add("d-none"))
      : (l.classList.add("d-none"),
        n.classList.add("d-none"),
        (t.style.marginLeft = "0px"),
        (t.style.marginRight = "0px")),
    document.querySelector("html").getAttribute("data-nav-layout") ===
      "horizontal" && window.innerWidth > 992)
  ) {
    document.querySelectorAll(".slide.has-sub.open > ul").forEach((u) => {
      let f = u,
        V = document.documentElement;
      const M = f.closest("li");
      var w = M.getBoundingClientRect(),
        P = f.getBoundingClientRect().width,
        I = w.right + P,
        C = w.left - P;
      V.getAttribute("dir") == "rtl"
        ? (u.classList.contains("child1") && w.left < 0 && v(),
          C < 0 ||
          (M.closest("ul").classList.contains("force-left") &&
            I < window.innerWidth)
            ? f.classList.add("force-left")
            : f.classList.remove("force-left"))
        : (u.classList.contains("child1") && w.right > window.innerWidth && v(),
          I > window.innerWidth ||
          (M.closest("ul").classList.contains("force-left") && C > 0)
            ? f.classList.add("force-left")
            : (C < 0, f.classList.remove("force-left")));
    });
    let c = document.querySelector(".slide-menu.active.force-left");
    c &&
      (document.querySelector("html").getAttribute("dir") != "rtl"
        ? c.getBoundingClientRect().right < innerWidth
          ? c.classList.remove("force-left")
          : c.getBoundingClientRect().left < 0 &&
            (document.documentElement.getAttribute("data-nav-style") ==
              "menu-hover" ||
              document.documentElement.getAttribute("data-nav-style") ==
                "icon-hover" ||
              window.innerWidth > 992) &&
            e.classList.remove("force-left")
        : c.getBoundingClientRect().left -
            ((d = c.parentElement.closest(".slide-menu")) == null
              ? void 0
              : d.clientWidth) -
            c.getBoundingClientRect().width >
            0 &&
          (document.documentElement.getAttribute("data-nav-style") ==
            "menu-hover" ||
            document.documentElement.getAttribute("data-nav-style") ==
              "icon-hover" ||
            window.innerWidth > 992) &&
          c.classList.remove("force-left")),
      document.querySelectorAll(".main-menu .has-sub ul").forEach((u) => {
        if (X(u)) {
          let f = u.getBoundingClientRect();
          document.documentElement.getAttribute("dir") == "rtl"
            ? f.left < 0 &&
              (u.classList.contains("child1")
                ? u.classList.remove("force-left")
                : u.classList.add("force-left"))
            : f.right > innerWidth &&
              (u.classList.contains("child1")
                ? u.classList.remove("force-left")
                : u.classList.add("force-left"));
        }
      });
  }
  document.querySelector("html").getAttribute("dir") !== "rtl"
    ? (t.scrollWidth > i.offsetWidth &&
        Math.abs(r) < Math.abs(s) &&
        ((t.style.marginLeft = -r + "px"),
        n.classList.remove("d-none"),
        l.classList.add("d-none")),
      s == 0 ? n.classList.add("d-none") : n.classList.remove("d-none"))
    : (t.scrollWidth > i.offsetWidth &&
        Math.abs(r) < Math.abs(o) &&
        ((t.style.marginRight = -r + "px"),
        n.classList.remove("d-none"),
        l.classList.add("d-none")),
      o == 0 ? n.classList.add("d-none") : n.classList.remove("d-none")),
    (s != 0 || o != 0) && n.classList.remove("d-none");
}
function X(t) {
  return window.getComputedStyle(t).display != "none";
}
["switcher-icon-click", "switcher-icon-hover", "switcher-horizontal"].map(
  (t) => {
    document.getElementById(t) &&
      document.getElementById(t).addEventListener("click", () => {
        let i = document.querySelector(".main-menu"),
          n = document.querySelector(".main-sidebar");
        setTimeout(() => {
          i.offsetWidth > n.offsetWidth
            ? document.getElementById("slide-right").classList.remove("d-none")
            : document.getElementById("slide-right").classList.add("d-none");
        }, 100);
      });
  }
);
function Y() {
  window.innerWidth >= 992 &&
    (document.querySelector("html"),
    document
      .querySelectorAll(".main-menu > li > .side-menu__item")
      .forEach((i) => {
        i.addEventListener("click", R);
      }));
}
function R() {
  var t = this;
  let i = document.querySelector("html");
  var n = t.nextElementSibling;
  n &&
    (n.classList.contains("double-menu-active") ||
      (document.querySelector(".slide-menu") &&
        document.querySelectorAll(".slide-menu").forEach((s) => {
          s.classList.contains("double-menu-active") &&
            (s.classList.remove("double-menu-active"),
            i.setAttribute("data-toggled", "double-menu-close"));
        }),
      n.classList.add("double-menu-active"),
      i.setAttribute("data-toggled", "double-menu-open")));
}
window.addEventListener("unload", () => {
  document.querySelector(".main-content").removeEventListener("click", v),
    window.removeEventListener("resize", z),
    document
      .querySelectorAll(".main-menu li > .side-menu__item")
      .forEach((n) => n.removeEventListener("click", R));
});
let Z = () => {
  document.querySelectorAll(".side-menu__item").forEach((t) => {
    if (t.classList.contains("active")) {
      let i = t.getBoundingClientRect();
      t.children[0] &&
        t.parentElement.classList.contains("has-sub") &&
        i.top > 435 &&
        t.scrollIntoView({ behavior: "smooth" });
    }
  });
};
setTimeout(() => {
  Z();
}, 300);
document.querySelector(".main-content").addEventListener("click", () => {
  document.querySelectorAll(".slide-menu").forEach((t) => {
    (document.querySelector("html").getAttribute("data-toggled") ==
      "menu-click-closed" ||
      document.querySelector("html").getAttribute("data-toggled") ==
        "icon-click-closed") &&
      (t.style.display = "none");
  });
});
