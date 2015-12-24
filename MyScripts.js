var AutoLose =1;



var square_width = 50 ;
var current_rows = 0;
var current_cols = 0;
var current_diff = 0;

var stare = [] ;
var raport = [ 0.2 , 0.3 , 0.4 , 0.5 , 0.6 , 0.7  ];
var bmb= [];
var mat = [];
var nrBombe = 0; 

window.oncontextmenu = function (){return false; // cancel default menu  
}


 
function Generate()
{
	var _rows = document.getElementById("input_rows").value;
	var _cols = document.getElementById("input_cols").value;
	var _diff = document.getElementById("input_difi").value;
	
	if( _rows < 5) _rows = 5;
	if( _rows > 20) _rows = 20;
	
	if( _cols < 5) _cols = 5;
	if( _cols > 20) _cols = 20;
	
	if( _diff < 1) _diff = 1;
	if( _diff > 6) _diff = 6;
	
	current_rows = _rows;
	current_cols = _cols;
	current_diff = _diff;
	
	len = _rows * _cols;
	bmb.length = 0;
	
	stare.length = _rows * _cols+1;
	
	
	mat.length = _rows+2;
	
	for(var i=0;i<=_rows+1;++i)
	{
		mat[i] = [];
		mat[i].length = _cols+2;
		for(var j=0;j<=_cols+1;++j)
			mat[i][j] = 0;
	}
	
	
	_LoadSquares(_rows,_cols);
	
	_CreateBombs(_rows,_cols);
	
	for(var i=0; i < bmb.length; ++i)
		document.getElementById("demo").innerHTML += "x:"+bmb[i][0]+"y:"+bmb[i][1]+" ";
	
	
}
function _CreateBombs(_rows,_cols)
{
	nrBombe = Math.floor( (current_rows * current_cols) * raport[current_diff-1] ) ;
	
	for(var i=1;i <= nrBombe ; ++i) 
		stare[i] = 1;
	for(var i=nrBombe+1; i<stare.length; ++i) 
		stare[i]=0;
		
	for(var i=stare.length ,j,tmp ; i>1; )
	{
	
		j = Math.floor(Math.random() * i )+1;
		--i;
		tmp = stare[i];
		stare[i] = stare[j];
		stare[j] = tmp;
		
 	}
	
	
	var x,y;
	
	
	for(var i=1;i<=_rows;++i)
	{
		x = (i-1)*_rows ;
		for(var j=1;j<=_cols;++j)
		{
			++x;
			mat[i][j] = stare[x];
			if( stare[x] == 1 ){
				bmb.push( [i,j] );
			}
			
		
		}
	}
	
	
	for(var i=1;i<=_rows;++i)
	{
		for(var j=1;j<=_cols;++j)
		{
			if( (mat[i][j] != 0) ) continue;
			x = (i-1)*_rows + j;
			for(var a=-1; a<2; ++a){
				for(var b=-1;b<2;++b){
					if( a==0 && b == 0) continue;
					if( mat[i+a][j+b] == 1 ) ++mat[i][j];
					
				}
			}
			if(mat[i][j] >= 0 )
			mat[i][j] = - mat[i][j];
			
		}
	}
	for(var i=1;i<=_rows;++i)
	
		for(var j=1;j<=_cols;++j)
			document.getElementById("demo").innerHTML += "mat["+i+"]["+j+"] = "+mat[i][j]+"    ";
	
}

function mark_(_this)
{
	var id = _this.id;
	id = id.replace("SquareDiv_","");
	id = parseInt(id);
	var x,y;
	x= Math.floor( (id-1)/current_cols +1 ) ;
	y= id%current_cols;
	
	if( mat[x][y] == 50 ){
		_this.style.backgroundColor = "#2d65fb";
		/*
		_this.onmouseover="m_on(this)";
		_this.onmouseout="m_out(this)";
		_this.onclick=function clicked(this)";*/
		mat[x][y]= 2;
		stare[id] = 0;
	}
	else if(mat[x][y] <= 2 )
	{
		mat[x][y] = 50;
		_this.style.backgroundColor="#6f0038";
		stare[id] = 5;
	}
}
function _disable(ID){
	var el = document.getElementById(ID);
	el.onmouseout="";
	el.onmouseover="";
	el.onclick="";
}

function clicked(THIS)
{
	var nr = THIS.id;
	nr = nr.replace("SquareDiv_","");
	nr = parseInt(nr);
	var x=1,y=1;
	x = Math.floor((nr-1)/current_cols + 1);
	
	y = nr%current_cols;
	if(y==0) y = current_cols;
	/*document.getElementById("demo").innerHTML += "mat "+ x+" "+y+" ";*/
	
	if( stare[nr] == 1 ){
		if( AutoLose ){
			for(var i=0; i < bmb.length; ++i){
				x = bmb[i][0]; y = bmb[i][1];
				nr = (x-1)*current_cols+y;
				document.getElementById("SquareDiv_"+nr).style.backgroundColor= "#dd0a2b";
				_disable("SquareDiv_"+nr);
				
			}
			
		}
		else{		
			document.getElementById("SquareDiv_"+nr).style.backgroundColor= "#dd0a2b";
			_disable("SquareDiv_"+nr);
			mat[x][y] = 103;
		}
	}	
	else
	{
		
		
		
		if(mat[x][y] <0 )
		{
			document.getElementById("SquareDiv_"+nr).innerText = -mat[x][y];
			document.getElementById("SquareDiv_"+nr).style.backgroundColor="#8ed379";
			_disable("SquareDiv_"+nr);
			mat[x][y] = 100;
		}
		
		else if(mat[x][y]==0){
			fill_(x,y);
		}
		
	}
	
}
function fill_(x,y){
	x = parseInt(x);
	y = parseInt(y);
	
	var nr = 0;
	var stx = [x];
	
	var sty = [y];
	var index = 0;
	var i=0,j=0;
	for( ; index < stx.length ; ++index )
	{
		x = stx[index];
		y = sty[index];
		for(var a=-1;a<2;++a){
			i = x+a; 
			if( i <1 || i>current_rows) continue;
			for(var b=-1;b<2;++b){
				j=y+b;
				if(a==0 && b == 0) continue;
				if( j <1 || j > current_cols ) continue;
				if(mat[i][j] == 0){
					stx.length = stx.length+1;
					stx[stx.length-1] = i;
					sty.length = sty.length+1;
					sty[sty.length-1] = j;
					mat[i][j]= 104;
				}
			}
		}
		
	}
	for(index =0;index < stx.length ; ++index)
	{
		x = stx[index];
		y = sty[index];
		nr = (x-1)*current_rows + y; 
		document.getElementById("SquareDiv_"+nr).style.backgroundColor="#8ed379";
		_disable("SquareDiv_"+nr);
		
		for(var a=-1;a<2;++a){
			i = x+a; 
			if( i <1 || i>current_rows) continue;
			for(var b=-1;b<2;++b){
				j=y+b;
				if(a==0 && b == 0) continue;
				if( j <1 || j > current_cols ) continue;
				if(mat[i][j] < 0){
					nr = (i-1)*current_rows + j; 
					document.getElementById("SquareDiv_"+nr).innerText = -mat[i][j];
					document.getElementById("SquareDiv_"+nr).style.backgroundColor="#8ed379";
					_disable("SquareDiv_"+nr);
					mat[i][j] = 102;
				}
			}
		}
		
		
	}
	
	
	
	
}


function _LoadSquares(rows,cols)
{
	
	var _width = square_width+"px" ;
	var code = "";
	var con = document.getElementById("ContentDiv");
	con.innerHTML = "";
	for(var i = rows ; i > 0; --i){
		
		for(var j = i*cols; j > (i-1)*cols ; --j){
			code = "<div class=' w3-border w3-col' style='padding:5px ;width:"+_width+";height:"+_width+"'><div class='w3-center' id='SquareDiv_"+j+"'onmouseover='m_on(this)' oncontextmenu='mark_(this)' onmouseout='m_out(this)' onclick='clicked(this)'  style='height:100%;background-color:"+'#2d65fb'+" ' ></div></div>" ;
			con.innerHTML += code;
			
		}
		con.innerHTML += "<div class='w3-row'><!-- Useless , just to break columns -->";
		
	}

}

function m_on(_this){
	var id = _this.id;
	id = id.replace("SquareDiv_","");
	id = parseInt(id);
	if(stare[id] == 5 ) return;
	_this.style.backgroundColor = "#0f2e83";
}

function m_out(_this){
	var id = _this.id;
	id = id.replace("SquareDiv_","");
	id = parseInt(id);
	if(stare[id] == 5 ) return;
	_this.style.backgroundColor = "#2d65fb";
}
