using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Contact_Application.Models;
using WebMatrix.WebData;
using Contact_Application.Filters;
using Newtonsoft.Json;
using System.IO;


namespace Contact_Application.Controllers
{
    [InitializeSimpleMembership]
    public class HomeController : Controller
    {
        //declare global vars
        ContactRepository contactrepo = new ContactRepository();
        Helper helper = new Helper();
        JavaScriptSerializer serializer = new JavaScriptSerializer();

        
        //ajax GET call for checking user's identity
        public void IsLogged()
        {

            var dictionary = new Dictionary<string, object>();
            dictionary.Add("isauthenticated", User.Identity.IsAuthenticated);

            if (User.Identity.IsAuthenticated)
            {
                dictionary.Add("user_id", WebSecurity.GetUserId(User.Identity.Name));
                dictionary.Add("username", User.Identity.Name);
            }
            
            Response.Write(serializer.Serialize(dictionary));
            Response.End();
        
        }

        //ajax GET for retrieving all contacts
        public void AllContacts()
        {

            if (!User.Identity.IsAuthenticated)
            {
                Response.End();
            }

            var contacts = contactrepo.ListAllContacts();
            var collections = contacts.Select(contact => new
             {
                 contactid = contact.ContactId,
                 firstname = contact.FirstName,
                 lastname = contact.LastName,
                 phone = contact.Phone,
                 address = contact.Address,
                 country = contact.Country,
                 imageurl = contactrepo.filterContactImage(contact),
                 relationship = contactrepo.getRelationship(contact), //grab the relationship name
            });
               

            Response.Write(serializer.Serialize(collections));
            Response.End();

        }


        //ajax get for getting all relationships
        public void AllRelationships()
        {
            if (!User.Identity.IsAuthenticated)
            {
                Response.End();
            }

            var relationships = contactrepo.FindAllRelationships();
             var collections = relationships.Select(relation => new
             {
                 relationshipid = relation.RelationshipId,
                 type = relation.Type,
            });

             var result = new { relationships_array = collections };

             Response.Write(serializer.Serialize(result));
             Response.End();
        }


       [HttpPost]
       [AllowAnonymous]
       public void Login(LoginModel model)
        {

            var dictionary = new Dictionary<string, object>();
            dictionary.Add("username", model.UserName);
            dictionary.Add("password", "");
            dictionary.Add("RememberMe", model.RememberMe);
           
            if (ModelState.IsValid && WebSecurity.Login(model.UserName, model.Password, persistCookie: model.RememberMe))
            {
                dictionary.Add("isError", false);
            }
            else
            {
                dictionary.Add("isError", "Invalid credentials.");
            }

            Response.Write(serializer.Serialize(dictionary));
            Response.End();

        }

       [HttpPost]
       public void LogOff()
       {
           WebSecurity.Logout(); //try to log-out
           //create our response json
           var dictionary = new Dictionary<string, object>();
           dictionary.Add("isauthenticated", false);
           Response.Write(serializer.Serialize(dictionary));
           Response.End();

       }

       //ajax call to delete a contact
       [HttpPost]
       public void Delete(Contact model)
       {
           if (!User.Identity.IsAuthenticated)
           {
               Response.End();
           }

           var id = model.ContactId;
           var contact = contactrepo.GetContactById(id);

           try
           {
               contactrepo.Delete(contact);
               contactrepo.Save();//persist change

               //make sure that client side knows we don't have errors
               var newmodel = helper.ToDictModel(contact);
               newmodel.Add("isError", false);
               Response.Write(serializer.Serialize(newmodel));
               Response.End();
           }
           catch (Exception ex)
           {
               var dictmodel = helper.ToDictModel(contact);
               dictmodel.Add("isError", ex.Message);
               Response.Write(serializer.Serialize(dictmodel));
               Response.End();
           }
          
       }


      //update and add
       [HttpPost]
       public void Save(Contact model)
       {
           if (!User.Identity.IsAuthenticated)
           {
               Response.End();
           }

           var id = model.ContactId;
           bool isUpdate = false;

           Contact contact = new Contact();
          
           if(id > 0){
               isUpdate = true;
               contact = contactrepo.GetContactById(id);
           }
          
           try
            {
                contact.FirstName = model.FirstName;
                contact.LastName = model.LastName;
                contact.Phone = model.Phone;
                contact.Country = model.Country;
                contact.Address = model.Address;
                contact.RelationshipId = model.RelationshipId;

                if (!isUpdate)
                {
                    contactrepo.Add(contact);
                }
                
               
                contactrepo.Save();
                
                //make sure that client side knows we don't have errors
                var newmodel = helper.ToDictModel(model);
                newmodel.Add("isError", false);
                Response.Write(serializer.Serialize(newmodel));
                Response.End();

               
            }
            catch(Exception ex)
            {
                
                IEnumerable<Error> errors = contact.GetErrors();
                var errormodel = helper.ToDictModel(model);

                string errorstring = "";
                foreach (Error error in errors)
                {
                    errorstring += "<p>" + error.ErrorMessage + "</p>";
                }

                if (string.IsNullOrEmpty(errorstring)) {
                    errorstring = ex.Message;
                }

                errormodel.Add("isError", errorstring);
                Response.Write(serializer.Serialize(errormodel));
                Response.End();
            }

       }
       
        //ajax GET request to load a contact for editing
       public void Edit(int id) {
           
           if (!User.Identity.IsAuthenticated)
           {
               Response.End();
           }

           var contact = contactrepo.GetContactById(id);
           var dictionaryContact = helper.ToDictModel(contact);

           Response.Write(serializer.Serialize(dictionaryContact));
           Response.End();
       
       }
       
       //post action to upload file from the user
       public void Upload(Contact model, HttpPostedFileBase file)
       {
          
          Contact contact = contactrepo.GetContactById(model.ContactId);

           if (file != null && file.ContentLength > 0)
           {
               
               var fileName = Path.GetFileName(file.FileName);
               var path = Path.Combine(Server.MapPath("~/app/uploads"), fileName);
               file.SaveAs(path);
              
               contact.ImageUrl = "/app/uploads/" + fileName;
               contactrepo.Save();
           }

           Response.Write(serializer.Serialize(helper.ToDictModel(contact)));
           Response.End();

       }

        
        
        public ActionResult Index()
        {
            return View();
        }
        
        
       
    }
}
