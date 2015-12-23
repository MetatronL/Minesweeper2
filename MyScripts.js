
var square_width = 50 ;
var current_rows = 0;
var current_cols = 0;
var current_diff = 0;

var stare = [] ;
var raport = [ 0.2 , 0.3 , 0.4 , 0.5 , 0.6 , 0.7  ];


 

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
	
	stare.length = _rows * _cols;
	
	_LoadSquares(_rows,_cols);
	_CreateBombs();
	
}
function _CreateBombs()
{
	var nrBombe = Math.floor( (current_rows * current_cols) * raport[current_diff-1] ) ;
	
	
	
}



function _LoadSquares(rows,cols)
{
	
	var _width = square_width+"px" ;
	var code = "";
	var con = document.getElementById("ContentDiv");
	con.innerHTML = "";
	for(var i = rows ; i > 0; --i){
		
		for(var j = i*cols; j > (i-1)*cols ; --j){
			code = "<div class=' w3-border w3-col' style='padding:5px ;width:"+_width+";height:"+_width+"'><div id='SquareDiv_"+j+"'onmouseover='m_on(this)' onmouseout='m_out(this)'  style='height:100%;background-color:"+'#2d65fb'+" ' ></div></div>" ;
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
