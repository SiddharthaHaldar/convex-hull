
var points=[],
	stack=[],
	length=5,
	width=window.innerWidth,
	height=window.innerHeight,
	min,
	temp=[],
	temp2=[];

function setup()
{
createCanvas(window.innerWidth,window.innerHeight);
background('#021C1E');
button=createButton('find')
button.position(20,50)
button.mousePressed(regen)
generatepts();
drawpoints();
console.log(points)
console.log(min)
pzero();
console.log(min)
console.log(points)
pointsort()
convexhull();
}

function generatepts()
{
	for(i=0;i<length;i++)
	{
    var temp={
    		index:i+1,
    		x:Math.random()*width,
			y: Math.random()*height
		}
	points.push(temp)
	}
}

function drawpoints()
{
	for(i=0;i<points.length;i++)
	{
    noStroke();
	fill('#de7a22')
	ellipse(points[i].x,points[i].y,10,10)
	fill('#486b00')
	stroke('#a2c523')
	strokeWeight(3)
	textSize(20)
	text(points[i].index,points[i].x,points[i].y)
	}	
}

function pzero()
{
	min=points[0]
	var minindex=0
	for(i=1;i<length;i++)
	{
		if(points[i].y<min.y)
			{min=points[i]
			 minindex=i}
		else if(points[i].y===min.y)
		{
			if(min.x>points[i].x)
				{min=points[i]
				 minindex=i}
			else
				min=min
		}
	}
   points.splice(minindex,1);
}

function polarang(p1,p2)
{
	var dx=p2.x-p1.x;
	var dy=p2.y-p1.y;
	if(dx===0)
		return 90;
	else
	{
		m=dy/dx;
		var ang=Math.atan(m)*180/Math.PI;
		if(ang>=0)
			return ang;
		else
			return (180+ang);
	}
}

function orientation(p1,p2,p3)
{
	var crossprod=((p2.y-p1.y)*(p3.x-p2.x))-((p3.y-p2.y)*(p2.x-p1.x))
	//console.log(crossprod)
	if (crossprod===0)
		return 0
	else if(crossprod<0)
		return 1
	else
		return -1
}

function convexhull()
{
	for(i=0;i<=2;i++)
		{stack.push(temp2[i])}
	
	console.log(stack)
	var top=2;
	for(i=3;i<=temp2.length-1;i++)
	{
		 while (orientation(stack[top-1],stack[top],temp2[i]) != 1)
		 {
		 	//console.log(z)
         stack.pop();
     	top-=1;}
      stack.push(temp2[i]);
      top+=1;
	}
for(i=0;i<=stack.length-2;i++)
{
	stroke('#6fb98f')
	strokeWeight(2)
	line(stack[i].x,stack[i].y,stack[i+1].x,stack[i+1].y)
}
line(stack[stack.length-1].x,stack[stack.length-1].y,stack[0].x,stack[0].y)
console.log(stack)
}

function pointsort()
{
	
	for(i=0;i<points.length;i++)
	{temp.push(points[i])}
	for(i=temp.length-1;i>=0;i--)
	{
		for(j=0;j<=i-1;j++)
		{
		if(polarang(min,temp[j])>polarang(min,temp[j+1]))
		{
			var t=temp[j]
			temp[j]=temp[j+1]
			temp[j+1]=t
		}
		}
		if(temp2.length===0)
			temp2.unshift(temp[i])
		else
		{
			if(polarang(min,temp2[0])===polarang(min,temp[i]))
			{
				var d=dist(min.x,min.y, temp2[0].x, temp2[0].y);
				var d2=dist(min.x,min.y, temp[i].x, temp[i].y);
				if(d2>d)
					{temp2[0]=temp[i]}
			}
			else
			{
				temp2.unshift(temp[i])
			}
		
	}

	}
	temp2.unshift(min)
	console.log(temp)
	console.log(temp2)
}

function regen()
{
	stack=[]
	temp=[]
	temp2=[]
	points.push(min)
	background('#021C1E');
	drawpoints()
	pzero();
	pointsort()
	convexhull();
}

function mousePressed()
{
	if((mouseX>=15 && mouseX<= 62.5)&&(mouseY >=45 && mouseY<=76))
	{}
	else
	{
	fill(255)
	ellipse(mouseX,mouseY,10,10)
	length+=1
	var point={
		index:length,
		x:mouseX,
		y:mouseY
	}
	points.push(point)
	}
}

function draw()
{

}

