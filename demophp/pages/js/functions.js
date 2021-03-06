/**************************************
 * GENERIC FUNCTIONS USED BY THE DEMO *
 **************************************/

function initControls() {
    var controls = document.getElementsByClassName("form-control");
    if(controls) {
        for (var i = 0; i < controls.length; i++) {
            controls[i].onkeydown = function (event) {
                if (event.keyCode == 13) {
                    nextFunction();
                    return false;
                }
            };
        }
    }
}

/** checks if Enter is pressed on text forms and calls the next function */
function swapContent(oldElement, newElement, callback) {
    var oldElementContainer = document.getElementById(oldElement);
    if(oldElementContainer) {
        oldElementContainer.style.opacity = 0;
    }
    setTimeout(function(){
        var newElementContainer = document.getElementById(newElement);
        if(newElementContainer) {
            if(oldElementContainer){
                oldElementContainer.style.display = 'none';
            }
            newElementContainer.style.display = 'block';
            newElementContainer.style.opacity = 1;
            callback && callback();
        }
    },200);
}

/**
* checks if a mobile device
*/
function mobileAndTabletCheck(callback) {
    var check = false;
    (function(a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
                .test(a) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
                .test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    callback && callback(check);
};

function encodeParams(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
}

function ajaxCall(params, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(request.readyState == 4 && request.status == 200) {
            callback && callback(JSON.parse(request.responseText));
        }
    };
    request.open('POST','typingdnacalls.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.send(encodeParams(params));
}

/** basic highlighting function for the text to be typed */
function highlight(highlightedParagraph, toTypeParagraph, sender) {
    var len = sender ? sender.value.length : 0;
    document.getElementById(highlightedParagraph).innerHTML = currentQuote.slice(0, len);
    document.getElementById(toTypeParagraph).innerHTML = currentQuote.slice(len);
}

/**
 * verifies if the typed text is similar to the text to be typed,
 * this is a simple/fast implementation that works fine, but only looks at words
 */
function fastCompareTexts(t1, t2) {
    var dt1 = t1.split(" ");
    var dt2 = t2.split(" ");
    var total2 = 0;
    var total1 = 0;
    for (var i in dt2) {
        total2 += (dt1.indexOf(dt2[i]) > -1) ? 1 : 0;
    }
    for (var i in dt1) {
        total1 += (dt2.indexOf(dt1[i]) > -1) ? 1 : 0;
    }
    var total = (total1 < total2) ? total1 : total2;
    var length = (dt1.length > dt2.length) ? dt1.length : dt2.length;
    /** returns a number between 0 (completely different texts) and 1 (identical texts) */
    return total / length;
}

function restart(){
    document.location = "index.php";
}
