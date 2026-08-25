const diagnosticQuestions=[
 {q:"What is 25% of 80?",answers:["10","20","25","40"],correct:1,topic:"Mathematics"},
 {q:"Which gas do plants mainly use during photosynthesis?",answers:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],correct:2,topic:"Science"},
 {q:"Choose the correct sentence.",answers:["She go to school.","She goes to school.","She going school.","She gone to school."],correct:1,topic:"English"},
 {q:"Which is the strongest password?",answers:["123456","password","Sipho2026","T7!qL9#zP2"],correct:3,topic:"Digital Skills"}
];
let dIndex=0,dScore=0,weakTopic="",quizIndex=0,quizScore=0;
const lessons={
 Mathematics:"Percentages show a part of a whole. To find a percentage of a number, convert the percentage to a decimal and multiply. Example: 25% of 80 = 0.25 × 80 = 20.",
 Science:"Plants use carbon dioxide, water and light energy to make food through photosynthesis. Oxygen is released as a product.",
 English:"Subject-verb agreement means the verb must match the subject. With he, she or it, we usually add -s: 'She goes to school.'",
 "Digital Skills":"A strong password is long and difficult to guess. Use a mix of uppercase and lowercase letters, numbers and symbols, and never reuse important passwords."
};
const quizzes={
 Mathematics:{q:"What is 10% of 50?",a:["2","5","10","15"],c:1},
 Science:{q:"Which gas is mainly used in photosynthesis?",a:["Oxygen","Carbon dioxide","Hydrogen","Helium"],c:1},
 English:{q:"Which is correct?",a:["He play soccer.","He plays soccer.","He playing soccer.","He played soccer every day now."],c:1},
 "Digital Skills":{q:"Which is a stronger password?",a:["12345678","qwerty","T7!qL9#zP2","password"],c:2}
};
function save(){localStorage.setItem("edubridge",JSON.stringify({progress:Math.max(0,dScore*25),topic:weakTopic}));updateDashboard()}
function updateDashboard(){const x=JSON.parse(localStorage.getItem("edubridge")||"{}");let p=x.progress||0;document.getElementById("progressBar").style.width=p+"%";document.getElementById("progressText").textContent=p+"% completed";document.getElementById("stats").textContent=x.topic?"Focus area: "+x.topic:"No diagnostic completed yet";document.getElementById("recommendation").textContent=x.topic?"Recommended: "+x.topic+" lesson":"Take the diagnostic test to receive a recommendation."}
function startDiagnostic(){dIndex=0;dScore=0;document.getElementById("diagnostic").classList.remove("hidden");document.getElementById("lesson").classList.add("hidden");document.getElementById("quiz").classList.add("hidden");showQuestion();scrollToId("diagnostic")}
function showQuestion(){let x=diagnosticQuestions[dIndex];document.getElementById("question").textContent=x.q;document.getElementById("testProgress").textContent=`Question ${dIndex+1} of ${diagnosticQuestions.length}`;document.getElementById("answers").innerHTML=x.answers.map((a,i)=>`<button class="answer" onclick="answerDiagnostic(${i})">${a}</button>`).join("")}
function answerDiagnostic(i){if(i===diagnosticQuestions[dIndex].correct)dScore++;dIndex++;if(dIndex<diagnosticQuestions.length)showQuestion();else finishDiagnostic()}
function finishDiagnostic(){let wrong=diagnosticQuestions.find((x)=>{return x.correct!==null});weakTopic=dScore<4?diagnosticQuestions[dScore]?.topic||"Mathematics":"Mathematics";if(dScore===4)weakTopic="Mathematics";document.getElementById("diagnostic").classList.add("hidden");document.getElementById("lesson").classList.remove("hidden");document.getElementById("lessonTitle").textContent="Recommended: "+weakTopic;document.getElementById("lessonText").textContent=lessons[weakTopic];save();scrollToId("lesson")}
function startQuiz(){quizIndex=0;quizScore=0;document.getElementById("lesson").classList.add("hidden");document.getElementById("quiz").classList.remove("hidden");showQuiz();scrollToId("quiz")}
function showQuiz(){let x=quizzes[weakTopic];document.getElementById("quizQuestion").textContent=x.q;document.getElementById("quizAnswers").innerHTML=x.a.map((a,i)=>`<button class="answer" onclick="answerQuiz(${i})">${a}</button>`).join("")}
function answerQuiz(i){let x=quizzes[weakTopic];if(i===x.c)quizScore++;quizIndex++;document.getElementById("quiz").innerHTML=`<h2>🎉 Quiz Complete</h2><p>You scored ${quizScore}/1.</p><button onclick="startDiagnostic()">Take Diagnostic Again</button>`;let old=JSON.parse(localStorage.getItem("edubridge")||"{}");old.progress=Math.min(100,(old.progress||0)+25);localStorage.setItem("edubridge",JSON.stringify(old));updateDashboard()}
function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
updateDashboard();
