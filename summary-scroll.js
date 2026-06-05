(() => {
  const summary = document.querySelector(".summary");
  const parts = [...document.querySelectorAll(".summary-part")];

  if (!summary || parts.length < 3) {
    return;
  }

  const setActivePart = () => {
    const scrollRange = Math.max(summary.offsetHeight - window.innerHeight, 1);
    const progress = (window.scrollY - summary.offsetTop + window.innerHeight * 0.08) / scrollRange;
    const activeIndex = progress < 0.24 ? 0 : progress < 0.48 ? 1 : 2;

    parts.forEach((part, index) => {
      part.classList.toggle("active", index === activeIndex);
    });
  };

  setActivePart();
  window.addEventListener("scroll", setActivePart, { passive: true });
  window.addEventListener("resize", setActivePart);
  window.setInterval(setActivePart, 120);
})();
