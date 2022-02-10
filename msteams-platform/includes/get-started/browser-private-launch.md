### (Optional) Adjust your browser launch settings

When developing a Teams app, it is common to run your app in an alternate developer tenant or with alternate credentials. Both Microsoft&nbsp;Edge and Google Chrome provide facilities to adjust the launch settings for your browser. For example, to update the project to support InPrivate mode (Microsoft&nbsp;Edge), open the `.vscode/launch.json` file in your project. Look for the appropriate launch settings, and add the following block to each one:

``` json
"runtimeArgs": [ "--inprivate" ]
```

For instance, the launch setting for running locally looks like this:

``` json
{
   "name": "Start and Attach to Frontend (Edge)",
   "type": "pwa-msedge",
   "request": "launch",
   "url": "https://teams.microsoft.com/_#/l/app/${localTeamsAppId}?installAppPackage=true",
   "preLaunchTask": "Start Frontend",
   "postDebugTask": "Stop All Services",
   "presentation": {
         "group": "all",
         "hidden": true
   },
   "runtimeArgs": [ "--inprivate" ]
},
```

Alternatively, you can configure your browser to use the last known profile. [Create a new profile](https://support.microsoft.com/topic/sign-in-and-create-multiple-profiles-in-microsoft-edge-df94e622-2061-49ae-ad1d-6f0e43ce6435) in Microsoft&nbsp;Edge.  Then adjust the settings to use the last known profile for new links:

- In Microsoft&nbsp;Edge, open `edge://settings/profiles/multiProfileSettings`.
- Turn off **Automatic profile switching**.
- For the **Default profile for external links**, select **Last used (default)**.

Ensure your browser is opened to the correct profile before debugging your app.
