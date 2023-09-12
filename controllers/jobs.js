const {StatusCodes} = require('http-status-codes')
const Job = require('../models/Job')
const { NotFoundError, BadRequestError } = require('../errors')

async function getAllJobs  (req, res)  {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

async function createJob(req, res) {
    req.body.createdBy = req.user.userId
    const newJob = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({newJob})
}

const getSingleJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId}} = req  
    
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })
    if(!job) {
        throw new NotFoundError(`no job under the id - ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const {
        user: {userId}, 
        params: {id: jobId},
    } = req

    const jobToDelete = await Job.findByIdAndDelete({
        _id: jobId,
        createdBy: userId
    })
    if(!jobToDelete) {
        throw new NotFoundError(`no job under the id - ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ jobToDelete })
}
const updateJob = async (req, res) => {
    const {
        user: {userId}, 
        params: {id: jobId},
        body: {company, position}
    } = req
    if(company === '' || position === '') {
        throw new BadRequestError('company or position cannot be empty')
    }
    const updatedJob = await Job.findByIdAndUpdate(
        {
            _id: jobId, createdBy: userId
        }, 
        req.body, 
        {
        new: true,
        runValidators: true
    })
    if(!updatedJob) {
        throw new NotFoundError(`no job under the id - ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ updatedJob })
}

module.exports = {
    getAllJobs,
    getSingleJob,
    deleteJob,
    updateJob,
    createJob
}