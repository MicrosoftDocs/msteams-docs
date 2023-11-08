## Cards

### Error message

iOS Teams app not showing card if the card contains a hyperlink with an ampersand.

|Scenario|Resolution|
|--------|----------|
|The developer is trying to display a card in the iOS Teams app that contains a hyperlink with an ampersand. Instead of displaying the card, the app only shows the message 'Sent a card'.|Ensure that the iOS and Teams versions are up to date. If the issue persists, share the card JSON for further investigation. It might be an issue with the way the hyperlink is parsed when it contains an ampersand. As a workaround, try encoding the ampersand in the URL.|
