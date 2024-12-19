import PageFactory from '../../../pageFactory/mobPageFactory';

export class LoginScreen {

  //#region  Locators 
  get inputUsername() { return $('~login-email-input');  }
  get inputPassword() { return $('~login-password-input');  }
  get btnLogin() { return $('~login');   }
  get errorMessageText() { return $('//android.widget.TextView[@resource-id="android:id/message"]');  }
  get procureLogo() { return $('//android.widget.ImageView[@resource-id="logo"]');   }

  get procureOrgSelection() { return $('~login-organizations-tenant-search-search-input');   }

  get procureENVSelection() { return $("//android.widget.EditText[@content-desc='login-env-search-search-input']");   }

  get procureSelectUATYES() { return $("//android.widget.TextView[@text='Yes']"); }

  get procureAleartOKButton() { return $("//*[@text='OK']"); }

  get forgotPasswordLink() {
    return $("~login-forgot-password");
  }

  get forgotPasswordHeader() {
    return $("//android.view.ViewGroup//*[contains(@text, 'Enter your e-mail')]");
  }

  get forgotPasswordEmailTextBox() {
    return $("~forgot-password-email");
  }

  get forgotPasswordSendButton() {
    return $("~forgot-password-email-send");
  }

  get procureLogoutButton() {
    return $("//android.widget.TextView[@text='Logout']");
  }

  //#endregion 


  //#region Functiuons
  async loginWithTenat(UerName: string = null, Password: string = null, Tenat: string = null) 
  {
    const custFun = PageFactory.CustomFunctions();
    const NavigateTo = PageFactory.createHomePage();
    let [email, password, TenantID, EnvironmentName] = await custFun.GetUserNameandPassword();
    if (Tenat == null && TenantID != null) {
      Tenat = TenantID;
    }

    if (UerName != null && Password != null) {
      await this.inputUsername.setValue(UerName);
      await this.inputPassword.setValue(Password);
      await this.btnLogin.click();
    }
    else {
      await this.inputUsername.setValue(email);
      await this.inputPassword.setValue(password);
      await this.btnLogin.click();
    }
    console.debug("Tenat--->>>>>>>>>>>>>>>>>>>>>>>", Tenat);
    await browser.pause(2000);
    if (Tenat) { // Check if Tenat is not null or undefined
      const isDisplayed = await this.procureOrgSelection.waitForDisplayed({ timeout: 10000 });
      //const isDisplayed = await this.procureOrgSelection.isDisplayed();
      
      if (isDisplayed) { // Only proceed if the element is displayed
          console.debug("Inside Tenat Selection");
          
          await this.procureOrgSelection.setValue(Tenat);
          await custFun.waitForElementAndClick(procureTenateSelection(Tenat));
      }
    }
    await expect(NavigateTo.HamburgerMenu).toBeDisplayed({ message: "Expected hamburger menu to be displayed." });
  }

  async Logout() {
    const NavigateTo = PageFactory.createHomePage();
    if (await NavigateTo.HamburgerMenu.isDisplayed() == true) {
      console.log("User Already loggedIn , LoggingOut");
      await NavigateTo.HamburgerMenu.click();
      await this.procureLogoutButton.click();
      await expect(this.inputUsername).toBeDisplayed();
    }
  }

  async SelectEnvironment(EnvironmentName: string = null) {
    if (EnvironmentName == null) {
      if (process.env.ENV == undefined) {
        process.env.ENV = "UAT";
        EnvironmentName = process.env.ENV;
      } else {
        EnvironmentName = process.env.ENV;
      }
    }

    for (let i = 0; i < 10; i++) {
      // if(await this.procureLogo.isDisplayed()==true)
      await this.procureLogo.click();

      if (await this.procureENVSelection.isDisplayed() == true) {
        break;
      }
    }
    await browser.pause(1000);
    // await this.procureENVSelection.setValue(EnvironmentName.toUpperCase());
    await browser.pause(1000);
    //await procureSelectUAT(EnvironmentName.toUpperCase()).doubleClick();
    const element = procureSelectUAT("UAT");
    await browser.waitUntil(
      async () => (await element.isDisplayed()),
      { timeout: 5000, timeoutMsg: "Element not found!" }
    );
    await element.doubleClick();
    await browser.pause(1000);
    await this.procureSelectUATYES.click();
  }




  //#endregion

}

//#region  Custom Locators   

function procureSelectUAT(EnvName: string) {
  // Ensure EnvName is a valid string and convert to uppercase
  if (!EnvName || typeof EnvName !== "string") {
    throw new Error("Invalid EnvName: Expected a non-empty string");
  }
  const xpath = `//android.widget.TextView[@text="${EnvName.toUpperCase()}"]`;
  console.log(`Using XPath: ${xpath}`);
  // Return the element located by the XPath
  return $(xpath);
}

function procureTenateSelection(TenatName: string) {
  return $(`//android.widget.TextView[@text='${TenatName}']`);
}



//#endregion