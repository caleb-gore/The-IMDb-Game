import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./IMDbGame.css"
import { Welcome } from "./Welcome"


export const IMDbGame = () => {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/home" element={
				<Authorized>
					<>
						<NavBar />
						<ApplicationViews />
					</>
				</Authorized>} />

				

		</Routes>
	)
	
	
	
}

{/* <Authorized>
	<>
		<NavBar />
		<ApplicationViews />
	</>
</Authorized> */}

{/* <Routes>

</Routes> */}