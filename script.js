document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Developer", "Front-End Designer", "Designer UI/UX"];
    const colorArray = ["color1", "color2", "color3"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            typedTextSpan.classList.add("underline");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            typedTextSpan.classList.remove('underline');
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    function setActiveLink(hash) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function showSection(hash) {
        sections.forEach(section => {
            if ('#' + section.id === hash) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            window.location.hash = hash;
            setActiveLink(hash);
            showSection(hash);
        });
    });

    window.addEventListener('hashchange', function() {
        const hash = window.location.hash || '#home';
        setActiveLink(hash);
        showSection(hash);
    });

    window.addEventListener('scroll', function() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    });

    const initialHash = window.location.hash || '#home';
    setActiveLink(initialHash);
    showSection(initialHash);

    function startTyping() {
        if(textArray.length) {
            typedTextSpan.textContent = "";
            typedTextSpan.classList.remove(colorArray[0], colorArray[1], colorArray[2]);
            typedTextSpan.classList.add(colorArray[textArrayIndex]);
            setTimeout(type, newTextDelay + 250);
        }
    }

    startTyping();

    /* Terminal typing effect */
    const terminalText = "Hola! Soy de Peru, tengo 22 años y soy un apasionado por la programación. Llevo 8 meses estudiando desarrollo frontend y he descubierto que tengo una habilidad natural para aprender rápido y adaptarme a cualquier entorno o situación. Me encanta resolver problemas y crear soluciones innovadoras. Estoy emocionado de seguir creciendo como desarrollador frontend y ver hacia dónde me lleva esta pasión.";
    const typedTextTerminal = document.querySelector('.typed-text-terminal');
    let terminalIndex = 0;

    function typeTerminal() {
        if (terminalIndex < terminalText.length) {
            typedTextTerminal.textContent += terminalText.charAt(terminalIndex);
            terminalIndex++;
            setTimeout(typeTerminal, typingDelay);
        }
    }

    typeTerminal();
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselHeight = 200 + 20; // Altura de la carta + margen inferior
    let position = 0;

    // Función para mover el carrusel hacia arriba
    function moveUp() {
        if (position > 0) {
            position--;
            carousel.style.transform = `translateY(-${position * carouselHeight}px)`;
        }
    }

    // Función para mover el carrusel hacia abajo
    function moveDown() {
        if (position < carousel.children.length - 2) {
            position++;
            carousel.style.transform = `translateY(-${position * carouselHeight}px)`;
        }
    }

    prevBtn.addEventListener('click', moveUp);
    nextBtn.addEventListener('click', moveDown);

    document.querySelector('.carousel-viewport').addEventListener('wheel', function(e) {
        if (e.deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    });
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validación
    if (!name || !email || !subject || !message) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Por favor, ingrese un email válido.');
        return;
    }

    alert('Formulario válido, ¡gracias!');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth',  
            block: 'start'       
        });
    });
});