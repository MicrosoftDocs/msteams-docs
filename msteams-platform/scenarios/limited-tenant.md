---
title: Bots for limited tenants
description: How to restrict bots to one or two tenants
keywords: single limited tenant bot authentication
ms.date: 11/29/2018
---
# Bots for one or more tenants

Bots support all tenants by design. There are situations where this is not appropriate, such as line of business apps that support one enterprise. In this case you don't want to expose your bot for consumption outside of your organization. This topic discusses how to do this by checking for specific tenant IDs.

## Node.js/Javascript

Here's how to limit bots to work with a limited number of tenants in JavaScript/Node.JS. This example supports a single tenant, but can be extended to support more than one tenant if needed.

> [!Note]
>For Microsoft Teams, the Office 365 tenant ID can be found here: `session.message.sourceEvent.tenant.id`.

1. Define an environment variable called `OFFICE_365_TENANT_FILTER` and set this variable to the ID of your specific tenant.

2. Check for the requesting tenant ID, and drop further processing of the message if the filter is set and it doesn't match the ID of the requesting tenant.

``` JavaScript

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);

// Middleware to check for OFFICE_365_TENANT_FILTER and only continue processing if it matches.
// If OFFICE_365_TENANT_FILTER is not specified, do nothing.

bot.use({
  botbuilder: function(session, next) {
    var targetTenant = typeof(process.env.OFFICE_365_TENANT_FILTER) !== "undefined" ? process.env.OFFICE_365_TENANT_FILTER : null;
    var currentMsgTenant = typeof(session.message.sourceEvent.tenant) !== "undefined" ? session.message.sourceEvent.tenant.id : null;
    if (targetTenant !== null) {
      if (targetTenant == currentMsgTenant) {
        next();
      }
      else {
        console.log("MS Teams: Attempted access from a different Office 365 tenant (" + currentMsgTenant + "): message rejected");
      }
    }
    else {
      next();
    }
  }
});

```

## C#

Here's how to limit bots to work with single or multiple tenants in C#. The SDK exposes TenantFilter, which allows you to add this action filter to the controller class as shown below.

``` C#

using Microsoft.Bot.Connector.Teams;

namespace Microsoft.Teams.Samples.HelloWorld.Web.Controllers
{
    [BotAuthentication, TenantFilter]
    public class MessagesController : ApiController
    {
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] Activity activity)
```

The tenant filter will take a comma separated list of tenantIds that are placed in web.config:

``` JSON
<configuration>
  <appSettings>
    <!--other settings-->
    <add key="AllowedTenants" value="*TenantId1,TenantId2,...*"/>

```

## Find the tenant ID using PowerShell or the Azure portal

The article [Find your Office 365 tenant ID](https://support.office.com/article/Find-your-Office-365-tenant-ID-6891b561-a52d-4ade-9f39-b492285e2c9b) shows how you can find the tenant ID using PowerShell or the Azure portal.
