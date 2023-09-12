const express = require('express')
const { getAllJobs, getSingleJob, deleteJob, updateJob, createJob } = require('../controllers/jobs')
const router = express.Router()

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getSingleJob).delete(deleteJob).patch(updateJob)

module.exports = router