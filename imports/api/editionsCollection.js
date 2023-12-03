// api/editionsCollection.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const EditionsCollection = new Mongo.Collection('editions');

const EditionSchema = new SimpleSchema({

});

EditionsCollection.attachSchema(EditionSchema);