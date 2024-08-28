const {test, expect} = require('@playwright/test');

test.describe('Login Credentials', async() => {

//Test Scenario - Invalid User
test('Login By Invalid Credentials', async ({page}) => {

    await page.goto('https://www.saucedemo.com/v1/');
    
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/');
    await expect(page).toHaveTitle("Swag Labs");

    //username field 
    const username = await page.locator("#user-name")
    await expect(username).toBeVisible();
    await expect(username).toBeEnabled();
    await expect(username).toBeEmpty();
    await expect(username).toBeEditable();
    await page.click("#user-name")
    await page.fill("#user-name", "locked_out_user")
    await expect(username).toHaveValue("locked_out_user")

    await page.waitForTimeout(3000);

    //password field
    const password = await page.locator("#password")
    await expect(password).toBeVisible();
    await expect(password).toBeEnabled();
    await expect(password).toBeEmpty();
    await expect(password).toBeEditable();
    await page.click("#password");
    await page.fill("#password","secret_sauce")
    await expect(password).toHaveValue("secret_sauce")

    //login button
    const loginButton = await page.locator("#login-button")
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await expect(loginButton).toHaveValue("LOGIN");
    await page.click("#login-button");

    //Error message
    const errorMessage = await page.locator("h3[data-test='error']");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/');

})

//Test Scenario - Valid User
test('Login By Valid Credentials', async ({page}) => {

    await page.goto('https://www.saucedemo.com/v1/');
    
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/');
    await expect(page).toHaveTitle("Swag Labs");

    //username field 
    const username = await page.locator("#user-name")
    await expect(username).toBeVisible();
    await expect(username).toBeEnabled();
    await expect(username).toBeEmpty();
    await expect(username).toBeEditable();
    await page.click("#user-name")
    await page.fill("#user-name", "standard_user")
    await expect(username).toHaveValue("standard_user")

    await page.waitForTimeout(3000);

    //password field
    const password = await page.locator("#password")
    await expect(password).toBeVisible();
    await expect(password).toBeEnabled();
    await expect(password).toBeEmpty();
    await expect(password).toBeEditable();
    await page.click("#password");
    await page.fill("#password","secret_sauce")
    await expect(password).toHaveValue("secret_sauce")

    //login button
    const loginButton = await page.locator("#login-button")
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await expect(loginButton).toHaveValue("LOGIN");
    await page.click("#login-button");

    await page.waitForTimeout(3000);

    //After logging in with valid data, user should be redirected to the inventory page.
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    const inventory = await page.locator("//div[@id='contents_wrapper']");
    await expect(inventory).toBeVisible();

    await page.waitForTimeout(3000);
    

})
})