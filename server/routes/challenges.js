import express from 'express';
import { Challenge } from '../models/challenge.js';
import { nanoid } from 'nanoid';

const router = express.Router();

// Get global challenge statistics

router.get('/stats', async (req, res) => {
    try {
      const globalStats = await Challenge.getGlobalStats();
      console.log('Global Stats:', globalStats); // Ajoutez ce log pour vérifier les données
      res.json(globalStats);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


// Complete a prayer session

router.post('/complete', async (req, res) => {
    try {
      const sessionId = req.body.sessionId || nanoid();
      const now = new Date();
      
      let challenge = await Challenge.findOne({ sessionId });
      
      if (!challenge) {
        challenge = new Challenge({ sessionId });
      }
      
      const lastPrayer = challenge.lastPrayerDate;
      const isNewDay = !lastPrayer || 
        (now.getDate() !== lastPrayer.getDate() || 
         now.getMonth() !== lastPrayer.getMonth() || 
         now.getFullYear() !== lastPrayer.getFullYear());
      
      if (isNewDay) {
        challenge.daysCompleted += 1;
        challenge.currentStreak += 1;
      }
      
      challenge.lastPrayerDate = now;
      challenge.totalMinutesPrayed += 10;
      challenge.timestamps.push(now);
      
      await challenge.save();
      
      const globalStats = await Challenge.getGlobalStats();
      
      console.log('Challenge:', challenge); // Ajoutez ce log pour vérifier les données
      console.log('Global Stats:', globalStats); // Ajoutez ce log pour vérifier les données
      
      res.json({
        challenge,
        globalStats
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  export const challengeRoutes = router;