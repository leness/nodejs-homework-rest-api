const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8')
  return JSON.parse(data)
}

const listContacts = async () => {
  return await readData()
}


const getContactById = async (id) => {
  const data = await readData()
  const result = data.find((contact) => contact.id === id)
  
  return result
}

const removeContact = async (id) => {
  const data = await readData()

  const newData = data.filter((contact) => contact.id !== id)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(newData))
  return newData
}

const addContact = async (body) => {
  const id = uuid()
  const record = {
    id,
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  }
  const data = await readData()
  const newRecord = [...data, record]
  data.push(record)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(data))
  return newRecord
}


const updateContact = async (id, body) => {
  const data = await readData()
  const result = data.find((contact) => contact.id === id)
  if (result) {
    Object.assign(result, body)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(data))
  }
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

