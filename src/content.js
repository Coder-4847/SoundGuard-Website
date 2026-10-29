// All editable copy for the SoundGuard site lives here.
// Change words, the price, the contact link, the team or the feature list
// and rebuild. No animation code needs to be touched.

export const content = {
  brand: 'SoundGuard',

  // ---- Price & contact ------------------------------------------------------
  price: 276, // number only
  currency: 'AED',
  priceNote: 'One-time price. No subscription.',
  // Replace with your real address / form link. Examples:
  //   'mailto:team@yourschool.example?subject=SoundGuard'
  //   'https://forms.gle/your-form'
  contactHref: 'mailto:hello@example.com?subject=SoundGuard',
  cta: 'Get SoundGuard',

  site: {
    title: 'SoundGuard · Make quiet visible',
    description:
      'SoundGuard is a classroom noise monitor for KG1 to Grade 3 classrooms and school libraries. It shows how loud the room is, so the room can fix itself. Built by students at GEMS Modern Academy.',
    themeColor: '#0A1020',
  },

  nav: [
    { label: 'How it works', href: '#how' },
    { label: 'Features', href: '#features' },
    { label: 'Price', href: '#price' },
  ],

  // ---- Hero ----------------------------------------------------------------
  hero: {
    headline: 'Make quiet visible.',
    sub: 'SoundGuard is a classroom noise monitor that shows how loud the room is, and lets the room fix itself.',
    secondary: 'See how it works',
    lcd: ['Threshold 70 dB', 'OK'],
    scroll: 'Scroll',
  },

  // ---- The problem ---------------------------------------------------------
  problem: {
    eyebrow: 'The problem',
    // Wrap one word in *asterisks* to colour it with the accent.
    lines: [
      'Young classrooms are loud.',
      'Teachers shouldn’t have to be the volume control.',
      'Nobody can fix a level they can’t *see*.',
    ],
  },

  // ---- How it works --------------------------------------------------------
  how: {
    eyebrow: 'How it works',
    title: 'From the room to the reaction.',
    steps: [
      {
        title: 'Listen',
        text: 'A laptop already in the room picks up the sound with its microphone.',
      },
      {
        title: 'Measure',
        text: 'The SoundGuard web app turns it into a live decibel reading on a gauge.',
      },
      {
        title: 'Send',
        text: 'The reading travels to the unit over the USB cable.',
      },
      {
        title: 'React',
        text: 'If the room is louder than your threshold, the LCD shows ALARM!, the LEDs flash and the buzzer sounds.',
      },
    ],
  },

  // ---- Live demo -----------------------------------------------------------
  demo: {
    eyebrow: 'Try it',
    title: 'Turn the room up. Watch it react.',
    caption: 'Simulation. The real unit works the same way.',
    thresholdLabel: 'Threshold',
    noiseLabel: 'Room noise',
    makeNoise: 'Make some noise',
    stopNoise: 'Stop',
    silence: 'Silence',
    soundOn: 'Sound on',
    soundOff: 'Sound off',
    status: {
      ok: 'The room is below the threshold.',
      near: 'Getting close to the threshold.',
      alarm: 'Too loud. LEDs flash and the buzzer sounds.',
      silenced: 'Silenced. It re-arms once the room goes quiet.',
    },
  },

  // ---- Features ------------------------------------------------------------
  features: {
    eyebrow: 'Features',
    title: 'Everything in plain sight.',
    items: [
      {
        icon: 'gauge',
        title: 'Live decibel gauge',
        text: 'A live gauge and a scrolling chart in the web app show how loud the room is, right now.',
      },
      {
        icon: 'sliders',
        title: 'Adjustable threshold',
        text: 'Set the limit anywhere from 30 to 110 dB with the knob, or jump to a preset with the remote.',
      },
      {
        icon: 'bell',
        title: 'Clear alerts',
        text: 'When the room gets too loud, the LEDs flash and the buzzer sounds.',
      },
      {
        icon: 'mute',
        title: 'Easy silence',
        text: 'Press the Silence button or “0” on the remote. It re-arms after the room has gone quiet.',
      },
      {
        icon: 'display',
        title: 'Always-visible LCD',
        text: 'The LCD shows the current threshold in dB and the status: OK, ALARM! or SILENCED.',
      },
      {
        icon: 'tune',
        title: 'Calibration tool',
        text: 'Adjust the readings for your room and your laptop’s microphone, right in the web app.',
      },
    ],
  },

  // ---- Control -------------------------------------------------------------
  control: {
    eyebrow: 'Control',
    title: 'Dial it in. Or tap a preset.',
    knobLabel: 'Threshold',
    knobNote: 'Turn the knob to set any level from 30 to 110 dB.',
    remoteNote: 'Buttons 1, 2 and 3 on the remote jump to preset thresholds.',
  },

  // ---- Who it's for --------------------------------------------------------
  audience: {
    eyebrow: 'Who it’s for',
    title: 'Built for calm, shared spaces.',
    items: [
      {
        icon: 'class',
        title: 'Classrooms',
        text: 'For KG1 to Grade 3, where a clear signal works better than another request for quiet.',
      },
      {
        icon: 'book',
        title: 'Libraries',
        text: 'A visible reminder to keep voices low, without staff having to speak up.',
      },
      {
        icon: 'team',
        title: 'School teams',
        text: 'A simple, consistent way to keep noise in check across shared spaces.',
      },
    ],
  },

  // ---- What you need -------------------------------------------------------
  need: {
    eyebrow: 'What you need',
    title: 'Works with the laptop you already have.',
    intro:
      'SoundGuard measures sound through your laptop’s microphone, so the laptop stays in the room, connected to the unit. Here is everything it takes.',
    items: [
      {
        icon: 'laptop',
        title: 'A laptop with Chrome or Edge',
        text: 'The web app runs in Chrome or Edge on a laptop.',
      },
      {
        icon: 'usb',
        title: 'A USB cable',
        text: 'Included in the box. It connects the unit to the laptop.',
      },
      {
        icon: 'port',
        title: 'A free USB port',
        text: 'One free port on the laptop is all the unit needs.',
      },
      {
        icon: 'mic',
        title: 'Microphone permission',
        text: 'Allow the browser to use the microphone when it asks.',
      },
    ],
  },

  // ---- Price ---------------------------------------------------------------
  pricing: {
    eyebrow: 'Price',
    included: {
      title: 'What’s included',
      items: [
        'SoundGuard unit with LCD, LEDs and buzzer',
        'Threshold knob',
        'Power and silence buttons',
        'Infrared remote',
        'USB cable',
        'Access to the SoundGuard web app',
      ],
    },
    also: {
      title: 'What you also need',
      items: ['A laptop with Chrome or Edge and a free USB port'],
    },
  },

  // ---- FAQ -----------------------------------------------------------------
  faq: {
    eyebrow: 'Questions',
    title: 'Good questions.',
    items: [
      {
        q: 'Does it need a laptop?',
        a: 'Yes. The laptop’s microphone picks up the sound, and the SoundGuard web app turns it into a decibel reading and sends it to the unit over USB. Use Chrome or Edge on a laptop.',
      },
      {
        q: 'How is sound measured?',
        a: 'The web app listens through your laptop’s microphone and uses the browser’s Web Audio API to produce a decibel reading. A calibration tool in the web app lets you adjust the readings for your room. SoundGuard is designed to make classroom noise visible, not to be a certified measuring instrument.',
      },
      {
        q: 'Can I change the loudness limit?',
        a: 'Yes. Turn the knob to set the threshold anywhere from 30 to 110 dB, or press 1, 2 or 3 on the remote to jump to a preset. The LCD always shows the current threshold.',
      },
      {
        q: 'Can I silence it?',
        a: 'Yes. Press the Silence button on the unit, or 0 on the remote. The buzzer and LEDs stop. The alarm re-arms once the room has gone quiet and then gets loud again.',
      },
      {
        q: 'Which browsers does it work in?',
        a: 'Chrome or Edge, on a laptop. That is what the web app is built for.',
      },
      {
        q: 'How do I power it?',
        a: 'Connect the unit to your laptop with the included USB cable, then press the power button on the unit.',
      },
    ],
  },

  // ---- Built by students ---------------------------------------------------
  team: {
    eyebrow: 'The team',
    title: 'Built by students.',
    story: [
      'SoundGuard began as an idea in our MYP 4 Entrepreneurship in Practice class at GEMS Modern Academy: help young classrooms see their own noise.',
      'Then the hardware pushed back. The first microphone modules we tried could not measure sound the way we needed. So we rebuilt the sound input as a web app that uses the microphone of a laptop already in the room, and kept the Arduino-based unit as the part everyone can see and hear.',
    ],
    members: [
      { name: 'Agastya', role: 'Collaboration and Finance Manager' },
      { name: 'Dhruv', role: 'Technology and Media Specialist' },
      { name: 'Reyhan', role: 'Researcher' },
      { name: 'Puneeth', role: 'Product Manager' },
      { name: 'Ettan', role: 'Project Manager' },
    ],
    // Drop these files into public/assets/ and they appear automatically.
    images: [
      { file: 'concept.jpg', alt: 'An early concept sketch of the SoundGuard unit.' },
      { file: 'prototype.jpg', alt: 'An early build of the SoundGuard unit on a desk.' },
    ],
  },

  // ---- Footer --------------------------------------------------------------
  footer: {
    line: 'Built by students at GEMS Modern Academy, MYP 4 Entrepreneurship in Practice',
    contact: 'Get in touch',
    top: 'Back to top',
  },
}
