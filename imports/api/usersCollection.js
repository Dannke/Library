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

// UsersSchema.extend({
//   username: {
//     type: String,
//     optional: true,
//     custom: function () {
//       const existingUser = UsersCollection.findOne({ username: this.value });
//       if (existingUser) {
//         return "notUnique";
//       }
//     },
//   },
// });

UsersCollection.attachSchema(UsersSchema);
