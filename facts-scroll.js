(() => {
  const section = document.querySelector(".why");
  const tabs = [...document.querySelectorAll("[data-fact-index]")];
  const cards = [...document.querySelectorAll("[data-fact-card]")];

  if (!section || tabs.length === 0 || cards.length === 0) {
    return;
  }

  let activeIndex = 0;
  let clickLockUntil = 0;

  const setActive = (index) => {
    const nextIndex = Math.max(0, Math.min(index, cards.length - 1));
    if (nextIndex === activeIndex && cards[nextIndex].classList.contains("active")) {
      return;
    }

    activeIndex = nextIndex;
    tabs.forEach((tab, tabIndex) => {
      tab.classList.toggle("active", tabIndex === activeIndex);
      tab.setAttribute("aria-selected", tabIndex === activeIndex ? "true" : "false");
    });
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("active", cardIndex === activeIndex);
    });
  };

  const indexFromScroll = () => {
    const range = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = (window.scrollY - section.offsetTop + window.innerHeight * 0.18) / range;
    if (progress < 0.34) return 0;
    if (progress < 0.66) return 1;
    return 2;
  };

  const syncToScroll = () => {
    if (Date.now() < clickLockUntil) {
      return;
    }
    setActive(indexFromScroll());
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const index = Number(tab.dataset.factIndex);
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      const targetProgress = index === 0 ? 0.1 : index === 1 ? 0.44 : 0.78;
      const targetY = section.offsetTop + range * targetProgress - window.innerHeight * 0.18;
      clickLockUntil = Date.now() + 900;
      setActive(index);
      requestAnimationFrame(() => {
        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      });
    });
  });

  setActive(0);
  syncToScroll();
  window.addEventListener("scroll", syncToScroll, { passive: true });
  window.addEventListener("resize", syncToScroll);
  window.setInterval(syncToScroll, 140);
})();
