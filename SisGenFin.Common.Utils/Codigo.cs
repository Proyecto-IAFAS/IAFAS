using System;
using System.IO;
using System.Collections.Generic;

namespace SisGeFin.Common.Utils
{
    public static class Utils
    {

        public static List<T> GetTramaToList<T>(string trama)
        {
            var _items = new List<T>();
            string[] _rows = trama.Split('¬');
            for (int f = 0; f < _rows.Length; f++)
            {
                try
                {
                    var _itm = Activator.CreateInstance<T>();
                    var _row = _rows[f];
                    string[] _cols = _row.Split('|'); int c = -1;
                    dynamic _properties = _itm.GetType().GetProperties();
                    foreach (var _prp in _properties)
                    {
                        try
                        {
                            c = c + 1;
                            dynamic _valor = _cols[c];
                            _prp.SetValue(_itm, Convert.ChangeType(_valor, _prp.PropertyType), null);
                        }
                        catch 
                        {
                            continue;
                        }
                    }
                    _items.Add(_itm);
                }
                catch 
                {
                    continue;
                }
            }
            return _items;
        }

        public static dynamic GetTramaToList(string trama, Type t)
        {
            var _listType = typeof(List<>);
            var _constrc = _listType.MakeGenericType(t);
            var _items = (System.Collections.IList)Activator.CreateInstance(_constrc);
            string[] _rows = trama.Split('¬');
            for (int f = 0; f < _rows.Length; f++)
            {
                try
                {
                    var _itm = Activator.CreateInstance(t);
                    var _row = _rows[f];
                    string[] _cols = _row.Split('|'); int c = -1;
                    dynamic _properties = _itm.GetType().GetProperties();
                    foreach (var _prp in _properties)
                    {
                        try
                        {
                            c = c + 1;
                            dynamic _valor = _cols[c];
                            _prp.SetValue(_itm, Convert.ChangeType(_valor, _prp.PropertyType), null);
                        }
                        catch 
                        {
                            continue;
                        }
                    }
                    _items.Add(_itm);
                }
                catch 
                {
                    continue;
                }
            }
            return _items;
        }

        public static byte[] StreamToArray(Stream stream)
        {
            var memory = new MemoryStream();
            memory.CopyTo(stream);
            return memory.ToArray();
        }

    }

}
