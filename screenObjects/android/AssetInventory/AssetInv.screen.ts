//import { customFunctions } from '../../../healper/customFunctions';
import PageFactory from "../../../pageFactory/mobPageFactory";
import { faker } from '@faker-js/faker';

export class AssetInventoryScreen{ 
    
    //#region New Asset // Inventory Screen
    get NewAssetTitle() {return $('//android.widget.TextView[@text="New Asset"]');}
    get AddImage() {return $('~asset-new-image-add-image');}
    get AssetModelDropdownText() {return $('//android.widget.TextView[@text="Asset Model"]');}
    get AssetModelDropdown() {return $('~asset-new-asset-select-open');}
    get ScanUPCText() {return $('//android.widget.TextView[@text="Scan UPC or ASIN Code *"]');}
    get UPCTextBox(){return $('~asset-new-upc-code-input');}
    get BarCodeButton() {return $('~asset-new-upc-code-barcode-icon');}
    get UPCChckBox() {return $('~asset-new-no-upc-code-checkbox');} 
    get UPCChckBoxText() {return $('//android.widget.TextView[@text="No UPC or ASIN Code"]');}
    get AssetTitleText() {return $('//android.widget.TextView[@text="Title *"]');}
    get AssetTitleTextBox() {return $('~asset-new-title-input');}
    get AssetModelText() {return $('//android.widget.TextView[@text="Model"]');}
    get AssetModelTextBox() {return $('~asset-new-model-input');}
    
    get AssetModelNumberText() {return $('//android.widget.TextView[@text="Model Number "]');}
    get AssetModelNumberTextBox() {return $('~asset-new-model-number-input');}

    get AssetSerialNumberText() {return $('//android.widget.TextView[@text="Serial Number "]');}
    get AssetSerialNumberTextBox() {return $('~asset-new-serial-number-input');}
    
    get AssetCategoryText() {return $('//android.widget.TextView[@text="Category *"]');}
    get AssetCategoryDropdown() {return $('~asset-new-category-open');}

    get AssetDescriptionText() {return $('//android.widget.TextView[@text="Description"]');}
    get AssetDescriptionTextBox() {return $('~asset-new-description-input');}

    get AssetVendorText() {return $('//android.widget.TextView[@text="Vendor "]');}
    get AssetVendorDropdown() {return $('~asset-new-vendor-company-open');}

    get AssetBrandText() {return $('//android.widget.TextView[@text="Brand"]');}
    get AssetBrandTextBox() {return $('~asset-new-brand-input');}
 
    get AssetManufacturerText() {return $('//android.widget.TextView[@text="Manufacturer"]');}
    get AssetManufacturerDropdown() {return $('~asset-new-manufacturer-open');}




    get AssetSiteText() {return $('//android.widget.TextView[@text="Site *"]');}
    get AssetSiteDropDown() {return $('~asset-new-sites-open');}
    get AssetLocationText() {return $('//android.widget.TextView[@text="Location *"]');}
    get AssetLocationDropDown() {return $('//android.widget.TextView[@resource-id="destinationLocationId-input"]');}
    
    
    
    get AssetQuantityText() {return $('//android.widget.TextView[@text="Quantity *"]');}
    get AssetQuantityTextBox() {return $('~asset-new-quantity-input');}

    get AssetCostText() {return $('//android.widget.TextView[@text="Cost "]');}
    get AssetCostTextBox() {return $('~asset-new-cost-input');}

    get AssetCostOverrideText() {return $('//android.widget.TextView[@text="Cost Override % "]');}
    get AssetCostOverrideTextBox() {return $('~asset-new-override-cost-input');}
    
    get AssetPurchaseDateText() {return $('//android.widget.TextView[@text="Purchase Date "]');}
    get AssetPurchaseDateComboBox() {return $('~asset-new-purchase-date-input');}
    
    get AssetReplacementDateText() {return $('//android.widget.TextView[@text="Replacement Date "]');}
    get AssetReplacementDateComboBox() {return $('~asset-new-replacement-input');}
    
    get AssetWarrantyExpiresText() {return $('//android.widget.TextView[@text="Warranty Expires "]');}
    get AssetWarrantyExpiresComboBox() {return $('~asset-new-warranty-expiry-input');}

    get AssetDisplayinOrderChechBox() {return $('~asset-new-display-in-order-checkbox');}
    
    get AssetSaveButton() {return $('~asset-new-save');}
    get AssetCancelButton() {return $('~asset-new-cancel');}
    get AssetAlertMSG() {return $('[id="android:id/message"]');}
    get AssetAlertMSGOKButton() {return $('//android.widget.Button[@text="OK"]');}
    
    
    //#endregion

    async  AddNewAsset(UPC?: string) {
       
        const custFun = PageFactory.CustomFunctions();
       // await this.AssetPurchaseDateComboBox.click();
        await this.AssetPurchaseDateComboBox.setValue("01/06/2025");
      //  await custFun.scrollToElementAndSetValue(this.AssetPurchaseDateComboBox,"01/06/2025");
        
        
        
        
        
        await this.NewAssetTitle.waitForExist({ timeout: 10000 });
            if(UPC != null)
            {
                await this.UPCTextBox.setValue(UPC);
            } 
            else
            { 
                await this.UPCChckBox.click();
            }
        await custFun.scrollToElementAndSetValue(this.AssetTitleTextBox,faker.vehicle.bicycle());
        await custFun.scrollToElementAndSetValue(this.AssetModelTextBox,faker.vehicle.model());
        await custFun.scrollToElementAndSetValue(this.AssetModelNumberTextBox,faker.vehicle.vin());
        await custFun.SelectValueFromDropDownByIndex(this.AssetCategoryDropdown,1);
        await custFun.scrollToElementAndSetValue(this.AssetDescriptionTextBox,"Mobile Automation Testing");
        await custFun.SelectValueFromDropDownByIndex(this.AssetVendorDropdown,1);
        await custFun.scrollToElementAndSetValue(this.AssetBrandTextBox,faker.vehicle.manufacturer());
        await custFun.SelectValueFromDropDownByIndex(this.AssetManufacturerDropdown,1);
        await custFun.SelectValueFromDropDownByIndex(this.AssetSiteDropDown,1);
        await custFun.SelectValueFromDropDownByIndex(this.AssetLocationDropDown,1);
        await custFun.scrollToElementAndSetValue(this.AssetQuantityTextBox,"99");
        await custFun.scrollToElementAndSetValue(this.AssetCostTextBox,"99.99");
        await custFun.scrollToElementAndSetValue(this.AssetCostOverrideTextBox,"0.99");

        await this.AssetSaveButton.click();
        
      
     
        
    }

    async selectDateMobile(date: string, datePickerInputLocator: ChainablePromiseElement) {
        const dateArray = date.split(" ");
        const day = dateArray[1].replace(",", "");
        const month = dateArray[0];
        const year = dateArray[2];
        const desiredDate = `${month} ${year}`;
    
        // Open the date picker by clicking the input field
        await datePickerInputLocator.click();
    
        // Get current year and month
        const currentYearLocator = '//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]';
        const currentDateLocator = '//android.widget.TextView[@resource-id="android:id/date_picker_header_date"]';
        let currentYear = await $(currentYearLocator).getText();
        let currentMonth = (await $(currentDateLocator).getText()).split(",")[1].trim().split(" ")[0];
    
        const prevMonthButton = await $('~Previous month');
        const nextMonthButton = await $('~Next month');
    
        // Adjust year and month to match the desired date
        while (`${currentMonth} ${currentYear}` !== desiredDate) {
            const isBefore = new Date(`${desiredDate}`) < new Date(`${currentMonth} ${currentYear}`);
            if (isBefore) {
                await prevMonthButton.click();
            } else {
                await nextMonthButton.click();
            }
    
            // Update the current year and month after changing
            currentYear = await $(currentYearLocator).getText();
            currentMonth = (await $(currentDateLocator).getText()).split(",")[1].trim().split(" ")[0];
        }
    
        // Select the day
        const dayLocator = `~${day} ${month} ${year}`;
        await $(dayLocator).click();
    }
    

    



}