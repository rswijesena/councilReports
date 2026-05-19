// riverland-screens.jsx — all screens of the Report a Problem flow
// Renders inside an IOSDevice frame (402x874).

const { useState: useS, useEffect: useE, useRef: useR } = React;

const ICON = (n) => `design-system/assets/icons/${n}.svg`;
function Icon({ name, size = 18, invert = false, style = {} }) {
  return <img src={ICON(name)} alt="" width={size} height={size} style={{ filter: invert ? 'invert(1)' : 'none', ...style }} />;
}

// ─── Category icons ────────────────────────────────────────────────────────
function CatIcon({ name, size = 20, color = 'var(--exo-palette-aqua-70)' }) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'pothole':
      return (
        <svg {...props}>
          <path d="M3 17h18"/>
          <path d="M7.5 13.5c.8-1.2 2.5-1.8 4.5-1.5 2 .3 3.3 1.6 4.2 1.8 1 .2 2-.2 2.5-.7" fill="currentColor" fillOpacity=".15"/>
          <path d="M7.5 13.5c.8-1.2 2.5-1.8 4.5-1.5 2 .3 3.3 1.6 4.2 1.8 1 .2 2-.2 2.5-.7"/>
        </svg>
      );
    case 'streetlight':
      return (
        <svg {...props}>
          <path d="M12 21V8"/>
          <path d="M7 8h10l-1.5-3h-7L7 8z" fill="currentColor" fillOpacity=".15"/>
          <path d="M9 21h6"/>
          <path d="M17.5 4.5L19 3M6.5 4.5L5 3M12 4V2"/>
        </svg>
      );
    case 'tipping':
      return (
        <svg {...props}>
          <path d="M5 9h14l-1 11H6L5 9z" fill="currentColor" fillOpacity=".15"/>
          <path d="M5 9h14"/>
          <path d="M8 6h8l-1 3H9L8 6z"/>
          <path d="M10 13v4M14 13v4"/>
        </svg>
      );
    case 'graffiti':
      return (
        <svg {...props}>
          <rect x="8" y="9" width="8" height="12" rx="1" fill="currentColor" fillOpacity=".15"/>
          <path d="M10 6h4v3h-4z"/>
          <path d="M11 4h2M9 5l-2 1M15 5l2 1"/>
        </svg>
      );
    case 'vehicle':
      return (
        <svg {...props}>
          <path d="M4 16v-3l2-5h12l2 5v3" fill="currentColor" fillOpacity=".15"/>
          <path d="M4 16v-3l2-5h12l2 5v3"/>
          <circle cx="7.5" cy="16" r="1.5"/>
          <circle cx="16.5" cy="16" r="1.5"/>
          <path d="M3 19l1.5-1.5M21 19l-1.5-1.5"/>
        </svg>
      );
    case 'tree':
      return (
        <svg {...props}>
          <path d="M12 3c-2.5 0-4 1.5-4 3.5 0 .5.1.8.3 1.2-1.4.4-2.3 1.5-2.3 2.8 0 1 .5 1.8 1.3 2.3-.8.5-1.3 1.3-1.3 2.3 0 1.7 1.5 3 3.5 3H10v3h4v-3h.5c2 0 3.5-1.3 3.5-3 0-1-.5-1.8-1.3-2.3.8-.5 1.3-1.3 1.3-2.3 0-1.3-.9-2.4-2.3-2.8.2-.4.3-.7.3-1.2 0-2-1.5-3.5-4-3.5z" fill="currentColor" fillOpacity=".15"/>
          <path d="M12 21v-3"/>
        </svg>
      );
    case 'water':
      return (
        <svg {...props}>
          <path d="M12 4c-3 4-6 7-6 11a6 6 0 0012 0c0-4-3-7-6-11z" fill="currentColor" fillOpacity=".18"/>
        </svg>
      );
    case 'paving':
      return (
        <svg {...props}>
          <path d="M3 7h18M3 12h18M3 17h18M8 7v5M16 7v5M12 12v5"/>
          <path d="M9.5 9l3 2 1.5 3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    case 'park':
      return (
        <svg {...props}>
          <path d="M5 4h14"/>
          <path d="M9 4v6M15 4v6"/>
          <path d="M8 10h8l-1 4h-6l-1-4z" fill="currentColor" fillOpacity=".15"/>
          <path d="M9 14l-2 6M15 14l2 6"/>
        </svg>
      );
    case 'other':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity=".15"/>
          <circle cx="8" cy="12" r=".8" fill="currentColor"/>
          <circle cx="12" cy="12" r=".8" fill="currentColor"/>
          <circle cx="16" cy="12" r=".8" fill="currentColor"/>
        </svg>
      );
    case 'camera':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h3l2-2.5h6L17 8h3v11H4V8z"/>
          <circle cx="12" cy="13" r="3.5"/>
        </svg>
      );
    case 'location':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-6.5-7-12a7 7 0 0114 0c0 5.5-7 12-7 12z" fill="currentColor" fillOpacity=".15"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      );
    case 'person':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
        </svg>
      );
    case 'anon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
          <path d="M7 6l10 12" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      );
    default: return null;
  }
}

// ─── Reusable header ───────────────────────────────────────────────────────
function ScreenHeader({ title, step, total, onBack }) {
  return (
    <div className="app-header screen-padded">
      <button className="back" onClick={onBack}>
        <Icon name="LeftCaret" size={20} />
      </button>
      <div className="title">{title}</div>
      <div className="step-count">{step} of {total}</div>
    </div>
  );
}

// ─── Stylised map SVG ──────────────────────────────────────────────────────
function MapBackground() {
  return (
    <svg className="map-svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="park" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="#bdd9b3"/>
          <circle cx="4" cy="4" r="1" fill="#9bc28d" opacity=".6"/>
        </pattern>
      </defs>
      {/* Land base */}
      <rect width="400" height="400" fill="#e9eef0"/>
      {/* Park */}
      <path d="M40 220 L160 200 L180 320 L60 340 Z" fill="url(#park)"/>
      <text x="100" y="280" fontSize="11" fill="#5a7a52" fontFamily="Noto Sans" fontWeight="600" opacity=".75">Mawson Park</text>
      {/* River */}
      <path d="M0 60 Q 100 80 200 50 T 400 90 L 400 110 Q 300 130 200 100 T 0 80 Z" fill="#a8c8d8" opacity=".7"/>
      {/* Buildings */}
      <g fill="#d4d8db" stroke="#bcc1c5" strokeWidth=".5">
        <rect x="220" y="130" width="38" height="34"/>
        <rect x="262" y="125" width="44" height="40"/>
        <rect x="310" y="135" width="32" height="34"/>
        <rect x="225" y="170" width="50" height="30"/>
        <rect x="280" y="170" width="36" height="32"/>
        <rect x="320" y="170" width="40" height="32"/>
        <rect x="280" y="210" width="44" height="36"/>
        <rect x="328" y="210" width="36" height="36"/>
        <rect x="220" y="240" width="48" height="32"/>
        <rect x="270" y="280" width="40" height="30"/>
        <rect x="315" y="280" width="42" height="34"/>
        <rect x="225" y="290" width="40" height="36"/>
        <rect x="100" y="120" width="44" height="32"/>
        <rect x="40" y="125" width="50" height="30"/>
        <rect x="100" y="160" width="32" height="28"/>
        <rect x="42" y="170" width="48" height="34"/>
      </g>
      {/* Roads */}
      <g stroke="#fff" strokeWidth="14" fill="none">
        <line x1="0" y1="200" x2="400" y2="200"/>
        <line x1="200" y1="0" x2="200" y2="400"/>
        <line x1="0" y1="120" x2="400" y2="120"/>
        <line x1="100" y1="0" x2="100" y2="400"/>
        <line x1="320" y1="0" x2="320" y2="400"/>
      </g>
      {/* Road centerlines */}
      <g stroke="#cdd1d3" strokeWidth=".7" strokeDasharray="6 5" fill="none">
        <line x1="0" y1="200" x2="400" y2="200"/>
        <line x1="200" y1="0" x2="200" y2="400"/>
      </g>
      {/* Street labels */}
      <text x="20"  y="195" fontSize="9.5" fill="#7a8085" fontFamily="Noto Sans" fontWeight="600">MAWSON DR</text>
      <text x="205" y="14"  fontSize="9.5" fill="#7a8085" fontFamily="Noto Sans" fontWeight="600">HENLEY RD</text>
      <text x="105" y="14"  fontSize="9"   fill="#9aa0a5" fontFamily="Noto Sans" fontWeight="600">BIRCH ST</text>
      <text x="325" y="14"  fontSize="9"   fill="#9aa0a5" fontFamily="Noto Sans" fontWeight="600">QUEEN ST</text>
      <text x="22"  y="115" fontSize="9"   fill="#9aa0a5" fontFamily="Noto Sans" fontWeight="600">RIVER PDE</text>
    </svg>
  );
}

// ─── Pin SVG ───────────────────────────────────────────────────────────────
function MapPin({ accent = 'var(--exo-palette-aqua-60)' }) {
  return (
    <svg className="map-pin" width="36" height="46" viewBox="0 0 36 46">
      <path d="M18 0C8 0 0 8 0 18c0 13 18 28 18 28s18-15 18-28c0-10-8-18-18-18z" fill={accent}/>
      <circle cx="18" cy="17" r="6.5" fill="#fff"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Welcome
// ────────────────────────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen" data-screen-label="01 Welcome">
      <div className="welcome-logo">
        <div className="crest"></div>
        <div className="text">
          <div className="name">Riverland City</div>
          <div className="sub">Council services</div>
        </div>
      </div>

      <div className="welcome-hero">
        <div className="eyebrow">Report a problem</div>
        <h1>See something <strong>that needs fixing?</strong></h1>
        <p>Tell us in under a minute. Tap, snap, send. We'll let you know when it's sorted.</p>
      </div>

      <div className="welcome-actions">
        <button className="btn primary" onClick={() => onStart('anonymous')}>
          <CatIcon name="anon" size={18} color="#fff" />
          Continue anonymously
        </button>
        <button className="btn secondary" onClick={() => onStart('signin')}>
          <CatIcon name="person" size={18} color="var(--exo-palette-aqua-70)" />
          Sign in for status updates
        </button>
      </div>

      <div className="welcome-foot">
        Need urgent help? Call council on <strong style={{ color: 'var(--exo-palette-aqua-70)' }}>{COUNCIL.helpline}</strong><br/>
        For emergencies, call 000.
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Location
// ────────────────────────────────────────────────────────────────────────────
function LocationScreen({ onNext, onBack, triggerPlumbing }) {
  const [confirmed, setConfirmed] = useS(false);

  function confirm() {
    triggerPlumbing && triggerPlumbing('location');
    setConfirmed(true);
    setTimeout(() => onNext(), 600);
  }

  return (
    <>
      <ScreenHeader title="Pin the location" step={2} total={8} onBack={onBack} />
      <div className="map-screen" data-screen-label="02 Location">
        <div className="map-frame">
          <MapBackground />
          <MapPin />
          {/* nearby reports */}
          <div className="map-nearby" style={{ left: '30%', top: '32%' }} title="Pothole reported 3d ago">!</div>
          <div className="map-nearby streetlight" style={{ left: '72%', top: '46%' }} title="Streetlight out">!</div>
          <div className="map-nearby tipping" style={{ left: '24%', top: '70%' }} title="Illegal dumping">!</div>

          <div className="map-suburb-bubble">Mawson Heights, SA</div>
          <div className="map-controls">
            <button className="ctrl" title="Use my location"><CatIcon name="location" size={16} color="var(--exo-palette-aqua-70)"/></button>
            <button className="ctrl" title="Zoom in"><Icon name="Plus" size={16} /></button>
          </div>
        </div>

        <div className="location-card">
          <div className="lbl">Reporting at</div>
          <div className="address">Cnr Mawson Dr &amp; Henley Rd</div>
          <div className="sub">Mawson Heights SA 5040 · Northbridge Ward</div>
          <button className="map-it">
            <CatIcon name="location" size={12} color="var(--exo-palette-aqua-70)" />
            Drag pin to adjust
          </button>
        </div>

        <div className="legend">
          <span style={{ font: '700 10px var(--exo-font-family)', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--exo-palette-gray-50)' }}>Nearby reports:</span>
          <span className="item"><span className="sw" style={{background:'rgba(255,124,102,.85)'}}></span>Pothole</span>
          <span className="item"><span className="sw" style={{background:'rgba(236,153,50,.85)'}}></span>Streetlight</span>
          <span className="item"><span className="sw" style={{background:'rgba(160,50,145,.85)'}}></span>Dumping</span>
        </div>

        <div className="screen">
          <div className="cta-bar">
            <button className="btn primary" onClick={confirm} disabled={confirmed}>
              {confirmed ? 'Routing…' : 'Confirm location'}
              {!confirmed && <Icon name="RightCaret" size={16} invert />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Category
// ────────────────────────────────────────────────────────────────────────────
function CategoryScreen({ value, onChange, onNext, onBack, aiSuggested }) {
  return (
    <>
      <ScreenHeader title="What's the issue?" step={3} total={8} onBack={onBack} />
      <div className="screen" data-screen-label="03 Category">
        <h1>What's the <strong>issue?</strong></h1>
        <p className="lede">Pick the closest match. You can refine in a moment.</p>

        <div className="cat-grid">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`cat-card ${value === c.id ? 'selected' : ''} ${aiSuggested === c.id ? 'suggested' : ''}`}
              onClick={() => onChange(c.id)}
            >
              {aiSuggested === c.id && (
                <span className="ai-suggest"><Icon name="Ai" size={9} />AI suggests</span>
              )}
              <div className="ico"><CatIcon name={c.iconSvg} size={22} /></div>
              <div>
                <div className="name">{c.label}</div>
                <div className="hint">{c.hint}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="cta-bar">
          <button className="btn primary" disabled={!value} onClick={onNext}>
            Continue
            <Icon name="RightCaret" size={16} invert />
          </button>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Photo
// ────────────────────────────────────────────────────────────────────────────
function PhotoScreen({ captured, setCaptured, aiResult, setAiResult, onAcceptAI, onNext, onBack, triggerPlumbing, aiEnabled }) {
  const [analysing, setAnalysing] = useS(false);

  function takePhoto() {
    setCaptured(true);
    if (!aiEnabled) return;
    setAnalysing(true);
    triggerPlumbing && triggerPlumbing('photo');
    setTimeout(() => {
      setAnalysing(false);
      setAiResult(AI_PHOTO_ANALYSIS);
    }, 2600);
  }

  return (
    <>
      <ScreenHeader title="Add a photo" step={4} total={8} onBack={onBack} />
      <div className="screen" data-screen-label="04 Photo">
        <h1>Snap a photo</h1>
        <p className="lede">A clear picture helps us know exactly what we're dealing with.</p>

        <div className={`photo-capture ${captured ? 'captured' : ''}`} onClick={!captured ? takePhoto : undefined}>
          {!captured && (
            <div>
              <div className="icon-big">
                <CatIcon name="camera" size={32} color="#fff" />
              </div>
              <div className="title">Tap to take a photo</div>
              <div className="hint">Or upload one you already have</div>
            </div>
          )}
          {captured && (
            <div className="preview">
              <div className="road"></div>
              <span className="stamp">Captured · GPS tagged</span>
              <button className="retake" onClick={(e) => { e.stopPropagation(); setCaptured(false); setAiResult(null); }}>
                Retake
              </button>
            </div>
          )}
        </div>

        {captured && aiEnabled && analysing && (
          <div className="ai-analysis">
            <div className="glyph"><Icon name="Ai" size={16} /></div>
            <div className="body">
              <div className="who">Riverland AI · analysing photo</div>
              <div className="text" style={{ marginTop: 6 }}>
                <div className="thinking"><span></span><span></span><span></span></div>
              </div>
            </div>
          </div>
        )}

        {captured && aiEnabled && aiResult && (
          <div className="ai-analysis">
            <div className="glyph"><Icon name="Ai" size={16} /></div>
            <div className="body">
              <div className="who">Riverland AI · what I see</div>
              <div className="text" dangerouslySetInnerHTML={{ __html: aiResult.summary.replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
              <div className="meta">
                {aiResult.chips.map((c, i) => <span key={i} className="chip">{c}</span>)}
              </div>
              <div className="confirm">
                <button>Not quite — change</button>
                <button className="primary" onClick={onAcceptAI}>That's right</button>
              </div>
            </div>
          </div>
        )}

        {captured && !aiEnabled && (
          <div style={{
            marginTop: 14,
            font: '13px/1.4 var(--exo-font-family)', color: 'var(--exo-palette-gray-60)',
            display: 'flex', gap: 8, alignItems: 'center',
            padding: '10px 12px', background: 'var(--exo-palette-gray-10)', borderRadius: 10
          }}>
            <Icon name="Online" size={14} style={{ opacity: .7 }}/>
            Photo saved with location and timestamp.
          </div>
        )}

        <div className="cta-bar">
          <button className="btn primary" onClick={onNext} disabled={!captured}>
            Continue
            <Icon name="RightCaret" size={16} invert />
          </button>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Duplicate check
// ────────────────────────────────────────────────────────────────────────────
function DuplicateScreen({ onLinkExisting, onNew, onBack, triggerPlumbing }) {
  useE(() => { triggerPlumbing && triggerPlumbing('duplicate'); }, []);
  return (
    <>
      <ScreenHeader title="Already reported?" step={5} total={8} onBack={onBack} />
      <div className="screen" data-screen-label="05 Duplicate">
        <h1>Is this <strong>the same one?</strong></h1>
        <p className="lede">We found a similar report nearby. Reporting it twice slows us down — but if it's different, please tell us.</p>

        <div className="dup-card">
          <div className="head">
            <div className="ico"><Icon name="Ai" size={14} /></div>
            <div>
              <div className="who">Riverland AI · noticed something</div>
              <div className="text">Someone reported a pothole <strong>38 m from your pin</strong> three days ago. It might be the same one.</div>
            </div>
          </div>

          <div className="existing-case">
            <div className="pic"></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="num">{NEARBY_EXISTING_CASE.ref}</div>
              <div className="title">{NEARBY_EXISTING_CASE.title}</div>
              <div className="meta">{NEARBY_EXISTING_CASE.reportedAgo} · {NEARBY_EXISTING_CASE.reports} reports · {NEARBY_EXISTING_CASE.status}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn primary" onClick={onLinkExisting}>
            Yes — add me to that report
          </button>
          <button className="btn secondary" onClick={onNew}>
            No — this is a different issue
          </button>
        </div>

        <div style={{
          marginTop: 18, padding: '12px 14px',
          background: 'var(--exo-palette-aqua-10)', border: '1px solid var(--exo-palette-aqua-30)',
          borderRadius: 10,
          font: '12px/1.45 var(--exo-font-family)', color: 'var(--exo-palette-gray-70)',
          display: 'flex', gap: 10
        }}>
          <Icon name="Online" size={14} style={{ opacity: .7, flexShrink: 0, marginTop: 1 }} />
          <div>
            Reports get acted on faster when residents back each other up. We'll notify everyone on the case as work progresses.
          </div>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Details
// ────────────────────────────────────────────────────────────────────────────
function DetailsScreen({ data, setField, onNext, onBack, aiEnabled }) {
  const [aiBusy, setAiBusy] = useS(false);
  function aiRewrite() {
    setAiBusy(true);
    setTimeout(() => {
      setField('description', AI_DESCRIPTION_REWRITE(data.description));
      setAiBusy(false);
    }, 1200);
  }
  return (
    <>
      <ScreenHeader title="A few details" step={6} total={8} onBack={onBack} />
      <div className="screen" data-screen-label="06 Details">
        <h1>A few more details</h1>
        <p className="lede">These help us prioritise the right repair team.</p>

        <div className="field-group">
          <div className="field">
            <label>Where exactly is it?</label>
            <div className="choice-row">
              {['On the road', 'On a footpath', 'In a park', 'Other'].map(opt => (
                <div
                  key={opt}
                  className={`choice ${data.where === opt ? 'selected' : ''}`}
                  onClick={() => setField('where', opt)}
                >{opt}</div>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="slider-wrap">
              <div className="lbl">How urgent is it?</div>
              <input
                type="range" min="1" max="5" step="1"
                value={data.severity || 3}
                onChange={(e) => setField('severity', Number(e.target.value))}
              />
              <div className="row">
                <span>Cosmetic</span>
                <span>Noticeable</span>
                <span>Dangerous</span>
              </div>
            </div>
          </div>

          <div className="field">
            <label>Describe what you saw</label>
            <div className="textarea-with-ai">
              <textarea
                placeholder={aiEnabled ? 'A sentence or two is plenty — AI can help expand' : 'A sentence or two…'}
                value={data.description || ''}
                onChange={(e) => setField('description', e.target.value)}
              />
              {aiEnabled && (
                <button className="ai-helper" onClick={aiRewrite} disabled={aiBusy}>
                  <Icon name="Ai" size={11} />
                  {aiBusy ? 'Writing…' : 'AI · help me write'}
                </button>
              )}
            </div>
            <div className="hint">Anything you say is used to prioritise — be specific where you can.</div>
          </div>

          <div className="field">
            <label>Have you been affected?</label>
            <div className="choice-row">
              {['Just noticed', 'Inconvenient', 'I had a near miss', 'I was hurt'].map(opt => (
                <div
                  key={opt}
                  className={`choice ${data.impact === opt ? 'selected' : ''}`}
                  onClick={() => setField('impact', opt)}
                >{opt}</div>
              ))}
            </div>
            {data.impact === 'I was hurt' && (
              <div style={{
                marginTop: 8, padding: '10px 12px',
                background: 'var(--exo-palette-red-10)', borderRadius: 8,
                font: '13px var(--exo-font-family)', color: 'var(--exo-palette-red-70)',
              }}>
                Sorry to hear that. A council officer will be in touch within 24 hours. If you need medical help now, call 000.
              </div>
            )}
          </div>
        </div>

        <div className="cta-bar">
          <button className="btn primary" onClick={onNext} disabled={!data.where || !data.description}>
            Continue
            <Icon name="RightCaret" size={16} invert />
          </button>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Contact
// ────────────────────────────────────────────────────────────────────────────
function ContactScreen({ data, setField, mode, setMode, onNext, onBack }) {
  return (
    <>
      <ScreenHeader title="Stay in the loop?" step={7} total={8} onBack={onBack} />
      <div className="screen" data-screen-label="07 Contact">
        <h1>Want updates?</h1>
        <p className="lede">We'll let you know when work is scheduled and complete.</p>

        <div className="contact-options">
          <div className={`contact-opt ${mode === 'anonymous' ? 'selected' : ''}`} onClick={() => setMode('anonymous')}>
            <div className="ico"><CatIcon name="anon" size={18} color="var(--exo-palette-aqua-70)" /></div>
            <div className="body">
              <div className="title">Stay anonymous</div>
              <div className="desc">Report and forget. You won't get updates.</div>
            </div>
          </div>
          <div className={`contact-opt ${mode === 'email' ? 'selected' : ''}`} onClick={() => setMode('email')}>
            <div className="ico"><Icon name="Send" size={16} /></div>
            <div className="body">
              <div className="title">Email + SMS updates</div>
              <div className="desc">Anonymous to council staff. Just for status notifications.</div>
            </div>
          </div>
          <div className={`contact-opt ${mode === 'signin' ? 'selected' : ''}`} onClick={() => setMode('signin')}>
            <div className="ico"><CatIcon name="person" size={18} color="var(--exo-palette-aqua-70)" /></div>
            <div className="body">
              <div className="title">Sign in with myRiverland</div>
              <div className="desc">Track every report, request follow-ups, message officers.</div>
            </div>
          </div>
        </div>

        {mode === 'email' && (
          <div className="field-group">
            <div className="field">
              <label>Email</label>
              <input
                type="email" placeholder="you@example.com"
                value={data.email || ''}
                onChange={(e) => setField('email', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Mobile (optional)</label>
              <input
                type="tel" placeholder="04xx xxx xxx"
                value={data.mobile || ''}
                onChange={(e) => setField('mobile', e.target.value)}
              />
              <div className="hint">For SMS when work is scheduled. Standard rates may apply.</div>
            </div>
          </div>
        )}

        {mode === 'signin' && (
          <div className="field-group" style={{
            padding: 14, background: 'var(--exo-palette-gray-10)', borderRadius: 12,
          }}>
            <div className="field">
              <label>myRiverland email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <button className="btn primary sm" style={{ marginTop: 4 }}>Sign in</button>
            <div style={{ font: '12px var(--exo-font-family)', color: 'var(--exo-palette-gray-60)', textAlign: 'center', marginTop: 4 }}>
              No account? <a style={{ color: 'var(--exo-palette-aqua-70)', fontWeight: 600 }}>Create one</a>
            </div>
          </div>
        )}

        <div className="cta-bar">
          <button
            className="btn primary"
            onClick={onNext}
            disabled={mode === 'email' && !data.email}
          >
            Continue
            <Icon name="RightCaret" size={16} invert />
          </button>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Review
// ────────────────────────────────────────────────────────────────────────────
function ReviewScreen({ data, mode, onJumpTo, onSubmit, onBack, submitting }) {
  const cat = CATEGORIES.find(c => c.id === data.category);
  return (
    <>
      <ScreenHeader title="Review" step={8} total={8} onBack={onBack} />
      <div className="screen" data-screen-label="08 Review">
        <h1>One last look</h1>
        <p className="lede">Tap any line to edit. When you're happy, submit.</p>

        <div className="review-card">
          <div className="row">
            <div className="k">Where</div>
            <div className="v">Cnr Mawson Dr &amp; Henley Rd<br/>Mawson Heights SA 5040</div>
            <button className="edit" onClick={() => onJumpTo('location')}>Edit</button>
          </div>
          <div className="row">
            <div className="k">What</div>
            <div className="v">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <CatIcon name={cat?.iconSvg || 'other'} size={16} />
                <strong>{cat?.label || '—'}</strong>
              </div>
              <div className="review-pic"></div>
            </div>
            <button className="edit" onClick={() => onJumpTo('category')}>Edit</button>
          </div>
          <div className="row">
            <div className="k">Details</div>
            <div className="v">
              {data.where || '—'} · severity {data.severity || 3}/5<br/>
              <span style={{ color: 'var(--exo-palette-gray-60)' }}>{data.description || '—'}</span>
            </div>
            <button className="edit" onClick={() => onJumpTo('details')}>Edit</button>
          </div>
          <div className="row">
            <div className="k">Contact</div>
            <div className="v">
              {mode === 'anonymous' && 'Anonymous · no updates'}
              {mode === 'email' && `${data.email}${data.mobile ? ' · ' + data.mobile : ''}`}
              {mode === 'signin' && 'Signed in · maya.r@example.com'}
            </div>
            <button className="edit" onClick={() => onJumpTo('contact')}>Edit</button>
          </div>
        </div>

        <div style={{
          padding: 12, font: '12px/1.5 var(--exo-font-family)', color: 'var(--exo-palette-gray-60)',
        }}>
          By submitting, you confirm this report is accurate to the best of your knowledge. False reports may delay other work.
        </div>

        <div className="cta-bar">
          <button className="btn coral" onClick={onSubmit} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit report'}
            {!submitting && <Icon name="Send" size={16} invert />}
          </button>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SCREEN: Done
// ────────────────────────────────────────────────────────────────────────────
function DoneScreen({ onRestart, mode }) {
  return (
    <div className="success-screen" data-screen-label="09 Done">
      <div className="icon"><Icon name="Check" size={36} invert /></div>
      <h1>Thanks — we've got it.</h1>
      <div className="ref">
        <Icon name="Bookmark" size={14} style={{ filter: 'invert(36%) sepia(28%) saturate(800%) hue-rotate(140deg)' }} />
        Reference {NEW_CASE.ref}
      </div>
      <p className="lede">
        Your report is on its way to the Northbridge Ward crew. {mode !== 'anonymous' && 'We’ll text and email you with updates.'}
      </p>

      <div className="eta-card">
        <div className="ico">⏱</div>
        <div className="body">
          <div className="k">Estimated response</div>
          <div className="v">{NEW_CASE.eta}</div>
          <div className="sub">Routed to {NEW_CASE.contractorName}</div>
        </div>
      </div>

      <div className="timeline">
        <h3>What happens next</h3>
        <ol>
          <li className="done">
            <div className="dot"></div>
            <div className="text">
              <div className="title">Report received</div>
              <div className="meta">Just now · automatic acknowledgement</div>
            </div>
          </li>
          <li className="current">
            <div className="dot"></div>
            <div className="text">
              <div className="title">Inspector visits</div>
              <div className="meta">Within 5 business days</div>
            </div>
          </li>
          <li className="upcoming">
            <div className="dot"></div>
            <div className="text">
              <div className="title">Work scheduled</div>
              <div className="meta">Contractor confirms date</div>
            </div>
          </li>
          <li className="upcoming">
            <div className="dot"></div>
            <div className="text">
              <div className="title">Fixed</div>
              <div className="meta">Photo of completed work shared with you</div>
            </div>
          </li>
        </ol>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
        {mode === 'anonymous' && (
          <button className="btn secondary">
            <CatIcon name="person" size={16} color="var(--exo-palette-aqua-70)" />
            Sign up to track this report
          </button>
        )}
        <button className="btn ghost" onClick={onRestart}>
          Report another problem
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  WelcomeScreen, LocationScreen, CategoryScreen, PhotoScreen, DuplicateScreen,
  DetailsScreen, ContactScreen, ReviewScreen, DoneScreen,
  ScreenHeader, CatIcon, MapBackground, MapPin,
});
