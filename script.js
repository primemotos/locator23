/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuButton.classList.toggle("active");
    });

}


/* =========================================================
   FECHAR MENU AO CLICAR EM UM LINK
========================================================= */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        if (menuButton) {
            menuButton.classList.remove("active");
        }

    });

});


/* =========================================================
   HEADER AO ROLAR A PÁGINA
========================================================= */

const header = document.getElementById("header");

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================================================
   FAQ
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");


        /* Fecha os outros */

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            }

        });


        /* Abre o selecionado */

        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            item.classList.remove("active");

            answer.style.maxHeight = null;

        }

    });

});


/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

const backToTop = document.getElementById("backToTop");

function handleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

}

window.addEventListener("scroll", handleBackToTop);

handleBackToTop();


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   ANIMAÇÕES AO ENTRAR NA TELA
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-header, " +
    ".intro-content, " +
    ".intro-image, " +
    ".about-text, " +
    ".about-image, " +
    ".service-card, " +
    ".love-content, " +
    ".love-image, " +
    ".gallery-item, " +
    ".testimonial-card, " +
    ".faq-item, " +
    ".contact-content, " +
    ".contact-image"
);


revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   ANIMAÇÃO DOS NÚMEROS
========================================================= */

const numberElements = document.querySelectorAll(
    ".number-item strong[data-number]"
);


function animateNumber(element) {

    const target = Number(
        element.getAttribute("data-number")
    );

    const duration = 1800;

    const startTime = performance.now();


    function updateNumber(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        const easeOut =
            1 - Math.pow(1 - progress, 3);

        const currentValue =
            Math.floor(target * easeOut);


        if (target >= 1000) {

            element.textContent =
                currentValue.toLocaleString("pt-BR") + "+";

        } else {

            element.textContent =
                currentValue + "+";

        }


        if (progress < 1) {

            requestAnimationFrame(updateNumber);

        } else {

            if (target >= 1000) {

                element.textContent =
                    target.toLocaleString("pt-BR") + "+";

            } else {

                element.textContent =
                    target + "+";

            }

        }

    }


    requestAnimationFrame(updateNumber);

}


/* =========================================================
   OBSERVADOR DOS NÚMEROS
========================================================= */

const numbersSection =
    document.querySelector(".numbers");


if (numbersSection && numberElements.length) {

    let numbersAnimated = false;


    const numbersObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !numbersAnimated
                    ) {

                        numbersAnimated = true;

                        numberElements.forEach(
                            element => {
                                animateNumber(element);
                            }
                        );

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    numbersObserver.observe(numbersSection);

}


/* =========================================================
   GALERIA
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.querySelector("img");

        if (!image) return;


        /* Cria o modal */

        const modal =
            document.createElement("div");

        modal.className =
            "gallery-modal";


        modal.innerHTML = `
            <div class="gallery-modal-content">

                <button
                    class="gallery-modal-close"
                    aria-label="Fechar imagem">
                    ×
                </button>

                <img
                    src="${image.src}"
                    alt="${image.alt}">

            </div>
        `;


        document.body.appendChild(modal);


        /* Bloqueia o scroll */

        document.body.style.overflow = "hidden";


        /* Botão fechar */

        const closeButton =
            modal.querySelector(
                ".gallery-modal-close"
            );


        function closeModal() {

            modal.remove();

            document.body.style.overflow = "";

        }


        closeButton.addEventListener(
            "click",
            closeModal
        );


        /* Clicar fora da imagem fecha */

        modal.addEventListener(
            "click",
            event => {

                if (event.target === modal) {
                    closeModal();
                }

            }
        );


        /* ESC fecha */

        const escapeHandler =
            event => {

                if (event.key === "Escape") {

                    closeModal();

                    document.removeEventListener(
                        "keydown",
                        escapeHandler
                    );

                }

            };


        document.addEventListener(
            "keydown",
            escapeHandler
        );

    });

});


/* =========================================================
   WHATSAPP
========================================================= */

const whatsappLinks =
    document.querySelectorAll(
        'a[href*="wa.me"]'
    );


whatsappLinks.forEach(link => {

    link.addEventListener("click", () => {

        console.log(
            "Usuário clicou no WhatsApp."
        );

    });

});


/* =========================================================
   FECHAR MENU AO CLICAR FORA
========================================================= */

document.addEventListener("click", event => {

    if (!nav || !menuButton) return;


    const clickedInsideNav =
        nav.contains(event.target);

    const clickedMenu =
        menuButton.contains(event.target);


    if (
        !clickedInsideNav &&
        !clickedMenu
    ) {

        nav.classList.remove("active");

        menuButton.classList.remove("active");

    }

});


/* =========================================================
   VERIFICAR IMAGENS
========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            console.warn(
                "Imagem não encontrada:",
                image.src
            );

        }
    );

});


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

const footerYear =
    document.querySelector(".footer-bottom p");


if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    footerYear.innerHTML =
        `© ${currentYear} Seu Nome. Todos os direitos reservados.`;

}


/* =========================================================
   FINAL
========================================================= */

console.log(
    "Landing Page carregada com sucesso!"
);
