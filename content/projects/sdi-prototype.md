---
slug: sdi-prototype
title: Nyeri County Transport SDI
tagline: FastAPI + OGC API Features serving Nyeri transport layers from PostGIS.
status: live
lenses: [general, web]
tags: [FastAPI, pygeoapi, PostGIS, Redis, Leaflet]
role: Sole developer
org: Personal project
period: Jan 2026
summary: Spatial data infrastructure for transport in Nyeri County — a Leaflet map with layer panel, zoom-to-layer and popups backed by OGC API Features (boundary, roads, railway, aviation) with viewport loading, Redis caching and GZip.
problem: Transport planners need one reliable place to browse and pull county road, rail and aviation data.
outcome:
  - text: Live map plus OGC API collections with cached responses
    verified: true
    source: owner-readme-dump
links:
  live: https://spatial-data-in-sdi.vercel.app/
  code: TODO
demo:
  hosting: vercel
media:
  cover: /projects/sdi-prototype/cover.png
  gallery: []
  video: null
draft: true
---
Roads load per viewport with a canvas renderer and debounced refresh while smaller layers load whole; OGC responses carry a 300-second Redis cache with Cache-Control headers. The pygeoapi config generates to /tmp at startup as a Vercel read-only filesystem workaround. Data and API metadata shared under CC-BY 4.0.

TODO: repo link, screenshots.
