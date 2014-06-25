var express = require('express');
var router = express.Router();

// boilerplate urls
var stations = ['http://1live.akacast.akamaistream.net/7/706/119434/v1/gnl.akacast.akamaistream.net/1live',
               'http://rock-high.rautemusik.fm'];

// process stuff
var spawn = require('child_process').spawn;
var process;



function killProcess() {
    // send termination signal
    process.kill('SIGINT');
    // reset the reference
    process = null;   
}

function playStation(id) {
    
    // if a stream is already playing, kill it before starting a new one
    if(process != null) {
        killProcess();
    }
    
    
    // run the command
    var audioProcess = spawn('mplayer', [stations[id-1]]);

    audioProcess.stdout.on('data', function (data) {
      //console.log('stdout: ' + data);
    });

    audioProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    audioProcess.on('close', function (code) {
      console.log('Radio station playback was stopped. Code: ' + code);
    });
    
    process = audioProcess;
    
}

// ############################################ ROUTES ############################################

router.get('/', function(req, res) {
    
    res.send('respond with a resource');
    // nothing to play here
    
});

router.get('/end', function(req, res) {
    res.send('respond with a resource');
    killProcess();
});


router.get('/:id', function(req, res) {
    res.send('respond with a resource');
    var id = req.params.id;
	
    console.log('Retrieving station: ' + id);
    
    playStation(id);
});


module.exports = router;
