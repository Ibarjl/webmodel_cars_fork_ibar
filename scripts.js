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