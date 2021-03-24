//Rrepresents wether side nav is opend (true) or closed (false)
var state = false;

//Represents wether the display (brower width) is greater than 600px (true) or not (false)
var largeDisplay = false;

function calcDisplayWidth() {
    var wid = document.getElementsByTagName('body')[0].clientWidth
    if(wid >= 600) {
        var largeDisplay = true;
    } else {
        var largeDisplay = false;
    }
    return largeDisplay;
}

largeDisplay = calcDisplayWidth();

if(largeDisplay) {
    state = true;
}

//Toggles side navigation bar
function showSideNav() {
    largeDisplay = calcDisplayWidth();
    if(state == false) {
        //Showing side navigation bar
        state = true;
        if(!largeDisplay) {
            //Small displays - Shadowing the background
            document.getElementById('coverAll').style.display = 'block';
            document.getElementById('sideNav').style.transform = 'translateX(0px)';
            document.getElementById('hamBurger').style.transform = 'translateX(240px)';
        } else {
            //Large Displays - No shadowing and hiding the compressed icons
            document.getElementById('coverAll').style.display = 'none';
            document.getElementById('sideNav').style.transform = 'translateX(0px)';
            document.getElementById('hamBurger').style.transform = 'translateX(240px)';
        }
    } else {
        //Hiding the side navigation bar
        state = false;
        if(!largeDisplay) {
            //Small displays - Hiding the navigation bar completely
            document.getElementById('coverAll').style.display = 'none';
            document.getElementById('sideNav').style.transform = 'translateX(-240px)'
            document.getElementById('hamBurger').style.transform = 'translateX(0px)'
        } else {
            //Large displays - Partialy hiding the side navigation bar, and leaving space for compressed icons
            document.getElementById('coverAll').style.display = 'none';
            document.getElementById('sideNav').style.transform = 'translateX(-180px)'
            document.getElementById('hamBurger').style.transform = 'translateX(60px)'
        }
    }
    showCompressedIcons();
}

//Toggling (show/hide) the compressed icons on the side navigation bar
function showCompressedIcons() {
    largeDisplay = calcDisplayWidth();
    if(largeDisplay) {
        //Large displays might have compressed icons
        if(state == false) {
            //show icons
            var elements = document.getElementsByClassName('compressedIcons');
            for(elem = 0; elem < elements.length; elem++) {
                elements[elem].style.display = 'block';
            }
        } else {
            //hide icons
            var elements = document.getElementsByClassName('compressedIcons');
            for(elem = 0; elem < elements.length; elem++) {
                elements[elem].style.display = 'none';
            }
        }
    } else {
        //hide icons - No compressed icons in the small displays
        var elements = document.getElementsByClassName('compressedIcons');
        for(elem = 0; elem < elements.length; elem++) {
            elements[elem].style.display = 'none';
        }
    }
}

function hideSideNav() {
    if(state == true) {
        showSideNav();
    }
}