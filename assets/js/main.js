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

// AJAX Contact Form Submission
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const statusMsg = document.getElementById('contact-status') || (() => {
      const msg = document.createElement('div');
      msg.id = 'contact-status';
      msg.style.marginTop = '1rem';
      msg.style.fontWeight = '600';
      msg.style.borderRadius = '0.5rem';
      msg.style.padding = '1rem';
      msg.style.textAlign = 'center';
      contactForm.appendChild(msg);
      return msg;
    })();
    statusMsg.textContent = 'Sending...';
    statusMsg.style.background = '#e0e7ff';
    statusMsg.style.color = '#333';
    try {
      const response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        statusMsg.textContent = result.message;
        statusMsg.style.background = '#d1fae5';
        statusMsg.style.color = '#065f46';
        contactForm.reset();
      } else {
        statusMsg.textContent = result.message;
        statusMsg.style.background = '#fee2e2';
        statusMsg.style.color = '#991b1b';
      }
    } catch (err) {
      statusMsg.textContent = 'An error occurred. Please try again later.';
      statusMsg.style.background = '#fee2e2';
      statusMsg.style.color = '#991b1b';
    }
  });
}
