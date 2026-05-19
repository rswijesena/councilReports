// riverland-app.jsx — root for the Report a Problem prototype

const { useState: useAS, useEffect: useAE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "ai": true,
  "showPlumbing": true,
  "skipWelcome": false,
  "dark": false
}/*EDITMODE-END*/;

const SCREEN_ORDER = ['welcome', 'location', 'category', 'photo', 'duplicate', 'details', 'contact', 'review', 'done'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useAS(t.skipWelcome ? 'location' : 'welcome');
  const [authChoice, setAuthChoice] = useAS('anonymous');   // anonymous | signin (chosen on welcome)
  const [contactMode, setContactMode] = useAS('anonymous'); // anonymous | email | signin (on contact step)
  const [formData, setFormData] = useAS({
    category: '',
    photoCaptured: false,
    aiResult: null,
    where: '',
    severity: 3,
    description: '',
    impact: '',
    email: '',
    mobile: '',
  });
  const [submitting, setSubmitting] = useAS(false);
  const [submitProgress, setSubmitProgress] = useAS(null);
  const [plumbingEvent, setPlumbingEvent] = useAS(null);

  function setField(key, value) { setFormData(prev => ({ ...prev, [key]: value })); }

  function go(target) {
    setScreen(target);
  }

  function triggerPlumbing(eventKey) {
    if (!t.showPlumbing) return;
    if (!PLUMBING[eventKey]) return;
    setPlumbingEvent({ ...PLUMBING[eventKey], _k: Date.now() });
  }

  function start(choice) {
    setAuthChoice(choice);
    setContactMode(choice === 'signin' ? 'signin' : 'anonymous');
    go('location');
  }

  function submit() {
    setSubmitting(true);
    triggerPlumbing('submit');
    setSubmitProgress(PLUMBING.submit);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitProgress(null);
      go('done');
    }, 4400);
  }

  function restart() {
    setFormData({
      category: '', photoCaptured: false, aiResult: null,
      where: '', severity: 3, description: '', impact: '', email: '', mobile: '',
    });
    setContactMode(authChoice === 'signin' ? 'signin' : 'anonymous');
    go(t.skipWelcome ? 'location' : 'welcome');
  }

  // Apply theme as inline class on the iOS device wrapper too
  const dark = t.dark;

  return (
    <div className="stage">
      <div className="stage-wrap">
        {/* Narration column */}
        <div className="narration">
          <div className="badge-line">Boomi customer prototype</div>
          <h2>Riverland City <strong>Report a problem</strong></h2>
          <p>
            A mobile-first citizen reporting app. AI classifies the issue from the photo,
            checks for nearby duplicates, and routes to the right repair crew —
            all orchestrated by the Boomi platform.
          </p>
          <div className="step-list">
            {SCREEN_ORDER.map((s, i) => {
              if (s === 'welcome' && t.skipWelcome) return null;
              const stepMeta = STEPS.find(x => x.id === s);
              const currentIdx = SCREEN_ORDER.indexOf(screen);
              const myIdx = SCREEN_ORDER.indexOf(s);
              return (
                <div
                  key={s}
                  className={`item ${myIdx < currentIdx ? 'done' : ''} ${myIdx === currentIdx ? 'current' : ''}`}
                  onClick={() => myIdx < currentIdx && go(s)}
                  style={{ cursor: myIdx <= currentIdx ? 'pointer' : 'default', opacity: myIdx > currentIdx ? .6 : 1 }}
                >
                  <span className="num"><span>{i + 1}</span></span>
                  <span>{stepMeta?.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phone */}
        <IOSDevice width={402} height={874} dark={dark}>
          <div className="phone-body" style={{ background: dark ? '#1f1f1f' : '#fff' }}>
            {screen === 'welcome'   && <WelcomeScreen   onStart={start} />}
            {screen === 'location'  && <LocationScreen  onNext={() => go('category')}  onBack={() => go(t.skipWelcome ? 'location' : 'welcome')} triggerPlumbing={triggerPlumbing} />}
            {screen === 'category'  && <CategoryScreen
              value={formData.category}
              onChange={(v) => setField('category', v)}
              onNext={() => go('photo')}
              onBack={() => go('location')}
              aiSuggested={formData.aiResult ? formData.aiResult.category : null}
            />}
            {screen === 'photo'     && <PhotoScreen
              captured={formData.photoCaptured}
              setCaptured={(v) => setField('photoCaptured', v)}
              aiResult={formData.aiResult}
              setAiResult={(v) => { setField('aiResult', v); if (v && !formData.category) setField('category', v.category); }}
              onAcceptAI={() => { setField('category', formData.aiResult?.category || 'pothole'); }}
              onNext={() => go('duplicate')}
              onBack={() => go('category')}
              triggerPlumbing={triggerPlumbing}
              aiEnabled={t.ai}
            />}
            {screen === 'duplicate' && <DuplicateScreen
              onLinkExisting={() => go('contact')}
              onNew={() => go('details')}
              onBack={() => go('photo')}
              triggerPlumbing={triggerPlumbing}
            />}
            {screen === 'details'   && <DetailsScreen
              data={formData} setField={setField}
              onNext={() => go('contact')}
              onBack={() => go('duplicate')}
              aiEnabled={t.ai}
            />}
            {screen === 'contact'   && <ContactScreen
              data={formData} setField={setField}
              mode={contactMode} setMode={setContactMode}
              onNext={() => go('review')}
              onBack={() => go('details')}
            />}
            {screen === 'review'    && <ReviewScreen
              data={formData} mode={contactMode}
              onJumpTo={(s) => go(s)}
              onSubmit={submit}
              onBack={() => go('contact')}
              submitting={submitting}
            />}
            {screen === 'done'      && <DoneScreen onRestart={restart} mode={contactMode} />}

            {submitting && submitProgress && <SubmitModal event={submitProgress} />}
          </div>
        </IOSDevice>
      </div>

      {plumbingEvent && <PlumbingToast event={plumbingEvent} onDone={() => setPlumbingEvent(null)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="AI" />
        <TweakToggle
          label="Riverland AI"
          value={t.ai}
          onChange={(v) => setTweak('ai', v)}
        />

        <TweakSection label="Demo" />
        <TweakToggle
          label="Show Boomi plumbing"
          value={t.showPlumbing}
          onChange={(v) => setTweak('showPlumbing', v)}
        />
        <TweakToggle
          label="Skip welcome screen"
          value={t.skipWelcome}
          onChange={(v) => setTweak('skipWelcome', v)}
        />

        <TweakSection label="Theme" />
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={(v) => setTweak('dark', v)}
        />
      </TweaksPanel>
    </div>
  );
}

// ─── Submit modal (inside phone) ──────────────────────────────────────────
function SubmitModal({ event }) {
  const [activeIdx, setActiveIdx] = useAS(0);
  const steps = event.steps;
  useAE(() => {
    const ids = [];
    steps.forEach((_, i) => {
      ids.push(setTimeout(() => setActiveIdx(i + 1), (i + 1) * 700));
    });
    return () => ids.forEach(clearTimeout);
  }, []);
  return (
    <div className="modal-bg">
      <div className="modal-card">
        <h3>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--exo-palette-aqua-60)', display: 'inline-block', animation: 'plumbing-pulse 1.6s infinite ease-in-out' }}></span>
          Submitting…
        </h3>
        {steps.map((s, i) => {
          const state = i < activeIdx ? 'done' : i === activeIdx ? 'running' : 'pending';
          return (
            <div key={i} className={`step-line ${state}`}>
              <div className="icon"></div>
              <div className="text">{s.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Plumbing toast (re-used component, defined here for isolation) ───────
function PlumbingToast({ event, onDone }) {
  const [activeIdx, setActiveIdx] = useAS(0);
  const steps = event.steps;
  useAE(() => {
    setActiveIdx(0);
    const ids = [];
    steps.forEach((_, i) => ids.push(setTimeout(() => setActiveIdx(i + 1), (i + 1) * 700)));
    const close = setTimeout(() => onDone && onDone(), steps.length * 700 + 2400);
    ids.push(close);
    return () => ids.forEach(clearTimeout);
  }, [event._k]);
  return (
    <div className="plumbing-toast">
      <div className="head">
        <span className="pulse"></span>
        Boomi · {event.title}
      </div>
      {steps.map((s, i) => {
        const state = i < activeIdx ? 'done' : i === activeIdx ? 'running' : 'pending';
        return (
          <div key={i} className={`step-line ${state}`}>
            <div className="icon"><Icon name={s.icon} size={11} /></div>
            <div className="text">{s.text}</div>
            {state === 'running' && <div className="spin"></div>}
            {state === 'done' && <Icon name="Check" size={12} invert style={{ opacity: .8 }} />}
          </div>
        );
      })}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
