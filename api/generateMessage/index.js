const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async function (context, req) {
  const feeling = req.body.feeling;

  if (!feeling) {
    context.res = { status: 400, body: { message: "감정을 입력해주세요." } };
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "사용자의 감정에 맞춰 따뜻한 응원 메시지를 작성해주세요." },
        { role: "user", content: `지금 제 기분은 "${feeling}"이에요.` }
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
      body: { message: "메시지를 생성하는 중 오류가 발생했습니다." },
    };
  }
};
