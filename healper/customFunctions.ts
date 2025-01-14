import loginData from "../resourse/loginData";
import moment = require('moment');
import PageFactory from "../pageFactory/mobPageFactory";
import { ChainablePromiseElement } from 'webdriverio';
import { SoftAssert } from '../healper/softAssertHelper';


export class customFunctions {

  public async GetUserNameandPassword(role: string = "SuperAdmin"): Promise<[string, string, string, string]> {

    let Email: string, Password: string, EnvironmentName: string, TenantID: string;
    Email = Password = "test";
    TenantID = "Automation";

    if (process.env.Tenate?.toUpperCase() != undefined) {
      TenantID = process.env.Tenate;
    }
    else {
      process.env.Tenate = TenantID
    }

    if (EnvironmentName == null) {
      if (process.env.ENV == undefined) {
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

  public async SelectValueFromDropDownByIndex(Locator: ChainablePromiseElement, index: number) {

    try {
      await Locator.scrollIntoView();
    } catch (error) {
      throw new Error(`Failed to scroll to element "${Locator}": ${error.message}`);
    }

    // Wait for the dropdown to be displayed
    await Locator.waitForDisplayed({ timeout: 10000 });
    await Locator.waitForEnabled({ timeout: 10000 });

    // Click to open the dropdown
    await Locator.click();


    // Construct the locator for the desired option based on the index
    const optionLocator = `//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[${index}]`;

    // Wait for the option to be displayed
    const selectedOption = await $(optionLocator);
    await selectedOption.waitForDisplayed({ timeout: 10000 });

    // Click the option to select it
    await selectedOption.click();

    // Optionally pause after selection
    await browser.pause(1000);
  }


  public async SelectOptionFromDropDown(Text: string, Locator: WebdriverIO.Element) {

    await Locator.waitForDisplayed({ timeout: 10000 });
    await Locator.click();
    await $('//android.widget.EditText').waitForDisplayed({ timeout: 10000 });
    await $('//android.widget.EditText').setValue(Text.trim());
    await browser.pause(1000);
    await $(`//android.widget.TextView[@text='${Text.trim()}']`).waitForDisplayed({ timeout: 10000 });
    await $(`//android.widget.TextView[@text='${Text.trim()}']`).doubleClick();
    await browser.pause(1000);
  }


  public async selectDate(date: string, DateControl: WebdriverIO.Element) {
    var dateArray = date.split(" ");
    var day = dateArray[1].replace(',', "");
    var month = dateArray[0].replace(",", " ");
    var year = dateArray[2].replace(",", " ");
    var dateToSelect = month + " " + year;
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
    var Curretdate = parts[2] + " " + await headerYear.getText();

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

  private async GetUpdatedDate(): Promise<string> {
    await $("//android.view.View[@text='1']").click();
    const mmYY = $('[id="android:id/date_picker_header_date"]');
    const headerYear = $('[id="android:id/date_picker_header_year"]');
    const parts = (await mmYY.getText()).split(/,\s|\s/);
    if (parts.length < 3) {
      return 'Invalid Date Format'; // Handle invalid date format
    }
    var Curretdate = parts[2].substring(3, 0) + " " + await headerYear.getText();
    console.debug("Curretdate From Function ======>", Curretdate);
    return Curretdate;
  }


  public async ScrollDown() {
    await driver.touchAction([{ action: 'longPress', x: 0, y: 1000 }, { action: 'moveTo', x: 0, y: 20 }, 'release']);
    console.log("Scroll Down");
    await browser.pause(1000);
  }

  public async ScrollUp() {
    await driver.touchAction([{ action: 'longPress', x: 1000, y: 0 }, { action: 'moveTo', x: 20, y: 0 }, 'release']);
    console.log("Scroll Up");
    await browser.pause(1000);
  }

  public async waitForElementAndClick(element: ChainablePromiseElement,
    timeout: number = 5000,
    scrollableElement?: ChainablePromiseElement
  ): Promise<void> {
    try {
      const resolvedElement = element;

      // Scroll to the element if needed
      try {
        await resolvedElement.scrollIntoView();
      } catch (error) {
        throw new Error(`Failed to scroll to element "${resolvedElement}": ${error.message}`);
      }

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

  public async verifyMenuItems(mainMenu: string, subMenuItems: string[]): Promise<void> {
    const HomePage = PageFactory.createHomePage();
    const softAssert = new SoftAssert();

    for (const subMenu of subMenuItems) {
      const isDisplayed = await $(await HomePage.GetMenuLocator(mainMenu, subMenu)).isDisplayed().catch(() => false);
      await softAssert.softAssert(isDisplayed, true, `${mainMenu} ${subMenu} Menu is not visible`);
    }
    // Assert all after verifying all items
    softAssert.softAssertAll();
  }

  async verifyMenuVisibility(menuNames: string[]): Promise<void> {
    const HomePage = PageFactory.createHomePage();
    for (const menuName of menuNames) {
      const menuLocator = await HomePage.GetMenuLocator(menuName);
      await expect($(menuLocator)).toBeDisplayed({
        message: `${menuName} Menu not visible`,
      });
    }
  }

  /**
 * Scroll to an element using `scrollIntoView` and set a value.
 * @param selector - The selector of the element to interact with.
 * @param value - The value to set for the element.
 * @throws Error if the element cannot be scrolled into view or set the value.
 */
  async scrollToElementAndSetValue(selector: ChainablePromiseElement, value: string): Promise<void> {

    // Wait for the element to exist in the DOM
    //if (!(await selector.isExisting())) {
    //   throw new Error(`Element with selector "${selector}" does not exist.`);
    //}

    // Scroll to the element
    try {
      await selector.scrollIntoView();
    } catch (error) {
      throw new Error(`Failed to scroll to element "${selector}": ${error.message}`);
    }

    // Wait for the element to be visible and interactable
    if (!(await selector.isDisplayed())) {
      throw new Error(`Element with selector "${selector}" is not visible after scrolling.`);
    }

    // Set the value for the element
    try {
      await selector.setValue(value);
    } catch (error) {
      throw new Error(`Failed to set value on element "${selector}": ${error.message}`);
    }
  }

  async selectDateMobile(date: string, datePickerInputLocator: ChainablePromiseElement) {
    if (!date) {
      throw new Error("Date is not provided or invalid");
    }

    //console.log("Input date:", date);

    const dateArray = date.split(" ");
    if (dateArray.length < 3) {
      throw new Error("Date format is invalid. Expected format: 'December 7, 2024'");
    }

    const day = dateArray[1].replace(",", "").padStart(2, '0');
    const month = dateArray[0].replace(",", " ");
    const year = dateArray[2].replace(",", " ");
    const desiredDateString = `${day} ${month} ${year}`;
    
    try {
      await datePickerInputLocator.scrollIntoView();
    } catch (error) {
      throw new Error(`Failed to scroll to element "${datePickerInputLocator}": ${error.message}`);
    }
    // Open the date picker
    await datePickerInputLocator.click();

    const prevMonthButton = await $('~Previous month');
    const nextMonthButton = await $('~Next month');

    let isDateFound = false;

    while (!isDateFound) {
      // Fetch all visible dates
      const currentDates = await $$('//android.view.View[@content-desc]');
      if (!currentDates || await currentDates.length === 0) {
        throw new Error("No dates found in the calendar grid.");
      }

      const visibleDates = [];
      for (let dateElement of currentDates) {
        const contentDesc = await dateElement.getAttribute('content-desc');
        visibleDates.push(contentDesc);

        // console.log("contentDesc===", contentDesc);
        // console.log("desiredDateString===", desiredDateString);

        // Check if the desired date matches the content-desc
        if (contentDesc === desiredDateString) {
          isDateFound = true;
          await dateElement.click(); // Select the desired date
          await $$('//android.widget.Button[@resource-id="android:id/button1"]')[0].click(); // Click OK
          break;
        }
      }

      // console.log("Visible dates:", visibleDates);

      if (!isDateFound) {
        const firstVisibleDate = new Date(visibleDates[0]);
        const lastVisibleDate = new Date(visibleDates[visibleDates.length - 1]);
        const desiredDate = new Date(`${month} ${day}, ${year}`);

        // console.log("Desired date:", desiredDate);
        // console.log("First visible date:", firstVisibleDate);
        // console.log("Last visible date:", lastVisibleDate);

        if (desiredDate < firstVisibleDate) {
          await prevMonthButton.click();
        } else if (desiredDate > lastVisibleDate) {
          await nextMonthButton.click();
        } else {
          throw new Error("Date navigation logic failed.");
        }
      }
    }
  }

  async DateFormat(operation: string, monthCount: number, inputDate: Date): Promise<string> {
    if (!inputDate) {
      inputDate = new Date();
    }

    const date = new Date(inputDate);
    let formatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (operation.toLowerCase() === "add") {
      formatDate = new Date(formatDate.setMonth(formatDate.getMonth() + monthCount));
    } else if (operation.toLowerCase() === "sub") {
      formatDate = new Date(formatDate.setMonth(formatDate.getMonth() - monthCount));
    }

    // Convert to desired format: "Month Day, Year"
    const finalDate = formatDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    console.log("finalDate===", finalDate);
    return finalDate;
  }


}