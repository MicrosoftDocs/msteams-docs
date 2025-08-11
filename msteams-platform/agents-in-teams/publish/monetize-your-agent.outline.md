---
title: Monetize your Teams agent  
description: Explore pricing models, SaaS offers, and in-app purchase options to generate revenue from your Microsoft Teams AI-powered agent.  
ms.localizationpriority: medium  
ms.topic: concept  
ms.date: 07/02/2025  
---
# Monetize your Teams agent  

[template instruction → Open with 70–90 words on why monetization matters—turn usage into ROI, align with customer value, and leverage Microsoft commercial marketplace.]

## 1. Marketplace monetization models  

| Model | When to pick it | Billing handled by | User purchase flow |  
|-------|-----------------|--------------------|--------------------|  
| Free | Build adoption first or upsell later | n/a | Single-click install |  
| Paid SaaS (**recommended**) | Subscription to cloud service | Microsoft commerce engine | Admin selects plan → checkout |  
| In-app purchase (IAP) | Unlock premium features | Microsoft commerce engine | User triggers paywall → Teams dialog |  
| License BYO (bring your own) | Existing customer contracts | Your backend | Manual account linking |

[template instruction → Keep each cell concise (< 12 words).]

## 2. Create a SaaS offer in Partner Center  

1. [template instruction → Bullet-form numbered list; ≤ 150 words total.]  
2. Define pricing plans (monthly, annual, private plans).  
3. Specify metered dimensions *(optional)* for usage-based billing.  
4. Connect the offer to your Teams app via **Product ID**.  
5. Enable trial or sandbox test tenants.

> [!TIP]  
> Use **Private plans** for pilots or enterprise negotiated pricing.

## 3. Activate in-app purchases (IAP)  

### Manifest changes  

```json
"subscriptionOffer": {
  "offerId": "contosoPro",
  "resource": "https://marketplace.microsoft.com"
}
```  

[template instruction → Explain each property in 1–2 sentences.]

### Payment flow  

1. User clicks premium button in Adaptive Card.  
2. Teams opens purchase dialog (TeamsJS `appInstallDialog.openPurchaseExperience`).  
3. Upon success, Teams returns `orderId` to your bot/tab.  
4. Verify entitlement via **License Service API** before unlocking features.

### Service-to-service validation  

[template instruction → Code block (pseudo) showing REST call to `https://marketplaceapi.microsoft.com/api/saas/subscriptions/{id}`.]

## 4. Handle licensing in code  

- Cache entitlement in your database.  
- Gracefully downgrade on expired license (`status=Suspended`).  
- Display **Manage Subscription** deep link in settings tab.

## 5. Revenue share & payout  

| Channel | Rev share* | Payout cadence |  
|---------|-----------|---------------|  
| Teams Store SaaS | 85 % to publisher | Monthly |  
| In-app purchase | 85 % to publisher | Monthly |  

\*Subject to Microsoft Standard Publisher Agreement.

## 6. Pricing best practices  

### Do  

- Tier plans by tangible ROI (e.g., tickets solved).  
- Offer a 14-day trial with limited actions.  

### Don’t  

- Only gate AI tokens; bundle workflow value too.  

## 7. Compliance & tax considerations  

[template instruction → 2–3 sentences noting Microsoft handles global tax, but you must submit payout and tax forms in Partner Center.]

## 8. Testing your monetized agent  

1. Enable **Preview offer ID** in Partner Center.  
2. Run `atk preview --marketplaceId <id>` to sideload with preview pricing.  
3. Validate purchase on sandbox tenants.

## Limitations  

[template instruction → ≤ 2 sentences about GCC and EDU marketplace restrictions.]

## Next step  

Return to “[Publish your agent to the Teams Store](publish-your-agent-to-teams-store.md)” to submit your monetized package.

## See also  

- [Grow adoption & track usage](grow-adoption-and-track-usage.md)  
- [In-app purchase API reference](https://learn.microsoft.com/commerce/in-app-purchase)
