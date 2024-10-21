const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [{title: "FIRST", background: "white", initial: "white"},
				     {title: "SECOND", background: "white", initial: "white"}],
			message: null,
			ideas: [],
			news: [],
			converter: "",
			name: "",
			email: "",
			isLoged: false,
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
				localStorage.setItem('user', JSON.stringify(data.results))
				setStore({isLoged: true, name: data.results.email});
			},
			logOut: () => {
				setStore({isLoged: false, name: ""});
			}
		}
	};
};

export default getState;
