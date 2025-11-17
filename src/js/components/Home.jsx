import React, { useEffect } from "react";
import { useState } from "react";

//create your first component
const Home = () => {
	const [valorInput, setValorInput] = useState("");
	const [tareas, setTareas] = useState([])
	const counter = tareas.length;
	
	/*useEffect(() => {
		fetch('https://playground.4geeks.com/todo/users/Santiago', {
			method: "POST",
			user_name: "Santiago",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)
		})
		}, []);*/


	useEffect(() => {
		fetch('https://playground.4geeks.com/todo/users/Santiago')
			.then(resp => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				console.log(resp.status); // El código de estado 201, 300, 400, etc.
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setTareas(data.todos)
				console.log(data.todos); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}, []);

	function newInput(event) {
		if (event.code === 'Enter') {
			if (valorInput == '') {
				return alert('You must write what needs to be done!')
			}
			const nuevaTarea = {
				label: valorInput,
				is_done: false
			}
			fetch('https://playground.4geeks.com/todo/todos/Santiago', {
				method: "POST",
				body: JSON.stringify(nuevaTarea),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					setTareas([...tareas, data])
					setValorInput("");
					console.log(data.id)
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});
		}
	};

	function deleteInput(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		},)
			.then(resp => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				console.log(resp.status); // El código de estado 201, 300, 400, etc.
				if (resp.ok == true) {
					setTareas(tareas.filter((tarea) => tarea.id !== id))
				}
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	};

	return (
		<div className="container">
			<h1 className="text-center">To Do List</h1>
			<div className="toDoBox">
				<ul>
					<li><input
						type="text" value={valorInput} onKeyDown={newInput}
						onChange={(event) => setValorInput(event.target.value)}
						placeholder="What needs to be done?">
					</input>
					</li>
					{tareas.map(tarea => {
						return <li key={tarea.label}>{tarea.label}
							<button
								type="button" onClick={() => deleteInput(tarea.id)}
								className="btn-close" aria-label="Close"></button>
						</li>
					})}
					<p>{counter} items left</p>
				</ul>
			</div>
		</div>
	);
};

export default Home;