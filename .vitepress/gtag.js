const gtagID = process.env.G_MEASUREMENT_ID

const gtagConfig = [
  [
    'script',
    {
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${gtagID}`
    }
  ],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gtagID}');`
  ]
]

export default gtagConfig
