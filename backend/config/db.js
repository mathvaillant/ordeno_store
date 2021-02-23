import mongoose from 'mongoose'

// When dealing with MongoDB it always returns a Promise
// So we use an async await
const connectDB = async () => {
  try {
    // mongoose.connect(URIs, {arguments}) -> returns a Promise
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB

// Export connectDB to the server
