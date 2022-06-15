import { Route, Routes } from "react-router-dom"
import { Categories } from "../games/Categories"
import { Dashboard } from "../Dashboard"
import { Modes } from "../modes/Modes"
import { Rules } from "../Rules"
import { Game } from "../games/Game"

export const ApplicationViews = () => {
	
	return <Routes>
		<Route path="/modes" element={<Modes />} />
		<Route path="/rules" element={<Rules />} />
		<Route path="/dashboard" element={<Dashboard />} />
		<Route path="/categories" element={<Categories/>} />
		<Route path="/game" element={<Game/>} />
		
	</Routes>
}

