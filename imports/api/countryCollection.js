// api/countryCollection.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const CountryCollection = new Mongo.Collection('countries');

const CountrySchema = new SimpleSchema({
  country: { type: String },
});

CountryCollection.attachSchema(CountrySchema);