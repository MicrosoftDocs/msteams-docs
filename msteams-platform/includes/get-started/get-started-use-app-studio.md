### Use App Studio to update the app package

App Studio is a Teams app that you can install from the Teams store. It simplifies the creation and registration of an app.

To install App Studio in Teams, click on the app store icon at the bottom of the left hand bar, and search for App Studio.

<img  width="450px" title="Finding App Studio in the Store" src="~/assets/images/get-started/app-studio-store.png"/>

Once you find the tile for App Studio, click on it and choose *install* in the dialog that pops up.

<img  width="450px" title="Installing App Studio" src="~/assets/images/get-started/app-studio-install.png"/>

Once App Studio is installed click on the Manifest editor tab to begin creating the app package for your Teams app.

<img  width="450px" title="App Studio" src="~/assets/images/get-started/app-studio.png"/>

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

In the next part of this walkthrough you are going to modify this app package by selecting the *Import an existing app* tile in the Manifest Editor (If Visual Studio was used, the file to import is helloworldapp.zip from the \Microsoft.Teams.Samples.HelloWorld.Web\bin folder).

<img  width="450px" title="Importing an app" src="~/assets/images/get-started/app-studio-import.png"/>

Once the app package has been imported App Studio should look like this:

<img  width="450px" title="Importing an app" src="~/assets/images/get-started/app-studio-imported-app.png"/>

Click on the tile for your newly imported app, *Hello World*.

<img  width="450px" title="Importing an app" src="~/assets/images/get-started/app-studio-manifest-editor.png"/>

There is a list of steps in the left-hand side of the Manifest editor, and on the right a list of properties that need to be filled in for each of those steps. Since you started with a sample app, much of the information is already filled out. The next steps will walk you through changing the parts that still need to be updated.

#### App details

Click on the *App details* entry under *Details*. The only thing you need to do here is to let App Studio create a new app identifier id for your app by clicking the *Generate* button.

Your new app id should look something like: `2322041b-72bf-459d-b107-f4f335bc35bd`.

Scroll through the rest of the App details in the right hand pane, and familiarize yourself with some of the entries such as *Developer information* and *Branding*. These sections become important when you are writing a new app for distribution.

#### Capabilities: Tabs

Tabs are among the simplest elements to add to a Teams app. The sample app already supports several tabs, and you can enable them as follows.

##### Team tab

Your app can only have one Team tab.

<img  width="450px" title="Adding a Teams tab" src="~/assets/images/get-started/app-studio-manifest-editor-tabs.png"/>

In this sample, the Team tab is where your configuration page goes. It looks like this:

`https://yourteamsapp.ngrok.io/configure` where `yourteamsapp.ngrok.io` should be replaced by the URL that you used above when hosting your app.  The url is followed by '/configure".

##### Personal tabs

Your app can have up to 16 tabs, including the team tab.

Personal tabs are represented differently from the team tab. You should see *Hello Tab* already listed in the personal tabs list. At the moment it has a placeholder value `com.contoso.helloworld.hellotab`. Click on the *...* symbol at the end of the entry and choose *Edit* from the drop-down. The following dialog will appear.

<img  width="450px" title="Adding a personal tab dialog" src="~/assets/images/get-started/app-studio-manifest-editor-p-tabs-dialog.png"/>

There are two fields that you need to update with your app URL.

- Change Content URL to https://yourteamsapp.com/hello
- Change Website URL to https://yourteamsapp.com/hello

#### Bots

Bots are the most common way to add functionality to your app. The hello world sample already has a bot as part of the sample, but it has not been registered with Microsoft yet.

<img  width="450px" title="Adding a bot" src="~/assets/images/get-started/app-studio-manifest-editor-bots.png"/>

The bot that was imported from the sample does not have an App ID associated with it yet. You will have to create a new bot so that App Studio can create a new App ID and register it with Microsoft.  Note that this is the App ID for the bot, which is different from the App ID that we created for the app in a earlier step. Each bot in an app requires its own App ID.

Click the *delete* button next to the *Imported bot* in the bot list.

<img  width="450px" title="Adding a bot dialog" src="~/assets/images/get-started/app-studio-manifest-editor-bot-dialog.png"/>

Now there are no bots left to show.  Click *Setup*. This will display the *Set up a bot* dialog.

<img  width="450px" title="Adding a bot dialog" src="~/assets/images/get-started/app-studio-manifest-editor-bots-setup-dialog.png"/>

Add a bot name such as `Contoso bot`, and click both the buttons under *scope*.

Choose *Create bot* to exit the dialog.  App Studio will spend a moment registering your bot with Microsoft, and then should display your new bot in the bot list. Now would be a good time to open a text file in notepad and copy and paste your new bot id into it. You will need this id later.

Now look under *App Secrets* in the *Bots* pane of App Studio, and click *Manage*. This should open a browser and take you to the *My Applications* page at https://apps.dev.microsoft.com/#/appList.

On this page click on the name of your bot. This will take you to the *Contoso bot Registration* page. Here you will need to click *Generate New Password*, and make a note of the password in the same text file you noted your Bot app ID in.  This is the only time your password will be shown, so be sure to do this now.

Scroll to the bottom of this page and click *Save*.  Now would also be a good time to save your text file if you have not done so already. You will add this information to your hosted app later in this walkthrough, which will allow secure communication with your bot.

#### Messaging extensions

Messaging extensions let users ask for information from your service and post that information, in the form of cards, right into the channel conversation. Messaging extensions appear along the bottom of the compose box.

The sample app has a messaging extension, which you can enable by clicking on *Messaging extensions* under *Capabilities* in the left hand column of App Studio.

<img  width="450px" title="Adding a messaging extension" src="~/assets/images/get-started/app-studio-manifest-editor-mess-ext.png"/>

The sample messaging extension is listed in the right hand pane under *Messaging Extensions*. Click *Delete* again to remove this entry, and then click the *Set up* button following the same steps as you followed for bots. This will display the *Messaging Extension* dialog.

<img  width="450px" title="Adding a messaging extension" src="~/assets/images/get-started/app-studio-manifest-editor-mess-ext-dialog.png"/>

In the *Messaging Extension* dialog, choose the *Existing* tab, then under *Bot ID* choose *Select from one of my existing bots*.

In the drop down below *Bot ID* expand the drop down and choose the ID of the bot you created previously, and then choose the *Save* button. This returns you to the main page for *Messaging Extensions*.

You now need to add a *Command* to your messaging extension. Do this by clicking the *Add* button in the *Command* section of *Messaging Extensions*. The *New command* dialog will appear.

<img  width="450px" title="Adding a messaging extension command" src="~/assets/images/get-started/app-studio-manifest-editor-command-dialog.png"/>

In the *New command* dialog enter the following values.

Under *New command*:

- *Command ID*  = getRandomText
- *Title*       = Get some random text for fun
- *Description* = Gets some random text and images

Under *Parameter*:

- *Name*        = cardTitle
- *Title*       = Card title
- *Description* = Card title to use

And finally click the *Save* button. You are now done with configuring your messaging extension.

#### Register your app in Teams

You have now completed entering the details of your app, but two steps remain. First you must use the Test and Distribute section of App Studio to install your app in Teams, and second you must update your hosted application with the App ID and password for your bot. Remember that the sample expects to use the same App ID and password for both the bot and the messaging extension.

Click on the *Test and distribute* item under *Finish* in the left hand column of App Studio.

<img  width="450px" title="Testing your app" src="~/assets/images/get-started/app-studio-manifest-editor-test.png"/>

In order to upload your app to Teams, click the *Install* button under *Test and Distribute*.

<img  width="450px" title="Adding a messaging extension dialog" src="~/assets/images/get-started/app-studio-manifest-editor-test-dialog.png"/>

Be careful what team you add the app to. Most often you will want to set up a special team for testing.

Once you do this, the *Install* button at the bottom of the dialog is activated and can be chosen to finish this process.

This finishes the App Studio portion of this walkthrough.  You should now see your app running in Teams, however the bot and the messaging extension will not work until you update the hosted applications environment to know what the App IDs and passwords are.

<img  width="450px" title="The finished app" src="~/assets/images/get-started/app-studio-finished-app.png"/>
