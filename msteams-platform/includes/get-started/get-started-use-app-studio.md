### Use App Studio to update the app package

App Studio is a Teams app that you can install from the Teams store. It simplifies the creation and registration of an app.

To install App Studio in Teams, click on the app store icon at the bottom of the left hand bar, and search for App Studio.

<img  width="450px" alt="Finding App Studio in the Store View" src="~/assets/images/get-started/searchforAppStudio.png"/>

Once you find the tile for App Studio, click on it and choose *install* in the dialog that pops up.

<img  width="450px" alt="Installing App Studio" src="~/assets/images/get-started/InstallingAppStudio.png"/>

Once App Studio is installed click on the Manifest editor tab to begin creating the app package for your Teams app.

<img  width="450px" alt="App Studio" src="~/assets/images/get-started/AppStudio.png"/>

The sample comes with its own pre-made manifest, and is designed to build an app package when the project is built. On .NET this is done in Visual Studio, and on Node JS this is done by typing `gulp` at the command line in the root directory of the project.

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

The name of the generated app package is *helloworldapp.zip*. You can search for this file if the location is not clear in the tool you are using.

In the next part of this walkthrough you are going to modify this app package by selecting the *Import an existing app* tile in the Manifest Editor.

<img  width="450px" alt="Importing an existing app" src="~/assets/images/get-started/Importinganapp.png"/>

Once the app package has been imported App Studio should look like this:

<img  width="450px" alt="Importing the app package" src="~/assets/images/get-started/Importinganapp2.png"/>

Click on the tile for your newly imported app, *Hello World*.

<img  width="450px" alt="Newly imported app view" src="~/assets/images/get-started/HelloWorldappdetails.png"/>

There is a list of steps in the left-hand side of the Manifest editor, and on the right a list of properties that need to be filled in for each of those steps. Since you started with a sample app, much of the information is already filled out. The next steps will walk you through changing the parts that still need to be updated.

#### App details

Click on the *App details* entry under *Details*. Click the *Generate* button to create a new app id.

Your new app id should look something like: `2322041b-72bf-459d-b107-f4f335bc35bd`.

Look through the rest of the App details in the right hand pane, and familiarize yourself with some of the entries such as *Developer information* and *Branding*. These sections are important if you are writing a new app for distribution.

#### Capabilities: Tabs

Tabs are among the simplest elements to add to a Teams app. The sample app already supports several tabs, and you can enable them as follows.

##### Team tab

Your app can only have one Team tab.

<img  width="450px" alt="Adding a Teams tab" src="~/assets/images/get-started/TeamTab.png"/>

In this sample, the Team tab is where your configuration page goes. Click on the *...* symbol at the end of the entry and choose *Edit* from the drop-down. Change the URL to `https://yourteamsapp.ngrok.io/configure` where `yourteamsapp.ngrok.io` should be replaced by the URL that you used above when hosting your app.

##### Personal tabs

Your app can have up to 16 tabs, including the team tab.

Personal tabs are represented differently from the team tab. You should see *Hello Tab* already listed in the personal tabs list. At the moment it has a placeholder value `com.contoso.helloworld.hellotab`. Click on the *...* symbol at the end of the entry and choose *Edit* from the drop-down. The following dialog will appear.

<img  width="450px" alt="Adding a personal tab dialog" src="~/assets/images/get-started/PersonalTab.png"/>

There are two fields that you need to update with your app URL.

- Change Content URL to `https://yourteamsapp.ngrok.io/hello`
- Change Website URL to `https://yourteamsapp.ngrok.io/hello`

Where `yourteamsapp.ngrok.io` should be replaced by the URL that you used above when hosting your app.

#### Bots

Bots are the most common way to add functionality to your app. The hello world sample already has a bot as part of the sample, but it has not been registered with Microsoft yet.

<img  width="450px" alt="Adding a bot" src="~/assets/images/get-started/Bots.png"/>

The bot that was imported from the sample does not have an App ID associated with it yet. You will have to create a new bot so that App Studio can create a new App ID and register it with Microsoft. Note that this is the App ID for the bot, which is different from the App ID that we created for the app in a earlier step. Each bot in an app requires its own App ID.

Click the *delete* button next to the *Imported bot* in the bot list.

Now there are no bots left to show. Click *Setup*. This will display the *Set up a bot* dialog.

<img  width="450px" alt="Adding a bot dialog" src="~/assets/images/get-started/Setupbot.png"/>

Add a bot name such as `Contoso bot`, and click both the buttons under *scope*.

Choose *Create bot* to exit the dialog. App Studio will spend a moment registering your bot with Microsoft, and then should display your new bot in the bot list. Now would be a good time to open a text file in notepad and copy and paste your new bot id into it. You will need this id later.

Click *Generate New Password*, and make a note of the password in the same text file you noted your Bot app ID in. This is the only time your password will be shown, so be sure to do this now.

Update the *Bot endpoint address* to `https://yourteamsapp.ngrok.io/api/messages`, where `yourteamsapp.ngrok.io` should be replaced by the URL that you used above when hosting your app.

Now would be a good time to save your text file if you have not done so already. You will add this information to your hosted app later in this walkthrough, which will allow secure communication with your bot.

#### Messaging extensions

Messaging extensions let users ask for information from your service and post that information, in the form of cards, right into the channel conversation. Messaging extensions appear along the bottom of the compose box.

Click on *Messaging extensions* under *Capabilities* in the left hand column of App Studio to begin configuring the messaging extension.

<img  width="450px" alt="Adding a messaging extension" src="~/assets/images/get-started/Messagingextensions.png"/>

The sample messaging extension is listed in the right hand pane under *Messaging Extensions*. Click *Delete* again to remove this entry, and then click the *Set up* button following the same steps as you followed for bots. This will display the *Messaging Extension* dialog.

Select the *Use existing bot* tab, then *Select from one of my existing bots*. In the drop-down menu, select the bot you created in the section above. Add a *Bot name* and click *Save* to close the dialog.

Under the *Command* section, click *Add*. We're adding a search-based command, so choose the *Allow users to query your service...* option.

In the *New command* dialog enter the following values.

Under *New command*:

- *Command ID*  = getRandomText
- *Title*       = Get some random text for fun
- *Description* = Gets some random text and images

Under *Parameter*:

- *Name*        = cardTitle
- *Title*       = Card title
- *Description* = Card title to use

Once you're entered the information, click *Save* to close the dialog.

#### Register your app in Teams

You have now completed entering the details of your app, but two steps remain. First you must use the Test and Distribute section of App Studio to install your app in Teams, and second you must update your hosted application with the App ID and password for your bot. Remember that the sample expects to use the same App ID and password for both the bot and the messaging extension.

Click on the *Test and distribute* item under *Finish* in the left hand column of App Studio.

<img  width="450px" alt="Testing your app" src="~/assets/images/get-started/Testanddistribute.png"/>

In order to upload your app to Teams, click the *Install* button under *Test and Distribute*.

<img  width="450px" alt="Adding a messaging extension dialog" src="~/assets/images/get-started/InstallingHelloWorld.png"/>

Click on the *Search* box in the *Add to a team* section and select a team to add the sample app to. Usually you will want to set up a special team for testing.

Click the *Install* button at the bottom of the dialog.

This finishes the App Studio portion of this walkthrough. You should now see your app running in Teams, however the bot and the messaging extension will not work until you update the hosted applications environment to know what the App IDs and passwords are.

<img  width="450px" alt="The finished app" src="~/assets/images/get-started/Finishedhelloworld.png"/>
