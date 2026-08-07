const rocks = document.querySelectorAll('.rock');
const pipeEntry = document.querySelector('.pipe-entry');
const fallingRock = document.getElementById('fallingRock');
const speedElement = document.getElementById('speed');

let weight = 0;
let animationFrameId = null;

rocks.forEach(rock => {
    rock.addEventListener('dragstart', (e) => {
        weight = Number(e.currentTarget.dataset.weight);
        e.dataTransfer.setData('text/plain', weight.toString());

        const stone = rock.querySelector(".rock-shape");
        const draggedStone = stone.cloneNode(true);

        draggedStone.style.position = "absolute";
        draggedStone.style.top = "-200px";
        draggedStone.style.left = "-200px";
        draggedStone.style.borderRadius = "20px";
        draggedStone.style.backgroundColor = "transparent";
        draggedStone.style.width = `${stone.offsetWidth}px`;
        draggedStone.style.height = `${stone.offsetHeight}px`;

        document.body.appendChild(draggedStone);

        
        event.dataTransfer.setDragImage(
            draggedStone,
            stone.offsetWidth / 2,
            stone.offsetHeight / 2
        );

        
        requestAnimationFrame(() => draggedStone.remove());
    });
});

pipeEntry.addEventListener('dragover', (e) => {
    e.preventDefault();
    pipeEntry.classList.add("drag-over");
});

pipeEntry.addEventListener("dragleave", () => {
    pipeEntry.classList.remove("drag-over");
});

pipeEntry.addEventListener("drop", (event) => {
    event.preventDefault();
    pipeEntry.classList.remove("drag-over");
    const droppedWeight = Number(event.dataTransfer.getData("text/plain"));
    dropRock(droppedWeight);
});

function dropRock(weight) {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

   
    const rockSize = Math.min(84, 27 + Math.sqrt(weight) * 7);

    fallingRock.style.width = `${rockSize}px`;
    fallingRock.style.height = `${rockSize}px`;
    fallingRock.style.display = "block";

    let position = -rockSize;
    fallingRock.style.top = `${position}px`;

    let speed = 0;
    let previousTime = null;

    const gameAcceleration = 150 + weight * 35;
    const maximumPosition = pipe.clientHeight;

    function animate(currentTime) {
        if (!previousTime) previousTime = currentTime;

        const deltaTime = (currentTime - previousTime) / 1000;
        previousTime = currentTime;

    
        speed = speed + gameAcceleration * deltaTime;
        position = position + speed * deltaTime;
        fallingRock.style.top = `${position}px`;
       
        if (speedElement) {
            speedElement.textContent = speed.toFixed(2);
        }

        if (position < maximumPosition) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            fallingRock.style.display = "none";
            if (speedElement) {
                speedElement.textContent = "0.00";
            }
        }
    }

    animationFrameId = requestAnimationFrame(animate);
}
