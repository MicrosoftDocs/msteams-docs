---
title: Microsoft Teams Turn Conversation into Action
description: Microsoft Teams Line of Business (LOB) Scenario.
ms.topic: MicrosoftTeams
ms.date: 09/24/2018
---
# Act on intelligent insights

## User story: Respond to user sentiment changes in Microsoft Teams

Your company is launching new products into the market. The marketing team is running social media campaigns to promote the launch and new events. The team wants to ensure that any trending negative comments on social media are quickly identified and an appropriately responded to, to help drive a wider positive attitude toward the new products.

Your organization deployed Microsoft Teams, and as part of this you see an opportunity to use a line-of-business Teams bot to support the marketing team:

- The marketing team creates a new channel in their team called Listening Channel.
- They add the Marketing Team Notification Bot to the channel.
- The bot leverages the social media sentiment analysis approach [described in this article](https://docs.microsoft.com/azure/azure-databricks/databricks-sentiment-analysis-cognitive-services) to provide notifications of negative trends in customer sentiment and identify the product the trend relates to.
- The marketing team collaborates in the channel to create an immediate response.
- The final response is posted directly from the Teams chat to the social media channels via a social media connector.

Marketing team members are now updated in real time, can respond simply and rapidly to negative trends in user sentiment, and work to improve perception of the product.

|         |         |
|---------|---------|
|<img src="../assets/images/app-scenarios/audio_conferencing_image7.png" /><br>Decision points|<ul><li>Which social media feeds would be of interest to your marketing team?</li><li>Would there need to be a formal sign-off for any outbound tweets that might need an authorization flow?</li></ul>|

## Architecture

The high-level architecture of the Marketing Team Notification Bot is as follows:

- [Bot services](https://azure.microsoft.com/services/bot-service/)<br>The bot services and Teams bot extension are used to build, connect, deploy, and manage intelligent bots to interact naturally with your users on—and, in this scenario, connect your users to—information that’s provided by the social media sentiment analysis.
- [Azure social media sentiment analysis](https://docs.microsoft.com/azure/azure-databricks/databricks-sentiment-analysis-cognitive-services)<br>Provides notifications of negative trends in customer sentiment and which product the trend relates to.
- [Microsoft Teams bot](https://docs.microsoft.com/microsoftteams/platform/concepts/bots/bots-overview) (channel scope)<br>The users interact via the bot that’s added to the channel. The bot interacts with Microsoft Teams users naturally through chat, sharing the latest changes in customer sentiment.
- [Office 365 Connectors for Microsoft Teams](https://docs.microsoft.com/microsoftteams/platform/concepts/connectors/connectors)<br>Any user can connect a team to services like Trello, GitHub, Bing News, or Twitter and be notified of the team’s activity in that service. From tracking a team’s progress in Trello to following important hashtags in Twitter, Office 365 Connectors help your team to stay in sync and get more done. The connectors are used to connect to the marketing social media accounts to post new information.

**_External Sentiment Connector_**

Fabrikam recently rolled out Microsoft Teams. They’re looking to reduce the effort needed to understand external sentiment about their company and its products as expressed in various social media channels.

Fabrikam decided to optimize this process by developing services in Microsoft Azure that collect and process sentiment from various external sources. The insights extracted are then pushed to the External Sentiment channel in Fabrikam’s marketing team’s team, via their External Sentiment Connector.

<img src="../assets/images/app-scenarios/marketing-scenario-architecture.png">

|             |           |
| ------------|-----------|
| ![one](../assets/images/app-scenarios/callout-1-purple.png "one") | Social media data sources feed Azure Event Hubs. |
| ![two](../assets/images/app-scenarios/callout-2-blue.png "two") | Event Hub data to Azure Databricks. |
| ![three](../assets/images/app-scenarios/callout-3-blue.png "three") | Cognitive Services post-processes data to determine sentiment changes. |
| ![four](../assets/images/app-scenarios/callout-4-blue.png "four") | The Web App API endpoint notifies the bot. |
| ![five](../assets/images/app-scenarios/callout-5-blue.png "five") | The bot posts to the marketing team and notifies channel members. |
| ![six](../assets/images/app-scenarios/callout-6-yellow.png "six") | The marketing team discusses the response. |
| ![seven](../assets/images/app-scenarios/callout-7-yellow.png "seven") | The marketing team posts the agreed-on response to a connector. |
| ![eight](../assets/images/app-scenarios/callout-8-yellow.png "eight") | The Office 365 Connector is used to send the update to the social media platform. |

