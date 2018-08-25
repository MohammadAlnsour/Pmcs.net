using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Reflection;

namespace pmcs.Core
{
    public static class Extensions
    {
        public static string SerializeObject<T>(this T obj)
        {
            try
            {
                return JsonConvert.SerializeObject(obj);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }

        public static T DeserializeObject<T>(this string json)
        {
            try
            {
                return JsonConvert.DeserializeObject<T>(json);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }

        public static string Hashstring(this string input)
        {
            var hashBytes = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(input));
            return Convert.ToBase64String(hashBytes); //Encoding.UTF8.GetString(hashBytes);
        }

        /// <summary>
        /// This method auto maps two objects with limitations it does not support deep copy but it supports one level only.
        /// </summary>
        /// <typeparam name="Tsource"></typeparam>
        /// <typeparam name="Tdestination"></typeparam>
        /// <param name="sourceObject"></param>
        /// <returns></returns>
        public static Tdestination AutoMapObject<Tsource, Tdestination>(this Tsource sourceObject) where Tsource : class
                                                                                                   where Tdestination : class, new()
        {
            if (sourceObject == null) throw new ArgumentNullException("sourceObject");

            var sourceType = sourceObject.GetType();
            var sourceProps = sourceType.GetProperties();

            var destinationType = typeof(Tdestination);
            var destinationProps = destinationType.GetProperties();

            Tdestination detinationObj = new Tdestination();

            foreach (var sourceProp in sourceProps)
            {
                foreach (var destProp in destinationProps)
                {
                    if (sourceProp.Name.ToLower() == destProp.Name.ToLower())
                    {
                        // PropertyInfo prop = detinationObj.GetType().GetProperty(destProp.Name, BindingFlags.Public | BindingFlags.Instance);
                        if (null != destProp && destProp.CanWrite)
                        {
                            destProp.SetValue(detinationObj, sourceProp.GetValue(sourceObject), null);
                        }
                    }
                }
            }
            return detinationObj;
        }

        public static int GetSortingKeySelector<Tsource>(this Tsource source, string primaryKeyName)
        {
            var sourceType = source.GetType();
            // var sourceProps = sourceType.GetProperties();

            var sourceProp = sourceType.GetProperty(primaryKeyName, typeof(int));
            if (sourceProp == null)
                throw new Exception("this object does not contains an integer Id property, thus cannot sort it");

            //var idProp = sourceProps.FirstOrDefault(p => p.Name.ToLower() == primaryKeyName.ToLower() && p.GetType() == typeof(int));
            //if (idProp == null)
            return (int)sourceProp.GetValue(source);
        }

    }
}
