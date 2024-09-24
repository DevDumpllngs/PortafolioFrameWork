// Espera a que todo el DOM se haya cargado antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', function() {
    
    // ==== Sección: Navegación ====
    // Selección de enlaces de navegación y secciones en la página.
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Función para marcar el enlace activo.
    function setActiveLink(hash) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Función para mostrar la sección correspondiente al hash.
    function showSection(hash) {
        sections.forEach(section => {
            if ('#' + section.id === hash) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Listener para navegación con clic en los enlaces.
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            window.location.hash = hash;
            setActiveLink(hash);
            showSection(hash);
        });
    });

    // Listener para cambios de hash (navegación directa desde la URL).
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash || '#home';
        setActiveLink(hash);
        showSection(hash);
    });

    // Scroll: Resalta el enlace de la sección visible según el desplazamiento.
    window.addEventListener('scroll', function() {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    });

    // Muestra la sección inicial cuando se carga la página.
    const initialHash = window.location.hash || '#home';
    setActiveLink(initialHash);
    showSection(initialHash);

    
    // ==== Sección: Efecto de Escritura en Home ====
    // Variables para el efecto de escritura.
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    const textArray = ["Developer", "Front-End Designer", "Designer UI/UX"];
    const colorArray = ["color1", "color2", "color3"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    // Función para escribir texto letra por letra.
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            typedTextSpan.classList.add("underline");
            setTimeout(erase, newTextDelay);
        }
    }

    // Función para borrar el texto.
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            typedTextSpan.classList.remove('underline');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Inicia el efecto de escritura.
    function startTyping() {
        if (textArray.length) {
            typedTextSpan.textContent = "";
            typedTextSpan.classList.remove(colorArray[0], colorArray[1], colorArray[2]);
            typedTextSpan.classList.add(colorArray[textArrayIndex]);
            setTimeout(type, newTextDelay + 250);
        }
    }

    startTyping();

    
    // ==== Sección: Efecto de Escritura Terminal ====
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

    
    // ==== Sección: Carousel de Hobbies ====
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselHeight = 220; // Altura de la carta + margen inferior.
    let position = 0;

    // Función para mover el carousel hacia arriba.
    function moveUp() {
        if (position > 0) {
            position--;
            carousel.style.transform = `translateY(-${position * carouselHeight}px)`;
        }
    }

    // Función para mover el carousel hacia abajo.
    function moveDown() {
        if (position < carousel.children.length - 2) {
            position++;
            carousel.style.transform = `translateY(-${position * carouselHeight}px)`;
        }
    }

    // Listener para los botones del carousel.
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', moveUp);
        nextBtn.addEventListener('click', moveDown);
    }

    // Desplazamiento del carousel usando la rueda del mouse.
    const carouselViewport = document.querySelector('.carousel-viewport');
    if (carouselViewport) {
        carouselViewport.addEventListener('wheel', function(e) {
            if (e.deltaY > 0) {
                moveDown();
            } else {
                moveUp();
            }
        });
    }

    
    // ==== Sección: Validación del Formulario de Contacto ====
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validación de campos vacíos.
            if (!name || !email || !subject || !message) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            // Validación de formato de email.
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.match(emailPattern)) {
                alert('Por favor, ingrese un email válido.');
                return;
            }

            alert('Formulario válido, ¡gracias!');
        });
    }

    
    // ==== Sección: Modo Noche ====
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleContainer = document.querySelector('.dark-mode-toggle-container');
    const body = document.body;

    // Función para alternar entre modo oscuro y claro.
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');     

        const icon = document.querySelector('.dark-mode-toggle-container .material-icons');
        if (body.classList.contains('dark-mode')) {
            icon.textContent = 'brightness_7'; // Icono de sol para modo claro.
        } else {
            icon.textContent = 'brightness_4'; // Icono de luna para modo oscuro.
        }
    }

    // Listener para el botón de modo oscuro en el sidebar.
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDarkMode();
        });
    }

    // Listener para el ícono fijo de modo oscuro.
    if (darkModeToggleContainer) {
        darkModeToggleContainer.addEventListener('click', function() {
            toggleDarkMode();
        });
    }

    
    // ==== Sección: Animaciones al Hacer Scroll ====
    sections.forEach(section => {
        section.classList.add('scroll-animation');
    });

    function handleScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add('scroll-animation-visible');
            } else {
                section.classList.remove('scroll-animation-visible');
            }
        });
    }

    // Listener para las animaciones de scroll.
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica las secciones que ya están visibles al cargar la página.
});
