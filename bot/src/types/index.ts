export type Question = {
    text: string
}

export type QuestionCard = {
    questions: Question[];
}

export type QuestionActionHandlerData = {
    question: string;
}

export interface ContentBubbleUrlInfo {
    appId: string;
    botId: string;
    url: string;
    height: number;
    width: number;
    title: string;
}
