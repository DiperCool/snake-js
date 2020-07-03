import React from "react";
import { Snake } from "./components/Snake";

export const App=()=>{

    return(<div>
        <Snake width={20} height={20} speedms={150}/>
    </div>)
}