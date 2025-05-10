async function submitFeeling() {
    const feeling = document.getElementById("feelingInput").value;
    const responseArea = document.getElementById("responseArea");
    responseArea.innerText = "메시지를 생성 중입니다...";
  
    try {
      const res = await fetch("/api/generateMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeling }),
      });
  
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
  
      const data = await res.json();
      responseArea.innerText = `응원 메시지: ${data.message}`;
    } catch (err) {
      responseArea.innerText = "⚠️ 응원 메시지를 생성하는 중 오류가 발생했어요.";
      console.error("에러:", err);
    }
  }
  