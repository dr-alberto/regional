const { Site } = require('../models/site');
const { Prompt } = require('../models/prompt');



module.exports.verifyWPIntegration = async (req, res, next) => {
    try {
        const { code, site } = req.body;

        if (code && site) {
            try {
                const prompt = await Prompt.findById(code)
                
                if (!prompt) {
                    res.status(404).send({ message: "Not found" });
                    return;
                }

                const promptSite = await Site.findById(prompt.siteId);
                console.log(promptSite, prompt)
                if (`http://${promptSite.domain}` === site) { // https://${promptSite.domain}
                    console.log({ code: code })
                    res.json({ code: code })
                    return;
                }

            } catch (error) {
                res.status(404).send({ message: "Not found" });
                return;
            }
        }

        console.log(code, site)
        res.status(404).send({ message: "Not found" })

      } catch (error) {
        res.status(500).json({message: "Server Error"});
      }
}