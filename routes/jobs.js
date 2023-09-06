const express = require('express')
const { getAllJobs, getSingleJob, deleteJob, updateJob } = require('../controllers/jobs')
const router = express.Router()

router.route('/').get(getAllJobs)
router.route('/:id').get(getSingleJob).delete(deleteJob).patch(updateJob)

module.exports = router