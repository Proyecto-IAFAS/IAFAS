﻿using WebAppSISGEFIN.Models;
using System.IO;
using io = System.IO;
using System.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using General.Librerias.CodigoUsuario;
using General.Librerias.AccesoDatos;
using WebAppSISGEFIN.Filtros;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Data;


namespace WebAppSISGEFIN.Controllers
{
    public class TesoreriaController : Controller
    {
        // GET: Tesoreria
        [FiltroAutenticacion]
        public ActionResult Index()
        {
            return View();
        }
                

        [FiltroAutenticacion]
        public ActionResult Bancos()
        {
            string[] Data = Session["DataUsuario"].ToString().Split('|');
            string IdPerfil = Data[3];
            ViewBag.Menu = new Menu().Listar(IdPerfil);
            return View();
        }

        [FiltroAutenticacion]
        public ActionResult CuentaBanca()
        {
            string[] Data = Session["DataUsuario"].ToString().Split('|');
            string IdPerfil = Data[3];
            ViewBag.Menu = new Menu().Listar(IdPerfil);
            return View();
        }

        [FiltroAutenticacion]
        public ActionResult ProgramaPago()
        {
            string[] Data = Session["DataUsuario"].ToString().Split('|');
            string IdPerfil = Data[3];
            ViewBag.Menu = new Menu().Listar(IdPerfil);
            ViewBag.AnhoActual = Convert.ToString(DateTime.Now.Year);
            return View();
        }
    }
}