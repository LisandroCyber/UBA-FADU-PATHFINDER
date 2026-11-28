# 🎓 UBA-FADU Pathfinder

Herramienta interactiva para planificar la carrera de **Planificación y Diseño del Paisaje** (UBA-FADU). Marcá las materias que ya cursaste o aprobaste y mirá cuáles podés cursar, qué necesita cada una y cuándo te recibirías.

**De un estudiante para otros estudiantes.**

🔗 **Sitio:** https://fadu-pathfinder.vercel.app

> Proyecto no oficial, hecho por estudiantes. Los datos salen del cuadro de correlatividades de la carrera; ante cualquier duda, consultá siempre la información oficial de la facultad. El cuadro consultado no incluye una materia 4.4.

## ✨ Qué podés hacer

- **Ver el árbol de materias** por año, con las 32 materias de la carrera.
- **Marcar tu avance**: aprobada (con el check de cada materia), cursada o previa.
- **Saber qué podés cursar**: las materias se pintan solas según su estado.
  - 🟩 Aprobada
  - 🟨 Cursada
  - 🟢 Habilitada para cursar
  - 🟥 Previa
  - ⬜ Bloqueada
- **Tocar una materia** para ver sus requeridas, lo que te falta para cursarla y a qué materias habilita, con líneas en el grafo.
- **Filtrar** por habilitadas, pendientes o aprobadas, y ver tu porcentaje de carrera aprobada.
- **Consultar el Oráculo 🔮**: elegí cuántas materias cursás por cuatrimestre o por año y calcula cuándo terminarías, con un plan sugerido.
- **Desbloquear logros 🏆** al avanzar en la carrera y explorar las funciones de la herramienta.
- **Guardar tu progreso** automáticamente en tu navegador.
- Modo claro y oscuro según tu dispositivo.

## 🔮 Cómo calcula el Oráculo

Simula cada cuatrimestre respetando las correlativas: una materia solo se cursa si sus requeridas ya están aprobadas, y entre las habilitadas prioriza las que destraban más materias posteriores. Supone que:

- cada materia se cursa y se aprueba (final incluido) en el mismo cuatrimestre,
- el 1er cuatrimestre empieza en marzo y el 2do en agosto,
- el trabajo final y las optativas II quedan al final, porque piden el resto de la carrera.

Es una estimación para planificar, no una fecha garantizada.

## 🗂️ Estructura

\`\`\`
├── index.html   # estructura de la página
├── style.css    # estilos
├── script.js    # lógica: materias, correlativas, Oráculo, logros y guardado
└── README.md
\`\`\`

Es un sitio estático: no usa frameworks ni dependencias, solo HTML, CSS y JavaScript.

## 🤝 Contribuir

Si encontrás un error en el cuadro de correlatividades o tenés una idea para mejorar la herramienta, abrí un *issue* o un *pull request*.

## 👤 Autor

Desarrollado por [Lisandro Romero](https://www.linkedin.com/in/lisandroromero/).

© 2026 - Derechos reservados - Hecho con ❤️
