---
slug: obstacle-compliance
title: Obstacle Compliance & Airport GIS System
tagline: Prototype web GIS for checking structures against aerodrome obstacle limitation surfaces in Kenya.
status: live
lenses: [general, web, gis-rs]
tags: [Django, GeoDjango, PostGIS, Leaflet, ICAO Annex 14]
role: Sole developer
org: Personal project
period: Jan 2025 – Present
summary: Personal project that began in Jan 2025 as an airport visualisation and query tool and is now in its third major version. Built with Django and GeoDjango.
problem: Builders and regulators need a quick way to check whether a structure near an aerodrome would penetrate obstacle limitation surfaces.
outcome:
  - text: Live prototype with OLS engine and demonstration approval workflow
    verified: true
    source: master#4.5
links:
  live: https://kenya-airports-733666477440.europe-west1.run.app/
  code: https://github.com/ClementNdome/Kenya-airports
demo:
  hosting: cloud-run
media:
  cover: /projects/obstacle-compliance/cover.png
  gallery: []
  video: null
versions:
  - { label: v1, period: Jan 2025, note: Airport visualisation and query tool (Render) }
  - { label: v2, period: TODO, note: TODO }
  - { label: v3, period: Present, note: OLS engine and approval workflow (Cloud Run) }
---
Personal prototype, not an official KCAA system. Models ICAO Annex 14 Vol I (8th ed.) surfaces — approach, inner approach, transitional, balked-landing, take-off-climb, inner horizontal, conical, outer horizontal — modelled on KCAA advisory circulars AC-AGA005C (June 2024) and AC-AGA032A (Feb 2026). Certificates are demonstration outputs.

TODO: confirm data sources are public.
TODO: how the surface geometry was verified (tests, reference calculations).
