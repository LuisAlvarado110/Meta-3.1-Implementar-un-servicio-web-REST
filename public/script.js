const apiUrl = 'http://localhost:3000/estudiantes';

// Función para listar todos los estudiantes
document.getElementById('list-all-btn').addEventListener('click', async () => {
    const response = await fetch(apiUrl);
    const estudiantes = await response.json();
    const tableBody = document.querySelector('#students-table tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar los datos

    estudiantes.forEach(estudiante => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${estudiante.id}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.semestreIngreso}</td>
            <td>${estudiante.creditosCursados}</td>
        `;
        tableBody.appendChild(row);
    });
});

// Función para buscar estudiante por matrícula
document.getElementById('search-btn').addEventListener('click', async () => {
    const id = document.getElementById('search-id').value;
    const response = await fetch(`${apiUrl}/${id}`);

    if (response.ok) {
        const estudiante = await response.json();
        alert(`Nombre: ${estudiante.nombre}\nSemestre: ${estudiante.semestreIngreso}\nCréditos: ${estudiante.creditosCursados}`);
    } else {
        alert('Estudiante no encontrado');
    }
});

// Función para crear/actualizar un estudiante
document.getElementById('student-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const semestreIngreso = document.getElementById('semestreIngreso').value;
    const creditosCursados = document.getElementById('creditosCursados').value;

    const estudiante = { id, nombre, semestreIngreso, creditosCursados };

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT', // Cambiar a POST si se desea crear
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
    });

    if (response.ok) {
        alert('Estudiante guardado correctamente');
        document.getElementById('student-form').reset();
    } else {
        alert('Error al guardar el estudiante');
    }
});

// Función para eliminar un estudiante
document.getElementById('delete-btn').addEventListener('click', async () => {
    const id = document.getElementById('id').value;
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Estudiante eliminado');
        document.getElementById('student-form').reset();
    } else {
        alert('Error al eliminar el estudiante');
    }
});
