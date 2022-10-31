using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SisGeFin.Common.Types
{

    public class rMensaje
    {
        public string Type { get; set; }
        public string Image { get; set; }
        public string Message { get; set; }
    }

    public class rElemCbo
    {
        public string Codigo { get; set; }
        public string Descrp { get; set; }
    }

    public class xResponse<T>
    {
        public bool IsOk { get; set; }
        public string Message { get; set; }
        public T Content { get; set; }
        public byte Code { get; set; }
    }

}
