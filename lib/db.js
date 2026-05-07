import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
}



// const MONGODB_URI =
//   process.env.MONGO_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "MongoDB URI missing"
//   );
// }

// let cached =
//   global.mongoose || {
//     conn: null,
//     promise: null,
//   };

// export async function connectDB() {

//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {

//     cached.promise =
//       mongoose.connect(
//         MONGODB_URI
//       );
//   }

//   cached.conn =
//     await cached.promise;

//   return cached.conn;
// }