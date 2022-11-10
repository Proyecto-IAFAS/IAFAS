var idTabActivo = "";
var idCombos = [];
var listas = [];
var ayudas = [];
var formulario = [];
var filaAnterior = null;
var vista = "";
var controller = "";
var idRegistro = "";
var idRegistroRep = "";

var listaUbicaFisica_v = [];
var listaUbicaFisicaAsignacion_v = [];
var listaReponsableItemAsignacion_v = [];
var listaActivos_v = [];
var listaCuentaContables_v = [];
var listaPorcentaje_v = [];
var listaUIT_v = [];
var listaClases_v = []
var listaFamilias_v = []

var FLAG_INICIAL_INVENTARIO_INICIAL = 1;
var FLAG_INICIAL_ALTAS = 0;
var MAYOR_NO_DEPRECIABLE = 9105; //NO DEPRECIABLE
var MAYOR_DEPRECIABLE = 1503; //DEPRECIABLE

var TIPO_ALTAS = 1;
var TIPO_BAJAS = 2;
var idTabActivo = 'tabAltas';

var dataImport = "";
var dataDeta = "";
var anioFiscal = "";
var periodo = "";
var tabGeneral = "";
var EST_PENDIENTE = 1;
var EST_APROBADO = 2;
var EST_ANULADO = 3;

var esOrdenAprobadoOAnulado = false;
var esBienDepreciable = false;


window.onload = function () {
    getConfigMn();
    vista = window.sessionStorage.getItem("Vista");
    controller = window.sessionStorage.getItem("Controller");
    mostrarLoading("divLista");
    getListar();
    getIniciarConfiguracion();
    configurarBotones();
    configurarCombos();
    configurarCampos();
    configurarTabs();
    imgToBase64('/Riztie/Images/logoEmpresa.png', function (base64) {
        base64Img = base64;
    });
    configurarOpcionReportes();
}

var botonesAsignacion = [
    { "cabecera": "Ver", "clase": "fa fa-search btn btn-info btnCirculo", "id": "Ver" },
    { "cabecera": "Editar", "clase": "fa fa-pencil btn btn-info btnCirculo", "id": "Editar" },
    { "cabecera": "Anular", "clase": "fa fa-minus-circle btn btn-danger btnCirculo", "id": "Eliminar" },
]

var botonesOrdenAprobada = [
    { "cabecera": "Editar", "clase": "fa fa-search btn btn-info btnCirculo", "id": "Editar" },
];

var botonInventarioGeneral = [
    { "cabecera": "Editar", "clase": "fa fa-search btn btn-info btnCirculo", "id": "Editar" },
];

var botonTiposPatrimonio = [
    { "cabecera": "Editar", "clase": "fa fa-search btn btn-info btnCirculo", "id": "Editar" },
];

function getIniciarConfiguracion() {
    var data = ""
    if (vista == "Bajas" || vista == "General" || vista == "MantoActivo" || vista == "Asignacion") {
        Http.get("General/listarTabla?tbl=" + controller + vista + "Configuracion&data=" + data, configurarValores);
        var controlesPopup = document.getElementsByClassName("Popup");
        var controlesPopupValContable = document.getElementsByClassName("PopupValContable");
        var controlesPopupEspTecnica = document.getElementsByClassName("PopupEspTecnica");

        desahabilitarControles(controlesPopup);
        desahabilitarControles(controlesPopupValContable);
        desahabilitarControles(controlesPopupEspTecnica);
    }
}

function getListar() {
    var data = "";

    if (vista == "InventarioInicial") {
        var anioConsulta = document.getElementById('txtPeriodoCons')?.value;
        data = FLAG_INICIAL_INVENTARIO_INICIAL + '|' + anioConsulta;
    }
    if (vista == "Altas") {
        var anioConsulta = document.getElementById('txtPeriodoCons')?.value;
        data = anioConsulta;
    }
    if (vista == "CuentaContable") {
        var anioConsulta = document.getElementById('txtPeriodoCons')?.value;
        data = anioConsulta;
    }
    if (vista == "Bajas" || vista == "MantoActivo") {
        var anioConsulta = document.getElementById('txtPeriodoCons')?.value;
        data = anioConsulta;
    }
    if (vista == "General") {
        var anioConsulta = document.getElementById('txtPeriodoCons')?.value;
        var idTab = (idTabActivo == "tabAltas" ? TIPO_ALTAS : TIPO_BAJAS);
        data = idTab + '|' + anioConsulta;
    }

    if (vista == "Asignacion") {
        var anioConsulta = document.getElementById('txtPeriodoCons')?.value;
        data = anioConsulta;
    }

    if (vista == "Cierre") {
        var anioConsulta = document.getElementById('txtPeriodoCons')?.value;
        data = anioConsulta;
    }

    Http.get("General/listarTabla?tbl=" + controller + vista + "&data=" + data, mostrarlistas);
}

function getListarMovActivos(data) {
    if (vista == "Altas") {
        Http.get("General/listarTabla?tbl=" + controller + vista + "ActivosMov&data=" + data, mostrarlistasActivos);
    }
    else if (vista == "Bajas" || vista == "MantoActivo") {
        Http.get("General/listarTabla?tbl=" + controller + vista + "Activos&data=" + data, adicionarLista);
    }
}

function getObtenerReporteGeneralAltas(data) {
    Http.get("General/listarTabla?tbl=" + controller + vista + "Reporte&data=" + data, mostrarPreviewReporte);
}

function getObtenerReportePorOficina(data) {
    Http.get("General/listarTabla?tbl=" + controller + vista + "ReporteOficina&data=" + data, mostrarPreviewReporte);
}

function configurarValores(rpta) {
    if (rpta) {
        var listas = rpta.split("¯");
        listaUbicaFisica_v = listas[1].split("¬");
        listaActivos_v = listas[4].split("¬");

        var listaResponsable = listas[2].split("¬");
        var listaOficina = listas[3].split("¬");
        var listaActivos = listas[4].split("¬");
        var listaCentroCosto = listas[5].split("¬");
        var listaEstadoConserv = listas[6].split("¬");
        var listaMarcas = listas[7].split("¬");
        var listaPais = listas[8].split("¬");
        var listaEstadoTipo = listas[9].split("¬");
        var listaProveedor = listas[10].split("¬");
        var listaTipoDoc = listas[11].split("¬");
        var listaMeses = listas[12].split("¬");

        crearCombo(listaCentroCosto, "cboCentroCostoCons", "Ninguno");
        crearCombo(listaOficina, "cboOficinaCons", "Ninguno");

        crearCombo(listaResponsable, "cboResponsable", "Seleccione");
        crearCombo(listaResponsable, "cboUsuarioFinal", "Seleccione");
        crearCombo(listaOficina, "cboOficina", "Ninguno");
        crearCombo(listaActivos, "cboActivos", "Seleccione");
        crearCombo(listaCentroCosto, "cboCentroCosto", "Seleccione");
        crearCombo(listaEstadoConserv, "cboEstadoConserv", "Seleccione");
        crearCombo(listaMarcas, "cboMarcas", "Seleccione");
        crearCombo(listaPais, "cboPaisProcedencia", "Seleccione");
        crearCombo(listaEstadoTipo, "cboEstadoTipo", "Seleccione");
        crearCombo(listaProveedor, "cboProveedor", "Seleccione");
        crearCombo(listaTipoDoc, "cboTipoDoc", "Seleccionar");
        crearCombo(listaMeses, "cboMes", "Seleccione");

        if (vista == "General") {
            listaClases_v = listas[14].split("¬");
            listaFamilias_v = listas[15].split("¬");

            var listaGrupos = listas[13].split("¬");

            crearCombo(listaOficina, "cboOficinaRep", "Todos");
            crearCombo(listaResponsable, "cboResponsableRep", "Todos");
            crearCombo(listaResponsable, "cboUsuarioRep", "Todos");
            crearCombo(listaGrupos, "cboGrupoRep", "Todos");
        }
    }
}

function configurarOpcionReportes() {
    if (vista == "Altas") {
        var optAnioRep = document.getElementById("optAnioRep");
        if (optAnioRep) optAnioRep.onchange = function () {
            txtAnioRep.style.display = 'block';
        };

        var optNroMovRep = document.getElementById("optNroMovRep");
        if (optNroMovRep) optNroMovRep.onchange = function () {
            txtAnioRep.style.display = 'none';

            if (!idRegistroRep)
                mostrarMensaje("Seleccione un registro de la lista previamente", "error");
        };
    }

    if (vista == "General") {
        var optRepGeneral = document.getElementById("optRepGeneral");
        if (optRepGeneral) optRepGeneral.onchange = function () {
            var controles = document.getElementsByClassName("divOptReporte");
            ocultarControles(controles);

            divAnioRep.style.display = 'block';
            OptOficinaRep.style.display = 'block';
            OptUbicacionFisicaRep.style.display = 'block';
            OptResponsableRep.style.display = 'block';
            OptUsuarioRep.style.display = 'block';
        };

        var optRepRespActivo = document.getElementById("optRepRespActivo");
        if (optRepRespActivo) optRepRespActivo.onchange = function () {
            var controles = document.getElementsByClassName("divOptReporte");
            ocultarControles(controles);

            divAnioRep.style.display = 'block';
            OptUsuarioRep.style.display = 'block';
        };

        var optRepOficinaYUbiFis = document.getElementById("optRepOficinaYUbiFis");
        if (optRepOficinaYUbiFis) optRepOficinaYUbiFis.onchange = function () {
            var controles = document.getElementsByClassName("divOptReporte");
            ocultarControles(controles);

            divAnioRep.style.display = 'block';
            OptOficinaRep.style.display = 'block';
            OptUbicacionFisicaRep.style.display = 'block';
        };

        var optRepGrupoClaseFam = document.getElementById("optRepGrupoClaseFam");
        if (optRepGrupoClaseFam) optRepGrupoClaseFam.onchange = function () {
            var controles = document.getElementsByClassName("divOptReporte");
            ocultarControles(controles);

            divAnioRep.style.display = 'block';
            OptGrupoRep.style.display = 'block';
            OptClaseRep.style.display = 'block';
            OptFamiliaRep.style.display = 'block';
        };

        var optRepKardex = document.getElementById("optRepKardex");
        if (optRepKardex) optRepKardex.onchange = function () {
            var controles = document.getElementsByClassName("divOptReporte");
            ocultarControles(controles);

            OptCodItemRep.style.display = 'block';
            if (!txtCodItemRep.value)
                mostrarMensaje("Seleccione un registro de la lista previamente", "error");
        };

        var optRepSinUbiFis = document.getElementById("optRepSinUbiFis");
        if (optRepSinUbiFis) optRepSinUbiFis.onchange = function () {
            var controles = document.getElementsByClassName("divOptReporte");
            ocultarControles(controles);

            divAnioRep.style.display = 'block';
        };

        var optRepSinCtaContable = document.getElementById("optRepSinCtaContable");
        if (optRepSinCtaContable) optRepSinCtaContable.onchange = function () {
            var controles = document.getElementsByClassName("divOptReporte");
            ocultarControles(controles);

            divAnioRep.style.display = 'block';
        };
    }
}
function mostrarlistas(rpta) {
    if (rpta) {
        var listas = rpta.split("¯");
        var lista = listas[0].split("¬");
        if (vista == "CuentaContable") {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, null, null, 38, false, null);
        }
        else if (vista == "UbicaFisica") {
            var listaOficina = listas[1].split("¬");
            var listaResponsable = listas[2].split("¬");
            var listaEstado = listas[3].split("¬");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

            crearCombo(listaOficina, "cboOficina", "Seleccione");
            crearCombo(listaResponsable, "cboResponsable", "Seleccione");
            crearCombo(listaEstado, "cboEstado", "Seleccione");
        }
        else if (vista == "InventarioInicial" || vista == "Altas") {
            listaUbicaFisica_v = listas[1].split("¬");
            listaActivos_v = listas[4].split("¬");

            var listaResponsable = listas[2].split("¬");
            var listaOficina = listas[3].split("¬");
            var listaActivos = listas[4].split("¬");
            var listaCentroCosto = listas[5].split("¬");
            var listaEstadoConserv = listas[6].split("¬");
            var listaMarcas = listas[7].split("¬");
            var listaPais = listas[8].split("¬");
            var listaEstadoTipo = listas[9].split("¬");
            var listaProveedor = listas[10].split("¬");
            var listaTipoDoc = listas[11].split("¬");
            var listaMeses = listas[12].split("¬");

            listaCuentaContables_v = listas[13].split("¬");

            setPorcentajes(listas[14]);
            setUIT(listas[15]);

            anioFiscal = listas[16].split("|")[0];
            periodo = listas[16].split("|")[1];

            crearCombo(listaCentroCosto, "cboCentroCostoCons", "Ninguno");
            crearCombo(listaOficina, "cboOficinaCons", "Ninguno");

            crearCombo(listaResponsable, "cboResponsable", "Seleccione");
            crearCombo(listaResponsable, "cboUsuarioFinal", "Seleccione");
            crearCombo(listaOficina, "cboOficina", "Ninguno");
            crearCombo(listaActivos, "cboActivos", "Seleccione");
            crearCombo(listaCentroCosto, "cboCentroCosto", "Seleccione");
            crearCombo(listaEstadoConserv, "cboEstadoConserv", "Seleccione");
            crearCombo(listaMarcas, "cboMarcas", "Seleccione");
            crearCombo(listaPais, "cboPaisProcedencia", "Seleccione");
            crearCombo(listaEstadoTipo, "cboEstadoTipo", "Seleccione");
            crearCombo(listaProveedor, "cboProveedor", "Seleccione");
            crearCombo(listaTipoDoc, "cboTipoDoc", "Seleccionar");
            crearCombo(listaMeses, "cboMes", "Seleccione");

            if (document.getElementById('cboOficinaReporte'))
                crearCombo(listaOficina, "cboOficinaReporte", "Todos");

            if (vista == "Altas") {
                var listaTipoDoc = listas[16].split("¬");
                var listaTipoMov = listas[17].split("¬");
                var listaEstadoMov = listas[18].split("¬");

                anioFiscal = listas[19].split("|")[0];
                periodo = listas[19].split("|")[1];

                crearCombo(listaMeses, "cboMesesCab", "Seleccione");
                crearCombo(listaTipoDoc, "cboTipoDocCab", "Seleccione");
                crearCombo(listaTipoMov, "cboTipoMovCab", "Seleccione");
                crearCombo(listaTipoMov, "cboCausalAltaCab", "Seleccione");
                crearCombo(listaEstadoMov, "cboEstadoCab", "Seleccione");
                grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 20, false, null);
            }
            else {
                grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, null, 20, false, null);
            }
        }

        else if (vista == "MantoActivo") {
            anioFiscal = listas[1].split("|")[0];
            periodo = listas[1].split("|")[1];

            var listaMeses = listas[2].split("¬");
            var listaTipoMantenimientos = listas[3].split("¬");
            var listaProveedor = listas[4].split("¬");
            var listaEstadoMov = listas[5].split("¬");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

            crearCombo(listaMeses, "cboMesesCab", "Seleccione");
            crearCombo(listaTipoMantenimientos, "cboTipoMantenimientoCab", "Seleccione");
            crearCombo(listaProveedor, "cboProveedorCab", "Seleccione");
            crearCombo(listaEstadoMov, "cboEstadoCab", "Seleccione");
        }

        else if (vista == "Bajas") {
            anioFiscal = listas[1].split("|")[0];
            periodo = listas[1].split("|")[1];

            var listaMeses = listas[2].split("¬");
            var listaTipoMov = listas[3].split("¬");
            var listaCausalBajas = listas[4].split("¬");
            var listaEstadoMov = listas[5].split("¬");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

            crearCombo(listaMeses, "cboMesesCab", "Seleccione");
            crearCombo(listaTipoMov, "cboTipoMovCab", "Seleccione");
            crearCombo(listaCausalBajas, "cboCausalBaja", "Seleccione");
            crearCombo(listaEstadoMov, "cboEstadoCab", "Seleccione");
        }
        else if (vista == "Asignacion") {
            anioFiscal = listas[1].split("|")[0];
            periodo = listas[1].split("|")[1];

            var listaOficinas = listas[2].split("¬");
            listaUbicaFisica_v = listas[3].split("¬");
            var listaEmpleados = listas[4].split("¬");
            var listaEstados = listas[5].split("¬");

            var listaOficinasActual = listas[6].split("¬");
            listaUbicaFisicaAsignacion_v = listas[7].split("¬");
            listaReponsableItemAsignacion_v = listas[8].split("¬");

            crearCombo(listaOficinasActual, "cboOfiActual", "Seleccione");
            crearCombo(listaOficinas, "cboOfiNuevo", "Seleccione");
            crearCombo(listaEmpleados, "cboAutoriza", "Seleccione");
            crearCombo(listaEmpleados, "cboResItemNuevo", "Seleccione");
            crearCombo(listaEstados, "cboEstadoCab", "Seleccione");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botonesAsignacion, 38, false, null);
        }
        else if (vista == "Cierre") {
            anioFiscal = listas[1].split("|")[0];
            periodo = listas[1].split("|")[1];

            var listaMeses = listas[2].split("¬");

            crearCombo(listaMeses, "cboMesActual", "Seleccione");
            crearCombo(listaMeses, "cboMesNuevo", "Seleccione");

            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, null, 38, false, null);
        }
        else if (vista == "General") {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botonInventarioGeneral, 38, false, null);
        }
        else if (vista == "TiposPatrimonio") {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, null, 38, false, null);
        }
        else if (vista == "TasaUIT") {
            var tituloTasa = listas[0].split("¬");
            var tituloValorUnidad = listas[1].split("¬");

            var listaTasa = listas[2].split("¬");
            var listaValorUnidad = listas[3].split("¬");

            var lblTituloTasa = document.getElementById("lblTituloTasa");
            if (lblTituloTasa != null) lblTituloTasa.innerText = tituloTasa;

            var lblTituloValorUnidad = document.getElementById("lblTituloValorUnidad");
            if (lblTituloValorUnidad != null) lblTituloValorUnidad.innerText = tituloValorUnidad;

            grillaItem = new GrillaScroll(listaTasa, "divListaTasa", 100, 6, vista, controller, null, null, true, null, 38, false, null);
            grillaItem = new GrillaScroll(listaValorUnidad, "divListaValorUnidad", 100, 6, vista, controller, null, null, true, null, 38, false, null);
        }
        else {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
        }
    }
}

function configurarTabs() {

    var tabAltas = document.getElementById("tabAltas");
    if (tabAltas != null) tabAltas.onclick = function () {
        document.getElementById("divLista").innerHTML = "";

        idTabActivo = "tabAltas";
        getListar();
    }

    var tabBajas = document.getElementById("tabBajas");
    if (tabBajas != null) tabBajas.onclick = function () {
        document.getElementById("divLista").innerHTML = "";

        idTabActivo = "tabBajas";
        getListar();
    }
}

function configurarBotones() {
    var btnCargarArchivo = document.getElementById("btnCargarArchivo");
    if (btnCargarArchivo != null) btnCargarArchivo.onclick = function () {
        divPopupContainerForm3.style.display = 'block';
        limpiarImportacionExcel();
        spanPendiente.innerHTML = "";
    }

    var btnDescagarArchivo = document.getElementById("btnDescagarArchivo");
    if (btnDescagarArchivo != null) btnDescagarArchivo.onclick = function () {
        const link = document.createElement('a');
        link.href = '/templates/Patrimonio/Template_InventarioInicial.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    var btnCargarCXC = document.getElementById("btnCargarCXC");
    if (btnCargarCXC != null) btnCargarCXC.onclick = function () {
        divPopupContainerForm4.style.display = 'block';
        fupExcel.value = "";
        snpnombrearchivo.innerHTML = "Seleccione archivo&hellip;";
        btnImportarExcel.disabled = false;
        btnImportarExcel.style.display = 'block';
        btnImportarExcel.innerHTML = "<i class='fa fa-upload' aria-hidden='true'></i>&nbsp;Importar";
    }

    var btnImportarExcel = document.getElementById("btnImportarExcel");
    if (btnImportarExcel != null) btnImportarExcel.onclick = function () {
        vista = window.sessionStorage.getItem("Vista");

        importarExcel("divPopupContainerForm4", "divListaExcel", dataDeta);
    }

    var btnGuardarListaExcel = document.getElementById("btnGuardarListaExcel");
    if (btnGuardarListaExcel != null) btnGuardarListaExcel.onclick = function () {
        if (!fupExcel.value) {
            mostrarMensaje("Seleccione el archivo excel a importar", "error");
            return;
        }
        grabarDatosExcel();
    }

    var btnLimpiar = document.getElementById("btnLimpiar");
    if (btnLimpiar != null) btnLimpiar.onclick = function () {
        limpiarImportacionExcel();
    }

    var btnNuevoMov = document.getElementById("btnNuevoMov");
    if (btnNuevoMov != null) btnNuevoMov.onclick = function () {
        divPopupContainerMov.style.display = 'block';

        limpiarForm("PopupMov");
        limpiarForm("NoPopupMov");

        if (vista == "Altas") {
            esOrdenAprobadoOAnulado = false;

            btnGuardarMov.style.display = 'block';
            btnNuevo.style.display = 'block';
            btnGuardar.style.display = 'block';

            document.getElementById("detalleActivo").style.display = 'none';

            var txtAnioCab = document.getElementById("txtAnioCab");
            if (txtAnioCab != null) txtAnioCab.value = anioFiscal;

            var cboMesesCab = document.getElementById("cboMesesCab");
            if (cboMesesCab != null) cboMesesCab.value = periodo;

            var cboEstadoCab = document.getElementById("cboEstadoCab");
            if (cboEstadoCab != null) cboEstadoCab.value = 1; // 1: PENDIENTE, 2:APROBADO

            var cboCausalAltaCab = document.getElementById("cboCausalAltaCab");
            if (cboCausalAltaCab != null) cboCausalAltaCab.value = 1; // 1: COMPRAS

            var dttFechaMovCab = document.getElementById("dttFechaMovCab");
            if (dttFechaMovCab != null) dttFechaMovCab.value = obtenerFechaActualYYYMMDD();
        }
        if (vista == "Bajas") {
            esOrdenAprobadoOAnulado = false;

            btnGuardarBajas.style.display = 'block';
            document.querySelectorAll('.section-orden-aprobada').forEach(function (el) {
                el.removeAttribute("hidden");
            });

            tbDetalleActivos.innerHTML = "";
            spnNroItems.innerHTML = "Items: 0";

            var txtAnioCab = document.getElementById("txtAnioCab");
            if (txtAnioCab != null) txtAnioCab.value = anioFiscal;

            var cboMesesCab = document.getElementById("cboMesesCab");
            if (cboMesesCab != null) cboMesesCab.value = periodo;

            var cboTipoMovCab = document.getElementById("cboTipoMovCab");
            if (cboTipoMovCab != null) cboTipoMovCab.value = 2; //2: BAJA

            var cboEstadoCab = document.getElementById("cboEstadoCab");
            if (cboEstadoCab != null) cboEstadoCab.value = 1; // 1: PENDIENTE, 2:APROBADO

            var dttFechaMovCab = document.getElementById("dttFechaMovCab");
            if (dttFechaMovCab != null) dttFechaMovCab.value = obtenerFechaActualYYYMMDD();

            var dttFechaResolucion = document.getElementById("dttFechaResolucion");
            if (dttFechaResolucion != null) dttFechaResolucion.value = obtenerFechaActualYYYMMDD();

            btnGuardarBajas.innerHTML = "<i class='fa fa-save'></i> Grabar";
            btnGuardarBajas.disabled = false;
        }

        if (vista == "MantoActivo") {
            esOrdenAprobadoOAnulado = false;

            btnGuardarMov.style.display = 'block';
            document.querySelectorAll('.section-orden-aprobada').forEach(function (el) {
                el.removeAttribute("hidden");
            });

            tbDetalleActivos.innerHTML = "";
            spnNroItems.innerHTML = "Items: 0";

            var txtAnioCab = document.getElementById("txtAnioCab");
            if (txtAnioCab != null) txtAnioCab.value = anioFiscal;

            var cboMesesCab = document.getElementById("cboMesesCab");
            if (cboMesesCab != null) cboMesesCab.value = periodo;

            var cboTipoMovCab = document.getElementById("cboTipoMovCab");
            if (cboTipoMovCab != null) cboTipoMovCab.value = 3; //3: mantenimiento

            var cboEstadoCab = document.getElementById("cboEstadoCab");
            if (cboEstadoCab != null) cboEstadoCab.value = 1; // 1: PENDIENTE, 2:APROBADO

            var dttFechaMovCab = document.getElementById("dttFechaMovCab");
            if (dttFechaMovCab != null) dttFechaMovCab.value = obtenerFechaActualYYYMMDD();

            btnGuardarMov.innerHTML = "<i class='fa fa-save'></i> Grabar";
            btnGuardarMov.disabled = false;
        }

        if (vista == "Asignacion") {
            esOrdenAprobadoOAnulado = false;

            btnGuardarAsignacion.style.display = 'block';
            document.querySelectorAll('.section-orden-aprobada').forEach(function (el) {
                el.removeAttribute("hidden");
            });

            listaItemAsignacion.innerHTML = '';
            cboUbiFisicaActual.innerHTML = '';
            cboResItemActual.innerHTML = '';
            cboUbiFisicaNuevo.innerHTML = '';

            var txtAnioCab = document.getElementById("txtAnioCab");
            if (txtAnioCab != null) txtAnioCab.value = anioFiscal;

            var cboEstadoCab = document.getElementById("cboEstadoCab");
            if (cboEstadoCab != null) cboEstadoCab.value = 1; // 1: PENDIENTE, 2:APROBADO

            var dttFechaAsig = document.getElementById("dttFechaAsig");
            if (dttFechaAsig != null) dttFechaAsig.value = obtenerFechaActualYYYMMDD();

            btnGuardarAsignacion.innerHTML = "<i class='fa fa-save'></i> Grabar";
            btnGuardarAsignacion.disabled = false;
        }
    }

    var btnNuevo = document.getElementById("btnNuevo");
    if (btnNuevo != null) btnNuevo.onclick = function () {
        divPopupContainer.style.display = 'block';
        limpiarForm("Popup");
        limpiarForm("NoPopup");

        if (vista == "InventarioInicial" || vista == "Altas") {
            limpiarForm("PopupValContable");
            limpiarForm("NoPopupValContable");
            limpiarForm("PopupEspTecnica");
            limpiarForm("NoPopupEspTecnica");

            var txtAnio = document.getElementById("txtAnio");
            if (txtAnio != null) txtAnio.value = new Date().getFullYear();

            var cboMes = document.getElementById("cboMes");
            if (cboMes != null) cboMes.value = new Date().getMonth() + 1;

            var select2cboActivos = document.getElementById("select2-cboActivos-container");
            if (select2cboActivos != null) select2cboActivos.innerHTML = "Seleccione";

            var select2cboMarcas = document.getElementById("select2-cboMarcas-container");
            if (select2cboMarcas != null) select2cboMarcas.innerHTML = "Seleccione";

            var select2cboOficina = document.getElementById("select2-cboOficina-container");
            if (select2cboOficina != null) select2cboOficina.innerHTML = "Seleccione";

            var select2cboUbicaFisica = document.getElementById("select2-cboUbicaFisica-container");
            if (select2cboUbicaFisica != null) select2cboUbicaFisica.innerHTML = "Seleccione";

            var select2cboResponsable = document.getElementById("select2-cboResponsable-container");
            if (select2cboResponsable != null) select2cboResponsable.innerHTML = "Seleccione";

            var select2cboUsuarioFinal = document.getElementById("select2-cboUsuarioFinal-container");
            if (select2cboUsuarioFinal != null) select2cboUsuarioFinal.innerHTML = "Seleccione";

            var select2cboProveedor = document.getElementById("select2-cboProveedor-container");
            if (select2cboProveedor != null) select2cboProveedor.innerHTML = "Seleccione";


            var cboEstadoConserv = document.getElementById("cboEstadoConserv");
            if (cboEstadoConserv != null) cboEstadoConserv.value = (vista == "Altas" ? 5 : 1); //NUEVO:5, BUENO:1

            var cboPaisProcedencia = document.getElementById("cboPaisProcedencia");
            if (cboPaisProcedencia != null) cboPaisProcedencia.value = 51; //PERÚ:51

            var cboEstadoTipo = document.getElementById("cboEstadoTipo");
            if (cboEstadoTipo != null) cboEstadoTipo.value = 1; //ACTIVO:1

            var optOC = document.getElementById("optOC");
            if (optOC != null) optOC.checked = (vista == "Altas" ? true : false);

            var cboTipoDoc = document.getElementById("cboTipoDoc");
            if (cboTipoDoc != null) cboTipoDoc.value = 5; //PECOSA:5

            var txtFactorAjuste = document.getElementById("txtFactorAjuste");
            if (txtFactorAjuste != null) txtFactorAjuste.value = 1; //DEFAULT: 1

            var dttFechaProceso = document.getElementById("dttFechaProceso");
            if (dttFechaProceso != null) {
                dttFechaProceso.value = obtenerFechaActualYYYMMDD();
            };

            var txtDeprecAcumulada = document.getElementById("txtDeprecAcumulada");
            if (txtDeprecAcumulada != null) txtDeprecAcumulada.value = 0;

            var txtEstadoConservacion = document.getElementById("txtEstadoConservacion");
            if (txtEstadoConservacion != null) txtEstadoConservacion.value = cboEstadoConserv.options[cboEstadoConserv.selectedIndex].innerText
        }

        if (vista == "Cierre") {
            var anio = parseInt(anioFiscal)
            var mes = parseInt(periodo);

            var esUltimoMes = mes == 12;

            txtAnioActual.value = anio;
            cboMesActual.value = mes;

            txtAnioNuevo.value = esUltimoMes ? anio + 1 : anio;
            cboMesNuevo.value = esUltimoMes ? 1 : mes + 1;
        }
    }

    var btnGuardarBajas = document.getElementById("btnGuardarBajas");
    if (btnGuardarBajas != null) btnGuardarBajas.onclick = function () {

        if (esBajasValido()) {
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
                    grabarBajas();

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


    var btnGuardarMov = document.getElementById("btnGuardarMov");
    if (btnGuardarMov != null) btnGuardarMov.onclick = function () {
        var validar = false;

        if (validarInformacion("RequeMov") == true) {
            validar = true;
        }

        if (vista == "Altas") {
            var fechaMov = dttFechaMovCab.value ? dttFechaMovCab.value.replaceAll('-', '/') : '';

            validar = validarFechaMayorACierre([fechaMov]);
        }

        if (vista == "MantoActivo") {
            if (!esMantenimientoActivoValido()) {
                validar = false;
            }
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
                    if (vista == "MantoActivo") {
                        grabarMantoActivos();
                    }
                    else {
                        grabarDatosMov();
                    }

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

    var btnGuardarAsignacion = document.getElementById("btnGuardarAsignacion");
    if (btnGuardarAsignacion != null) btnGuardarAsignacion.onclick = function () {
        var validar = false;

        if (validarInformacion("RequeMov") == true) {
            validar = true;
        }

        if (!esAsignacionValido()) {
            validar = false;
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
                    grabarAsignacion();

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

    var btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar != null) btnGuardar.onclick = function () {

        if (vista == "InventarioInicial" || vista == "Altas") {
            validarActivoDepreciable();

            var fechaAlta = dttFechaAlta.value ? dttFechaAlta.value.replaceAll('-', '/') : '';
            if (!validarFechaMayorACierre([fechaAlta]))
                return;
        }

        var validar = false;

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

    var btnCancelarMov = document.getElementById("btnCancelarMov");
    if (btnCancelarMov != null) btnCancelarMov.onclick = function () {
        divPopupContainerMov.style.display = 'none';
    }

    var btnCancelar = document.getElementById("btnCancelar");
    if (btnCancelar != null) btnCancelar.onclick = function () {
        divPopupContainer.style.display = 'none';
    }

    var btnCancelarListadoItemsForm = document.getElementById("btnCancelarListadoItemsForm");
    if (btnCancelarListadoItemsForm != null) btnCancelarListadoItemsForm.onclick = function () {
        divPopupContainerListadoItemsForm.style.display = 'none';
    }

    var btnCancelarListadoOrdenesForm = document.getElementById("btnCancelarListadoOrdenesForm");
    if (btnCancelarListadoOrdenesForm != null) btnCancelarListadoOrdenesForm.onclick = function () {
        divPopupContainerListadoOrdenesForm.style.display = 'none';
    }

    var btnCancelarForm1 = document.getElementById("btnCancelarForm1");
    if (btnCancelarForm1 != null) btnCancelarForm1.onclick = function () {
        divPopupContainerForm1.style.display = 'none';
    }

    var btnCancelarForm2 = document.getElementById("btnCancelarForm2");
    if (btnCancelarForm2 != null) btnCancelarForm2.onclick = function () {
        divPopupContainerForm2.style.display = 'none';
    }

    var btnCancelarForm3 = document.getElementById("btnCancelarForm3");
    if (btnCancelarForm3 != null) btnCancelarForm3.onclick = function () {
        divPopupContainerForm3.style.display = 'none';
    }

    var btnCancelarForm4 = document.getElementById("btnCancelarForm4");
    if (btnCancelarForm4 != null) btnCancelarForm4.onclick = function () {
        divPopupContainerForm4.style.display = 'none';
    }

    var btnCancelarForm5 = document.getElementById("btnCancelarForm5");
    if (btnCancelarForm5 != null) btnCancelarForm5.onclick = function () {
        divPopupContainerFormNoDepreciable.style.display = 'none';
    }

    var btnConsutarEspecificacionesTecnicas = document.getElementById("btnConsutarEspecificacionesTecnicas");
    if (btnConsutarEspecificacionesTecnicas != null) btnConsutarEspecificacionesTecnicas.onclick = function () {
        mostrarEspecificacionesTecnicas("s");
    }

    var btnConsutarValoresContables = document.getElementById("btnConsutarValoresContables");
    if (btnConsutarValoresContables != null) btnConsutarValoresContables.onclick = function () {
        mostrarValoresContables("s");
    }

    var btnConsultar = document.getElementById("btnConsultar");
    if (btnConsultar != null) btnConsultar.onclick = function () {
        var anioConsulta = document.getElementById('txtPeriodoCons');

        if (!anioConsulta || !anioConsulta.value) {
            mostrarMensaje('Especifique el año del periodo', 'error');
            return;
        }

        limpiarListaActivos();
        getListar();
    }

    var cboUbicaFisica = document.getElementById("cboUbicaFisica");
    if (cboUbicaFisica != null) cboUbicaFisica.innerHTML = "<option value>Seleccione</option>";

    var btnConsutarItems = document.getElementById("btnConsutarItems");
    if (btnConsutarItems != null) btnConsutarItems.onclick = function () {
        var anioConsulta = document.getElementById('txtAnioCab')?.value;
        if (anioConsulta) {
            var data = anioConsulta;
            Http.get("General/listarTabla?tbl=" + controller + vista + "Items&data=" + data, mostrarListadoItems);
            //    spnLoad.style.display = 'inline';
        }
        else {
            mostrarMensaje("Seleccione el periodo", "error")
        }
    }

    var btnConsutarOrdenes = document.getElementById("btnConsutarOrdenes");
    if (btnConsutarOrdenes != null) btnConsutarOrdenes.onclick = function () {
        var tipoMantenimiento = cboTipoMantenimientoCab.value;

        if (!tipoMantenimiento) {
            mostrarMensaje("Seleccione un tipo de Mantenimiento válido", "error")
            return;
        }

        var data = tipoMantenimiento + "|"//anioConsulta;
        Http.get("General/listarTabla?tbl=" + controller + vista + "Ordenes&data=" + data, mostrarListadoOrdenes);
    }

    var btnSeleccionarItems = document.getElementById("btnSeleccionarItems");
    if (btnSeleccionarItems != null) btnSeleccionarItems.onclick = function () {
        var ids = grillaItems.obtenerIdsChecks();

        if (ids.length == 0) {
            mostrarMensaje("No hay items seleccionados", "error");
            return;
        }

        var data = "";

        for (var i = 0; i < ids.length; i++) {
            fila = grillaItems.obtenerFilaCheckPorId(ids[i]);
            if (fila.length > 0) {
                id = fila[0];
                codigo = fila[1];
                descripcion = fila[2];
                marca = fila[3];
                modelo = fila[4];
                serie = fila[5];
                usuarioFinal = fila[6];
                fechaCompra = fila[7];
                valorCompra = fila[8];
                fechaAlta = fila[9];
                valorInicial = fila[10];
                conservacion = fila[11];
                data += (id + "|" + codigo + "|" + descripcion + "|" + marca + "|" + modelo + "|" + serie + "|" + usuarioFinal +
                    "|" + fechaCompra + "|" + valorCompra + "|" + fechaAlta + "|" + valorInicial + "|" + conservacion);

                if (i < ids.length - 1) data += "¬";
            }
        }
        obtenerItems(data);
    }

    var btnImprimir = document.getElementById("btnImprimir");
    if (btnImprimir != null) btnImprimir.onclick = function () {
        if (vista == "General") {
            txtAnioRep.value = new Date().getFullYear();
            optRepGeneral.checked = true

            var controles = document.getElementsByClassName("divOptReporte");
            ocultarControles(controles);

            divAnioRep.style.display = 'block';
            OptOficinaRep.style.display = 'block';
            OptUbicacionFisicaRep.style.display = 'block';
            OptResponsableRep.style.display = 'block';
            OptUsuarioRep.style.display = 'block';

            cboOficinaRep.value = "";
            cboUbicacionFisicaRep.value = "";
            cboResponsableRep.value = "";
            cboUsuarioRep.value = "";
            cboGrupoRep.value = "";
            cboClaseRep.value = "";
            cboFamiliaRep.value = "";

            var select2cboOficinaRep = document.getElementById("select2-cboOficinaRep-container");
            if (select2cboOficinaRep != null) select2cboOficinaRep.innerHTML = "Todos";

            var select2cboUbicacionFisicaRep = document.getElementById("select2-cboUbicacionFisicaRep-container");
            if (select2cboUbicacionFisicaRep != null) select2cboUbicacionFisicaRep.innerHTML = "Todos";

            var select2cboResponsableRep = document.getElementById("select2-cboResponsableRep-container");
            if (select2cboResponsableRep != null) select2cboResponsableRep.innerHTML = "Todos";

            var select2cboUsuarioRep = document.getElementById("select2-cboUsuarioRep-container");
            if (select2cboUsuarioRep != null) select2cboUsuarioRep.innerHTML = "Todos";

            var select2cboGrupoRep = document.getElementById("select2-cboGrupoRep-container");
            if (select2cboGrupoRep != null) select2cboGrupoRep.innerHTML = "Todos";

            var select2cboClaseRep = document.getElementById("select2-cboClaseRep-container");
            if (select2cboClaseRep != null) select2cboClaseRep.innerHTML = "Todos";

            var select2cboFamiliaRep = document.getElementById("select2-cboFamiliaRep-container");
            if (select2cboFamiliaRep != null) select2cboFamiliaRep.innerHTML = "Todos";
        }

        if (vista == "Altas") {
            txtAnioRep.value = new Date().getFullYear();

            optAnioRep.checked = true;
            txtAnioRep.style.display = 'block';
        }

        if (vista == "InventarioInicial")
            cboOficinaReporte.value = "";

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

        if (vista == 'InventarioInicial') {
            var oficina = cboOficinaReporte.value;
            var filtroAnio = txtPeriodoCons.value;
            var data = oficina + "|" + filtroAnio;

            getObtenerReportePorOficina(data);
        }

        if (vista == 'General') {
            var data = obtenerDatosGrabar("PopupRep");
            var datos = data.split('|');

            var anioRep = datos[0];
            var oficinaRep = datos[1];
            var ubiFisRep = datos[2];
            var respOfiRep = datos[3];
            var respActivoRep = datos[4];
            var grupoRep = datos[5];
            var claseRep = datos[6];
            var familiaRep = datos[7];
            var codItem = datos[9];

            var url = location.origin;

            if (optRepGeneral.checked) {
                var params = anioRep + '|' + oficinaRep + '|' + ubiFisRep + '|' + respOfiRep + '|' + respActivoRep;
                url = url + '/Reportes/ShowRpt/?id=3&par=' + params + '&r=1'
                console.log(url);
            }

            if (optRepRespActivo.checked) {
                var params = anioRep + '|' + respActivoRep;
                url = url + '/Reportes/ShowRpt/?id=6&par=' + params + '&r=1'
            }

            if (optRepOficinaYUbiFis.checked) {
                var params = anioRep + '|' + oficinaRep + '|' + ubiFisRep;
                url = url + '/Reportes/ShowRpt/?id=7&par=' + params + '&r=1'
            }

            if (optRepGrupoClaseFam.checked) {
                var params = anioRep + '|' + grupoRep + '|' + claseRep + '|' + familiaRep;
                url = url + '/Reportes/ShowRpt/?id=8&par=' + params + '&r=1'
            }

            if (optRepKardex.checked) {
                var params = codItem;

                if (!params) {
                    mostrarMensaje("Debe seleccionar un fila", "error");
                    btnSeleccionarOpcionReporte.innerHTML = "<i class='fa fa-search'></i> Ver Reporte";
                    btnSeleccionarOpcionReporte.disabled = false;

                    return false;
                }

                url = url + '/Reportes/ShowRpt/?id=10&par=' + params + '&r=1'
            }

            if (optRepSinUbiFis.checked) {
                var params = anioRep;
                url = url + '/Reportes/ShowRpt/?id=9&par=' + params + '&r=1'
            }

            if (optRepSinCtaContable.checked) {
                var params = anioRep;
                url = url + '/Reportes/ShowRpt/?id=11&par=' + params + '&r=1'
            }

            ifrmVistaPrevia.src = url;

            document.getElementById("divPopupContainerReporte").style.display = 'block';

            btnSeleccionarOpcionReporte.innerHTML = "<i class='fa fa-search'></i> Ver Reporte";
            btnSeleccionarOpcionReporte.disabled = false;
        }

        if (vista == 'Altas') {
            var data = '';
            var url = location.origin;

            if (optAnioRep.checked) {
                data = obtenerDatosGrabar("PopupRep");
                url = url + '/Reportes/ShowRpt/?id=4&par=' + data + '&r=1';
            }

            if (optNroMovRep.checked) {
                data = idRegistroRep;

                if (!data) {
                    mostrarMensaje("Debe seleccionar un fila", "error");
                    btnSeleccionarOpcionReporte.innerHTML = "<i class='fa fa-search'></i> Ver Reporte";
                    btnSeleccionarOpcionReporte.disabled = false;

                    return false;
                }

                url = url + '/Reportes/ShowRpt/?id=5&par=' + data + '&r=1';
            }

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

function configurarCampos() {
    if (vista == "InventarioInicial" || vista == "Altas") {
        var dttFechaAlta = document.getElementById("dttFechaAlta");
        var txtVidaUtil = document.getElementById("txtVidaUtil");
        var dttFinVidaAltaValContable = document.getElementById("dttFinVidaAltaValContable");

        if (dttFechaAlta) {
            dttFechaAlta.onchange = function () {
                var dttFechaAltaValContable = document.getElementById('dttFechaAltaValContable');
                dttFechaAltaValContable.value = this.value ? this.value : '';
                dttFechaAltaValContableNoDepreciable.value = this.value ? this.value : '';

                validarActivoDepreciable();

                if (txtVidaUtil && dttFinVidaAltaValContable) {
                    var anios = txtVidaUtil.value ? parseFloat(txtVidaUtil.value).toFixed(2) : 0;
                    calcularFechaFin(dttFinVidaAltaValContable, dttFechaAlta.value, parseInt(anios));
                    calcularTazaDepreciacion(anios);
                }
            }
        }

        if (txtVidaUtil && dttFinVidaAltaValContable) {
            txtVidaUtil.onkeyup = function (event) {
                if (dttFechaAlta && dttFechaAlta.value) {
                    if (txtVidaUtil && dttFinVidaAltaValContable) {
                        var anios = txtVidaUtil.value ? parseFloat(txtVidaUtil.value).toFixed(2) : 0;
                        calcularFechaFin(dttFinVidaAltaValContable, dttFechaAlta.value, parseInt(anios));
                        calcularTazaDepreciacion(anios);
                    }
                }
            }
        }

        var txtValor = document.getElementById("txtValor");
        var txtDeprecAcumulada = document.getElementById("txtDeprecAcumulada");
        var txtValorNeto = document.getElementById("txtValorNeto");
        if (txtValor && txtDeprecAcumulada && txtValorNeto) {
            txtValor.onkeyup = function (event) {
                txtValorNeto.value = CalcularValorNeto(txtValor, txtDeprecAcumulada);
            }
            txtDeprecAcumulada.onkeyup = function (event) {
                txtValorNeto.value = CalcularValorNeto(txtValor, txtDeprecAcumulada);
            }
        }

        var txtValorCompra = document.getElementById("txtValorCompra");
        var txtValorNoDepreciable = document.getElementById("txtValorNoDepreciable");

        if (txtValorCompra) {
            txtValorCompra.onkeyup = function (event) {
                if (txtValor) txtValor.value = txtValorCompra.value;
                if (txtValorNoDepreciable) txtValorNoDepreciable.value = txtValorCompra.value;
            }
        }

        if (txtValorCompra) {
            txtValorCompra.onblur = function (event) {
                txtValorNeto.value = CalcularValorNeto(txtValor, txtDeprecAcumulada);
                validarActivoDepreciable();
            }
        }
    }
}

function configurarCombos() {
    if (vista == "InventarioInicial" || vista == "Altas" || vista == "General") {
        var cboOficina = document.getElementById("cboOficina");
        if (cboOficina != null) cboOficina.onchange = function () {
            listarUbicaFisica("cboOficina", 'cboUbicaFisica');
        }

        var cboActivos = document.getElementById("cboActivos");
        if (cboActivos != null) cboActivos.onchange = function () {
            asignarValoresActivo(this.value);
            validarActivoDepreciable();

            txtDescripcion.value = cboActivos.value
                ? cboActivos.options[cboActivos.selectedIndex].innerText
                : '';

            txtDescripcionMargesi.value = cboActivos.value
                ? cboActivos.options[cboActivos.selectedIndex].innerText
                : '';
        }

        var cboEstadoConserv = document.getElementById("cboEstadoConserv");
        if (cboEstadoConserv != null) cboEstadoConserv.onchange = function () {
            var txtEstadoConservacion = document.getElementById("txtEstadoConservacion");
            if (txtEstadoConservacion != null) {
                txtEstadoConservacion.value = cboEstadoConserv.value
                    ? cboEstadoConserv.options[cboEstadoConserv.selectedIndex].innerText
                    : '';

                txtEstadoConservacionNoDepreciable.value = cboEstadoConserv.value
                    ? cboEstadoConserv.options[cboEstadoConserv.selectedIndex].innerText
                    : '';
            }

        }

        if (vista == "General") {
            var cboOficinaRep = document.getElementById("cboOficinaRep");
            if (cboOficinaRep != null) cboOficinaRep.onchange = function () {
                listarUbicaFisica("cboOficinaRep", 'cboUbicacionFisicaRep', 'Todos');
            }

            var cboGrupoRep = document.getElementById("cboGrupoRep");
            if (cboGrupoRep != null) cboGrupoRep.onchange = function () {
                listarItemGenerico(listaClases_v, "cboGrupoRep", 'cboClaseRep', 'Todos');
            }

            var cboClaseRep = document.getElementById("cboClaseRep");
            if (cboClaseRep != null) cboClaseRep.onchange = function () {
                listarItemGenerico(listaFamilias_v, "cboClaseRep", 'cboFamiliaRep', 'Todos');
            }
        }
    }
    if (vista == "Asignacion") {
        var cboOfiActual = document.getElementById("cboOfiActual");
        if (cboOfiActual != null) cboOfiActual.onchange = function () {
            listarUbicaFisicaActual("cboOfiActual", 'cboUbiFisicaActual');

            var oficina = cboOfiActual.value;
            ConsultarItemsAsignables(oficina, '');
        }

        var cboUbiFisicaActual = document.getElementById("cboUbiFisicaActual");
        if (cboUbiFisicaActual != null) cboUbiFisicaActual.onchange = function () {
            var oficina = cboOfiActual.value;
            var ubiFisica = cboUbiFisicaActual.value;
            ConsultarItemsAsignables(oficina, ubiFisica);

            listarRespItemActual("cboUbiFisicaActual", 'cboResItemActual');
        }

        var cboOfiNuevo = document.getElementById("cboOfiNuevo");
        if (cboOfiNuevo != null) cboOfiNuevo.onchange = function () {
            listarUbicaFisica("cboOfiNuevo", 'cboUbiFisicaNuevo');
        }

        var cboResItemActual = document.getElementById("cboResItemActual");
        if (cboResItemActual != null) cboResItemActual.onchange = function () {
            var oficina = cboOfiActual.value;
            var ubiFisica = cboUbiFisicaActual.value;
            var respItem = cboResItemActual.value;
            ConsultarItemsAsignables(oficina, ubiFisica, respItem);
        }
    }
    if (vista == "MantoActivo") {
        var cboTipoMantenimientoCab = document.getElementById("cboTipoMantenimientoCab");
        if (cboTipoMantenimientoCab != null) cboTipoMantenimientoCab.onchange = function () {
            txtNroOrdenSecuenciaCab.value = "";
            txtNroOrdenCab.value = "";
            dttFechaOrdenCab.value = "";
            cboProveedorCab.value = "";
            txtTotalCab.value = "";
        }
    }
}

function seleccionarBoton(idGrilla, idRegistro, idBoton) {
    limpiarForm('Popup')
    //limpiarForm("PopupMov");

    if (idGrilla == "divLista") {
        if (vista == "Asignacion") {
            if (idBoton == "Ver") {
                var ids = idRegistro.split('-');
                editarRegistroActivo(ids[1]);
            }
        }

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
    else if (idGrilla == "divListaActivo") {
        if (idBoton == "Editar") {
            let tituloModal = document.getElementById("tituloModal");
            if (tituloModal != null) {
                tituloModal.innerText = "Actualizar Registro";
            }
            editarRegistroActivo(idRegistro);
        }
        if (idBoton == "Eliminar") {
            eliminarRegistroActivo(idRegistro)
        }
    }
}

function editarRegistroActivo(id) {
    Http.get("General/obtenerTabla/?tbl=" + controller + vista + 'Activos&id=' + id, mostrarRegistroActivo);
}

function editarRegistro(id) {
    if (vista == "Altas") {
        Http.get("General/obtenerTabla/?tbl=" + controller + vista + 'Mov&id=' + id, mostrarRegistroMov);
    }
    else if (vista == "MantoActivo") {
        Http.get("General/obtenerTabla/?tbl=" + controller + vista + '&id=' + id, mostrarRegistroMov);
    }
    else if (vista == "Asignacion") {
        var ids = id.split('-');
        Http.get("General/obtenerTabla/?tbl=" + controller + vista + '&id=' + ids[0], mostrarRegistroMov);
    }
    else {
        Http.get("General/obtenerTabla/?tbl=" + controller + vista + '&id=' + id, mostrarRegistro);
    }
}

function mostrarRegistroMov(rpta) {
    if (rpta) {
        var campos = rpta.split("|");
        if (vista == "Altas") {
            txtNroMovCab.value = campos[0];
            txtAnioCab.value = campos[1];
            cboMesesCab.value = campos[2];
            dttFechaMovCab.value = formatearFechaYYYMMDD(campos[3]);
            ttaObservacionCab.value = campos[4];
            cboEstadoCab.value = campos[5];
            cboTipoMovCab.value = campos[6];
            cboCausalAltaCab.value = campos[7];
            cboTipoDocCab.value = campos[8];
            txtNroOrdenCab.value = campos[9];

            document.getElementById("divPopupContainerMov").style.display = 'block';
            esOrdenAprobadoOAnulado = campos[5] != EST_PENDIENTE;

            getListarMovActivos(campos[0]);

            actualizarBotones()
        }
        if (vista == "MantoActivo") {
            txtNroMovCab.value = campos[0];
            txtAnioCab.value = campos[1];
            cboMesesCab.value = campos[2];
            dttFechaMovCab.value = formatearFechaYYYMMDD(campos[3]);
            cboTipoMantenimientoCab.value = campos[4];
            txtNroOrdenSecuenciaCab.value = campos[5];
            dttFechaOrdenCab.value = formatearFechaYYYMMDD(campos[6]);
            cboProveedorCab.value = campos[7];
            ttaGlosaCab.value = campos[8];
            cboEstadoCab.value = campos[9];
            cboTipoMovCab.value = campos[10];

            txtNroOrdenCab.value = campos[11];
            txtTotalCab.value = campos[12];

            document.getElementById("divPopupContainerMov").style.display = 'block';

            getListarMovActivos(campos[0]);

            esOrdenAprobadoOAnulado = campos[9] != EST_PENDIENTE;

            document.querySelectorAll('.section-orden-aprobada').forEach(function (el) {
                if (esOrdenAprobadoOAnulado)
                    el.setAttribute("hidden", "hidden");
                else
                    el.removeAttribute("hidden");
            });
        }
        if (vista == "Asignacion") {
            txtSecuenciaAsig.value = campos[0];
            txtAnioCab.value = campos[1];
            txtNroTramite.value = campos[2];
            cboEstadoCab.value = campos[3];

            cboOfiActual.value = campos[4];
            listarUbicaFisicaActual("cboOfiActual", 'cboUbiFisicaActual');

            cboOfiNuevo.value = campos[5];
            listarUbicaFisica("cboOfiNuevo", 'cboUbiFisicaNuevo');

            cboUbiFisicaActual.value = campos[6];
            cboUbiFisicaNuevo.value = campos[7];

            listarRespItemActual("cboUbiFisicaActual", 'cboResItemActual');
            cboResItemActual.value = campos[8];
            cboResItemNuevo.value = campos[9];

            cboAutoriza.value = campos[10];
            dttFechaAsig.value = formatearFechaYYYMMDD(campos[11]);
            txtReferencia.value = campos[12];
            ttaMotivo.value = campos[13];

            var detalles = campos[14].split(',');

            esOrdenAprobadoOAnulado = campos[3] != EST_PENDIENTE;

            var esAprobado = campos[3] == EST_APROBADO;

            document.getElementById("divPopupContainerMov").style.display = 'block';

            ConsultarItemsAsignables(
                !esAprobado ? cboOfiActual.value : cboOfiNuevo.value,
                !esAprobado ? cboUbiFisicaActual.value : cboUbiFisicaNuevo.value,
                !esAprobado ? cboResItemActual.value : cboResItemNuevo.value,
                detalles
            );

            document.querySelectorAll('.section-orden-aprobada').forEach(function (el) {
                if (esOrdenAprobadoOAnulado)
                    el.setAttribute("hidden", "hidden");
                else
                    el.removeAttribute("hidden");
            });
        }
    }
    else {
        mostrarMensaje('No se encontró información', 'error');
    }
}
function mostrarRegistroActivo(rpta, container) {
    if (rpta) {
        var campos = rpta.split("|");
        document.getElementById(container ? container : "divPopupContainer").style.display = 'block';

        txtIdRegistro.value = campos[0];
        txtCodigoPatrimonio.value = campos[1];
        txtCodigoMargesi.value = campos[1];
        txtItem.value = campos[2];
        cboActivos.value = campos[3];
        txtDescripcionMargesi.value = cboActivos.options[cboActivos.selectedIndex]?.text;
        seleccionarControlSelect2(cboActivos);
        txtDescripcion.value = campos[4];
        cboCentroCosto.value = campos[5];
        cboOficina.value = campos[6];
        listarUbicaFisica("cboOficina", 'cboUbicaFisica');
        seleccionarControlSelect2(cboOficina);

        cboUbicaFisica.value = campos[7];
        seleccionarControlSelect2(cboUbicaFisica);

        cboResponsable.value = campos[8];
        seleccionarControlSelect2(cboResponsable);

        cboUsuarioFinal.value = campos[9];
        seleccionarControlSelect2(cboUsuarioFinal);

        txtNroSerie.value = campos[10];
        cboEstadoConserv.value = campos[11];
        cboMarcas.value = campos[12];
        seleccionarControlSelect2(cboMarcas);
        txtModelo.value = campos[13];
        txtMedida.value = campos[14];
        ttaCaracteristica.value = campos[15];
        ttaObservacion.value = campos[16];
        cboPaisProcedencia.value = campos[17];
        cboEstadoTipo.value = campos[18];
        chkEsSBN.checked = campos[19] == "S" ? true : false;

        var esDepreciable = campos[20] == "1" ? true : false;

        chkEsActivoDepreciable.checked = esDepreciable;
        esBienDepreciable = esDepreciable;


        chkEsVerificacionFisica.checked = campos[21] == "1" ? true : false;

        optOC.checked = campos[22] == "2" ? true : false;
        optNEA.checked = campos[22] == "1" ? true : false;
        txtNumeroIngresoBien.value = campos[22] == "2" ? campos[23] : campos[26];
        var dFechaIngresoBien = campos[22] == "2" ? campos[24].split("/") : campos[27].split("/");
        dttFechaIngresoBien.value = dFechaIngresoBien.length == 3 ? dFechaIngresoBien[2] + "-" + dFechaIngresoBien[1] + "-" + dFechaIngresoBien[0] : '';
        txtValorCompra.value = campos[22] == "2" ? campos[25] : campos[28];
        txtValorNoDepreciable.value = campos[22] == "2" ? campos[25] : campos[28];
        cboProveedor.value = campos[29];
        seleccionarControlSelect2(cboProveedor);

        chkEsGarantia.checked = campos[30] == "1" ? true : false;

        var dFechaGarantia = campos[31].split("/");
        dttFechaGarantia.value = dFechaGarantia.length == 3 ? dFechaGarantia[2] + "-" + dFechaGarantia[1] + "-" + dFechaGarantia[0] : '';
        txtNroContrato.value = campos[32];
        cboTipoDoc.value = campos[33];

        //if (!cboTipoDoc.value) {
        //    cboTipoDoc.removeAttribute("disabled");
        //    cboTipoDoc.classList.remove("control-lectura");
        //    cboTipoDoc.classList.add("control-form");
        //}
        //else {
        //}

        txtNumeroDoc.value = campos[34];

        var dFechaAlta = campos[35].split("/");
        dttFechaAlta.value = dFechaAlta.length == 3 ? dFechaAlta[2] + "-" + dFechaAlta[1] + "-" + dFechaAlta[0] : '';
        dttFechaAltaValContableNoDepreciable.value = dttFechaAlta.value;

        setCuentaContable(campos[36]);

        txtTbCodigo.value = campos[37];
        txtGruCodigo.value = campos[38];
        txtClaCodigo.value = campos[39];
        txtFamCodigo.value = campos[40];
        txtInvCodigo.value = campos[41];

        ttaObservacionMargesi.value = campos[42];

        txtVidaUtil.value = campos[43];
        dttFechaAltaValContable.value = dttFechaAlta.value;
        var dFinVidaValContable = campos[44].split("/");
        dttFinVidaAltaValContable.value = dFinVidaValContable.length == 3 ? dFinVidaValContable[2] + "-" + dFinVidaValContable[1] + "-" + dFinVidaValContable[0] : '';
        txtAnio.value = campos[45];
        cboMes.value = campos[46];
        txtDepreciacion.value = campos[47];
        txtEstadoConservacion.value = cboEstadoConserv.options[cboEstadoConserv.selectedIndex]?.text;
        txtEstadoConservacionNoDepreciable.value = cboEstadoConserv.options[cboEstadoConserv.selectedIndex]?.text;

        txtFactorAjuste.value = campos[48];
        var dFechaProceso = campos[49].split("/");
        dttFechaProceso.value = dFechaProceso.length == 3 ? dFechaProceso[2] + "-" + dFechaProceso[1] + "-" + dFechaProceso[0] : '';
        txtValor.value = campos[50];
        txtDeprecAcumulada.value = campos[51];
        txtValorNeto.value = (txtValor.value || txtDeprecAcumulada.value) ? txtValor.value - txtDeprecAcumulada.value : '';

    }
    else {
        mostrarMensaje('No se encontró información', 'error');
    }
}

function mostrarRegistro(rpta) {
    if (rpta) {
        var campos = rpta.split("|");
        if (vista == "UbicaFisica") {
            document.getElementById("divPopupContainer").style.display = 'block';
            txtIdRegistro.value = campos[0];
            cboOficina.value = campos[1];
            txtNombre.value = campos[2];
            cboResponsable.value = campos[3];
            cboEstado.value = campos[4];
        }
        else if (vista == "General") {
            mostrarRegistroActivo(rpta);
        }
        else if (vista == "Bajas") {
            document.getElementById("divPopupContainerMov").style.display = 'block';
            tbDetalleActivos.innerHTML = "";

            txtNroMovCab.value = campos[0];
            txtAnioCab.value = campos[1];
            cboMesesCab.value = campos[2];
            dttFechaMovCab.value = formatearFechaYYYMMDD(campos[3]);
            txtNroResolucion.value = campos[4];
            dttFechaResolucion.value = formatearFechaYYYMMDD(campos[5]);
            ttaObservacionCab.value = campos[6];
            cboEstadoCab.value = campos[7];
            cboTipoMovCab.value = campos[8];
            cboCausalBaja.value = campos[9];

            esOrdenAprobadoOAnulado = campos[7] != EST_PENDIENTE;

            getListarMovActivos(campos[0]);

            document.querySelectorAll('.section-orden-aprobada').forEach(function (el) {
                if (esOrdenAprobadoOAnulado)
                    el.setAttribute("hidden", "hidden");
                else
                    el.removeAttribute("hidden");
            });
        }
        else {
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
                        control.value = campos[j];
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
    else {
        mostrarMensaje('No se encontró información', 'error');
    }
}

function eliminarRegistroActivo(id) {
    var data = "";
    data = id;

    if (vista == 'Altas') {
        var codigoMov = txtNroMovCab.value;
        data += "|" + codigoMov;
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
            if (vista == 'Altas') {
                Http.post("General/eliminar/?tbl=" + controller + vista + "ActivosMov", mostrarEliminar, frm);
            }
            else {
                Http.post("General/eliminar/?tbl=" + controller + vista + "Activos", mostrarEliminar, frm);
            }
        }
    })
}

function eliminarRegistro(id) {
    var data = "";
    data = id;

    var frm = new FormData();

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
            if (vista == "InventarioInicial" || vista == "Altas" || vista == "Bajas" || vista == "MantoActivo") {
                var filtroAnio = txtPeriodoCons.value;
                data += "|" + filtroAnio;
                frm.append("data", data);
                Http.post("General/eliminar/?tbl=" + controller + vista, mostrarEliminar, frm);
            }
            else if (vista == "Asignacion") {
                var ids = id.split('-');
                var filtroAnio = txtPeriodoCons.value;
                var dataAsignacion = ids[0] + "|" + filtroAnio;

                frm.append("data", dataAsignacion);
                Http.post("General/eliminar/?tbl=" + controller + vista, mostrarEliminar, frm);
            }
            else {
                frm.append("data", data);
                Http.post("General/eliminar/?tbl=" + controller + vista, mostrarEliminar, frm);
            }
        }
    })
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

        if (vista == "InventarioInicial" /*|| vista == "Altas"*/) {
            limpiarListaActivos();
            getListar();
        }
        else if (vista == 'Altas') {
            grillaItem = new GrillaScroll(lista, "divListaActivo", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
        }
        else if (vista == 'Asignacion') {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botonesAsignacion, 38, false, null);
        }
        else {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
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

    if ((vista == "InventarioInicial") && prefijo != "divListaActivo") {
        var periodoCons = txtPeriodoCons.value;
        var flagInicial = vista == "InventarioInicial" ? FLAG_INICIAL_INVENTARIO_INICIAL : FLAG_INICIAL_ALTAS;
        var data = periodoCons + '-' + idRegistro + '-' + flagInicial;

        Http.get("General/listarTabla?tbl=" + controller + vista + "Activos&data=" + data, mostrarlistasActivos);
    }
    if ((vista == "TiposPatrimonio") && prefijo != "divListaActivo") {
        var data = idRegistro;

        Http.get("General/listarTabla?tbl=" + controller + vista + "SubTipos&data=" + data, mostrarlistaSubTipos);
    }
    if ((vista == "General") && idTabActivo == "tabAltas") {
        txtCodItemRep.value = idRegistro;
        txtCodigoPatrimonioRep.value = fila.cells[1].innerHTML;
    }
    if ((vista == "MantoActivo") && prefijo == "listaOrden") {
        var data = idRegistro.split(";");
        var idOrden = data[0];
        var nroOrden = data[1];
        var idProveedor = data[2];
        var total = data[3];
        var fechaOrden = data[4];

        txtNroOrdenSecuenciaCab.value = idOrden;
        txtNroOrdenCab.value = nroOrden;
        cboProveedorCab.value = idProveedor;
        txtTotalCab.value = total;
        dttFechaOrdenCab.value = formatearFechaYYYMMDD(fechaOrden);

        divPopupContainerListadoOrdenesForm.style.display = "none";
    }
    if ((vista == "Altas") && prefijo == "divLista") {
        idRegistroRep = id;
    }
}

function mostrarPreviewReporte(rpta) {
    var divLista = 'ListaReporte';

    if (rpta) {
        if (vista == "InventarioInicial") {
            var listas = rpta.split("¯");
            var lista = listas[0].split("¬");
            grillaItem = new GrillaScroll(lista, divLista, 100, 6, vista, controller, null, null, true, null, 38, false, null);

            Http.get("General/getTimeServer", getImprimirPorCentroCosto);
        }

        if (vista == "General") {
            var listas = rpta.split("¯");
            var lista = listas[0].split("¬");
            var agrupados = listas[1].split("¬");

            var listaAgrupada = obtenerListaAgrupada(lista, agrupados);
            grillaItem = new GrillaScroll(listaAgrupada, divLista, 100, 6, vista, controller, null, null, true, null, 38, false, null);

            Http.get("General/getTimeServer", getImprimirGeneralAltas);
        }
    }

    btnSeleccionarOpcionReporte.innerHTML = "<i class='fa fa-search'></i> Ver Reporte";
    btnSeleccionarOpcionReporte.disabled = false;
}
function obtenerValoresAgrupados(valoresAgrupados, ctaMayor, subCta) {
    for (var i = 0; i < valoresAgrupados.length; i++) {
        var cuenta = valoresAgrupados[i].split("|");
        var cuentaMayor = cuenta[0].split('-');
        var subCuenta = cuenta[1].split('-');

        if (cuentaMayor == ctaMayor && subCuenta == subCta) {
            return valoresAgrupados[i];
        }
    }
}


function validarFechaMayorACierre(fechas) {
    var esFechaValida = true;
    var periodoActual = new Date(anioFiscal, periodo - 1);

    for (var i = 0; i < fechas.length; i++) {
        if (fechas[i]) {
            var fecha = new Date(fechas[i]);

            esFechaValida = !(periodoActual > fecha || fecha.getFullYear() != anioFiscal);

            if (!esFechaValida) {
                mostrarMensaje("La fecha debe ser mayor a la fecha de cierre y no mayor al año fiscal", "error");
                return false;
            }
        }
    }
    return esFechaValida;
}

function obtenerListaAgrupada(lista, valoresAgrupados) {
    var nRegistros = lista.length;
    var ctaMayor = null;
    var subCta = null;
    var listaAgrupada = [];
    var total = 0;

    for (var i = 0; i < nRegistros; i++) {
        if (i > 2) {
            var cuenta = lista[i].split("|")[0];
            var cuentaMayor = cuenta.split('-')[0];
            var subCuenta = cuenta.split('-')[1];

            if (i == 3) {
                ctaMayor = cuentaMayor;
                subCta = subCuenta;

                var valorAgrupado = obtenerValoresAgrupados(valoresAgrupados, cuentaMayor, subCuenta).split('|');
                var ctaContable = valorAgrupado[2];
                listaAgrupada.push('|Cuenta contable|' + ctaContable + '|||||||');
                listaAgrupada.push(lista[i]);
            }

            else if (!(cuentaMayor == ctaMayor && subCuenta == subCta)) {
                var valorAgrupadoAnterior = obtenerValoresAgrupados(valoresAgrupados, ctaMayor, subCta).split('|');
                var subTotal = valorAgrupadoAnterior[3];
                listaAgrupada.push('|||||||SubTotal|' + subTotal + '||');

                var valorAgrupado = obtenerValoresAgrupados(valoresAgrupados, cuentaMayor, subCuenta).split('|');
                var ctaContable = valorAgrupado[2];
                listaAgrupada.push('|Cuenta contable|' + ctaContable + '|||||||');

                listaAgrupada.push(lista[i]);

                ctaMayor = cuentaMayor;
                subCta = subCuenta;

                total = total + parseFloat(subTotal);
            }
            else {
                listaAgrupada.push(lista[i]);
            }
        }
        else {
            listaAgrupada.push(lista[i]);
        }
    }

    var valorAgrupadoAnterior = obtenerValoresAgrupados(valoresAgrupados, ctaMayor, subCta).split('|');
    var subTotal = valorAgrupadoAnterior[3];
    listaAgrupada.push('|||||||SubTotal|' + subTotal + '||');

    total = total + parseFloat(subTotal);

    listaAgrupada.push('|||||||Total General|' + total + '||');

    return listaAgrupada;
}

function getImprimirGeneralAltas(rpta) {
    var datos = rpta.split('¯');
    var fecha = datos[0];
    var hora = datos[1];

    var doc = new jsPDF("landscape", "mm", "a4")
    doc.setFontSize(20)
    doc.setTextColor(40)

    if (base64Img) {
        doc.addImage(base64Img, 'JPEG', 25, 6, 10, 10)
    }
    doc.setFontSize(6);
    doc.text('IAFAS DE LA MARINA DE GUERRA DEL PERU', 14, 18)
    doc.text('SISGEFIN', 14, 21)
    doc.text('Fecha: ' + fecha, 260, 21)
    doc.text('Usuario: ' + spnUsuario.innerHTML, 14, 23)
    doc.text('Hora: ' + hora, 260, 23)

    doc.setFontSize(13);
    doc.text('ALTAS INSTITUCIONALES', 120, 33)
    doc.setFontSize(11);
    //doc.text('AÑO FISCAL: ' + txtAnioLectivo.value, 85, 38)
    //doc.text('ASEGURADO: ' + lblAsegurado.innerHTML, 14, 45)
    //doc.text('TOTAL APORTES: ' + lblAporteTotal.innerHTML, 14, 50)
    //doc.text('TOTAL DEUDA: ' + lblDeudaTotal.innerHTML, 14, 55)

    doc.setFontSize(10);
    var finalY = doc.lastAutoTable.finalY || 25
    //doc.text(spnTitulo.innerHTML, 14, finalY + 40)
    doc.autoTable({
        startY: finalY + 18,
        html: '#tblListaReporte',
        styles: { cellPadding: 0.5, fontSize: 8, halign: 'center' },
        theme: 'grid',
        headerStyles: {
            fillColor: [0, 0, 0],
            fontSize: 8,
            halign: 'center',
        },
        columnStyles: {
            //0: { halign: 'center', fontSize: 8 },
        },
    })

    doc.setProperties({
        title: 'SISGEFIN: INVENTARIO INICIAL POR CENTRO DE COSTO',
        subject: 'IAFAS',
        author: spnUsuario.innerHTML,
        keywords: "ESTADO DE CUENTA, IAFAS, SISGEFIN",
        creator: "SISGEFIN CUENTA CORRIENTE",
        orientation: "landscape"
    });

    document.getElementById("divPopupContainerReporte").style.display = 'block';
    ifrmVistaPrevia.src = doc.output('datauristring');
}

function getImprimirPorCentroCosto(rpta) {
    var datos = rpta.split('¯');
    var fecha = datos[0];
    var hora = datos[1];

    var doc = new jsPDF("landscape", "mm", "a4")
    doc.setFontSize(20)
    doc.setTextColor(40)

    if (base64Img) {
        doc.addImage(base64Img, 'JPEG', 25, 6, 10, 10)
    }
    doc.setFontSize(6);
    doc.text('IAFAS DE LA MARINA DE GUERRA DEL PERU', 14, 18)
    doc.text('SISGEFIN', 14, 21)
    doc.text('Fecha: ' + fecha, 260, 21)
    doc.text('Usuario: ' + spnUsuario.innerHTML, 14, 23)
    doc.text('Hora: ' + hora, 260, 23)

    doc.setFontSize(13);
    doc.text('INVENTARIO INICIAL POR CENTRO DE COSTO', 100, 33)
    doc.setFontSize(11);
    //doc.text('AÑO FISCAL: ' + txtAnioLectivo.value, 85, 38)
    //doc.text('ASEGURADO: ' + lblAsegurado.innerHTML, 14, 45)
    //doc.text('TOTAL APORTES: ' + lblAporteTotal.innerHTML, 14, 50)
    //doc.text('TOTAL DEUDA: ' + lblDeudaTotal.innerHTML, 14, 55)

    doc.setFontSize(10);
    var finalY = doc.lastAutoTable.finalY || 25
    //doc.text(spnTitulo.innerHTML, 14, finalY + 40)
    doc.autoTable({
        startY: finalY + 18,
        html: '#tblListaReporte',
        styles: { cellPadding: 0.5, fontSize: 8, halign: 'center' },
        theme: 'grid',
        headerStyles: {
            fillColor: [0, 0, 0],
            fontSize: 8,
            halign: 'center',
        },
        columnStyles: {
            //0: { halign: 'center', fontSize: 8 },
        },
    })

    doc.setProperties({
        title: 'SISGEFIN: INVENTARIO INICIAL POR CENTRO DE COSTO',
        subject: 'IAFAS',
        author: spnUsuario.innerHTML,
        keywords: "ESTADO DE CUENTA, IAFAS, SISGEFIN",
        creator: "SISGEFIN CUENTA CORRIENTE",
        orientation: "landscape"
    });

    document.getElementById("divPopupContainerReporte").style.display = 'block';
    ifrmVistaPrevia.src = doc.output('datauristring');
}

function mostrarlistaSubTipos(rpta) {
    if (rpta) {
        var listas = rpta.split("¯");
        var lista = listas[0].split("¬");
        grillaItem = new GrillaScroll(lista, "divListaActivo", 100, 6, vista, controller, null, null, true, null, 38, false, null);
    }
}

function mostrarlistasActivos(rpta) {
    var divLista = 'divListaActivo';
    var botonesTabla = botones;

    if (vista == "Altas") {
        document.getElementById("detalleActivo").style.display = 'block';
        var divLista = 'divListaActivo';

        if (esOrdenAprobadoOAnulado)
            botonesTabla = botonesOrdenAprobada;
    }

    if (rpta) {
        var listas = rpta.split("¯");
        var lista = listas[0].split("¬");
        grillaItem = new GrillaScroll(lista, divLista, 100, 6, vista, controller, null, null, true, botonesTabla, 38, false, null);
    }
}

function mostrarListadoOrdenes(rpta) {
    if (rpta) {
        divPopupContainerListadoOrdenesForm.style.display = 'block';

        var listas = rpta.split('¯');
        lista = listas[0].split("¬");
        grillaItems = new GrillaScroll(lista, "listaOrden", 1000, 6, "listaOrdenes", "Admon", null, null, null, null, 25, false);
    }
}

function mostrarListadoItemsAsignacion(indices, rpta) {
    if (rpta) {
        var listas = rpta.split('¯');
        lista = listas[0].split("¬");
        grillaItems = new GrillaScroll(lista, "listaItemAsignacion", 1000, 6, "listaItemsAsignacion", "Admon", null, null, null, null, 25, false, true);

        if (indices?.length > 0) {
            var divListaItemsCheck = document.getElementById('tbDatalistaItemAsignacion');
            var allcheck = divListaItemsCheck.getElementsByClassName("selcheckbox");

            for (var p = 0; p < allcheck.length; p++) {
                var fila = allcheck[p].parentNode.parentNode;
                var id = fila.childNodes[1].innerText;

                if (indices.indexOf(id) != -1) {
                    allcheck[p].click();
                }
            }
        }
    }
}

function mostrarListadoItems(rpta) {
    if (rpta) {
        //spnLoad.style.display = 'none';
        divPopupContainerListadoItemsForm.style.display = 'block';

        var listas = rpta.split('¯');
        lista = listas[0].split("¬");
        grillaItems = new GrillaScroll(lista, "listaItem", 1000, 6, "listaItems", "Admon", null, null, null, null, 25, false, true);
        //    configurarCheckBoxs();
    }
}

function grabarDatosExcel() {
    var data = "";
    var frm = new FormData();

    var txtPeriodoCons = document.getElementById("txtPeriodoCons");
    if (txtAnio != null) {
        data = dataImport + "¯" + txtPeriodoCons.value;
    }

    frm.append("data", data);
    Http.post("General/guardar/?tbl=" + controller + vista + "Importar", mostrarGrabar, frm);

    divPopupContainerForm3.style.display = 'none';
    limpiarImportacionExcel();
}

function limpiarImportacionExcel() {
    divListaExcel.innerHTML = '';
    dataImport = '';
    fupExcel.value = '';
    btnGuardarListaExcel.disabled = false;
}

function grabarMantoActivos() {
    var data = "";
    data = obtenerDatosGrabar("PopupMov");

    data += "|";

    data += "¯";
    var nfilas = tbDetalleActivos.rows.length;
    var fila;
    for (var i = 0; i < nfilas; i++) {
        fila = tbDetalleActivos.rows[i];
        data += fila.cells[0].innerHTML; //Item
        data += '-';

        var montoAsignado = (fila.cells[5].getElementsByTagName('input')[0]).value;
        data += (montoAsignado ? montoAsignado : 0); //Monto Asignado

        if (i < (nfilas - 1))
            data += ",";
    }

    var filtroAnio = txtPeriodoCons.value;

    data += "¯" + filtroAnio;

    var frm = new FormData();
    frm.append("data", data);

    Http.post("General/guardar?tbl=" + controller + vista, mostrarGrabarMov, frm);

    btnGuardarMov.innerHTML = "Guardando <i class='fa fa-circle-o-notch fa-spin' style='color:white'></i>";
    btnGuardarMov.disabled = true;
}

function grabarAsignacion() {
    var data = "";
    var ids = grillaItems.obtenerIdsChecks();
    var filtroAnio = txtPeriodoCons.value;

    data = obtenerDatosGrabar("PopupMov");

    data += "|";

    data += "¯";

    data += ids.join(',')

    data += "¯" + filtroAnio;

    var frm = new FormData();
    frm.append("data", data);

    Http.post("General/guardar?tbl=" + controller + vista, mostrarGrabar, frm);

    btnGuardarAsignacion.innerHTML = "Guardando <i class='fa fa-circle-o-notch fa-spin' style='color:white'></i>";
    btnGuardarAsignacion.disabled = true;
}

function grabarBajas() {
    var data = "";
    data = obtenerDatosGrabar("PopupMov");

    data += "|";

    data += "¯";
    var nfilas = tbDetalleActivos.rows.length;
    var fila;
    for (var i = 0; i < nfilas; i++) {
        fila = tbDetalleActivos.rows[i];
        data += fila.cells[0].innerHTML; //Item

        if (i < (nfilas - 1))
            data += ",";
    }

    var filtroAnio = txtPeriodoCons.value;

    data += "¯" + filtroAnio;

    var frm = new FormData();
    frm.append("data", data);

    Http.post("General/guardar?tbl=" + controller + vista, mostrarGrabar, frm);

    btnGuardarBajas.innerHTML = "Guardando <i class='fa fa-circle-o-notch fa-spin' style='color:white'></i>";
    btnGuardarBajas.disabled = true;
}

function grabarDatosMov() {
    var data = "";
    var frm = new FormData();
    data = obtenerDatosGrabar("PopupMov");

    if (vista == "Altas") {
        var tipoMov = (vista == "Altas") ? 'A' : 'S'; //A: Alta, I: Inicial, B: Baja
        var anioConsulta = document.getElementById('txtPeriodoCons')?.value;

        data += '|' + tipoMov;
        data += '|' + anioConsulta;
        data += '|';

        frm.append("data", data);
    }
    else {
        frm.append("data", data);
    }

    Http.post("General/guardar/?tbl=" + controller + vista + "Mov", mostrarGrabarMov, frm);
}

function grabarDatos() {
    var data = "";
    var frm = new FormData();
    data = obtenerDatosGrabar("Popup");

    if (vista == "InventarioInicial" || vista == "Altas") {
        var valoreseEspecTecnicas = obtenerDatosGrabar("PopupEspTecnica");
        var valoresContables = obtenerDatosGrabar("PopupValContable");

        var dataSplit = data.split("|");

        var valorTipoIngresoBien = optOC.checked ? 2 : (optNEA.checked ? 1 : 0);
        dataSplit[22] = valorTipoIngresoBien;
        dataSplit.splice(23, 1);
        data = dataSplit.join('|');

        var flagInicial = (vista == "InventarioInicial") ? 1 : 0;
        data += '|' + flagInicial;
        data += '|' + valoreseEspecTecnicas;
        data += '|' + valoresContables;
        data += '|';

        if (vista == "Altas") {
            var codigoMov = txtNroMovCab.value;
            data += '¯' + codigoMov;
        }

        frm.append("data", data);
    }
    else if (vista == "Bajas") {
        var grupoSecuencias = ''
        var filtroAnio = txtPeriodoCons.value;

        data += '|' + grupoSecuencias;
        data += '|' + filtroAnio;
        data += '|';

        frm.append("data", data);
    }
    else if (vista == "Cierre") {
        var filtroAnio = txtPeriodoCons.value;

        data += '|';
        data += '¯' + filtroAnio;

        frm.append("data", data);
    }
    else {
        frm.append("data", data);
    }

    if (vista == "Altas") {
        Http.post("General/guardar/?tbl=" + controller + vista + "ActivosMov", mostrarGrabarActivosMov, frm);
    }
    else if (vista == "InventarioInicial")
        Http.post("General/guardar/?tbl=" + controller + vista, mostrarGrabar, frm);
    else if (vista == "Cierre")
        Http.post("General/guardar/?tbl=" + controller + vista, mostrarGrabar, frm);
    else {
        Http.post("General/guardar/?tbl=" + controller + vista, mostrarlistasActivos, frm);
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
                        if (vista == "InventarioInicial" || vista == "Altas" || vista == "Bajas"
                            || vista == "MantoActivo" || vista == "Asignacion") {
                            data += control.value;
                        }
                        else {
                            var dFecha = control.value.split("-");
                            data += dFecha[2] + "-" + dFecha[1] + "-" + dFecha[0];
                        }
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

function ConsultarItemsAsignables(oficina, ubiFisica, respItem = '', ids = null) {
    var data = anioFiscal + '|' + oficina + '|' + ubiFisica + '|' + respItem;

    Http.get("General/listarTabla?tbl=" + controller + vista + "Items&data=" + data, mostrarListadoItemsAsignacion.bind(null, ids));
}

function mostrarEspecificacionesTecnicas(rpta) {
    if (rpta) {
        //spnLoad.style.display = 'none';
        divPopupContainerForm1.style.display = 'block';
    }
}

function mostrarValoresContables(rpta) {
    if (rpta) {
        //spnLoad.style.display = 'none';
        if (esBienDepreciable)
            divPopupContainerForm2.style.display = 'block';
        else
            divPopupContainerFormNoDepreciable.style.display = 'block';
    }
}

function obtenerItems(datos) {
    var lista = datos.split('¬');
    var nRegistros = lista.length;
    for (var i = 0; i < nRegistros; i++) {
        adicionarItem(lista[i]);
    }
}


function adicionarLista(datos) {
    tbDetalleActivos.innerHTML = "";
    spnNroItems.innerHTML = "Items: 0";

    var lista = datos.split('¬');

    lista = lista.slice(3, lista.length); //obtener desde el primer registro de data

    for (var i = 0; i < lista.length; i++) {
        if (lista[i])
            adicionarItem(lista[i]);
    }
}

function adicionarItem(datos) {
    var campos = datos.split('|');
    item = campos[0];
    codigo = campos[1];
    descripcion = campos[2];
    marca = campos[3];
    modelo = campos[4];
    serie = campos[5];
    usuarioFinal = campos[6];
    fechaCompra = campos[7];
    valorCompra = campos[8];
    fechaAlta = campos[9];
    valorInicial = campos[10];
    conservacion = campos[11];

    var nFilas = tbDetalleActivos.rows.length;
    var existe = false;
    for (var i = 0; i < nFilas; i++) {
        if (tbDetalleActivos.rows[i].cells[0].innerHTML == item) {
            existe = true;
            break;
        }
    }
    if (existe) {
        mostrarMensaje("Existen Items ya agregados - verificar", "error");
        return;
    }

    var filaDetalle = "<tr>";
    filaDetalle += "<td style='white-space:pre-wrap;width:50px;display:none'>";
    filaDetalle += item;
    filaDetalle += "</td> ";
    filaDetalle += "<td style='white-space:pre-wrap;width:100px;'>";
    filaDetalle += codigo;
    filaDetalle += "</td> ";
    filaDetalle += "<td style='white-space:pre-wrap;width:100px;'>";
    filaDetalle += descripcion;
    filaDetalle += "</td> ";
    filaDetalle += "<td style='white-space:pre-wrap;width:100px;'>";
    filaDetalle += marca;
    filaDetalle += "</td> ";
    filaDetalle += "<td style='white-space:pre-wrap;width:100px;'>";
    filaDetalle += serie;
    filaDetalle += "</td> ";

    if (vista == "MantoActivo") {
        var montoAsignado = campos[13];

        filaDetalle += "<td style='white-space:pre-wrap;width:100px;text-align: center'>";
        filaDetalle += "<input type='number' class='monto' " + (esOrdenAprobadoOAnulado ? "disabled" : "") + " value='" + montoAsignado + "'/>";
        filaDetalle += "</td> ";
    }

    if (vista != "MantoActivo") {
        filaDetalle += "<td style='white-space:pre-wrap;width:100px;'>";
        filaDetalle += fechaCompra;
        filaDetalle += "</td> ";
        filaDetalle += "<td style='white-space:pre-wrap;width:100px;'>";
        filaDetalle += fechaAlta;
        filaDetalle += "</td> ";
        filaDetalle += "<td style='white-space:pre-wrap;width:100px;'>";
        filaDetalle += valorInicial;
        filaDetalle += "</td> ";
        filaDetalle += "<td style='white-space:pre-wrap;width:100px;'>";
        filaDetalle += 0.00;
        filaDetalle += "</td> ";
    }

    filaDetalle += "<td style='white-space:pre-wrap;width:10px;vertical-align:top;text-align: center'>";
    filaDetalle += "<i class='fa fa-search btn btn-info btnCirculo' title='Ver Item' onclick='editarRegistroActivo("
    filaDetalle += item;
    filaDetalle += ");'></i>";
    if (!esOrdenAprobadoOAnulado) {
        filaDetalle += "<i class='fa fa-trash ml-1 btn-danger btnCirculo' style='width: 30px;height: 26px;' title='Quitar Item' onclick='retirarItem(this,\"";
        filaDetalle += item;
        filaDetalle += "\");'></i>";
    }
    filaDetalle += "</td> ";
    filaDetalle += "</tr>";
    tbDetalleActivos.insertAdjacentHTML("beforeend", filaDetalle);

    spnNroItems.innerHTML = "Items: " + (nFilas + 1);
    configurarEnterCantidad(tbDetalleActivos, 8);

    divPopupContainerListadoItemsForm.style.display = 'none';
}

function configurarEnterCantidad(tbody, celda) {
    var filas = tbody.childNodes;
    var nfilas = filas.length - 1;
    for (var i = 0; i < nfilas; i++) {
        txt = filas[i].childNodes[celda].firstChild;
        txt.onkeyup = function (event) {
            if (this.value != "" && event.keyCode == 13) {
                this.parentNode.parentNode.nextSibling.childNodes[celda].firstChild.focus();
            }
        }
    }
}

function retirarItem(col, id) {
    var fila = col.parentNode.parentNode;
    tbDetalleActivos.removeChild(fila);
    var nFilas = 0;
    nFilas = tbDetalleActivos.rows.length;
    spnNroItems.innerHTML = "Items: " + (nFilas);
}

function esAsignacionValido() {
    var ids = grillaItems.obtenerIdsChecks();

    if (ids.length == 0) {
        mostrarMensaje("No hay items seleccionados", "error");
        return false;
    }
    return true;
}

function esMantenimientoActivoValido() {
    var nfilas = tbDetalleActivos.rows.length;

    if (nfilas == 0) {
        mostrarMensaje("Debe agregar items al Detalle", "error");
        return false;
    }

    for (var i = 0; i < nfilas; i++) {
        fila = tbDetalleActivos.rows[i];
        campoMonto = fila.cells[5].getElementsByTagName('input')[0]; //Monto Asignado
        var monto = campoMonto.value;

        if (!(cboTipoMantenimientoCab.value == 2 || cboTipoMantenimientoCab.value == 4)) //Correctivo OS, Preventivo OS
            return true;

        if (!monto || parseFloat(monto) <= 0) {
            mostrarMensaje("Debe asignar montos mayor a 0", "error");
            return false;
        }
    }

    return true;
}

function esBajasValido() {
    var nfilas = tbDetalleActivos.rows.length;

    var fechaMov = dttFechaMovCab.value ? dttFechaMovCab.value.replaceAll('-', '/') : '';

    if (!validarFechaMayorACierre([fechaMov])) {
        return false;
    }

    if (!validarInformacion("RequeMov")) {
        return false;
    }

    if (nfilas == 0) {
        mostrarMensaje("Debe agregar items a la Baja", "error");
        return false;
    }

    return true;
}

function setPorcentajes(data) {
    listaPorcentaje_v = data.split("¬")
        .map(value => ({
            year: value.split('|')[0] ? parseInt(value.split('|')[0]) : 0,
            porcentaje: value.split('|')[1] ? parseFloat(value.split('|')[1]) : 0,
        }));
}

function setUIT(data) {
    listaUIT_v = data.split("¬")
        .map(value => ({
            year: value.split('|')[0] ? parseInt(value.split('|')[0]) : 0,
            valorUIT: value.split('|')[1] ? parseFloat(value.split('|')[1]) : 0,
        }));

}

function validarActivoDepreciable() {
    txtCtaContable.value = "";
    txtMayorSubCtaClasificador.value = "";
    dttFinVidaAltaValContable.value = "";

    txtDepreciacion.value = "";
    txtVidaUtil.value = "";
    chkEsActivoDepreciable.checked = false;


    var valorCompra = txtValorCompra?.value;
    var fechaAlta = dttFechaAlta?.value;
    var idItem = cboActivos?.value;

    if (!(valorCompra && fechaAlta && idItem))
        return;

    var esDepreciable = esActivoDepreciable(fechaAlta, valorCompra)
    esBienDepreciable = esDepreciable;

    if (esDepreciable)
        asignarValoresDepreciacion(idItem);

    asignarCuentaContable(idItem, esDepreciable);
}

function setCuentaContable(cuentaContable) {
    if (cuentaContable) {
        var cuenta = cuentaContable.split(';')
        var ctaContable = cuenta?.[0];
        var clasificador = cuenta?.[1];
        var descripcionCtaContable = cuenta?.[2];

        if (!ctaContable)
            return;

        txtCtaContable.value = ctaContable + ' - ' + descripcionCtaContable;
        txtMayorSubCtaClasificador.value = ctaContable + ';' + clasificador;
    }
}

function esActivoDepreciable(fechaAlta, valorCompra) {
    var dFechaAlta = fechaAlta.split("-");
    var dateFechaAlta = new Date(dFechaAlta[0] + "/" + dFechaAlta[1] + "/" + dFechaAlta[2]);
    var anioFechaAlta = (dateFechaAlta.getFullYear());

    var uit = listaUIT_v.find(x => anioFechaAlta >= x.year);
    var porcentaje = listaPorcentaje_v.find(x => anioFechaAlta >= x.year);

    if (!(uit?.valorUIT > 0 && porcentaje?.porcentaje > 0))
        return false;

    var valorMinimo = uit.valorUIT * porcentaje.porcentaje;

    return valorCompra > valorMinimo;
}

function asignarCuentaContable(idItem, esDepreciable) {
    var cuentasContables = [];

    if (!esDepreciable) {
        Swal.fire({
            title: 'Warning!',
            html: 'Los bienes no cumplen con la norma dispuesta.',
            icon: 'warning',
            showConfirmButton: true,
        })

        cboActivos.value = "";
        seleccionarControlSelect2(cboActivos);

        return;
    }

    for (var i = 0; i < listaCuentaContables_v.length; i++) {
        var ctaContable = listaCuentaContables_v[i].split('|');
        if (ctaContable[0] == idItem) {
            var mayor = ctaContable?.[1];

            //if ((esDepreciable && mayor == MAYOR_DEPRECIABLE) ||
            //    !esDepreciable && mayor == MAYOR_NO_DEPRECIABLE)
            if (esDepreciable)
                cuentasContables.push(ctaContable);
        }
    }

    if (cuentasContables.length == 0) {
        cboActivos.value = "";
        seleccionarControlSelect2(cboActivos);

        var textoDepreciable = esDepreciable ? "depreciable" : 'no depreciable';

        Swal.fire({
            title: 'Warning!',
            html: 'El Activo no tiene una Cta Contable ' + textoDepreciable + ' asociada',
            icon: 'warning',
            showConfirmButton: true,
        })
    }

    if (cuentasContables.length == 1) {
        var cuenta = cuentasContables[0];
        var ctaContable = cuenta?.[1];
        var clasificador = cuenta?.[3];
        var descripcionCtaContable = cuenta?.[4];

        if (!ctaContable)
            return;

        txtCtaContable.value = ctaContable + ' - ' + descripcionCtaContable;
        txtMayorSubCtaClasificador.value = ctaContable + ';' + clasificador;
    }

    if (cuentasContables.length > 1) {
        cboActivos.value = "";
        seleccionarControlSelect2(cboActivos);

        var descripcionCuentas = cuentasContables.map(x => '<li>' + x[1] + '.' + x[2] + ' - ' + x[4] + '</li>');

        Swal.fire({
            title: 'Warning!',
            html: 'El Activo tiene mas de una Cta Contable asociada :'
                + '<ul class="mt-2" style="font-size: 15px;text-align: left;list-style: inside;">'
                + descripcionCuentas.join(' ')
                + '</ul>',
            icon: 'warning',
            showConfirmButton: true,
        })
    }
}

function asignarValoresDepreciacion(idItem) {
    var activo = obtenerActivoSeleccionado(idItem);

    if (!activo)
        return;

    var tasaDeprec = activo[8];

    var txtDepreciacion = document.getElementById('txtDepreciacion');
    if (txtDepreciacion) txtDepreciacion.value = tasaDeprec;

    var txtVidaUtil = document.getElementById('txtVidaUtil');
    if (txtVidaUtil) txtVidaUtil.value = tasaDeprec > 0 ? (100 / tasaDeprec).toFixed(2) : '';

    var chkEsActivoDepreciable = document.getElementById('chkEsActivoDepreciable');
    if (chkEsActivoDepreciable) chkEsActivoDepreciable.checked = tasaDeprec > 0;

    if (dttFechaAlta && dttFechaAlta.value) {
        if (txtVidaUtil && dttFinVidaAltaValContable) {
            var anios = txtVidaUtil.value ? parseFloat(txtVidaUtil.value).toFixed(2) : 0;
            calcularFechaFin(dttFinVidaAltaValContable, dttFechaAlta.value, parseInt(anios));
        }
    }
}

function asignarValoresActivo(idItem) {
    var activo = obtenerActivoSeleccionado(idItem);

    if (activo) {
        var txtDescripcion = document.getElementById('txtDescripcion');
        if (txtDescripcion) txtDescripcion.value = activo[1];

        var esCheckSBN = activo[2] == 'S' ? true : false;
        var tbCodigo = activo[3];
        var grupoCodigo = activo[4];
        var claseCodigo = activo[5];
        var familiaCodigo = activo[6];
        var inventarioCodigo = activo[7];

        var codigoItem = grupoCodigo + claseCodigo + familiaCodigo + inventarioCodigo;

        var chkEsSBN = document.getElementById('chkEsSBN');
        if (chkEsSBN) chkEsSBN.checked = esCheckSBN;

        var txtItem = document.getElementById('txtItem');
        if (txtItem) txtItem.value = codigoItem;

        var txtTbCodigo = document.getElementById('txtTbCodigo');
        if (txtTbCodigo) txtTbCodigo.value = tbCodigo;

        var txtGruCodigo = document.getElementById('txtGruCodigo');
        if (txtGruCodigo) txtGruCodigo.value = grupoCodigo;

        var txtClaCodigo = document.getElementById('txtClaCodigo');
        if (txtClaCodigo) txtClaCodigo.value = claseCodigo;

        var txtFamCodigo = document.getElementById('txtFamCodigo');
        if (txtFamCodigo) txtFamCodigo.value = familiaCodigo;

        var txtInvCodigo = document.getElementById('txtInvCodigo');
        if (txtInvCodigo) txtInvCodigo.value = inventarioCodigo;

        validarActivoDepreciable();
    }
}

function obtenerActivoSeleccionado(idItem) {
    var activo;
    for (var i = 0; i < listaActivos_v.length; i++) {
        activo = listaActivos_v[i].split('|');
        if (activo[0] == idItem) {
            return activo;
        }
    }
}

function listarItemGenerico(data, valueControl, idControl, texto) {
    var cboOficina = document.getElementById(valueControl);
    var idOficina = cboOficina.value;
    var nRegistros = data.length;
    var contenido = "<option value=''>" + (texto ? texto : "Seleccione") + "</option>";
    var campos, idCodigo, nombre, idxOficina;
    for (var i = 0; i < nRegistros; i++) {
        campos = data[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxOficina = campos[2];
        if (idxOficina == idOficina) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById(idControl);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function listarRespItemActual(valueUbiFisica, idControl, texto) {
    var cboOficina = document.getElementById(valueUbiFisica);
    var idOficina = cboOficina.value;
    var nRegistros = listaReponsableItemAsignacion_v.length;
    var contenido = "<option value=''>" + (texto ? texto : "Seleccione") + "</option>";
    var campos, idCodigo, nombre, idxOficina;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaReponsableItemAsignacion_v[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxOficina = campos[2];
        if (idxOficina == idOficina) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById(idControl);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function listarUbicaFisicaActual(valueOficina, idControl, texto) {
    var cboOficina = document.getElementById(valueOficina);
    var idOficina = cboOficina.value;
    var nRegistros = listaUbicaFisicaAsignacion_v.length;
    var contenido = "<option value=''>" + (texto ? texto : "Seleccione") + "</option>";
    var campos, idCodigo, nombre, idxOficina;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaUbicaFisicaAsignacion_v[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxOficina = campos[2];
        if (idxOficina == idOficina) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById(idControl);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function listarUbicaFisica(valueOficina, idControl, texto) {
    var cboOficina = document.getElementById(valueOficina);
    var idOficina = cboOficina.value;
    var nRegistros = listaUbicaFisica_v.length;
    var contenido = "<option value=''>" + (texto ? texto : "Seleccione") + "</option>";
    var campos, idCodigo, nombre, idxOficina;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaUbicaFisica_v[i].split('|');
        idCodigo = campos[0];
        nombre = campos[1];
        idxOficina = campos[2];
        if (idxOficina == idOficina) {
            contenido += "<option value='";
            contenido += idCodigo;
            contenido += "'>";
            contenido += nombre;
            contenido += "</option>";
        }
    }
    var cbo = document.getElementById(idControl);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function obtenerFechaActualYYYMMDD() {
    var date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");
}

function formatearFechaYYYMMDD(fecha) {
    if (!fecha)
        return '';

    var dfecha = fecha.split("/");

    if (!dfecha.length == 3) {
        return "";
    }

    var dia = dfecha[0].padStart("2", "0");
    var mes = dfecha[1].padStart("2", "0");
    var anio = dfecha[2];

    return anio + "-" + mes + "-" + dia;
}

function calcularFechaFin(control, fechaAlta, anios) {
    var dFecha = fechaAlta.split("-");

    if (dFecha.length != 3) {
        control.value = "";
        return;
    }

    var dateFin = new Date(dFecha[0] + "/" + dFecha[1] + "/" + dFecha[2]);
    dateFin.setFullYear(dateFin.getFullYear() + anios);

    var dFechaCalculada = dateFin.toLocaleDateString().split("/");

    var dia = dFechaCalculada[0].padStart("2", "0");
    var mes = dFechaCalculada[1].padStart("2", "0");
    var anio = dFechaCalculada[2];

    control.value = (anio + "-" + mes + "-" + dia);
}

function calcularTazaDepreciacion(anios) {
    var txtDepreciacion = document.getElementById("txtDepreciacion");
    if (txtDepreciacion) txtDepreciacion.value = (100 / anios).toFixed(2);
}

function CalcularValorNeto(txtValor, txtDeprecAcumulada) {
    var valor = txtValor.value ? parseFloat(txtValor.value) : 0;
    var deprec = txtDeprecAcumulada.value ? parseFloat(txtDeprecAcumulada.value) : 0;

    return valor - deprec;
}

function limpiarListaActivos() {
    var divListaActivo = document.getElementById("divListaActivo");
    if (divListaActivo) divListaActivo.innerHTML = '';
}

function ocultarControles(controles) {
    for (var j = 0; j < controles.length; j++) {
        control = controles[j];

        control.style.display = 'none';
    }
}

function desahabilitarControles(controles) {
    for (var j = 0; j < controles.length; j++) {
        control = controles[j];
        control.style.borderColor = ""
        tipo = control.id.substr(0, 3);

        if (tipo == "txt" || tipo == "num" || tipo == "tta" || tipo == "tim") {
            control.classList.remove('control-form');
            control.classList.add('control-lectura');
            control.setAttribute("readonly", "readonly");
        }
        else if (tipo == "dtt") {
            control.classList.remove('control-form');
            control.classList.add('control-lectura');
            control.setAttribute("readonly", "readonly");
        }
        else if (tipo == "cbo") {
            control.classList.remove('control-form');
            control.classList.add('control-lectura');
            control.setAttribute("disabled", "disabled");
        }
        else if (tipo == "chk" || tipo == "opt") {
            control.setAttribute("disabled", "");
        }
    }
}
function seleccionarControlSelect2(control) {
    var controlSelect = 'select2-' + control.id + '-container';
    var cboControlSelect = document.getElementById(controlSelect);
    if (cboControlSelect != null) {
        var selected = control.options[control.selectedIndex].text;
        cboControlSelect.innerHTML = selected;
    }
}
function mostrarGrabarActivosMov(rpta) {
    var mensajeResul = [];
    if (rpta) {
        listas = rpta.split("¯")
        lista = listas[0].split("¬");
        mensajeResul = listas[1].split("|");
        var tipo = mensajeResul[0];
        var mensaje = mensajeResul[1];
        divPopupContainer.style.display = 'none';

        grillaItem = new GrillaScroll(lista, "divListaActivo", 100, 6, vista, controller, null, null, true, botones, 38, false, null);

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

    if (vista == "Bajas") {
        btnGuardarBajas.innerHTML = "<i class='fa fa-save'></i> Grabar";
        btnGuardarBajas.disabled = false;
    }
    else {
        btnGuardar.innerHTML = "<i class='fa fa-save'></i> Grabar";
        btnGuardar.disabled = false;
    }
}

function mostrarGrabarMov(rpta) {
    var mensajeResul = [];
    if (rpta) {
        listas = rpta.split("¯")
        lista = listas[0].split("¬");
        mensajeResul = listas[1].split("|");
        var tipo = mensajeResul[0];
        var mensaje = mensajeResul[1];
        divPopupContainerMov.style.display = 'none';

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

    if (vista == "Bajas") {
        btnGuardarBajas.innerHTML = "<i class='fa fa-save'></i> Grabar";
        btnGuardarBajas.disabled = false;
    }
    else if (vista == "MantoActivo") {
        btnGuardarMov.innerHTML = "<i class='fa fa-save'></i> Grabar";
        btnGuardarMov.disabled = false;
    }
    else {
        btnGuardar.innerHTML = "<i class='fa fa-save'></i> Grabar";
        btnGuardar.disabled = false;
    }
}

function actualizarBotones() {
    if (vista == "Altas") {
        if (esOrdenAprobadoOAnulado) {
            btnGuardarMov.style.display = 'none';
            btnNuevo.style.display = 'none';
            btnGuardar.style.display = 'none';
        }
        else {
            btnGuardarMov.style.display = 'block';
            btnNuevo.style.display = 'block';
            btnGuardar.style.display = 'block';
        }
    }
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

        if (vista == "InventarioInicial" || vista == "Altas") {
            limpiarListaActivos();
            getListar();
        }
        else if (vista == "Asignacion") {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botonesAsignacion, 38, false, null);
        }
        else if (vista == "Cierre") {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, null, 38, false, null);
        }
        else {
            grillaItem = new GrillaScroll(lista, "divLista", 100, 6, vista, controller, null, null, true, botones, 38, false, null);
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

    if (vista == "Bajas") {
        divPopupContainerMov.style.display = 'none'

        btnGuardarBajas.innerHTML = "<i class='fa fa-save'></i> Grabar";
        btnGuardarBajas.disabled = false;
    }
    else if (vista == "Asignacion") {
        divPopupContainerMov.style.display = 'none'

        btnGuardarAsignacion.innerHTML = "<i class='fa fa-save'></i> Grabar";
        btnGuardarAsignacion.disabled = false;
    }
    else {
        btnGuardar.innerHTML = "<i class='fa fa-save'></i> Grabar";
        btnGuardar.disabled = false;
    }
}

function importarExcel(divForm, divLista, dataDeta) {
    btnGuardarListaExcel.disabled = false;

    document.getElementById(divForm).style.display = "none";

    var file = fupExcel.files[0];
    var reader = new FileReader();

    var camposNea = [7, 8, 9];
    var camposOC = [10, 11, 12];
    var camposNull = [19, 20, 21, 28, 29, 30];

    var esArchivoCompleto = true;

    reader.onload = function (e) {
        var data = new Uint8Array(reader.result);
        var libro = XLSX.read(data, { type: 'array', cellDates: true, dateNF: 'yyyy-mm-dd' });
        var nhojas = libro.SheetNames.length;
        var nombreHoja = libro.SheetNames[0];
        var hoja = libro.Sheets[nombreHoja];
        var range = XLSX.utils.decode_range(hoja['!ref']);
        var contenido = "<table>";
        contenido += "<tr style='background-color:lightgray;text-align:center'>";
        contenido += "<td></td>";
        for (var j = range.s.c; j <= range.e.c; j++) {
            contenido += "<th>";
            contenido += j < 26 ? String.fromCharCode(65 + j) : String.fromCharCode(65, 65 + (j - 26)); //65: A, 90:Z
            contenido += "</th>";
        }
        contenido += "</tr>";

        /*Detalle de la importacion*/
        for (var i = range.s.r; i <= range.e.r; i++) {
            if (i > 0) {
                contenido += "<tr style='background-color:white;text-align:left'>";
                contenido += "<th style='width:50px;background-color:lightgray;padding-left: 10px;padding-right: 10px;'>";
                contenido += i + 1;
                contenido += "</th>";

                var camposNoObligatorios = [];
                camposNoObligatorios = camposNoObligatorios.concat(camposNull);

                for (var j = range.s.c; j <= range.e.c; j++) {
                    contenido += "<td style='padding-left: 10px;padding-right: 10px;padding-top: 5px;padding-bottom: 5px;'>";
                    var direccion = XLSX.utils.encode_cell({ c: j, r: i });
                    var celda = hoja[direccion];

                    if (celda != null) {
                        if (i == 1) {
                            contenido += '<b>' + celda.v + '</b >';
                        }
                        if (i > 1) {
                            if (j == 9 || j == 12 || j == 14) {//celdas tipo fecha
                                contenido += celda.v.toLocaleDateString();
                                dataDeta += formatearFechaYYYMMDD(celda.v.toLocaleDateString());
                            }
                            else {
                                contenido += celda.v;
                                dataDeta += celda.v;
                            }

                            var indiceTipoDocAdquisicion = 6;
                            if (indiceTipoDocAdquisicion == j) {
                                if (celda.v == 1)
                                    camposNoObligatorios = camposNoObligatorios.concat(camposOC);
                                else if (celda.v == 2)
                                    camposNoObligatorios = camposNoObligatorios.concat(camposNea);
                            }
                        }
                    }
                    else {
                        if (camposNoObligatorios.indexOf(j) == -1) {
                            contenido += '<span style="background-color: red;display: block;">&nbsp</span >';
                            esArchivoCompleto = false;
                        }
                    }

                    if (i > 1) {
                        dataDeta += "|";
                    }
                    contenido += "</td>";
                }
                dataDeta = dataDeta.substr(0, dataDeta.length - 1);
                dataDeta += "¬";

                contenido += "</tr>";
            }
        }
        //****** dataDeta Eliminar primer  caracter "¬"
        dataDeta = dataDeta.slice(1, -1);

        dataImport = dataDeta
        contenido += "<table>";
        document.getElementById(divLista).innerHTML = contenido;

        if (!esArchivoCompleto) {
            btnGuardarListaExcel.disabled = true;
            mostrarMensaje("Los campos de rojo son obligatorios", "error");
        }
    }
    reader.readAsArrayBuffer(file);
}