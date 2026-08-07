// console.log("hello")
const rocks = document.querySelectorAll('.rock');
const pipeEntry = document.querySelector('.pipe-entry');

let weight = 0;
let animationFrameId = null;

rocks.forEach(rock => {
    rock.addEventListener('dragstart', (e) => {

        weight = Number(e.currentTarget.dataset.weight);

        e.dataTransfer.setData('text/plain', weight.toString())

    })
})

pipeEntry.addEventListener('dragover', (e) => {
    e.preventDefault();
    pipeEntry.classList.add("drag-over")
})

pipeEntry.addEventListener("dragleave", () => {
  pipeEntry.classList.remove("drag-over");
});

pipeEntry.addEventListener("drop", (event) => {
  event.preventDefault();

  pipeEntry.classList.remove("drag-over");

  const weight = Number(
    event.dataTransfer.getData("text/plain")
  );

  dropRock(weight);
});


function dropRock (weight) {

    cancelAnimationFrame(animationFrameId)

    const rockSize = 30 + weight * 5;

    fallingRock.style.width = `${rockSize}px`;
    fallingRock.style.height = `${rockSize}px`;
    fallingRock.style.display = "block";

    let position = -rockSize;

    fallingRock.style.top = `${position}px`;

    let speed = 0;
}