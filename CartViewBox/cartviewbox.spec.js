const {test, expect} = require('@playwright/test');

test('Add items to the Cart', async ({page}) => {

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

    //For Price(Low to High)
    await page.getByRole('combobox').selectOption('lohi');

    //Confirming that the displayed data is sorted in selected price(low to high).
    const price_low_to_high = await page.locator("(//div[@class='pricebar'])");
    await expect(price_low_to_high).toBeDefined();
    await expect(page.locator("//div[normalize-space()='$7.99']")).toBeVisible();

    await page.waitForTimeout(3000);

    //adding items to the cart
    //item-1
    const cartButton1 = await page.locator("(//button[contains(text(),'ADD TO CART')])[1]");
    await expect(cartButton1).toBeVisible();
    await expect(cartButton1).toBeEnabled();
    await expect(cartButton1).toHaveText("ADD TO CART");
    await page.click("(//button[contains(text(),'ADD TO CART')])[1]")
    await page.waitForTimeout(2000);
    await expect(page.locator("(//button[@class='btn_secondary btn_inventory'][normalize-space()='REMOVE'])[1]")).toHaveText("REMOVE");

    //item-2
    const cartButton2 = await page.locator("(//button[contains(text(),'ADD TO CART')])[2]");
    await expect(cartButton2).toBeVisible();
    await expect(cartButton2).toBeEnabled();
    await expect(cartButton2).toHaveText("ADD TO CART");
    await page.click("(//button[contains(text(),'ADD TO CART')])[2]")
    await page.waitForTimeout(2000);
    await expect(page.locator("(//button[@class='btn_secondary btn_inventory'][normalize-space()='REMOVE'])[2]")).toHaveText("REMOVE");

    //item-3
    const cartButton3 = await page.locator("(//button[contains(text(),'ADD TO CART')])[3]");
    await expect(cartButton3).toBeVisible();
    await expect(cartButton3).toBeEnabled();
    await expect(cartButton3).toHaveText("ADD TO CART");
    await page.click("(//button[contains(text(),'ADD TO CART')])[3]")
    await page.waitForTimeout(2000);
    await expect(page.locator("(//button[@class='btn_secondary btn_inventory'][normalize-space()='REMOVE'])[3]")).toHaveText("REMOVE");

    //Clicking on the cart icon to verify if the selected items have been successfully added.
    const cartViewBox = await page.locator("svg[role='img']");
    await expect(cartViewBox).toBeVisible();
    await page.getByRole('link', { name: '3' }).click();
    await page.waitForTimeout(3000);
    await expect(page.locator("(//div[@class='cart_item'])[1]")).toBeVisible();
    await expect(page.locator("//div[normalize-space()='Sauce Labs Onesie']")).toHaveText("Sauce Labs Onesie")
    await expect(page.locator("(//div[@class='cart_item'])[2]")).toBeVisible();
    await expect(page.locator("//div[normalize-space()='Sauce Labs Bolt T-Shirt']")).toHaveText("Sauce Labs Bolt T-Shirt")
    await expect(page.locator("(//div[@class='cart_item'])[3]")).toBeVisible();
    await expect(page.locator("//div[normalize-space()='Sauce Labs Backpack']")).toHaveText("Sauce Labs Backpack");

})