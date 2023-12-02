// api/booksCollection.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const BooksCollection = new Mongo.Collection('books');

const BooksSchema = new SimpleSchema({
  title: { type: String },
  author: { type: String },
  year: { type: Number },
  place: { type: String },
  edition: { type: String },
  udc: { type: String },
});

BooksCollection.attachSchema(BooksSchema);
