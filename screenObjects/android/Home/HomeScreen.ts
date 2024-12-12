import { customFunctions } from '../../../healper/customFunctions';
import menuData from '../../../resourse/menu.json'
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
  get ScanContainerBackButton() {return $('~back-icon');} 
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
    console.debug("Is On Home Page====>",await this.AssetsMainMenuLink.isDisplayed());
    if(await this.AssetsMainMenuLink.isDisplayed() == false &&  await this.HomeMainMenuLink .isDisplayed() == false )
      {
        await this.HamburgerMenu.click();
        await this.HomeMainMenuLink.click();
      } 
      if (await this.HomeMainMenuLink .isDisplayed() == true) 
      {
        await this.HomeMainMenuLink.click();
      }
      await expect(await this.AssetsMainMenuLink).toBeDisplayed();
  }

  public async NavigateToMenu(mainMenu: string, subMenu?: string) {
    const custFun = new customFunctions();
    const mainMenuItem = menuData.menus.find((menu: { name: string; }) => menu.name.toLowerCase() === mainMenu.toLowerCase());
    if (!mainMenuItem) {
        throw new Error(`Menu "${mainMenu}" not found.`);
    }
    const mainMenuLocator = mainMenuItem.locator;
    await custFun.waitForElementAndClick(await $(mainMenuLocator));
    await this.HamburgerMenu.waitForExist({ timeout: 10000 });
    if (subMenu) {
      const subMenuItem = mainMenuItem.submenus?.find((submenu: { name: string; }) => submenu.name === subMenu);
      if (!subMenuItem) {
        throw new Error(`Submenu "${subMenu}" not found in menu "${mainMenu}".`);
      }
      const subMenuLocator = subMenuItem.locator;
      await this.HamburgerMenu.click();
      await custFun.waitForElementAndClick(await $(subMenuLocator));
      
        
    }
  }

  public async GetMenuLocator(mainMenu?: string, subMenu?: string): Promise<string> {
    const custFun = new customFunctions();
    const mainMenuItem = menuData.menus.find((menu: { name: string }) => menu.name.toLowerCase() === mainMenu.toLowerCase());
    if (!mainMenuItem) {
        throw new Error(`Menu "${mainMenu}" not found.`);
    }
    const mainMenuLocator = mainMenuItem.locator;
    
    // If subMenu is provided, find and return its locator
    if (subMenu) {
        const subMenuItem = mainMenuItem.submenus?.find((submenu: { name: string }) => submenu.name.toLowerCase() === subMenu.toLowerCase());
        if (!subMenuItem) {
            throw new Error(`Submenu "${subMenu}" not found in menu "${mainMenu}".`);
        }
        const subMenuLocator = subMenuItem.locator;
        
        return subMenuLocator;
    }
    
    // Return the main menu locator if no sub-menu is provided
    return mainMenuLocator;
  }

  // public async NavigateToMenu(mainMenu: string, Submenu?: string) {
  //   await this.HamburgerMenu.waitForExist({ timeout: 10000 });
  //   (await $(`~${mainMenu}`)).click();
  //   await this.HamburgerMenu.waitForExist({ timeout: 10000 });
  //   if (Submenu != null){
  //   await this.HamburgerMenu.click();
  //   (await $(`~${Submenu}`)).click();
  //   }
  // }

}
