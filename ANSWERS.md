# Assessment Answers

## 1. How to run
- `node cli.js France Germany`
- Requires Node.js v16+

## 2. Stack choice
I chose Node.js with zero external libraries because it's my most familiar environment,
and I wanted to keep the project simple and dependency-free. I already use `https`, promises,
and async/await in my MERN projects, so I could focus on logic instead of learning new tools.
A worse choice would have been a full React/Express app — it would add unnecessary complexity
for a task that just needs terminal output.

## 3. One real edge case
In `fetchCountry`, I handle the case where the API returns 404. I explicitly check
`res.statusCode === 404` and reject with a clear message. In my country comparison,
if one country is valid and the other isn't, the entire `Promise.all` rejects,
but I catch it and display the error — the user won't see a cryptic crash.
Without this, the script would try to parse an empty array and crash with
"cannot read properties of undefined".

## 4. AI usage
I used ChatGPT to:
- Confirm the REST Countries API endpoint structure.
- Get the syntax for timeout with `https.get`.
I modified the timeout code by using `req.destroy()` instead of the deprecated `req.abort()`,
and I changed the error messages to match my own style.

## 5. Honest gap
The output formatting is plain `console.log` lines. With more time, I would use
`console.table` to display a structured comparison table, making it easier to read.
I would also add an option to compare more than two countries by looping over arguments.