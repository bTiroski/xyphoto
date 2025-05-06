// GSAP Scroll Animation for HERO, ABOUT section
gsap.registerPlugin(ScrollTrigger);

gsap.from("#about-title", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#about-text", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 0.5,
  delay: 0.1,
  ease: "power3.out"
});

gsap.from("#about-button", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
  },
  scale: 0.8,
  opacity: 0,
  duration: 0.8,
  delay: 0.6,
  ease: "back.out(1)"
});



// GSAP Icon's Animation

gsap.from("#icon-contact", {
    scrollTrigger: {
      trigger: "#icon-contact",
      start: "top 90%",
    },
    scale: 0,
    rotation: 180,
    duration: 1,
    ease: "back.out(1.7)"
  });
  
  gsap.from("#icon-camera", {
    scrollTrigger: {
      trigger: "#icon-camera",
      start: "top 90%",
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
  
  gsap.from("#icon-delivery", {
    scrollTrigger: {
      trigger: "#icon-delivery",
      start: "top 90%",
    },
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "bounce.out"

  });

  gsap.from("#bookIcon", {
    rotateY: 25,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: "power1.inOut"
  });

// GSAP Animation for Phone Icon
gsap.to("#phone-reserve", {
    scale: 1.2,
    repeat: -1,
    yoyo: true,
    duration: 0.6,
    ease: "ease.inOut",
  });
  

  
  gsap.to("#button-text-reserve", {
    scale: 1.2,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: "ease.inOut",
  });