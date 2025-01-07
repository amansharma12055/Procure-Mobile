import { time } from "console";
import PageFactory from "../../../pageFactory/mobPageFactory";
import { customFunctions } from "../../../healper/customFunctions";
//var softAssert = require("soft-assert");
import { SoftAssert } from '../../../healper/softAssertHelper';


describe("Home Page Test Cases",()=>{

    const LoginPage = PageFactory.createLoginPage();
    const HomePage = PageFactory.createHomePage();
    const custFun = PageFactory.CustomFunctions();
    const softAssert = new SoftAssert();

   before(async()=>{
      
      await LoginPage.Logout();
   //   await LoginPage.SelectEnvironment();
      await LoginPage.loginWithTenat();
   });

   beforeEach(async()=>{
     await HomePage.NavigateToHome();
   });  

   it("Test 1 :- Verify Home Screen Menu Links",async () => {
    
      await custFun.verifyMenuVisibility(["Assets", "Inventory", "Order Request", "Pick", "Pack", "Scan Container", "Delivery", "Shop"]);
      //await expect(await $(await HomePage.GetMenuLocator("Admin"))).toBeDisplayed({message:"Admin Menu not visible"});
   });

   it("Test 2 :- Verify Asset Menu Link Test",async () => {
      
      await HomePage.navigateToMenu("Assets");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      const menuItems = [
         "Search", "New", "Edit", "Move", "Remove", "Restock", "Reserve", "CheckOut", "CheckIn", "Audit"
      ];
      await custFun.verifyMenuItems("Assets", menuItems);
      await expect($(await HomePage.GetMenuLocator("Logout"))).toBeDisplayed({message:"Logout Menu not visible"});
         
   });
  

   it("Test 3 :- Verify Inventory Menu Link Test",async () => {
      
      await HomePage.navigateToMenu("Inventory");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      const menuItems = ["Search", "New", "Edit", "Move", "Remove", "Restock", "Audit"];
      await custFun.verifyMenuItems( "Inventory", menuItems);
      await expect($(await HomePage.GetMenuLocator("Logout"))).toBeDisplayed({message:"Logout Menu not visible"});
      
   });

   it("Test 4 :- Verify Order Request Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Order Request");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      const menuItems = ["Order Request", "Order History"];
      await custFun.verifyMenuItems( "Order Request", menuItems);
      await expect($(await HomePage.GetMenuLocator("Logout"))).toBeDisplayed({message:"Logout Menu not visible"});
  
   });

   it("Test 5 :- Verify Pick Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Pick");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      const menuItems = ["Pick"];
      await custFun.verifyMenuItems( "Pick", menuItems);
      await expect($(await HomePage.GetMenuLocator("Logout"))).toBeDisplayed({message:"Logout Menu not visible"});
  
   });

   it("Test 6 :- Verify Pack Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Pack");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      const menuItems = ["Pack Scan"];
      await custFun.verifyMenuItems( "Pack", menuItems);
      await expect($(await HomePage.GetMenuLocator("Logout"))).toBeDisplayed({message:"Logout Menu not visible"});
  
   });

   it("Test 7 :- Verify Scan Container Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Scan Container");
      await softAssert.softAssert(await HomePage.ScanContainerBackButton.isDisplayed(), true, "Scan Container Back button is not visible");
      softAssert.softAssertAll();
      await custFun.waitForElementAndClick($(await HomePage.GetMenuLocator("Scan Container", "Cancel Button")));
      
         
   });

   it("Test 8 :- Verify Delivery Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Delivery");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Delivery","Add Delivery")).isDisplayed(), true, "Delivery Add Delivery Buton is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Delivery","Mark Delivery")).isDisplayed(), true, "Delivery Mark Delivery Button is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Delivery","Order PickUP")).isDisplayed(), true, "Delivery Order PickUP Button is not visible");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Delivery","Delivery")).isDisplayed(), true, "inventory Search Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Logout")).isDisplayed(), true, "Delivery Logout  Menu is not visible");
      softAssert.softAssertAll();
         
   });

   it("Test 9 :- Verify Shop Menu Links Test",async () => {
      
      await HomePage.navigateToMenu("Shop");
      await custFun.waitForElementAndClick(HomePage.HamburgerMenu);
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Shop","Shop")).isDisplayed(), true, "Shop , shop  Menu is not visible");
      await softAssert.softAssert(await $(await HomePage.GetMenuLocator("Logout")).isDisplayed(), true, "Shop Logout  Menu is not visible");
      softAssert.softAssertAll();
         
   });

   

});