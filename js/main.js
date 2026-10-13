"use strict";

/* ============================================================
   CONFIGURACIÓN: reemplaza el valor por el número de WhatsApp
   de Atlas, con indicativo de país y solo dígitos.
   Ejemplo para Colombia: "573001234567"
   ============================================================ */
const WHATSAPP_NUMBER = "573195607450";
const WHATSAPP_MESSAGE = "Hola Atlas, quiero información sobre una página web para mi negocio.";

const whatsappConfigurado = /^\d{10,15}$/.test(WHATSAPP_NUMBER);

/* Enlace de WhatsApp */
(function configurarWhatsApp() {
  const enlaces = document.querySelectorAll("[data-whatsapp]");
  const aviso = document.querySelector("[data-whatsapp-note]");

  if (whatsappConfigurado) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    enlaces.forEach((a) => {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
    // El botón del hero también abre WhatsApp cuando está configurado
    const heroCta = document.querySelector("[data-hero-cta]");
    if (heroCta) {
      heroCta.href = url;
      heroCta.target = "_blank";
      heroCta.rel = "noopener noreferrer";
    }
    return;
  }

  console.warn("Atlas: configura WHATSAPP_NUMBER en js/main.js antes de publicar.");
  enlaces.forEach((a) => {
    a.removeAttribute("href");
    a.setAttribute("role", "link");
    a.setAttribute("aria-disabled", "true");
    a.addEventListener("click", (e) => e.preventDefault());
  });
  if (aviso) aviso.hidden = false;
})();

/* Menú móvil */
(function menuMovil() {
  const boton = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu-principal");
  if (!boton || !menu) return;

  const etiqueta = boton.querySelector(".visually-hidden");

  function alternar(abrir) {
    boton.setAttribute("aria-expanded", String(abrir));
    menu.classList.toggle("is-open", abrir);
    if (etiqueta) etiqueta.textContent = abrir ? "Cerrar menú" : "Abrir menú";
  }

  boton.addEventListener("click", () => {
    alternar(boton.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) alternar(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
      alternar(false);
      boton.focus();
    }
  });
})();

/* Año del copyright */
(function actualizarAnio() {
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
