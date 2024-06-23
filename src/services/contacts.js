import ContactsModel from '../db/Contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsModel.find();
  return contacts;
};

export const getContactById = async contactId => {
  const contact = await ContactsModel.findById(contactId);
  return contact;
};

export const createContact = async payload => {
  const contact = await ContactsModel.create(payload);
  return contact;
};
