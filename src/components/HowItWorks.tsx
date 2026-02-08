import { motion } from 'framer-motion';
import { ShieldCheck, Trophy, BarChart3 } from 'lucide-react';

const features = [
  {
    title: 'Prove It',
    icon: ShieldCheck,
    color: 'var(--primary)',
    bgColor: 'var(--primary-light)',
    bullets: [
      'Pass AI quizzes to earn XP',
      'No self-reporting, no fake streaks',
      'Your progress is earned, not logged',
    ],
  },
  {
    title: 'Compete Weekly',
    icon: Trophy,
    color: 'var(--accent)',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    bullets: [
      'Join leagues that reset every 7 days',
      'Fresh competition keeps you showing up',
      'See where you rank in real-time',
    ],
  },
  {
    title: 'Build Your Identity',
    icon: BarChart3,
    color: 'var(--electric-blue)',
    bgColor: 'rgba(37, 99, 235, 0.1)',
    bullets: [
      'Track streaks, books finished, time read',
      "AI analyzes what you're learning",
      'Share your reading reputation',
    ],
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div
                className="feature-icon"
                style={{ background: feature.bgColor }}
              >
                <feature.icon size={28} color={feature.color} />
              </div>
              <h3>{feature.title}</h3>
              <ul>
                {feature.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
