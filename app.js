TweenMax.from(".logo h2", 2, {
     opacity: 0,
     // y:-20,
     ease:Power2.easeInOut


})
TweenMax.to(".logo h2", 2, {
     opacity: 1,
     y:0,
     ease:Power2.easeInOut


})

TweenMax.staggerFrom(".menu ul li", 2, {
     
     opacity: 0,
     // y:-20,
     ease:Power2.easeInOut

}, 0.20)
TweenMax.staggerFrom(".texts h3", 2, {
     delay: 1,
     scale:0,
     
     opacity: 0,
     // y:-20,
     ease:Power2.easeInOut

}, 0.20)
TweenMax.staggerFrom(".texts p", 2, {
     delay: 2,
     scale:0,
     
     opacity: 0,
     // y:-20,
     ease:Power2.easeInOut

})

TweenMax.from("#anim", 2, {
     delay:3,
     x:-300,
     opacity: 0,
     // y:-20,
     ease:Power2.easeInOut


})
TweenMax.to("#anim", 2, {
     delay:3,
     x:0,
     opacity: 1,
     
     ease:Power2.easeInOut


})


let tl = gsap.timeline({
     scrollTrigger:{
          trigger: ".about",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl.from(".bigtext h2", { x:-50, duration: 1, opacity: 0})
tl.from(".bigtext p", { x:50, duration: 1, opacity: 0}, "-=1")
tl.from("#anim2", { x:50, duration: 1, opacity: 0}, "-=1")




let tl1 = gsap.timeline({
     scrollTrigger:{
          trigger: ".work",
          ease:Power2.easeInOut,
          start: "top center"


     }
})


tl1.from(".work h2" , { x: -20, duration: 1, opacity:0 })


let tl2 = gsap.timeline({
     scrollTrigger:{
          trigger: ".card-1",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl2.from(".card-1" , { x: -20, duration: 1, opacity:0 })

let tl3 = gsap.timeline({
     scrollTrigger:{
          trigger: ".card-2",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl3.from(".card-2" , { x: 20, duration: 1, opacity:0 })

let tl4 = gsap.timeline({
     scrollTrigger:{
          trigger: ".card-3",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl4.from(".card-3" , { x: -20, duration: 1, opacity:0 })
let tl5 = gsap.timeline({
     scrollTrigger:{
          trigger: ".card-4",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl5.from(".card-4" , { x: 20, duration: 1, opacity:0 })



let tl6 = gsap.timeline({
     scrollTrigger:{
          trigger: ".card-5",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl6.from(".card-5" , { x: -20, duration: 1, opacity:0 })

let tl7 = gsap.timeline({
     scrollTrigger:{
          trigger: ".card-6",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl7.from(".card-6" , { x: -20, duration: 1, opacity:0 })
tl7.from("#anim3" , { x: 20, duration: 1, opacity:0 }, "-=1")


let tl8 = gsap.timeline({
     scrollTrigger:{
          trigger: ".center-w",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl8.from(".center-w h1", { x:-50, duration: 1, opacity: 0})
tl8.from(".center-w p", { x:50, duration: 1, opacity: 0}, "-=1")


let tl9 = gsap.timeline({
     scrollTrigger:{
          trigger: ".wrap",
          ease:Power2.easeInOut,
          start: "top center"


     }
})

tl9.from(".sign h2", {x:-50, duration:1, opacity:0})
tl9.from("form", {x:50, duration:1, opacity:0, stagger: 0.50}, "-=1")


let tl10 = gsap.timeline({
     scrollTrigger:{
          trigger: "footer",
          ease:Power2.easeInOut,
          start: "top bottom"


     }
})

tl10.from(".socialicons", { scale:0, opacity: 0, duration:1})
tl10.from(".comeagain", { scale:0, opacity: 0, duration:1}, "-=1")
