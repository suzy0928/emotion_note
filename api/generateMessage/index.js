const { OpenAI } = require("openai");

const openai = new OpenAI();

module.exports = async function (context, req) {
  const feeling = req.body.feeling;

  // 예외처리 추가
  if (!process.env.OPENAI_API_KEY) {
    context.log("❌ OPENAI_API_KEY is not defined");
    context.res = {
      status: 500,
      body: { message: "OpenAI API Key가 설정되지 않았습니다." }
    };
    return;
  }

  openai.apiKey = process.env.OPENAI_API_KEY;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "사용자의 감정에 맞춰 따뜻하고 진심 어린 응원 메시지를 작성해주세요.",
        },
        {
          role: "user",
          content: `지금 제 기분은 "${feeling}"이에요.`,
        },
      ],
      max_tokens: 60,
    });

    context.res = {
      body: {
        message: completion.choices[0].message.content.trim(),
      },
    };
  } catch (error) {
    context.log("OpenAI 오류:", error);
    context.res = {
      status: 500,
      body: { message: "GPT 요청 중 오류가 발생했습니다." }
    };
  }
};
