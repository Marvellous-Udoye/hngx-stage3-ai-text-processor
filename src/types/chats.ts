export interface Chats {
  text: string;
  time: string;
  isUser: boolean;
  isTyping?: boolean;
  detectedLang?: string;
  detectedLangCode?: string;
}