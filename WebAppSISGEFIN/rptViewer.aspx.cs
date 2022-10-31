using System;
using System.IO;
using System.Net.Mime;
using WebAppSISGEFIN.Models;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using SisGeFin.Common.Types;
using System.Threading.Tasks;
using System.Timers;

namespace WebAppSISGEFIN
{
    public partial class rptViewer : System.Web.UI.Page
    {

 
        protected void Page_Load(object sender, EventArgs e)
        {
            string _urlReprt = "";

            try
            {

                string _GetUserName() {
                    string _user = "...";
                    dynamic _session = Session["DataUsuario"];
                    if (_session != null)
                    {
                        string[] _split = _session.Split('|');
                        _user = _split[2];
                    }
                    return _user;
                }

                string _FileNm = Request["FileNm"];
                string _SpName = Request["SpName"];
                string _Params = Request["Params"];
                string _UserNm = _GetUserName();
                string _Option = Request["r"];

                xResponse<dynamic> _rptDocum = SisGeFin.Reporting.BIZ.Runs.GetReportRPT(_FileNm, _SpName, _Params, _UserNm, _Option);

                if (_rptDocum.IsOk == true)
                {
                    if (_rptDocum.Code == 1)
                    {
                        CrystalReportViewer1.ReportSource = _rptDocum.Content;
                        CrystalReportViewer1.RefreshReport();
                    }
                    else
                    {
                        Response.Buffer = false;
                        var _cookie = new System.Web.HttpCookie("FullName");
                        _cookie.Value = _FileNm; Response.Cookies.Add(_cookie); 
                        ContentDisposition cd = new ContentDisposition
                        {
                            FileName = _FileNm,
                            Inline = true  // false = prompt the user for downloading;  true = browser to try to show the file inline
                        };
                        Response.Headers.Add("Content-Disposition", cd.ToString());
                        Response.ContentType = "application/pdf";
                        Response.BinaryWrite(_rptDocum.Content);
                    }
                }
                else
                {
                    if (_rptDocum.Code == 2)
                    {
                        _urlReprt = $"~/Reportes/MsgRpt/?msg={_rptDocum.Message}&e=2";
                        Response.Redirect(_urlReprt);
                    }
                    else
                    {
                        throw new Exception(_rptDocum.Message);
                    }
                }
            }
            catch (Exception ex)
            {
                string _msgError = ex.Message.Replace("\n", " ").Replace("\r", " ");
                _urlReprt = $"~/Reportes/MsgRpt/?msg={_msgError}&e=3";
                Response.Redirect(_urlReprt);
            }

            //finally
            //{
            //    if (_urlReprt != "")
            //    {
            //        if (_fullName != "")
            //        {
            //            Timer _timer = new Timer(3000);
            //            void _timer_Elapsed(object snd, ElapsedEventArgs evt)
            //            {
            //                File.Delete(_fullName);
            //                _timer.Stop();
            //            };                    
            //            _timer.Elapsed += _timer_Elapsed;        
            //            _timer.Start();
            //        }
            //        Response.Redirect(_urlReprt);
            //    }
            //}
                 
        }

    }

}