// 
// All require modules
// 
const Contact = require('./Contact.js')
const yargs = require('yargs')

// INSERT NEW CONTACT
yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder: {
        name: {
            describe: 'contact name',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'contact email',
            demandOption: false,
            type: 'string'
        },
        mobile: {
            describe: 'contact mobile',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        Contact.insertDataContacts(argv.name, argv.email, argv.mobile)
    }
})

// VIEW ALL CONTACT
yargs.command({
    command: 'list',
    describe: 'view all contact',
    handler() {
        Contact.viewAllContact()
    }
})

// DETAIL CONTACT
yargs.command({
    command: 'detail',
    describe: 'detail contact',
    builder: {
        name: {
            describe: 'contact name',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        Contact.detailContact(argv.name)
    }
})

// DELETE CONTACT
yargs.command({
    command: 'delete',
    describe: 'delete contact',
    builder: {
        name: {
            describe: 'contact name',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        Contact.deleteContact(argv.name)
    }
})

// DELETE ALL CONTACT
yargs.command({
    command: 'delete_all',
    describe: 'delete all contact',
    handler() {
        Contact.deleteAllContact()
    }
})

// UPDATE CONTACT
yargs.command({
    command: 'update',
    describe: 'delete all contact',
    builder: {
        key: {
            describe: 'key',
            demandOption: false,
            type: 'string'
        },
        name: {
            describe: 'contact name',
            demandOption: false,
            type: 'string'
        },
        email: {
            describe: 'contact email',
            demandOption: false,
            type: 'string'
        },
        mobile: {
            describe: 'contact mobile',
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv) {
        Contact.updateContact(
            argv.key,
            argv.name,
            argv.email,
            argv.mobile
        )
    }
})

// PARSE YARGS
yargs.parse()

