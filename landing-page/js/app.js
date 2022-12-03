/**
 * Define Global Variables
 */
const allSections = document.querySelectorAll("section");
const navItem = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();

//function to biuld navigation menu by adding list items with links in each list item dynamiclly
function addListItems() {
  for (const section of allSections) {
    const newLi = document.createElement("li");
    newLi.classList.add("navbar__menu");
    const a = document.createElement("a");
    a.textContent = section.getAttribute("data-nav");
    a.setAttribute("data-nav", section.getAttribute("id"));
    a.href = "#" + section.getAttribute("id");
    a.classList.add("menu__link");

    newLi.appendChild(a);

    fragment.appendChild(newLi);
  }
  navItem.appendChild(fragment);
}

//execute function to build the nav dynamiclly
addListItems();

//create a hamburger menu in small screens using icon library
function addIcon() {
  const li = `<li><a class="icon menu__link" id="icon"><i class="fa fa-bars"> </i></a></li>`;
  navItem.insertAdjacentHTML("afterbegin", li);
}

//execute function that creates a hamburger menu in small screens
addIcon();

// declare function to toggle class "responsive" to show or hide links 
function myFunction() {
  navItem.classList.toggle("responsive");
}
//declare variable to hold the link that shows section links
const a = document.getElementsByClassName("icon")[0];
//add event to execute the function myFunction when the link is clicked
a.addEventListener("click", myFunction);

/*to detect the section inside the viewport (on screen) while scrolling
then change the style for active section and active link*/
const observe = () => {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        let link = document.querySelector(`[data-nav=${entry.target.id}]`);
        if (!entry.isIntersecting) {
          entry.target.classList.remove("your-active-class");
          link.classList.remove("active__link");
        } else {
          console.log(link);
          entry.target.classList.add("your-active-class");
          link.classList.add("active__link");
        }
      });
    },
    {
      threshold: 0.6,
    }
  );
  return document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
};

//add event when user scroll to change the style for section and it's link
window.addEventListener("scroll", observe);

//add event when user click on a link scroll smothly to it's section
navItem.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.dataset.nav) {
    document
      .getElementById(`${event.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${event.target.dataset.nav}`;
    }, 1000);
  }
});
