const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
  validateMongoId,
  validationUpdateStatusContact
} = require('./validation')

router.use((req, res, next) => {
  console.log(req.url);
  next()
})

router
  .get('/', ctrl.listContacts)
  .post('/', validationCreateContact, ctrl.addContact)

router
  .get('/:id', validateMongoId, ctrl.getContactById)
  .delete('/:id', validateMongoId, ctrl.removeContact)
  .put('/:id', validateMongoId, validationUpdateContact, ctrl.updateContact)

router.patch(
  '/:id/favorite', validationUpdateStatusContact, ctrl.updateContact)

module.exports = router
