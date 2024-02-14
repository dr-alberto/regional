const { Site } = require('../models/site');
const {validationResult}  = require('express-validator');
const dns = require('dns');
const { Portal } = require('../models/portal');
const { Prompt } = require('../models/prompt');


// function getDomainIcon(domain) {
//     // TODO https://stackoverflow.com/questions/10282939/how-to-get-favicons-url-from-a-generic-webpage-in-javascript
//     return undefined
// }

module.exports.createSite = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err)
        return
    }    

    try {
        // const icon = getDomainIcon(req.body.domain)

        const payload = {
            domain: req.body.domain,
            // icon: icon,
            users: req.user.id
        }
        
        const site = await new Site(payload).save()

        res.json(site)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

module.exports.editSite = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err)
        return
    }

    const siteId = req.params.id
    const userId = req.user.id

    try {
        // const icon = getDomainIcon(req.body.domain)

        const filter = {
            _id: siteId, 
            users: userId
        }

        const payload = {
            domain: req.body.domain,
        }

        const site = await Site.findOneAndUpdate(
            filter, 
            payload,
            { new: true }
        )


        res.json(site)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}


module.exports.getUserSites = async (req, res, next) => {
    try {
        // const icon = getDomainIcon(req.body.domain)
        const sites = await Site.find({users: req.user.id})
        
        const annotatedSites = await Promise.all(sites.map(async (site) => {
            const portals = await Portal.countDocuments({ siteId: site._id })
            const prompts = await Prompt.countDocuments({ siteId: site._id })

            return {...site.toObject(), portals, prompts} 
        }))

        res.json(annotatedSites)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}



module.exports.deleteSite = async (req, res, next) => {
    const siteId = req.params.id
    const userId = req.user.id

    try {
        // const icon = getDomainIcon(req.body.domain)

        const filter = {
            _id: siteId, 
            users: userId
        }

        await Site.findOneAndDelete(
            filter
        )

        res.json({message: "OK"})
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}


module.exports.updateSiteCustomDomain = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err)
        return
    }    
    
    const siteId = req.params.id;
    const subdomain = req.body.subdomain;

    Site.findById(siteId)
    .then((result) => {
        if (result) {
            result.subdomain = subdomain
            result.validSubdomain = false // Reset the verification state of the domain
            result.save()
            
            res.json(result)
        } else {
            res.json({})
        }
    })
    .catch((error) => {
        res.status(500).json("Server Error")
    })
}


async function hasSubdomainWithCNAME(domain, subdomain, cname) {
    try {
        const cnameRecords = await dns.promises.resolveCname(`${subdomain}.${domain}`);

        // Check if the resolved CNAME records include the expected CNAME
        return cnameRecords.includes(cname);
    } catch (error) {
        // Handle errors (e.g., no such domain, no CNAME record, etc.)
        return false;
    }
}

function splitDomainString(fullDomain) {
    // Define a regex pattern to capture subdomain and domain
    const regex = /^(.+?)\.(?:([a-zA-Z0-9-]+)\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/;
  
    // Use the regex to match against the full domain string
    const match = fullDomain.match(regex);
  
    if (match) {
      const subdomain = match[1] || null;
      const domain = `${match[2] || ''}${match[2] ? '.' : ''}${match[3]}`;
      return { subdomain, domain };
    } else {
      // Return null or throw an error, depending on your use case
      return null;
    }
}

module.exports.verifySiteCustomDomain = async (req, res, next) => {
    const siteId = req.params.id;
    const site = await Site.findById(siteId)

    const fullDomain = site.subdomain
    const { subdomain, domain } = splitDomainString(fullDomain);

    hasSubdomainWithCNAME(domain, subdomain, "regionalhq.com")
    .then(result => {
        if (result) {
            console.log(`Subdomain ${subdomain}.${domain} has the expected CNAME record.`);
            site.validSubdomain = true;
        } else {
            console.log(`Subdomain ${subdomain}.${domain} does not have the expected CNAME record.`);
            site.validSubdomain = false;
        }

        site.save()

        res.json(site)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}