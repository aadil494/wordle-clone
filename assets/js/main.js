document.addEventListener("DOMContentLoaded", function () {
  createBoxes();
  function createBoxes() {
    const Grid = document.querySelector("#grid");
    for (let i = 0; i < 30; i++) {
      const box = document.createElement("div");
      box.setAttribute("id", i + 1);
      box.classList.add("box");
      Grid.appendChild(box);
    }
  }
});
