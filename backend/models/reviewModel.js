import mongoose from 'mongoose'

// The rating here is gonna be the average of all the reviews of the Product

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  // Mongoose sets a timestamp auto
  { timestamp: true }
)

const Review = mongoose.model('Review', reviewSchema)

export default Review
