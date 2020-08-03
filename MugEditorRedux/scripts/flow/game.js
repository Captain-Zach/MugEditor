const gameSettings = {
    // domCreateContainer: true
}
let ws = undefined;

window.onload = function(){
    const config = {
        width: 600,
        height: 400,
        backgroundColor:0x000000,
        scene: [Main],
        parent: "MugEditor",
        dom: {
            createContainer: true
        }
        // domCreateContainer: 
    }
    let game = new Phaser.Game(config);
}