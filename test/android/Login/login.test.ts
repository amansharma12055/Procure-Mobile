
import PageFactory from '../../../pageFactory/mobPageFactory';


describe("Login to Procure Test Cases", () => {
  const LoginScreen = PageFactory.createLoginPage();
  const custFun = PageFactory.CustomFunctions();

  beforeEach(async()=>{
      await LoginScreen.Logout();
  });
 
  before(async()=>{
    await LoginScreen.SelectEnvironment("UAT");
  });

  
  it("Test 1:- should login with valid credentials", async () => {
    
   await LoginScreen.loginWithTenat("priyaman@yahoo.com", "Test12!@", "Automation");
   
  });

  it("Test 2:- should not login with invalid credentials", async () => {
      
    await LoginScreen.inputUsername.setValue("WrongUser@yopmail.com");
    await LoginScreen.inputPassword.setValue("WrongUserPassword"); 
    await custFun.waitForElementAndClick(LoginScreen.btnLogin);
    await expect(LoginScreen.errorMessageText).toBeDisplayed();
    await expect(LoginScreen.errorMessageText).toHaveText("We can't find that email and password. You can reset your password or try again.");
    //await custFun.waitForElementAndClick(LoginScreen.procureAleartOKButton); 
   
  });
  
  it(" Test 3:- Verify ForgotPassword Test", async () => {
    
    await custFun.waitForElementAndClick(LoginScreen.forgotPasswordLink);
    await expect(LoginScreen.forgotPasswordHeader).toHaveText("Enter your e-mail address below to receive a password reset link.");
    await custFun.waitForElementAndClick(LoginScreen.forgotPasswordSendButton)
    await expect(LoginScreen.ForgotPasswordErrorMsg).toHaveText("Please enter a email.");
    await browser.pause(2000);  
    await LoginScreen.forgotPasswordEmailTextBox.setValue("rx135hp@gmail.com");
    await custFun.waitForElementAndClick(LoginScreen.forgotPasswordSendButton);
    await expect(LoginScreen.ForgotPasswordSuccessMsg).toHaveText("If this is a valid email, you will receive instructions in your inbox to reset your password.");
 
  });

});
