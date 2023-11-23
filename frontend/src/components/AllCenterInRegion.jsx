//Component to render the filter by region
import { useParams } from "react-router-dom"

export const AllCenterInRegion = () => {

  const {region} = useParams()

  //Fetch by region with an endpoint with disctinct fro the Db 

  return (
    <div>
    <h1>This is the component to filter by Region</h1>
    <h2>Here you can see all the centers of the {region}</h2>
    </div>
  )

}