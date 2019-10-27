---
title: Get Team's specific context for your bot
author: clearab
description: How to get Microsoft Team's specific context for your bot, including the conversation roster, details, and channel list.
ms.topic: overview
ms.author: anclear
---
# Get Team's specific context for your bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

A bot can access additional context data about the team or chat. This information can be used to enrich the bot's functionality and to provide a more personalized experience.

## Prerequisites

- Knowledge of [bot basics][concept-basics], [managing state][concept-state], the [dialogs library][concept-dialogs], how to [implement sequential conversation flow][simple-dialog].
- Visual Studio 2017 or later and git.
- [ngrok](https://ngrok.com/download) Ngrok download.
- Microsoft Teams. If needed you can create a [Microsoft Teams account](https://products.office.com/microsoft-teams/group-chat-software).
- The following example.

    | Example | BotBuilder version | Demonstrates |
    |:---|:---:|:---|
    | **Teams Bot Roster** in [cs teams bot roster][teams-bot-roster] | v4 | Accessing Teamns information |


## Roster bot code example

This section shows how to install the example bot using Microsoft Teams **App Studio** tool. The bot allows the user to perform operations such as list team members, get channel information and other details. If the user `@mention` the bot, the latter responds with a message based on the request received.  You can download the code at this location: [cs teams bot roster][teams-bot-roster].

### Teams setup

1. In Teams, open **App Studio**. 
2. Click the **Manifest editor** tab.
3. In the left panel, click the **Create a new app** button.
4. In the left panel, under the **Details** section, click **App details**.
5. Enter the following  information:
    1. **Short name**. For this the example, enter *TeamsRostertBot*.  
    2. Click the **Generate** button under **App ID**. 
    3. **Package Name**. For this example, enter *com.teams.dev*.
    4. **Version** Enter *1.0.0*.
    5. **Short Description**. Enter *Testing simple teams roster bot*.
    6. **Long Description**. Enter *Testing simple teams roster bot*.
    7. **Developer name**. Enter your name.
    8. **Website**. The name of your website. For this example, enter `https://www.microsoft.com*`.
    9. **Privacy statement** web address.  For this example, enter `https://www.teams.com/privacy`.
    10. **Terms of use** web address.  For this example, enter `https://www.teams.com/termsofuse`.
6. In the left panel, under the **Capabilities** section, click the **Bots** link.
7. In the right panel, click the **Set up** button. 
8. In the displayed wizard, select the **New bot** tab, enter the following information:
    1. **Name**. For this the example, enter *TeamsRostertBot*.
    2. **Scope**. Check all 3 boxes.
    3. Click the **Create** button.
9. Copy the **Bot ID** (string under TeamsEchoBot) and save it to a file. You will need it later in the `appsettings.json` file in the bot project.
10. Click the **Generate new password** button, copy the password and save it to a file. You will need it later in the `appsettings.json` file in the bot project.
11. In a terminal window execute the following command: `ngrok http -host-header=rewrite 3978`. The following picture shows an example:

    ![ngrok cmd](Media/ngrok-cmd.png)

12. Copy the **https** forwarding address to a file.
13. Keep **ngrok** running.  
14. In the **Messaging endpoint** section in the **Bot endpoint address** enter the ngrok address you saved earlier followed by `/api/messages`. The endpoint value must have a format similar to this: `https://d1dbb0d8.ngrok.io/api/messages`.
15. Press **Enter** (on your keyboard) to save the address.

### Bot setup

1. Clone the repository at [botbuilder-dotnet](https://github.com/microsoft/botbuilder-dotnet/tree/josh/echo/tests/Teams).
1. In Visual Studio, navigate to the `Roster` folder and open the `appsettings.json` file.
1. To`MicrosoftAppId` assign the  **Bot ID** you saved earlier.
1. To`MicrosoftAppPassword` assign the  **password** you saved earlier.

    The values should be similar to the following:

    ```json
    {
      "MicrosoftAppId": "772998ff-7fed-4275-b4e3-485cbf312850",
      "MicrosoftAppPassword": "M@XlmJPuYNjFmE:[h2AvMBOzNBuP9=43"
    }
    ```

1. **Save** the `appsettings.json` file.

1. Open the file *Properties/launchSettings.json*. Assure that this setting exists: ` "applicationUrl": "http://localhost:3978/"`. Change the address to *3978*, if needed. 

1. Open the file *TeamsAppManifest/manifest.json*. Assign to the `id` and `botId` variables the **Bot ID** value you saved earlier.  
1. **Save** the `manifest.json` file.
1. Zip the 3 files contained in the folder. 
1. Navigate to the `Roster` folder.
1. Run the project (F5). 
1. A browser window will open at this local address `localhost:3978/`.


### Finish Teams setup

1. In Teams click **Test and distribute** in the left panel in the **Finish** section.
1. Click the **Install** button.

    <table>
    <thead>
    <tr>
    <th align="left">To install bot in a personal chat...</th>
    <th align="left">To install in a group chat...</th>
    <th align="left">To install in team chat...</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td align="left">1. Click <code>Add</code> button</td>
    <td align="left">1. Click the down arrow to the right of the <code>Add</code> button <br> 2. Click <code>Add to Chat</code> <br> 3. Search for and select your group chat <br> 4. Click the <code>Set up bot</code> button <br> <strong>Note:</strong> There must be at least 1 message in a group chat for it to be searchable</td>
    <td align="left">1. Click the down arrow to the right of the <code>Add</code> button <br> 2. Click <code>Add to Team</code> <br> 3. Search for and select your team <br> 4. Click the <code>Set up a bot</code> button</td>
    </tr>
    </tbody>
    </table>
    <p><strong>Note:</strong> If you send an unsupported string in a group chat or personal chat the bot will respond with an error message. This is because it's missing data that comes with messages that orignates from a team or group chat.</p>
    <table>
    <thead>
    <tr>
    <th align="left">Supported strings in personal chat</th>
    <th align="left">Supported strings in group chat</th>
    <th align="left">supported strings in team chat</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td align="left">N/A</td>
    <td align="left"><code>show members</code></td>
    <td align="left"><code>show members</code> <br> <code>show channels</code> <br> <code>show details</code></td>
    </tr>
    </tbody>
    </table>

### Testing the bot 

You should be able now to test the bot. 

1. In Microsoft Teams, you should see the bot you have deployed in the *Chat* list and/or under the *Team* you selected. The following picture is an example.

    ![teams bot roster chat](Media/teams-bot-roster-chat.PNG)

1. To communicate with the bot you need to use `@mention` followed by the name of th bot. 
For example `@mention TeamsRosterBot`. 
1. Enter one of the allowed commands. The following example uses `show details` command. 

    ![teams bot roster details](Media/teams-bot-roster-details.png)

## Additional information

![teams bot roster map](Media/teams-bot-roster-map.png)

### List team's members

To list the members that belong to a team, you use the function `GetMembersAsync`.
The function is contained in the `TeamsRosterClient.cs` class which belongs to the **Microsoft.Bot.Builder** library.  The function calls the `GetChannelData` in the
`TeamsActivityExtensions.cs` class to obtain team members information.
The second overloaded `ShowMembersAsync` function, shown below, is responsible for creating a message activity with the requested team members information.  


### RosterBot.cs/ShowMembersAsync

```cs
private async Task ShowMembersAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    await ShowMembersAsync(turnContext, await GetMembersAsync(turnContext, cancellationToken), cancellationToken);
}


 private async Task ShowMembersAsync(ITurnContext<IMessageActivity> turnContext, IEnumerable<TeamsChannelAccount> teamsChannelAccounts, CancellationToken cancellationToken)
{
    var replyActivity = MessageFactory.Text($"Total of {teamsChannelAccounts.Count()} members are currently in team");
    await turnContext.SendActivityAsync(replyActivity);

    var messages = teamsChannelAccounts
        .Select(teamsChannelAccount => $"{teamsChannelAccount.AadObjectId} --> {teamsChannelAccount.Name} -->  {teamsChannelAccount.UserPrincipalName}");

    await SendInBatchesAsync(turnContext, messages, cancellationToken);
}

```

### Get team's details

The following flow shows the main functions used to obtain a team's details.

1. `ShowDetailsAsync` calls `GetTeamDetailsAsync`  in the `TeamsRosterClient.cs` class which belongs to the **Microsoft.Bot.Builder** library.
1. `GetTeamDetailsAsync` calls the `FetchTeamDetailsAsync` function in the `TeamsOperationsExtensions.cs` class  which belongs to the **Microsoft.Bot.Connector** library.
1. `FetchTeamDetailsAsync` calls the `FetchTeamDetailsWithHttpMessagesAsync` function in the class `TeamsOperations.cs` which belongs to the **Microsoft.Bot.Connector** library. 
1. `FetchTeamDetailsWithHttpMessagesAsync`issues the actual HTTP request to the Microsoft Teams to obtain the team's details.  

#### RosterBot.cs/ShowDetailsAsync

```cs

private async Task ShowDetailsAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    var teamDetails = await GetTeamDetailsAsync(turnContext, cancellationToken);

    var replyActivity = MessageFactory.Text($"The team name is {teamDetails.Name}. The team ID is {teamDetails.Id}. The ADDGroupID is {teamDetails.AadGroupId}.");

    await turnContext.SendActivityAsync(replyActivity, cancellationToken);
}
```

#### TeamsRosterClient.cs/GetTeamDetailsAsync

```cs
public async Task<TeamDetails> GetTeamDetailsAsync(ITurnContext turnContext, CancellationToken cancellationToken)
{
    if (turnContext == null)
    {
        throw new ArgumentNullException(nameof(turnContext));
    }

    var teamDetails = await _teamsConnectorClient.Teams.FetchTeamDetailsAsync(turnContext.Activity.GetChannelData<TeamsChannelData>().Team.Id, cancellationToken).ConfigureAwait(false);
    return teamDetails;
}
```

#### TeamsOperationsExtensions.cs/FetchTeamDetailsAsync

```cs
 public static async Task<TeamDetails> FetchTeamDetailsAsync(this ITeamsOperations operations, string teamId, CancellationToken cancellationToken = default(CancellationToken))
{
    using (var _result = await operations.FetchTeamDetailsWithHttpMessagesAsync(teamId, null, cancellationToken).ConfigureAwait(false))
    {
        return _result.Body;
    }
}
```

#### TeamsOperations.cs/FetchTeamDetailsWithHttpMessagesAsync

```cs
/// <summary>
/// Fetches details related to a team
/// </summary>
/// <remarks>
/// Fetch details for a team
/// </remarks>
/// <param name='teamId'>
/// Team Id
/// </param>
/// <param name='customHeaders'>
/// Headers that will be added to request.
/// </param>
/// <param name='cancellationToken'>
/// The cancellation token.
/// </param>
/// <exception cref="HttpOperationException">
/// Thrown when the operation returned an invalid status code
/// </exception>
/// <exception cref="SerializationException">
/// Thrown when unable to deserialize the response
/// </exception>
/// <exception cref="ValidationException">
/// Thrown when a required parameter is null
/// </exception>
/// <exception cref="System.ArgumentNullException">
/// Thrown when a required parameter is null
/// </exception>
/// <return>
/// A response object containing the response body and response headers.
/// </return>
public async Task<HttpOperationResponse<TeamDetails>> FetchTeamDetailsWithHttpMessagesAsync(string teamId, Dictionary<string, List<string>> customHeaders = null, CancellationToken cancellationToken = default(CancellationToken))
{
    if (teamId == null)
    {
        throw new ValidationException(ValidationRules.CannotBeNull, "teamId");
    }
    // Tracing
    bool _shouldTrace = ServiceClientTracing.IsEnabled;
    string _invocationId = null;
    if (_shouldTrace)
    {
        _invocationId = ServiceClientTracing.NextInvocationId.ToString();
        Dictionary<string, object> tracingParameters = new Dictionary<string, object>();
        tracingParameters.Add("teamId", teamId);
        tracingParameters.Add("cancellationToken", cancellationToken);
        ServiceClientTracing.Enter(_invocationId, this, "FetchTeamDetails", tracingParameters);
    }
    // Construct URL
    var _baseUrl = Client.BaseUri.AbsoluteUri;
    var _url = new System.Uri(new System.Uri(_baseUrl + (_baseUrl.EndsWith("/") ? "" : "/")), "v3/teams/{teamId}").ToString();
    _url = _url.Replace("{teamId}", System.Uri.EscapeDataString(teamId));
    // Create HTTP transport objects
    var _httpRequest = new HttpRequestMessage();
    HttpResponseMessage _httpResponse = null;
    _httpRequest.Method = new HttpMethod("GET");
    _httpRequest.RequestUri = new System.Uri(_url);
    // Set Headers


    if (customHeaders != null)
    {
        foreach(var _header in customHeaders)
        {
            if (_httpRequest.Headers.Contains(_header.Key))
            {
                _httpRequest.Headers.Remove(_header.Key);
            }
            _httpRequest.Headers.TryAddWithoutValidation(_header.Key, _header.Value);
        }
    }

    // Serialize Request
    string _requestContent = null;
    // Set Credentials
    if (Client.Credentials != null)
    {
        cancellationToken.ThrowIfCancellationRequested();
        await Client.Credentials.ProcessHttpRequestAsync(_httpRequest, cancellationToken).ConfigureAwait(false);
    }
    // Send Request
    if (_shouldTrace)
    {
        ServiceClientTracing.SendRequest(_invocationId, _httpRequest);
    }
    cancellationToken.ThrowIfCancellationRequested();
    _httpResponse = await Client.HttpClient.SendAsync(_httpRequest, cancellationToken).ConfigureAwait(false);
    if (_shouldTrace)
    {
        ServiceClientTracing.ReceiveResponse(_invocationId, _httpResponse);
    }
    HttpStatusCode _statusCode = _httpResponse.StatusCode;
    cancellationToken.ThrowIfCancellationRequested();
    string _responseContent = null;
    if ((int)_statusCode != 200)
    {
        var ex = new HttpOperationException(string.Format("Operation returned an invalid status code '{0}'", _statusCode));
        if (_httpResponse.Content != null) {
            _responseContent = await _httpResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
        }
        else {
            _responseContent = string.Empty;
        }
        ex.Request = new HttpRequestMessageWrapper(_httpRequest, _requestContent);
        ex.Response = new HttpResponseMessageWrapper(_httpResponse, _responseContent);
        if (_shouldTrace)
        {
            ServiceClientTracing.Error(_invocationId, ex);
        }
        _httpRequest.Dispose();
        if (_httpResponse != null)
        {
            _httpResponse.Dispose();
        }
        throw ex;
    }
    // Create Result
    var _result = new HttpOperationResponse<TeamDetails>();
    _result.Request = _httpRequest;
    _result.Response = _httpResponse;
    // Deserialize Response
    if ((int)_statusCode == 200)
    {
        _responseContent = await _httpResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
        try
        {
            _result.Body = Rest.Serialization.SafeJsonConvert.DeserializeObject<TeamDetails>(_responseContent, Client.DeserializationSettings);
        }
        catch (JsonException ex)
        {
            _httpRequest.Dispose();
            if (_httpResponse != null)
            {
                _httpResponse.Dispose();
            }
            throw new SerializationException("Unable to deserialize the response.", _responseContent, ex);
        }
    }
    if (_shouldTrace)
    {
        ServiceClientTracing.Exit(_invocationId, _result);
    }
    return _result;
}

```

<!-- Footnote-style links -->

[azure-portal]: https://ms.portal.azure.com

[teams-bot-roster]: https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/Roster


<!-- Writing ref 
 * **Purpose** Explain how to use the helper methods to get addtional Team's metadata for your bot. Includes:
   * Get the team/conversation roster
   * Get the team/conversation details
   * Get the list of channels in a team
 * **Existing teams doc reference**
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bots-context](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bots-context)
 * **Existing Bot framework doc reference**
   * none
 * **Code Snippets** 
   * [https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/Roster](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/Roster)
   -->