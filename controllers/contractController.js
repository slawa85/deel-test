const { Op } = require("sequelize");

module.exports.showContract = async (req, res) => {
    if(req.isContractor) {
        const contracts = await req.profile.getContractor({
            where: {
                id: req.params.id
            }
        });

        return res.json(contracts);
    }

    return res.status(201).end();
}

module.exports.getContracts = async (req, res) => {
    const { Contract } = req.app.get('models');
    let contracts = {};
    try {
        contracts = await Contract.findAll({
            where: {
                [Op.or]:
                    [
                        {
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
            }
        })
    }catch(e) {
        console.log(e);
    }

    res.json(contracts);
}
