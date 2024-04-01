const { Portal } = require("../models/portal");
const { Prompt } = require("../models/prompt");
const { Site } = require("../models/site");
const { Customer } = require("../models/customer");
const { validationResult } = require("express-validator");

function checkIsUserSite(siteId, userId) {
  const site = Site.find({ _id: siteId, users: userId });

  if (site) {
    return true;
  } else {
    return false;
  }
}

module.exports.createPortal = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400).json(err);
    return;
  }

  const name = req.body.name;
  const siteId = req.body.siteId;
  const userId = req.user.id;

  const isUserSite = checkIsUserSite(siteId, userId);

  if (!isUserSite) {
    return res.status(404).json({ message: "Site doesn't exist" });
  }

  const portal = await new Portal({
    siteId: siteId,
    name: name,
    lastUpdated: new Date(),
  }).save();

  res.json(portal);
};

module.exports.updatePortal = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400).json(err);
    return;
  }

  const portalId = req.params.id;
  let payload = req.body;

  const portal = await Portal.findOne({ _id: portalId });

  if (!portal) {
    res.status(404).json({ message: "Portal not found" });
    return;
  }

  const isUserSite = checkIsUserSite(portal.siteId, req.user.id);
  if (!isUserSite) {
    res.status(404).json({ message: "Portal not found" });
    return;
  }

  // Add product image to payload
  if (Object.keys(req.files).length !== 0) {
    if (req.files.brandImg) {
      payload = { ...payload, brandImg: req.files.brandImg[0].filename };
    }

    if (req.files.productImg) {
      payload = { ...payload, productImg: req.files.productImg[0].filename };
    }
  }

  // Handle comma separated string for the availableRegions field
  if (payload.availableRegions === "") {
    payload = { ...payload, availableRegions: [] };
  } else {
    const availableRegions = payload.availableRegions.split(",");
    payload = { ...payload, availableRegions: availableRegions };
  }

  portal.set(payload);

  try {
    await portal.save();
    res.json({ message: "OK" });
  } catch (error) {
    // Return error message and initial form to repopulate fields in client
    const initialPortal = await Portal.findOne({ _id: portalId });
    res.status(500).json({ message: "Server Error", portal: initialPortal });
  }
};

module.exports.updatePortalStatus = async (req, res) => {
  const portalId = req.params.id;
  let { status } = req.body;

  const portal = await Portal.findOne({ _id: portalId });

  if (!portal) {
    res.status(404).json({ message: "Portal not found" });
    return;
  }

  const isUserSite = checkIsUserSite(portal.siteId, req.user.id);
  if (!isUserSite) {
    res.status(404).json({ message: "Portal not found" });
    return;
  }

  portal.published = status;

  await portal.save();

  res.json({ message: "OK" });
};

const countCustomersPerCountry = async (portal, countryCount) => {
  try {
    const portalCustomers = await Customer.find({ portalId: portal._id });

    portalCustomers.forEach((customer) => {
      if (countryCount.hasOwnProperty(customer.country)) {
        countryCount[customer.country]++;
      } else {
        countryCount[customer.country] = 1;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.portalOverview = async (req, res, next) => {
  const portalId = req.params.id;

  const portal = await Portal.findById(portalId);
  const site = await Site.findById(portal.siteId);

  var countryCount = {};
  try {
    await countCustomersPerCountry(portal, countryCount);
  } catch (error) {}

  const countriesCount = Object.entries(countryCount).map(([key, value]) => {
    return { id: key, value: value };
  });

  res.json({
    countriesCount,
    site,
    portal,
  });
};

module.exports.portalsOverview = async (req, res, next) => {
  const siteId = req.query.siteId;
  const sitePortals = await Portal.find({ siteId: siteId });
  const site = await Site.findById(siteId);

  const views = sitePortals.reduce((sum, portal) => sum + portal.views, 0);
  const submits = sitePortals.reduce(
    (sum, portal) => sum + portal.customers,
    0
  );

  var countryCount = {};
  const promises = sitePortals.map((portal) =>
    countCustomersPerCountry(portal, countryCount)
  );

  try {
    await Promise.all(promises);
  } catch (error) {}

  const countriesCount = Object.entries(countryCount).map(([key, value]) => {
    return { id: key, value: value };
  });

  let conversionRate = 0;
  if (views > 0) {
    conversionRate = (submits / views) * 100;
  } else {
    conversionRate = 0;
  }

  conversionRate = conversionRate.toFixed(2);

  res.json({
    views,
    submits,
    conversionRate,
    countriesCount,
    site,
  });
};

module.exports.fetchPortal = async (req, res, next) => {
  const mode = req.query.mode; // 'live' if portal is fetched from live user portal page
  const portalId = req.params.id;

  const portal = await Portal.findOne({ _id: portalId });

  if (req.user) {
    const isUserSite = checkIsUserSite(portal.siteId, req.user.id);

    if (!isUserSite) {
      res.status(400).json("Portal not found");
    }
  }

  if (!portal) {
    res.status(400).json("Portal not found");
  }

  if (mode === "live") {
    portal.views++;
    portal.save();
  }

  const site = await Site.findById(portal.siteId);

  const response = {
    portal: portal,
    site: site,
  };

  res.json(response);
};

module.exports.fetchAllPortals = async (req, res, next) => {
  const siteId = req.query.siteId;

  const isUserSite = checkIsUserSite(siteId, req.user.id);

  if (!isUserSite) {
    res.status(400).json("Site not found");
    return;
  }

  try {
    const portals = await Portal.find({ siteId: siteId });
    res.json(portals);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

module.exports.deletePortal = async (req, res, next) => {
  const portalId = req.params.id;
  const siteId = req.body.siteId;

  const isUserSite = checkIsUserSite(siteId, req.user.id);
  if (!isUserSite) {
    res.status(400).json("Portal not found");
    return;
  }

  await Portal.findByIdAndDelete(portalId);

  await Prompt.updateMany(
    { portalId: portalId },
    { $unset: { portalId: 1, siteId: 1 } }
  );

  res.json({ message: "OK" });
};
