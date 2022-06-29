function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
// text animation
const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2")
};

const texts = [
  "Beyoncé",
  "Beyoncé Knowles",
  "Queen Bey",
   "Young B",
  "Mrs. Carter",
  "Yoncé",
];

const morphTime = 2;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
      if (shouldIncrementIndex) {
          textIndex++;
      }

      doMorph();
  } else {
      doCooldown();
  }
}

animate();

// changing background images-main
function changebg() {

  const images = [
    'url("gallery.jpg")',
    'url("gallery1.jpg")',
    'url("gallery2.jpg")',
    'url("gallery4.webp")',
    'url("gallery5.webp")',
    'url("gallery6.jpg")',
    'url("gallery7.jpg")',
    'url("beychellalarge.jpg")',
  ]
  const section = document.querySelector('section')
  const bg = images[Math.floor(Math.random() * images.length)];
  section.style.backgroundImage = bg;
}

setInterval(changebg, 2500)

// animated scroll 
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);


// hori.scroll 
jQuery(document).ready(function ($) {
  $(".open-contact-popup").click(function () {
    $(".contact-popup").addClass("open");
  });

  $(".close-contact-popup").click(function () {
    $(".contact-popup").removeClass("open");
  });
});

gsap.registerPlugin(ScrollTrigger);

function initScrollAnimations() {
  gsap.to(".contact-popup", {
    scrollTrigger: {
      trigger: ".four",
      start: () => `top+=${innerWidth * 3} center`,
      end: () => `top+=${innerWidth * 4} center`,
      toggleClass: { targets: ".contact-popup", className: "open" },
      scrub: true,
      markers: true,
      scroller: ".page-content",
      invalidateOnRefresh: true
    }
  });
}

function init() {
  initScrollAnimations();
}

window.addEventListener("load", function () {
  init();
});
//