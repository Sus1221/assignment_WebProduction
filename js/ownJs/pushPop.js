


/**
 * Navigation & history push/pop-state
 *
 */

//function to show/hide sections
function switchToSection(sectionId) {
  //if no sectionId was recieved (or home was recieved),
  //show the "front page"
  if (!sectionId || sectionId == "home") {
    sectionId = "content-list";
  }

  //hide all sections in main .row except section.mySidebar
  $("main .row").children().not(".mySidebar").hide();
  //then show the requested section
  $('section#'+sectionId).fadeIn(500);
  
  //if needed get data using AJAX
  if (sectionId == "content-list") {
    getPages();
  } else if (sectionId == "admin-form") {
    $("#admin-form .menuLinkFields").hide();
    getMenuLinks("menu-main-menu");
  }

  //find any links in body pointing to the sectionId,
  $("body").find('a[href="'+sectionId+'"]').each(function() {
    //and for each link found, add .active class 
    //to the link parent (if it is an <li> tag),
    $(this).parent("li").siblings().removeClass("active");
    //and add it to my parent
    $(this).parent("li").addClass("active");
  });
}


//"go to page" function
function goTo(href) {
  // Show a section with an id corresponding
  // to the link's href
  switchToSection(href);

  // Add the current "state/page" to our history
  history.pushState(null,null,href);
}


//setup push/pop-state pushPopListeners for <a> tags
function pushPopListeners() {
  // When we click a link
  $(document).on("click","a",function(event){

    //if the user clicks a real http:// || https:// link,
    if ($(this).attr("href").indexOf("://") >=0) {
      //assume they are leaving the site
      return;
    }

    //prevent "empty" urls from affecting browsing
    if ($(this).attr("href") && $(this).attr("href") !== "#") {
      goTo($(this).attr("href"));
    }

    event.preventDefault();
  });


  // Add a pop state listener
  // (listen to forward/backward buttons in the browser)
  addEventListener("popstate",onPopAndStart);

  //and run once immediately (this function runs at DOM ready)
  onPopAndStart();

  // Run this function on popstate and initial load
  function onPopAndStart(){
    //alert("The popstate event is triggered!");

    // Read our url and extract the page name
    // the characters after the last slash
    var l = location.href;
    //might need to change this
    var pageName = l.substring(l.lastIndexOf("/")+1);

    // if no pageName set pageName to false
    pageName = pageName || false;
    //and switchToSection
    switchToSection(pageName);
  }
}