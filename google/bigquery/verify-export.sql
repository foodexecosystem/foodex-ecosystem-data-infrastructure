-- Foodex Ecosystem / read-only / PREPARED, NOT EXECUTED on 2026-11-04.
-- Run statements separately with query processing location US.
-- First confirm dataset analytics_562368835 exists.
SELECT table_name, creation_time
FROM `foodex-ecosystem.analytics_562368835.INFORMATION_SCHEMA.TABLES`
WHERE REGEXP_CONTAINS(table_name, r'^events_[0-9]{8}$')
ORDER BY table_name DESC
LIMIT 7;

-- Run only after daily tables exist; check estimated processed bytes first.
-- Table suffix uses GA4 reporting dates. The property uses Asia/Dubai (UTC+04).
-- Aggregated counts only; no user-level rows.
SELECT event_date, event_name, COUNT(*) AS event_count,
       MIN(TIMESTAMP_MICROS(event_timestamp)) AS first_event_utc,
       MAX(TIMESTAMP_MICROS(event_timestamp)) AS last_event_utc
FROM `foodex-ecosystem.analytics_562368835.events_*`
WHERE _TABLE_SUFFIX BETWEEN
  FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE('Asia/Dubai'), INTERVAL 3 DAY))
  AND FORMAT_DATE('%Y%m%d', CURRENT_DATE('Asia/Dubai'))
GROUP BY event_date, event_name
ORDER BY event_date DESC, event_count DESC;

