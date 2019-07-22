---
title: "Quickstart: Create a Personal tab with ASP.NET Core" 
author: laujan 
description: A quickstart guide to creating a custom personal tab with ASP.NET Core
ms.topic: quickstart 
ms.author: laujan 
---
# Quickstart: Create a custom Personal Tab with ASP.NET Core

In this quickstart we'll walk-through creating a custom personal tab with C# and [ASP.Net Core](AspNetCore.Docs/aspnetcore/index) [Razor Pages](/aspnet/AspNetCore.Docs/aspnetcore/mvc/views/razor).  We'll also use [App Studio for Microsoft Teams](/msteams-platform/get-started/get-started-app-studio.md) to test your tab's Teams integration.

[!INCLUDE [dotnet-core-prereq](../../includes/tabs/dotnet-core-prereq.md)]

## Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple [Personal Tab](OfficeDev/msteams-samples/samples/dotnet/tabs/personalTab) project to get you started.To retrieve the source code you can download the zip folder and extract the files or [clone](https://help.github.com/en/articles/cloning-a-repository) the sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/msteams-samples.git
```

Once you have the source code, open Visual Studio and select *Open a project or solution*. Navigate to the tab application directory, and open **personalTab.sln**.

To build and run your application select *F5* or choose *Start Debugging* from the *Debug* menu.In a browser navigate to the URLs below to verify that the application loaded properly:

- `http://localhost:44325/`
- `http://localhost:44325/personal`
- `http://localhost:44325/privacy`
- `http://localhost:44325/tou`

## Review the source code

### Startup.cs

This project was created from an ASP.NET Core 2.2 Web Application empty template with the **Advanced - Configure for HTTPS* check box selected at setup. The MVC services are registered by the dependency injection framework's **ConfigureServices()** method. Additionally, the empty template doesn't enable serving static content by default, so we the static files middleware is added to the **Configure()** method:

```csharp
public void ConfigureServices(IServiceCollection services)
        {
           services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }
public void Configure(IApplicationBuilder app)
        {
        app.UseStaticFiles();
        app.UseMvc();
        }
```

### wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files.

### Index.cshtml

ASP.NET Core treats files called *Index* as the default/home page for the site. When your browser URL points to the root of the site, **Index.cshtml** will be displayed as the home page for your application.

### App Manifest folder

This folder contains the following required app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your tab and points to required resources like the tab.cshtml page.

These files need to be zipped in an app package for use in uploading your tab to Teams. Microsoft Teams will load the *contentUrl*, specified in your manifest, load it in an IFrame, and render it in your tab.

### .csproj

In the Visual Studio Solution Explorer window right-click on the project and select **Edit Project File**. At the bottom of the file you'll see the code that creates and updates your zip folder when the application builds:

```xml
<PropertyGroup>
    <PostBuildEvent>powershell.exe Compress-Archive -Path \"$(ProjectDir)AppManifest\*\" -DestinationPath \"$(TargetDir)tab.zip\" -Force</PostBuildEvent>
  </PropertyGroup>

  <ItemGroup>
    <EmbeddedResource Include="AppManifest\icon-outline.png">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="AppManifest\icon-color.png">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="AppManifest\manifest.json">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
  </ItemGroup>
```

## Update your application

### _Layout.cshtml

For your tab to display in Teams, you must include the **Microsoft Teams JavaScript client SDK** and include a call to the Teams SDK—**microsoftTeams.initialize()**—;within your tab page &#60;script&#62; tags. This is how your tab and the Teams app communicate:

- Navigate to the **Shared** folder, open **_Layout.cshtml**, and add the following to the &#60;**head**&#62; tags section:

```html
`<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>`
`<script src="https://statics.teams.microsoft.com/sdk/v1.4.3/js/MicrosoftTeams.min.js"></script>`
```

>[!IMPORTANT]
>Don't copy/paste the &#60;script src="..." URLs from this page, they may not represent the latest version. To get the latest version of the SDK markup, always go to:
**foo.md(SDK)** and [jQuery CDN - Latest Stable Versions](https://code.jquery.com) or [Microsoft jQuery Releases on the CDN.](/aspnet/ajax/cdn/overview#jquery-releases-on-the-cdn)

### Personal.cshtml

Open **PersonalTab.cshtml** and update the embedded &#60;**script**&#62; tags by calling `microsoftTeams.initialize();`.

Make sure to save the updated **Personal.html and your personal tab content page is complete.

[!INCLUDE [dotnet-ngrok-intro](../../includes/tabs/dotnet-ngrok-intro.md)]

- Open a command prompt in the root of your project directory and run the following command:

```bash
ngrok http https://localhost:44325 -host-header="localhost:44325"
```

- Ngrok will listen to requests from the internet and will route them to your application when it is running on port 44325.  It should resemble `https://y8rPrT2b.ngrok.io/` where *y8rPrT2b* is replaced by your ngrok alpha-numeric HTTPS URL.

-Be sure to keep the command prompt with ngrok running, and to make a note of the URL—you'll need it later.

- Verify that *ngrok* is running and working properly by opening your browser and going to your content page via the ngrok HTTPS URL that was provided in your command prompt window.

>[!TIP]
>You need to have both your application in Visual Studio and ngrok running to complete this quickstart. If you need to stop running your application in Visual Studio to work on it **keep ngrok running**. It will continue to listen and will resume routing your application's request when it restarts in Visual Studio. If you have to restart the ngrok service it will return a new URL and you'll have to update every place that uses that URL.

### Run your application

- In Visual Studio press **F5** or choose **Start Debugging** from your application's **Debug** menu.

## Upload your tab to Teams with App Studio

>[!NOTE]
> We use App Studio to edit your **manifest.json** file and upload the completed package to Teams. You can also manually edit the **manifest.json** file if you prefer. If you do, be sure to build the solution again to create the **tab.zip** file to upload.

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/foo.md).

- Open App studio and select the **Manifest editor** tab.

- Select the *Import an existing app* tile in the Manifest editor to begin updating the app package for your tab. Recall that the source code comes with its own pre-made manifest and the *.csproj file* contains code to create an app package when the application is built. The name of your app package is **tab.zip**. You can search your local machine's file explorer or switch to Visual Studio *Folder View* to find your zip folder's location. It should be found here:

```bash
/bin/Debug/netcoreapp2.2/tab.zip
```

- Upload **tab.zip** to App Studio.

### Update your app package with Manifest editor

Once you've uploaded your app package into App Studio, you'll need to finish configuring it.

- Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There's a list of steps in the left-hand side of the Manifest editor, and on the right, a list of properties that need to have values for each of those steps. Much of the information has been provided by your *manifest.json* but there are a few fields that you'll need to update:

#### Details: App details

- Under *Identification* select ***Generate*** to replace the placeholder id with a required GUID for your tab.

- Under *Developer information* update the **Website URL** with your *ngrok* HTTPS URL.

- Under *App URLs* update the **Privacy statement** and **Terms of use** URL fields with your *ngrok* HTTPS URL. Remember to include the */privacy* and */tou* parameters at the end of the URLs.

#### Capabilities

- Select ***Tabs***.

- Under *Add a personal tab* select ***Add***. You will be presented with a pop-up dialogue window.

- Complete the *Name* field.

- Complete the *Entity Id* field.

- Complete the *Content URL* field with your *ngrok* HTTPS URL including the */personalTab* parameter.

- Complete the *Website URL* field with your *ngrok* HTTPS URL.

- Select ***Save***.

#### Finish

- Select *Domains and permissions*

- Leave the *Enter a valid domain* field empty.

If the *Additional valid domains* field is populated, select (•••) and choose ***Delete***.

- The *Domains from your tabs* field should contain your ngrok URL without the HTTPS prefix—**y8rPrT2b.ngrok.io/**.

##### Test and distribute

>[!IMPORTANT]
>In the **Description** field on the right you'll see the following warning:
>
>&#9888; "**The 'validDomains' array cannot contain a tunneling site...**"
>
>**This warning can be ignored while testing your tab.** After your tab has been uploaded to Microsoft teams, via *ngrok*, and successfully saved, you can view it in tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends .
>
>**Remember to serve your tab on your hosted website prior to distribution.**.

- Select **Install**.

- In the pop-up window make sure that *Add for you* is set to *Yes* and *Add to a team or chat* is set to *No*.

- Select ***Install***.

- In the next pop-up window select ***Open*** and your tab will be displayed.

## View your personal tab

- In the tab bar located at the far-left of the Teams App, select (•••) *More added apps*. You'll be presented with a list of personal view apps.

- You can select your tab from the list to view.

## Next Steps

- [learn something](~/foo.md)
- [and something else](~/foo.md)