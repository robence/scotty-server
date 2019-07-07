import ResponseType from '../../generic';

import { ContactType, ContactModel } from '.';

// response types
type SingleContact = { contact: ContactType };
type MultipleContacts = { contacts: ContactType[] };

// class signature
type ContactServiceType = {
  findById: (id: number) => Promise<ResponseType<SingleContact>>;
  findAll: () => Promise<ResponseType<MultipleContacts>>;
};

class ContactService implements ContactServiceType {
  findById = async (id: number): Promise<ResponseType<SingleContact>> => {
    try {
      const contact = await ContactModel.findById(id);
      if (!contact) {
        return { status: 404, payload: { errorMessage: 'NOT FOUND' } };
      }
      return { status: 200, payload: { contact } };
    } catch (errorMessage) {
      return { status: 400, payload: { errorMessage } };
    }
  };

  findAll = async (): Promise<ResponseType<MultipleContacts>> => {
    try {
      const contacts = await ContactModel.find({});
      return { status: 200, payload: { contacts } };
    } catch (errorMessage) {
      return { status: 400, payload: { errorMessage } };
    }
  };
}

const instance = new ContactService();
export default instance as ContactServiceType;
