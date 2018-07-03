// Ertauren

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function convertToList(wholeData){ // whole data as element
    var retList = [];
    var tempObj = []; // title, magnet, torrent

    for (var i=0; i<75; i++){
        var row = wholeData.children[i];
        var x = 0;
        if((row.children[1].children[0].getAttribute("class")) == "comments"){x=1;}
        tempObj = [
            row.children[1].children[x].getAttribute("title"),
            row.children[2].children[1].getAttribute("href"), // magnet
            ("https://nyaa.si")+row.children[2].children[0].getAttribute("href") // torrent
        ]
        retList.push(tempObj);
    }
    return retList;
}

function getRequestedLinkObj(wholeDataAsList, resolution, animeName, episodeNo){ //resolution 480 vs 720 vs 1080
    // create query title
    if (resolution == "SD"){
        resolution = "480p";
    }
    var qTitle = "[HorribleSubs] "+animeName+"- "+episodeNo+" ["+resolution+"].mkv";
    console.log(qTitle);
    // create query obj
    var foundVal = [];
    for (var i=0; i<75; i++){
        if((wholeDataAsList[i])[0] == qTitle){
            foundVal = wholeDataAsList[i];
            break;
        }
    }
    return foundVal;
}

function editReleases(wholeReleases, theList){ //as document element
    for (var i=0; i<21; i++){ //  LINE 49
        if(i == 5){i++;}
        var releaseRow = wholeReleases.children[i].children[0];
        var hrefLink = releaseRow.getAttribute("href");
        var dlLinks = releaseRow.children[2];
        var episodeNumber = releaseRow.children[1].innerHTML;

        var div = document.createElement('div');
        div.innerHTML = releaseRow.innerHTML;
        div.children[0].innerHTML = "";
        div.children[1].innerHTML = "";
        div.children[2].innerHTML = "";
        var releaseName = div.textContent;
        //releaseName = releaseName.substring(0, releaseName.length - 1);

        for (var j=0; j<(dlLinks.childElementCount); j++){
            var magnetLinkObj = getRequestedLinkObj(theList, dlLinks.children[j].innerHTML, releaseName, episodeNumber);
            var oldHTML = dlLinks.children[j].innerHTML;
            var newHTML = "<a href='"+magnetLinkObj[1]+"'>"+oldHTML+"</a>";  // LINE 67
            dlLinks.children[j].innerHTML = newHTML;
        }
    }
}

window.onload = function(){

	httpGetAsync("https://nyaa.si/user/HorribleSubs", function(nyaaResponse){

        var table = /<tr class="success".*?>([\s\S]*)<\/tr>/.exec(nyaaResponse)[1];
        table = '<tr class="success">'+table+'</tr>';

        var doctype = document.implementation.createDocumentType( 'html', '', '');
        var dom = document.implementation.createDocument('', 'html', doctype);

        table = table.replace(/<img[^>]*>/g,"");
        dom.documentElement.innerHTML = table;

        var nyaaList = convertToList(dom.documentElement);

        var theBox = document.getElementById("execphp-3");
        var latestReleases = theBox.children[1].children[0].children[1].children[0];

        editReleases(latestReleases, nyaaList);
	});
}