import { motion } from 'framer-motion';
import iconRead from '../assets/step-read.png';
import iconVerify from '../assets/step-verify.png';
import iconFlex from '../assets/step-flex.png';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Read',
      desc: 'The Session: Start a timer for at least 5 minutes of focused reading.',
      icon: iconRead,
      color: 'var(--primary)'
    },
    {
      title: 'Verify',
      desc: 'The Proof: Take a quick AI-generated quiz after each chapter to lock in your learning.',
      icon: iconVerify,
      color: 'var(--accent)'
    },
    {
      title: 'Flex',
      desc: 'The Reward: Earn XP based on accuracy and climb the weekly leagues.',
      icon: iconFlex,
      color: '#F59E0B'
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h2 className="section-title">How Bookmarkk Works</h2>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="step-icon-wrapper">
                <div className="step-number" style={{ background: step.color }}>{index + 1}</div>
                <img src={step.icon} alt={step.title} className="step-icon" />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
