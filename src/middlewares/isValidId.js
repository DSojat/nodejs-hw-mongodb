import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  if (!isValidObjectId(contactId)) {
    return next(createHttpError(404, `${contactId} is not valid id`));
  }
  next();
};

export default isValidId;
