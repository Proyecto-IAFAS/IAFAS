using General.Librerias.AccesoDatos;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
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
            var _lstRps = ConverT.ObjectToObjt<IEnumerable<rReporteCR>>(_result.Content);
            return View("Index", _lstRps);
        }

        [HttpGet]
        public ActionResult ShowRpt(int id, string par, string r)
        {
            var _result = Reporting.GetOneReporte(id);
            rReporteCR _report = ConverT.ObjectToObjt<rReporteCR>(_result.Content);
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
        
        [HttpGet]
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