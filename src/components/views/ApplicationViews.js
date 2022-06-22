import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../Dashboard"
import { Modes } from "../modes/Modes"
import { Rules } from "../Rules"
import { CategoryContainer } from "../categories/CategoryContainer"
import { ReadyToPlay } from "../categories/ReadyToPlay"
import { GameContainer } from "../games/GameContainer"
import { Categories } from "../categories/Categories"
import { Game } from "../games/Game"

export const ApplicationViews = () => {
	
	return <Routes>
		<Route path="/modes" element={<Modes />} />
		<Route path="/rules" element={<Rules />} />
		<Route path="/dashboard" element={<Dashboard />} />
		<Route path="/categories" element={<Categories />} />
		<Route path="/game" element={<Game />} />
		<Route path="/ready" element={<ReadyToPlay/>} />
		
		
	</Routes>
}

