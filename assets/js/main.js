/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
// Enhanced tap effects for all buttons
document.querySelectorAll('.button').forEach(button => {
    // Add ripple effect on click
    button.addEventListener('click', function(e) {
      // Remove any existing ripples
      const oldRipple = this.querySelector('.ripple');
      if (oldRipple) oldRipple.remove();
      
      // Create new ripple
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      // Position ripple
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
// Dynamic background color change on tap/click
document.addEventListener('click', function(e) {
    const colors = ['#f5f7fa', '#e4e8f0', '#d8e1ed', '#c9d6e8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.style.background = `linear-gradient(-45deg, ${randomColor}, 
      ${colors[colors.indexOf(randomColor)+1] || colors[0]}, 
      ${colors[colors.indexOf(randomColor)+2] || colors[1]})`;
  });
  // Using Three.js to create a 3D cylinder
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Create a cylinder geometry
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, skillPercentage * 5, 32); // Height corresponds to skill level
const cylinderMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load('html5-badge.png'), // Outer texture
  transparent: true,
  opacity: 0.8,
});

const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder);

// Inner glow effect
const innerGlowMaterial = new THREE.MeshBasicMaterial({
  color: getSkillLevelColor(skillPercentage), // Color-coded gradient
  emissive: 0xffffff,
  emissiveIntensity: 1,
});
const innerGlow = new THREE.Mesh(cylinderGeometry, innerGlowMaterial);
innerGlow.position.z = -0.5; // Offset slightly behind the outer cylinder
scene.add(innerGlow);

// Animation on hover/click
cylinder.rotation.y = 0;
function animate() {
  requestAnimationFrame(animate);
  cylinder.rotation.y += 0.01; // Rotate the cylinder
  renderer.render(scene, camera);
}
animate();
// GSAP animation for the Python snake
const snakePath = document.querySelector('.snake-path');
const tongue = document.querySelector('.tongue');

gsap.to(snakePath, {
  duration: 2,
  ease: 'powerInOut',
  attr: { d: 'M0,0 L100,0' }, // Uncoil the snake
});

tongue.addEventListener('click', () => {
  gsap.to(tongue, {
    duration: 0.2,
    y: 5, // Flick the tongue
    repeat: 1,
    yoyo: true,
  });
});
// GSAP ScrollTrigger for animated counters
gsap.fromTo(
    '.skill-percentage',
    { textContent: '0' },
    {
      textContent: skillPercentage,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      onUpdate: (self) => {
        const value = Math.round(self.target.textContent);
        self.target.textContent = value;
      },
    }
  );
  
  // Sound effect on completion
  const pingSound = new Audio('ping.mp3');
  pingSound.volume = 0.2;
  
  gsap.to('.skill-percentage', {
    duration: 1,
    onComplete: () => {
      pingSound.play();
    },
  });
  // Toggle card flip on click
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', () => {
      const projectCards = skill.nextElementSibling.querySelectorAll('.project-card');
      projectCards.forEach(card => card.classList.toggle('flip'));
    });
  });

  
 // Music Button Functionality
//  document.addEventListener("DOMContentLoaded", function () {
//   const musicButton = document.getElementById('musicButton');
//   const playPauseIcon = document.getElementById('playPauseIcon');
//   const audio = document.getElementById('backgroundMusic');

//   let isPlaying = false;

//   musicButton.addEventListener('click', () => {
//       console.log("Music button clicked");

//       if (audio.paused) {
//           console.log("Attempting to play audio...");
//           audio.play().then(() => {
//               isPlaying = true;
//               console.log("Audio is playing");
//               playPauseIcon.classList.replace('bx-play', 'bx-pause');
//           }).catch(error => {
//               console.error("Playback error:", error);
//           });
//       } else {
//           console.log("Pausing audio...");
//           audio.pause();
//           isPlaying = false;
//           console.log("Audio is paused");
//           playPauseIcon.classList.replace('bx-pause', 'bx-play');
//       }
//   });
// });
  // musicButton.addEventListener('click', () => {
  //   if (isPlaying) {
  //       audio.pause();
  //       // playPauseIcon.classList.remove('bx-pause');     
  //       // playPauseIcon.classList.add('bx-play');
  //       // musicButton.classList.remove('active');
  //   } else {
  //     audio.play().then(() => {
  //       isPlaying = true;})
  //       // audio.play().catch((error) => {
  //       //     console.error('Error playing audio:', error);
  //       // });
  //       // playPauseIcon.classList.remove('bx-play');
  //       // playPauseIcon.classList.add('bx-pause');
  //       // musicButton.classList.add('active');
  //   }
  //   isPlaying = !isPlaying;

    // Add Tap Animation
    // musicButton.classList.add('tap-animation');
    // setTimeout(() => {
    //     musicButton.classList.remove('tap-animation');
    // }, 300);