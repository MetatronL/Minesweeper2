var AutoLose =1;



var square_width = 50 ;
var _rows = 0;
var _cols = 0;
var current_diff = 0;
var wd;

var stare = [] ;
var raport = [ 0.1 , 0.2 , 0.3 , 0.4 , 0.5 , 0.6  ];
var bmb= [];
var mat = [];
var use = [];
var cx = [];
var cy = [];
var nrBombe = 0; 

window.oncontextmenu = function (){return false; // cancel default menu  
}

function createMatrix(mm)
{
	mm.length = 0;
	mm.length = _rows +2;
	for(var i=0;i < _rows+2;++i){
		mm[i] = [];
		mm[i].length = _cols+2;
		for(var j=0;j<_cols+2;++j)
			mm[i][j] = 0;
	}
	
}
 
function Generate()
{
	var __rows = document.getElementById("input_rows").value;
	var __cols = document.getElementById("input_cols").value;
	var _diff  = document.getElementById("input_difi").value;
	wd =  document.getElementById("input_pixels").value;
	
	square_width = wd;
	
	if( __rows < 5) __rows = 5;
	if( __rows > 20) __rows = 20;
	
	if( __cols < 5) __cols = 5;
	if( __cols > 20) __cols = 20;
	
	if( _diff < 1) _diff = 1;
	if( _diff > 6) _diff = 6;
	
	_rows = __rows;
	_cols = __cols;
	current_diff = _diff;
	
	len = _rows * _cols;
	bmb.length = 0;
	
	stare.length = _rows * _cols +3;
	cx.length = len+1;
	cy.length = len+1;
	
	
	createMatrix(mat) ;
	createMatrix(use) ;
	
	_LoadSquares(_rows,_cols);
	
	
	
	nrBombe = Math.floor( (_rows * _cols) * raport[current_diff-1] ) ;
	
	for(var i=1;i <= nrBombe ; ++i) 
		stare[i] = 1;
	for(var i=nrBombe+1; i<stare.length; ++i) 
		stare[i]=0;
		
	for(var k=1; k < 10; ++k)
	for(var i=stare.length-2 ,j,tmp ; i>1; )
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
		x = (i-1)*_cols ;
		for(var j=1;j<=_cols;++j)
		{
			++x;
			mat[i][j] = -stare[x];
			if( stare[x] == 1 ){
				bmb.push( [i,j] );
			}
		}
	}
	
	
	for(var i=1;i<=_rows;++i)
	{
		for(var j=1;j<=_cols;++j)
		{
			x = (i-1)*_cols + j;
			cx[x]=i;
			cy[x]=j;
			
			if( (mat[i][j] != 0) ) continue;
			
			for(var a=-1; a<2; ++a)
			{
				for(var b=-1;b<2;++b)
				{
					if( a==0 && b == 0) continue;
					if( mat[i+a][j+b] == -1 ) 
						++mat[i][j];
					
				}
			}
			
		}
	}
	/*
	for(var i=1;i<=_rows;++i)
		for(var j=1;j<=_cols;++j)
			document.getElementById("demo").innerHTML += "mat["+i+"]["+j+"] = "+mat[i][j]+"    ";
	
	for(var i=0; i < bmb.length; ++i)
		document.getElementById("demo").innerHTML += "x:"+bmb[i][0]+"y:"+bmb[i][1]+" ";
	*/
	
}

function mark_(_this)
{
	var nr = parseInt( _this.id.substring(10,_this.id.length) );
	var x,y;
	x= Math.floor( (nr-1)/_cols +1 ) ;
	y= nr%_cols; 
	if(y==0) y = _cols;
	
	if( use[x][y] > 0 ) return;
	
	if( use[x][y] ==0){
		_this.style.backgroundColor="#6f0038";
		use[x][y] = -1;
	}else if(use[x][y] == -1){
		_this.style.backgroundColor = "#2d65fb";
		use[x][y] = 0;
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
	var nr = parseInt( THIS.id.substring(10,THIS.id.length) );
	
	var x=1,y=1;
	x = Math.floor((nr-1)/_cols + 1);
	
	y = nr%_cols;
	if(y==0) y = _cols;
	if( use[x][y] == -1 ) return ;
	
	if( mat[x][y] == -1 ){
		if( AutoLose == 1 ){
			for(var i=0; i < bmb.length; ++i){
				x = bmb[i][0]; y = bmb[i][1];
				nr = (x-1)*_cols+y;
				document.getElementById("SquareDiv_"+nr).style.backgroundColor= "#dd0a2b";
				_disable("SquareDiv_"+nr);
				use[x][y] = 1;
			}
		}
		else{		
			document.getElementById("SquareDiv_"+nr).style.backgroundColor= "#dd0a2b";
			_disable("SquareDiv_"+nr);
			use[x][y] = 1;
		}
	}	
	else
	{
		if(mat[x][y] >0 )
		{
			document.getElementById("SquareDiv_"+nr).innerText = mat[x][y];
			document.getElementById("SquareDiv_"+nr).style.backgroundColor="#8ed379";
			_disable("SquareDiv_"+nr);
			use[x][y] = 2;
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
			if( i <1 || i>_rows) continue;
			for(var b=-1;b<2;++b){
				j=y+b;
				if(a==0 && b == 0) continue;
				if( j <1 || j > _cols ) continue;
				if(mat[i][j] == 0 && use[i][j] ==0){
					stx.length = stx.length+1;
					stx[stx.length-1] = i;
					sty.length = sty.length+1;
					sty[sty.length-1] = j;
					use[i][j] = 2;
				}
			}
		}
		
	}
	for(index =0;index < stx.length ; ++index)
	{
		x = stx[index];
		y = sty[index];
		nr = (x-1)*_cols + y; 
		document.getElementById("SquareDiv_"+nr).style.backgroundColor="#8ed379";
		_disable("SquareDiv_"+nr);
		
		for(var a=-1;a<2;++a){
			i = x+a; 
			if( i <1 || i > _rows) continue;
			for(var b=-1;b<2;++b){
				j=y+b;
				if(a==0 && b == 0) continue;
				if( j <1 || j > _cols ) continue;
				if(mat[i][j] > 0){
					nr = (i-1)*_cols + j; 
					document.getElementById("SquareDiv_"+nr).innerText = mat[i][j];
					document.getElementById("SquareDiv_"+nr).style.backgroundColor="#8ed379";
					_disable("SquareDiv_"+nr);
					use[i][j] = 2;
				}
			}
		}
		
		
	}
	
	
	
	
}


function _LoadSquares(rows,cols)
{
	
	var _width = parseInt(square_width) ;
	var code = "";
	var con = document.getElementById("ContentDiv");
	con.innerHTML = "";
	for(var i = rows ; i > 0; --i){
		
		for(var j = i*cols; j > (i-1)*cols ; --j){
			code = "<div class=' w3-border w3-col' style='padding:5px ;width:"+_width+"px;height:"+_width+"px'><div class='w3-center' id='SquareDiv_"+j+"'onmouseover='m_on(this)' oncontextmenu='mark_(this)' onmouseout='m_out(this)' onclick='clicked(this)'  style='height:100%;background-color:"+'#2d65fb'+" ' ></div></div>" ;
			con.innerHTML += code;
			
		}
		con.innerHTML += "<div class='w3-row'><!-- empty , just to break line -->";
		
	}

}

function m_on(THIS){
	var nr = parseInt( THIS.id.substring(10,THIS.id.length) );
	var x,y;
	x=cx[nr] ; y =cy[nr];
	if(use[x][y] != 0 ) return;
	THIS.style.backgroundColor = "#0f2e83";
}

function m_out(THIS){
	var nr = parseInt( THIS.id.substring(10,THIS.id.length) );
	var x,y;
	x=cx[nr] ; y =cy[nr];
	if(use[x][y] != 0 ) return;
	THIS.style.backgroundColor = "#2d65fb";
}
