class Box {
    constructor(angle = 0, x = 0, y = 0, size = BOX_SIZE) {
        this.size = size;

        this.body = Bodies.rectangle(width / 2 + x, 5 + y, size, size, {
            friction: 1,
            restitution: 0.3,
        });
        this.body.angle = random([0, 0.5, 1, 1.5]) * PI;
        Body.setAngularVelocity(this.body, 0);
        this.body.angle += angle;

        Composite.add(engine.world, this.body);

        this.deactivated = false;
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        if (pos.y > height + this.size * 2) {
            this.removeBox();
            return;
        }

        rectMode(CENTER);
        fill(220);
        noStroke();

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        // circle(0, 0, this.size);
        square(0, 0, this.size);
        pop();
    }

    updateBackground() {
        let pos = this.body.position;
        let angle = this.body.angle;

        noStroke();

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(200, 20, 20, 255);
        circle(this.size / 2, this.size / 2, 6);
        fill(20, 200, 20, 255);
        circle(-this.size / 2, -this.size / 2, 6);
        fill(20, 20, 200, 255);
        circle(this.size / 2, -this.size / 2, 6);
        pop();
    }

    removeBox() {
        this.deactivated = true;
        Composite.remove(engine.world, this.body);
    }
}
