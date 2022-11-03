using System;
using System.IO;
using System.Linq;
using System.Reflection;
using SisGeFin.Common.Types;
using SisGeFin.Reporting.DAT;
using System.Threading.Tasks;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using SisGeFin.Common.Utils;
using System.Data;

namespace SisGeFin.Reporting.BIZ
{
    public static class Reporting
    {

        private static SisGeFinServer _server = new SisGeFinServer(); 

        private static ReportDocument OpenDocumRPT(string fileRpt)
        {
            string _baseDir = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase.Replace("file:///","");

            FileInfo _fileInfo = new FileInfo(_baseDir);

            _baseDir = _fileInfo.Directory.FullName;

            _baseDir = System.IO.Path.Combine(_baseDir, "filesRpt");

            string _fileRpt = System.IO.Path.Combine(_baseDir, fileRpt);

            if (File.Exists(_fileRpt) == true )
            {
                ReportDocument _ReportDocument = new ReportDocument();
                _ReportDocument.Load(_fileRpt, OpenReportMethod.OpenReportByTempCopy);
                return _ReportDocument;
            }
            else
            {
                throw new Exception("El archivo base del reporte, No existe..");
            }
            
        }
         
        private static xResponse<dynamic> GetDataFromDbx(string spName, string typeNm, string param)
        {
            var _response = new xResponse<dynamic>();
            try
            {
                string _fileBase = "SisGeFin.Reporting.ENT.{0}";    
                string _fileType = AppDomain.CurrentDomain.BaseDirectory + "bin\\" + string.Format(_fileBase, "dll");
                Assembly _assembly = Assembly.LoadFrom(_fileType);
                Type _customTy = _assembly.GetType(string.Format(_fileBase, typeNm));
                string _sqlString = $"Exec dbo.{spName} '{param}'"; 

                var _datRows = _server.ExecReaderToList(_sqlString, _customTy); 

                if (_datRows != null)
                {
                    if (_datRows.Count > 0)
                    {
                        _response.Message = $"Se hallaron {_datRows.Count} registros.";
                        _response.Content = _datRows;
                        _response.IsOk = true;
                    }
                    else
                    {
                        throw new Exception("No se hallaron registros con los criterios especificados.");
                    }
                }
                else
                {
                    throw new Exception("No se pudo conectar y/o obtener datos del origen indicado.");
                }
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.IsOk = false;
            }
            return _response;
        }

        public static xResponse<dynamic> GetReportRpt(string fileRpt, string spName, string typeNm, string paramx, string user, string opt)
        {
            var _response = new xResponse<dynamic>();
            try
            {
                var _rptData = GetDataFromDbx(spName, typeNm, paramx);

                if (_rptData.IsOk == true)
                {
                    ReportDocument _report = OpenDocumRPT(fileRpt);

                    _report.Database.Tables[0].SetDataSource(_rptData.Content);

                    _report.ReadRecords();
                    _report.DataDefinition.FormulaFields[0].Text = "'" + user + "'";
                    if (opt == "1")
                    {
                        _response.Message = "CrystalReport";
                        _response.Content = _report;
                        _response.IsOk = true;
                        _response.Code = 1;
                    }
                    else
                    {
                        MemoryStream _memory = new MemoryStream();
                        Stream _stream = _report.ExportToStream(ExportFormatType.PortableDocFormat);
                        _stream.CopyTo(_memory);
                        _response.Message = "Objeto Binario";
                        _response.Content = _memory.ToArray();
                        _response.IsOk = true;
                        _response.Code = 2;
                    }
                }
                else
                {
                    throw new Exception(_rptData.Message);
                }
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.Content = null;
                _response.IsOk = false;
                _response.Code = 3;
            }
            return _response;
        }

        public static xResponse<dynamic> GetLstReportes()
        {
            var _response = new xResponse<dynamic>();
            try
            {
                var _rows = _server.GetReportes();
                if (_rows != null)
                {
                    _response.Message = $"Se hallaron {_rows.Count} registros.";
                    _response.Content = _rows;
                    _response.IsOk = true;
                    _response.Code = 1;
                }
                else
                {
                    _response.Message = "No se hallaron registros.";
                    _response.Content = null;
                    _response.IsOk = false;
                    _response.Code = 2;
                }
            }
            catch(Exception ex)
            {
                _response.Message = ex.Message;
                _response.Content = null;
                _response.IsOk = false;
                _response.Code = 3;
            }
            return _response;
        }

        public static xResponse<dynamic> GetOneReporte(int idRpt)
        {
            var _response = new xResponse<dynamic>();
            try
            {
                var _regist = _server.GetReporte(idRpt);
                if (_regist != null)
                {
                    _response.Message = $"Se halló el registro solicitado.";
                    _response.Content = _regist;
                    _response.IsOk = true;
                    _response.Code = 1;
                }
                else
                {
                    _response.Message = "No se halló el registro.";
                    _response.Content = null;
                    _response.IsOk = false;
                    _response.Code = 2;
                }
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.Content = null;
                _response.IsOk = false;
                _response.Code = 3;
            }
            return _response;
        }

    }

}
