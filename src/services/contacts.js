import ContactsModel from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { sortOrderList } from '../constants/index.js';
import { contactFieldList } from '../constants/contacts-constants.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = contactFieldList[0],
  sortOrder = sortOrderList[0],
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsModel.find();

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsModel.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContact = async filter => {
  const contact = await ContactsModel.findOne(filter);
  return contact;
};

export const createContact = async payload => {
  const contact = await ContactsModel.create(payload);
  return contact;
};

export const updateContact = async (filter, payload, options = {}) => {
  const rawResult = await ContactsModel.findOneAndUpdate(filter, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async filter => {
  const contact = await ContactsModel.findOneAndDelete(filter);

  return contact;
};
