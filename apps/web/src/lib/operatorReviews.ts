// Real, verified operator detail for activities where we've confirmed the
// specific company, that they have a genuine dedicated TripAdvisor listing
// (not a generic attraction page shared with other operators), and pulled
// their actual trip logistics from their own site. Everything here is
// sourced and static — reviewQuote is a short excerpt found on a real
// public review page (linked via tripAdvisorUrl so it's independently
// checkable), not something pulled live. Same reasoning as
// sponsorships.ts and guideLinks.ts: a wrong or stale claim here is worse
// than none, so only add an entry once every field has been personally
// verified against a real source, and only skip fields you can't confirm.
export type VerifiedOperator = {
  company: string;
  tripAdvisorUrl: string;
  reviewQuote: string;
  included: string[];
  format: string;
  booking: string;
  operatorUrl?: string;
};

const VERIFIED_OPERATORS: ReadonlyMap<string, VerifiedOperator> = new Map([
  [
    "new-zealand--nevis-swing-free-fall-canyon-swing",
    {
      company: "AJ Hackett Bungy NZ",
      tripAdvisorUrl:
        "https://www.tripadvisor.com/Attraction_Review-g255122-d1018220-Reviews-AJ_Hackett_Bungy_New_Zealand-Queenstown_Otago_Region_South_Island.html",
      reviewQuote: "This was one of the best experiences of my life.",
      included: [
        "300m swing arc",
        "Photos & video, delivered instantly",
        "Activity t-shirt",
        "Return transport on the Bungy Bus from Queenstown",
      ],
      format:
        "~4 hours door-to-door from downtown Queenstown (shorter from the Kawarau Bungy Centre); solo or tandem. Min age 10, weight 35–160kg solo / up to 220kg tandem.",
      booking: "Book at bungy.co.nz — check in 30 min before your bus departs.",
      operatorUrl: "https://www.bungy.co.nz/queenstown/nevis/nevis-swing/",
    },
  ],
  [
    "norway--svalbard-wilderness-expedition-polar-bear-country",
    {
      company: "Basecamp Explorer Spitsbergen",
      tripAdvisorUrl:
        "https://www.tripadvisor.com/Attraction_Review-g503715-d10782627-Reviews-Basecamp_Explorer_Spitsbergen-Longyearbyen_Spitsbergen_Svalbard.html",
      reviewQuote:
        "Our husky guide Othile was absolutely amazing — she took plenty of time to explain dog welfare and the personalities of the dogs.",
      included: [
        "Expert Arctic guides",
        "Remote lodge access (Isfjord Radio, Nordenskiöld Lodge or Basecamp Hotel)",
        "A mandatory environmental contribution that funds long-term conservation",
      ],
      format:
        "Multiple expedition formats: 3-day dog sledding, multi-day snowmobile or trekking routes, boat-based circuits.",
      booking: "Custom bookings via Spitsbergen@basecampexplorer.com or +47 79 024 600.",
      operatorUrl: "https://basecampexplorer.com/",
    },
  ],
  [
    "peru--sandboarding-huacachina-dunes",
    {
      company: "trueXperiences",
      tripAdvisorUrl:
        "https://www.tripadvisor.com/Attraction_Review-g304040-d26224396-Reviews-TrueXperiences_Tours_en_Ica_Paracas_y_Nazca-Ica_Ica_Region.html",
      reviewQuote: "A beautiful ride, good driver and incredibly beautiful sunset — an experience for life.",
      included: ["Dune buggy ride", "Sandboarding", "Golden-hour timing"],
      format: "Half-day sunset trip; a picnic add-on is available.",
      booking: "WhatsApp +51 936 875 137 or info@perutruexperiences.com.",
      operatorUrl: "https://perutruexperiences.com/en",
    },
  ],
  [
    "south-africa--great-white-shark-cage-diving-gansbaai",
    {
      company: "White Shark Diving Company",
      tripAdvisorUrl:
        "https://www.tripadvisor.com/Attraction_Review-g472522-d1102254-Reviews-White_Shark_Diving_Company-Gansbaai_Overstrand_Overberg_District_Western_Cape.html",
      reviewQuote: "The crew was so professional, calm and reassuring — I felt safe the whole time.",
      included: [
        "Breakfast/lunch and beverages",
        "Safety briefing",
        "8-person floating cage, rotating turns",
        "7mm wetsuit, weights, hood, boots, mask",
        "Soup and sandwiches on return",
      ],
      format: "~4.5 hours total (2–3 hours at sea); cage time varies with shark activity and conditions.",
      booking: "Reserve without paying — you're only charged on arrival, and there's no charge if weather cancels the trip.",
      operatorUrl: "https://sharkcagediving.co.za/",
    },
  ],
  [
    "iceland--ice-cave-exploring-vatnaj-kull",
    {
      company: "Local Guide of Vatnajökull",
      tripAdvisorUrl:
        "https://www.tripadvisor.com/Attraction_Review-g12344476-d1966806-Reviews-Local_Guide_of_Vatnajokull-Jokulsarlon_East_Region.html",
      reviewQuote:
        "Michal's knowledge of glacial history was phenomenal — his instructions ensured a safe and easy trip for all of us.",
      included: ["Crampons and helmets", "4x4 transport to the glacier", "Gear fitting and instruction"],
      format: "Small groups, limited to ~8 guests per guide. Glacier hikes in summer, ice caves October–March.",
      booking: "+354 894 1317 or info@localguide.is.",
      operatorUrl: "https://localguide.is/",
    },
  ],
  [
    "canada--grizzly-country-wilderness-trek-great-bear-rainforest",
    {
      company: "Great Bear Lodge",
      tripAdvisorUrl:
        "https://www.tripadvisor.com/Hotel_Review-g184839-d804490-Reviews-Great_Bear_Lodge-Port_Hardy_Vancouver_Island_British_Columbia.html",
      reviewQuote:
        "The food and hospitality is amazing, the tour guides' knowledge and willingness to share that knowledge outstanding, and the whole experience is second to none.",
      included: ["Two guided viewing sessions daily", "Wilderness-gourmet meals", "Floating lodge accommodation"],
      format: "Multi-day stays, capped at 18 guests, early May through October.",
      booking: "1-888-221-8212 (toll-free) or info@greatbeartours.com.",
      operatorUrl: "https://greatbeartours.com/",
    },
  ],
  [
    "costa-rica--whitewater-rafting-pacuare-river",
    {
      company: "Pacuare Outdoor Center",
      tripAdvisorUrl:
        "https://www.tripadvisor.com/Hotel_Review-g309234-d6561351-Reviews-Pacuare_Outdoor_Center-Turrialba_Province_of_Cartago.html",
      reviewQuote: "Fantastic company, very professional — guides Arturo and Manfred made every activity safe and fun.",
      included: ["Transportation, meals and all equipment", "Class II–IV rafting", "Zipline & Tarzan swing on the 3-day package"],
      format: "Half-day (6km) up to 3-day all-inclusive options; runs year-round.",
      booking: "WhatsApp +506 8922-4570 or info@pacuareoutdoorcenter.com.",
      operatorUrl: "https://pacuareoutdoorcenter.com/",
    },
  ],
]);

export function operatorReviewFor(activityId: string): VerifiedOperator | null {
  return VERIFIED_OPERATORS.get(activityId) ?? null;
}
