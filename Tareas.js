// Se agregan datos del dom 
const asignacion = document.getElementById('asignacion')
const agregar = document.getElementById('agregar')
const Lista = document.getElementById('Lista')

// funcion para las tareas 
agregar.addEventListener('click', function() {
    const tarea = asignacion.value;
// aqui se agrega las listas li 
    if (tarea != ''){

        const li = document.createElement('li')
        li.innerHTML = `
            ${tarea}
            <button class="eliminar">Eliminar</button>

            <button class="actualizar">Actualizar</button>
        `;

        // ahora se agrega el li a las listas
        Lista.appendChild(li);
        asignacion.value = '';

        // boton de eliminar
        const btnEli = li.querySelector('.eliminar');
        btnEli.addEventListener('click', function() {
            li.remove();
        });

        // boton de Actualizar
        const btnActu = li.querySelector('.actualizar');
        btnActu.addEventListener('click', function(){
            const editarTarea = prompt('Cual es tu nueva tarea? ', tarea)
            if (editarTarea){
                li.firstChild.textContent=editarTarea;
            }
        });
    } else{
        alert("ingresa una tarea")
    }
});
