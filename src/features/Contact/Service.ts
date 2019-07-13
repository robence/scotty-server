import { OK } from 'http-status-codes';

import { ContactType, ContactModel } from './Model';
import ResponseType from '../../types/response';

import Catch from '../../generic/catch';
import { HTTP400Error, HTTP404Error } from '../../error/http-400.error';

// response types
type SingleContact = { contact: ContactType };
type MultipleContacts = { contacts: ContactType[] };

class ContactService {
  @Catch
  async createContact(body: ContactType): Promise<ResponseType<SingleContact>> {
    const contact = new ContactModel(body);
    const contactFromMongo = await contact.save();
    if (!contactFromMongo) throw new HTTP400Error('could not save contact');
    return { status: OK, payload: { contact: contactFromMongo } };
  }

  @Catch
  async retrieveContact(id: number): Promise<ResponseType<SingleContact>> {
    const contact = await ContactModel.findById(id);
    if (!contact) throw new HTTP404Error();
    return { status: OK, payload: { contact } };
  }

  @Catch
  async retrieveContacts(): Promise<ResponseType<MultipleContacts>> {
    const contacts = await ContactModel.find({});
    return { status: OK, payload: { contacts } };
  }

  @Catch
  async updateContact(
    id: number,
    body: Partial<ContactType>,
  ): Promise<ResponseType<SingleContact>> {
    const contact = await ContactModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!contact) throw new HTTP404Error();

    return { status: OK, payload: { contact } };
  }

  @Catch
  async deleteContact(id: number): Promise<ResponseType<SingleContact>> {
    const contact = await ContactModel.findByIdAndRemove(id);
    if (!contact) throw new HTTP404Error();
    return { status: OK, payload: { contact } };
  }
}

const instance = new ContactService();
export default instance;
