function addSpinner(container, textColor, delay) {
  const spinner = document.createElement("div");
  spinner.className = `loader spinner-grow ${textColor}`;
  spinner.setAttribute("role", "status");
  spinner.style.animationDelay = `${delay}ms`; // Set animation delay
  spinner.innerHTML = '<span class="visually-hidden">Loading...</span>';
  container.appendChild(spinner);
}

function removeSpinners(container) {
  const spinners = container.querySelectorAll(".loader");
  spinners.forEach((spinner) => spinner.remove());
}

export { addSpinner, removeSpinners };
