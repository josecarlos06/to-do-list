const formulario = document.querySelector('#formulario');
const mensajes = document.querySelector('#mensajes');
let listaMensaje = []
eventListenner();
function eventListenner(){
    formulario.addEventListener('submit', agregarMensaje);
    mensajes.addEventListener('click', eliminarMensaje)
    document.addEventListener('DOMContentLoaded',()=>{
        listaMensaje = JSON.parse(localStorage.getItem('tareas')) || [];
        agregarHTML();
    })
}


function eliminarMensaje(e){
    if(e.target.classList.contains('btnEliminar')){
        const idMensaje = parseInt(e.target.getAttribute('data-id'));
        listaMensaje = listaMensaje.filter(tarea => tarea.id !== idMensaje);
        agregarHTML();
    }
}

function agregarMensaje(e){
    e.preventDefault();
    const mensaje = document.querySelector('#mensaje').value;
    if(mensaje === ''){
        mensajeError("El campo no puede estar vacio")
        return;
    }
    const infoMensaje = {
        id : Date.now(),
        fecha :moment().format('ll', new Date()),
        mensaje : mensaje
    }
    listaMensaje =[...listaMensaje,infoMensaje]
    agregarHTML();
    formulario.reset()
}

function mensajeError(mensaje){
    const parrafoError = document.createElement('p');
    parrafoError.textContent = mensaje;
    parrafoError.classList.add('error')
    const error = document.querySelectorAll('.error');
    if(error.length === 0){
        formulario.append(parrafoError)
    }
    setTimeout(()=>{
        parrafoError.remove();
    },3000)
}

function agregarHTML(){
    limpiarHTML();
    listaMensaje.forEach(tarea=>{
        const {mensaje, id,fecha } = tarea;
        const contenedor = document.createElement('div');
        contenedor.classList.add('mensaje__contenedor')
        contenedor.innerHTML = `
        <div class="mensaje-flex">
        <p class="parrafo">${mensaje}</p>
        <a href="#" data-id="${id}" class="btnEliminar bx bx-x"></a>
        </div>
        <p class="fecha">${fecha}</p>
        `
        mensajes.appendChild(contenedor)
    })
    sincronizarLocalstorage();
}

function sincronizarLocalstorage(){
    localStorage.setItem('tareas', JSON.stringify(listaMensaje))
}

function limpiarHTML(){
    while(mensajes.firstChild){
        mensajes.removeChild(mensajes.firstChild);
    }
}