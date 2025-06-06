import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assets: [{
    name: { type: String, required: true },
    type: { type: String, enum: ['Stock', 'Crypto', 'Real Estate'], required: true },
    quantity: { type: Number, required: true },
    currentValue: { type: Number, required: true },
  }],
}, { timestamps: true });

export default mongoose.model('Portfolio', PortfolioSchema);