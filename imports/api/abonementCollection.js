// api/abonementCollection.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const AbonementCollection = new Mongo.Collection('abonements');

const AbonementsSchema = new SimpleSchema({
    id_reader: {type: String},
    book_number_id: {type: String},
    issue_date: {type: Date},
    delivery_date: {type: Date, optional: true}
});

AbonementCollection.attachSchema(AbonementsSchema);