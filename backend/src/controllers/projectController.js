import Project from '../models/Project.js';

export async function listProjects(_req, res) {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to load projects' });
  }
}

export async function getProject(req, res) {
  try {
    const item = await Project.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch {
    res.status(400).json({ message: 'Invalid id' });
  }
}

function parseGalleryExisting(raw) {
  if (!raw) return [];
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function parseOptionalDate(value) {
  if (value === undefined || value === null || value === '') return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function normalizeProjectBody(body) {
  const next = { ...body };
  if (next.featured !== undefined) {
    next.featured = next.featured === true || next.featured === 'true';
  }
  if ('startDate' in body) {
    next.startDate = parseOptionalDate(body.startDate);
  }
  if ('endDate' in body) {
    next.endDate = parseOptionalDate(body.endDate);
  }
  if (next.gallery !== undefined && !Array.isArray(next.gallery)) {
    delete next.gallery;
  }
  return next;
}

function applyUploads(body, files) {
  if (files?.image?.[0]) {
    body.image = `/uploads/${files.image[0].filename}`;
  }
  const rawExisting = body.galleryExisting;
  const hasGalleryPayload = rawExisting !== undefined && rawExisting !== null;
  const existing = hasGalleryPayload ? parseGalleryExisting(rawExisting) : null;
  delete body.galleryExisting;
  const newGallery = (files?.gallery || []).map((f) => `/uploads/${f.filename}`);
  if (existing !== null) {
    body.gallery = [...existing, ...newGallery];
  } else if (newGallery.length) {
    body.gallery = newGallery;
  }
}

export async function createProject(req, res) {
  try {
    const body = normalizeProjectBody({ ...req.body });
    applyUploads(body, req.files);
    const item = await Project.create(body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: e.message || 'Create failed' });
  }
}

export async function updateProject(req, res) {
  try {
    const body = normalizeProjectBody({ ...req.body });
    applyUploads(body, req.files);
    const item = await Project.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: e.message || 'Update failed' });
  }
}

export async function deleteProject(req, res) {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ message: 'Delete failed' });
  }
}
