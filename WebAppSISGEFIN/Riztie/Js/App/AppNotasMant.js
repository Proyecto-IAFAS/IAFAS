
var vista = "";
var controller = "";

window.onload = function () {

    vista = window.sessionStorage.getItem("Vista");
    controller = window.sessionStorage.getItem("Controller");

    configurarBotones();
    configurarCombos();

    BuscarNotas();
}

function configurarCombos() {

}

function configurarBotones() {
    btnNuevo.addEventListener("click", AgregarNota);
    btnCancelar.addEventListener("click", CerrarNota);
    btnConsultar.addEventListener("click", BuscarNotas)
}

function BuscarNotas() {
    var data = "";
    var anio = document.getElementById("txtAnio")?.value;
    data = anio;
    debugger
    Http.get("General/listarTabla?tbl=" + controller + vista + "&data=" + data, mostrarlistas);
}

function mostrarlistas(data) {
    if (data) {
        var lista = data.split("¬");
        grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
    }
}

function CerrarNota() {
    divRegistro.style.display = 'none';
}

function ActualizarVista() {
    mensajeAlerta("Actualizado", "exito");
}

function AgregarNota() {
    ifmRegist.src = '../NotasModifica/Registro/?act=1&idn=0';
    tituloModal.innerText = 'Agregar Nota';
    divRegistro.style.display = "block";
}

function ModificarNota() {
    ifmRegist.src = '../NotasModifica/Registro/?act=2&idn=1';
    tituloModal.innerText = 'Modificar Nota';
    divRegistro.style.display = "block";
}

