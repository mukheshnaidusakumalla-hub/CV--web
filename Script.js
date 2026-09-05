// Current Date
document.getElementById("rDate").innerText =
new Date().toLocaleDateString();

let skills = [];

// =====================
// LIVE UPDATE
// =====================

const inputs = document.querySelectorAll(
"input, textarea"
);

inputs.forEach(input=>{
input.addEventListener("keyup", updateResume);
input.addEventListener("change", updateResume);
});

function updateResume(){

document.getElementById("rName").innerText =
document.getElementById("name").value || "Your Name";

document.getElementById("rEmail").innerText =
document.getElementById("email").value;

document.getElementById("rPhone").innerText =
document.getElementById("phone").value;

document.getElementById("rLinkedin").innerText =
document.getElementById("linkedin").value;

document.getElementById("rAddress").innerText =
document.getElementById("address").value;

document.getElementById("rObjective").innerText =
document.getElementById("objective").value;

// EDUCATION

document.getElementById("rEducation").innerHTML =
`
<p>
<b>${document.getElementById("degree").value}</b><br>
${document.getElementById("college").value}<br>
${document.getElementById("year").value}<br>
${document.getElementById("cgpa").value}
</p>
`;

// PROJECT

document.getElementById("rProject").innerHTML =
`
<p>
<b>${document.getElementById("projectTitle").value}</b><br>
${document.getElementById("projectDesc").value}<br>
<b>Technologies:</b>
${document.getElementById("projectTech").value}
</p>
`;

// EXPERIENCE

document.getElementById("rExperience").innerHTML =
`
<p>
<b>${document.getElementById("company").value}</b><br>
${document.getElementById("role").value}<br>
${document.getElementById("experience").value}
</p>
`;

createList(
"certifications",
"rCertifications"
);

createList(
"strengths",
"rStrengths"
);

createList(
"languages",
"rLanguages"
);

createList(
"hobbies",
"rHobbies"
);

}

// =====================
// LIST GENERATOR
// =====================

function createList(source,target){

let items =
document.getElementById(source)
.value
.split("\n");

let html = "";

items.forEach(item=>{

if(item.trim() !== ""){

html += `<li>${item}</li>`;

}

});

document.getElementById(target)
.innerHTML = html;

}

// =====================
// SKILLS
// =====================

document
.getElementById("addSkillBtn")
.addEventListener("click", addSkill);

function addSkill(){

let skillInput =
document.getElementById("skillInput");

let skill =
skillInput.value.trim();

if(skill === "") return;

skills.push(skill);

skillInput.value = "";

renderSkills();

}

function renderSkills(){

let badgeHTML = "";

skills.forEach(skill=>{

badgeHTML +=
`
<span class="badge bg-primary m-1">
${skill}
</span>
`;

});

document.getElementById("rSkills")
.innerHTML = badgeHTML;

let listHTML = "";

skills.forEach((skill,index)=>{

listHTML +=
`
<li>
${skill}
<button
class="btn btn-sm btn-danger ms-2"
onclick="removeSkill(${index})">
X
</button>
</li>
`;

});

document.getElementById("skillList")
.innerHTML = listHTML;

}

function removeSkill(index){

skills.splice(index,1);

renderSkills();

}

// =====================
// PHOTO UPLOAD
// =====================

document
.getElementById("photo")
.addEventListener("change", function(){

const file =
this.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload = function(e){

document.getElementById(
"previewPhoto"
).src = e.target.result;

localStorage.setItem(
"resumePhoto",
e.target.result
);

};

reader.readAsDataURL(file);

});

// =====================
// SAVE LOCAL STORAGE
// =====================

document
.getElementById("saveBtn")
.addEventListener("click", saveData);

function saveData(){

const data = {

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

phone:
document.getElementById("phone").value,

linkedin:
document.getElementById("linkedin").value,

address:
document.getElementById("address").value,

objective:
document.getElementById("objective").value,

degree:
document.getElementById("degree").value,

college:
document.getElementById("college").value,

year:
document.getElementById("year").value,

cgpa:
document.getElementById("cgpa").value,

projectTitle:
document.getElementById("projectTitle").value,

projectDesc:
document.getElementById("projectDesc").value,

projectTech:
document.getElementById("projectTech").value,

company:
document.getElementById("company").value,

role:
document.getElementById("role").value,

experience:
document.getElementById("experience").value,

certifications:
document.getElementById("certifications").value,

strengths:
document.getElementById("strengths").value,

languages:
document.getElementById("languages").value,

hobbies:
document.getElementById("hobbies").value,

skills: skills

};

localStorage.setItem(
"resumeData",
JSON.stringify(data)
);

alert("Resume Saved Successfully");

}

// =====================
// LOAD DATA
// =====================

window.onload = function(){

const data =
JSON.parse(
localStorage.getItem("resumeData")
);

if(data){

for(let key in data){

const field =
document.getElementById(key);

if(field){

field.value = data[key];

}

}

skills = data.skills || [];

renderSkills();

updateResume();

}

const photo =
localStorage.getItem(
"resumePhoto"
);

if(photo){

document.getElementById(
"previewPhoto"
).src = photo;

}

};

// =====================
// PDF DOWNLOAD
// =====================

document
.getElementById("downloadBtn")
.addEventListener("click", downloadPDF);

function downloadPDF(){

updateResume();

const resume =
document.getElementById("resume");

const options = {

margin:0.3,

filename:"Professional_Resume.pdf",

image:{
type:"jpeg",
quality:1
},

html2canvas:{
scale:3,
useCORS:true
},

jsPDF:{
unit:"in",
format:"a4",
orientation:"portrait"
}

};

setTimeout(()=>{

html2pdf()
.set(options)
.from(resume)
.save();

},500);

}
