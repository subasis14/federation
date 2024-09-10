import React, { Suspense, FC } from "react";
import { useLoadComponent } from "./useLoadComponent";

const App: FC = () => {
  const RemoteOne = useLoadComponent({
    remoteConfig: [
      { name: "remote1", entry: "http://localhost:3002/remoteEntry.js" },
    ],
    module: "RemoteOne",
    scope: "remote1",
  });
  const RemoteTwo = useLoadComponent({
    remoteConfig: [
      { name: "remote2", entry: "http://localhost:3003/remoteEntry.js" },
    ],
    module: "RemoteTwo",
    scope: "remote2",
  });
  return (
    <Suspense fallback="Loading System">
      {RemoteOne ? <RemoteOne /> : <div>Loading RemoteOne...</div>}
      <br />
      {RemoteTwo ? <RemoteTwo /> : <div>Loading RemoteOne...</div>}
    </Suspense>
  );
};

export default App;
