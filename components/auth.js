const router = require('express').Router();
const fs = require('fs');

router.get('/checkauth', async (req, res) => {
//     client.getState().then((data) => {
//         console.log(data)
//         res.send(data)
//     }).catch((err) => {
//         if(err){
//             res.send("DISCONNECTED")
//             try{
//                 fs.unlinkSync('../../session.json')
//             }catch(err){console.log(err)}
//         }
//     })
});

router.get('/logout', async () => {
            fs.unlink('session.json', function (err) {
              if (err){
                console.log(err);
              } else {
                console.log('File deleted!');
                global.authed = false;
                // fs.writeFileSync('components/last.qr','1@NHOb945kKcvgHauH1/+8nuPePoRCsEvAhgbsCuz+u8L5RT0FTdYV0eL4nUAzJKxYbtFf0QSglWo6ag==,PuZr8limqMXruJOJ+JCojE6Njr3A2EJK4GWhBF5XLFQ=,lfkbZJLD/qOxBujETxYCAg==');
              };
            });
            // try{
            //     fs.unlink('../session.json')
            // }catch(err){console.log(err)}
});

router.get('/getqr', (req,res) => {
    var qrjs = fs.readFileSync('components/qrcode.js');
    fs.readFile('components/last.qr', (err,last_qr) => {
        fs.readFile('session.json', (serr, sessiondata) => {
            if(err && sessiondata){
                res.write("<html><body><h2>Already Authenticated</h2></body></html>");
                res.end();
            }else if(!err && serr){
                var page = `
                    <html>
                        <body>
                            <script>${qrjs}</script>
                            <div id="qrcode"></div>
                            <script type="text/javascript">
                                new QRCode(document.getElementById("qrcode"), "${last_qr}");
                            </script>
                        </body>
                    </html>
                `
                res.write(page)
                res.end();
            }
        })
        if(err){
            
        }else{
            
        }
    });
});
module.exports = router;
