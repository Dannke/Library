// api/udcCollection.js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const UdcCollection = new Mongo.Collection('udc');

const UdcSchema = new SimpleSchema({
  
});

UdcCollection.attachSchema(UdcSchema);