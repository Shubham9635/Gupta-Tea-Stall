  const items = document.querySelectorAll(".accordion-item");

  items.forEach(item => {
    const btn = item.querySelector(".accordion-btn");

    btn.addEventListener("click", () => {
      // close all first
      items.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });

      // toggle current
      item.classList.toggle("active");
    });
  });