using System;
using SisGeFin.Common.Types;
using SisGeFin.Reporting.DAT;
using System.Threading.Tasks;
using CrystalDecisions.Shared;
using System.Collections.Generic;
using CrystalDecisions.CrystalReports.Engine;
using System.Linq;
using System.Data.Entity.Infrastructure;
using System.IO;

namespace SisGeFin.Reporting.BIZ
{
    public static class Runs
    {
        static SisGeFinEntities _dbx = new SisGeFinEntities();

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

        private static xResponse<List<vPatriminioInventario>> GetDataFromDBX(string spName, string param)
        {
            var _response = new xResponse<List<vPatriminioInventario>>();
            try
            {
                string _sqlExecute = "dbo." + spName + " @param = {0}";

                var _dataRows = _dbx.Database.SqlQuery<vPatriminioInventario>(_sqlExecute, param).ToList();

                if (_dataRows != null)
                {
                    if (_dataRows.Count > 0) 
                    {
                        _response.Message = $"Se hallaron {_dataRows.Count} registros.";
                        _response.Content = _dataRows;
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

        public static xResponse<dynamic> GetReportRPT(string fileRpt, string spName, string paramx, string user, string opt)
        {
            var _response = new xResponse<dynamic>();
            try
            {
                var _rptData = GetDataFromDBX(spName, paramx);
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

    }

}
