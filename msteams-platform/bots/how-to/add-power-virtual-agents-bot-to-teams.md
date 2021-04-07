---
title: Add Power Virtual Agents chatbot to Teams
author: laujan
description: integrating a Power Virtual Agents chatbot in the Teams platform
ms.topic: how-to
ms.author: lajanuar
---

# Integrate a Power Virtual Agents chatbot with Microsoft Teams

[Power Virtual Agents](/power-virtual-agents/fundamentals-what-is-power-virtual-agents) is a no-code, guided graphical interface solution that empowers every member of your team to create rich, conversational chatbots that easily integrate with the Teams platform. All content authored in Power Virtual Agents renders naturally in Teams and Power Virtual Agents bots engage with users in the Teams native chat canvas. Your IT administrators, business analysts, domain specialists, and skilled app developers can design, develop and publish intelligent virtual agents for Teams without having to setup a development environment, create a web service, or directly register with the Bot Framework.  *See* [Create a chatbot for Teams with Microsoft Power Virtual Agents](../what-are-bots.md#create-a-chatbot-for-teams-with-microsoft-power-virtual-agents).

> [!NOTE]
> By adding your chatbot to Microsoft Teams, some of the data, such as bot content and end-user chat content, is shared with Microsoft Teams. It means that your data flows outside of your [organization’s compliance and geographic or regional boundaries](/power-virtual-agents/data-location). <br/>
> For more information, see the [Security and compliance in Microsoft Teams](/MicrosoftTeams/security-compliance-overview).

## Make your chatbot available in Teams through the Power Virtual Agents portal

To make your chatbot available in Teams through the Power Virtual Agents portal, you must perform the following process steps:

**To make the chatbot available in Teams**

1. **Publish the latest bot content**  
After creating a chatbot in the [Power Virtual Agents portal](https://powervirtualagents.microsoft.com), you must publish your bot before Teams users can interact with it. For more information, see [Publish the latest bot content](/power-virtual-agents/publication-fundamentals-publish-channels#publish-the-latest-bot-content).

   ![publish in power virtual agents portal](../../assets/images/pva-publish.png)

1. **Configure the Teams channel**  
After publishing your bot, add the Teams channel to make the bot available to Teams users.

   ![channels in power virtual agents portal](../../assets/images/pva-channels.png)

1. **Generate an App ID for your chatbot**  
After adding the Teams channel to your chatbot, an **App ID** is generated in the dialog box. The App ID is a unique Microsoft generated identifier for your bot. Save the App ID to create an app package for Teams.

## Add your bot to Teams using App Studio

If [uploading custom apps is enabled](/microsoftteams/admin-settings) in your Teams instance, you can use Teams App Studio to directly upload your chatbot and start using it immediately. To share your chatbot, you can request your admin to make your bot available in the tenant app catalog or you can send others your app package and ask them to upload it independently.

1. **Install App Studio in Teams**  
App Studio is a Teams app. Install App Studio  from the Teams store that simplifies the creation and registration of your bot in Teams: 

   * Select the app store icon from the bottom of the left navigation bar in your Teams instance, and search for **App Studio**.

     &emsp;&emsp; <img  width="450px" alt="Finding App Studio in the Store" src="../../assets/images/get-started/app-studio-store.png"/>   

    * Select the **App Studio** tile and choose **Install** in the pop-up dialog box.

      &emsp;&emsp; <img  width="450px" alt="Installing App Studio" src="../../assets/images/get-started/app-studio-install.png"/>

1. **Create the Teams app manifest in App Studio**  
Bots in Teams are defined by an app manifest JSON file that provides the basic information about your bot and its capabilities. In **App Studio**, select **Manifest editor**, and select **Create a new app**.
1. **Add your bot details**  
Complete all the required fields. For a full descriptions of each field see [manifest schema definition](../../resources/schema/manifest-schema.md). 

1. **Set up your bot**                            
Navigate to the **Bots** tab, select the **Setup** button, choose **Existing bot**, and enter your bot name.

1. **Add your App ID**  
Navigate to **Connect to a different bot id** and paste in the **App Id** you copied earlier. Under scope, select **Personal** and then select **Save**.
1. **Add valid domains for your bot**  
This step is only required if your bot requires the user to sign-in. Navigate to **Domains and permissions** and  in the **Valid Domains** field, input the following:

```bash
   token.botframework.com
```

7.  **Test and distribute your bot**  
Choose the **Test and distribute** tab and choose **Install** to add your bot directly to your Teams instance. Alternately, you can download the completed app package to share with Teams users or provide it to your admin to make your bot available in the tenant app catalog.
8. **Start a chat**   
The setup process for adding your Power Virtual Agents chat bot to Teams is complete. You can now start a conversation with your bot in a personal chat.

## See also

> [!div class="nextstepaction"]
> [Publish your Power Virtual Agents bot](/power-virtual-agents/publication-fundamentals-publish-channels)
