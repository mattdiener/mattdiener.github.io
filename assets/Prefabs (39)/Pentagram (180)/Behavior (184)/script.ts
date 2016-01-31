class PentagramItemBehavior extends Sup.Behavior {
  princess: Sup.Actor;
  des: boolean = true;
  opacity = 1;
  fadeSpeed = 0.1;

  awake() {
    this.princess = Sup.getActor("Princess");
  }

  update() {
    
    if (!this.princess) {
      return;
    }
    
    if (!this.des){
      this.opacity -= this.fadeSpeed;
      if (this.opacity < 0) this.opacity = 0;
      this.actor.spriteRenderer.setOpacity(this.opacity);
    }
    
    if (!Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.princess.arcadeBody2D) || this.des == false) {
      return;
    }
    
    Game.canClone = true;
        Sup.Audio.playSound("Sound/CloneSound");
    
    this.actor.setPosition({
      x: this.actor.getPosition().x,
      y: this.actor.getPosition().y,
      z: -1
    });
    
    if (this.des) {
      Game.destroyActor(this.actor, 1000);
      this.des = false;
    }
  }
}

Sup.registerBehavior(PentagramItemBehavior);
