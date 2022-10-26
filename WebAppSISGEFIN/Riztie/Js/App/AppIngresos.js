﻿////"use strict";
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
var listaOficina_VG = [];
var listaUbigeo = [];
var listaSubCuentaItem = [];
var dataImport = "";
var dataCab = "";
var dataDeta = "";
var base64;
var tipoProceso;

window.onload = function () {
    getConfigMn();
    vista = window.sessionStorage.getItem("Vista");
    controller = window.sessionStorage.getItem("Controller");
    mostrarLoading("divLista");
    imgToBase64('/Riztie/Images/logoEmpresa.png', function (base64) {
        base64Img = base64;
    });
    if (vista == "Recaudacion") {
        tipoProceso = "C";
        getListarRecaudacion('1');

    }
    else if (vista == "EstadoCuenta") {

    }
    else if (vista == "Reporte") {
        getListarReport();
    }
    else {
        getListar();
    }

    var fupExcel = document.getElementById("fupExcel");
    if (fupExcel != null) fupExcel.onchange = function () {
        snpnombrearchivo.innerHTML = document.getElementById('fupExcel').files[0].name;
    }

    configurarBotones();
    configurarCombos();
    configurarConsultas();

}

function NumCheck(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
    // 0-9
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        regexp = /^\d+(\.\d{0,2})?$/;
        return (regexp.test(field.value))
    }
    // .
    //if (key == 46) {
    //    if (field.value == "") return false
    //    regexp = /^[0-9]+$/
    //    return regexp.test(field.value)
    //}

    return false
}

function doubleCheck(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
    // 0-9
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        regexp = /^\d+(\.\d{0,2})?$/;
        return (regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    return false
}
function getListarReport() {
    var data = "";
    var txtAnio = document.getElementById("txtAnio");
    if (txtAnio != null) {
        data = txtAnio.value;
    }
    Http.get("General/obtenerReporteId?tbl=" + controller + "ReciboIngresoVentas&id=" + data, function (response) {
        if (response) {
            var listas = response.split("¯");
            var lista = listas[1].split("¬");
            grilla= new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, null, 38, false, null);
        }
    });
}

function getListar() {
    var data = "";
    var txtAnio = document.getElementById("txtAnio");
    if (txtAnio != null) {
        data = txtAnio.value;
    }
    if (vista == "ReciboIngreso") {
        data = txtFechaInicio.value + '|' + txtFechaFinal.value;
    }

    Http.get("General/listarTabla?tbl=" + controller + vista + "&data=" + data, mostrarlistas);
}

function getListarRecaudacion(cuenta) {
    var data = "";
    var txtAnio = document.getElementById("txtAnio");
    if (txtAnio != null) {
        data = txtAnio.value + '|' + cuenta;
    }

    Http.get("General/listarTabla?tbl=" + controller + vista + "&data=" + data, mostrarlistas);
}

function mostrarlistas(rpta) {
    if (rpta) {
        var listas = rpta.split("¯");
        var lista = listas[0].split("¬");

        if (vista == "Asegurado") {
            var listaDocumento = listas[1].split("¬");
            var listaTipoContr = listas[2].split("¬");
            var listaSexo = listas[3].split("¬");
            var listaEstadoCivil = listas[4].split("¬");
            var listaEstado = listas[5].split("¬");
            listaUbigeo = listas[6].split("¬");
            listarDepartamentos();
            var listaGradoMil = listas[7].split("¬");
            var listaSituacionMil = listas[8].split("¬");
            var listaBanco = listas[9].split("¬");
            var listaPais = listas[10].split("¬");
            var listaEntidad = listas[11].split("¬");
            var listaOficina = listas[12].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaDocumento, "cboTipoDocumento", "Seleccione");
            crearCombo(listaTipoContr, "cboTipoContribuyente", null);
            crearCombo(listaSexo, "cboSexo", "Seleccione");
            crearCombo(listaEstadoCivil, "cboEstadoCivil", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
            crearCombo(listaGradoMil, "cboGrado", "Seleccione");
            crearCombo(listaSituacionMil, "cboSituacion", "Seleccione");
            crearCombo(listaBanco, "cboBanco", "Seleccione");
            crearCombo(listaPais, "cboPais", "Seleccione");
            crearCombo(listaEntidad, "cboEntidad", "Seleccione");
            crearCombo(listaOficina, "cboOficina", "Seleccione");
        }
        else if (vista == "EntiFin") {
            var listaEstado = listas[1].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }
        else if (vista == "LineaIngreso") {
            var listaclasificador = listas[1].split("¬");
            var listacuentaMayor = listas[2].split("¬");
            listaSubCuentaItem = listas[3].split("¬");
            var listaEstado = listas[4].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaclasificador, "cboClasificador", "Seleccione");
            crearCombo(listacuentaMayor, "cboCuentaMayor", "Seleccione");
            listarSubCuentaItem();
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }
        else if (vista == "Tarifa") {
            var listaIngreso = listas[1].split("¬");
            var listaMoneda = listas[2].split("¬");
            var listaEstado = listas[3].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaIngreso, "cboIngreso", "Seleccione");
            crearCombo(listaMoneda, "cboMoneda", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }
        else if (vista == "CodifiEntiFin") {
            var listaIngreso = listas[1].split("¬");
            var listaEstado = listas[2].split("¬");
            var listaEntidad = listas[3].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
            crearCombo(listaIngreso, "cboLineaIngreso", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
            crearCombo(listaEntidad, "cboEntidadFinanciera", "Seleccione");
        }
        else if (vista == "Recaudacion") {
            var listaEntidad = listas[1].split("¬");
            var listaEstado = listas[2].split("¬");
            //var listaTotal = listas[3].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

            crearCombo(listaEntidad, "cboEntidadFinanciera", "Seleccione");
            //crearCombo(listaEntidad, "cboEntidadFinancieraCarga", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }
        else if (vista == "ReciboIngreso") {
            var listaFormatoDoc = listas[1].split("¬");
            var listaLineaIngre = listas[2].split("¬");
            var listaEntidadFin = listas[3].split("¬");
            var listaMoneda = listas[4].split("¬");
            var listaEstado = listas[5].split("¬");
            //var listaTotal = listas[6].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, null, 38, false, null);
            crearCombo(listaFormatoDoc, "cboFormatoDoc", "Seleccione");
            crearCombo(listaLineaIngre, "cboLineaIngreso", "Seleccione");
            crearCombo(listaEntidadFin, "cboEntidadFinanciera", "Seleccione");
            crearCombo(listaMoneda, "cboMoneda", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }

        else {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
        }
    }
}

function listarOficinaItem() {
    var idEntidad = cboEntidad.value;
    var nRegistros = listaOficina_VG.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre, idxEntidadItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaOficina_VG[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxEntidadItem = campos[2];
        if (idxEntidadItem == idEntidad) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboOficina");
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function grabarDatos() {
    var data = ""
    var frm = new FormData();
    data = obtenerDatosGrabar("Popup");
    if (vista == "Recaudacion") {

        var txtAnio = document.getElementById("txtAnio");
        if (txtAnio != null) {
            dataImport += "¯" + txtAnio.value;
        }

        frm.append("data", dataImport);
        if (operacion == 1) {
            Http.post("General/guardar/?tbl=" + controller + vista + 'CxCobrar', mostrarGrabar, frm);
        }
        else {
            Http.post("General/guardar/?tbl=" + controller + vista + 'Abonados', mostrarGrabar, frm);
        }
    }
    else if (vista == "ReciboIngreso") {
        data += "¯" + txtFechaInicio.value + '|' + txtFechaFinal.value;
        frm.append("data", data);

        Http.post("General/guardar/?tbl=" + controller + vista, mostrarGrabar, frm);
    }
    else {
        var txtAnio = document.getElementById("txtAnio");
        if (txtAnio != null) {
            data += "¯" + txtAnio.value;
        }
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


function mostrarGrabar(rpta) {
    var mensajeResul = [];
    Swal.close();
    if (rpta) {

        listas = rpta.split("¯")
        lista = listas[0].split("¬");
        mensajeResul = listas[1].split("|");
        var tipo = mensajeResul[0];
        var mensaje = mensajeResul[1];
        divPopupContainer.style.display = 'none';
        grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

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
    if (idGrilla == "divLista") {
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

    var txtAnio = document.getElementById("txtAnio");
    if (txtAnio != null) {
        data += '|' + txtAnio.value;
    }
    else if (vista == "ReciboIngreso") {
        data += '|' + txtFechaInicio.value + '|' + txtFechaFinal.value;
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


        if (vista == "Asegurado") {
            txtIdRegistro.value = campos[0];
            cboTipoDocumento.value = campos[1];
            cboTipoContribuyente.value = campos[2];
            chkEsEmpleado.value = campos[3];
            chkEsProveedor.value = campos[4];
            chkEsAsegurado.value = campos[5];
            chkEsFamiliar.value = campos[6];
            chkEsOtros.value = campos[7];
            txtRUC.value = campos[8];
            txtRazonSocial.value = campos[9];
            txtNroDocumento.value = campos[10];
            txtApePaterno.value = campos[11];
            txtApeMaterno.value = campos[12];
            txtNombres.value = campos[13];

            cboPais.value = campos[14];
            txtTelefono.value = campos[15];
            txtCorreo.value = campos[16];
            txtFechaNacimiento.value = campos[17];
            cboSexo.value = campos[18];
            cboEstadoCivil.value = campos[19];
            cboEstado.value = campos[20];

            cboEntidad.value = campos[21];
            cboOficina.value = campos[22];
            txtFechaIngreso.value = campos[23];

            listarDepartamentos();
            cboDepartamento.value = campos[24];
            // document.getElementById('select2-cboDepartamento-container').innerHTML = cboDepartamento.options[cboDepartamento.selectedIndex].text;
            listarProvincias();
            cboProvincia.value = campos[25];
            //document.getElementById('select2-cboProvincia-container').innerHTML = cboProvincia.options[cboProvincia.selectedIndex].text;
            listarDistritos();
            cboDistrito.value = campos[26];
            // document.getElementById('select2-cboDistrito-container').innerHTML = cboDistrito.options[cboDistrito.selectedIndex].text;

            ttaDireccion.value = campos[27];
            cboGrado.value = campos[28];
            // document.getElementById('select2-cboGrado-container').innerHTML = cboGrado.options[cboGrado.selectedIndex].text;
            cboSituacion.value = campos[29];
            txtCIP.value = campos[30];
            txtContacto.value = campos[31];
            dtgEsAgenteRetencion.value = campos[32];

            cboBanco.value = campos[33];
            txtNroCuenta.value = campos[34];
            txtCCI.value = campos[35];
            txtNroCuenta.value = campos[36];

            if (cboTipoContribuyente.value == "1") {
                tipoPersonaNatural.style.display = "block";
                tipoPersonaJuridica.style.display = "none";
                tipoPersonaJuridicaRuc.style.display = "none";
                cboTipoDocumento.value = "";
            }
            else if (cboTipoContribuyente.value == "2") {
                tipoPersonaNatural.style.display = "none";
                tipoPersonaJuridica.style.display = "block";
                tipoPersonaJuridicaRuc.style.display = "block";
                cboTipoDocumento.value = 4;

            }
            else if (cboTipoContribuyente.value == "3") {
                tipoPersonaNatural.style.display = "block";
                tipoPersonaJuridicaRuc.style.display = "block";
                tipoPersonaJuridica.style.display = "none";
                cboTipoDocumento.value = 4;
            }

        }
        else if (vista == "LineaIngreso") {
            txtIdRegistro.value = campos[0];
            txtIngreso.value = campos[1];
            txtAbreviatura.value = campos[2];
            cboCuentaMayor.value = campos[3];
            listarSubCuentaItem();
            cboSubCuenta.value = campos[4];
            cboClasificador.value = campos[5];
            cboEstado.value = campos[6];
        }

        else if (vista == "Recaudacion") {
            importarDataExcel.style.display = 'none';
            btnGuardar.style.display = 'none';
            vizualizar.style.display = 'block';
            divListaExcel.innerHTML = "";
            titleModal.innerText = "Visualizar Recaudación";
            var listas = rpta.split("¯");
            var lista = listas[1].split("¬");
            var campos = listas[0].split("|");

            grillaItemLista = new GrillaScroll(lista, "divListaExcel", 100, 6, vista, controller, null, null, true, null, 38, false, null);

            txtIdRegistro.value = campos[0];
            txtAnioEjecucion.value = campos[1];
            //cboEntidadFinanciera.value = campos[2];
            //txtCodigo.value = campos[3];
            //txtTotal.value = formatoNumeroDecimal(campos[4]);
            txtArchivo.value = campos[2];
            txtFechaAbono.value = campos[3];
            //cboEstado.value = campos[7];
            //if (campos[7] == 1) {
            //    btnAprobar.style.display = 'inline'
            //}
            //else {
            //    btnAprobar.style.display = 'none'
            //}
        }
        else if (vista == "ReciboIngreso") {
            console.log(rpta);
            txtIdRegistro.value = campos[0];
            cboEntidadFinanciera.value = campos[1];
            txtFechaEmision.value = campos[2];
            cboEstado.value = campos[3];
            cboFormatoDoc.value = campos[4];
            txtNumero.value = campos[5];
            cboLineaIngreso.value = campos[6];
            cboMoneda.value = campos[7];
            txtImporte.value = campos[8];
            txtDni.value = campos[9];
            txtNombreCompleto.value = campos[10];
            txtConcepto.value = campos[11];
            editConcepto.style.display = "block";
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

function configurarBotones() {
    var btnImprimirEstadoCuenta = document.getElementById("btnImprimirEstadoCuenta");
    if (btnImprimirEstadoCuenta != null) btnImprimirEstadoCuenta.onclick = function () {
        Http.get("General/getTimeServer", getImprimirEstadoCuenta);
    }

    var btnObtener = document.getElementById("btnObtener");
    if (btnObtener != null) btnObtener.onclick = function () {
        var data = "";
        tabla = window.sessionStorage.getItem("Form");
        var txtAnioLectivo = document.getElementById("txtAnioLectivo");
        if (txtAnioLectivo != null) data = txtAnioLectivo.value;
        Http.get("General/listarTabla/?tbl=" + controller + vista + "Asegurado&data=" + data, mostrarListadoAsegurado);
    }

    var btnCargarArchivo = document.getElementById("btnCargarArchivo");
    if (btnCargarArchivo != null) btnCargarArchivo.onclick = function () {
        titleModal.innerText = "Importar Archivo Excel";
        divPopupContainer.style.display = 'block';
        importarDataExcel.style.display = 'block';
        btnGuardar.style.display = 'block';
        vizualizar.style.display = 'none';
        divListaExcel.innerHTML = "";
        spanPendiente.innerHTML = "";
        //cboEntidadFinancieraCarga.value = "";
        //   cboTipoRecaudacion.value = "";
    }

    var btnCargarCXC = document.getElementById("btnCargarCXC");
    if (btnCargarCXC != null) btnCargarCXC.onclick = function () {

        //let entidad = cboEntidadFinancieraCarga.value;

        //if (entidad == "") {
        //    mostrarMensaje("Seleccionar Entidad Financiera", "error")
        //    return;
        //}

        divPopupContainerForm1.style.display = 'block';
        fupExcel.value = "";
        snpnombrearchivo.innerHTML = "Seleccione archivo&hellip;";
        btnImportarExcel.disabled = false;
        btnImportarExcel.style.display = 'block';
        btnImportarExcel.innerHTML = "<i class='fa fa-upload' aria-hidden='true'></i>&nbsp;Importar";
    }

    var btnImportarExcel = document.getElementById("btnImportarExcel");
    if (btnImportarExcel != null) btnImportarExcel.onclick = function () {
        if (fupExcel.value == "") {
            mostrarMensaje("Seleccione el archivo que desea importar", "error")
        }
        else {
            importarExcel("divPopupContainerForm1", "divListaExcel", dataCab, dataDeta);
        }
    }

    var btnLimpiar = document.getElementById("btnLimpiar");
    if (btnLimpiar != null) btnLimpiar.onclick = function () {
        divListaExcel.innerHTML = "";
        dataImport = "";
        //cboEntidadFinancieraCarga.value = "";
    }

    var btnNuevo = document.getElementById("btnNuevo");
    if (btnNuevo != null) btnNuevo.onclick = function () {
        divPopupContainer.style.display = 'block';
        limpiarForm("Popup");

        let tituloModal = document.getElementById("tituloModal");
        if (tituloModal != null) {
            tituloModal.innerText = "Nuevo Registro";
        }

        var cboEstado = document.getElementById("cboEstado");
        if (cboEstado != null) {
            cboEstado.value = 1;
            cboEstado.disabled = true;
        }
        var cboEntidad = document.getElementById("cboEntidad");
        if (cboEntidad != null) {
            cboEntidad.value = 1;
            cboEntidad.disabled = true;
        }

        var cboFormatoDoc = document.getElementById("cboFormatoDoc");
        if (cboFormatoDoc != null) {
            cboFormatoDoc.value = 9;
        }

        var cboLineaIngreso = document.getElementById("cboLineaIngreso");
        if (cboLineaIngreso != null) {
            cboLineaIngreso.value = 4;
        }

        var cboMoneda = document.getElementById("cboMoneda");
        if (cboMoneda != null) {
            cboMoneda.value = 1;
        }

        var select2cboPais = document.getElementById("select2-cboPais-container");
        if (select2cboPais != null) select2cboPais.innerHTML = "Seleccione";

        var select2cboEntidad = document.getElementById("select2-cboEntidad-container");
        if (select2cboEntidad != null) select2cboEntidad.innerHTML = "Seleccione";

        var select2cboOficina = document.getElementById("select2-cboOficina-container");
        if (select2cboOficina != null) select2cboOficina.innerHTML = "Seleccione";

        var dtgEsAgenteRetencion = document.getElementById("dtgEsAgenteRetencion");
        if (dtgEsAgenteRetencion != null) {
            $('#dtgEsAgenteRetencion').bootstrapToggle('off')
        }



        var select2cboDepartamento = document.getElementById("select2-cboDepartamento-container");
        if (select2cboDepartamento != null) select2cboDepartamento.innerHTML = "Seleccione";

        var select2cboProvincia = document.getElementById("select2-cboProvincia-container");
        if (select2cboProvincia != null) select2cboProvincia.innerHTML = "Seleccione";

        var select2cboDistrito = document.getElementById("select2-cboDistrito-container");
        if (select2cboDistrito != null) select2cboDistrito.innerHTML = "Seleccione";

        var select2cboGrado = document.getElementById("select2-cboGrado-container");
        if (select2cboGrado != null) select2cboGrado.innerHTML = "Seleccione";


        if (vista == "Asegurado") {
            tipoPersonaNatural.style.display = "block";
            tipoPersonaJuridica.style.display = "none";
            tipoPersonaJuridicaRuc.style.display = "none";
            divEstadoSunat.style.display = "none";
            cboTipoDocumento.value = 2;

            var cboTipoContribuyente = document.getElementById("cboTipoContribuyente");
            cboTipoContribuyente.value = 1;
            cboTipoContribuyente.disabled = true;

            document.getElementById("txtRUC").classList.remove("Reque");
            document.getElementById("txtRazonSocial").classList.remove("Reque");
            document.getElementById("txtNroDocumento").classList.remove("Reque");
            document.getElementById("txtApePaterno").classList.remove("Reque");
            document.getElementById("txtApeMaterno").classList.remove("Reque");
            document.getElementById("txtNombres").classList.remove("Reque");

        }

        var select2cboCuentaMayor = document.getElementById("select2-cboCuentaMayor-container");
        if (select2cboCuentaMayor != null) {
            select2cboCuentaMayor.innerHTML = "Seleccione";
            listarSubCuentaItem();
        }
        var select2cboSubCuenta = document.getElementById("select2-cboSubCuenta-container");
        if (select2cboSubCuenta != null) select2cboSubCuenta.innerHTML = "Seleccione";

        var select2cboClasificador = document.getElementById("select2-cboClasificador-container");
        if (select2cboClasificador != null) select2cboClasificador.innerHTML = "Seleccione";

        var txtAnofiscal = document.getElementById("txtAnofiscal");
        if (txtAnofiscal != null) {
            var anio = txtAnofiscal.getAttribute('value');
            txtAnofiscal.value = anio;
        }

        var txtFechaEmision = document.getElementById("txtFechaEmision");
        if (txtFechaEmision != null) {
            var fechaHoy = txtFechaEmision.getAttribute('value');
            txtFechaEmision.value = fechaHoy;
        }

        var editConcepto = document.getElementById("editConcepto");
        if (editConcepto != null) {
            editConcepto.style.display = "none";
        }
    }

    var btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar != null) btnGuardar.onclick = function () {
        var validar = false;
        if (vista == "Asegurado") {

            let inputs = document.querySelectorAll('.chkTipoPersonaId:checked');
            if (inputs.length == 0) {
                mostrarMensaje("Seleccionar Tipo de Persona", "error")
                return;
            }

            if (cboTipoContribuyente.value == "1") {
                document.getElementById("txtNroDocumento").classList.add("Reque");
                document.getElementById("txtApePaterno").classList.add("Reque");
                document.getElementById("txtApeMaterno").classList.add("Reque");
                document.getElementById("txtNombres").classList.add("Reque");
                document.getElementById("txtRUC").classList.remove("Reque");
                document.getElementById("txtRazonSocial").classList.remove("Reque");
            }
            else {
                document.getElementById("txtRUC").classList.remove("Reque");
                document.getElementById("txtRazonSocial").classList.remove("Reque");
                document.getElementById("txtNroDocumento").classList.remove("Reque");
                document.getElementById("txtApePaterno").classList.remove("Reque");
                document.getElementById("txtApeMaterno").classList.remove("Reque");
                document.getElementById("txtNombres").classList.remove("Reque");
            }
        }
        else if (vista == "Recaudacion") {
            if (fupExcel.value = "") {
                mostrarMensaje("Seleccione el archivo excel a importar", "error");
                return;
            }
        }

        if (validarInformacion("Reque") == true) {
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

    var btnCancelarForm2 = document.getElementById("btnCancelarForm2");
    if (btnCancelarForm2 != null) btnCancelarForm2.onclick = function () {
        divPopupContainerForm2.style.display = 'none';
    }

    var btnConsultar = document.getElementById("btnConsultar");
    if (btnConsultar != null) btnConsultar.onclick = function () {
        if (vista == "Recaudacion") {
            getListarRecaudacion('1');
        }
        else {
            getListar();
        }
    }

    //var btnReporte = document.getElementById("btnReporte");
    //if (btnReporte != null) btnReporte.onclick = function () {
    //    var data = "";
    //    archivo = "REGISTRO DE VENTAS E INGRESOS.xlsx";
    //    Http.getDownloadBytes("General/exportarOnline/?ori=V&tbl=" + controller + vista + "RegistroVenta&idx=" + data, mostrarExportar)
    //}

    //var btnPendiente = document.getElementById("btnPendiente");
    //if (btnPendiente != null) btnPendiente.onclick = function () {
    //    if (vista == "ReciboIngreso") {
    //        spnLoadData.style.display = "block";
    //        listaLoadItem.style.display = 'none';
    //        let data = '';
    //        Http.get("General/listarTabla?tbl=" + controller + vista + "Pendientes" + "&data=" + data, function (response) {
    //            if (response) {
    //                var listas = response.split("¯");
    //                var lista = listas[0].split("¬");
    //                grillaItem = new GrillaScroll(lista, "divListaRecaudacion", 100, 6, vista, controller, null, false, false, null, 24, false, null);
    //                spnLoadData.style.display = "none";
    //                listaLoadItem.style.display = 'block';
    //            }
    //        });
    //        divPopupContainerForm1.style.display = 'block';
    //    }
    //}

    //var btnGenerarRI = document.getElementById("btnGenerarRI");
    //if (btnGenerarRI != null) btnGenerarRI.onclick = function () {
    //    let data = "";
    //    if (vista == "ReciboIngreso") {
    //        if (idRegistro == "") {
    //            mostrarMensaje("Seleccione registro de la lista", "error");
    //        }
    //        else {
    //            data = idRegistro + '¯' + txtFechaInicio.value + '|' + txtFechaFinal.value;
    //            var frm = new FormData();
    //            frm.append("data", data);

    //            Swal.fire({
    //                title: '¿Desea generar recibo de ingreso?',
    //                icon: 'warning',
    //                showCancelButton: true,
    //                confirmButtonColor: '#3085d6',
    //                cancelButtonColor: '#d33',
    //                confirmButtonText: 'Si',
    //                cancelButtonText: 'No'
    //            }).then((result) => {
    //                if (result.value) {
    //                    divPopupContainerForm1.style.display = "none";
    //                    if (tipoProceso == "C") {
    //                        Http.post("General/guardar/?tbl=" + controller + vista + 'Pendientecxc', mostrarGrabar, frm);
    //                    }
    //                    else {
    //                        Http.post("General/guardar/?tbl=" + controller + vista + 'PendienteAbono', mostrarGrabar, frm);
    //                    }
    //                }
    //            })
    //        }
    //    }
    //}

    var btnAgregarItem = document.getElementById("btnAgregarItem");
    if (btnAgregarItem != null) btnAgregarItem.onclick = function () {
        if (vista == "ReciboIngreso") {
            spnLoadDataAsegurado.style.display = "block";
            listaLoadAsegurado.style.display = 'none';
            let data = '';
            Http.get("General/listarTabla?tbl=" + controller + vista + "Asegurado" + "&data=" + data, function (response) {
                if (response) {
                    var listas = response.split("¯");
                    var lista = listas[0].split("¬");
                    grillaItem = new GrillaScroll(lista, "divListaAsegurado", 100, 6, vista, controller, null, null, true, null, 38, false, null);
                    spnLoadDataAsegurado.style.display = "none";
                    listaLoadAsegurado.style.display = 'block';
                }
            });
            divPopupContainerForm2.style.display = 'block';
        }
    }

    var btnSeleccionar = document.getElementById("btnSeleccionar");
    if (btnSeleccionar != null) btnSeleccionar.onclick = function () {
        if (vista == "ReciboIngreso") {
            if (idRegistro == "") {
                mostrarMensaje("Seleccione registro de la lista", "error");
            }
            else {
                console.log(idRegistro);
                txtDni.value = idRegistro.split("¥")[0];
                txtNombreCompleto.value = idRegistro.split("¥")[1];
            }
            divPopupContainerForm2.style.display = 'none';
        }
    }

    var btnImprimir = document.getElementById("btnImprimir");
    if (btnImprimir != null) btnImprimir.onclick = function () {
        if (idRegistro == "") {
            mostrarMensaje("Seleccione registro de la lista", "error");
        }
        else {
            getReporte(idRegistro);
        }
    }


    var tabCuentasxCobrar = document.getElementById("btnCuentasxCobrar");
    if (tabCuentasxCobrar != null) tabCuentasxCobrar.onclick = function () {
        operacion = 1;
        getListarRecaudacion('1');
        lblTipoArchivo.innerHTML = "RECIBOS POR COBRAR";
    }

    var btnRecibosPagados = document.getElementById("btnRecibosPagados");
    if (btnRecibosPagados != null) btnRecibosPagados.onclick = function () {
        operacion = 2;
        getListarRecaudacion('0');
        lblTipoArchivo.innerHTML = "RECIBOS ABONADOS";
    }
}

function getReporte(id) {
    //btnImprimir
    if (vista == "EstadoCuenta" || vista == "ReciboIngreso") {
        Http.get("General/obtenerReporteId/?tbl=" + controller + 'ReciboIngreso&id=' + id, mostrarReporte);
    }
}

function mostrarReporte(rpta) {
    if (rpta) {
        var listaReporte = rpta.split("¯");
        var cabecera = listaReporte[0].split("|");
        var detalle = listaReporte[1].split("¬");
        var resumenconta = listaReporte[2].split("¬");

        if (cabecera[11] == '10') {
            tdNumeroRecibo.innerHTML = cabecera[0];
            tdFecha.innerHTML = cabecera[1];
            tdGlosaPrincipal.innerHTML = cabecera[2];
            tdDNI.innerHTML = cabecera[3];
            tdPoliza.innerHTML = cabecera[4];
            tdSubdiario.innerHTML = cabecera[5];
            tdComprobante.innerHTML = cabecera[6];
            tdLineaIngreso.innerHTML = cabecera[7];
            tdTotal.innerHTML = formatoNumeroDecimal(cabecera[8] * 1);
        }
        else {
            tdNumeroReciboRA.innerHTML = cabecera[0];
            tdFechaRA.innerHTML = cabecera[1];
            tdGlosaPrincipalRA.innerHTML = cabecera[2];
            tdDNIRA.innerHTML = cabecera[3];
            tdSubdiarioRA.innerHTML = cabecera[5];
            tdComprobanteRA.innerHTML = cabecera[6];
            tdLineaIngresoRA.innerHTML = cabecera[7];
            tdTotalRA.innerHTML = formatoNumeroDecimal(cabecera[8] * 1);

            tdNumeroRI.innerHTML = cabecera[9];
            tdMotivoRA.innerHTML = cabecera[10];
        }
        var contenido = "";
        var contenidoResumen = "";

        var nregistros = detalle.length;
        var nRegistrosResumen = resumenconta.length;
        if (nregistros > 0 && detalle[0] != "") {
            var campos = [];
            for (var i = 0; i < nregistros; i++) {
                campos = detalle[i].split("|");
                contenido += "<tr>";
                contenido += "<td width='170' style='vertical-align: top;font-size: 12px'>";
                contenido += campos[0];
                contenido += "</td > ";
                contenido += "<td width='810' style='vertical-align: top;font-size: 12px'>";
                contenido += campos[1];
                contenido += "</td > ";
                contenido += "<td width='130' style='text-align: right;vertical-align: top;font-size: 12px'>";
                contenido += formatoNumeroDecimal(campos[2] * 1);
                contenido += "</td > ";
                contenido += "</tr>";
            }

            for (var i = 0; i < nRegistrosResumen; i++) {
                campos = resumenconta[i].split("|");
                contenidoResumen += "<tr>";
                contenidoResumen += "<td width='420' style='height: 25px'>";
                contenidoResumen += campos[0];
                contenidoResumen += "</td > ";
                contenidoResumen += "<td width='148' style='text-align: right;'>";
                if (campos[1] != "") contenidoResumen += formatoNumeroDecimal(campos[1]);
                contenidoResumen += "</td > ";
                contenidoResumen += "<td width='140' style='text-align: right;'>";
                if (campos[2] != "") contenidoResumen += formatoNumeroDecimal(campos[2]);
                contenidoResumen += "</td > ";
                contenidoResumen += "</tr>";
            }
            contenidoResumen += "<tr>";
            contenidoResumen += "</tr>";
            if (cabecera[11] == '10') {
                tbDetalleReporte.innerHTML = contenido;
                tblResumenContable.innerHTML = contenidoResumen;
            }
            else {
                tbDetalleReporteRA.innerHTML = contenido;
                tblResumenContableRA.innerHTML = contenidoResumen;
            }
        }
        if (cabecera[11] == '10') {
            imprimir(divReporte.innerHTML);
        }
        else {
            imprimir(divReporteRA.innerHTML);
        }
    }
}

function imprimir(contenido) {
    pagina = document.body;
    var ventana = window.frames["print_frame"];
    ventana.document.body.innerHTML = "";
    ventana.document.write(contenido);
    ventana.focus();
    ventana.print();
    ventana.close();
    document.body = pagina;
}

function configurarConsultas() {
    var txtRUC = document.getElementById("txtRUC");
    if (txtRUC != null) {
        txtRUC.onkeyup = function (event) {
            if (this.value != "" && this.value.length == 11 || (event.keyCode == 13)) {
                spnLoad.style.display = 'block';
                Http.get("General/consultaRucSunat/?ruc=" + this.value, mostrarDatosSunat);
            }

        }
    }

    var txtDNI = document.getElementById("txtNroDocumento");
    if (txtDNI != null) {
        txtDNI.onkeyup = function (event) {
            var cboTipoDocumento = document.getElementById("cboTipoDocumento");
            if (cboTipoDocumento.value == "2" || cboTipoDocumento.value == "4") {
                if (this.value != "" && this.value.length == 8 || (event.keyCode == 13)) {
                    spnLoadDoc.style.display = 'block';
                    Http.get("General/consultaDniReniec/?dni=" + this.value, mostrarDatosDNI);
                }
            }
        }
    }

}


function mostrarDatosSunat(rpta) {
    if (rpta != "") {
        var obj = JSON.parse(rpta);
        if (obj.success) {
            spnDocumento.innerHTML = "";
            var ttaDireccion = document.getElementById("ttaDireccion");
            if (ttaDireccion != null) ttaDireccion.value = obj.data.direccion_completa;
            var txtNombre = document.getElementById("txtRazonSocial");
            if (txtNombre != null) txtNombre.value = obj.data.nombre_o_razon_social;
            divEstadoSunat.style.display = 'inline';
            lblEstadoSunat.innerHTML = obj.data.estado;
            lblCondicionSunat.innerHTML = obj.data.condicion;
            if (obj.data.es_agente_de_retencion == "NO") {
                $('#dtgEsAgenteRetencion').bootstrapToggle('off')
            }
            else {
                $('#dtgEsAgenteRetencion').bootstrapToggle('on')
            }
            spnLoad.style.display = 'none';
        }
        else {
            spnDocumento.innerHTML = "Nro de Documento no encontrado";
            spnDocumento.style.color = "red";
            spnLoad.style.display = 'none';
        }
    }
    else {
        spnDocumento.innerHTML = "Documento incorrecto o no existe enlace con SUNAT";
        spnDocumento.style.color = "red";
        spnLoad.style.display = 'none';
    }
}

function mostrarDatosDNI(rpta) {
    if (rpta != "") {
        var obj = JSON.parse(rpta);

        if (obj.success) {
            spnDniDocumento.innerHTML = "";
            var ttaDireccion = document.getElementById("ttaDireccion");
            if (ttaDireccion != null) ttaDireccion.value = obj.data.direccion_completa;
            var txtApePaterno = document.getElementById("txtApePaterno");
            if (txtApePaterno != null) txtApePaterno.value = obj.data.apellido_paterno;
            var txtApeMaterno = document.getElementById("txtApeMaterno");
            if (txtApeMaterno != null) txtApeMaterno.value = obj.data.apellido_materno;
            var txtNombres = document.getElementById("txtNombres");
            if (txtNombres != null) txtNombres.value = obj.data.nombres;
            var txtNroDocumento = document.getElementById("txtNroDocumento");
            if (txtNroDocumento != null) txtNroDocumento.value = obj.data.numero;
            var cboSexo = document.getElementById("cboSexo");
            if (cboSexo != null) {
                switch (obj.data.sexo) {
                    case "MASCULINO":
                        cboSexo.value = 2;
                        break;
                    case "FEMENINO":
                        cboSexo.value = 3;
                        break;
                    default:
                        cboSexo.value = "";
                }
            }

            var cboEstadoCivil = document.getElementById("cboEstadoCivil");
            if (cboEstadoCivil != null) {
                switch (obj.data.estado_civil) {
                    case "SOLTERO":
                        cboEstadoCivil.value = 2;
                        break;
                    case "CASADO":
                        cboEstadoCivil.value = 3;
                        break;
                    case "VIUDO":
                        cboEstadoCivil.value = 4;
                        break;
                    case "DIVORCIADO":
                        cboEstadoCivil.value = 5;
                        break;
                    case "CONVIVIENTE":
                        cboEstadoCivil.value = 6;
                        break;
                    default:
                        cboEstadoCivil.value = "";
                }
            }

            var txtFechaNacimiento = document.getElementById("txtFechaNacimiento");
            if (txtFechaNacimiento != null) txtFechaNacimiento.value = obj.data.fecha_nacimiento;
            var cboPais = document.getElementById("cboPais");
            if (cboPais != null) cboPais.value = "1";
            listarDepartamentos();
            let ubigeo = obj.data.ubigeo_sunat;
            let idDpto = ubigeo.substr(0, 2);
            let idProv = ubigeo.substr(2, 2);
            let idDist = ubigeo.substr(4, 2);
            cboDepartamento.value = idDpto;
            document.getElementById('select2-cboDepartamento-container').innerHTML = cboDepartamento.options[cboDepartamento.selectedIndex].text;
            listarProvincias();
            cboProvincia.value = idProv;
            document.getElementById('select2-cboProvincia-container').innerHTML = cboProvincia.options[cboProvincia.selectedIndex].text;
            listarDistritos();
            cboDistrito.value = idDist;
            document.getElementById('select2-cboDistrito-container').innerHTML = cboDistrito.options[cboDistrito.selectedIndex].text;
            spnLoadDoc.style.display = 'none';
        }
        else {
            spnLoadDoc.style.display = 'none';
            spnDniDocumento.innerHTML = "Nro de Documento no encontrado";
            spnDniDocumento.style.color = "red";

        }
    }
    else {
        spnDniDocumento.innerHTML = "Documento incorrecto o no existe enlace con SUNAT";
        spnDniDocumento.style.color = "red";
        spnLoadDoc.style.display = 'none';
    }
}


function configurarCombos() {
    var cboEntidad = document.getElementById("cboEntidad");
    if (cboEntidad != null) cboEntidad.onchange = function () {
        listarOficinaItem();
    }

    var cboDepartamento = document.getElementById("cboDepartamento")
    if (cboDepartamento != null) cboDepartamento.onchange = function () {
        listarProvincias();
    }

    var cboProvincia = document.getElementById("cboProvincia")
    if (cboProvincia != null) cboProvincia.onchange = function () {
        listarDistritos();
    }

    var cboTipoDocumento = document.getElementById("cboTipoDocumento")
    if (cboTipoDocumento != null) cboTipoDocumento.onchange = function () {
        if (cboTipoDocumento.value == "4") {
            cboTipoDocumento.value = 2;
        }
        cboTipoContribuyente.value = 1;
        tipoPersonaNatural.style.display = "block";
        tipoPersonaJuridica.style.display = "none";
        tipoPersonaJuridicaRuc.style.display = "none";

    }

    var cboTipoContribuyente = document.getElementById("cboTipoContribuyente")
    if (cboTipoContribuyente != null) cboTipoContribuyente.onchange = function () {

        if (cboTipoContribuyente.value == "1") {
            tipoPersonaNatural.style.display = "block";
            tipoPersonaJuridica.style.display = "none";
            tipoPersonaJuridicaRuc.style.display = "none";
            //  cboTipoDocumento.value = "";
        }
        else if (cboTipoContribuyente.value == "2") {
            //tipoPersonaNatural.style.display = "none";
            // tipoPersonaJuridica.style.display = "block";
            // tipoPersonaJuridicaRuc.style.display = "block";

            tipoPersonaNatural.style.display = "block";
            tipoPersonaJuridica.style.display = "none";
            tipoPersonaJuridicaRuc.style.display = "none";

        }
        else if (cboTipoContribuyente.value == "3") {

            tipoPersonaNatural.style.display = "block";
            tipoPersonaJuridica.style.display = "none";
            tipoPersonaJuridicaRuc.style.display = "none";

            //tipoPersonaNatural.style.display = "block";
            //tipoPersonaJuridicaRuc.style.display = "block";
            // tipoPersonaJuridica.style.display = "none";
        }

    }

    var chkEsEmpleado = document.getElementById("chkEsEmpleado")
    if (chkEsEmpleado != null) chkEsEmpleado.onchange = function () {
        var checked = chkEsEmpleado.checked;
        if (checked) {
            document.getElementById("txtRUC").classList.remove("Reque");
            document.getElementById("txtRazonSocial").classList.remove("Reque");
        }
        else {
            document.getElementById("txtRUC").classList.remove("Reque");
        }
    }

    var cboCuentaMayor = document.getElementById("cboCuentaMayor");
    if (cboCuentaMayor != null) cboCuentaMayor.onchange = function () {
        listarSubCuentaItem();
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

        if (vista == "Recaudacion") {
            var listaTotal = listas[2].split("¬");
            spnTotalRecaudacion.innerText = formatoNumeroDecimal(listaTotal[0]);
        }
        else if (vista == "ReciboIngreso") {
            var listaTotal = listas[2].split("¬");
            //spnTotalIngresos.innerText = formatoNumeroDecimal(listaTotal[0]);
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

    if (vista == "EstadoCuenta") {
        lblAsegurado.innerHTML = fila.childNodes[2].innerHTML;
        lblAsegurado.setAttribute("data-id", idRegistro);
        divPopupContainer.style.display = 'none';
        getObtenerEStadoCuenta(idRegistro);
    }
}

function getObtenerEStadoCuenta(idAsegurado) {
    var data = "";
    var anioLectivo = txtAnioLectivo.value;
    data = idAsegurado + '|' + anioLectivo;
    Http.get("General/listarTabla/?tbl=" + controller + vista + "&data=" + data, mostrarEstadoCuenta);
}

function mostrarEstadoCuenta(rpta) {
    if (rpta) {
        btnImprimirEstadoCuenta.disabled = false;
        var listas = rpta.split("¯");
        var listaEstadoCuenta = listas[0].split("¬");
        var ingresos = listas[1];
        var deuda = listas[2];
        lblAporteTotal.innerHTML = 'S/. ' + formatoNumeroDecimal(ingresos);
        lblDeudaTotal.innerHTML = 'S/. ' + formatoNumeroDecimal(deuda);
        generarEstadoCuenta(listaEstadoCuenta, "listaEstadoCuenta", 0, "tblEstadoCuenta", "filaPersonalizada");
    }
}

function generarEstadoCuenta(lista, nombreDiv, indicadorPie, idTabla, bgcolor) {
    var campos = lista[0].split("|");
    var anchos = lista[1].split("|");
    var tipos = lista[2].split("|");
    var nRegistros = lista.length;
    var nCampos = campos.length;
    var contenido = "<table id='";
    contenido += idTabla
    contenido += "' class='grilla bordered Tabla'>";
    contenido += "<thead>";
    contenido += "<tr class='";
    contenido += bgcolor;
    contenido += "'>";
    for (var z = 0; z < nCampos; z++) {
        if (z == 0) {
            contenido += "<th style='display:none' width='";
            contenido += anchos[z];
            contenido += "'>";
            contenido += campos[z];
            contenido += "</th>";
        }
        else {
            contenido += "<th width='";
            contenido += anchos[z];
            contenido += "'>";
            contenido += campos[z];
            contenido += "</th>";
        }
    }
    //contenido += "<th>";
    //contenido += "Acción";
    //contenido += "</th>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";
    if (lista[3].length > 0) {
        for (var i = 3; i < nRegistros; i++) {
            campos = lista[i].split("|");
            contenido += "<tr style='border: 1px solid black;'>";
            for (var j = 0; j < nCampos; j++) {
                if (j == 0) {
                    contenido += "<td style='display:none'>";
                    contenido += campos[j];
                    contenido += "</td>";
                }
                else {
                    contenido += "<td style='text-align:";
                    switch (tipos[j]) {
                        case "Int32":
                            contenido += "right";
                            valor = campos[j];
                            break;
                        case "Int64":
                            contenido += "right";
                            valor = campos[j];
                            break;
                        case "Decimal":
                            contenido += "right";
                            valor = formatoNumeroDecimal(campos[j]);
                            break;
                        case "String":
                            contenido += "left";
                            valor = campos[j];
                            break;
                        case "DateTime":
                            contenido += "center";
                            valor = campos[j];
                            break;
                    }
                    contenido += "'>";
                    contenido += valor;
                    contenido += "</td>";
                }
            }
            //contenido += "<td>";
            //contenido += "<i class='fa fa-print fa-2x' aria-hidden='true' style='color:green' title='Imprimir Recibo Pago' onclick='getReporte(";
            //contenido += campos[0];
            //contenido += ");'></i>";
            contenido += "</td>";
            contenido += "</tr>";
        }
    }
    else {
        contenido += "<td style='text-align:center;font-weight:bold' colSpan='";
        contenido += nCampos;
        contenido += "'>";
        contenido += "No tiene recibo de ingreso";
        contenido += "</td>";
    }
    contenido += "</tbody>";
    if (indicadorPie == 1) {
        contenido += "<tfoot>";
        contenido += "<tr style='background: #d0dafd; color: #2193F6; text-align:right;font-weight: bold;' ><td colspan='4'>TOTAL</td>";
        contenido += "<td style='text-align:right'>";
        contenido += formatoNumeroDecimal(totalCargo);
        contenido += "</td>";
        contenido += "<td style='text-align:right'>";
        contenido += formatoNumeroDecimal(totalAbono);
        contenido += "</td>";
        contenido += "<td style='text-align:right'>";
        contenido += formatoNumeroDecimal(totalCargo - totalAbono);
        contenido += "</td>";
        contenido += "</tr >";
        contenido += "</tfoot>";
    }
    else {
        contenido += "</table> ";
    }
    var div = document.getElementById(nombreDiv);
    div.innerHTML = contenido;
}


function getImprimirEstadoCuenta(rpta) {
    var datos = rpta.split('¯');
    var fecha = datos[0];
    var hora = datos[1];

    var doc = new jsPDF()
    doc.setFontSize(20)
    doc.setTextColor(40)

    if (base64Img) {
        doc.addImage(base64Img, 'JPEG', 25, 6, 10, 10)
    }
    doc.setFontSize(6);
    doc.text('IAFAS DE LA MARINA DE GUERRA DEL PERU', 14, 18)
    doc.text('SISGEFIN', 14, 21)
    doc.text('Fecha: ' + fecha, 170, 21)
    doc.text('Usuario: ' + spnUsuario.innerHTML, 14, 23)
    doc.text('Hora: ' + hora, 170, 23)

    doc.setFontSize(13);
    doc.text('ESTADO DE CUENTA', 84, 33)
    doc.setFontSize(11);
    doc.text('AÑO FISCAL: ' + txtAnioLectivo.value, 85, 38)
    doc.text('ASEGURADO: ' + lblAsegurado.innerHTML, 14, 45)
    doc.text('TOTAL APORTES: ' + lblAporteTotal.innerHTML, 14, 50)
    doc.text('TOTAL DEUDA: ' + lblDeudaTotal.innerHTML, 14, 55)

    doc.setFontSize(10);
    var finalY = doc.lastAutoTable.finalY || 25
    doc.text(spnTitulo.innerHTML, 14, finalY + 40)
    doc.autoTable({
        startY: finalY + 44,
        html: '#tblEstadoCuenta',
        styles: { cellPadding: 0.5, fontSize: 6 },
        theme: 'grid',
        headerStyles: {
            fillColor: [0, 0, 0],
            fontSize: 6,
            halign: 'center',
        },
        columnStyles: {
            0: { halign: 'center' },
            2: { halign: 'right' },
            3: { halign: 'center' },
        },
    })

    doc.setProperties({

        title: 'SISGEFIN: ESTADO DE CUENTA',
        subject: 'IAFAS',
        author: spnUsuario.innerHTML,
        keywords: "ESTADO DE CUENTA, IAFAS, SISGEFIN",
        creator: "SISGEFIN CUENTA CORRIENTE"
    });
    divPopupContainerForm1.style.display = 'block';
    ifrmVistaPrevia.src = doc.output('datauristring');
}

function listarDepartamentos() {
    var nRegistros = listaUbigeo.length;
    var contenido = "<option value=''>Seleccione</option>";
    var idDpto, idProv, idDist, nombre, ubigeo;
    for (var i = 0; i < nRegistros; i++) {
        ubigeo = listaUbigeo[i];
        idDpto = ubigeo.substr(0, 2);
        idProv = ubigeo.substr(2, 2);
        idDist = ubigeo.substr(4, 2);
        if (idDpto != "00" && idProv == "00" && idDist == "00") {
            nombre = ubigeo.substr(6, ubigeo.length - 6);
            contenido += "<option value='";
            contenido += idDpto;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboDepartamento");
    if (cbo != null) cbo.innerHTML = contenido;
    listarProvincias();
}

function listarProvincias() {
    var nRegistros = listaUbigeo.length;

    var contenido = "<option value=''>Seleccione</option>";
    var idDpto, idProv, idDist, nombre, ubigeo;
    var idDptoSel = document.getElementById("cboDepartamento").value;
    for (var i = 0; i < nRegistros; i++) {
        ubigeo = listaUbigeo[i];
        idDpto = ubigeo.substr(0, 2);
        idProv = ubigeo.substr(2, 2);
        idDist = ubigeo.substr(4, 2);
        if (idDpto == idDptoSel && idProv != "00" && idDist == "00") {
            nombre = ubigeo.substr(6, ubigeo.length - 6);
            contenido += "<option value='";
            contenido += idProv;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboProvincia");
    if (cbo != null) cbo.innerHTML = contenido;
    listarDistritos();
}

function listarDistritos() {
    var nRegistros = listaUbigeo.length;
    var contenido = "<option value=''>Seleccione</option>";
    var idDpto, idProv, idDist, nombre, ubigeo;
    var idDptoSel = document.getElementById("cboDepartamento").value;
    var idProvSel = document.getElementById("cboProvincia").value;
    for (var i = 0; i < nRegistros; i++) {
        ubigeo = listaUbigeo[i];
        idDpto = ubigeo.substr(0, 2);
        idProv = ubigeo.substr(2, 2);
        idDist = ubigeo.substr(4, 2);
        if (idDpto == idDptoSel && idProv == idProvSel && idDist != "00") {
            nombre = ubigeo.substr(6, ubigeo.length - 6);
            contenido += "<option value='";
            contenido += idDist;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboDistrito");
    if (cbo != null) cbo.innerHTML = contenido;
}


function listarSubCuentaItem() {
    var idCuentaMayor = cboCuentaMayor.value;
    var nRegistros = listaSubCuentaItem.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre, idxTipoItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaSubCuentaItem[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxTipoItem = campos[2];
        if (idxTipoItem === idCuentaMayor) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboSubCuenta");
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

/*Importar EXCEL*/
function importarExcel(divForm, divLista, dataCab, dataDeta) {
    document.getElementById(divForm).style.display = "none";
    var cabeceras = "";
    var detalles = "";
    var totales = "";
    var file = fupExcel.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = new Uint8Array(reader.result);
        var libro = XLSX.read(data, { type: 'array', cellDates: true, dateNF: 'dd/mm/yyyy' });
        var nhojas = libro.SheetNames.length;
        var nombreHoja = libro.SheetNames[0];
        var hoja = libro.Sheets[nombreHoja];
        var range = XLSX.utils.decode_range(hoja['!ref']);
        //*************
        var contenido = "<table>";
        contenido += "<tr style='background-color:lightgray;text-align:center'>";
        contenido += "<td></td>";
        for (var j = range.s.c; j <= range.e.c; j++) {
            contenido += "<th>";
            contenido += String.fromCharCode(65 + j);
            contenido += "</th>";
        }
        contenido += "</tr>";
        /*Detalle de la importacion*/
        //e:{ c: 37, r: 9 }
        for (var i = range.s.r; i <= range.e.r; i++) {
            contenido += "<tr style='background-color:white;text-align:left'>";
            contenido += "<th style='width:50px;background-color:lightgray'>";
            contenido += i + 1;
            contenido += "</th>";
            for (var j = range.s.c; j <= range.e.c; j++) {
                contenido += "<td>";
                var direccion = XLSX.utils.encode_cell({ c: j, r: i });
                let direc = direccion.charAt(0);
                var celda = hoja[direccion];

                if (celda != null) {
                    // contenido += celda.v;
                    if (i == 0 || i == 2) {
                        contenido += celda.v;
                    }

                    if (i == 3) {
                        if (direc == "D" || direc == "S" || direc == "Z") {
                            dataCab += celda.w;
                            dataCab += "|";
                            //imprimir contenido
                            contenido += celda.w;
                        }
                        else {
                            dataCab += celda.v;
                            dataCab += "|";
                            //imprimir contenido
                            contenido += celda.v;
                        }
                    }
                    //if (i > 3) {
                    if (i > 2) {

                        if (direc == "D" || direc == "S" || direc == "Z") {
                            dataDeta += celda.w;
                            dataDeta += "|";
                            //imprimir contenido
                            contenido += celda.w;
                        }
                        else {
                            dataDeta += celda.v;
                            dataDeta += "|";
                            //imprimir contenido
                            contenido += celda.v;
                        }
                    }
                }
                contenido += "</td>";
            }
            if (i > 0) {
                dataCab = dataCab.substr(0, dataCab.length - 1);
                dataCab += "¬";
                dataDeta = dataDeta.substr(0, dataDeta.length - 1);
                dataDeta += "¬";
            }
            contenido += "</tr>";
        }
        //****** dataDebe Eliminar ultimo caracter
        dataCab = dataCab.substr(0, dataCab.length - 1);
        dataCab = dataCab.slice(1, -1);
        //****** dataHaber Eliminar ultimo y primer  caracter
        dataDeta = dataDeta.substr(0, dataDeta.length - 1);
        dataDeta = dataDeta.slice(1, -1);

        dataImport = dataCab + '¯' + dataDeta + '¯' + file.name;
        contenido += "<table>";
        document.getElementById(divLista).innerHTML = contenido;
    }
    reader.readAsArrayBuffer(file);
}

function numeroAFecha(numeroDeDias, esExcel = false) {
    var diasDesde1900 = esExcel ? 25567 + 1 : 25567;
    // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
    /* return new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);*/
    let date = new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
    //result = date.toLocaleString();
    //return result;
    //let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    let dia = ("0" + date.getDate()).slice(-2);
    let mes = ("0" + (date.getMonth() + 1)).slice(-2);
    let anio = date.getFullYear();
    let formatted_date = dia + "/" + mes + "/" + anio;
    //console.log(formatted_date);
    return formatted_date;
}

function mostrarListadoAsegurado(rpta) {
    if (rpta) {
        var lista = rpta.split("¬");
        divPopupContainer.style.display = 'block';
        var grilla = new GrillaScroll(lista, "divListaAsegurado", 500, 2, vista, "Ingresos", null, null, null, null, 26);
    }
}

function mostrarExportar(rpta) {
    spnLoad.style.display = 'none';
    descargarArchivo(rpta, obtenerMime());
}

function obtenerMime() {
    var campos = archivo.split('.');
    var n = campos.length;
    var extension = campos[n - 1].toLowerCase();
    switch (extension) {
        case "xlsx":
            tipoMime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            break;
        case "docx":
            tipoMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            break;
        case "pdf":
            tipoMime = "aplication/pdf";
            break;
        default:
            tipoMime = "aplication/octect-stream";
            break;
    }
    return tipoMime;
}

function descargarArchivo(contenido, tipoMime) {
    var blob = new Blob([contenido], { "type": tipoMime });
    var enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = archivo;
    enlace.click();
    document.removeChild(enlace);
}
