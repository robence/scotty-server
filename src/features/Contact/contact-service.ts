import IResponse from '../../generic';

import Contact from './contact-model';
import IContact from './contact-type';

// response payload types
type SingleContact = { contact: IContact };
type MultipleContacts = { contacts: IContact[] };

// class signature
type IContactService = {
  findById: (id: number) => Promise<IResponse<SingleContact>>;
  findAll: () => Promise<IResponse<MultipleContacts>>;
};

class ContactService implements IContactService {
  public findById = async (id: number): Promise<IResponse<SingleContact>> => {
    try {
      const contact = await Contact.findById(id);
      if (!contact) {
        return { status: 404, payload: { errorMessage: 'NOT FOUND' } };
      }
      return { status: 200, payload: { contact } };
    } catch (errorMessage) {
      return { status: 400, payload: { errorMessage } };
    }
  };

  public findAll = async (): Promise<IResponse<MultipleContacts>> => {
    try {
      const contacts = await Contact.find({});
      return { status: 200, payload: { contacts } };
    } catch (errorMessage) {
      return { status: 400, payload: { errorMessage } };
    }
  };
}

const instance = new ContactService();
export default instance as IContactService;
