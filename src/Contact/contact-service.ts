import Contact from './contact-model';
import IContact from './contact-types';

// TODO: extract
// generic
type ErrorMessage = { errorMessage: string };
interface IResponse2<T> {
  statusCode: number;
  statusMessage: string;
  payload: T | ErrorMessage;
}

// contact
type SingleContact = { contact: IContact };
type MultipleContacts = { contacts: IContact[] };

// class interface
interface IContactService {
  findById: (id: number) => Promise<IResponse2<SingleContact>>;
  findAll: () => Promise<IResponse2<MultipleContacts>>;
}

class ContactService implements IContactService {

  findById = async (id: number): Promise<any> => {
    try {
      const contact = await Contact.findById(id);
      if (!contact) {
        return { statusCode: 404, payload: { errorMessage: 'NOT FOUND' } };
      }
      return { statusCode: 200, payload: { contact } };
    } catch (errorMessage) {
      return { status: 400, payload: { errorMessage } };
    }
  }

  findAll = async (): Promise<any> => {
    try {
      const contacts = await Contact.find({});
      return { statusCode: 200, payload: { contacts } };
    } catch (errorMessage) {
      return { statusCode: 400, payload: { errorMessage } };
    }
  }
}

const instance = new ContactService();
export default instance as IContactService;
