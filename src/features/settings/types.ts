export type SettingsData = {
  accent: string;
  textModel: string;
  answerLang: string;
};

export type AccountData = {
  name: string;
  email: string;
  image: string | null;
};

export type UsageData = {
  label: string;
  value: number;
  limit: number;
  gradient: string;
};

export type IntegrationData = {
  name: string;
  connected: boolean;
  gradient: string;
};