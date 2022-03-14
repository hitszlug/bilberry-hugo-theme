// dependencies
import "jquery";
import "flexslider";
import "algoliasearch/dist/algoliasearch.jquery";
import "autocomplete.js/dist/autocomplete.jquery";
import "tooltipster";
import "magnific-popup";

import ClipboardJs from "clipboard";
import { highlightAll } from "highlight.js";
import { moment, locale } from "moment";

console.info("🇺🇦 Stand with people of Ukraine!");

// Add ClipboardJs to enable copy button functionality
new ClipboardJs(".copy-button", {
  target: (trigger) => {
    return trigger.previousElementSibling;
  },
}).on("success", (e) => {
  e.clearSelection();
});

$(() =>{
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
    $("nav").slideToggle();
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
    date = $(this).text();
    $(this).text(moment(date).format("LL"));
  });
});

highlightAll();
