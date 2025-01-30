import mongoose from 'mongoose';

const prayerSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['peace', 'victims', 'leaders', 'children', 'church', 'education', 'humanitarian']
  },
  language: {
    type: String,
    required: true,
    enum: ['fr', 'ln', 'sw', 'kg', 'lu', 'en']
  },
  amens: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  translations: {
    fr: String,
    ln: String,
    sw: String,
    kg: String,
    lu: String,
    en: String
  },
  location: {
    lat: Number,
    lng: Number,
    region: String
  }
});

// Indexes for better query performance
prayerSchema.index({ category: 1 });
prayerSchema.index({ language: 1 });
prayerSchema.index({ timestamp: -1 });
prayerSchema.index({ featured: 1 });

export const Prayer = mongoose.model('Prayer', prayerSchema);