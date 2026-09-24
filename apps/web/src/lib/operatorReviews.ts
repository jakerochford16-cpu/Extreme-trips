// Real, verified third-party review links for activities where we've
// confirmed the specific operator and that they have a genuine, dedicated
// TripAdvisor listing (not a generic attraction page shared with other
// operators, and not a scraped/estimated rating). We deliberately link out
// rather than mirror a star rating + review count in our own copy: those
// numbers change as new reviews land, and a stale or wrong number here
// would be worse than none — same reasoning as the guide-link search
// fallback in guideLinks.ts and the "only mark sponsored once paid" rule
// in sponsorships.ts. Add an entry only once you've personally confirmed
// the linked page is that specific operator's own listing.
const OPERATOR_REVIEWS: ReadonlyMap<string, { company: string; url: string }> = new Map([
  [
    "new-zealand--nevis-swing-free-fall-canyon-swing",
    {
      company: "AJ Hackett Bungy NZ",
      url: "https://www.tripadvisor.com/Attraction_Review-g255122-d1018220-Reviews-AJ_Hackett_Bungy_New_Zealand-Queenstown_Otago_Region_South_Island.html",
    },
  ],
  [
    "norway--svalbard-wilderness-expedition-polar-bear-country",
    {
      company: "Basecamp Explorer Spitsbergen",
      url: "https://www.tripadvisor.com/Attraction_Review-g503715-d10782627-Reviews-Basecamp_Explorer_Spitsbergen-Longyearbyen_Spitsbergen_Svalbard.html",
    },
  ],
  [
    "peru--sandboarding-huacachina-dunes",
    {
      company: "trueXperiences",
      url: "https://www.tripadvisor.com/Attraction_Review-g304040-d26224396-Reviews-TrueXperiences_Tours_en_Ica_Paracas_y_Nazca-Ica_Ica_Region.html",
    },
  ],
  [
    "south-africa--great-white-shark-cage-diving-gansbaai",
    {
      company: "White Shark Diving Company",
      url: "https://www.tripadvisor.com/Attraction_Review-g472522-d1102254-Reviews-White_Shark_Diving_Company-Gansbaai_Overstrand_Overberg_District_Western_Cape.html",
    },
  ],
  [
    "iceland--ice-cave-exploring-vatnaj-kull",
    {
      company: "Local Guide of Vatnajökull",
      url: "https://www.tripadvisor.com/Attraction_Review-g12344476-d1966806-Reviews-Local_Guide_of_Vatnajokull-Jokulsarlon_East_Region.html",
    },
  ],
  [
    "canada--grizzly-country-wilderness-trek-great-bear-rainforest",
    {
      company: "Great Bear Lodge",
      url: "https://www.tripadvisor.com/Hotel_Review-g184839-d804490-Reviews-Great_Bear_Lodge-Port_Hardy_Vancouver_Island_British_Columbia.html",
    },
  ],
  [
    "costa-rica--whitewater-rafting-pacuare-river",
    {
      company: "Pacuare Outdoor Center",
      url: "https://www.tripadvisor.com/Hotel_Review-g309234-d6561351-Reviews-Pacuare_Outdoor_Center-Turrialba_Province_of_Cartago.html",
    },
  ],
]);

export function operatorReviewFor(activityId: string): { company: string; url: string } | null {
  return OPERATOR_REVIEWS.get(activityId) ?? null;
}
