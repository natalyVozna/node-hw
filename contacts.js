const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const parsedList = JSON.parse(list);
    return parsedList;
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const parsedList = JSON.parse(list);
    const contact = parsedList.find((el) => el.id === contactId.toString());
    return contact;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const parsedList = await JSON.parse(list);
    const filteredList = await parsedList.filter(
      (contact) => contact.id !== contactId.toString()
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredList), "utf8");
    return filteredList;
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const parsedList = await JSON.parse(list);
    const data = [
      ...parsedList,
      {
        id: uid(),
        name,
        email,
        phone,
      },
    ];
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
