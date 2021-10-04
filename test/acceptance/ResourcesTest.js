Feature("Resources Page");

Scenario("Hides Results Which Do Not Match Search Query", ({ I }) => {
	I.amOnPage("https://codesupport.dev/resources");
	I.seeElement("input[name=search]");
	I.see("1 Line Layouts");
	I.fillField("input[name=search]", "Firebase");
	I.dontSee("1 Line Layouts");
});

Scenario("Takes Me To A Result When Clicked", ({ I }) => {
	I.amOnPage("https://codesupport.dev/resources");
	I.see("1 Line Layouts");
	I.click("1 Line Layouts");
	I.dontSee("1 Line Layouts");
	I.amOnPage("https://1linelayouts.glitch.me");
});

Scenario("Hides Any Paid Resources If Set To Free", ({ I }) => {
	I.amOnPage("https://codesupport.dev/resources");
	I.see("Digital Ocean");
	I.see("1 Line Layouts");
	I.selectOption("price", "Free");
	I.see("1 Line Layouts");
	I.dontSee("Digital Ocean");
});

Scenario("Hides Any Free Resources If Set To Paid", ({ I }) => {
	I.amOnPage("https://codesupport.dev/resources");
	I.see("1 Line Layouts");
	I.see("Digital Ocean");
	I.selectOption("price", "Paid");
	I.dontSee("1 Line Layouts");
	I.see("Digital Ocean");
});

Scenario("Shows Only Resources Within The Selected Category", ({ I }) => {
	I.amOnPage("https://codesupport.dev/resources");
	I.see("1 Line Layouts");
	I.see("Digital Ocean");
	I.selectOption("category", "Hosting");
	I.dontSee("1 Line Layouts");
	I.see("Digital Ocean");
});

Scenario("Says Not Matches Are Found If Invalid Search", ({ I }) => {
	I.amOnPage("https://codesupport.dev/resources");
	I.fillField("input[name=search]", "This Resource Does Not Exist");
	I.see("No matches found...");
});