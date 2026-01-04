const projects = [
    { id: 1, name: "Neural Interface", 
      pos: { 
        engineer: { x: 200, y: 200 }, 
        space: { x: 500, y: 300 }, 
        creative: { x: 100, y: 800 },
        academia: { x: 300, y: 100 }
      },
      desc: {
        engineer: "High-performance React dashboard.",
        space: "A gateway to the digital void.",
        academia: "A formal inquiry into human-machine symbiosis."
      }
    },
    { id: 2, name: "Quantum Ledger", 
      pos: { 
        engineer: { x: 200, y: 400 }, 
        space: { x: 700, y: 600 }, 
        creative: { x: 400, y: 400 },
        academia: { x: 300, y: 200 }
      },
      desc: {
        engineer: "Immutable database architecture.",
        space: "Tracking star-dust transactions.",
        academia: "On the permanence of digital memory."
      }
    }
];

const starsLayer = document.getElementById('stars-layer');
const linesLayer = document.getElementById('lines-layer');

function init() {
    projects.forEach(proj => {
        // Create Star SVG Element
        const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        star.setAttribute("class", "star");
        star.setAttribute("id", `star-${proj.id}`);
        star.setAttribute("r", "6");
        star.dataset.id = proj.id;
        
        starsLayer.appendChild(star);
        
        star.addEventListener('click', () => openProject(proj));
    });

    setIdentity('engineer'); // Default mode
}

function setIdentity(mode) {
    document.documentElement.setAttribute('data-theme', mode);

    projects.forEach(proj => {
        const targetPos = proj.pos[mode];
        
        // GSAP Animate position
        gsap.to(`#star-${proj.id}`, {
            attr: { cx: targetPos.x, cy: targetPos.y },
            duration: 1.5,
            ease: "expo.out"
        });
    });

    updateLines(mode);
}

function updateLines(mode) {
    // Basic logic to connect star 1 and star 2
    // In a full build, you'd define "Constellation" groups
    linesLayer.innerHTML = '';
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", "constellation-line");
    
    const p1 = projects[0].pos[mode];
    const p2 = projects[1].pos[mode];
    
    gsap.to(line, {
        attr: { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y },
        duration: 1.5,
        ease: "expo.out"
    });
    
    linesLayer.appendChild(line);
}

function openProject(proj) {
    const mode = document.documentElement.getAttribute('data-theme');
    document.getElementById('modal-title').innerText = proj.name;
    document.getElementById('modal-desc').innerText = proj.desc[mode];
    document.getElementById('project-modal').classList.remove('hidden');
}

init();