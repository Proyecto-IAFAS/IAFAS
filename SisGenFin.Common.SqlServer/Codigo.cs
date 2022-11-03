using System;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using SisGeFin.Common.Utils;

/// <summary>
/// Desarrollado por Rafael Pinedo P.
/// </summary>
namespace SisGeFin.Common
{
    public class SqlServer : IDisposable
    {
        #region "Declaración"

        private SqlTransaction xTransact;

        private SqlConnection xConnectX;

        public bool IsConnected
        {
            get
            {
                if (xConnectX == null)
                    return false;
                else
                    return (xConnectX.State == ConnectionState.Open);
            }
        }

        public bool InTransac
        {
            get
            {
                if (xTransact == null)
                    return false;
                else
                    return true;
            }
        }

        private string _connectString;

        public string ConnectString
        {
            get
            {
                return _connectString;
            }
            set
            {
                _connectString = value;
            }
        }

        #endregion

        #region "Constructor"

        public SqlServer()
        {
        }

        public SqlServer(string pConnectString)
        {
            _connectString = pConnectString;
        }

        public SqlServer(SqlConnection pConnectX)
        {
            xConnectX = pConnectX;
        }

        #endregion

        #region "General"

        private SqlCommand CreateCommand(string pCommandText, CommandType pCommandType)
        {
            SqlCommand _command = null;
            using (_command = new SqlCommand())
            {
                _command.CommandType = pCommandType;
                _command.Connection = xConnectX;
                _command.Transaction = xTransact;
                _command.CommandText = pCommandText;
                _command.CommandTimeout = 3000;
            }
            return _command;
        }

        private SqlCommand CreateCommand(string pCommandText, CommandType pCommandType, ref List<SqlParameter> pParameters)
        {
            SqlCommand _command = null;
            using (_command = CreateCommand(pCommandText, pCommandType))
            {
                if (pParameters != null)
                {
                    foreach (var _Par in pParameters)
                    {
                        _command.Parameters.Add(_Par);
                    }
                }
            }
            return _command;
        }

        public void CloseConnection()
        {
            if (xConnectX != null)
            {
                if (xConnectX.State != ConnectionState.Closed)
                {
                    if (xTransact != null)
                    {
                        xTransact.Rollback();
                    }
                    try
                    {
                        xConnectX.Close();
                        xConnectX.Dispose();
                        xConnectX = null;
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
        }

        public void Dispose()
        {
            CloseConnection();
        }

        #endregion

        #region "Transacción"

        public bool BeginTransaction(IsolationLevel pIsolation = IsolationLevel.ReadCommitted)
        {
            bool mRpta = false;
            if (this.IsConnected)
            {
                if (!this.InTransac)
                {
                    try
                    {
                        xTransact = xConnectX.BeginTransaction(pIsolation);
                        mRpta = true;
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
            return mRpta;
        }

        public bool RollBackTransaction()
        {
            bool mRpta = false;
            if (this.IsConnected)
            {
                if (this.InTransac)
                {
                    try
                    {
                        xTransact.Rollback();
                        xTransact = null;
                        mRpta = true;
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
            return mRpta;
        }

        public bool CommitTransaction()
        {
            bool mRpta = false;
            if (this.IsConnected)
            {
                if (this.InTransac)
                {
                    try
                    {
                        xTransact.Commit();
                        xTransact = null;
                        mRpta = true;
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
            return mRpta;
        }

        #endregion

        #region "Sincrono"           

        public void OpenConnection()
        {
            try
            {
                if (xConnectX == null)
                {
                    xConnectX = new SqlConnection(_connectString);
                }

                if (xConnectX.State != ConnectionState.Open)
                {
                    xConnectX.Open();
                }
           
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public SqlDataReader ExecuteReader(string pCommandSql)
        {
            SqlDataReader mRpta;
            using (SqlCommand _Command = CreateCommand(pCommandSql, CommandType.Text))
            {
                mRpta = _Command.ExecuteReader();
            }
            return mRpta;
        }

        public SqlDataReader ExecuteReader(string pCommandText, CommandType pCommandType, ref List<SqlParameter> pParameters)
        {
            SqlDataReader _Reader = null;
            using (SqlCommand _Command = CreateCommand(pCommandText, pCommandType, ref pParameters))
            {
                _Reader = _Command.ExecuteReader();
            }
            return _Reader;
        }

        public object ExecuteScalar(string pCommandText, CommandType pCommandType, ref List<SqlParameter> pParameters)
        {
            object _Rpta = null;
            using (SqlCommand _Command = CreateCommand(pCommandText, pCommandType, ref pParameters))
            {
                _Rpta = _Command.ExecuteScalar();
            }
            return _Rpta;
        }

        public long ExecuteNonQuery(string pCommandText, CommandType pCommandType, ref List<SqlParameter> pParameters)
        {
            long _nRows = 0;
            using (SqlCommand _Command = CreateCommand(pCommandText, pCommandType, ref pParameters))
            {
                _nRows = _Command.ExecuteNonQuery();
            }
            return _nRows;
        }

        //-------------------------------------------------------------------------

        public dynamic ExecReaderToList(string pCommandSql, Type type)
        {
            this.OpenConnection();
            var _reader = this.ExecuteReader(pCommandSql);
            var _result = ConverT.ReaderToList(_reader, type);
            this.CloseConnection();
            return _result;
        }

        public List<T> ExecReaderToList<T>(string pCommandSql)
        {
            this.OpenConnection();
            var _reader = this.ExecuteReader(pCommandSql);
            var _result = ConverT.ReaderToList<T>(_reader);
            this.CloseConnection();
            return _result;
        }

        public T ExecReaderToObjt<T>(string pCommandSql)
        {
            this.OpenConnection();
            var _reader = this.ExecuteReader(pCommandSql);
            var _result = ConverT.ReaderToObjt<T>(_reader);
            this.CloseConnection();
            return _result;
        }

        #endregion

        #region "Asincrono"

        public async Task OpenConnectionAsync(CancellationToken ct = default)
        {
            try
            {
                if (xConnectX == null)
                {
                    xConnectX = new SqlConnection(_connectString);
                }
                await xConnectX.OpenAsync(ct);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> ExecuteScalarAsync(string pCommandSql, CancellationToken ct = default)
        {
            object mRpta;
            using (SqlCommand _Command = CreateCommand(pCommandSql, CommandType.Text))
            {
                if (ct.IsCancellationRequested) { ct.ThrowIfCancellationRequested(); }
                mRpta = await _Command.ExecuteScalarAsync();
            }
            return mRpta;
        }

        public async Task<long> ExecuteNonQueryAsync(string pCommandSql, CancellationToken ct = default)
        {
            long mRpta = 0;
            using (SqlCommand _Command = CreateCommand(pCommandSql, CommandType.Text))
            {
                if (ct.IsCancellationRequested) { ct.ThrowIfCancellationRequested(); }
                mRpta = await _Command.ExecuteNonQueryAsync(ct);
            }
            return mRpta;
        }

        public async Task<SqlDataReader> ExecuteReaderAsync(string pCommandSql, CancellationToken ct = default)
        {
            SqlDataReader mRpta;
            using (SqlCommand _Command = CreateCommand(pCommandSql, CommandType.Text))
            {
                if (ct.IsCancellationRequested) { ct.ThrowIfCancellationRequested(); }
                mRpta = await _Command.ExecuteReaderAsync(ct);
            }
            return mRpta;
        }

        public async Task<SqlDataReader> ExecuteReaderAsync(string pCommandText, CommandType pCommandType, List<SqlParameter> pParameters, CancellationToken ct = default)
        {
            SqlDataReader _Reader = null;
            using (SqlCommand _Command = CreateCommand(pCommandText, pCommandType, ref pParameters))
            {
                if (ct.IsCancellationRequested) { ct.ThrowIfCancellationRequested(); }
                _Reader = await _Command.ExecuteReaderAsync(ct);
            }
            return _Reader;
        }

        public async Task<object> ExecuteScalarAsync(string pCommandText, CommandType pCommandType, List<SqlParameter> pParameters, CancellationToken ct = default)
        {
            object _Rpta = null;
            using (SqlCommand _Command = CreateCommand(pCommandText, pCommandType, ref pParameters))
            {
                if (ct.IsCancellationRequested) { ct.ThrowIfCancellationRequested(); }
                _Rpta = await _Command.ExecuteScalarAsync(ct);
            }
            return _Rpta;
        }

        public async Task<long> ExecuteNonQueryAsync(string pCommandText, CommandType pCommandType, List<SqlParameter> pParameters, CancellationToken ct = default)
        {
            long _nRows = 0;
            using (SqlCommand _Command = CreateCommand(pCommandText, pCommandType, ref pParameters))
            {
                if (ct.IsCancellationRequested) { ct.ThrowIfCancellationRequested(); }
                _nRows = await _Command.ExecuteNonQueryAsync(ct);
            }
            return _nRows;
        }

        //------------------------------------------------------------------------------

        public async Task<dynamic> ExecReaderToListAsync(string pCommandSql, Type type, CancellationToken ct = default)
        {
            try
            {
                await this.OpenConnectionAsync(ct);
                var _reader = await this.ExecuteReaderAsync(pCommandSql, ct);
                var _result = ConverT.ReaderToList(_reader, type);
                return _result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                this.CloseConnection();
            }        
        }

        public async Task<List<T>> ExecReaderToListAsync<T>(string pCommandSql, CancellationToken ct = default)
        {
            try
            {
                await this.OpenConnectionAsync(ct);
                var _reader = await this.ExecuteReaderAsync(pCommandSql, ct);
                var _result = ConverT.ReaderToList<T>(_reader);
                return _result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                this.CloseConnection();
            }
        }

        public async Task<T> ExecReaderToObjtAsync<T>(string pCommandSql, CancellationToken ct = default)
        {
            try
            {
                await this.OpenConnectionAsync(ct);
                var _reader = await this.ExecuteReaderAsync(pCommandSql, ct);
                var _result = ConverT.ReaderToObjt<T>(_reader);
                return _result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                this.CloseConnection();
            }
        }

        #endregion

    }
}
