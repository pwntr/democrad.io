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
    if(process !== null) {
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

function changeVolume(volume) {
        
    // run the command
    try {
        // amixer needs to be installed
        //var audioProcess = spawn('amixer', ['set PCM ' + volume + '%']);
        var audioProcess = spawn('echo', ['set PCM ' + volume + '%']);
        
        audioProcess.stdout.on('data', function (data) {
          console.log('stdout: ' + data);
        });

        audioProcess.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });

        audioProcess.on('close', function (code) {
          console.log('Volume change process was closed. Code: ' + code);
        });
        
    } catch (error) {
        console.log(error.message);
    }

}

function getCurrentVolume() {
    
     try {
        // amixer needs to be installed
        //var audioProcess = spawn('amixer', ['get PCM | egrep -o "[0-9]+%"']);
        var audioProcess = spawn('echo', ['get PCM | egrep -o "[0-9]+%"']);
        
        audioProcess.stdout.on('data', function (data) {
          console.log('stdout: ' + data);
            return data;
        });

        audioProcess.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });

        audioProcess.on('close', function (code) {
          console.log('Volume read process was closed. Code: ' + code);
        });
        
    } catch (error) {
        console.log(error.message);
    }   

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

router.get('/volume', function(req, res) {
    res.send('respond with a resource');
    console.log(getCurrentVolume());
});

router.get('/volume/:volume', function(req, res) {
    res.send('respond with a resource');
    var volume = req.params.volume;
    changeVolume(volume);
});

router.get('/:id', function(req, res) {
    res.send('respond with a resource');
    var id = req.params.id;

    console.log('Retrieving station: ' + id);
    playStation(id);
});

module.exports = router;
