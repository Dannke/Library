// api/inventoryNumbersCollection.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { BooksCollection } from './booksCollection';

export const inventoryNumbersCollection = new Mongo.Collection('inventory_numbers');

const InvNumbersSchema = new SimpleSchema({
    bookId: { type: String },
    number: {type: Number}
});

inventoryNumbersCollection.attachSchema(InvNumbersSchema);