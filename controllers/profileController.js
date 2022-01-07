const { Op, col, fn } = require("sequelize");

module.exports.deposit = async (req, res) => {
    const { Profile, Job } = req.app.get('models');
    const client = await Profile.findOne({where: {id: req.params.userId}});
    if (!client || client.type !== 'client') {
        return res.status(404).send({
            message: 'There is no such client found'
        }).end()
    }

    let totalAmountToBePaid = await getAmountToBePaid(client, Job);

    if(totalAmountToBePaid) {
        const amountToDeposit = totalAmountToBePaid * 0.25;
        await client.update({balance: amountToDeposit})
    }else {
        return res.status(404).send({
            message: 'There are no jobs to be paid'
        }).end()
    }


    return res.status(200).end()
}

async function getAmountToBePaid(client, Job) {
    let totalAmountToBePaid;
    try {
        const contracts = await client.getClient({
            attributes: ['id']
        });
        totalAmountToBePaid = await Job.findOne({
            where: {
                ContractId: {
                    [Op.in]: contracts.map(c => c.id)
                },
                paid: null
            },
            attributes: [
                [fn('SUM', col('price')), 'total_amount']
            ],
            raw: true,
        });
    } catch (error) {
        console.log(error)
    }

    return totalAmountToBePaid.total_amount;
}
