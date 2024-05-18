let makeCardsMoveAndBeDraggable = () => {
  const container = document.querySelector(".card-previsio-horaria");

  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("active");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("active");
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("active");
    checkBounce();
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    container.scrollLeft = scrollLeft - walk;
  });

  // Edge scrolling functionality
  const edgeScrollLeft = document.createElement("div");
  edgeScrollLeft.className = "edge-scroll edge-scroll-left";
  container.parentElement.appendChild(edgeScrollLeft);

  const edgeScrollRight = document.createElement("div");
  edgeScrollRight.className = "edge-scroll edge-scroll-right";
  container.parentElement.appendChild(edgeScrollRight);

  let scrollInterval;

  edgeScrollLeft.addEventListener("mouseenter", () => {
    scrollInterval = setInterval(() => {
      container.scrollLeft -= 10;
      checkBounce();
    }, 10);
  });

  edgeScrollLeft.addEventListener("mouseleave", () => {
    clearInterval(scrollInterval);
  });

  edgeScrollRight.addEventListener("mouseenter", () => {
    scrollInterval = setInterval(() => {
      container.scrollLeft += 10;
      checkBounce();
    }, 10);
  });

  edgeScrollRight.addEventListener("mouseleave", () => {
    clearInterval(scrollInterval);
  });

  function checkBounce() {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft <= 0) {
      bounce("left");
    } else if (container.scrollLeft >= maxScrollLeft) {
      bounce("right");
    }
  }

  function bounce(direction) {
    if (direction === "left") {
      container.style.scrollBehavior = "auto";
      container.scrollLeft = 0;
      container.style.transition = "scroll-left 0.3s ease";
      setTimeout(() => {
        container.style.transition = "";
      }, 300);
    } else if (direction === "right") {
      container.style.scrollBehavior = "auto";
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollLeft = maxScrollLeft;
      container.style.transition = "scroll-left 0.3s ease";
      setTimeout(() => {
        container.style.transition = "";
      }, 300);
    }
  }
};

export { makeCardsMoveAndBeDraggable };
