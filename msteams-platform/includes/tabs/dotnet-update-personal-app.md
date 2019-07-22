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

### PersonalTab.cshtml

Open **PersonalTab.cshtml** and update the embedded &#60;**script**&#62; tags by calling `microsoftTeams.initialize();`.

Make sure to save the updated **Personal.html and your personal tab content page is complete.