using System;
using System.IO;
using System.Net.Mime;
using System.Reflection;
using SisGeFin.Common.Types;
using SisGeFin.Reporting.BIZ;
using System.Collections.Generic;

namespace WebAppSISGEFIN
{
    public partial class rptViewer : System.Web.UI.Page
    {
 
        protected void Page_Load(object sender, EventArgs e)
        {
            string _urlRept = "";
            string _message = "";
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
                string _TypeNm = Request["TypeNm"];
                string _Params = Request["Params"];
                string _Option = Request["Option"];         
                string _UserNm = _GetUserName();

                xResponse <dynamic> _rptDocum = Reporting.GetReportRpt(_FileNm, _SpName, _TypeNm, _Params, _UserNm, _Option);

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
                            Inline = true 
                        };
                        Response.Headers.Add("Content-Disposition", cd.ToString());
                        Response.ContentType = "application/pdf";
                        Response.BinaryWrite(_rptDocum.Content);
                    }
                }
                else
                {
                    _message = _rptDocum.Message.Replace("\n", " ").Replace("\r", " ");
                    _urlRept = $"~/Reportes/MsgRpt/?msg={_message}&e=2";
                }
            }
            catch (Exception ex)
            {
                _message = ex.Message.Replace("\n", " ").Replace("\r", " ");
                _urlRept = $"~/Reportes/MsgRpt/?msg={_message}&e=3";
            }

            if (_urlRept != "")
            {
                Response.Redirect(_urlRept);
            }

        }

    }

}