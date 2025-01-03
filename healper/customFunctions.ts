import loginData from "../resourse/loginData";
import moment = require('moment');
import PageFactory from "../pageFactory/mobPageFactory";
import { ChainablePromiseElement } from 'webdriverio';
import { SoftAssert } from '../healper/softAssertHelper';


export class customFunctions{

    public async  GetUserNameandPassword(role: string = "SuperAdmin"): Promise<[string, string, string, string]> {
      
        let Email: string, Password: string, EnvironmentName: string, TenantID:string;
        Email = Password = "test";
        TenantID = "Automation";
  
        if (process.env.Tenate?.toUpperCase() !=undefined)
        {
          TenantID = process.env.Tenate;
        } 
        else 
        {
            process.env.Tenate = TenantID
        }

       if(EnvironmentName == null)
       {
        if (process.env.ENV == undefined){
        process.env.ENV = "UAT";
        EnvironmentName = process.env.ENV;
        } else {
        EnvironmentName = process.env.ENV;
        }
       }
       Email = loginData[EnvironmentName.toUpperCase()]['0'][role]['email'];
       Password = loginData[EnvironmentName.toUpperCase()]['0'][role]['password'];
       return [Email, Password, TenantID, EnvironmentName]
           
      }

    public async SelectValueFromDropDown(Text: string, Locator: WebdriverIO.Element){

      await Locator.waitForDisplayed({timeout:10000});
      await Locator.click();
      await $('//android.widget.EditText').waitForDisplayed({timeout:10000});
      await $('//android.widget.EditText').setValue(Text.trim());
      await browser.pause(1000);
      await $(`//android.widget.TextView[@text='${Text.trim()}']`).waitForDisplayed({timeout:10000});
      await $(`//android.widget.TextView[@text='${Text.trim()}']`).doubleClick();
      await browser.pause(1000);
    }

    public async SelectOptionFromDropDown(Text: string, Locator: WebdriverIO.Element){

      await Locator.waitForDisplayed({timeout:10000});
      await Locator.click();
      await $('//android.widget.EditText').waitForDisplayed({timeout:10000});
      await $('//android.widget.EditText').setValue(Text.trim());
      await browser.pause(1000);
      await $(`//android.widget.TextView[@text='${Text.trim()}']`).waitForDisplayed({timeout:10000});
      await $(`//android.widget.TextView[@text='${Text.trim()}']`).doubleClick();
      await browser.pause(1000);
    }


    public async selectDate(date: string, DateControl: WebdriverIO.Element) {
      var dateArray = date.split(" ");
      var day = dateArray[1].replace(',',"");
      var month = dateArray[0].replace(","," ");
      var year = dateArray[2].replace(","," ");
      var dateToSelect = month +" "+year;
      await DateControl.click();
      const mmYY = $('[id="android:id/date_picker_header_date"]'); 
      const prev = $('[id="android:id/prev"]');
      const next = $('[id="android:id/next"]'); 
      const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
      const headerYear = $('[id="android:id/date_picker_header_year"]');
      const parts = (await mmYY.getText()).split(/,\s|\s/);
      if (parts.length < 3) {
        return 'Invalid Date Format'; // Handle invalid date format
      }
      var Curretdate = parts[2]+" "+await headerYear.getText();
      
      while (Curretdate != dateToSelect.trim()) {
        if (thisMonth) {
              await prev.click();
          } else {
              await next.click();
        }
        //  console.log("dateToSelect=====>",dateToSelect);
        //  console.log("Curretdate=====>",Curretdate);
        //  console.log("dateToSelect.trim()=====>",dateToSelect.trim());
        Curretdate = await this.GetUpdatedDate();
      }
    
      await $(`//android.view.View[@text='${day}']`).click();
      await $('//android.widget.Button[@text="OK"]').click();
      await browser.pause(1000);
    } 

    private async GetUpdatedDate(): Promise<string>{
      await $("//android.view.View[@text='1']").click();
      const mmYY = $('[id="android:id/date_picker_header_date"]'); 
      const headerYear = $('[id="android:id/date_picker_header_year"]');
      const parts = (await mmYY.getText()).split(/,\s|\s/);
      if (parts.length < 3) {
        return 'Invalid Date Format'; // Handle invalid date format
      }
      var Curretdate = parts[2].substring(3, 0)+" "+await headerYear.getText();
      console.debug("Curretdate From Function ======>",Curretdate);
      return Curretdate;
    }

    public async DateFormat(operation: string, dayCount: number, inputDate: Date){
   
      if(inputDate === undefined){
        inputDate = new Date();
      }
      const date = new Date(inputDate);
      var formatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (operation.toLowerCase()==="add"){
         formatDate = new Date(formatDate.setDate(formatDate.getDate()+ dayCount));
      }
      if (operation.toLowerCase()==="sub"){
        formatDate = new Date(formatDate.setDate(formatDate.getDate()- dayCount));
      }
      var finalDate = formatDate.toLocaleTimeString([], {year: 'numeric', month: 'short', day: 'numeric' });
      console.log("finalDate===",finalDate);
      return finalDate;
    }

    public async ScrollDown(){
        await driver.touchAction([ {action: 'longPress', x: 0, y: 1000}, { action: 'moveTo', x: 0, y: 20}, 'release' ]);
        console.log("Scroll Down");
        await browser.pause(1000);
    }

    public async ScrollUp(){
      await driver.touchAction([ {action: 'longPress', x: 1000, y: 0}, { action: 'moveTo', x: 20, y: 0}, 'release' ]);
      console.log("Scroll Up");
      await browser.pause(1000);
  }

  public async waitForElementAndClick(
    element: ChainablePromiseElement,
    timeout: number = 5000,
    scrollableElement?: ChainablePromiseElement
  ): Promise<void> {
    try {
      const resolvedElement = element;
  
      // Wait for the element to be displayed
      await browser.waitUntil(
        async () => await resolvedElement.isDisplayed(),
        { timeout, timeoutMsg: "Element is not displayed within the timeout." }
      );
  
      // Ensure the element is enabled
      const isEnabled = await resolvedElement.isEnabled();
      if (!isEnabled) {
        throw new Error("Element is not enabled for interaction.");
      }
  
      // Scroll to the element if needed
      try {
        if (scrollableElement) {
          const scrollableElementResolved = await scrollableElement;
          if (await scrollableElementResolved.isDisplayed()) {
            await resolvedElement.scrollIntoView({
              block: "center",
              inline: "center",
              behavior: "smooth",
            });
          } else {
            console.warn("Scrollable element is not displayed, skipping scrolling.");
          }
        } else {
          await resolvedElement.scrollIntoView({
            block: "center",
            inline: "center",
            behavior: "smooth",
          });
        }
      } catch (scrollError) {
        console.warn(
          "Scrolling to the element failed. Attempting to proceed without scrolling.",
          scrollError
        );
      }
  
      // Perform the click
      console.debug("Resolved element selector:", await element.selector);
      await resolvedElement.click();
      console.debug("Element clicked successfully!");
      await browser.pause(1000); // Optional pause for stability
    } catch (error) {
      console.error("Failed to click the element:", error);
      throw error; // Re-throw the error to fail the test
    }
  }
  
  
  
  
  
 
  async waitForDisplayed(element: ChainablePromiseElement, options: { timeout?: number } = { timeout: 10000 }): Promise<boolean> {
    try {
      // Wait for the element to be displayed within the given timeout
      await element.waitForDisplayed({ timeout: options.timeout });
      console.debug("Element is displayed!");
      return true; // Element became visible
    } catch (error) {
      console.error(`Error waiting for element to be displayed within ${options.timeout}ms:`);
      return false; // Element didn't appear in the timeout
    }
  }

  public async verifyMenuItems( mainMenu: string, subMenuItems: string[]): Promise<void> {
    const HomePage = PageFactory.createHomePage();
     const softAssert = new SoftAssert();

    for (const subMenu of subMenuItems) {
      const isDisplayed = await $(await HomePage.GetMenuLocator(mainMenu, subMenu)).isDisplayed().catch(() => false);
      await softAssert.softAssert(isDisplayed, true, `${mainMenu} ${subMenu} Menu is not visible`);
    }
    // Assert all after verifying all items
    await softAssert.softAssertAll();
  }

  async  verifyMenuVisibility(menuNames: string[]): Promise<void> {
    const HomePage = PageFactory.createHomePage();
    for (const menuName of menuNames) {
      const menuLocator = await HomePage.GetMenuLocator(menuName);
      await expect($(menuLocator)).toBeDisplayed({
        message: `${menuName} Menu not visible`,
      });
    }
  }
  
}