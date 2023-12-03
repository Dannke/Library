import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ReadersCollection = new Mongo.Collection('readers');

const ReadersSchema = new SimpleSchema({
  name: { type: String },
  surname: { type: String },
  patronymic: { type: String },
  telephone: { type: String },
  adress: { type: String },
  dateRegestration: { type: Date },
});

ReadersCollection.attachSchema(ReadersSchema);
