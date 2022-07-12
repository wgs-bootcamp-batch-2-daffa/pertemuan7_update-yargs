const Contact = require('./Contact.js')
const yargs = require('yargs')
const { argv } = require('yargs')

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
    describe: 'detail contact',
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

yargs.parse()

