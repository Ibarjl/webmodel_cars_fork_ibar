// Opción 1: Habilitar menús desplegables de forma progresiva

    // Espera a que todo el contenido del HTML se cargue
    document.addEventListener('DOMContentLoaded', function() {

        // 1. Obtener los tres menús desplegables por su ID
        const makeSelect = document.getElementById('make-select');
        const modelSelect = document.getElementById('model-select');
        const yearSelect = document.getElementById('year-select');

        // 2. Escuchar cambios en el primer menú (Marca)
        makeSelect.addEventListener('change', function() {
            // Si el usuario ha seleccionado una marca válida...
            if (this.value) {
                // ...habilita el segundo menú (Modelo)
                modelSelect.disabled = false;
                // Y asegúrate de que el tercer menú (Año) esté deshabilitado y reseteado
                yearSelect.disabled = true;
                yearSelect.value = ''; // Resetea la selección
            }
        });

        // 3. Escuchar cambios en el segundo menú (Modelo)
        modelSelect.addEventListener('change', function() {
            // Si el usuario ha seleccionado un modelo válido...
            if (this.value) {
                // ...habilita el tercer menú (Año)
                yearSelect.disabled = false;
            }
        });
    });

// Opción 2: Menú interactivo

        // Espera a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {

        // --- LÓGICA DEL SELECTOR INTERACTIVO ---

        // Objeto con los datos de los modelos por marca
        const carData = {
            ferrari: ['SF90 Stradale', '812 Superfast', 'F8 Tributo', 'Roma'],
            porsche: ['911 Turbo S', 'Taycan', '718 Cayman GT4', 'Panamera'],
            lamborghini: ['Aventador SVJ', 'Huracán EVO', 'Urus', 'Sián']
        };

        // Obtener los elementos de cada paso
        const stepBrand = document.getElementById('step-brand');
        const stepModel = document.getElementById('step-model');
        const stepYear = document.getElementById('step-year');
        const stepFinal = document.getElementById('step-final');
        
        // Contenedor donde se pondrán los modelos
        const modelOptionsContainer = document.getElementById('model-options');

        // Función para cambiar de paso
        function goToStep(stepToShow) {
            // Oculta todos los pasos
            [stepBrand, stepModel, stepYear, stepFinal].forEach(step => {
                step.classList.remove('active');
            });
            // Muestra solo el paso deseado
            stepToShow.classList.add('active');
        }

        // PASO 1: Escuchar clics en las tarjetas de marca
        stepBrand.addEventListener('click', function(event) {
            // Usa event delegation para encontrar la tarjeta clickeada
            const clickedCard = event.target.closest('.option-card');
            if (!clickedCard) return; // Si no se hizo clic en una tarjeta, no hace nada

            const selectedBrand = clickedCard.dataset.brand;
            const models = carData[selectedBrand];

            // Limpia el contenedor de modelos por si el usuario vuelve atrás
            modelOptionsContainer.innerHTML = '';

            // Crea y añade las tarjetas de modelo
            models.forEach(model => {
                const modelCard = document.createElement('div');
                modelCard.className = 'option-card';
                modelCard.innerHTML = `<h3>${model}</h3>`;
                modelOptionsContainer.appendChild(modelCard);
            });
            
            // Pasa al siguiente paso
            goToStep(stepModel);
        });

        // PASO 2: Escuchar clics en las tarjetas de modelo
        stepModel.addEventListener('click', function(event) {
            const clickedCard = event.target.closest('.option-card');
            if (!clickedCard) return;

            // Pasa al siguiente paso
            goToStep(stepYear);
        });

        // PASO 3: Lógica del selector de año
        const yearSlider = document.getElementById('year-slider');
        const selectedYearDisplay = document.getElementById('selected-year');
        const confirmYearBtn = document.getElementById('confirm-year-btn');

        // Actualiza el número del año cuando el usuario mueve el slider
        yearSlider.addEventListener('input', function() {
            selectedYearDisplay.textContent = this.value;
        });

        // Escucha el clic en el botón de confirmar año
        confirmYearBtn.addEventListener('click', function() {
            // Pasa al paso final
            goToStep(stepFinal);
        });
    });

// CARROUSEL

        // Espera a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        
        // --- LÓGICA DEL CARRUSEL ---

        const slidesContainer = document.querySelector('.carousel-slides');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const dots = document.querySelectorAll('.dot');

        let currentIndex = 0;
        const totalSlides = slides.length;
        
        // Función para ir a un slide específico
        function goToSlide(index) {
            // Mueve el contenedor de slides horizontalmente
            slidesContainer.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;

            // Actualiza el punto activo
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            // Actualiza el índice actual
            currentIndex = index;
        }

        // Event listener para el botón "Siguiente"
        nextBtn.addEventListener('click', function() {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= totalSlides) {
                nextIndex = 0; // Vuelve al principio si está en el último
            }
            goToSlide(nextIndex);
        });

        // Event listener para el botón "Anterior"
        prevBtn.addEventListener('click', function() {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = totalSlides - 1; // Va al final si está en el primero
            }
            goToSlide(prevIndex);
        });
        
        // Event listener para los puntos
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
        });

        // Inicializa el carrusel en el primer slide
        goToSlide(0);
    });

// CARROUSEL

    // Espera a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {

        // --- LÓGICA DEL WIDGET DE CONTACTO ---

        const contactBubble = document.querySelector('.contact-bubble');
        const contactForm = document.querySelector('.contact-form-container');
        const closeFormBtn = document.querySelector('.close-form-btn');

        // Muestra/oculta el formulario al hacer clic en la burbuja
        contactBubble.addEventListener('click', function() {
            contactForm.classList.toggle('open');
        });

        // Oculta el formulario al hacer clic en el botón de cerrar
        closeFormBtn.addEventListener('click', function() {
            contactForm.classList.remove('open');
        });

    });