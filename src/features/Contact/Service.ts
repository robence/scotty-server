import { ContactType, ContactModel } from '.';
import {
  ResponseType,
  ResponseTypeWithCustomError,
} from '../../types/response';

import ValidationError from '../../generic/validation-error';
import { CustomErrorType, CustomErrorAsJSON } from '../../types/error';

// response types
type SingleContact = { contact: ContactType };
type MultipleContacts = { contacts: ContactType[] };

// type ErrorMessage = { errorMessage: object };

// class signature
type ContactServiceType = {
  findById(id: number): Promise<any>;
  findAll(): Promise<ResponseType<MultipleContacts>>;
};

class ContactService implements ContactServiceType {
  // @Catch
  async findById(id: number): Promise<any> {
    try {
      // const contact = await ContactModel.findById(id);
      // if (!contact) {
      //   return { status: 404, payload: { errorMessage: 'NOT FOUND' } };
      // }
      // return { status: 200, payload: { contact } };
      throw new ValidationError('catch me if you can');
    } catch (errorMessage) {
      if (errorMessage.name === 'ValidationError') {
        const customError: CustomErrorType = errorMessage;

      console.log('customError');
      console.log('-'.concat(customError.toJSON as any));
      console.log(customError);


        // FIXME: there shouldn't be an error here!
        const errorObj = customError;
        return { status: 400, payload: errorObj };
      }

      console.log('typeof errorMessage');
      console.log(errorMessage.name);

      return {
        status: 400,
        payload: {
          error: {
            name: 'Unreachable',
            message: 'shouldnt reach this code',
          },
        },
      };
    }
  }

  async findAll(): Promise<ResponseType<MultipleContacts>> {
    try {
      const contacts = await ContactModel.find({});
      return { status: 200, payload: { contacts } };
    } catch (errorMessage) {
      return { status: 400, payload: { errorMessage } };
    }
  }
}

const instance = new ContactService();
export default instance as ContactServiceType;
