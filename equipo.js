document.addEventListener("DOMContentLoaded", () => {
  // ====== SLIDER ======
  const slider = document.querySelector(".slider-box ul");
  const prevButton = document.querySelector(".slider-button.prev");
  const nextButton = document.querySelector(".slider-button.next");
  let currentSlide = 0;

  if (slider && prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        slider.style.transform = `translateX(-${currentSlide * 50}%)`;
      }
    });

    nextButton.addEventListener("click", () => {
      if (currentSlide < 1) {
        currentSlide++;
        slider.style.transform = `translateX(-${currentSlide * 50}%)`;
      }
    });
  }

  // ====== MENÚ MÓVIL ======
  const icono = document.getElementById("open");
  const enlaces = document.getElementById("enlaces");
  if (icono && enlaces) {
    icono.addEventListener("click", () => {
      enlaces.classList.toggle("activo");
    });
  }

  // ====== FILTROS (placeholder) ======
  const busquedaInput = document.getElementById("busqueda");
  if (busquedaInput) {
    busquedaInput.addEventListener("input", () => {
      console.log("Buscando:", busquedaInput.value);
    });
  }

  // ====== MODAL DINÁMICO ======
  const modal = document.getElementById("modal");
  const modalFoto = document.getElementById("modal-foto");
  const modalNombre = document.getElementById("modal-nombre");
  const modalInfo = document.getElementById("modal-info");
  const cerrarModal = document.querySelector(".cerrar");

  // Evento en cada tarjeta
  const tarjetas = document.querySelectorAll(".tarjeta");
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      const foto = tarjeta.getAttribute("data-foto");
      const nombre = tarjeta.getAttribute("data-nombre");
      const info = tarjeta.getAttribute("data-info");

      modalFoto.src = foto || tarjeta.querySelector("img").src;
      modalNombre.textContent = nombre || tarjeta.querySelector("h3").textContent;
      modalInfo.textContent = info || tarjeta.querySelector("p").textContent;

      modal.style.display = "flex";
    });
  });

  // Cerrar modal
  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
