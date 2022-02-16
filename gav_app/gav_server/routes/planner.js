const express = require('express');
const {
  getPlannerEntries,
  getPlannerEntry,
  addPlannerEntry,
  delPlannerEntry,
} = require('../controllers/planner');

const router = express.Router();

router.get('/', getPlannerEntries);
router.get('/:id', getPlannerEntry);
router.delete('/:id', delPlannerEntry);
router.post('/', addPlannerEntry);

module.exports = router;
