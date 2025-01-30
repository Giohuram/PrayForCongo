import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  daysCompleted: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  lastPrayerDate: {
    type: Date,
    default: Date.now
  },
  totalMinutesPrayed: {
    type: Number,
    default: 0
  },
  timestamps: [{
    type: Date
  }]
});

// Add static method to get global stats
challengeSchema.statics.getGlobalStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalParticipants: { $count: {} },
        totalMinutesPrayed: { $sum: '$totalMinutesPrayed' },
        totalDaysCompleted: { $sum: '$daysCompleted' },
        averageStreak: { $avg: '$currentStreak' }
      }
    }
  ]);
  
  return stats[0] || {
    totalParticipants: 0,
    totalMinutesPrayed: 0,
    totalDaysCompleted: 0,
    averageStreak: 0
  };
};

export const Challenge = mongoose.model('Challenge', challengeSchema);