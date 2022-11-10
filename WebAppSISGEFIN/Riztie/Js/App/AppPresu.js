var filaAnterior = null;
var idUsu = "";
var vista = "";
var controller = "";
var idCombos = [];
var listas = [];
var ayudas = [];
var formulario = [];
var idRegistro = "";
var operacion = 0;
var listaMetaItem_VG = [];
var listaSubMetaItem_v = [];

var listaGrupoItem = [];
var listaClaseItem = [];
var listaFamiliaItem = [];
var idPlan = 1;
var idCenCos, idMeta, idSubMeta, idActividad;
var listaActividad = [];

var listaMetaReporte = [];
var listaSubMetaReporte = [];
var listaActividadReporte = [];

window.onload = function () {
    getConfigMn();
    vista = window.sessionStorage.getItem("Vista");
    controller = window.sessionStorage.getItem("Controller");
    mostrarLoading("divLista");
    if (vista == "PIA") {
        idPlan = 1;
        getListarProgramacion(idPlan);
    }
    else if (vista == "ClasiGasto" || vista == "ClasiIngreso") {
        getListarClasificador(1);
    }
    else {
        getListar();
    }
    configurarBotones();
    configurarCombos();
}

function getListarProgramacion(idPlan) {
    var data = "";
    var anioFiscal = document.getElementById("txtAnioFiscal")?.value;
    data = anioFiscal + '|' + idPlan;
    Http.get("General/listarTabla/?tbl=" + controller + vista + "&data=" + data, mostrarlistaPlan);
}

function mostrarlistaPlan(rpta) {
    if (rpta) {
        var listas = rpta.split("¯");
        var lista = listas[0].split("¬");
        var listaCentroCosto = listas[1].split("¬");
        var listaMeta = listas[2].split("¬");
        listaSubMetaItem_v = listas[3].split("¬");
        listaActividad = listas[4].split("¬");

        var listaFuenteF = listas[5].split("¬");
        listaMetaReporte = listas[6].split("¬");
        listaSubMetaReporte = listas[7].split("¬");
        listaActividadReporte = listas[8].split("¬");

        grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, null, null, 25, false, null);
        crearCombo(listaCentroCosto, "cboCentroCosto", "Seleccione");
        crearCombo(listaMeta, "cboMeta", "Seleccione");

        //Combos para Reporte
        crearCombo(listaFuenteF, "cboFuenteRep", "Todos");
    }
}

function getListarClasificador(idEstado) {
    var data = "";
    Http.get("General/listarTabla?tbl=" + controller + vista + "&data=" + idEstado, mostrarlistas);
}

function getListar() {
    var data = "";
    var anio = document.getElementById("txtAnio")?.value;
    data = anio;
    Http.get("General/listarTabla?tbl=" + controller + vista + "&data=" + data, mostrarlistas);
}

function mostrarlistas(rpta) {
    if (rpta) {
        var listas = rpta.split("¯");
        var lista = listas[0].split("¬");

        if (vista == "Entidad") {
            var listaEmpresa = listas[1].split("¬");
            var listaEstado = listas[2].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaEmpresa, "cboEmpresa", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }

        else if (vista == "FuenteFto") {
            var listaEstado = listas[1].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }

        else if (vista == "Meta") {
            var listaEstado = listas[1].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }
        else if (vista == "SubMeta") {
            listaMetaItem_VG = listas[1].split("¬");
            var listaEstado = listas[2].split("¬");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaEstado, "cboEstado", "Seleccione");
            listarMetaItem();
        }

        else if (vista == "ClasiIngreso") {
            let listaTipo = listas[1].split("¬");
            var listaEstado = listas[2].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaTipo, "cboTipoBien", "Ninguno");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }
        else if (vista == "ClasiGasto") {
            let listaTipo = listas[1].split("¬");
            var listaEstado = listas[2].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaTipo, "cboTipoBien", "Ninguno");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }
        else if (vista == "CentroCosto") {
            var listaEntidad = listas[1].split("¬");
            var listaEstado = listas[2].split("¬");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaEntidad, "cboEntidad", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
            listarMetaItem();
        }
        else if (vista == "Actividad") {
            var listaMeta = listas[1].split("¬");
            listaSubMetaItem_v = listas[2].split("¬");
            var listaEstado = listas[3].split("¬");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaMeta, "cboMeta", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }

        else if (vista == "PCA") {
            var listaEntidad = listas[1].split("¬");
            var listaFinanciamiento = listas[2].split("¬");
            var listaMeta = listas[3].split("¬");
            listaSubMetaItem_v = listas[4].split("¬");
            var listaEstado = listas[5].split("¬");
            var listaPresup = listas[6].split("¬");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

            crearCombo(listaEntidad, "cboEntidad", "Seleccione");
            crearCombo(listaFinanciamiento, "cboFuenteFto", "Seleccione");
            listarSelect2Item(listaMeta, "cboMeta");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
            listarSubMetaItem();
            var pia = listaPresup[0].split("|")[0];
            totalsumAnho.innerText = "Total S/ : " + formatoNumeroDecimal(pia)
        }
        else if (vista == "MarcoPresu") {
            var listaPCA = listas[1].split('¬');
            var listaMeta = listas[2].split('¬');
            listaSubMetaItem_v = listas[3].split('¬');
            var listaClasificador = listas[4].split('¬');

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

            listarSubMetaItem();
            crearCombo(listaPCA, "cboPCA", "Seleccionar");
            crearCombo(listaMeta, "cboMeta", "Seleccionar");
            crearCombo(listaClasificador, "cboClasificador", "Seleccionar");
        }
        else if (vista == "FamiliaClasificador") {

            var listaTipo = listas[1].split("¬");
            listaGrupoItem = listas[2].split("¬");
            listaClaseItem = listas[3].split("¬");
            listaFamiliaItem = listas[4].split("¬");
            var listaTipoUso = listas[5].split("¬");
            var listaClasificador = listas[6].split("¬");
            var listaEstado = listas[7].split("¬");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

            crearCombo(listaTipo, "cboTipoBien", "Seleccione");
            listarGrupoItem();
            crearCombo(listaTipoUso, "cboTipoUso", "Seleccione");
            crearCombo(listaClasificador, "cboClasificador", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");

            crearCombo(listaTipoUso, "cboTipoUsoInact", "Seleccione");
            crearCombo(listaTipo, "cboTipoBienInact", "Seleccione");
        }
        else {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
        }
    }
}

function listarMetaItem() {
    var nRegistros = listaMetaItem_VG.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre;

    for (var i = 0; i < nRegistros; i++) {
        campos = listaMetaItem_VG[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        contenido += "<option value='";
        contenido += idCodigo;
        contenido += "'>";
        contenido += nombre;
        contenido += "</option>";

    }
    var cbo = document.getElementById("cboMeta");
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
    var cbo = document.getElementById("cboPadre");
    if (cbo != null) {
        if (listaMetaItem_VG != "") {
            cbo.innerHTML = contenido;
        }
    }
}

function listarSelect2Item(lista, idCombo) {
    var nRegistros = lista.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre;
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        contenido += "<option value='";
        contenido += idCodigo;
        contenido += "'>";
        contenido += nombre;
        contenido += "</option>";
    }
    var cbo = document.getElementById(idCombo);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function listarSubMetaItem() {
    var idMeta = cboMeta.value;
    var nRegistros = listaSubMetaItem_v.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre, idxMetaItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaSubMetaItem_v[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxMetaItem = campos[2];
        if (idxMetaItem == idMeta) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboSubMeta");
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function listarActividadItem() {
    var idMeta = cboMeta.value;
    var idSubMeta = cboSubMeta.value;
    var nRegistros = listaActividad.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre, idxMetaItem, idxSubMetaItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaActividad[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxMetaItem = campos[2];
        idxSubMetaItem = campos[3];
        if (idxMetaItem == idMeta && idxSubMetaItem == idSubMeta) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboActividad");
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function listarMetaItemReporte() {
    var idFuenteF = cboFuenteRep.value;
    var nRegistros = listaMetaReporte.length;
    var contenido = "<option value=''>Todos</option>";
    var campos, idCodigo, nombre, idxMetaItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaMetaReporte[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxFuenteFItem = campos[2];
        if (idxFuenteFItem == idFuenteF) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboMetaRep");
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function listarSubMetaItemReporte() {
    var idFuenteF = cboFuenteRep.value;
    var idMeta = cboMetaRep.value;
    var nRegistros = listaSubMetaReporte.length;
    var contenido = "<option value=''>Todos</option>";
    var campos, idCodigo, nombre, idxMetaItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaSubMetaReporte[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxFuenteF = campos[2];
        idxMetaItem = campos[3];
        if (idxMetaItem == idMeta && idxFuenteF == idFuenteF) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboSubMetaRep");
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function listarActividadItemReporte() {
    var idFuenteF = cboFuenteRep.value;
    var idMeta = cboMetaRep.value;
    var idSubMeta = cboSubMetaRep.value;
    var nRegistros = listaActividadReporte.length;
    var contenido = "<option value=''>Todos</option>";
    var campos, idCodigo, nombre, idxMetaItem, idxSubMetaItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaActividadReporte[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxFuenteF = campos[2];
        idxMetaItem = campos[3];
        idxSubMetaItem = campos[4];
        if (idxFuenteF == idFuenteF && idxMetaItem == idMeta && idxSubMetaItem == idSubMeta) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboActividadRep");
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function grabarDatos() {
    var data = ""
    var frm = new FormData();
    data = obtenerDatosGrabar("Popup");

    if (vista == "PIA") {
        var txtAnhoFiscal = document.getElementById("txtAnioFiscal").value;
        data += "|" + txtAnhoFiscal + "|" + idPlan;
        frm.append("data", data);
        Http.post("General/guardar/?tbl=" + controller + vista, mostrarGrabarPIA, frm);
    }
    else {
        var anio = document.getElementById("txtAnio")?.value;
        data += "¯" + anio;
        frm.append("data", data);
        Http.post("General/guardar/?tbl=" + controller + vista, mostrarGrabar, frm);
    }
}

function obtenerDatosGrabar(clase) {
    var data = "";
    var controles = document.getElementsByClassName(clase);
    var control;
    var nControles = controles.length;
    for (var j = 0; j < nControles; j++) {
        control = controles[j];
        switch (control.tagName) {
            case "INPUT":
                if (control.id.substr(0, 3) == "txt") data += control.value;
                if (control.id.substr(0, 3) == "num") data += control.value;
                if (control.id.substr(0, 3) == "num") data += control.value;
                if (control.id.substr(0, 3) == "dtt") {
                    if (control.value != "") {
                        var dFecha = control.value.split("-");
                        data += dFecha[2] + "-" + dFecha[1] + "-" + dFecha[0];
                    }
                    else { data += ""; }
                }
                if (control.id.substr(0, 3) == "tim") data += control.value;
                if (control.id.substr(0, 3) == "chk") data += (control.checked ? "1" : "0");
                if (control.id.substr(0, 3) == "opt") data += (control.checked ? "1" : "0");
                if (control.id.substr(0, 3) == "dtg") data += (control.checked ? "1" : "0");
                break;
            case "SELECT":
                data += control.value;
                break;
            case "TEXTAREA":
                data += control.value;
                break;
            case "IMG":
                data += control.src.replace("data:image/jpeg;base64,", "");
                break;
        }
        data += "|";
    }
    data = data.substr(0, data.length - 1);

    return data;
}

function mostrarGrabarPIA(rpta) {
    var mensajeResul = [];
    if (rpta) {
        listas = rpta.split("¯")
        lista = listas[0].split("¬");
        mensajeResul = listas[1].split("|");
        var tipo = mensajeResul[0];
        var mensaje = mensajeResul[1];
        divPopupContainer.style.display = 'none';
        grilla = new GrillaScroll(lista, "divListaMeta", 100, 6, vista, controller, null, null, null, botones, 25, false, null);
        limpiarPresupuesto();
        if (tipo == 'A') {
            Swal.fire({
                title: 'Finalizado!',
                text: mensaje,
                icon: 'success',
                showConfirmButton: true,
                timer: 2000
            })
            alerta = 'success';
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: mensaje,
                icon: 'error',
                showConfirmButton: true,
                timer: 2000
            })
        }
    }
    else {
        mostrarMensaje("No se realizó el registro", "error")
    }

    btnGuardar.innerHTML = "<i class='fa fa-save'></i> Grabar";
    btnGuardar.disabled = false;
}

function mostrarGrabar(rpta) {
    var mensajeResul = [];
    if (rpta) {
        listas = rpta.split("¯")
        lista = listas[0].split("¬");
        mensajeResul = listas[1].split("|");
        var tipo = mensajeResul[0];
        var mensaje = mensajeResul[1];
        divPopupContainer.style.display = 'none';
        grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

        if (vista == "PCA") {
            var listaPresup = listas[2].split("¬");
            var pia = listaPresup[0].split("|")[0];
            totalsumAnho.innerText = "Total S/ : " + formatoNumeroDecimal(pia)
        }

        var cbo = document.getElementById("cboPadre");
        if (cbo != null) {
            var listaPadre = listas[2].split("¬");
            crearCombo(listaPadre, "cboPadre", "Ninguno");
        }

        if (tipo == 'A') {
            Swal.fire({
                title: 'Finalizado!',
                text: mensaje,
                icon: 'success',
                showConfirmButton: true,
                timer: 2000
            })
            alerta = 'success';
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: mensaje,
                icon: 'error',
                showConfirmButton: true,
                timer: 2000
            })
        }
    }
    else {
        mostrarMensaje("No se realizó el registro", "error")
    }

    btnGuardar.innerHTML = "<i class='fa fa-save'></i> Grabar";
    btnGuardar.disabled = false;
}

function seleccionarBoton(idGrilla, idRegistro, idBoton) {
    if (idGrilla == "divLista" || idGrilla == "divListaMeta") {
        if (idBoton == "Editar") {
            let tituloModal = document.getElementById("tituloModal");
            if (tituloModal != null) {
                tituloModal.innerText = "Actualizar Registro";
            }
            editarRegistro(idRegistro);
        }
        if (idBoton == "Eliminar") {
            eliminarRegistro(idRegistro)
        }
    }
}

function editarRegistro(id) {
    Http.get("General/obtenerTabla/?tbl=" + controller + vista + '&id=' + id, mostrarRegistro);
}

function eliminarRegistro(id) {
    var data = "";
    data = id;
    if (vista == "PCA") {
        var txtAnhoFiscal = document.getElementById("txtAnioFiscal").value;
        data += "|" + txtAnhoFiscal;
    }
    var txtAnio = document.getElementById("txtAnio");
    if (txtAnio != null) {
        data += "|" + txtAnio.value;
    }

    var frm = new FormData();
    frm.append("data", data);

    Swal.fire({
        title: '¿Desea anular el registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value) {
            Http.post("General/eliminar/?tbl=" + controller + vista, mostrarEliminar, frm);
        }
    })
}

function mostrarRegistro(rpta) {
    if (rpta) {
        var campos = rpta.split("|");
        var controlesSelectSearch = document.getElementsByClassName("SelectSearch");
        var nControlesSelectSearch = controlesSelectSearch.length;
        var cboEstado = document.getElementById("cboEstado");
        if (cboEstado != null) { cboEstado.disabled = false };
        var cboEmpresa = document.getElementById("cboEmpresa");
        if (cboEmpresa != null) { cboEmpresa.disabled = false };
        var select2cboPadre = document.getElementById("select2-cboPadre-container");
        if (select2cboPadre != null) select2cboPadre.innerHTML = "Seleccione";

        if (vista == "PCA") {
            //txtIdRegistro.value = campos[0];
            //txtAnho.value = campos[1];
            //cboEntidad.value = campos[2];
            //cboFuenteFto.value = campos[3];
            cboMeta.value = campos[4];
            listarSubMetaItem();
            cboSubMeta.value = campos[5];
            document.getElementById('select2-cboSubMeta-container').innerHTML = cboSubMeta.options[cboSubMeta.selectedIndex].text;
            //txtPia.value = campos[6];
            //txtPim.value = campos[7];
            //txtEjecutado.value = campos[8];
            //txtDisponible.value = campos[9];
            //cboEstado.value = campos[10];
        }
        else if (vista == "MarcoPresu") {
            txtIdRegistro.value = campos[0];
            cboPCA.value = campos[1];
            document.getElementById('select2-cboPCA-container').innerHTML = cboPCA.options[cboPCA.selectedIndex].text;
            cboMeta.value = campos[2];
            document.getElementById('select2-cboMeta-container').innerHTML = cboMeta.options[cboMeta.selectedIndex].text;
            listarSubMetaItem();
            cboSubMeta.value = campos[3];
            document.getElementById('select2-cboSubMeta-container').innerHTML = cboSubMeta.options[cboSubMeta.selectedIndex].text;
            cboClasificador.value = campos[4];
            document.getElementById('select2-cboClasificador-container').innerHTML = cboClasificador.options[cboClasificador.selectedIndex].text;
            console.log(rpta);
            var divPopupContainer = document.getElementById("divPopupContainer");
            if (divPopupContainer != null) { divPopupContainer.style.display = 'block'; };
            return;
        }
        else if (vista == "Actividad") {
            txtIdRegistro.value = campos[0];
            cboMeta.value = campos[1];
            document.getElementById('select2-cboMeta-container').innerHTML = cboMeta.options[cboMeta.selectedIndex].text;
            listarSubMetaItem();
            cboSubMeta.value = campos[2];
            document.getElementById('select2-cboSubMeta-container').innerHTML = cboSubMeta.options[cboSubMeta.selectedIndex].text;
            txtCodigo.value = campos[3];
            txtNombre.value = campos[4];
            cboEstado.value = campos[5];
            var divPopupContainer = document.getElementById("divPopupContainer");
            if (divPopupContainer != null) { divPopupContainer.style.display = 'block'; };
            return;
        }
        else if (vista == "FamiliaClasificador") {

            txtIdRegistro.value = campos[0];
            txtAnioPerido.value = campos[1];
            cboTipoUso.value = campos[2];
            cboTipoBien.value = campos[3];
            listarGrupoItem();
            cboGrupo.value = campos[4];
            document.getElementById('select2-cboGrupo-container').innerHTML = cboGrupo.options[cboGrupo.selectedIndex].text;
            listarClaseItem();
            cboClase.value = campos[5];
            document.getElementById('select2-cboClase-container').innerHTML = cboClase.options[cboClase.selectedIndex].text;
            listarFamiliaItem();
            cboFamilia.value = campos[6];
            document.getElementById('select2-cboFamilia-container').innerHTML = cboClase.options[cboClase.selectedIndex].text;
            cboClasificador.value = campos[7];
            document.getElementById('select2-cboClasificador-container').innerHTML = cboClasificador.options[cboClasificador.selectedIndex].text;
            cboEstado.value = campos[8];
            document.getElementById("divPopupContainer").style.display = 'block';
            return;
        }

        var divPopupContainer = document.getElementById("divPopupContainer");
        if (divPopupContainer != null) { divPopupContainer.style.display = 'block'; };
        var controles = document.getElementsByClassName("Popup");
        var nControles = controles.length;
        var control;
        var tipo;
        var subCampos;
        for (var j = 0; j < nControles; j++) {
            control = controles[j];
            control.style.borderColor = ""
            tipo = control.id.substr(0, 3);
            if (tipo == "txt" || tipo == "num" || tipo == "tta" || tipo == "tim") { control.value = campos[j]; }
            else if (tipo == "dtt") {
                if (campos[j] == '01/01/1900') {
                    control.value = "";
                } else {
                    var dFecha = campos[j].split("/");
                    control.value = dFecha[2] + "-" + dFecha[1] + "-" + dFecha[0];
                }
            }
            else if (tipo == "cbo") {
                subCampos = campos[j].split("-");
                if (subCampos[0] == 0) {
                    control.value = '';
                }
                else {
                    control.value = subCampos[0];
                    if (nControlesSelectSearch > 0) {
                        var controlSelect = 'select2-' + control.id + '-container';
                        var cboControlSelect = document.getElementById(controlSelect);
                        if (cboControlSelect != null) {
                            var selected = control.options[control.selectedIndex].text;
                            cboControlSelect.innerHTML = selected;
                        }
                    }
                }
            }
            else if (tipo == "img") {
                control.src = "data:image/jpeg;base64," + campos[j];
            }
            else if (tipo == "chk" || tipo == "opt") {
                control.checked = (campos[j] == "1")
            }
            else if (tipo == "dtg") {
                if (campos[j] == 1) {
                    $('#' + control.id).bootstrapToggle('on')
                }
                else {
                    $('#' + control.id).bootstrapToggle('off')
                }
            }
        }

    }
}

function configurarBotones() {
    var btnTabBasico = document.getElementById("btnTabBasico");
    if (btnTabBasico != null) btnTabBasico.onclick = function () {
        limpiarPresupuesto();
        idPlan = btnTabBasico.getAttribute('data-id');
        getListarProgramacion(idPlan);
    }

    var btnTabOnconaval = document.getElementById("btnTabOnconaval");
    if (btnTabOnconaval != null) btnTabOnconaval.onclick = function () {
        limpiarPresupuesto();
        idPlan = btnTabOnconaval.getAttribute('data-id');
        getListarProgramacion(idPlan);
    }

    var btnTabSegundaCapa = document.getElementById("btnTabSegundaCapa");
    if (btnTabSegundaCapa != null) btnTabSegundaCapa.onclick = function () {
        limpiarPresupuesto();
        idPlan = btnTabSegundaCapa.getAttribute('data-id');
        getListarProgramacion(idPlan);
    }

    var btnTabCopagos = document.getElementById("btnTabCopagos");
    if (btnTabCopagos != null) btnTabCopagos.onclick = function () {
        limpiarPresupuesto();
        idPlan = btnTabCopagos.getAttribute('data-id');
        getListarProgramacion(idPlan);
    }

    var optActivo = document.getElementById("optActivo");
    if (optActivo != null) optActivo.onclick = function () {
        getListarClasificador(1);
    }

    var optInactivo = document.getElementById("optInactivo");
    if (optInactivo != null) optInactivo.onclick = function () {
        getListarClasificador(2);
    }

    var btnNuevo = document.getElementById("btnNuevo");
    if (btnNuevo != null) btnNuevo.onclick = function () {
        divPopupContainer.style.display = 'block';
        limpiarForm("Popup");

        let tituloModal = document.getElementById("tituloModal");
        if (tituloModal != null) {
            tituloModal.innerText = "Nuevo Registro";
        }

        var cboEmpresa = document.getElementById("cboEmpresa");
        if (cboEmpresa != null) {
            cboEmpresa.value = 1;
            cboEmpresa.disabled = true;
        }

        var cboEstado = document.getElementById("cboEstado");
        if (cboEstado != null) {
            cboEstado.value = 1;
            cboEstado.disabled = true;
        }
        var select2cboMeta = document.getElementById("select2-cboMeta-container");
        if (select2cboMeta != null) select2cboMeta.innerHTML = "Seleccione";

        var select2cboPadre = document.getElementById("select2-cboPadre-container");
        if (select2cboPadre != null) select2cboPadre.innerHTML = "Seleccione";

        var select2cboSubMeta = document.getElementById("select2-cboSubMeta-container");
        if (select2cboSubMeta != null) select2cboSubMeta.innerHTML = "Seleccione";

        var dtgFinal = document.getElementById("dtgEsFinal");
        if (dtgFinal != null) {
            $('#dtgEsFinal').bootstrapToggle('off')
        }

        if (vista == "PCA") {
            txtEjecutado.value = 0;
            txtDisponible.value = 0;
        }

        var txtAnioPerido = document.getElementById("txtAnioPerido");
        if (txtAnioPerido != null) {
            var anio = txtAnioPerido.getAttribute('value');
            txtAnioPerido.value = anio;
        }
        var select2cboClasificador = document.getElementById("select2-cboClasificador-container");
        if (select2cboClasificador != null) select2cboClasificador.innerHTML = "Seleccione";

        var select2cboPCA = document.getElementById("select2-cboPCA-container");
        if (select2cboPCA != null) select2cboPCA.innerHTML = "Seleccione";

        var select2cboGrupo = document.getElementById("select2-cboGrupo-container");
        if (select2cboGrupo != null) select2cboGrupo.innerHTML = "Seleccione";
        var select2cboOClase = document.getElementById("select2-cboClase-container");
        if (select2cboOClase != null) select2cboOClase.innerHTML = "Seleccione";
        var select2cboFamilia = document.getElementById("select2-cboFamilia-container");
        if (select2cboFamilia != null) select2cboFamilia.innerHTML = "Seleccione";

        var cboTipoUso = document.getElementById("cboTipoUso");
        if (cboTipoUso != null) {
            cboTipoUso.value = 2;
        }
    }

    var btnCierre = document.getElementById("btnCierre");
    if (btnCierre != null) btnCierre.onclick = function () {
        var anio = txtAnioFiscal.value;

        Swal.fire({
            title: '¿Desea realizar el cierre del PIA Año ' + anio +'?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                alert('cerrando PIA');
                //grabarDatos();

                //Swal.fire({
                //    title: 'Procesando...',
                //    allowEscapeKey: false,
                //    allowOutsideClick: false,
                //    onOpen: () => {
                //        Swal.showLoading()
                //    }
                //})
            }
        })
    }

    var btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar != null) btnGuardar.onclick = function () {
        var validar = false;

        if (vista == "PedidoCompra" && validarPedido() == true) {
            validar = true;
        }
        else if (validarInformacion("Reque") == true) {
            validar = true;
        }
        if (validar == true) {
            Swal.fire({
                title: '¿Desea grabar la información?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.value) {
                    //if (vista == "PedidoCompra") {
                    //    grabarPedido();
                    //}
                    //else
                    //{
                    //    grabarDatos();
                    //}
                    grabarDatos();

                    Swal.fire({
                        title: 'Procesando...',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        onOpen: () => {
                            Swal.showLoading()
                        }
                    })
                }
            })
        }
    }

    var btnCancelar = document.getElementById("btnCancelar");
    if (btnCancelar != null) btnCancelar.onclick = function () {
        divPopupContainer.style.display = 'none';
    }
    var btnCancelarForm1 = document.getElementById("btnCancelarForm1");
    if (btnCancelarForm1 != null) btnCancelarForm1.onclick = function () {
        divPopupContainerForm1.style.display = 'none';
    }
    var btnListado = document.getElementById("btnListado");
    if (btnListado != null) btnListado.onclick = function () {
        var data = "";
        if (vista == "FamiliaClasificador") {
            //limpiarForm("PopupInact");
            cboTipoUsoInact.value = 2;
            cboTipoBienInact.value = "B";
            spnLoadData.style.display = "block";
            listaInactivo.style.display = 'none';
            data = txtAnioPeridoInact.value + '|' + cboTipoUsoInact.value + '|' + cboTipoBienInact.value + '||2';
            //Http.get("General/listarTabla?tbl=" + controller + vista + "Estado" + "&data=" + data, function (response) {
            //    if (response) {
            //        var listas = response.split("¯");
            //        var lista = listas[0].split("¬");
            //        grillaItems = new GrillaScroll(lista, "divListaInactivo", 1000, 3, vista, controller, null, null, null, null, 25, false, true);
            //        spnLoadData.style.display = 'none';
            //        listaInactivo.style.display = 'block';
            //    }
            //});
            divPopupContainerForm1.style.display = 'block';
        }
    }

    var btnConsultar = document.getElementById("btnConsultar");
    if (btnConsultar != null) btnConsultar.onclick = function () {
        if (vista == "PCA") {
            getListarProgramacion();
        }
        else {
            getListar();
        }
    }

    var btnImprimir = document.getElementById("btnImprimir");
    if (btnImprimir != null) btnImprimir.onclick = function () {

        if (vista == "PIA") {
            btnSeleccionarOpcionReporte.disabled = false;
            btnSeleccionarOpcionReporte.innerText = "Generar";

            txtAnioRep.value = new Date().getFullYear();
            cboFuenteRep.value = "";
            cboMetaRep.value = "";
            cboSubMetaRep.value = "";
            cboActividadRep.value = "";

            seleccionarControlSelect2(cboFuenteRep, 'Todos');
            seleccionarControlSelect2(cboMetaRep, 'Todos');
            seleccionarControlSelect2(cboSubMetaRep, 'Todos');
            seleccionarControlSelect2(cboActividadRep, 'Todos');
        }

        divPopupContainerOpcionReporte.style.display = 'block';
    }

    var btnCancelarOpcionReporte = document.getElementById("btnCancelarOpcionReporte");
    if (btnCancelarOpcionReporte != null) btnCancelarOpcionReporte.onclick = function () {
        divPopupContainerOpcionReporte.style.display = 'none';
    }

    var btnSeleccionarOpcionReporte = document.getElementById("btnSeleccionarOpcionReporte");
    if (btnSeleccionarOpcionReporte != null) btnSeleccionarOpcionReporte.onclick = function () {
        btnSeleccionarOpcionReporte.innerHTML = "Generando <i class='fa fa-circle-o-notch fa-spin' style='color:white'></i>";
        btnSeleccionarOpcionReporte.disabled = true;

        if (vista == 'PIA') {
            var data = obtenerDatosGrabar("PopupRep");
            var datos = data.split('|');

            var anioRep = datos[0];
            var fuenteRep = datos[1];
            var metaRep = datos[2];
            var subMetaRep = datos[3];
            var actividadRep = datos[4];

            var url = location.origin;
            var idReporte = 20;
            var params = anioRep;

            if (fuenteRep) {
                params = params + '|' + fuenteRep;
                idReporte = 21;
            }
            if (metaRep) {
                params = params + '|' + metaRep;
                idReporte = 22;
            }
            if (subMetaRep) {
                params = params + '|' + subMetaRep;
                idReporte = 23;
            }
            if (actividadRep) {
                params = params + '|' + actividadRep;
                idReporte = 24;
            }

            url = url + '/Reportes/ShowRpt/?id=' + idReporte + '&par=' + params + '&r=1'
            console.log(url);

            ifrmVistaPrevia.src = url;

            document.getElementById("divPopupContainerReporte").style.display = 'block';

            btnSeleccionarOpcionReporte.innerHTML = "<i class='fa fa-search'></i> Ver Reporte";
            btnSeleccionarOpcionReporte.disabled = false;
        }
    }

    var btnCancelarReporte = document.getElementById("btnCancelarReporte");
    if (btnCancelarReporte != null) btnCancelarReporte.onclick = function () {
        divPopupContainerReporte.style.display = 'none';
    }
}

function configurarCombos() {

    var cboMeta = document.getElementById("cboMeta");
    if (cboMeta != null) cboMeta.onchange = function () {
        listarSubMetaItem();
    }

    var cboSubMeta = document.getElementById("cboSubMeta");
    if (cboSubMeta != null) cboSubMeta.onchange = function () {
        listarActividadItem();
    }

    var cboActividad = document.getElementById("cboActividad");
    if (cboActividad != null) cboActividad.onchange = function () {
        listarClasificadorItem();
    }


    var cboFuenteRep = document.getElementById("cboFuenteRep");
    if (cboFuenteRep != null) cboFuenteRep.onchange = function () {
        listarMetaItemReporte();
        listarSubMetaItemReporte();
        listarActividadItemReporte();
    }

    var cboMetaRep = document.getElementById("cboMetaRep");
    if (cboMetaRep != null) cboMetaRep.onchange = function () {
        listarSubMetaItemReporte();
        listarActividadItemReporte();
    }

    var cboSubMetaRep = document.getElementById("cboSubMetaRep");
    if (cboSubMetaRep != null) cboSubMetaRep.onchange = function () {
        listarActividadItemReporte();
    }

    var cboTipoBien = document.getElementById("cboTipoBien");
    if (cboTipoBien != null) cboTipoBien.onchange = function () {
        listarGrupoItem();
    }
    var cboGrupo = document.getElementById("cboGrupo");
    if (cboGrupo != null) cboGrupo.onchange = function () {
        listarClaseItem();
    }

    var cboClase = document.getElementById("cboClase");
    if (cboClase != null) cboClase.onchange = function () {
        listarFamiliaItem();
    }

}

function mostrarEliminar(rpta) {
    var mensajeResul = [];
    if (rpta) {
        listas = rpta.split("¯")
        lista = listas[0].split("¬");
        mensajeResul = listas[1].split("|");
        var tipo = mensajeResul[0];
        var mensaje = mensajeResul[1];
        grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, null, botones, 38, false, null);

        var cbo = document.getElementById("cboPadre");
        if (cbo != null) {
            var listaPadre = listas[2].split("¬");
            crearCombo(listaPadre, "cboPadre", "Ninguno");
        }

        if (tipo == 'A') {
            Swal.fire({
                title: 'Eliminado!',
                text: mensaje,
                icon: 'success',
                showConfirmButton: true,
                timer: 2000
            })
        }
        else {
            Swal.fire({
                title: 'Advertencia!',
                text: mensaje,
                icon: 'warning',
                showConfirmButton: true,
                timer: 2000
            })
        }
    }
    else {
        mostrarMensaje("No se proceso el registro - verifique por favor", "error");
    }
}

function seleccionarFila(fila, id, prefijo) {
    idRegistro = id;
    window["id" + prefijo] = id;
    if (window["fila" + prefijo] != null) window["fila" + prefijo].className = "FilaDatos";
    fila.className = "FilaSeleccionada";
    window["fila" + prefijo] = fila;

    if (vista == 'PIA') {
        if (prefijo == "divLista") {
            var data = "";
            var anioFiscal = document.getElementById("txtAnioFiscal")?.value;
            limpiarPresupuesto();
            idCenCos = idRegistro
            data = anioFiscal + '|' + idPlan + '|' + idCenCos;
            Http.get("General/listarTabla?tbl=" + controller + vista + "Meta&data=" + data, function (response) {
                if (response) {
                    var lista = response.split("¬");
                    grillaItems = new GrillaScroll(lista, "divListaMeta", 100, 6, vista, controller, null, null, null, botones, 25, false, null);
                }
            });
        }
        else if (prefijo == "divListaMeta") {
            var data = "";
            var codigoclasificador = fila.childNodes[5].innerHTML;
            var data = idRegistro + '|' + codigoclasificador
            Http.get("General/listarTabla?tbl=" + controller + vista + "ClasificadorDetalle&data=" + data, function (datos) {
                if (datos) {
                    var listas = datos.split("¯");
                    var camposPresu = listas[0].split("|");
                    var camposClasi = listas[1].split("|");

                    lblPlanSalud.innerHTML = camposPresu[0];
                    lblCentroCosto.innerHTML =camposPresu[1];
                    lblMeta.innerHTML =camposPresu[2];
                    lblSubMeta.innerHTML =camposPresu[3];
                    lblActividad.innerHTML =camposPresu[4];

                    /*DETALLE CLASIFICADOR*/ 
                    lblTipo.innerHTML = camposClasi[0];
                    lblGenerica.innerHTML =camposClasi[1];
                    lblSubGenerica1.innerHTML = camposClasi[2];
                    lblSubGenerica2.innerHTML = camposClasi[3];
                    lblSubEspecifica1.innerHTML =camposClasi[4];
                    lblSubEspecifica2.innerHTML =camposClasi[5];
                }
            });

        }
    }
}

function limpiarPresupuesto() {
    divListaMeta.innerHTML = "";
    var controles = document.getElementsByClassName("Lectura");
    var nControles = controles.length;
    var control;
    for (var i = 0; i < nControles; i++) {
        control = controles[i];
        control.innerHTML = "";
    }
}

function listarClasificadorItem() {
    var data = "";
    Http.get("General/listarTabla?tbl=" + controller + vista + "ClasificadorActivar&data=" + data, function (datos) {
        if (datos) {
            var lista = datos.split("¬");
            crearCombo(lista, "cboClasificador", "Seleccionar");
        }
    });
}

function listarGrupoItem() {
    var idTipoItem = cboTipoBien.value;
    var nRegistros = listaGrupoItem.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre, idxTipoItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaGrupoItem[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxTipoItem = campos[2];
        if (idxTipoItem == idTipoItem) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboGrupo");
    if (cbo != null) {
        cbo.innerHTML = contenido;
        listarClaseItem();
    }
}

function listarClaseItem() {
    var idTipoItem = cboTipoBien.value;
    var idGrupoItem = cboGrupo.value;
    var nRegistros = listaClaseItem.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre, idxTipoItem, idxGrupoItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaClaseItem[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxTipoItem = campos[2];
        idxGrupoItem = campos[3];
        if (idxTipoItem == idTipoItem && idxGrupoItem == idGrupoItem) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboClase");
    if (cbo != null) {
        cbo.innerHTML = contenido;
        listarFamiliaItem();
    }
}

function listarFamiliaItem() {
    var idTipoItem = cboTipoBien.value;
    var idGrupoItem = cboGrupo.value;
    var idClaseItem = cboClase.value;
    var nRegistros = listaFamiliaItem.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre, idxTipoItem, idxGrupoItem, idxClaseItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaFamiliaItem[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxTipoItem = campos[2];
        idxGrupoItem = campos[3];
        idxClaseItem = campos[4];
        if (idxTipoItem == idTipoItem && idxGrupoItem == idGrupoItem && idxClaseItem == idClaseItem) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboFamilia");
    if (cbo != null) cbo.innerHTML = contenido;
}

function mostrarClasificadorItem(rpta) {
    var contenido = "";
    // tbDetallePedido.innerHTML = "";
    var lista = rpta.split('¬');
    var nRegistros = lista.length;
    var campos = [];
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("|");
        contenido += "<tr>";
        contenido += "<td style='display:none'>";
        contenido += campos[0];
        contenido += "</td> ";
        contenido += "<td style='vertical-align:top'>";
        contenido += campos[1];
        contenido += "</td> ";
        contenido += "<td style='max-width:600px;white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -o-pre-wrap;'>";
        contenido += campos[2];
        contenido += "</td> ";
        contenido += "<td style='vertical-align:top;'>";
        contenido += "<input type='number' style='text-align:right'";
        //onkeyup = 'validarCantidad(this,\"";
        //contenido += campos[7]
        //contenido += "\",\"";
        //contenido += campos[8];
        //contenido += "\");' 
        contenido += "min = 1 value = ";
        contenido += campos[3];
        contenido += "></td> ";
        contenido += "</tr>";
    }
    // divListaClasificadorActivar.innerHTML = contenido;
    tbDetalleClasificador.innerHTML = contenido;
    // spnNroItems.innerHTML = 'Items: ' + nRegistros;
    //configurarEnterCantidad(tbDetallePedido, 8);
}

function seleccionarControlSelect2(control, texto) {
    var controlSelect = 'select2-' + control.id + '-container';
    var cboControlSelect = document.getElementById(controlSelect);
    if (cboControlSelect != null) {
        var selected = control.options[control.selectedIndex]?.text;
        if (selected)
            cboControlSelect.innerHTML = selected;
        else
            cboControlSelect.innerHTML = texto ? texto : "Seleccione";
    }
}