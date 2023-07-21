
const colors = [
    '#c0b0a1',
    '#eee4da',
    '#ede0c8',
    '#f2b179',
    '#f59563',
    '#f67c60',
    '#f65e3b',
    '#edcf73', 
    '#edcc62',
    '#edc850',
    '#edc53f',
    '#edc22d',
    '#3d3a33'
    ]; 

    let divs = document.querySelectorAll('.game-board .item');
    let noMoreMovie = document.getElementById("noMoreMovie");
    let newBTN      = document.getElementById('newBTN'); 
    let score       = document.getElementById("score");
    let score0      = 0;
    let undo        = document.getElementById('undo');
    let btntest     = document.getElementById('testbtn');
    let test        = document.getElementById('test');
    let gameStarted = false;
    let randomFirstItem;
    let randomSecontItem;
    let data;
    let changeWereMade;
    let lastRow2add; 






    function setUP()    
    {
        data = Array.from({length: 4}, () => Array(4).fill(0));
        changeWereMade = false;
        lastRow2add    = 0; 
        randomFirstItem  = Math.floor(Math.random()*15);
        randomSecontItem = Math.floor(Math.random()*15);
        score.innerText = 0;
        noMoreMovie.style.opacity = '0';

        while(randomFirstItem == randomSecontItem)
            randomSecontItem = Math.floor(Math.random()*15);
        let x = [randomFirstItem,randomSecontItem];
        
        divs.forEach(item =>{
            item.style.backgroundColor = colors[0];
            item.innerText = '';
        });

        x.forEach(index =>{  
            let row = Math.floor(index/4);
            let column = index % 4;
            data[row][column] = 2; 
            divs[index].style.backgroundColor = colors[1];
            divs[index].innerText = 2;} );
        
    }

    setUP();

    newBTN.addEventListener('click', setUP);
            
    function left(){
        let  i = 0;
        let changeWereMadeN = 0;   

    for( i = 0; i<4; i++) 
        {         
        let check = data[i].every(function(dat){ return dat == 0;});
        if(!check){  

            if(bringArrayTogether(i,"left"))
                changeWereMadeN++; 

            for(let j = 0; j < 3; j++){
                if(data[i][j] == data[i][j+1] && data[i][j] != 0)
                {
                    addTwoSmilarNummbers(i,j,j+1);
                    changeWereMadeN++;
                }
            } 

            if(bringArrayTogether(i,"left"))
                changeWereMadeN++; 

        changeColors(lastRow2add, "left");
        if(changeWereMadeN > 0 && i != lastRow2add)
            changeColors(i, "left");
        }     
     }     

        if(changeWereMadeN > 0 )
            return true;
        
        return false;

    }
 
    function addTwoSmilarNummbers(row, firstNumber, secondNumber){
             setScore(data[row][firstNumber] * 2);
             data[row][firstNumber] = data[row][firstNumber] * 2;
             data[row][secondNumber] = 0; 
        }

function right(){
    let  i = 0;
    let changeWereMadeN = 0; 
    
    for( i = 0; i<4; i++) 
        { 
            let check = data[i].every(function(dat){ return dat == 0;});
            let pointer = 0;

        if(!check){  

            if(bringArrayTogether(i,"right"))
                changeWereMadeN++;

                for(let j = 3; j>0; j--){
                    if(data[i][j-1] == data[i][j] && data[i][j] != 0){
                        addTwoSmilarNummbers(i,j-1,j);
                        changeWereMadeN++;
                    }
                }
 
        if(bringArrayTogether(i,"right"))
            changeWereMadeN++;

        changeColors(lastRow2add, "right");

        if(changeWereMadeN > 0 && i != lastRow2add)
                changeColors(i, "right");
            }
        }

        if(changeWereMadeN > 0)
            return true;
        
        return false;
    }

    function bringArrayTogether(i, direction){
        let changeWereMade = false;
        let pointer = 0;

        if( direction == "left"){
         for( let j = 0; j<4; j++){
                 if( data[i][j] != 0 ){
                     let temp = data[i][pointer];
                     data[i][pointer] = data[i][j];
                     data[i][j] = temp;
                     if(j!=pointer) 
                      changeWereMade = true;
                     pointer++;
                 } 
             }
        } 
        else if(direction == "right"){
        pointer = 3;
          for(let j = 3; j>=0; j--){
                 if( data[i][j] != 0 ){
                     let temp = data[i][pointer];
                     data[i][pointer] = data[i][j];
                     data[i][j] = temp;

                     if(j!=pointer) 
                       changeWereMade = true;

                     pointer--;
                 } 
             }
        }  

        return changeWereMade;
    }

    function  randomlyAdd2(){

        let selectRandomIndex = Math.floor(Math.random()*15);
        let row     = Math.floor(selectRandomIndex/4);
        let column  = selectRandomIndex % 4;
        let therIsPlace =  data.some(row => row.includes(0));
        let zeros = [];

        for(let i = 0; i<4; i++)
            for(let j = 0; j<4; j++){
                if(data[i][j] == 0){
                    zeros.push(i.toString()+ j.toString());
                }
            }
        
    if(zeros.length == 0) return;
            
    selectRandomIndex = Math.floor(Math.random()*zeros.length);
    row     = parseInt(zeros[selectRandomIndex][0]);
    column  = parseInt(zeros[selectRandomIndex][1]);

    data[row][column] = 2; 
    selectRandomIndex = Math.floor(row*4)+column;

    divs[selectRandomIndex].style.backgroundColor = colors[1]; 
    divs[selectRandomIndex].innerText = 2;
    
    divs[selectRandomIndex].classList.remove('popup');
            setTimeout(() => {
                divs[selectRandomIndex].classList.add('popup');
            }, 10); 

    zeros.length = 0;
    lastRow2add = row;

    }  

    function bringArrayTogetherUpDown(col, direction)
    {
        let changeWereMade = false;
        let pointer = 0;
 
        if( direction == "up")
         {
            for( let row = 0; row<4; row++){
                 if( data[row][col] != 0 ){
                    let temp = data[pointer][col];
                    data[pointer][col] = data[row][col];
                    data[row][col] = temp;
                    if(row != pointer) 
                       changeWereMade = true;
                     pointer++;
                 } 
             }
            } 
            else if( direction == "down"){
                pointer = 3;
                for( let row = 3; row>=0; row--){
                 if( data[row][col] != 0 ){
                    let temp = data[pointer][col];
                    data[pointer][col] = data[row][col];
                    data[row][col] = temp;
                    if(row != pointer) 
                       changeWereMade = true;
                     pointer--;
                 } 
             }                
            }
   
        return changeWereMade;
    }

    function addTwoSmilarNummbers_Up_Down( firstNumber, secondNumber, column ){
        setScore(data[firstNumber][column] * 2);
        data[firstNumber][column] = data[secondNumber][column] * 2;
        data[secondNumber][column] = 0; 
    }

    
function changeColors(i, direction){
    let index = 0;
    let col =0, row = 0;
        for(let j = 0; j < 4; j++){
            if(direction == "right" || direction == "left")
                { row = i; col = j;}
                else
                 {row = j; col = i;}  
        
        index = Math.floor(row*4)+col;
        
        if( data[row][col] == 0 ){
                divs[index].innerHTML = '';
                divs[index].style.backgroundColor = colors[0];
             }
                else
                    {
                        divs[index].innerHTML = data[row][col]; 
                        switch(data[row][col]) {
                            case 2: divs[index].style.backgroundColor    = colors[1]; break;
                            case 4: divs[index].style.backgroundColor    = colors[1]; break;
                            case 8: divs[index].style.backgroundColor    = colors[2]; break;
                            case 16: divs[index].style.backgroundColor   = colors[3]; break;
                            case 32: divs[index].style.backgroundColor   = colors[4]; break;
                            case 64: divs[index].style.backgroundColor   = colors[5]; break;
                            case 128: divs[index].style.backgroundColor  = colors[6]; break;
                            case 256: divs[index].style.backgroundColor  = colors[7]; break;
                            case 512: divs[index].style.backgroundColor  = colors[8]; break;
                            case 1024: divs[index].style.backgroundColor = colors[9]; break;
                            case 2048: divs[index].style.backgroundColor = colors[10]; break;
                        }
                    }
          }
    }
    
    
    function up(){
        let  col = 0;
        let changeWereMadeN = 0; 
    
    for( col = 0; col<4; col++) 
        { 
        
        let i = 0;
        for( i = 0; i< 4; i++)
            if( data[i][col] != 0 )
                break; 

        if(i< 4){  

            if(bringArrayTogetherUpDown(col, "up"))
                changeWereMadeN++;

            for(let j = 0; j < 3; j++){
                if(data[j][col] == data[j+1][col] && data[j][col] != 0){               
                    addTwoSmilarNummbers_Up_Down(j,j+1,col);
                    changeWereMadeN++;
                }
            }
        
        if(bringArrayTogetherUpDown(col, "up"))
            changeWereMadeN++; 
 
        changeColors(lastRow2add ,"Up");
        if(changeWereMadeN > 0 && col != lastRow2add)
            changeColors(col,"Up");
            }
        }

        if(changeWereMadeN > 0)
            return true;
        
        return false;
    }


    function down(){
    let  col = 0;
    let changeWereMadeN = 0; 
    
    for( col = 0; col<4; col++) 
        {  

        let i = 0;
        for( i = 0; i< 4; i++)
            if( data[i][col] != 0 )
                break; 

        if(i< 4){  

            if(bringArrayTogetherUpDown(col, "down"))
                changeWereMadeN++;

            for(let j = 3; j > 0; j-- ){
                if(data[j-1][col] == data[j][col] && data[j][col] != 0){               
                    addTwoSmilarNummbers_Up_Down(j-1,j,col);
                    changeWereMadeN++;
                }             
            }
   
        if(bringArrayTogetherUpDown(col, "down"))
            changeWereMadeN++;
 
        changeColors(lastRow2add, "down");
        if(changeWereMadeN > 0 && col != lastRow2add)
            changeColors(col, "down");
            }
        }

        if(changeWereMadeN > 0)
            return true;
        
        return false;
    }

    function setScore(val){
        let temp = parseInt(score.innerText);
        score.innerText = val + temp;
    }
 

    function ifVailedIndex(i, j){
        return i>= 0 && i< 4 && j >= 0 && j < 4;
    }

    function isThereStillMovie(){
        for(let i = 0; i <4; i++)
            for(let j = 0; j <4; j++){
                if(ifVailedIndex(i-1, j) && data[i][j]== data[i-1][j])
                    {console.log(i,", ",j); return true;}
                if(ifVailedIndex(i, j-1) && data[i][j]== data[i][j-1])
                    {console.log(i,", ",j); return true;}
                if(ifVailedIndex(i+1, j) && data[i][j]== data[i+1][j])
                    {console.log(i,", ",j); return true;}
                if(ifVailedIndex(i, j+1) && data[i][j]== data[i][j+1])
                    {console.log(i,", ",j); return true;}
            }
        return false;
    }

    function checkT(){
        let isThereEmptyItem = data.flat().some(item => { return item == 0;});  
        if(!isThereStillMovie() && !isThereEmptyItem)
            noMoreMovie.style.opacity = '0.8';  
    }

    let undoArray = Array.from({length: 4}, ()=> Array(4).fill(0));
    undo.addEventListener('click', undoOneStep);

    function undoOneStep(){

        if(gameStarted)
            for(let i = 0; i < 4; i++)
                {
                    data[i] = undoArray[i].slice();
                    changeColors(i,'left');
                }
                
        score.innerText = score0;

    }

    function prepareForUndo(){
    score0 = score.innerText;
    for(let i = 0; i< 4; i++)
        undoArray[i] = data[i].slice();  

    }
 

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') { 
            
        prepareForUndo();
        gameStarted = true;

        if(left()) 
            randomlyAdd2();

        checkT();
        
        } else if (event.key === 'ArrowUp') {
            
        prepareForUndo();
        gameStarted = true;

          if(up())
             randomlyAdd2();

        checkT();

        } else if (event.key === 'ArrowRight') {
            
        prepareForUndo();
        gameStarted = true;

           if(right())
                randomlyAdd2();     

        checkT();

        } else if (event.key === 'ArrowDown') {
            
        prepareForUndo();
        gameStarted = true;

            if(down())
             randomlyAdd2();  

        checkT();   

        }

    });