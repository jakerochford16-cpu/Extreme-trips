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
