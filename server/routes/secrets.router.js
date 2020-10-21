const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  //req.user: { id: 2, username: 'Captain Borodin', clearance_level: 10 }
  //"clearance_level" INTEGER NOT NULL DEFAULT 0
  console.log(req.user.clearance_level)
  let userClearanceLevel = req.user.clearance_level;
  pool
    .query('SELECT * FROM secret WHERE secrecy_level<=$1;', [userClearanceLevel])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
