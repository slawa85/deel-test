const { Op } = require("sequelize");
const { dbInstance } = require('../models/index');


module.exports.unpaidJobs = async (req, res) => {
    const { Contract, Job } = req.app.get('models');
    let jobs = {};
    try {
        const contracts = await Contract.findAll({
            attributes: ['id'],
            where: {
                [Op.or]: [{
                        ClientId: {
                            [Op.eq]: req.profile.id
                        }
                    },
                    {
                        ContractorId: {
                            [Op.eq]: req.profile.id
                        }
                    }
                ],
                status: {
                    [Op.or]: ['new', 'in_progress']
                }
            },
        });

        jobs = await Job.findAll({
            where: {
                paid:{
                    [Op.is]: null
                },
                ContractId: {
                    [Op.in]: contracts.map(c => c.id)
                }
            }
        })
    } catch (e) {
        console.log(e);
    }

    res.json(jobs);
}

module.exports.payJob = async (req, res) => {
    const { Job } = req.app.get('models');
    const job = await Job.findOne({where: {id: req.params.job_id}});

    if (job.paid) {
        return res.status(400).send({message: 'The job is paid'}).end()
    }

    if(req.profile.ballance < job.price) {
        return res.status(400).send({ message: 'Insufficient balance' }).end()
    }

    const contract = await job.getContract();
    const contractor = await contract.getContractor();

    try {
        await dbInstance.transaction(async (t) => {
            await req.profile.update({
                balance: req.profile.balance - job.price
            });
            await contractor.update({
                balance: contractor.balance + job.price
            });
            await job.update({
                paid: true
            });
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: 'Payment failed'
        }).end()
    }

    return res.status(200).end()
}
