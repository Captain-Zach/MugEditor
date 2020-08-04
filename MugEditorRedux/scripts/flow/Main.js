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
        // load GUI elements
        this.load.image("close", "./assets/GUI/close.png");
        this.load.image("skin-tone_button", "./assets/GUI/button_skin-tone.png");
        this.load.image("bottom_button", "./assets/GUI/button_bottom.png");
        this.load.image("top_button", "./assets/GUI/button_top.png");
        this.load.image("hair_button", "./assets/GUI/button_hair.png");
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

    refreshAvaList(){
        console.log(this.ava_list);
        this.ava_list[this.puppet_list.length].style.display = "none"
        this.ava_list.forEach((avatar, index) => {
            avatar = document.getElementById("ava_"+index);
        });
        this.shuffle(this.puppet_list.length);
        this.addButton.disabled = false;
    }

    create(){
        // define and create inputs
        
        // this.puppet = new Dopleganger(this, this.rBody);
        this.puppet_list = [];
        // reference the hidden avatar buttons
        this.ava_list = [];

        for(let i = 1; i < 5; ++i){
            this.ava_list.push(document.getElementById("ava_"+i));
        }
        //
        this.ava_list.forEach((avatar, index) => {
            avatar.onclick = () => {
                console.log("You'ved clicked avatar", avatar.id);
                this.editor = new EditPort(this, this.puppet_list[index], index);
                // console.log(index)
            }
        });
        this.addButton = document.getElementById("add_button");

        this.addButton.onclick = () => {
            //Create Dopl
            console.log("add button");
            this.puppet_list.push(new Dopleganger(this, this.puppet_list.length + 1, randomBodyType()))
            this.ava_list[this.puppet_list.length - 1].style.display = "inline-block";
            this.puppet_list.forEach(puppet => {
                // repositions all elements based on length of pList
                puppet.repos(this.puppet_list.length);
            });
            const cutoff = 4;
            if(this.puppet_list.length >= cutoff) this.addButton.disabled = true;
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

    shuffle(){
        // resets the pos values of all the remaining dopls after a delete or move
        this.puppet_list.forEach((puppet, index) => {
            puppet.pos = index + 1;
            puppet.repos(this.puppet_list.length);
        });
    }

    update(){
        // check for inputs
    }
}


class Dopleganger{
    constructor(scene,pos=0, bodyType="thin"){
        bodyType = randomBodyType();

        console.log(Math.round(Math.random() * 3));
        this.scale = 0.2;
        this.pos = pos;
        
        // Offsets [x, y]
        let x = 0;
        let y = 1;

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

        let construct = {
            body: undefined,
            bottom: undefined,
            top: undefined,
            hair: undefined,
            thicc: undefined
        }

        bodyType == "thicc" ? construct.thicc = true : construct.thicc = false;

        if(bodyType == "thicc"){
            construct.body = RiR(scene.bodyListThicc.length);
            construct.bottom = RiR(scene.bottomListThicc.length);
            construct.top = RiR(scene.sweaterListThicc.length);
            console.log(construct);
            this.body = scene.add.image(this.totalOffset[x],this.totalOffset[y], 
                scene.bodyListThicc[construct.body]).setScale(this.scale);
            this.bottom = scene.add.image(this.thiccBotOffset[x],this.thiccBotOffset[y], 
                scene.bottomListThicc[construct.bottom]).setScale(this.scale);
            this.top = scene.add.image(this.thiccTopOffset[x],this.thiccTopOffset[y], 
                scene.sweaterListThicc[construct.top]).setScale(this.scale);
        }else{
            
            // this.test = Math.floor(Math.random() * scene.bodyListThin.length);
            // console.log(this.test);
            construct.body = RiR(scene.bodyListThin.length);
            construct.bottom = RiR(scene.bottomListThin.length);
            construct.top = RiR(scene.sweaterListThin.length);
            this.body = scene.add.image(this.totalOffset[x],this.totalOffset[y], 
                scene.bodyListThin[construct.body]).setScale(this.scale);
            this.bottom = scene.add.image(this.thinBotOffset[x],this.thinBotOffset[y], 
                scene.bottomListThin[construct.bottom]).setScale(this.scale);
            this.top = scene.add.image(this.thinTopOffset[x],this.thinTopOffset[y], 
                scene.sweaterListThin[construct.top]).setScale(this.scale);
        }
        construct.hair = RiR(scene.hairList.length);
        this.construct = construct;
        this.hair = scene.add.image(this.hairOffset[x],this.hairOffset[y],
            scene.hairList[construct.hair]).setScale(this.scale);
        // console.log(this.body.width);
        scene.add.existing(this);
    }
    
    updatePos() {
        // Update position based on position variable.
    }

    refresh() {
        console.log("dopl refresh");
        let x = this.totalOffset[0];
        this.body.x = this.bottom.x = this.top.x = this.hair.x = x;
    }

    repos(total_pups) {
        console.log("repositioning on spawn " + total_pups, "at pos", this.pos);
        let start = 300;

        let caseRes = "case: " + total_pups;
        
        switch(total_pups){
            case 1: {
                    this.totalOffset[0] = start * this.pos;}
                    break;
            case 2: {
                    console.log(caseRes);
                    start -= 225; // half of the length
                    this.totalOffset[0] = start + (this.scale * (this.pos * 750)) } 
                    break;
            case 3: {
                    console.log(caseRes);
                    start -= (total_pups*(750 * this.scale)) / 1.5;
                    this.totalOffset[0] = start + (this.scale * (this.pos * 750)) } 
                    break;
            case 4: {
                    console.log(caseRes);
                    start -= (total_pups*(750 * this.scale) / 1.6);
                    this.totalOffset[0] = start + (this.scale * (this.pos * 750)) } 
                    break;
            default: {console.log("repo::total_pups value out of bounds"); } break;
        }
        this.refresh();
    }

    dopl_copy() {
        let copy = {
            body: this.body,
            bottom: this.bottom,
            top: this.top,
            hair: this.hair
        }
        return copy;
    }

    destroy(){
        this.body.destroy();
        this.bottom.destroy();
        this.top.destroy();
        this.hair.destroy();
    }

    dopl_test() {
        this.totalOffset[0] = 100;
    }
}

class DoplCopy{
    constructor(scene, construct, index){
        this.construct = construct;
        this.scale = 0.3;
        this.posX = 450;
        this.posY = 160;

        this.scene = scene;

        this.refNum = index;
        // delete after reimport of assets
        let offsetY = 100;
        if(construct.thicc){
            this.body = scene.add.image(this.posX, this.posY, scene.bodyListThicc[construct.body]).setScale(this.scale);
            this.bottom = scene.add.image(this.posX, this.posY + offsetY, scene.bottomListThicc[construct.bottom]).setScale(this.scale);
            this.top = scene.add.image(this.posX, this.posY,scene.sweaterListThicc[construct.top]).setScale(this.scale);
        }else{
            this.body = scene.add.image(this.posX, this.posY, scene.bodyListThin[construct.body]).setScale(this.scale);
            this.bottom = scene.add.image(this.posX, this.posY + offsetY, scene.bottomListThin[construct.bottom]).setScale(this.scale);
            this.top = scene.add.image(this.posX, this.posY,scene.sweaterListThin[construct.top]).setScale(this.scale);
        }
        this.hair = scene.add.image(this.posX, this.posY, scene.hairList[construct.hair]).setScale(this.scale);
        scene.add.existing(scene);
    }

    destroy(scene){
        // let allProps = this.
        // rewrite this to iterate over all props, destroying phaser objects and undefining others
        this.body.destroy();
        this.bottom.destroy();
        this.top.destroy();
        this.hair.destroy();
        this.puppet = scene.puppet_list[this.refNum];
        // this.puppet = this.refNum;
        // console.log(this.puppet);
        this.puppet.destroy();
        scene.puppet_list.splice(this.refNum,1);
        // scene.ava_list.splice(this.refNum, 1);
        scene.refreshAvaList();
    }

}

class EditPort{
    constructor(scene, dopl, index){
        // Origin is center of rectangle (x, y, width, height, color);
        this.BG = scene.add.rectangle(300, 200, 600, 400, 0x6495ED);
        this.close = scene.add.image(550, 50, "close").setScale(0.12);
        this.close.setInteractive();
        this.close.on("pointerdown", () => {
            this.destroy(scene);
        })
        console.log(dopl);
        this.dopl_copy = new DoplCopy(scene, dopl.construct, index);
        scene.add.existing(this);
    }

    destroy(scene){
        console.log("Go on now, git");
        this.BG.destroy();
        this.close.destroy();
        this.dopl_copy.destroy(scene);
        // this = undefined;

    }
}

// Helper Functions
function clickTest() {
    console.log("I clicked a button");
    dispatchEvent(add_event);
}

function randomBodyType(){
    return (Math.random() >= 0.5) ? "thin" : "thicc";
}

function RiR(high, low=0){
    return(Math.floor(Math.random() * (high-low) + low));
}