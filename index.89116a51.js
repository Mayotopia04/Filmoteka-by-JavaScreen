var e,t,n,r,o,l,d;e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},null==(r=e.parcelRequired7c6)&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r),r.register,r("b7ONl"),o=r("b7ONl"),l=r("lIou3"),d=new class{async render(e){console.log("start home rendering");let t=await (0,o.default).searchMovies(e.text),n="",r=0;t.data.results.forEach(e=>{n+=(0,l.default).render(e),r++}),document.getElementById("content").innerHTML=n}},document.getElementById("search-button").onclick=async function(e){let t=document.getElementById("search-input");await d.render({text:t.value})};
//# sourceMappingURL=index.89116a51.js.map
