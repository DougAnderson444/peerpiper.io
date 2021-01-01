// Implemented
import Splash from './Splash.svelte'
import PeerPiper from './PeerPiper.svelte'
// import DataTest from "./DataTest.svelte";

// Not yet  Implemented
/**
import LogInOrCreateChoice from "./LogInOrCreateChoice.svelte";
import LogIn from "./LogIn.svelte";
import ProcessLogin from "./ProcessLogin.svelte";

import SetupIdleTimer from "../../setup-locker/steps/SetupIdleTimer.svelte";
import WalletContent from "../../wallet/wallet-content/WalletContent.svelte";
 */
const appSections = {
  Splash: { component: Splash },
  PeerPiper: { component: PeerPiper }
  // DataTest: { component: DataTest }
  /*
  LogInOrCreateChoice: { component: LogInOrCreateChoice },
  LogIn: { component: LogIn },
  ProcessLogin: { component: ProcessLogin },

  SetupIdleTimer: { component: SetupIdleTimer },
  WalletContent: { component: WalletContent },
  */
}

export { appSections }
