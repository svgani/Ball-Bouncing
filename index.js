const express = require('express');
const app = express();
const PORT = 8080

app.get('/',(req,res) => {
  console.log("user in StartPage")
  res.send('go to route /height/:height/:coefficientOfRestitution');
});

app.get('/height/:height/:cor',(req,res) => {
  const h = Number(req.params.height);
  const e = Number(req.params.cor);
  if (e<=0 || e>=1) {
    res.send("Coefficient of Restitution should be in between: 0 - 1")
  }
  console.log("Height:"+h+"\ncor:"+e);
  var obj = new Object();
  obj.Height = h;
  obj.CoR = e;
  var t0 = Math.sqrt(h/4.9)
  var tmax = Math.floor(t0*(1+e)/(1-e));
  obj.Bounces=0;
  console.log(tmax);
  obj.plot = new Array();
  obj.plot.push({'x':0,'y':h});
  obj.plot.push({'x':t0,'y':0});
  for(var i=1;i>0;i++){
    var k = 2*e*(Math.pow(e,i)-1)/(e-1);
    var temp = (k+1)*t0;
    var tH=Math.pow(e,2*i)*h
    obj.plot.push({'x':temp-Math.sqrt(tH/4.9),'y':tH});
    obj.plot.push({'x':temp,'y':0});
    if(temp>tmax){
      obj.Bounces=i+1;
      break;
    }
  }
  res.send(obj);
});

app.listen(PORT,() => {
  console.log('Server is running at port '+PORT);
})
