---
title: Microsoft Teams Project Management Organization
description: Microsoft Teams Line of Business (LOB) Scenario.
ms.topic: MicrosoftTeams
---




# Project Management Organization (PMO)

## Summary
Kickstart your PMO projects in Microsoft Teams

## User Story
You run a successful PMO function in your organisation, maintain Microsoft Planner and Word templates for your projects and maintain processes that have been proven to drive successful projects in your company. Now you want to make it easy to onboard new project teams to use these assets.

Your organisation deployed Microsoft Teams and you see an opportunity to leverage a line of business Teams App to bring these assets together and kick start collaboration on new projects.

The Teams PMO App would * Ask simple set up questions to determine the base set of assets that the project should use (project, duration, budget, risk, members, name)

* Create a new team with prepopulated channels and add the identified project members

* Add a “Project Plans” channel tab and hydrate appropriate base project plans in Planner suitable for the project

* Add a “Requirements Templates” tab and populate with the key Word templates

* Add a “Budget Authorisation” process (Flow)

* Integrate a PMO Teams bot to confirm that all material required to pass a project “gate” are successfully created and posted

Project teams can simply use the Teams PMO app to create a new team for the project and add in the configured success assets directly in to the team so they have everything they need to get started, leveraging Teams as the collaboration hub to access internal resources as well as Office 365 services.

The PMO manages the change control of the key assets published via the Teams app so that project teams have current and correct versions of templates and documents.

<br>
|         |         |         |
|---------|---------|---------|
|<img src="../assets/images/app-scenarios/audio_conferencing_image7.png" />|Decision points|<ul><li>Which internal PMO resources would your PMO want to include in such an app?</li><li>Have you started to use Planner to manage your projects?</li><li>...?</li></ul>|


## Architecture
The high level architecture of this Teams app is as follows:- * Azure Web Services are used to host Teams PMO App UI, key assets are stored in Azure Storage. The Web services drive the creation of the Teams and Channels and addition of the key assets via the Graph API.

* The approval is created in Flow and maintained by the PMO

* The Teams Bot Framework Extension and Bot Framework are leveraged to create the Teams PMO Self Check Bot which queries SharePoint to confirm that the expected documentation exists for the current phase of the project

<img src="../assets/images/lob/deployment-advisor-architecture-diagram.png">

## Resources
Dev Resources: links
IT Admin resources: links

