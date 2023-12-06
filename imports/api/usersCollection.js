// api/UsersCollection.js
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const UsersCollection = new Mongo.Collection("users");

const UsersSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    allowedValues: ["admin", "user"],
  },
});

UsersCollection.attachSchema(UsersSchema);
