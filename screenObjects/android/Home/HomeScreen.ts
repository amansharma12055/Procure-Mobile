import { customFunctions } from '../../../healper/customFunctions';
import menuConfig from '../../../resourse/menu.json';
import PageFactory from "../../../pageFactory/mobPageFactory";

export class HomeScreen {


  //#region HamBurger Menu
  get HamburgerMenu() { return $('~menu-icon'); }
  //#endregion
  //#region Main Menu Locators 
  get AssetsMainMenuLink() { return $('~assets'); }
  get InventoryMainMenuLink() { return $('~inventory'); }
  get OrderRequestMainMenuLink() { return $('~order-request'); }
  get PickMainMenuLink() { return $('~pick'); }
  get PackMainMenuLink() { return $('~pack'); }
  get ScanContainerMainMenuLink() { return $('~scan-container'); }
  get ScanContainerBackButton() { return $('~back-icon'); }
  get DeliveryMainMenuLink() { return $('~delivery'); }
  get ShopMainMenuLink() { return $('~shop'); }
  get AdminMainMenuLink() { return $('//android.widget.TextView[@text="Admin"]'); }
  get HomeMainMenuLink() { return $('//android.widget.TextView[@text="Home"]'); }
  //#endregion
  //#region Asset/Inventory Sub Menu Links 
  get AstInvSearchLink() { return $('~search'); }
  get AstInvNewLink() { return $('~new'); }
  get AstInvEditLink() { return $('~edit'); }
  get AstInvMoveLink() { return $('~move'); }
  get AstInvRemoveLink() { return $('~remove'); }
  get AstInvRestockLink() { return $('~restock'); }
  get AstCheckOutLink() { return $('~check-out'); }
  get AstCheckInLink() { return $('~check-in'); }
  get AstReserveLink() { return $('~reserve'); }
  get AstInvAuditLink() { return $('~audit'); }


  //#endregion
  //#region Other Menu Links 
  get OrderRequestLink() { return $('//android.widget.Button//android.widget.TextView[@text="Order Request"]'); }
  get OrderHistoryLink() { return $('//android.widget.Button//android.widget.TextView[@text="Order History"]'); }
  get PickLink() { return $('//android.widget.Button//android.widget.TextView[@text="Pick"]'); }
  get PackScanLink() { return $('//android.widget.Button//android.widget.TextView[@text="Pack Scan"]'); }
  get DeliveryLink() { return $('//android.widget.Button//android.widget.TextView[@text="Delivery"]'); }
  get ShopLink() { return $('//android.widget.Button//android.widget.TextView[@text="Shop"]'); }
  get SuperAdminLink() { return $('//android.widget.Button//android.widget.TextView[@text="Super Admin"]'); }

  //#endregion

  public async NavigateToHome() {
    await this.HamburgerMenu.waitForExist({ timeout: 10000 });
    //console.debug("Is On Home Page====>",await $(await this.GetMenuLocator("Assets")).isDisplayed());
    if (await $(await this.GetMenuLocator("Assets")).isDisplayed() == false && await this.HomeMainMenuLink.isDisplayed() == false) {
      await this.HamburgerMenu.click();
      await this.HomeMainMenuLink.click();
      await browser.back();
    }
   // console.debug("Hamburger Displayed ?====>",await this.HomeMainMenuLink.isDisplayed());
    if (await this.HomeMainMenuLink.isDisplayed() == true) {
      await this.HomeMainMenuLink.click();
    }
    await expect($(await this.GetMenuLocator("Assets"))).toBeDisplayed({ message: "Asset Menu not visible" });
  }

  /**
 * Navigate to a menu or submenu based on the JSON configuration.
 * Falls back to dynamic XPath if the locator is not defined.
 * 
 * @param {string} menuName - The name of the main menu.
 * @param {string} [submenuName] - The name of the submenu (optional).
 */
  public async navigateToMenu(menuName: string, submenuName?: string): Promise<void> {
    const custFun = PageFactory.CustomFunctions();
    try {
      // Step 1: Navigate to the main menu
      const mainMenuLocator = await this.GetMenuLocator(menuName);
      //console.log("Main Menu Locator====>", mainMenuLocator);
  
      const mainMenuElement = browser.$(mainMenuLocator);
      if (await mainMenuElement.isDisplayed()) {
        await mainMenuElement.click();
      } else {
        console.warn(`Main menu '${menuName}' is not displayed.`);
        throw new Error(`Main menu '${menuName}' is not displayed.`);
      }
  
      // Step 2: Navigate to the submenu, if provided
      if (submenuName) {
        await custFun.waitForElementAndClick(this.HamburgerMenu);
        const submenuLocator = await this.GetMenuLocator(menuName, submenuName);
        //console.log("Submenu Locator====>", submenuLocator);
  
        const submenuElement = browser.$(submenuLocator);
        if (await submenuElement.isDisplayed()) {
          await submenuElement.click();
        } else {
          console.warn(`Submenu '${submenuName}' is not displayed.`);
          throw new Error(`Submenu '${submenuName}' is not displayed.`);
        }
      }
    } catch (error) {
      console.error(
        `Error navigating to menu '${menuName}'${submenuName ? ` and submenu '${submenuName}'` : ''}:`,
        error
      );
      throw error;
    }
  }
  
  
  
 
  
  public async GetMenuLocator(mainMenu?: string, subMenu?: string): Promise<string> {
    if (!mainMenu) {
        throw new Error("Main menu must be provided.");
    }

    // If a submenu is provided, handle it first and skip the main menu locator creation
    if (subMenu) {
        const mainMenuItem = menuConfig.menus.find((menu: { name: string }) =>
            menu.name.toLowerCase() === mainMenu.toLowerCase()
        );

        if (!mainMenuItem) {
            console.warn(`Main menu "${mainMenu}" not found in menuConfig. Cannot locate submenu "${subMenu}".`);
            throw new Error(`Main menu "${mainMenu}" not found.`);
        }

        const subMenuItem = mainMenuItem.submenus?.find((submenu: { name: string }) =>
            submenu.name.toLowerCase() === subMenu.toLowerCase()
        );

        let subMenuLocator: string;

        if (!subMenuItem) {
            console.warn(`Submenu "${subMenu}" not found in main menu "${mainMenu}". Falling back to dynamic XPath.`);
            subMenuLocator = `//android.widget.TextView[@text="${subMenu}"]`;
        } else {
            subMenuLocator = subMenuItem.locator || `//android.widget.TextView[@text="${subMenuItem.name}"]`;
        }

        // Validate the submenu locator
        const subMenuVisible = await browser.$(subMenuLocator).isExisting().catch(() => false);
        if (!subMenuVisible) {
            console.warn(`Submenu locator "${subMenuLocator}" is not valid. Falling back to dynamic XPath.`);
            subMenuLocator = `//android.widget.TextView[@text="${subMenu}"]`;
        }

        console.log("Sub Menu Locator====>", subMenuLocator);
        return subMenuLocator;
    }

    // If no submenu is provided, handle the main menu locator
    const mainMenuItem = menuConfig.menus.find((menu: { name: string }) =>
        menu.name.toLowerCase() === mainMenu.toLowerCase()
    );

   // console.log("Main Menu Item====>", mainMenuItem);

    let mainMenuLocator: string;
    if (!mainMenuItem) {
        console.warn(`Main menu "${mainMenu}" not found in menuConfig. Falling back to dynamic XPath.`);
        mainMenuLocator = `//android.widget.TextView[@text="${mainMenu}"]`;
    } else {
        mainMenuLocator = mainMenuItem.locator || `//android.widget.TextView[@text="${mainMenuItem.name}"]`;
    }

    // Validate the main menu locator
    const mainMenuVisible = await browser.$(mainMenuLocator).isExisting().catch(() => false);
    if (!mainMenuVisible) {
        console.warn(`Main menu locator "${mainMenuLocator}" is not valid. Falling back to dynamic XPath.`);
        mainMenuLocator = `//android.widget.TextView[@text="${mainMenu}"]`;
    }

    console.log("Main Menu Locator====>", mainMenuLocator);
    return mainMenuLocator;
}

  
  
  

}