import React, { useState, useEffect, useRef } from "react";

export const Snake=({width, height, speedms})=>{
    const [field, setField]= useState([]);

    const [snake, setSnake]=useState({
        coord:[0,3],
        len:0,
        nodes:[{
            x:0,
            y:2
        }]
    })

    const [moveRoad, setMoveRoad]=useState("right");

    const [fail, setFail]= useState(false);

    const refDiv=useRef(null);

    const [food, setFood]= useState({})

    const SetMoveRoad=(e)=>{
        if(e.keyCode===32){
            setSnake({
                coord:[0,3],
                len:0,
                nodes:[{
                    x:0,
                    y:2
                }]
            })
            setMoveRoad("right")
            setFail(false)
            genFood()
        }
        if(moveRoad==="straight"&& e.keyCode===83){
            return;
        }

        if(moveRoad==="right" && e.keyCode===65){
            return;
        }

        if(moveRoad==="back"&& e.keyCode===87){
            return;
        }

        if(moveRoad==="left" && e.keyCode===68){
            return;
        }

        if(e.keyCode===83){
            setMoveRoad("back")
        }

        if(e.keyCode===65){
            setMoveRoad("left")
        }

        if(e.keyCode===68){
            setMoveRoad("right")
        }

        if(e.keyCode===87){
            setMoveRoad("straight")
        }
    }

    const move=()=>{
        if(snake.coord[1]>=width){
            setFail(true)
            return;
        }
        else if(snake.coord[1]<0){
            setFail(true)
            return;
        }
        else if(snake.coord[0]>=height){
            setFail(true)
            return;
        }
        else if(snake.coord[0]<0){
            setFail(true)
            return;
        }

        if(snake.coord[0]===food.x&&snake.coord[1]===food.y){
            snake.nodes=[{x:snake.nodes[0]-1, y:snake.nodes[0]}, ...snake.nodes]
            genFood()
        }

        let x,y;
        if(moveRoad==="back"){
            x=1
            y=0
        }
        else if(moveRoad==="right"){
            x=0
            y=1
        }
        else if(moveRoad==="left"){
            x=0
            y=-1
        }
        else if(moveRoad==="straight"){
            x=-1
            y=0
        }

        let snakeCopy=Object.assign({}, snake);
        let coord={
            x:snakeCopy.coord[0],
            y:snakeCopy.coord[1]
        };
        let temp;
        for(let i=0; i<snakeCopy.nodes.length;i++){
            temp=Object.assign({},snakeCopy.nodes[i]);
            snakeCopy.nodes[i].x=coord.x
            snakeCopy.nodes[i].y=coord.y
            coord=temp
        }
        snakeCopy.coord=[snake.coord[0]+x, snake.coord[1]+y]; 
        if(snakeCopy.nodes.filter(x=>x.x===snakeCopy.coord[0]&&x.y===snakeCopy.coord[1]).length!==0){
            setFail(true);
            return;
        }   
        setSnake(snakeCopy)


    }

    useEffect(()=>{
        let arr=[];
        for(let i=0; i<height;i++){
            arr.push([])
            for(let j=0; j<width; j++){
                arr[i].push({})
            }
            setField(arr);
        }
        refDiv.current.focus();
        genFood()
    },[])


    useEffect(()=>{
        if(fail){
            return;
        }
        let lol= setInterval(()=>{
            move()
        },speedms)
        return ()=>{
            clearInterval(lol)
        }
    })


    const genFood=()=>{
        let arr=[];
        for(let i=0; i<width; i++){
            for(let j=0; j<height; j++){
                if(snake.nodes.filter(x=>x.x===i&&x.y===j).length===0&&!(snake.coord[0]===i&&snake.coord[1]===j)){
                    arr.push([i,j])
                }
            }
        }

        let cord=arr[Math.floor(Math.random() * arr.length)]
        setFood({
            x:cord[0],
            y:cord[1]
        })
        
    }

    return(
        <div ref={refDiv} tabindex="0" style={{width:width*25+"px", height:height*25+"px"}} onKeyUp={SetMoveRoad}>
            {field.map((el,i)=>{
                return el.map((el2, i2)=>{
                    return <div style={{
                        width:"25px", 
                        height:"25px",
                        background: 
                        (snake.nodes.filter(x=>x.x===i&&x.y===i2).length!==0)
                        ?"black":(food.x===i&&food.y===i2)?"green":(i===snake.coord[0]&&i2===snake.coord[1])?"red":"white",
                        position: "relative",
                        marginBottom: "-4px",
                        boxSizing: "border-box",
                        display:"inline-block"}}></div>
                })
            })}
        </div>
    )
}