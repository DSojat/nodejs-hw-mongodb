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

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsModel.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
