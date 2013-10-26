var apiKey ='1DXWYOVVQHNF7AR18';
var trackURL = 'Freestyle.mp3';
//var trackID = 'SOJARUS1338A5D5F1C';
var context = new webkitAudioContext();
var _title = 'Freestyle';
var _artist = 'Taalbi Brothers';
var url = 'http://developer.echonest.com/api/v4/song/search?format=json&bucket=audio_summary';
$.getJSON(url, {title:_title, artist:_artist, api_key:apiKey}, function(data) {
  var analysisURL = data.response.songs[0].audio_summary.analysis_url;
  console.log(analysisURL);
  var remixer = createJRemixer(context, $, apiKey);
  remixer.remixTrackByURL(analysisURL, trackURL, 
    function (track, percent) {
      console.log(percent);
      console.log(track.status);
      if (track.status == 'ok') {
        var bpm;
        var bs = [];
        var volume = [];
        var game_beats = []; // JSON Object for iterating through in the game.

        for (var i = 0; i < track.analysis.beats.length; i++) {
          bpm = 60/parseFloat(track.analysis.beats[i].duration);
          //console.log(track.analysis.beats.length);
          //console.log("next");
            //console.log(track.analysis.beats[i].time);
          console.log(bpm);
          bs.push(bpm);
          var loud = parseFloat(track.analysis.beats[i].oseg.loudness_max);
          volume.push(loud);
          game_beats.push({"bpm": bpm, "loudness": loud});
          //console.log(track.analysis.beats[i].oseg.loudness_start);
          //console.log('next');
        }

        //console.log("random string");
        //console.log(volume);
        bs.sort();
          //var v = volume.copy();
          //var b = bs.copy();
       // console.log(volume.sort());
       // console.log(bs.sort());
       // console.log(volume.shift(), volume.pop());
      //  console.log(bs.shift(), bs.pop());
      //  console.log(game_beats);
        console.log("Min volume: " + Math.min.apply(null, volume));
        console.log("Max volume: " + Math.max.apply(null, volume));
        //console.log("BLAH");
      } 
    });
});
