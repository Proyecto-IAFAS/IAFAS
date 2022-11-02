using System.Web.Mvc;
using WebAppSISGEFIN.Models;
using SisGeFin.Common.Types;
using SisGeFin.Reporting.BIZ;
using System.Collections.Generic;
using SisGeFin.Common.Utils;

namespace WebAppSISGEFIN.Controllers
{
    public class ReportesController : Controller
    {

        [HttpGet]
        public ActionResult Index()
        {
            var _result = Reporting.GetLstReportes();
            var _lstRps = ConverT.ObjectToObj<IEnumerable<rReporteCR>>(_result.Content);
            return View("Index", _lstRps);
        }

        [HttpGet]
        public string GetGrupos()
        {
            string _data = "vGruposPA|IdGrupo|NombreGrupo|";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetClases(string idGrupo)
        {
            string _data = $"vClasesPA|IdClase|NombreClase|IdGrupo='{idGrupo}'";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetFamilias(string idGrupo, string idClase)
        {
            string _data = $"vFamiliasPA|IdFamilia|NombreFamilia|IdGrupo='{idGrupo}' And IdClase='{idClase}'";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        //---------------------------------------------------

        [HttpGet]
        public string GetOficinas()
        {
            string _data = "vOficinasPA|IdOficina|NombreOficina|";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }
        
        [HttpGet]
        public string GetUbicaciones(string idOficina)
        {
            string _data = $"vUbicacionesPA|IdUbicacion|NombreUbicacion|IdOficina='{idOficina}'";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public string GetReponsables()
        {
            string _data = "vProveedoresPA|IdProveedor|NombreProveedor|";
            var _trama = Runs.GetTrama4Combo(_data);
            return _trama;
        }

        [HttpGet]
        public ActionResult ShowRpt(int id, string par, string r)
        {
            var _result = Reporting.GetOneReporte(id);
            rReporteCR _report = ConverT.ObjectToObj<rReporteCR>(_result.Content);
            ViewBag.FileNm = _report.FileName.Replace("\n", "").Replace("\r", "");
            ViewBag.SpName = _report.SpName.Replace("\n", "").Replace("\r", "");
            ViewBag.TypeNm = _report.TypeName.Replace("\n", "").Replace("\r", "");
            ViewBag.IdRept = _report.IdReport;
            ViewBag.Option = r;
            string _vName = "";
            if (par != null)
            {
                ViewBag.Params = par;
                _vName = "_PuenteRpt";
            }
            else
            {
                _vName = $"Filtro{_report.FiterView.Replace("\n", "").Replace("\r", "")}";
            }
            return View(_vName);
        }
         
        public ActionResult MsgRpt(string msg, byte e)
        {
            rMensaje _mensj = new rMensaje();
            switch (e)
            {
                case 1:
                    _mensj.Type = "Informe";
                    _mensj.Image = "../../Images/rpt_info.png";
                    break;

                case 2:
                    _mensj.Type = "Alerta";
                    _mensj.Image = "../../Images/rpt_alert.png";
                    break;

                default:
                    _mensj.Type = "Error";
                    _mensj.Image = "../../Images/rpt_error.png";
                    break;
            }
            _mensj.Message = msg;
            return View("MsgRpt", _mensj);
        }

    }

}