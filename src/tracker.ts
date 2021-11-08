class AxisCylinder extends Entity {
	constructor(parent: AxisArrow, color: Color3){
		super()
		engine.addEntity(this)
		this.setParent(parent)
		this.addComponent(new CylinderShape())
		this.getComponent(CylinderShape).withCollisions = false
		this.addComponent(new Transform({
			position: new Vector3(0,0.5,0),
			rotation: new Quaternion(0,0,0,0),
			scale: new Vector3(0.02,0.5,0.02)
		}))
		const material = new Material()
		material.albedoColor = color
		this.addComponent(material)
	}
}

class AxisCone extends Entity {
	constructor(parent: AxisArrow, color: Color3){
		super()
		engine.addEntity(this)
		this.setParent(parent)
		this.addComponent(new ConeShape())
		this.getComponent(ConeShape).withCollisions = false
		this.addComponent(new Transform({
			position: new Vector3(0,1,0),
			rotation: new Quaternion(0,0,0,0),
			scale: new Vector3(0.05,0.05,0.05)
		}))
		const material = new Material()
		material.albedoColor = color
		this.addComponent(material)
	}
}

class AxisArrow extends Entity {
	cylinder: AxisCylinder
	cone: AxisCone
	axis: string
	text: TextShape
	
	constructor(parent: Origin, axis: string, color: Color3){
		super()
		engine.addEntity(this)
		this.setParent(parent)
		this.axis = axis
		this.addComponent(new Transform({
			scale: new Vector3(1,1,1)
		}))
		if(this.axis === "x"){
			this.getComponent(Transform).rotation.setEuler(0,0,90)
			this.text = new TextShape("X")
			this.text.color = color
			this.text.fontSize = 4
			this.text.paddingBottom = 3
		}else if (this.axis === "y"){
			this.getComponent(Transform).rotation.setEuler(0,0,0)
			this.text = new TextShape("Y")
			this.text.color = color
			this.text.fontSize = 4
			this.text.paddingBottom = 3
		}else{
			this.getComponent(Transform).rotation.setEuler(90,0,0)
			this.text = new TextShape("Z")
			this.text.color = color
			this.text.fontSize = 4
			this.text.paddingBottom = 3
		}
		this.addComponent(this.text)
		this.cylinder = new AxisCylinder(this, color)
		this.cone = new AxisCone(this, color)
	}
}

export class Origin extends Entity {
	x: AxisArrow
	y: AxisArrow
	z: AxisArrow
	positionEntity: Entity
	rotationEntity: Entity
	rotationEulerEntity: Entity
	
	constructor(){
		super()
		engine.addEntity(this)
		this.addComponent(new Transform({
			position: new Vector3(0,0,0),
			scale: new Vector3(1,1,1)
		}))
		this.getComponent(Transform).position = new Vector3(
			this.getComponent(Transform).position.x+1.75,
			this.getComponent(Transform).position.y,
			this.getComponent(Transform).position.z+1
		)
		this.x = new AxisArrow(this,"x", Color3.Red())
		this.y = new AxisArrow(this,"y", Color3.Blue())
		this.z = new AxisArrow(this,"z", Color3.Green())
		
		this.positionEntity = new Entity()
		this.positionEntity.addComponent(new Transform())
		engine.addEntity(this.positionEntity)
		this.positionEntity.setParent(this)
		const textPosition = new TextShape("position")
		textPosition.fontSize = 4
		textPosition.paddingRight = 0.5
		textPosition.paddingBottom = 0.5
		this.positionEntity.addComponent(textPosition)
		this.positionEntity.getComponent(Transform).position = Vector3.Zero()
		this.positionEntity.getComponent(Transform).position = new Vector3(
			this.positionEntity.getComponent(Transform).position.x+0.5,
			this.positionEntity.getComponent(Transform).position.y+.2,
			this.positionEntity.getComponent(Transform).position.z+2
		)
		this.positionEntity.getComponent(Transform).lookAt(Camera.instance.position)
		this.positionEntity.getComponent(Transform).rotation.eulerAngles = new Vector3(
			this.positionEntity.getComponent(Transform).rotation.eulerAngles.x-25,
			this.positionEntity.getComponent(Transform).rotation.eulerAngles.y+180,
			this.positionEntity.getComponent(Transform).rotation.eulerAngles.z,
		)
		
		this.rotationEntity = new Entity()
		this.rotationEntity.addComponent(new Transform())
		engine.addEntity(this.rotationEntity)
		this.rotationEntity.setParent(this)
		const textRotation = new TextShape("rotation")
		textRotation.fontSize = 4
		textPosition.paddingLeft = 0.5
		textRotation.paddingBottom = 0.5
		this.rotationEntity.addComponent(textRotation)
		this.rotationEntity.getComponent(Transform).position = Vector3.Zero()
		this.rotationEntity.getComponent(Transform).position = new Vector3(
			this.rotationEntity.getComponent(Transform).position.x+2,
			this.rotationEntity.getComponent(Transform).position.y+.2,
			this.rotationEntity.getComponent(Transform).position.z+1
		)
		this.rotationEntity.getComponent(Transform).lookAt(Camera.instance.position)
		this.rotationEntity.getComponent(Transform).rotation.eulerAngles = new Vector3(
			this.rotationEntity.getComponent(Transform).rotation.eulerAngles.x-25,
			this.rotationEntity.getComponent(Transform).rotation.eulerAngles.y+180,
			this.rotationEntity.getComponent(Transform).rotation.eulerAngles.z,
		)
		
		this.rotationEulerEntity = new Entity()
		this.rotationEulerEntity.addComponent(new Transform())
		engine.addEntity(this.rotationEulerEntity)
		this.rotationEulerEntity.setParent(this)
		const textRotationEuler = new TextShape("rotationEuler")
		textRotationEuler.fontSize = 4
		textPosition.paddingLeft = 0.5
		textRotationEuler.paddingBottom = 0.25
		this.rotationEulerEntity.addComponent(textRotationEuler)
		this.rotationEulerEntity.getComponent(Transform).position = Vector3.Zero()
		this.rotationEulerEntity.getComponent(Transform).position = new Vector3(
			this.rotationEulerEntity.getComponent(Transform).position.x+2,
			this.rotationEulerEntity.getComponent(Transform).position.y+2,
			this.rotationEulerEntity.getComponent(Transform).position.z+2
		)
		this.rotationEulerEntity.getComponent(Transform).lookAt(Camera.instance.position)
		this.rotationEulerEntity.getComponent(Transform).rotation.eulerAngles = new Vector3(
			this.rotationEulerEntity.getComponent(Transform).rotation.eulerAngles.x-45,
			this.rotationEulerEntity.getComponent(Transform).rotation.eulerAngles.y+180,
			this.rotationEulerEntity.getComponent(Transform).rotation.eulerAngles.z,
		)
	}
}
	
export class OriginSystem implements ISystem {
  entity: Origin
  oldPos: Vector3
  newPos: Vector3 = new Vector3(0,0,0)
  
  constructor(entity: Origin) {
    this.entity = entity
	this.oldPos = Camera.instance.position
  }
  
  update() {
	this.oldPos = new Vector3(Math.floor(this.newPos.x),Math.floor(this.newPos.y),Math.floor(this.newPos.z))
	this.newPos = Camera.instance.position
	const newRot = Camera.instance.rotation
	const newRotEul = Camera.instance.rotation.eulerAngles
	
	this.entity.getComponent(Transform).position = new Vector3(this.newPos.x+1.75,this.newPos.y,this.newPos.z+1)
		// log("this.newPos",this.newPos)
		const newTextPosition = "Position\nX: "+this.newPos.x.toFixed(2)+"\nY: "+this.newPos.y.toFixed(2)+"\nZ: "+this.newPos.z.toFixed(2);
		this.entity.positionEntity.getComponent(TextShape).value = newTextPosition;
		const newTextRotation = "Rotation\nX: "+newRot.x.toFixed(2)+"\nY: "+newRot.y.toFixed(2)+"\nZ: "+newRot.z.toFixed(2);
		this.entity.rotationEntity.getComponent(TextShape).value = newTextRotation;
		const newTextRotationEuler = "RotationEuler\nX: "+newRotEul.x.toFixed(2)+"\nY: "+newRotEul.y.toFixed(2)+"\nZ: "+newRotEul.z.toFixed(2);
		this.entity.rotationEulerEntity.getComponent(TextShape).value = newTextRotationEuler;
		
		this.oldPos = this.newPos
  }
}