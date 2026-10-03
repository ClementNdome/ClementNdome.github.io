---
slug: site-seeker
title: SiteSeeker | Retail Location Intelligence
tagline: Draw a polygon and get competitors, demographics, traffic and revenue estimates in one panel.
status: live
lenses: [general, web]
tags: [Next.js, PostGIS, Leaflet, Location intelligence]
role: Sole developer
org: Personal project
period: Jan 2026 – May 2026
summary: PostGIS-powered retail intelligence for Kenya across 9 analysis modes and 11 map layers, with JWT auth, English/Swahili support, SACCO groups,  payments, USSD field access, PDF reports and side-by-side comparison of up to 3 sites.
problem: Retailers choose sites without unified spatial evidence.
outcome:
  - text: Live platform unifying 9 analyses and 11 layers in one panel
    verified: true
    source: owner-readme-dump
  - text: 22 PostGIS tables and 41 API endpoints serving the analyses
    verified: true
    source: owner-readme-dump
links:
  live: https://site-seeker.spationex.com/
  code: null
demo:
  hosting: other
media:
  cover: /projects/site-seeker/cover.png
  gallery: []
  video: null
---
Modes cover polygon, buffer, cluster, franchise territories, retail leakage, supplier search, demographic forecast, site tours and partnership matching over competitors, demographics, traffic nodes, land use, foot traffic, roads, informal markets, commercial plots, community pins, suppliers and partnerships. Community members can submit opportunity and problem pins, groups manage wallets and invitations, and reports save, export to PDF and compare. Next.js 16 with TypeScript and Tailwind, Leaflet with draw tools, PostGIS on Aiven (SRID 4326), tested with Vitest. Demo uses curated sample data for competitors, demographics and traffic layers.
