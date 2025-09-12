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

  // ====== FILTROS ======
  const busquedaInput = document.getElementById("busqueda");
  const selectCarrera = document.getElementById("carrera");
  const selectArea = document.getElementById("area");
  const selectIntegrantes = document.getElementById("integrantes");
  const selectUniversidad = document.getElementById("universidad");
  const tarjetas = document.querySelectorAll(".tarjeta");

  function filtrarTarjetas() {
    const texto = busquedaInput ? busquedaInput.value.toLowerCase() : "";
    const carrera = selectCarrera ? selectCarrera.value : "";
    const area = selectArea ? selectArea.value : "";
    const tipo = selectIntegrantes ? selectIntegrantes.value : "";
    const universidad = selectUniversidad ? selectUniversidad.value : "";

    tarjetas.forEach((tarjeta) => {
      const nombre = tarjeta.dataset.nombre.toLowerCase();
      const carreraTarjeta = tarjeta.dataset.carrera || "";
      const areaTarjeta = tarjeta.dataset.area || "";
      const tipoTarjeta = tarjeta.dataset.tipo || "";
      const universidadTarjeta = tarjeta.dataset.universidad || "";

      const coincideNombre = nombre.includes(texto);
      const coincideCarrera = carrera === "" || carreraTarjeta === carrera;
      const coincideArea = area === "" || areaTarjeta === area;
      const coincideTipo = tipo === "" || tipoTarjeta === tipo;
      const coincideUniversidad = universidad === "" || universidadTarjeta === universidad;

      if (coincideNombre && coincideCarrera && coincideArea && coincideTipo && coincideUniversidad) {
        tarjeta.style.display = "block";
      } else {
        tarjeta.style.display = "none";
      }
    });
  }

  if (busquedaInput) busquedaInput.addEventListener("input", filtrarTarjetas);
  if (selectCarrera) selectCarrera.addEventListener("change", filtrarTarjetas);
  if (selectArea) selectArea.addEventListener("change", filtrarTarjetas);
  if (selectIntegrantes) selectIntegrantes.addEventListener("change", filtrarTarjetas);
  if (selectUniversidad) selectUniversidad.addEventListener("change", filtrarTarjetas);

  // ====== MODAL DINÁMICO ======
  const modal = document.getElementById("modal");
  const modalFoto = document.getElementById("modal-foto");
  const modalNombre = document.getElementById("modal-nombre");
  const modalInfo = document.getElementById("modal-info");
  const cerrarModal = document.querySelector(".cerrar");

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

  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
