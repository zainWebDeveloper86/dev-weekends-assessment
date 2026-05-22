const https = require("https");

async function fetchCountry(name) {
  return new Promise((resolve, reject) => {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`;

    const req = https.get(url, { timeout: 5000 }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode === 404) {
          return reject(new Error(`Country '${name}' not found.`));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`API returned status ${res.statusCode}`));
        }
        try {
          const parsed = JSON.parse(data);
          resolve(parsed[0]);
        } catch (e) {
          reject(new Error("Invalid API response."));
        }
      });
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out. API might be slow."));
    });

    req.on("error", (err) => {
      reject(new Error(`Network error: ${err.message}`));
    });
  });
}

function printCountry(c) {
  console.log(`\n${c.name.common}`);
  console.log(`Capital: ${c.capital?.[0] ?? "N/A"}`);
  console.log(`Population: ${c.population.toLocaleString()}`);
  console.log(
    `Languages: ${c.languages ? Object.values(c.languages).join(", ") : "N/A"}`,
  );
  console.log(
    `Currencies: ${c.currencies ? Object.keys(c.currencies).join(", ") : "N/A"}`,
  );
}

// compareCountries
async function compareCountries(a, b) {
  try {
    const [c1, c2] = await Promise.all([fetchCountry(a), fetchCountry(b)]);
    console.log("--- COMPARISON ---");
    printCountry(c1);
    printCountry(c2);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node cli.js <Country1> <Country2>");
  console.log("Example: node cli.js Pakistan India");
  process.exit(1); // forcefully termination
}

compareCountries(args[0], args[1]);
