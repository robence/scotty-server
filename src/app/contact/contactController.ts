import Contact from './contactModel';

class ContactController {

  get(req, res) {
    Contact.get((err, contacts) => {
      if (err) {
        res.json({
          status: 'error',
          message: 'err'
        });
      }
      res.json({
        status: 'success',
        message: 'Contacts retrieved successfully',
        data: contacts
      });
    });
  }

  create(req, res) {
    let contact = new Contact();
    // console.log(req);
    // contact.name = req.body.name ? req.body.name : contact.name;
    // contact.gender = req.body.gender;
    // contact.email = req.body.email;
    // contact.phone = req.body.phone;

    contact.name = 'Ben';
    contact.email = 'email';

    contact.save(function (err) {
      if (err) {
        res.json(err);
      }
      res.json({
        message: 'New contact created!',
        data: contact
      });
    });
  }

  view(req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Contact details loading..',
        data: contact
      });
    });
  }

  update(req, res) {
    Contact.findById(req.params.contact_id, (err, contact) => {
      if(err) {
        res.send(err);
      }
      contact.name = req.body.name ? req.body.name : contact.name;
      contact.gender = req.body.gender;
      contact.email = req.body.email;
      contact.phone = req.body.phone;

      contact.save(function (err) {
        if (err) {
          res.json(err);
        }
        res.json({
          message: 'Contact Info updated!',
          data: contact
        });
      });
    })
  }

  delete(req, res) {
    Contact.remove({ _id: req.params.contact_id },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json({
        status: 'success',
        message: 'Contact deleted'
      });
    });
  }
}

const instance = new ContactController();
export default instance;
