
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
    await custFun.waitForElementAndClick(await LoginScreen.btnLogin);
    await expect(LoginScreen.errorMessageText).toBeDisplayed();
    await expect(LoginScreen.errorMessageText).toHaveText("We can't find that email and password. You can reset your password or try again.");
    await custFun.waitForElementAndClick(await LoginScreen.procureAleartOKButton); 
   
  });
  
  it(" Test 3:- Verify ForgotPassword Test", async () => {
    
    await custFun.waitForElementAndClick(await LoginScreen.forgotPasswordLink);
    await expect(LoginScreen.forgotPasswordHeader).toHaveText("Enter your e-mail address below to receive a password reset link");
    await custFun.waitForElementAndClick(await LoginScreen.forgotPasswordSendButton)
    await expect(LoginScreen.errorMessageText).toHaveText("Please enter an email address");
    await custFun.waitForElementAndClick(await LoginScreen.procureAleartOKButton);
    await browser.pause(2000);  
    await LoginScreen.forgotPasswordEmailTextBox.setValue("rx135hp@gmail.com");
    await custFun.waitForElementAndClick(await LoginScreen.forgotPasswordSendButton);
    await expect(LoginScreen.errorMessageText).toHaveText("Password reset email sent successfully");
    await custFun.waitForElementAndClick(await LoginScreen.procureAleartOKButton);
  });

});
