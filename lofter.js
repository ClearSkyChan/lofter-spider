var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false
    }
});
var fs = require('fs');

var i=0;



casper.start('http://www.lofter.com', function () {
    
    casper.withFrame(0, function () {
        this.echo("aaaa");
        this.waitForSelector('form#login-form', function() {
            this.fillSelectors('form#login-form', {
                'input[name="email"]': 'clearskychan001@163.com',
                'input[name="password"]': '7504158cct'
            }, true);
            this.click('#dologin');
            this.capture("a1.png");
            this.echo("fill id & pswd");
            this.echo("log in now...");
        });
    });
});

casper.thenOpen("http://www.lofter.com/tag/美臀/new",function(){	
    this.echo("open link...");
    this.capture("a2.png");
});

//var count = 15;
//while(count>0){
//	casper.then(function(){
//		this.scrollToBottom();
//		this.wait(10000);
//	});
//	count--;
//}

//casper.then(function () {
//	var that = this;	
//	var imgs = this.getElementsAttribute('.imgc img','src');	
//	var content ="";
//	var today = new Date();
//	var todayStr =today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();

//	imgs.forEach(function(imgUrl){
//		if(imgUrl) {
//			content += imgUrl+"\r\n";
//			that.download(imgUrl, todayStr+'/'+i+'.jpg');
//			i++;
//		};
//	});

//	fs.write(todayStr+".txt", content, 'w');
//	this.echo("end...");
//    this.capture(++i+'.png');	
//});


casper.run()