
var square_width = 50 ;
var current_rows = 0;
var current_cols = 0;
var current_diff = 0;

var stare = [] ;
var raport = [ 0.2 , 0.3 , 0.4 , 0.5 , 0.6 , 0.7  ];
var nrbmbvec = [];
var mat = [];
 

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
	
	stare.length = _rows * _cols;
	
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
	
	
}
function _CreateBombs(_rows,_cols)
{
	var nrBombe = Math.floor( (current_rows * current_cols) * raport[current_diff-1] ) ;
	stare.length = current_cols * current_rows ;
	nrbmbvec.length = stare.length;
	
	for(var i=0;i < nrBombe ; ++i) 
		stare[i] = 1;
	for(var i=nrBombe; i<= len; ++i) 
		stare[i]=0;
		
	for(var i=stare.length ,j,tmp ; i>0; )
	{
	
		j = Math.floor(Math.random() * i );
		--i;
		tmp = stare[i];
		stare[i] = stare[j];
		stare[j] = tmp;
		
 	}
	for(i=1;i<=len; ++i)
		nrbmbvec[i] = 0;
	
	var x,y;
	
	
	for(var i=1;i<=_rows;++i)
	{
		for(var j=1;j<=_cols;++j)
		{
			x = (i-1)*_rows + j;
			mat[i][j] = stare[x];
			document.getElementById("demo").innerHTML += "mat["+i+"]["+j+"] = "+mat[i][j]+"    ";
		
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
			if(mat[i][j] > 0 )
			mat[i][j] = - mat[i][j];
			
		}
	}
	
}
function ver(x)
{
	if( !(x<1 || x>len ) )
		return 0;
	return stare[x];
}

function clicked(THIS)
{
	var nr = THIS.id;
	
	nr = nr.replace("SquareDiv_","");
	
	if( stare[nr] == 1 )
		/*alert("GAMEOVER");*/
		++nr;
	else
	{
		var x,y;
		x = Math.floor((nr-1)/current_rows + 1);
		y = nr%current_cols;
		if(y==0) y = current_cols;
		
		if(mat[x][y]!=0 )document.getElementById("SquareDiv_"+nr).innerText = -mat[x][y];
		document.getElementById("SquareDiv_"+nr).style.backgroundColor="#8ed379";
		document.getElementById("SquareDiv_"+nr).onmouseout="";
		document.getElementById("SquareDiv_"+nr).onmouseover="";
		document.getElementById("SquareDiv_"+nr).onclick="";
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
			code = "<div class=' w3-border w3-col' style='padding:5px ;width:"+_width+";height:"+_width+"'><div class='w3-center' id='SquareDiv_"+j+"'onmouseover='m_on(this)' onmouseout='m_out(this)' onclick='clicked(this)'  style='height:100%;background-color:"+'#2d65fb'+" ' ></div></div>" ;
			con.innerHTML += code;
			
		}
		con.innerHTML += "<div class='w3-row'><!-- Useless , just to break columns -->";
		
	}

}

function m_on(_this){
	_this.style.backgroundColor = "#0f2e83";
}

function m_out(_this){
	_this.style.backgroundColor = "#2d65fb";
	var abc = " ";
}
