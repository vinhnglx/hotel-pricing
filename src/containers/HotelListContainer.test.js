import puppeteer from 'puppeteer';

describe('HotelListContainer', () => {
  test('renders a list of hotels', async () => {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.setRequestInterception(true);
    page.on('request', async request => {
      if (request.url().endsWith('/hotels/tokyo')) {
        await request.respond({
          status: 200,

          contentType: 'application/json',

          body: JSON.stringify([
            {
              id: 1,
              name: 'FooBar Hotel',
              rating: 7.7,
              stars: 4,
              address: 'Singapore',
              photo: 'https://foo.bar/example.jpg',
              description: '<p>Hello World.</p>'
            },
            {
              id: 2,
              name: 'BarFoo Hotel',
              rating: 5.7,
              stars: 3,
              address: 'Singapore',
              photo: 'https://bar.foo/example.jpg',
              description: '<p>Hi World.</p>'
            }
          ])
        });
      } else if (request.url().endsWith('/1/USD')) {
        await request.respond({
          status: 200,

          contentType: 'application/json',

          body: JSON.stringify([
            {
              id: 1,
              price: 164,
              competitors: {
                Traveloka: 190,
                Expedia: 163
              },
              taxes_and_fees: {
                tax: 13,
                hotel_fees: 16
              }
            },
            {
              id: 7,
              price: 123
            }
          ])
        });
      } else {
        await request.continue();
      }
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.ant-list-item');

    const hotelsList = (await page.$$('li.ant-list-item')).length;
    expect(hotelsList).toEqual(2);

    const elements = await page.$$(
      'li.ant-list-item h4.ant-list-item-meta-title p.mb-0'
    );

    const hotelNames = [];

    for (const ele of elements) {
      const label = await page.evaluate(el => el.innerText, ele);
      hotelNames.push(label);
    }

    expect(hotelNames).toEqual(['FooBar Hotel', 'BarFoo Hotel']);

    const hotelPriceTaxInclusive = await page.$eval(
      'div.ant-card.highlight div.ant-card-body',
      e => e.innerHTML
    );

    expect(hotelPriceTaxInclusive).toContain('$193');

    const hotelRateUnavailable = await page.$eval(
      'div.ant-card div.ant-card-body',
      e => e.innerHTML
    );

    const ratesItem = await page.$$('div.ant-card div.ant-card-body');

    const rates = [];

    for (const ele of ratesItem) {
      const label = await page.evaluate(el => el.innerText, ele);
      rates.push(label);
    }

    expect(rates).toEqual(['$192', '$193', '$219', 'Rate Unavailable']);

    page.close();
    browser.close();
  });
});
