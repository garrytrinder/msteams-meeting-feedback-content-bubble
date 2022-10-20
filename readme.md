# Meeting Feedback Content Bubble

This sample demonstrates how to implement a meeting content bubble to capture attendee feedback.

![Meeting Feedback Content Bubble Microsoft Teams App](./img/app.gif)

## Prerequisites

- Microsoft 365 Tenant with Sideloading enabled
- Visual Studio Code
- Teams Toolkit v4.1.0
- Meeting created in Microsoft Teams

## Minimal path to awesome

- Clone repo, open in Visual Studio Code
- Run debug (F5)
    - Sideload app into a meeting
- Stop debugger
- Update `bot\.env.teamsfx.local`
    - Add `FRONTEND_INDEX_PATH=/#`
    - Add `FRONTEND_ENDPOINT=https://localhost:53000`
    - Add `FRONTEND_DOMAIN=localhost`
    - Add `TEAMS_APP_ID=<appid>`
        - Where `<appId>` is `id` from manifest
- Run debug (F5)
- Join meeting
- @ mention the bot in the chat
   - `@Meeting Feedback`

> NOTE
>
> Meeting content bubbles are currently supported in Microsoft Teams desktop client
