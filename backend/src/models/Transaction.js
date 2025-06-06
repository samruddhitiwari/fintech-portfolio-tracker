import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio', required: true },
  assetName: { type: String, required: true },
  transactionType: { type: String, enum: ['Buy', 'Sell'], required: true },
  quantity: { type: Number, required: true },
  priceAtTransaction: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);