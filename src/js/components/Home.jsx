import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [valorInput, setValorInput] = useState("");
	const [tareas, setTareas] = useState([])
	const counter = [...tareas].length;

	function newInput(event) {
		if (event.code === 'Enter') {
			setTareas([...tareas, valorInput])
			setValorInput("");
		}
	};

	function deleteInput(deleteTarea) {
		const newTareas = tareas.filter((tarea) => tarea !== deleteTarea)
		setTareas(newTareas)
	}

	return (
		<div className="container">
			<h1 className="text-center">To Do List</h1>
			<div className="toDoBox"> 
				<ul>
					<li><input type="text" value={valorInput} onKeyDown={newInput} onChange={(event) => setValorInput(event.target.value)} placeholder="What needs to be done?"></input></li>
					{tareas.map(tarea => {
						return <li key={tarea}>{tarea}
							<button type="button" onClick={() => deleteInput(tarea)} class="btn-close" aria-label="Close"></button>
						</li>

					})}
					<p>{counter} items left</p>
				</ul>
				
			</div>
		</div>
	);
};

export default Home;