---
title: Add single sign-on to your Teams app
author: surbhigupta
description: In this module, learn how to add single sign-on (SSO) of Teams Toolkit, enable SSO support, update your application to use SSO
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/20/2022
---

# Add single sign-on to your Teams app

Microsoft Teams provides single sign-on (SSO) function for an app to obtain signed in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting some of the Microsoft Azure Active Directory (Azure AD) flows and integrations behind some simple APIs. This enables you to add SSO features easily to your Teams app.

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
   |Create|`aad.template.json` under `template\appPackage`|Azure AD application manifest represents your Azure AD app. `template\appPackage` helps you to register an Azure AD app during local debug or provision.|
   |Modify|`manifest.template.json` under `template\appPackage`|`webApplicationInfo` object is added into your Teams app manifest template. Teams requires this field to enable SSO. When local debugging or provisioning is triggered, you can see the change.|
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

5. You can open `Templates\appPackage\manifest.template.json`, and add the following lines under `command` in `commandLists` of your bot to register your command in the Teams app manifest:

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

1. Open the file `templates\appPackage\manifest.template.json`, and add the following lines under `command` in `commandLists` of your bot to register your command in the Teams app manifest:

   ```JSON
       {
           "title": "photo",
           "description": "Show user photo size using Single Sign On feature"
       }
    ```

</details>
<br>

  > [!NOTE]
  > Teams Toolkit uses the Azure AD manifest file to register an Azure AD app for SSO. You need to press **F5** to debug your app and test your SSO configuration.

## Customize Azure AD app registration

The [Azure AD app manifest](/azure/active-directory/develop/reference-app-manifest) allows you to customize various aspects of app registration. You can update the manifest file as needed. If you need to include more API permissions to access your required APIs, see [API permissions to access your desired APIs](https://github.com/OfficeDev/TeamsFx/wiki/#customize-aad-manifest-template).
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
