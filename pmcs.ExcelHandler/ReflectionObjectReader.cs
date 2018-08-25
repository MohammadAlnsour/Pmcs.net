using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pmcs.ExcelHandler
{
    internal static class ReflectionObjectReader<T>
    {
        internal static Dictionary<string, string> GetObjectPropertiesValues(T obj)
        {
            if (obj == null) throw new ArgumentNullException("obj");

            var propsValues = new Dictionary<string, string>();
            var type = typeof(T);

            var propsValuesList = new List<KeyValuePair<string, string>>();
            var props = type.GetProperties();

            propsValuesList.AddRange(props.Select(p =>
            {
                try
                {
                    var propName = p.Name;
                    var propValue = p.GetValue(obj).ToString();
                    var kvp = new KeyValuePair<string, string>(propName, propValue);
                    return kvp;
                }
                catch (Exception)
                {
                    return new KeyValuePair<string, string>(p.Name, "can not read value");
                }
            }));

            return propsValuesList.ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
        }
    }
}
