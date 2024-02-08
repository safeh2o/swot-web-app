import React from 'react'
import ReactDOM from 'react-dom/client'
import ScrollToTop from './components/ScrollToTop.tsx'
import AppContext from './contexts/AppContext.tsx'
import { store, persistor } from './store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './components/App.tsx'

const appContextInitialValue = window.__INITIAL_STATE;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
	<AppContext.Provider value={appContextInitialValue}>
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<BrowserRouter>
					<ScrollToTop />
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</AppContext.Provider>
  </React.StrictMode>,
)
