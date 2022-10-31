using System.Web.Mvc;
using System.Configuration;
using WebAppSISGEFIN.Models;
using SisGeFin.Common.Types;

namespace WebAppSISGEFIN.Controllers
{
    public class ReportesController : Controller
    {

        [HttpGet]
        public ActionResult Index()
        {
            return View();
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
        public ActionResult ShowRpt(string area, string name, string idrp, string view, string par, string r)
        {
            ViewBag.SpName = $"usp{area}{name}ReporteCsv";
            ViewBag.FileNm = $"{area}{name}{idrp}.rpt";
            ViewBag.Area = area;
            ViewBag.Name = name;
            ViewBag.IdRp = idrp;
            ViewBag.Option = r;
            string _vName = "";
            if (par != null)
            {
                ViewBag.Params = par;
                _vName = "_PuenteRpt";
            }
            else
            {
                _vName = $"Filtro{view}"; ;
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