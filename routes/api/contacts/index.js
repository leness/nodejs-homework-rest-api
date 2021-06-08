const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')


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
  .get('/', guard, ctrl.listContacts)
  .post('/', guard, validationCreateContact, ctrl.addContact)

router
  .get('/:id', guard, validateMongoId, ctrl.getContactById)
  .delete('/:id', guard, validateMongoId, ctrl.removeContact)
  .put('/:id', guard, validateMongoId, validationUpdateContact, ctrl.updateContact)

router.patch(
  '/:id/favorite', guard, validationUpdateStatusContact, ctrl.updateContact)

module.exports = router
