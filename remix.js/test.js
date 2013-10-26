var apiKey ='1DXWYOVVQHNF7AR18';
var trackURL = 'http://localhost:8000/Red_Oyster_Cult.mp3';
//var trackID = 'SOJARUS1338A5D5F1C';
var context = new webkitAudioContext();
var _title = 'Red Oyster Cult';
var _artist = 'Guster';
var url = 'http://developer.echonest.com/api/v4/song/search?format=json&bucket=audio_summary';
$.getJSON(url, {title:_title, artist:_artist, api_key:apiKey}, 
  function(data) {
    var analysisURL = data.response.songs[0].audio_summary.analysis_url;
    console.log(analysisURL);
    var remixer = createJRemixer(context, $, apiKey);
    remixer.remixTrackByURL(analysisURL, trackURL,
      function (track, percent) {
        console.log(percent);
        console.log(track.status);
        if(track.status == 'ok') {
          var bpm;
          var bs = [];
          var volume = [];
          for(var i = 0; i < track.analysis.beats.length; i++) {
            bpm = 60/parseFloat(track.analysis.beats[i].duration);
            //console.log(track.analysis.beats[i]);
            //console.log("next");
            //console.log(track.analysis.beats[i].time);
            //console.log(bpm);
            bs.push(bpm);
            volume.push(parseFloat(track.analysis.beats[i].oseg.loudness_max));
            //console.log(track.analysis.beats[i].oseg.loudness_start);
            //console.log('next');
          }
          console.log(bs);
          console.log(volume);
          bs.sort();
          //var v = volume.copy();
          //var b = bs.copy();
          console.log(volume.sort());
          console.log(bs.sort());
          console.log(volume.shift(), volume.pop());
          console.log(bs.shift(), bs.pop());
          console.log("Min volume: " + Math.min.apply(null, volume));
          console.log("Max volume: " + Math.max.apply(null, volume));
        } 
    });
});
