
var vista = "";
var controller = "";


window.onload = function () {

    vista = window.sessionStorage.getItem("Vista");
    controller = window.sessionStorage.getItem("Controller");

    configurarBotones();
    configurarCombos();

    BuscarDatos();
}

function configurarCombos() {

}

function configurarBotones() {

    var _btnTransf = parent.document.getElementById("btnTransf");
    _btnTransf.addEventListener("click", TranfDatos);


}


function CerrarBuscador() {
    divRegistro.style.display = 'none';
}

function MostrarDatos(data) {

    var lista = data.split("¬");

    grillaItem = new GrillaScroll(lista, "divGrilla", 100, 6, vista, controller, null, true, true, botones, 35, false, true, false, false);

}

function BuscarDatos() {

    let params = `${txtAñoEjec.value}|${txtDescrip.value}`;

    Http.get("General/listarTabla?tbl=BuscadorPIM&data=" + params, MostrarDatos);

}

function TranfDatos() {
    alert("tranfer..");
}

