import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    // Bridal gold jewellery flat lay
    image: 'https://images.pexels.com/photos/7314466/pexels-photo-7314466.jpeg',
    tag: 'The Grand Collection',
    title: 'Exquisite Bridal',
    accent: 'Jewellery',
    description: 'Celebrate your special day with masterfully crafted gold and diamond bridal sets, designed to make you radiant.',
    cta: 'Explore Collection',
    ctaSecondary: 'View Lookbook',
  },
  {
    id: 2,
    // Gold necklace on neck
    image: 'https://images.pexels.com/photos/8442425/pexels-photo-8442425.jpeg',
    tag: 'Everyday Elegance',
    title: 'Lightweight Gold',
    accent: 'Designs',
    description: 'Discover contemporary gold jewelry with modern silhouettes, perfectly balanced for every occasion.',
    cta: 'Shop Everyday',
    ctaSecondary: 'Know More',
  },
  {
    id: 3,
    // Diamond ring macro
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=80',
    tag: 'Solitaire Collection',
    title: 'Timeless',
    accent: 'Diamonds',
    description: 'Experience the brilliance of perfectly cut diamonds that capture the essence of forever.',
    cta: 'Discover Diamonds',
    ctaSecondary: 'Book Consultation',
  },
];

const categories = [
  { name: 'Rings',     img: 'https://images.pexels.com/photos/34479805/pexels-photo-34479805.jpeg' },
  { name: 'Necklaces', img: 'https://images.pexels.com/photos/28939437/pexels-photo-28939437.jpeg' },
  { name: 'Earrings',  img: 'https://images.pexels.com/photos/32989029/pexels-photo-32989029.jpeg' },
  { name: 'Bangles',   img: 'https://images.pexels.com/photos/20493840/pexels-photo-20493840.jpeg' },
  { name: 'Pendants',  img: 'https://images.pexels.com/photos/19869445/pexels-photo-19869445.jpeg' },
];

const promises = [
  'Complete Transparency',
  'Assured Lifetime Maintenance',
  'Zero Deduction Gold Exchange',
  'IGI & GIA Certified Diamonds',
];

const testimonials = [
  { name: 'Priya Sharma',  location: 'Mumbai',    text: 'My bridal set was beyond anything I imagined. Every piece was perfect and the service was exceptional throughout.', rating: 5 },
  { name: 'Ananya Reddy',  location: 'Hyderabad', text: 'The craftsmanship is unparalleled. I get compliments on my necklace every time I wear it. Worth every rupee.', rating: 5 },
  { name: 'Meera Nair',    location: 'Bangalore', text: 'Transparent pricing, certified diamonds, and stunning designs. Absolutely love everything I purchased here.', rating: 5 },
];

const stats = [
  { value: '35+',  label: 'Years of Legacy' },
  { value: '300+', label: 'Showrooms' },
  { value: '11M+', label: 'Happy Customers' },
  { value: '100%', label: 'Diamond Exchange Value' },
];

const lookbook = [
  { col: 'span 7', row: 'span 3', src: 'https://images.pexels.com/photos/30276931/pexels-photo-30276931.jpeg', label: 'Bridal Sets', d: 'delay-1' },
  { col: 'span 5', row: 'span 2', src: 'https://images.pexels.com/photos/32077584/pexels-photo-32077584.jpeg',  label: 'Necklaces',  d: 'delay-2' },
  { col: 'span 5', row: 'span 3', src: 'https://images.pexels.com/photos/18016512/pexels-photo-18016512.jpeg',  label: 'Earrings',   d: 'delay-3' },
  { col: 'span 7', row: 'span 2', src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80', label: 'Diamonds',   d: 'delay-4' },
];

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  gold:    '#C9A84C',
  brand:   '#7B0041',
  bg:      '#FAF9F6',
  bgLight: '#F3F0EA',
  text:    '#1A1108',
  muted:   '#6B5E4E',
  border:  '#E8DDD0',
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const Home = () => {
  const [currentSlide,      setCurrentSlide]      = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useScrollReveal();

  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .reveal { opacity:0; transform:translateY(28px); transition:opacity .75s ease,transform .75s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal.delay-1 { transition-delay:.10s; }
        .reveal.delay-2 { transition-delay:.20s; }
        .reveal.delay-3 { transition-delay:.30s; }
        .reveal.delay-4 { transition-delay:.40s; }

        @keyframes kb { 0%{transform:scale(1)} 100%{transform:scale(1.07)} }
        .kb { animation:kb 9s ease-in-out infinite alternate; width:100%; height:100%; object-fit:cover; display:block; }

        @keyframes slideUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .hu { animation:slideUp .8s cubic-bezier(.22,1,.36,1) forwards; opacity:0; }

        @keyframes prog { from{width:0%} to{width:100%} }
        .prog-bar { height:2px; background:#C9A84C; animation:prog 6s linear infinite; }

        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .btn-sh {
          background:linear-gradient(90deg,#C9A84C 0%,#F0D98A 40%,#C9A84C 60%,#A07830 100%);
          background-size:200% auto; animation:shimmer 3s linear infinite;
          color:#1A1108; border:none; padding:13px 30px;
          font-family:'Jost',sans-serif; font-weight:600; letter-spacing:1.5px;
          text-transform:uppercase; font-size:.78rem; cursor:pointer;
          display:inline-block; text-decoration:none; transition:opacity .2s;
        }
        .btn-sh:hover { opacity:.85; }

        .btn-gh {
          background:transparent; border:1px solid #C9A84C; color:#6B5E4E;
          padding:12px 26px; font-family:'Jost',sans-serif; font-size:.78rem;
          font-weight:500; letter-spacing:1.5px; text-transform:uppercase;
          cursor:pointer; display:inline-block; text-decoration:none;
          transition:background .25s,color .25s;
        }
        .btn-gh:hover { background:rgba(201,168,76,.15); }

        .cat-item { transition:transform .35s ease; cursor:pointer; text-align:center; text-decoration:none; }
        .cat-item:hover { transform:translateY(-6px); }
        .cat-item img { transition:transform .5s ease; }
        .cat-item:hover img { transform:scale(1.08); }

        .lb-cell { overflow:hidden; position:relative; cursor:pointer; }
        .lb-cell img { transition:transform .6s ease; width:100%; height:100%; object-fit:cover; display:block; }
        .lb-cell:hover img { transform:scale(1.05); }
        .lb-label {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(26,17,8,.6) 0%,transparent 55%);
          display:flex; align-items:flex-end; padding:1.4rem;
          opacity:0; transition:opacity .35s;
        }
        .lb-cell:hover .lb-label { opacity:1; }

        .divider { width:38px; height:2px; background:#C9A84C; margin:14px auto 0; }

        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mq-track { display:flex; width:max-content; animation:mq 30s linear infinite; }

        @media(max-width:900px){
          .about-grid { grid-template-columns:1fr !important; }
          .lb-grid > div { grid-column:span 12 !important; grid-row:span 1 !important; height:240px !important; }
          .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media(max-width:560px){
          .stats-grid { grid-template-columns:1fr !important; }
          .cats-wrap { gap:1.4rem !important; }
        }
      `}</style>

      {/* ══════ 1. HERO ══════ */}
      <section style={{ position:'relative', height:'100vh', minHeight:'580px', overflow:'hidden' }}>
        {slides.map((slide, i) => (
          <div key={slide.id} style={{
            position:'absolute', inset:0,
            opacity: currentSlide === i ? 1 : 0,
            transition:'opacity 1.3s ease',
            zIndex: currentSlide === i ? 2 : 1,
          }}>
            <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
              <img src={slide.image} alt={slide.title} className="kb" />
            </div>
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(100deg,rgba(250,249,246,.97) 0%,rgba(250,249,246,.72) 42%,rgba(250,249,246,.05) 100%)',
            }} />
            {currentSlide === i && (
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center' }}>
                <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 2.5rem', width:'100%' }}>
                  <div style={{ maxWidth:'580px' }}>
                    <span className="hu" style={{ animationDelay:'.08s',
                      fontFamily:"'Jost',sans-serif", fontSize:'.7rem', fontWeight:600,
                      letterSpacing:'3px', textTransform:'uppercase', color:T.brand,
                      borderBottom:`1px solid ${T.gold}`, paddingBottom:'4px',
                      display:'inline-block', marginBottom:'1.4rem',
                    }}>{slide.tag}</span>
                    <h1 className="hu" style={{ animationDelay:'.22s',
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'clamp(3rem,6vw,5.2rem)', lineHeight:1.07, fontWeight:300,
                      color:T.text, margin:'0 0 1.1rem',
                    }}>
                      {slide.title}<br />
                      <em style={{ color:T.brand, fontStyle:'italic', fontWeight:400 }}>{slide.accent}</em>
                    </h1>
                    <p className="hu" style={{ animationDelay:'.38s',
                      fontFamily:"'Jost',sans-serif", fontSize:'.97rem', lineHeight:1.85,
                      color:T.muted, marginBottom:'2.2rem', fontWeight:300,
                    }}>{slide.description}</p>
                    <div className="hu" style={{ animationDelay:'.52s', display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                      <Link to="/shop" className="btn-sh">{slide.cta}</Link>
                      <Link to="/shop" className="btn-gh">{slide.ctaSecondary}</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* progress bar */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:10, height:'2px', background:'rgba(201,168,76,.18)' }}>
          <div key={currentSlide} className="prog-bar" />
        </div>

        {/* dots */}
        <div style={{ position:'absolute', bottom:'1.8rem', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'9px', zIndex:10 }}>
          {slides.map((_,idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} aria-label={`Slide ${idx+1}`} style={{
              width: currentSlide===idx ? '26px' : '8px', height:'8px',
              borderRadius:'4px', border:'none', cursor:'pointer',
              background: currentSlide===idx ? T.brand : 'rgba(123,0,65,.3)',
              transition:'all .4s ease',
            }} />
          ))}
        </div>

        {/* counter */}
        <div style={{
          position:'absolute', right:'2rem', top:'50%', transform:'translateY(-50%)',
          zIndex:10, fontFamily:"'Jost',sans-serif", fontSize:'.73rem', color:T.muted,
          display:'flex', flexDirection:'column', alignItems:'center', gap:'6px',
        }}>
          <span style={{ fontWeight:600, color:T.text }}>0{currentSlide+1}</span>
          <span style={{ width:'1px', height:'38px', background:T.gold }} />
          <span>0{slides.length}</span>
        </div>
      </section>

      {/* ══════ 2. MARQUEE ══════ */}
      <div style={{ background:T.brand, padding:'13px 0', overflow:'hidden' }}>
        <div className="mq-track">
          {[...Array(8)].map((_,i) => (
            <span key={i} style={{
              fontFamily:"'Jost',sans-serif", fontSize:'.7rem', fontWeight:500,
              letterSpacing:'2.5px', textTransform:'uppercase',
              color:'rgba(255,255,255,.82)', padding:'0 2.5rem', whiteSpace:'nowrap',
            }}>
              Free Shipping Above ₹25,000 &nbsp;·&nbsp; IGI Certified Diamonds &nbsp;·&nbsp; 100% Value on Exchange &nbsp;·&nbsp; 3-Year Warranty &nbsp;·&nbsp; BIS Hallmarked Gold
            </span>
          ))}
        </div>
      </div>

      {/* ══════ 3. CATEGORIES ══════ */}
      <section style={{ padding:'5.5rem 0', background:T.bg, fontFamily:"'Jost',sans-serif" }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 2rem' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span style={{ fontSize:'.7rem', fontWeight:600, letterSpacing:'3px', textTransform:'uppercase', color:T.brand, display:'block', marginBottom:'.6rem' }}>Explore</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.9rem,4vw,2.8rem)', fontWeight:400, color:T.text, margin:'0 0 .3rem' }}>Shop by Category</h2>
            <div className="divider" />
            <p style={{ marginTop:'1rem', color:T.muted, fontSize:'.93rem', fontWeight:300 }}>Browse our meticulously curated jewellery collections</p>
          </div>
          <div className="cats-wrap" style={{ display:'flex', justifyContent:'center', gap:'2.5rem', flexWrap:'wrap' }}>
            {categories.map((cat, idx) => (
              <Link to="/shop" key={cat.name} className={`reveal delay-${Math.min(idx+1,4)} cat-item`}>
                <div style={{
                  width:'140px', height:'140px', borderRadius:'50%', overflow:'hidden',
                  margin:'0 auto 1rem', border:`3px solid ${T.border}`,
                  outline:`6px solid ${T.bg}`, boxShadow:'0 4px 20px rgba(0,0,0,.07)',
                }}>
                  <img src={cat.img} alt={cat.name} style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%' }} />
                </div>
                <p style={{ margin:0, fontSize:'.74rem', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:T.text }}>{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 4. PROMISE ══════ */}
      <section style={{ padding:'6.5rem 0', background:T.bgLight, fontFamily:"'Jost',sans-serif" }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 2rem' }}>
          <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>

            {/* image with decorative frame */}
            <div className="reveal" style={{ position:'relative' }}>
              <div style={{ position:'absolute', top:'-18px', left:'-18px', right:'18px', bottom:'18px', border:`1px solid ${T.gold}`, borderRadius:'2px', zIndex:0 }} />
              <div style={{ position:'relative', zIndex:1, overflow:'hidden', borderRadius:'2px', height:'500px' }}>
                {/* jewellery artisan / gold pieces close-up */}
                <img
                  className="kb"
                  src="https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?auto=format&fit=crop&w=1000&q=80"
                  alt="Our Promise"
                  style={{ objectPosition:'center' }}
                />
              </div>
              <div style={{
                position:'absolute', bottom:'-22px', right:'-22px', zIndex:5,
                background:T.brand, color:'white', width:'120px', height:'120px',
                borderRadius:'50%', display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center',
                boxShadow:'0 8px 28px rgba(123,0,65,.3)',
              }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:600, lineHeight:1 }}>35+</span>
                <span style={{ fontSize:'.62rem', letterSpacing:'1.5px', textTransform:'uppercase', opacity:.85, marginTop:'4px' }}>Years</span>
              </div>
            </div>

            {/* content */}
            <div className="reveal delay-2">
              <span style={{ fontSize:'.7rem', fontWeight:600, letterSpacing:'3px', textTransform:'uppercase', color:T.brand, display:'block', marginBottom:'.6rem' }}>Our Promise</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.9rem,3.5vw,2.9rem)', fontWeight:400, color:T.text, marginBottom:'1rem', lineHeight:1.2 }}>
                100% Value on<br />Diamond Exchange
              </h2>
              <div style={{ width:'38px', height:'2px', background:T.gold, marginBottom:'1.4rem' }} />
              <p style={{ color:T.muted, marginBottom:'1.8rem', fontSize:'.95rem', lineHeight:1.9, fontWeight:300 }}>
                We offer the best value for your diamonds across all our stores worldwide, backed by complete transparency and certified quality.
              </p>
              <ul style={{ listStyle:'none', padding:0, marginBottom:'2.2rem' }}>
                {promises.map((p, i) => (
                  <li key={i} style={{ marginBottom:'.8rem', display:'flex', alignItems:'center', gap:'12px', color:T.muted, fontSize:'.9rem' }}>
                    <span style={{
                      width:'22px', height:'22px', borderRadius:'50%',
                      background:'rgba(201,168,76,.12)', border:`1px solid ${T.gold}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:T.gold, fontSize:'.7rem', fontWeight:700, flexShrink:0,
                    }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-sh">Discover Our Promise</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ 5. STATS ══════ */}
      <section style={{ background:'#1A1108', padding:'4.5rem 0', fontFamily:"'Jost',sans-serif" }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 2rem' }}>
          <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'rgba(255,255,255,.06)' }}>
            {stats.map((s,i) => (
              <div key={i} className="reveal" style={{ textAlign:'center', padding:'2.8rem 1rem', background:'#1A1108' }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.2rem,4vw,3.2rem)', color:T.gold, margin:'0 0 .4rem', fontWeight:400, lineHeight:1 }}>{s.value}</p>
                <p style={{ margin:0, fontSize:'.68rem', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,.45)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 6. LOOKBOOK ══════ */}
      <section style={{ padding:'6.5rem 0', background:'#FAFAF8', fontFamily:"'Jost',sans-serif" }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 2rem' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <span style={{ fontSize:'.7rem', fontWeight:600, letterSpacing:'3px', textTransform:'uppercase', color:T.brand, display:'block', marginBottom:'.6rem' }}>Curated Moments</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.9rem,4vw,2.8rem)', fontWeight:400, color:T.text, margin:'0 0 .3rem' }}>The Lookbook</h2>
            <div className="divider" />
            <p style={{ marginTop:'1rem', color:T.muted, fontSize:'.93rem', fontWeight:300, maxWidth:'440px', margin:'1rem auto 0' }}>
              A visual journey through our most celebrated pieces.
            </p>
          </div>
          <div className="lb-grid" style={{ display:'grid', gridTemplateColumns:'repeat(12,1fr)', gridAutoRows:'155px', gap:'12px' }}>
            {lookbook.map((item,i) => (
              <div key={i} className={`reveal ${item.d} lb-cell`} style={{ gridColumn:item.col, gridRow:item.row }}>
                <img className="kb" src={item.src} alt={item.label} style={{ animationDuration:'10s' }} />
                <div className="lb-label">
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", color:'white', fontSize:'1.3rem', fontStyle:'italic' }}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 7. TESTIMONIALS ══════ */}
      <section style={{ padding:'6rem 0', background:'#1A1108', fontFamily:"'Jost',sans-serif" }}>
        <div style={{ maxWidth:'700px', margin:'0 auto', padding:'0 2rem', textAlign:'center' }}>
          <div className="reveal">
            <span style={{ fontSize:'.7rem', fontWeight:600, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(201,168,76,.7)', display:'block', marginBottom:'.6rem' }}>Voices of Trust</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.9rem,4vw,2.8rem)', fontWeight:400, color:'white', margin:'0 0 3rem' }}>What Our Customers Say</h2>
          </div>
          {testimonials.map((t,i) => (
            <div key={i} style={{ display: i===activeTestimonial ? 'block' : 'none', transition:'opacity .5s' }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.15rem,2.2vw,1.5rem)', color:'rgba(255,255,255,.88)', lineHeight:1.75, fontStyle:'italic', marginBottom:'1.8rem', fontWeight:300 }}>
                "{t.text}"
              </p>
              <div style={{ display:'flex', justifyContent:'center', gap:'3px', marginBottom:'.8rem' }}>
                {[...Array(t.rating)].map((_,s) => <span key={s} style={{ color:T.gold, fontSize:'.85rem' }}>★</span>)}
              </div>
              <p style={{ margin:0, fontWeight:600, color:T.gold, fontSize:'.85rem', letterSpacing:'1px' }}>{t.name}</p>
              <p style={{ margin:'4px 0 0', fontSize:'.7rem', color:'rgba(255,255,255,.38)', letterSpacing:'1.5px', textTransform:'uppercase' }}>{t.location}</p>
            </div>
          ))}
          <div style={{ display:'flex', justifyContent:'center', gap:'8px', marginTop:'2.2rem' }}>
            {testimonials.map((_,i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} aria-label={`Testimonial ${i+1}`} style={{
                width:'8px', height:'8px', borderRadius:'50%', border:'none', cursor:'pointer',
                background: i===activeTestimonial ? T.gold : 'rgba(201,168,76,.3)',
                transition:'background .3s',
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 8. NEWSLETTER ══════ */}
      <section style={{ padding:'5.5rem 0', background:T.bgLight, fontFamily:"'Jost',sans-serif" }}>
        <div style={{ maxWidth:'560px', margin:'0 auto', padding:'0 2rem', textAlign:'center' }}>
          <div className="reveal">
            <span style={{ fontSize:'.7rem', fontWeight:600, letterSpacing:'3px', textTransform:'uppercase', color:T.brand, display:'block', marginBottom:'.6rem' }}>Stay Connected</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.7rem,3.5vw,2.5rem)', fontWeight:400, color:T.text, marginBottom:'.7rem' }}>Get Exclusive Offers</h2>
            <p style={{ color:T.muted, fontSize:'.93rem', fontWeight:300, marginBottom:'2.2rem', lineHeight:1.75 }}>
              Subscribe for new arrivals, festive collections, and members-only deals.
            </p>
            <div style={{ display:'flex', maxWidth:'420px', margin:'0 auto', border:`1px solid ${T.border}`, background:'white' }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex:1, border:'none', outline:'none', padding:'13px 16px',
                  fontFamily:"'Jost',sans-serif", fontSize:'.86rem', color:T.text, background:'transparent',
                }}
              />
              <button style={{
                background:T.brand, color:'white', border:'none', padding:'13px 22px',
                fontFamily:"'Jost',sans-serif", fontWeight:600, fontSize:'.76rem',
                letterSpacing:'1.5px', textTransform:'uppercase', cursor:'pointer',
                whiteSpace:'nowrap', transition:'opacity .2s',
              }}
                onMouseOver={e=>e.currentTarget.style.opacity='.85'}
                onMouseOut={e=>e.currentTarget.style.opacity='1'}
              >Subscribe</button>
            </div>
            <p style={{ marginTop:'.9rem', fontSize:'.7rem', color:T.muted }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;