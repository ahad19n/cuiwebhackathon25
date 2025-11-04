const OpenAI = require("openai");
const { resp } = require("../helpers");
const handlerAsync = require("../middlewares/HandlerAsync");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.getAdvice = handlerAsync(async (req, res) => {
  const { weather, rates } = req.body;

  if (!weather || !rates)
    return resp(res, 400, "Missing required data");

  // System prompt for guidance
  const systemPrompt = `
You are an expert agricultural assistant helping small farmers make smart, daily decisions. 
Given the current weather and vegetable market rates, analyze and generate 2-3 actionable, concise recommendations.
Examples:
- "Avoid watering crops today, rain expected."
- "Tomato prices are rising; sell within the next two days."
- "Good time to sow spinach; soil moisture and temperature are ideal."

Keep responses short, clear, and practical.
`;

  // Build the user content
  const userPrompt = `
Current Weather: ${JSON.stringify(weather, null, 2)}
Current Vegetable Rates: ${JSON.stringify(rates, null, 2)}
`;

  // Query ChatGPT API
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // fast & cost-effective model
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.7
  });

  const advice = response.choices[0].message.content.trim();

  resp(res, 200, "Generated agricultural advice", { advice });
});
