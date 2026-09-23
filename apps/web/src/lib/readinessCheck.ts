import type { Activity } from "./types";

export type ReadinessAnswers = {
  similarExperience: boolean | null;
  emergencyFunds: boolean | null;
  guidePlan: boolean | null;
  permitPlan: boolean | null;
};

export const BLANK_ANSWERS: ReadinessAnswers = {
  similarExperience: null,
  emergencyFunds: null,
  guidePlan: null,
  permitPlan: null,
};

type Activityish = Pick<Activity, "difficulty" | "riskLevel" | "guideRequired" | "permitRequired">;

export function readinessQuestions(activity: Activityish) {
  const questions: { key: keyof ReadinessAnswers; text: string }[] = [
    {
      key: "similarExperience",
      text: `Have you done something at ${activity.difficulty} difficulty, or harder, before?`,
    },
    {
      key: "emergencyFunds",
      text: "Could you cover an unplanned rescue, evacuation or medical bill out of pocket if it came to it?",
    },
  ];
  if (activity.guideRequired) {
    questions.push({
      key: "guidePlan",
      text: "Are you planning to book a qualified local guide for this specific activity?",
    });
  }
  if (activity.permitRequired) {
    questions.push({
      key: "permitPlan",
      text: "Do you know what permit this needs and how to actually get it?",
    });
  }
  return questions;
}

export function readinessVerdict(activity: Activityish, answers: ReadinessAnswers) {
  const verySevere = activity.difficulty === "INSANE" || activity.riskLevel === "EXTREME";
  const concerns: string[] = [];
  let hardBlocker = false;

  if (answers.similarExperience === false) {
    if (verySevere) {
      concerns.push(
        "You haven't done anything at this level before, and this is about as serious as it gets on this site. That gap is the single biggest predictor of things going wrong out there — it's worth building up to this one, not starting here."
      );
      hardBlocker = true;
    } else {
      concerns.push(
        "You haven't done anything at this difficulty before. Not disqualifying, but worth easing in with something one level down first if this would be a first."
      );
    }
  }

  if (answers.emergencyFunds === false && (activity.riskLevel === "SEVERE" || activity.riskLevel === "EXTREME")) {
    concerns.push(
      "An unplanned rescue or evacuation for something like this can run into five figures, paid out of pocket if it's not covered. Sort out insurance or a real emergency fund before you go — see the warning above if there is one."
    );
  }

  if (activity.guideRequired && answers.guidePlan === false) {
    concerns.push(
      "This one genuinely requires a qualified guide — that's not a nice-to-have here, it's the difference between doable and reckless."
    );
    hardBlocker = true;
  }

  if (activity.permitRequired && answers.permitPlan === false) {
    concerns.push(
      "You'll need a permit sorted before you can actually do this. Worth checking lead times now — some take weeks to process."
    );
  }

  if (concerns.length === 0) {
    return {
      tone: "green" as const,
      concerns,
      summary:
        "Nothing here rules you out on paper. That's not the same as being ready in the moment — go in prepared, and don't skip the packing list.",
    };
  }

  return {
    tone: hardBlocker ? ("red" as const) : ("yellow" as const),
    concerns,
    summary: hardBlocker
      ? "Honest answer: you're not ready for this one yet."
      : "You could probably do this, but there are gaps worth closing first.",
  };
}
