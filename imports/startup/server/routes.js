Picker.route('/video/:id', function( params, req, res, next ) {
  //var file = this.params.full_path;
  //var file = "D:\\youtube-test\\Luis Fonsi, Demi Lovato - Échame La Culpa.mp4"

  //var file = "E:\youtube-test\\" + params.id + ".mp4"

  var file = "/home/fernavat/Videos/youtube-test/" + params.id + ".mp4"

  var fs = Npm.require('fs');

  var path = file
  var stat = fs.statSync(path)
  var fileSize = stat.size
  var range = req.headers.range

  if (range) {

    var parts = range.replace(/bytes=/, "").split("-")
    var start = parseInt(parts[0], 10)
    var end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1

    var chunksize = (end - start) + 1
    var file = fs.createReadStream(path, { start, end })
    var head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    //console.log("range: "+range+` bytes ${start}-${end}/${fileSize}`)
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    //console.log("no range")
    var head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

