
// Get the sections 
const sections = document.querySelectorAll("section"); 
const header = document.querySelector("header"); 
let liFragment = [] ; 
// get section titles
const coordinates = [] ; 
const titles = []; 
sections.forEach( (section , index) => {
    titles[index] = section.getAttribute("data-nav"); 
    coordinates[index] = section.getBoundingClientRect();
}); 

// create the nav 
function createNav(titles){ 
const ulFrament = document.createElement("ul");
ulFrament.classList.add("menu");
liFragment = titles.map((title) => {
    let li = document.createElement("li");
    li.textContent = title; 
    return li ; 
}); 

liFragment.forEach( (li , i)  => {
    ulFrament.appendChild(li)
    li.addEventListener("click" , () => {
        window.scrollTo({
            top: Math.ceil(coordinates[i].top),
            // left: coordinates[i].left,
            behavior: 'smooth'
        }); 
    }); 
} ); 
return ulFrament ;
} 

let setActiveState = () => {
    let currentScroll = window.scrollY;  
    
     
    coordinates.forEach( (coordinates , index) => {
        let cooTop = Math.ceil(coordinates.top) ;  
        let cooBottom = Math.ceil(coordinates.bottom) ;  
        if(cooTop <= currentScroll && cooBottom > currentScroll ) {

            liFragment.forEach( (li , i) => {
                if(i == index) {
                    li.classList.add("active");
                    // console.log(cooTop + " coordinates.top"  + index); 
                    // console.log(currentScroll + " currentScroll" + index);     
                    
                    sections[i].classList.add("active");
                }
                if(i != index && li.classList.contains("active")) {
                    li.classList.remove("active"); 
                    sections[i].classList.remove("active");

                }
            });
        }
    } );   
}

window.addEventListener("scroll" , setActiveState);   


header.append(createNav(titles)); 

const menu = document.querySelector("header ul");
const menuTop = Math.ceil(menu.getBoundingClientRect().y);

window.addEventListener("scroll" , () => {
    // console.log(menuTop); 
    if(menuTop <= window.scrollY ) { 
        menu.classList.add("fixed"); 
        document.querySelector("body").style.paddingTop = "60px" ; 
    } else {
        menu.classList.remove("fixed"); 
        document.querySelector("body").style.paddingTop = "0" ; 

    }
});