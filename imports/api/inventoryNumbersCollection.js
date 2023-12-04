// api/inventoryNumbersCollection.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { BooksCollection } from './booksCollection';

export const inventoryNumbersCollection = new Mongo.Collection('inventory_numbers');

const validateBooks = value => {
    const booksIds = BooksCollection.find().fetch().map(c => c._id); 
    return booksIds.includes(value);
  }

const InvNumbersSchema = new SimpleSchema({
    book: {
        type: String
    },
    number: {type: Number}
});

inventoryNumbersCollection.attachSchema(InvNumbersSchema);