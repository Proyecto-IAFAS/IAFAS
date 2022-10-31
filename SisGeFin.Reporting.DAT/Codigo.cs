using System;
using System.Data.Entity.Core.EntityClient;

namespace SisGeFin.Reporting.DAT
{

    public static class LocalRun
    {

        public static string GetConnection()
        {
            //    <add name="SisGeFinEntities"
            //    connectionString="metadata=res://*/SisGeFinModel.csdl|res://*/SisGeFinModel.ssdl|res://*/SisGeFinModel.msl;provider=System.Data.SqlClient;provider
            //    connection string=&quot;
            //    data source=154.53.44.5\SQLEXPRESS;
            //    initial catalog=BDSISGEFIN;
            //    persist security info=True;
            //    user id=userSisgefin;
            //    password=P@ssw0rd2022;
            //    MultipleActiveResultSets=True;
            //    App=EntityFramework&quot;" providerName="System.Data.EntityClient" />

            EntityConnectionStringBuilder entityBuilder = new EntityConnectionStringBuilder();
            entityBuilder.Metadata = "res://*/SisGeFinModel.csdl|res://*/SisGeFinModel.ssdl|res://*/SisGeFinModel.msl";
            
            string _servidor = Environment.GetEnvironmentVariable("SERV_IAFAS", EnvironmentVariableTarget.Machine);
            string _basedato = Environment.GetEnvironmentVariable("DABA_IAFAS", EnvironmentVariableTarget.Machine);
            string _usuariox = Environment.GetEnvironmentVariable("USER_IAFAS", EnvironmentVariableTarget.Machine);
            string _password = Environment.GetEnvironmentVariable("PASS_IAFAS", EnvironmentVariableTarget.Machine);

            //string _servidor = Environment.GetEnvironmentVariable("SERV_IAFAS", EnvironmentVariableTarget.User);
            //string _basedato = Environment.GetEnvironmentVariable("DABA_IAFAS", EnvironmentVariableTarget.User);
            //string _usuariox = Environment.GetEnvironmentVariable("USER_IAFAS", EnvironmentVariableTarget.User);
            //string _password = Environment.GetEnvironmentVariable("PASS_IAFAS", EnvironmentVariableTarget.User);

            string _connectn = $"data source={_servidor};initial catalog={_basedato};user id={_usuariox};password={_password};MultipleActiveResultSets=True";
            entityBuilder.ProviderConnectionString = _connectn;
            entityBuilder.Provider = "System.Data.SqlClient";
            string _strConnt = entityBuilder.ToString();
            return _strConnt;
        }

    }

    public partial class SisGeFinEntities
    {
        public SisGeFinEntities()
        : base(LocalRun.GetConnection())
        {
        }

    }

}
