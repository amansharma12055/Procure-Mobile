import PageFactory from "../../../pageFactory/mobPageFactory";
var softAssert = require("soft-assert");
import { faker } from '@faker-js/faker';




describe("Home Page Test Cases",()=>{
    
    const LoginPage = PageFactory.createLoginPage();
    const NavigateTo = PageFactory.createHomePage();
    const AssetPage = PageFactory.createAssetInventoryPage();
    const custFun = PageFactory.CustomFunctions();


    before(async()=>{
      await LoginPage.Logout();
    //  await LoginPage.SelectEnvironment();
      await LoginPage.loginWithTenat();
    });

    beforeEach(async()=>{
    //  await LoginPage.proccureHamburgerMenu.click();
    //  await NavigateTo.HomeMainMenuLink.click();
    //  await expect(NavigateTo.AssetsMainMenuLink).toBeDisplayed();
    });  

    it("Test 1 :- Verify Add New Asset Test",async () => {
      
      await NavigateTo.navigateToMenu("Assets","New");
      await AssetPage.AddNewAsset();
      await expect(AssetPage.AssetCreatedMSG).toBeDisplayed();    
    });

});


