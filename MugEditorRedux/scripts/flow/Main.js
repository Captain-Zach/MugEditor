class Main extends Phaser.Scene {
    constructor(){
        super("Main");
    }

    preload() {
        // initialize definitions and lists
        this.createDefinitions();
        this.populateLists();
        // load images
        this.loadImages(this.hairList);
        this.loadImages(this.bodyListThicc);
        this.loadImages(this.bottomListThicc);
        this.loadImages(this.sweaterListThicc);
        this.loadImages(this.bodyListThin);
        this.loadImages(this.bottomListThin);
        this.loadImages(this.sweaterListThin);
    }
    
    createDefinitions(){
        this.filepath = "./assets/";
        this.extension = ".png";
        // Hair
        this.hairD_05 = "f_hairD_05";
        this.hairD_06 = "f_hairD_06";
        this.hairG_01 = "f_hairG_01";
        this.hairG_04 = "f_hairG_04";
        this.hairG_11 = "f_hairG_11";
        this.hairL_05 = "f_hairL_05";
        this.hairL_10 = "f_hairL_10";
        this.hairL_05 = "f_hairL_05";
        this.hairP_02 = "f_hairP_02";
        this.hairP_04 = "f_hairP_04";
        this.hairP_15 = "f_hairP_15";
        // Thicc Color - Dark 1 / Light  2 / Medium 3
        this.thicc_01 = "f_thicc_01";
        this.thicc_02 = "f_thicc_02";        
        this.thicc_03 = "f_thicc_03";        
        //  Thicc Jeans - Black 1 / Blue 2 / Yellow 3
        this.thiccJeans_01 = "f_thiccJeans_01";
        this.thiccJeans_02 = "f_thiccJeans_02";
        this.thiccJeans_03 = "f_thiccJeans_03";
        // Thicc Sweater - Black 1 / Blue 2 / Yellow 3
        this.thiccSweater_01 = "f_thiccSweater_01";
        this.thiccSweater_02 = "f_thiccSweater_02";
        this.thiccSweater_03 = "f_thiccSweater_03";
        // Thicc Sweater - Black 1 / Blue 2 / Yellow 3
        this.thiccSweater_01 = "f_thiccSweater_01";
        this.thiccSweater_02 = "f_thiccSweater_02";
        this.thiccSweater_03 = "f_thiccSweater_03";
        // Thin Color - Dark 1 / Light  2 / Medium 3
        this.thin_01 = "f_thin_01";
        this.thin_02 = "f_thin_02";
        this.thin_03 = "f_thin_03";  
        // Thin Jeans - Black 1 / Blue 2 / Red 3
        this.thinJeans_01 = "f_thinJeans_01";
        this.thinJeans_02 = "f_thinJeans_02";
        this.thinJeans_03 = "f_thinJeans_03";
        // Thin Sweater - Green 1 / Silver 2/ Teal 3
        this.thinSweater_01 = "f_thinSweater_01";
        this.thinSweater_02 = "f_thinSweater_02";
        this.thinSweater_03 = "f_thinSweater_03";   
    }

    populateLists(){
        this.hairList= [
            this.hairD_05,
            this.hairD_06,
            this.hairG_01,
            this.hairG_04,
            this.hairG_11,
            this.hairL_05,
            this.hairL_10,
            this.hairL_05,
            this.hairP_02,
            this.hairP_04,
            this.hairP_15
        ];
        this.bodyListThicc = [
            this.thicc_01,
            this.thicc_02,
            this.thicc_03
        ];
        this.bottomListThicc = [
            this.thiccJeans_01,
            this.thiccJeans_02,
            this.thiccJeans_03 
        ];
        this.sweaterListThicc = [
            this.thiccSweater_01,
            this.thiccSweater_02,
            this.thiccSweater_03
        ];
        this.bodyListThin = [
            this.thin_01,
            this.thin_02,
            this.thin_03
        ];
        this.bottomListThin = [
            this.thinJeans_01,
            this.thinJeans_02,
            this.thinJeans_03
        ];
        this.sweaterListThin = [
            this.thinSweater_01,
            this.thinSweater_02,
            this.thinSweater_03
        ];
    }

    loadImages(listname){
        for(let i = 0; i < listname.length ; ++i)
        { 
            this.load.image(listname[i], this.filepath + listname[i] + this.extension); 
        }
    }

    create(){
        // define and create inputs
        this.rBody = "thin";
        if(Math.random() >= 0.5) { this.rBody = "thin"; }
        else { this.rBody = "thicc"; }
        // this.puppet = new Dopleganger(this, this.rBody);
        this.puppet_list = [];
        this.addButton = document.getElementById("add_button");
        this.addButton.onclick = () => {
            //Create Dopl
            console.log("add button");
            this.puppet_list.push(new Dopleganger(this, this.puppet_list.length + 1))
            this.puppet_list.forEach(puppet => {
                // repositions all elements based on length of pList
                puppet.repos(this.puppet_list.length);
            });
        }
        this.BGButton = document.getElementById("BG_button");
        this.BGButton.onclick = () => {
            //Change BG
            console.log("BG change");
        }
        this.flipButton = document.getElementById("flip_button");
        this.flipButton.onclick = () => {
            console.log("edit other side");
            //Not important in V1
        }
        this.cartButton = document.getElementById("cart_button");
        this.cartButton.onclick = () => {
            console.log("Firing off add to cart event");
        }
    }

    update(){
        // check for inputs
    }
}

class Dopleganger{
    constructor(scene,pos=0, bodyType="thin"){
        console.log(Math.round(Math.random() * 3));
        this.scale = 0.25;
        this.pos = pos;
        
        // Offsets [x, y]
        let x = 0;
        let y = 1;
        // this.totalOffset = [400,300];
/*
        
        0+ 0
        1- -90 + 90 = 0
        2+ 90  = 90
        3- -270 + 90 = - 180
        4+ 360  360
 */
        let spacing = 90;
        pos = (pos & 0 == 0) ? pos *= 1  : pos *= -1;
        let adj = 0;
        if(pos != 0){
            adj = (pos & 0 == 0 ) ? adj = 0 : adj = spacing; 
        }

        this.totalOffset = [400 + (spacing * (pos) + adj), 300];
        this.hairOffset = [0 + this.totalOffset[x], (-250 * this.scale) + this.totalOffset[y]];
        this.thiccBotOffset = [0 + this.totalOffset[x],(302 * this.scale) + this.totalOffset[y]];
        this.thiccTopOffset = [0 + this.totalOffset[x],(90 * this.scale) + this.totalOffset[y]];
        this.thinBotOffset = [0 + this.totalOffset[x],(302 * this.scale) + this.totalOffset[y]];
        this.thinTopOffset = [0 + this.totalOffset[x],(90 * this.scale) + this.totalOffset[y]];

        // bodyType = "thicc";
        if(bodyType == "thicc"){
            this.body = scene.add.image(this.totalOffset[x],this.totalOffset[y], 
                scene.bodyListThicc[Math.floor(Math.random() * scene.bodyListThicc.length)]).setScale(this.scale);
            this.bottom = scene.add.image(this.thiccBotOffset[x],this.thiccBotOffset[y], 
                scene.bottomListThicc[Math.floor(Math.random() * scene.bottomListThicc.length)]).setScale(this.scale);
            this.top = scene.add.image(this.thiccTopOffset[x],this.thiccTopOffset[y], 
                scene.sweaterListThicc[Math.floor(Math.random() * scene.sweaterListThicc.length)]).setScale(this.scale);
        }else{
            
            this.test = Math.floor(Math.random() * scene.bodyListThin.length);
            console.log(this.test);

            this.body = scene.add.image(this.totalOffset[x],this.totalOffset[y], 
                scene.bodyListThin[this.test]).setScale(this.scale);
            this.bottom = scene.add.image(this.thinBotOffset[x],this.thinBotOffset[y], 
                scene.bottomListThin[Math.floor(Math.random() * scene.bottomListThin.length)]).setScale(this.scale);
            this.top = scene.add.image(this.thinTopOffset[x],this.thinTopOffset[y], 
                scene.sweaterListThin[Math.floor(Math.random() * scene.sweaterListThin.length)]).setScale(this.scale);
        }
        this.hair = scene.add.image(this.hairOffset[x],this.hairOffset[y],
            scene.hairList[Math.floor(Math.random() * scene.hairList.length)]).setScale(this.scale);
        console.log(this.body.width);
        scene.add.existing(this);
    }
    
    updatePos() {
        // Update position based on position variable.

    }

    refresh() {
        // 0 = x, 1 = y
        this.body.x = this.totalOffset[0]
        this.bottom.x = this.totalOffset[0]
        this.top.x = this.totalOffset[0]
        this.hair.x = this.totalOffset[0]
        
    }

    repos(total_pups) {
        console.log("repositioning on spawn " + total_pups, "at pos", this.pos);
        let start = 300;
        
        switch(total_pups){
            case 1: {
                this.totalOffset[0] = start * this.pos;

             } break;
            case 2: {console.log("case: " + total_pups);
                start = start - 325; // half of the length
                this.totalOffset[0] = start + (this.scale * (this.pos * 750)) } break;
            case 3: {console.log("case: " + total_pups); 
                start = start - (this.scale * (1400));
                this.totalOffset[0] = start + (this.scale * (this.pos * 750)) } break;
            case 4: {console.log("case: " + total_pups); } break;
            case 5: {console.log("case: " + total_pups); } break;
        }

        // if(total_pups > 1){
        //     this.totalOffset[0] = this.scale*( start - (this.pos * ((750 * this.pos)*-1) + (750 * (this.pos - 1))));
        // }
        this.refresh();
    }
}
let add_event = new CustomEvent("add_dopl", {
    detail: {
        test: true
    }
})

function clickTest() {
    console.log("I clicked a button");
    dispatchEvent(add_event);
}