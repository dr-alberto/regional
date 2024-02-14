const { Portal } = require("../models/portal");
const { Site } = require("../models/site");
const { User } = require("../models/user");
const { Prompt } = require("../models/prompt");
const {validationResult}  = require('express-validator');
const getPriceIdFromSubscription = require('../routes/utils')



function checkIsUserSite(siteId, userId) {
    const site = Site.find({ _id: siteId, users: userId })
    
    if (site) {
        return true
    } else {
        return false
    }
} 

module.exports.createPrompt = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err)
        return
    }

    const name = req.body.name;
    const portalId = req.body.portalId;
    const userId = req.user.id;

    const portal = await Portal.findById(portalId)
    
    if (!portal) {
        return res.status(404).json({message: "Portal doesn't exist"});
    }

    const isUserSite = checkIsUserSite(portal.siteId, userId)
    if (!isUserSite) {
        return res.status(404).json({message: "Portal doesn't exist"});
    }
    
    const prompt = await new Prompt({
        siteId: portal.siteId,
        portalId: portalId,
        name: name,
        lastUpdated: new Date()
    }).save()

    res.json(prompt)
}

module.exports.updatePrompt = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err)
        return
    }

    const promptId = req.params.id;
    let payload = req.body;
    
    const prompt = await Prompt.findById(promptId);

    if (!prompt) {
        res.status(404).json({message: 'Prompt not found'})
        return
    }

    const isUserSite = checkIsUserSite(prompt.siteId, req.user.id)
    if (!isUserSite) {
        res.status(404).json({message: 'Prompt not found'})
        return
    }
    
    prompt.set(payload)

    try {
        await prompt.save()
        res.json({message: 'OK'})
    } catch (error) {
        // Return error message and initial form to repopulate fields in client
        const prompt = await Prompt.findById(promptId);
        res.status(500).json({message: 'Server Error', prompt})
    }
}


module.exports.fetchPrompt = async (req, res, next) => {
    const mode = req.query.mode; // 'live' if portal is fetched from live user portal page
    const promptId = req.params.id;
    
    const prompt = await Prompt.findById(promptId)

    if (!prompt) {
        res.status(400).json("Prompt not found")
        return
    }
    
    const site = await Site.findById(prompt.siteId)
    const portal = await Portal.findById(prompt.portalId)

    const user = await User.findById(site.users[0])
    const planId = user.subscriptionId ? await getPriceIdFromSubscription(user.subscriptionId) : null;

    // Disable watermark only for users with growth plan
    const useWatermark = !(planId === process.env.STRIPE_PRICE_GROWTH)
    
    let response = {
        prompt: prompt,
        portal: {
            id: portal._id,
            productName: portal.productName,
            brandName: portal.brandName,
            name: portal.name,
            availableRegions: portal.availableRegions,
            published: portal.published
        },
        site: site,
        useWatermark
    }
    
    if (mode === 'live') {
        prompt.views ++
        prompt.save()
    }


    res.json(response)
}


module.exports.fetchAllPrompts = async (req, res, next) => {
    const siteId = req.query.siteId;

    const site = await Site.findById(siteId)

    if (!site) {
        res.status(400).json("Not found")
        return
    }

    const isUserSite = checkIsUserSite(siteId, req.user.id)

    if (!isUserSite) {
        res.status(400).json("Not found")
        return
    }

    try {
        const prompts = await Prompt.find({ siteId: siteId })
        res.json(prompts)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}


module.exports.deletePrompt = async (req, res, next) => {
    const promptId = req.params.id;
    const portalId = req.body.portalId;
    
    const portal = await Portal.findById(portalId) 

    if (!portal) {
        res.status(400).json("Prompt not found")
        return
    }
    
    const isUserSite = checkIsUserSite(portal.siteId, req.user.id)

    if (!isUserSite) {
        res.status(400).json("Prompt not found")
        return
    }

    await Prompt.findByIdAndDelete(promptId)

    res.json({ message: "OK" })
}