const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function (context, req) {
  const userFeeling = req.body.feeling;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "사용자의 감정에 맞춰 따뜻하고 진심 어린 응원 메시지를 작성해주세요."
      },
      {
        role: "user",
        content: `지금 제 기분은 "${userFeeling}"이에요.`
      }
    ],
    max_tokens: 60,
  });

  context.res = {
    body: {
      message: completion.choices[0].message.content.trim()
    }
  };
};
