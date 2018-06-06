import mongoose from 'mongoose';
import FoodTruck from './foodtruck';

const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: String,
  foodtruck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodTruck',
    required: true,
  },
});

export default mongoose.model('Review', ReviewSchema);
