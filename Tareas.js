// Lista vacía para almacenar los usuarios
const usuarios = [];

// Expresión regular para validar números
const regex1 = /^\d+$/;

// Expresión regular para validar letras
const regex2 = /^[a-zA-Z]+$/;

// Función que se ejecuta cuando se hace clic en el botón "OK"
function submitForm() {
    // Obtiene el valor del campo de nombres
    var nombres = document.getElementById("nombresInput").value;

    // Obtiene el valor del campo de apellidos
    var apellidos = document.getElementById("apellidosInput").value;

    // Obtiene el valor del campo de identificación
    var identificacion = document.getElementById("identificacionInput").value;

    // Verifica si los nombres y apellidos son válidos
    if (!regex2.test(nombres) || !regex2.test(apellidos)) {
        // Muestra una alerta si no son válidos
        return alert("Nombres o Apellidos no son válidos");
    }

    // Verifica si la identificación es un número válido
    if (!regex1.test(identificacion)) {
        // Muestra una alerta si no es válido
        return alert("La identificación debe ser un número");
    }

    // Crea un objeto usuario con los datos obtenidos
    var usuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1, // Asigna un ID nuevo
        nombres: nombres,
        apellidos: apellidos,
        identificacion: BigInt(identificacion) // Convierte la identificación a BigInt
    };

    // Agrega el usuario a la lista de usuarios
    usuarios.push(usuario);

    // Agrega una nueva fila en la tabla con los datos del usuario
    agregarFilaTabla(usuario);

    // Muestra la lista de usuarios en la consola
    console.log("Usuarios:", usuarios);
}

// Función que agrega una fila a la tabla con los datos del usuario
function agregarFilaTabla(usuario) {
    // Selecciona el cuerpo de la tabla
    var tbody = document.querySelector(".userTable tbody");

    // Crea una nueva fila para la tabla
    var fila = document.createElement("tr");

    // Añade celdas a la fila con los datos del usuario y botones de acción
    fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombres}</td>
        <td>${usuario.apellidos}</td>
        <td>${usuario.identificacion}</td>
        <td>
            <button class="update">update</button>
            <button class="delete">delete</button>
        </td>
    `;

    // Añade un evento de clic al botón de actualizar para ese usuario específico
    fila.querySelector(".update").addEventListener("click", function() {
        actualizarUsuario(usuario, fila);
    });

    // Añade un evento de clic al botón de eliminar para ese usuario específico
    fila.querySelector(".delete").addEventListener("click", function() {
        eliminarUsuario(usuario.id);
    });

    // Añade la fila al cuerpo de la tabla
    tbody.appendChild(fila);
}

// Función que actualiza los datos del usuario y la tabla
function actualizarUsuario(usuario, fila) {
    // Pide al usuario los nuevos nombres
    var nuevosNombres = prompt("Ingrese los nuevos nombres:", usuario.nombres);

    // Pide al usuario los nuevos apellidos
    var nuevosApellidos = prompt("Ingrese los nuevos apellidos:", usuario.apellidos);

    // Pide al usuario la nueva identificación
    var nuevaIdentificacion = prompt("Ingrese la nueva identificación:", usuario.identificacion);

    // Verifica si los nuevos nombres y apellidos son válidos
    if (!regex2.test(nuevosNombres) || !regex2.test(nuevosApellidos)) {
        // Muestra una alerta si no son válidos
        return alert("Nombres o Apellidos no son válidos");
    }

    // Verifica si la nueva identificación es un número válido
    if (!regex1.test(nuevaIdentificacion)) {
        // Muestra una alerta si no es válido
        return alert("La identificación debe ser un número");
    }

    // Actualiza los datos del objeto usuario con los nuevos valores
    usuario.nombres = nuevosNombres;
    usuario.apellidos = nuevosApellidos;
    usuario.identificacion = BigInt(nuevaIdentificacion);

    // Actualiza las celdas de la fila en la tabla con los nuevos valores
    fila.cells[1].textContent = nuevosNombres;
    fila.cells[2].textContent = nuevosApellidos;
    fila.cells[3].textContent = nuevaIdentificacion;

    // Muestra el usuario actualizado en la consola
    console.log("Usuario actualizado:", usuario);
}

// Función que elimina un usuario de la lista y actualiza la tabla
function eliminarUsuario(id) {
    // Encuentra el índice del usuario con el ID especificado
    const index = usuarios.findIndex(usuario => usuario.id === id);

    // Si se encuentra el usuario, lo elimina de la lista
    if (index !== -1) {
        usuarios.splice(index, 1);

        // Actualiza la tabla para reflejar los cambios
        actualizarTabla();
    }
}

// Función que actualiza la tabla con los datos actuales de la lista de usuarios
function actualizarTabla() {
    // Selecciona el cuerpo de la tabla
    var tbody = document.querySelector(".userTable tbody");

    // Limpia el contenido actual del cuerpo de la tabla
    tbody.innerHTML = "";

    // Recorre cada usuario en la lista y agrega una fila para cada uno
    usuarios.forEach(function(usuario) {
        agregarFilaTabla(usuario);
    });
}
