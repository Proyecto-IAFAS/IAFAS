using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAppSISGEFIN.Filtros;
using WebAppSISGEFIN.Models;

namespace WebAppSISGEFIN.Controllers
{

    public class NotasModificaController : Controller
    {


        [HttpGet]
        public ActionResult Registro(byte act, int idn = default)
        {

            ViewBag.Action = act;
            ViewBag.IdNota = idn;
            if (act == 1) 
            { //Agragar - Nuevo registro
                return View();
            }
            else
            { //Modificar - Obtener registro
                var _regist = new Object(); // ObtenerDeBaseDatos(idn);
                return View(_regist);
            }            
        }

        [HttpGet]
        public ActionResult BuscadorPims()
        {
            return View();
        }

        //[HttpGet]
        ////[FiltroAutenticacion]
        //public ActionResult Seguimiento()
        //{
        //    return View();
        //}

        //------------------------------------



    }
}