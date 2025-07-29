const niveles = [
  {
    nivel: 1,
    ramos: [
      ["Matemáticas Básicas", 3],
      ["Geometría Vectorial y Analítica", 3],
      ["Introducción a la Informática", 3],
      ["Introducción a la Formación Profesional", 2],
      ["Habilidades Comunicativas", 2],
    ]
  },
  {
    nivel: 2,
    ramos: [
      ["Cálculo Diferencial", 3],
      ["Álgebra Lineal", 3],
      ["Química Básica y Laboratorio", 5],
      ["Biología Celular", 3],
      ["Inglés I", 2],
    ]
  },
  {
    nivel: 3,
    ramos: [
      ["Cálculo Integral", 3],
      ["Física Mecánica y Laboratorio", 5],
      ["Introducción a las Biomoléculas", 2],
      ["Algoritmia y Programación", 3],
      ["Inglés II", 2],
    ]
  },
  {
    nivel: 4,
    ramos: [
      ["Ecuaciones Diferenciales", 3],
      ["Física de Campos y Laboratorio", 5],
      ["Bioquímica Médica", 3],
      ["Morfofisiología I", 3],
      ["Inglés III", 2],
    ]
  },
  {
    nivel: 5,
    ramos: [
      ["Métodos Numéricos", 3],
      ["Circuitos Eléctricos", 3],
      ["Biología Molecular", 3],
      ["Morfofisiología II", 3],
      ["Inglés IV", 2],
    ]
  },
  {
    nivel: 6,
    ramos: [
      ["Biofísica", 5],
      ["Biomateriales", 3],
      ["Electrónica Análoga y de Potencia", 5],
      ["Diseño Biomédico", 3],
    ]
  },
  {
    nivel: 7,
    ramos: [
      ["Biomecánica", 3],
      ["Optativa I", 3],
      ["Electrónica Digital y Sistemas Embebidos", 5],
      ["Bioinstrumentación", 3],
      ["Estadística General", 3],
    ]
  },
  {
    nivel: 8,
    ramos: [
      ["Procesamiento de Señales Biomédicas", 3],
      ["Optativa II", 3],
      ["Ciencia, Tecnología y Sociedad", 2],
      ["Legislación en Salud", 2],
      ["Metrología Biomédica", 3],
      ["Ingeniería de Rehabilitación", 3],
    ]
  },
  {
    nivel: 9,
    ramos: [
      ["Imágenes Médicas", 3],
      ["Optativa III", 3],
      ["Equipos Biomédicos I", 3],
      ["Ingeniería Clínica", 3],
      ["Seminario de Investigación", 2],
      ["Electiva I", 2],
    ]
  },
  {
    nivel: 10,
    ramos: [
      ["Electiva II", 2],
      ["Trabajo de Grado – Programa Profesional", 4],
      ["Proyectos i+D+I", 3],
      ["Fundamentación Ambiental", 2],
      ["Equipos Biomédicos II", 3],
      ["Gestión de Tecnología en Salud", 3],
    ]
  },
];

const grid = document.getElementById("grid");
const progresoTexto = document.getElementById("progress-text");
const barra = document.getElementById("progress-bar");

let aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));

function guardar() {
  localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
}

function actualizarUI() {
  grid.innerHTML = "";
  let total = 0;
  let completados = 0;

  niveles.forEach((nivel, i) => {
    const bloque = document.createElement("div");
    bloque.className = "nivel";
    const titulo = document.createElement("h2");
    titulo.textContent = `Nivel ${nivel.nivel}`;
    bloque.appendChild(titulo);

    const anteriorAprobado = i === 0 || niveles[i - 1].ramos.every(r => aprobados.has(r[0]));

    nivel.ramos.forEach(([nombre, creditos]) => {
      total++;
      const div = document.createElement("div");
      div.className = "ramo";
      div.innerHTML = `${nombre} <span>${creditos} créditos</span>`;

      if (!anteriorAprobado) {
        div.classList.add("locked");
      } else {
        div.addEventListener("click", () => {
          if (aprobados.has(nombre)) {
            aprobados.delete(nombre);
          } else {
            aprobados.add(nombre);
          }
          guardar();
          actualizarUI();
        });
      }

      if (aprobados.has(nombre)) {
        div.classList.add("aprobado");
        completados++;
      }

      bloque.appendChild(div);
    });

    grid.appendChild(bloque);
  });

  const pct = ((completados / total) * 100).toFixed(1);
  progresoTexto.textContent = `${completados}/${total} ramos (${pct}%)`;
  barra.style.width = `${pct}%`;
}

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("¿Reiniciar todo tu progreso?")) {
    aprobados.clear();
    guardar();
    actualizarUI();
  }
});

const toggleBtn = document.getElementById("toggle-dark");
const isDark = localStorage.getItem("modoOscuro") === "true";

if (isDark) document.body.classList.add("dark");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("modoOscuro", document.body.classList.contains("dark"));
});

actualizarUI();
