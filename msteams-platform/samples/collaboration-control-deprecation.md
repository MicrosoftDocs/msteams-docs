--- 
title: Deprecation of Collaboration controls for model-driven application
author: v-npaladugu 
description: Learn about the timelines for the deprecation of Collaboration controls model-driven apps 
ms.localizationpriority: medium 
ms.topic: reference 
ms.author: surbhigupta 
ms.date: 01/31/2023 
---

# Collaboration controls for Model Driven Apps

Collaboration controls, initially designed to provide Power Apps with low-code solutions for Microsoft 365 users, will be deprecated. The rise in market demand for Copilot and the influence of generative AI have surpassed the original need for these controls.

Support for collaboration controls will be discontinued at the end of May 2024.

The deprecation will be carried out in two phases to ensure a smooth transition. Below is a timeline detailing the deprecation process and its impacts:

|Timeframe|Action|Impact|
|---|---|---|
|February 2024|The Collaboration controls will no longer be available to install from AppSource.|- New deployments of the collaboration controls in Power Apps environments aren't be possible. </br> - Current installations aren't affected.|
|May 2024|The internal service that powers the controls will be retired.|- From this point, the controls will no longer support integration with Microsoft 365 and will return errors to users. </br> There will be no impact on data generated and managed through the controls. For more information, see the table later in this article.|

Artifacts created and managed through the controls will continue to exist after the service is retired.

|Control|Impact|
|---|---|
|**Approvals**|Approvals created in the Approvals control will remain in the Approvals app but will no longer be accessible in the Approvals control.|
|**Files**|Files managed in the Files control will remain in SharePoint but will no longer be accessible in the Files control.|
|**Meetings**|Meetings created in the Meeting control will remain in Outlook and Teams calendars but will no longer be accessible in the Meetings control.|
|**Notes**|Notes created in the Notes control will remain in the Dataverse notes table.|
|**Tasks**|Tasks created via the Task control will remain in Planner but will no longer be accessible in the Task control.|

We recommend removing the collaboration controls and Collaboration connector from all Power Apps solutions and preparing users for the upcoming retirement of the collaboration controls. 

 