const express = require('express')
const app = express()
const port = 3000
const fs= require("fs")
const path= require("path")
const targetfolder ='./Files';
const file = fs.readdirSync(targetfolder);

file.forEach((files)=>{
    let absoultepath = path.join(targetfolder, files)

    if(fs.lstatSync(absoultepath).isDirectory()) return;

    const ext=path.extname(files).slice(1);
    
    const filepath=path.join(targetfolder,ext);

    if(!fs.existsSync(filepath)){
        fs.mkdirSync(filepath);
    }

    const joinfinal=path.join(filepath, files);
    fs.renameSync(absoultepath, joinfinal);
    console.log(`Moved ${file} to ${ext}`);
})

app.get('/', (req, res) => {
  res.send('Hello World9!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
