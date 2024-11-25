//Component for the snow conditions table

import styled from "styled-components"
import { useEffect } from "react";

export const SnowConditionsTable = ({center}) => {
  
  //Fetch the centers condition url information from the database
  useEffect(() => {
    if (center) {
      fetch(`/api/centersCondition/${center.name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message = "center sucessfully found: ") {
          setcenterConditonUrl(data.data.scrapping.conditionUrl)
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${center.name}:`, error);
    });
  }
  },[center]);
  
  
  return (
  <>
      <h3>Conditions</h3>
      {center.condition? 
      <ConditionTable>
        <tbody>
        <tr>
        <th>Open/Close</th>
        <th>Track Close</th>
        <th>Snow conditions</th>
        <th>Warnings</th>
        <th>Last Update</th>
        </tr>
        <tr>
          {/* Cant use map here, should a list or find a way to create a specific key(props) and refer to it into styled component */}
        {
        Object.values(center.condition).map((data) =>
        <td>{data ?data: "Not data available from the ski center"}</td>
        )
        };
        </tr>
        </tbody>
      </ConditionTable> : <h3>Conditions unavailable for the moment...</h3>}
      <p>For more details, you can visit the website directly <a target="_blank" href={centerConditonUrl}>here</a>.</p>

      {/* Pour plus détails, vous pouvez visiter le site internet du centre, ici */}
      </>
  )
}

const ConditionTable = styled.div`
  
`
