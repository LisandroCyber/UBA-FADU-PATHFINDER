# 🎓 UBA-FADU Pathfinder

Herramienta interactiva para planificar la carrera de **Planificación y Diseño del Paisaje** (UBA-FADU). Marcá las materias que ya cursaste o aprobaste y mirá cuáles podés cursar, qué necesita cada una y cuándo te recibirías.

**De un estudiante para otros estudiantes.**

🔗 **Sitio:** https://TU-SITIO.vercel.app

> Proyecto no oficial, hecho por estudiantes. Los datos salen del cuadro de correlatividades de la carrera; ante cualquier duda, consultá siempre la información oficial de la facultad.

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
- **Guardar tu progreso** automáticamente en tu navegador.
- Modo claro y oscuro según tu dispositivo.

## 🔮 Cómo calcula el Oráculo

Simula cada cuatrimestre respetando las correlativas: una materia solo se cursa si sus requeridas ya están aprobadas, y entre las habilitadas prioriza las que destraban más materias posteriores. Supone que:

- cada materia se cursa y se aprueba (final incluido) en el mismo cuatrimestre,
- el 1er cuatrimestre empieza en marzo y el 2do en agosto,
- el trabajo final y las optativas II quedan al final, porque piden el resto de la carrera.

Es una estimación para planificar, no una fecha garantizada.

## 🗂️ Estructura

```
├── index.html   # estructura de la página
├── style.css    # estilos
├── script.js    # lógica: materias, correlativas, Oráculo y guardado
└── README.md
```

Es un sitio estático: no usa frameworks ni dependencias, solo HTML, CSS y JavaScript.

## 💻 Probarlo en tu computadora

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/LisandroCyber/UBA-FADU-PATHFINDER.git
   cd UBA-FADU-PATHFINDER
   ```
2. Abrí `index.html` con tu navegador (doble clic), o levantá un servidor local:
   ```bash
   npx serve
   ```

## 🚀 Publicarlo

Funciona en cualquier hosting de sitios estáticos (Vercel, GitHub Pages, Netlify). En Vercel alcanza con importar el repositorio y dejar la configuración por defecto: cada `git push` a `main` actualiza el sitio.

## 🛠️ Mantener las materias

Las materias y sus correlativas están en `script.js`, en la lista `R`. Cada fila tiene este formato:

```js
["id", "Nombre", cbc, "cursar T.P.", "cursar final", "para final", sinFinal]
```

Por ejemplo, `["2.3","Vegetación II",0,"","1.6","1.4,1.6",0]` indica que para cursarla hace falta el final de 1.6 y que, para rendir su final, hacen falta los finales de 1.4 y 1.6.

## 🤝 Contribuir

Si encontrás un error en el cuadro de correlativas o tenés una idea para mejorar la herramienta, abrí un *issue* o un *pull request*.

## 👤 Autor

Desarrollado por [Lisandro Romero](https://www.linkedin.com/in/lisandroromero/).

© 2026 - Derechos reservados - Hecho con ❤️
