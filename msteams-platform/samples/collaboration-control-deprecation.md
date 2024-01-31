--- 
title: Collaboration controls (Preview) for Model Driven Apps are deprecated 
author: v-npaladugu 
description: Learn about the timelines 
ms.localizationpriority: medium 
ms.topic: reference 
ms.author: surbhigupta 
ms.date: 01/30/2023 
---

# Collaboration controls (Preview) for Model Driven Apps

When we envisioned the controls, we believed the capabilities had amazing potential for Power Apps Makers to bring low code solutions to M365 users.  

Since the preview release of August 2022, the market demand for Copilot and the impact of generative AI on fusing workflow, collaboration, and content have moved us past the original need that inspired the controls. 

Therefore, Collaboration controls will no longer be supported from end of May 2024.

This deprecation will follow a 2-phase model to help a safe transition:

|Timeframe|Action|Impact|
|---|---|---|
|February 2024|The Collaboration controls will no longer be available to install from AppSource.|- This means new deployments of the Collaboration controls to Power App maker environments will not be possible. </br> - There will be no impact on current installations.|
|May 2024|An internal service powering the controls will be retired.|- From this point the controls will no longer support integration with M365 and will return errors to users. </br> There will be no impact on data generated and managed via the controls. See the table below for more details.|

Artifacts that were created and managed via the controls will persist after the service is retired.   

|Control|Impact|
|---|---|
|**Approvals**|Approvals that were created in the Approvals control will persist in the Approvals app but will not be available in the Approvals control.|
|**Files**|Files that were managed in the Files control will persist in SharePoint but will not be available in the Files control.|
|**Meetings**|Meetings created in the Meeting control will persist in Outlook and Teams calendars but will not be available in the Meetings control.|
|**Notes**|Notes created in the Notes control will persist in the Dataverse notes table.|
|**Tasks**|Tasks that were created via the Task control will persist in Planner but will not be available in the Task control.|

We advise to remove the Collaboration controls and Collaboration connector from all Power Apps solutions and to prepare users for the upcoming Collaboration control retirement.

 