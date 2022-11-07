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
var idTabActivo = "";
var tipoPlanCta = "";
var listaGrupoItem = [];
var listaClaseItem = [];
var listaFamiliaItem = [];
var listaSubCuentaItem = [];
var listaClasificadorItem = [];

window.onload = function () {
    getConfigMn();
    vista = window.sessionStorage.getItem("Vista");
    controller = window.sessionStorage.getItem("Controller");
    mostrarLoading("divLista");

    getListar();

    configurarBotones();
    configurarCombos();
    configurarOpciones();
    configurarCampos();
}

function getListar() {
    var data = "";
    var anio = document.getElementById('txtAnio')?.value;
    data = anio;
    Http.get("General/listarTabla?tbl=" + controller + vista + "&data=" + data, mostrarlistas);
}

function mostrarlistas(rpta) {
    if (rpta) {
        var listas = rpta.split("¯");
        var lista = listas[0].split("¬");

        if (vista == "PlanContable") {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
        }
        else if (vista == "FamiliaCuenta") {
            var listaTipo = listas[1].split("¬");
            listaGrupoItem = listas[2].split("¬");
            listaClaseItem = listas[3].split("¬");
            listaFamiliaItem = listas[4].split("¬");
            var listaTipoUso = listas[5].split("¬");
            listaClasificadorItem = listas[6].split("¬");
            var listaEstado = listas[7].split("¬");
            var listaCuentaMayor = listas[8].split("¬");
            listaSubCuentaItem = listas[9].split("¬");
            // listaCuentaFamiliaItem = listas[10].split("¬");
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

            crearCombo(listaTipo, "cboTipoBien", "Seleccione");
            listarGrupoItem();
            crearCombo(listaTipoUso, "cboTipoUso", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
            crearCombo(listaCuentaMayor, "cboCuentaMayor", "Seleccione");
            listarSubCuentaItem();

            crearCombo(listaTipoUso, "cboTipoUsoInact", "Seleccione");
            crearCombo(listaTipo, "cboTipoBienInact", "Seleccione");
        }

        else {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
        }
    }
}

//function listarCtaBalance() {
//    var nRegistros = listaCuentas.length;
//    var contenido = "<option value=''>Seleccione</option>";
//    var idBalance, idCta, idSubCta, nombre, cuentas;
//    for (var i = 0; i < nRegistros; i++) {
//        cuentas = listaCuentas[i].split('|');
//        idBalance = cuentas[0];
//        idCta = cuentas[1];
//        idSubCta = cuentas[2];
//        nombre = cuentas[3];
//        if (idBalance != "00" && idCta == "00" && idSubCta == "00") {
//            contenido += "<option value='";
//            contenido += idBalance;
//            contenido += "'>";
//            contenido += idBalance+'-'+nombre;
//            contenido += "</option>";
//        }
//    }
//    var cbo = document.getElementById("cboCtaBalance");
//    if (cbo != null) cbo.innerHTML = contenido;
//    listarCta();
//}

//function listarCta() {
//    var nRegistros = listaCuentas.length;
//    var contenido = "<option value=''>Seleccione</option>";
//    var idBalance, idCta, idSubCta, nombre, cuentas;
//    var idxBalance = document.getElementById("cboCtaBalance").value;
//    for (var i = 0; i < nRegistros; i++) {
//        cuentas = listaCuentas[i].split('|');
//        idBalance = cuentas[0];
//        idCta = cuentas[1];
//        idSubCta = cuentas[2];
//        nombre = cuentas[3];
//        if (idBalance == idxBalance  && idCta != "00" && idSubCta == "00") {
//            contenido += "<option value='";
//            contenido += idCta;
//            contenido += "'>";
//            contenido += idCta + '-' + nombre;
//            contenido += "</option>";
//        }
//    }
//    var cbo = document.getElementById("cboCta");
//    if (cbo != null) cbo.innerHTML = contenido;
//    listarSubCta();
//}

//function listarSubCta() {
//    var nRegistros = listaCuentas.length;
//    var contenido = "<option value=''>Seleccione</option>";
//    var idBalance, idCta, idSubCta, nombre, cuentas;
//    var idxBalance = document.getElementById("cboCtaBalance").value;
//    var idxCta = document.getElementById("cboCta").value;
//    for (var i = 0; i < nRegistros; i++) {
//        cuentas = listaCuentas[i].split('|');
//        idBalance = cuentas[0];
//        idCta = cuentas[1];
//        idSubCta = cuentas[2];
//        nombre = cuentas[3];
//        if (idBalance == idxBalance && idCta == idxCta && idSubCta != "00") {
//            contenido += "<option value='";
//            contenido += idSubCta;
//            contenido += "'>";
//            contenido += idSubCta + '-' + nombre;
//            contenido += "</option>";
//        }
//    }
//    var cbo = document.getElementById("cboSubCta");
//    if (cbo != null) cbo.innerHTML = contenido;
//}

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


function grabarDatosPlanCta(tabPlan) {
    var data = ""
    var frm = new FormData();

    var clasePopup = "Popup";
    if (tipoPlanCta == SUB_CTA) clasePopup = "PopupSubCta";

    data = obtenerDatosGrabar(clasePopup);

    var txtAnhoFiscal = document.getElementById("txtAnioFiscal").value;
    data += "|" + txtAnhoFiscal;

    frm.append("data", data);
    Http.post("General/guardar/?tbl=" + controller + vista + tabPlan, mostrarGrabar, frm);
}

function grabarDatos() {
    var data = ""
    data = obtenerDatosGrabar("Popup");

    if (vista == "PlanContable") {
        var controles = document.getElementsByClassName("optionsNivel");
        var nControles = controles.length;
        var idNivel, idTipo;
        for (var i = 0; i < nControles; i++) {
            if (controles[i].checked == true) {
                idNivel = controles[i].getAttribute("data-id");
            }
        }

        var controlesTipo = document.getElementsByClassName("optionsTipo");
        var nControlesTipo = controlesTipo.length;
        for (var i = 0; i < nControlesTipo; i++) {
            if (controlesTipo[i].checked == true) {
                idTipo = controlesTipo[i].getAttribute("data-id");
            }
        }
        var datos = data.split('|');

        var idSecuencia = datos[0];
        var divisionaria = datos[4];
        var balance = datos[1] ? datos[1] : (idNivel == "B" ? divisionaria : '');
        var cta = datos[2] ? datos[2] : (idNivel == "C" ? balance + divisionaria : '');
        var subCta = datos[3] ? datos[3] : (idNivel == "S" ? cta + divisionaria : '');
        var registro = (idNivel == "R" ? subCta + divisionaria : '');
        var nombreCta = datos[5];
        var ctaCodigo = registro ? registro : (subCta ? subCta : (cta ? cta : balance));

        data = idSecuencia +
            '|' + (balance ? balance : '00') +
            '|' + (cta ? cta : '00') +
            '|' + (subCta ? subCta : '00') +
            '|' + (registro ? registro : '00') +
            '|' + nombreCta +
            '|' + ctaCodigo +
            '|' + idNivel +
            '|' + idTipo;
    }

    var frm = new FormData();
    frm.append("data", data);
    Http.post("General/guardar/?tbl=" + controller + vista, mostrarGrabar, frm);
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
    if (rpta) {
        listas = rpta.split("¯")
        lista = listas[0].split("¬");
        mensajeResul = listas[1].split("|");
        var tipo = mensajeResul[0];
        var mensaje = mensajeResul[1];
        divPopupContainer.style.display = 'none';
        grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

        var cboPlanContable = document.getElementById("cboPlanContable");
        if (cboPlanContable != null) {
            var listaPadre = listas[2].split("¬");
            crearCombo(listaPadre, "cboPlanContable", "Primer Nivel");
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
    if (vista == "PlanContable") {
        //if (tipoPlanCta)
        //    Http.get("General/obtenerTabla/?tbl=" + controller + vista + tipoPlanCta + '&id=' + id, mostrarRegistro);
        Http.get("General/obtenerTabla/?tbl=" + controller + vista + '&id=' + id, mostrarRegistro);
    }
    else {
        Http.get("General/obtenerTabla/?tbl=" + controller + vista + '&id=' + id, mostrarRegistro);
    }
}

function eliminarRegistroPlanCta(id) {
    var data = "";
    data = id;

    var txtAnhoFiscal = document.getElementById("txtAnioFiscal").value;
    data += "|" + txtAnhoFiscal;

    var frm = new FormData();
    frm.append("data", data);

    Swal.fire({
        title: '¿Desea eliminar el registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value) {
            Http.post("General/eliminar/?tbl=" + controller + vista + tipoPlanCta, mostrarEliminar, frm);
        }
    })
}

function eliminarRegistro(id) {
    var data = "";
    data = id;

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

        var cboEstadoSubCta = document.getElementById("cboEstadoSubCta");
        if (cboEstadoSubCta != null) { cboEstadoSubCta.disabled = false };

        var divPopupContainer = document.getElementById("divPopupContainer");
        if (divPopupContainer != null) { divPopupContainer.style.display = 'block'; };

        var claseControles = "Popup";
        if (vista == "PlanContable") {
            ocultarSeccionNivelCuenta('B');

            cargarComboNivelCuenta('B', function (data) {
                txtIdRegistro.value = campos[0];

                var nivel = campos[1];
                if (nivel == "1") {
                    configurarSeccionNivelCuenta('B')
                    txtDivisionaria.value = campos[2];

                    optBalance.checked = true;
                }

                if (nivel == "2") {
                    configurarSeccionNivelCuenta('C');
                    txtDivisionaria.value = campos[3].substr(campos[2].length);

                    optCuenta.checked = true;

                    cboBalance.value = campos[2];
                    seleccionarControlSelect2(cboBalance);
                }

                if (nivel == "3") {
                    configurarSeccionNivelCuenta('S');
                    txtDivisionaria.value = campos[4].substr(campos[3].length);;

                    optSubCuenta.checked = true;

                    cboBalance.value = campos[2];
                    seleccionarControlSelect2(cboBalance);

                    cargarComboNivelCuenta('C|' + campos[2], function (data) {
                        cboCta.value = campos[3];
                        seleccionarControlSelect2(cboCta);
                    });
                }

                if (nivel == "4") {
                    configurarSeccionNivelCuenta('R');
                    txtDivisionaria.value = campos[5].substr(campos[4].length);;

                    optRegistro.checked = true;

                    cboBalance.value = campos[2];
                    seleccionarControlSelect2(cboBalance);

                    cargarComboNivelCuenta('C|' + campos[2], function (data) {
                        cboCta.value = campos[3];
                        seleccionarControlSelect2(cboCta);

                        cargarComboNivelCuenta('S|' + campos[3], function (data) {
                            cboSubCta.value = campos[4];
                            seleccionarControlSelect2(cboSubCta);
                        });
                    });
                }

                txtNombre.value = campos[6];
                lblCuentaContable.innerText = campos[7];

                var tipo = campos[8]?.split(';');

                var controlTipo = document.querySelector('input[data-id="' + tipo[1] + '"]');
                if (controlTipo) controlTipo.checked = true;
            });
            return;
        }
        else if (vista == "FamiliaCuenta") {

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
            listarClasificadorItem();
            cboClasificador.value = campos[7];
            document.getElementById('select2-cboClasificador-container').innerHTML = cboClasificador.options[cboClasificador.selectedIndex].text;

            cboCuentaMayor.value = campos[8];
            listarSubCuentaItem();
            document.getElementById('select2-cboCuentaMayor-container').innerHTML = cboCuentaMayor.options[cboCuentaMayor.selectedIndex].text;
            cboSubCuenta.value = campos[9];
            document.getElementById('select2-cboSubCuenta-container').innerHTML = cboSubCuenta.options[cboSubCuenta.selectedIndex].text;
            cboEstado.value = campos[10];
            document.getElementById("divPopupContainer").style.display = 'block';
            return;
        }

        var controles = document.getElementsByClassName(claseControles);
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

    var tabMayor = document.getElementById("tabMayor");
    if (tabMayor != null) tabMayor.onclick = function () {
        idTabActivo = "tabMayor";
        tipoPlanCta = CTA_MAYOR;
        getListarPlanCta(tipoPlanCta);
        mostrarFormTabPlanCta("formTabMayor");
        ocultarFormTabPlanCta("formTabSubCta");
    }

    var tabSubCta = document.getElementById("tabSubCta");
    if (tabSubCta != null) tabSubCta.onclick = function () {
        idTabActivo = "tabSubCta";
        tipoPlanCta = SUB_CTA;
        getListarPlanCta(tipoPlanCta);

        mostrarFormTabPlanCta("formTabSubCta");
        ocultarFormTabPlanCta("formTabMayor");
    }

    var btnNuevo = document.getElementById("btnNuevo");
    if (btnNuevo != null) btnNuevo.onclick = function () {
        divPopupContainer.style.display = 'block';
        limpiarForm("Popup");
        limpiarForm("PopupSubCta");

        var txtAnio = document.getElementById("txtAnio");
        if (txtAnio != null) {
            var anio = txtAnio.getAttribute('value');
            txtAnio.value = anio;
        }

        let tituloModal = document.getElementById("tituloModal");
        if (tituloModal != null) {
            tituloModal.innerText = "Nuevo Registro";
        }

        var cboEstado = document.getElementById("cboEstado");
        if (cboEstado != null) {
            cboEstado.value = 1;
            cboEstado.disabled = true;
        }

        var cboEstadoSubCta = document.getElementById("cboEstadoSubCta");
        if (cboEstadoSubCta != null) {
            cboEstadoSubCta.value = 1;
            cboEstadoSubCta.disabled = true;
        }

        var txtAnioPerido = document.getElementById("txtAnioPerido");
        if (txtAnioPerido != null) {
            var anio = txtAnioPerido.getAttribute('value');
            txtAnioPerido.value = anio;
        }
        var select2cboGrupo = document.getElementById("select2-cboGrupo-container");
        if (select2cboGrupo != null) select2cboGrupo.innerHTML = "Seleccione";
        var select2cboOClase = document.getElementById("select2-cboClase-container");
        if (select2cboOClase != null) select2cboOClase.innerHTML = "Seleccione";
        var select2cboFamilia = document.getElementById("select2-cboFamilia-container");
        if (select2cboFamilia != null) select2cboFamilia.innerHTML = "Seleccione";
        var select2cboClasificador = document.getElementById("select2-cboClasificador-container");
        if (select2cboClasificador != null) select2cboClasificador.innerHTML = "Seleccione";

        var select2cboCuentaMayor = document.getElementById("select2-cboCuentaMayor-container");
        if (select2cboCuentaMayor != null) select2cboCuentaMayor.innerHTML = "Seleccione";
        var select2cboSubCuenta = document.getElementById("select2-cboSubCuenta-container");
        if (select2cboSubCuenta != null) select2cboSubCuenta.innerHTML = "Seleccione";

        var select2cboCuentaFamilia = document.getElementById("select2-cboCuentaFamilia-container");
        if (select2cboCuentaFamilia != null) select2cboCuentaFamilia.innerHTML = "Seleccione";


        var cboTipoUso = document.getElementById("cboTipoUso");
        if (cboTipoUso != null) {
            cboTipoUso.value = 2;
        }

        //var txtFechaPedido = document.getElementById("txtFechaPedido");
        //if (txtFechaPedido != null) txtFechaPedido.value = txtFechaPedido.getAttribute("data-fecha");

        if (vista == "PlanContable") {
            optBalance.checked = true;
            ocultarSeccionNivelCuenta('B');

            configurarSeccionNivelCuenta("B")
            cargarComboNivelCuenta("B");

            cboBalance.value = "Seleccione";
            seleccionarControlSelect2(cboBalance);

            cboCta.innerHTML = "Seleccione";
            seleccionarControlSelect2(cboCta);

            cboSubCta.innerHTML = "Seleccione";
            seleccionarControlSelect2(cboSubCta);

            lblCuentaContable.innerText = "";
        }
    }

    var btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar != null) btnGuardar.onclick = function () {
        var validar = false;
        var claseReque = "Reque";

        if (validarInformacion(claseReque) == true) {
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

                    //if (vista == "PlanContable") {
                    //    grabarDatosPlanCta(tipoPlanCta);
                    //}
                    //else {
                    grabarDatos();
                    // }

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

    var btnConsultar = document.getElementById("btnConsultar");
    if (btnConsultar != null) btnConsultar.onclick = function () {

        if (vista == "PlanContable") {
            getListarPlanCta(tipoPlanCta);
        }
        else if (vista == "FamiliaCuenta") {
            Http.get("General/listarTabla?tbl=" + controller + vista + "&data=", mostarlistaActualizarEstado);
        }
        else {
            getListar();
        }
    }

    var btnCancelarForm1 = document.getElementById("btnCancelarForm1");
    if (btnCancelarForm1 != null) btnCancelarForm1.onclick = function () {
        divPopupContainerForm1.style.display = 'none';
    }

    var btnListado = document.getElementById("btnListado");
    if (btnListado != null) btnListado.onclick = function () {
        var data = "";
        if (vista == "FamiliaCuenta") {
            limpiarForm("PopupInact");
            //cboTipoUsoInact.value = 2;
            //cboTipoBienInact.value = "B";
            spnLoadData.style.display = "block";
            listaInactivo.style.display = 'none';
            //data= txtAnioPeridoInact.value + '|' + cboTipoUsoInact.value + '|' + cboTipoBienInact.value + '||2';
            Http.get("General/listarTabla?tbl=" + controller + vista + "Estado" + "&data=", function (response) {
                if (response) {
                    var listas = response.split("¯");
                    var lista = listas[0].split("¬");
                    grillaItems = new GrillaScroll(lista, "divListaInactivo", 1000, 3, vista, controller, null, null, null, null, 25, false, true);
                    spnLoadData.style.display = 'none';
                    listaInactivo.style.display = 'block';
                }
            });
            divPopupContainerForm1.style.display = 'block';
        }
        else if (vista == "PlanContable") {

            var container = document.querySelector('#mytab');
            let tabs = Array.prototype.slice.apply(container.querySelectorAll('.nav-tabs .active'));
            var idTabActivo = tabs[0].attributes[1].value;
            var idTipo = "";
            switch (idTabActivo) {
                case "tabMayor": idTipo = "1"; break;
                case "tabSubCta": idTipo = "2"; break;
                default: idTipo = "1"; break;
            }

            cboTipoCuentaInact.value = idTipo;
            spnLoadData.style.display = "block";
            listaInactivo.style.display = 'none';
            data = txtAnioPeridoInact.value + '|' + cboTipoCuentaInact.value + '|2';
            Http.get("General/listarTabla?tbl=" + controller + vista + "Filtro" + "&data=" + data, function (response) {
                if (response) {
                    var listas = response.split("¯");
                    var lista = listas[0].split("¬");
                    grillaItems = new GrillaScroll(lista, "divListaInactivo", 1000, 3, vista, controller, null, null, null, null, 25, false, true);
                    spnLoadData.style.display = 'none';
                    listaInactivo.style.display = 'block';
                }
            });
            divPopupContainerForm1.style.display = 'block';
        }

    }

    var btnConsultarInact = document.getElementById("btnConsultarInact");
    if (btnConsultarInact != null) btnConsultarInact.onclick = function () {
        var data = "";
        if (vista == "FamiliaCuenta") {
            spnLoadData.style.display = "block";
            listaInactivo.style.display = 'none';
            data = txtAnioPeridoInact.value + '|' + cboTipoUsoInact.value + '|' + cboTipoBienInact.value + '|' + txtCuentaInact.value + '|2';
            Http.get("General/listarTabla?tbl=" + controller + vista + "Estado" + "&data=" + data, function (response) {
                if (response) {
                    var listas = response.split("¯");
                    var lista = listas[0].split("¬");
                    grillaItems = new GrillaScroll(lista, "divListaInactivo", 1000, 3, vista, controller, null, null, null, null, 25, false, true);
                    spnLoadData.style.display = 'none';
                    listaInactivo.style.display = 'block';
                }
            });
        }
        else if (vista == "PlanContable") {
            spnLoadData.style.display = "block";
            listaInactivo.style.display = 'none';
            data = txtAnioPeridoInact.value + '|' + cboTipoCuentaInact.value + '|2';
            Http.get("General/listarTabla?tbl=" + controller + vista + "Filtro" + "&data=" + data, function (response) {
                if (response) {
                    var listas = response.split("¯");
                    var lista = listas[0].split("¬");
                    grillaItems = new GrillaScroll(lista, "divListaInactivo", 1000, 3, vista, controller, null, null, null, null, 25, false, true);
                    spnLoadData.style.display = 'none';
                    listaInactivo.style.display = 'block';
                }
            });
        }
    }

    var btnSeleccionarItems = document.getElementById("btnSeleccionarItems");
    if (btnSeleccionarItems != null) btnSeleccionarItems.onclick = function () {
        var ids = grillaItems.obtenerIdsChecks();
        var data = "";
        if (vista == "FamiliaCuenta") {
            let filtro = txtAnio.value + '||||1';

            for (var i = 0; i < ids.length; i++) {
                fila = grillaItems.obtenerFilaCheckPorId(ids[i]);
                if (fila.length > 0) {
                    id = fila[0];
                    data += (id + ",");
                }
            }
            data = data.substring(0, data.length - 1);
            let datos = data + '¯' + filtro;
            var frm = new FormData();
            frm.append("data", datos);
            Http.post("General/guardar/?tbl=" + controller + vista + 'ActualizarEstado', mostarlistaActualizarEstado, frm);
            divPopupContainerForm1.style.display = 'none';
            return;
        }
        else if (vista == "PlanContable") {
            var container = document.querySelector('#mytab');
            let tabs = Array.prototype.slice.apply(container.querySelectorAll('.nav-tabs .active'));
            var idTabActivo = tabs[0].attributes[1].value;
            var idTipo = "";
            switch (idTabActivo) {
                case "tabMayor": idTipo = "1"; break;
                case "tabSubCta": idTipo = "2"; break;
                default: idTipo = "1"; break;
            }
            let filtro = txtAnio.value + '|' + idTipo + '|1';
            for (var i = 0; i < ids.length; i++) {
                fila = grillaItems.obtenerFilaCheckPorId(ids[i]);
                if (fila.length > 0) {
                    id = fila[0];
                    data += (id + ",");
                }
            }
            data = data.substring(0, data.length - 1);
            let datos = data + '¯' + cboTipoCuentaInact.value + '¯' + filtro;
            var frm = new FormData();
            frm.append("data", datos);
            Http.post("General/guardar/?tbl=" + controller + vista + 'ActualizarEstado', mostarlistaActualizarEstado, frm);
            divPopupContainerForm1.style.display = 'none';
            return;
        }

    }
}

function configurarCombos() {

    var cboTipoUso = document.getElementById("cboTipoUso");
    if (cboTipoUso != null) cboTipoUso.onchange = function () {
        listarGrupoItem();
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

    var cboFamilia = document.getElementById("cboFamilia");
    if (cboFamilia != null) cboFamilia.onchange = function () {
        listarClasificadorItem();//cboClasificador
    }

    var cboCuentaMayor = document.getElementById("cboCuentaMayor");
    if (cboCuentaMayor != null) cboCuentaMayor.onchange = function () {
        listarSubCuentaItem();
    }

    var cboTipoCuentaInact = document.getElementById("cboTipoCuentaInact");
    if (cboTipoCuentaInact != null) cboTipoCuentaInact.onchange = function () {
        if (vista == "PlanContable") {
            spnLoadData.style.display = "block";
            listaInactivo.style.display = 'none';
            data = txtAnioPeridoInact.value + '|' + cboTipoCuentaInact.value + '|2';
            Http.get("General/listarTabla?tbl=" + controller + vista + "Filtro" + "&data=" + data, function (response) {
                if (response) {
                    var listas = response.split("¯");
                    var lista = listas[0].split("¬");
                    grillaItems = new GrillaScroll(lista, "divListaInactivo", 1000, 3, vista, controller, null, null, null, null, 25, false, true);
                    spnLoadData.style.display = 'none';
                    listaInactivo.style.display = 'block';
                }
            });
        }
    }

    if (vista == "PlanContable") {
        var cboBalance = document.getElementById("cboBalance");
        if (cboBalance != null) cboBalance.onchange = function () {
            cboCta.innerHTML = "Seleccione";
            var select2cboCta = document.getElementById("select2-cboCta-container");
            if (select2cboCta != null) select2cboCta.innerHTML = "Seleccione";

            cboSubCta.innerHTML = "Seleccione";
            var select2cboSubCta = document.getElementById("select2-cboSubCta-container");
            if (select2cboSubCta != null) select2cboSubCta.innerHTML = "Seleccione";

            var data = "C|" + cboBalance.value;
            cargarComboNivelCuenta(data);

            lblCuentaContable.innerText = cboBalance.value + txtDivisionaria.value;
        }

        var cboCta = document.getElementById("cboCta");
        if (cboCta != null) cboCta.onchange = function () {

            cboSubCta.innerHTML = "Seleccione";
            var select2cboSubCta = document.getElementById("select2-cboSubCta-container");
            if (select2cboSubCta != null) select2cboSubCta.innerHTML = "Seleccione";

            var data = "S|" + cboCta.value;
            cargarComboNivelCuenta(data);

            lblCuentaContable.innerText = cboCta.value + txtDivisionaria.value;
        }

        var cboSubCta = document.getElementById("cboSubCta");
        if (cboSubCta != null) cboSubCta.onchange = function () {
            lblCuentaContable.innerText = cboSubCta.value + txtDivisionaria.value;
        }
    }
}

function configurarCampos() {
    if (vista == "PlanContable") {
        var txtDivisionaria = document.getElementById("txtDivisionaria");
        if (txtDivisionaria) txtDivisionaria.onkeyup = function () {
            var prevCtaContable = "";

            if (optBalance.checked)
                prevCtaContable = "";
            if (optCuenta.checked)
                prevCtaContable = cboBalance.value;
            if (optSubCuenta.checked)
                prevCtaContable = cboCta.value;
            if (optRegistro.checked)
                prevCtaContable = cboSubCta.value;

            lblCuentaContable.innerText = (prevCtaContable + txtDivisionaria.value);
        }
    }
}

function configurarOpciones() {
    if (vista == "PlanContable") {
        var optionsNivelCuenta = document.getElementsByName('optionsNivel');

        for (var i = 0; i < optionsNivelCuenta.length; i++) {
            optionsNivelCuenta[i].addEventListener('change', function () {
                var nivelCuenta = this.getAttribute('data-id');
                ocultarSeccionNivelCuenta(nivelCuenta);
                configurarSeccionNivelCuenta(nivelCuenta);
            });
        }
    }
}

function ocultarSeccionNivelCuenta(nivelCuenta) {
    var controles = document.getElementsByClassName("seccionNivelCuenta");

    for (var j = 0; j < controles.length; j++) {
        control = controles[j];
        control.style.display = 'none';
    }
    if (nivelCuenta == "B") {
        cboBalance.value = "";
        seleccionarControlSelect2(cboBalance);

        cboCta.innerHTML = "Seleccione";
        seleccionarControlSelect2(cboCta);

        cboSubCta.innerHTML = "Seleccione";
        seleccionarControlSelect2(cboSubCta);

        lblCuentaContable.innerText = "";
    }
    if (nivelCuenta == "C") {
        cboCta.value = "";
        seleccionarControlSelect2(cboCta);

        cboSubCta.innerHTML = "Seleccione";
        seleccionarControlSelect2(cboSubCta);

        lblCuentaContable.innerText = cboBalance.value;
    }
    if (nivelCuenta == "S") {
        cboSubCta.value = "";
        seleccionarControlSelect2(cboSubCta);

        lblCuentaContable.innerText = cboCta.value;
    }
    if (nivelCuenta == "R") {

    }

}

function configurarSeccionNivelCuenta(nivelCuenta) {
    txtDivisionaria.value = "";
    cboBalance.classList.remove("Reque");
    cboCta.classList.remove("Reque");
    cboSubCta.classList.remove("Reque");

    if (nivelCuenta == "B") {
        txtDivisionaria.setAttribute("maxlength", "2");
    }
    else {
        if (nivelCuenta == "C") {
            txtDivisionaria.setAttribute("maxlength", "1");
            seccionBalance.style.display = 'block';
            cboBalance.classList.add("Reque");
        }
        if (nivelCuenta == "S") {
            txtDivisionaria.setAttribute("maxlength", "1");
            seccionBalance.style.display = 'block';
            seccionCta.style.display = 'block';

            cboBalance.classList.add("Reque");
            cboCta.classList.add("Reque");
        }
        if (nivelCuenta == "R") {
            txtDivisionaria.setAttribute("maxlength", "6");
            seccionBalance.style.display = 'block';
            seccionCta.style.display = 'block';
            seccionSubCta.style.display = 'block';

            cboBalance.classList.add("Reque");
            cboCta.classList.add("Reque");
            cboSubCta.classList.add("Reque");
        }
    }
}

function cargarComboNivelCuenta(data, callback = null) {
    //spnLoadData.style.display = "block";

    Http.get("General/listarTabla?tbl=" + controller + vista + "NivelCuentaFiltro&data=" + data, function (rpta) {
        var nivelCuenta = data.split('|')[0];

        var lista = rpta.split("¬");

        if (nivelCuenta == "B") {
            crearCombo(lista, "cboBalance", "Seleccionar");
        }
        if (nivelCuenta == "C") {
            crearCombo(lista, "cboCta", "Seleccionar");
        }
        if (nivelCuenta == "S") {
            crearCombo(lista, "cboSubCta", "Seleccionar");
        }

        //    spnLoadData.style.display = 'none';
        if (callback) {
            return callback('ok');
        }
    });
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
    if (vista == "PlanContable") {
        Http.get("General/listarTabla?tbl=" + controller + vista + "Detalle" + "&data=" + idRegistro, function (response) {
            if (response) {
                var campos = response.split("|");
                lblBalance.innerHTML = campos[0];
                lblCta.innerHTML = campos[1];
                lblSubCta.innerHTML = campos[2];
            }
            else {
                mostrarMensaje("No se encontro el detalle de la cuenta", "error");
            }
        });
    }
}

function mostrarFormTabPlanCta(idTab) {
    var divPopupFormTab = document.getElementById(idTab);
    if (divPopupFormTab != null) { divPopupFormTab.style.display = 'block'; };
}

function ocultarFormTabPlanCta(idTab) {
    var divPopupFormTab = document.getElementById(idTab);
    if (divPopupFormTab != null) { divPopupFormTab.style.display = 'none'; };
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

    var cboClasificador = document.getElementById("cboClasificador");
    if (cboClasificador != null) {
        listarClasificadorItem();
    }

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

function listarClasificadorItem() {
    var idTipoUsoItem = cboTipoUso.value;
    var idTipoItem = cboTipoBien.value;
    var idGrupoItem = cboGrupo.value;
    var idClaseItem = cboClase.value;
    var idFamiliaItem = cboFamilia.value;
    var nRegistros = listaClasificadorItem.length;
    var contenido = "<option value=''>Seleccione</option>";
    var campos, idCodigo, nombre, idxTipoUsoItem, idxTipoItem, idxGrupoItem, idxClaseItem,
        idxFamiliaItem;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaClasificadorItem[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxTipoUsoItem = campos[2];
        idxTipoItem = campos[3];
        idxGrupoItem = campos[4];
        idxClaseItem = campos[5];
        idxFamiliaItem = campos[6];
        if (idxTipoUsoItem == idTipoUsoItem && idxTipoItem == idTipoItem && idxGrupoItem == idGrupoItem && idxClaseItem == idClaseItem && idxFamiliaItem == idFamiliaItem) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById("cboClasificador");
    if (cbo != null) cbo.innerHTML = contenido;
}
function mostarlistaActualizarEstado(response) {
    if (response) {
        var listas = response.split("¯");
        var lista = listas[0].split("¬");
        grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
    }
};

function seleccionarControlSelect2(control) {
    var controlSelect = 'select2-' + control.id + '-container';
    var cboControlSelect = document.getElementById(controlSelect);
    if (cboControlSelect != null) {
        var selected = control.options[control.selectedIndex]?.text;
        if (selected)
            cboControlSelect.innerHTML = selected;
        else
            cboControlSelect.innerHTML = "Seleccione";
    }
}

function soloNumeros(event) {
    if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}