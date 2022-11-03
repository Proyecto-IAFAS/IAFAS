using Newtonsoft.Json;
using System;
//using System.IO;
using System.Collections.Generic;
using System.Data;
using System.Reflection;

namespace SisGeFin.Common.Utils
{

    public static class JsonObj
    {
        public static string ObjToJson(object obj)
        {
            var _sett = new JsonSerializerSettings();
            _sett.DateFormatString = "yyyy/MM/dd HH:mm:ss";
            _sett.NullValueHandling = NullValueHandling.Ignore;
            _sett.DefaultValueHandling = DefaultValueHandling.Ignore;
            var _rpta = JsonConvert.SerializeObject(obj, Formatting.None, _sett);
            return _rpta;
        }

        public static T JsonToObj<T>(string json)
        {
            var _sett = new JsonSerializerSettings();
            _sett.DateFormatString = "yyyy/MM/dd HH:mm:ss";
            _sett.NullValueHandling = NullValueHandling.Ignore;
            _sett.DefaultValueHandling = DefaultValueHandling.Ignore;
            var _rpta = JsonConvert.DeserializeObject<T>(json, _sett);
            return _rpta;
        }

        public static object JsonToObj(string json)
        {
            var _sett = new JsonSerializerSettings();
            _sett.DateFormatString = "yyyy/MM/dd HH:mm:ss";
            _sett.NullValueHandling = NullValueHandling.Ignore;
            _sett.DefaultValueHandling = DefaultValueHandling.Ignore;
            var _rpta = JsonConvert.DeserializeObject(json, _sett);
            return _rpta;
        }

    }

    public static class ConverT
    {
        public static dynamic ReaderToList(IDataReader pReader, Type t)
        {
            if (pReader == null) { return null; }

            var _listType = typeof(List<>);
            var _constrc = _listType.MakeGenericType(t);
            var _lstDest = (System.Collections.IList)Activator.CreateInstance(_constrc);

            while (pReader.Read())
            {
                var _objDest = Activator.CreateInstance(t);
                foreach (PropertyInfo P in _objDest.GetType().GetProperties())
                {
                    try
                    {
                        var iCol = pReader.GetOrdinal(P.Name);
                        var xVal = pReader.GetValue(iCol);
                        if (!Object.Equals(xVal, DBNull.Value))
                        {
                            if (P.PropertyType.FullName.Contains("DateTime") == true)
                            {
                                P.SetValue(_objDest, xVal, null);
                            }
                            else
                            {
                                P.SetValue(_objDest, System.Convert.ChangeType(xVal, P.PropertyType), null);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }
                _lstDest.Add(_objDest);
            }
            pReader.Close();
            return _lstDest;

        }

        public static List<T> ReaderToList<T>(IDataReader pReader)
        {
            if (pReader == null) { return null; }

            List<T> _lstDest = new List<T>();
            T _objDest;

            while (pReader.Read())
            {
                _objDest = Activator.CreateInstance<T>();
                foreach (PropertyInfo P in _objDest.GetType().GetProperties())
                {
                    try
                    {
                        var iCol = pReader.GetOrdinal(P.Name);
                        var xVal = pReader.GetValue(iCol);
                        if (!Object.Equals(xVal, DBNull.Value))
                        {
                            if (P.PropertyType.FullName.Contains("DateTime") == true)
                            {
                                P.SetValue(_objDest, xVal, null);
                            }
                            else
                            {
                                P.SetValue(_objDest, System.Convert.ChangeType(xVal, P.PropertyType), null);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }
                _lstDest.Add(_objDest);
            }
            pReader.Close();
            return _lstDest;

        }

        public static T ReaderToObjt<T>(IDataReader pReader)
        {
            pReader.Read();
            T _objDest = Activator.CreateInstance<T>();
            foreach (PropertyInfo P in _objDest.GetType().GetProperties())
            {
                try
                {
                    var iCol = pReader.GetOrdinal(P.Name);
                    var xVal = pReader.GetValue(iCol);
                    if (!Object.Equals(xVal, DBNull.Value))
                    {
                        if (P.PropertyType.FullName.Contains("DateTime") == true)
                        {
                            P.SetValue(_objDest, xVal, null);
                        }
                        else
                        {
                            P.SetValue(_objDest, System.Convert.ChangeType(xVal, P.PropertyType), null);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            pReader.Close();
            return _objDest;
        }

        public static T ObjectToObjt<T>(object source)
        {
            var _jsonOri = JsonObj.ObjToJson(source);
            var _newObjt = JsonObj.JsonToObj<T>(_jsonOri);
            return _newObjt;
        }

        public static List<T> TramaToList<T>(string trama)
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

        public static dynamic TramaToList(string trama, Type t)
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

    }

}
