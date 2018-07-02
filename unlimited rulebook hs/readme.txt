Hi, this is my first try in creating chrome extension.
It fetches magnet links from nyaa.si
It might or not cause problems. It is not on me. Know this and use at your own risk.

This extension is not really tested. Just created for personal use, i probably won't be updating it myself, feel free to edit.
It has Horrible Code.
Also if they change nyaa.si page or horriblesubs.info page, this extension, most probably - near certain, won't work at all.

INSTALL
The link below explains how to install unpacked extensions.
https://developer.chrome.com/extensions/getstarted


SETTINGS
It does not have any settings button menu etc of itself.
If you want to download torrent files, instead using magnets, edit click.js file as following:
in line 67:
	var newHTML = "<a href='"+magnetLinkObj[1]+"'>"+oldHTML+"</a>";
to
	var newHTML = "<a href='"+magnetLinkObj[2]+"'>"+oldHTML+"</a>";

If you want more links to be created by addon, edit click.js file and replace the number, "21" below, with desired number.
in line 49:
	for (var i=0; i<21; i++){
to
	for (var i=0; i<30; i++){
30 is example here. It will create links for 30-1 = 29 episodes on the list. Because one is advertisement. But it will most
likely blow up after 26 because nyaa page have 75 links in one table, 3 for each episode(480-720-1080).
I don't check secondary pages of the table.

-Ertauren