const puppeteer = require('puppeteer')
const readlineSync = require("readline-sync")


async function run () {
    
    const mySearch = readlineSync.question("[!]Type your dork: ")
    const url = `https://www.google.com/search?q=${mySearch}`

    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome'})
    const page = await browser.newPage()
    await page.goto(url)

    const results = await page.evaluate(() => {
        const nodeList = [...document.querySelectorAll(".GyAeWb div div a")]
        const results = nodeList.map(object => (object.href))

        return results
    })

    await browser.close()

    results.forEach((search, i) => console.log(`${i + 1}: ${search}`))
}

run()