!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body"),o=null,r=function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));n.style.backgroundColor=t};t.addEventListener("click",(function(){o=setInterval((function(){r(),t.setAttribute("disabled","")}),1e3)})),e.addEventListener("click",(function(){clearInterval(o),t.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.14a1cc82.js.map