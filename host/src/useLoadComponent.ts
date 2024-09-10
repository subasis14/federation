import { useState, useEffect, FC } from "react";
import { init, loadRemote } from "@module-federation/runtime";

interface UseMicroFrontendProps {
  remoteConfig: {
    name: string;
    entry: string;
  }[];
  module: string | null;
  scope: string | null;
}

export const useLoadComponent = ({
  remoteConfig,
  module,
  scope,
}: UseMicroFrontendProps): FC | null => {
  const [component, setComponent] = useState<FC | null>(null);

  useEffect(() => {
    init({
      name: "host",
      remotes: remoteConfig,
    });

    const loadComponent = async () => {
      if (!module || !scope) return;

      try {
        const remoteModule = await loadRemote(`${scope}/${module}`);
        const Component = (remoteModule as { default: FC }).default;
        setComponent(() => Component);
      } catch (error) {
        console.error(`Error loading remote module ${scope}/${module}:`, error);
      }
    };

    loadComponent();
  }, [module, scope, remoteConfig]);

  return component;
};
