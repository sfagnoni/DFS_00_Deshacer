const botonSortear = document.querySelector('#draw-btn');
const contenedorBolillas = document.querySelector('#balls-container');
let bolillas = [];
let historico = [];

function obtenerBolillaAleatoria() {
    return Math.ceil(Math.random() * 9);
}

function crearBolilla(numero) {
    const bolilla = document.createElement('div');
    bolilla.className = 'ball';
    bolilla.textContent = numero;
    bolilla.title = 'Click para eliminar';
    bolilla.addEventListener('click', eliminarBolilla);
    return bolilla;
}

function eliminarBolilla(evento) {
    const bolilla = evento.currentTarget;
    bolilla.classList.add('removing');
    bolillas = bolillas.filter(b => b !== bolilla);//ver histórico de bolillas
    historico.push([...bolillas]);
    setTimeout(() => bolilla.remove(), 180);
}

function sortearBolilla() {
    const numero = obtenerBolillaAleatoria();
    const bolilla = crearBolilla(numero);
    bolillas.push(bolilla);//ver histórico de bolillas
    historico.push([...bolillas]); // Guardar el número sorteado en el histórico
    contenedorBolillas.appendChild(bolilla);
}

botonSortear.addEventListener('click', sortearBolilla);

window.addEventListener("keydown", (evento) => {
    //a continuación el ctrl + z elimina el último número agregado
    //la idea es modificar esto para que se deshaga la última acción
    if (evento.key === "z" && evento.ctrlKey) {
        historico.pop(); // Eliminar el último estado del histórico
        bolillas = historico[historico.length - 1]; // Recuperar el último estado de bolillas
        contenedorBolillas.innerHTML = '';
        bolillas.forEach(b => contenedorBolillas.appendChild(b));
        /* bolillas[bolillas.length - 1].classList.add('removing');
        setTimeout(() => {
            bolillas.pop();
            contenedorBolillas.innerHTML = '';
            bolillas.forEach(b => contenedorBolillas.appendChild(b));
        }, 180); */

    }
});