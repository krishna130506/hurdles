class End{
    constructor(){
        this.final = createElement('h2');
    }
    display(){
    this.final.html("GAME ENDED");
    this.final.position(displayWidth / 2 -750, displayHeight / 2-300);
    this.final.style('font-size', '200px');
    this.final.style( 'color', 'skyblue');
    }
}