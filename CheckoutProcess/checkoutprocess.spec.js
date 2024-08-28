const {test, expect} = require('@playwright/test');

test.describe('Checkout Process', async() => {
test('Validating Fields', async ({page}) => {

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

    //Clicking on the cart icon to verify if the selected products have been successfully added.
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


    //checkout button
    const checkoutButton = await page.locator("//a[normalize-space()='CHECKOUT']");
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
    await page.click("//a[normalize-space()='CHECKOUT']");

    await expect(page).toHaveURL("https://www.saucedemo.com/v1/checkout-step-one.html");

    const checkoutDetails = await page.locator("//div[@id='checkout_info_container']");
    await expect(checkoutDetails).toBeVisible();

  //Testing the necessary fields in the provided billing and shipping information along with their respective error message
  //FirstName
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Amrita');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await page.waitForTimeout(3000);

  //LastName
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('bista');
  await page.locator('[data-test="lastName"]').press('ArrowLeft');
  await page.locator('[data-test="lastName"]').press('ArrowLeft');
  await page.locator('[data-test="lastName"]').press('ArrowLeft');
  await page.locator('[data-test="lastName"]').press('ArrowLeft');
  await page.locator('[data-test="lastName"]').fill('Bista');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();

  //Zip/Postal Code
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('');
  await page.waitForTimeout(3000);
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await page.waitForTimeout(3000);
})

test('Performing Checkout', async ({page}) => {

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

    //Clicking on the cart icon to verify if the selected products have been successfully added.
    const cartViewBox = await page.locator("svg[role='img']");
    await expect(cartViewBox).toBeVisible();
    await page.getByRole('link', { name: '3' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/cart.html");
    await expect(page.locator("(//div[@class='cart_item'])[1]")).toBeVisible();
    await expect(page.locator("//div[normalize-space()='Sauce Labs Onesie']")).toHaveText("Sauce Labs Onesie")
    await expect(page.locator("(//div[@class='cart_item'])[2]")).toBeVisible();
    await expect(page.locator("//div[normalize-space()='Sauce Labs Bolt T-Shirt']")).toHaveText("Sauce Labs Bolt T-Shirt")
    await expect(page.locator("(//div[@class='cart_item'])[3]")).toBeVisible();
    await expect(page.locator("//div[normalize-space()='Sauce Labs Backpack']")).toHaveText("Sauce Labs Backpack");


    //checkout button
    const checkoutButton = await page.locator("//a[normalize-space()='CHECKOUT']");
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
    await page.click("//a[normalize-space()='CHECKOUT']");

    await expect(page).toHaveURL("https://www.saucedemo.com/v1/checkout-step-one.html");

    const checkoutDetails = await page.locator("//div[@id='checkout_info_container']");
    await expect(checkoutDetails).toBeVisible();

    //for firstname
    const firstName = await page.locator("//input[@id='first-name']");
    await expect(firstName).toBeEditable();
    await expect(firstName).toBeEmpty();
    await expect(firstName).toBeEnabled();
    await expect(firstName).toBeVisible();
    await page.click("//input[@id='first-name']");
    await page.fill("//input[@id='first-name']","Amrita");
    await expect(firstName).toHaveValue("Amrita");


    //for lastname
    const lastName = await page.locator("//input[@id='last-name']");
    await expect(lastName).toBeEditable();
    await expect(lastName).toBeEmpty();
    await expect(lastName).toBeEnabled();
    await expect(lastName).toBeVisible();
    await page.click("//input[@id='last-name']");
    await page.fill("//input[@id='last-name']","Bista");
    await expect(lastName).toHaveValue("Bista");

    //for postal code
    const postalCode = await page.locator("//input[@id='postal-code']");
    await expect(postalCode).toBeEditable();
    await expect(postalCode).toBeEmpty();
    await expect(postalCode).toBeEnabled();
    await expect(postalCode).toBeVisible();
    await page.click("//input[@id='postal-code']");
    await page.fill("//input[@id='postal-code']","12345");
    await expect(postalCode).toHaveValue("12345");

    await page.waitForTimeout(3000);

    //continue button
    await expect(page.locator("//input[@value='CONTINUE']")).toHaveValue("CONTINUE");
    await expect(page.locator("//input[@value='CONTINUE']")).toBeVisible();
    await expect(page.locator("//input[@value='CONTINUE']")).toBeEnabled();
    await page.click("//input[@value='CONTINUE']");

    //After you click the "Continue" button...
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-step-two.html');
    await expect(page.locator('#checkout_summary_container')).toBeVisible();
    await expect(page.getByText('QTYDESCRIPTION1Sauce Labs')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpackcarry.')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bolt T-ShirtGet')).toBeVisible();
    await expect(page.getByText('Sauce Labs OnesieRib snap')).toBeVisible();
    await expect(page.getByText('SauceCard #')).toBeVisible();
    await expect(page.getByText('FREE PONY EXPRESS DELIVERY!')).toBeVisible();
    await expect(page.getByText('Item total: $')).toBeVisible();
    await expect(page.getByText('Tax: $')).toBeVisible();
    await expect(page.getByText('Total: $58.29')).toBeVisible();
    await expect(page.locator("//a[normalize-space()='CANCEL']")).toBeVisible();
    await expect(page.locator("//a[normalize-space()='FINISH']")).toBeVisible();
    await page.waitForTimeout(3000);
    await page.click("//a[normalize-space()='FINISH']");

    //After you click the "FINISH" button...
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-complete.html');
    await expect(page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' })).toBeVisible();
    await expect(page.getByText('THANK YOU FOR YOUR ORDER Your')).toBeVisible();
    await expect(page.getByText('Your order has been')).toBeVisible();
    await expect(page.locator('#checkout_complete_container').getByRole('img')).toBeVisible();
    await expect(page.locator("//h2[normalize-space()='THANK YOU FOR YOUR ORDER']")).toHaveText("THANK YOU FOR YOUR ORDER");
    await expect(page.locator("//div[@class='complete-text']")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
    

    await page.waitForTimeout(3000);

})
})