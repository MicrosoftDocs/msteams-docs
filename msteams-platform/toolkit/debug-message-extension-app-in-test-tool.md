---
title: Debug message extension app in Test Tool
author: surbhigupta 
description: Learn how to emulate the Teams experience for your message extension app in Teams App Test Tool.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 04/25/2024
---

# Debug message extension app in Test Tool

Teams App Test Tool now supports debugging bot-based Message Extension apps, including search command, action command and link unfurling.

For bot-based Message Extension app, it's built on the top of Bot Framework. When the Message Extension app is triggered, Test Tool will send invoke request to the app, then render and display the invoke response returned from the app.
