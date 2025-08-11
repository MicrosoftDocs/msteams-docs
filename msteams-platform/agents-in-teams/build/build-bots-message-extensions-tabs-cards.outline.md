FILE: teams-platform/build/build-bots-message-extensions-tabs-cards.md  
SOURCES:  
- bots/build-a-bot.md  
- messaging-extensions/build-bot-based-agent.md  
- tabs/what-are-tabs.md  
- task-modules-and-cards/what-are-cards.md  

OUTLINE:
---
title: Build bots, message extensions, tabs, and cards for your agent  
description: Implement conversational logic, rich UI surfaces, and interaction patterns that bring your AI-powered agent to life in Microsoft Teams.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Build bots, message extensions, tabs, and cards  
[template instruction → One-sentence overview: “This guide shows how to wire up core Teams capabilities—bots, message extensions, tabs, and Adaptive Cards—around your agent’s AI logic.”]

## Prerequisites  
- Completed “[Quick-start guide](../get-started/quick-start-guide.md)”  
- Agents Toolkit CLI or IDE extension installed  
- Teams AI library configured in your project  

## 1. Add conversational bot logic  
### Scaffold a bot endpoint  
```bash
atk add bot --name HelpDeskBot
```  
[template instruction → Explain generated folders and Bot Framework adapter integration.]  

### Register handlers with Teams AI library  
```ts
app.message(/.*/, async (context, state) => {
  const response = await planner.completePrompt(context);
  await context.sendActivity(response);
});
```  
[template instruction → ≤ 100 words explanation.]

### Enable SSO & user context  
[template instruction → One code block `authentication.getAuthToken` + explanation.]

## 2. Expose actions through message extensions  
### Define search & action commands in manifest  
```json
"composeExtensions": [{
  "botId": "{{BOT_ID}}",
  "commands": [{
    "id": "createTicket",
    "type": "action",
    "title": "Create ticket",
    "description": "Open help-desk ticket"
  }]
}]
```  
### Handle `invoke` in code  
[template instruction → JS/TS snippet that returns Adaptive Card dialog.]

## 3. Surface information with tabs  
### Add a personal tab  
```bash
atk add tab --name Dashboard --personal
```  
[template instruction → Link to TeamsJS pages.tabs API for navigation.]  

### Embed Live Share canvas (optional)  
[template instruction → bullet with link.]

## 4. Craft engaging Adaptive Cards  
### Basic answer card  
```json
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.6",
  "body": [
    { "type": "TextBlock", "text": "${answer}", "wrap": true }
  ],
  "actions": [
    { "type": "Action.Execute", "title": "More", "verb": "followUp" }
  ]
}
```  
[template instruction → Show how to bind `${answer}` from LLM output.]

### Universal Actions for up-to-date views  
[template instruction → 2–3 sentence explanation + link to UA guide.]

## 5. Connect everything through the planner  
[template instruction → Describe calling bot functions from cards via `Action.Execute`, storing state, and triggering planner steps.]

## Testing checklist  
- Bot responds in chat and channel scopes  
- Message extension dialog loads and returns card  
- Tab renders in Teams, Outlook, Microsoft 365 hub  
- Card buttons invoke `adaptiveCard/action` successfully  

## Next step  
Move on to “[Local testing your agent](../test/local-testing-your-agent.md)” to validate these capabilities end-to-end.

## See also  
- [Tools & SDKs for building agents](tools-and-sdks-for-agents.md)  
- [Design best practices for agents](../plan/design-best-practices-for-agents.md)