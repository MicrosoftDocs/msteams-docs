---
title: Publish your agent to the Teams Store  
description: Step-by-step instructions for packaging, validating, and submitting your AI-powered agent so millions of Microsoft Teams users can discover and install it.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Publish your agent to the Teams Store  

[Template instruction → Open with one sentence summarizing the goal: “You’ll learn how to turn your local agent project into a production-ready package and submit it for Store approval.”]

## Prerequisites  

[Template instruction → List 3-5 bullets only.]  

- Agent has passed **local validation** (`atk validate`) with no errors.  
- Icons, screenshots, and marketing text prepared per Store guidelines.  
- Publisher has completed **Partner Center** account verification.  
- Admin rights to grant app permissions in target tenant (for testing).

## Step 1 – Build the app package  

[Template instruction → ≤ 150 words describing the Toolkit command.]  

```bash
atk package --env prod
```  

Outputs `teamsApp.zip` containing `manifest.json + icons`.

### What’s inside  

| File | Purpose |  
|------|---------|  
| manifest.json | Declares agent, icons, permissions |  
| color.png | 192 × 192 color icon |  
| outline.png | 192 × 192 outline icon |

## Step 2 – Validate with Store rules  

[Template instruction → Emphasize additional policy checks.]  

```bash
atk validate --rules store
```  

Fix any *error* or *critical* warnings (for example, unsuitable descriptions, missing privacy URL).

## Step 3 – Upload in Partner Center  

1. [Template instruction → Use numbered list.] Sign in to **Partner Center › Teams Store › New submission**.  
2. Upload `teamsApp.zip`.  
3. Fill in Store listing details:  
   - **Short description** (≤ 80 chars)  
   - **Long description** (≤ 4,000 chars, supports Markdown)  
   - Category, search keywords, pricing.  
4. Add **screenshots** (1366 × 768) + **video** (optional).  
5. Specify regional availability and languages.  
6. Click **Save draft**.

## Step 4 – Configure SaaS or in-app purchase *(optional)*  

[Template instruction → 2-3 sentences with link to monetization guide.]

## Step 5 – Submit for review  

- Partner Center runs automated tests (≈ 10 min).  
- Manual review SLA: 3–5 business days.  
- Track status under **Submissions** tab.

## Step 6 – Respond to validation feedback  

[Template instruction → Use callout >NOTE.]  
> If the app is rejected, open the review report, fix highlighted issues (e.g., missing consent flow), increment `version`, rebuild `teamsApp.zip`, and **Resubmit**.

## Post-publish actions  

- **Promote**: generate Store deep link and share with customers.  
- **Monitor**: view installs & ratings in Partner Center analytics.  
- **Update**: submit new versions—only `version` field must increment; existing users receive auto-update.

## Troubleshooting  

| Issue | Fix |  
|-------|-----|  
| “Icon size invalid” | Provide 192 × 192 PNG ≤ 32 KB. |  
| `scopeConstraints` error | Remove classic-only settings; agents use `defaultInstallScope`. |  
| App stuck in “In review” | Reply to reviewer note or create Partner Center support ticket. |

## Next step  

[Template instruction → Link to adoption article.]  
Proceed to “[Grow adoption & track usage](grow-adoption-and-track-usage.md)” to maximize your agent’s reach.

## See also  

- [Manifest validation workflow](../test/manifest-validation-workflow.md)  
- [Monetize your agent](monetize-your-agent.md)
