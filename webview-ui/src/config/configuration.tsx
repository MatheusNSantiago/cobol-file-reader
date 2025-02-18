import { createContext, useContext, useState, useEffect, PropsWithChildren, FC } from "react";

import { COMMAND, InjectConfigurationMessage } from "../models/message.model";
import { Configuration } from "../models/configuration.model";

const ConfigurationContext = createContext<Configuration | undefined>(undefined);

const defaultConfig: Configuration = {
  copybookDirectory: "",
};

export const ConfigurationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [configuration, setConfiguration] = useState<Configuration>(defaultConfig);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data as InjectConfigurationMessage;
      if (message.command === COMMAND.injectConfigurationMessage) {
        setConfiguration({ copybookDirectory: message.data.copybookDirectory });
      }
    };
    // Listen to messages from the parent window and handle them
    window.addEventListener("message", handleMessage);
  }, [setConfiguration]);

  return (
    <ConfigurationContext.Provider value={configuration}>{children}</ConfigurationContext.Provider>
  );
};

export function useConfiguration(): Configuration {
  const configuration = useContext(ConfigurationContext);
  return configuration || defaultConfig;
}
