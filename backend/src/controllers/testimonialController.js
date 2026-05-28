import Testimonial from '../models/Testimonial.js';

export async function listTestimonials(_req, res) {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: 'Failed to load testimonials' });
  }
}

export async function createTestimonial(req, res) {
  try {
    const body = { ...req.body };
    if (req.file) {
      body.image = `/uploads/${req.file.filename}`;
    }
    if (body.rating !== undefined) body.rating = Number(body.rating);
    const item = await Testimonial.create(body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: e.message || 'Create failed' });
  }
}

export async function updateTestimonial(req, res) {
  try {
    const body = { ...req.body };
    if (req.file) {
      body.image = `/uploads/${req.file.filename}`;
    }
    if (body.rating !== undefined) body.rating = Number(body.rating);
    const item = await Testimonial.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: e.message || 'Update failed' });
  }
}

export async function deleteTestimonial(req, res) {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ message: 'Delete failed' });
  }
}
