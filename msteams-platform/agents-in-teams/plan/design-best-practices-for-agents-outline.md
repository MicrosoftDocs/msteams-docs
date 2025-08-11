---
title: Design best practices for AI-powered agents  
description: Guidelines for conversation flow, prompt engineering, UI surfaces, accessibility, and analytics to deliver high-quality agents in Microsoft Teams and Copilot.  
ms.localizationpriority: medium  
ms.topic: reference
ms.date: 07/02/2025  
---
# Design best practices for AI-powered agents  

[Intro – ≤ 90 words describing why good design matters: clarity for users, guardrails for the LLM, and trust for admins.]

## 1. Conversation & prompt design  

### Do  

- Write system prompts that set persona, tone, and allowed data sources.  
- Constrain actions with explicit JSON schema in `actions.parameters`.  
- Provide concrete examples for zero-shot and few-shot learning.  

### Don’t  

- Leave instructions open-ended (“do whatever the user asks”).  
- Embed secrets or URLs directly in prompts—use environment variables.  

## 2. User experience principles  

### Keep it in the flow of work  

- Prefer chat replies or Adaptive Cards over opening browser windows.  

### Progressive disclosure  

- Start with concise answers; offer “Show details” via Universal Actions.  

### Contextual grounding  

- Display citations, timestamps, and data source names to build trust.  

## 3. Surface selection guidelines  

| Scenario | Recommended surface | Rationale |  
|----------|--------------------|-----------|  
| Quick Q&A | Copilot + chat bot | Fastest feedback loop |  
| Structured input | Message extension dialog | Controlled forms |  
| Collaborative editing | Tab + Live Share | Real-time co-creation |  
| Meeting co-pilot | Side panel | Keeps content visible while speaking |  

## 4. Accessibility & theming  

- Use Adaptive Card color tokens; never hard-code hex values.  
- Ensure focus order in dialogs follows keyboard navigation.  
- Provide alt-text on images; target 4.5:1 contrast ratio.  

## 5. Performance & reliability  

- Cache frequent API calls in bot memory for the turn.  
- Keep LLM prompt + completion under 8 K tokens to avoid latency.  
- Use streaming responses for answers > 400 characters.  

## 6. Safety & compliance guardrails  

- Implement moderation on user input *and* LLM output.  
- Respect tenant sensitivity labels and data-loss-prevention policies.  
- Log function calls with user ID and timestamp for audit.  

## 7. Telemetry & measurement  

| Funnel stage | Instrumentation tip | Metric |  
|--------------|--------------------|--------|  
| Discovery | Track install & first-launch events | Daily new installs |  
| Engagement | Log `Action.Execute` invocations | Avg. tasks/user |  
| Satisfaction | Add thumbs-up/down buttons to cards | Positive % |  

> [!TIP]  
> Use **Application Insights** or **Azure Monitor** for low-code telemetry wiring via Agents Toolkit.

## 8. Iteration workflow  

1. Ship minimal-viable agent to internal ring.  
2. Observe logs, rejection reasons, Copilot planner traces.  
3. Refine prompts, card layouts, and function parameters.  
4. Repeat with a broader audience.  

## Next step  

Move on to “[Authentication & single sign-on](../integrate/authentication-and-sso.md)” to secure your agent.

## See also  

- [Choose your agent use-case](choose-your-agent-use-case.md)  
- [Agent types & capabilities](agent-types-and-capabilities.md)  
- [Tools & SDKs for building agents](../build/tools-and-sdks-for-agents.md)
