import { motion } from 'framer-motion';
import featureReading from '../assets/feature-reading.png';
import featureLeaderboard from '../assets/feature-leaderboard.png';

const Features = () => {
  const features = [
    {
      title: 'Your Reading Identity',
      desc: 'Track your streak, level up, and build a profile that proves your knowledge.',
      image: featureLeaderboard
    },
    {
      title: 'Weekly Leaderboards',
      desc: 'Compete with friends and the global community. Reading is no longer a solo sport.',
      image: featureLeaderboard
    },
    {
      title: 'Instant Verification',
      desc: 'AI-generated quizzes test your retention immediately after every chapter.',
      image: featureReading
    },
    {
      title: 'Curated Library',
      desc: 'Discover your next conquest with detailed book breakdowns and community ratings.',
      image: featureReading
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`feature-row ${index % 2 === 1 ? 'reverse' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="feature-text">
              <span className="feature-number">0{index + 1}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
            <div className="feature-image">
              <div className="phone-wrapper small">
                <img src={feature.image} alt={feature.title} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .features {
          padding: 8rem 0;
        }

        .feature-row {
          display: flex;
          align-items: center;
          gap: 6rem;
          margin-bottom: 8rem;
        }

        .feature-row.reverse {
          flex-direction: row-reverse;
        }

        .feature-row:last-child {
          margin-bottom: 0;
        }

        .feature-text {
          flex: 1;
        }

        .feature-number {
          display: block;
          font-family: var(--font-heading);
          font-size: 5rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1;
          margin-bottom: -1rem;
        }

        .feature-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }

        .feature-desc {
          font-size: 1.25rem;
          color: var(--text-dim);
          line-height: 1.6;
        }

        .feature-image {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .phone-wrapper.small {
          width: 100%;
          max-width: 320px;
        }

        .phone-wrapper.small img {
          width: 100%;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
        }

        @media (max-width: 768px) {
          .feature-row, .feature-row.reverse {
            flex-direction: column-reverse;
            gap: 3rem;
            text-align: center;
          }
          
          .feature-number {
            font-size: 3rem;
            margin-bottom: 0;
          }

          .feature-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Features;
