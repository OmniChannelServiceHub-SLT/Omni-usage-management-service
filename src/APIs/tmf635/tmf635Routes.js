const express = require('express');
const { Usage, UsageSpecification } = require('../../models/TMF635_UsageManagement');
const { authenticate } = require('../../middleware/authMiddleware');

// ---------- helpers ----------

// A MongoDB id is 24 hex characters. The CTK sends UUID-style ids for its "unknown id" test,
// so anything else is treated as "not found" instead of causing a database error.
const isValidId = (id) => /^[a-f\d]{24}$/i.test(String(id));

// TMF representation: no internal Mongo fields and no stored MySLT response
function toTmf(doc) {
  const json = doc.toJSON();
  delete json._id;
  delete json.__v;
  delete json.mysltResponse;
  return json;
}

// Attribute selection: ?fields=id,href returns only those attributes
function applyFields(obj, fieldsParam) {
  if (!fieldsParam) return obj;
  const wanted = String(fieldsParam).split(',').map((s) => s.trim()).filter(Boolean);
  if (wanted.length === 0) return obj;
  const out = {};
  wanted.forEach((field) => {
    if (field in obj) out[field] = obj[field];
  });
  return out;
}

const tmfError = (res, status, reason) => res.status(status).json({ code: String(status), reason });

// ---------- /usage ----------

const usageRouter = express.Router();

usageRouter.post('/', authenticate, async (req, res, next) => {
  const { usageDate, usageType, status, usageSpecification, relatedParty, usageCharacteristic } = req.body || {};

  const errors = [];
  if (!usageDate || Number.isNaN(new Date(usageDate).getTime())) {
    errors.push('usageDate is required and must be a valid date');
  }
  if (!usageType || typeof usageType !== 'string') {
    errors.push('usageType is required and must be a string');
  }
  if (!usageSpecification || !usageSpecification.id) {
    errors.push('usageSpecification.id is required');
  }
  if (errors.length > 0) return tmfError(res, 400, errors.join('; '));

  try {
    const doc = await Usage.create({ usageDate, usageType, status, usageSpecification, relatedParty, usageCharacteristic });
    const body = toTmf(doc);
    res.set('Location', body.href);
    return res.status(201).json(body);
  } catch (err) {
    if (err.name === 'ValidationError') return tmfError(res, 400, err.message);
    return next(err);
  }
});

usageRouter.get('/', authenticate, async (req, res, next) => {
  try {
    const { id, fields } = req.query;
    const filter = {};
    if (id !== undefined) {
      if (!isValidId(id)) return res.status(200).json([]);
      filter._id = id;
    }
    const records = await Usage.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(records.map((doc) => applyFields(toTmf(doc), fields)));
  } catch (err) {
    return next(err);
  }
});

usageRouter.get('/:id', authenticate, async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return tmfError(res, 404, 'Usage not found');
    const doc = await Usage.findById(req.params.id);
    if (!doc) return tmfError(res, 404, 'Usage not found');
    return res.status(200).json(applyFields(toTmf(doc), req.query.fields));
  } catch (err) {
    return next(err);
  }
});

// ---------- /usageSpecification ----------

const usageSpecificationRouter = express.Router();

usageSpecificationRouter.post('/', authenticate, async (req, res, next) => {
  const { name, description, usageSpecCharacteristic } = req.body || {};

  if (!name || typeof name !== 'string') {
    return tmfError(res, 400, 'name is required and must be a string');
  }

  try {
    const doc = await UsageSpecification.create({ name, description, usageSpecCharacteristic });
    const body = toTmf(doc);
    res.set('Location', body.href);
    return res.status(201).json(body);
  } catch (err) {
    if (err.name === 'ValidationError') return tmfError(res, 400, err.message);
    return next(err);
  }
});

usageSpecificationRouter.get('/', authenticate, async (req, res, next) => {
  try {
    const { id, name, fields } = req.query;
    const filter = {};
    if (id !== undefined) {
      if (!isValidId(id)) return res.status(200).json([]);
      filter._id = id;
    }
    if (name !== undefined) filter.name = name;
    const records = await UsageSpecification.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(records.map((doc) => applyFields(toTmf(doc), fields)));
  } catch (err) {
    return next(err);
  }
});

usageSpecificationRouter.get('/:id', authenticate, async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return tmfError(res, 404, 'UsageSpecification not found');
    const doc = await UsageSpecification.findById(req.params.id);
    if (!doc) return tmfError(res, 404, 'UsageSpecification not found');
    return res.status(200).json(applyFields(toTmf(doc), req.query.fields));
  } catch (err) {
    return next(err);
  }
});

module.exports = { usageRouter, usageSpecificationRouter };