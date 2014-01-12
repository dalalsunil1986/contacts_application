using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



namespace Contact_Application.Models
{
    public class ContactRepository
    {
        
        private ContactApplicationDataContext dbconn = new ContactApplicationDataContext();
        
        //gets all the relationship model in list form
        public List<Relationship> ListAllRelationships()
        {
            return dbconn.Relationships.ToList();
        }

        
        //getting all the contacts
        public IQueryable<Contact> FindAllContacts()
        {
            return dbconn.Contacts;
        }


        //returns a list of contacts
        public List<Contact> ListAllContacts()
        {
            return dbconn.Contacts.ToList();
        }


        //get a contacts relationship name
        public string[] getRelationship(Contact contact){
            
            var query = from rel in dbconn.Relationships
                        where rel.RelationshipId == contact.RelationshipId
                       select rel.Type;
            
            return query.ToArray();
        }


        //returns the right image for the contact
        public string filterContactImage(Contact contact)
        {     
              string imageurl = contact.ImageUrl;
              
             if(string.IsNullOrEmpty(imageurl)){
                  imageurl = "/app/img/placeholder.png"; 
              }

            return imageurl;
        }


        //getting all the relationships
        public IQueryable<Relationship> FindAllRelationships()
        {
            return dbconn.Relationships;
        }

        //returns a single contact
        public Contact GetContactById(int id)
        {
            return dbconn.Contacts.SingleOrDefault(d => d.ContactId == id);
        }

        //finds a contact with with given relationship id
        public IQueryable<Contact> FindContactByRelationShip(int RelationshipId)
        {
            return from contacts in dbconn.Contacts
                   where contacts.RelationshipId == RelationshipId
                   select contacts;
        }


        public void Add(Contact contact)
        {
            dbconn.Contacts.InsertOnSubmit(contact);
        }

        public void Delete(Contact contact)
        {
            dbconn.Contacts.DeleteOnSubmit(contact);
        }

        public void Save()
        {
            dbconn.SubmitChanges();
        }


       internal IEnumerable<Relationship> getRelationship(int p)
        {
            throw new NotImplementedException();
        }
    }



}