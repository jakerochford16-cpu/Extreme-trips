CREATE TABLE IF NOT EXISTS favorites (
  id          BIGSERIAL PRIMARY KEY,
  user_id     TEXT NOT NULL,
  activity_id TEXT NOT NULL,
  position    INTEGER NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, activity_id)
);

CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id, position);

CREATE TABLE IF NOT EXISTS reviews (
  id          BIGSERIAL PRIMARY KEY,
  user_id     TEXT NOT NULL,
  activity_id TEXT NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, activity_id)
);

CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews (user_id);

CREATE TABLE IF NOT EXISTS guide_link_clicks (
  id          BIGSERIAL PRIMARY KEY,
  activity_id TEXT NOT NULL,
  clicked_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS guide_link_clicks_activity_clicked_idx
  ON guide_link_clicks (activity_id, clicked_at);

-- Anonymous page-view counter — no IP, no cookie, no per-visitor id, just a
-- path and a timestamp, same privacy posture as guide_link_clicks above.
CREATE TABLE IF NOT EXISTS page_views (
  id        BIGSERIAL PRIMARY KEY,
  path      TEXT NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS page_views_viewed_at_idx ON page_views (viewed_at);

-- Inquiries submitted by guide/tour operators via the /partner form, asking
-- about a featured placement. Reviewed manually from /admin/inquiries.
CREATE TABLE IF NOT EXISTS operator_inquiries (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  company    TEXT NOT NULL,
  email      TEXT NOT NULL,
  region     TEXT NOT NULL,
  activity   TEXT NOT NULL,
  message    TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS operator_inquiries_created_at_idx ON operator_inquiries (created_at);

-- Applications submitted by creators/influencers via the /explorers form,
-- asking to be featured in exchange for a shoutout. Reviewed manually at
-- /admin/creators; approved ones get a hand-written entry added to
-- src/data/explorers.ts and a real profile page — this table is just the
-- inbox, not the published data.
CREATE TABLE IF NOT EXISTS creator_applications (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  handle       TEXT NOT NULL,
  platform     TEXT NOT NULL,
  follower_count TEXT NOT NULL,
  niche        TEXT NOT NULL,
  email        TEXT NOT NULL,
  message      TEXT NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS creator_applications_created_at_idx ON creator_applications (created_at);
