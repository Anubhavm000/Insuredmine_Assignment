const os = require('os-utils');
const {exec} = require('child_process');
const { stdout, stderr } = require('process');


const checkCPU = (th = 70) =>{
    setInterval(()=>{
        os.cpuUsage((usage) =>{
            const percent = usage * 100;
            console.log(`CPU usage : ${percent.toFixed(2)}%`);

            if(percent >th){
                console.warn(`CPU usage exceeded ${th}% !!!!`);

                exec('pm2 restart app', (err,stdout,stderr) =>{
                    if(err){
                        console.log(err.message);
                    }else{
                        console.log('Server restarted..');
                        
                    }
                })
            }
            
        })
    },5000)
}

module.exports = checkCPU