import { Configuration } from "./configuration.model";

export enum COMMAND {
  addRemoteUrlMessage = "ADD_REMOTE_URL_TO_GITLAB",
  injectConfigurationMessage = "INJECT_CONFIGURATION_MESSAGE",
}

export interface Message {
  command: string;
  data: any;
}

// addRemoteUrlMessage extends Message
export type AddRemoteUrlMessage = Message & {
  command: COMMAND.addRemoteUrlMessage;
  data: {
    remoteUrl: string;
    stages: string[];
  };
};

export interface InjectConfigurationMessage extends Message {
  command: COMMAND.injectConfigurationMessage;
  data: Configuration;
}
