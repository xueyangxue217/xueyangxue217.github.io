import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import TiltedCard from '../components/TiltedCard';
import './Home.css';

// Minimal CONTENTS index page. Each card is a 3:4 photo with a subtle tilt.
const CARD_IMG = {
  about: '/assets/home/about.jpg',
  work: '/assets/home/work.jpg',
  life: '/assets/home/life.jpg',
  contact: '/assets/home/contact.jpg',
};

export default function Home({ onSelect }) {
  const { t } = useI18n();
  const items = t.home.items;
  const total = String(items.length).padStart(2, '0');

  return (
    <section className="home shell">
      <Reveal>
        <h2 className="home__eyebrow">{t.home.eyebrow}</h2>
      </Reveal>

      <div className="home__grid">
        {items.map((it, i) => (
          <Reveal key={it.id} className="hc" delay={i * 0.08}>
            <button className="hc__btn" onClick={() => onSelect?.(it.id)}>
              <div className="hc__card">
                <TiltedCard
                  imageSrc={CARD_IMG[it.id]}
                  altText={it.title}
                  containerWidth="100%"
                  containerHeight="100%"
                  imageWidth="100%"
                  imageHeight="100%"
                  rotateAmplitude={9}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                />
              </div>
              <div className="hc__num">
                {String(i + 1).padStart(2, '0')}<span className="hc__of">/{total}</span>
              </div>
              <h3 className="hc__title">{it.title}</h3>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
