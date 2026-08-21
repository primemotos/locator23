/* =====================================================
   ANO AUTOMÁTICO
===================================================== */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =====================================================
   ACCORDION
===================================================== */

const accordionButtons =
    document.querySelectorAll(".accordion-button");


accordionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const content =
            button.nextElementSibling;

        const isOpen =
            content.classList.contains("active");


        document
            .querySelectorAll(".accordion-content")
            .forEach(item => {
                item.classList.remove("active");
            });


        document
            .querySelectorAll(".accordion-button span")
            .forEach(icon => {
                icon.textContent = "+";
            });


        if (!isOpen) {

            content.classList.add("active");

            const icon =
                button.querySelector("span");

            if (icon) {
                icon.textContent = "−";
            }

        }

    });

});


/* =====================================================
   SCROLL SUAVE
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", function(event) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =====================================================
   ANIMAÇÃO AO ENTRAR NA TELA
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".service-card, .testimonial, .gallery-item, .stat"
    );


const observer =
    new IntersectionObserver(
        entries => {

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


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});


/* =====================================================
   CLASSE VISÍVEL
===================================================== */

const style =
    document.createElement("style");

style.innerHTML = `

    .service-card.visible,
    .testimonial.visible,
    .gallery-item.visible,
    .stat.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

`;

document.head.appendChild(style);
