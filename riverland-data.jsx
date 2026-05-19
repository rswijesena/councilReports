// riverland-data.jsx — content for the Riverland City Council Report a Problem app

const COUNCIL = {
  name: 'Riverland City',
  tagline: 'Council services',
  defaultSuburb: 'Mawson Heights',
  defaultPostcode: 5040,
  state: 'SA',
  helpline: '1300 555 040',
};

const STEPS = [
  { id: 'welcome',  label: 'Welcome' },
  { id: 'location', label: 'Where is it?' },
  { id: 'category', label: 'What’s wrong?' },
  { id: 'photo',    label: 'Take a photo' },
  { id: 'duplicate',label: 'Anyone else?' },
  { id: 'details',  label: 'Details' },
  { id: 'contact',  label: 'Your details' },
  { id: 'review',   label: 'Review' },
  { id: 'done',     label: 'Done' },
];

// Categories — Australian council-friendly
const CATEGORIES = [
  { id: 'pothole',     label: 'Pothole',           hint: 'Road or footpath surface',  iconSvg: 'pothole'   },
  { id: 'streetlight', label: 'Broken streetlight', hint: 'Out, flickering, damaged', iconSvg: 'streetlight' },
  { id: 'tipping',     label: 'Illegal dumping',   hint: 'Rubbish on public land',    iconSvg: 'tipping'   },
  { id: 'graffiti',    label: 'Graffiti',          hint: 'Tagging, vandalism',        iconSvg: 'graffiti'  },
  { id: 'vehicle',     label: 'Abandoned vehicle', hint: 'Untaxed, unmoved car',      iconSvg: 'vehicle'   },
  { id: 'vegetation',  label: 'Overgrown verge',   hint: 'Trees, weeds, branches',    iconSvg: 'tree'      },
  { id: 'drainage',    label: 'Drainage / flooding', hint: 'Blocked drain, water pooling', iconSvg: 'water' },
  { id: 'pavement',    label: 'Damaged pavement',  hint: 'Cracked or uneven',         iconSvg: 'paving'    },
  { id: 'park',        label: 'Park / playground', hint: 'Damaged equipment',          iconSvg: 'park'      },
  { id: 'other',       label: 'Something else',    hint: 'We’ll route it',        iconSvg: 'other'     },
];

// What the AI agent "sees" when a photo is captured (faked for the demo)
const AI_PHOTO_ANALYSIS = {
  category: 'pothole',
  summary: 'Looks like a **pothole** on a sealed road, roughly **30 × 22 cm**, around **5 cm deep**. The depth is enough to damage a tyre.',
  chips: ['Pothole', 'Sealed road', '~30 × 22 cm', '~5 cm deep'],
  confidence: 0.94,
};

// Suggested AI rewrite of the user's description
const AI_DESCRIPTION_REWRITE = (raw) => {
  // Improve user prose: expand abbreviations, add context
  if (!raw || !raw.trim()) {
    return 'Large pothole on the road surface at the corner of Mawson Drive and Henley Road. Around 30cm wide and 5cm deep. Cars are swerving to avoid it. Hazardous for cyclists especially in low light.';
  }
  return raw + ' This is becoming hazardous, particularly for cyclists and motorbikes, and should be inspected.';
};

// A nearby existing case to surface in the duplicate-check step
const NEARBY_EXISTING_CASE = {
  ref: 'RVR-2026-08203',
  title: 'Pothole on Mawson Dr',
  reportedAgo: '3 days ago',
  reports: 4,
  status: 'Inspection scheduled',
  distance: '38 m from your pin',
};

// Generated when the report is submitted
const NEW_CASE = {
  ref: 'RVR-2026-08471',
  category: 'Pothole',
  location: 'Mawson Dr / Henley Rd, Mawson Heights SA',
  eta: 'Inspection within 5 business days',
  contractorName: 'Boral Asphalt · Adelaide North',
  ward: 'Northbridge Ward',
};

// Boomi plumbing reveal events
const PLUMBING = {
  location: {
    title: 'Resolving location',
    steps: [
      { text: 'Geocode pin · OpenStreetMap',            icon: 'Home' },
      { text: 'Match to GIS ward · Northbridge',        icon: 'CubeAlt' },
      { text: 'Resolve responsible team via DataHub',   icon: 'PlugsConnected' },
      { text: 'Routing ready',                          icon: 'Check' },
    ],
  },
  photo: {
    title: 'AI classification',
    steps: [
      { text: 'Image to Agentstudio · classify-issue',  icon: 'Ai' },
      { text: 'Detect category · estimate dimensions',  icon: 'Robot' },
      { text: 'Cross-check categories with confidence', icon: 'Filter' },
      { text: 'Result · pothole (94%)',                 icon: 'Check' },
    ],
  },
  duplicate: {
    title: 'Duplicate detection',
    steps: [
      { text: 'Query nearby open cases · DataHub',      icon: 'CubeAlt' },
      { text: 'Filter by radius 100m + category',       icon: 'Filter' },
      { text: 'Found 1 match · RVR-2026-08203',         icon: 'PlugsConnected' },
    ],
  },
  submit: {
    title: 'Submitting report',
    steps: [
      { text: 'Validate payload',                       icon: 'Check' },
      { text: 'Write case to DataHub',                  icon: 'CubeAlt' },
      { text: 'Dispatch to contractor via Integration', icon: 'PlugsConnected' },
      { text: 'Publish event · case.created',           icon: 'Lightning' },
      { text: 'Text confirmation to resident',          icon: 'Send' },
    ],
  },
};

Object.assign(window, {
  COUNCIL, STEPS, CATEGORIES, AI_PHOTO_ANALYSIS, AI_DESCRIPTION_REWRITE,
  NEARBY_EXISTING_CASE, NEW_CASE, PLUMBING,
});
