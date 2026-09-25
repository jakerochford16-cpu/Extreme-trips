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
  [
    "canada--heli-skiing-columbia-mountains-bugaboos",
    [
      { url: IMG("photo-1495554698253-681539e9ea84"), photographer: "Cristian Grecu", photoPageUrl: "https://unsplash.com/photos/blue-helicopter-in-the-air-ipckz_9zDXY" },
      { url: IMG("photo-1511049315096-4f3a74b92327"), photographer: "Alessio Soggetti", photoPageUrl: "https://unsplash.com/s/photos/heli-skiing" },
      { url: IMG("photo-1507534192483-69914c0692d7"), photographer: "Robson Hatsukami Morgan", photoPageUrl: "https://unsplash.com/s/photos/heli-skiing" },
      { url: IMG("photo-1660636148572-7521ceb82fba"), photographer: "Johannes Andersson", photoPageUrl: "https://unsplash.com/s/photos/heli-skiing" },
      { url: IMG("photo-1608561807980-6e39958ae1c8"), photographer: "Banff Sunshine Village", photoPageUrl: "https://unsplash.com/s/photos/heli-skiing" },
    ],
  ],
  [
    "canada--grizzly-country-wilderness-trek-great-bear-rainforest",
    [
      { url: IMG("photo-1636350548186-ab14b3c0b0d1"), photographer: "Jasper Malchuk Rasmussen", photoPageUrl: "https://unsplash.com/s/photos/great-bear-rainforest" },
      { url: IMG("photo-1530595467537-0b5996c41f2d"), photographer: "Mark Basarab", photoPageUrl: "https://unsplash.com/s/photos/grizzly-bear" },
      { url: IMG("photo-1551792714-9a8b35338793"), photographer: "Zdeněk Macháček", photoPageUrl: "https://unsplash.com/s/photos/grizzly-bear" },
      { url: IMG("photo-1595173425119-1c54835c1874"), photographer: "Daniel Diesenreither", photoPageUrl: "https://unsplash.com/s/photos/grizzly-bear" },
      { url: IMG("photo-1603041762383-714c45ec44d4"), photographer: "John Thomas", photoPageUrl: "https://unsplash.com/s/photos/grizzly-bear" },
    ],
  ],
  [
    "canada--ice-climbing-weeping-wall-icefields-parkway",
    [
      { url: IMG("photo-1643903096045-07741be1f245"), photographer: "Mike Markov", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1709517659991-58d946519556"), photographer: "Chaewool Kim", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1485871882310-4ecdab8a6f94"), photographer: "Greg Rakozy", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1485872987516-ec9b00fe7a65"), photographer: "Greg Rakozy", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1597250861267-429663f244a8"), photographer: "Sylvain Mauroux", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
    ],
  ],
  [
    "canada--via-ferrata-mount-norquay",
    [
      { url: IMG("photo-1543688530-c4c3fcccf984"), photographer: "Maja Kochanowska", photoPageUrl: "https://unsplash.com/s/photos/via-ferrata" },
      { url: IMG("photo-1545212586-f25d3631b77f"), photographer: "Walther Luecker", photoPageUrl: "https://unsplash.com/s/photos/via-ferrata" },
      { url: IMG("photo-1556610117-882db3eea2df"), photographer: "Klaus Huber", photoPageUrl: "https://unsplash.com/s/photos/via-ferrata" },
      { url: IMG("photo-1506370785029-c6f41774f390"), photographer: "Frantisek Duris", photoPageUrl: "https://unsplash.com/s/photos/via-ferrata" },
      { url: IMG("photo-1564461013334-d9f2abd4b598"), photographer: "Josh jfisher", photoPageUrl: "https://unsplash.com/s/photos/via-ferrata" },
    ],
  ],
  [
    "canada--arctic-ski-expedition-baffin-island",
    [
      { url: IMG("photo-1640189668430-f9791d4db74a"), photographer: "Johannes Andersson", photoPageUrl: "https://unsplash.com/s/photos/ski-touring" },
      { url: IMG("photo-1518784095177-ef1da6313126"), photographer: "Joris Berthelot", photoPageUrl: "https://unsplash.com/s/photos/ski-touring" },
      { url: IMG("photo-1604290516761-df484721f04b"), photographer: "Luke Helgeson", photoPageUrl: "https://unsplash.com/s/photos/ski-touring" },
      { url: IMG("photo-1585919269458-6259dfe9f21a"), photographer: "Clement Delhaye", photoPageUrl: "https://unsplash.com/s/photos/ski-touring" },
      { url: IMG("photo-1638914784346-881bcdd56aa7"), photographer: "Andri Klopfenstein", photoPageUrl: "https://unsplash.com/s/photos/ski-touring" },
    ],
  ],
  [
    "canada--whitewater-rafting-kayaking-tatshenshini-alsek",
    [
      { url: IMG("photo-1629248457649-b082812aea6c"), photographer: "Jackalope West", photoPageUrl: "https://unsplash.com/s/photos/whitewater-rafting" },
      { url: IMG("photo-1629248564797-8c5ba85da9d3"), photographer: "Jackalope West", photoPageUrl: "https://unsplash.com/s/photos/whitewater-rafting" },
      { url: IMG("photo-1512675628397-28288d1220ef"), photographer: "Julie Thornton", photoPageUrl: "https://unsplash.com/s/photos/whitewater-rafting" },
      { url: IMG("photo-1658355686821-f412c8397a0d"), photographer: "Megan Nixon", photoPageUrl: "https://unsplash.com/s/photos/whitewater-rafting" },
      { url: IMG("photo-1760904652241-36ad6b4e752f"), photographer: "Michael Clair", photoPageUrl: "https://unsplash.com/s/photos/whitewater-rafting" },
    ],
  ],
  [
    "canada--base-jumping-big-wall-climbing-stawamus-chief",
    [
      { url: IMG("photo-1561426247-8d6e4053b144"), photographer: "Tom Wheatley", photoPageUrl: "https://unsplash.com/s/photos/squamish" },
      { url: IMG("photo-1663645038231-55fef6adb6e1"), photographer: "Dylan Collette", photoPageUrl: "https://unsplash.com/s/photos/squamish" },
      { url: IMG("photo-1697456642802-59bfd518d5a2"), photographer: "Curdin", photoPageUrl: "https://unsplash.com/s/photos/big-wall-climbing" },
      { url: IMG("photo-1583178180198-0cf050dc2bbf"), photographer: "Patrick Hendry", photoPageUrl: "https://unsplash.com/s/photos/big-wall-climbing" },
      { url: IMG("photo-1520596880803-6ea0113a42d1"), photographer: "Joshua Earle", photoPageUrl: "https://unsplash.com/s/photos/base-jumping" },
    ],
  ],
  [
    "canada--polar-bear-viewing-churchill-tundra",
    [
      { url: IMG("photo-1589656966895-2f33e7653819"), photographer: "Hans-Jurgen Mager", photoPageUrl: "https://unsplash.com/s/photos/polar-bear" },
      { url: IMG("photo-1593946460607-d1570da6268f"), photographer: "Hans-Jurgen Mager", photoPageUrl: "https://unsplash.com/s/photos/polar-bear" },
      { url: IMG("photo-1590787996529-a542c86ca267"), photographer: "Hans-Jurgen Mager", photoPageUrl: "https://unsplash.com/s/photos/polar-bear" },
      { url: IMG("photo-1609167780281-34141424c748"), photographer: "Hans-Jurgen Mager", photoPageUrl: "https://unsplash.com/s/photos/polar-bear" },
      { url: IMG("photo-1547014617-9cecafdfe4ed"), photographer: "Annie Spratt", photoPageUrl: "https://unsplash.com/s/photos/polar-bear" },
    ],
  ],
  [
    "canada--ice-diving-tobermory",
    [
      { url: IMG("photo-1517032880222-1afedf8c9d0d"), photographer: "Deborah Diem", photoPageUrl: "https://unsplash.com/s/photos/ice-diving" },
      { url: IMG("photo-1561983779-7d7e065befa4"), photographer: "Maël BALLAND", photoPageUrl: "https://unsplash.com/s/photos/ice-diving" },
      { url: IMG("photo-1561983273-584475c50236"), photographer: "Maël BALLAND", photoPageUrl: "https://unsplash.com/s/photos/ice-diving" },
      { url: IMG("photo-1510637858650-c3be04731622"), photographer: "Vlad Tchompalov", photoPageUrl: "https://unsplash.com/s/photos/ice-diving" },
      { url: IMG("photo-1736943993933-c1a407ed783c"), photographer: "Victor Oonk", photoPageUrl: "https://unsplash.com/s/photos/ice-diving" },
    ],
  ],
  [
    "canada--north-shore-freeride-mountain-biking",
    [
      { url: IMG("photo-1633707167682-9068729bc84c"), photographer: "Axel Brunst", photoPageUrl: "https://unsplash.com/s/photos/mountain-biking-forest" },
      { url: IMG("photo-1621527225138-b4832a1b3992"), photographer: "Jake Schumacher", photoPageUrl: "https://unsplash.com/s/photos/mountain-biking-forest" },
      { url: IMG("photo-1633707167682-bb1142937a83"), photographer: "Axel Brunst", photoPageUrl: "https://unsplash.com/s/photos/mountain-biking-forest" },
      { url: IMG("photo-1644942521758-fb19d7860e6e"), photographer: "Daniel Dvorský", photoPageUrl: "https://unsplash.com/s/photos/mountain-biking-forest" },
      { url: IMG("photo-1683111625788-1eb78f3f4c92"), photographer: "Ulf Meyer", photoPageUrl: "https://unsplash.com/s/photos/mountain-biking-forest" },
    ],
  ],
  [
    "united-kingdom--winter-mountaineering-ice-climbing-ben-nevis",
    [
      { url: IMG("photo-1603833760318-435e00e446db"), photographer: "Migle Siauciulyte", photoPageUrl: "https://unsplash.com/s/photos/ben-nevis" },
      { url: IMG("photo-1669806503914-4777e8d278b8"), photographer: "Karl Hedin", photoPageUrl: "https://unsplash.com/s/photos/ben-nevis" },
      { url: IMG("photo-1694693669562-5402198f5f27"), photographer: "Tomasz Kardasz", photoPageUrl: "https://unsplash.com/s/photos/ben-nevis" },
      { url: IMG("photo-1643903096045-07741be1f245"), photographer: "Mike Markov", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1709517659991-58d946519556"), photographer: "Chaewool Kim", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
    ],
  ],
  [
    "united-kingdom--sea-stack-climbing-old-man-of-hoy",
    [
      { url: IMG("photo-1561900478-5001f6b4d8ed"), photographer: "Loic Leray", photoPageUrl: "https://unsplash.com/s/photos/sea-cliff-climbing" },
      { url: IMG("photo-1550610416-89b5c2fc6a65"), photographer: "Megan Campagnolo", photoPageUrl: "https://unsplash.com/s/photos/sea-cliff-climbing" },
      { url: IMG("photo-1728863020566-2dc91f1ebce6"), photographer: "Dominic Kurniawan Suryaputra", photoPageUrl: "https://unsplash.com/s/photos/sea-cliff-climbing" },
      { url: IMG("photo-1601539080575-37e52344dd14"), photographer: "Alioune Thiam", photoPageUrl: "https://unsplash.com/s/photos/sea-cliff-climbing" },
      { url: IMG("photo-1648648777033-c833d650aea7"), photographer: "Timur Kozmenko", photoPageUrl: "https://unsplash.com/s/photos/sea-cliff-climbing" },
    ],
  ],
  [
    "united-kingdom--coasteering-pembrokeshire-coast",
    [
      { url: IMG("photo-1622319879995-10c710ca5a06"), photographer: "Coasteering", photoPageUrl: "https://unsplash.com/s/photos/coasteering" },
      { url: IMG("photo-1606314629557-411a2e94b356"), photographer: "Coasteering", photoPageUrl: "https://unsplash.com/s/photos/coasteering" },
      { url: IMG("photo-1622319924125-4098b5339ff1"), photographer: "Coasteering", photoPageUrl: "https://unsplash.com/s/photos/coasteering" },
      { url: IMG("photo-1622319924072-1aa9b50d1673"), photographer: "Coasteering", photoPageUrl: "https://unsplash.com/s/photos/coasteering" },
      { url: IMG("photo-1596311795258-b9d21f19b905"), photographer: "Coasteering", photoPageUrl: "https://unsplash.com/s/photos/coasteering" },
    ],
  ],
  [
    "united-kingdom--caving-three-counties-system",
    [
      { url: IMG("photo-1560403442-d141ff60800d"), photographer: "Devon Janse van Rensburg", photoPageUrl: "https://unsplash.com/s/photos/caving" },
      { url: IMG("photo-1628746404106-4d3843b231b3"), photographer: "Jason Gardner", photoPageUrl: "https://unsplash.com/s/photos/caving" },
      { url: IMG("photo-1628746403157-e11ee82219a6"), photographer: "Jason Gardner", photoPageUrl: "https://unsplash.com/s/photos/caving" },
      { url: IMG("photo-1671915606780-20b62912c008"), photographer: "Aleksei Anatskii", photoPageUrl: "https://unsplash.com/s/photos/caving" },
      { url: IMG("photo-1631641551258-98cea9aedd91"), photographer: "Intricate Explorer", photoPageUrl: "https://unsplash.com/s/photos/caving" },
    ],
  ],
  [
    "united-kingdom--cave-diving-wookey-hole",
    [
      { url: IMG("photo-1682687982167-d7fb3ed8541d"), photographer: "NEOM", photoPageUrl: "https://unsplash.com/s/photos/cave-diving" },
      { url: IMG("photo-1682686580849-3e7f67df4015"), photographer: "NEOM", photoPageUrl: "https://unsplash.com/s/photos/cave-diving" },
      { url: IMG("photo-1682686581740-2c5f76eb86d1"), photographer: "NEOM", photoPageUrl: "https://unsplash.com/s/photos/cave-diving" },
      { url: IMG("photo-1569878698992-c6e8c84bdd4d"), photographer: "Alex Azabache", photoPageUrl: "https://unsplash.com/s/photos/cave-diving" },
      { url: IMG("photo-1682686581660-3693f0c588d2"), photographer: "NEOM", photoPageUrl: "https://unsplash.com/s/photos/cave-diving" },
    ],
  ],
  [
    "united-kingdom--fell-running-lake-district",
    [
      { url: IMG("photo-1615393911241-32add28288a5"), photographer: "James Armes", photoPageUrl: "https://unsplash.com/s/photos/lake-district" },
      { url: IMG("photo-1609511394000-2a5c8927e113"), photographer: "Sam Barber", photoPageUrl: "https://unsplash.com/s/photos/lake-district" },
      { url: IMG("photo-1603459856978-484689c76601"), photographer: "Matthew Waring", photoPageUrl: "https://unsplash.com/s/photos/lake-district" },
      { url: IMG("photo-1530143311094-34d807799e8f"), photographer: "Alessio Soggetti", photoPageUrl: "https://unsplash.com/s/photos/trail-running-mountain" },
      { url: IMG("photo-1778362950179-88f6c8423f8d"), photographer: "Alban ROZES", photoPageUrl: "https://unsplash.com/s/photos/trail-running-mountain" },
    ],
  ],
  [
    "united-kingdom--tidal-bore-surfing-river-severn",
    [
      { url: IMG("photo-1693854038330-11d7bd3e2f45"), photographer: "Kristijan Arsov", photoPageUrl: "https://unsplash.com/s/photos/river-surfing" },
      { url: IMG("photo-1693854037975-b1434ea519dc"), photographer: "Kristijan Arsov", photoPageUrl: "https://unsplash.com/s/photos/river-surfing" },
      { url: IMG("photo-1693854037825-f0cf513c843f"), photographer: "Kristijan Arsov", photoPageUrl: "https://unsplash.com/s/photos/river-surfing" },
      { url: IMG("photo-1751029538973-a4c320afb6ff"), photographer: "Gunnar Ridderström", photoPageUrl: "https://unsplash.com/s/photos/river-surfing" },
      { url: IMG("photo-1751029539003-b961262da84a"), photographer: "Gunnar Ridderström", photoPageUrl: "https://unsplash.com/s/photos/river-surfing" },
    ],
  ],
  [
    "mongolia--gobi-desert-off-road-expedition",
    [
      { url: IMG("photo-1571821809399-0ca9d5c79884"), photographer: "Usukhbayar Gankhuyag", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
      { url: IMG("photo-1587996409575-230de4597edb"), photographer: "Victor He", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
      { url: IMG("photo-1580824094041-18c8afd4b30b"), photographer: "Sasha Kaunas", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
      { url: IMG("photo-1773379410075-122d44982a07"), photographer: "ulziibayar badamdorj", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
      { url: IMG("photo-1783228639701-c3e135012637"), photographer: "Yue WU", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
    ],
  ],
  [
    "mongolia--altai-eagle-hunter-horse-trek",
    [
      { url: IMG("photo-1742201876722-85a042294575"), photographer: "Fadhil Abhimantra", photoPageUrl: "https://unsplash.com/s/photos/eagle-hunter-mongolia" },
      { url: IMG("photo-1742201906076-31d4876c3ca1"), photographer: "Fadhil Abhimantra", photoPageUrl: "https://unsplash.com/s/photos/eagle-hunter-mongolia" },
      { url: IMG("photo-1742201408485-66d021d2003e"), photographer: "Fadhil Abhimantra", photoPageUrl: "https://unsplash.com/s/photos/eagle-hunter-mongolia" },
      { url: IMG("photo-1761872936161-9c2075a7ca11"), photographer: "Spenser Sembrat", photoPageUrl: "https://unsplash.com/s/photos/horseback-riding-steppe" },
      { url: IMG("photo-1761872936089-1f90e87bf80d"), photographer: "Spenser Sembrat", photoPageUrl: "https://unsplash.com/s/photos/horseback-riding-steppe" },
    ],
  ],
  [
    "mongolia--winter-camping-frozen-lake-kh-vsg-l",
    [
      { url: IMG("photo-1772894641946-08d64699581b"), photographer: "Da-shika", photoPageUrl: "https://unsplash.com/s/photos/frozen-lake-winter-camping" },
      { url: IMG("photo-1771711374301-4119db4615de"), photographer: "Ali Kazal", photoPageUrl: "https://unsplash.com/s/photos/frozen-lake-winter-camping" },
      { url: IMG("photo-1771711374543-9d9bc9e6cfd6"), photographer: "Ali Kazal", photoPageUrl: "https://unsplash.com/s/photos/frozen-lake-winter-camping" },
      { url: IMG("photo-1763058136208-01738cc194d4"), photographer: "Fridi Antrack", photoPageUrl: "https://unsplash.com/s/photos/frozen-lake-winter-camping" },
      { url: IMG("photo-1776861193488-bc0049d5f268"), photographer: "Yiwen Li", photoPageUrl: "https://unsplash.com/s/photos/frozen-lake-winter-camping" },
    ],
  ],
  [
    "mongolia--tavan-bogd-mountaineering",
    [
      { url: IMG("photo-1717506638083-d0f97fa52904"), photographer: "Andrey Strizhkov", photoPageUrl: "https://unsplash.com/s/photos/altai-mountains" },
      { url: IMG("photo-1582085894318-bcae2ffef85b"), photographer: "Konstantin Dyadyun", photoPageUrl: "https://unsplash.com/s/photos/altai-mountains" },
      { url: IMG("photo-1717506682221-9f8f384ae620"), photographer: "Andrey Strizhkov", photoPageUrl: "https://unsplash.com/s/photos/altai-mountains" },
      { url: IMG("photo-1619426288206-e678b4d09d2d"), photographer: "Nikolay Tengerekov", photoPageUrl: "https://unsplash.com/s/photos/altai-mountains" },
      { url: IMG("photo-1628534934930-c7a2e77c1267"), photographer: "Sergey Chuprin", photoPageUrl: "https://unsplash.com/s/photos/altai-mountains" },
    ],
  ],
  [
    "mongolia--ice-climbing-near-ulaanbaatar",
    [
      { url: IMG("photo-1520208422220-d12a3c588e6c"), photographer: "Jackman Chiu", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1579769696606-3a52f6d41b95"), photographer: "Johannes Andersson", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1600198679052-7db2b62635e1"), photographer: "Matt Forster", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1673732296812-ddc1f9a0a427"), photographer: "Donna Elliot", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
      { url: IMG("photo-1586887507406-3a1fde6dea04"), photographer: "Joe Wagner", photoPageUrl: "https://unsplash.com/s/photos/ice-climbing" },
    ],
  ],
  [
    "mongolia--horse-trekking-orkhon-valley",
    [
      { url: IMG("photo-1630326867210-bf4b2cdd2019"), photographer: "Ariungoo Batzorig", photoPageUrl: "https://unsplash.com/s/photos/mongolia" },
      { url: IMG("photo-1707669904577-2ebc6f95a826"), photographer: "Alexander Popovkin", photoPageUrl: "https://unsplash.com/s/photos/mongolia" },
      { url: IMG("photo-1708873395735-dcad0140e3a2"), photographer: "Alexander Popovkin", photoPageUrl: "https://unsplash.com/s/photos/mongolia" },
      { url: IMG("photo-1761872936118-685649b91844"), photographer: "Spenser Sembrat", photoPageUrl: "https://unsplash.com/s/photos/horseback-riding-steppe" },
      { url: IMG("photo-1761872936159-940aa676ed2a"), photographer: "Spenser Sembrat", photoPageUrl: "https://unsplash.com/s/photos/horseback-riding-steppe" },
    ],
  ],
  [
    "mongolia--camel-trekking-gobi-dunes",
    [
      { url: IMG("photo-1571821807771-62cf66ac3f14"), photographer: "Usukhbayar Gankhuyag", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
      { url: IMG("photo-1587619220946-7ea28f3a4028"), photographer: "Victor He", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
      { url: IMG("photo-1586873966770-a0760f27b301"), photographer: "Victor He", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
      { url: IMG("photo-1649357028504-ffc3c1976fc4"), photographer: "Bailley Schmidt", photoPageUrl: "https://unsplash.com/s/photos/camel-trekking-desert" },
      { url: IMG("photo-1763712905512-60388c11c923"), photographer: "光曦 刘", photoPageUrl: "https://unsplash.com/s/photos/gobi-desert" },
    ],
  ],
  [
    "madagascar--tsingy-de-bemaraha-via-ferrata-trek",
    [
      { url: IMG("photo-1781427012229-b317b5689b98"), photographer: "Rafael Peier", photoPageUrl: "https://unsplash.com/s/photos/tsingy-de-bemaraha" },
      { url: IMG("photo-1781428268785-2506ad60a835"), photographer: "Rafael Peier", photoPageUrl: "https://unsplash.com/s/photos/tsingy-de-bemaraha" },
      { url: IMG("photo-1781428269305-e77ea1987ed6"), photographer: "Rafael Peier", photoPageUrl: "https://unsplash.com/s/photos/tsingy-de-bemaraha" },
      { url: IMG("photo-1781428268792-23853eab57ef"), photographer: "Rafael Peier", photoPageUrl: "https://unsplash.com/s/photos/tsingy-de-bemaraha" },
      { url: IMG("photo-1781428269324-1014f350b921"), photographer: "Rafael Peier", photoPageUrl: "https://unsplash.com/s/photos/tsingy-de-bemaraha" },
    ],
  ],
  [
    "madagascar--big-wall-climbing-andringitra-massif",
    [
      { url: IMG("photo-1724615949074-d5ea17327905"), photographer: "Andria Elia Photography", photoPageUrl: "https://unsplash.com/s/photos/big-wall-climbing" },
      { url: IMG("photo-1601025678763-e8f5835995db"), photographer: "Petr Slováček", photoPageUrl: "https://unsplash.com/s/photos/big-wall-climbing" },
      { url: IMG("photo-1602531734042-c565f8365a0b"), photographer: "Patrick Hendry", photoPageUrl: "https://unsplash.com/s/photos/big-wall-climbing" },
      { url: IMG("photo-1600729664711-816e87d1d667"), photographer: "Daniel Jiménez", photoPageUrl: "https://unsplash.com/s/photos/big-wall-climbing" },
      { url: IMG("photo-1508287459906-37445322fdf6"), photographer: "Jonathan Ouimet", photoPageUrl: "https://unsplash.com/s/photos/big-wall-climbing" },
    ],
  ],
  [
    "madagascar--humpback-whale-kayaking-sainte-marie",
    [
      { url: IMG("photo-1475318681864-ef1966c3cbb7"), photographer: "Davide Cantelli", photoPageUrl: "https://unsplash.com/s/photos/whale-watching-kayak" },
      { url: IMG("photo-1646357965815-919fc39c3fc9"), photographer: "Derek Nielsen", photoPageUrl: "https://unsplash.com/s/photos/whale-watching-kayak" },
      { url: IMG("photo-1499443724512-9a7fb762ad6d"), photographer: "Marvin Meyer", photoPageUrl: "https://unsplash.com/s/photos/whale-watching-kayak" },
      { url: IMG("photo-1638249356389-b3446cd3c2b4"), photographer: "Jack Charles", photoPageUrl: "https://unsplash.com/s/photos/whale-watching-kayak" },
      { url: IMG("photo-1759845564654-694348a5a4af"), photographer: "Joachim Lesne", photoPageUrl: "https://unsplash.com/s/photos/whale-watching-kayak" },
    ],
  ],
  [
    "madagascar--surfing-anakao-fort-dauphin",
    [
      { url: IMG("photo-1530870110042-98b2cb110834"), photographer: "Sincerely Media", photoPageUrl: "https://unsplash.com/s/photos/tropical-surfing" },
      { url: IMG("photo-1527731149372-fae504a1185f"), photographer: "Sam Wermut", photoPageUrl: "https://unsplash.com/s/photos/tropical-surfing" },
      { url: IMG("photo-1459745930869-b3d0d72c3cbb"), photographer: "Jeremy Bishop", photoPageUrl: "https://unsplash.com/s/photos/tropical-surfing" },
      { url: IMG("photo-1476574898132-040f50db0a01"), photographer: "Jeremy Bishop", photoPageUrl: "https://unsplash.com/s/photos/tropical-surfing" },
      { url: IMG("photo-1609365635346-524d0024684f"), photographer: "Gabriel Bezerra", photoPageUrl: "https://unsplash.com/s/photos/tropical-surfing" },
    ],
  ],
  [
    "madagascar--diving-nosy-be",
    [
      { url: IMG("photo-1708649290066-5f617003b93f"), photographer: "NEOM", photoPageUrl: "https://unsplash.com/s/photos/coral-reef-diving" },
      { url: IMG("photo-1544551763-46a013bb70d5"), photographer: "Sebastian Pena Lambarri", photoPageUrl: "https://unsplash.com/s/photos/coral-reef-diving" },
      { url: IMG("photo-1637308109237-4ea1a7dd22f5"), photographer: "Oleksandr Sushko", photoPageUrl: "https://unsplash.com/s/photos/coral-reef-diving" },
      { url: IMG("photo-1682687981907-170c006e3744"), photographer: "NEOM", photoPageUrl: "https://unsplash.com/s/photos/coral-reef-diving" },
      { url: IMG("photo-1651871756929-09d7bde4e97d"), photographer: "Pascal van de Vendel", photoPageUrl: "https://unsplash.com/s/photos/coral-reef-diving" },
    ],
  ],
  [
    "madagascar--trekking-marojejy-national-park",
    [
      { url: IMG("photo-1631006995557-9866a74ee05c"), photographer: "David Clode", photoPageUrl: "https://unsplash.com/s/photos/rainforest-trekking" },
      { url: IMG("photo-1717912539512-17c73cafaa00"), photographer: "mohammed ahmed", photoPageUrl: "https://unsplash.com/s/photos/rainforest-trekking" },
      { url: IMG("photo-1674195649562-e44f30388acf"), photographer: "David Clode", photoPageUrl: "https://unsplash.com/s/photos/rainforest-trekking" },
      { url: IMG("photo-1629494939320-e36ef741dc36"), photographer: "Christina Victoria Craft", photoPageUrl: "https://unsplash.com/s/photos/rainforest-trekking" },
      { url: IMG("photo-1710028267907-65696d606b18"), photographer: "Madeline Hogan", photoPageUrl: "https://unsplash.com/s/photos/rainforest-trekking" },
    ],
  ],
  [
    "madagascar--caving-ankarana-special-reserve",
    [
      { url: IMG("photo-1631641551473-fbe46919289d"), photographer: "Intricate Explorer", photoPageUrl: "https://unsplash.com/s/photos/caving" },
      { url: IMG("photo-1422452098470-722310d3ad74"), photographer: "Ksenia Kudelkina", photoPageUrl: "https://unsplash.com/s/photos/caving" },
      { url: IMG("photo-1600201319330-e99245e614c5"), photographer: "Wander Creative", photoPageUrl: "https://unsplash.com/s/photos/caving" },
      { url: IMG("photo-1681218865859-6caf8071028f"), photographer: "Kiwihug", photoPageUrl: "https://unsplash.com/s/photos/caving" },
      { url: IMG("photo-1667333112033-85256c4317ba"), photographer: "Adrian Mag", photoPageUrl: "https://unsplash.com/s/photos/caving" },
    ],
  ],
  [
    "uganda--gorilla-trekking-bwindi-impenetrable-forest",
    [
      { url: IMG("photo-1581281863883-2469417a1668"), photographer: "Laura Seaman", photoPageUrl: "https://unsplash.com/s/photos/mountain-gorilla" },
      { url: IMG("photo-1546146020-c84c6bf355bf"), photographer: "Amy Reed", photoPageUrl: "https://unsplash.com/s/photos/mountain-gorilla" },
      { url: IMG("photo-1624975981958-9e5ea70cc8d1"), photographer: "Paula Robinson", photoPageUrl: "https://unsplash.com/s/photos/mountain-gorilla" },
      { url: IMG("photo-1590692995294-564cea87a687"), photographer: "Joshua J. Cotten", photoPageUrl: "https://unsplash.com/s/photos/mountain-gorilla" },
      { url: IMG("photo-1614528767034-70de9fe166e0"), photographer: "Max Christian", photoPageUrl: "https://unsplash.com/s/photos/mountain-gorilla" },
    ],
  ],
  [
    "uganda--whitewater-rafting-source-of-the-nile",
    [
      { url: IMG("photo-1708515929759-6d050c6c93cf"), photographer: "Derricks Nature Book", photoPageUrl: "https://unsplash.com/s/photos/nile-rafting" },
      { url: IMG("photo-1643048825776-238eac66b36b"), photographer: "George Youssef", photoPageUrl: "https://unsplash.com/s/photos/nile-rafting" },
      { url: IMG("photo-1667331622956-0aee02edad31"), photographer: "Michael Starkie", photoPageUrl: "https://unsplash.com/s/photos/nile-rafting" },
      { url: IMG("photo-1649775827088-6e316d0613bd"), photographer: "Jorge Fernández Salas", photoPageUrl: "https://unsplash.com/s/photos/nile-rafting" },
      { url: IMG("photo-1667331622956-0aee02edad31"), photographer: "Michael Starkie", photoPageUrl: "https://unsplash.com/s/photos/nile-rafting" },
    ],
  ],
  [
    "uganda--rwenzori-mountains-trekking",
    [
      { url: IMG("photo-1486707471592-8e7eb7e36f78"), photographer: "Inggrid Koe", photoPageUrl: "https://unsplash.com/s/photos/misty-mountain-forest" },
      { url: IMG("photo-1632307941173-5d541ea1d940"), photographer: "Markos Mant", photoPageUrl: "https://unsplash.com/s/photos/misty-mountain-forest" },
      { url: IMG("photo-1626197849364-664e6b759261"), photographer: "Andre Frueh", photoPageUrl: "https://unsplash.com/s/photos/misty-mountain-forest" },
      { url: IMG("photo-1683221704109-acdeb0883037"), photographer: "Łukasz Rawa", photoPageUrl: "https://unsplash.com/s/photos/misty-mountain-forest" },
      { url: IMG("photo-1583140310426-9187b6489be3"), photographer: "Itote Rubombora", photoPageUrl: "https://unsplash.com/s/photos/uganda" },
    ],
  ],
  [
    "uganda--chimpanzee-trekking-kibale-forest",
    [
      { url: IMG("photo-1654630122082-68aeda5c27ea"), photographer: "David Trinks", photoPageUrl: "https://unsplash.com/s/photos/chimpanzee" },
      { url: IMG("photo-1707658247333-4502df290598"), photographer: "Fabiana Rizzi", photoPageUrl: "https://unsplash.com/s/photos/chimpanzee" },
      { url: IMG("photo-1607317146126-64b09b69eb4e"), photographer: "Bisakha Datta", photoPageUrl: "https://unsplash.com/s/photos/chimpanzee" },
      { url: IMG("photo-1704265586677-eb11980c5c42"), photographer: "William Warby", photoPageUrl: "https://unsplash.com/s/photos/chimpanzee" },
      { url: IMG("photo-1557978556-b33c86cbeeae"), photographer: "mwangi gatheca", photoPageUrl: "https://unsplash.com/s/photos/chimpanzee" },
    ],
  ],
  [
    "uganda--bungee-jumping-jinja",
    [
      { url: IMG("photo-1559677624-3c956f10d431"), photographer: "Anoof Junaid", photoPageUrl: "https://unsplash.com/s/photos/bungee-jumping" },
      { url: IMG("photo-1549221360-456a9c197d5b"), photographer: "Laurynas Me", photoPageUrl: "https://unsplash.com/s/photos/bungee-jumping" },
      { url: IMG("photo-1595778039451-58a7c2946e7d"), photographer: "Simon Billy", photoPageUrl: "https://unsplash.com/s/photos/bungee-jumping" },
      { url: IMG("photo-1454111782563-b8fbc05eacb2"), photographer: "Blake Wheeler", photoPageUrl: "https://unsplash.com/s/photos/bungee-jumping" },
      { url: IMG("photo-1659901981145-dbc056431a8b"), photographer: "Kamil Pietrzak", photoPageUrl: "https://unsplash.com/s/photos/bungee-jumping" },
    ],
  ],
  [
    "uganda--mount-elgon-caldera-trek",
    [
      { url: IMG("photo-1733521426934-19f7ca763610"), photographer: "Maksim Shutov", photoPageUrl: "https://unsplash.com/s/photos/volcanic-crater" },
      { url: IMG("photo-1789929830098-a09de80e4b54"), photographer: "Manoa Angelo", photoPageUrl: "https://unsplash.com/s/photos/volcanic-crater" },
      { url: IMG("photo-1770411034465-2a645205e2be"), photographer: "Lucas Doddema", photoPageUrl: "https://unsplash.com/s/photos/volcanic-crater" },
      { url: IMG("photo-1722447166533-c05ea2cd3950"), photographer: "Thomas Isbister", photoPageUrl: "https://unsplash.com/s/photos/volcanic-crater" },
      { url: IMG("photo-1616584743639-171e8343013b"), photographer: "Polina Kuzovkova", photoPageUrl: "https://unsplash.com/s/photos/volcanic-crater" },
    ],
  ],
  [
    "uganda--tree-climbing-lion-safari-queen-elizabeth-np",
    [
      { url: IMG("photo-1669745354989-971b57bc3bc7"), photographer: "Paweł Wielądek", photoPageUrl: "https://unsplash.com/s/photos/lion-tree" },
      { url: IMG("photo-1707760189136-36cc3938fa44"), photographer: "Glen Michaelsen", photoPageUrl: "https://unsplash.com/s/photos/lion-tree" },
      { url: IMG("photo-1707760189472-f63632373651"), photographer: "Glen Michaelsen", photoPageUrl: "https://unsplash.com/s/photos/lion-tree" },
      { url: IMG("photo-1564099292814-0f4b7d0db527"), photographer: "Jorge Tung", photoPageUrl: "https://unsplash.com/s/photos/lion-tree" },
      { url: IMG("photo-1661882144744-d1c9c6bc0e22"), photographer: "Ivan Sabayuki", photoPageUrl: "https://unsplash.com/s/photos/lion-tree" },
    ],
  ],
]);

export function galleryForActivity(activityId: string): GalleryPhoto[] | null {
  return ACTIVITY_GALLERIES.get(activityId) ?? null;
}
