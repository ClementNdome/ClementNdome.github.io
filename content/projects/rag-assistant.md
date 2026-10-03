---
slug: rag-assistant
title: KCAA Smart Assistant (RAG)
tagline: Grounded, citation-backed answers from KCAA regulations, services and news.
status: live
lenses: [general]
tags: [RAG, ChromaDB, LangChain, Streamlit, Groq]
role: Sole developer
org: Personal project
period: Oct – Dec 2025
summary: AI chatbot answering Kenya Civil Aviation Authority questions from a local knowledge base of official KCAA PDFs, topped up with gated real-time web and social searches. Structured chunking, HuggingFace embeddings, Chroma vector search and Groq Llama 3.1 8B deliver fast grounded answers with PDF-page and web-link citations.
problem: Teams cannot quickly find grounded answers in long regulatory PDFs.
outcome:
  - text: Live assistant with grounded, citation-backed, hallucination-mitigated responses in 3–8 seconds
    verified: true
    source: owner-readme-dump
links:
  live: https://adv-chatbot.streamlit.app/
  code: https://github.com/ClementNdome/kcaa-demo
demo:
  hosting: other
media:
  cover: /projects/rag-assistant/cover.png
  gallery: []
  video: null
---
Local hits answer first with chat history, feedback buttons and input validation; web and social searches fire in parallel only when local info falls short, keeping latency at 3–8 seconds on free DDGS tiers. Applicable beyond aviation to early-warning bulletin dissemination and policy knowledge systems. No formal retrieval evaluation published yet; answers always carry source citations for manual verification.
