/* ─────────────────────────────────────────────────────────────
   Bharat Vision Automation — site content
   All copy is carried over from the original website; only the
   presentation changes in v2.
───────────────────────────────────────────────────────────── */

export const COMPANY = {
  name: 'Bharat Vision Automation',
  short: 'BVA',
  since: 1975,
  address: ['39, Madhav Estate, Nr. Odhav Circle,', 'S-P Ring Road, Ahmedabad-382415'],
  phones: ['+91 94263 25462', '+91 94086 56168'],
  emails: ['bharatvisionautomation.sales@gmail.com', 'info@bharatvisionautomation.com'],
  hours: ['Mon – Sat: 9:00 AM – 6:00 PM', 'Sunday: Closed'],
  mapUrl: 'https://maps.google.com/?q=39+Madhav+Estate+Odhav+Circle+Ahmedabad',
}

const img = (p) => `/images/${p}`
const enc = (folder, file) => `/images/${folder}/${encodeURIComponent(file)}`

/* ── Machines ───────────────────────────────────────────── */
const COMMON_SPECS = {
  load: '4 amp. approx',
  power: '415 volt, 3 phase',
  air: '4 to 6 kg/cm²',
}

const ROTARY_FLOW = [
  { t: 'Hopper', d: 'Operator fills material into the hopper.' },
  { t: 'Elevator', d: 'Material is elevated to the rotary vibrator.' },
  { t: 'Rotary vibrator', d: 'Parts are oriented and fed to the feeder conveyor.' },
  { t: 'Pick-up roller', d: 'Perfect timing for every image capture on the rotary.' },
  { t: '6 HD cameras', d: '4 cameras on the rotary inspect the front, 2 inspect the bottom.' },
  { t: 'Air-nozzle rejection', d: 'Rejected parts are blown out at the rejection station.' },
  { t: 'Good-piece crate', d: 'Accepted pieces move on for further process.' },
]

export const PRODUCTS = [
  {
    slug: 'rubber-stopper-sorting-machine',
    name: 'Rubber Stopper Sorting Machine',
    short: 'Rubber Stopper',
    model: 'CRI-500',
    tagline: 'Fully automatic rubber stopper inspection at 500 pieces a minute.',
    img: img('banner/6.png'),
    photo: img('banner/22.jpg'),
    hmi: img('banner/23.png'),
    catalogue: img('catalogue/CRI 500.pdf'),
    throughput: 30000,
    unit: 'stoppers / hr',
    cameras: 6,
    industries: ['pharmaceutical', 'cosmetics', 'automobile'],
    desc: [
      'This is a fully automatic rubber stopper inspection machine. The overall body of the machine is made from stainless steel and the upper portion is covered by a glass cabinet which prevents dust from entering the machine.',
      'The operator fills material into the hopper. Material is then elevated to the rotary vibrator through the elevator, which feeds the feeder conveyor. Stoppers are then fed to the rotary, where a pick-up roller mechanism gives perfect timing to capture each image.',
      'Work is done by 6 high-definition cameras — 4 situated on the rotary inspect the front side of the stopper, the other 2 inspect the bottom side. Rejected stoppers are removed through an air nozzle; accepted pieces go to the good-piece crate. All of this runs on a high-speed 500 ppm state-of-the-art mechanism.',
    ],
    defects: ['Disc Cut', 'Cup Cut', 'Burr', 'Eccentricity', 'White Spot', 'Black Spot', 'Unfilled', 'Intensity'],
    dims: '2000 × 1100 × 1900 mm',
    weight: '1000 kg (approx.)',
    flow: ROTARY_FLOW,
  },
  {
    slug: 'rubber-disc-sorting-machine',
    name: 'Rubber Disc Sorting Machine',
    short: 'Rubber Disc',
    model: 'RDI-01',
    tagline: 'Fully automatic 30,000 discs per hour rubber disc inspection.',
    img: img('banner/8.png'),
    photo: img('banner/29.jpg'),
    hmi: img('banner/28.jpg'),
    catalogue: img('catalogue/RDI 500.pdf'),
    throughput: 30000,
    unit: 'discs / hr',
    cameras: 5,
    industries: ['pharmaceutical', 'cosmetics', 'automobile'],
    desc: [
      'This is a fully automatic rubber disc inspection machine. The full body is made from stainless steel and a glass cabinet. The operator feeds material into the hopper, and it is then elevated for uniform positioning before each disc lands on a glass plate.',
      'Work is done by 5 high-definition cameras: the 1st inspects the front of the disc, the 2nd inspects the bottom, and the other 3 inspect the side edges.',
      'Material then moves forward to three stations — major defects are rejected through an air nozzle, minor defects are rejected at the second station, and all good pieces are collected at the good-piece station for further process.',
    ],
    defects: ['White Spot', 'Black Spot', 'Flash / Burr', 'Cut', 'Unfilled'],
    dims: '2000 × 1100 × 1900 mm',
    weight: '1000 kg (approx.)',
    flow: [
      { t: 'Hopper', d: 'Operator feeds rubber discs into the hopper.' },
      { t: 'Elevator', d: 'Discs are elevated for uniform positioning.' },
      { t: 'Glass plate', d: 'Each disc lands on a transparent glass plate.' },
      { t: '5 HD cameras', d: 'Front, bottom and three side-edge cameras.' },
      { t: 'Major defects', d: 'Rejected through an air nozzle.' },
      { t: 'Minor defects', d: 'Separated at the second station.' },
      { t: 'Good pieces', d: 'Collected for further process.' },
    ],
  },
  {
    slug: 'plastic-cap-sorting-machine',
    name: 'Plastic Cap Sorting Machine',
    short: 'Plastic Cap',
    model: 'PCBI-2501',
    tagline: 'Fully automatic 60,000 caps per hour plastic cap inspection.',
    img: img('banner/9.png'),
    photo: img('banner/24.jpg'),
    hmi: img('banner/25.png'),
    catalogue: img('catalogue/PCI.pdf'),
    throughput: 60000,
    unit: 'caps / hr',
    cameras: 6,
    industries: ['pharmaceutical', 'cosmetics'],
    desc: [
      'The Plastic Cap Sorting Machine is a fully automatic high-speed inspection machine. The overall body is made from stainless steel and the upper portion is covered by a glass cabinet which prevents dust from entering the machine.',
      'Material is filled into the hopper, elevated to the rotary vibrator and fed to the feeder conveyor. A pick-up roller mechanism gives perfect timing to capture each image as caps pass across 6 high-definition cameras — front and bottom.',
      'Rejected caps are removed at the rejection station through an air nozzle, accepted pieces go to the good-piece crate. The whole process runs on a high-speed 1000 ppm state-of-the-art mechanism.',
    ],
    defects: ['Oil Mark', 'Black Spot', 'Moulding Defect', 'Vertical Flash', 'Horizontal Flash', 'Cut'],
    dims: '2000 × 1100 × 1900 mm',
    weight: '1000 kg (approx.)',
    flow: ROTARY_FLOW,
  },
  {
    slug: 'empty-glass-vial-sorting-machine',
    name: 'Empty Glass Vial Sorting Machine',
    short: 'Glass Vial',
    model: 'EGVI-250',
    tagline: 'Full-body and neck inspection of empty glass vials before filling.',
    img: img('banner/11.png'),
    photo: img('banner/30.jpg'),
    hmi: img('banner/31.jpg'),
    catalogue: img('catalogue/EGVI 250.pdf'),
    throughput: 15000,
    unit: 'vials / hr',
    cameras: 4,
    industries: ['pharmaceutical'],
    desc: [
      'This is a fully automatic vial inspection machine. The full body is made with stainless steel and the upper portion is covered by a glass cabinet. The operator feeds material to the conveyor belt.',
      'Material moves forward through a worm-screw mechanism and is picked up by a turret whose gripper holds the vial. Vials then travel to a star-plate assembly — in between, 2 high-definition cameras capture the whole body of the vial.',
      'The vial ejector then releases the vial on the star plate, where the neck is inspected by another two cameras. Rejected vials are picked up by plate no. 2 and accepted vials go to further process through plate no. 3.',
    ],
    defects: ['Neck Inspection', 'Moulding Defects', 'Crack', 'Foreign Particle'],
    dims: '2000 × 1100 × 1900 mm',
    weight: '1000 kg (approx.)',
    flow: [
      { t: 'Conveyor feed', d: 'Operator feeds vials onto the conveyor belt.' },
      { t: 'Worm screw', d: 'Vials are spaced and moved forward.' },
      { t: 'Turret gripper', d: 'A gripper picks and holds each vial.' },
      { t: 'Body cameras', d: '2 HD cameras capture the whole vial body.' },
      { t: 'Neck cameras', d: '2 more cameras inspect the neck on the star plate.' },
      { t: 'Plate no. 2', d: 'Rejected vials are picked away.' },
      { t: 'Plate no. 3', d: 'Accepted vials continue to filling.' },
    ],
  },
  {
    slug: 'logo-sorting-machine',
    name: 'Logo Sorting Machine',
    short: 'Logo Sorting',
    model: 'A CI01',
    tagline: 'Conveyor-mounted logo & print inspection during assembly or dispatch.',
    img: img('banner/12.png'),
    photo: img('banner/1.png'),
    hmi: img('banner/33.png'),
    catalogue: img('catalogue/LOGO.pdf'),
    throughput: 60000,
    unit: 'pieces / hr',
    cameras: 1,
    industries: ['pharmaceutical', 'cosmetics'],
    desc: [
      'This is a logo inspection system. The whole system is situated on a conveyor belt, and works during the assembly process or the dispatch process.',
      'When caps run on the conveyor belt, a camera-based vision system grabs defects such as logo mismatch, dented borders, particles and more. When a piece comes under the camera, it is inspected and a result is given instantly.',
      'Defective pieces are rejected through a nozzle and accepted pieces go on for further process. Dimensions and weight are built as per application.',
    ],
    defects: ['Particle Inspection', 'Eccentricity', 'Logo Sorting', 'Border Inspection'],
    dims: 'As per application',
    weight: 'As per application',
    flow: [
      { t: 'Conveyor', d: 'Caps run on the conveyor during assembly or dispatch.' },
      { t: 'Camera station', d: 'Each piece is imaged as it passes under the camera.' },
      { t: 'Result', d: 'Logo, border and particle checks return a verdict.' },
      { t: 'Nozzle rejection', d: 'Defective pieces are rejected through a nozzle.' },
      { t: 'Accepted', d: 'Good pieces continue for further process.' },
    ],
  },
  {
    slug: 'slotted-rubber-stopper-sorting-machine',
    name: 'Slotted Rubber Stopper Sorting Machine',
    short: 'Slotted Stopper',
    model: 'SRI-20500',
    tagline: 'High-speed slotted rubber stopper inspection on a 1000 ppm mechanism.',
    img: img('banner/13.png'),
    photo: img('banner/26.jpg'),
    hmi: img('banner/27.jpg'),
    catalogue: img('catalogue/SRI500.pdf'),
    throughput: 30000,
    unit: 'stoppers / hr',
    cameras: 6,
    industries: ['pharmaceutical', 'automobile'],
    desc: [
      'This is a fully automatic high-speed slotted rubber stopper inspection machine. The overall body is made from stainless steel and the upper portion is covered by a glass cabinet which prevents dust from entering the machine.',
      'Material is filled into the hopper, elevated to the rotary vibrator and fed to the feeder conveyor, then onto the rotary. A pick-up roller mechanism gives perfect timing to capture each image.',
      '6 high-definition cameras do the work — 4 on the rotary inspect the front side, 2 inspect the bottom. Rejected stoppers leave through an air nozzle; accepted pieces go to the good-piece crate. All on a high-speed 1000 ppm mechanism.',
    ],
    defects: ['Disc Cut', 'Cup Cut', 'Burr', 'Eccentricity', 'White Spot', 'Black Spot', 'Unfilled', 'Intensity'],
    dims: '2000 × 1100 × 1900 mm',
    weight: '1000 kg (approx.)',
    flow: ROTARY_FLOW,
  },
].map((p, i) => ({ ...p, index: String(i + 1).padStart(2, '0'), specs: { ...COMMON_SPECS } }))

export const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug)

/* ── Components we inspect ─────────────────────────────── */
const INSPECTION_FILES = [
  ['1.Rubber Disc.png', 'pharmaceutical'],
  ['2.Rubber stopper .png', 'pharmaceutical'],
  ['3.Rubber stopper Blood Collection.png', 'pharmaceutical'],
  ['4.Slotted rubber stopper.png', 'pharmaceutical'],
  ['5.Flip off Seal.png', 'pharmaceutical'],
  ['6.Glass Vials.png', 'pharmaceutical'],
  ['7.plastic Cap.png', 'cosmetics'],
  ['8.Plastic Shoulder.png', 'cosmetics'],
  ['9.Flip-Top Screw Cap.png', 'cosmetics'],
  ['10.Conical Caps.png', 'cosmetics'],
  ['11.Plastic White Bottle Caps.png', 'cosmetics'],
  ['12.Seal Cap.png', 'cosmetics'],
  ['Aluminium Caps Without Septa.png', 'pharmaceutical'],
  ['Aluminium_cap.png', 'pharmaceutical'],
]

const prettyName = (file) =>
  file
    .replace(/^\d+\./, '')
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .replace(/[_-]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

export const INSPECTION_ITEMS = [
  ...INSPECTION_FILES.map(([file, industry]) => ({
    name: prettyName(file),
    src: enc('inspection', file),
    industry,
  })),
  ...['Bearings.png', 'Fasteners.png', 'Nuts.png', 'O Rings.png', 'Washers.png'].map((file) => ({
    name: prettyName(file),
    src: enc('products/Automobile', file),
    industry: 'automobile',
  })),
]

/* ── Industries ─────────────────────────────────────────── */
export const INDUSTRIES = [
  {
    slug: 'pharmaceutical',
    name: 'Pharmaceutical',
    title: 'Pharmaceutical',
    kicker: 'Advanced vision-based inspection for the pharmaceutical industry',
    summary:
      'Precision machine vision inspection for rubber stoppers, glass vials, plastic caps and seals — ensuring product safety, regulatory compliance and zero-defect quality assurance.',
    hero: img('banner/14.jpg'),
    overview: [
      'Advanced vision inspection solutions for pharmaceutical industry quality control and compliance. Our machines are purpose-built to meet the most stringent pharmaceutical manufacturing standards, ensuring every component that enters your production line is defect-free.',
      'From rubber stoppers and glass vials to plastic caps and aluminium seals, our inspection systems detect dimensional deviations, surface defects, contamination and visual anomalies with sub-millimetre precision.',
    ],
    capsTitle: 'Built for regulated lines',
    caps: [
      { t: 'GMP Grade', d: 'Machines built to Good Manufacturing Practice guidelines — stainless steel bodies and dust-proof glass cabinets.' },
      { t: 'Zero Contamination', d: 'Foreign particle, crack and neck inspection for critical drug packaging components.' },
      { t: 'Full Traceability', d: 'Live pass / fail counts, recipe management and saved inspection images on every HMI.' },
      { t: 'Multi-Camera Coverage', d: 'Up to 6 HD cameras per machine inspect front, bottom and side edges of every part.' },
    ],
    components: [
      'Aluminium Cap.png', 'Aluminium Caps Without Septa.png', 'Capsules-Aluminium.png', 'Closure Rubber.png', 'Flip off Seal.png',
      'Glass Vials.png', 'Rubber Disc.png', 'Rubber Stopper Blood Collection.png', 'Rubber Stopper.png', 'Slotted Rubber stopper.png',
    ].map((f) => ({ name: prettyName(f), src: enc('products/Pharmaceutical', f) })),
    cta: 'Ready to enhance your pharmaceutical quality control?',
  },
  {
    slug: 'cosmetics',
    name: 'Cosmetics',
    title: 'Cosmetics',
    kicker: 'Precision quality control for cosmetics manufacturing',
    summary:
      'Advanced vision inspection for cosmetics packaging — detecting surface defects, dimensional variations and print errors to maintain premium brand quality and consumer trust.',
    hero: img('banner/15.jpg'),
    overview: [
      'In the cosmetics industry, packaging quality directly impacts brand perception. Our machine vision systems deliver end-to-end quality assurance for cosmetics packaging components — from cap sorting and logo verification to label inspection and surface finish analysis.',
      'Our inspection systems are engineered to handle the diverse shapes, materials and complexity of cosmetics packaging while maintaining throughput rates that match the fastest production lines.',
    ],
    capsTitle: 'What our cameras catch',
    caps: [
      { t: 'Logo Verification', d: 'Detect missing, misaligned or incorrect logos on packaging at full production speed.' },
      { t: 'Colour Inspection', d: 'Identify colour deviations and inconsistencies across batches of cosmetic packaging.' },
      { t: 'Surface Defects', d: 'Detect scratches, dents, contamination and surface blemishes on caps and containers.' },
      { t: 'Print Quality', d: 'Verify text legibility, barcode readability and label placement accuracy.' },
      { t: 'Dimensional Check', d: 'Ensure caps and closures meet precise dimensional tolerances for proper sealing.' },
      { t: 'Assembly Integrity', d: 'Verify correct assembly of multi-component cosmetic packaging closures.' },
    ],
    components: [
      'Conical Caps.png', 'Flip-Top Screw Cap.png', 'pilfer-proof-caps.webp', 'plastic Cap.png', 'Plastic Shoulder.png',
      'Plastic White Bottle Caps.png', 'screw-child-caps.webp', 'Seal Cap.png',
    ].map((f) => ({ name: prettyName(f), src: enc('products/Cosmetics', f) })),
    cta: 'Ready to perfect your cosmetics quality control?',
  },
  {
    slug: 'automobile',
    name: 'Automobile',
    title: 'Automobile',
    kicker: 'Advanced vision systems for automotive manufacturing',
    summary:
      'High-speed automated vision systems for automotive components — detecting surface defects, dimensional deviations and assembly errors to achieve zero-defect production standards.',
    hero: img('banner/3.jpg'),
    overview: [
      'The automotive industry demands zero-defect quality control at scale. Our machine vision inspection systems are engineered to meet these demands, delivering high-speed, accurate inspection of rubber, plastic and metal components used throughout vehicle manufacturing.',
      'From rubber grommets and seals to bearings, fasteners and washers, our systems detect surface defects, dimensional deviations and assembly errors in real time — ensuring only perfect parts proceed down your line.',
    ],
    capsTitle: 'Inspection capabilities',
    caps: [
      { t: 'Surface Defect Detection', d: 'Identify micro-cracks, scratches, pitting and blemishes on metal and rubber parts at line speed.' },
      { t: 'Dimensional Verification', d: 'Verify components meet exact tolerances — critical where precision prevents failures.' },
      { t: 'Assembly Verification', d: 'Ensure correct assembly of multi-component sub-assemblies before they move down the line.' },
      { t: 'High-Speed Sorting', d: 'Pneumatic rejection removes defective parts instantly, without interrupting production flow.' },
    ],
    components: ['Bearings.png', 'Fasteners.png', 'Nuts.png', 'O Rings.png', 'Washers.png'].map((f) => ({
      name: prettyName(f),
      src: enc('products/Automobile', f),
    })),
    cta: 'Ready to enhance your automotive quality control?',
  },
]

export const industryBySlug = (slug) => INDUSTRIES.find((i) => i.slug === slug)

/* ── Home ───────────────────────────────────────────────── */
export const STATS = [
  { value: 255, suffix: '+', label: 'Projects successfully done' },
  { value: 79, suffix: '+', label: 'Clients served nationwide' },
  { value: 17, suffix: '+', label: 'States across India' },
  { value: 50, suffix: '+', label: 'Years of experience' },
]

export const PROCESS = [
  { n: '01', t: 'Image Capture', d: 'High-resolution cameras capture every unit at production speed.' },
  { n: '02', t: 'Processing', d: 'Intelligent algorithms analyse each image in milliseconds.' },
  { n: '03', t: 'Defect Detection', d: 'Cracks, spots, flash marks and dimensional errors are found.' },
  { n: '04', t: 'Classification', d: 'Every unit is classified — pass or reject.' },
  { n: '05', t: 'Auto Ejection', d: 'Air nozzles remove defective units instantly.' },
  { n: '06', t: 'Quality Report', d: 'Live pass / fail counts and batch reports on the HMI.' },
]

export const SOLUTIONS = [
  {
    t: 'High-Speed Inspection Systems',
    d: 'Advanced inspection technology capable of processing thousands of units per minute with millisecond response times, ensuring zero compromise on production throughput while maintaining exceptional accuracy. Intelligent algorithms continuously learn and adapt to detect even the smallest defects, reducing false positives across all production batches.',
    img: img('banner/10.png'),
  },
  {
    t: 'Real-Time Quality Analytics',
    d: 'Comprehensive monitoring and reporting systems that provide instant insights into production quality, enabling proactive decision-making and continuous process improvement. Precision sorting automatically classifies and separates products based on quality parameters, eliminating manual sorting errors.',
    img: img('banner/23.png'),
  },
]

export const WHY = [
  { n: '01', t: 'Advanced Technology', d: 'State-of-the-art vision systems with AI capabilities and high-definition multi-camera defect detection.', m: 'Up to 6 HD cameras' },
  { n: '02', t: 'Customized Solutions', d: 'Tailored systems for your specific part, defect types and production throughput — from a single conveyor station to a full line.', m: '100% custom built' },
  { n: '03', t: 'Expert Support', d: 'Dedicated technical support, on-site installation, training and maintenance from our engineering team.', m: 'Pan-India service' },
  { n: '04', t: 'Proven Track Record', d: 'Trusted by 79+ pharmaceutical, cosmetics and automobile companies across 17+ Indian states.', m: '255+ projects' },
]

/* ── About ──────────────────────────────────────────────── */
export const ABOUT = {
  intro: [
    'We specialise in the design, manufacturing and solution of automated machine vision inspection systems. These systems include material handling, machine control and rejected-part sorting in conjunction with cameras. Since 1975 we have supplied a wide range of machine vision solutions to manufacturing customers in the pharmaceutical, packaging, medical device and automotive industries.',
    'We are one of the few Indian sorting machinery manufacturers with such an extensive infrastructure for fabricating machinery and spares. Our 3 dedicated plants with advanced machinery give us the flexibility to respond to any requirement or challenge. Our rapid pace of growth — averaging over 50% every year — means we are expanding regularly and can scale up as required.',
  ],
  values: [
    { t: 'Quality First', img: img('banner/17.png'), d: 'Quality is our top priority. With strong manufacturing expertise and premium-quality spare parts, we ensure every machine delivers exceptional performance, durability and reliability.' },
    { t: 'Customer First', img: img('banner/18.jpg'), d: 'Our customers are the foundation of our success. We focus on dependable service, quick-response support and tailored solutions — maintaining transparency, trust and continuous assistance.' },
    { t: 'Expert Team', img: img('banner/19.jpg'), d: 'Our team of skilled engineers and dedicated service professionals works with precision and efficiency to ensure the highest quality standards in every machine we deliver.' },
  ],
  vision:
    'To become a global leader in advanced machine vision and inspection automation solutions — delivering high-quality, technologically advanced machinery combined with innovative and reliable solutions that help our customers enhance productivity, precision and operational excellence.',
  mission:
    'To deliver superior quality machine vision inspection systems and innovative automation solutions that effectively meet the evolving needs of our customers — through continuous improvement, advanced technological development and precision engineering.',
  expertise: [
    { t: 'Custom System Engineering', d: 'Fully customised inspection and automation systems tailored to specific industrial and production requirements.' },
    { t: 'AI & Smart Analytics', d: 'AI-driven technologies and intelligent algorithms for accurate defect detection and real-time analysis.' },
    { t: 'Advanced Imaging & Optics', d: 'High-resolution cameras, precision optical components and advanced lighting for superior image clarity.' },
    { t: 'Seamless Integration', d: 'Smooth integration with existing production lines for efficient workflow automation and minimal downtime.' },
  ],
  smart: [
    { l: 'S', t: 'Specific', d: 'We design fully customised inspection and automation systems tailored to specific industrial and production requirements, ensuring precision, reliability and efficiency.' },
    { l: 'M', t: 'Measurable', d: 'AI-driven technologies and intelligent algorithms enable accurate defect detection, real-time analysis and enhanced quality-control performance.' },
    { l: 'A', t: 'Attainable', d: 'High-resolution cameras, precision optical components and advanced lighting deliver superior image clarity and highly accurate results.' },
    { l: 'R', t: 'Relevant', d: 'Smooth integration with existing production lines enables efficient workflow automation, reduced downtime and optimised manufacturing.' },
    { l: 'T', t: 'Timely', d: 'Projects delivered on schedule with rapid deployment — minimal disruption to your operations and the highest quality standards throughout.' },
  ],
  tech: [
    { t: 'Advanced Image Processing', d: 'Cutting-edge algorithms for accurate defect detection with sub-pixel precision.' },
    { t: 'Deep Learning Integration', d: 'Neural networks for complex pattern recognition and adaptive inspection.' },
    { t: 'High-Speed Processing', d: 'Real-time inspection at production speeds with minimal latency.' },
  ],
  journey: [
    { y: '1975', t: 'The Foundation', d: 'Bharat Vision Automation was established with a bold vision to design, manufacture and deliver automated machine vision inspection systems to Indian manufacturing — starting with the pharmaceutical and packaging sectors.', tags: ['Founded', 'Pharmaceutical', 'Packaging'] },
    { y: '1990s', t: 'Infrastructure Expansion', d: 'Expanded manufacturing capabilities with three dedicated plants and advanced machinery — one of the few Indian manufacturers able to fabricate machinery and spares in-house, now serving automotive and medical device industries.', tags: ['3 Plants', 'Automotive', 'Medical Device'] },
    { y: '2005', t: 'Camera Vision Integration', d: 'Integrated high-resolution camera systems and advanced machine vision technology. Our inspection solutions became the benchmark for defect detection on pharmaceutical and packaging lines across India.', tags: ['Camera Systems', 'Vision Tech', 'Defect Detection'] },
    { y: '2015', t: 'Full Automation Era', d: 'Achieved 50%+ annual growth with comprehensive automation. Advanced material handling, machine control and rejected-part sorting were deployed across all major Indian industries.', tags: ['50%+ Growth', 'Full Automation', 'Industry Leader'] },
    { y: 'Today', t: 'Nationwide Excellence', d: 'With 255+ projects delivered, 79+ satisfied clients and operations across 17+ states, Bharat Vision Automation is a trusted name in machine vision inspection.', tags: ['255+ Projects', '79+ Clients', '17+ States'] },
  ],
}

/* ── Navigation ─────────────────────────────────────────── */
export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Visual Inspection Machines', to: '/products', menu: 'machines' },
  { label: 'We Inspect', to: '/we-inspect', menu: 'industries' },
  { label: 'About', to: '/about' },
]
