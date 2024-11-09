const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			ideas: [],
			favoriteIdeas: [],
			news: [],
			fromCurrency: "",
            toCurrency: "",
            amount: 0,
            conversionRate: 0,
            convertedAmount: 0,

			user: {},
			isLoged: false,
			alert: { 
				message: "", 
				type: ""
			},
			clientSecret: null

		},
		actions: {
			showAlert: (message, type = "success") => {
				setStore({ alert: { message, type } });
				setTimeout(() => setStore({ alert: { message: "", type: "" } }), 2000);
			},
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
				if (!response.ok) {
					console.log(response.status);
					return;
				}
				const data = await response.json();
				setStore({ ideas: data.ideas });
			},
			getNews: async (category) => {
				const uri = `${process.env.BACKEND_URL}/news?category=${category}`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log(response.status);
					return;
				}
				const data = await response.json()
				setStore({ news: data.news });
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
				if (!response.ok) {
					getActions().showAlert("Email o contraseña incorrectos", "danger");
					console.log(response.status);
					return false;
				}
				const data = await response.json();
				localStorage.setItem('token', data.access_token);
				localStorage.setItem('user', JSON.stringify(data.results));
				setStore({isLoged: true, user: data.results.email});
				getActions().showAlert("Bienvenido de nuevo!", "success");
				return true;
			},
			logOut: () => {
				setStore({isLoged: false, user: {}});
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				getActions().showAlert("Hasta pronto!", "success");
			},
			isLogged: () => {
				const token = localStorage.getItem('token')
				if(token){
					const userData = JSON.parse(localStorage.getItem('user'))
					setStore({isLoged: true, user: userData})
				}
			},
			signUp: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/signup`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log(response.status);
					return false;
				}
				const data = await response.json();

				localStorage.setItem('token', data.access_token);
				localStorage.setItem('user', JSON.stringify(data.results));

				setStore({ isLoged: true, user: data.results.email });
				getActions().showAlert("Registro exitoso. Bienvenido/a!", "success");
				return true;
			},
			getConvert: async (fromCurrency, toCurrency, amount) => {
				const uri = `${process.env.BACKEND_URL}/converter?from_currency=${fromCurrency}&to_currency=${toCurrency}&amount=${amount}`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if(!response.ok) {
					console.log(response.status);
					return;
				}
				const data = await response.json();
				console.log(data.results);
				setStore({fromCurrency: data.results.base_code,
						 toCurrency: data.results.target_code,
						 originalAmount: amount,
						 conversionRate: data.results.conversion_rate,
						 convertedAmount: data.results.conversion_result})
			},
			accessProtected: async () => {
				const uri = `${process.env.BACKEND_URL}/protected`;
				const token = localStorage.getItem('token');
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log(response.status);
					return;
				}
				const data = await response.json()
			},
			addFavoriteIdea: async (newFavorite) => {
				console.log("Saving favorite idea:", newFavorite);
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/favorite-ideas`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(newFavorite)
				};
			
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error("Error al guardar la idea favorita:", response.status);
					return;
				}
			
				const data = await response.json();
				console.log("Idea favorita guardada:", data.favoriteIdeas);
				setStore({ favoriteIdeas: [...getStore().favoriteIdeas, data.favoriteIdea] });
			},
			getFavoriteIdeas: async () => {
				const uri = `${process.env.BACKEND_URL}/favorite-ideas`;
				const token = localStorage.getItem('token');
				if (!token) {
					console.error("Token no encontrado.");
					return;
				}
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};
			
				const response = await fetch(uri, options);
				console.log("Status:", response.status);
			
				if (!response.ok) {
					if (response.status === 403) {
						console.error("Acceso denegado: Token inválido o sesión expirada.");
						return;
					}
					if (response.status === 404) {
						console.error("Recurso no encontrado");
						return;
					}
					console.error("Error al obtener ideas favoritas:", response.status);
					return;
				}
			
				const data = await response.json();
				console.log("Datos de ideas favoritas:", data.results);
				setStore({ favoriteIdeas: data.results });
			},
			startCheckoutSession: async () => {
				const uri = `${process.env.BACKEND_URL}/create-checkout-session`;
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error al crear la sesión de Stripe:", response.status);
					return;
				};
				const data = await response.json();
				window.location.href = data.url;
			}
		}
	};
};

export default getState;
