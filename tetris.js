
/**
 * 构造函数
 */
function Tetris() {

	this.tipIndex = 0;
	this.tipBlock = null;;
	this.runIndex = 0;
	this.runBlock = null;
	this.emptyColor = "#FFFFFF";
	this.mapHeight = 18;
	this.mapWidth = 12;
	this.blockWidth = 30;
	this.widthOffset = 5; //开始的时候让方块尽量居中
	this.gameOver = false;
	this.intervalId = 0;
	this.tipNext="tipNext";//提示方块对应的表格ID
	this.mapTable="map";//运行区域广场对应的表格ID
	this.grade=1;//默认是第一级
	this.gradeLevel=5;//消灭3行加一级
	this.score=0;
	this.scoreLevel=[0,100,300,500,1000];
	this.totalLine=0;//保存总共消灭的行数
	this.deleteLine=0;//保存一次消灭的行数
}

//为原形添加方法
//
Tetris.prototype.blocks=[

	{color:"#FFA07A",nextBlock:1,position:[{x:3,y:0,l:true,d:true},{x:3,y:1,d:true,t:true},{x:3,y:2,d:true,t:true},{x:3,y:3,r:true,d:true,t:true}]},
	{color:"#CD8162",nextBlock:-1,position:[{x:0,y:0,l:true,r:true,t:true},{x:1,y:0,l:true,r:true,t:true},{x:2,y:0,l:true,r:true,t:true},{x:3,y:0,l:true,r:true,d:true}]},
	{color:"#BC8F8F",nextBlock:0,position:[{x:2,y:0,l:true},{x:3,y:0,l:true},{x:3,y:1,d:true},{x:2,y:1,r:true}]},
	{color:"#BF3EFF",nextBlock:1,position:[{x:2,y:0,l:true,d:true},{x:2,y:1,r:true},{x:3,y:1,l:true,d:true,t:true},{x:3,y:2,r:true,d:true,t:true}]},
	{color:"#CD5B45",nextBlock:-1,position:[{x:1,y:1,l:true,r:true,t:true},{x:2,y:0,l:true},{x:2,y:1,r:true,d:true},{x:3,y:0,l:true,r:true,d:true,t:true}]},
	{color:"#B8860B",nextBlock:1,position:[{x:2,y:1,l:true},{x:2,y:2,r:true,d:true,t:true},{x:3,y:0,l:true,d:true,t:true},{x:3,y:1,r:true,d:true}]},
	{color:"#20B2AA",nextBlock:-1,position:[{x:1,y:0,l:true,r:true,t:true},{x:2,y:0,l:true,d:true,t:true},{x:2,y:1,r:true},{x:3,y:1,l:true,r:true,d:true}]},

	{color:"#008B8B",nextBlock:1,position:[{x:2,y:0,l:true},{x:2,y:1,d:true,t:true},{x:2,y:2,r:true,d:true,t:true},{x:3,y:0,l:true,r:true,d:true}]},
	{color:"#3CB371",nextBlock:1,position:[{x:1,y:0,l:true,d:true,t:true},{x:1,y:1,r:true,t:true},{x:2,y:1,l:true,r:true},{x:3,y:1,l:true,r:true,d:true,t:true}]},
	{color:"#7CCD7C",nextBlock:1,position:[{x:2,y:2,l:true,r:true,t:true},{x:3,y:0,l:true,d:true,t:true},{x:3,y:1,d:true},{x:3,y:2,r:true,d:true,t:true}]},
	{color:"#87CEEB",nextBlock:-3,position:[{x:1,y:0,l:true,r:true,t:true},{x:2,y:0,l:true,r:true,t:true},{x:3,y:0,l:true,d:true},{x:3,y:1,r:true,d:true}]},

	{color:"#8B4726",nextBlock:1,position:[{x:1,y:0,l:true,t:true},{x:1,y:1,r:true,d:true,t:true},{x:2,y:0,l:true,r:true},{x:3,y:0,l:true,r:true,d:true}]},
	{color:"#CD3333",nextBlock:1,position:[{x:2,y:0,l:true,d:true},{x:2,y:1,d:true,t:true},{x:2,y:2,r:true,t:true},{x:3,y:2,l:true,r:true,d:true,t:true}]},
	{color:"#43CD80",nextBlock:1,position:[{x:1,y:1,l:true,r:true,t:true},{x:2,y:1,l:true,r:true},{x:3,y:0,l:true,d:true,t:true},{x:3,y:1,r:true,d:true,t:true}]},
	{color:"#EE8262",nextBlock:-3,position:[{x:2,y:0,l:true,r:true,t:true},{x:3,y:0,l:true,d:true},{x:3,y:1,d:true},{x:3,y:2,r:true,d:true,t:true}]},

	{color:"#EE6363",nextBlock:1,position:[{x:2,y:1,l:true,r:true},{x:3,y:0,l:true,d:true,t:true},{x:3,y:1,d:true},{x:3,y:2,r:true,d:true,t:true}]},
	{color:"#BDB76B",nextBlock:1,position:[{x:1,y:0,l:true,r:true,t:true},{x:2,y:1,r:true,d:true},{x:2,y:0,l:true,t:true},{x:3,y:0,l:true,r:true,d:true}]},
	{color:"#DB7093",nextBlock:1,position:[{x:3,y:1,l:true,r:true,d:true,t:true},{x:2,y:0,l:true,d:true},{x:2,y:1},{x:2,y:2,r:true,d:true,t:true}]},
	{color:"#008B8B",nextBlock:-3,position:[{x:1,y:1,l:true,r:true,t:true},{x:2,y:0,l:true,d:true},{x:2,y:1,r:true},{x:3,y:1,l:true,r:true,d:true}]}

];



/**
 * 创建方块运行时的地图，用表格的方式来展示
 * 
 */
Tetris.prototype.createMap=function(){
	var table=$("<table></table>").appendTo('#mapDiv');
	table.addClass('table table-bordered');
	table.attr("id",this.mapTable);
	table.width(this.mapWidth*this.blockWidth).height(this.mapHeight*this.blockWidth);
	for (var i = 0; i < this.mapHeight; i++) {//用于提前展示的行 
		this.createTr().appendTo(table);
	};

}

/**
 * 创建一行
 */
Tetris.prototype.createTr = function() {

	var tr = $("<tr></tr>");
	for (var j = 0; j < this.mapWidth; j++) {
		var td = $("<td></td>");
		td.appendTo(tr);
	};

	return tr;
}
/**
 * 点击开始按钮启动游戏
 * 在这里面判断游戏是否结束
 * @return {[boolean]} gameOver
 */
Tetris.prototype.start=function  () {
	if (this.gameOver) {
		alert("Game Over");

		return this.gameOver;
	};

	this.getRunBlock();
	this.drawBlock(this.mapTable,this.runBlock.color,this.runBlock.position);

	this.getTipBlock();
	this.drawBlock(this.tipNext,this.tipBlock.color,this.tipBlock.position);


	var that=this;
	var moveDown=function(){that.moveDown();};//这个地方好麻烦 setInterval里面的this指向window
	this.intervalId = setInterval(moveDown,1000-this.grade*50);//这里设置速度

	$("#start").attr("disabled","disabled");//把开始按钮置灰

}

/**
 * 点击暂停按钮暂停游戏
 */
Tetris.prototype.stop=function  () {
	clearInterval(this.intervalId);
	$("#stop").attr("disabled","disabled");//把暂停按钮置灰
	$("#goon").removeAttr("disabled");
}
/**
 * 点击继续按钮继续游戏
 */

Tetris.prototype.goon=function  () {
	var that=this;
	var moveDown=function(){that.moveDown();};//这个地方好麻烦
	this.intervalId = setInterval(moveDown,1000);
	$("#goon").attr("disabled","disabled");//把按钮置灰
	$("#stop").removeAttr("disabled");
}

/**
 * 点击重玩按钮重新开始游戏
 */

Tetris.prototype.restart=function  () {

	//清空所有
	clearInterval(tetris.intervalId);//要清除之前的，要不然内存里面还会继续执行
	tetris=new Tetris();
	$("#"+this.tipNext+" td").css("backgroundColor",this.emptyColor);
	$("#"+this.mapTable+" td").css("backgroundColor",this.emptyColor);
	$("#score").html(0);
	$("#grade").html(1);
	$("#goon").attr("disabled","disabled");//把按钮置灰
	$("#stop").removeAttr("disabled");
	tetris.start();
}

/**
 * 获取随机一个方块来展示
 * 在get前先清空之前的方块
 */
Tetris.prototype.getTipBlock=function  (flag) {

	if(this.tipBlock){
		this.clearBlock(this.tipNext,this.tipBlock.position);
	}
	
	this.tipIndex=Math.floor(Math.random()*this.blocks.length);
	this.tipBlock=this.blocks[this.tipIndex];

}

/**
 * 得到一个运行区域的块 需要进行坐标转换
 * 为了展示提示功能，需要先生成运行区域的方块
 * 以后再获取的时候就copy提示块
 * @return {[object]} [description]
 */
Tetris.prototype.getRunBlock=function  () {
	var that=this;//jquery each里面会切换上下文
	if (this.tipBlock) {
		this.runBlock=$.extend(true,{},this.tipBlock);
		this.runIndex=this.tipIndex;
	}else{
		this.runIndex=Math.floor(Math.random()*this.blocks.length);
		this.runBlock=$.extend(true,{},this.blocks[this.runIndex]);
	}
	$.each(this.runBlock.position,function (index,ele) {
			ele.y+=that.widthOffset;//这里面的this是第一个参数，所以在开始用that保存起来
			ele.x-=4;//block里面是从最下面一行开始的，在左边的运行区域，要从第一行的上面开始
	})
}
/**}
 * 方块向下移动一格
 */
Tetris.prototype.moveDown=function  () {

	if (!this.canMoveDown()) {
		clearInterval(this.intervalId); //这个一定要清除，要不然会出现奇怪的Bug
		if (this.start()) {
			return;
		} //如果游戏结果直接返回
	}
	this.clearBlock(this.mapTable,this.runBlock.position);

	for (var i =0;i<4;i++) {
		this.runBlock.position[i].x+=1;
	};

	this.drawBlock(this.mapTable,this.runBlock.color,this.runBlock.position);
}


/**
 * 判断方块能否向右移动一格
 */
Tetris.prototype.canMoveDown=function  () {

	var flag = true;
	for (var i = 0; i < 4; i++) {
		if (this.runBlock.position[i].d) { //向下移动时 用来做判断的标志
			//检查下面一个方块是否被占用
			flag = this.isEmpty(this.runBlock.position[i].x + 1, this.runBlock.position[i].y);
			if (flag == false) {
				this.checkLine();
				break;
			};
		};

	};
	if (flag == false && 
		  (this.runBlock.position[0].x < 0 
		|| this.runBlock.position[1].x < 0 
		|| this.runBlock.position[2].x < 0 
		|| this.runBlock.position[3].x < 0)) {//不能向下移动时，如果还有方块露在上面表示游戏结束。
	 	this.gameOver = true;
	};
	return flag;

}
/**
 * 方块向左移动一格
 */
Tetris.prototype.moveLeft=function  () {

	if (!this.canMoveLeft()) {
		return;
	}
	this.clearBlock(this.mapTable,this.runBlock.position);
	for (var i =0;i<4;i++) {
		this.runBlock.position[i].y-=1;
	};
	this.drawBlock(this.mapTable,this.runBlock.color,this.runBlock.position);
}
/**
 * 判断方块能否向左移动一格
 */
Tetris.prototype.canMoveLeft=function  () {

	for (var i = 0; i < 4; i++) {

		if (this.runBlock.position[i].l) { //向左移动时 用来做判断的标志
			//检查左面一个方块是否被占用
			flag = this.isEmpty(this.runBlock.position[i].x, this.runBlock.position[i].y-1);
			if (flag == false) {
				return false;
			};
		};
	}

	return true;
}

/**
 * 方块向右移动一格
 */
Tetris.prototype.moveRight=function  () {

	if (!this.canMoveRight()) {
		return;
	}
	this.clearBlock(this.mapTable,this.runBlock.position);
	for (var i =0;i<4;i++) {
		this.runBlock.position[i].y+=1;
	};
	this.drawBlock(this.mapTable,this.runBlock.color,this.runBlock.position);
}
/**
 * 方块向右移动一格
 */
Tetris.prototype.canMoveRight=function  () {

	for (var i = 0; i < 4; i++) {

		if (this.runBlock.position[i].r) { //向下移动时 用来做判断的标志
			//检查下面一个方块是否被占用
			flag = this.isEmpty(this.runBlock.position[i].x, this.runBlock.position[i].y+1);
			if (flag == false) {
				return false;
			};
		};
	}

	return true;
}
/**
 * 向右旋转方块一次，在旋转过程中要判断能不能旋转
 * 由nextBlock来确定下一个方块的index
 */
Tetris.prototype.rotate=function  () {


	var tempRunBlock=$.extend(true,{},this.runBlock);

	var tempRunIndex = this.runBlock.nextBlock+this.runIndex;

	var tempRunPos=tempRunBlock.position;


	for (var i = 0; i < 4; i++) {
		tempRunPos[i].x += this.blocks[tempRunIndex].position[i].x - this.blocks[this.runIndex].position[i].x;
		tempRunPos[i].y += this.blocks[tempRunIndex].position[i].y - this.blocks[this.runIndex].position[i].y;
		tempRunPos[i].t = this.blocks[tempRunIndex].position[i].t;
		if (tempRunBlock.position[i].t) { //用来判断这个点是不是旋转标识

			var flag = this.isEmpty(tempRunPos[i].x, tempRunPos[i].y);
			if (flag == false) {
				return;
			};
		};

		tempRunPos[i].l = this.blocks[tempRunIndex].position[i].l;
		tempRunPos[i].r = this.blocks[tempRunIndex].position[i].r;
		tempRunPos[i].d = this.blocks[tempRunIndex].position[i].d;

		tempRunBlock.nextBlock = this.blocks[tempRunIndex].nextBlock;
		tempRunBlock.height = this.blocks[tempRunIndex].height;

	};

	this.clearBlock(this.mapTable,this.runBlock.position);

	this.drawBlock(this.mapTable,this.runBlock.color,tempRunBlock.position);

	this.runBlock=tempRunBlock;
	this.runIndex=tempRunIndex;
}

/**
 * 当方块不能再下落时，检查能不能消行
 * @return {[type]} [description]
 */
Tetris.prototype.checkLine=function(){

	this.deleteLine=0;

	for (var i=0;i<this.mapHeight;i++) {
		var canDeleteLine=true;
		for (var j = 0; j < this.mapWidth; j++) {
			if (this.isEmpty(i,j)) {
				canDeleteLine=false;
				break;
			};
		};

		if (canDeleteLine) {
			$("#"+this.mapTable+" tr:eq("+i+")").remove();
			this.createTr().insertBefore($("#"+this.mapTable+" tr:eq(0)"));
			this.totalLine++;
			this.deleteLine++;

			if (this.totalLine%this.gradeLevel==0) {//刷新等级
				this.grade++;
				$("#grade").html(this.grade);
			}
		};
	};


	this.refreshScore();

}
/**
 * 刷新分数
 */
Tetris.prototype.refreshScore=function(){

	if (this.deleteLine > 0) {
		this.score += this.scoreLevel[this.deleteLine];
		$("#score").html(this.score);
	};


}
/**
 * 为对应的方块设置对应的颜色
 * @param {[string]} tableID   [description]
 * @param {[string]} color    [description]
 * @param {[object]} position [description]
 */
Tetris.prototype.drawBlock = function(tableID, color, position) {
	for (var i = 0; i < position.length; i++) {
		if (position[i].x >= 0) { //jquery.eq()如果参数为负数，会从最后一个倒着取值
			var td=$("#" + tableID + " tr").eq(position[i].x).children("td").eq(position[i].y);
			td.css("backgroundColor",color);
		};

	};
}

/**
 * 换下一个方块时，把之前的方块清除
 * @param  {[string]} tableID   [对应画布还是提示区域]
 * @param  {[object]} position [description]
 */
Tetris.prototype.clearBlock=function(tableID, position){
	if(position){
		this.drawBlock(tableID,this.emptyColor,position);
	}
}

/**
 * 根据坐标位置判断画布对应的点是否是空白
 * @param  {[object]}  pos [点坐标]
 * @return {Boolean}     [description]
 */
Tetris.prototype.isEmpty = function(x, y) {
	if (x < 0) { //表示地图上方
		return true;
	};

	if (y < 0 || y >= this.mapWidth || x >= this.mapHeight) { //表示超过地图左右和下方
		return false;
	};
	var bgColor = $("#" + this.mapTable + " tr").eq(x).children("td").get(y).style.backgroundColor;
	return bgColor == 'rgb(255, 255, 255)' || bgColor == "";

}

$().ready(function() {
	tetris=new Tetris();
	tetris.createMap();
});
