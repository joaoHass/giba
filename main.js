function runOnStart() {
  //progressBar
  let processScroll = () => {
    let docElem = document.documentElement,
      docBody = document.body,
      scrollTop = docElem["scrollTop"] || docBody["scrollTop"],
      scrollBottom =
        (docElem["scrollHeight"] || docBody["scrollHeight"]) - window.innerHeight,
      scrollPercent = (scrollTop / scrollBottom) * 100 + "%"

    document
      .getElementById("progress-bar")
      .style.setProperty("--scrollAmount", scrollPercent)
  }

  document.addEventListener("scroll", processScroll)

  new Splide(".slider-antes-depois", {
    width: "100%",
    fixedHeight: "20rem",
    gap: "1em",
    rewind: true,
    perPage: 1,
    breakpoints: {
      450: {
        fixedHeight: "16rem",
        perPage: 1,
      },
    },
    intersection: {
      inView: {
        autoplay: true,
      },
      outView: {
        autoplay: false,
      },
    },
  }).mount(window.splide.Extensions)

  new Splide(".slider-planos", {
    width: "100%",
    gap: "1em",
    rewind: true,
    perPage: 1,
    intersection: {
      inView: {
        autoplay: true,
      },
      outView: {
        autoplay: false,
      },
    },
  }).mount(window.splide.Extensions)
}
if (document.readyState !== "loading") {
  runOnStart()
} else {
  document.addEventListener("DOMContentLoaded", function () {
    runOnStart()
  })
}
