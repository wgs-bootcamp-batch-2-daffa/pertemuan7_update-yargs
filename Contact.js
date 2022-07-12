// 
// All require module
// 
const fs = require('fs')
const validator = require('validator')
// 
// DATA CONTACT VALIDATOR FUNCTION
// 
const folderValidator = () => {
    // Validation folder
    const dirPath = './data'
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
    }

    // Validation file
    const dataPath = './data/contacts.json'
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]')
    }
}
// 
// VALIDATOR INPUT
// 
const validation = (email, phone) => {
    // Check undefined email & null email
    if (email !== undefined && email !== '') {
        // Validator email
        if (!validator.isEmail(email)) {
            // Output
            process.stdout.write('\033c');
            console.log(`<=== Email isn't valid ===>`);

            // Return output
            return false
        }
    }

    // Validator phone
    if (!validator.isMobilePhone(phone, 'id-ID')) {
        // Output
        process.stdout.write('\033c');
        console.log(`<=== Mobile phone isn't valid ===>`);

        // Return output
        return false
    }

    // Return output
    return true
}
const duplicateName = (input) => {
    // Return output
    return loadContact().find((e) => e.Name.toLowerCase() === input.toLowerCase())
}
// 
// LOAD CONTACT
// 
const loadContact = () => {
    // Load data
    const file = fs.readFileSync('./data/contacts.json', 'utf8')
    const contacts = JSON.parse(file)

    // Return output
    return contacts
}
// 
// INSERT DATA CONTACTS
// 
const insertDataContacts = (Name, Email, Phone) => {
    // Validator folder json
    folderValidator()

    // Initial data
    const dataContacts = loadContact()

    // Check email input
    let contact = { Name, Email, Phone }
    if (Email === undefined) {
        contact = { Name, Email: '', Phone }
    }

    // Check duplicate name
    if (duplicateName(Name)) {
        process.stdout.write('\033c');
        console.log('<=== Name already exists ===>');
        return
    }

    // Validator email & phone
    if (!validation(Email, Phone)) {
        return
    }

    // Insert data
    dataContacts.push(contact)
    fs.writeFileSync('./data/contacts.json', JSON.stringify(dataContacts))

    // Success output
    process.stdout.write('\033c');
    detailContact(Name)
    console.log('<=== Input success ===>');
}
// 
// VIEW ALL CONTACT
// 
const viewAllContact = () => {
    // Output
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
    // Check name
    if (!duplicateName(input)) {
        console.log('<=== Name no exists ===>');
        return
    }

    // Output
    process.stdout.write('\033c');
    console.log('<=== Detail contact ===>');
    console.log(
        loadContact().find(e => e.Name == input)
    );

    // Return data
    return loadContact().find(e => e.Name == input)
}
// 
// DELETE CONTACT
// 
const deleteContact = (input) => {
    // Check name
    if (!duplicateName(input)) {
        console.log('<=== Name no exists ===>');
        return
    }

    // Success output
    detailContact(input)
    console.log('<=== Delete success ===>');

    // Delete data
    const newContact = loadContact().filter(e => e.Name !== input)
    fs.writeFileSync('./data/contacts.json', JSON.stringify(newContact))
}
// 
// DELETE ALL CONTACT
// 
const deleteAllContact = () => {
    // Delete all data
    fs.writeFileSync('./data/contacts.json', '[]')

    // Success output
    process.stdout.write('\033c');
    console.log('<=== All data are deleted ===>');
}
// 
// UPDATE CONTACT
// 
const updateContact = (key, Name, Email, Phone) => {
    // Check key
    if (!duplicateName(key)) {
        process.stdout.write('\033c');
        console.log('<=== Key no exists ===>');
        return
    }

    // Initial old data
    const old = detailContact(key)

    // Initial new data
    let name
    let email
    let phone
    (Name === undefined) ? name = old.Name : name = Name;
    (Email === undefined) ? email = old.Email : email = Email;
    (Phone === undefined) ? phone = old.Phone : phone = Phone;

    // Check duplicate name
    if (duplicateName(name)) {
        process.stdout.write('\033c');
        console.log('<=== Name already exists ===>');
        return
    }

    // Delete old data
    deleteContact(key)

    // Insert new data
    insertDataContacts(name, email, phone)

    // Success output
    detailContact(name)
    console.log('\n<=== Before update ===>');
    console.log(old);
}
// 
// Export modules
// 
module.exports = {
    insertDataContacts,
    viewAllContact,
    detailContact,
    deleteContact,
    deleteAllContact,
    updateContact
}

