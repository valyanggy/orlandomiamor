(() => {
  const overlay = document.querySelector(".image-lightbox");
  const overlayImage = overlay?.querySelector("img");
  const closeButton = overlay?.querySelector("button");

  if (!overlay || !overlayImage || !closeButton) {
    return;
  }

  const selectableImages = [
    ...document.querySelectorAll("main img"),
  ].filter((image) => !image.closest(".sticky-chips"));

  const open = (image) => {
    overlayImage.src = image.currentSrc || image.src;
    overlayImage.alt = image.alt || "";
    overlay.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const close = () => {
    overlay.hidden = true;
    overlayImage.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
  };

  selectableImages.forEach((image) => {
    image.classList.add("lightbox-trigger");
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", image.alt ? `Open image: ${image.alt}` : "Open image");

    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(image);
      }
    });
  });

  document.querySelector("main")?.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) {
      return;
    }

    const directImage = event.target.closest("img.lightbox-trigger");
    const sectionImage = event.target.closest(".hero, .fact-card, .place, .wide-card, .stay-main, .thumb-strip, .closing")?.querySelector("img.lightbox-trigger");
    const image = directImage || sectionImage;

    if (image) {
      open(image);
    }
  });

  closeButton.addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      close();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) {
      close();
    }
  });
})();
