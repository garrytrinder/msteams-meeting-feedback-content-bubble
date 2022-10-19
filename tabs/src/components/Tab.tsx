import { SyntheticEvent, useContext, useState } from "react";
import { TeamsFxContext } from "./Context";
import { Form, FormButton, FormRadioGroup, Segment, Header, Flex, RadioGroupItemProps } from "@fluentui/react-northstar";
import { app, dialog } from "@microsoft/teams-js";
import { useQuery } from "../hooks/query";

export default function Tab() {
  // Get the theme context
  const { themeString } = useContext(TeamsFxContext);

  // Define the state for the form input
  const [answer, setAnswer] = useState<string | undefined | number>();

  // Create a query hook to get the query string values
  const query = useQuery();

  // Define the options for the radio group
  const items = [
    {
      name: 'answer',
      key: 'Yes',
      label: 'Yes',
      value: 'Yes',
    },
    {
      name: 'answer',
      key: 'No',
      label: 'No',
      value: 'No'
    },
  ];

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <Flex column={true} padding={"padding.medium"}>
        <Segment>
          <Header as="h3">{query.get('question')}</Header>
        </Segment>
        <Segment>
          <Form onSubmit={() => {
            // When the form is submitted, send a message to the bot with result payload
            const question = query.get('question');
            const appId = query.get('appId') as string;
            const result = { question, answer }
            app.initialize()
              .then(() => dialog.submit(result, appId))
              .catch(handleError);
          }}>
            <FormRadioGroup
              id="answer"
              items={items}
              onCheckedValueChange={
                (event: SyntheticEvent<HTMLElement>, data?: RadioGroupItemProps) =>
                  setAnswer(data?.value)
              }
            />
            <FormButton
              content="Submit"
              disabled={!answer}
              primary
            />
          </Form>
        </Segment>
      </Flex>
    </div >
  )
}

const handleError = (err: Error) => {
  console.log(err.message);
}
