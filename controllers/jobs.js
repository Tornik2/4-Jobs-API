

function getAllJobs  (req, res)  {
    res.send('get all jobs')
}

const getSingleJob = (req, res) => {
    res.send('single job')
}

const deleteJob = (req, res) => {
    res.send('delete job')
}
const updateJob = (req, res) => {
    res.send('update job')
}

module.exports = {
    getAllJobs,
    getSingleJob,
    deleteJob,
    updateJob
}