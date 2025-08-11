---
title: Grow adoption and track usage of your Teams agent  
description: Strategies, in-product levers, and analytics tools that help you drive installs, engagement, and retention for your AI-powered agent.  
ms.localizationpriority: medium  
ms.topic: conceptual
ms.date: 07/02/2025  
---
# Grow adoption & track usage  

[Template instruction → Open with a 60–80 word paragraph summarizing why post-publish effort matters: the Store listing alone doesn’t guarantee success; you need promotion, onboarding guidance, and data-driven iteration.]

## 1. Define success metrics before launch  

[Template instruction → Bullet the 3–4 KPIs you’ll watch—installs, weekly active users, task-completion rate, CSAT.]  

## 2. Optimize your Teams Store listing  

### Do  

- Use action-oriented keywords (“Copilot”, “CRM insights”).  
- Include at least three screenshots that show Copilot interaction and chat UI.  

### Don’t  

- Reuse marketing copy from another product without context.  
[template instruction → Keep lists to ≤ 6 bullets total.]

## 3. Drive discovery inside Teams  

| Lever | What it does | How to enable |  
|-------|--------------|---------------|  
| Admin pinning | Puts your agent in left rail or message composer | Work with tenant IT and provide JSON policy |  
| Zero-install link unfurling | Suggests agent when users paste domain URLs | Add `composeExtensions.queryLink` in manifest |  
| Adaptive Card deep links | Jump users into specific actions | Use `teams.microsoft.com/l/entity/` links |  

## 4. Build a great first-run experience  

- Show a welcome card with sample prompts.  
- Pre-authenticate using SSO; avoid OAuth pop-ups.  
- Offer **Learn more** button linking to docs or video.  
[template instruction → Explain each bullet in ≤ 20 words.]

## 5. Promote outside Teams  

| Channel | Asset | Pro tip |  
|---------|-------|---------|  
| Email campaign | GIF of Copilot demo | Include admin install guide PDF |  
| Company intranet | Hero banner | Embed Store deep link |  
| Social / blog | Short demo video | Tag #MicrosoftTeamsDev |

## 6. Instrument your agent for analytics  

### In-product telemetry  

[Template instruction → Describe adding Application Insights or `@microsoft/teams-ai` telemetry hook.]  

### Teams admin analytics  

[Template instruction → Note that tenant admins can view usage by app—provide screenshot placeholder.]

### Partner Center analytics (Store)  

- Daily installs & active users  
- Ratings & reviews feed  
- Crash & error reports  

## 7. Iterate based on data  

1. Identify drop-off step (for example, users never click “Connect data”).  
2. Ship a targeted improvement (auto-detect data source).  
3. Announce update via release notes card.  
[Template instruction → Numbered list ≤ 3–4 steps.]

## 8. Common growth pitfalls  

| Pitfall | Mitigation |  
|---------|-----------|  
| Over-prompting users | Batch notifications; respect quiet hours |  
| Ignoring mobile users | Test responsive cards & tabs |  
| No feedback channel | Add thumbs-up/down or feedback form |

## Next step  

[Template instruction → Link to monetization guide.]  
Learn how to “[Monetize your agent](monetize-your-agent.md)” with SaaS offers or in-app purchases.

## See also  

- [Publish your agent to the Teams Store](publish-your-agent-to-teams-store.md)  
- [Local testing your agent](../test/local-testing-your-agent.md)
