/*! eashl-club-search - v0.1.0 - 2013-09-16
* https://github.com/eashl/club-search
* Copyright (c) 2013 Michael Schulze; Licensed MIT license */
!function(a, b, c) {
    "use strict";
    return "object" == typeof exports ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : "function" == typeof a.jQuery ? a.jQuery[c.toLowerCase()] = b() : a[c] = b(), 
    !0;
}("object" == typeof window && window || this, function() {
    "use strict";
    return function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
        if (k = {
            article: {
                role: "article"
            },
            aside: {
                role: "complementary"
            },
            nav: {
                role: "navigation"
            },
            main: {
                role: "main"
            },
            output: {
                "aria-live": "polite"
            },
            section: {
                role: "region"
            },
            "[required]": {
                "aria-required": "true"
            }
        }, c = /aria-[a-z]+|role|tabindex|title|alt|data-[\w\-]+|lang|style|maxlength|placeholder|pattern|type/, 
        e = "acfy-id-", o = 0, d = document, d.querySelectorAll) {
            a && (a.header && (k[a.header] = {
                role: "banner"
            }), a.footer && (k[a.footer] = {
                role: "contentinfo"
            }), a.main && (k[a.main] = {
                role: "main"
            }, k.main = {
                role: ""
            }));
            for (n in b) k[n] = b[n];
            for (j in k) if (k.hasOwnProperty(j)) for (i = d.querySelectorAll(j), p = k[j], 
            l = 0; l < i.length; ) {
                for (m in p) if (p.hasOwnProperty(m)) {
                    if (f = m, q = p[m], !f.match(c)) continue;
                    if (!(typeof q).match(/string|number/)) continue;
                    if (g = f.match(/(describ|label)l?edby/)) {
                        if (h = d.querySelector(q), !h) continue;
                        h.id || (h.id = e + o), q = h.id, f = "aria-" + ("label" === g[1] ? "labelledby" : "describedby"), 
                        o++;
                    }
                    i[l].hasAttribute(f) || i[l].setAttribute(f, q);
                }
                l++;
            }
        }
        return !0;
    };
}, "AccessifyHTML5"), function(a, b, c) {
    "use strict";
    "object" == typeof exports ? module.exports = b() : "function" == typeof define && define.amd ? define([ "jquery" ], b) : "function" == typeof a.jQuery && (a[c] = b(a.jQuery));
}("object" == typeof window && window || this, function(a) {
    "use strict";
    var b, c;
    return c = "object" == typeof window && window || this, b = function() {
        function b(b) {
            e = this, this.o = a.extend(!0, {}, d, b || {});
        }
        var d, e;
        return b.fn = b.prototype, b.fn.init = function() {
            var b;
            return "function" == typeof c.AccessifyHTML5 && c.AccessifyHTML5(), a("html").removeClass("no-js").addClass("js"), 
            b = function() {
                return window.scrollTo(0, 1);
            }, setTimeout(b, 100), this.$searchForm = a("#" + this.o.formId), this.formEvents(), 
            !0;
        }, b.fn.formEvents = function() {
            return this.$searchForm.submit(function() {
                return setTimeout(function() {
                    e.clearInputs();
                }, 100), !0;
            }), !0;
        }, b.fn.clearInputs = function() {
            return e.$searchForm.find(":input").each(function() {
                switch (this.type) {
                  case "password":
                  case "select-multiple":
                  case "select-one":
                  case "text":
                  case "textarea":
                    a(this).val("");
                    break;

                  case "checkbox":
                  case "radio":
                    this.checked = !1;
                }
                return !0;
            }), !0;
        }, d = {
            formId: "searchForm"
        }, b;
    }();
}, "App"), jQuery.noConflict(), function(a, b, c) {
    "use strict";
    a(c).ready(function() {
        if ("function" == typeof b.App) {
            var a = new b.App();
            a.init(), b.app = a;
        }
    });
}(jQuery, window, document);