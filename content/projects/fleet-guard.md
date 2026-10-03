---
slug: fleet-guard
title: FleetGuard — Fleet Management Dashboard
tagline: Live tracking, geofencing, SACCO management and M-Pesa payments for Kenyan logistics.
status: live
lenses: [general, web]
tags: [Next.js, PostGIS, Leaflet, Socket.IO, M-Pesa]
role: Sole developer
org: Personal project
period: Apr – Jul 2026
summary: Real-time fleet dashboard with animated vehicle tracking, geofence entry/exit alerts, route optimization, driver scorecards, maintenance scheduling, insurance quotes, compliance reports and business analytics. English/Swahili bilingual with offline support. A v2 is now in progress.
problem: Small logistics operators run fleets on calls and notebooks with no live visibility.
outcome:
  - text: Live platform with tracking, geofencing, SACCO wallets and compliance views
    verified: true
    source: owner-readme-dump
  - text: V2 in progress with extended fleet workflows
    verified: true
    source: owner-update
links:
  live: https://fleets-rouge.vercel.app/
  code: null
demo:
  hosting: vercel
media:
  cover: /projects/fleet-guard/cover.png
  gallery: []
  video: null
---
Vehicles broadcast positions every 2 seconds over Socket.IO with smooth interpolated markers, 5-second polling fallback and 1-hour history trails. Operators draw geofence polygons with per-zone SMS or M-Pesa alerts checked server-side every 30 seconds, search places via Mapbox geocoding, find the nearest vehicle to any click, and view delay and rating heatmaps plus clickable county overlays with vehicle counts. SACCOs get member roles, invitations, prepaid wallets with M-Pesa STK top-ups and subscription plans, alongside maintenance scheduling, proof of delivery with M-Pesa codes, driver leaderboards, surge pricing zones, ride matching, insurance quotes and policies, SMS alerts and a USSD gateway for non-smartphone users. Demo runs on simulated fleet positions for evaluation.
