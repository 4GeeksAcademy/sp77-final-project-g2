const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [{title: "FIRST", background: "white", initial: "white"},
				     {title: "SECOND", background: "white", initial: "white"}],
			message: null,
			ideas: [],
			news: [],
			fromCurrency: "",
			toCurrency: "",
			amount: 0,
			conversionRate: 0,
			convertedAmount: 0
		},
		actions: {
			exampleFunction: () => {getActions().changeColor(0, "green");},
			// getMessage: async () => {
			// 	const uri = `${process.env.BACKEND_URL}/api/hello`
			// 	const options = {
			// 		method: 'GET'
			// 	}
			// 	const response = await fetch(uri, options)
			// 	if (!response.ok) {
			// 		console.log("Error loading message from backend", response.status)
			// 		return
			// 	}
			// 	const data = await response.json()
			// 	setStore({ message: data.message })
			// 	return data;
			// },
			// changeColor: (index, color) => {
			// 	const store = getStore();  // Get the store
			// 	const demo = store.demo.map((element, i) => {
			// 		if (i === index) element.background = color;
			// 		return element;
			// 	});
			// 	setStore({ demo: demo });  // Reset the global store
			// },
			getIdeas: async (budget, country, area) => {
				const uri = `${process.env.BACKEND_URL}/advisor`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						budget,
						country,
						area
					})
				};
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log(response.status);
					return;
				}
				const data = await response.json();
				setStore({ideas: data.ideas});
			},
			getNews: async (category) => {
				const uri = `${process.env.BACKEND_URL}/news?category=${category}`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log(response.status);
					return;
				}
				const data = await response.json()
				setStore({news: data.news});
            },
			logIn: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/login`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if(!response.ok) {
					console.log(response.status);
					return;
				}
				const data = await response.json();
				setStore({news: data.news})
			},
			getConvert: async (fromCurrency, toCurrency, amount) => {
				console.log("Acción getConvert llamada con:", fromCurrency, toCurrency, amount);
				const uri = `${process.env.BACKEND_URL}/converter?from_currency=${fromCurrency}&to_currency=${toCurrency}&amount=${amount}`;
				const options = {
					method: 'GET'
				};

				try {
					const response = await fetch(uri, options);

					// Verificar el tipo de contenido de la respuesta
					const contentType = response.headers.get("content-type");

					if (!response.ok) {
						console.log("Error:", response.status);
						return;
					}

					// Si la respuesta es JSON, parsearla
					if (contentType && contentType.includes("application/json")) {
						const data = await response.json();
						console.log("Respuesta de la API:", data);
						setStore({
							fromCurrency: data.base_code,
							toCurrency: data.target_code,
							originalAmount: amount,
							conversionRate: data.conversion_rate,
							convertedAmount: data.conversion_result,  // Asegúrate de que 'data.conversion_result' sea asignado aquí
							error: null
						});
					}
					// Si la respuesta no es JSON (posiblemente HTML)
					else {
						const text = await response.text();  // Leer la respuesta como texto
						console.error("Respuesta no es JSON. Recibido HTML:", text);  // Mostrar el HTML en la consola
					}
				} catch (error) {
					console.error("Error en la solicitud:", error);
					setStore({ error: "Error al realizar la conversión." });
				}
			}
		}
	};
};

export default getState;
