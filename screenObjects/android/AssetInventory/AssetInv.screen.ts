export class AssetInventoryScreen{ 
    
    //#region New Asset / Inventory Screen
    get NewAssetTitle() {return $('//android.widget.TextView[@text="New Asset"]');}
    get AddImage() {return $('~asset-new-image-add-image');}
    get AssetModelText() {return $('//android.widget.TextView[@text="Model *"]');}get AssetModelTextBox() {return $('//android.widget.TextView[@text="Model *"]/following-sibling::android.view.ViewGroup/android.widget.EditText');}
    get ScanUPCText() {return $('//android.widget.TextView[@text="Scan UPC or ASIN Code *"]');}
    get UPCTextBox(){return $('~asset-new-upc-code-input');}
    get BarCodeButton() {return $('~asset-new-upc-code-barcode-icon');}
    getUPCChckBox() {return $('~asset-new-no-upc-code-checkbox');} 
    getUPCChckBoxText() {return $('//android.widget.TextView[@text="No UPC or ASIN Code"]');}
    get AssetTitleText() {return $('//android.widget.TextView[@text="Title *"]');}
    get AssetTitleTextBox() {return $('~asset-new-title-input');}
    get AssetModelNumberText() {return $('//android.widget.TextView[@text="Model Number "]');}
    get AssetModelNumberTextBox() {return $('~asset-new-model-number-input');}
  

    
    
    
    

    get AssetBrandText() {return $('//android.widget.TextView[@text="Brand"]');}
    get AssetBrandTextBox() {return $('//android.widget.TextView[@text="Brand"]/following-sibling::android.view.ViewGroup');}
    get AssetDescriptionText() {return $('//android.widget.TextView[@text="Description"]');}
    get AssetDescriptionTextBox() {return $('//android.widget.TextView[@text="Description"]/following-sibling::android.view.ViewGroup/android.widget.EditText');}
    get AssetSiteText() {return $('//android.widget.TextView[@text="Site *"]');}
    get AssetSiteDropDown() {return $('//android.widget.TextView[@text="Site *"]/following-sibling::android.view.ViewGroup');}
    get AssetLocationText() {return $('//android.widget.TextView[@text="Location *"]');}
    get AssetLocationDropDown() {return $('//android.widget.TextView[@text="Location *"]/following-sibling::android.view.ViewGroup');}
    get AssetSerialNumberText() {return $('//android.widget.TextView[@text="Serial Number "]');}
    get AssetSerialNumberTextBox() {return $('//android.widget.TextView[@text="Serial Number "]/following-sibling::android.view.ViewGroup');}
    get AssetCategoryText() {return $('//android.widget.TextView[@text="Category *"]');}
    get AssetCategoryTextBox() {return $('//android.widget.TextView[@text="Category *"]/following-sibling::android.view.ViewGroup');}
    get AssetVendorText() {return $('//android.widget.TextView[@text="Vendor "]');}
    get AssetVendorTextBox() {return $('//android.widget.TextView[@text="Vendor "]/following-sibling::android.view.ViewGroup');}
    get AssetQuantityText() {return $('//android.widget.TextView[@text="Quantity *"]');}
    get AssetQuantityTextBox() {return $('//android.widget.TextView[@text="Quantity *"]/following-sibling::android.view.ViewGroup/android.widget.EditText');}
    get AssetCostText() {return $('//android.widget.TextView[@text="Cost "]');}
    get AssetCostTextBox() {return $('//android.widget.TextView[@text="Cost "]/following-sibling::android.view.ViewGroup');}
    get AssetCostOverrideText() {return $('//android.widget.TextView[@text="Cost Override % "]');}
    get AssetCostOverrideTextBox() {return $('//android.widget.TextView[@text="Cost Override % "]/following-sibling::android.view.ViewGroup');}
    get AssetPurchaseDateText() {return $('//android.widget.TextView[@text="Purchase Date "]');}
    get AssetPurchaseDateComboBox() {return $('//android.widget.TextView[@text="Purchase Date "]/following-sibling::android.view.ViewGroup');}
    get AssetReplacementDateText() {return $('//android.widget.TextView[@text="Replacement Date "]');}
    get AssetReplacementDateComboBox() {return $('//android.widget.TextView[@text="Replacement Date "]/following-sibling::android.view.ViewGroup');}
    get AssetWarrantyExpiresText() {return $('//android.widget.TextView[@text="Warranty Expires "]');}
    get AssetWarrantyExpiresComboBox() {return $('//android.widget.TextView[@text="Warranty Expires "]/following-sibling::android.view.ViewGroup');}
    get AssetsAddButton() {return $('//android.widget.TextView[@text="Add"]');}
    get AssetCancelButton() {return $('//android.widget.TextView[@text="Cancel"]');}
    get AssetAlertMSG() {return $('[id="android:id/message"]');}
    get AssetAlertMSGOKButton() {return $('//android.widget.Button[@text="OK"]');}
    get AssetNoUPCCheckBox() {return $('//android.view.ViewGroup[3]/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[1]');}
    
    //#endregion



}