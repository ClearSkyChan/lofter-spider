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

casper.thenOpen("http://www.lofter.com/tag/美臀/new",function(){	
	this.echo("open link...");
});

var count = 15;
while(count>0){
	casper.then(function(){
		this.scrollToBottom();
		this.wait(10000);
	});
	count--;
}

casper.then(function () {
	var that = this;	
	var imgs = this.getElementsAttribute('.imgc img','src');	
	var content ="";
	var today = new Date();
	var todayStr =today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();

	imgs.forEach(function(imgUrl){
		if(imgUrl) {
			content += imgUrl+"\r\n";
			that.download(imgUrl, todayStr+'/'+i+'.jpg');
			i++;
		};
	});

	fs.write(todayStr+".txt", content, 'w');
	this.echo("end...");
    this.capture(++i+'.png');	
});


casper.run()