---
title: SSO support for your messaging extensions
author: clearab
description: How to enable SSO support for your messaging extensions
ms.topic: conceptual
ms.author: lajanuar
---

# Single sign-on (SSO) support for messaging extensions
 
**Single sign-on** support is now available for messaging extensions and link unfurling. Enabling **Single sign-on (SSO)** for messaging extensions silently refreshes the authentication token, which minimizes the number of times you need to enter your sign in credentials for Microsoft Teams.

This document guides you on how to enable the SSO and store your authentication token, if required. 

## Prerequisites

The prerequisite to enable SSO for messaging extensions and link unfurling are as follows:
* You must have an [Azure](https://azure.microsoft.com/en-us/free/) account.
* The [app manifest](../bots/how-to/authentication/add-authentication.md#prepare-the-bot-sample-code) must be updated with details about SSO support for bots. 

## Enable SSO for messaging extensions and link unfurling

After the prerequisites are completed, you can enable SSO for messaging extensions and link unfurling.

**To enable SSO**
1. Update your bots [OAuth connection](../bots/how-to/authentication/auth-aad-sso-bots.md#update-the-azure-portal-with-the-oauth-connection) details in the Azure portal.
2. Download the [messaging extensions sample](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/52.teams-messaging-extensions-search-auth-config) and follow the setup instructions provided by the wizard.
   > [!NOTE]
   > Use your bots OAuth connection when setting up your messaging extensions.
3. In the [TeamsMessagingExtensionsSearchAuthConfigBot.cs](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/52.teams-messaging-extensions-search-auth-config/Bots/TeamsMessagingExtensionsSearchAuthConfigBot.cs) file, update the value from *auth* to *silentAuth*.

    You receive the token in `OnTeamsMessagingExtensionQueryAsync` handler in the `turnContext.Activity.Value` payload:

    ```json
    JObject valueObject=JObject.FromObject(turnContext.Activity.Value);
    if(valueObject["authentication"] !=null)
     {
        JObject authenticationObject=JObject.FromObject(valueObject["authentication"]);
        if(authenticationObject["token"] !=null)
     }
    
     ```
  
    If you want to store the token, add the following code to the TeamsMessagingExtensionsSearchAuthConfigBot.cs file:

   ```json
   protected override async Task<InvokeResponse>OnInvokeActivityAsync(ITurnContext<InvokeActivity>turnContext, CancellationToken cancellationToken)
        {
          JObject valueObject=JObject.FromObject(turnContext.Activity.Value);
          if(valueObject["authentication"] !=null)
          {
             JObject authenticationObject=JObject.FromObject(valueObject["authentication"]);
             if(authenticationObject["token"] !=null)
               {
                  //If the token is NOT exchangeable, then do NOT deduplicate requests.
                  if(await TokenIsExchangeable(turnContext, cancellationToken))
                  {
                     return await base.OnInvokeActivtiyAsync(turnContext, cancellationToken).ConfigureAwait(false);
                     //do something
                  }
                else
                  {
                     var response=new InvokeResponse();
                     response.Status=412;
                     return response;
                  }
               }
           }
        return await base.OnInvokeActivityAsync(turnContext, cancellationToken).ConfigureAwait(false);
        }
    private async Task<bool>TokenExchangeable(ITurnContext turnContext, CancellationToken cancellationToken)
        {
          TokenResponse tokenExchangeResponse=null;
          try
          {
            JObject valueObject=JObject.FromObject(turnContext.Activity.Value);
            var tokenExchangeRequest=
            ((JObject)valueObject["authentication"])?.ToObject<TokenExchangeInvokeRequest>();
            
            tokenExchangeResponse=await(turnContext.Adapter as IExtendedUserProvider).ExchangeTokenAsync(
             turnContext,
             _connectionName,
             turnContext.Activity.From.Id,
             new TokenExchangeRequest
             {
               Token=tokenExchangeRequest.Token,
             },
             cancellationToken).ConfigureAwait(false);
          }
    #pragma warning disable CA1031 //Do not catch general exception types (ignoring, see comment below)
    catch
    #pragma warning restore CA1031 //Do not catch general exception types
        {
          //ignore exceptions
          //if token exchange failed for any reason, tokenExchangeResponse above remains null, and a failure invoke response is sent to the caller.
         //This ensures the caller knows that the invoke has failed.
        }
        if (tokenExchangeResponse==null || string.IsNullOrEmpty(TokenExchangeResponse.Token))
           {
             return false;
           }
          return true;
        }
    
    ```    

## See also

> [!div class="nextstepaction"]
> [Add authentication to your messaging extensions](add-authentication.md)

> [!div class="nextstepaction"]
> [Link unfurling](link-unfurling.md)

