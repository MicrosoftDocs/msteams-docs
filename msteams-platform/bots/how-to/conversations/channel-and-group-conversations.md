<!-- 

## Writing notes

 * **Purpose** Describe the nuances of using a bot in a channel or group chat. Should include:
   * Creating a new message thread (probably a link to the proactive messaging article? Technically is proactive messaging if you want to start a new thread, but not *true* proactive messaging in all cases because you could do it in response to an Activity.)
   * Replying to a message thread
   * Parsing and creating `@` mentions (including the need to sometimes strip the bot's mention in the incoming message before processing)
   * Creating Activity Feed notifications
 * **Existing teams doc reference** 
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conv-channel](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conv-channel)
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/activity-feed](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/activity-feed)
 * **Existing Bot framework doc reference**
   * none
 * **Code Snippets** 
   * [https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ReplyToChannel](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ReplyToChannel)
   * Activity feed notifications: [https://github.com/microsoft/botbuilder-dotnet/blob/5820ffb69beb6ca35114017663de62734f77689c/tests/Teams/Helpers/Bots/HelperBot.cs#L25][https://github.com/microsoft/botbuilder-dotnet/blob/5820ffb69beb6ca35114017663de62734f77689c/tests/Teams/Helpers/Bots/HelperBot.cs#L25]
   * [https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/Mentions](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/Mentions)


  -->