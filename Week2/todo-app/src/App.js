import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Router from "./routes/routes";
import { AppProvider } from "@shopify/polaris";
import TodoContextProvider from "./context/TodoContextProvider";

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<TodoContextProvider>
					<AppLayout>
						<Router />
					</AppLayout>
				</TodoContextProvider>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
