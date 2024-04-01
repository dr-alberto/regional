const { Customer } = require('../models/customer');
const { Portal } = require('../models/portal')
const csv = require('fast-csv');



module.exports.addCustomer = async (req, res, next) => {
    const portalId = req.params.portalId;

    const client = await new Customer({
        portalId: portalId,
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        address: req.body.address,
    }).save()

    const portal = await Portal.findOneAndUpdate(
        { _id: portalId },
        { $inc: { customers: 1 } },
        { new: true } // To return the modified document
    );

    res.json({message: "OK"})
}


module.exports.fetchCustomers = async (req, res, next) => {
    const portalId = req.params.portalId;
    const PAGE_SIZE = 25
    const page = parseInt(req.query.page || "0")

    const total = await Customer.countDocuments({ portalId: portalId })
    const customers = await Customer.find({ portalId: portalId })
        .sort({ createdAt: -1})
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page)
    
    res.json({
        total,
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil(total / PAGE_SIZE),
        customers
    })
}


module.exports.downloadCustomers = async (req, res, next) => {
    try {
        const portalId = req.params.portalId
        const customers = await Customer.find({portalId: portalId}, { _id: 0, __v: 0 , address: 0, portalId: 0, updatedAt: 0}); // Exclude _id and __v fields

        const headers = Object.keys(customers[0].toObject());

        const csvData = [
            headers, // Headers based on the first document
            ...customers.map(customer => Object.values(customer.toObject())),
        ];

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=customers.csv');

        csv.write(csvData, { headers: true })
        .pipe(res);

    } catch (error) {
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
}