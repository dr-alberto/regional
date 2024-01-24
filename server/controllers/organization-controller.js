const { Organization } = require('../models/organization');
const {validationResult}  = require('express-validator');
const dns = require('dns');


module.exports.createOrganization = async (req, res, next) => {
    try {

        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Invalid organization logo"
            });
        } else {
            const payload = {
                name: req.body.name,
                logo: req.file.filename,
                users: req.user.id
            }

            const organization = await new Organization(payload).save()

            res.json(organization)
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    
}


module.exports.updateOrganization = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const filter = {_id: organizationId}
        let payload = {
            name: req.body.name,
            users: req.user.id
        }

        if (req.file) {
            payload['logo'] = req.file.filename
        }

        const organization = await Organization.findOneAndUpdate(filter, payload, {new: true})

        res.json(organization)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}


module.exports.fetchUserOrganization = async (req, res, next) => {
    Organization.findOne({ users: req.user.id })
    .then((result) => {
        if (result) {
            res.json(result)
        } else {
            res.json({})
        }
    })
    .catch((error) => {
        res.status(500).json("Server Error")
    })

}


module.exports.updateOrganizationCustomDomain = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err)
        return
    }    
    
    const organizationId = req.params.id;
    const subdomain = req.body.subdomain;

    Organization.findById(organizationId)
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
        console.log(cnameRecords)
        // Check if the resolved CNAME records include the expected CNAME
        return cnameRecords.includes(cname);
    } catch (error) {
        // Handle errors (e.g., no such domain, no CNAME record, etc.)
        console.error(error);
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

  
module.exports.verifyOrganizationCustomDomain = async (req, res, next) => {
    const organizationId = req.params.id;
    const organization = await Organization.findById(organizationId)

    const fullDomain = organization.subdomain
    const { subdomain, domain } = splitDomainString(fullDomain);

    hasSubdomainWithCNAME(domain, subdomain, "hosted-portal.regionalhq.com") // "hosted-portal.regionalhq.com"
    .then(result => {
        if (result) {
            console.log(`Subdomain ${subdomain}.${domain} has the expected CNAME record.`);
            organization.validSubdomain = true;
        } else {
            console.log(`Subdomain ${subdomain}.${domain} does not have the expected CNAME record.`);
            organization.validSubdomain = false;
        }

        organization.save()

        res.json(organization)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}