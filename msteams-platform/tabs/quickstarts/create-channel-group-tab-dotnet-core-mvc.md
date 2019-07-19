---
title: "Quickstart: Create a Channel and Group Tab with ASP.NET Core MVC" 
author: laujan 
description: A quickstart guide to creating a channel and group tab with ASP.NET Core MVC. 
ms.topic: quickstart 
ms.author: laujan 
---
# Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core MVC

In this quickstart we'll walk-through creating a custom channel/group tab with C# and [ASP.Net Core MVC](aspnet/core/mvc/overview?view=aspnetcore-2.2). We'll also use [App Studio for Microsoft Teams](/foo.md) to test your tab's Teams integration.

[!INCLUDE [dotnet-core-prereq](../../includes/tabs/dotnet-core-prereq.md)]

## Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple [Channel Group Tab](OfficeDev/msteams-samples/samples/dotnet/tabs/ChannelGroupTabMVC) project to get you started.To retrieve the source code you can download the zip folder and extract the files or [clone](https://help.github.com/articles/cloning-a-repository) the sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/msteams-samples.git
```

Once you have the source code, open Visual Studio and select *Open a project or solution*. Navigate to the tab application directory and open **channelGroupMVC.sln**.

To build and run your application select *F5* or choose *Start Debugging* from the *Debug* menu. In a browser navigate to the URLs below, and verify that the application loaded properly:

- `http://localhost:44335`
- `http://localhost:44335/privacy`
- `http://localhost:44335/tou`

## Review the source code

Startup.cs

This project was created from an ASP.NET Core 2.2 Web Application empty template with the **Advanced - Configure for HTTPS** check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method:

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

### Models

- ChannelGroup.cs

### *Views*

- Home/Index.cshtml
ASP.NET Core treats files called *index* as the default/home page for the site. When your browser URL points to the root of the site, **index.cshtml** will be displayed as the home page for your application.

- Shared/_Layout.cshtml

- ChannelGroup/ChannelGroup.cshtml
- Gray/Gray.cshtml
- Red/Red.cshtml

- Privacy/Privacy.cshtml
- Tou/Tou.cshtml

### Controllers

- HomeController.cs

- ChannelGroup
- GrayController.cs
- RedController.cs

- PrivacyController.cs
- TouController.cs
