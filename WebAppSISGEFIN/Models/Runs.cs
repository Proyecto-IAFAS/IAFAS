using System;
using System.IO;
using System.Linq;
using SisGeFin.Common.Utils;
using System.Collections.Generic;
using General.Librerias.AccesoDatos;

namespace WebAppSISGEFIN.Models
{
    public static class Runs
    {

        public static List<T> GetRows4Combo<T>(string param)
        {
            daSQL _odaSQL = new daSQL("conSISGEFIN");
            string _trama = _odaSQL.EjecutarComando("usp_GetDataForCombo", "@param", param);
            var _rows = Utils.GetTramaToList<T>(_trama);
            return _rows;
        }

        public static string GetTrama4Combo(string param)
        {
            daSQL _odaSQL = new daSQL("conSISGEFIN");
            string _trama = _odaSQL.EjecutarComando("usp_GetDataForCombo", "@param", param);
            return _trama;
        }

    }

}