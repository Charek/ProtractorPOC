

describe('E2E testsuiteA', function() {

  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));


  beforeEach( async () =>  {
    await browser.get('http://juliemr.github.io/protractor-demo/');
  });

  it('should have a title', async () => {
    expect(await browser.getTitle()).toEqual('Super Calculator');
  });

  it('should add one and two',  async () => {
    await firstNumber.sendKeys(1);
    await secondNumber.sendKeys(2);

    await goButton.click();

    expect(await latestResult.getText()).toEqual('3');
  });

  it('should add four and six',  async () => {
    // Fill this in.
    await firstNumber.sendKeys(4);
    await secondNumber.sendKeys(6);
    expect(await firstNumber.getText()).toEqual('4');
    await goButton.click();

    expect(await latestResult.getText()).toEqual('10');
  });

  it('should read the value from an input',  async () => {
    await firstNumber.sendKeys(1);
    expect(await firstNumber.getAttribute('value')).toEqual('1');
  });
});
