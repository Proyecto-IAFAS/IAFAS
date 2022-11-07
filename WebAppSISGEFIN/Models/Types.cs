using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAppSISGEFIN.Models
{

    public enum ePost {
        eAuto = 0,
        eTop = 1,
        eLeft = 2
    }

    public class ctlText
    {
        public string Align { get; set; }
        public string Width { get; set; }
        public string Value { get; set; }
    }

    public class ctlCapt : ctlText
    {
        public ePost Postn { get; set; }
    }

    public class ControlX
    {
        public bool Enabled { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public ctlCapt Capt { get; set; }
        public ctlText Text { get; set; }
        public string OnKeyF2 { get; set; }
        
    }

}