FILE: teams-platform/resources/frequently-asked-questions.md  
SOURCES:  
- teams-faq.md (all sections)  
- resources/troubleshoot.md (generic Q&A)  

OUTLINE:
---
title: Frequently asked questions for Microsoft Teams developers  
description: Answers to common questions about building, testing, and publishing Teams apps and AI-powered agents.  
ms.localizationpriority: medium  
ms.topic: troubleshooting  
ms.date: 07/02/2025  
---
# Frequently asked questions – Microsoft Teams developer platform  
[template instruction → Begin with a one-sentence intro that sets expectation: “This page aggregates the questions we hear most often from developers building traditional Teams apps and AI-powered agents.”]

## General  
### Q1. What’s the difference between a classic Teams app and an AI-powered agent?  
[template instruction → Answer in ≤ 120 words: compare manifest versions, Copilot integration, and host coverage.]

### Q2. Which languages and SDKs are officially supported?  
[template instruction → List JS/TS, .NET, Python, and link to SDK hub.]

### Q3. Can I migrate my existing Teams app to an agent?  
[template instruction → Explain adding `copilotAgents` to manifest, point to migration guide.]

## Tooling & setup  
### Q4. Do I need both Agents Toolkit and Teams Toolkit?  
[template instruction → Clarify that Agents Toolkit supersedes classic Toolkit for new projects but both can coexist.]

### Q5. How do I set up a free Microsoft 365 developer tenant?  
[template instruction → Short answer + link.]

### Q6. Dev tunnel vs. ngrok—what should I use?  
[template instruction → Two-sentence comparison and link to setup doc.]

## Authentication & Microsoft Graph  
### Q7. Why do I get `AADSTS65001` even after granting consent?  
[template instruction → Cover missing scope in token claim.]

### Q8. Does Outlook support Teams SSO tokens?  
[template instruction → Yes, same JWT audience; explain redirect URI requirement.]

## Copilot & agents  
### Q9. How does Copilot discover my agent’s skills?  
[template instruction → Mention planner, manifest `actions`, refresh after sideload.]

### Q10. What token limits apply to prompts and responses?  
[template instruction → Provide current 8 K token guidance.]

### Q11. Are agents available in government clouds?  
[template instruction → Preview timeline or limitation.]

## Notifications  
### Q12. Why aren’t my activity-feed notifications appearing on mobile?  
[template instruction → Explain tenant admin policy + quiet hours.]

## Testing & debugging  
### Q13. How can I test Copilot interactions without publishing?  
[template instruction → Mention Microsoft 365 Agents Playground.]

### Q14. Local debug fails with “package error 1102”.  
[template instruction → Explain mismatched schema vs. Teams client version.]

## Publishing & monetization  
### Q15. What is the revenue share for paid SaaS offers?  
[template instruction → 85 % developer / 15 % Microsoft.]

### Q16. How long does Store review take?  
[template instruction → Typical 3–5 business days, variables.]

### Q17. Can I sell outside the Teams Store?  
[template instruction → Explain BYO licensing vs Store compliance.]

## Cross-platform (Outlook & Microsoft 365)  
### Q18. Why doesn’t my message extension appear in Outlook?  
[template instruction → Check `extensions.requirements` and host version.]

### Q19. Does Live Share work in Outlook meetings?  
[template instruction → Not yet; roadmap note.]

## See also  
- [Troubleshooting tips](../test/troubleshooting-tips.md)  
- [SDK & API reference hub](../reference/sdk-and-api-reference-hub.md)  
- [Authentication and single sign-on](../integrate/authentication-and-sso.md)