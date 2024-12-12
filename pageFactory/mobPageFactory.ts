import {LoginScreen} from "../screenObjects/android/Login/Login.screen";
import { HomeScreen } from "../screenObjects/android/Home/HomeScreen";
import {customFunctions} from "../healper/customFunctions";
import {AssetInventoryScreen} from "../screenObjects/android/AssetInventory/AssetInv.screen"

class PageFactory {
    createLoginPage(): LoginScreen {
    return new LoginScreen();
  }

  createHomePage(): HomeScreen {
    return new HomeScreen();
  }

  CustomFunctions(): customFunctions {
    return new customFunctions();
  }

  createAssetInventoryPage(): AssetInventoryScreen {
    return new AssetInventoryScreen();
  }
  

}

export default new PageFactory();
