export interface Chats {
  text: string;
  time: string;
  isUser: boolean;
  detectedLang?: string;
  detectedLangCode?: string;
  isTyping?: boolean;
}