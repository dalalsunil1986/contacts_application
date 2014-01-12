using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Contact_Application.Models
{
    public partial class Contact
    {

        public bool IsValid
        {
            get { return (GetErrors().Count() == 0); }
        }

        public IEnumerable<Error> GetErrors()
        {

            if (string.IsNullOrEmpty(FirstName))
                yield return new Error("First name is required.", "FirstName");

            if (string.IsNullOrEmpty(LastName))
                yield return new Error("Last name is required.", "LastName");

            if (string.IsNullOrEmpty(Phone))
                yield return new Error("Phone is required.", "Phone");

            if (string.IsNullOrEmpty(Address))
                yield return new Error("Address is required.", "Address");

            if (string.IsNullOrEmpty(Country))
                yield return new Error("Country is required.", "Country");


            int x = 1;
            if (!Object.ReferenceEquals(RelationshipId.GetType(), x.GetType()))
                yield return new Error("Relationship Id should be an integer.", "RelationshipId");
        }

        public string errorString(Error error)
        {
            return error.PropertyName + ':' + error.ErrorMessage;
        }

    }


    public class Error
    {
        public string ErrorMessage{get; private set;}
        public string PropertyName { get; private set;}


        public Error(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public Error(string errorMessage, string propertyName)
        {
            ErrorMessage = errorMessage;
            PropertyName = propertyName;
        }


    }

   



    


}