
function CerrarRegist() {
    divBuscador.style.display = 'none';
}

function AgregarItem() {
    ifmRegist.src = '/NotasModifica/BuscadorPims';
    tituloModal.innerText = 'Buscar PIM';
    divBuscador.style.display = "block";
}

function GuardarDatos() {

    const _aceptar = function () {

        const _mensaje = "El registro se guardó satisfactoriamente.";

        parent.mensajeAlerta(_mensaje, "exito");
        var T = setTimeout(function () {
            parent.ActualizarVista();
            parent.CerrarNota();
            clearTimeout(T);
        }, 3000);

    }

    parent.mostrarConfirma("¿Está seguro que desea guardar los cambios.?", _aceptar);

}

async function CargarCombo(nombre, params, saved = true) {

    const _cboName = 'cbo' + nombre;
    const _actName = 'Get' + nombre;

    var _getData = async function () {
        const _auxUrl = '@Url.Action("X", "Data4Combo")';
        const _newUrl = _auxUrl.replace('X', _actName);
        if (params != null) { _newUrl += '/?' + params; }
        const _response = await fetch(_newUrl);
        return await _response.text();
    }

    var _data = null;

    if (saved == true) {
        _data = sessionStorage.getItem(_cboName);
        if ((_data == null) || (typeof (_data) == 'undefined')) {
            _data = await _getData();
            sessionStorage.setItem(_cboName, _data);
        }
    }
    else {
        _data = await _getData();
    }

    var _lista = _data.split('¬');

    var _cbo = crearCombo(_lista, _cboName, "Seleccione un item");

    return _cbo;

}


async function CargarEntidad(sel) {
    const _cbo = await CargarCombo("Entidades", null, true);
    _cbo.value = sel;
}

async function CargarTiposNota(sel) {
    const _cbo = await CargarCombo("TiposNota", null, true);
    _cbo.value = sel;
}


window.onload = async function () {

    configurarBotones();
    configurarCombos();

}

function configurarCombos() {
    CargarEntidad(0);
    CargarTiposNota(0)
}

function configurarBotones() {

    var _btnGuardar = parent.document.getElementById("btnGuardar");
    _btnGuardar.addEventListener("click", GuardarDatos);

    var _btnCerrar = document.getElementById("btnCerrar");
    _btnCerrar.addEventListener("click", CerrarRegist);

}



