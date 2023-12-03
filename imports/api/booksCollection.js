// api/booksCollection.js
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { CountryCollection } from "./countryCollection";
import { EditionsCollection } from "./editionsCollection";
import { UdcCollection } from "./udcCollection";

export const BooksCollection = new Mongo.Collection("books");

const validateCountry = value => {
  const countryIds = CountryCollection.find().fetch().map(c => c._id); 
  return countryIds.includes(value);
}

const validateEditions = value => {
  const editionIds = EditionsCollection.find().fetch().map(c => c._id); 
  return editionIds.includes(value);
}

const validateUdc = value => {
  const udcIds = UdcCollection.find().fetch().map(c => c._id); 
  return udcIds.includes(value);
}

const BooksSchema = new SimpleSchema({
  title: { type: String },
  author: { type: String },
  year: { type: Number },
  country: {
    type: String,
    custom: validateCountry
  },
  edition: {
    type: String,
    custom: validateEditions
  },
  udc: {
    type: String,
    custom: validateUdc
  },
});

BooksCollection.attachSchema(BooksSchema);
