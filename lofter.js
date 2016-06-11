var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false
    }
});
var fs = require('fs');

var i=0;

casper.start('http://www.lofter.com');

casper.then(function () {
    this.capture("a0.png");
    this.click('li.weixin a');
    this.echo("using weixin...");
    this.wait(3000);
});

casper.then(function() {
    this.capture("a1.png");
});

casper.then(function() {
    this.waitForSelector('li.user', function() {
        this.thenOpen("http://www.lofter.com/tag/美臀/new", function() {
            this.echo("open link...");
            this.capture("a2.png");
        });




        var count = 15;
        while(count>0){
            this.then(function () {
        		this.scrollToBottom();
        		this.wait(10000);
        	});
        	count--;
        }

        this.then(function () {
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





    }, function() {
        this.echo("log in time out");
    }, 300000);
});







casper.run()