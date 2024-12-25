import { customFunctions } from '../../../healper/customFunctions';
import menuConfig from '../../../resourse/menu.json'
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
    try {
      // Get the XPath locator for the menu (main or submenu)
      const locator = await this.GetMenuLocator(menuName, submenuName);
  
      // Attempt to find the element using the locator
      const menuElement = browser.$(locator);
  
      if (await menuElement.isDisplayed()) {
        // Click the menu element if displayed
        await menuElement.click();
      } else {
        // Log a warning if the element is not displayed
        console.warn(`Menu '${submenuName ? submenuName : menuName}' is not displayed.`);
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
  
    // Locate the main menu item in menuConfig
    
    const mainMenuItem = menuConfig.menus.find((menu: { name: string }) => menu.name === mainMenu);

    if (!mainMenuItem) {
      throw new Error(`Main menu "${mainMenu}" not found.`);
    }
  
    // If a submenu is provided, focus on the submenu only
    if (subMenu) {
      // Locate the submenu item in the main menu's submenus
      const subMenuItem = mainMenuItem.submenus?.find((submenu: { name: string }) =>
        submenu.name.toLowerCase() === subMenu.toLowerCase()
      );
      if (!subMenuItem) {
        throw new Error(`Submenu "${subMenu}" not found in main menu "${mainMenu}".`);
      }
  
      // Determine the submenu locator
      let subMenuLocator = subMenuItem.locator || `//android.widget.TextView[@text="${subMenuItem.name}"]`;
  
      // Validate the submenu locator
      const subMenuVisible = await browser.$(subMenuLocator).isExisting().catch(() => false);
      if (!subMenuVisible) {
        console.warn(`Submenu locator "${subMenuLocator}" is not valid. Falling back to dynamic XPath.`);
        subMenuLocator = `//android.widget.TextView[@text="${subMenuItem.name}"]`;
      }
      console.log("Sub Menu Locator====>",subMenuLocator);
      return subMenuLocator;
    }
  
    // If no submenu is provided, only handle the main menu
    let mainMenuLocator = mainMenuItem.locator || `//android.widget.TextView[@text="${mainMenuItem.name}"]`;
  
    // Validate the main menu locator
    const mainMenuVisible = await browser.$(mainMenuLocator).isExisting().catch(() => false);
    if (!mainMenuVisible) {
      console.warn(`Main menu locator "${mainMenuLocator}" is not valid. Falling back to dynamic XPath.`);
      mainMenuLocator = `//android.widget.TextView[@text="${mainMenuItem.name}"]`;
    }
  
    return mainMenuLocator;
  }
  
  

}