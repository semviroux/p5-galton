class Pin {
    constructor(x, y, size = 10) {
        this.size = size;

        this.body = Bodies.circle(x, y, size / 2, {
            isStatic: true,
            friction: 0,
            restitution: 1,
        });

        Composite.add(engine.world, this.body);
    }

    show() {
        noStroke();
        fill(220);

        let pos = this.body.position;
        circle(pos.x, pos.y, this.size);
    }

    updateBackground() {
        return;
    }
}
