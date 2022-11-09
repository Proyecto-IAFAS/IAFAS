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

        /// <summary>
        /// Entrada unica para Nota de Modificatorio
        /// </summary>
        /// <param name="id">Ident. del Centro de Costo</param>
        /// <returns></returns>
        [HttpGet]
        //[FiltroAutenticacion]
        public ActionResult Mantenimiento(short ide)
        {
            string[] Data = Session["DataUsuario"].ToString().Split('|');
            string IdPerfil = Data[3];
            ViewBag.idEnt = ide;
            ViewBag.Menu = new Menu().Listar(IdPerfil);
            ViewBag.AnhoActual = Convert.ToString(DateTime.Now.Year);
            return View(); 
        }

        /// <summary>
        /// Registro para Agregar y Modicar Notas Modificatorias
        /// </summary>
        /// <param name="act">1=Nuevo / 2=Modificar</param>
        /// <param name="idn">Id de la Nota Modificatoria</param>
        /// <returns></returns>
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

        //[HttpGet]
        ////[FiltroAutenticacion]
        //public ActionResult Seguimiento()
        //{
        //    return View();
        //}

        //------------------------------------



    }
}