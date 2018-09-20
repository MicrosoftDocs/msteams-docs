---
title: Microsoft Teams Intelligent Insights
description: Microsoft Teams Line of Business (LOB) Scenario.
ms.topic: MicrosoftTeams
---




# Turn Conversation into Action

## Summary
FAQ bot in Microsoft Teams

## User Story
As a member of your organizations people department (human resources, HR) you are responsible for maintaining a frequently asked questions (FAQ) page to provide answers to common questions employees ask.

Your organization recently deployed Microsoft Teams and you see an opportunity to leverage a Tenant App to improve how employees get answers to their questions while empowering your organization to collect valuable information to improve questions, answers and employee experience over time.

The Teams FAQ App would provide:

* Respond to questions asked by employees via chat by providing the most appropriate answer

* Use natural language processing to reduce the dependency on the employee using exact terminology when asking a question * Enable connecting the user to a live support team member in the case that the question cannot be answered, or the answer does not meet the employees needs

* Allow the employee to rate their satisfaction with the answer provided (or not provided)

* Allow the employee to rate their overall experience with the Teams FAQ App

* Capture telemetry which can provide statistics on the most common questions asked providing data to improve future employee training and information sharing

Employees can interact easily with the Teams FAQ App to quickly get answers to their questions. Reducing context switching and valuable time spent searching for answers, by focusing on simple human-style interactions to get the information they need.

The people organization gets valuable information on how well the answers they are providing are resonating with their employees as well as data on where they are missing important information altogether. That data can be used to improve the overall employee experience.


<br>
|         |         |         |
|---------|---------|---------|
|<img src="../assets/images/app-scenarios/audio_conferencing_image7.png" />|Decision points|<ul><li>Which internal FAQ resources would your organization want to include in such an app?</li></ul>|


## Architecture
The high-level architecture of this Teams app is: * QnA Maker powered by Azure Cognitive Services o QnA Maker enables you to power a question and answer service from your semi-structured content like FAQ documents or URLs and product manuals. * Bot services

o Build, connect, deploy, and manage intelligent bots to interact naturally with your users on websites, apps, Cortana, Microsoft Teams, Skype, Slack, Facebook Messenger, and more. Language Understanding Intelligent Service (LUIS) * Language Understanding Intelligent Service (LUIS)

o a cloud-based API service that applies custom machine-learning intelligence to a user's conversational, natural language text to predict overall meaning, and pull out relevant, detailed information.

* Source FAQ content

o Organization provided information

* Application Insights

o Feedback on the value of answers to questions that bot provides.

o Feedback on what questions employees have.

o Data on reduction of support incidents requiring people team member engagement. * Microsoft Teams Bot (personal context)

o Build and connect intelligent bots to interact with Microsoft Teams users naturally through chat

<img src="../assets/images/lob/deployment-advisor-architecture-diagram.png">

## Resources
Dev Resources: links </b>
IT Admin resources: links

