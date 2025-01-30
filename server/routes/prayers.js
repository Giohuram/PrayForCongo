import express from 'express';
import { Prayer } from '../models/prayer.js';

const router = express.Router();

// Get paginated prayers with filters
router.get('/', async (req, res) => {
  try {
    const { category, language, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (language) query.language = language;
    
    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute queries in parallel
    const [prayers, totalCount] = await Promise.all([
      Prayer.find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Prayer.countDocuments(query)
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
      
    res.json({
      prayers,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalPrayers: totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new prayer
router.post('/', async (req, res) => {
  try {
    const prayer = new Prayer(req.body);
    const newPrayer = await prayer.save();
    res.status(201).json(newPrayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add an amen to a prayer
router.post('/:id/amen', async (req, res) => {
  try {
    const prayer = await Prayer.findByIdAndUpdate(
      req.params.id,
      { $inc: { amens: 1 } },
      { new: true }
    );
    
    if (!prayer) {
      return res.status(404).json({ message: 'Prayer not found' });
    }
    
    res.json(prayer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get prayer statistics
router.get('/stats', async (req, res) => {
  try {
    const [totalPrayers, categoryStats, languageStats] = await Promise.all([
      Prayer.countDocuments(),
      Prayer.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Prayer.aggregate([
        { $group: { _id: '$language', count: { $sum: 1 } } }
      ])
    ]);

    const totalAmens = await Prayer.aggregate([
      { $group: { _id: null, total: { $sum: '$amens' } } }
    ]);

    res.json({
      totalPrayers,
      totalAmens: totalAmens[0]?.total || 0,
      prayersByCategory: Object.fromEntries(
        categoryStats.map(({ _id, count }) => [_id, count])
      ),
      prayersByLanguage: Object.fromEntries(
        languageStats.map(({ _id, count }) => [_id, count])
      )
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const prayerRoutes = router;