---
title: BotBuilder User Authentication
description: Migrate from BotBuilder's complex OAuthPrompt dialogs to Teams SDK's simple signin/signout methods.
ms.topic: how-to
zone_pivot_groups: dev-lang
ms.date: 10/09/2026
---
# BotBuilder User Authentication

::: zone pivot="csharp"
This article is not available for the selected development language.
::: zone-end

::: zone pivot="typescript,python"

## User Authentication
::: zone-end

::: zone pivot="python"
BotBuilder uses its `dialogs` for authentication via the `OAuthPrompt`. Teams SDK doesn't have any
equivalent feature for dialogs, but we do support auth flows in our own way via our `sign_in` and `sign_out` methods.
::: zone-end

::: zone pivot="typescript"
BotBuilder uses its `dialogs` for authentication via the `OAuthPrompt`. Teams SDK doesn't have any
equivalent feature for dialogs, but we do support auth flows in our own way via our `signin` and `signout` methods.
::: zone-end



::: zone pivot="python"
# [BotBuilder](#tab/BotBuilder)
```python showLineNumbers
    from botbuilder.core import (
        ActivityHandler,
        ConversationState,
        UserState,
        MemoryStorage,
        BotFrameworkAdapter
    )
    from botbuilder.dialogs import (
        ComponentDialog,
        OAuthPrompt,
        OAuthPromptSettings,
        WaterfallDialog,
        WaterfallStepContext,
        DialogSet,
        DialogTurnStatus
    )

    class MyActivityHandler(ActivityHandler):
        def __init__(self, connection_name: str, conversation_state: ConversationState, user_state: UserState):
            super().__init__()
            self.conversation_state = conversation_state
            self.user_state = user_state
            self.dialog = SignInDialog("signin", connection_name)
            self.dialog_state = self.conversation_state.create_property("DialogState")

        async def on_message_activity(self, turn_context: TurnContext):
            await self.dialog.run(turn_context, self.dialog_state)

        async def on_turn(self, turn_context: TurnContext):
            await super().on_turn(turn_context)
            await self.conversation_state.save_changes(turn_context)
            await self.user_state.save_changes(turn_context)

    class SignInDialog(ComponentDialog):
        def __init__(self, dialog_id: str, connection_name: str):
            super().__init__(dialog_id)
            self.connection_name = connection_name

            self.add_dialog(OAuthPrompt(
                "OAuthPrompt",
                OAuthPromptSettings(
                    connection_name=connection_name,
                    text="Please Sign In",
                    title="Sign In",
                    timeout=300000
                )
            ))

            self.add_dialog(WaterfallDialog(
                "Main",
                [self.prompt_step, self.login_step]
            ))

            self.initial_dialog_id = "Main"

        async def prompt_step(self, step_context: WaterfallStepContext):
            return await step_context.begin_dialog("OAuthPrompt")

        async def login_step(self, step_context: WaterfallStepContext):
            await step_context.context.send_activity("You have been signed in.")
            return await step_context.end_dialog()

        async def run(self, turn_context: TurnContext, accessor):
            dialog_set = DialogSet(accessor)
            dialog_set.add(self)

            dialog_context = await dialog_set.create_context(turn_context)
            results = await dialog_context.continue_dialog()

            if results.status == DialogTurnStatus.Empty:
                await dialog_context.begin_dialog(self.id)

    storage = MemoryStorage()
    conversation_state = ConversationState(storage)
    user_state = UserState(storage)
    handler = MyActivityHandler(
        connection_name,
        conversation_state,
        user_state
    )
    ```

---

# [Teams SDK](#tab/Teams SDK)
```python showLineNumbers
    from microsoft_teams.apps import ActivityContext, App, SignInEvent
    from microsoft_teams.api import MessageActivity

    app = App()
    flow = app.add_oauth_flow(connection_name)

    @app.on_message_pattern("/signout")
    async def on_signout(ctx: ActivityContext[MessageActivity]):
        if not await flow.is_signed_in(ctx):
            return
        await flow.sign_out(ctx)
        await ctx.send("You have been signed out.")

    @app.on_message
    async def on_message(ctx: ActivityContext[MessageActivity]):
        token = await flow.sign_in(ctx)
        if token:
            await ctx.send("You have been signed in.")

    @flow.on_signin
    async def on_signin(event: SignInEvent):
        await event.activity_ctx.send("You have been signed in.")
    ```
::: zone-end

::: zone pivot="typescript"
# [BotBuilder](#tab/BotBuilder)
```typescript showLineNumbers
      import restify from 'restify';
      import {
        TeamsActivityHandler,
        ConversationState,
        UserState,
        StatePropertyAccessor,
        CloudAdapter,
        ConfigurationBotFrameworkAuthentication,
        MemoryStorage,
      } from 'botbuilder';

      import { OAuthPrompt, WaterfallDialog, ComponentDialog } from 'botbuilder-dialogs';

      export class ActivityHandler extends TeamsActivityHandler {
        private readonly _conversationState: ConversationState;
        private readonly _userState: UserState;
        private readonly _dialog: SignInDialog;
        private readonly _dialogState: StatePropertyAccessor;

        constructor(connectionName: string, conversationState: ConversationState, userState: UserState) {
          super();

          this._conversationState = conversationState;
          this._userState = userState;
          this._dialog = new SignInDialog('signin', connectionName);
          this._dialogState = this.conversationState.createProperty('DialogState');

          this.onMessage(async (context, next) => {
            await this._dialog.run(context, this._dialogState);
            return next();
          });
        }

        async run(context) {
          await super.run(context);
          await this.conversationState.saveChanges(context, false);
          await this.userState.saveChanges(context, false);
        }
      }

      export class SignInDialog extends ComponentDialog {
        private readonly _connectionName: string;

        constructor(id, connectionName: string) {
          super(id);
          this._connectionName = connectionName;

          this.addDialog(new OAuthPrompt('OAuthPrompt', {
            connectionName: connectionName,
            text: 'Please Sign In',
            title: 'Sign In',
            timeout: 300000
          }));

          this.addDialog(new WaterfallDialog('Main', [
            this.promptStep.bind(this),
            this.loginStep.bind(this)
          ]));

          this.initialDialogId = 'Main';
        }

        async run(context, accessor) {
          const dialogSet = new DialogSet(accessor);
          dialogSet.add(this);

          const dialogContext = await dialogSet.createContext(context);
          const results = await dialogContext.continueDialog();

          if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
          }
        }

        async promptStep(stepContext) {
          return await stepContext.beginDialog('OAuthPrompt');
        }

        async loginStep(stepContext) {
          await stepContext.context.sendActivity('You have been signed in.');
          return await stepContext.endDialog();
        }

        async onBeginDialog(innerDc, options) {
          const result = await this.interrupt(innerDc);
          if (result) return result;
          return await super.onBeginDialog(innerDc, options);
        }

        async onContinueDialog(innerDc) {
          const result = await this.interrupt(innerDc);
          if (result) return result;
          return await super.onContinueDialog(innerDc);
        }

        async interrupt(innerDc) {
          if (innerDc.context.activity.type === ActivityTypes.Message) {
            const text = innerDc.context.activity.text.toLowerCase();

            if (text === '/signout') {
              const userTokenClient = innerDc.context.turnState.get(innerDc.context.adapter.UserTokenClientKey);
              const { activity } = innerDc.context;

              await userTokenClient.signOutUser(activity.from.id, this.connectionName, activity.channelId);
              await innerDc.context.sendActivity('You have been signed out.');
              return await innerDc.cancelAllDialogs();
            }
          }
        }
      }

      const server = restify.createServer();
      const auth = new ConfigurationBotFrameworkAuthentication(process.env);
      const adapter = new CloudAdapter(auth);
      const memoryStorage = new MemoryStorage();
      const conversationState = new ConversationState(memoryStorage);
      const userState = new UserState(memoryStorage);
      const handler = new ActivityHandler(
        process.env.connectionName,
        conversationState,
        userState,
      );

      server.use(restify.plugins.bodyParser());
      server.listen(process.env.port || process.env.PORT || 3978, function() {
          console.log(`\n${ server.name } listening to ${ server.url }`);
      });

      server.post('/api/messages', async (req, res) => {
          await adapter.process(req, res, (context) => bot.run(context));
      });
      ```

---

# [Teams SDK](#tab/Teams SDK)
```typescript showLineNumbers
      import { App } from '@microsoft/teams.apps';

      const app = new App();
      const flow = app.addOAuthFlow(process.env.connectionName!);

      app.message('/signout', async (ctx) => {
        if (!(await flow.isSignedIn(ctx))) return;
        await flow.signOut(ctx);
        await ctx.send('You have been signed out.');
      });

      app.on('message', async (ctx) => {
        const token = await flow.signIn(ctx);
        if (token) await ctx.send('You have been signed in.');
      });

      flow.onSignInComplete(async (ctx) => {
        await ctx.send('You have been signed in.');
      });

      (async () => {
        await app.start();
      })();
      ```
::: zone-end


