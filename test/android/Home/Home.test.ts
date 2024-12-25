import { time } from "console";
import PageFactory from "../../../pageFactory/mobPageFactory";
var softAssert = require("soft-assert");


describe("Home Page Test Cases",()=>{

    const LoginPage = PageFactory.createLoginPage();
    const HomePage = PageFactory.createHomePage();
    const custFun = PageFactory.CustomFunctions();

   before(async()=>{
      
      await LoginPage.Logout();
   //   await LoginPage.SelectEnvironment();
      await LoginPage.loginWithTenat();
   });

   beforeEach(async()=>{
     await HomePage.NavigateToHome();
   });  

   it("Test 1 :- Verify Home Screen Menu Links",async () => {
      
      await expect($(await HomePage.GetMenuLocator("Assets"))).toBeDisplayed({message:"Asset Menu not visible"});
      await expect($(await HomePage.GetMenuLocator("Inventory"))).toBeDisplayed({message:"Inventory Menu not visible"});
      await expect($(await HomePage.GetMenuLocator("Order Request"))).toBeDisplayed({message:"Order Request Menu not visible"});
      await expect($(await HomePage.GetMenuLocator("Pick"))).toBeDisplayed({message:"Pick Menu not visible"});
      await expect($(await HomePage.GetMenuLocator("Pack"))).toBeDisplayed({message:"Pack Menu not visible"});
      await expect($(await HomePage.GetMenuLocator("Scan Container"))).toBeDisplayed({message:"Scan Container Menu not visible"});
      await expect($(await HomePage.GetMenuLocator("Delivery"))).toBeDisplayed({message:"Delivery Menu not visible"});
      await expect($(await HomePage.GetMenuLocator("Shop"))).toBeDisplayed({message:"Shop Menu not visible"});
   //   await expect(await $(await HomePage.GetMenuLocator("Admin"))).toBeDisplayed({message:"Admin Menu not visible"});
   });

   it.only("Test 2 :- Verify Asset Menu Link Test",async () => {
      
      await HomePage.navigateToMenu("Assets");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
    //  await softAssert.softAssert($(await HomePage.GetMenuLocator("Assets", "Search")).isDisplayed(), true, "Assets Search Menu is not visible");
      const menuItems = [
         "Logout", "Search", "New", "Edit", "MoveEEEE", "Remove", "Restock", "Reserve", "CheckOut", "CheckIn", "Audit"
      ];
      
      for (const menuItem of menuItems) {
         try {
         await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Assets", menuItem)).isDisplayed(), true, `Assets ${menuItem} Menu is not visible`);
         } finally {
            await softAssert.softAssertAll();
            }
         }
         
      });
  

   it("Test 3 :- Verify Inventory Menu Link Test",async () => {
      
      await HomePage.navigateToMenu("inventory");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("inventory","Search")).isDisplayed(), true, "inventory Search Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("inventory","New")).isDisplayed(), true, "inventory New Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("inventory","Edit")).isDisplayed(), true, "inventory Edit Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("inventory","Move")).isDisplayed(), true, "inventory Move Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("inventory","Remove")).isDisplayed(), true, "inventory Remove Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("inventory","Restock")).isDisplayed(), true, "inventory Restock Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("inventory","Audit")).isDisplayed(), true, "inventory Audit Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Logout")).isDisplayed(), true, "inventory Logout  Menu is not visible");
      await softAssert.softAssertAll();
   });

   it("Test 4 :- Verify Order Request Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Order Request");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Order Request","Order Request")).isDisplayed(), true, "Order Request ,Order Request Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Order Request","Order History")).isDisplayed(), true, "Order Request Order History Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Logout")).isDisplayed(), true, "Order Req Logout  Menu is not visible");
      await softAssert.softAssertAll();
  
   });

   it("Test 5 :- Verify Pick Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Pick");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Pick","Pick")).isDisplayed(), true, "Pick Pick Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Logout")).isDisplayed(), true, "Pick Logout  Menu is not visible");
      await softAssert.softAssertAll();
  
   });

   it("Test 6 :- Verify Pack Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Pack");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Pack","Pack Scan")).isDisplayed(), true, "Pack , Pack  Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Logout")).isDisplayed(), true, "Pack Logout  Menu is not visible");
      await softAssert.softAssertAll();
  
   });

   it("Test 7 :- Verify Scan Container Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Scan Container");
      await softAssert.softAssert(await HomePage.ScanContainerBackButton.isDisplayed(), true, "Scan Container Back button is not visible");
      await softAssert.softAssertAll();
      await custFun.waitForElementAndClick($(await HomePage.GetMenuLocator("Scan Container", "Cancel Button")));
      
         
   });

   it("Test 8 :- Verify Delivery Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Delivery");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Delivery","Add Delivery")).isDisplayed(), true, "Delivery Add Delivery Buton is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Delivery","Mark Delivery")).isDisplayed(), true, "Delivery Mark Delivery Button is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Delivery","Order PickUP")).isDisplayed(), true, "Delivery Order PickUP Button is not visible");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
   //   await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Delivery","Delivery")).isDisplayed(), true, "inventory Search Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Logout")).isDisplayed(), true, "Delivery Logout  Menu is not visible");
      await softAssert.softAssertAll();
         
   });

   it("Test 9 :- Verify Shop Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Shop");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Shop","Shop")).isDisplayed(), true, "Shop , shop  Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Logout")).isDisplayed(), true, "Shop Logout  Menu is not visible");
      await softAssert.softAssertAll();
         
   });

   

});