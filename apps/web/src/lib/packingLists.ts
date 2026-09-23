// Generic, category-level packing guidance — a sensible starting checklist,
// not a substitute for what a guide or operator tells you to bring for a
// specific trip (permits, exact gear specs and rental availability vary by
// operator and are called out per-activity in the write-up itself).
const BASELINE = [
  "Travel insurance that explicitly covers this activity + evacuation/rescue",
  "Physical + digital copy of ID, permits and insurance details",
  "First aid kit",
  "Headlamp with spare batteries",
  "High-calorie snacks and a way to purify water",
];

export const PACKING_LISTS: Record<string, string[]> = {
  "mountaineering-climbing": [
    "Climbing harness and helmet",
    "Crampons and ice axe (if glaciated)",
    "Climbing rope and rack, or confirm your guide supplies it",
    "Altitude medication if going above ~3,000m",
    "Insulated, windproof outer layers",
  ],
  trekking: [
    "Broken-in hiking boots — never trek in new ones",
    "Trekking poles",
    "Moisture-wicking base layers, not cotton",
    "Blister kit and foot tape",
    "Waterproof shell jacket",
  ],
  "ice-snow": [
    "Insulated, waterproof outer layers",
    "Crampons and ice axe",
    "Glacier goggles or glacier-rated sunglasses",
    "Hand and toe warmers",
    "Spare dry gloves",
  ],
  "diving-whitewater": [
    "Dive certification card (if diving)",
    "Wetsuit or drysuit rated for the water temperature",
    "Personal flotation device (for whitewater/kayaking)",
    "Helmet",
    "Dry bag for electronics and spare clothes",
  ],
  "canyoning-caving": [
    "Wetsuit",
    "Helmet with a headlamp mount",
    "Canyoning-specific harness",
    "Sturdy, grippy-soled footwear you don't mind getting wet",
    "Spare headlamp batteries",
  ],
  air: [
    "Closed-toe shoes that stay on your feet",
    "No loose jewelry or scarves",
    "Light layers — it's colder at altitude/in freefall than on the ground",
    "Action camera mount only if your operator explicitly allows it",
  ],
  "mountain-biking": [
    "Full-face helmet for anything technical",
    "Knee and elbow pads",
    "Gloves",
    "Hydration pack",
    "Basic multitool + spare tube",
  ],
  "wildlife-hunting": [
    "Neutral, non-rustling clothing",
    "Binoculars",
    "Sturdy closed-toe boots",
    "Insect repellent and sun protection",
    "Zoom camera or phone clip-on lens",
  ],
  camping: [
    "Tent or bivy rated for the conditions you'll actually hit",
    "Sleeping bag rated well below the expected low",
    "Insulated sleeping pad",
    "Portable stove and fuel",
    "Bear-safe food storage where relevant",
  ],
  "volcano-offroad": [
    "Gas mask or respirator (for active volcanic gas)",
    "Sturdy, ankle-supporting boots",
    "Off-road recovery gear if self-driving: traction boards, tow strap",
    "Dust/ash-proof eyewear",
  ],
  surfing: [
    "Reef-safe sunscreen",
    "Rash guard",
    "Leash rated for the board and conditions",
    "First aid basics for reef cuts",
  ],
  polar: [
    "Sleeping system rated for extreme cold",
    "Satellite communicator",
    "Snow goggles",
    "Vapour-barrier liner socks and gloves",
    "Pulk/sled if hauling your own gear",
  ],
  other: [
    "Comfortable closed-toe footwear",
    "Sun protection",
    "Dust mask if sand or ash is involved",
    "Reusable water bottle",
  ],
};

export function packingListForGroup(categoryGroup: string): string[] {
  return [...(PACKING_LISTS[categoryGroup] ?? PACKING_LISTS.other), ...BASELINE];
}
