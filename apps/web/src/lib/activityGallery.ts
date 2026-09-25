// Real, per-activity photo galleries, sourced from Unsplash (free for
// commercial use under the Unsplash License) rather than self-hosted —
// hotlinking their CDN keeps the repo/build lean at hundreds of activities
// x 5 photos each. Every URL here was individually verified against a real
// Unsplash photo page; this is a big, growing dataset built country by
// country, so most activities have no entry yet and fall back to the
// category-level photo in activityPhotos.ts.
export type GalleryPhoto = {
  url: string;
  photographer: string;
  photoPageUrl: string;
};

const IMG = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

const ACTIVITY_GALLERIES: ReadonlyMap<string, GalleryPhoto[]> = new Map([
  [
    "switzerland--guided-ascent-of-the-matterhorn-h-rnli-ridge",
    [
      { url: IMG("photo-1785920612317-495e344cec0f"), photographer: "Ilia Bronskiy", photoPageUrl: "https://unsplash.com/photos/matterhorn-peak-glowing-at-sunrise-zermatt-aXAl5PJNm38" },
      { url: IMG("photo-1769407642563-8773cc64995e"), photographer: "Jouwen Wang", photoPageUrl: "https://unsplash.com/photos/snowy-mountain-path-with-matterhorn-in-the-distance-qJ9FwIQgLHI" },
      { url: IMG("photo-1597250861267-429663f244a8"), photographer: "Sylvain Mauroux", photoPageUrl: "https://unsplash.com/photos/mountaineers-climbing-rocky-mountain-ridge-m6wbWMF6p9s" },
      { url: IMG("photo-1614686454913-1e93f6f8ea1d"), photographer: "Sylvain Mauroux", photoPageUrl: "https://unsplash.com/photos/man-in-blue-jacket-and-black-pants-standing-on-snow-covered-mountain-under-blue-sky-during-OIuzDRYA3cw" },
      { url: IMG("photo-1785920715478-4a7776d21680"), photographer: "Ilia Bronskiy", photoPageUrl: "https://unsplash.com/photos/matterhorn-peak-with-clouds-in-zermatt-LqMjfkRRvuc" },
    ],
  ],
  [
    "switzerland--eiger-north-face-guided-attempt",
    [
      { url: IMG("photo-1546419793-1ee93d7cff56"), photographer: "Markus Spiske", photoPageUrl: "https://unsplash.com/photos/snow-covered-mountain-4cczA2THGt0" },
      { url: IMG("photo-1691522091696-e3aeabacf0d6"), photographer: "Hans-Jurgen Mager", photoPageUrl: "https://unsplash.com/photos/a-snow-covered-mountain-in-the-middle-of-a-cloud-filled-sky-VNrFwbSkhDs" },
      { url: IMG("photo-1597225083103-0a8b81e265ed"), photographer: "Alexander Löwe", photoPageUrl: "https://unsplash.com/photos/snow-covered-mountain-under-blue-sky-during-daytime-3l9p_NQLZ00" },
      { url: IMG("photo-1532093716743-7d850e8bd053"), photographer: "Jheng-Da Chen", photoPageUrl: "https://unsplash.com/photos/lake-with-snow-capped-mountain-background-eVwfArKrBj8" },
      { url: IMG("photo-1695721780706-083fe3692424"), photographer: "Adrien Olichon", photoPageUrl: "https://unsplash.com/photos/a-person-climbing-up-a-steep-rock-face-m_QnPi7baV8" },
    ],
  ],
  [
    "switzerland--base-jumping-lauterbrunnen-valley",
    [
      { url: IMG("photo-1630009574406-a9b21b77c015"), photographer: "Robin Ulrich", photoPageUrl: "https://unsplash.com/photos/houses-on-green-grass-field-near-mountain-under-blue-sky-during-daytime-QuZ6kOAeW2o" },
      { url: IMG("photo-1566583928854-4cbfd48fd435"), photographer: "Sol Mitnick", photoPageUrl: "https://unsplash.com/photos/green-and-black-mountains-under-white-sky-at-daytime-8n0Y9YEC9lU" },
      { url: IMG("photo-1786684937813-1f4db747840d"), photographer: "Lydia Verbeke", photoPageUrl: "https://unsplash.com/photos/grassy-hillside-between-steep-mountains-6GzOuSeMmPw" },
      { url: IMG("photo-1515179984198-74497483a356"), photographer: "Michael Lammli", photoPageUrl: "https://unsplash.com/photos/road-near-green-hill-during-daytime-XiW0Zu6yu84" },
      { url: IMG("photo-1510280781386-572b2438f88b"), photographer: "Lane Smith", photoPageUrl: "https://unsplash.com/photos/silhouette-photography-of-man-jumping-with-parachute-wEsqjsjIDLs" },
    ],
  ],
  [
    "switzerland--freeride-skiing-bec-des-rosses",
    [
      { url: IMG("photo-1633966967539-59cb8f591fe6"), photographer: "Alex Lange", photoPageUrl: "https://unsplash.com/photos/TTCArz6xDIE" },
      { url: IMG("photo-1662536240241-4b65109b33c4"), photographer: "Simon Gill", photoPageUrl: "https://unsplash.com/photos/aRbBRNUdcR4" },
      { url: IMG("photo-1767714453178-58934c7ffd93"), photographer: "Peter Burdon", photoPageUrl: "https://unsplash.com/photos/ZH65pZvb0Do" },
      { url: IMG("photo-1662536209013-844e0a8eced8"), photographer: "Simon Gill", photoPageUrl: "https://unsplash.com/photos/Sm-giwipvvo" },
      { url: IMG("photo-1717051835101-903456ccf792"), photographer: "Hendrik Morkel", photoPageUrl: "https://unsplash.com/photos/a-man-riding-skis-down-a-snow-covered-slope-tOfSrHC6n8A" },
    ],
  ],
  [
    "switzerland--bivouac-the-europaweg-past-the-charles-kuonen-suspension-bridge",
    [
      { url: IMG("photo-1757681691237-cc7c46be5353"), photographer: "Jack White", photoPageUrl: "https://unsplash.com/photos/-h-lQuE2qXk" },
      { url: IMG("photo-1506905925346-21bda4d32df4"), photographer: "Sam Ferrara", photoPageUrl: "https://unsplash.com/photos/aerial-photo-of-foggy-mountains-1527pjeb6jg" },
      { url: IMG("photo-1699103447240-a2081f40c157"), photographer: "Milosz Roman", photoPageUrl: "https://unsplash.com/photos/SZ-3QszT7hQ" },
      { url: IMG("photo-1698869944221-59b7a9d33a08"), photographer: "Milosz Roman", photoPageUrl: "https://unsplash.com/photos/N9GdXh-smXk" },
      { url: IMG("photo-1724870173195-cb2829436cd1"), photographer: "Andrei R. Popescu", photoPageUrl: "https://unsplash.com/photos/a-tent-pitched-up-on-the-side-of-a-mountain-oSON4Mg2T5A" },
    ],
  ],
  [
    "switzerland--verzasca-dam-bungee-jump",
    [
      { url: IMG("photo-1505991145681-a10ffda8dfb5"), photographer: "Joel Steinmann", photoPageUrl: "https://unsplash.com/photos/gray-bridge-surrounded-green-trees-in-landscape-photography-Q1YJrDQn4aY" },
      { url: IMG("photo-1598389332468-2591a323393e"), photographer: "Artiom Vallat", photoPageUrl: "https://unsplash.com/photos/7za7ZgKsC9A" },
      { url: IMG("photo-1650275140514-9eb0a3a80789"), photographer: "Claudio Schwarz", photoPageUrl: "https://unsplash.com/photos/K5Eh4dKDdaM" },
      { url: IMG("photo-1759084689339-5eb3b860c6df"), photographer: "Gabriel Martin", photoPageUrl: "https://unsplash.com/photos/concrete-dam-wall-with-green-forested-hills-under-blue-sky-9l0Je2XaGE8" },
      { url: IMG("photo-1559677624-3c956f10d431"), photographer: "Anoof Junaid", photoPageUrl: "https://unsplash.com/photos/J16ep2LfHwY" },
    ],
  ],
  [
    "switzerland--free-ride-downhill-mountain-biking-above-verbier",
    [
      { url: IMG("photo-1466976141595-ef0f80f1dce1"), photographer: "Jani Brumat", photoPageUrl: "https://unsplash.com/photos/Ej_rTUs5Xm0" },
      { url: IMG("photo-1603613991118-95642daecd36"), photographer: "Clement Delhaye", photoPageUrl: "https://unsplash.com/photos/ADyXnVJUyf8" },
      { url: IMG("photo-1511202090067-ebdd4642552b"), photographer: "Mark Northern", photoPageUrl: "https://unsplash.com/photos/qvk8QFyGfWA" },
      { url: IMG("photo-1490640956035-66426af34621"), photographer: "Joao Branco", photoPageUrl: "https://unsplash.com/photos/G2qp6pwgTtg" },
      { url: IMG("photo-1662536209013-844e0a8eced8"), photographer: "Simon Gill", photoPageUrl: "https://unsplash.com/photos/Sm-giwipvvo" },
    ],
  ],
  [
    "switzerland--ice-climbing-kandersteg-frozen-falls",
    [
      { url: IMG("photo-1483546024624-d2f76c1f6b56"), photographer: "Kimon Maritz", photoPageUrl: "https://unsplash.com/photos/o2B9YF7X6wI" },
      { url: IMG("photo-1705803617660-721f5d3438c5"), photographer: "José Oliveira", photoPageUrl: "https://unsplash.com/photos/a-mountain-range-with-a-body-of-water-in-the-foreground-n_GRXZYsteY" },
      { url: IMG("photo-1709517659991-58d946519556"), photographer: "Chaewool Kim", photoPageUrl: "https://unsplash.com/photos/a-man-climbing-up-the-side-of-a-frozen-waterfall-eFmXUF5HBX8" },
      { url: IMG("photo-1485872987516-ec9b00fe7a65"), photographer: "Greg Rakozy", photoPageUrl: "https://unsplash.com/photos/person-in-red-jacket-while-climbing-ice-wall-at-daytime-GbFCv3Uf2uE" },
      { url: IMG("photo-1485871882310-4ecdab8a6f94"), photographer: "Greg Rakozy", photoPageUrl: "https://unsplash.com/photos/person-wearing-red-jacket-climbing-on-glacier-zGORXMe0Wlc" },
    ],
  ],
  [
    "switzerland--canyoning-saxeten-gorge",
    [
      { url: IMG("photo-1598420488019-5285b0987fda"), photographer: "Damaris Isenschmid", photoPageUrl: "https://unsplash.com/photos/G_ZDL7a8PyM" },
      { url: IMG("photo-1598420487724-81f3807ea7c9"), photographer: "Damaris Isenschmid", photoPageUrl: "https://unsplash.com/photos/mrk_cfkqruc" },
      { url: IMG("photo-1690291900903-1bf8f6f54c50"), photographer: "Han-Hsing Tu", photoPageUrl: "https://unsplash.com/photos/K7xhZvei_EI" },
      { url: IMG("photo-1721338752673-91b7603f2ae0"), photographer: "Josh Fotheringham", photoPageUrl: "https://unsplash.com/photos/GwRlyykKg-M" },
      { url: IMG("photo-1557162563-2fe53f75ec98"), photographer: "Zhanjiang Chen", photoPageUrl: "https://unsplash.com/photos/a-canyon-or-gorge-Wuu0yaQ3O0I" },
    ],
  ],
  [
    "switzerland--paragliding-speed-flying-off-the-schilthorn",
    [
      { url: IMG("photo-1504218727796-db522606b16f"), photographer: "Leila Azevedo", photoPageUrl: "https://unsplash.com/photos/o6UVPje41Lg" },
      { url: IMG("photo-1473864942302-4e0b5f8ce743"), photographer: "Chris Herath", photoPageUrl: "https://unsplash.com/photos/t0AzlsdTSmk" },
      { url: IMG("photo-1607682181622-6577e5fb57e5"), photographer: "Neil Bates", photoPageUrl: "https://unsplash.com/photos/person-riding-on-parachute-over-snow-covered-mountain-during-daytime-2NBA3Vw7da0" },
      { url: IMG("photo-1506976697767-6c29c943ecbf"), photographer: "Jairph", photoPageUrl: "https://unsplash.com/photos/aT2jMKShKIs" },
      { url: IMG("photo-1634983353776-92d895d7be7c"), photographer: "reza hoque", photoPageUrl: "https://unsplash.com/photos/two-paragliders-are-flying-over-a-mountain-range-pFWmzkDzKM8" },
    ],
  ],
]);

export function galleryForActivity(activityId: string): GalleryPhoto[] | null {
  return ACTIVITY_GALLERIES.get(activityId) ?? null;
}
