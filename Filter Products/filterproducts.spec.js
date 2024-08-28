const {test, expect} = require('@playwright/test');

test.describe('Filter Products By Size and Price', async() => {
test('Descending Order', async ({page}) => {

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

    //After logging in with valid data, user should be redirected to the inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');

    const inventory = await page.locator("//div[@id='contents_wrapper']");
    await expect(inventory).toBeVisible();

    const filters = await page.locator(".product_sort_container");
    await expect(filters).toBeVisible();
    await expect(filters).toBeEnabled();

    //For Descending Order
    await page.getByRole('combobox').selectOption('za');

    //Confirming that the displayed data is sorted in descending order.
    const descendingOrderData = await page.locator("(//div[@class='inventory_item'])//div[@class='inventory_item_label']");
    await expect(descendingOrderData).toBeDefined();
    await expect(page.locator("//div[normalize-space()='Test.allTheThings() T-Shirt (Red)']")).toBeVisible();

    await page.waitForTimeout(3000);

})

test('Price (Low to High)', async ({page}) => {

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

    //After logging in with valid data, user should be redirected to the inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');

    const inventory = await page.locator("//div[@id='contents_wrapper']");
    await expect(inventory).toBeVisible();

    const filters = await page.locator(".product_sort_container");
    await expect(filters).toBeVisible();
    await expect(filters).toBeEnabled();
    
    
    //For Price(Low to High)
    await page.getByRole('combobox').selectOption('lohi');

    //Confirming that the displayed data is sorted in selected price(low to high).
    const price_low_to_high = await page.locator("(//div[@class='pricebar'])");
    await expect(price_low_to_high).toBeDefined();
    await expect(page.locator("//div[normalize-space()='$7.99']")).toBeVisible();

    await page.waitForTimeout(3000);

})
})
    