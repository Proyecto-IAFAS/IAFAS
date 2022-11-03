using System;
using System.Data;
using SisGeFin.Common.Utils;
using System.Collections.Generic;
using SisGeFin.Reporting.ENT;

namespace SisGeFin.Reporting.DAT
{

    public static class LocalRun
    {
        public static string GetConnectST()
        {
            string _servidor = Environment.GetEnvironmentVariable("SERV_IAFAS", EnvironmentVariableTarget.User);
            string _basedato = Environment.GetEnvironmentVariable("DABA_IAFAS", EnvironmentVariableTarget.User);
            string _usuariox = Environment.GetEnvironmentVariable("USER_IAFAS", EnvironmentVariableTarget.User);
            string _password = Environment.GetEnvironmentVariable("PASS_IAFAS", EnvironmentVariableTarget.User);
            string _connectn = $"data source={_servidor};initial catalog={_basedato};user id={_usuariox};password={_password};MultipleActiveResultSets=True";
            return _connectn;
        }

        //public static string GetConnectEF()
        //{
        //    EntityConnectionStringBuilder entityBuilder = new EntityConnectionStringBuilder();
        //    entityBuilder.Metadata = "res://*/SisGeFinModel.csdl|res://*/SisGeFinModel.ssdl|res://*/SisGeFinModel.msl";
        //    entityBuilder.ProviderConnectionString = GetConnectST();
        //    entityBuilder.Provider = "System.Data.SqlClient";
        //    return entityBuilder.ToString();
        //}

    }

    //public partial class SisGeFinEntities
    //{
    //    public SisGeFinEntities() 
    //    : base(LocalRun.GetConnectEF())
    //    { }
    //}

    public class SisGeFinServer : SisGeFin.Common.SqlServer
    {
        public SisGeFinServer()
        : base(LocalRun.GetConnectST())
        { }

        public List<ReporteCR> GetReportes()
        {
            var _sqlStr = "Select * From dbo.ReportesCR With (NoLock)"; 
            var _result = this.ExecReaderToList<ReporteCR>(_sqlStr);
            return _result;
        }

        public ReporteCR GetReporte(int idRpt)
        {
            var _sqlStr = $"Select * From dbo.ReportesCR With (NoLock) Where IdReport={idRpt}";
            var _result = this.ExecReaderToObjt<ReporteCR>(_sqlStr);
            return _result;
        }

    }

}
