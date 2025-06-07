//function toggleTheme() {
  //document.body.classList.toggle("dark-mode");
  //const theme = document.body.classList.contains("dark-mode")
    //? "dark"
    //: "light";
 // localStorage.setItem("theme", theme);
//}

// Load saved theme
//window.onload = () => {
  //const savedTheme = localStorage.getItem("theme");
  //if (savedTheme === "dark") {
    //document.body.classList.add("dark-mode");
 // }
//};
//function search(){
  //Let filter = document.getElementById('find').value.toUpperCase();

  //Let item = document.querySelectorAll('.video-card');

  //Let 1 = document.getElementsByTagName('h3');

  //for(var i = 0;i <= 1.length;i++){
    //Let a=item[i].getElementById('h3')[0];

    //Let value= a.innerHTML || a.innerText || a.textContent;

    //if(value.toUpperCase().indexof(filter) > -1) {
      //item[i].style.display="";
    //}
    //else{
      //item[i].style.display="none"; 
    //}
  //}
//}//let menuIcon = document.querySelector(".menu-icon");
//let sidebar = document.querySelector(".sidebar");
//let container = document.querySelector(".container");

// let menuIcon = document.querySelector(".menu-icon")

//menuIcon.onclick = function(){
  //  sidebar.classList.toggle("small-sidebar");
    //container.classList.toggle("large-container");    
    
//}
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";
  localStorage.setItem("theme", theme);
}

// Load saved theme
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
};

function search() {
  const searchInput = document.getElementById('find');
  const searchTerm = searchInput.value.toLowerCase();
  const videoCards = document.querySelectorAll('.video-card');

  videoCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const creator = card.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || creator.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
