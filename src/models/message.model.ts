import { Configuration } from "./configuration.model";

export enum COMMAND {
  addRemoteUrlMessage = "ADD_REMOTE_URL_TO_GITLAB",
  injectConfigurationMessage = "INJECT_CONFIGURATION_MESSAGE",
}

export type Message = {
  command: string;
  data: any;
};

export interface InjectConfigurationMessage extends Message {
  command: COMMAND.injectConfigurationMessage;
  data: Configuration;
}
