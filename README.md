# UBA-FADU Pathfinder

Herramienta interactiva para visualizar las correlatividades y planificar el avance en la carrera de **Planificación y Diseño del Paisaje** de la UBA-FADU.

**De un estudiante para otros estudiantes.**

- **Probar la herramienta:** https://fadu-pathfinder.vercel.app/
- **Plan de estudios oficial:** https://www.fadu.uba.ar/lic-en-planificacion-y-diseno-del-paisaje/

> Este es un proyecto independiente y no oficial. La información se transcribió del cuadro de correlatividades consultado para la carrera. Si encontrás diferencias o tenés dudas, verificá siempre los requisitos con la facultad. El cuadro utilizado no incluye una materia 4.4.

## Funcionalidades

- Visualizar en un árbol las **32 materias** organizadas por año.
- Registrar cada materia como **aprobada**, **cursada sin final** o **previa**.
- Identificar materias **habilitadas** y **bloqueadas** según el avance registrado.
- Seleccionar una materia para consultar sus correlativas, los requisitos pendientes y qué otras materias habilita.
- Filtrar por materias habilitadas, pendientes o aprobadas, y consultar el porcentaje de avance.
- Usar el **Oráculo Académico** para generar un plan sugerido y estimar una fecha de finalización.
- Consultar logros asociados al progreso y al uso de la herramienta.
- Guardar el progreso automáticamente en el navegador.

### Estados de las materias

| Estado | Qué representa |
| --- | --- |
| Aprobada | La materia y su final están aprobados. |
| Cursada | Tiene el trabajo práctico aprobado, pero falta el final. |
| Habilitada | Según las correlativas registradas, ya se puede cursar. |
| Previa | Marca personal para señalar una materia pendiente; no cuenta como cursada ni aprobada. |
| Bloqueada | Todavía falta cumplir uno o más requisitos para cursarla. |

En las materias que requieren final, la herramienta también indica si ya están dadas las condiciones para rendirlo. Las condiciones dependen de la materia y del cuadro de correlatividades cargado.

## Oráculo Académico

El Oráculo simula cuatrimestres y prioriza las materias que habilitan más materias posteriores. Permite indicar una cantidad de materias por cuatrimestre o por año y muestra un plan sugerido.

La estimación supone que:

- Cada materia se cursa y se aprueba —incluido el final— en el mismo cuatrimestre.
- El primer cuatrimestre empieza en marzo y el segundo en agosto.
- Se respetan las correlatividades registradas.
- El Trabajo Final y las Optativas II quedan para el final por sus requisitos.

Es una orientación para planificar, **no una fecha garantizada**. La duración real depende de la oferta de materias, la disponibilidad, la aprobación de cursadas y finales, y otras condiciones académicas.

## Privacidad del progreso

El avance se guarda en el almacenamiento local del navegador (\`localStorage\`). No se sincroniza entre dispositivos ni navegadores. Si se borran los datos del sitio en el navegador, también se puede borrar el progreso guardado.

## Tecnologías

Proyecto estático desarrollado con **HTML, CSS y JavaScript**, sin frameworks ni dependencias externas.

### Ejecutarlo localmente

1. Descargá o cloná este repositorio.
2. Abrí \`index.html\` en un navegador.

No hace falta instalar dependencias ni compilar el proyecto.

## Archivos principales

- \`index.html\`: estructura y contenido de la página.
- \`style.css\`: estilos y diseño.
- \`script.js\`: materias, correlatividades, filtros, guardado, logros y Oráculo.

## Aportes

Si detectás un error en las correlatividades o querés proponer una mejora, podés abrir un *issue* o enviar un *pull request*. Para corregir información académica, incluí una referencia oficial que permita verificar el cambio.

## Autor

Desarrollado por [Lisandro Romero](https://www.linkedin.com/in/lisandroromero/).

© 2026 · Proyecto independiente · Hecho con ❤️
