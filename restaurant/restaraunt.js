
//generate html content with javascript and jQuery

$("#content").append("<img src='images/logo.png' alt='East Moon Asian Bistro'>")
$("#content").append("<h1>Welcome to East Moon Asian Bistro!</h1>")
$("#content").append("<p>Located at 13352 Minnieville Rd., Woodbridge, VA, our restaurant offers a wide array of fine Asian dishes, ranging from traditional dish such as Crispy Duck, Shrimp Tempura, Christmas Roll to new style entrees such as One Night in Bangkok, Veggies Stir-Fry, Sweet Potato Roll.</p>")

var list = '<ul id="tabmenu" >' 
            + '<li><a class=""'
            + 'id="tab1">Menu</a></li>' 
            + '<li><a class=""'
            + 'id="tab2">Map</a></li>' 
            + '<li><a class=""'
            + 'id="tab3">Contact</a></li>' 
            + '</ul>' 
            + '<div id="page"></div>'
$("#content").append(list);

//default tab view
$("#page").html("<p>Here is our menu: Crispy Duck, Shrimp Tempura, Christmas Roll </p> ");
$("#tab1").addClass("active");


//events
bindTabClickToSetPageContent("#tab1", 
    "<p>Here is our menu: Crispy Duck, Shrimp Tempura, Christmas Roll</p>");
bindTabClickToSetPageContent("#tab2", 
    "<p>We're located at: 13352 Minnieville Rd., Woodbridge, VA</p>");
bindTabClickToSetPageContent("#tab3", 
    "<p>We can be reached at: (555)555-5555.</p>");


//event handler helper function
function bindTabClickToSetPageContent(selector, content) {
    $(selector).click(function () {
        $("#page").html(content);
        $("a").removeClass("active");
        $(this).addClass("active");
    });
}

