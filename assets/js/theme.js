// dependencies
import "jquery";
import "flexslider";
import "algoliasearch/dist/algoliasearch.jquery";
import "autocomplete.js/dist/autocomplete.jquery";
import "tooltipster";
import "magnific-popup";

import ClipboardJs from "clipboard";
import { highlightAll } from "highlight.js";
import moment, {locale } from "moment";

console.info("🇨🇳 让您的爱心帮助更多有需要的中国人！\n了解更多: https://onefoundation.cn/donate/project-relief");
console.info("🇺🇦 Stand with people of Ukraine!\nLearn more (Chinese): https://www.icrc.org/zh/where-we-work/europe-central-asia/ukraine");
console.info("🇺🇬 Help children in Uganda!\nLearn more: https://iccf-holland.org/donate.html");

// Add ClipboardJs to enable copy button functionality
new ClipboardJs(".copy-button", {
  target: (trigger) => {
    return trigger.previousElementSibling;
  },
}).on("success", (e) => {
  e.clearSelection();
});

$(() => {
  $.easing.jswing = $.easing.swing;

  $.extend($.easing,
  {
      def: 'easeOutQuad',
      swing: function (x, t, b, c, d) {
          //alert($.easing.default);
          return $.easing[$.easing.def](x, t, b, c, d);
      },
      easeInQuad: function (x, t, b, c, d) {
          return c*(t/=d)*t + b;
      },
      easeOutQuad: function (x, t, b, c, d) {
          return -c *(t/=d)*(t-2) + b;
      },
      easeInOutQuad: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t + b;
          return -c/2 * ((--t)*(t-2) - 1) + b;
      },
      easeInCubic: function (x, t, b, c, d) {
          return c*(t/=d)*t*t + b;
      },
      easeOutCubic: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t + 1) + b;
      },
      easeInOutCubic: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t + b;
          return c/2*((t-=2)*t*t + 2) + b;
      },
      easeInQuart: function (x, t, b, c, d) {
          return c*(t/=d)*t*t*t + b;
      },
      easeOutQuart: function (x, t, b, c, d) {
          return -c * ((t=t/d-1)*t*t*t - 1) + b;
      },
      easeInOutQuart: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
          return -c/2 * ((t-=2)*t*t*t - 2) + b;
      },
      easeInQuint: function (x, t, b, c, d) {
          return c*(t/=d)*t*t*t*t + b;
      },
      easeOutQuint: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t*t*t + 1) + b;
      },
      easeInOutQuint: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
          return c/2*((t-=2)*t*t*t*t + 2) + b;
      },
      easeInSine: function (x, t, b, c, d) {
          return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
      },
      easeOutSine: function (x, t, b, c, d) {
          return c * Math.sin(t/d * (Math.PI/2)) + b;
      },
      easeInOutSine: function (x, t, b, c, d) {
          return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
      },
      easeInExpo: function (x, t, b, c, d) {
          return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
      },
      easeOutExpo: function (x, t, b, c, d) {
          return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
      },
      easeInOutExpo: function (x, t, b, c, d) {
          if (t==0) return b;
          if (t==d) return b+c;
          if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
          return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
      },
      easeInCirc: function (x, t, b, c, d) {
          return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
      },
      easeOutCirc: function (x, t, b, c, d) {
          return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
      },
      easeInOutCirc: function (x, t, b, c, d) {
          if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
          return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
      },
      easeInElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      },
      easeOutElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
      },
      easeInOutElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
          if (a < Math.abs(c)) { a=c; var s=p/4; }
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
          return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
      },
      easeInBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          return c*(t/=d)*t*((s+1)*t - s) + b;
      },
      easeOutBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
      },
      easeInOutBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
          return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
      },
      easeInBounce: function (x, t, b, c, d) {
          return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
      },
      easeOutBounce: function (x, t, b, c, d) {
          if ((t/=d) < (1/2.75)) {
              return c*(7.5625*t*t) + b;
          } else if (t < (2/2.75)) {
              return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
          } else if (t < (2.5/2.75)) {
              return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
          } else {
              return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
          }
      },
      easeInOutBounce: function (x, t, b, c, d) {
          if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
          return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
      }
  });
  
  // Add copy button and tooltip to each code-block
  $("pre").each(() => {
    $(this).append(
      '<button class="copy-button tooltip" title="复制成功！"><i class="far fa-fw fa-copy"></i></button>'
    );
  });

  $(".tooltip").tooltipster({
    animationDuration: 1,
    theme: "tooltipster-light",
    side: "bottom",
    delay: [200, 0],
    distance: 0,
    trigger: "custom",
    triggerOpen: {
      click: true,
      tap: true,
    },
    triggerClose: {
      click: true,
      tap: true,
      mouseleave: true,
    },
  });

  // Nav-Toggle
  $(".toggler").on("click", () => {
    $("nav").slideToggle({easing: "easeInOutQuad"});
    $("#search").autocomplete("val", "");
  });

  // // Commento support to block search focus when hitting the S key
  // blockSearchFocusCommento = false;

  // $("#commento").focusin(() => {
  //   blockSearchFocusCommento = true;
  // });

  // $("#commento").focusout(() => {
  //   blockSearchFocusCommento = false;
  // });

  // // Utterances support to block search focus when hitting the S key
  // blockSearchFocusUtterances = false;

  // $("#utterances").focusin(() => {
  //   blockSearchFocusUtterances = true;
  // });

  // $("#utterances").focusout(() => {
  //   blockSearchFocusUtterances = false;
  // });

  // // Giscus support to block search focus when hitting the S key
  // blockSearchFocusGiscus = false;

  // $("#giscus").focusin(() => {
  //   blockSearchFocusGiscus = true;
  // });

  // $("#giscus").focusout(() => {
  //   blockSearchFocusGiscus = false;
  // });

  // Keyboard-Support (Deprecated)
  // $(document).keyup((e) => {
  //   if (e.keyCode === 27) => {
  //     if (!$("nav").hasClass("permanentTopNav")) $("nav").slideUp();
  //     $("#search").autocomplete("val", "");
  //   } else if (
  //     (e.keyCode === 83 && !blockSearchFocusCommento) ||
  //     !blockSearchFocusUtterances ||
  //     !blockSearchFocusGiscus
  //   ) => {
  //     if (!$("nav").hasClass("permanentTopNav")) $("nav").slideDown();
  //     $("#search").focus();
  //   }
  // });

  // Flexslider
  $(".flexslider").flexslider({
    animation: "slide",
    prevText: "",
    nextText: "",
    pauseOnHover: true,
    easing: "easeInOutQuad",
  });

  // Magnific Popup for images within articles to zoom them
  // Rendered with Markdown
  $("p img").magnificPopup({
    type: "image",
    image: {
      verticalFit: true,
      titleSrc: "alt",
    },
    zoom: {
      enabled: true,
    },
    callbacks: {
      // Get the src directly from the img-tag instead of an additional tag
      elementParse: (item) => {
        // will fire for each target element
        // "item.el" is a target DOM element (if present)
        // "item.src" is a source that you may modify

        item.src = item.el.attr("src");
      },
    },
    // https://github.com/dimsemenov/Magnific-Popup/pull/1017
    // Enabled popup only when image size is greater than content area
    disableOn: (e) => {
      let img = e.target;
      return img.naturalWidth > img.clientWidth;
    },
  });

  // Magnific Popup for images within articles to zoom them
  // Rendered with Asciidoc
  $(".image-block>img").magnificPopup({
    type: "image",
    image: {
      verticalFit: true,
      titleSrc: (item) => {
        return item.el.parent().find("figcaption").text();
      },
    },
    zoom: {
      enabled: true,
    },
    callbacks: {
      elementParse: (item) => {
        item.src = item.el.attr("src");
      },
    },
    // https://github.com/dimsemenov/Magnific-Popup/pull/1017
    // Enabled popup only when image size is greater than content area
    disableOn: (e) => {
      let img = e.target;
      return img.naturalWidth > img.clientWidth;
    },
  });

  // Magnific Popup for images within articles to zoom them
  // Rendered with Asciidoc
  $(".image-block").magnificPopup({
    type: "image",
    delegate: "a",
    image: {
      titleSrc: (item) => {
        return item.el.parent().find("figcaption").text();
      },
      verticalFit: true,
    },
    zoom: {
      enabled: true,
    },
  });

  // Algolia-Search
  if ($("#activate-algolia-search").length) {
    let client = algoliasearch(
      $("#algolia-search-appId").val(),
      $("#algolia-search-apiKey").val()
    );
    let index = client.initIndex($("#algolia-search-indexName").val());

    let autocompleteSource = $.fn.autocomplete.sources.hits(index, {
      hitsPerPage: 10,
    });
    if ($("#algolia-search-currentLanguageOnly").length) {
      autocompleteSource = $.fn.autocomplete.sources.hits(index, {
        hitsPerPage: 5,
        filters: "language: " + $("html").attr("lang"),
      });
    }

    $("#search")
      .autocomplete({ hint: false, autoselect: true, debug: false }, [
        {
          source: autocompleteSource,
          displayKey: (suggestion) => {
            return suggestion.title || suggestion.author;
          },
          templates: {
            suggestion: (suggestion) => {
              return (
                "<span class='entry " +
                suggestion.type +
                "'>" +
                "<span class='title'>" +
                suggestion.title +
                "</span>" +
                "<span class='fas fa-fw " +
                suggestion.iconClass +
                "'></span>" +
                "</span>"
              );
            },
            empty: () => {
              return (
                "<span class='empty'>" +
                $("#algolia-search-noSearchResults").val() +
                "</span>"
              );
            },
            footer: () => {
              return (
                '<div class="branding">Powered by <img src="' +
                $("meta[name=siteBaseUrl]").attr("content") +
                '/algolia-logo-light.svg" alt="algolia" /></div>'
              );
            },
          },
        },
      ])
      .on("autocomplete:selected", (event, suggestion, dataset) => {
        window.location = suggestion.url;
      })
      .keypress((event, suggestion) => {
        if (event.which == 13) {
          window.location = suggestion.url;
        }
      });
  }

  // MomentJS
  let language = $("html").attr("lang");
  locale(language);
  $(".moment").each(() => {
    let date = $(this).text();
    $(this).text(moment(date).format("LL"));
  });
});

highlightAll();
