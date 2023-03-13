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

  setTimeout(() => {
    new Splide(".slider-antes-depois", {
      width: "100%",
      fixedHeight: "20rem",
      gap: "1em",
      rewind: true,
      perPage: 2,
      breakpoints: {
        450: {
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
  }, 300)

  // form
  const form = document.getElementById("regForm")
  const modal = document.querySelector(".modal--main-form")
  const exitModal = document.querySelector(".modal--exit-form")
  const catalogModal = document.querySelector(".modal--catalog")

  const nameForm = document.querySelector("#nameForm")
  nameForm.addEventListener("input", (e) => validateName(e.target))

  const cellphoneForm = document.querySelector("#cellphoneForm")
  cellphoneForm.addEventListener("input", (e) => validateNumber(e.target))

  const emailForm = document.querySelector("#emailForm")
  emailForm.addEventListener("input", (e) => validateEmail(e.target))

  // Get the button that opens the modal
  const ctas = document.querySelectorAll(".btn")

  // add click listeners to button to open the modal
  for (let i = 0; i < ctas.length; i++) {
    ctas[i].addEventListener("click", () => openModal(modal), true)
  }

  // (F) OPENMODAL
  function openModal(modal) {
    if (checkCookie("cHasFormBeenShown")) {
      // do something

      catalogModal.classList.remove("is-hidden")
    } else {
      if (modal.style.display == "none") {
        modal.style.display = "flex"
      } else {
        modal.classList.remove("is-hidden")
        modal.style.animation = "fade-in 1s both"
      }
    }
  }

  // Get the button element that closes the modal
  const btnCloseForm = document.querySelector(".btn--close")

  btnCloseForm.onclick = function () {
    modal.classList.add("is-hidden")
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      // delays the addition of the class for 1s to play the animation
      setTimeout(() => {
        modal.classList.add("is-hidden")
      }, 1000)
      modal.style.animation = "fade-out 1s both"
    }
  }

  form.addEventListener(
    "submit",
    function (e) {
      // this refers to the form itself
      // const formData = new FormData(form)
      console.log("submit triggered")
      if (validateForm()) {
        // set a cookie for 7 days to prevent the form from showing
        setCookie("cHasFormBeenShown", true, 7)

        modal.classList.add("is-hidden")
        document.querySelector(".modal__image-wrapper").classList.add("is-hidden")

        return true
      } else {
        e.preventDefault()
        return false
        // cellphoneForm.setCustomValidity("Porfavor, use um número válido")
      }

      window.onclick = function (event) {
        if (event.target == document.querySelector(".swal2-container")) {
          location.reload()
        }
      }
      /* Reload the window independent of where the user click
       To prevent bugs or undesirable behavior*/
      // window.onclick = function () {
      //   location.reload()
      // }
    },
    true
  )

  // prevent the key "Enter" from submitting the form
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        e.keyIdentifier == "U+000A" ||
        e.keyIdentifier == "Enter" ||
        e.keyCode == 13
      ) {
        if (e.target.nodeName == "INPUT" && e.target.type !== "textarea") {
          e.preventDefault()
          return false
        }
      }
    },
    true
  )

  // (F) VALIDATEFORM
  let isNumberValidated = false
  let isNameValidated = false
  let isEmailValidated = false

  function validateName(element) {
    // if the element is not empty, validate
    if (element.value.length > 0) {
      element.style.borderBottom = "0.25rem solid green"

      // remove the alert to not confuse the user
      alertForm.classList.add("is-hidden")

      isNameValidated = true
      return true
    } else {
      element.style.borderBottom = "0.0625rem solid #aaaaaa"

      isNameValidated = false
      return false
    }
  }

  // VALIDATE NUMBER
  const cellphoneRegex =
    /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/

  function validateNumber(element) {
    // if the number passes on the regExp, validate
    if (cellphoneRegex.test(element.value)) {
      element.style.borderBottom = "0.25rem solid green"

      // remove the alert to not confuse the user
      alertForm.classList.add("is-hidden")

      isNumberValidated = true
      return true
    } else {
      // if the element is empty, remove the border
      if (element.value.length === 0) {
        element.style.borderBottom = "0.0625rem solid #aaaaaa"
      } else {
        // else add a red border
        element.style.borderBottom = "0.25rem solid red"
      }

      isNumberValidated = false
      return false
    }
  }

  function mascara(telefone) {
    if (telefone.value.length == 0) telefone.value = "(" + telefone.value

    if (telefone.value.length == 3) telefone.value = telefone.value + ") " //quando o campo já tiver 3 caracteres (um parênteses e 2 números) o script irá inserir mais um parênteses, fechando assim o código de área.

    if (telefone.value.length == 10) telefone.value = telefone.value + "-" //quando o campo já tiver 10 caracteres, o script irá inserir um tracinho, para melhor visualização do telefone.
  }

  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  // VALIDATE EMAIL
  function validateEmail(element) {
    // if the number passes on the regExp, validate
    if (emailRegex.test(element.value)) {
      element.style.borderBottom = "0.25rem solid green"

      // remove the alert to not confuse the user
      alertForm.classList.add("is-hidden")

      isEmailValidated = true
      return true
    } else {
      // if the element is empty, remove the border
      if (element.value.length === 0) {
        element.style.borderBottom = "0.0625rem solid #aaaaaa"
      } else {
        // else add a red border
        element.style.borderBottom = "0.25rem solid red"
      }

      isEmailValidated = false
      return false
    }
  }

  // VALIDATE FORM
  function validateForm(e) {
    console.log(isNumberValidated, isNameValidated, isEmailValidated)

    if (isNumberValidated && isNameValidated && isEmailValidated) {
      console.log(e)
      return true
    } else {
      console.log("--")
      alertForm.classList.remove("is-hidden")
      return false
    }
  }

  // (F) CAPITALIZE
  function capitalize(word) {
    let arr = word.split(" ")
    let i = 0
    for (i; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }

    return arr.join(" ")
  }

  // (F) FIRST-WORD
  function firstWord(word) {
    let arr = word.split(" ")

    return arr[0]
  }

  //  (F) ONE-WAY BIND
  function oneWayBind(source, target) {
    // Expects two HTML Elements
    target.value = source.value

    validateEmail(emailForm)
  }

  // (F) SET COOKIE
  function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  }

  // (F) CHECK COOKIE
  function checkCookie(cname) {
    if (typeof cname === "null") {
      return false
    }

    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == " ") {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return true
        // return c.substring(name.length, c.length)
      }
    }

    return false
    // return ""
  }
}
if (document.readyState !== "loading") {
  runOnStart()
} else {
  document.addEventListener("DOMContentLoaded", function () {
    runOnStart()
  })
}
