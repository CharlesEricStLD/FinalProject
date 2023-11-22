//Compopnents to render the Page for each center by ID of center 


export const CenterPage = () => {

  const center =  {
    _id : "",
    image : "https://m1.quebecormedia.com/emp/emp/62216354_2615382654865a-73cc-4c33-bc1d-8479a3cd3d50_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=0&w=1000&h=667&width=960",
    name : "Ski Montagne coupée",
    region : "Laurentides",
    url : "https://skidefondstjeanmatharaquettelanaudiere.com/",
    
    contact : {
    email : "<info@skimontagnecoupee.com>",
    facebook : " @skimontagnecoupee",
    Phone : "450 886-3845",
    website : "https://skidefondstjeanmatharaquettelanaudiere.com/",
    }
  }
  //Fetch data from server


  return (
    <>
    <h1>THIS IS THE PAGE TO RENDER THE CENTER PAGE WITH IT"S ID</h1>
    {
      <div>
      <h1>{center.name}</h1>
      <p>region :{center.region} </p>
      <img src={center.image}></img>
      <p>{center.url}</p>
      <h2>Contact</h2>
      <p>{center.email}</p>
      <p>{center.facebook}</p>
      <p>{center.phone}</p>   
      </div>
  }
    </>

  ) 

}