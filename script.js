async function submitFeeling() {
    const feeling = document.getElementById("feelingInput").value;
    const responseArea = document.getElementById("responseArea");
    responseArea.innerText = "메시지를 생성 중입니다...";
  
    const res = await fetch("/api/generateMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feeling })
    });
  
    const data = await res.json();
    responseArea.innerText = `응원 메시지: ${data.message}`;
  }
  