//import { customFunctions } from '../../../healper/customFunctions';
import { ChainablePromiseElement } from "webdriverio";
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
    get AssetCreatedMSG() {return $('//android.widget.TextView[@text="This asset has been successfully created."]');}
    get AssetAlertMSGOKButton() {return $('//android.widget.Button[@text="OK"]');}
    
    
    //#endregion

    async  AddNewAsset(UPC?: string) {
       
        const custFun = PageFactory.CustomFunctions();
        await this.NewAssetTitle.waitForExist({ timeout: 10000 });
        UPC != null ? await this.UPCTextBox.setValue(UPC) : await this.UPCChckBox.click();
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
        // const PurchaseDate = await custFun.DateFormat("sub", 1, new Date());
        // await custFun.selectDateMobile(PurchaseDate, this.AssetPurchaseDateComboBox);
        // const ReplacementDate = await custFun.DateFormat("Add", 0, new Date());
        // await custFun.selectDateMobile(ReplacementDate, this.AssetReplacementDateComboBox);
        // const WarrantyExpires = await custFun.DateFormat("Add", 1, new Date());
        // await custFun.selectDateMobile(WarrantyExpires, this.AssetWarrantyExpiresComboBox);
        await browser.pause(10000);
        await custFun.waitForElementAndClick(this.AssetSaveButton);
        await this.AssetCreatedMSG.waitForExist({ timeout: 10000 });
    
        
    }

    
    
    
    
    
    

    



}