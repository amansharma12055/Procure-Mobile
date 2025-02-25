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
      await LoginPage.SelectEnvironment();
      await LoginPage.loginWithTenat();
    });

    beforeEach(async()=>{
    //  await LoginPage.proccureHamburgerMenu.click();
    //  await NavigateTo.HomeMainMenuLink.click();
    //  await expect(NavigateTo.AssetsMainMenuLink).toBeDisplayed();
    });  

    it.only("Test 1 :- Verify Add New Asset Test",async () => {
      
      await NavigateTo.navigateToMenu("Assets","New");
      await AssetPage.AddNewAsset();
      await expect(AssetPage.AssetCreatedMSG).toBeDisplayed();    
    });

    it("Test 2 :- Verify Add New Asset With UPC Test",async () => {
      
      await NavigateTo.navigateToMenu("Assets","New");
      await AssetPage.AddNewAsset("08903557725230")//faker.string.numeric(12));
      await expect(AssetPage.AssetCreatedMSG).toBeDisplayed();    
    });

});


