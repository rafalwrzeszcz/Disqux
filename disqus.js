var DISQUS = function (d) {
    var c = d.DISQUS || {};
    c.AssertionError = function (b) {
        this.message = b
    };
    c.AssertionError.prototype.toString = function () {
        return "Assertion Error: " + (this.message || "[no message]")
    };
    c.assert = function (b, k, h) {
        if (!b) if (h) d.console && d.console.log("DISQUS assertion failed: " + k);
        else throw new c.AssertionError(k);
    };
    var b = [];
    c.define = function (g, k) {
        typeof g === "function" && (k = g, g = "");
        for (var h = g.split("."), a = h.shift(), e = c, l = (k || function () {
            return {}
        }).call({
            overwrites: function (a) {
                a.__overwrites__ = !0;
                return a
            }
        }, d); a;) e = e[a] ? e[a] : e[a] = {}, a = h.shift();
        for (var f in l) l.hasOwnProperty(f) && (!l.__overwrites__ && e[f] !== null && c.assert(!e.hasOwnProperty(f), "Unsafe attempt to redefine existing module: " + f, !0), e[f] = l[f], b.push(function (a, e) {
            return function () {
                delete a[e]
            }
        }(e, f)));
        return e
    };
    c.use = function (b) {
        return c.define(b)
    };
    c.cleanup = function () {
        for (var c = 0; c < b.length; c++) b[c]()
    };
    return c
}(window);
DISQUS.define(function (d, c) {
    var b = d.DISQUS,
        g = d.document,
        k = g.getElementsByTagName("head")[0] || g.body,
        h = {
            running: !1,
            timer: null,
            queue: []
        };
    b.defer = function (a, e) {
        function b() {
            var a = h.queue;
            if (a.length === 0) h.running = !1, clearInterval(h.timer);
            for (var e = 0, c; c = a[e]; e++) c[0]() && (a.splice(e--, 1), c[1]())
        }
        h.queue.push([a, e]);
        b();
        if (!h.running) h.running = !0, h.timer = setInterval(b, 100)
    };
    b.each = function (a, e) {
        var b = a.length,
            f = Array.prototype.forEach;
        if (isNaN(b)) for (var c in a) a.hasOwnProperty(c) && e(a[c], c, a);
        else if (f) f.call(a,
        e);
        else for (f = 0; f < b; f++) e(a[f], f, a)
    };
    b.extend = function (a) {
        b.each(Array.prototype.slice.call(arguments, 1), function (e) {
            for (var b in e) a[b] = e[b]
        });
        return a
    };
    b.serializeArgs = function (a) {
        var e = [];
        b.each(a, function (a, b) {
            a !== c && e.push(b + (a !== null ? "=" + encodeURIComponent(a) : ""))
        });
        return e.join("&")
    };
    b.isString = function (a) {
        return Object.prototype.toString.call(a) === "[object String]"
    };
    b.serialize = function (a, e, c) {
        e && (a += ~a.indexOf("?") ? a.charAt(a.length - 1) == "&" ? "" : "&" : "?", a += b.serializeArgs(e));
        if (c) return e = {}, e[(new Date).getTime()] = null, b.serialize(a, e);
        e = a.length;
        return a.charAt(e - 1) == "&" ? a.slice(0, e - 1) : a
    };
    b.require = function (a, e, c, f, d) {
        function h(a) {
            if (a.type == "load" || /^(complete|loaded)$/.test(a.target.readyState)) f && f(), s && clearTimeout(s), b.bean.remove(a.target, n, h)
        }
        var i = g.createElement("script"),
            n = i.addEventListener ? "load" : "readystatechange",
            s = null;
        i.src = b.serialize(a, e, c);
        i.async = !0;
        i.charset = "UTF-8";
        (f || d) && b.bean.add(i, n, h);
        d && (s = setTimeout(function () {
            d()
        }, 2E4));
        k.appendChild(i);
        return b
    };
    b.requireStylesheet = function (a, e, c) {
        var f = g.createElement("link");
        f.rel = "stylesheet";
        f.type = "text/css";
        f.href = b.serialize(a, e, c);
        k.appendChild(f);
        return b
    };
    b.requireSet = function (a, e, c) {
        var f = a.length;
        b.each(a, function (a) {
            b.require(a, {}, e, function () {
                --f === 0 && c()
            })
        })
    };
    b.injectCss = function (a) {
        var b = g.createElement("style");
        b.setAttribute("type", "text/css");
        a = a.replace(/\}/g, "}\n");
        d.location.href.match(/^https/) && (a = a.replace(/http:\/\//g, "https://"));
        b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(g.createTextNode(a));
        k.appendChild(b)
    }
});
DISQUS.define("JSON", function () {
    function d(a) {
        return a < 10 ? "0" + a : a
    }
    function c(b) {
        a.lastIndex = 0;
        return a.test(b) ? '"' + b.replace(a, function (a) {
            var b = f[a];
            return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + b + '"'
    }
    function b(a, n) {
        var f, d, g, h, i = e,
            m, o = n[a];
        o && typeof o === "object" && typeof o.toJSON === "function" && !k && (o = o.toJSON(a));
        typeof p === "function" && (o = p.call(n, a, o));
        switch (typeof o) {
            case "string":
                return c(o);
            case "number":
                return isFinite(o) ? String(o) : "null";
            case "boolean":
            case "null":
                return String(o);
            case "object":
                if (!o) return "null";
                e += l;
                m = [];
                if (Object.prototype.toString.apply(o) === "[object Array]") {
                    h = o.length;
                    for (f = 0; f < h; f += 1) m[f] = b(f, o) || "null";
                    g = m.length === 0 ? "[]" : e ? "[\n" + e + m.join(",\n" + e) + "\n" + i + "]" : "[" + m.join(",") + "]";
                    e = i;
                    return g
                }
                if (p && typeof p === "object") {
                    h = p.length;
                    for (f = 0; f < h; f += 1) d = p[f], typeof d === "string" && (g = b(d, o)) && m.push(c(d) + (e ? ": " : ":") + g)
                } else for (d in o) Object.hasOwnProperty.call(o, d) && (g = b(d, o)) && m.push(c(d) + (e ? ": " : ":") + g);
                g = m.length === 0 ? "{}" : e ? "{\n" + e + m.join(",\n" + e) + "\n" + i + "}" : "{" + m.join(",") + "}";
                e = i;
                return g
        }
    }
    var g = {}, k = !1;
    if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + d(this.getUTCMonth() + 1) + "-" + d(this.getUTCDate()) + "T" + d(this.getUTCHours()) + ":" + d(this.getUTCMinutes()) + ":" + d(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    };
    var h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        a = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        e, l, f = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, p;
    g.stringify = function (a, n, c) {
        var f;
        l = e = "";
        if (typeof c === "number") for (f = 0; f < c; f += 1) l += " ";
        else typeof c === "string" && (l = c);
        if ((p = n) && typeof n !== "function" && (typeof n !== "object" || typeof n.length !== "number")) throw Error("JSON.stringify");
        return b("", {
            "": a
        })
    };
    g.parse = function (a, b) {
        function e(a,
        n) {
            var c, f, d = a[n];
            if (d && typeof d === "object") for (c in d) Object.hasOwnProperty.call(d, c) && (f = e(d, c), f !== void 0 ? d[c] = f : delete d[c]);
            return b.call(a, n, d)
        }
        var n, a = String(a);
        h.lastIndex = 0;
        h.test(a) && (a = a.replace(h, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return n = eval("(" + a + ")"),
        typeof b === "function" ? e({
            "": n
        }, "") : n;
        throw new SyntaxError("JSON.parse");
    };
    var m = {
        a: [1, 2, 3]
    }, i, n;
    if (Object.toJSON && Object.toJSON(m).replace(/\s/g, "") === '{"a":[1,2,3]}') i = Object.toJSON;
    typeof String.prototype.evalJSON === "function" && (m = '{"a":[1,2,3]}'.evalJSON(), m.a && m.a.length === 3 && m.a[2] === 3 && (n = function (a) {
        return a.evalJSON()
    }));
    (function () {
        var a = [1, 2, 3];
        typeof a.toJSON === "function" && (a = a.toJSON(), k = !(a && a.length === 3 && a[2] === 3))
    })();
    if (k || !i || !n) return {
        stringify: g.stringify,
        parse: g.parse
    };
    return {
        stringify: i,
        parse: n
    }
});
DISQUS.define(function () {
    function d(b) {
        for (a = 1; b = c.shift();) b()
    }
    var c = [],
        b, g = document,
        k = g.documentElement,
        h = k.doScroll,
        a = /^loade|c/.test(g.readyState),
        e;
    g.addEventListener && g.addEventListener("DOMContentLoaded", b = function () {
        g.removeEventListener("DOMContentLoaded", b, !1);
        d()
    }, !1);
    h && g.attachEvent("onreadystatechange", b = function () {
        /^c/.test(g.readyState) && (g.detachEvent("onreadystatechange", b), d())
    });
    e = h ? function (b) {
        self != top ? a ? b() : c.push(b) : function () {
            try {
                k.doScroll("left")
            } catch (a) {
                return setTimeout(function () {
                    e(b)
                }, 50)
            }
            b()
        }()
    } : function (b) {
        a ? b() : c.push(b)
    };
    return {
        domready: e
    }
});
DISQUS.define("Events", function () {
    var d = /\s+/,
        c = {
            on: function (b, c, k) {
                var h, a;
                if (!c) return this;
                b = b.split(d);
                for (h = this._callbacks || (this._callbacks = {}); a = b.shift();) a = h[a] || (h[a] = []), a.push(c), a.push(k);
                return this
            },
            off: function (b, c, k) {
                var h, a, e;
                if (!(a = this._callbacks)) return this;
                if (!b && !c && !k) return delete this._callbacks, this;
                for (b = b ? b.split(d) : _.keys(a); h = b.shift();) if (!(e = a[h]) || !c && !k) delete a[h];
                else for (h = e.length - 2; h >= 0; h -= 2) c && e[h] !== c || k && e[h + 1] !== k || e.splice(h, 2);
                return this
            },
            trigger: function (b) {
                var c,
                k, h, a, e, l, f;
                if (!(k = this._callbacks)) return this;
                f = [];
                b = b.split(d);
                a = 1;
                for (e = arguments.length; a < e; a++) f[a - 1] = arguments[a];
                for (; c = b.shift();) {
                    if (l = k.all) l = l.slice();
                    if (h = k[c]) h = h.slice();
                    if (h) {
                        a = 0;
                        for (e = h.length; a < e; a += 2) h[a].apply(h[a + 1] || this, f)
                    }
                    if (l) {
                        c = [c].concat(f);
                        a = 0;
                        for (e = l.length; a < e; a += 2) l[a].apply(l[a + 1] || this, c)
                    }
                }
                return this
            }
        };
    c.bind = c.on;
    c.unbind = c.off;
    return c
});
DISQUS.define(function (d) {
    function c() {
        throw Error(Array.prototype.join.call(arguments, " "));
    }
    function b(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, !1);
        else if (a.attachEvent) a.attachEvent("on" + b, c);
        else throw Error("No event support.");
    }
    var g = d.document,
        k = DISQUS.use("JSON"),
        h = {}, a = {}, e = 0;
    if (!(DISQUS.version && DISQUS.version() === "2")) {
        b(d, "message", function (b) {
            var e, f;
            for (f in a) if (Object.prototype.hasOwnProperty.call(a, f) && b.origin == a[f].origin) {
                e = !0;
                break
            }
            if (e) switch (e = k.parse(b.data), (f = a[e.sender]) || c("Message from our server but with invalid sender UID:", e.sender), e.scope) {
                case "host":
                    f.trigger(e.name, e.data);
                    break;
                case "global":
                    DISQUS.trigger(e.name, e.data);
                    break;
                default:
                    c("Message", e.scope, "not supported. Sender:", b.origin)
            }
        }, !1);
        b(d, "hashchange", function () {
            DISQUS.trigger("window.hashchange", {
                hash: d.location.hash
            })
        }, !1);
        b(d, "resize", function () {
            DISQUS.trigger("window.resize")
        }, !1);
        var l = function () {
            DISQUS.trigger("window.scroll")
        };
        (function (a, c, e, f) {
            var d = (new Date).getTime();
            b(a, c, function () {
                var a = (new Date).getTime();
                a - d >= f && (d = a, e())
            })
        })(d, "scroll", l, 250);
        (function (a, c, e, f) {
            var d;
            b(a, c, function (a) {
                d && clearTimeout(d);
                d = setTimeout(function () {
                    e(a)
                }, f)
            })
        })(d, "scroll", l, 300);
        b(g, "click", function () {
            DISQUS.trigger("window.click")
        });
        l = function () {
            this.uid = e++;
            h[this.uid] = this
        };
        DISQUS.extend(l.prototype, DISQUS.Events);
        l.prototype.destroy = function () {
            delete h[this.uid]
        };
        DISQUS.extend(l, {
            listByKey: function () {
                var a = {}, b;
                for (b in h) Object.prototype.hasOwnProperty.call(h, b) && (a[b] = h[b]);
                return a
            },
            list: function () {
                var a = [],
                    b;
                for (b in h) Object.prototype.hasOwnProperty.call(h, b) && a.push(h[b]);
                return a
            },
            get: function (a) {
                if (Object.prototype.hasOwnProperty.call(h, a)) return h[a];
                return null
            }
        });
        var f = function (a) {
            a = a || {};
            this.isReady = !1;
            this.uid = a.uid || e++;
            this.elem = null;
            this.styles = {};
            this.role = a.role || "application"
        };
        f.prototype.load = function () {
            var a = this.elem = g.createElement("iframe");
            a.setAttribute("id", "dsq" + this.uid);
            a.setAttribute("data-disqus-uid", this.uid);
            a.setAttribute("allowTransparency",
                "true");
            a.setAttribute("frameBorder", "0");
            a.setAttribute("role", this.role);
            for (var b in this.styles) this.styles.hasOwnProperty(b) && (a.style[b] = this.styles[b])
        };
        f.prototype.destroy = function () {
            this.elem && this.elem.parentNode.removeChild(this.elem)
        };
        var p = function (b) {
            var c = this;
            f.call(c, b);
            c.listeners = {};
            c.origin = b.origin;
            c.target = b.target;
            c.container = b.container;
            c.styles = {
                width: "100%",
                border: "none",
                overflow: "hidden",
                display: "none"
            };
            a[c.uid] = c;
            c.on("ready", function () {
                c.isReady = !0
            })
        };
        DISQUS.extend(p.prototype,
        DISQUS.Events);
        p.prototype.load = function (a) {
            f.prototype.load.call(this);
            var c = this.elem;
            c.setAttribute("width", "100%");
            c.setAttribute("src", this.target + "#" + this.uid);
            b(c, "load", function () {
                c.style.display = "";
                a && a()
            });
            (g.getElementById(this.container) || g.body).appendChild(c);
            this.elem = c
        };
        p.prototype.sendMessage = function (a, b) {
            var c = function (a, b, c) {
                return function () {
                    c.elem.contentWindow.postMessage(a, b)
                }
            }(k.stringify({
                scope: "client",
                data: {
                    eventName: a,
                    data: b
                }
            }), this.origin, this);
            if (this.isReady) c();
            else this.on("ready",
            c)
        };
        p.prototype.getPosition = function () {
            for (var a = this.elem, b = 0, c = 0; a;) b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent;
            return {
                top: c,
                left: b
            }
        };
        p.prototype.inViewport = function (a) {
            var a = a || this.getPosition(),
                a = a.top,
                b = a + this.elem.offsetHeight,
                c = d.pageYOffset;
            return !(a > c + d.innerHeight || b < c)
        };
        p.prototype.destroy = function () {
            this.off();
            f.prototype.destroy.call(this)
        };
        var m = function (a) {
            f.call(this, a);
            this.contents = a.contents;
            this.container = a.container;
            this.styles = {
                width: "100%",
                border: "none",
                overflow: "hidden"
            };
            a.styles = a.styles || {};
            for (var b in a.styles) a.styles.hasOwnProperty(b) && (this.styles[b] = a.styles[b])
        };
        m.prototype.load = function () {
            f.prototype.load.call(this);
            var a = this.elem;
            a.setAttribute("scrolling", "no");
            (g.getElementById(this.container) || g.body).appendChild(a);
            this.element = a;
            this.window = a.contentWindow;
            try {
                this.window.document.open()
            } catch (b) {
                a.src = "javascript:var d=document.open();d.domain='" + g.domain + "';void(0);"
            }
            this.document = this.window.document;
            this.document.write(this.contents);
            this.document.close();
            if (a = this.document.body) this.element.style.height = a.offsetHeight + "px"
        };
        m.prototype.exec = function (a) {
            a.call(this, this.window, this.document)
        };
        m.prototype.hide = function () {
            var a = this.element.style.display;
            if (a !== "none") this._display = a;
            this.element.style.display = "none"
        };
        m.prototype.show = function () {
            this.element.style.display = this._display || "block"
        };
        m.prototype.click = function (a) {
            b(this.document.body, "click", function (b) {
                a(b)
            })
        };
        m.prototype.destroy = f.prototype.destroy;
        var i = DISQUS.extend({}, DISQUS.Events);
        return {
            IFRAME: "__widget_iframe__",
            log: function (a) {
                var b = g.getElementById("messages");
                if (b) {
                    var c = g.createElement("p");
                    c.innerHTML = a;
                    b.appendChild(c)
                }
            },
            version: function () {
                return "2"
            },
            on: i.on,
            off: i.off,
            trigger: i.trigger,
            Channel: p,
            Sandbox: m,
            App: l
        }
    }
});
DISQUS.define("publisher", function (d) {
    function c(a, b, g) {
        var f, g = g || b;
        if (a === h) return "";
        d.getComputedStyle ? f = h.defaultView.getComputedStyle(a, null).getPropertyValue(b) : a.currentStyle && (f = a.currentStyle[b] ? a.currentStyle[b] : a.currentStyle[g]);
        return f == "transparent" || f === "" || f == "rgba(0, 0, 0, 0)" ? c(a.parentNode, b, g) : f || null
    }
    function b(a) {
        function b(a) {
            a = Number(a).toString(16);
            return a.length == 1 ? "0" + a : a
        }
        if (a.substr(0, 1) === "#") return a;
        var c = /.*?rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(a);
        if (!c || c.length !== 4) return "";
        var a = b(c[1]),
            f = b(c[2]),
            c = b(c[3]);
        return "#" + a + f + c
    }
    function g(a, b, d, f) {
        DISQUS.isString(b) && (b = h.createElement(b));
        var g = null;
        b.style.visibility = "hidden";
        a.appendChild(b);
        g = c(b, d, f);
        a.removeChild(b);
        return g
    }
    function k(a) {
        return a.toLowerCase().replace(/^\s+|\s+$/g, "").replace(/['"]/g, "")
    }
    var h = d.document;
    return {
        getContrastYIQ: function (a) {
            a.match("^rgb") && (a = b(a).substr(1));
            var c = parseInt(a.substr(0, 2), 16),
                d = parseInt(a.substr(2, 2), 16),
                a = parseInt(a.substr(4, 2), 16);
            return (c * 299 + d * 587 + a * 114) / 1E3
        },
        colorToHex: b,
        getElementStyle: g,
        getAnchorColor: function (a) {
            var b = h.createElement("a");
            b.href = +new Date;
            return g(a, b, "color")
        },
        normalizeFontValue: k,
        isSerif: function (a) {
            for (var a = g(a, "span", "font-family", "fontFamily").split(","), b = {
                courier: 1,
                times: 1,
                "times new roman": 1,
                georgia: 1,
                palatino: 1,
                serif: 1
            }, c, f = 0; f < a.length; f++) if (c = k(a[f]), b.hasOwnProperty(c)) return !0;
            return !1
        }
    }
});
DISQUS.define(function () {
    function d(c) {
        DISQUS.App.call(this);
        this.switches = {};
        var b = {
            target: c.useSSL ? "https://securecdn.disqus.com/1353702853/build/next-switches/client_ssl.html" : "http://mediacdn.disqus.com/1353702853/build/next-switches/client.html",
            container: c.container
        };
        b.origin = c.useSSL ? "https://securecdn.disqus.com" : "http://mediacdn.disqus.com";
        this.frame = new DISQUS.Channel(b);
        var d = this;
        this.frame.load(function () {
            d.frame.elem.style.display = "none"
        })
    }
    d.prototype = DISQUS.extend({
        fetch: function (c) {
            var b = this,
                c = c || {}, d = c.success;
            delete c.success;
            this.frame.on("switches.received", function (c) {
                b.switches = c;
                DISQUS.trigger("switches.changed", c);
                d && d(c)
            });
            this.frame.sendMessage("fetch", c)
        },
        enabled: function (c) {
            return this.switches[c] ? this.switches[c] : !1
        }
    }, DISQUS.App.prototype);
    return {
        Switches: function (c) {
            return new d(c)
        }
    }
});
DISQUS.define("backplane", function () {
    var d = function (c) {
        this.frame = c;
        this.credentials = "unset";
        var b = this;
        typeof Backplane === "function" && typeof Backplane.version === "string" && typeof Backplane.subscribe === "function" && Backplane(function () {
            b.initialize()
        })
    };
    DISQUS.extend(d.prototype, {
        frameEvents: {
            invalidate: "clearCredentials"
        },
        initialize: function () {
            var c = this;
            DISQUS.each(this.frameEvents, function (b, d) {
                c.frame.on("backplane." + d, typeof b === "function" ? b : c[b], c)
            });
            this.credentialsFromLocalStorage() && this.frame.sendMessage("login", {
                backplane: this.credentials
            });
            this.subscribe()
        },
        subscribe: function () {
            var c = this;
            Backplane.subscribe(function (b) {
                var d = c.handlers[b.type];
                d && d.call(c, b)
            })
        },
        handlers: {
            "identity/login": function (c) {
                var b = c.messageURL,
                    c = c.channel;
                this.credentials !== "unset" && this.credentials !== null && this.credentials.channel === c && this.credentials.messageUrl === b || (this.setCredentials(c, b), this.frame.sendMessage("login", {
                    backplane: this.getCredentials()
                }))
            }
        },
        credentialsFromLocalStorage: function () {
            var c = localStorage.getItem("disqus.backplane.channel"),
                b = localStorage.getItem("disqus.backplane.messageUrl");
            this.setCredentials(c, b, !0);
            return this.credentials
        },
        setCredentials: function (c, b, d) {
            if (!c || !b) return void this.clearCredentials();
            d || (localStorage.setItem("disqus.backplane.channel", c), localStorage.setItem("disqus.backplane.messageUrl", b));
            this.credentials = {
                channel: c,
                messageUrl: b
            }
        },
        getCredentials: function () {
            if (this.credentials !== "unset") return this.credentials;
            return this.credentialsFromLocalStorage()
        },
        clearCredentials: function () {
            this.credentials = null;
            localStorage.removeItem("disqus.backplane.channel");
            localStorage.removeItem("disqus.backplane.messageUrl")
        }
    });
    return {
        BackplaneIntegration: d
    }
});
DISQUS.define(function (d, c) {
    function b(a, b, c, d, e, h) {
        return '<img width="' + a + '" height="' + b + '" alt="' + d + '" src="data:image/' + c + ";base64," + e + '"' + (h ? ' style="' + h + '"' : "") + "/>"
    }
    function g(a) {
        for (var b = DISQUS.App.list(), c = 0, d = b.length, b = b[c]; c < d; c++) b instanceof e && a(b)
    }
    var k = d.document,
        h = ["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", "TkSuQmCC"],
        a = ["R0lGODlhEAALAPQAAP///z2LqeLt8dvp7u7090GNqz2LqV+fuJ/F1IW2ycrf51aatHWs", "waXJ14i4ys3h6FmctUCMqniuw+vz9eHs8fb5+meku+Tu8vT4+cfd5bbT3tbm7PH2+AAA", "AAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQu", "aW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27if", "DgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeR", "vsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjoth",
            "LOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh", "+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+", "YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY", "5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAs", "AAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00k", "j5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpy", "HCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAA", "BS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7",
            "AAAAAAAAAAAA"],
        e = function (a) {
            DISQUS.App.call(this);
            this.settings = a;
            this.indicators = {
                north: null,
                south: null
            };
            this._boundGlobalEvents = [];
            this.frame = null
        };
    DISQUS.extend(e.prototype, DISQUS.App.prototype);
    e.prototype.init = function () {
        function f(a, b, c) {
            j.on("affiliateLink", function (e) {
                if (!d.vglnk.$) return void j.sendMessage("affiliateLink");
                d.vglnk.$.request(a + "/click", {
                    format: "jsonp",
                    out: e.url,
                    key: b,
                    loc: j.target,
                    subId: c
                }, {
                    fn: function (a) {
                        return function (b) {
                            var c = {
                                token: a
                            };
                            if (b) c.url = b;
                            j.sendMessage("affiliateLink",
                            c)
                        }
                    }(e.token),
                    timeout: d.vglnk.opt("click_timeout")
                })
            })
        }
        function e(a, b) {
            g._boundGlobalEvents.push(a);
            DISQUS.on(a, b, g)
        }
        var g = this,
            i = g.settings,
            l = "http://disqus.com/embed/comments/",
            s = "http://disqus.com";
        i.useSSL && (l = "https://disqus.com/embed/comments/", s = "https://disqus.com");
        var q = {
            f: i.forum,
            t_i: i.identifier,
            t_u: i.url || d.location.href,
            t_s: i.slug,
            t_t: i.title,
            s_o: i.sortOrder,
            c: i.useConman || c
        };
        if (i.notSupported) q.n_s = 1;
        var r = DISQUS.isString(i.container) ? k.getElementById(i.container) : i.container,
            j = g.frame = new DISQUS.Channel({
                origin: s,
                target: DISQUS.serialize(l, q),
                container: i.container,
                uid: this.uid
            });
        if (i.notSupported) j.styles.height = "500px";
        var u = !1,
            t, v;
        if (!i.notSupported) t = k.createElement("div"), t.innerHTML = b(71, 17, "png", "DISQUS", h.join("")) + b(16, 11, "gif", "...", a.join(""), "margin:0 0 3px 5px"), r.appendChild(t);
        l = function () {
            var a = j.getPosition(),
                b = d.pageYOffset,
                c = d.innerHeight,
                e = j.inViewport(a);
            e ? (u = !0, j.sendMessage("window.scroll", {
                frameOffset: a,
                pageOffset: b,
                height: c
            }), j.sendMessage("window.inViewport")) : u && !e && (u = !1, j.sendMessage("window.scrollOffViewport"))
        };
        j.on("ready", function o(a) {
            j.off("ready", o);
            t && t.parentNode === r && r.removeChild(t);
            d.clearTimeout(v);
            var b = {
                themeUrl: i.themeUrl,
                permalink: i.permalink,
                anchorColor: i.anchorColor,
                referrer: d.location.href,
                colorScheme: i.colorScheme,
                language: i.language,
                typeface: i.typeface,
                remoteAuthS3: i.remoteAuthS3,
                apiKey: i.apiKey,
                sso: i.sso,
                parentWindowHash: d.location.hash
            };
            if (d.navigator.userAgent.match(/(iPad|iPhone|iPod)/)) b.width = j.elem.offsetWidth;
            j.inViewport() && j.sendMessage("window.inViewport");
            g.clientData = a;
            j.sendMessage("init", b);
            g.trigger("loading.init")
        });
        j.on("resize", function (a) {
            j.elem.style.height = a.height + "px"
        });
        j.on("reload", function () {
            d.location.reload()
        });
        j.on("reset", function () {
            DISQUS.reset({
                reload: !0
            })
        });
        j.on("posts.paginate", function () {
            g.trigger("posts.paginate")
        });
        j.on("posts.create", function (a) {
            g.trigger("posts.create", {
                id: a.id,
                text: a.raw_message
            })
        });
        j.on("scrollTo", function (a) {
            var b = j.getPosition(),
                b = a.relative === "window" ? a.top : b.top + a.top;
            (a.force || !(b > d.pageYOffset && b < d.pageYOffset + d.innerHeight)) && d.scrollTo(0, b)
        });
        j.on("fakeScroll", l);
        j.on("realtime.init", function (a) {
            for (var b = ["north", "south"], c, d, e = 0; e < b.length; e++) d = b[e], c = new DISQUS.Sandbox({
                uid: "-indicator-" + d,
                container: g.settings.container,
                contents: a[d].contents,
                styles: a[d].styles
            }), c.load(), c.hide(),
            function (a) {
                c.click(function () {
                    j.sendMessage("realtime.click", a)
                })
            }(d), g.indicators[d] = c
        });
        j.on("realtime.showNorth", function (a) {
            var b = g.indicators.north;
            b.document.getElementById("message").innerHTML = a;
            b.show()
        });
        j.on("realtime.hideNorth", function () {
            g.indicators.north.hide()
        });
        j.on("realtime.showSouth", function (a) {
            var b = g.indicators.south;
            b.document.getElementById("message").innerHTML = a;
            b.show()
        });
        j.on("realtime.hideSouth", function () {
            g.indicators.south.hide()
        });
        j.on("mainViewRendered", function () {
            DISQUS.trigger("lounge:mainViewRendered");
            g.trigger("loading.done")
        });
        j.on("loadLinkAffiliator", function (a) {
            j.off("loadLinkAffiliator");
            if (!d.vglnk_self && !d.vglnk && ! function () {
                for (var a in d) if (a.indexOf("skimlinks") === 0 || a.indexOf("skimwords") === 0) return !0;
                return !1
            }()) {
                var b = a.apiUrl,
                    c = a.key,
                    e = String(a.id);
                if (!(a.clientUrl == null || b == null || c == null || a.id == null)) d.vglnk = {
                    api_url: b,
                    key: c,
                    sub_id: e
                }, DISQUS.require(a.clientUrl), DISQUS.defer(function () {
                    return d.vglnk.opt
                }, function () {
                    j.sendMessage("affiliationOptions", {
                        timeout: d.vglnk.opt("click_timeout")
                    })
                }), f(b, c, e)
            }
        });
        j.on("loadBackplane", function () {
            j.off("loadBackplane");
            g.backplane = new DISQUS.backplane.BackplaneIntegration(j)
        });
        v = d.setTimeout(function () {
            t.innerHTML +=
                '<p>DISQUS seems to be taking longer than usual. <a href="#" onclick="DISQUS.reset({reload: true}); return false;">Reload</a>?</p>'
        }, 1E4);
        j.load(function () {
            i.notSupported ? (j.elem.setAttribute("height", "500px"), j.elem.setAttribute("scrolling", "yes"), j.elem.setAttribute("horizontalscrolling", "no"), j.elem.setAttribute("verticalscrolling", "yes")) : (j.elem.setAttribute("scrolling", "no"), j.elem.setAttribute("horizontalscrolling", "no"), j.elem.setAttribute("verticalscrolling", "no"))
        });
        e("window.hashchange",

        function (a) {
            j.sendMessage("window.hashchange", a.hash)
        });
        e("window.resize", function () {
            j.sendMessage("window.resize")
        });
        e("window.scroll", l);
        e("window.click", function () {
            j.sendMessage("window.click")
        });
        e("switches.changed", function (a) {
            j.sendMessage("switches.changed", a)
        });
        g.trigger("loading.start")
    };
    e.prototype.destroy = function () {
        var a = this.indicators;
        this.off();
        if (this._boundGlobalEvents.length) DISQUS.off(this._boundGlobalEvents.join(" "), null, this), this._boundGlobalEvents = null;
        this.frame && this.frame.destroy();
        if (a.north) a.north.destroy(), a.north = null;
        if (a.south) a.south.destroy(), a.south = null;
        DISQUS.App.prototype.destroy.call(this)
    };
    var l = function (a) {
        return new e(a)
    };
    DISQUS.extend(l, {
        listByKey: function () {
            var a = {};
            g(function (b) {
                a[b.uid] = b
            });
            return a
        },
        list: function () {
            var a = [];
            g(function (b) {
                a.push(b)
            });
            return a
        },
        get: function (a) {
            a = DISQUS.App.get(a);
            return a instanceof e && a
        }
    });
    return {
        Lounge: l
    }
});
(function (d, c, b) {
    function g() {
        function a(b) {
            var b = b.getAttribute ? b.getAttribute("src") : b.src,
                c = [/(https?:)\/\/(www\.)?disqus\.com\/forums\/([\w_\-]+)/i, /(https?:)\/\/(www\.)?([\w_\-]+)\.disqus\.com/i, /(https?:)\/\/(www\.)?dev\.disqus\.org\/forums\/([\w_\-]+)/i, /(https?:)\/\/(www\.)?([\w_\-]+)\.dev\.disqus\.org/i],
                d = c.length;
            if (!b || b.substring(b.length - 8) != "embed.js") return null;
            for (var e = 0; e < d; e++) {
                var f = b.match(c[e]);
                if (f && f.length && f.length == 4) return p = f[1] || null, f[3]
            }
            return null
        }
        for (var b = c.getElementsByTagName("script"),
        d = b.length - 1; d >= 0; d--) {
            var e = a(b[d]);
            if (e !== null) return e
        }
        return null
    }
    function k() {
        if (d.location.protocol === "https:") return !0;
        p === b && g();
        return p === "https:"
    }
    function h() {
        for (var a = c.getElementsByTagName("h1"), d = c.title, e = d.length, f = d, g = 0.6, h = 0; h < a.length; h++)(function (a) {
            var a = a.textContent || a.innerText,
                c;
            if (!(a === null || a === b)) {
                c = 0;
                for (var h = Array(d.length), i = 0; i <= d.length; i++) {
                    h[i] = Array(a.length);
                    for (var j = 0; j <= a.length; j++) h[i][j] = 0
                }
                for (i = 0; i < d.length; i++) for (j = 0; j < a.length; j++) d[i] == a[j] && (h[i + 1][j + 1] = h[i][j] + 1, h[i + 1][j + 1] > c && (c = h[i + 1][j + 1]));
                c /= e;
                c > g && (g = c, f = a)
            }
        })(a[h]);
        return f
    }
    function a() {
        c.getElementById(l).innerHTML = "";
        var a = i.page;
        if (!d.postMessage || !d.JSON) r = !0;
        if (d.navigator.appName === "Microsoft Internet Explorer" && (!c.documentMode || c.documentMode < 8)) r = !0;
        a = {
            container: l,
            forum: n,
            sortOrder: "popular",
            permalink: m,
            useSSL: k(),
            language: i.language,
            typeface: e.isSerif(f) ? "serif" : "sans-serif",
            anchorColor: e.getAnchorColor(f),
            colorScheme: 128 < e.getContrastYIQ(e.getElementStyle(f, "span", "color")) ?
                "dark" : "light",
            url: a.url || d.location.href.replace(/#.*$/, ""),
            title: a.title || h(),
            slug: a.slug,
            category: a.category_id,
            identifier: a.identifier,
            apiKey: a.api_key,
            remoteAuthS3: a.remote_auth_s3,
            sso: i.sso,
            themeUrl: d.disqus_theme_root_url,
            useConman: d.disqus_demo,
            notSupported: r
        };
        q = DISQUS.Lounge(a);
        var b = {
            onReady: "loading.done",
            onNewComment: "posts.create",
            onPaginate: "posts.paginate"
        };
        DISQUS.each(i.callbacks, function (a, c) {
            b[c] && DISQUS.each(a, function (a) {
                q.on(b[c], a)
            })
        });
        q.init()
    }
    var e = DISQUS.use("publisher"),
        l = d.disqus_container_id || "disqus_thread",
        f = c.getElementById(l),
        p, m = function () {
            var a = d.location.hash;
            return (a = a && a.match(/comment\-([0-9]+)/)) && a[1]
        }(),
        i = {
            page: {
                url: b,
                title: b,
                slug: b,
                category_id: b,
                identifier: b,
                language: b,
                api_key: b,
                remote_auth_s3: b,
                author_s3: b,
                developer: b
            },
            strings: b,
            sso: {},
            callbacks: {
                preData: [],
                preInit: [],
                onInit: [],
                afterRender: [],
                onReady: [],
                onNewComment: [],
                preReset: [],
                onPaginate: []
            }
        };
    DISQUS.each(["developer", "shortname", "identifier", "url", "title", "category_id", "language", "slug"], function (a) {
        var b = d["disqus_" + a];
        typeof b !== "undefined" && (i.page[a] = b)
    });
    var n = d.disqus_shortname || g(),
        n = n.toLowerCase();
    if (typeof d.disqus_config === "function") try {
        d.disqus_config.call(i)
    } catch (s) {}
    var q, r = !1;
    a();
    if (!r) {
        var j = DISQUS.Switches({
            container: l,
            useSSL: k()
        });
        j.fetch({
            data: {
                forum: n
            }
        });
        DISQUS.domready(function () {
            if (c.getElementsByClassName) {
                var a = c.getElementsByClassName("dsq-brlink");
                a && a.length && a[0].parentNode.removeChild(a[0])
            }
        });
        DISQUS.request = {
            get: function (a, b, c) {
                DISQUS.require(a, b, c)
            }
        };
        DISQUS.reset = function (b) {
            b = b || {};
            if (typeof b.config === "function") try {
                b.config.call(i)
            } catch (c) {}
            q && (q.destroy(), q = null);
            b.reload && (a(), DISQUS.trigger("switches.changed", j.switches))
        }
    }
})(this, this.document);