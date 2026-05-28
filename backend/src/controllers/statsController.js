import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';
import ContactMessage from '../models/ContactMessage.js';

export async function dashboardStats(_req, res) {
  try {
    const [projects, testimonials, messages] = await Promise.all([
      Project.countDocuments(),
      Testimonial.countDocuments(),
      ContactMessage.countDocuments(),
    ]);
    const featured = await Project.countDocuments({ featured: true });
    res.json({ projects, testimonials, messages, featuredProjects: featured });
  } catch {
    res.status(500).json({ message: 'Stats unavailable' });
  }
}
