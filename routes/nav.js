const express = require('express');
const router  = express.Router();

//render about page
router.get('/about', (req, res) => {
  try {
    res.render('about');
  } catch (error) {
    console.error('Error rendering about page:', error);
    res.status(500).send('Server Error');
  }
});

//search

module.exports = router;
