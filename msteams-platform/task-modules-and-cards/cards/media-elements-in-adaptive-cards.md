---
title: Media Elements in Adaptive Cards
description: Learn how the Media Elements are supported in the Adaptive Cards SDK and support consumption directly within Microsoft Teams Adaptive Cards.
ms.localizationpriority: high
ms.topic: reference
---

# Overview

Media elements (For example audio or video clips) are supported in the Adaptive Cards SDK but not in Teams. This was originally de-scoped when moving Teams to Adaptive Cards v1.2 but we are looking to address now. There is no media support in Teams cards today (since we also don't support the audio/video/animation cards from Bot Framework), so there is no workaround. This will drive parity with the SDK (which already supports media elements) and would increase engagement with cards and bring new experiences to them.

## User problems

There is a need to embed Media Elements in Adaptive Cards within the Teams experience. Partners that have shared this requirement include Accenture (200K+ user impact), Workday, Chata.ai, Inditex, ServiceNow, Blinkist.

Today, users are forced to exit Teams to view media. This feature supports consumption of Media Elements directly within Teams Adaptive Cards. Following are the example scenarios:

### User sent scenarios

Video: User Alice has found a relevant informational video on her company ODSP instance. She uses the OneDrive Media Elements to unfurl the copied link and sends an Adaptive Card to Bob with the video. The corresponding card has the relevant video embedded in the card. The video is rendered directly within a native Teams media player in the card, allowing Bob to directly view the video within the Teams experience. He can pause, play, change volume, and seek through the video as needed. He is also able to view the video in an expanded full-screen mode.  

Audio: Nurse Carol locates an audio file with the daily memo on her company ODSP instance. She sends the link to the audio memo to her team via chat, that unfurls into an Adaptive Card using the ODSP App in the compose box. The corresponding card has an embedded audio player that can play the audio file. The audio file can be directly played within the native Teams media player in the card, allowing team members to directly listen to the audio recording within the Teams experience. Nurse David, who is in the group chat, can pause, play, change volume, and seek through the audio file as needed.

### Bot sent scenarios

Video: Contoso has an onboarding Bot that is deployed on their tenant. Every new member on the tenant is greeted by the Contoso Onboarding Bot (COB) and presented a series of Media Elements Adaptive Cards that outlines the onboarding flow. Bob has joined the team. The onboarding videos are rendered directly within a native Teams media player in the card, allowing Bob to directly view the video within the Teams experience. He can pause, play, change volume, and seek through the video as needed. He is also able to view the video in an expanded full-screen mode.

Audio: Contoso Medical has a scrum Bot that is deployed on their tenant. The Bot automatically takes the audio recording of the daily scrum meeting and sends it to the wider Medical Team channel. The audio recording is presented as an Adaptive Card, that allows everyone in the Team channel to pause, play, change volume, and seek through the audio file as needed.

## Phases

### Phase 1: Support LOB scenarios

For the MVP of the Media Elements feature, we will support three scenarios primarily for in-line media playback for both user-sent and bot-sent (H1CY22):

Files of a supported type available externally via any publicly available URL that is sanitized

Video/audio is linked via a URL that points to a supported video/audio file

Inline YouTube video playback through AC SDK v1.6

Files directly uploaded to OneDrive Sharepoint (ODSP) within the tenant (no permission issues)

Video/audio is linked/shared from ODSP