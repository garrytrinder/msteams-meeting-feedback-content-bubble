import { MessageFactory, TaskModuleRequest, TaskModuleResponse, TeamsActivityHandler, TurnContext } from "botbuilder";

export class TeamsConversationBot extends TeamsActivityHandler {
    constructor() {
        super();
    }

    async handleTeamsTaskModuleSubmit(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse | any> {
        // get the data submitted from the content bubble
        const { question, answer } = taskModuleRequest.data;
        // get the name of the user who submitted the answer
        const { id, name } = context.activity.from;
        // create a message to send to the meeting chat
        const message = MessageFactory.text(`**${name}** answered ${answer} to '${question}'`);
        // update message to send on behalf of the user
        message.channelData = {
            onBehalfOf: [
                {
                    itemId: 0,
                    mentionType: 'person',
                    mri: id,
                    displayname: name
                }
            ]
        };
        // send the message to the meeting chat
        await context.sendActivity(message);
    }
}
