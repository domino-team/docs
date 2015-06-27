var fs = require('fs');
var path = require('path');
var results={'.':[]};
var exec = require('child_process').exec;
var indexfile = './mdfiles.json';
var template = './template.html';

var walk = function(dir, done) {
	fs.readdir(dir, function(err, list) {
    	if (err) return done(err);
   		var i = 0;
    	(function next() {
			var file = list[i++];
      		if (!file) return done(null, results,true);
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
				var base = path.basename(file);
				if (stat && stat.isDirectory() && !(base === '.git' || base === 'node_modules')) {
					results[base]=[];
					walk(file, function(err, res) {
						//results = results.concat(res);
						next();
					});
				} else {
					var ext = path.extname(file);
					var dirname=path.dirname(file);
					if(dirname !==".")
						dirname=dirname.replace(".","").replace("/","");
					if(ext === ".md"){
						var filename = path.basename(file,'.md');
						//read the first line
						var child=exec('head -n 1 '+file, function (error,stdout,stderr){
							desc=stdout.replace("\n","").replace("#","");
							if(desc.length==0) desc=filename;
							//console.log( desc);
							
							//we got a md file
							var html="/"+dirname+'/'+filename+'.html';
							results[dirname].push({name:desc,link: html });
							//fs.createReadStream(template).pipe(fs.createWriteStream("."+html));
							fs.readFile(template,'utf8',function(err,data){
								if (err) throw err;
								var out=data.replace(/the-file-name-here/g,filename+".md");
								fs.writeFile("."+html,out,'utf8',function(err){
									if(err) throw err;
								});
							});
						});
					}
					next();
				}
			});
		})();
	});
};

walk(".",function(err,results){
		if (err) throw err;
		setTimeout(function(){
			console.log(results);
			fs.writeFileSync(indexfile, JSON.stringify(results));
		},1000);
});
