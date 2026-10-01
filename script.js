const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let xp = Number(localStorage.getItem("ashish_xp") || 0);
let completedLesson = localStorage.getItem("lesson_done") === "yes";
let quizDone = localStorage.getItem("quiz_done") === "yes";
let outputDone = localStorage.getItem("output_done") === "yes";
let debugDone = localStorage.getItem("debug_done") === "yes";

function updateProgress(){
  const level = Math.floor(xp / 100) + 1;
  const inLevel = xp % 100;
  const badges = [completedLesson, quizDone, outputDone, debugDone].filter(Boolean).length;
  $("#xp").textContent = xp;
  $("#level").textContent = level;
  $("#xpTop").textContent = xp;
  $("#levelTop").textContent = level;
  $("#badgeTop").textContent = badges;
  $("#progressBar").style.width = inLevel + "%";
  $("#progressText").textContent = `${100-inLevel} XP to Level ${level+1}`;
}
function addXP(amount, key){
  if(key && localStorage.getItem(key)==="yes") return false;
  xp += amount;
  localStorage.setItem("ashish_xp", xp);
  if(key) localStorage.setItem(key, "yes");
  updateProgress();
  return true;
}
updateProgress();
$("#year").textContent = new Date().getFullYear();

$(".menu-btn").addEventListener("click",()=>{ const n=$("#nav"); n.style.display=n.style.display==="flex"?"none":"flex"; });
$$("nav a").forEach(a=>a.addEventListener("click",()=>$("#nav").style.display="none"));

const lessons = {
 c:["C Programming — Variables","A variable is a named place in memory used to store a value. Example: int age = 18;"],
 python:["Python — Variables","Python variables do not need a type declaration. Example: age = 18"],
 dsa:["DSA — Arrays","An array stores multiple values in an ordered sequence and lets you access elements by index."],
 web:["HTML — Structure","HTML gives a webpage its structure using elements such as headings, paragraphs and links."],
 ai:["AI / ML — Data","Machine learning systems learn patterns from data to make predictions or decisions."]
};
$$(".learn-card").forEach(btn=>{
  btn.addEventListener("click",()=>{
    $$(".learn-card").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const item=lessons[btn.dataset.course];
    $("#lessonTitle").textContent=item[0];
    $("#lessonText").textContent=item[1];
  });
});
$("#lessonDone").addEventListener("click",()=>{
  if(addXP(20,"lesson_done")) {
    $("#lessonDone").textContent="Lesson Completed ✓";
  } else $("#lessonDone").textContent="Already Completed ✓";
});
if(completedLesson) $("#lessonDone").textContent="Lesson Completed ✓";

$$("#quizOptions button").forEach(b=>b.addEventListener("click",()=>{
  if(b.dataset.answer===";"){
    if(addXP(25,"quiz_done")) $("#quizResult").textContent="Correct! +25 XP 🎉";
    else $("#quizResult").textContent="Already completed ✓";
  } else $("#quizResult").textContent="Not quite — try again!";
}));
$$(".output-options button").forEach(b=>b.addEventListener("click",()=>{
  if(b.dataset.output==="8"){
    if(addXP(25,"output_done")) $("#outputResult").textContent="Correct! +25 XP 🎯";
    else $("#outputResult").textContent="Already completed ✓";
  } else $("#outputResult").textContent="Try tracing the value of x.";
}));
$$(".debug-options button").forEach(b=>b.addEventListener("click",()=>{
  if(b.dataset.debug==="semicolon"){
    if(addXP(30,"debug_done")) $("#debugResult").textContent="Correct! +30 XP 🐛✨";
    else $("#debugResult").textContent="Already completed ✓";
  } else $("#debugResult").textContent="Look at the end of the first line.";
}));
