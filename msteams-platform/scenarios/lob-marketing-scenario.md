---
title: Microsoft Teams Turn Conversation into Action
description: Microsoft Teams Line of Business (LOB) Scenario.
ms.topic: MicrosoftTeams
---




# Turn Conversation into Action

## Summary
Acting on intelligent insights -responding to user sentiment changes in Microsoft Teams

## User Story
Your company is launching new products into the market, the marketing team have social media campaigns running to promote the launch and new events.

The marketing team wants to ensure that any trending negative comments on social media are quickly identified, and an appropriate response provided to help drive a wider positive attitude to the new products.

Your organisation deployed Microsoft Teams and as part of this you see an opportunity to leverage a line of business Teams bot to support the Marketing Team.

* The Marketing team create a new channel in their team called “Listening Channel”

* They add the Marketing Team Notification Bot to the channel * The Bot leverages the social media sentiment analysis approach described in this article to provide notifications of negative trends in customer sentiment and which product the trend relates to

* The marketing team collaborates in the channel quickly to create a response

* The final response is posted to the social media channels via a social media connector directly from the Teams chat


<br>
|         |         |         |
|---------|---------|---------|
|<img src="../assets/images/lob/audio_conferencing_image7.png" />|Decision points|<ul><li>Which social media feeds would be of interest to your Marketing org?</li><li>Would there need to be a formal sign off any outbound tweets that may need an authorisation flow?</li></ul>|


## Architecture
The high level architecture of the Marketing Team Notification Bot is as follows:- * Bot services

o The bot services and Teams Bot extension are used to build, connect, deploy, and manage intelligent bots to interact naturally with your users on and in this scenario connect your users to information that is provided by the social media sentiment analysis. * Azure social media sentiment analysis

o Provides notifications of negative trends in customer sentiment and which product the trend relates to * Microsoft Teams Bot (Channel Scope)

o The users interact via the bot that is added to the channel. The bot bots to interacts with Microsoft Teams users naturally through chat, sharing the latest changes in customer sentiment * Office 365 Connectors for Microsoft Teams

o Any user can connect a team to services like Trello, GitHub, Bing News, or Twitter and get notified of the team's activity in that service. From tracking a team's progress in Trello to following important hashtags in Twitter, Office 365 Connectors

help your team to stay in sync and get more done. The connector are used to connect to the Marketing social media accounts to post new information.

<img src="../assets/images/lob/deployment-advisor-architecture-diagram.png">

## Resources
Dev Resources: links </b>
IT Admin resources: links </b>

