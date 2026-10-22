import mongoose from 'mongoose';
const communityPostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  topic: { type: String, enum: ['crop_care', 'soil_health', 'water_management', 'market_updates', 'general'], default: 'general', index: true },
  title: { type: String, required: true, trim: true, maxlength: 180 },
  body: { type: String, required: true, trim: true, maxlength: 5000 },
  status: { type: String, enum: ['published', 'hidden', 'removed'], default: 'published', index: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replyCount: { type: Number, default: 0, min: 0 }
}, { timestamps: true, versionKey: false });
communityPostSchema.index({ status: 1, createdAt: -1 });
export default mongoose.model('CommunityPost', communityPostSchema);
