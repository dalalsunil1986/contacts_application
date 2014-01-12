using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Contact_Application.Models
{
    public class Helper
    {
        //returns a dictionary for a single model
        public Dictionary<object, object> ToDictModel(object model)
        {
            var dictionary = new Dictionary<object, object>();
            foreach (System.Reflection.PropertyInfo info in model.GetType().GetProperties())
            {
                //make sure not to include the Relationship Info
                if (info.CanRead && !info.Name.Equals("Relationship", StringComparison.Ordinal))
                {
                    dictionary.Add(info.Name.ToLower(), info.GetValue(model, null));
                }

            }

            return dictionary;
        }


        //returns a json string for multiple models
        public string ToJsonModels(IEnumerable<object> models)
        {
            int x = 0;
            int z = models.Count();
            string result = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            foreach (Contact model in models)
            {

                if (x == 0) { result = "["; }

                if (x == z - 1)
                {
                    result += serializer.Serialize(this.ToDictModel(model)).ToString() + "]";
                }
                else
                {
                    result += serializer.Serialize(this.ToDictModel(model)).ToString() + ",";
                }

                x++;

            }

            return result;
        }
    }
}