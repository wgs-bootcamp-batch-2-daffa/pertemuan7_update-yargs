const fs = require('fs')
const validator = require('validator')
// 
// DATA CONTACT VALIDATOR FUNCTION
// 
const folderValidator = () => {
    // VALIDATION FOLDER
    const dirPath = './data'
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
    }

    // VALIDATION FILE
    const dataPath = './data/contacts.json'
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]')
    }
}
// 
// VALIDATOR INPUT
// 
const validation = (email, phone) => {
    if (!validator.isEmail(email)) {
        process.stdout.write('\033c');
        console.log(`<=== Email isn't valid ===>`);
        return false
    }
    if (!validator.isMobilePhone(phone, 'id-ID')) {
        process.stdout.write('\033c');
        console.log(`<=== Mobile phone isn't valid ===>`);
        return false
    }
    return true
}
const duplicateName = (input) => {
    return loadContact().find((e) => e.Name == input)
}
// 
// LOAD CONTACT
// 
const loadContact = () => {
    const file = fs.readFileSync('./data/contacts.json', 'utf8')
    const contacts = JSON.parse(file)

    return contacts
}
// 
// INSERT DATA CONTACTS
// 
const insertDataContacts = (Name, Email, Phone) => {
    // VALIDATOR FOLDER JSON
    folderValidator()

    // INITIAL DATA
    const dataContacts = loadContact()
    const contact = { Name, Email, Phone }

    if (duplicateName(Name)) {
        process.stdout.write('\033c');
        console.log('<=== Name already exists ===>');
        return
    }

    // VALIDATOR EMAIL & PHONE
    if (!validation(Email, Phone)) {
        return
    }

    // INSERT DATA
    dataContacts.push(contact)

    fs.writeFileSync('./data/contacts.json', JSON.stringify(dataContacts))

    // SUCCESS OUTPUT
    process.stdout.write('\033c');
    detailContact(Name)
    console.log('<=== Input success ===>');
}
// 
// VIEW ALL CONTACT
// 
const viewAllContact = () => {
    process.stdout.write('\033c');
    console.log('<=== All contacts ===>');
    loadContact().forEach((e, i) => {
        console.log(`${i + 1}. ${e.Name}\n==> ${e.Phone}`);
    });
}
// 
// DETAIL CONTACT
// 
const detailContact = (input) => {
    process.stdout.write('\033c');
    if (!duplicateName(input)) {
        console.log('<=== Name no exists ===>');
        return
    }
    console.log('<=== Detail contact ===>');
    console.log(
        loadContact().find(e => e.Name == input)
    );
}
// 
// DELETE CONTACT
// 
const deleteContact = (input) => {
    process.stdout.write('\033c');
    if (!duplicateName(input)) {
        console.log('<=== Name no exists ===>');
        return
    }
    detailContact(input)
    console.log('<=== Delete success ===>');
    const newContact = loadContact().filter(e => e.Name !== input)
    fs.writeFileSync('./data/contacts.json', JSON.stringify(newContact))
}
// 
// DELETE CONTACT
// 
const deleteAllContact = () => {
    process.stdout.write('\033c');
    console.log('<=== Delete success ===>');

    fs.writeFileSync('./data/contacts.json', '[]')
}

module.exports = {
    insertDataContacts,
    viewAllContact,
    detailContact,
    deleteContact,
    deleteAllContact
}

