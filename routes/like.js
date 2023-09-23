const express = require('express');
const router = express.Router();

const { getUsers, userMaps, userLikes } = require('../db/queries/maps');

// POST route for liking a map
router.post('/:mapId', async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user.id;
    const mapId = req.params.mapId;

    // Add the map to the user's liked maps
    await addLikeToUser(userId, mapId);

    // Record the like for the map
    await recordMapLike(mapId);

    // Get the updated map data
    const updatedMap = await getMapById(mapId);

    // Respond with a success message or updated data
    res.json({ message: 'Map liked successfully' });
  } catch (err) {
    console.error('Error liking map:', err);

    // Error Messages
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
});

module.exports = router;
