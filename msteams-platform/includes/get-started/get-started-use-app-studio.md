### Use App Studio to update the app package

> [!TIP]
> **Try the Developer Portal**: App Studio has evolved. Configure, distribute, and manage your Teams apps with the new [Developer Portal](https://dev.teams.microsoft.com/).

App Studio is a Teams app that you can install from the Teams store. It simplifies the creation and registration of an app.

Complete the following steps to update the app package:

1. To install App Studio in Teams, select the **Apps** icon at the bottom of the left-hand bar, and search for **App Studio**:

    <img  width="450px" alt="Finding App Studio in the Store View" src="~/assets/images/get-started/searchforAppStudio.png"/>

1. Select the **App Studio** tile and choose **Install**. The App Studio is installed:

    <img  width="450px" alt="Installing App Studio" src="~/assets/images/get-started/InstallingAppStudio.png"/>

1. To create the app package for your Teams app, select the **Manifest editor** tab in **App Studio**:

    <img  width="450px" alt="App Studio" src="~/assets/images/get-started/AppStudio.png"/>


    The sample comes with its own manifest and is designed to build an app package when the project is built. On .NET, the manifest.json file can be located in Visual Studio in Manifest under ```Microsoft.Teams.Samples.HelloWorld.Web```. On Node.js, this is done by typing `gulp` at the command line in the root directory of the project.

     In Visual Studio, the manifest.json file is located in under **Manifest** in `Microsoft.Teams.Samples.HelloWorld.Web`. This step is described by the following image:  
    
    <img  width="450px" alt="Build the app package on .NET with Visual Studio" src="~/assets/images/get-started/app-package-on-.NET-with-Visual-Studio.png"/>
    
    You can build the app package on Node.js by typing `gulp` at the command line in the root directory of the project.


    ```bash
    $ gulp
    [13:39:27] Using gulpfile ~\documents\github\msteams-samples-hello-world-nodejs\gulpfile.js
    [13:39:27] Starting 'clean'...
    [13:39:27] Starting 'generate-manifest'...
    [13:39:27] Finished 'generate-manifest' after 11 ms
    [13:39:27] Finished 'clean' after 21 ms
    [13:39:27] Starting 'default'...
    Build completed. Output in manifest folder
    [13:39:27] Finished 'default' after 62 μs
    ```

    The name of the generated app package is `helloworldapp.zip`. You can search for this file if the location isn't clear in the tool you're using.

1. Now to modify this app package, select **Import an existing app** in the **Manifest editor**:

    <img  width="450px" alt="Importing an existing app" src="~/assets/images/get-started/Importinganapp.png"/>

1. Select the **Hello World** tile for your newly imported app:

    <img  width="450px" alt="Newly imported app view" src="~/assets/images/get-started/HelloWorldappdetails.png"/>

    The following image shows the imported app package in App Studio:

    <img  width="450px" alt="Importing the app package" src="~/assets/images/get-started/Importinganapp2.png"/>

    On the left-hand side of the Manifest editor, there's a list of steps. On the right-hand side, there's a list of properties that need to be filled in for each step. As you started with a sample app, much of the information is already completed. The next steps enable you to update the properties of the Hello World app.

#### App details

Select **App details** under **Details**. Select the **Generate** button to create a new App ID.

Your new App ID is similar to `2322041b-72bf-459d-b107-f4f335bc35bd`.

Go through the app details in the right-hand pane including **Developer information** and **Branding** details. These details are important if you're writing a new app for distribution.

#### Tabs

It's simple to add tabs to a Teams app. The sample app already supports several tabs, and you can enable them.

##### Team tab

Your app can only have one Team tab:

<img  width="450px" alt="Adding a Teams tab" src="~/assets/images/get-started/TeamTab.png"/>

In this sample, the Team tab is where your configuration page is displayed. Select the **...** symbol of the **Tab configuration url** and choose **Edit** from the drop-down menu. Change the URL to `https://yourteamsapp.ngrok.io/configure` where `yourteamsapp.ngrok.io` must be replaced with the URL that you used when hosting your app.

##### Personal tabs

Your app can have up to 16 tabs, including the Team tab.

Personal tabs are different from the Team tab. **Hello Tab** is already listed in the personal tabs list with a placeholder value `com.contoso.helloworld.hellotab`. Select the **...** symbol of the **Tab configuration url** and choose **Edit** from the drop-down menu. The following dialog box appears:

<img  width="450px" alt="Adding a personal tab dialog" src="~/assets/images/get-started/PersonalTab.png"/>

Update the following boxes with your app URL:

- Change the **Content URL** box to `https://yourteamsapp.ngrok.io/hello`
- Change the **Website URL** box to `https://yourteamsapp.ngrok.io/hello`

Replace `yourteamsapp.ngrok.io` by the URL that you used when hosting your app.

#### Bots

It's easy to add the bots functionality to your app. The **Hello World** sample app already has a bot as part of the sample, but you must register it with Microsoft:

<img  width="450px" alt="Adding a bot" src="~/assets/images/get-started/Bots.png"/>

The bot that was imported from the sample doesn't have an associated App ID. You must create a new bot so that App Studio can create a new App ID and register it with Microsoft.

> [!NOTE]
> The App ID created by App Studio for the bot is different from the App ID created for the app. Each bot in an app requires its own App ID.

Complete the following steps to setup your bot:

1. Select **Delete** next to the imported bot in the bot list. Now there are no bots left to show. 
1. Select **Setup** to display the **Set up a bot** dialog box.

    <img  width="450px" alt="Adding a bot dialog" src="~/assets/images/get-started/Setupbot.png"/>

1. Add a bot name **Contoso bot** and select all three check boxes under **Scope**.
1. Choose **Save** to exit the dialog box. App Studio registers your bot with Microsoft and displays your new bot in the bot list. 
1. Now open a text file in notepad and copy and paste your new bot ID into it.
1. Click **Generate New Password**, and note the password in the same text file you noted your bot App ID.
1. Update the **Bot endpoint address** to `https://yourteamsapp.ngrok.io/api/messages`, and replace `yourteamsapp.ngrok.io` with the URL that you used when hosting your app.
1. Now save your text file as you must add the information from the file to your hosted app to allow secure communication with your bot.

#### Message extensions

Message extensions let users ask for information from your service and post that information. The information is posted in the form of cards into the channel conversation. Message extensions appear at the bottom of the compose box.

Complete the following steps to setup your message extension:

1. Select **Message extensions** under **Capabilities** in the left-hand pane of App Studio to configure the message extension:

    <img  width="450px" alt="Adding a message extension" src="~/assets/images/get-started/Messagingextensions.png"/>

    The sample message extension is listed in the **Message Extensions** pane.

1. Select **Delete** to remove the message extension, select **Set up**, and follow the same steps used for [bots](#bots). The **Message Extension** dialog box is displayed.
1. Select the **Use existing bot** tab and **Select from one of my existing bots**.
1. Select the bot you created from the drop-down menu. Add a **Bot name** and select **Save** to close the dialog box.
1. Under the **Command** section, select **Add**. To add a search-based command, select the **Allow users to query your service for information and insert that into a message** option.
1. In the **New command** dialog box, enter the following values:

    Under **New command**:

    - **Command ID**: Enter random text
    - **Title**: Enter random title
    - **Description**: Enter random description

    Under **Parameter**:

    - **Name**: Enter the parameter name
    - **Title**: Enter the card title
    - **Description**: Enter card description

1. After you enter the information, select **Save** to close the dialog box.

#### Register your app in Teams

After entering the details of your app, complete the following steps to register your app in Teams:

1. Use **Test and distribute** of App Studio to install your app in Teams. 
1. Update your hosted application with the App ID and password for your bot. For the sample app, use the same App ID and password for both bot and message extension. 
1. Select **Test and distribute**  under **Finish** in the left-hand pane of App Studio:

    <img  width="450px" alt="Testing your app" src="~/assets/images/get-started/Testanddistribute.png"/>

1. To upload your app to Teams, select the **Install** button under **Test and Distribute**:

    <img  width="450px" alt="Adding a message extension dialog" src="~/assets/images/get-started/InstallingHelloWorld.png"/>
    
    > [!NOTE]
    > If you are unable to sideload the app, verify whether you have [enabled custom app uploading](../../get-started/get-started-dotnet-app-studio.md#enable-sideloading-option).

1. Select the **Search** box in the **Add to a team** section and select a team to add the sample app. You can set up a special team for testing.
1. Select the **Install** button at the bottom of the dialog box.

    Your app is now available in Teams. However, the bot and the message extension won't work until you update the hosted applications environment with the App IDs and passwords.

    <img  width="450px" alt="The finished app" src="~/assets/images/get-started/Finishedhelloworld.png"/>
