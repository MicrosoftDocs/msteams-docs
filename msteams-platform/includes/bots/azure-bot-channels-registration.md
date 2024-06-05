---
title: Azure bot channel registration
description: With this learning module, learn about Azure bot channels for registration and how to enable Teams channel after registration.
localization_priority: Normal
ms.topic: overview
ms.author: surbhigupta12
ms.date: 06/02/2022
---

1. In the [Microsoft Azure portal](https://ms.portal.azure.com/#home), under Azure services, select **Create a resource**.
1. In the search box, enter "bot". And in the dropdown list, select **Bot Channels Registration**.
1. Select the **Create** button.
1. In **Bot Channel Registration**, provide the requested information about your bot.
1. Leave the **Messaging endpoint** box empty for now, you'll enter the required URL after deploying the bot. The following picture shows an example of the registration settings:

    ![bot app channels registration](../../assets/images/authentication/auth-bot-channels-registration.png)

1. Select **Microsoft App ID and password** and then **Create New**.

    ![Create Microsoft App ID](../../assets/images/authentication/CreateMicrosoftAppID.png)
    ![Create New Microsoft App ID](../../assets/images/authentication/CreateNewMicrosoftAppID.png)

1. Select **Create App ID in the App Registration Portal** link.

   ![App Registrations](../../assets/images/authentication/AppRegistration.png)

1. In the displayed **App registration** window, select the **New registration** tab in the upper left.
1. Enter the name of the bot application you're registering, we used *BotTeamsAuth* (you need to select your own unique name).
1. For the **Supported account types**, select *Accounts in any organizational directory (Any Microsoft Entra directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)*.
1. Select the **Register** button. Once completed, Azure displays the *Overview* page for the application.
1. Copy and save to a file the **Application (client) ID** value.
1. In the left panel, select **Certificate and secrets**.
    1. Under *Client secrets*, select **New client secret**.
    1. Add a description to identify this secret from others you might need to create for this app.
    1. Set *Expires* to your selection.
    1. Select **Add**.
    1. Copy the client secret and save it to a file.
1. Go back to the **Bot Channel Registration** window and copy the *App ID* and the *Client secret* in the **Microsoft App ID** and **Password** boxes, respectively.
1. Select **OK**.
1. Finally, select **Create**.

After Azure creates the registration resource, it's included in the resource group list.  

![bot app channels registration group](~/assets/images/authentication/auth-bot-channels-registration-group.PNG)

After Azure creates your bot channels registration, enable the Teams channel.

1. In the [Azure portal](https://ms.portal.azure.com/#home), under Azure services, select the **Bot Channel Registration** you created.
1. In the left panel, select **Channels**.
1. Select the Microsoft Teams icon, then choose **Save**.
