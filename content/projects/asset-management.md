---
slug: asset-management
title: AssetTrack | Utility Asset Management
tagline: Map-based asset inventory, work orders and compliance for utilities in Kenya and East Africa.
status: live
lenses: [general, web]
tags: [Django, GeoDjango, PostGIS, Leaflet, Work Orders]
role: Sole developer
org: Personal project
period: Apr – Jul 2026
summary: Interactive Leaflet dashboard for tracking poles, transformers, pipes, streetlights and fiber routes, with work-order dispatch, lifecycle tracking, compliance reports and cost analysis. Built for municipalities, telecoms and utility companies. A v2 is now in progress.
problem: Utilities lack a unified spatial view of distributed assets and the work around them.
outcome:
  - text: Live dashboard with map editing, spatial queries, dispatch and reporting
    verified: true
    source: owner-readme-dump
  - text: V2 in progress with extended asset workflows
    verified: true
    source: owner-update
links:
  live: https://asset-tracker-733666477440.europe-west1.run.app/
  code: null
demo:
  hosting: cloud-run
media:
  cover: /projects/asset-management/cover.png
  gallery: []
  video: null
---
Draw and edit point, line and polygon assets directly on the map, run radius and bounding-box searches plus flood-zone overlap checks, and toggle layers including a heatmap overlay. Work orders auto-assign the nearest available technician via PostGIS distance queries, while lifecycle timelines, DBSCAN failure clusters, theft and vandalism geofence alerts, QR inventory reconciliation, compliance reports with CSV export, cost clustering, depreciation schedules, impact simulation, vegetation encroachment tracking, community reporting with hotspot clustering, inspection route optimization and dig-permit conflict detection cover the full asset workflow. Django templates serve the dashboard with a glassmorphism UI that collapses to bottom tabs on mobile. Demo uses curated sample assets for evaluation.
