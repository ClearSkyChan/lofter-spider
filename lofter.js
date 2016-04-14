var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false
    }
});
var fs = require('fs');
var i=0;



casper.start('http://www.lofter.com',function() {
	this.echo("open lofter...");  
});

casper.then(function() {
    this.fillSelectors('#newlogin form', {                                  
        '#loginemail': 'clearskychan001@163.com',                                         
        '#loginpassword': '7504158cct'                                              
    },true);
    this.echo("fill id & pswd");   
});
casper.then(function() {
	this.echo("log in now...");
    this.click('#loginsubmit');
});

casper.thenOpen("http://www.lofter.com/tag/狗/new",function(){
	
	this.echo("open meitun...");
	this.capture(++i+'.png');	
});

/*casper.wait(3000);
casper.scrollToBottom();
casper.wait(3000);
casper.capture(++i+'.png');	*/


casper.waitWhileSelector('.imgc img',function () {
	var that = this;
	
	var imgs = this.getElementsAttribute('.imgc img','src');	
	var content ="";
	imgs.forEach(function(imgUrl){
		that.echo(imgUrl);

		content += imgUrl+"\r\n";
/*		that.then(function(){
			that.download(imgUrl, ++i+'.jpg');
		});*/
	});
	that.echo(content);
	fs.write("img-2016-4-14.txt", content, 'w');
    this.capture(++i+'.png');	
});


casper.run()