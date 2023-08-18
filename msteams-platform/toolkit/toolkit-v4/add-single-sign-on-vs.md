---
title: Add single sign-on to your Teams app
author: surbhigupta
description: In this module, learn how to add single sign-on (SSO) of Teams Toolkit, enable SSO support, update your application to use SSO
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/20/2022
zone_pivot_groups: teams-toolkit-platform-vs
---

# Add single sign-on to your Teams app

Microsoft Teams provides single sign-on (SSO) function for an app to obtain signed in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting some of the Microsoft Azure Active Directory (Azure AD) flows and integrations behind some simple APIs. This enables you to add SSO features easily to your Teams app.

:::zone pivot="visual-studio-v17-7"

## Enable Single Sign-on in Teams Toolkit for Visual Studio

Teams provides SSO function for an app using the Teams Toolkit for Microsoft Visual Studio.

1. Open **Visual Studio**.

1. Select **Project** > **Teams Toolkit** > **Add Authentication Code**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-add-authentication-code.PNG" alt-text="Screenshot shows the add authentication code.":::

Teams Toolkit helps you generate the authentication files in **TeamsFx-Auth** folder, including a app manifest (previously called Teams app manifest) template file for Azure AD application and authentication redirect pages. Link the files to your Teams application by updating authentication configurations to ensure the SSO works for your application.

* In the Azure AD app manifest file, specify the URIs such as, the URI to identify the Azure AD authentication app and the redirect URI for returning token.
* In the app manifest file, add the SSO application to link it with Teams application.
* Add SSO application information in Teams Toolkit configuration files in order to make sure the authentication app can be registered on backend service and start Teams Toolkit when you're debugging or previewing Teams application.

## Teams tab application

1. Update Azure AD app manifest:
`TeamsFx-Auth/aad.manifest.template.json` file is an Azure AD app manifest template. You can copy and paste this file to any folder of your project, and rename as `aad.manifest.json` and take note of the path to this file. The following updates in the template to create/update an Azure AD app for SSO:

    * `identifierUris`: It's used to uniquely identify and access the resource. Set the correct redirect Uris into `identifierUris` to successfully identify this app. For more information, see [identifierUris attribute](/azure/active-directory/develop/reference-app-manifest).

        ```json
            "identifierUris":[
              "api://${{TAB_DOMAIN}}/${{AAD_APP_CLIENT_ID}}"
            ]
        ```

    * `replyUrlsWithType`: It lists registered redirect_uri values that Azure AD accepts as destinations when returning tokens. Set necessary redirect Uris into `replyUrlsWithType` to successfully return token. For more information, see [replyUrlsWithType attribute](/azure/active-directory/develop/reference-app-manifest).

        ```json
            "replyUrlsWithType":[
          {
            "url": "${{TAB_ENDPOINT}}/auth-end.html",
            "type": "Web"
          }
        ]    
        ```

        > [!NOTE]
        > Use `${{ENV_NAME}}` to reference variables in `env/.env.{TEAMSFX_ENV}`.

        ```json
            "replyUrlsWithType":[
          {
            "url": "${{TAB_ENDPOINT}}/auth-end.html",
            "type": "Web"
          },
          {
            "url": "${{TAB_ENDPOINT}}/auth-end.html?clientId=${{AAD_APP_CLIENT_ID}}",
            "type": "Spa"
          },
          {
            "url": "${{TAB_ENDPOINT}}/blank-auth-end.html",
            "type": "Spa"
          }
        ]
        ```

    * "name": It replaces the value with your expected Azure AD app name.

1. Open your app manifest file, add `WebApplicationInfo` property with the value of your SSO app. For more information, see [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo).

    ```JSON
        "webApplicationInfo": {
          "id": "${{AAD_APP_CLIENT_ID}}",
          "resource": "SAME_AS_YOUR_IDENTIFIERURIS"
        }
    ```

      > [!NOTE]
      > Update the value of resource to your `identifierUris` configed in step 1, and use `${{ENV_NAME}}` to reference envs in `env/.env.{TEAMSFX_ENV}`.

1. Open the `appPackage/manifest.json` file, and add the following code:

      ```JSON
      "webApplicationInfo": {
        "id": "${{AAD_APP_CLIENT_ID}}",
        "resource": "api://${{TAB_DOMAIN}}/${{AAD_APP_CLIENT_ID}}"
      }
      ```

1. Update the `teamsapp.yml` file and the `teamsapp.local.yml` file.

   Add Azure AD related changes and configs into your `yml` files:

    * Add `aadApp/create` under `provision`: Create new Azure AD apps used for SSO. For more information, see [aadApp/create](https://github.com/OfficeDev/TeamsFx/wiki/Available-actions-in-Teams-Toolkit#aadappcreate).

    * Add `aadApp/update` under `provision`: Update your Azure AD app with Azure AD app manifest in step 1. For more information, see [aadApp/update](https://aka.ms/teamsfx-actions/aadapp-update).

    * Update `file/createOrUpdateJsonFile`:
      Add the following environment variables when you debug locally:
        1. ClientId: Azure AD app client ID.
        1. ClientSecret: Azure AD app client secret.
        1. OAuthAuthority: Azure AD app oauth authority.

       For more information, see [file/updateJson](https://github.com/OfficeDev/TeamsFx/wiki/Available-actions-in-Teams-Toolkit#fileupdatejson).

    * In both the `teamsapp.yml` file and the `teamsapp.local.yml` file add the following code under the `provision` to create Azure AD app.

      ```yml
      - uses: aadApp/create
        with:
          name: "YOUR_AAD_APP_NAME"
          generateClientSecret: true
          signInAudience: "AzureADMyOrg"
        writeToEnvironmentFile:
          clientId: AAD_APP_CLIENT_ID
          clientSecret: SECRET_AAD_APP_CLIENT_SECRET
          objectId: AAD_APP_OBJECT_ID
          tenantId: AAD_APP_TENANT_ID
          authority: AAD_APP_OAUTH_AUTHORITY
          authorityHost: AAD_APP_OAUTH_AUTHORITY_HOST
      ```

      > [!NOTE]
      > Replace the value of "name" with your expected Azure AD app name.

    * Add the following lines under `provision` to configure Azure AD app with Azure AD app template in the step 1.

      ```json
      - uses: aadApp/update
        with:
          manifestPath: "YOUR_PATH_TO_AAD_APP_MANIFEST"
          outputFilePath : ./build/aad.manifest.${{TEAMSFX_ENV}}.json
      ```

      > [!NOTE]
      > Replace the value of `manifestPath` with the relative path of Azure AD app manifest noted in step 1. For example: `./aad.manifest.json`

    In the `teamsapp.local.yml` file:
    * Add the following code under `provision` to add Azure AD related configs to local debug service.

         ```json
            - uses: file/createOrUpdateJsonFile
              with:
                target: ./appsettings.Development.json
                appsettings:
                  TeamsFx:
                    Authentication:
                      ClientId: ${{AAD_APP_CLIENT_ID}}
                      ClientSecret: ${{SECRET_AAD_APP_CLIENT_SECRET}}
                      InitiateLoginEndpoint: ${{TAB_ENDPOINT}}/auth-start.html
                      OAuthAuthority: ${{AAD_APP_OAUTH_AUTHORITY}}
         ```

1. Update Infra
   Azure AD related configs need to be configured in your remote service. The following example shows the configs on Azure Webapp.
     1. TeamsFx__Authentication__ClientId: Azure AD app client ID.
     2. TeamsFx__Authentication__ClientSecret: Azure AD app client secret.
     3. TeamsFx__Authentication__OAuthAuthority: Azure AD app oauth authority.
  
   Example for TeamsFx Tab template.

   Open `infra/azure.parameters.json` and add following lines into `parameters`:

    ```json
   "tabAadAppClientId": {
     "value": "${{AAD_APP_CLIENT_ID}}"
   },
   "tabAadAppClientSecret": {
     "value": "${{SECRET_AAD_APP_CLIENT_SECRET}}"
   },
   "tabAadAppOauthAuthorityHost": {
     "value": "${{AAD_APP_OAUTH_AUTHORITY_HOST}}"
   },
   "tabAadAppTenantId": {
     "value": "${{AAD_APP_TENANT_ID}}"
   }
    ```
  
   Open the `infra/azure.bicep` file, find the code:

   ```
   param location string = resourceGroup().location
   ```

   Update the code as:

   ```
   param tabAadAppClientId string
   param tabAadAppOauthAuthorityHost string
   param tabAadAppTenantId string
   @secure()
   param tabAadAppClientSecret string
   ```

   In the `infra/azure.bicep` file, find the code:

   ```
   resource webApp 'Microsoft.Web/sites@2021-02-01' = {
      kind: 'app'
      location: location
      name: webAppName
      properties: {
        serverFarmId: serverfarm.id
        httpsOnly: true
        siteConfig: {
          appSettings: [
            {
              name: 'WEBSITE_RUN_FROM_PACKAGE'
              value: '1'
            }
          ]
          ftpsState: 'FtpsOnly'
        }
      }
    }
   ```

   Update the code as:

   ```
   resource webApp 'Microsoft.Web/sites@2021-02-01' = {
      kind: 'app'
      location: location
      name: webAppName
      properties: {
        serverFarmId: serverfarm.id
        httpsOnly: true
        siteConfig: {
          ftpsState: 'FtpsOnly'
        }
      }
    }

    resource  webAppConfig  'Microsoft.Web/sites/config@2021-02-01' = {
      name: '${webAppName}/appsettings'
      properties: {
        WEBSITE_RUN_FROM_PACKAGE: '1'
        TeamsFx__Authentication__ClientId: tabAadAppClientId
        TeamsFx__Authentication__ClientSecret: tabAadAppClientSecret
        TeamsFx__Authentication__InitiateLoginEndpoint: 'https://${webApp.properties.defaultHostName}/auth-start.html'
        TeamsFx__Authentication__OAuthAuthority: uri(tabAadAppOauthAuthorityHost, tabAadAppTenantId)
      }
    }
   ```

1. Update `appsettings.json` and `appsettings.Development.json` files for Azure AD related configs needs to be configure to your .Net project settings:

    ```json
    TeamsFx: {
          Authentication: {
            ClientId: AAD app client id
            ClientSecret: AAD app client secret,
            InitiateLoginEndpoint: Login Endpoint,
            OAuthAuthority: AAD app oauth authority
          }
        }
    ```

    > [!NOTE]
    > You can use use `$ENV_NAME$` to reference envs in local/remote service.

   Example for TeamsFx Tab template.
  
   Open `appsettings.json` and `appsettings.Development.json` files, and update the code:

    ```json
    "TeamsFx": { 
         "Authentication": { 
           "ClientId": "$clientId$", 
           "ClientSecret": "$client-secret$",
           "InitiateLoginEndpoint": "$TAB_ENDPOINT$/auth-start.html",
           "OAuthAuthority": "$oauthAuthority$"
         } 
       }
    ```

1. Your environment is ready and you can update your code to add SSO to your Teams app. You can find samples:
    * TeamsFx SDK: <https://www.nuget.org/packages/Microsoft.TeamsFx/>
    * Sample Code: under `TeamsFx-Auth/Tab`
  
   Example for TeamsFx Tab template.

   * Create `Config.cs` and update the code as:

        ```c
        using Microsoft.TeamsFx.Configuration;
        
             namespace {{YOUR_NAMESPACE}}
             {
                 public class ConfigOptions
                 {
                     public TeamsFxOptions TeamsFx { get; set; }
                 }
                 public class TeamsFxOptions
                 {
                     public AuthenticationOptions Authentication { get; set; }
                 }
             }
        ```

     > [!NOTE]
     > You need to replace `{{YOUR_NAMESPACE}}` with your namespace name.

   * Move the `TeamsFx-Auth/Tab/GetUserProfile.razor` file to `Components/`.
   * Add the `GetUserProfile` component to your razor page, for example:

      ```
      <h1>Hello, World</h1>
      <GetUserProfile />
      ```

    * Open the `Program.cs` file, find the code:

        ```csharp
        builder.Services.AddScoped<MicrosoftTeams>();
        ``````

      and update the code as:

      ```csharp
                var config = builder.Configuration.Get<ConfigOptions>();
                builder.Services.AddTeamsFx(config.TeamsFx.Authentication);
          ```

     > [!NOTE]
     > You need to exclude the sample code under the `TeamsFx-Auth` file to avoid build failure by adding following code into the `.csproj` file:

      ```csharp
          <ItemGroup>
          <Compile Remove="TeamsFx-Auth/**/*" />
          <None Include="TeamsFx-Auth/**/*" />
          <Content Remove="TeamsFx-Auth/Tab/GetUserProfile.razor"/>
        </ItemGroup>
          ```

   * Download `auth-start.html` and `auth-end.html` files from [GitHub Repo](https://github.com/OfficeDev/TeamsFx/tree/dev/templates/csharp/sso-tab/wwwroot) to `{ProjectDirectory}/wwwroot`.

1. To check the SSO app works as expected, run the `Local Debug` in Visual Studio.

1. You can also run the app in cloud by selecting the `Provision in the cloud` and then `Deploy to the cloud`.

## Teams bot application

1. Update Azure AD app manifest in the `TeamsFx-Auth/aad.manifest.template.json` file.
1. You can copy the file to any folder of your project, and rename as the `aad.manifest.json` file and note the path to this file for later reference. Make the following updates in the template to create/update an Azure AD app for SSO.

   * `identifierUris`: Used to uniquely identify and access the resource. You need to set correct Redirect Uris into "identifierUris" for successfully identify this app. For more information, see [identifierUris attribute](/azure/active-directory/develop/reference-app-manifest).

    Example for TeamsFx Bot Template:

    ```
    "identifierUris":[
      "api://botid-${{BOT_ID}}"
    ]
    ```

    > [!NOTE]
    > You can use `${{ENV_NAME}}` to reference variables in the `env/.env.{TEAMSFX_ENV}` file.

   * `replyUrlsWithType`: It lists registered redirect_uri values that Azure AD accepts as destinations when returning tokens. You need to set necessary Redirect Uris into "replyUrlsWithType" for successfully returning token. For more information, see [replyUrlsWithType attribute](/azure/active-directory/develop/reference-app-manifest).

    Example:

    ```
    "replyUrlsWithType":[
      {
        "url": "https://${{BOT_DOMAIN}}/bot-auth-end.html",
        "type": "Web"
      }
    ]
    ```

    > [!NOTE]
    > You can use use `${{ENV_NAME}}` to reference envs in the `env/.env.{TEAMSFX_ENV}` file.

    Example:

    ```
    "replyUrlsWithType":[
      {
      "url": "https://${{BOT_DOMAIN}}/bot-auth-end.html",
      "type": "Web"
      }
    ]
    ```

   * "name": Replace the value with your expected Azure AD app name.

1. Update app manifest
  
   * A `WebApplicationInfo` object needs to be added into your app manifest to enable SSO in the Teams app. For more information, see [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo).

    For example: open your app manifest template, and append the following object in the app manifest:

    ```
    "webApplicationInfo": {
      "id": "${{AAD_APP_CLIENT_ID}}",
      "resource": "SAME_AS_YOUR_IDENTIFIERURIS"
    }
    ```

    > [!NOTE]
    > You need to update the value of resource to your `identifierUris` configured in step 1.i, and use `${{ENV_NAME}}` to reference envs in `env/.env.{TEAMSFX_ENV}`.

    Example for TeamsFx Bot template:

    Open the `appPackage/manifest.json` file, and add the following property in the app manifest file:

    ```
    "webApplicationInfo": {
      "id": "${{AAD_APP_CLIENT_ID}}",
      "resource": "api://botid-${{BOT_ID}}"
    }
    ```

    * You can register your command under `commands` in `commandLists` of your bot:

    ```
    {
      "title": "YOUR_COMMAND_TITLE",
      "description": "YOUR_COMMAND_DESCRIPTION"
    }
    ```

    Example for TeamsFx Bot template:

    ```
    {
      "title": "show",
      "description": "Show user profile using Single Sign On feature"
    }
    ```

    Remember to delete the previous 'helloWorld' command since it isn't used.

    * Also add bot domain to `validDomain`:

    ```
    "validDomains": [
      "${{BOT_DOMAIN}}"
    ]
    ```

1. Update `teamsapp.yml` and `teamsapp.local.yml` files:
   Azure AD related changes and configs needs to be added into your `yml` files:
    * Add `aadApp/create` under `provision` for creating new Azure AD apps used for SSO. For more information, see [available actions in Teams Toolkit](https://github.com/OfficeDev/TeamsFx/wiki/Available-actions-in-Teams-Toolkit#aadappcreate).

    * Add `aadApp/update` under `provision` for updating your Azure AD app with Azure AD app manifest in step 1. For more information, see [aadApp/update](https://github.com/OfficeDev/TeamsFx/wiki/Available-actions-in-Teams-Toolkit#aadappupdate).

    * Update `file/createOrUpdateJson` File for adding the following environment variables during local debug:
        1. ClientId: Azure AD app client ID.
        1. ClientSecret: Azure AD app client secret.
        1. OAuthAuthority: Azure AD app oauth authority.
      For more information, see [file/updateJson](https://github.com/OfficeDev/TeamsFx/wiki/Available-actions-in-Teams-Toolkit#fileupdatejson).

   Example for TeamsFx Bot template

   In both `teamsapp.yml` and `teamsapp.local.yml` files:
    * Add the code under `provision` to create Azure AD app.

    ```yml
    - uses: aadApp/create
         with:
           name: "YOUR_AAD_APP_NAME"
           generateClientSecret: true
           signInAudience: "AzureADMyOrg"
         writeToEnvironmentFile:
             clientId: AAD_APP_CLIENT_ID
             clientSecret: SECRET_AAD_APP_CLIENT_SECRET
             objectId: AAD_APP_OBJECT_ID
             tenantId: AAD_APP_TENANT_ID
             authority: AAD_APP_OAUTH_AUTHORITY
             authorityHost: AAD_APP_OAUTH_AUTHORITY_HOST
    ```

      > [!NOTE]
      > Replace the value of "name" with your expected Azure AD app name.

    * Add the code under `provision` to configure Azure AD app with Azure AD app template in the step 1.

        ```json
        - uses: aadApp/update
                with:
                  manifestPath: "./aad.manifest.json"
                  outputFilePath : ./build/aad.manifest.${{TEAMSFX_ENV}}.json
        ```

      > [!NOTE]
      > Replace the value of "manifestPath" with the relative path of Azure AD app manifest noted in step 1.
            For example, './aad.manifest.json'

   In the `teamsapp.local.yml` file:
    * Update `file/createOrUpdateJsonFile` under `provision` to add Azure AD related configs to local debug service.

        ```json
        - uses: file/createOrUpdateJsonFile
                with:
                  target: ./appsettings.Development.json
                  appsettings:
                    BOT_ID: ${{BOT_ID}}
                    BOT_PASSWORD: ${{SECRET_BOT_PASSWORD}}
                    TeamsFx:
                      Authentication:
                        ClientId: ${{AAD_APP_CLIENT_ID}}
                        ClientSecret: ${{SECRET_AAD_APP_CLIENT_SECRET}}
                        OAuthAuthority: ${{AAD_APP_OAUTH_AUTHORITY}}/${{AAD_APP_TENANT_ID}}
                        ApplicationIdUri: api://botid-${{BOT_ID}}
                        Bot:
                          InitiateLoginEndpoint: https://${{BOT_DOMAIN}}/bot-auth-start
        ```

1. Update Infra Azure AD related configs to configure remote service. The following example shows the configs on Azure Webapp.
    1. TeamsFx__Authentication__ClientId: Azure AD app client ID.
    1. TeamsFx__Authentication__ClientSecret: Azure AD app client secret.
    1. TeamsFx__Authentication__OAuthAuthority: Azure AD app oauth authority.
    1. TeamsFx__Authentication__Bot__InitiateLoginEndpoint: Auth start page for Bot.
    1. TeamsFx__Authentication__ApplicationIdUri: Azure AD app identify uris.

   Example for TeamsFx Bot template:

   Open the `infra/azure.parameters.json`file, add the code to `parameters`:

   ```
   "m365ClientId": {
     "value": "${{AAD_APP_CLIENT_ID}}"
   },
   "m365ClientSecret": {
     "value": "${{SECRET_AAD_APP_CLIENT_SECRET}}"
   },
   "m365TenantId": {
     "value": "${{AAD_APP_TENANT_ID}}"
   },
   "m365OauthAuthorityHost": {
     "value": "${{AAD_APP_OAUTH_AUTHORITY_HOST}}"
   }
   ```

   Open the `infra/azure.bicep` file and find the code:

   ```
   param location string = resourceGroup().location
   ```

   Update the code as:

   ```
   param m365ClientId string
   param m365TenantId string
   param m365OauthAuthorityHost string
   param m365ApplicationIdUri string = 'api://botid-${botAadAppClientId}'
   @secure()
   param m365ClientSecret string
   ```

   Add the code before output:

   ```
   resource webAppSettings 'Microsoft.Web/sites/config@2021-02-01' = {
     name: '${webAppName}/appsettings'
     properties: {
         TeamsFx__Authentication__ClientId: m365ClientId
         TeamsFx__Authentication__ClientSecret: m365ClientSecret
         TeamsFx__Authentication__Bot__InitiateLoginEndpoint: uri('https://${webApp.properties.defaultHostName}', 'bot-auth-start')
         TeamsFx__Authentication__OAuthAuthority: uri(m365OauthAuthorityHost, m365TenantId)
         TeamsFx__Authentication__ApplicationIdUri: m365ApplicationIdUri
         BOT_ID: botAadAppClientId
         BOT_PASSWORD: botAadAppClientSecret
         RUNNING_ON_AZURE: '1'
     }
   }
   ```

   > [!NOTE]
   > If you want add additional configs to your Azure Webapp, add the configs in the webAppSettings.

1. Update the `appsettings.json` file and the `appsettings.Development.json` file for Azure AD related configs that needs to be configured to your .Net project settings:

    ```
    TeamsFx: {
      Authentication: {
        ClientId: AAD app client id
        ClientSecret: AAD app client secret,
        OAuthAuthority: AAD app oauth authority,
        ApplicationIdUri: AAD app identify uri,
        Bot: {
          InitiateLoginEndpoint: Auth start page for Bot
        }
      }
    }
    ```

    > [!NOTE]
    > You can use `$ENV_NAME$` to reference envs in local/remote service.

   Example for TeamsFx Bot template:

   Open `appsettings.json` and `appsettings.Development.json` files, and add the code:

   ```
   "TeamsFx": {
     "Authentication": {
       "ClientId": "$clientId$",
       "ClientSecret": "$client-secret$",
       "OAuthAuthority": "$oauthAuthority$",
       "ApplicationIdUri": "$applicationIdUri$",
       "Bot": {
         "InitiateLoginEndpoint": "$initiateLoginEndpoint$"
       }
     }
   }
   ```

1. Update your code to add SSO to your Teams app.
  
   You can find samples code:

    * TeamsFx SDK: [https://www.nuget.org/packages/Microsoft.TeamsFx/](https://www.nuget.org/packages/Microsoft.TeamsFx/)
    * Sample Code: under `TeamsFx-Auth/Bot`

   Example for TeamsFx Bot template:

   * Open `Config.cs` and replace the code:

    ```
    using Microsoft.TeamsFx.Configuration;

    namespace {{YOUR_NAMESPACE}}
    {
        public class TeamsFxOptions
        {
            public AuthenticationOptions Authentication { get; set; }
        }

        public class ConfigOptions
        {
            public string BOT_ID { get; set; }
            public string BOT_PASSWORD { get; set; }
            public TeamsFxOptions TeamsFx { get; set; }
        }
    }
    ```

    > [!NOTE]
    > Replace the `{{YOUR_NAMESPACE}}` property with your namespace name.
  
   * Move `TeamsFx-Auth/Bot/SSO` and `TeamsFx-Auth/Bot/Pages` files to `/`.

     > [!NOTE]
     > Remember to replace `{{YOUR_NAMESPACE}}` with your project namespace.

   * Open the `Program.cs` file, and find the code:

    ```
    builder.Services.AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>();
    ```

      Update the code as:

    ```
    builder.Services.AddRazorPages();

    // Create the Bot Framework Adapter with error handling enabled.                                        
    builder.Services.AddSingleton<IBotFrameworkHttpAdapter, AdapterWithErrorHandler>();

    builder.Services.AddSingleton<IStorage, MemoryStorage>();
    // Create the Conversation state. (Used by the Dialog system itself.)
    builder.Services.AddSingleton<ConversationState>();

    // The Dialog that will be run by the bot.
    builder.Services.AddSingleton<SsoDialog>();

    // Create the bot as a transient. In this case the ASP Controller is expecting an IBot.
    builder.Services.AddTransient<IBot, TeamsSsoBot<SsoDialog>>();

    builder.Services.AddOptions<BotAuthenticationOptions>().Configure(options =>
    {
      options.ClientId = config.TeamsFx.Authentication.ClientId;
      options.ClientSecret = config.TeamsFx.Authentication.ClientSecret;
      options.OAuthAuthority = config.TeamsFx.Authentication.OAuthAuthority;
      options.ApplicationIdUri = config.TeamsFx.Authentication.ApplicationIdUri;
      options.InitiateLoginEndpoint = config.TeamsFx.Authentication.Bot.InitiateLoginEndpoint;
    });
    ```

    Find the code:

    ```
    builder.Services.AddSingleton<HelloWorldCommandHandler>();
    builder.Services.AddSingleton(sp =>
    {
      var options = new ConversationOptions()
      {
        Adapter = sp.GetService<CloudAdapter>(),
        Command = new CommandOptions()
        {
          Commands = new List<ITeamsCommandHandler> { sp.GetService<HelloWorldCommandHandler>() }
        }
      };

      return new ConversationBot(options);
    });
    ```

    Update the code as:

    ```
    builder.Services.AddSingleton(sp =>
    {
      var options = new ConversationOptions()
      {
        Adapter = sp.GetService<CloudAdapter>(),
        Command = new CommandOptions()
        {
          Commands = new List<ITeamsCommandHandler> { }
        }
      };

      return new ConversationBot(options);
    });
    ```

    Find and delete the code:

      ```
      // Create the bot as a transient. In this case the ASP Controller is expecting an IBot.
      builder.Services.AddTransient<IBot, TeamsBot>();
      ```

    Find the code:

      ```
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
      ```

      Update the code as:

      ```
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapRazorPages();
      });
      ```
  
    > [!NOTE]
    > You need to exclude the sample code under `TeamsFx-Auth` to avoid build failure by adding the following code to `.csproj` file:

    ```
    <ItemGroup>
      <Compile Remove="TeamsFx-Auth/**/*" />
      <None Include="TeamsFx-Auth/**/*" />
      <Content Remove="TeamsFx-Auth/Tab/GetUserProfile.razor"/>
    </ItemGroup>
    ```

1. To check if SSO app works as expected, run the `Local Debug` in Visual Studio.

1. You can also run the app in cloud by selecting `Provision in the cloud` and then select `Deploy to the cloud` to update your app.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Prerequisites for creating your Teams app](tools-prerequisites-v4.md)
* [Enable SSO for tab app](~/tabs/how-to/authentication/tab-sso-overview.md)
* [Enable SSO for your bot and message extension](~/bots/how-to/authentication/bot-sso-overview.md)
* [Prepare Accounts to build your Teams app](tools-prerequisites-v4.md#accounts-to-build-your-teams-app)

:::zone-end

:::zone pivot="visual-studio-v17-6"

## Add SSO to Teams app in Visual Studio

For applications that interact with the user in a chat, Team, or channel, SSO manifests as an Adaptive Card, which the user can interact with to invoke the Azure AD consent flow.

**Advantages**

The following are the advantages of SSO in Teams:

* SSO with Azure AD refreshes the authentication token in the background, which minimizes the number of times users need to enter their sign in credentials.

* SSO signs in the user in different devices automatically, while using the app.

Teams tabs and bots have similar flow for SSO support, for more information, see:

1. [SSO authentication in Tabs](~/tabs/how-to/authentication/tab-sso-overview.md)
2. [SSO authentication in Bots](~/bots/how-to/authentication/auth-aad-sso-bots.md)

## Enable SSO support

Teams Toolkit helps you add SSO to the following Teams capabilities in Visual Studio:

* Tab
* Notification bot: Restify server
* Command bot

### Add SSO using Visual Studio

You can perform the following steps to add SSO using Teams Toolkit in Visual Studio:

1. Open **Visual Studio**.
1. Select **Create a new project** under **Get started**.

   :::image type="content" source="images/vs-2022-preview-create-proj_1-v4.png" alt-text="open visual studio code to create a new project" lightbox="images/vs-2022-preview-create-proj-v4.png":::

1. Enter **Teams** in the search box and from the list, select **Microsoft Teams app**.
1. Select **Next**.

   :::image type="content" source="images/vs-2022-preview-select-teams_1-v4.png" alt-text="Select a Microsoft Teams project by searching for teams." lightbox="images/vs-2022-preview-select-teams-v4.png":::

   The **Configure your new project** window appears.

1. Enter your **Project name**.

   > [!NOTE]
   > The project name you are entering is automatically filled in the Solution name also. If you want, you can change the solution name with no affect on project name.

1. Select **Create**.

   > [!NOTE]
   > You can change the default location of your project by selecting &#x25CF;&#x25CF;&#x25CF;.

   :::image type="content" source="images/vs-2022-preview-create-teamsapp_1-v4.png" alt-text="enter project and solution name" lightbox="images/vs-2022-preview-create-teamsapp-v4.png":::

   The **Create a new Teams application** window appears.

1. Select the required application type under **Create a new Teams application**, clear the **Configure with single sign-on** check box.

1. Select **Create**.

   :::image type="content" source="images/vs-2022-preview-create-teamsapp-sso-uncheck_1-v4.png" alt-text="select the teams app to be created and uncheck sso check box" lightbox="images/vs-2022-preview-create-teamsapp-sso-uncheck-v4.png":::

1. After the project is created, select **Project** > **Teams Toolkit** > **Add Authentication Code**.

   :::image type="content" source="images/vs-2022-preview-add-auth-code_1-v4.png" alt-text="Add authentication code" lightbox="images/vs-2022-preview-add-auth-code-v4.png":::

## Customize your project using Teams Toolkit

The following table lists the changes by Teams Toolkit:

   |**Type**|**File**|**Purpose**|
   |--------|--------|-----------|
   |Create|`aad.template.json` under `template\appPackage`|Azure AD app manifest represents your Azure AD app. `template\appPackage` helps you to register an Azure AD app during local debug or provision.|
   |Modify|`manifest.template.json` under `template\appPackage`|`webApplicationInfo` object is added into your app manifest template. Teams requires this field to enable SSO. When local debugging or provisioning is triggered, you can see the change.|
   |Modify|`appsettings.json` and `appsettings.Development.json`|Configs are added and used by TeamsFx SDK to your app settings. You can update and add the `TeamsFx` object if you have other `appsettings` files.|
   |Create|`Auth\tab`|Reference code, auth redirect pages and a `README.md` file are generated in the folder `Auth\tab` for a tab project.|
   |Create|`Auth\bot`|Reference code, auth redirect pages and a `README.md` file are generated in the folder `Auth\bot` for a bot project.|

> [!NOTE]
> Teams Toolkit makes no changes in the cloud by adding SSO, until you trigger a local debug. You can update your code to ensure SSO is working in the project.

## Update your app to use SSO

The following steps help you to enable SSO in your app:

> [!NOTE]
> The changes are based on the scaffold templates.

---
<br>
<br><details>
<summary><b>Tab project
</b></summary>

1. You can move `GetUserProfile.razor` file from the `Auth\tab` folder to the`Components\` folder. `GetUserProfile` file implements a function that uses TeamsFx SDK to call Microsoft Graph API to get the user info.

1. After getting the user info, you can replace `<AddSSO />` with `<GetUserProfile />` in the `Components/Welcome.razor` file.

</details>
<details>
<summary><b>Command bot project
</b></summary>

1. Ensure to upgrade your SDK version to:
   * TeamsFx, version 1.1.0 or later.
   * `Microsoft.Bot.Builder`, version 4.17.1 or later.

2. Create a `Pages` folder, and move files to the `Auth\bot\Pages`, which contains HTML pages that are hosted by bot app. When SSO authentication process is initiated with Azure AD, they redirect user to the HTML pages.

3. After the user is redirected to the HTML pages, you can create `SSO` folder and move files in `Auth\bot\SSO`. This folder contains three files as a reference for SSO implementation:

   * `SsoDialog.cs`: This file creates a `ComponentDialog` that is used for SSO.

   * `SsoOperations.cs`: This file implements a class in the function to get user info with SSO token. You can follow the method defined in `SsoOperations.cs` and create your own method that requires SSO token.

   * `TeamsSsoBot.cs`: This file creates a `TeamsActivityHandler` with `SsoDialog` that adds and triggers a command `showUserInfo`.

     > [!NOTE]
     > Ensure to replace `{Your_NameSpace}` with your project namespace in the three files (`SsoDialog.cs`, `SsoOperations.cs`, and `TeamsSsoBot.cs`).

     :::image type="content" source="images/vs-2022-preview-replace-namespace_1-v4.png" alt-text="Replace name space with the your name space":::

4. You can now update `Program.cs`.

    1. You can find the following code in the file `Program.cs`, and add the code blocks in step b:

       ```csharp
          builder.Services.AddSingleton<BotFrameworkAuthentication,              ConfigurationBotFrameworkAuthentication>();
       ```

    1. Add the following code blocks:

        ```csharp
         builder.Services.AddRazorPages();
           // Create the Bot Framework Adapter with error handling enabled.                                        
           builder.Services.AddSingleton<IBotFrameworkHttpAdapter, AdapterWithErrorHandler>();
           builder.Services.AddSingleton<IStorage, MemoryStorage>();
           // Create the Conversation state. (Used by the Dialog system itself.)
           builder.Services.AddSingleton<ConversationState>();
           // The Dialog that will be run by the bot.
           builder.Services.AddSingleton<SsoDialog>();
           // Create the bot as a transient. In this case the ASP Controller is expecting an IBot.
           builder.Services.AddTransient<IBot, TeamsSsoBot<SsoDialog>>();
           builder.Services.AddOptions<AuthenticationOptions>().Bind(builder.Configuration.GetSection("TeamsFx").GetSection(AuthenticationOptions.Authentication)).ValidateDataAnnotations();
           builder.Services.AddOptions<BotAuthenticationOptions>().Configure<IOptions<AuthenticationOptions>>((botAuthOption, authOptions) => {
               AuthenticationOptions authOptionsValue = authOptions.Value;
               botAuthOption.ClientId = authOptionsValue.ClientId;
               botAuthOption.ClientSecret = authOptionsValue.ClientSecret;
               botAuthOption.OAuthAuthority = authOptionsValue.OAuthAuthority;
               botAuthOption.ApplicationIdUri = authOptionsValue.ApplicationIdUri;
               botAuthOption.InitiateLoginEndpoint = authOptionsValue.Bot.InitiateLoginEndpoint;
           }).ValidateDataAnnotations();
       ```

    1. After you've added the code blocks, you can find and delete the following code in the file:

         ```csharp
        // Create the bot as a transient. In this case the ASP Controller is expecting an IBot.
        builder.Services.AddTransient<IBot, TeamsBot>();
        ```

    1. Find the following code and replace it with the codes given in step e:

        ```csharp
        app.UseEndpoints(endpoints =>
        {
          endpoints.MapControllers();
        });
        ```

    1. Replace the codes in step d with the following codes:

       ```csharp
        app.UseEndpoints(endpoints =>
        {
          endpoints.MapControllers();
          endpoints.MapRazorPages();
        });
        ```

5. You can open `Templates\appPackage\manifest.template.json`, and add the following lines under `command` in `commandLists` of your bot to register your command in the app manifest:

   ```JSON
   {
       "title": "show",
       "description": "Show user profile using Single Sign On feature"
   }
   ```

</details>
<details>
<summary><b>Add a new command to the bot
</b></summary>

The following steps help to add a new command, after you've added SSO in your project:

> [!NOTE]
> The instructions apply only to command bot.

1. You can create a new method in class `SsoOperations` in `SSO/SsoOperations` and add your own business logic to call Graph API:

    ```csharp
    public static async Task GetUserImageInfo(ITurnContext stepContext, string token, BotAuthenticationOptions botAuthOptions)
    {
        await stepContext.SendActivityAsync("Retrieving user information from Microsoft Graph ...");
        var authProvider = new DelegateAuthenticationProvider((request) =>
        {
            request.Headers.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            return Task.CompletedTask;
        });
        var graphClient = new GraphServiceClient(authProvider);
        // You can add following code to get your photo size:
        // var photo = await graphClient.Me.Photo.Request().GetAsync();
        // await stepContext.SendActivityAsync($"Size of your photo is: {photo.Width} * {photo.Height}");
    }
    ```

1. Find the following line to register a new command:

   ```csharp
      ((SsoDialog)_dialog).addCommand("showUserInfo", "show", SsoOperations.ShowUserInfo);
   ```

1. You can register the new command `"photo"` to configure the method `'GetUserImageInfo'` by adding the following code:

    ```csharp
       ((SsoDialog)_dialog).addCommand("getUserImageInfo", "photo", SsoOperations.GetUserImageInfo);
    ```

1. Open the file `templates\appPackage\manifest.template.json`, and add the following lines under `command` in `commandLists` of your bot to register your command in the app manifest:

   ```JSON
       {
           "title": "photo",
           "description": "Show user photo size using Single Sign On feature"
       }
    ```

</details>
<br>

  > [!NOTE]
  > Teams Toolkit uses the Azure AD app manifest file to register an Azure AD app for SSO. You need to press **F5** to debug your app and test your SSO configuration.

## Customize Azure AD app registration

The [Azure AD app manifest](/azure/active-directory/develop/reference-app-manifest) allows you to customize various aspects of app registration. You can update the app manifest file as needed. If you need to include more API permissions to access your required APIs, see [API permissions to access your desired APIs](https://github.com/OfficeDev/TeamsFx/wiki/#customize-aad-manifest-template).
For more information on viewing your Azure AD app in Azure portal, see [how to view Azure AD application in Azure portal](https://github.com/OfficeDev/TeamsFx/wiki/Manage-AAD-application-in-Teams-Toolkit#How-to-view-the-AAD-app-on-the-Azure-portal).

### Simplified SSO with TeamsFx

TeamsFx helps to reduce your tasks by using SSO and accessing cloud resources down to single-line statements with zero configuration. With TeamsFx SDK, you can write user authentication code with the user identity `TeamsUserCredential`, such as in a browser environment.

For more information on TeamsFx SDK, see:

* [TeamsFx SDK](../TeamsFx-SDK.md) or [API reference](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true)
* [Microsoft Teams Framework (TeamsFx) Sample Gallery](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2)

## How to use an existing Azure AD app

For more information about how to use an existing Azure AD app in your TeamsFx project, see the [steps](https://github.com/OfficeDev/TeamsFx/wiki/Using-existing-Azure-AD-app-in-TeamsFx-project).

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Prerequisites for creating your Teams app](tools-prerequisites-v4.md)
* [Enable SSO for tab app](~/tabs/how-to/authentication/tab-sso-overview.md)
* [Enable SSO for your bot and message extension](~/bots/how-to/authentication/bot-sso-overview.md)
* [Prepare Accounts to build your Teams app](tools-prerequisites-v4.md#accounts-to-build-your-teams-app)
:::zone-end
