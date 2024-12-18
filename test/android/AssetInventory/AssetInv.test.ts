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
        
      await NavigateTo.NavigateToMenu("assets","new");
      // await custFun.waitForElementAndClick(await NavigateTo.AssetsMainMenuLink);
      // await custFun.waitForElementAndClick(await NavigateTo.proccureHamburgerMenu);
      // await custFun.waitForElementAndClick(await NavigateTo.AstInvNewLink);
      // (await NavigateTo.AssetsMainMenuLink).click();
      // (await LoginPage.proccureHamburgerMenu).click();
      // (await NavigateTo.AstInvNewLink).click();


      // await custFun.waitForElementAndClick(await NavigateTo.AssetsMainMenuLink);
      // await custFun.waitForElementAndClick(await LoginPage.proccureHamburgerMenu);
      // await custFun.waitForElementAndClick(await NavigateTo.AstInvNewLink);
      
      
      // await browser.pause(100000);
       await AssetPage.AssetNoUPCCheckBox.doubleClick()
      // await AssetPage.AssetTitleTextBox.setValue(faker.animal.cat());
      // await AssetPage.AssetModelTextBox.setValue(faker.color.human());
      // await custFun.ScrollDown();
       await custFun.SelectValueFromDropDown('Almouth', await AssetPage.AssetSiteDropDown);
      // await custFun.SelectValueFromDropDown('Unassigned', await AssetPage.AssetLocationDropDown);
      // await custFun.SelectValueFromDropDown('Bombay', await AssetPage.AssetCategoryTextBox);
      // await custFun.ScrollDown();
      // await AssetPage.AssetQuantityTextBox.setValue("99");
      // await custFun.ScrollDown();
      // var replacementDate = await custFun.DateFormat("Add", 30, new Date());
      // await custFun.selectDate(replacementDate,await AssetPage.AssetReplacementDateComboBox);
      // await AssetPage.AssetsAddButton.click();   
      // await expect(AssetPage.AssetAlertMSG).toBeDisplayed();   
      
    });

});


