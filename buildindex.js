var finder = require('findit')('.');
var path = require('path');
var fs = require('fs');
var output = './mdfiles';
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var child;

var result={};


finder.on('directory',function(dir,stat,stop){
	var base = path.basename(dir);
	if (base === '.git' || base === 'node_modules'){
		stop();
	}else{
		//result[base]=[];
	}
});

finder.on('file',function(file,stat){
	var base = path.basename(file);
	var ext = path.extname(file);
	var dirname = path.dirname(file);
	if (ext === '.md') {
		var filename = path.basename(file,'.md');
		var desc;
	//	ls = spawn('head -n 1 '+file);
	//	ls.on('error',function(err){ console.log('ls error',err);});
	//	ls.stdout.on('data',function(data){
	//		console.log('stdout: '+ data);
	//	});
		
		child=exec('head -n 1 '+file, function (error,stdout,stderr){
				desc=stdout.replace("\n","").replace("#","");
				//desc=desc.replace("#","");
				if(desc.length==0) desc=filename;
				//console.log( result[dirname]);
				if( !result.hasOwnProperty(dirname)){
					result[dirname]=[];
					//console.log("add node");
				}
				//console.log( result[dirname]);
				result[dirname].push({name:desc,link:dirname+'/'+filename+'.html'});	
			});
		
	//	console.log(desc);
	//	result[dirname].push({name:desc,link:dirname+'/'+filename+'.html'});		
		
	}
});

finder.on('end',function(){
	//fs.wirteFile(output, JSON.stringify(result,null,4), function(err){});
	console.log(JSON.stringify(result,null,4));

});
