## Update your application

### _Layout.cshtml

For your tab to display in Teams, you must include the **Microsoft Teams JavaScript client library** (TeamsJS) and include a call to `microsoftTeams.initialize()` after your page loads.

Your tab and the Teams app communicate as shown below:

Go to the **Shared** folder, open **_Layout.cshtml**, and add the following to the `<head>` tags section:

```html
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
<script src="https://statics.teams.cdn.office.net/sdk/v1.6.0/js/MicrosoftTeams.min.js"></script>
```

### PersonalTab.cshtml

Open **PersonalTab.cshtml** and update the embedded `<script>` tags by calling `microsoftTeams.initialize()`.

Ensure you save your updated **PersonalTab.cshtml** file.